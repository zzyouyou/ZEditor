import { Editor } from "slate";
import { withTable } from "slate-table";
import { E_PARAGRAPH_TYPE } from "../../interface/blockType";

export const withCustomTable = (editor:Editor) => {
    return withTable(editor, {
                blocks: { 
                    table: E_PARAGRAPH_TYPE.table, 
                    thead: E_PARAGRAPH_TYPE.tableHead,
                    tbody: E_PARAGRAPH_TYPE.tableBody,
                    tfoot: E_PARAGRAPH_TYPE.tableFooter,
                    tr: E_PARAGRAPH_TYPE.tableRow,
                    th: E_PARAGRAPH_TYPE.tableHeadCell,
                    td: E_PARAGRAPH_TYPE.tableCell,
                    content: E_PARAGRAPH_TYPE.paragraph,
                },
                        
                withDelete: true,
                withFragments: true,
                withInsertText: true,
                withNormalization: true,
                withSelection: true,
                withSelectionAdjustment: true,
            });
}