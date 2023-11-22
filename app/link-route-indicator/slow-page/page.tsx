/*
 * @file-created: 2023-11-21
 * @author: Dennis Chen
 */

import Link from "@nextspace/components/Link"

export default async function ServerPage() {
    const res = await new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve('done')
        }, 3000)
    })
    return <div>
        <p className="label">In Slow Page {res}</p>
        <Link className="back-link" href="/link-route-indicator">Back</Link>
    </div>
}