import { Editor } from 'slate';
import {  TableEditor } from 'slate-table'
import { ZEditor } from '../Editor/ZEditor';
import { initData } from '../../../interface/initData';

interface InsertTableOptions {
  rows: number;
  cols: number;
  at?: Location;
}


// https://github.com/nlulic/slate-table

/** 添加ZTableEditor方法 */
export const ZTableEditor = {
    ...TableEditor,
    insertTable(editor: Editor, options: Partial<InsertTableOptions> = {}): void {
        ZEditor.insertNode(editor, initData.table);
  },
}