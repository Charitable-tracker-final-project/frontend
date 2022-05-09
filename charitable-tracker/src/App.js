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
import Landing from './components/Landing';
import Home from './components/Home';
import bulma from './images/made-with-bulma--semiblack.png';
import Register from './components/Register';
import { useState } from 'react';
import GoalSet from './components/GoalSet';
import CreateVolunteer from './components/Goals/CreateVolunteer';
import CreateDonation from './components/Goals/CreateDonation';
import Volunteering from './components/Details/Volunteering';
import Donations from './components/Details/Donations';
import LogDonation from './components/Log/LogDonation';
import LogVolunteering from './components/Log/LogVolunteering';
import EditVolunteering from './components/Edit/EditVolunteering';
import EditDonation from './components/Edit/EditDonation';
import Reports from './components/Reports';
import DonationGoals from './components/Details/DonationGoals';
import VolunteerGoals from './components/Details/VolunteerGoals';
import EditVolunteerGoal from './components/Edit/EditVolunteerGoal';
import EditDonationGoal from './components/Edit/EditDonationGoal';
import SingleDonationGoal from './components/Details/SingleDonationGoal';
import SingleVolunteerGoal from './components/Details/SingleVolunteerGoal';

function App() {
  const [newUser, setNewUser] = useState(false);
  const [token, setToken] = useLocalStorageState('CharitableToken', '');
  const [storeUsername, setStoreUsername] = useLocalStorageState(
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
            {!newUser && <Navbar handleLogOut={handleLogOut} token={token} />}
            <div className='columns is-mobile'>
              {/* {!newUser && (
                <>
                  <div className='column is-narrow'>
                    <Profile storeuUsername={storeUsername} token={token} />
                  </div>
                </>
              )} */}
              <Routes>
                <Route
                  path='/'
                  element={
                    <Home storeuUsername={storeUsername} token={token} />
                  }
                />
                <Route path='/reports' element={<Reports token={token} />} />
                <Route
                  path='/new/donation'
                  element={<LogDonation token={token} />}
                />
                <Route
                  path='/new/volunteer-hours'
                  element={<LogVolunteering token={token} />}
                />
                <Route path='/new/goal' element={<GoalSet />} />
                <Route
                  path='/new/goal/volunteering'
                  element={<CreateVolunteer token={token} />}
                />
                <Route
                  path='/new/goal/donation'
                  element={<CreateDonation token={token} />}
                />
                <Route
                  path='/volunteering'
                  element={<Volunteering token={token} />}
                />
                <Route
                  path='/volunteering/edit/:V_id'
                  element={<EditVolunteering token={token} />}
                />
                <Route
                  path='/donations'
                  element={<Donations token={token} />}
                />
                <Route
                  path='/donations/edit/:D_id'
                  element={<EditDonation token={token} />}
                />
                <Route
                  path='/goals/donation'
                  element={<DonationGoals token={token} />}
                />
                <Route
                  path='/goals/donation/:G_id'
                  element={<SingleDonationGoal token={token} />}
                />
                <Route
                  path='/goals/donation/edit/:G_id'
                  element={<EditDonationGoal token={token} />}
                />
                <Route
                  path='/goals/volunteer'
                  element={<VolunteerGoals token={token} />}
                />
                <Route
                  path='/goals/volunteer/:G_id'
                  element={<SingleVolunteerGoal token={token} />}
                />
                <Route
                  path='/goals/volunteer/edit/:G_id'
                  element={<EditVolunteerGoal token={token} />}
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
