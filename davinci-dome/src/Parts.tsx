import {Euler, Matrix4, Quaternion, Vector3} from "three";
import {Bar, Bolt} from "./Davinci";

export function Box({position}: {
    position: Vector3,
}) {
    return (
        <mesh position={position}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color="red"/>
        </mesh>
    )
}

export function Ball({position, radius}: {
    position: Vector3,
    radius: number,
}) {
    return (
        <mesh position={position}>
            <sphereGeometry args={[radius, 32, 16]}/>
            <meshPhongMaterial color="green"/>
        </mesh>
    )
}

export function BarLines({bars}: { bars: Bar[] }) {
    const array = new Float32Array(bars.length * 6)
    let index = 0
    bars.forEach(({pointA, pointD}) => {
        array[index++] = pointA.x
        array[index++] = pointA.y
        array[index++] = pointA.z
        array[index++] = pointD.x
        array[index++] = pointD.y
        array[index++] = pointD.z
    })
    return (
        <lineSegments>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attachObject={["attributes", "position"]}
                    array={array}
                    count={bars.length * 2}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial attach="material" color="white"/>
        </lineSegments>
    )
}

export function BoltLines({bolts}: { bolts: Bolt[] }) {
    const array = new Float32Array(bolts.length * 6)
    let index = 0
    bolts.forEach(({pointA, pointB}) => {
        array[index++] = pointA.x
        array[index++] = pointA.y
        array[index++] = pointA.z
        array[index++] = pointB.x
        array[index++] = pointB.y
        array[index++] = pointB.z
    })
    return (
        <lineSegments>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attachObject={["attributes", "position"]}
                    array={array}
                    count={bolts.length * 2}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial attach="material" color="red"/>
        </lineSegments>
    )
}

const BOLT_WIDTH = 0.05
const BAR_WIDTH = 0.3
const BAR_HEIGHT = 0.02
const UP = new Vector3(0, 1, 0)
const DOWN = new Vector3(0, -1, 0)

export function BarBox({bar}: { bar: Bar }) {
    const length = bar.pointA.distanceTo(bar.pointD)
    const unit = new Vector3().subVectors(bar.pointD, bar.pointA).normalize()
    const midpoint = new Vector3().lerpVectors(bar.pointA, bar.pointD, 0.5)
    const tangent = new Vector3().crossVectors(midpoint, unit).normalize()
    const basis = new Matrix4()
        .makeBasis(new Vector3().copy(midpoint).normalize(), unit, tangent)
        .setPosition(midpoint)
        .scale(new Vector3(BAR_HEIGHT, length + BOLT_WIDTH * 6, BAR_WIDTH))
    return (
        <mesh matrix={basis} matrixAutoUpdate={false}>
            <boxBufferGeometry attach="geometry"/>
            <meshLambertMaterial attach="material" color="grey"/>
        </mesh>
    )
}

export function BoltCylinder({bolt}: { bolt: Bolt }) {
    const length = bolt.pointA.distanceTo(bolt.pointB)
    const unit = new Vector3().subVectors(bolt.pointB, bolt.pointA).normalize()
    const position = new Vector3().lerpVectors(bolt.pointA, bolt.pointB, 0.5)
    const scale = new Vector3(BOLT_WIDTH, length + BAR_HEIGHT * 8, BOLT_WIDTH)
    const dot = UP.dot(unit)
    const rotation = new Euler().setFromQuaternion(new Quaternion().setFromUnitVectors(dot > 0 ? UP : DOWN, unit))
    return (
        <mesh scale={scale} rotation={rotation} position={position}>
            <cylinderBufferGeometry attach="geometry" args={[1, 1, 1]}/>
            <meshBasicMaterial attach="material" color="yellow"/>
        </mesh>
    )
}