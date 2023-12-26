import { Dropdown, DropdownProps } from 'antd'

export function ContextMenu(props: DropdownProps) {
  const { menu = undefined } = props;

  return <Dropdown {...props} menu={menu} />
}
