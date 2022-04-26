import axios from 'axios';
import { useEffect } from 'react';

export const EnterUsername = ({
  newUser,
  username,
  setUsername,
  setSkipable,
  setStep,
}) => {
  useEffect(() => {
    setSkipable(false);
  });

  return (
    <>
      <h1>username entry would go here</h1>
      <hr></hr>
    </>
  );
};

export const EnterEmail = ({
  newUser,
  email,
  setEmail,
  setSkipable,
  setStep,
}) => {
  useEffect(() => {
    setSkipable(false);
  });
  return (
    <>
      <h1>email entry would go here</h1>
      <hr></hr>
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
        onClick={() => [setToken('token'), setNewUser(true)]}
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
