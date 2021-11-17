import './App.css'
import {Canvas} from "@react-three/fiber"
import {OrbitControls, PerspectiveCamera} from "@react-three/drei"
import {Vector3} from 'three'
import {Scaffold} from './Scaffold'
import {davinci, Interval} from "./Davinci"
import {Button} from "reactstrap";
import {useEffect, useState} from "react";

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

const FREQUENCIES = [1, 2, 3, 4, 5,10,15,20]
const ANGLE = Math.PI * -10 / 180
const RADIUS = 7

function App() {
    const [frequency, setFrequency] = useState(2)
    const [scaffold, setScaffold] = useState(new Scaffold(frequency, RADIUS))
    const [intervals, setIntervals] = useState(davinci(scaffold, ANGLE))
    useEffect(() => {
        console.log(`frequency is ${frequency}`)
        const freshScaffold = new Scaffold(frequency, RADIUS);
        setScaffold(freshScaffold)
        setIntervals(davinci(freshScaffold, ANGLE))
    }, [frequency])

    return (
        <div className="App">
            <div className="top-left">
                {FREQUENCIES.map(f => {
                    return (
                        <Button onClick={() => setFrequency(f)}>
                            {f}
                        </Button>
                    )
                })}
            </div>
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
