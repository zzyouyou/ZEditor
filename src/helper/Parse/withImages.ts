import { Editor, Transforms } from "slate"
import { ImageElement } from "../../interface/CUstomElement"
import { E_PARAGRAPH_TYPE } from "../../interface/blockType"
import isUrl from 'is-url'
import imageExtensions from 'image-extensions'

export const withImages = (editor:Editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = element => {
    return element.type === E_PARAGRAPH_TYPE.image ? true : isVoid(element)
  }

  editor.insertData = data => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      console.log('file-image');
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')

        if (mime === E_PARAGRAPH_TYPE.image) {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      console.log('url-image');
      insertImage(editor, text)
    } else {
      console.log('editor-image-data: ', data);
      insertData(data)
    }
  }

  return editor
}

const insertImage = (editor:Editor, url:string) => {
  const text = { text: '' }
  const image: ImageElement = { type: E_PARAGRAPH_TYPE.image, url, children: [text] }
  Transforms.insertNodes(editor, image)
}

const isImageUrl = (url:string) => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext||'')
}