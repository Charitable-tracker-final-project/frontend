// import { useState } from 'react';
import './App.scss';
import useLocalStorageState from 'use-local-storage-state';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Link,
} from 'react-router-dom';
// import axios from 'axios'
import Landing from './components/Landing';
import Home from './components/Home';
import Navbar from './components/Nav/Navbar';
import Profile from './components/Nav/Profile';
import bulma from './images/made-with-bulma--semiblack.png';

function App() {
  const [token, setToken] = useLocalStorageState('QuestionBoxToken', '');
  const [, setStoreUsername] = useLocalStorageState(
    'CharitableTrackerUsername',
    ''
  );
  // const [status, setStatus] = useState(null);

  const setAuth = (username, token) => {
    setStoreUsername(username);
    setToken(token);
  };

  const handleLogOut = (event) => {
    console.log('Handle Log Out Called');
    event.preventDefault();
    // setStatus(null);
    setAuth(null, null);
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
        {!token ? (
          <Routes>
            <>
              <Route
                path='/'
                element={
                  <Landing
                    token={token}
                    setToken={setToken}
                    setAuth={setAuth}
                  />
                }
              />
            </>
          </Routes>
        ) : (
          <>
            <Navbar handleLogOut={handleLogOut} />
            <Profile />
            <Routes>
              <Route path='/' element={<Home handleLogOut={handleLogOut} />} />
            </Routes>
          </>
        )}
      </Router>
      <footer className='footer'>
        <div className='field is-grouped is-grouped-right'>
          <img src={bulma} alt='made with bulma badge' width='195' />
        </div>
      </footer>
    </>
  );
}

export default App;
