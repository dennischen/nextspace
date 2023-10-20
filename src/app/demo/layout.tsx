'use client'
//have to 'use client' to prevent build i18n resource into laout.js

import WorkspaceBoundary from '@/nextspace/WorkspaceBoundary'
import { lazy } from 'react'

const EnTranslation = lazy(() => import('./i18n/en'))
const ZhTranslation = lazy(() => import('./i18n/zh'))

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

//don't use static-page for all page under demo
export const dynamic = 'force-dynamic'

export type LayoutProps = {
    children: React.ReactNode
}

export default function DemoLayout({ children }: LayoutProps) {
    return <WorkspaceBoundary translations={translations} >
        {children}
    </WorkspaceBoundary >
}