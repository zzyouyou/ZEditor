import { useEffect } from "react";
import "./App.css";
// import { SrmEditor } from "./SrmEditor";
import { SrmEditor } from "./component/SrmEditor/SrmEditor";
function App() {

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      // 这里可以添加全局右键点击事件的处理逻辑
    };
    document.addEventListener("contextmenu", handleContextMenu)
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

  return (
    <div className="flex flex-col h-full">
      <SrmEditor
        boxStyle={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          backgroundColor: '#e5e7eb',
          overflow: 'auto'
        }}
        bodyStyle={{
          flex: 1,
          backgroundColor: 'white',
          maxWidth: '960px',
          margin: '10px auto',
          width: '960px'
        }}
        plugins={['toolbar']}
      />
    </div>
  );
}

export default App;
