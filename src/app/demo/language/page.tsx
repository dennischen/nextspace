'use client'

import { lazy, useContext, useState } from "react"
import demoStyles from "../demo.module.scss"
import WorkspaceHolder from "@/nextspace/contexts/workspaceContext"

const LazyComp = lazy(() => import('@/nextspace/components/label-comp'))
const LazyZh = lazy(() => import('@/app/demo/i18n/zh'))


type PageProps = {
}

export default function NextspacePage({ }: PageProps) {
    const workspace = useContext(WorkspaceHolder);
    const { i18n } = workspace;

    const [show, setShow] = useState(false);

    const onLanguageChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(">>doSelect", evt.target.value)
        i18n.setLocal(evt.target.value);
    }


    return <main className={demoStyles.main}>
        {i18n.l('language')}: {i18n.l(i18n.locale)} ({i18n.locale})
        <label>
            Select a language
            <select name="language" defaultValue={i18n.locale} onChange={onLanguageChange}>
                {workspace.locales.map(locale => <option key={locale} value={locale}>{i18n.l(locale)} ({locale})</option>)}
            </select>
        </label>
        <button onClick={()=>setShow(true)}>show</button>
        {show && <LazyComp label="Lazy"/>}
        {show && <LazyZh />}
    </main>
}