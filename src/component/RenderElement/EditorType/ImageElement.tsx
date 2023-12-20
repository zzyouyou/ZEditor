import { RenderElementProps, useFocused, useSelected } from "slate-react"
import c from 'classnames'
import { E_PARAGRAPH_TYPE } from "../../../interface/blockType"

export const ImageElement = (props: RenderElementProps) => {
    const selected = useSelected()
    const focused = useFocused()
    return (
        <>
            {props.element.type === E_PARAGRAPH_TYPE.image &&
                <div className='w-full' {...props.attributes}>
                    {props.children}

                    <div className={c('block w-max box-border border-4 border-solid', {
                        'border-blue-400': selected && focused
                    })}>
                        <img src={props.element.url} />
                    </div>
                </div>
            }
        </>
    )
}