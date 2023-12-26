import { DefaultElement, RenderElementProps } from "slate-react"
import { E_PARAGRAPH_TYPE } from "../../interface/blockType"
import { ParagraphElement } from "./EditorType/ParagraphElement"
import { CodeElement } from "./EditorType/CodeElement"
import { HeadElement } from "./EditorType/HeadElement"
import { TableBodyElement, TableCellElement, TableElement, TableFootElement, TableHeadCellElement, TableHeadElement, TableRowElement } from "./EditorType/TableElement/TableElement"
import { ContextMenu } from "../ContextMenu/ContextMenu"

/**
 * 渲染元素组件
 * @param props 
 * @returns 
 */
export const renderElement = (props: RenderElementProps) => {
    const { element } = props;
    let result;
    if (element.type === E_PARAGRAPH_TYPE.paragraph)
        result = <ParagraphElement {...props} />;
    else if (element.type === E_PARAGRAPH_TYPE.codeBlock)
        result = <CodeElement {...props} />;
    else if (element.type === E_PARAGRAPH_TYPE.heading)
        result = <HeadElement {...props} />;
    else if (element.type === E_PARAGRAPH_TYPE.image)
        result = <ParagraphElement {...props} />;
    else if (element.type === E_PARAGRAPH_TYPE.requirement)
        result = <ParagraphElement {...props} />;

    else if (element.type === E_PARAGRAPH_TYPE.table)
        result = <TableElement {...props} />;
    else if (element.type === E_PARAGRAPH_TYPE.tableHead)
        result = <TableHeadElement {...props} />;
    else if (element.type === E_PARAGRAPH_TYPE.tableBody)
        result = <TableBodyElement {...props} />;
    else if (element.type === E_PARAGRAPH_TYPE.tableFooter)
        result = <TableFootElement {...props} />;
    else if (element.type === E_PARAGRAPH_TYPE.tableRow)
        result = <TableRowElement {...props} />;
    else if (element.type === E_PARAGRAPH_TYPE.tableHeadCell)
        result = <TableHeadCellElement {...props} />;
    else if (element.type === E_PARAGRAPH_TYPE.tableCell)
        result = <TableCellElement {...props} />;
    else
        result = <DefaultElement {...props} />;

    // switch (element.type) {
    //     case E_PARAGRAPH_TYPE.paragraph:
    //         return <ParagraphElement {...props} />
    //     case E_PARAGRAPH_TYPE.codeBlock:
    //         return <CodeElement {...props} />
    //     case E_PARAGRAPH_TYPE.heading:
    //         return <HeadElement {...props} />
    //     case E_PARAGRAPH_TYPE.image:
    //         return <ImageElement {...props} />
    //     case E_PARAGRAPH_TYPE.requirement:
    //         return <ReqElement {...props} />

    //     case E_PARAGRAPH_TYPE.table:
    //         return <TableElement {...props} />
    //     case E_PARAGRAPH_TYPE.tableHead:
    //         return <TableHeadElement {...props} />
    //     case E_PARAGRAPH_TYPE.tableBody:
    //         return <TableBodyElement {...props} />
    //     case E_PARAGRAPH_TYPE.tableFooter:
    //         return <TableFootElement {...props} />
    //     case E_PARAGRAPH_TYPE.tableRow:
    //         return <TableRowElement {...props} />
    //     case E_PARAGRAPH_TYPE.tableHeadCell:
    //         return <TableHeadCellElement {...props} />
    //     case E_PARAGRAPH_TYPE.tableCell:
    //         return <TableCellElement {...props} />

    //     default:
    //         return <DefaultElement {...props} />
    // }

    return <ContextMenu trigger={['contextMenu']} >{result}</ContextMenu>;
}
