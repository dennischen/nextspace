'use client'
/*
 * @file-created: 2023-11-03
 * @author: Dennis Chen
 */

import WorkspaceBoundary from '@nextspace/WorkspaceBoundary'
import themepackLoader from '@nextspace/components/themepackLoader'
import translationLoader from '@nextspace/components/translationLoader'

import appStyles from "./app.module.scss"

const EnTranslationLoader = translationLoader("en", () => import('@/i18n/EnTranslationLoader'))
const ZhTranslationLoader = translationLoader("zh", () => import('@/i18n/ZhTranslationLoader'))

const LightThemepackLoader = themepackLoader("light", () => import("@/themes/LightThemepackLoader"))
const DarkThemepackLoader = themepackLoader("dark", () => import("@/themes/DarkThemepackLoader"))

export default function WrokspaceLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <WorkspaceBoundary defaultLanguage='en' translations={[EnTranslationLoader, ZhTranslationLoader]}
            defaultTheme='light' themepacks={[LightThemepackLoader, DarkThemepackLoader]} className={appStyles.app}>
            {children}
        </WorkspaceBoundary>
    )
}
