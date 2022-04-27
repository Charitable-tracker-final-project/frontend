import Progress from './Home/Progress';
import TimelineCT from './Home/Timeline';
import { useNavigate } from 'react-router-dom';
import Navbar from './Nav/Navbar';
import Profile from './Nav/Profile';

export default function Home({ handleLogOut }) {
  return (
    <>
      <Navbar handleLogOut={handleLogOut} />
      <div className='columns is-mobile'>
        <div className='column is-narrow'>
          <Profile />
        </div>
        <div className='column'>
          <br></br>
          <main>
            <Progress />
            <TimelineCT />
          </main>
        </div>
      </div>
    </>
  );
}
