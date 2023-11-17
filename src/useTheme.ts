/*
 * @file-created: 2023-11-16
 * @author: Dennis Chen
 */

import { useContext } from "react"
import ThemeHolder from "./contexts/theme"

export function useTheme() {
    return useContext(ThemeHolder)
}


export default useTheme
