import Progress from './Home/Progress';
import TimelineCT from './Home/Timeline';
import { useNavigate } from 'react-router-dom';
import Profile from './Nav/Profile';

export default function Home({ handleLogOut }) {
  return (
    <>
      {/* <div className='column is-narrow'>
        <Profile />
      </div> */}
      <div className='column'>
        <br></br>
        <main>
          <Progress />
          <TimelineCT />
        </main>
      </div>
    </>
  );
}
