'use client'
/*
 * @file-created: 2023-11-03
 * @author: Dennis Chen
 */
import { useContext } from "react"
import WorkspaceHolder from "@nextspace/contexts/workspace"

export default function LanguageSwitcher({ id = 'test1' }: { id?: string}) {
    const workspace = useContext(WorkspaceHolder)
    const { i18n } = workspace

    const onChangeLanguage = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        workspace.changeLanguage(evt.target.value)
    }

    return <select id={id} name="language" defaultValue={i18n.language} onChange={onChangeLanguage}>
        {workspace.languages.map(language => <option key={language} value={language}>{i18n.l(`${language}`)}</option>)}
    </select>
}