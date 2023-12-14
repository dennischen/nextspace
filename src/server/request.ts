import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { ReactNode } from 'react'
import 'server-only'
import { v4 as uuid } from 'uuid'
/*
 * A request utility helps to handle shared context between server layouts and page.
 * It assumpts that the call order of layouts and page are : page -> layout => ... -> root layout, even if the page or layout a async.
 * To use this utility, you need to do some initial and cleanup effort (so sad nextjs has no such lifecycle to handle this)
 * 1. Call middlewareRequestContext or middlewareRequestHeader first in the middleware and return the refresh headers in response so it can inject a uuid to request
 * 2. Add the CleanContext in to the end of root layout so it can cleanup the context and uid
 * 3. Access context by call contexts in server component body and get or set value to it.
 * 
 * Why do I need to create this feature? my usecase is, in the template-based ui, I have a shared Banner whish have some boolean state can turn on/off some
 * component, for any page uses this template/banner can set the flag in the page, I can't use client-side useEffect because it will cause component flash-blank-effect
 * in the first accessing (i.e server-side-rendering). By using this shared request context utility I can do it in both server & client side
 * 
 * @file-created: 2023-12-14
 * @author: Dennis Chen
 */

export const NEXTSPACE_REQUEST_UID = 'nextspace-request-uid'

const contextMap: Map<string, Context> = new Map()

/**
 * a method to inject request uid to request header for a shared request time context between server components
 * @param request 
 * @returns 
 */
export function middlewareRequest(request: NextRequest) {
    return NextResponse.next({
        request: {
            headers: middlewareRequestHeader(request.headers)
        }
    })
}

/**
 * a method to inject request uid to request header for a shared request time context between server components
 * @param request 
 * @returns 
 */
export function middlewareRequestHeader(headers: Headers) {
    //the pleaxe to intercept request header
    headers = new Headers(headers)
    const uid = uuid()
    headers.set(NEXTSPACE_REQUEST_UID, uid)
    return headers
}


/**
 * get requestContext by request headers if there is any NEXTSPACE_REQUEST_UID, which should has a uid in header to get the object
 * by middlewareRequestContext or middlewareRequestHeader
 * @param headers 
 * @returns 
 */
export function context() {
    const h = headers()
    const uid = h?.get(NEXTSPACE_REQUEST_UID)
    if (uid) {
        let requestContext = contextMap.get(uid)
        if (!requestContext) {
            contextMap.set(uid, requestContext = new Context())
        }
        return requestContext
    }
    throw `No ${NEXTSPACE_REQUEST_UID} found in request header, you should use a middleware.ts and call middlewareRequestContext or middlewareRequestHeader to generate the header`
}

/**
 * a server component to clean the Request Context, is hould be at the end of the root layout component tree
 * @param param0 
 * @returns 
 */
export function CleanContext({ children }: { children?: ReactNode }) {
    const h = headers()
    const uid = h?.get(NEXTSPACE_REQUEST_UID)
    if (uid) {
        contextMap.delete(uid)
    }
    return children
}

export function cleanContext(uid: string) {
    contextMap.delete(uid)
}



export class Context {

    values: Map<string, any> = new Map

    get(key: string) {
        return this.values.get(key)
    }

    set(key: string, value: any) {
        return this.values.set(key, value)
    }

}


