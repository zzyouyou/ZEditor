import {  Transforms,Element   } from "slate"
import { E_LEAF_TYPE, E_PARAGRAPH_TYPE } from "../interface/blockType"
import { ZEditor } from "./Editor/ZEditor";
import { CustomEditor } from "../interface/CUstomElement";
import { ZElement } from "./Element/ZElement";

// Define our own custom set of helpers.
export const CustomEditorHelper = {
  isBoldMarkActive(editor:CustomEditor) {
    const marks = ZEditor.marks(editor);
    return marks ? marks.bold === true : false;
  },
  isCodeBlockActive(editor: CustomEditor) {
    const [match] = ZEditor.nodes(editor, {
      match: n => {
        return n.type === E_PARAGRAPH_TYPE.code
      },
    })
    return !!match
  },
  isReqBlockActive(editor: CustomEditor) {
    const [match] = ZEditor.nodes(editor, {
      match: n => {
        return n.type === E_PARAGRAPH_TYPE.requirement
      },
    })
    return !!match
  },

  toggleBoldMark(editor:CustomEditor) {
    const isActive = CustomEditorHelper.isBoldMarkActive(editor)
    if (isActive) {
      ZEditor.removeMark(editor, E_LEAF_TYPE.bold)
    } else {
      ZEditor.addMark(editor, E_LEAF_TYPE.bold, true)
    }
  },
  toggleCodeBlock(editor:CustomEditor) {
    const isActive = CustomEditorHelper.isCodeBlockActive(editor);
    if (!isActive) {
      Transforms.wrapNodes(
        editor,
        { type: E_PARAGRAPH_TYPE.code, language: 'html', children: [] },
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
        { match: n => Element.isElement(n) && n.type === E_PARAGRAPH_TYPE.code }
      )
    }
  },

  toggleReqBlock(editor:CustomEditor) {
    const isActive = CustomEditorHelper.isReqBlockActive(editor);
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
    console.log(2);
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
  }
}