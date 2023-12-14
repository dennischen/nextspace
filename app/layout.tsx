/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import { context } from '@nextspace/server/request'
import { Inter } from 'next/font/google'
import AppLayout from './AppLayout'
import './global.scss'

const inter = Inter({ subsets: ['latin'] })

const envVariables: {
    [key: string]: string | undefined
} = {}
for (var p in process.env) {
    if (p.startsWith('APP_PUBLIC_')) {
        envVariables[p] = process.env[p]
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    console.log("root layout request context", context())
    return (
        <html lang="en">
            <body className={inter.className}>
                <AppLayout envVariables={envVariables}>
                    {children}
                </AppLayout>
            </body>
        </html>
    )
}
