'use client'

import { ReactNode, useEffect } from "react"
import B2 from "./B2"
import B3 from "./B3"


export default function B1({ children }: { children?: ReactNode }) {
    console.log(`B1 body`)

    useEffect(() => {
        console.log(`B1 useEffect`)
    }, [])
    return <div>
        [B1]
        <B2>
            <B3>
                {children}
            </B3>
        </B2>
        [/B1]
    </div>
}