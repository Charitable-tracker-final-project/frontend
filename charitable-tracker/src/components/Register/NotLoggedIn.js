import { useState } from 'react';
import { EnterUsername, EnterPassword } from './RegStack';
import { Link } from 'react-router-dom';

export default function NotLoggedIn({
  newUser,
  setNewUser,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  token,
  setToken,
  setAuth,
  skipable,
  setSkipable,
}) {
  const [step, setStep] = useState(1);

  return (
    <>
      <h1 className='title has-text-centered'>Let's Get You Signed Up!</h1>
      <div className='p-6'>
        {step === 1 && (
          <EnterUsername
            newUser={newUser}
            username={username}
            setUsername={setUsername}
            setSkipable={setSkipable}
            step={step}
            setStep={setStep}
          />
        )}
        {step === 2 && (
          <EnterPassword
            newUser={newUser}
            setNewUser={setNewUser}
            username={username}
            email={email}
            password={password}
            setPassword={setPassword}
            token={token}
            setToken={setToken}
            setAuth={setAuth}
            setSkipable={setSkipable}
            step={step}
            setStep={setStep}
          />
        )}
        {step > 2 && (
          <h1>Registration unsuccesful. Please reset and try again!</h1>
        )}
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
          {skipable && (
            <div className='control'>
              <div
                className='button is-small'
                onClick={() => setStep(step + 1)}
              >
                Skip
              </div>
            </div>
          )}
        </div>
        <div className='field is-grouped is-grouped-centered'>
          <div className='control'>
            <div className='button is-danger' onClick={() => setStep(1)}>
              Start Over
            </div>
          </div>
          <div className='control'>
            <Link to='/'>
              <div className='button is-link'>Log In</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
