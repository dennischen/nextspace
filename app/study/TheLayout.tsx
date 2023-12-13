'use client'

import { useEffect } from "react"

export default function TheLayout({ children }: { children: React.ReactNode }) {
    console.log("TheLayout study body")

    useEffect(() => {
        console.log("TheLayout study useEffect")
    }, [])

    return <div>
        [TheLayout study]
        {children}
        [/TheLayout study]
    </div>

}