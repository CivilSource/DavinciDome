import {Vector3} from 'three';

export interface Vertex {
    location: Vector3;
    adjacent: Vertex[];
}

function adjacent(v0: Vertex, v1: Vertex): void {
    v0.adjacent.push(v1);
    v1.adjacent.push(v0);
}

export class Scaffold {
    public readonly vertices: Vertex[] = [];

    constructor(public readonly frequency: number) {
        VERTEX.forEach(location => this.vertexAt(location));
        if (frequency === 1) {
            EDGE.forEach(edge => {
                const v0 = this.vertices[edge[0]];
                const v1 = this.vertices[edge[1]];
                adjacent(v0, v1);
            });
        } else if (frequency === 2) {
            const midVertices = EDGE.map(edge => {
                const v0 = this.vertices[edge[0]];
                const v1 = this.vertices[edge[1]];
                const midEdge = this.vertexBetween(v0, v1);
                adjacent(v0, midEdge);
                adjacent(midEdge, v1);
                return midEdge;
            });
            FACE_EDGE.forEach(faceEdge => {
                const side0 = midVertices[Math.abs(faceEdge[0])];
                const side1 = midVertices[Math.abs(faceEdge[1])];
                const side2 = midVertices[Math.abs(faceEdge[2])];
                adjacent(side0, side1);
                adjacent(side1, side2);
                adjacent(side2, side0);
            });
        } else {
            const many = this.buildEdges();
            this.buildFaces(many);
        }
    }

    private buildEdges(): Vertex[][] {
        const edgePoints: Vertex[][] = [];
        EDGE.forEach(edge => {
            const edgeVertexRows: Vertex[] = [];
            edgePoints.push(edgeVertexRows);
            let vertex: Vertex | undefined = undefined;
            let previousVertex: Vertex | undefined = undefined;
            for (let walk = 0; walk < this.frequency - 1; walk++) {
                previousVertex = vertex;
                const v0 = this.vertices[edge[0]];
                const v1 = this.vertices[edge[1]];
                const loc0 = v0.location;
                const loc1 = v1.location;
                const spot = new Vector3().lerpVectors(loc0, loc1, (walk + 1) / this.frequency);
                vertex = this.vertexAt(spot);
                edgeVertexRows.push(vertex);
                if (previousVertex) {
                    adjacent(vertex, previousVertex);
                    if (walk === this.frequency - 2) {
                        adjacent(vertex, v1);
                    }
                } else {
                    adjacent(vertex, v0);
                }
            }
        });
        PENTA.forEach(penta => {
            for (let walk = 0; walk < penta.length; walk++) {
                const next = (walk + 1) % penta.length;
                const walkBead = penta[walk][1] === 1 ? 0 : this.frequency - 2;
                const nextBead = penta[next][1] === 1 ? 0 : this.frequency - 2;
                const currentVertex = edgePoints[penta[walk][0]][walkBead];
                const nextVertex = edgePoints[penta[next][0]][nextBead];
                adjacent(currentVertex, nextVertex);
            }
        });
        return edgePoints;
    }

    private buildFaces(vertices: Vertex[][]): void {
        const v: Vertex[][] = [];
        for (let walk = 0; walk < this.frequency - 2; walk++) {
            v.push([]);
        }
        const vectorA = new Vector3();
        const vectorB = new Vector3();
        for (let walkF = 0; walkF < FACE.length; walkF++) {
            const v0 = this.vertices[FACE[walkF][0]];
            const origin = v0.location;
            for (let walkA = 1; walkA < this.frequency - 1; walkA++) {
                const v1 = this.vertices[FACE[walkF][1]];
                vectorA.lerpVectors(origin, v1.location, walkA / this.frequency);
                vectorA.sub(origin);
                v[walkA - 1] = [];
                for (let walkB = 1; walkB < this.frequency - walkA; walkB++) {
                    const v2 = this.vertices[FACE[walkF][2]];
                    vectorB.lerpVectors(origin, v2.location, walkB / this.frequency);
                    vectorB.sub(origin);
                    const spot = new Vector3().copy(origin);
                    spot.add(vectorA);
                    spot.add(vectorB);
                    v[walkA - 1].push(this.vertexAt(spot));
                }
            }
            for (let walkRow = 0; walkRow < v.length; walkRow++) {
                for (let walk = 0; walk < v[walkRow].length; walk++) {
                    if (walk < v[walkRow].length - 1) {
                        adjacent(v[walkRow][walk], v[walkRow][walk + 1]);
                    }
                    if (walkRow > 0) {
                        const vert = v[walkRow][walk];
                        adjacent(vert, v[walkRow - 1][walk]);
                        adjacent(vert, v[walkRow - 1][walk + 1]);
                    }
                }
            }
            const vv0: Vertex[] = [];
            const vv1: Vertex[] = [];
            const vv2: Vertex[] = [];
            for (let walk = 0; walk < this.frequency - 2; walk++) {
                const antiWalk = v.length - walk - 1;
                vv0.push(v[FACE_EDGE[walkF][0] >= 0 ? walk : antiWalk][0]);
                const ee = v[(FACE_EDGE[walkF][1] < 0) ? walk : antiWalk];
                vv1.push(ee[ee.length - 1]);
                vv2.push(v[0][(FACE_EDGE[walkF][2] < 0) ? walk : antiWalk]);
            }
            const vs: Vertex[] [] = [];
            vs.push(vv0);
            vs.push(vv1);
            vs.push(vv2);
            for (let walkSide = 0; walkSide < vs.length; walkSide++) {
                const edge = vertices[Math.abs(FACE_EDGE[walkF][walkSide])];
                for (let walk = 0; walk < v.length; walk++) {
                    const vsVertex = vs[walkSide][walk];
                    adjacent(vsVertex, edge[walk]);
                    adjacent(vsVertex, edge[walk + 1]);
                }
            }
        }
    }

