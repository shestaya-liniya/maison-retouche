import { Component, JSX } from 'solid-js'

export type Icon = Component<JSX.SvgSVGAttributes<SVGSVGElement>>

export type NoneToVoid = () => void

export type XY = {
  x: number
  y: number
}
