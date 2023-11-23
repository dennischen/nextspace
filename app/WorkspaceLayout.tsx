'use client'
/*
 * @file-created: 2023-11-03
 * @author: Dennis Chen
 */

import WorkspaceBoundary from '@nextspace/WorkspaceBoundary'
import themepackLoader from '@nextspace/components/themepackLoader'
import translationLoader from '@nextspace/components/translationLoader'

import appStyles from "./app.module.scss"

const EnTranslationLoader = translationLoader("en", () => import('@/i18n/enTranslationRegister'))
const ZhTranslationLoader = translationLoader("zh", () => import('@/i18n/zhTranslationRegister'))

const LightThemepackLoader = themepackLoader("light", () => import("@/themes/lightThemepackRegister"))
const DarkThemepackLoader = themepackLoader("dark", () => import("@/themes/darkThemepackRegister"))

export default function WrokspaceLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <WorkspaceBoundary defaultLanguage='en' translationLoaders={[EnTranslationLoader, ZhTranslationLoader]}
            defaultTheme='light' themepackLoaders={[LightThemepackLoader, DarkThemepackLoader]} className={appStyles.app}>
                {children}
        </WorkspaceBoundary>
    )
}
