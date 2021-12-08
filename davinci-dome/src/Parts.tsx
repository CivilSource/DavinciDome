/*
 * Copyright (c) 2021. BURO Civiel, Rotterdam, Netherlands
 * Licensed under GNU GENERAL PUBLIC LICENSE Version 3.
 */

import * as React from "react"
import {Euler, Matrix4, Quaternion, Vector3} from "three"

import {Bar, Bolt} from "./DaVinci"
import {DaVinciSpec} from "./DaVinciSpec"


export function Ball({position, radius}: {
    position: Vector3,
    radius: number,
}): JSX.Element {
    return (
        <mesh position={position}>
            <sphereGeometry args={[radius, 32, 16]}/>
            <meshPhongMaterial color="green"/>
        </mesh>
    )
}

const UP = new Vector3(0, 1, 0)
const DOWN = new Vector3(0, -1, 0)

export function BarBox({bar, renderSpec}: { bar: Bar, renderSpec: DaVinciSpec }): JSX.Element {
    const length = bar.jointA.point.distanceTo(bar.jointD.point)
    const unit = new Vector3().subVectors(bar.jointD.point, bar.jointA.point).normalize()
    const midpoint = new Vector3().lerpVectors(bar.jointA.point, bar.jointD.point, 0.5)
    const tangent = new Vector3().crossVectors(midpoint, unit).normalize()
    const basis = new Matrix4()
        .makeBasis(new Vector3().copy(midpoint).normalize(), unit, tangent)
        .setPosition(midpoint)
        .scale(new Vector3(renderSpec.barHeight, length + renderSpec.barExtension, renderSpec.barWidth))
    return (
        <mesh matrix={basis} matrixAutoUpdate={false}>
            <boxBufferGeometry attach="geometry"/>
            <meshLambertMaterial attach="material" color="white"/>
        </mesh>
    )
}

export function BoltCylinder({bolt, renderSpec}: { bolt: Bolt, renderSpec: DaVinciSpec }): JSX.Element {
    const length = bolt.jointA.point.distanceTo(bolt.jointB.point)
    const unit = new Vector3().subVectors(bolt.jointB.point, bolt.jointA.point).normalize()
    const position = new Vector3().lerpVectors(bolt.jointA.point, bolt.jointB.point, 0.5)
    const scale = new Vector3(renderSpec.boltWidth, length + renderSpec.boltExtension, renderSpec.boltWidth)
    const dot = UP.dot(unit)
    const rotation = new Euler().setFromQuaternion(new Quaternion().setFromUnitVectors(dot > 0 ? UP : DOWN, unit))
    return (
        <mesh scale={scale} rotation={rotation} position={position}>
            <cylinderBufferGeometry attach="geometry" args={[1, 1, 1]}/>
            <meshLambertMaterial attach="material" color="orange"/>
        </mesh>
    )
}
