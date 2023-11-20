/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import { _I18n } from "@nextspace/_types"
import { I18n } from "@nextspace/types";
import { createContext } from "react";

const I18nHolder = createContext(undefined as any as (I18n & _I18n));
I18nHolder.displayName = "I18nContext"

export default I18nHolder