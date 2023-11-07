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

export type MyUtils = {
    toPx(n: number): string
}

export type MyThemepack = {
    readonly utils: MyUtils
    readonly variables: MyThemeVariables
    readonly styles: MyThemeStyles
    readonly images: MyThemeImages
} & Themepack