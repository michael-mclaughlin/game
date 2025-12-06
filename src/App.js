import React from 'react';
import './App.css';
import SectionWrapper from './components/layout/SectionWrapper.tsx';
import Circle from './components/items/Circle.tsx';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <SectionWrapper customClass='circle-wrapper'>
        <Circle id={'app-circle'}/>
      </SectionWrapper>
    </div>
  );
}

export default App;
