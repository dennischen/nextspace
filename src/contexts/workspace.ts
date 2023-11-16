/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import { Workspace } from "@nextspace/types";
import { createContext } from "react";

const checker = new Proxy({} as any as Workspace, {
    get() {
        throw 'workspace not found, you should use WorkspaceBoundary wrap the layout or page'
    }
})

const WorkspaceHolder = createContext(checker);
WorkspaceHolder.displayName = "WorkspaceContext"

export default WorkspaceHolder