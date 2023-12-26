import { RenderElementProps, useFocused, useSelected, useSlateStatic } from "slate-react"
import { E_PARAGRAPH_TYPE } from "../../../interface/blockType"
import { css } from '@emotion/css'

export const ImageElement = (props: RenderElementProps) => {
    const editor = useSlateStatic()
    const path = editor.selection;

    const selected = useSelected()
    const focused = useFocused()
    return (
        <>
            {props.element.type === E_PARAGRAPH_TYPE.image &&
                <div {...props.attributes}>
                    {props.children}
                    <div
                        contentEditable={false}
                        className={'relative p-[3px]'}
                    >
                        <img
                            src={props.element.url}
                            className={css`
                                display: block;
                                max-width: 100%;
                                max-height: 20em;
                                box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
                            `}
                        />
                        {/* <button
                            onClick={() => Transforms.removeNodes(editor, { at: path })}
                            className={css`
                                display: ${selected && focused ? 'inline' : 'none'};
                                position: absolute;
                                top: 0.5em;
                                left: 0.5em;
                                background-color: white;
                            `}
                        >
                            delete
                        </button> */}
                    </div>
                </div>}
        </>
    )
}