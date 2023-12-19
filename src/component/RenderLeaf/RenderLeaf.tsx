import { RenderLeafProps } from "slate-react"

// Define a leaf rendering function that is memoized with `useCallback`.
export const renderLeaf = (props: RenderLeafProps): JSX.Element => {
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
        >
            {props.children}
        </span>
    )
}