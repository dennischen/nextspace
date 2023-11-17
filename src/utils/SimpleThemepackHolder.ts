/*
 * @file-created: 2023-11-06
 * @author: Dennis Chen
 */

import { Themepack } from "@nextspace/types"

export default class SimpleThemepackHolder {

    private themepackMap = new Map<string, Themepack>();
    private code: string = "";

    register(code: string, translation: any) {
        const { themepackMap } = this
        themepackMap.set(code, translation)
    }

    change(code: string) {
        this.code = code
    }

    get(): Themepack {
        const { code, themepackMap } = this
        const val = themepackMap.get(code)
        return val || {}
    }
}

