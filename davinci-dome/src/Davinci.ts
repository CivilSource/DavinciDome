import {Vector3} from "three";
import {Scaffold} from "./Scaffold";

export interface Interval {
    index: number,
    pointA: Vector3
    pointB: Vector3
}

export function davinci(scaffold: Scaffold) {
    const intervals: Interval[] = []
    scaffold.vertices.forEach(vertex => {
        const pointA = new Vector3().copy(vertex.location)
        vertex.adjacent.forEach(adjacentVertex => {
            if (adjacentVertex.index > vertex.index) {
                return
            }
            const index = intervals.length
            const pointB = new Vector3().copy(adjacentVertex.location)
            const interval: Interval = {index, pointA, pointB}
            intervals.push(interval)
        })
    });
    return intervals
}