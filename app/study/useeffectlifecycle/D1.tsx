'use client'

import { ReactNode, useEffect } from "react"
import D2 from "./D2"
import D3 from "./D3"


export default function D1({ children }: { children?: ReactNode }) {
    console.log(`D1 body`)

    useEffect(() => {
        console.log(`D1 useEffect`)
    }, [])
    return <div>
        [D1]
        <D2>
            <D3>
                {children}
            </D3>
        </D2>
        [/D1]
    </div>
}