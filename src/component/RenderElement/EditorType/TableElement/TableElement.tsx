import { RenderElementProps, useSlateSelection, useSlateStatic } from 'slate-react'
import { E_PARAGRAPH_TYPE } from '../../../../interface/blockType'
import { TableCursor } from 'slate-table';
import { FC } from 'react';
import { CustomElement } from '../../../../interface/CUstomElement';
import { ToolbarTable } from '../../../Toolbar/Table';

interface Tr {
    type: E_PARAGRAPH_TYPE.tableRow;
    children: Array<Td | Th>;
}
interface Th {
    type: E_PARAGRAPH_TYPE.tableHeadCell;
    rowSpan?: number;
    colSpan?: number;
    children: Array<CustomElement | Text>;
}
interface Td {
    type: E_PARAGRAPH_TYPE.tableCell;
    rowSpan?: number;
    colSpan?: number;
    children: Array<CustomElement | Text>;
}

interface TableHead {
    type: E_PARAGRAPH_TYPE.tableHead;
    children: Tr[];
}
interface TableBody {
    type: E_PARAGRAPH_TYPE.tableBody;
    children: Tr[];
}
interface TableFooter {
    type: E_PARAGRAPH_TYPE.tableFooter;
    children: Tr[];
}

interface Table {
    type: E_PARAGRAPH_TYPE.table;
    children: Array<TableHead | TableBody | TableFooter>;
}

const Table: FC<RenderElementProps & { className: string }> = ({
    attributes,
    children,
    className,
}) => {
    const editor = useSlateStatic();
    const [isSelecting] = TableCursor.selection(editor);

    return (
        <ToolbarTable editor={editor} trigger={["contextMenu"]} disableKey={['1']}>
            <table
                className={`${isSelecting ? "table-selection-none" : ""} ${className} w-full table-fixed my-4 text-center`}
                {...attributes}
            >
                {children}
            </table>
        </ToolbarTable>
    );
};

const Th: FC<RenderElementProps & { className: string }> = ({
    attributes,
    children,
    className,
    element,
}) => {
    if (element.type !== E_PARAGRAPH_TYPE.tableHeadCell) {
        throw new Error('Element "Th" must be of type "header-cell"');
    }
    useSlateSelection();
    const editor = useSlateStatic();
    const selected = TableCursor.isSelected(editor, element);

    return (
        <th
            className={`${selected ? "bg-sky-200" : ""} ${className} p-2 border border-solid border-gray-300`}
            rowSpan={element.rowSpan}
            colSpan={element.colSpan}
            {...attributes}
        >
            {children}
        </th>
    );
};

const Td: FC<RenderElementProps & { className: string }> = ({
    attributes,
    children,
    className,
    element,
}) => {
    if (element.type !== E_PARAGRAPH_TYPE.tableCell) {
        throw new Error('Element "Td" must be of type "table-cell"');
    }

    useSlateSelection();
    const editor = useSlateStatic();
    const selected = TableCursor.isSelected(editor, element);

    return (
        <td
            className={`${selected ? "bg-sky-200" : ""} ${className} p-2 border border-solid border-gray-300`}
            rowSpan={element.rowSpan}
            colSpan={element.colSpan}
            {...attributes}
        >
            {children}
        </td>
    );
};


export const TableElement = (props: RenderElementProps) => {
    return (
        <Table className=""
            {...props}
        />
    )
}
export const TableHeadElement = (props: RenderElementProps) => {
    return <thead
        className="border-b text-sm uppercase bg-slate-100"
        {...props.attributes}
    >
        {props.children}
    </thead>
}
export const TableBodyElement = (props: RenderElementProps) => {
    return <tbody className="border-b text-sm" {...props.attributes}>{props.children}</tbody>
}
export const TableFootElement = (props: RenderElementProps) => {
    return <tfoot className="" {...props.attributes}>{props.children}</tfoot>
}
export const TableRowElement = (props: RenderElementProps) => {
    return <tr {...props.attributes}>{props.children}</tr>
}
export const TableHeadCellElement = (props: RenderElementProps) => {
    return <Th className="border border-gray-400 p-2 align-middle	" {...props} />
}
export const TableCellElement = (props: RenderElementProps) => {
    return <Td className="border border-gray-400 p-2 align-middle	" {...props} />
}


// // Define a React component renderer for our code blocks.
// export const TableElement = (props: RenderElementProps) => {
//     switch (props.element.type) {
//         case E_PARAGRAPH_TYPE.table:
//             return (
//                 <Table className="table-fixed my-4 sm:w-1/2 w-full text-center"
//                     {...props}
//                 />
//             );
//         case E_PARAGRAPH_TYPE.tableHead:
//             return (
//                 <thead
//                     className="border-b text-sm uppercase bg-slate-100"
//                     {...props.attributes}
//                 >
//                     {props.children}
//                 </thead>
//             );
//         case E_PARAGRAPH_TYPE.tableBody:
//             return <tbody className="border-b text-sm" {...props.attributes}>{props.children}</tbody>
//         case E_PARAGRAPH_TYPE.tableFooter:
//             return (
//                 <tfoot className="" {...props.attributes}>
//                     {props.children}
//                 </tfoot>
//             );
//         case E_PARAGRAPH_TYPE.tableRow:
//             return <tr {...props.attributes}>{props.children}</tr>;
//         case E_PARAGRAPH_TYPE.tableHeadCell:
//             return <Th className="border border-gray-400 p-2 align-middle	" {...props} />
//         case E_PARAGRAPH_TYPE.tableCell:
//             return <Td className="border border-gray-400 p-2 align-middle	" {...props} />
//         default:
//             return <p {...props.attributes}>{props.children}</p>;
//     }
// }
