'use client'
import { useWorkspace } from "@nextspace/useWorkspace"
import NextLink, { LinkProps } from "next/link"


export default function Link(props: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps & {
    children?: React.ReactNode
} & React.RefAttributes<HTMLAnchorElement>) {

    const workspace = useWorkspace()

    const { onClick } = props
    props = { ...props }

    props.onClick = (evt) => {
        if (onClick) {
            onClick(evt)
        }
        const target = evt.currentTarget
        if (!evt.isDefaultPrevented() || (!target.target || target.target !== '_self')) {
            const url = new URL(target.href)
            const path = url.pathname
            workspace._notifyRouting(path)
        }
    }
    return <NextLink {...props} />
}