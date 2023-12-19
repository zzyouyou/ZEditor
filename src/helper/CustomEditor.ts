import {  Transforms,Element   } from "slate"
import { E_LEAF_TYPE, E_PARAGRAPH_TYPE } from "../interface/blockType"
import { ZEditor } from "./Editor/ZEditor";
import { CustomEditor } from "../interface/CUstomElement";
import { ZElement } from "./Element/ZElement";

// Define our own custom set of helpers.
export const CustomEditorHelper = {
  isBoldMarkActive(editor:CustomEditor) {
    console.log('editor: ', editor.selection);
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
    const isActive = CustomEditorHelper.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? E_PARAGRAPH_TYPE.paragraph : E_PARAGRAPH_TYPE.code },
      {
        match: n => {
          return  ZElement.isElement(n) && ZEditor.isBlock(editor, n)
        }
      }
    )
  },
  toggleReqBlock(editor:CustomEditor) {
    const isActive = CustomEditorHelper.isReqBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? E_PARAGRAPH_TYPE.paragraph : E_PARAGRAPH_TYPE.requirement },
      { match: n => ZElement.isElement(n) && ZEditor.isBlock(editor, n) }
    )
  },
  testBlock(editor: CustomEditor) {
    // const selection = editor.selection
    // console.log('selection: ', selection);
    // console.log(ZNode.get(editor,selection?.anchor.path||[]));
    // console.log('test');

    // console.log('editor.children: ', editor.children);
    // console.log('editor.operations: ', editor.operations);
    // for (const point of ZEditor.positions(editor)) {
    //   console.log('point: ', point);
    // }
    const isActive = CustomEditorHelper.isCodeBlockActive(editor)
    console.log('isActive: ', isActive);
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
        { match: n => Element.isElement(n) && n.type === E_PARAGRAPH_TYPE.paragraph }
        )
    } else {
      Transforms.unwrapNodes(
        editor,
        { match: n => Element.isElement(n) && n.type === E_PARAGRAPH_TYPE.code }
      )
    }


    // Merge a node at the specified location with the pre
    // Transforms.mergeNodes(editor, {
      // at:[editor.children.length],
      // at: [1],
      // mode: 'highest' ,
      // voids: true,
    //   match(node, path) {
    //     console.log('path: ', path);
    //     console.log('node: ', node);
    //     return true;
    //   },
    //   hanging:true
    // })


    // Transforms.unwrapNodes(editor, {
    //   // split:true,
    //   // at: [], // Path of ZEditor
    //   match: node => {
        
    //     console.log('ZEditor.isElementReadOnly(editor,node): ', ZEditor.isElementReadOnly(editor,node));
    //     console.log('node: ', node, Text.isText(node));
    //     console.log('===---===--->',node.children?.every(child => ZEditor.isBlock(editor, child)));
    //     // return true;
    //     // return !ZEditor.isEditor(node) && node.children?.every(child => ZEditor.isBlock(editor, child))
    //   },
    //   mode: 'all', // also the ZEditor's children
    // })
  }
}