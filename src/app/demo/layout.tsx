'use client'
//have to 'use client' to prevent build i18n resource into laout.js
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import WorkspaceBoundary from '@/nextspace/WorkspaceBoundary'
import { WorkspaceConfig } from '@/nextspace/types'
import I18nextTranslationHolder from '@/nextspace/utils/I18nextTranslationHolder'
import { useSearchParams } from 'next/navigation'
import { lazy, useMemo } from 'react'

import fallbackTranslation from "./i18n/en.json";
const fallbackLocale = "en"

const EnTranslation = lazy(() => import('./i18n/EnLoader'))
const ZhTranslation = lazy(() => import('./i18n/ZhLoader'))

const translations = [
    {
        locale: "en",
        lazyLoader: EnTranslation
    },
    {
        locale: "zh",
        lazyLoader: ZhTranslation
    }
]

// unnecessary for 'use client', 
// don't use static-page for all page under demo, 
// export const dynamic = 'force-dynamic'

export type LayoutProps = {
    children: React.ReactNode
}

export default function DemoLayout({ children }: LayoutProps) {
    const searchParams = useSearchParams()
    let defaultLocale = searchParams.get("locale");
    defaultLocale = translations.find((l) => l.locale === defaultLocale)?.locale || translations[0].locale;

    const config = useMemo(() => {
        return {
            translationHolder: new I18nextTranslationHolder({
                fallbackLng: fallbackLocale,
                fallbackTranslation: fallbackTranslation
            })
        } as WorkspaceConfig
    }, [])

    return <WorkspaceBoundary defaultLocale={defaultLocale} translations={translations} config={config}>
        {children}
    </WorkspaceBoundary >
}