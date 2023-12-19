import { Element } from 'slate'

const isImageElement =( element:Element) => {
  return element.type === 'image' && typeof element.url === 'string'
}

// You can use `MyElement` everywhere to have access to your extensions.
export const ZElement = {
  ...Element,
  isImageElement,
}