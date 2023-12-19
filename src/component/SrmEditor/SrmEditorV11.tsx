// // 导入 Slate 编辑器工厂。
// import { useCallback, useState } from "react";
// import {
//     createEditor,
//     BaseEditor,
//     Descendant,
//     Transforms,
//     Editor,
// } from "slate";

// // 导入 Slate 组件和 React 插件。
// import {
//     Slate,
//     Editable,
//     withReact,
//     ReactEditor,
//     DefaultElement,
// } from "slate-react";

// type CustomElement = { type: "paragraph"; children: CustomText[] };
// type CustomText = { text: string };

// declare module "slate" {
//     interface CustomTypes {
//         Editor: BaseEditor & ReactEditor;
//         Element: CustomElement;
//         Text: CustomText;
//     }
// }
// const initialValue: Descendant[] = [
//     {
//         type: "paragraph",
//         children: [{ text: "A line of text in a paragraph." }],
//     },
// ];

// export function SrmEditor() {
//     // 创建一个不会在渲染中变化的 Slate 编辑器对象。
//     const [editor] = useState(() => withReact(createEditor()));

//     // 定义基于在元素上传递 `props` 的渲染函数。在这里我们使用 `useCallback`
//     // 记住后续渲染的函数。
//     const renderElement = useCallback((props) => {
//         switch (props.element.type) {
//             case "code":
//                 return <div>8</div>;
//             default:
//                 return <DefaultElement {...props} />;
//         }
//     }, []);

//     return (
//         <div>
//             slate-editor
//             <Slate
//                 editor={editor}
//                 initialValue={initialValue}
//                 onChange={(value) => {
//                     console.log("value: ", value);
//                     // Save the value to Local Storage.
//                     const content = JSON.stringify(value);
//                     localStorage.setItem("content", content);
//                 }}
//             >
//                 <Editable

//                     // 在 `renderElement` 函数中传递。
//                     renderElement={renderElement}
//                     // 定义一个新的处理程序打印按下的键
//                     onKeyDown={(event) => {
//                         console.log(event.key);
//                         if (event.key === "&") {
//                             // 防止插入 `&` 字符。
//                             event.preventDefault();
//                             // 事件发生时执行 `insertText` 方法。
//                             editor.insertText("and");
//                         }
//                         if (event.key === "`" && event.ctrlKey) {
//                             // 默认阻止插入 "`" 行为。
//                             event.preventDefault();
//                             // 否则，把当前选择的块类型设为 "code"
//                             Transforms.setNodes(
//                                 editor,
//                                 { type: "code" },
//                                 { match: (n) => Editor.isBlock(editor, n) }
//                             );
//                         }
//                     }}

//                     onCopy={(event) => {
//                         console.log(event);
//                     }}
//                 />
//             </Slate>
//         </div>
//     );
// }
