import { Editor } from 'slate'
import { CustomEditor, CustomElement } from '../../../interface/CUstomElement';
import { E_PARAGRAPH_TYPE } from '../../../interface/blockType';

export const ZEditor = {
  ...Editor,
    // check函数
  isBoldMarkActive(editor:CustomEditor) {
    const marks = ZEditor.marks(editor);
    return marks ? marks.bold === true : false;
  },
  isCodeBlockActive(editor: CustomEditor) {
    const [match] = ZEditor.nodes(editor, {
      match: n => {
        const { type } = n as CustomElement;
        return type === E_PARAGRAPH_TYPE.codeBlock
      },
    })
    return !!match
  },
  isReqBlockActive(editor: CustomEditor) {
    const [match] = ZEditor.nodes(editor, {
      match: n => {
        const { type } = n as CustomElement;
        return type === E_PARAGRAPH_TYPE.requirement
      },
    })
    return !!match
  },
  isHeadActive(editor: CustomEditor) {
    const [match] = ZEditor.nodes(editor, {
      match: n => {
        const { type } = n as CustomElement;
        return type === E_PARAGRAPH_TYPE.heading
      },
    })
    return !!match
  }
}