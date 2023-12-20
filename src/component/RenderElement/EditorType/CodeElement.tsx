import { RenderElementProps } from 'slate-react'

// Define a React component renderer for our code blocks.
export const CodeElement = (props: RenderElementProps) => {
    return (
        <pre {...props.attributes} className='flex bg-[#000000] px-1 text-white w-full'>
            <code>{props.children}</code>
        </pre>
    )
}
