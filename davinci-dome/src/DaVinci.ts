import {Line3, Plane, Vector3} from "three"

import {DavinciInterval, DavinciOutput} from "./Download"
import {Chirality, Scaffold, Vertex} from "./Scaffold"

export interface Bar {
    index: number
    pointA: Vector3
    pointB: Vector3
    pointC: Vector3
    pointD: Vector3
    vertexA: Vertex
    vertexB: Vertex
}

export interface Bolt {
    pointA: Vector3
    pointB: Vector3
}

export interface DaVinciResult {
    bars: Bar[]
    bolts: Bolt[]
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
    const bars: Bar[] = []
    const dictionary: Record<string, Bar> = {}
    scaffold.vertices.forEach(vertex => {
        vertex.adjacent.forEach(adjacentVertex => {
            if (adjacentVertex.index > vertex.index) {
                return
            }
            const index = bars.length
            const pointB = new Vector3()
            const pointC = new Vector3()
            const pointA = new Vector3().copy(vertex.location)
            const pointD = new Vector3().copy(adjacentVertex.location)
            const vertexA = vertex
            const vertexB = adjacentVertex
            const bar: Bar = {index, pointA, pointD, pointB, pointC, vertexA, vertexB}
            bars.push(bar)
            dictionary[barName(bar.vertexA, bar.vertexB)] = bar
        })
    })
    const hubs = scaffold.vertices.map(vertex => {
        const adjacentBars = vertex.adjacent.map(adjacentVertex => dictionary[barName(vertex, adjacentVertex)])
        const hub: Hub = {adjacentBars}
        return hub
    })
    bars.forEach(({pointA, pointD}) => {
        const axis = new Vector3().lerpVectors(pointA, pointD, 0.5).normalize()
        pointA.applyAxisAngle(axis, twist)
        pointD.applyAxisAngle(axis, twist)
    })

    function intersect(planeBar: Bar, lineBar: Bar, extendBar: boolean): Vector3 {
        const normal = new Vector3().crossVectors(planeBar.pointA, planeBar.pointD).normalize()
        const plane = new Plane(normal)
        const hubA = hubs[planeBar.vertexA.index]
        const adjacentIndex = hubA.adjacentBars.findIndex(adj => adj.index === planeBar.index)
        if (adjacentIndex < 0) {
            throw new Error("adjacent not found")
        }
        const extend = (start: Vector3, end: Vector3) =>
            new Vector3().copy(end).add(new Vector3().subVectors(end, start))
        const nextLine = new Line3(
            extend(lineBar.pointA, lineBar.pointD),
            extend(lineBar.pointD, lineBar.pointA),
        )
        const intersectionPoint = new Vector3()
        plane.intersectLine(nextLine, intersectionPoint)
        const distA = intersectionPoint.distanceTo(lineBar.pointA)
        const distB = intersectionPoint.distanceTo(lineBar.pointD)
        const forward = distA < distB
        if (forward) {
            if (extendBar) {
                lineBar.pointA.copy(intersectionPoint)

            } else {
                lineBar.pointB.copy(intersectionPoint)
            }
        } else {
            if (extendBar) {
                lineBar.pointD.copy(intersectionPoint)
            } else {
                lineBar.pointC.copy(intersectionPoint)
            }
        }
        return intersectionPoint
    }

    const bolts: Bolt [] = []
    hubs.forEach(hub => {
        hub.adjacentBars.forEach((currentBar, index) => {
            const nextIndex = (index + 1) % hub.adjacentBars.length
            const nextBar = hub.adjacentBars[nextIndex]

            const pointA = intersect(currentBar, nextBar, true)
            const pointB = intersect(nextBar, currentBar, false)
            const bolt: Bolt = {pointA, pointB}
            bolts.push(bolt)
        })
    })
    return {bars, bolts}

}

export function radiansToDegrees(radian: number): number {
    return 180 / (radian * Math.PI)
}

export function degreesToRadians(degree: number): number {
    return Math.PI * degree / 180
}

export function davinciOutput(bars: Bar[], bolts: Bolt[]): DavinciOutput {
    const nodes: Vector3[] = []
    const csvIntervals: DavinciInterval [] = []
    bars.forEach((bar) => {
        nodes.push(bar.pointA)
        nodes.push(bar.pointD)
        csvIntervals.push({type: "type 1"})
    })
    return {nodes, csvIntervals}
}
