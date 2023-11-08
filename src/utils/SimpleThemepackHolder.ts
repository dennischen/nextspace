/*
 * @file-created: 2023-11-06
 * @author: Dennis Chen
 */

import { Themepack } from "@nextspace/types"

export default class SimpleThemepackHolder {

    private themepackMap = new Map<string, Themepack>();
    private theme: string = "";

    register(theme: string, translation: any) {
        const { themepackMap } = this
        themepackMap.set(theme, translation)
    }

    change(nextTheme: string) {
        this.theme = nextTheme
    }

    get(): Themepack {
        const { theme, themepackMap } = this
        const val = themepackMap.get(theme)
        return val || {}
    }
}

