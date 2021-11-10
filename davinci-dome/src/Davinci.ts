import {Line3, Plane, Vector3} from "three";
import {Scaffold, Vertex} from "./Scaffold";

export interface Interval {
    index: Number
    pointA: Vector3
    pointB: Vector3
    vertexA: Vertex
    vertexB: Vertex
}

export interface Hub {
    adjacentIntervals: Interval[]
}

function intervalName(vertexA: Vertex, vertexB: Vertex) {
    const min = Math.min(vertexA.index, vertexB.index)
    const max = Math.max(vertexA.index, vertexB.index)
    return `${min},${max}`
}

export function davinci(scaffold: Scaffold, angle: number) {
    const intervals: Interval[] = []
    const dictionary: Record<string, Interval> = {}
    scaffold.vertices.forEach(vertex => {
        vertex.adjacent.forEach(adjacentVertex => {
            if (adjacentVertex.index > vertex.index) {
                return
            }
            const index = intervals.length
            const pointA = new Vector3().copy(vertex.location)
            const pointB = new Vector3().copy(adjacentVertex.location)
            const vertexA = vertex
            const vertexB = adjacentVertex
            const interval: Interval = {index, pointA, pointB, vertexA, vertexB}
            intervals.push(interval)
            dictionary[intervalName(interval.vertexA, interval.vertexB)] = interval
        })
    });
    const hubs = scaffold.vertices.map(vertex => {
        const adjacentIntervals = vertex.adjacent.map(adjacentVertex => {
            return dictionary[intervalName(vertex, adjacentVertex)]
        })
        const hub: Hub = {adjacentIntervals}
        return hub
    });
    intervals.forEach(({pointA, pointB}) => {
        const axis = new Vector3().lerpVectors(pointA, pointB, 0.5).normalize()
        pointA.applyAxisAngle(axis, angle)
        pointB.applyAxisAngle(axis, angle)
    })

    function intersect(planeInterval: Interval, lineInterval: Interval) {
        const normal = new Vector3().crossVectors(planeInterval.pointA, planeInterval.pointB).normalize()
        const plane = new Plane(normal)
        const hubA = hubs[planeInterval.vertexA.index]
        const adjacentIndex = hubA.adjacentIntervals.findIndex(adj => adj.index === planeInterval.index)
        if (adjacentIndex < 0) {
            throw new Error("adjacent not found")
        }

        const nextLine = new Line3(lineInterval.pointA, lineInterval.pointB)
        const intersectionPoint = plane.intersectLine(nextLine, new Vector3())
        if (!intersectionPoint) {
            throw new Error("intersection not found")
        }
        const distA = intersectionPoint.distanceTo(lineInterval.pointA)
        const distB = intersectionPoint.distanceTo(lineInterval.pointB)
        if (distA < distB) {
            lineInterval.pointA.copy(intersectionPoint)
        } else {
            lineInterval.pointB.copy(intersectionPoint)
        }
    }

    hubs.forEach(hub => {
        hub.adjacentIntervals.forEach((currentInterval, index) => {
            const nextIndex = (index + 1) % hub.adjacentIntervals.length
            const nextInterval = hub.adjacentIntervals[nextIndex]
            intersect(currentInterval, nextInterval)
        })
    })

    return intervals
}