    private vertexBetween(v0: Vertex, v1: Vertex): Vertex {
        const location = new Vector3().copy(v0.location).lerp(v1.location, 0.5);
        return this.vertexAt(location);
    }

    private vertexAt(location: Vector3): Vertex {
        const vertex = {location, adjacent: []};
        this.vertices.push(vertex);
        return vertex;
    }
}

const NUL = 0.0;
const ONE = 0.5257311121191336;
const PHI = 0.8506508083520400;

const VERTEX: Vector3[] = [
    new Vector3(+ONE, NUL, +PHI), new Vector3(+ONE, NUL, -PHI),
    new Vector3(+PHI, +ONE, NUL), new Vector3(-PHI, +ONE, NUL),
    new Vector3(NUL, +PHI, +ONE), new Vector3(NUL, -PHI, +ONE),
    new Vector3(-ONE, NUL, -PHI), new Vector3(-ONE, NUL, +PHI),
    new Vector3(-PHI, -ONE, NUL), new Vector3(+PHI, -ONE, NUL),
    new Vector3(NUL, -PHI, -ONE), new Vector3(NUL, +PHI, -ONE),
];

const EDGE = [
    [0, 2], [0, 4], [0, 5], [0, 7], [0, 9],
    [1, 10], [1, 11], [1, 2], [1, 6], [1, 9],
    [2, 11], [2, 4], [2, 9], [3, 11], [3, 4],
    [3, 6], [3, 7], [3, 8], [4, 11], [4, 7],
    [5, 10], [5, 7], [5, 8], [5, 9], [6, 10],
    [6, 11], [6, 8], [7, 8], [8, 10], [9, 10],
];

const FACE = [
    [0, 2, 4], [0, 2, 9], [0, 4, 7], [0, 5, 7], [0, 5, 9],
    [1, 2, 11], [1, 2, 9], [1, 6, 10], [1, 6, 11], [1, 9, 10],
    [2, 4, 11], [3, 4, 11], [3, 4, 7], [3, 6, 11], [3, 6, 8],
    [3, 7, 8], [5, 7, 8], [5, 8, 10], [5, 9, 10], [6, 8, 10],
];

const FACE_EDGE = [
    [0, 11, -1], [0, 12, -4], [1, 19, -3], [2, 21, -3], [2, 23, -4],
    [7, 10, -6], [7, 12, -9], [8, 24, -5], [8, 25, -6], [9, 29, -5],
    [11, 18, -10], [14, 18, -13], [14, 19, -16], [15, 25, -13], [15, 26, -17],
    [16, 27, -17], [21, 27, -22], [22, 28, -20], [23, 29, -20], [26, 28, -24],
];

const PENTA = [
    [[0, 1], [1, 1], [3, 1], [2, 1], [4, 1]],
    [[7, 1], [6, 1], [8, 1], [5, 1], [9, 1]],
    [[10, 1], [11, 1], [0, -1], [12, 1], [7, -1]],
    [[14, 1], [13, 1], [15, 1], [17, 1], [16, 1]],
    [[18, 1], [11, -1], [1, -1], [19, 1], [14, -1]],
    [[21, 1], [22, 1], [20, 1], [23, 1], [2, -1]],
    [[26, 1], [24, 1], [8, -1], [25, 1], [15, -1]],
    [[27, 1], [16, -1], [19, -1], [3, -1], [21, -1]],
    [[28, 1], [22, -1], [27, -1], [17, -1], [26, -1]],
    [[4, -1], [23, -1], [29, 1], [9, -1], [12, -1]],
    [[28, -1], [20, -1], [29, -1], [5, -1], [24, -1]],
    [[6, -1], [10, -1], [18, -1], [13, -1], [25, -1]],
];
