/*
 * Copyright (c) 2021. BURO Civiel, Rotterdam, Netherlands
 * Licensed under GNU GENERAL PUBLIC LICENSE Version 3.
 */

import FileSaver from "file-saver"
import JSZip from "jszip"

import {Joint, JointPosition} from "./DaVinci"

export interface DaVinciInterval {
    nodeIndexes: number[]
    type: string
}

export interface DaVinciOutput {
    joints: Joint[]
    daVinciIntervals: DaVinciInterval[]
}

function extractNodeFile(output: DaVinciOutput): string {
    const rows: string[][] = []
    rows.push(["index", "x", "y", "z"])
    output.joints
        .forEach((joint, index) => rows.push([
            (index + 1).toFixed(0),
            csvNumber(joint.point.x), csvNumber(joint.point.z), csvNumber(joint.point.y),
        ]))
    return rows.map(row => row.join(";")).join("\n")
}

function extractSupportFile(output: DaVinciOutput): string {
    const onSurfaceJoints = output.joints.filter(joint => joint.position === JointPosition.OnSurface)
    return `"joints"\n"=""${onSurfaceJoints.map(joint => joint.index + 1)}"""`
}

function extractIntervalFile(output: DaVinciOutput): string {
    const rows: string[][] = []
    rows.push(["joints", "type"])
    output.daVinciIntervals.forEach((interval, index) => {
        const indexString = interval.nodeIndexes.map(i => i + 1).join(",")
        rows.push([`"=""${indexString}"""`, interval.type])
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

export function saveCSVZip(output: DaVinciOutput): void {
    const zip = new JSZip()
    zip.file("support.csv", extractSupportFile(output))
    zip.file("nodes.csv", extractNodeFile(output))
    zip.file("intervals.csv", extractIntervalFile(output))
    zip.generateAsync({type: "blob", mimeType: "application/zip"}).then(blob => {
        FileSaver.saveAs(blob, `davinci-${dateString()}.zip`)
    })
}
