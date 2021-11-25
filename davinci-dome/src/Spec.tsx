import {RenderSpec} from "./Parts";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useState} from "react";

export function Spec({spec, setSpec}: { spec: RenderSpec, setSpec: (spec: RenderSpec) => void }) {
    const [boltWidth, setBoltWidth] = useState(spec.boltWidth.toString())
    const [barWidth, setBarWidth] = useState(spec.barWidth.toString())
    const [barHeight, setBarHeight] = useState(spec.barHeight.toString())
    const [barExtension, setBarExtension] = useState(spec.barExtension.toString())
    const [boltExtension, setBoltExtension] = useState(spec.boltExtension.toString())

    function handleSubmit() {
        const spec: RenderSpec = {
            boltWidth: parseFloat(boltWidth),
            barWidth: parseFloat(barWidth),
            barHeight: parseFloat(barHeight),
            barExtension: parseFloat(barExtension),
            boltExtension: parseFloat(boltExtension)
        }
        if (!(isNaN(spec.boltWidth) || isNaN(spec.barWidth) || isNaN(spec.barHeight)
            || isNaN(spec.barExtension) || isNaN(spec.boltExtension))) {
            setSpec(spec)
        }
    }

    return (
        <Form onSubmit={event => {
            event.preventDefault()
            handleSubmit()
        }} className="top-right bg-light">
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
            <FormGroup className="float-end">
                <Button type="submit">Go!</Button>
            </FormGroup>
        </Form>
    )
}