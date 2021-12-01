import FileSaver from "file-saver"
import JSZip from "jszip"
import {Vector3} from "three"

export interface DavinciInterval {
    type: string
}

export interface DavinciOutput {
    nodes: Vector3[]
    csvIntervals: DavinciInterval[]
}

function extractNodeFile(output: DavinciOutput): string {
    const rows: string[][] = []
    rows.push(["index", "x", "y", "z"])
    output.nodes.forEach((node, index) => rows.push([
        (index + 1).toFixed(0),
        csvNumber(node.x), csvNumber(node.y), csvNumber(node.z),
    ]))
    return rows.map(row => row.join(";")).join("\n")
}

function extractIntervalFile(output: DavinciOutput): string {
    const rows: string[][] = []
    rows.push(["joints", "type"])
    output.csvIntervals.forEach((interval, index) => {
        rows.push([`"=""${index * 2 + 1},${index * 2 + 2}"""`, interval.type])
    })
    return rows.map(row => row.join(";")).join("\n")
}

function csvNumber(n: number): string {
    return n.toFixed(5).replace(/[.]/, ",")
}

function dateString(): string {
    return new Date().toISOString()
        .replace(/[.].*/, "").replace(/[:T_]/g, "-")
}

export function saveCSVZip(output: DavinciOutput): void {
    const zip = new JSZip()
    zip.file("nodes.csv", extractNodeFile(output))
    zip.file("intervals.csv", extractIntervalFile(output))
    zip.generateAsync({type: "blob", mimeType: "application/zip"}).then(blob => {
        FileSaver.saveAs(blob, `davinci-${dateString()}.zip`)
    })
}
