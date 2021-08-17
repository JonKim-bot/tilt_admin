import logo from './logo.svg';
import './App.css';
import { Router } from 'react-router-dom';
import Routes from './Routes_bk';
// import UserContextProvider from './context/UserContext';
function App() {
  return (
    // <UserContextProvider>
      <div className="App">
        <Routes></Routes>
      </div>
    // </UserContextProvider>
  );
}

export default App;
