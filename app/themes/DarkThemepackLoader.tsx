'use client'
/*
 * @file-created: 2023-11-06
 * @author: Dennis Chen
 */
import ThemepackRegister from "@nextspace/components/ThemepackRegister"
import { ThemepackLoaderProps } from "@nextspace/components/themepackLoader"

import { MyThemepack } from "@/types"
import darkStyles from './dark.module.scss'
import darkImage from './dark.png'
import { payload } from "./payload"

const themepack: MyThemepack = {
    theme: "dark",
    dark: true,
    styles: {
        className1: darkStyles.outer,
        innerStyle1: {
            backgroundColor: '#ffffff',
            color: '#000000'
        }
    },
    variables: {
        imageWidth1: 334,
    },
    images: {
        image1: darkImage.src
    },
    payload: payload
}
export default function ThemepackLoader({ theme, children }: ThemepackLoaderProps) {
    return <ThemepackRegister theme={theme} themepack={themepack} >{children}</ThemepackRegister>
}