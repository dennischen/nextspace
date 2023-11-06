import { Themepack } from "@nextspace/types"
import { CSSProperties } from "react"

export type MyThemeImages = {
    image1: string
}

export type MyThemeVariables = {
    imageWidth1: number
}

export type MyThemeStyles = {
    innerStyle1: CSSProperties
    className1: string
}

export type MyPayload = {
    toPx(n: number): string
}

export interface MyThemepack extends Themepack<MyThemeVariables, MyThemeStyles, MyThemeImages> {
    payload: MyPayload
}