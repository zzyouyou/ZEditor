import React, { useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import "./srmEditor.less"
import { Toolbar } from '../Toolbar/Toolbar';
import { renderElement } from '../RenderElement/RenderElement';
import { renderLeaf } from '../RenderLeaf/RenderLeaf';
import { serialize } from '../../helper/serialize/serialize';
import { CustomEditor } from '../../interface/CUstomElement'
import { CustomEditorHelper } from '../../helper/CustomEditor'
import { ZEditor } from '../../helper/Editor/ZEditor';
import { ZElement } from '../../helper/Element/ZElement';
import { E_PARAGRAPH_TYPE } from '../../interface/blockType';


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

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        // if (event.key === '&') {
        //     event.preventDefault()
        //     editor.insertText('and')
        // }
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
                console.log('editor: ', editor);
                break
            }
            case ('q'): {
                event.preventDefault();
                CustomEditorHelper.testBlock(editor);
                break
            }
            case ('/'): {
                event.preventDefault();
                console.log('event: ', event);
                // CustomEditor.toggleBoldMark(editor);
                break
            }
        }
    }

    const initialValue = useMemo(() => {
        const cacheData = localStorage.getItem('content');
        if (cacheData) {
            return JSON.parse(cacheData);
        } else {
            return [{
                // type: 'requirement',
                type: 'paragraph',
                children: [{ text: '' }],
                // children: [{
                //     type: 'paragraph',
                //     children: [{ text: 'aaa' }, { text: '111' }],
                // },
                // {
                //     type: 'paragraph',
                //     children: [{ text: 'aaa' }, { text: '222' }],
                // }],
            }]
        }
    }, [])


    const SetNodeToDecorations = () => {
        const editor = useSlate()

        const blockEntries = Array.from(
            ZEditor.nodes(editor, {
                at: [],
                mode: 'highest',
                match: n => ZElement.isElement(n) && n.type === E_PARAGRAPH_TYPE.code,
            })
        )

        const nodeToDecorations = mergeMaps(
            ...blockEntries.map(getChildNodeToDecorations)
        )

        editor.nodeToDecorations = nodeToDecorations

        return null
    }
    const mergeMaps = <K, V>(...maps: Map<K, V>[]) => {
        const map = new Map<K, V>()

        for (const m of maps) {
            for (const item of m) {
                map.set(...item)
            }
        }
        return map
    }


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
                        // console.log('typeof value: ', value);  // Object
                        console.log('value: ', value);
                        const isAstChange = editor.operations.some(
                            op => 'set_selection' !== op.type
                        )
                        if (isAstChange) {
                            // Save the value to Local Storage.
                            const content = JSON.stringify(serialize(value))
                            localStorage.setItem('content', content)
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
        </div>
    )
}
