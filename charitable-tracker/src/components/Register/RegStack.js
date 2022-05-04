import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

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
  const navigate = useNavigate();
  const [repassword, setRepassword] = useState('');
  const [error, setError] = useState('');
  const [noMatch, setNoMatch] = useState(null);
  const [pwSpinner, setPWSpinner] = useState(false);

  useEffect(() => {
    setSkipable(false);
  });

  const handleReg = (event) => {
    console.log('Handle Reg Called');
    event.preventDefault();
    setNoMatch(null);
    setError('');
    setPWSpinner(true);
    console.log(username, password, repassword);
    if (password === repassword) {
      axios
        .post(`https://charitable-tracker.herokuapp.com/auth/registration/`, {
          username: username,
          password1: password,
          password2: repassword,
        })
        .then((res) => {
          console.log('Successfully Rgistered!');
          setPWSpinner(false);
          setAuth(username, res.data.key);
          setNewUser(true);
          navigate('/new/goal?newuser=true');
        })
        .catch((e) => {
          console.log(e);
          setError(e.message);
        });
    } else {
      setNoMatch(true);
    }
  };

  return (
    <>
      <div className='columns is-centered'>
        <div className='column is-half'>
          <form onSubmit={handleReg}>
            <div className='field'>
              <div className='control is-flex is-flex-direction-column is-align-items-center mb-5'>
                {pwSpinner && <Loading />}
                {error && (
                  <div className='box has-background-danger has-text-white'>
                    <h3>{error}</h3>
                  </div>
                )}
                {noMatch && (
                  <>
                    <div className='box has-background-danger is-size-5 has-text-white has-text-centered'>
                      Your passwords do not match! Please try again...
                    </div>
                  </>
                )}
                <label className='label' htmlFor='reg-password'>
                  <div className='is-size-4 mb-5'>Set your password</div>
                </label>
                <input
                  type='password'
                  className='input is-rounded'
                  id='reg-password'
                  required
                  placeholder='password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
            <div className='field'>
              <div className='control is-flex is-flex-direction-column is-align-items-center mb-5'>
                <input
                  type='password'
                  className='input is-rounded'
                  id='reg-repassword'
                  required
                  placeholder='re-enter password'
                  value={repassword}
                  onChange={(event) => setRepassword(event.target.value)}
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

export const EnterIncome = ({
  newUser,
  income,
  setIncome,
  setSkipable,
  step,
  setStep,
  token,
}) => {
  const [error, setError] = useState('');
  const [incomeSpinner, setIncomeSpinner] = useState(false);

  const handleSubmit = (event) => {
    console.log('Handle Income Called');
    event.preventDefault();
    setError('');
    setIncomeSpinner(true);
    axios
      .post(
        `https://charitable-tracker.herokuapp.com/api/annualincome/`,
        {
          annual_income: income,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log('Successfully Set Income!');
        setIncomeSpinner(false);
        setStep(step + 1);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  };

  useEffect(() => {
    setSkipable(true);
  });
  return (
    <>
      <div className='columns is-centered'>
        {incomeSpinner && <Loading />}
        {error && (
          <div className='box has-background-danger has-text-white'>
            <h3>{error}</h3>
          </div>
        )}
        <div className='column is-half'>
          <form onSubmit={handleSubmit}>
            <div className='field'>
              <div className='control is-flex is-flex-direction-column is-align-items-center mb-5'>
                <label className='label has-text-centered' htmlFor='reg-income'>
                  <div className='is-size-4'>What is your annual income?</div>
                  <div className='is-size-6 has-text-grey mb-5'>
                    <i>
                      This helps you see how much of your annual income you
                      donate!
                    </i>
                  </div>
                </label>
                <div className='is-size-6 has-text-centered m-0'>
                  <i>please enter amount without commas!</i>
                </div>
                <div className='is-inline-flex is-size-4'>
                  $
                  <input
                    type='text'
                    className='input is-rounded'
                    id='reg-email'
                    required
                    placeholder='20000'
                    pattern='[0-9]+'
                    value={income}
                    onChange={(event) => setIncome(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='field is-grouped is-grouped-centered'>
              <div className='control'>
                <button className='button is-success pl-6 pr-6' type='submit'>
                  Submit
                </button>
              </div>
            </div>
            <div className='field is-grouped is-grouped-centered'>
              <div className='control'>
                <div
                  className='button is-black'
                  onClick={() => setStep(step + 1)}
                >
                  Skip
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export const VolunteerOption = ({
  newUser,
  setNewUser,
  step,
  setStep,
  setSkipable,
}) => {
  useEffect(() => {
    setSkipable(true);
  });
  return (
    <>
      <div className='columns is-centered'>
        <div className='column is-two-thirds'>
          <div className='title has-text-centered mb-6'>
            <b>Do you have volunteer hours you'd like to input now?</b>
          </div>
          <div className='field is-grouped is-grouped-centered'>
            <div className='control'>
              <Link to='/new/volunteer-hours'>
                <div
                  className='button is-success is-large pl-6 pr-6'
                  onClick={() => setNewUser(false)}
                >
                  Yes
                </div>
              </Link>
            </div>
          </div>
          <div className='field is-grouped is-grouped-centered mb-6'>
            <div className='control'>
              <div
                className='button is-black is-large pl-6 pr-6'
                onClick={() => setStep(step + 1)}
              >
                No
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const DonateOption = ({
  newUser,
  setSkipable,
  setNewUser,
  step,
  setStep,
}) => {
  useEffect(() => {
    setSkipable(true);
  });
  return (
    <>
      <div className='columns is-centered'>
        <div className='column is-two-thirds'>
          <div className='title has-text-centered mb-6'>
            <b>Do you have donations you'd like to input now?</b>
          </div>
          <div className='field is-grouped is-grouped-centered'>
            <div className='control'>
              <Link to='/new/donation'>
                <div
                  className='button is-success is-large pl-6 pr-6'
                  onClick={() => setNewUser(false)}
                >
                  Yes
                </div>
              </Link>
            </div>
          </div>
          <div className='field is-grouped is-grouped-centered mb-6'>
            <div className='control'>
              <div
                className='button is-black is-large pl-6 pr-6'
                onClick={() => setStep(step + 1)}
              >
                No
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Complete = ({ newUser, setNewUser }) => {
  return (
    <>
      <div className='columns is-centered'>
        <div className='column is-two-thirds'>
          <div className='title has-text-centered mb-6'>
            <b>Registration Complete!</b>
          </div>
          <div className='field is-grouped is-grouped-centered'>
            <div className='control'>
              <Link to='/'>
                <div
                  className='button has-text-white is-size-3 is-success is-large pl-6 pr-6'
                  onClick={() => setNewUser(false)}
                >
                  Go Home
                </div>
              </Link>
            </div>
          </div>
          <div className='field is-grouped is-grouped-centered mb-6'>
            <div className='control'>
              <div className='button is-black is-large pl-6 pr-6 is-invisible'>
                No
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
