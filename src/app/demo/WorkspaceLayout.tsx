'use client'
//
/* 'use client' to prevent build i18n resource into laout.js

 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */
import WorkspaceBoundary from '@/nextspace/WorkspaceBoundary'
import { WorkspaceConfig } from '@/nextspace/types'
import I18nextTranslationHolder from '@/nextspace/utils/I18nextTranslationHolder'
import { useMemo } from 'react'
import demoStyles from "./demo.module.scss"

import translationLoader from '@/nextspace/components/translationLoader'
import i18next from 'i18next'
import Banner from "./Banner"
import Footer from './Footer'
import fallbackTranslation from "./i18n/en.json"
import "./variables.scss"

const fallbackLocale = "en"

const EnLoader = translationLoader("en", () => import('./i18n/EnLoader'))
const ZhLoader = translationLoader("zh", () => import('./i18n/ZhLoader'))

const translations = [EnLoader, ZhLoader]

export type WorkspaceLayoutProps = {
    defaultLocale: string,
    children: React.ReactNode
}

export default function WorkspaceLayout({ defaultLocale, children }: WorkspaceLayoutProps) {

    defaultLocale = translations.find((l) => l.locale === defaultLocale)?.locale || translations[0].locale

    const config = useMemo(() => {
        return {
            translationHolder: new I18nextTranslationHolder(i18next.createInstance(), {
                fallbackLng: fallbackLocale,
                fallbackTranslation: fallbackTranslation
            })
        } as WorkspaceConfig
    }, [])

    return <WorkspaceBoundary defaultLocale={defaultLocale} translations={translations} config={config} className={demoStyles.layout}>
        <Banner />
        {children}
        <Footer />
    </WorkspaceBoundary >
}