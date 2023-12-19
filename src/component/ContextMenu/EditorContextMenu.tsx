import React, { useState } from 'react'
import { ContextMenu } from './ContextMenu';

export default function EditorContextMenu() {
    // 右键菜单
    const [rightClickInfo, setRightClickInfo] = useState<React.MouseEvent<HTMLDivElement, MouseEvent>>();
    const [isShow, setIsShow] = useState<boolean>(false);

    return (
        <div>

            {rightClickInfo && isShow && (
                <ContextMenu
                    eventInfo={rightClickInfo}
                    isShow={isShow}
                    onFinish={() => {
                        setIsShow(false);
                    }}
                    menu={[
                        {
                            label: '新建一级章节',
                            key: '1',
                            hidden: false,
                            event: async () => {
                                console.log(1);
                            }
                        },
                        {
                            label: <div className="flex text-red-500">删除标记条目</div>,
                            key: '2',
                            event: async () => {
                                console.log(2);
                            }
                        }
                    ]}
                />
            )}
        </div>
    )
}
