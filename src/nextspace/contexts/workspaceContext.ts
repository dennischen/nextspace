import { createContext } from "react";
import { Workspace } from "@/nextspace/types";


const WorkspaceHolder = createContext({} as any as Workspace);

export default WorkspaceHolder