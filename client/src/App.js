import './App.css';
import {Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Create from './components/Create';
import Detail from './components/Detail';

function App() {
  return (
    <div className="App">
    <>
      <Route exact path = "/" component = {LandingPage} />
      <Route exact path = "/home" component = {Home} />
      <Route exact path = "/addGame" component = {Create} />
      <Route exact path ="/home/:id" component={Detail} />
    </>
    </div>
  );
}

export default App;
