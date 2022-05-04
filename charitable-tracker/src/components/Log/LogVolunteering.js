import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import axios from 'axios';

export default function LogVolunteering({ token }) {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [org, setOrg] = useState('');
  const [dono, setDono] = useState(0);
  const [cause, setCause] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const [volSpinner, setVolSpinner] = useState(false);

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

    return `${year}-${month < 10 ? `0${month}` : `${month}`}-${
      day > 9 ? day : `0${day}`
    }`;
  };

  const handleSubmit = (event) => {
    console.log('Handle Edit Called');
    event.preventDefault();
    setVolSpinner(true);
    axios
      .post(
        `https://charitable-tracker.herokuapp.com/api/Vrecords/`,
        {
          hours: dono,
          created_at: date,
          organization: org,
          description: details,
          cause: cause,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log('Successfully submitted Edit!');
        setVolSpinner(false);
        params === true ? navigate('/new/goal/?newuser=true') : navigate(`/`);
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

  useEffect(() => {
    setDate(today());
  }, []);

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
              {volSpinner && <Loading />}
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
                              placeholder='#'
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
                          <div className='select'>
                            <select
                              className='input is-rounded has-text-centered'
                              id='vol-cause'
                              required
                              value={cause}
                              onChange={(event) => setCause(event.target.value)}
                            >
                              <option>Animals</option>
                              <option>Arts Culture Humanities</option>
                              <option>Asian Rights</option>
                              <option>Black Rights</option>
                              <option>Community Development</option>
                              <option>Education</option>
                              <option>Environmental</option>
                              <option>Health</option>
                              <option>Human and Civil Rights</option>
                              <option>International</option>
                              <option>Latino Rights</option>
                              <option>Research and Public Policy</option>
                              <option>Religion</option>
                              <option>Women's Rights</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className='control is-flex is-flex-direction-column is-align-items-center mb-3'>
                        <label
                          className='label has-text-centered'
                          htmlFor='vol-hours'
                        >
                          <div className='columns is-centered is-size-5 mb-1'>
                            Give us some details!
                          </div>
                          <div className='columns is-size-6 mb-1 is-centered has-text-grey'>
                            <i>{`(optional)`}</i>
                          </div>
                        </label>
                        <textarea
                          type='text'
                          className='textarea is-rounded'
                          id='don-email'
                          placeholder='Details go here!'
                          value={details}
                          onChange={(event) => setDetails(event.target.value)}
                        />
                      </div>
                      <div className='field is-grouped is-grouped-centered'>
                        <div className='control'>
                          <button className='button is-info is-size-3 is-large pl-6 pr-6 mt-4 mb-4'>
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
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
