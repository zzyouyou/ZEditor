
// icon
import boldPng from '@assets/toolbar/bold.png'
import codePng from '@assets/toolbar/code.png'
import { CustomEditor } from '../../interface/CUstomElement';
import { CustomEditorHelper } from '../../helper/CustomEditor';

export function Toolbar(props: { editor: CustomEditor }) {
    const { editor } = props;
    console.log('editor: ', editor);

    return (
        <div className='flex p-2 bg-white sticky top-0 z-999 opacity-100 border-x-0 border border-solid border-gray-200' style={{ background: 'rgba(255,255,255,2)' }}>
            <button
                className='flex cursor-pointer hover:bg-gray-200 items-center justify-center p-1'
                onMouseDown={event => {
                    event.preventDefault()
                    CustomEditorHelper.toggleBoldMark(editor)
                }}
            >
                <img className='w-4 h-4' src={boldPng} alt="" />
            </button>
            <button
                className='flex cursor-pointer hover:bg-gray-200 items-center justify-center p-1'
                onMouseDown={event => {
                    event.preventDefault()
                    CustomEditorHelper.toggleCodeBlock(editor)
                }}
            >
                <img className='w-4 h-4' src={codePng} alt="" />
            </button>
        </div>
    )
}
