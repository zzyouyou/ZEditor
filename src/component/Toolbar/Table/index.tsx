import { Dropdown, DropdownProps, MenuProps, Space } from "antd";
import { toolbarSvg } from "./svg";
import './tableToolbar.less'
import { ReactNode } from "react";
import { Editor } from "slate";
import { ZTableEditor } from "../../../helper/CustomApi/TableEditor/TableEditor";

const tableIcon = toolbarSvg({ width: 15, height: 15 });



export const ToolbarTable = (props: { editor: Editor, children?: ReactNode, trigger?: DropdownProps["trigger"], disableKey?: string[] }) => {
    const { editor, children = undefined, trigger = ["contextMenu", "click"], disableKey = [] } = props;

    const tableItems: MenuProps['items'] = [
        {
            key: '1',
            disabled: disableKey.includes('1'),
            label: <div className="flex items-center gap-2" > {tableIcon.insertTable} 插入表格</div>,
            onClick: () => {
                ZTableEditor.insertTable(editor);
            }
        },
        {
            key: '2',
            disabled: disableKey.includes('2'),
            label: <div className="flex items-center gap-2">{tableIcon.splitCell} 分隔单元格</div>,
            onClick: () => {
                ZTableEditor.split(editor);
            }
        },
        {
            key: '3',
            disabled: disableKey.includes('3'),
            label: <div className="flex items-center gap-2">{tableIcon.mergeCell} 合并单元格</div>,
            onClick: () => {
                ZTableEditor.merge(editor);
            }
        },
        {
            key: '4',
            disabled: disableKey.includes('4'),
            label: <p className="flex items-center gap-2">{tableIcon.insertRow} 行</p>,
            children: [
                {
                    key: '4-1',
                    disabled: disableKey.includes('4-1'),
                    label: <div className="flex items-center gap-2">{tableIcon.insertTopRow} 在上方插入一行</div>,
                    onClick: () => {
                        ZTableEditor.insertRow(editor, { before: true });
                    }
                },
                {
                    key: '4-2',
                    disabled: disableKey.includes('4-2'),
                    label: <div className="flex items-center gap-2">{tableIcon.insertBottomRow} 在下方插入一行</div>,
                    onClick: () => {
                        ZTableEditor.insertRow(editor);
                    }
                },
                {
                    key: '4-3',
                    disabled: disableKey.includes('4-3'),
                    label: <div className="flex items-center gap-2">{tableIcon.rowRemove} 删除行</div>,
                    onClick: () => {
                        ZTableEditor.removeRow(editor);
                    }
                },
            ],
        },
        {
            key: '5',
            disabled: disableKey.includes('5'),
            label: <div className="flex items-center gap-2">{tableIcon.insertColumn} 列</div>,
            children: [
                {
                    key: '5-1',
                    disabled: disableKey.includes('5-1'),
                    label: <div className="flex items-center gap-2">{tableIcon.insertColumnToLeft} 在左侧插入一列</div>,
                    onClick: () => {
                        ZTableEditor.insertColumn(editor, { before: true });
                    }
                },
                {
                    key: '5-2',
                    disabled: disableKey.includes('5-2'),
                    label: <div className="flex items-center gap-2">{tableIcon.insertColumnToRight} 在右侧插入一列</div>,
                    onClick: () => {
                        ZTableEditor.insertColumn(editor);
                    }
                },
                {
                    key: '5-3',
                    disabled: disableKey.includes('5-3'),
                    label: <div className="flex items-center gap-2">{tableIcon.removeColumn} 删除列</div>,
                    onClick: () => {
                        ZTableEditor.removeColumn(editor);
                    }
                },
            ],
        },
        {
            type: 'divider',
        },
        {
            key: '6',
            disabled: disableKey.includes('6'),
            label: <div className="flex items-center gap-2 text-red-600">{tableIcon.deleteTable} 删除表格</div>,
            onClick: () => {
                ZTableEditor.removeTable(editor);
            }
        },
    ];

    return <Dropdown menu={{ items: tableItems }} trigger={trigger}>
        {children}
    </ Dropdown>
}