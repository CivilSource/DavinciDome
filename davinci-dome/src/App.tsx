import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Canvas} from "@react-three/fiber"
import {OrbitControls, PerspectiveCamera} from "@react-three/drei"
import {Vector3} from 'three'
import {Chirality, Scaffold} from './Scaffold'
import {davinci, degreesToRadians, Interval} from "./Davinci"
import {Button, ButtonGroup, Input, InputGroup, InputGroupText} from "reactstrap"
import {useEffect, useState} from "react"

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

const FREQUENCIES = [1, 2, 3, 4, 5, 10, 15, 20]
const DEGREES = 10
const RADIUS = 7
const CHIRALITY = Chirality.Left

function App() {
    const [chirality, setChirality] = useState(CHIRALITY)
    const [frequency, setFrequency] = useState(2)
    const [degrees, setDegrees] = useState(DEGREES)
    const [radians, setRadians] = useState(degreesToRadians(DEGREES))
    const [scaffold, setScaffold] = useState(new Scaffold(frequency, RADIUS, CHIRALITY))
    const [intervals, setIntervals] = useState(davinci(scaffold, radians))
    useEffect(() => {
        console.log(`frequency is ${frequency}`)
        setScaffold(new Scaffold(frequency, RADIUS, chirality))
    }, [frequency, chirality])
    useEffect(() => {
        console.log(`angle is ${radians}`)
        setIntervals(davinci(scaffold, radians))
    }, [radians, scaffold])
    return (
        <div className="App">
            <div className="top-left">
                <ButtonGroup>
                    {FREQUENCIES.map(f => {
                        return (
                            <Button color={f === frequency ? "success" : "secondary"} onClick={() => setFrequency(f)}>
                                {f}
                            </Button>
                        )
                    })}
                </ButtonGroup>
                <br/>
                <InputGroup>
                    <InputGroupText>
                        Degrees
                    </InputGroupText>
                    <Input
                        value={degrees}
                        onChange={event => {
                            const v = event.target.value
                            console.log(`v is ${v}`)
                            setDegrees(parseInt(v))
                        }}
                    />
                    <Button onClick={() => {
                        setRadians(degreesToRadians(degrees))
                    }}>
                        go!
                    </Button>
                </InputGroup>

                <br/>
                <ButtonGroup>
                    <Button color={chirality === Chirality.Left ? "success" : "secondary"}
                            onClick={() => setChirality(Chirality.Left)}>
                        Left
                    </Button>
                    <Button color={chirality === Chirality.Right ? "success" : "secondary"}
                            onClick={() => setChirality(Chirality.Right)}>
                        Right
                    </Button>
                </ButtonGroup>
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
