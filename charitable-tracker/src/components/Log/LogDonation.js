import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import axios from 'axios';

export default function LogDonation({ token }) {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [org, setOrg] = useState('');
  const [dono, setDono] = useState(0);
  const [cause, setCause] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState('No file uploaded...');
  const [donoSpinner, setDonoSpinner] = useState(false);

  const handleSubmit = (event) => {
    console.log('Handle Donation Called');
    console.log(image);
    event.preventDefault();
    setDonoSpinner(true);

    image &&
      axios
        .post(`https://charitable-tracker.herokuapp.com/api/upload/`, image, {
          headers: {
            'Content-Type': 'image/*',
            'Content-Disposition': `attachment;filename=${filename}`,
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          console.log('Successfully submitted Image!');
          console.log(res.data.upload);
        })
        .catch((e) => {
          console.log(e);
          setError(e.message);
          setDonoSpinner(false);
        });

    image
      ? axios
          .post(
            `https://charitable-tracker.herokuapp.com/api/Drecords/`,
            {
              amountdonated: dono,
              created_at: date,
              organization: org,
              cause: cause,
              imgreciept: `https://charitabletracker.s3.amazonaws.com/reciepts/${filename.replaceAll(
                ' ',
                '_'
              )}`,
            },
            {
              headers: { Authorization: `Token ${token}` },
            }
          )
          .then((res) => {
            console.log('Successfully submitted Donation!');
            setDonoSpinner(false);
            params === true
              ? navigate('/new/goal/?newuser=true')
              : navigate(`/`);
          })
          .catch((e) => {
            console.log(e);
            setError(e.message);
            setDonoSpinner(false);
          })
      : axios
          .post(
            `https://charitable-tracker.herokuapp.com/api/Drecords/`,
            {
              amountdonated: dono,
              created_at: date,
              organization: org,
              cause: cause,
            },
            {
              headers: { Authorization: `Token ${token}` },
            }
          )
          .then((res) => {
            console.log('Successfully submitted Donation!');
            setDonoSpinner(false);
            params === true
              ? navigate('/new/goal/?newuser=true')
              : navigate(`/`);
          })
          .catch((e) => {
            console.log(e);
            setError(e.message);
            setDonoSpinner(false);
          });

    axios
      .post(
        `https://charitable-tracker.herokuapp.com/api/org/`,
        {
          organization: org,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log('Successfully submitted Org!');
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
        setDonoSpinner(false);
      });

    axios
      .post(
        `https://charitable-tracker.herokuapp.com/api/cause/`,
        {
          cause: cause,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log('Successfully submitted Cause!');
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
        setDonoSpinner(false);
      });
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

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();
  let params = query.get('newuser');

  useEffect(() => {
    setDate(today());
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className='column'>
        <br></br>
        <main>
          <div className='columns is-centered'>
            <div className='column mt-4 pt-4 is-11'>
              <h1 className='title has-text-centered'>
                Tell us about your donation!
              </h1>
              {donoSpinner && <Loading />}
              {error && (
                <div className='box has-background-danger has-text-white'>
                  <h3>{error}</h3>
                </div>
              )}
              <div className='p-4'>
                <div className='columns is-centered'>
                  <div className='column is-two-thirds'>
                    <form onSubmit={handleSubmit}>
                      <div className='field is-grouped is-grouped-centered'>
                        <div className='control is-flex is-flex-direction-column is-align-items-center mb-3'>
                          <label className='label' htmlFor='dono-date'>
                            <div className='is-size-5 mb-1'>
                              When did you donate?
                            </div>
                          </label>
                          <input
                            type='date'
                            className='input is-rounded'
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
                              What is the organization's name?
                            </div>
                          </label>
                          <input
                            type='text'
                            className='input is-rounded'
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
                              className='input is-rounded'
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
                          <div className='select'>
                            <select
                              className='input is-rounded'
                              id='dono-cause'
                              required
                              value={cause}
                              onChange={(event) => setCause(event.target.value)}
                            >
                              <option />
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
                          <div className='file has-name is-boxed'>
                            <label className='file-label'>
                              <input
                                className='file-input'
                                type='file'
                                name='receipt'
                                accept='image/*'
                                onChange={(event) => {
                                  console.log(event.target.files[0]);
                                  console.log(event.target.files[0].name);
                                  setImage(event.target.files[0]);
                                  setFilename(event.target.files[0].name);
                                }}
                              />
                              <div className='button is-info is-large'>
                                Choose a file…
                              </div>
                              <span className='file-name'>{filename}</span>
                            </label>
                          </div>
                          {image && (
                            <div>
                              <div className='columns is-centered mt-4'>
                                <div className='field is-grouped is-grouped-centered'>
                                  <div className='control'>
                                    <div
                                      className='button is-danger mb-1'
                                      onClick={() => {
                                        setImage(null);
                                        setFilename('No file uploaded...');
                                      }}
                                    >
                                      Remove
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='columns is-centered'>
                                <img
                                  alt='not found'
                                  width={'250px'}
                                  src={URL.createObjectURL(image)}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='field is-grouped is-grouped-centered'>
                        <div className='control'>
                          <button className='button is-success is-large pl-6 pr-6 mt-4 mb-4'>
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
                              <div className='button is-info pl-6 pr-6 mt-6'>
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
