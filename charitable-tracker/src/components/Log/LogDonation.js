import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function LogDonation() {
  const [date, setDate] = useState('');
  const [org, setOrg] = useState('');
  const [dono, setDono] = useState(0);
  const [cause, setCause] = useState('');

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
                Tell us about your donation!
              </h1>
              <div className='box p-4'>
                <div className='columns is-centered'>
                  <div className='column is-two-thirds'>
                    <form onSubmit={handleSubmit}>
                      <div className='field is-grouped is-grouped-centered'>
                        <div className='control is-flex is-flex-direction-column is-align-items-center mb-3'>
                          <label
                            className='label has-text-centered'
                            htmlFor='dono-date'
                          >
                            <div className='is-size-5 mb-1'>
                              When did you donate?
                            </div>
                          </label>
                          <input
                            type='date'
                            className='input is-rounded has-text-centered'
                            id='dono-date'
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
                            htmlFor='dono-org'
                          >
                            <div className='is-size-5 mb-1'>
                              What is the organizations name?
                            </div>
                          </label>
                          <input
                            type='text'
                            className='input is-rounded has-text-centered'
                            id='dono-org'
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
                            htmlFor='dono-money'
                          >
                            <div className='is-size-5 mb-1'>
                              What amount did you donate?
                            </div>
                          </label>
                          <div className='is-inline-flex is-size-4'>
                            $
                            <input
                              type='number'
                              className='input is-rounded has-text-centered'
                              id='dono-money'
                              required
                              placeholder='$'
                              value={dono}
                              onChange={(event) => setDono(event.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='field is-grouped is-grouped-centered'>
                        <div className='control is-flex is-flex-direction-column is-align-items-center mb-3'>
                          <label
                            className='label has-text-centered'
                            htmlFor='dono-cause'
                          >
                            <div className='is-size-5 mb-1'>
                              What cause did this benefit?
                            </div>
                          </label>
                          <input
                            type='text'
                            className='input is-rounded has-text-centered'
                            id='dono-cause'
                            required
                            placeholder='Cause'
                            value={cause}
                            onChange={(event) => setCause(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className='field is-grouped is-grouped-centered'>
                        <div className='control is-flex is-flex-direction-column is-align-items-center mb-3'>
                          <label
                            className='label has-text-centered'
                            htmlFor='dono-cause'
                          >
                            <div className='is-size-5'>
                              Have a receipt or email confirmation?
                            </div>
                            <div className='is-size-5'>Upload it here!</div>
                            <div className='is-size-7 has-text-grey mb-1'>
                              <i>{`(optional)`}</i>
                            </div>
                          </label>
                          <div className='button is-info is-large is-rounded mb-6'>
                            Upload Photo
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className='field is-grouped is-grouped-centered'>
                      <div className='control'>
                        {params === 'true' ? (
                          <>
                            {' '}
                            <Link to='/new/goal/donation?newuser=true'>
                              <div className='button is-info is-size-3 is-large pl-6 pr-6 mt-4 mb-4'>
                                Submit
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