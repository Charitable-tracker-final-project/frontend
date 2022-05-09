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
    return `You've donated $${donos}, which is ${percentage}% of your annual income of $${income}`;
  };

  const dGoalMath = (donos, dGoal) => {
    let percentage = (donos / dGoal) * 100;
    percentage = Math.round(percentage);
    return `You've donated $${donos}, which is ${percentage}% of your goal of $${dGoal}`;
  };

  const vGoalMath = (vol, vGoal) => {
    let percentage = (vol / vGoal) * 100;
    percentage = Math.round(percentage);
    return `You've volunteered ${vol} hours, which is ${percentage}% of your goal of ${vGoal} hours`;
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
        console.log('Get Donations Called');
        setDonosToDate(res.data[0].alldonated.alldonated);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });

    axios
      .get('https://charitable-tracker.herokuapp.com/api/Vrecords/', {
        headers: {
          Authorization: `Token ${props.token}`,
        },
      })
      .then((res) => {
        console.log('Get Volunteering Called');
        console.log(res.data);
        res.data.map((v, key) => {
          return setVolToDate(volToDate + v.hoursdonated);
        });
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [error, props.token]);

  console.log(volToDate);
  return (
    <>
      <div className='column is-11 is-6-widescreen'>
        <h1 className='title'>Progress Update:</h1>
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className='box'>
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
                className='progress m-0 is-link'
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
                className='progress m-0 is-info'
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
