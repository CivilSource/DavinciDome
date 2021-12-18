/*
 * Copyright (c) 2021. BURO Civiel, Rotterdam, Netherlands
 * Licensed under GNU GENERAL PUBLIC LICENSE Version 3.
 */

import {Line3, Plane, Vector3} from "three"

import {DaVinciInterval, DaVinciOutput} from "./Download"
import {Chirality, Scaffold, Vertex} from "./Scaffold"

export enum JointPosition {
    Above, Below, OnSurface,
}

export interface Joint {
    index: number
    point: Vector3
    position: JointPosition
}

export interface Bar {
    index: number
    joints: Joint[]
    vertexA: Vertex
    vertexB: Vertex
}

export interface Bolt {
    index: number
    jointA: Joint
    jointB: Joint
}

export interface DaVinciResult {
    bars: Bar[]
    bolts: Bolt[]
    joints: Joint[]
}

export interface Hub {
    adjacentBars: Bar[]
}

function barName(vertexA: Vertex, vertexB: Vertex): string {
    const min = Math.min(vertexA.index, vertexB.index)
    const max = Math.max(vertexA.index, vertexB.index)
    return `${min},${max}`
}

export function daVinci(scaffold: Scaffold, angle: number, rotate: boolean): DaVinciResult {
    const twist = angle * (scaffold.chirality === Chirality.Left ? 1 : -1)
    const joints: Joint[] = []
    const rotationAngle = rotate ? Math.atan(1 / 1.61803398875) : 0
    const rotationAxis = new Vector3(1, 0, 0)

    function freshJoint(point: Vector3): Joint {
        const index = joints.length
        const node: Joint = {index, point, position: JointPosition.Above}
        joints.push(node)
        return node
    }

    const bars: Bar[] = []
    const dictionary: Record<string, Bar> = {}
    scaffold.vertices.forEach(vertex => {
        vertex.adjacent.forEach(adjacentVertex => {
            if (adjacentVertex.index > vertex.index) {
                return
            }
            const index = bars.length
            const barJoints: Joint[] = [
                freshJoint(new Vector3().copy(vertex.location).applyAxisAngle(rotationAxis, rotationAngle)),
                freshJoint(new Vector3()),
                freshJoint(new Vector3()),
                freshJoint(new Vector3().copy(adjacentVertex.location).applyAxisAngle(rotationAxis, rotationAngle)),
            ]
            const vertexA = vertex
            const vertexB = adjacentVertex
            const bar: Bar = {index, joints: barJoints, vertexA, vertexB}
            bars.push(bar)
            dictionary[barName(bar.vertexA, bar.vertexB)] = bar
        })
    })
    const hubs = scaffold.vertices.map(vertex => {
        const adjacentBars = vertex.adjacent.map(adjacentVertex => dictionary[barName(vertex, adjacentVertex)])
        const hub: Hub = {adjacentBars}
        return hub
    })
    bars.forEach(bar => {
        const axis = new Vector3().lerpVectors(bar.joints[0].point, bar.joints[3].point, 0.5).normalize()
        bar.joints[0].point.applyAxisAngle(axis, twist)
        bar.joints[3].point.applyAxisAngle(axis, twist)
    })

    function intersect(planeBar: Bar, lineBar: Bar, extendBar: boolean): Joint {
        const normal = new Vector3().crossVectors(planeBar.joints[0].point, planeBar.joints[3].point).normalize()
        const plane = new Plane(normal)
        const hubA = hubs[planeBar.vertexA.index]
        const adjacentIndex = hubA.adjacentBars.findIndex(adj => adj.index === planeBar.index)
        if (adjacentIndex < 0) {
            throw new Error("adjacent not found")
        }
        const extend = (start: Vector3, end: Vector3) =>
            new Vector3().copy(end).add(new Vector3().subVectors(end, start))
        const nextLine = new Line3(
            extend(lineBar.joints[0].point, lineBar.joints[3].point),
            extend(lineBar.joints[3].point, lineBar.joints[0].point),
        )
        const intersectionPoint = new Vector3()
        plane.intersectLine(nextLine, intersectionPoint)
        const distA = intersectionPoint.distanceTo(lineBar.joints[0].point)
        const distB = intersectionPoint.distanceTo(lineBar.joints[3].point)
        const forward = distA < distB
        if (forward) {
            if (extendBar) {
                lineBar.joints[0].point.copy(intersectionPoint)
                return lineBar.joints[0]
            } else {
                lineBar.joints[1].point.copy(intersectionPoint)
                return lineBar.joints[1]
            }
        } else {
            if (extendBar) {
                lineBar.joints[3].point.copy(intersectionPoint)
                return lineBar.joints[3]
            } else {
                lineBar.joints[2].point.copy(intersectionPoint)
                return lineBar.joints[2]
            }
        }
    }

    const bolts: Bolt [] = []
    hubs.forEach(hub => {
        hub.adjacentBars.forEach((currentBar, index) => {
            const nextIndex = (index + 1) % hub.adjacentBars.length
            const nextBar = hub.adjacentBars[nextIndex]
            const nodeA = intersect(currentBar, nextBar, true)
            const nodeB = intersect(nextBar, currentBar, false)
            const bolt: Bolt = {jointA: nodeA, jointB: nodeB, index: bars.length + bolts.length}
            bolts.push(bolt)
        })
    })
    return {bars, bolts, joints}
}

export function daVinciToDome(result: DaVinciResult, surfaceHeight: number): DaVinciResult {
    const bolts = [...result.bolts]
    const plane = new Plane(new Vector3(0, -1, 0), surfaceHeight)
    result.joints.forEach(joint => {
        const distance = plane.distanceToPoint(joint.point)
        joint.position = distance <= 0 ? JointPosition.Above : JointPosition.Below
    })
    const bars = result.bars.map(bar => {
        const line = new Line3(bar.joints[0].point, bar.joints[3].point)
        const point = plane.intersectLine(line, new Vector3())
        if (point) {
            const planeJoint: Joint = {point, index: result.joints.length, position: JointPosition.OnSurface}
            result.joints.push(planeJoint)
            const withPlaneJoint = (bar.joints[0].position === JointPosition.Below) ? [planeJoint, ...bar.joints] : [...bar.joints, planeJoint]
            return {...bar, joints: withPlaneJoint.filter(b => b.position !== JointPosition.Below)}
        } else {
            return bar
        }
    })
    const joints = result.joints.filter(joint => joint.position !== JointPosition.Below)
    joints.forEach((joint, index) => joint.index = index)
    return {bars, bolts, joints}
}

export function radiansToDegrees(radian: number): number {
    return 180 / (radian * Math.PI)
}

export function degreesToRadians(degree: number): number {
    return Math.PI * degree / 180
}

export function daVinciOutput({bars, bolts, joints}: DaVinciResult): DaVinciOutput {
    const daVinciIntervals: DaVinciInterval [] = []
    bars
        .filter(bar => bar.joints[0].position === JointPosition.Above || bar.joints[bar.joints.length - 1].position === JointPosition.Above)
        .forEach((bar) => {
            daVinciIntervals.push({
                nodeIndexes: bar.joints.map(j => j.index),
                type: "type 1",
            })
        })
    bolts
        .filter(bolt => bolt.jointA.position === JointPosition.Above && bolt.jointB.position === JointPosition.Above)
        .forEach((bolt) => {
            daVinciIntervals.push({
                nodeIndexes: [bolt.jointA.index, bolt.jointB.index],
                type: "type 2",
            })
        })
    return {joints, daVinciIntervals}
}
