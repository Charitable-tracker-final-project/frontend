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
import Register from './components/Register';
import { useState } from 'react';

function App() {
  const [newUser, setNewUser] = useState(null);
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
                    setNewUser={setNewUser}
                  />
                }
              />
            </>
          </Routes>
        ) : (
          <>
            {!newUser && (
              <>
                <Navbar handleLogOut={handleLogOut} />
                <div className='columns is-mobile'>
                  <div className='column is-narrow'>
                    <Profile />
                  </div>
                  <div className='column'>
                    <br></br>
                    <main>
                      <Routes>
                        <Route
                          path='/'
                          element={<Home handleLogOut={handleLogOut} />}
                        />
                      </Routes>
                    </main>
                  </div>
                </div>
              </>
            )}
          </>
        )}
        <Routes>
          <Route
            path='/register'
            element={
              <Register
                token={token}
                setToken={setToken}
                newUser={newUser}
                setNewUser={setNewUser}
                setAuth={setAuth}
              />
            }
          />
        </Routes>
      </Router>
      <footer className='footer has-background-white p-1 m-0'>
        <div className='field is-grouped is-grouped-right p-0 m-0'>
          <img src={bulma} alt='made with bulma badge' width='195' />
        </div>
        <div className='has-text-black is-size-7 has-text-right p-0 m-0'>
          {/* <i>designed by Adam Lindgren</i> */}
        </div>
      </footer>
    </>
  );
}

export default App;
