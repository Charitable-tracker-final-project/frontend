import { useState } from 'react';
import Loading from '../Loading/Loading';

export default function Progress() {
  const [income, setIncome] = useState('67000');
  const [donosToDate, setDonosToDate] = useState('23456');
  const [cGoalProgress, setCGoalProgress] = useState('32');
  const [cGoal, setCGoal] = useState('50');
  const [cGoalOrg, setCGoalOrg] = useState('');
  const [cGoalCause, setCGoalCause] = useState('');
  const [cGoalTime, setCGoalTime] = useState('');
  const [cGoalDonos, setCGoalDonos] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const incomeMath = (donos, income) => {
    let percentage = (donos / income) * 100;
    percentage = Math.round(percentage);
    return `${percentage}% of your annual income ($${income})`;
  };

  const dGoalMath = (donos, goal) => {
    return `$${donos} donated towards your goal of $${goal}${
      cGoalTime ? ` this ${cGoalTime}` : ''
    }${cGoalOrg ? ` to ${cGoalOrg}` : ''}${
      cGoalCause ? `, benefitting ${cGoalCause}` : ''
    }`;
  };

  const vGoalMath = (volunteering, goal) => {
    return `${volunteering} hours towards your goal of ${goal} hours${
      cGoalTime ? ` this ${cGoalTime}` : ''
    }${cGoalOrg ? ` with ${cGoalOrg},` : ''} ${
      cGoalCause ? ` benefitting ${cGoalCause}` : ''
    }`;
  };

  return (
    <>
      <div className='columns is-centered'>
        <div className='column is-11'>
          <h1 className='is-size-7-mobile'>Progress Update:</h1>
          {isLoading ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              <div className='box'>
                <h1 className='is-size-7-mobile'>Donations this year:</h1>
                <progress
                  className='progress m-0 is-info'
                  value={donosToDate}
                  max={income}
                ></progress>
                <div className='is-size-7-mobile'>
                  {incomeMath(donosToDate, income)}
                </div>
                <br></br>
                <br></br>
                <h1 className='is-size-7-mobile'>
                  Progress Towards Nearest Goal:
                </h1>
                <progress
                  className='progress m-0 is-success'
                  value={cGoalProgress}
                  max={cGoal}
                ></progress>
                <div className='is-size-7-mobile'>
                  {cGoalDonos
                    ? dGoalMath(cGoalProgress, cGoal)
                    : vGoalMath(cGoalProgress, cGoal)}
                </div>
                <br></br>
                <div className='field is-grouped is-grouped-centered'>
                  <div className='control is-size-7-mobile'>
                    {`(dev only):`}
                    <div
                      className='button is-small'
                      onClick={() => {
                        setCGoalDonos(!cGoalDonos);
                      }}
                    >{`Change Goal to ${
                      cGoalDonos ? 'Volunteering' : 'Donation'
                    }`}</div>
                  </div>
                </div>
                <div className='field is-grouped is-grouped-centered'>
                  <div className='control is-size-7-mobile'>
                    <div
                      className='button is-small'
                      onClick={() => {
                        cGoalTime ? setCGoalTime('') : setCGoalTime('Month');
                      }}
                    >
                      {`${!cGoalTime ? 'Add Timeframe' : 'Remove Timeframe'}`}
                    </div>
                    <div
                      className='button is-small'
                      onClick={() => {
                        cGoalOrg
                          ? setCGoalOrg('')
                          : setCGoalOrg('She Should Run');
                      }}
                    >
                      {`${!cGoalOrg ? 'Add Org' : 'Remove Org'}`}
                    </div>
                    <div
                      className='button is-small'
                      onClick={() => {
                        cGoalCause
                          ? setCGoalCause('')
                          : setCGoalCause('Womens Rights');
                      }}
                    >
                      {`${!cGoalCause ? 'Add Cause' : 'Remove Cause'}`}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
