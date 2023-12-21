import { RenderElementProps, useFocused, useSelected } from "slate-react"
import { E_PARAGRAPH_TYPE } from "../../../interface/blockType"

export const HeadElement = (props: RenderElementProps) => {
    const selected = useSelected()
    const focused = useFocused()
    return (
        <>
            {props.element.type === E_PARAGRAPH_TYPE.heading &&
                <div className='w-full' {...props.attributes}>
                    {props.element.level === 1 && <h1>{props.children}</h1>}
                    {props.element.level === 2 && <h2>{props.children}</h2>}
                    {props.element.level === 3 && <h3>{props.children}</h3>}
                    {props.element.level === 4 && <h4>{props.children}</h4>}
                    {props.element.level === 5 && <h5>{props.children}</h5>}
                    {props.element.level === 6 && <h6>{props.children}</h6>}
                </div>
            }
        </>
    )
}