'use client'

import { ReactNode, useEffect } from "react"


export default function B3({ children }: { children?: ReactNode }) {
    console.log(`B3 body`)

    useEffect(()=>{
        console.log(`B3 useEffect`)
    },[])

    return <div>
        [B3]
        {children}
        [/B3]
    </div>
}