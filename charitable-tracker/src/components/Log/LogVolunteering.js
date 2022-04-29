import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function LogVolunteering() {
  const [date, setDate] = useState('');
  const [org, setOrg] = useState('');
  const [dono, setDono] = useState(0);
  const [cause, setCause] = useState('');
  const [details, setDetails] = useState('');

  const styles = {
    regPage: {
      minHeight: '100vh',
      height: '100%',
      backgroundImage: 'linear-gradient(white, #F1F5FF, #CBD9FF)',
    },
  };

  const today = () => {
    let newDate = new Date();
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}-${month < 10 ? `0${month}` : `${month}`}-${day}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();
  let params = query.get('newuser');

  useEffect(() => {
    setDate(today());
  }, []);

  console.log(params);
  return (
    <>
      <div className='column'>
        <br></br>
        <main>
          <div className='columns is-centered' style={styles.regPage}>
            <div className='column mt-4 pt-4 is-11'>
              <h1 className='title has-text-centered'>
                Tell us about your volunteering!
              </h1>
              <div className='box p-4'>
                <div className='columns is-centered'>
                  <div className='column is-two-thirds'>
                    <form onSubmit={handleSubmit}>
                      <div className='field is-grouped is-grouped-centered'>
                        <div className='control is-flex is-flex-direction-column is-align-items-center mb-3'>
                          <label
                            className='label has-text-centered'
                            htmlFor='vol-date'
                          >
                            <div className='is-size-5 mb-1'>
                              When did you volunteer?
                            </div>
                          </label>
                          <input
                            type='date'
                            className='input is-rounded has-text-centered'
                            id='vol-date'
                            required
                            placeholder='When did you donate?'
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className='field is-grouped is-grouped-centered'>
                        <div className='control is-flex is-flex-direction-column is-align-items-center mb-3'>
                          <label
                            className='label has-text-centered'
                            htmlFor='vol-org'
                          >
                            <div className='is-size-5 mb-1'>
                              What is the organizations name?
                            </div>
                          </label>
                          <input
                            type='text'
                            className='input is-rounded has-text-centered'
                            id='vol-org'
                            required
                            placeholder='Organization Name'
                            value={org}
                            onChange={(event) => setOrg(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className='field is-grouped is-grouped-centered'>
                        <div className='control is-flex is-flex-direction-column is-align-items-center mb-3'>
                          <label
                            className='label has-text-centered'
                            htmlFor='vol-hours'
                          >
                            <div className='is-size-5 mb-1'>
                              How much time did you volunteer?
                            </div>
                          </label>
                          <div className='is-inline-flex is-size-4'>
                            <input
                              type='number'
                              className='input is-rounded has-text-centered'
                              id='vol-hours'
                              required
                              placeholder='$'
                              value={dono}
                              onChange={(event) => setDono(event.target.value)}
                            />
                            <div className='ml-2'>hours</div>
                          </div>
                        </div>
                      </div>
                      <div className='field is-grouped is-grouped-centered'>
                        <div className='control is-flex is-flex-direction-column is-align-items-center mb-3'>
                          <label
                            className='label has-text-centered'
                            htmlFor='vol-cause'
                          >
                            <div className='is-size-5 mb-1'>
                              What cause did this benefit?
                            </div>
                          </label>
                          <input
                            type='text'
                            className='input is-rounded has-text-centered'
                            id='vol-cause'
                            required
                            placeholder='Cause'
                            value={cause}
                            onChange={(event) => setCause(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className='control is-flex is-flex-direction-column is-align-items-center mb-3'>
                        <label
                          className='label has-text-centered'
                          htmlFor='vol-hours'
                        >
                          <div className='is-size-5 mb-1'>
                            Give us some details!
                          </div>
                        </label>
                        <textarea
                          type='text'
                          className='textarea is-rounded'
                          id='don-email'
                          required
                          placeholder='Details go here!'
                          value={details}
                          onChange={(event) => setDetails(event.target.value)}
                        />
                      </div>
                    </form>
                    <div className='field is-grouped is-grouped-centered'>
                      <div className='control'>
                        {params === 'true' ? (
                          <>
                            {' '}
                            <Link to='/new/goal/donation?newuser=true'>
                              <div className='button is-info is-size-3 is-large pl-6 pr-6 mt-4 mb-4'>
                                Donation
                              </div>
                            </Link>
                          </>
                        ) : (
                          <>
                            {' '}
                            <Link to='/'>
                              <div className='button is-success is-large pl-6 pr-6 mt-4 mb-4'>
                                Submit
                              </div>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                    {params === 'true' && (
                      <>
                        <div className='field is-grouped is-grouped-centered mb-6'>
                          <div className='control'>
                            <Link to='/register'>
                              <div className='button is-black pl-6 pr-6 mt-6'>
                                Skip
                              </div>
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
