'use client'

import WorkspaceHolder from "@nextspace/contexts/workspace"
import { useContext } from "react"

export default function I18nInfo({ id, labelKey, args }: { id: string, labelKey: string, args?: any }) {
    const workspace = useContext(WorkspaceHolder)
    const { i18n } = workspace
    return <div id={id}>
        <span data-locale>{i18n.language}</span>
        <span data-label>{i18n.l(labelKey, args)}</span>
    </div>

}