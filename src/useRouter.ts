/*
 * @file-created: 2023-11-16
 * @author: Dennis Chen
 */

import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter as useNextRouter } from "next/navigation"
import useWorkspace from "./useWorkspace"


export function useRouter() {
    const workspace = useWorkspace()
    const router = useNextRouter()

    const handler: ProxyHandler<typeof router> = {
        get(target, prop) {
            switch (prop) {
                case 'push':
                case 'replace':
                    return function (href: string, options?: NavigateOptions) {
                        workspace._notifyRouting(href)
                        return router.push(href, options)
                    }
            }
            return (target as any)[prop]
        },
    }

    return new Proxy(router, handler)
    // return Object.assign({} as typeof router, router, {
    //     /**
    //      * Navigate to the provided href.
    //      * Pushes a new history entry.
    //      */
    //     push: (href: string, options?: NavigateOptions) => {
    //         workspace._notifyRouting(href)
    //         router.push(href, options)
    //     },
    //     /**
    //      * Navigate to the provided href.
    //      * Replaces the current history entry.
    //      */
    //     replace: (href: string, options?: NavigateOptions) => {
    //         workspace._notifyRouting(href)
    //         router.replace(href, options)
    //     }
    // })
}


export default useRouter
