import './App.scss';
import useLocalStorageState from 'use-local-storage-state';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Link,
} from 'react-router-dom';
// import axios from 'axios'
import Navbar from './components/Nav/Navbar';
import Profile from './components/Nav/Profile';
import Landing from './components/Landing';
import Home from './components/Home';
import bulma from './images/made-with-bulma--semiblack.png';
import Register from './components/Register';
import { useState } from 'react';
import GoalSet from './components/GoalSet';
import CreateVolunteer from './components/Goals/CreateVolunteer';
import CreateDonation from './components/Goals/CreateDonation';
import Volunteering from './components/Details/Volunteering';

function App() {
  const [newUser, setNewUser] = useState(false);
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
            {!newUser && <Navbar handleLogOut={handleLogOut} />}
            <div className='columns is-mobile'>
              {!newUser && (
                <>
                  <div className='column is-narrow'>
                    <Profile />
                  </div>
                </>
              )}
              <div className='column'>
                <br></br>
                <main>
                  <Routes>
                    <Route
                      path='/'
                      element={<Home handleLogOut={handleLogOut} />}
                    />
                    <Route path='/new/goal' element={<GoalSet />} />
                    <Route
                      path='/new/goal/volunteering'
                      element={<CreateVolunteer />}
                    />
                    <Route
                      path='/new/goal/donation'
                      element={<CreateDonation />}
                    />
                    <Route path='/volunteering' element={<Volunteering />} />
                  </Routes>
                </main>
              </div>
            </div>
          </>
        )}
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
