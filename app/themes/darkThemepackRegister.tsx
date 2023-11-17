'use client'
/*
 * @file-created: 2023-11-06
 * @author: Dennis Chen
 */
import { themepackRegister } from "@nextspace/components/themepackRegister"

import { MyThemepack } from "@/types"
import darkStyles from './dark.module.scss'
import darkImage from './dark.png'
import { utils } from "./utils"

const themepack: MyThemepack = {
    dark: true,
    colorScheme: 'dark',
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
    utils
}

export default themepackRegister(themepack)