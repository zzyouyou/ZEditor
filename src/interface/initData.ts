import {  CustomText, TableElement } from "./CUstomElement";
import { E_PARAGRAPH_TYPE } from "./blockType";

type T_INIT_DATA = {
    table: TableElement,
    blankData: CustomText
}

// 用于初始化的数据
export const initData:T_INIT_DATA = {
    table:{
            type: E_PARAGRAPH_TYPE.table, children: [
                {
                    type: E_PARAGRAPH_TYPE.tableHead, children: [
                        {
                            type: E_PARAGRAPH_TYPE.tableRow, children: [
                                {
                                    type: E_PARAGRAPH_TYPE.tableHeadCell, children: [
                                        {
                                            type: E_PARAGRAPH_TYPE.paragraph, children: [
                                                { text: '' }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    type: E_PARAGRAPH_TYPE.tableHeadCell, children: [
                                        {
                                            type: E_PARAGRAPH_TYPE.paragraph, children: [
                                                { text: '' }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    type: E_PARAGRAPH_TYPE.tableHeadCell, children: [
                                        {
                                            type: E_PARAGRAPH_TYPE.paragraph, children: [
                                                { text: '' }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    type: E_PARAGRAPH_TYPE.tableBody, children: [
                        {
                            type: E_PARAGRAPH_TYPE.tableRow, children: [
                                {
                                    type: E_PARAGRAPH_TYPE.tableCell, children: [
                                        {
                                            type: E_PARAGRAPH_TYPE.paragraph, children: [
                                                { text: '' }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    type: E_PARAGRAPH_TYPE.tableCell, children: [
                                        {
                                            type: E_PARAGRAPH_TYPE.paragraph, children: [
                                                { text: '' }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    type: E_PARAGRAPH_TYPE.tableCell, children: [
                                        {
                                            type: E_PARAGRAPH_TYPE.paragraph, children: [
                                                { text: '' }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
    },
    // 初始化编辑器数据
    blankData: { text: '' }
}