import { ReadonlyURLSearchParams } from "next/navigation"
import ThePage from "./ThePage"
import { cookies, headers } from 'next/headers'
import { context } from "@nextspace/server/request"

export async function generateMetadata({ params, searchParams }: {params: any, searchParams: ReadonlyURLSearchParams}) {
    console.log("page useeffectlifecycle generateMetadata", params, searchParams)
    return {
      title: '...',
    }
 }

export default async function page({ params, searchParams }: {params: any, searchParams: ReadonlyURLSearchParams}) {
    console.log("page body", params, searchParams)

    const ctx = context()
    console.log("page body request context", ctx)
    ctx?.set("abc", "def");

    return <div>
        [page]
        <ThePage/>
        [/page]
    </div>

}