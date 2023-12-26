import { RenderLeafProps } from "slate-react"

/**
 * 叶节点渲染
 * 
 * @param props 
 * @returns 
 */
export const renderLeaf = (props: RenderLeafProps): JSX.Element => {
    const { leaf, children, attributes } = props;

    if (leaf.bold) {
        return <strong>{children}</strong>
    }

    if (leaf.inlineCode) {
        return <code>{children}</code>
    }

    if (leaf.italic) {
        return <em>{children}</em>
    }

    if (leaf.underline) {
        return <u>{children}</u>
    }

    if (leaf.strikethrough) {
        return <del>{children}</del>
    }

    return <span {...attributes}>{children}</span>
}