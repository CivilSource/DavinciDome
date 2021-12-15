/*
 * Copyright (c) 2021. BURO Civiel, Rotterdam, Netherlands
 * Licensed under GNU GENERAL PUBLIC LICENSE Version 3.
 */

import {OrbitControls, PerspectiveCamera} from "@react-three/drei"
import {Canvas} from "@react-three/fiber"
import "bootstrap/dist/css/bootstrap.min.css"
import * as React from "react"
import {useEffect, useState} from "react"
import {Button, Col, Container, Row} from "reactstrap"

import "./App.css"
import {daVinci, daVinciOutput, DaVinciResult, degreesToRadians} from "./DaVinci"
import {DaVinciSpec, SpecDisplay, SpecEditor} from "./DaVinciSpec"
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
    const [size, setSize] = useState([window.innerWidth, window.innerHeight])
    const [renderSpec, setRenderSpec] = useState(INITIAL_RENDER_SPEC)
    const [daVinciResult, setDaVinciResult] = useState<DaVinciResult>(daVinci(
        new Scaffold(renderSpec.frequency, renderSpec.radius, chiralityFromSpec(renderSpec)),
        degreesToRadians(renderSpec.degrees), true,
    ))
    const [version, setVersion] = useState(0)
    useEffect(() => {
        const checkSize = () => setSize([window.innerWidth, window.innerHeight])
        window.addEventListener("resize", checkSize)
        return () => window.removeEventListener("resize", checkSize)
    }, [])
    useEffect(() => {
        const {frequency, radius, degrees} = renderSpec
        const radians = Math.abs(degreesToRadians(degrees))
        setDaVinciResult(daVinci(new Scaffold(frequency, radius, chiralityFromSpec(renderSpec)), radians, true))
        console.log("RENDER_SPEC", renderSpec.radius)
        setVersion(v => v + 1)
    }, [renderSpec])
    return (
        <div className="App" style={{width: size[0], height: size[1]}}>
            <SpecEditor spec={renderSpec} setSpec={spec => setRenderSpec(spec)}
                        saveCSV={() => saveCSVZip(daVinciOutput(daVinciResult))}/>
            <Canvas className="canvas">
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
                {daVinciResult.bars.map((bar, index) => (
                    <BarBox key={`bar-${version}-#${index}`} bar={bar} renderSpec={renderSpec}/>
                ))}
                {daVinciResult.bolts.map((bolt, index) => (
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
