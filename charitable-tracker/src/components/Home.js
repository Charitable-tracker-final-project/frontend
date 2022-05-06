import Navbar from './Nav/Navbar';
import Progress from './Home/Progress';
import TimelineCT from './Home/Timeline';
import { useNavigate } from 'react-router-dom';
import Profile from './Nav/Profile';
import Reports from './Reports';
import Volunteering from './Details/Volunteering';
import Donations from './Details/Donations';
import { useState } from 'react';

export default function Home(props) {
  const [progress, setProgress] = useState(true);
  const [timeline, setTimeline] = useState(true);
  const [reports, setReports] = useState(true);
  const [vol, setVol] = useState(true);
  const [dono, setDono] = useState(true);

  return (
    <>
      <div className='column is-narrow'>
        <Profile
          storeUsername={props.storeuUsername}
          token={props.token}
          progress={progress}
          setProgress={setProgress}
          timeline={timeline}
          setTimeline={setTimeline}
          reports={reports}
          setReports={setReports}
          vol={vol}
          setVol={setVol}
          dono={dono}
          setDono={setDono}
        />
      </div>
      <div className='column pl-6'>
        <br></br>
        <main>
          {progress && <Progress token={props.token} />}
          {timeline && <TimelineCT token={props.token} />}
          {reports && <Reports token={props.token} />}
          {vol && <Volunteering token={props.token} />}
          {dono && <Donations token={props.token} />}
        </main>
      </div>
    </>
  );
}
