import { RenderElementProps } from 'slate-react'

export const ParagraphElement = (props: RenderElementProps) => {
    return (
        <div {...props.attributes}>
            <p>{props.children}</p>
        </div>
    )
}
