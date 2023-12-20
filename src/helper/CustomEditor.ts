import {  Transforms,Element   } from "slate"
import { E_LEAF_TYPE, E_PARAGRAPH_TYPE } from "../interface/blockType"
import { ZEditor } from "./CustomApi/Editor/ZEditor";
import { CustomEditor } from "../interface/CUstomElement";
import { ZElement } from "./CustomApi/Element/ZElement";

// Define our own custom set of helpers.
export const CustomEditorHelper = {
  // helper
  toggleBoldMark(editor:CustomEditor) {
    const isActive = ZEditor.isBoldMarkActive(editor)
    if (isActive) {
      ZEditor.removeMark(editor, E_LEAF_TYPE.bold)
    } else {
      ZEditor.addMark(editor, E_LEAF_TYPE.bold, true)
    }
  },
  toggleCodeBlock(editor:CustomEditor) {
    const isActive = ZEditor.isCodeBlockActive(editor);
    if (!isActive) {
      Transforms.wrapNodes(
        editor,
        { type: E_PARAGRAPH_TYPE.codeBlock, language: 'html', children: [] },
        {
          match: n => Element.isElement(n) && n.type === E_PARAGRAPH_TYPE.paragraph,
          split: true,
        }
      )
      Transforms.setNodes(
        editor,
        { type: E_PARAGRAPH_TYPE.paragraph },
        { match: n => Element.isElement(n) && ZEditor.isBlock(editor, n) }
        )
    } else {
      Transforms.unwrapNodes(
        editor,
        { match: n => Element.isElement(n) && n.type === E_PARAGRAPH_TYPE.codeBlock }
      )
    }
  },

  toggleReqBlock(editor:CustomEditor) {
    const isActive = ZEditor.isReqBlockActive(editor);
    if (!isActive) {
      Transforms.wrapNodes(
        editor,
        { type: E_PARAGRAPH_TYPE.requirement, system: 'CSCI', children: [] },
        {
          match: n => Element.isElement(n) && n.type === E_PARAGRAPH_TYPE.paragraph,
          split: true,
        }
      )
      Transforms.setNodes(
        editor,
        { type: E_PARAGRAPH_TYPE.paragraph },
        { match: n => ZElement.isElement(n) && ZEditor.isBlock(editor, n) }
      )
    } else {
      Transforms.unwrapNodes(
        editor,
        { match: n => Element.isElement(n) && n.type === E_PARAGRAPH_TYPE.requirement }
      )
    }
  },
  testBlock(editor: CustomEditor) {
    console.log('editor: ', editor);
  },
  // 另起一行
  createNewLine(editor: CustomEditor) {
    const anchor = editor.selection?.anchor;
    if (anchor) {
      Transforms.insertNodes(
        editor,
        { type: E_PARAGRAPH_TYPE.paragraph, children: [{ text: '' }] },
        { at: [anchor.path[0]+1] }  // {offset:1,path:[editor.children.length]} 如果这样写，就会插入到块的内部
      )
      Transforms.select(editor,{offset:0,path:[anchor.path[0]+1]})
    }
  },
  // insertImage
  insertImage(editor: CustomEditor, url: string) {
    ZEditor.isBlock
    editor.isBlock
    Transforms.insertNodes(
      editor,
      { type: E_PARAGRAPH_TYPE.image, url, children: [{ text: '' }] }
    )
  },
}