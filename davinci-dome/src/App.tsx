import './App.css'
import {Canvas} from "@react-three/fiber"
import {OrbitControls, PerspectiveCamera} from "@react-three/drei"
import {Vector3} from 'three'
import {Scaffold} from './Scaffold'
import {davinci, Interval} from "./Davinci"

interface Somewhere {
    position: Vector3;
}

function Box({position}: Somewhere) {
    return (
        <mesh position={position}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color="red"/>
        </mesh>
    )
}

function Ball({position}: Somewhere) {
    return (
        <mesh position={position}>
            <sphereGeometry args={[0.05, 32, 16]}/>
            <meshPhongMaterial color="blue"/>
        </mesh>
    )
}

function IntervalLine({interval}: { interval: Interval }) {
    return (
        <line>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attachObject={["attributes", "position"]}
                    array={new Float32Array([
                        interval.pointA.x,
                        interval.pointA.y,
                        interval.pointA.z,
                        interval.pointB.x,
                        interval.pointB.y,
                        interval.pointB.z,
                    ])}
                    count={2}
                    itemSize={3}
                    onUpdate={self => self.needsUpdate = true}
                />
            </bufferGeometry>
            <lineBasicMaterial attach="material" color="white"/>
        </line>
    )
}

function App() {
    const scaffold = new Scaffold(2, 7)
    const angle = Math.PI * -10 / 180
    const intervals = davinci(scaffold, angle)
    return (
        <div className="App">
            <Canvas className="Canvas">
                <ambientLight/>
                <pointLight position={[10, 10, 10]}/>
                <Box position={new Vector3(0, 0, 0)}/>
                {scaffold.vertices.map(({index, location}) => {
                    return <Ball key={`vertex-${index}`} position={location}/>
                })}
                {intervals.map(interval => {
                    return <IntervalLine key={`interval-${interval.index.toFixed()}`} interval={interval}/>
                })}
                <PerspectiveCamera makeDefault={true} position={[20, 1, 2]}/>
                <OrbitControls/>
            </Canvas>
        </div>
    )
}

export default App
