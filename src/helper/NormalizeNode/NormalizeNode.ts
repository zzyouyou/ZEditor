import {  Transforms } from "slate";
import { E_PARAGRAPH_TYPE } from "../../interface/blockType";
import { CustomEditor } from "../../interface/CUstomElement";
import { initData } from "../../interface/initData";

// 校正内容。当editor内容变化时会触发
export const withNormalizeNode = (editor: CustomEditor) => {
    const { normalizeNode } = editor

    editor.normalizeNode = entry => {
        const [node, path] = entry
        if (editor.children.length === 0) {
            Transforms.insertNodes(editor, [{
                type: E_PARAGRAPH_TYPE.paragraph,
                children: [initData.blankData],
            }])
        }
        
        normalizeNode(entry)
    }

    return editor
}
