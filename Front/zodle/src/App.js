import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import ScriptStore from './ScriptStore/ScriptStore';

//https://legacy.reactjs.org/docs/forms.html


function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/scriptstore' element={<ScriptStore/>} />
          <Route render={() => (
            <h1>404 not found</h1>
          )}></Route>
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
