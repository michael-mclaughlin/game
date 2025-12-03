import './App.css';
import SectionWrapper from './components/layout/SectionWrapper.tsx';
import Circle from './components/items/Circle.tsx';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <SectionWrapper>
        <Circle/>
      </SectionWrapper>
    </div>
  );
}

export default App;
