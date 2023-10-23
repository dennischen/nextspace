'use client'
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import WorkspaceHolder from "@/nextspace/contexts/workspaceContext"
import { useContext, useState } from "react"
import demoStyles from "@/app/demo/demo.module.scss"

type PageProps = {
}

export default function LanguagePage({ }: PageProps) {
    const workspace = useContext(WorkspaceHolder);
    const { i18n } = workspace;

    const onLanguageChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.setLocale(evt.target.value);
    }

    return <main className={demoStyles.main}>
        {i18n.l('language')}: {i18n.l(i18n.locale)} ({i18n.locale})
        <label>
            {i18n.l("action")}/{i18n.l("action.selectLanguage")} :
            <select name="language" defaultValue={i18n.locale} onChange={onLanguageChange}>
                {workspace.locales.map(locale => <option key={locale} value={locale}>{i18n.l(locale)} ({locale})</option>)}
            </select>
            {i18n.l("fallback")}
        </label>
    </main>
}