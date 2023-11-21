/*
 * @file-created: 2023-11-32
 * @author: Dennis Chen
 */

import Link from "@nextspace/components/Link"

export default async function ServerPage({searchParams}:{searchParams?:{ [key: string]: string | undefined }}) {

    const res = await new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve(searchParams?.key ?? 'done')
        }, 3000)
    })
    return <div>
        <p className="label">In Slow Page {res}</p>
        <Link className="back-link" href="/use-router-indicator">Back</Link>
    </div>
}