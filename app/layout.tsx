/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import { Inter } from 'next/font/google'
import WrokspaceLayout from './WorkspaceLayout'
import './global.scss'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <WrokspaceLayout>
                    {children}
                </WrokspaceLayout>
            </body>
        </html>
    )
}
