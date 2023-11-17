/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import { Theme } from "@nextspace/types";
import { createContext } from "react";

const ThemeHolder = createContext(undefined as any as Theme);
ThemeHolder.displayName = "ThemeContext"

export default ThemeHolder