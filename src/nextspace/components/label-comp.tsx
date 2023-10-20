'use client'

type LabelCompProps = {
    label?: string
}


export default function LabelComp({ label = '' }: LabelCompProps) {
    return (
        <div>
            <p>Label is {label}</p>
        </div>
    )
}



