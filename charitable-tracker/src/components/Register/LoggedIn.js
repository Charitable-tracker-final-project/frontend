import { useState } from 'react';
import {
  EnterIncome,
  VolunteerOption,
  DonateOption,
  Complete,
} from './RegStack';
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
      <h1 className={`title has-text-centered ${step > 1 && `is-invisible`}`}>
        Let's Set Some Goals!
      </h1>
      <div className='box p-6'>
        {step === 1 && (
          <EnterIncome
            newUser={newUser}
            income={income}
            setIncome={setIncome}
            setSkipable={setSkipable}
            step={step}
            setStep={setStep}
          />
        )}
        {step === 2 && (
          <VolunteerOption
            newUser={newUser}
            step={step}
            setStep={setStep}
            setSkipable={setSkipable}
          />
        )}
        {step === 3 && (
          <DonateOption
            newUser={newUser}
            setSkipable={setSkipable}
            setNewUser={setNewUser}
            step={step}
            setStep={setStep}
          />
        )}
        {step === 4 && <Complete />}
        <div className='field is-grouped is-grouped-centered'>
          {step > 1 && (
            <div className='control'>
              <div
                className='button is-warning pl-6 pr-6'
                onClick={() => setStep(step - 1)}
              >
                Back
              </div>
            </div>
          )}
        </div>
        {step < 4 && (
          <div className='field is-grouped is-grouped-centered'>
            <div className='control'>
              <Link to='/'>
                <div className='button is-danger'>Skip All</div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
