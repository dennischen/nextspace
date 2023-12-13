'use client'

import { ReactNode, useEffect } from "react"


export default function D2({ children }: { children?: ReactNode }) {
    console.log(`D2 body`)

    useEffect(() => {
        console.log(`D2 useEffect`)
    }, [])
    return <div>
        [D2]
        {children}
        [/D2]
    </div>
}