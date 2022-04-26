import axios from 'axios';
import { useEffect } from 'react';

export const EnterUsername = ({
  newUser,
  username,
  setUsername,
  setSkipable,
  step,
  setStep,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    setStep(step + 1);
  };

  useEffect(() => {
    setSkipable(false);
  });

  return (
    <>
      <div className='columns is-centered'>
        <div className='column is-half'>
          <form onSubmit={handleSubmit}>
            <div className='field'>
              <div className='control is-flex is-flex-direction-column is-align-items-center mb-5'>
                <label className='label' htmlFor='reg-username'>
                  <div className='is-size-4 mb-5'>What should we call you?</div>
                </label>
                <input
                  type='text'
                  className='input is-rounded'
                  id='reg-username'
                  required
                  placeholder='username'
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            </div>
            <div className='field is-grouped is-grouped-centered'>
              <div className='control'>
                <button className='button is-success pl-6 pr-6' type='submit'>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export const EnterEmail = ({
  newUser,
  email,
  setEmail,
  setSkipable,
  step,
  setStep,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    setStep(step + 1);
  };

  useEffect(() => {
    setSkipable(false);
  });

  return (
    <>
      <div className='columns is-centered'>
        <div className='column is-half'>
          <form onSubmit={handleSubmit}>
            <div className='field'>
              <div className='control is-flex is-flex-direction-column is-align-items-center mb-5'>
                <label className='label' htmlFor='reg-email'>
                  <div className='is-size-4 mb-5'>
                    What's your email address?
                  </div>
                </label>
                <input
                  type='email'
                  className='input is-rounded'
                  id='reg-email'
                  required
                  placeholder='person@email.web'
                  pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
            <div className='field is-grouped is-grouped-centered'>
              <div className='control'>
                <button className='button is-success pl-6 pr-6' type='submit'>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export const EnterPassword = ({
  newUser,
  setNewUser,
  username,
  email,
  password,
  setPassword,
  token,
  setToken,
  setAuth,
  setSkipable,
  setStep,
}) => {
  useEffect(() => {
    setSkipable(false);
  });
  return (
    <>
      <h1>password entry would go here, along with axios reg request</h1>
      <div
        className='button'
        onClick={() => [
          console.log(username, email, password),
          setToken('token'),
          setNewUser(true),
        ]}
      >
        set token
      </div>
      <hr></hr>
    </>
  );
};

export const EnterIncome = ({
  newUser,
  income,
  setIncome,
  setSkipable,
  setStep,
}) => {
  useEffect(() => {
    setSkipable(true);
  });
  return (
    <>
      <h1>income entry would go here</h1>
      <hr></hr>
    </>
  );
};

export const VolunteerOption = ({ newUser, setStep, setSkipable }) => {
  useEffect(() => {
    setSkipable(true);
  });
  return (
    <>
      <h1>ask if they want to enter volunteer hours</h1>
      <hr></hr>
    </>
  );
};

export const DonateOption = ({ newUser, setSkipable, setNewUser }) => {
  useEffect(() => {
    setSkipable(true);
  });
  return (
    <>
      <h1>ask if they want to enter donations</h1>
      <hr></hr>
    </>
  );
};
