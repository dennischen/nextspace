'use client'

import { ReactNode, useEffect } from "react"


export default function B2({ children }: { children?: ReactNode }) {
    console.log(`B2 body`)

    useEffect(() => {
        console.log(`B2 useEffect`)
    }, [])
    return <div>
        [B2]
        {children}
        [/B2]
    </div>
}