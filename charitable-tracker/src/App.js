import './App.scss';
import useLocalStorageState from 'use-local-storage-state';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Nav/Navbar';
import Landing from './components/Landing';
import Home from './components/Home';
import Register from './components/Register';
import { useState } from 'react';
import LogDonation from './components/Log/LogDonation';
import LogVolunteering from './components/Log/LogVolunteering';
import EditVolunteering from './components/Edit/EditVolunteering';
import EditDonation from './components/Edit/EditDonation';

function App() {
  const [newUser, setNewUser] = useState(false);
  const [token, setToken] = useLocalStorageState('CharitableToken', '');
  const [storeUsername, setStoreUsername] = useLocalStorageState(
    'CharitableTrackerUsername',
    ''
  );

  const setAuth = (username, token) => {
    setStoreUsername(username);
    setToken(token);
  };

  const handleLogOut = (event) => {
    console.log('Handle Log Out Called');
    event.preventDefault();
    setAuth(null, null);
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
            {!newUser && <Navbar handleLogOut={handleLogOut} token={token} />}
            <div className='columns is-mobile'>
              <Routes>
                <Route
                  path='/'
                  element={
                    <Home storeuUsername={storeUsername} token={token} />
                  }
                />
                <Route
                  path='/new/donation'
                  element={<LogDonation token={token} />}
                />
                <Route
                  path='/new/volunteer-hours'
                  element={<LogVolunteering token={token} />}
                />
                <Route
                  path='/volunteering/edit/:V_id'
                  element={<EditVolunteering token={token} />}
                />
                <Route
                  path='/donations/edit/:D_id'
                  element={<EditDonation token={token} />}
                />
              </Routes>
            </div>
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
    </>
  );
}

export default App;
