import { DefaultElement, RenderElementProps } from "slate-react"
import { E_PARAGRAPH_TYPE } from "../../interface/blockType"
import { ParagraphElement } from "./EditorType/ParagraphElement"
import { CodeElement } from "./EditorType/CodeElement"
import { ReqElement } from "./EditorType/ReqBlock"

// 渲染元素组件
export const renderElement = (props: RenderElementProps) => {
    switch (props.element.type) {
        case E_PARAGRAPH_TYPE.paragraph:
            return <ParagraphElement {...props} />
        case E_PARAGRAPH_TYPE.code:
            return <CodeElement {...props} />
        case E_PARAGRAPH_TYPE.requirement:
            return <ReqElement {...props} />
        default:
            return <DefaultElement {...props} />
    }
}
