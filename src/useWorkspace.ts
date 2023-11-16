/*
 * @file-created: 2023-11-16
 * @author: Dennis Chen
 */

import { useContext } from "react"
import WorkspaceHolder from "./contexts/workspace"

export default function useWorkspace() {
    const workspace = useContext(WorkspaceHolder)
    return workspace
}
