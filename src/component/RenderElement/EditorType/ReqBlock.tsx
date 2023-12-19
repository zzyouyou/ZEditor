import { RenderElementProps } from 'slate-react'

/**
 * 定义的是需求条目的block
 * @param props 
 * @returns 
 */
export const ReqElement = (props: RenderElementProps) => {
    return (
        <div {...props.attributes} className='bg-gray-200'>
            <div className="p-1 border-b border-solid border-gray-400 text-xs text-gray-500 select-none" contentEditable={false}>
                SRR-需求条目
            </div>
            <div className=" p-2">
                {props.children}
            </div>
        </div>
    )
}
