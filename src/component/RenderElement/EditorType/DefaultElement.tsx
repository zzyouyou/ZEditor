import { RenderElementProps } from 'slate-react'


// Define a React component renderer for our default blocks.
export const DefaultElement = (props: RenderElementProps) => {
    return <p {...props.attributes}>{props.children}</p>
}
