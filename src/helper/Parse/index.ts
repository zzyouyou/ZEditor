import { Editor } from "slate"
import { withImages } from "./withImages"
import { withHtml } from "./HtmlParse"

export const withParse=(editor: Editor) => {
    return withImages(withHtml(editor))
}