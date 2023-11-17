/*
 * @file-created: 2023-11-16
 * @author: Dennis Chen
 */

import { useContext } from "react"
import I18nHolder from "./contexts/i18n"

export function useI18n() {
    return useContext(I18nHolder)
}

export default useI18n


