import {  Editor, Transforms, Node } from "slate"
import { E_PARAGRAPH_TYPE } from "../../interface/blockType"
import { jsx } from 'slate-hyperscript'
import { ZElement } from "../CustomApi/Element/ZElement"
import { CustomElement } from "../../interface/CUstomElement"

export const withHtml = (editor: Editor) => {
        const { insertData, isInline, isVoid } = editor

        editor.isInline = element => {
            return element.type === E_PARAGRAPH_TYPE.link ? true : isInline(element)
        }

        editor.isVoid = element => {
            return element.type === E_PARAGRAPH_TYPE.image ? true : isVoid(element)
        }

        editor.insertData = data => {
            const html = data.getData('text/html')
            if (html) {
              const parsed = new DOMParser().parseFromString(html, 'text/html')
              const fragment:CustomElement[] = deserializeHTMLElement(parsed.body);
              const insertFragment: Node[] = [];
              // 只取element
              fragment.forEach(item => {
                if (ZElement.isElement(item)) {
                  insertFragment.push(item);
                }
              })
              console.log('insertFragment: ', insertFragment);
              Transforms.insertFragment(editor, insertFragment, {
                voids: false
              })
              return;
            }
            insertData(data)
        }

    return editor;
}
    
// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
}

const ELEMENT_TAGS = {
  A: (el:Element) => ({ type: E_PARAGRAPH_TYPE.link, url: el.getAttribute('href') }),
  BLOCKQUOTE: () => ({ type: E_PARAGRAPH_TYPE.quote }),
  H1: () => ({ type: E_PARAGRAPH_TYPE.heading, level: 1 }),
  H2: () => ({ type: E_PARAGRAPH_TYPE.heading, level: 2 }),
  H3: () => ({ type: E_PARAGRAPH_TYPE.heading, level: 3 }),
  H4: () => ({ type: E_PARAGRAPH_TYPE.heading, level: 4 }),
  H5: () => ({ type: E_PARAGRAPH_TYPE.heading, level: 5 }),
  H6: () => ({ type: E_PARAGRAPH_TYPE.heading, level: 6 }),
  IMG: (el:Element) => ({ type: E_PARAGRAPH_TYPE.image, url: el.getAttribute('src') }),
  LI: () => ({ type: E_PARAGRAPH_TYPE.listItem }),
  OL: () => ({ type: E_PARAGRAPH_TYPE.numberedList }),
  P: () => ({ type: E_PARAGRAPH_TYPE.paragraph }),
  PRE: () => ({ type: E_PARAGRAPH_TYPE.codeBlock }),
  UL: () => ({ type: E_PARAGRAPH_TYPE.bulletedList }),
}

const deserializeHTMLElement = (el:(HTMLElement|ChildNode)):any => {
  if (el.nodeType === 3) {
    return el.textContent
  } else if (el.nodeType !== 1) {
    return null
  } else if (el.nodeName === 'BR') {
    return '\n'
  }

  const { nodeName } = el
  let parent = el

  if (
    nodeName === 'PRE' &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === 'CODE'
  ) {
    parent = el.childNodes[0]
  }
  
  let children = Array.from(parent.childNodes).map(deserializeHTMLElement).flat();

  if (children.length === 0) {
    children = [{ text: '' }]
  }

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }
  
  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    return jsx('element', attrs, children)
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el)
    return children.map(child => jsx('text', attrs, child))
  }

  // console.log('children: ', children);
  return children
}