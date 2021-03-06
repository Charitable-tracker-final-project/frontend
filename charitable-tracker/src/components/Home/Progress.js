import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import axios from 'axios';

export default function Progress(props) {
  const income = props.income;
  const dGoal = props.dGoalAmount;
  const vGoal = props.vGoalAmount;
  const [donosToDate, setDonosToDate] = useState('');
  const [volToDate, setVolToDate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const incomeMath = (donos, income) => {
    let percentage = (donos / income) * 100;
    percentage = Math.round(percentage);
    return donosToDate && income
      ? `You've donated $${donos}, which is ${percentage}% of your annual income of $${income}`
      : !donosToDate && income
      ? `You haven't made any donations yet...`
      : !income && donosToDate
      ? `You haven't set your income yet...`
      : `You haven't set your income or made any donations yet...`;
  };

  const dGoalMath = (donos, dGoal) => {
    let percentage = (donos / dGoal) * 100;
    percentage = Math.round(percentage);
    return dGoal && donosToDate && donos >= dGoal
      ? `Congratulations! You're donations of $${donos} have surpassed your goal of $${dGoal}! Time to set a new goal.`
      : dGoal && donosToDate
      ? `You've donated $${donos}, which is ${percentage}% of your goal of $${dGoal}`
      : !donosToDate && dGoal
      ? `You haven't made any donations yet...`
      : !dGoal && donosToDate
      ? `You haven't set a donation goal yet...`
      : `You haven't made any donations or set a donation goal yet...`;
  };

  const vGoalMath = (vol, vGoal) => {
    let percentage = (vol / vGoal) * 100;
    percentage = Math.round(percentage);
    return vGoal && volToDate && percentage >= 100
      ? `Congratulations! You've volunteered ${volToDate} hours, which has suprpassed your goal of ${vGoal} hours! Time to set a new goal.`
      : vGoal && volToDate
      ? `You've volunteered ${vol} hours, which is ${percentage}% of your goal of ${vGoal} hours`
      : !volToDate && vGoal
      ? `You haven't logged any volunteer hours yet...`
      : !vGoal && volToDate
      ? `You haven't set a volunteer goal yet...`
      : `You haven't logged any volunteer hours or set a volunteer goal yet...`;
  };

  useEffect(() => {
    setIsLoading(true);
    setError('');
    axios
      .get('https://charitable-tracker.herokuapp.com/api/Drecords/', {
        headers: {
          Authorization: `Token ${props.token}`,
        },
      })
      .then((res) => {
        setDonosToDate(res.data.results[0].alldonated.alldonated);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setIsLoading(false);
      });

    axios
      .get('https://charitable-tracker.herokuapp.com/api/Vrecords/', {
        headers: {
          Authorization: `Token ${props.token}`,
        },
      })
      .then((res) => {
        setVolToDate(res.data.results[0].allhours.allhours);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [props.token]);

  return (
    <>
      <div className='column is-11 is-5-widescreen box m-3 p-5'>
        <h1 className='column is-9 has-text-link is-size-4 has-text-weight-bold is-size-5-mobile mb-0 pb-0'>
          Progress Update:
        </h1>
        <hr />
        {isLoading ? (
          <>
            <Loading />
            {error && (
              <div className='box has-background-danger has-text-white'>
                <h3>We had a problem loading. Please try again...</h3>
              </div>
            )}
          </>
        ) : (
          <>
            <div className='p-4'>
              <h1 className='is-size-7-mobile'>Donations this year:</h1>
              <progress
                className='progress m-0 is-success'
                value={donosToDate}
                max={income}
              ></progress>
              <div className='is-size-7-mobile'>
                {incomeMath(donosToDate, income)}
              </div>
              <br></br>
              <br></br>
              <h1 className='is-size-7-mobile'>
                Progress Towards Donation Goal:
              </h1>
              <progress
                className={`progress m-0 ${
                  donosToDate >= dGoal ? 'is-success' : 'is-link'
                }`}
                value={donosToDate}
                max={dGoal}
              ></progress>
              <div className='is-size-7-mobile'>
                {dGoalMath(donosToDate, dGoal)}
              </div>
              <br></br>
              <br></br>
              <h1 className='is-size-7-mobile'>
                Progress Towards Volunteer Goal:
              </h1>
              <progress
                className={`progress m-0 ${
                  volToDate >= vGoal ? 'is-success' : 'is-info'
                }`}
                value={volToDate}
                max={vGoal}
              ></progress>
              <div className='is-size-7-mobile'>
                {vGoalMath(volToDate, vGoal)}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
