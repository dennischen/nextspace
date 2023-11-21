/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import { _Workspace } from "@nextspace/_types"
import { Workspace } from "@nextspace/types"
import { createContext } from "react"

const WorkspaceHolder = createContext(undefined as any as (Workspace & _Workspace))
WorkspaceHolder.displayName = "WorkspaceContext"

export default WorkspaceHolder