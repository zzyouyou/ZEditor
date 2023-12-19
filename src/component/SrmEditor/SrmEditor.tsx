import React, { useCallback, useMemo, useState } from 'react'
import { BaseRange, createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import "./srmEditor.less"
import { Toolbar } from '../Toolbar/Toolbar';
import { renderElement } from '../RenderElement/RenderElement';
import { renderLeaf } from '../RenderLeaf/RenderLeaf';
import { serialize } from '../../helper/serialize/serialize';
import { CustomEditor } from '../../interface/CUstomElement'
import { CustomEditorHelper } from '../../helper/CustomEditor'
import { ZEditor } from '../../helper/Editor/ZEditor';
import { ZRange } from '../../helper/Range/ZRange';


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

    const [editor] = useState<CustomEditor>(() => withReact(createEditor()));
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
            case ('1'): {
                event.preventDefault();
                console.log('editor: ', editor);
                break
            }
            case ('q'): {
                event.preventDefault();
                CustomEditorHelper.testBlock(editor);
                break
            }
            case ('enter'): {
                event.preventDefault();
                CustomEditorHelper.createNewLine(editor);
                break
            }
            case ('/'): {
                event.preventDefault();
                console.log('event: ', event);
                // CustomEditor.toggleBoldMark(editor);
                break
            }
        }
    }, [editor])

    const initialValue = useMemo(() => {
        const cacheData = localStorage.getItem('content');
        if (cacheData) {
            return JSON.parse(cacheData);
        } else {
            return [{
                type: 'paragraph',
                children: [{ text: '' }],
            }]
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
                        // console.log('typeof value: ', value);  // Object
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
                            // console.log('beforeRange: ', beforeRange);
                            setTarget(beforeRange)
                        }
                    }}

                >
                    {plugins.includes('toolbar') && <Toolbar editor={editor} />}
                    {/* {props?.contextMenu&& } */}
                    <Editable
                        className='w-full h-full outline-none p-2'
                        onKeyDown={onKeyDown}
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        onChange={e => {
                            console.log(e);
                        }}
                    />
                </Slate>
            </div>
        </div >
    )
}
