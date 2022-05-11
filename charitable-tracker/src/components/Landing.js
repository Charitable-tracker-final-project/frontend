import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo512.png';
import axios from 'axios';
import Loading from './Loading/Loading';

export default function Landing({ token, setToken, setAuth }) {
  // const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSpinner, setLoginSpinner] = useState(false);

  const handleLogin = (event) => {
    console.log('Hangle Login Called');
    event.preventDefault();
    setError('');
    setLoginSpinner(true);
    axios
      .post('https://charitable-tracker.herokuapp.com/auth/login/', {
        username: username,
        password: password,
      })
      .then((res) => {
        setAuth(username, res.data.key);
        setLoginSpinner(false);
      })
      .catch((e) => [ErrorHandling(e.message), setLoginSpinner(false)]);
  };

  const ErrorHandling = (errorMessage) => {
    if (errorMessage.includes('400')) {
      setError('Your username or password are inccorect! Please try again...');
    } else {
      setError('Something went wrong... Please try again later');
    }
  };

  return (
    <>
      <br></br> <br></br> <br></br>
      <div className='columns is-mobile is-centered'>
        <figure className='is-inline-block pl-2'>
          <img
            src={logo}
            alt='Charitable Tracker Logo'
            width={'400rem'}
            height={'auto'}
          />
        </figure>
      </div>
      <br></br>
      <div className='columns is-centered'>
        <div className='column is-one-third'>
          {loginSpinner && <Loading />}
          {error ? (
            <div className='box has-background-danger has-text-white has-text-centered'>
              <h3>{`${error}`}</h3>
            </div>
          ) : (
            <></>
          )}
          <form onSubmit={handleLogin}>
            <div className='field'>
              <div className='control'>
                <input
                  type='text'
                  className='input is-rounded'
                  id='login-username'
                  required
                  placeholder='username'
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            </div>
            <div className='field'>
              <div className='control'>
                <input
                  type='password'
                  className='input is-rounded'
                  id='login-password'
                  required
                  placeholder='password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
            <div className='field is-grouped is-grouped-centered'>
              <div className='control'>
                <button className='button is-success' type='submit'>
                  Sign In
                </button>
              </div>
              <div className='control'>
                <Link className='button is-link' to='/register'>
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
