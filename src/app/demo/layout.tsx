
import WorkspaceLayout from '@/nextspace/WorkspaceLayout'

//don't use static-page for all page under demo
export const dynamic = 'force-dynamic'

export type LayoutProps = {
    children: React.ReactNode
}

export default function NextspaceLayout({ children }: LayoutProps) {
    return <WorkspaceLayout >
        {children}
    </WorkspaceLayout>
}