/*
 * Copyright (c) 2021. BURO Civiel, Rotterdam, Netherlands
 * Licensed under GNU GENERAL PUBLIC LICENSE Version 3.
 */

import {OrbitControls, PerspectiveCamera} from "@react-three/drei"
import {Canvas} from "@react-three/fiber"
import "bootstrap/dist/css/bootstrap.min.css"
import * as React from "react"
import {useEffect, useState} from "react"
import {Button} from "reactstrap"

import "./App.css"
import {daVinci, daVinciOutput, degreesToRadians} from "./DaVinci"
import {DaVinciSpec, SpecEditor} from "./DaVinciSpec"
import {saveCSVZip} from "./Download"
import {BarBox, BoltCylinder} from "./Parts"
import {Chirality, Scaffold} from "./Scaffold"

const INITIAL_RENDER_SPEC: DaVinciSpec = {
    frequency: 2,
    degrees: 30,
    radius: 7,
    boltWidth: 0.05,
    barWidth: 0.3,
    barHeight: 0.02,
    barExtension: 0.3,
    boltExtension: 0.2,
}
const chiralityFromSpec = ({degrees}: DaVinciSpec) => degrees > 0 ? Chirality.Right : Chirality.Left

function App(): JSX.Element {
    const [renderSpec, setRenderSpec] = useState(INITIAL_RENDER_SPEC)
    const [scaffold, setScaffold] = useState(new Scaffold(renderSpec.frequency, renderSpec.radius, chiralityFromSpec(renderSpec)))
    const [davinciResult, setDavinciResult] = useState(daVinci(scaffold, degreesToRadians(renderSpec.degrees)))
    const [version, setVersion] = useState(0)
    useEffect(() => {
        const {frequency, radius, degrees} = renderSpec
        const radians = Math.abs(degreesToRadians(degrees))
        const freshScaffold = new Scaffold(frequency, radius, chiralityFromSpec(renderSpec))
        setScaffold(freshScaffold)
        setDavinciResult(daVinci(freshScaffold, radians))
        setVersion(v => v + 1)
    }, [renderSpec])
    return (
        <div className="App">
            <div className="bottom-left">
                <Button
                    onClick={() => saveCSVZip(daVinciOutput(davinciResult.bars, davinciResult.bolts, davinciResult.joints))}>
                    Download
                </Button>

            </div>
            <SpecEditor spec={renderSpec} setSpec={spec => setRenderSpec(spec)}/>
            <Canvas className="Canvas">
                <ambientLight intensity={0.05}/>
                <mesh onDoubleClick={event => {
                    const face = event.face
                    if (!face) {
                        return
                    }
                    const position = face.normal.multiplyScalar(event.camera.position.length())
                    event.camera.position.copy(position)
                }}>
                    <boxGeometry args={[1, 1, 1]}/>
                    <meshStandardMaterial transparent={true} opacity={0.8} color="orange"/>
                </mesh>
                {davinciResult.bars.map((bar, index) => (
                    <BarBox key={`bar-${version}-#${index}`} bar={bar} renderSpec={renderSpec}/>
                ))}
                {davinciResult.bolts.map((bolt, index) => (
                    <BoltCylinder key={`bolt-${version}-#${index}`} bolt={bolt} renderSpec={renderSpec}/>
                ))}
                <PerspectiveCamera makeDefault={true} position={[renderSpec.radius * 3, 0, 0]}>
                    <pointLight position={[0, 10 * renderSpec.radius, 0]} color="white"/>
                </PerspectiveCamera>
                <OrbitControls/>
            </Canvas>
        </div>
    )
}

export default App
