import "./App.css";
// import { SrmEditor } from "./SrmEditor";
import { SrmEditor } from "./component/SrmEditor/SrmEditor";
function App() {

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
