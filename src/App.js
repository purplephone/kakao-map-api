import logo from './logo.svg';
import './App.css';
import Map from './Map';
import React from 'react';

function App() {

  // const [selected,setSelected] = React.useState(2)
  
  return (
    <div>
      <Map/>
      {/* {selected === 2 ? 
      <button>선택된 버튼</button>:
      <button _onClike={() => {
        setSelected(2)
      }}>비활성화된 버튼</button>
      }
      {selected === 3 ? 
      <button>선택된 버튼</button>:
      <button _onClike={() => {
        setSelected(3)
      }}>비활성화된 버튼</button>
      }
      {selected === 4 ? 
      <button>선택된 버튼</button>:
      <button _onClike={() => {
        setSelected(4)
      }}>비활성화된 버튼</button>
      } */}
    </div>
  );
}

export default App;
