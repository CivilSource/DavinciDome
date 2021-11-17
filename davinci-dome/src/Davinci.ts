import {Line3, Plane, Vector3} from "three"
import {Chirality, Scaffold, Vertex} from "./Scaffold"

export interface Interval {
    index: Number;
    pointA: Vector3;
    pointB: Vector3;
    vertexA: Vertex;
    vertexB: Vertex;
}

export interface Hub {
    adjacentIntervals: Interval[];
}

function intervalName(vertexA: Vertex, vertexB: Vertex) {
    const min = Math.min(vertexA.index, vertexB.index)
    const max = Math.max(vertexA.index, vertexB.index)
    return `${min},${max}`
}

export function davinci(scaffold: Scaffold, angle: number) {
    const twist = angle * (scaffold.chirality === Chirality.Left ? 1 : -1)
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
    })
    const hubs = scaffold.vertices.map(vertex => {
        const adjacentIntervals = vertex.adjacent.map(adjacentVertex => {
            return dictionary[intervalName(vertex, adjacentVertex)]
        })
        const hub: Hub = {adjacentIntervals}
        return hub
    })
    intervals.forEach(({pointA, pointB}) => {
        const axis = new Vector3().lerpVectors(pointA, pointB, 0.5).normalize()
        pointA.applyAxisAngle(axis, twist)
        pointB.applyAxisAngle(axis, twist)
    })

    function intersect(planeInterval: Interval, lineInterval: Interval) {
        const normal = new Vector3().crossVectors(planeInterval.pointA, planeInterval.pointB).normalize()
        const plane = new Plane(normal)
        const hubA = hubs[planeInterval.vertexA.index]
        const adjacentIndex = hubA.adjacentIntervals.findIndex(adj => adj.index === planeInterval.index)
        if (adjacentIndex < 0) {
            throw new Error("adjacent not found")
        }
        const extend = (start: Vector3, end: Vector3) =>
            new Vector3().copy(end).add(new Vector3().subVectors(end, start))
        const nextLine = new Line3(
            extend(lineInterval.pointA, lineInterval.pointB),
            extend(lineInterval.pointB, lineInterval.pointA)
        )
        const intersectionPoint = new Vector3()
        plane.intersectLine(nextLine, intersectionPoint)
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

export function radiansToDegrees(radian: number) {
    return 180 / (radian * Math.PI)
}

export function degreesToRadians(degree: number) {
    return Math.PI * degree / 180
}