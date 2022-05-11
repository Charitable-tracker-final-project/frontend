import { useState } from 'react';
import NotLoggedIn from './Register/NotLoggedIn';
import LoggedIn from './Register/LoggedIn';

export default function Register({
  token,
  setToken,
  newUser,
  setNewUser,
  setAuth,
}) {
  const [skipable, setSkipable] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [income, setIncome] = useState('');

  return (
    <>
      <div className='columns is-centered'>
        <div className='column mt-6 pt-6 is-three-quarters'>
          {!token ? (
            <>
              {' '}
              <NotLoggedIn
                newUser={newUser}
                username={username}
                setNewUser={setNewUser}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                token={token}
                setToken={setToken}
                setAuth={setAuth}
                skipable={skipable}
                setSkipable={setSkipable}
              />
            </>
          ) : (
            <>
              {' '}
              <LoggedIn
                newUser={newUser}
                setNewUser={setNewUser}
                income={income}
                setIncome={setIncome}
                skipable={skipable}
                setSkipable={setSkipable}
                token={token}
                setAuth={setAuth}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
