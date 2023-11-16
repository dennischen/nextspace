'use client'
import useI18n from "@nextspace/useI18n"
/*
 * @file-created: 2023-11-03
 * @author: Dennis Chen
 */
import useWorkspace from "@nextspace/useWorkspace"

export default function LanguageSwitcher({ id = 'test1' }: { id?: string }) {
    const workspace = useWorkspace()
    const i18n = useI18n()

    const onChangeLanguage = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        workspace.changeLanguage(evt.target.value)
    }

    return <select id={id} name="language" defaultValue={i18n.language} onChange={onChangeLanguage}>
        {workspace.languages.map(language => <option key={language} value={language}>{i18n.l(`${language}`)}</option>)}
    </select>
}