/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import { getI18n } from "@/i18n/serverTranslation"
import 'server-only'


export const dynamic = 'force-dynamic'

//https://nextjs.org/docs/app/building-your-application/routing/internationalization
//the official nextjs use async to load i18n in server page
export default async function ServerPage({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
    const lang = searchParams?.lang ?? 'en'

    const i18n = await getI18n(lang)

    return <div>
        <p id="lang">{lang}</p>
        <p id="language">{i18n.language}</p>
        <p id="label">{i18n.l(i18n.language)}</p>
    </div>
}