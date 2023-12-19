import * as _ from 'lodash'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import c from 'classnames';
import ReactDOM from 'react-dom';

interface IProps {
  // 鼠标点击事件
  eventInfo: React.MouseEvent<HTMLDivElement, MouseEvent>;
  // 是否显示
  isShow: boolean;
  // 关闭显示
  onFinish: () => void;
  // 菜单选项
  menu: {
    label: string | JSX.Element;
    key: string | number;
    /** 是否隐藏，默认显示 */
    disable?: boolean;
    hidden?: boolean;
    event: () => void;
  }[];
}
export const ContextMenu = (props: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  }>();

  useEffect(() => {
    if (menuRef.current) {
      const mouseX = props.eventInfo.clientX;
      const mouseY = props.eventInfo.clientY;
      const screenWidth = document.documentElement.clientWidth;
      const screenHeight = document.documentElement.clientHeight;
      const menuWidth = menuRef.current.offsetWidth;
      const menuHeight = menuRef.current.offsetHeight;

      // 计算菜单的最大可见位置
      const maxMenuX = screenWidth - menuWidth;
      const maxMenuY = screenHeight - menuHeight;

      // 根据鼠标位置和屏幕尺寸计算最终菜单位置
      const menuX = Math.min(maxMenuX, mouseX);
      const menuY = Math.min(maxMenuY, mouseY);
      setMenuPosition({ top: menuY - 10, left: menuX - 10 });
    }
  }, [props]);

  const RenderRes = useCallback(() => {
    if (!props.isShow) return;
    else {
      return (
        <div
          ref={boxRef}
          className="flex fixed top-0 bottom-0 left-0 right-0 z-50"
          onClick={(e) => {
            props.onFinish();
          }}
          onContextMenu={() => {
            props.onFinish();
          }}
        >
          <div
            className="flex flex-col bg-white py-2 w-max h-max rounded-md absolute"
            ref={menuRef}
            style={{
              top: menuPosition?.top ?? props.eventInfo.clientY,
              left: menuPosition?.left ?? props.eventInfo.clientX,
              boxShadow: '0px 5px 20px 2px rgba(0, 0, 0, 0.1)',
              zIndex: 9999
            }}
          >
            {!_.isEmpty(props.menu) &&
              props.menu.map((item) => {
                if (!item.hidden) {
                  return (
                    <div
                      key={item.key}
                      style={{ zIndex: '99999' }}
                      className={c("flex py-2 px-4 w-full items-center justify-start cursor-pointer", item.disable ? 'text-gray-300 hover:cursor-not-allowed' : 'hover:bg-srmCommonColor-hover ')}
                      onClick={async () => {
                        await item.event();
                        props.onFinish();
                      }}
                    >
                      {item.label}
                    </div>
                  );
                } else {
                  return;
                }
              })}
          </div>
        </div>
      )
    }
  }, [props, menuPosition])

  return ReactDOM.createPortal(<RenderRes />, document.getElementById('root') as HTMLElement);
};
