// import logo from './logo.svg';
import './App.css';
// import useLocalStorageState from 'use-local-storage-state'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Link,
  // useNavigate,
} from 'react-router-dom';
// import axios from 'axios'
import Landing from './components/Landing';
import Home from './components/Home';

function App() {
  console.log('Hello, World!');
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
