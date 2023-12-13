'use client'

import { ReactNode, useEffect } from "react"


export default function D3({ children }: { children?: ReactNode }) {
    console.log(`D3 body`)

    useEffect(()=>{
        console.log(`D3 useEffect`)
    },[])

    return <div>
        [D3]
        {children}
        [/D3]
    </div>
}