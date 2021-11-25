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
import {Ball, BarBox, BoltCylinder, Box} from "./Parts";
import {DavinciSpec, DavinciSpecEditor} from "./DavinciSpecEditor";

const FREQUENCIES = [1, 2, 3, 4, 5, 10, 15]
const INITIAL_DEGREES = 30
const INITIAL_CHIRALITY = Chirality.Left
const INITIAL_RENDER_SPEC: DavinciSpec = {
    frequency: 2,
    degrees: 30,
    radius: 7,
    boltWidth: 0.05,
    barWidth: 0.3,
    barHeight: 0.02,
    barExtension: 0.3,
    boltExtension: 0.2,
}
const ballRadius = (radius: number) => radius / 100
const chiralityFromSpec = ({degrees}: DavinciSpec) => degrees > 0 ? Chirality.Right : Chirality.Left

function App() {
    const [renderSpec, setRenderSpec] = useState(INITIAL_RENDER_SPEC)
    const [scaffold, setScaffold] = useState(new Scaffold(renderSpec.frequency, renderSpec.radius, chiralityFromSpec(renderSpec)))
    const [davinciResult, setDavinciResult] = useState(davinci(scaffold, degreesToRadians(renderSpec.degrees)))
    const [version, setVersion] = useState(0)
    useEffect(() => {
        const {frequency, radius, degrees} = renderSpec
        const radians = Math.abs(degreesToRadians(degrees))
        const freshScaffold = new Scaffold(frequency, radius, chiralityFromSpec(renderSpec))
        setScaffold(freshScaffold)
        setDavinciResult(davinci(freshScaffold, radians))
        setVersion(version => version + 1)
    }, [renderSpec])
    return (
        <div className="App">
            <div className="bottom-left">
                <Button onClick={() => saveCSVZip(davinciOutput(davinciResult.bars, []))}>
                    Download
                </Button>

            </div>
            <DavinciSpecEditor spec={renderSpec} setSpec={spec => setRenderSpec(spec)}/>
            <Canvas className="Canvas">
                <ambientLight intensity={0.05}/>
                <Box position={new Vector3(0, 0, 0)}/>
                {davinciResult.bars.map((bar, index) => {
                    return <BarBox key={`bar-${version}-#${index}`} bar={bar} renderSpec={renderSpec}/>
                })}
                {davinciResult.bolts.map((bolt, index) => {
                    return <BoltCylinder key={`bolt-${version}-#${index}`} bolt={bolt} renderSpec={renderSpec}/>
                })}
                <PerspectiveCamera makeDefault={true} position={[renderSpec.radius * 3, 0, 0]}>
                    <pointLight position={[0, 10 * renderSpec.radius, 0]} color="white"/>
                </PerspectiveCamera>
                <OrbitControls/>
            </Canvas>
        </div>
    )
}

export default App
