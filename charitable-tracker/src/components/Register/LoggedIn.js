import { useState } from 'react';
import { EnterIncome, VolunteerOption, DonateOption } from './RegStack';
import { Link } from 'react-router-dom';

export default function LoggedIn({
  newUser,
  setNewUser,
  income,
  setIncome,
  skipable,
  setSkipable,
  token,
  setAuth,
}) {
  const [step, setStep] = useState(1);

  return (
    <>
      <h1>logged in</h1>
      {step === 1 && (
        <EnterIncome
          newUser={newUser}
          income={income}
          setIncome={setIncome}
          setSkipable={setSkipable}
          setStep={setStep}
        />
      )}
      {step === 2 && (
        <VolunteerOption
          newUser={newUser}
          setStep={setStep}
          setSkipable={setSkipable}
        />
      )}
      {step === 3 && (
        <DonateOption
          newUser={newUser}
          setSkipable={setSkipable}
          setNewUser={setNewUser}
        />
      )}
      <div className='field is-grouped is-grouped-centered'>
        {step > 1 && (
          <div className='control'>
            <div className='button is-small' onClick={() => setStep(step - 1)}>
              Back
            </div>
          </div>
        )}
        {skipable && (
          <div className='control'>
            <div className='button is-small' onClick={() => setStep(step + 1)}>
              Skip
            </div>
          </div>
        )}
      </div>
      <div className='field is-grouped is-grouped-centered'>
        <div className='control'>
          <div className='button is-small' onClick={() => setStep(1)}>
            reset
          </div>
        </div>
        <div className='control'>
          <Link to='/'>
            <div
              className='button is-small'
              onClick={() => [setAuth(null, null), setNewUser(null)]}
            >
              Log Out
            </div>
          </Link>
        </div>
      </div>
      <div className='field is-grouped is-grouped-centered'>
        dev:
        <div className='control'>
          <div className='button is-small' onClick={() => setStep(step + 1)}>
            Skip
          </div>
        </div>
      </div>
    </>
  );
}
