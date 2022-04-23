// import { useState } from 'react';
import './App.css';
import useLocalStorageState from 'use-local-storage-state';
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
  const [token, setToken] = useLocalStorageState('QuestionBoxToken', '');
  // const [status, setStatus] = useState(null);

  const handleLogOut = (event) => {
    console.log('Handle Log Out Called');
    event.preventDefault();
    // setStatus(null);
    setToken('');
    // axios
    //   .post(
    //     'https://questionbox-rocket.herokuapp.com/auth/token/logout/',
    //     {},
    //     {
    //       headers: { Authorization: `Token ${token}` },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     setStatus(res.status);
    //     setAuth(null, null);
    //     navigate('/');
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     setStatus(e.status);
    //     setAuth(null, null);
    //     navigate('/');
    //   });
  };

  return (
    <>
      <Router>
        <Routes>
          {!token ? (
            <>
              <Route
                path='/'
                element={<Landing token={token} setToken={setToken} />}
              />
            </>
          ) : (
            <>
              <Route path='/' element={<Home handleLogOut={handleLogOut} />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
