import React from 'react';
import './index.css';
import SectionWrapper from './components/layout/SectionWrapper.tsx';
import Circle from './components/items/Circle.tsx';
import DivWrapper from './components/layout/DivWrapper.tsx';
import SideDrawerContainer from './components/custom/SideDrawerContainer.tsx';
function App() {

  return (
    <DivWrapper className="App">
      {/* <header className="App-header">
      </header> */}
      <SideDrawerContainer />
      <SectionWrapper customClass='circle-wrapper'>
        <Circle id={'app-circle'} />
      </SectionWrapper>
    </DivWrapper>
  );
}

export default App;
