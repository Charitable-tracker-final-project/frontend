import Navbar from './Nav/Navbar';
import Progress from './Home/Progress';
import TimelineCT from './Home/Timeline';
import { useNavigate } from 'react-router-dom';
import Profile from './Nav/Profile';
import Reports from './Reports';
import Volunteering from './Details/Volunteering';
import Donations from './Details/Donations';
import Graphs2 from './Reports/Graphs2';
import Graphs4 from './Reports/Graphs4';
import Graphs6 from './Reports/Graphs6';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function Home(props) {
  const [cookies, setCookie] = useCookies(['settings']);
  const [progress, setProgress] = useState(true);
  const [timeline, setTimeline] = useState(true);
  const [graphs2, setGraphs2] = useState(false);
  const [graphs4, setGraphs4] = useState(false);
  const [graphs6, setGraphs6] = useState(false);
  const [vol, setVol] = useState(false);
  const [dono, setDono] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const settings = cookies.settings;
    settings && setProgress(settings.progress);
    settings && setTimeline(settings.timeline);
    settings && setGraphs2(settings.graphs2);
    settings && setGraphs4(settings.graphs4);
    settings && setGraphs6(settings.graphs6);
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
          graphs2={graphs2}
          setGraphs2={setGraphs2}
          graphs4={graphs4}
          setGraphs4={setGraphs4}
          graphs6={graphs6}
          setGraphs6={setGraphs6}
          vol={vol}
          setVol={setVol}
          dono={dono}
          setDono={setDono}
        />
      </div>
      <div className='column ml-6 pl-4'>
        <br></br>
        <main
          className='ml-3
        '
        >
          {!progress &&
            !timeline &&
            !graphs2 &&
            !graphs4 &&
            !graphs6 &&
            !vol &&
            !dono && (
              <>
                <h1 className='title has-text-centered is-size-6-mobile'>
                  You've turned off all your dahsboard objects...
                </h1>
                <br></br>
                <h1 className='title has-text-centered is-size-6-mobile'>
                  {`<--- Flip some switches here!`}
                </h1>
              </>
            )}
          <div className='columns is-flex-widescreen is-flex-wrap-wrap is-centered'>
            {progress && <Progress token={props.token} />}
            {timeline && <TimelineCT token={props.token} />}
            {vol && <Volunteering token={props.token} />}
            {dono && <Donations token={props.token} />}
            {graphs2 && <Graphs2 token={props.token} />}
            {graphs6 && <Graphs6 token={props.token} />}
            {graphs4 && <Graphs4 token={props.token} />}
          </div>
        </main>
      </div>
    </>
  );
}
