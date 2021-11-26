import {Euler, Matrix4, Quaternion, Vector3} from "three";
import {Bar, Bolt} from "./Davinci";
import {DavinciSpec} from "./DavinciSpecEditor";

export function Box({position}: {
    position: Vector3,
}) {
    return (
        <mesh position={position}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial transparent={true} opacity={0.8} color="slategray"/>
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

const UP = new Vector3(0, 1, 0)
const DOWN = new Vector3(0, -1, 0)

export function BarBox({bar, renderSpec}: { bar: Bar, renderSpec: DavinciSpec }) {
    const length = bar.pointA.distanceTo(bar.pointD)
    const unit = new Vector3().subVectors(bar.pointD, bar.pointA).normalize()
    const midpoint = new Vector3().lerpVectors(bar.pointA, bar.pointD, 0.5)
    const tangent = new Vector3().crossVectors(midpoint, unit).normalize()
    const basis = new Matrix4()
        .makeBasis(new Vector3().copy(midpoint).normalize(), unit, tangent)
        .setPosition(midpoint)
        .scale(new Vector3(renderSpec.barHeight, length + renderSpec.barExtension, renderSpec.barWidth))
    return (
        <mesh matrix={basis} matrixAutoUpdate={false}>
            <boxBufferGeometry attach="geometry"/>
            <meshLambertMaterial attach="material" color="white"/>
        </mesh>
    )
}

export function BoltCylinder({bolt, renderSpec}: { bolt: Bolt, renderSpec: DavinciSpec }) {
    const length = bolt.pointA.distanceTo(bolt.pointB)
    const unit = new Vector3().subVectors(bolt.pointB, bolt.pointA).normalize()
    const position = new Vector3().lerpVectors(bolt.pointA, bolt.pointB, 0.5)
    const scale = new Vector3(renderSpec.boltWidth, length + renderSpec.boltExtension, renderSpec.boltWidth)
    const dot = UP.dot(unit)
    const rotation = new Euler().setFromQuaternion(new Quaternion().setFromUnitVectors(dot > 0 ? UP : DOWN, unit))
    return (
        <mesh scale={scale} rotation={rotation} position={position}>
            <cylinderBufferGeometry attach="geometry" args={[1, 1, 1]}/>
            <meshLambertMaterial attach="material" color="white"/>
        </mesh>
    )
}