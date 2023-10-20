'use client'

import { useContext } from "react"
import demoStyles from "../demo.module.scss"
import WorkspaceHolder from "@/nextspace/contexts/workspaceContext"


type PageProps = {
}

export default function NextspacePage({ }: PageProps) {
    const workspace = useContext(WorkspaceHolder);
    const { i18n } = workspace;


    const onLanguageChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(">>doSelect", evt.target.value)
        i18n.setLocal(evt.target.value);
    }


    return <main className={demoStyles.main}>
        Demo Main [{i18n.locale}], [{i18n.l("abc")}]
        <label>
            Select a language
            <select name="language" defaultValue={i18n.locale} onChange={onLanguageChange}>
                {['en', 'zh'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
        </label>
    </main>
}