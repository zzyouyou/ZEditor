import { RenderElementProps } from 'slate-react'

export const ParagraphElement = (props: RenderElementProps) => {
    return (
        <div className='w-full' {...props.attributes}>
            <p>{props.children}</p>
        </div>
    )
}
