import { DefaultElement, RenderElementProps } from "slate-react"
import { E_PARAGRAPH_TYPE } from "../../interface/blockType"
import { ParagraphElement } from "./EditorType/ParagraphElement"
import { CodeElement } from "./EditorType/CodeElement"
import { ReqElement } from "./EditorType/ReqBlock"
import { ImageElement } from "./EditorType/ImageElement"
import menuPng from "@/assets/icons/menu.png"

/**
 * 渲染元素组件
 * @param props 
 * @returns 
 */
export const renderElement = (props: RenderElementProps) => {
    const { element } = props;

    let result;
    if (element.type === E_PARAGRAPH_TYPE.paragraph) {
        result = <ParagraphElement {...props} />
    } else if (element.type === E_PARAGRAPH_TYPE.codeBlock) {
        result = <CodeElement {...props} />
    } else if (element.type === E_PARAGRAPH_TYPE.image) {
        result = <ImageElement {...props} />
    } else if (element.type === E_PARAGRAPH_TYPE.requirement) {
        result = <ReqElement {...props} />
    } else {
        result = <DefaultElement {...props} />
    }

    return (
        <div className="group flex relative">
            <img contentEditable={false} className="w-4 h-4 cursor-pointer inline opacity-0 transition-opacity group-hover:opacity-100 group-hover:shadow-lg absolute -left-8" src={menuPng} alt="" />
            {result}
        </div>
    )
}
