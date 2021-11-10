import {Vector3} from "three";
import {Scaffold} from "./Scaffold";

export interface Interval {
    index: number,
    pointA: Vector3
    pointB: Vector3
}

export function davinci(scaffold: Scaffold, angle: number) {
    const intervals: Interval[] = []
    scaffold.vertices.forEach(vertex => {
        vertex.adjacent.forEach(adjacentVertex => {
            if (adjacentVertex.index > vertex.index) {
                return
            }
            const index = intervals.length
            const pointA = new Vector3().copy(vertex.location)
            const pointB = new Vector3().copy(adjacentVertex.location)
            const interval: Interval = {index, pointA, pointB}
            intervals.push(interval)
        })
    });
    intervals.forEach(interval => {
        const axis = new Vector3().lerpVectors(interval.pointA, interval.pointB, 0.5).normalize()
        interval.pointA.applyAxisAngle(axis, angle)
        interval.pointB.applyAxisAngle(axis, angle)
    })
    return intervals
}