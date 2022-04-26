import { useState } from 'react';
import { EnterUsername, EnterEmail, EnterPassword } from './RegStack';
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
      <h1>not logged in</h1>
      {step === 1 && (
        <EnterUsername
          newUser={newUser}
          username={username}
          setUsername={setUsername}
          setSkipable={setSkipable}
          setStep={setStep}
        />
      )}
      {step === 2 && (
        <EnterEmail
          newUser={newUser}
          email={email}
          setEmail={setEmail}
          setSkipable={setSkipable}
          setStep={setStep}
        />
      )}
      {step === 3 && (
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
          setStep={setStep}
        />
      )}
      {step > 3 && (
        <h1>Registration unsuccesful. Please reset and try again!</h1>
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
            <div className='button is-small'>Log In</div>
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
