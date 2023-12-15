'use client'

import { useEffect } from "react"

export default function TheLayout({ children }: { children: React.ReactNode }) {
    console.log("TheLayout useeffectlifecycle body")

    useEffect(() => {
        console.log("TheLayout useeffectlifecycle useEffect")
    }, [])

    return <div>
        [TheLayout useeffectlifecycle]
        {children}
        [/TheLayout useeffectlifecycle]
    </div>

}