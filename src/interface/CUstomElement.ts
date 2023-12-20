import { BaseEditor } from "slate"
import { HistoryEditor } from "slate-history"
import { ReactEditor } from "slate-react"
import { E_PARAGRAPH_TYPE } from "./blockType"

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

// 段落
export type ParagraphElement = {
  type: E_PARAGRAPH_TYPE.paragraph
  children: CustomText[]
}

// 标题
export type HeadingElement = {
  type: E_PARAGRAPH_TYPE.heading
  level: number
  children: CustomText[]
}

// 代码块
export type CodeElement = {
  type: E_PARAGRAPH_TYPE.codeBlock
  language: 'html'|'javascript'
  children: CustomText[]
}
// 图片
export type ImageElement = {
  type: E_PARAGRAPH_TYPE.image
  url: string
  children: CustomText[]
}

// 链接
export type LinkElement = {
  type: E_PARAGRAPH_TYPE.link
  url: string
  children: CustomText[]
}

// 需求条目
export type RequirementElement = {
  type: E_PARAGRAPH_TYPE.requirement
  system:"CSCI"|"NORMAL"
  children: CustomText[]
}

export type CustomElement = ParagraphElement | HeadingElement | CodeElement | RequirementElement | ImageElement | LinkElement;

export type FormattedText = { text: string; bold?: true; inlineCode?: true; italic?: true; underline?: true; strikethrough?: true; }

export type CustomText = FormattedText

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }

  interface RenderElementProps {
    element: CustomElement
  } 
}