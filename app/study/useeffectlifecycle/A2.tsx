'use client'

import { ReactNode, useEffect } from "react"


export default function A2({ children }: { children?: ReactNode }) {
    console.log(`A2 body`)

    useEffect(() => {
        console.log(`A2 useEffect`)
    }, [])
    return <div>
        [A2]
        {children}
        [/A2]
    </div>
}