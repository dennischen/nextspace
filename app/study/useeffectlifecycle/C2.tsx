'use client'

import { ReactNode, useEffect } from "react"


export default function C2({ children }: { children?: ReactNode }) {
    console.log(`C2 body`)

    useEffect(() => {
        console.log(`C2 useEffect`)
    }, [])
    return <div>
        [C2]
        {children}
        [/C2]
    </div>
}