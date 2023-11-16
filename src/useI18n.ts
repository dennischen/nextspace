/*
 * @file-created: 2023-11-16
 * @author: Dennis Chen
 */

import { useContext } from "react"
import WorkspaceHolder from "./contexts/workspace"

export default function useI18n() {
    const workspace = useContext(WorkspaceHolder)
    return workspace.i18n
}


