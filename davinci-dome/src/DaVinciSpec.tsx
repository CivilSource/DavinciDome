/*
 * Copyright (c) 2021. BURO Civiel, Rotterdam, Netherlands
 * Licensed under GNU GENERAL PUBLIC LICENSE Version 3.
 */

import * as React from "react"
import {useState} from "react"
import {Button, Form, FormGroup, Input, Label} from "reactstrap"

const MILLIS = 1000

export interface DaVinciSpec {
    frequency: number
    degrees: number
    radius: number
    boltWidth: number
    barWidth: number
    barHeight: number
    barExtension: number
    boltExtension: number
    planeHeight: number
}

export function SpecEditor({spec, setSpec, saveCSV}: {
    spec: DaVinciSpec,
    setSpec: (spec: DaVinciSpec) => void,
    saveCSV: () => void,
}): JSX.Element {
    const [frequency, setFrequency] = useState(spec.frequency.toString())
    const [degrees, setDegrees] = useState(spec.degrees.toString())
    const [radius, setRadius] = useState(spec.radius.toString())
    const [boltWidth, setBoltWidth] = useState((spec.boltWidth * MILLIS).toString())
    const [barWidth, setBarWidth] = useState((spec.barWidth * MILLIS).toString())
    const [barHeight, setBarHeight] = useState((spec.barHeight * MILLIS).toString())
    const [barExtension, setBarExtension] = useState((spec.barExtension * MILLIS).toString())
    const [boltExtension, setBoltExtension] = useState((spec.boltExtension * MILLIS).toString())
    const [planeHeight, setPlaneHeight] = useState((spec.planeHeight).toString())

    function handleSubmit(): void {
        const daVinciSpec: DaVinciSpec = {
            frequency: parseInt(frequency, 10),
            degrees: parseFloat(degrees),
            radius: parseFloat(radius),
            boltWidth: parseFloat(boltWidth) / MILLIS,
            barWidth: parseFloat(barWidth) / MILLIS,
            barHeight: parseFloat(barHeight) / MILLIS,
            barExtension: parseFloat(barExtension) / MILLIS,
            boltExtension: parseFloat(boltExtension) / MILLIS,
            planeHeight: parseFloat(planeHeight),
        }
        if (!(!isFrequencyValid(frequency) || !isDegreesValid(degrees) || isNaN(daVinciSpec.radius) ||
            isNaN(daVinciSpec.boltWidth) || isNaN(daVinciSpec.barWidth) || isNaN(daVinciSpec.barHeight)
            || isNaN(daVinciSpec.barExtension) || isNaN(daVinciSpec.boltExtension) || isNaN(daVinciSpec.planeHeight))) {
            setSpec(daVinciSpec)
        }
    }

    function isFrequencyValid(value: string): boolean {
        const f = parseInt(value, 10)
        if (isNaN(f)) {
            return false
        }
        return f <= 10 && f > 0
    }

    function isDegreesValid(value: string): boolean {
        const f = parseInt(value, 10)
        if (isNaN(f)) {
            return false
        }
        return f <= 90 && f >= -90
    }

    return (
        <Form onSubmit={event => {
            event.preventDefault()
            handleSubmit()
        }} className="spec-editor">
            <h3 className="w-100 text-center"><a target="_BLANK" href="https://github.com/CivilSource/DavinciDome">Da
                Vinci Dome</a></h3>
            <hr/>
            <FormGroup>
                <Label for="frequency">Frequency [1..10]</Label>
                <Input id="frequency"
                       value={frequency}
                       valid={isFrequencyValid(frequency)}
                       invalid={!isFrequencyValid(frequency)}
                       onChange={({target}) => setFrequency(target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="degrees">Rotation [deg]</Label>
                <Input id="degrees"
                       value={degrees}
                       valid={isDegreesValid(degrees)}
                       invalid={!isDegreesValid(degrees)}
                       onChange={({target}) => setDegrees(target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="radius">Radius [m]</Label>
                <Input id="radius"
                       value={radius}
                       valid={!isNaN(parseFloat(radius))}
                       invalid={isNaN(parseFloat(radius))}
                       onChange={({target}) => setRadius(target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="boltWidth">Bolt Diam [mm]</Label>
                <Input id="boltWidth"
                       value={boltWidth}
                       valid={!isNaN(parseFloat(boltWidth))}
                       invalid={isNaN(parseFloat(boltWidth))}
                       onChange={({target}) => setBoltWidth(target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="barWidth">Bar Width [mm]</Label>
                <Input id="barWidth"
                       value={barWidth}
                       valid={!isNaN(parseFloat(barWidth))}
                       invalid={isNaN(parseFloat(barWidth))}
                       onChange={({target}) => setBarWidth(target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="barHeight">Bar Height [mm]</Label>
                <Input id="barHeight"
                       value={barHeight}
                       valid={!isNaN(parseFloat(barHeight))}
                       invalid={isNaN(parseFloat(barHeight))}
                       onChange={({target}) => setBarHeight(target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="boltExtension">Bolt Extra [mm]</Label>
                <Input id="boltExtension"
                       value={boltExtension}
                       valid={!isNaN(parseFloat(boltExtension))}
                       invalid={isNaN(parseFloat(boltExtension))}
                       onChange={({target}) => setBoltExtension(target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="barExtension">Bar Extra [mm]</Label>
                <Input id="barExtension"
                       value={barExtension}
                       valid={!isNaN(parseFloat(barExtension))}
                       invalid={isNaN(parseFloat(barExtension))}
                       onChange={({target}) => setBarExtension(target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="planeHeight">Plane Height [m]</Label>
                <Input id="planeHeight"
                       value={planeHeight}
                       valid={!isNaN(parseFloat(planeHeight))}
                       invalid={isNaN(parseFloat(planeHeight))}
                       onChange={({target}) => setPlaneHeight(target.value)}/>
            </FormGroup>
            <hr/>
            <Button color="success" className="w-100 my-1" type="submit">Regenerate</Button>
            <Button color="info" className="w-100" onClick={saveCSV}>Download</Button>
        </Form>
    )
}
