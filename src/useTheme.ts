/*
 * @file-created: 2023-11-16
 * @author: Dennis Chen
 */

import { useContext } from "react"
import WorkspaceHolder from "./contexts/workspace"

export function useTheme() {
    const workspace = useContext(WorkspaceHolder)
    return workspace.theme
}


export default useTheme
