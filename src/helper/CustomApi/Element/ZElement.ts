import { Element } from 'slate'
import { E_PARAGRAPH_TYPE } from '../../../interface/blockType'

const isImageElement =( element:Element) => {
  return element.type === E_PARAGRAPH_TYPE.image && typeof element.url === 'string'
}

// You can use `MyElement` everywhere to have access to your extensions.
export const ZElement = {
  ...Element,
  isImageElement,
}