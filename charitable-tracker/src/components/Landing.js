import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo512.png';
import google from '../images/btn_google_signin_light_pressed_web@2x.png';

export default function Landing({ token, setToken, setAuth, setNewUser }) {
  // const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    console.log('Hangle Login Called');
    event.preventDefault();
    setError('');
    setAuth(username, 'testoken');
    setNewUser(false);
    // axios
    //   .post('https://questionbox-rocket.herokuapp.com/auth/token/login/', {
    //     username: username,
    //     password: password,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     setAuth(username, res.data.auth_token);
    //   })
    //   .catch((e) => setError(e.message));
  };

  const handleOAuth = (event) => {
    console.log('Handle OAuth Called');
    event.preventDefault();
    setError('');
    //   axios
    //     .post('https://questionbox-rocket.herokuapp.com/auth/token/login/', {
    //       username: username,
    //       password: password,
    //     })
    //     .then((res) => {
    //       console.log(res.data);
    //       setAuth(username, res.data.auth_token);
    //     })
    //     .catch((e) => setError(e.message));
  };

  return (
    <>
      <div className='columns is-mobile is-centered'>
        <figure className='image is-inline-block pl-3'>
          <img src={logo} alt='Charitable Tracker Logo' />
        </figure>
      </div>
      <div className='columns is-centered'>
        <div className='column is-one-third'>
          {error ? (
            <div className='box has-background-danger has-text-white'>
              <h3>{`Login failed: ${error}`}</h3>
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
      <div className='field is-grouped is-grouped-centered'>
        <img
          className='is-clickable'
          src={google}
          alt='Google sign in button'
          onClick={handleOAuth}
          width='195'
        />
      </div>
    </>
  );
}
