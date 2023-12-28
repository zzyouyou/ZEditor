import React, { useCallback, useMemo, useState } from 'react'
import { BaseRange, Editor, Transforms, createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import "./srmEditor.less"
import { Toolbar } from '../Toolbar/Toolbar';
import { renderElement } from '../RenderElement/RenderElement';
import { renderLeaf } from '../RenderLeaf/RenderLeaf';
import { serialize } from '../../helper/serialize/serialize';
import { CustomEditor } from '../../interface/CUstomElement'
import { CustomEditorHelper } from '../../helper/CustomEditor'
import { ZEditor } from '../../helper/CustomApi/Editor/ZEditor';
import { ZRange } from '../../helper/CustomApi/Range/ZRange';
import { withHistory } from 'slate-history'
import _ from 'lodash';
import { E_PARAGRAPH_TYPE } from '../../interface/blockType';
import { withNormalizeNode } from '../../helper/NormalizeNode/NormalizeNode';
import { withParse } from '../../helper/Parse';
import { initData } from '../../interface/initData';


/** 插件体系 */
export type TYPE_EDITOR_PLUGINS = 'toolbar' | 'bold'

/** editor参数 */
type TYPE_EDITOR_PROP = {
    plugins?: TYPE_EDITOR_PLUGINS[],
    boxStyle?: React.CSSProperties,
    bodyStyle?: React.CSSProperties,
    contextMenu?: React.ReactNode
    // toolbar?: React.ReactNode
}


// Define our app...
export const SrmEditor = (props: TYPE_EDITOR_PROP) => {
    const { plugins = [], boxStyle = {}, bodyStyle = {} } = props;

    const [editor] = useState<CustomEditor>(() => withParse(withReact(withHistory(withNormalizeNode(createEditor())))));
    const [target, setTarget] = useState<BaseRange | undefined>()

    const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!event.ctrlKey) {
            return;
        }
        // 快捷键
        console.log('快捷键', event.key);
        switch (String(event.key).toLocaleLowerCase()) {
            // When "`" is pressed, keep our existing code block logic.
            case '`': {
                event.preventDefault()
                CustomEditorHelper.toggleCodeBlock(editor);
                break;
            }
            // When "B" is pressed, bold the text in the selection.
            case ('b'): {
                event.preventDefault();
                CustomEditorHelper.toggleBoldMark(editor);
                break
            }
            case ('r'): {
                event.preventDefault();
                CustomEditorHelper.toggleReqBlock(editor);
                break
            }
            case ('enter'): {
                event.preventDefault();
                CustomEditorHelper.createNewLine(editor);
                break
            }

            case ('1'): {
                event.preventDefault();
                CustomEditorHelper.toggleHeadBlock(editor, 1);
                break
            }
            case ('2'): {
                event.preventDefault();
                CustomEditorHelper.toggleHeadBlock(editor, 2);
                break
            }
            case ('3'): {
                event.preventDefault();
                CustomEditorHelper.toggleHeadBlock(editor, 3);
                break
            }
            case ('4'): {
                event.preventDefault();
                CustomEditorHelper.toggleHeadBlock(editor, 4);
                break
            }
            case ('5'): {
                event.preventDefault();
                CustomEditorHelper.toggleHeadBlock(editor, 5);
                break
            }
            case ('6'): {
                event.preventDefault();
                CustomEditorHelper.toggleHeadBlock(editor, 6);
                break
            }
            case ('p'): {
                event.preventDefault();
                // 检查浏览器是否支持 Clipboard API
                if (navigator.clipboard) {
                    // 尝试读取剪切板内容
                    navigator.clipboard.read()
                        .then(async clipboardData => {
                            console.log('clipboardData: ', clipboardData);
                            // 从clipboardData对象中获取数据
                            for (const clipboardItem of clipboardData) {
                                console.log('clipboardItem: ', clipboardItem);
                                for (const type of clipboardItem.types) {
                                    const blob = await clipboardItem.getType(type);
                                    console.log('blob: ', blob);
                                    console.log(URL.createObjectURL(blob));
                                    // 使用 URL.createObjectURL() 创建表示 Blob 的 URL
                                    const blobUrl = URL.createObjectURL(blob);
                                    // 创建一个 Image 元素
                                    const imgElement = document.createElement('img');
                                    imgElement.src = blobUrl;
                                    // 将 Image 的 src 属性设置为 Blob 的 URL
                                    console.log('imgElement: ', imgElement);
                                }
                            }
                        })
                        .catch(error => {
                            console.error('无法读取剪切板内容:', error);
                        });
                } else {
                    console.error('您的浏览器不支持 Clipboard API');
                }

                window.Clipboard
                break
            }


            case ('q'): {
                event.preventDefault();
                CustomEditorHelper.testBlock(editor);
                break
            }
        }
    }, [editor]);

    const initialValue = useMemo(() => {
        const cacheData = localStorage.getItem('content');
        const serializedData = cacheData ? JSON.parse(cacheData) : null;
        if (serializedData && !_.isEmpty(serializedData)) {
            return serializedData;
        } else {
            return [{
                type: E_PARAGRAPH_TYPE.paragraph,
                children: [initData.blankData],
            }];
        }
    }, [])

    return (
        <div
            id={'srm-editor'}
            className="h-full w-full"
            style={boxStyle}
        >
            <div className="" style={bodyStyle}>
                <Slate
                    editor={editor}
                    initialValue={initialValue}
                    onChange={(value) => {
                        const { selection } = editor
                        console.log('value: ', value);

                        // Save the value to Local Storage.
                        const isAstChange = editor.operations.some(
                            op => 'set_selection' !== op.type
                        )
                        if (isAstChange) {
                            const content = JSON.stringify(serialize(value))
                            localStorage.setItem('content', content)
                        }
                        if (selection && ZRange.isCollapsed(selection)) {
                            const [start, end] = ZRange.edges(selection);//获取当前位置的起点和终点
                            const wordBefore = ZEditor.before(editor, start, { unit: 'word' });// 当前行的起点位置
                            const before = wordBefore && ZEditor.before(editor, wordBefore);//获取上一行终点位置 
                            const beforeRange = before && ZEditor.range(editor, before, start);//获取当前行范围
                            setTarget(beforeRange)
                        }
                    }}

                >
                    {plugins.includes('toolbar') && <Toolbar editor={editor} />}
                    <Editable
                        className='w-full outline-none p-2'
                        onKeyDown={onKeyDown}
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        onCopy={(e) => console.log(e)}
                        onPaste={(e) => console.log(e)}
                        onDragEnd={(e) => console.log('onDragEnd', e)}
                        onDrop={(e) => console.log('onDrop', e)}
                        onChange={e => {
                            console.log(e);
                        }}
                    />
                </Slate>
            </div>
        </div >
    )
}
