import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Canvas} from "@react-three/fiber"
import {OrbitControls, PerspectiveCamera} from "@react-three/drei"
import {Vector3} from 'three'
import {Chirality, Scaffold} from './Scaffold'
import {Bar, Bolt, davinci, davinciOutput, DavinciResult, degreesToRadians, RenderInterval} from "./Davinci"
import {Button, ButtonGroup, Input, InputGroup, InputGroupText} from "reactstrap"
import {useEffect, useState} from "react"
import {saveCSVZip} from "./Download"

function Box({position}: {
    position: Vector3,
}) {
    return (
        <mesh position={position}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color="red"/>
        </mesh>
    )
}

function Ball({position, radius}: {
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

function BarLines({bars}: { bars: Bar[] }) {
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

function BoltLines({bolts}: { bolts: Bolt[] }) {
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

const FREQUENCIES = [1, 2, 3, 4, 5, 10, 15, 20]
const DEGREES = 10
const RADIUS = 7
const CHIRALITY = Chirality.Left
const BALLRADIUS = RADIUS / 100

function App() {
    const [ballRadius, setBallRadius] = useState(BALLRADIUS)
    const [chirality, setChirality] = useState(CHIRALITY)
    const [frequency, setFrequency] = useState(2)
    const [degrees, setDegrees] = useState(DEGREES)
    const [radius, setRadius] = useState(RADIUS)
    const [radiusInput, setRadiusInput] = useState(radius)
    const [radians, setRadians] = useState(degreesToRadians(DEGREES))
    const [scaffold, setScaffold] = useState(new Scaffold(frequency, radius, CHIRALITY))
    const [davinciResult, setDavinciResult] = useState(davinci(scaffold, radians))
    const [version, setVersion] = useState(0)
    useEffect(() => {
        const freshScaffold = new Scaffold(frequency, radius, chirality)
        setScaffold(freshScaffold)
        setDavinciResult(davinci(freshScaffold, radians))
        setBallRadius(radius / 100)
        setVersion(version => version + 1)
    }, [frequency, radians, radius, chirality])
    return (
        <div className="App">
            <div className="bottom-left">
                <Button onClick={() => saveCSVZip(davinciOutput(davinciResult.bars, []))}>
                    Download
                </Button>

            </div>

            <div className="top-left">
                <ButtonGroup>
                    {FREQUENCIES.map(f => {
                        return (
                            <Button key={`frequency-${f}`} color={f === frequency ? "success" : "secondary"}
                                    onClick={() => setFrequency(f)}>
                                {f}
                            </Button>
                        )
                    })}
                </ButtonGroup>
                <br/>
                <InputGroup>
                    <InputGroupText>
                        Radius
                    </InputGroupText>
                    <Input
                        value={radiusInput}
                        onChange={event => {
                            const v = event.target.value
                            console.log(`v is ${v}`)
                            setRadiusInput(parseInt(v))
                        }}
                    />
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
                        setRadius(radiusInput)
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
                    return <Ball key={`vertex-${version}-${index}`} position={location} radius={ballRadius}/>
                })}
                <BarLines key={`bars-${version}`} bars={davinciResult.bars}/>
                <BoltLines key={`bolts-${version}`} bolts={davinciResult.bolts}/>
                <PerspectiveCamera makeDefault={true} position={[radius * 3, 1, 2]}/>
                <OrbitControls/>
            </Canvas>
        </div>
    )
}

export default App
