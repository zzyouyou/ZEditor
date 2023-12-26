import { Editor } from "slate"
import { withImages } from "./withImages"
import { withHtml } from "./HtmlParse"
import { withCustomTable } from "./withTable"

export const withParse=(editor: Editor) => {
    return withCustomTable(withImages(withHtml(editor)))
}