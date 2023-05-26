import React from 'react';
import useState from 'react';
import Start from './components/Start';
import Questions from './components/Questions';

function App() {
  const [start, setStart] = React.useState(true)
  const [checked, setChecked] = React.useState([])

  function mainPage(){
      setStart(prev => !prev)
  }


  return (
    <div>
        {start ? <Start mainPage={mainPage}/> :
         <Questions />}
      </div>
  );
}

export default App;
