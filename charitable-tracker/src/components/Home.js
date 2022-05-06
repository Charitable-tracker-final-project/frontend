import Navbar from './Nav/Navbar';
import Progress from './Home/Progress';
import TimelineCT from './Home/Timeline';
import { useNavigate } from 'react-router-dom';
import Profile from './Nav/Profile';
import Reports from './Reports';
import Volunteering from './Details/Volunteering';
import Donations from './Details/Donations';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function Home(props) {
  const [cookies, setCookie] = useCookies(['settings']);
  const [progress, setProgress] = useState(true);
  const [timeline, setTimeline] = useState(true);
  const [reports, setReports] = useState(false);
  const [vol, setVol] = useState(false);
  const [dono, setDono] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const settings = cookies.settings;
    console.log(settings);
    settings && setProgress(settings.progress);
    settings && setTimeline(settings.timeline);
    settings && setReports(settings.reports);
    settings && setVol(settings.vol);
    settings && setDono(settings.dono);
  }, []);

  return (
    <>
      <div className='column is-narrow'>
        <Profile
          storeUsername={props.storeuUsername}
          token={props.token}
          cookies={cookies}
          setCookie={setCookie}
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
      <div className='column ml-6 pl-4'>
        <br></br>
        <main className='ml-3'>
          {!progress && !timeline && !reports && !vol && !dono && (
            <h1>hello world!</h1>
          )}
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
