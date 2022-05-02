import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateVolunteer({ token }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [hours, setHours] = useState(0);
  const [timeframe, setTimeframe] = useState('Week');
  const [reminded, setReminded] = useState(false);
  const [no, setNo] = useState(false);
  const [reminder, setReminder] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const styles = {
    regPage: {
      minHeight: '100vh',
      height: '100%',
      backgroundImage: 'linear-gradient(white, #F1F5FF, #CBD9FF)',
    },
  };

  useEffect(() => {
    let newDate = new Date();
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return setDate(`${year}-${month < 10 ? `0${month}` : `${month}`}-${day}`);
  }, []);

  const handleSubmit = (event) => {
    console.log('Handle Edit Called');
    event.preventDefault();
    setError('');
    axios
      .post(
        `https://charitable-tracker.herokuapp.com/api/Vgoals/`,
        {
          goaltitle: title,
          volunteergoal: hours,
          interval: timeframe,
          created_at: date,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log('Successfully submitted Goal!');
        console.log(res);
        params === 'true'
          ? navigate(`/new/goal?newuser=true`)
          : navigate(`/new/goal`);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  };

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();
  let params = query.get('newuser');

  return (
    <>
      <div className='column'>
        <br></br>
        <main>
          <div className='columns is-centered' style={styles.regPage}>
            <div className='column mt-4 pt-4 is-three-quarters'>
              <h1 className='title has-text-centered'>
                Time to set some Goals!
              </h1>
              <div className='box pt-4 px-4 pb-6'>
                <form onSubmit={handleSubmit}>
                  <h1 className='is-size-3 has-text-centered mb-6'>
                    Set a Volunteer Goal
                  </h1>
                  <div className='field' id='clonable'>
                    <label
                      className='label has-text-centered'
                      htmlFor='vol-title'
                    >
                      <div className='is-size-4 mb-4'>
                        What is the name of your goal?
                      </div>
                    </label>
                    <div className='columns is-centered'>
                      <input
                        type='text'
                        className='column is-9 input is-rounded has-text-centered mb-6'
                        id='vol-title'
                        required
                        placeholder='Goal name'
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </div>
                    <div className='control is-flex is-flex-direction-column is-align-items-center mb-5'>
                      <label
                        className='label has-text-centered'
                        htmlFor='vol-hours'
                      >
                        <div className='is-size-4'>
                          How many hours would you like to volunteer?
                        </div>
                      </label>
                      <div className='is-inline-flex mb-6'>
                        <input
                          type='number'
                          className='input is-rounded'
                          id='vol-hours'
                          required
                          placeholder='#'
                          value={hours}
                          onChange={(event) => setHours(event.target.value)}
                        />
                        <label
                          className='label px-4 mt-1'
                          htmlFor='vol-timeframe'
                        >
                          per
                        </label>
                        <div className='select is-rounded'>
                          <select
                            id='vol-timeframe'
                            onChange={(event) =>
                              setTimeframe(event.target.value)
                            }
                          >
                            <option>Week</option>
                            <option>Month</option>
                            <option>Year</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!reminded ? (
                    <>
                      <div className='has-text-centered is-size-4'>
                        <b>Would you like to be reminded about this?</b>
                      </div>
                      <div className='field is-grouped is-grouped-centered'>
                        <div className='control'>
                          <div
                            className='button is-success is-light pl-6 pr-6'
                            onClick={() => [
                              setReminded(true),
                              setEmail(
                                'Hi! This is a friendly reminder to log your recent volunteer hours. You are receiving this message because you signed up for reminders'
                              ),
                            ]}
                          >
                            Yes
                          </div>
                        </div>
                      </div>
                      <div className='field is-grouped is-grouped-centered'>
                        <div className='control'>
                          <div
                            className='button is-danger is-light pl-6 pr-6'
                            onClick={() => setNo(true)}
                          >
                            No
                          </div>
                        </div>
                      </div>
                      {no && (
                        <>
                          <div className='has-text-centered is-size-6 has-text-grey'>
                            <i>ok, we won't remind you...</i>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className='field'>
                        <div className='control is-flex is-flex-direction-column is-align-items-center mb-5'>
                          <label
                            className='label has-text-centered'
                            htmlFor='don-email'
                          >
                            <div className='is-size-4'>
                              What would you like your reminder say?
                            </div>
                          </label>
                          <div className='column is-three-quarters'>
                            <textarea
                              type='text'
                              className='textarea is-rounded'
                              id='don-email'
                              required
                              placeholder='Hi! This is a friendly reminder to log your recent volunteer hours. You are receiving this message because you signed up for reminders'
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                            />
                          </div>
                          <div className='has-text-centered has-text-weight-bold has-text-dark is-size-4 mt-6'>
                            How often would you like to be reminded about this?
                          </div>
                          <label
                            className='label is-size-5 has-text-black mt-5'
                            htmlFor='vol-reminder'
                          >
                            Every:
                          </label>
                          <div className='select is-rounded'>
                            <select
                              id='vol-reminder'
                              onChange={(event) =>
                                setReminder(event.target.value)
                              }
                            >
                              <option>Week</option>
                              <option>Month</option>
                              <option>Year</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className='field is-grouped is-grouped-centered'>
                        <div className='control'>
                          <div
                            className='button is-danger is-light pl-6 pr-6'
                            onClick={() => [setReminded(false), setNo(true)]}
                          >
                            Nevermind, don't remind me
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className='field is-grouped is-grouped-centered mt-6'>
                    <div className='control'>
                      <button
                        type='submit'
                        className='button is-success pl-6 pr-6'
                      >
                        Submit
                      </button>
                    </div>
                    <div className='control'>
                      {params === 'true' ? (
                        <>
                          <Link to='/new/goal?newuser=true'>
                            <div className='button is-warning pl-6 pr-6'>
                              Back
                            </div>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to='/new/goal'>
                            <div className='button is-warning pl-6 pr-6'>
                              Back
                            </div>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
