/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import { _Theme } from "@nextspace/_types"
import { Theme } from "@nextspace/types";
import { createContext } from "react";

const ThemeHolder = createContext(undefined as any as (Theme & _Theme));
ThemeHolder.displayName = "ThemeContext"

export default ThemeHolder