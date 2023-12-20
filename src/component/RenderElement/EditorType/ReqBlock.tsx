import { RenderElementProps } from 'slate-react'
import { E_PARAGRAPH_TYPE } from '../../../interface/blockType';

/**
 * 定义的是需求条目的block
 * @param props 
 * @returns 
 */
export const ReqElement = (props: RenderElementProps) => {
    const { element, children } = props;
    return (
        <div {...props.attributes} className='bg-gray-200 w-full'>
            <div className="flex items-center justify-between p-1 border-b border-solid border-gray-400 text-xs text-gray-500 select-none" contentEditable={false}>
                <p className="">SRR-需求条目</p>
                {element.type === E_PARAGRAPH_TYPE.requirement && <p className="">{element.system}</p>}
            </div>
            <div className=" p-2">
                {children}
            </div>
        </div>
    )
}
