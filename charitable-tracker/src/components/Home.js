import Navbar from './Nav/Navbar';
import Progress from './Home/Progress';
import TimelineCT from './Home/Timeline';
import { useNavigate } from 'react-router-dom';
import Profile from './Nav/Profile';
import Reports from './Reports';
import Volunteering from './Details/Volunteering';
import Donations from './Details/Donations';
import Graphs2Cause from './Reports/Graphs2Cause';
import Graphs2Org from './Reports/Graphs2Org';
import Graphs4 from './Reports/Graphs4';
import Graphs6 from './Reports/Graphs6';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function Home(props) {
  const [username] = useState(props.storeUsername);
  const [cookies, setCookie] = useCookies(['settings']);
  const [progress, setProgress] = useState(true);
  const [timeline, setTimeline] = useState(true);
  const [graphs2, setGraphs2] = useState(false);
  const [graphs4, setGraphs4] = useState(false);
  const [graphs6, setGraphs6] = useState(false);
  const [vol, setVol] = useState(false);
  const [dono, setDono] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState('');
  const [isIncome, setIsIncome] = useState([]);
  const [incomeInput, setIncomeInput] = useState('');
  const [oldIncome, setOldIncome] = useState('');
  const [donoGoal, setDonoGoal] = useState([]);
  const [dGoalAmount, setDGoalAmount] = useState('');
  const [dGoalLoad, setDGoalLoad] = useState('');
  const [donoPK, setDonoPK] = useState(0);
  const [volGoal, setVolGoal] = useState([]);
  const [vGoalAmount, setVGoalAmount] = useState('');
  const [vGoalLoad, setVGoalLoad] = useState('');
  const [volPK, setVolPK] = useState(0);
  const [pk, setPk] = useState(0);
  const [incomeError, setIncomeError] = useState('');
  const [incomeSuccess, setIncomeSuccess] = useState(false);
  const [dGoalError, setDGoalError] = useState('');
  const [dGoalSuccess, setDGoalSuccess] = useState(false);
  const [vGoalError, setVGoalError] = useState('');
  const [vGoalSuccess, setVGoalSuccess] = useState(false);
  const [hideSide, setHideSide] = useState(false);
  const today = () => {
    let newDate = new Date();
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}-${month < 10 ? `0${month}` : `${month}`}-${
      day > 9 ? day : `0${day}`
    }`;
  };

  useEffect(() => {
    setDate(today());
  }, []);

  const handleIncome = (event) => {
    event.preventDefault();
    setIncomeError('');
    setIncomeSuccess(false);
    axios
      .put(
        `https://charitable-tracker.herokuapp.com/api/annualincome/${pk}/`,
        {
          annual_income: incomeInput,
        },
        {
          headers: { Authorization: `Token ${props.token}` },
        }
      )
      .then((res) => {
        console.log('Successfully submitted Edit!');
        setIncomeSuccess(true);
        setOldIncome(incomeInput);
      })
      .catch((e) => {
        console.log(e);
        setIncomeError(e.message);
      });
  };

  const handleDGoalSubmit = (event) => {
    event.preventDefault();
    setDGoalError('');
    setDGoalSuccess(false);
    axios
      .put(
        `https://charitable-tracker.herokuapp.com/api/Dgoal/${donoPK}/`,
        {
          dollars: dGoalAmount,
        },
        {
          headers: { Authorization: `Token ${props.token}` },
        }
      )
      .then((res) => {
        console.log('Successfully submitted Edit!');
        setDGoalSuccess(true);
        setDGoalLoad(dGoalAmount);
      })
      .catch((e) => {
        console.log(e);
        setDGoalError(e.message);
      });
  };

  const handleVGoalSubmit = (event) => {
    event.preventDefault();
    setVGoalError('');
    setVGoalSuccess(false);
    axios
      .put(
        `https://charitable-tracker.herokuapp.com/api/Vgoal/${volPK}/`,
        {
          hours: vGoalAmount,
        },
        {
          headers: { Authorization: `Token ${props.token}` },
        }
      )
      .then((res) => {
        console.log('Successfully submitted Edit!');
        setVGoalSuccess(true);
        setVGoalLoad(vGoalAmount);
      })
      .catch((e) => {
        console.log(e);
        setVGoalError(e.message);
        setIsLoading(true);
      });
  };

  const handlePost = (event) => {
    event.preventDefault();
    setIncomeError('');
    setIncomeSuccess(false);
    axios
      .post(
        `https://charitable-tracker.herokuapp.com/api/annualincome/`,
        {
          annual_income: incomeInput,
        },
        {
          headers: { Authorization: `Token ${props.token}` },
        }
      )
      .then((res) => {
        console.log('Successfully submitted Post!');
        setIncomeSuccess(true);
        setOldIncome(incomeInput);
      })
      .catch((e) => {
        console.log(e);
        setIncomeError(e.message);
      });
  };

  const handleDGoalPost = (event) => {
    event.preventDefault();
    setDGoalError('');
    setDGoalSuccess(false);
    axios
      .post(
        `https://charitable-tracker.herokuapp.com/api/Dgoals/`,
        {
          dgoaltitle: `${username}'s Donation Goal`,
          dollars: dGoalAmount,
          created_at: date,
        },
        {
          headers: { Authorization: `Token ${props.token}` },
        }
      )
      .then((res) => {
        console.log('Successfully submitted Post!');
        setDGoalSuccess(true);
        setDGoalLoad(vGoalAmount);
      })
      .catch((e) => {
        console.log(e);
        setDGoalError(e.message);
      });
  };

  const handleVGoalPost = (event) => {
    event.preventDefault();
    setVGoalError('');
    axios
      .post(
        `https://charitable-tracker.herokuapp.com/api/Vgoals/`,
        {
          vgoaltitle: `${username}'s Volunteer Goal`,
          hours: vGoalAmount,
          created_at: date,
        },
        {
          headers: { Authorization: `Token ${props.token}` },
        }
      )
      .then((res) => {
        console.log('Successfully submitted Post!');
        setVGoalSuccess(true);
        setVGoalLoad(vGoalAmount);
      })
      .catch((e) => {
        console.log(e);
        setVGoalError(e.message);
      });
  };

  useEffect(() => {
    const settings = cookies.settings;
    settings && setProgress(settings.progress);
    settings && setTimeline(settings.timeline);
    settings && setGraphs2(settings.graphs2);
    settings && setGraphs4(settings.graphs4);
    settings && setGraphs6(settings.graphs6);
    settings && setVol(settings.vol);
    settings && setDono(settings.dono);
    setIncomeError('');
    setDGoalError('');
    setVGoalError('');

    axios
      .get('https://charitable-tracker.herokuapp.com/api/annualincome/', {
        headers: {
          Authorization: `Token ${props.token}`,
        },
      })
      .then((res) => {
        console.log('Get Income Called');
        setIsIncome(res.data);
        setIncomeInput(
          res.data.find((e) => {
            return e.annual_income;
          }).annual_income
        );
        setOldIncome(
          res.data.find((e) => {
            return e.annual_income;
          }).annual_income
        );
        setPk(
          res.data.find((e) => {
            return e.annual_income;
          }).pk
        );
      })
      .catch((e) => {
        setIncomeError(e.message);
      });

    axios
      .get('https://charitable-tracker.herokuapp.com/api/Dgoals/', {
        headers: {
          Authorization: `Token ${props.token}`,
        },
      })
      .then((res) => {
        console.log('Get Donation Goals Called');
        setDonoGoal(res.data);
        setDGoalAmount(
          res.data.find((e) => {
            return e.dollars;
          }).dollars
        );
        setDonoPK(
          res.data.find((e) => {
            return e.dollars;
          }).pk
        );
      })
      .catch((e) => {
        setDGoalError(e.message);
      });

    axios
      .get('https://charitable-tracker.herokuapp.com/api/Vgoals/', {
        headers: {
          Authorization: `Token ${props.token}`,
        },
      })
      .then((res) => {
        console.log('Get Volunteer Goals Called');
        setVolGoal(res.data);
        setVGoalAmount(
          res.data.find((e) => {
            return e.hours;
          }).hours
        );
        setVolPK(
          res.data.find((e) => {
            return e.hours;
          }).pk
        );
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        setDGoalError(e.message);
      });
  }, [props.token, oldIncome, dGoalLoad, vGoalLoad]);

  return (
    <>
      <div className={`column is-narrow ${hideSide && 'is-invisible'}`}>
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
          isIncome={isIncome}
          setIsIncome={setIsIncome}
          incomeInput={incomeInput}
          setIncomeInput={setIncomeInput}
          oldIncome={oldIncome}
          setOldIncome={setOldIncome}
          incomeSuccess={incomeSuccess}
          setIncomeSuccess={setIncomeSuccess}
          donoGoal={donoGoal}
          setDonoGoal={setDonoGoal}
          dGoalAmount={dGoalAmount}
          setDGoalAmount={setDGoalAmount}
          dGoalLoad={dGoalLoad}
          setDGoalLoad={setDGoalLoad}
          donoPK={donoPK}
          setDonoPK={setDonoPK}
          volGoal={volGoal}
          setVolGoal={setVolGoal}
          vGoalAmount={vGoalAmount}
          setVGoalAmount={setVGoalAmount}
          vGoalLoad={vGoalLoad}
          setVGoalLoad={setVGoalLoad}
          volPK={volPK}
          setVolPK={setVolPK}
          pk={pk}
          setPk={setPk}
          incomeError={incomeError}
          setIncomeError={setIncomeError}
          dGoalError={dGoalError}
          setDGoalError={setDGoalError}
          dGoalSuccess={dGoalSuccess}
          setDGoalSuccess={setDGoalSuccess}
          vGoalError={vGoalError}
          setVGoalError={setVGoalError}
          vGoalSuccess={vGoalSuccess}
          setVGoalSuccess={setVGoalSuccess}
          handleIncome={handleIncome}
          handleDGoalSubmit={handleDGoalSubmit}
          handleVGoalSubmit={handleVGoalSubmit}
          handlePost={handlePost}
          handleDGoalPost={handleDGoalPost}
          handleVGoalPost={handleVGoalPost}
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
                  You've turned off all your dashboard objects...
                </h1>
                <br></br>
                <h1 className='title has-text-centered is-size-6-mobile'>
                  {`<--- Flip some switches here!`}
                </h1>
              </>
            )}
          <div className='columns is-flex-widescreen is-flex-wrap-wrap is-justify-content-space-evenly is-centered'>
            {graphs2 && <Graphs2Cause token={props.token} />}
            {graphs6 && <Graphs2Org token={props.token} />}
            {progress && (
              <Progress
                token={props.token}
                income={incomeInput}
                dGoalAmount={dGoalAmount}
                vGoalAmount={vGoalAmount}
              />
            )}
            {timeline && <TimelineCT token={props.token} />}
            {vol && (
              <Volunteering token={props.token} setHideSide={setHideSide} />
            )}
            {dono && (
              <Donations token={props.token} setHideSide={setHideSide} />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
