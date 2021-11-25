import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useState} from "react";

export interface DavinciSpec {
    frequency: number
    degrees: number
    radius: number
    boltWidth: number
    barWidth: number
    barHeight: number
    barExtension: number
    boltExtension: number
}

export function DavinciSpecEditor({spec, setSpec}: { spec: DavinciSpec, setSpec: (spec: DavinciSpec) => void }) {
    const [frequency, setFrequency] = useState(spec.frequency.toString())
    const [degrees, setDegrees] = useState(spec.degrees.toString())
    const [radius, setRadius] = useState(spec.radius.toString())
    const [boltWidth, setBoltWidth] = useState(spec.boltWidth.toString())
    const [barWidth, setBarWidth] = useState(spec.barWidth.toString())
    const [barHeight, setBarHeight] = useState(spec.barHeight.toString())
    const [barExtension, setBarExtension] = useState(spec.barExtension.toString())
    const [boltExtension, setBoltExtension] = useState(spec.boltExtension.toString())

    function handleSubmit() {
        const spec: DavinciSpec = {
            frequency: parseInt(frequency, 10),
            degrees: parseFloat(degrees),
            radius: parseFloat(radius),
            boltWidth: parseFloat(boltWidth),
            barWidth: parseFloat(barWidth),
            barHeight: parseFloat(barHeight),
            barExtension: parseFloat(barExtension),
            boltExtension: parseFloat(boltExtension)
        }
        if (!(isNaN(spec.frequency) || isNaN(spec.degrees) || isNaN(spec.radius) ||
            isNaN(spec.boltWidth) || isNaN(spec.barWidth) || isNaN(spec.barHeight)
            || isNaN(spec.barExtension) || isNaN(spec.boltExtension))) {
            setSpec(spec)
        }
    }

    return (
        <Form onSubmit={event => {
            event.preventDefault()
            handleSubmit()
        }} className="top-left bg-light">
            <FormGroup>
                <h3>Davinci Generator</h3>
            </FormGroup>
            <FormGroup>
                <Label for="frequency">Frequency (not yet used)</Label>
                <Input id="frequency"
                       value={frequency}
                       valid={!isNaN(parseInt(frequency))}
                       invalid={isNaN(parseInt(frequency))}
                       onChange={({target}) => setFrequency(target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="degrees">Degrees (not yet used)</Label>
                <Input id="degrees"
                       value={degrees}
                       valid={!isNaN(parseFloat(degrees))}
                       invalid={isNaN(parseFloat(degrees))}
                       onChange={({target}) => setDegrees(target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="radius">Radius (not yet used)</Label>
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
                <Button  className="w-100" type="submit">Generate</Button>
            </FormGroup>
        </Form>
    )
}