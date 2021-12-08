/*
 * Copyright (c) 2021. BURO Civiel, Rotterdam, Netherlands
 * Licensed under GNU GENERAL PUBLIC LICENSE Version 3.
 */

import {Line3, Plane, Vector3} from "three"

import {DaVinciInterval, DaVinciOutput} from "./Download"
import {Chirality, Scaffold, Vertex} from "./Scaffold"

export interface Joint {
    index: number
    point: Vector3
}

export interface Bar {
    index: number
    jointA: Joint
    jointB: Joint
    jointC: Joint
    jointD: Joint
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

export function daVinci(scaffold: Scaffold, angle: number): DaVinciResult {
    const twist = angle * (scaffold.chirality === Chirality.Left ? 1 : -1)
    const joints: Joint[] = []

    function freshJoint(point: Vector3): Joint {
        const index = joints.length
        const node: Joint = {index, point}
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
            const jointA = freshJoint(new Vector3().copy(vertex.location))
            const jointB = freshJoint(new Vector3())
            const jointC = freshJoint(new Vector3())
            const jointD = freshJoint(new Vector3().copy(adjacentVertex.location))
            const vertexA = vertex
            const vertexB = adjacentVertex
            const bar: Bar = {index, jointA, jointD, jointB, jointC, vertexA, vertexB}
            bars.push(bar)
            dictionary[barName(bar.vertexA, bar.vertexB)] = bar
        })
    })
    const hubs = scaffold.vertices.map(vertex => {
        const adjacentBars = vertex.adjacent.map(adjacentVertex => dictionary[barName(vertex, adjacentVertex)])
        const hub: Hub = {adjacentBars}
        return hub
    })
    bars.forEach(({jointA, jointD}) => {
        const axis = new Vector3().lerpVectors(jointA.point, jointD.point, 0.5).normalize()
        jointA.point.applyAxisAngle(axis, twist)
        jointD.point.applyAxisAngle(axis, twist)
    })

    function intersect(planeBar: Bar, lineBar: Bar, extendBar: boolean): Joint {
        const normal = new Vector3().crossVectors(planeBar.jointA.point, planeBar.jointD.point).normalize()
        const plane = new Plane(normal)
        const hubA = hubs[planeBar.vertexA.index]
        const adjacentIndex = hubA.adjacentBars.findIndex(adj => adj.index === planeBar.index)
        if (adjacentIndex < 0) {
            throw new Error("adjacent not found")
        }
        const extend = (start: Vector3, end: Vector3) =>
            new Vector3().copy(end).add(new Vector3().subVectors(end, start))
        const nextLine = new Line3(
            extend(lineBar.jointA.point, lineBar.jointD.point),
            extend(lineBar.jointD.point, lineBar.jointA.point),
        )
        const intersectionPoint = new Vector3()
        plane.intersectLine(nextLine, intersectionPoint)
        const distA = intersectionPoint.distanceTo(lineBar.jointA.point)
        const distB = intersectionPoint.distanceTo(lineBar.jointD.point)
        const forward = distA < distB
        if (forward) {
            if (extendBar) {
                lineBar.jointA.point.copy(intersectionPoint)
                return lineBar.jointA
            } else {
                lineBar.jointB.point.copy(intersectionPoint)
                return lineBar.jointB
            }
        } else {
            if (extendBar) {
                lineBar.jointD.point.copy(intersectionPoint)
                return lineBar.jointD
            } else {
                lineBar.jointC.point.copy(intersectionPoint)
                return lineBar.jointC
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

export function radiansToDegrees(radian: number): number {
    return 180 / (radian * Math.PI)
}

export function degreesToRadians(degree: number): number {
    return Math.PI * degree / 180
}

export function daVinciOutput({bars, bolts, joints}: DaVinciResult): DaVinciOutput {
    const daVinciIntervals: DaVinciInterval [] = []
    bars.forEach((bar) => {
        daVinciIntervals.push({
            nodeIndexes: [bar.jointA.index, bar.jointB.index, bar.jointC.index, bar.jointD.index],
            type: "type 1",
        })
    })
    bolts.forEach((bolt) => {
        daVinciIntervals.push({
            nodeIndexes: [bolt.jointA.index, bolt.jointB.index],
            type: "type 2",
        })
    })
    return {joints, daVinciIntervals}
}
