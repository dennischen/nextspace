'use client'
/*
 * @file-created: 2023-11-03
 * @author: Dennis Chen
 */

import WorkspaceBoundary from '@nextspace/WorkspaceBoundary'
import translationLoader from '@nextspace/components/translationLoader'

const EnTranslationLoader = translationLoader("en", () => import('@/i18n/EnTranslationLoader'))
const ZhTranslationLoader = translationLoader("zh", () => import('@/i18n/ZhTranslationLoader'))

export default function WrokspaceLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <WorkspaceBoundary defaultLanguage='en' translations={[EnTranslationLoader, ZhTranslationLoader]}>
            {children}
        </WorkspaceBoundary>
    )
}
