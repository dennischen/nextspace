'use client'
/*
 * @file-created: 2023-11-06
 * @author: Dennis Chen
 */
import { themepackRegister } from "@nextspace/components/themepackRegister"

import { MyThemepack } from "@/types"
import lightStyles from './light.module.scss'
import lightImage from './light.png'
import { utils } from "./utils"

const themepack: MyThemepack = {
    dark: false,
    colorScheme: 'light',
    styles: {
        className1: lightStyles.outer,
        innerStyle1: {
            backgroundColor: '#000000',
            color: '#ffffff'
        }
    },
    variables: {
        imageWidth1: 333,
    },
    images: {
        image1: lightImage.src
    },
    utils
}

export default themepackRegister(themepack)