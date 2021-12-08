import * as React from "react"
import {useState} from "react"
import {Button, Form, FormGroup, Input, Label} from "reactstrap"

export interface DaVinciSpec {
    frequency: number
    degrees: number
    radius: number
    boltWidth: number
    barWidth: number
    barHeight: number
    barExtension: number
    boltExtension: number
}

export function SpecEditor({spec, setSpec}: { spec: DaVinciSpec, setSpec: (spec: DaVinciSpec) => void }): JSX.Element {
    const [frequency, setFrequency] = useState(spec.frequency.toString())
    const [degrees, setDegrees] = useState(spec.degrees.toString())
    const [radius, setRadius] = useState(spec.radius.toString())
    const [boltWidth, setBoltWidth] = useState(spec.boltWidth.toString())
    const [barWidth, setBarWidth] = useState(spec.barWidth.toString())
    const [barHeight, setBarHeight] = useState(spec.barHeight.toString())
    const [barExtension, setBarExtension] = useState(spec.barExtension.toString())
    const [boltExtension, setBoltExtension] = useState(spec.boltExtension.toString())

    function handleSubmit(): void {
        const daVinciSpec: DaVinciSpec = {
            frequency: parseInt(frequency, 10),
            degrees: parseFloat(degrees),
            radius: parseFloat(radius),
            boltWidth: parseFloat(boltWidth),
            barWidth: parseFloat(barWidth),
            barHeight: parseFloat(barHeight),
            barExtension: parseFloat(barExtension),
            boltExtension: parseFloat(boltExtension),
        }
        if (!(!isFrequencyValid(frequency) || isNaN(daVinciSpec.degrees) || isNaN(daVinciSpec.radius) ||
            isNaN(daVinciSpec.boltWidth) || isNaN(daVinciSpec.barWidth) || isNaN(daVinciSpec.barHeight)
            || isNaN(daVinciSpec.barExtension) || isNaN(daVinciSpec.boltExtension))) {
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

    return (
        <Form onSubmit={event => {
            event.preventDefault()
            handleSubmit()
        }} className="top-left bg-light">
            <FormGroup>
                <h3>Da Vinci Generator</h3>
            </FormGroup>
            <FormGroup>
                <Label for="frequency">Frequency (1-10)</Label>
                <Input id="frequency"
                       value={frequency}
                       valid={isFrequencyValid(frequency)}
                       invalid={!isFrequencyValid(frequency)}
                       onChange={({target}) => setFrequency(target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="degrees">Degrees</Label>
                <Input id="degrees"
                       value={degrees}
                       valid={!isNaN(parseFloat(degrees))}
                       invalid={isNaN(parseFloat(degrees))}
                       onChange={({target}) => setDegrees(target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="radius">Radius</Label>
                <Input id="radius"
                       value={radius}
                       valid={!isNaN(parseFloat(radius))}
                       invalid={isNaN(parseFloat(radius))}
                       onChange={({target}) => setRadius(target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="boltWidth">Bolt Width</Label>
                <Input id="boltWidth"
                       value={boltWidth}
                       valid={!isNaN(parseFloat(boltWidth))}
                       invalid={isNaN(parseFloat(boltWidth))}
                       onChange={({target}) => setBoltWidth(target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="barWidth">Bar Width</Label>
                <Input id="barWidth"
                       value={barWidth}
                       valid={!isNaN(parseFloat(barWidth))}
                       invalid={isNaN(parseFloat(barWidth))}
                       onChange={({target}) => setBarWidth(target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="barHeight">Bar Height</Label>
                <Input id="barHeight"
                       value={barHeight}
                       valid={!isNaN(parseFloat(barHeight))}
                       invalid={isNaN(parseFloat(barHeight))}
                       onChange={({target}) => setBarHeight(target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="boltExtension">Bolt Extension</Label>
                <Input id="boltExtension"
                       value={boltExtension}
                       valid={!isNaN(parseFloat(boltExtension))}
                       invalid={isNaN(parseFloat(boltExtension))}
                       onChange={({target}) => setBoltExtension(target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="barExtension">Bar Extension</Label>
                <Input id="barExtension"
                       value={barExtension}
                       valid={!isNaN(parseFloat(barExtension))}
                       invalid={isNaN(parseFloat(barExtension))}
                       onChange={({target}) => setBarExtension(target.value)}/>
            </FormGroup>
            <hr/>
            <FormGroup>
                <Button className="w-100" type="submit">Generate</Button>
            </FormGroup>
        </Form>
    )
}
