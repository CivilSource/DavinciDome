import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Canvas} from "@react-three/fiber"
import {OrbitControls, PerspectiveCamera} from "@react-three/drei"
import {Vector3} from 'three'
import {Chirality, Scaffold} from './Scaffold'
import {davinci, davinciOutput, degreesToRadians} from "./Davinci"
import {Button, ButtonGroup, Input, InputGroup, InputGroupText} from "reactstrap"
import {useEffect, useState} from "react"
import {saveCSVZip} from "./Download"
import {Ball, BarBox, BoltCylinder, Box, RenderSpec} from "./Parts";
import {Spec} from "./Spec";

const FREQUENCIES = [1, 2, 3, 4, 5, 10, 15]
const INITIAL_DEGREES = 30
const INITIAL_RADIUS = 7
const INITIAL_CHIRALITY = Chirality.Left
const INITIAL_RENDER_SPEC: RenderSpec = {
    boltWidth: 0.05,
    barWidth: 0.3,
    barHeight: 0.02,
    barExtension: 0.3,
    boltExtension: 0.2,
}
const ballRadius = (radius: number) => radius / 100

function App() {
    const [renderSpec, setRenderSpec] = useState(INITIAL_RENDER_SPEC)
    const [radius, setRadius] = useState(INITIAL_RADIUS)
    const [chirality, setChirality] = useState(INITIAL_CHIRALITY)
    const [frequency, setFrequency] = useState(2)
    const [degrees, setDegrees] = useState(INITIAL_DEGREES)
    const [radiusInput, setRadiusInput] = useState(radius)
    const [radians, setRadians] = useState(degreesToRadians(degrees))
    const [scaffold, setScaffold] = useState(new Scaffold(frequency, radius, chirality))
    const [davinciResult, setDavinciResult] = useState(davinci(scaffold, radians))
    const [version, setVersion] = useState(0)
    useEffect(() => {
        const freshScaffold = new Scaffold(frequency, radius, chirality)
        setScaffold(freshScaffold)
        setDavinciResult(davinci(freshScaffold, radians))
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
            <Spec spec={renderSpec} setSpec={spec => setRenderSpec(spec)}/>
            <Canvas className="Canvas">
                <ambientLight intensity={0.05}/>
                <pointLight position={[radius, radius * 4, radius * 2]} color="white"/>
                <Box position={new Vector3(0, 0, 0)}/>
                {scaffold.vertices.map(({index, location}) => {
                    return <Ball key={`vertex-${version}-${index}`} position={location} radius={ballRadius(radius)}/>
                })}
                {davinciResult.bars.map((bar, index) => {
                    return <BarBox key={`bar-${version}-#${index}`} bar={bar} renderSpec={renderSpec}/>
                })}
                {davinciResult.bolts.map((bolt, index) => {
                    return <BoltCylinder key={`bolt-${version}-#${index}`} bolt={bolt} renderSpec={renderSpec}/>
                })}
                <PerspectiveCamera makeDefault={true} position={[radius * 3, 0, 0]}/>
                <OrbitControls/>
            </Canvas>
        </div>
    )
}

export default App
