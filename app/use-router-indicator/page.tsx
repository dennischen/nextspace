'use client'

import useRouter from "@nextspace/useRouter"

/*
 * @file-created: 2023-11-21
 * @author: Dennis Chen
 */

export default function Page() {
    const router = useRouter();
    return <div>
        <button className="btn1" onClick={()=>{
            router.push('/use-router-indicator/slow-page?key=abc');
        }} >Push Slow page</button>
        <button className="btn2" onClick={()=>{
            router.replace('/use-router-indicator/slow-page?key=def');
        }} >Replace Slow page</button>
    </div>
}