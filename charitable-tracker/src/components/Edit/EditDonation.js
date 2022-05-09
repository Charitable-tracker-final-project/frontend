import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function EditDonation({ token }) {
  const params = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [org, setOrg] = useState('');
  const [dono, setDono] = useState('');
  const [cause, setCause] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);
  const [imgURL, setImgURL] = useState('');
  const [filename, setFilename] = useState('No file uploaded...');
  const [donoSpinner, setDonoSpinner] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);

  const styles = {
    regPage: {
      minHeight: '100vh',
      height: '100%',
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
    console.log('Handle Edit Called');
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
          setImgURL(res.data.upload);
        })
        .catch((e) => {
          console.log(e);
          setError(e.message);
          setDonoSpinner(false);
        });
    image
      ? axios
          .patch(
            `https://charitable-tracker.herokuapp.com/api/Drecord/${params.D_id}/`,
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
            console.log('Successfully submitted Edit!');
            setDonoSpinner(false);
            navigate(`/`);
          })
          .catch((e) => {
            console.log(e);
            setError(e.message);
          })
      : deleteImage
      ? axios
          .patch(
            `https://charitable-tracker.herokuapp.com/api/Drecord/${params.D_id}/`,
            {
              amountdonated: dono,
              created_at: date,
              organization: org,
              cause: cause,
              imgreciept: '',
            },
            {
              headers: { Authorization: `Token ${token}` },
            }
          )
          .then((res) => {
            console.log('Successfully submitted Edit!');
            setDonoSpinner(false);
            navigate(`/`);
          })
          .catch((e) => {
            console.log(e);
            setError(e.message);
          })
      : axios
          .patch(
            `https://charitable-tracker.herokuapp.com/api/Drecord/${params.D_id}/`,
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
            console.log('Successfully submitted Edit!');
            setDonoSpinner(false);
            navigate(`/`);
          })
          .catch((e) => {
            console.log(e);
            setError(e.message);
          });
  };

  const handleDelete = (event) => {
    console.log('Handle Delete Called');
    event.preventDefault();
    setDonoSpinner(true);
    axios
      .delete(
        `https://charitable-tracker.herokuapp.com/api/Drecord/${params.D_id}/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log('Successfully deleted donation record!');
        setDonoSpinner(false);
        navigate(`/donations`);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://charitable-tracker.herokuapp.com/api/Drecord/${params.D_id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        setDate(res.data.created_at);
        setOrg(res.data.organization);
        setCause(res.data.cause);
        setDono(res.data.amountdonated);
        setIsLoading(false);
        setImgURL(res.data.imgreciept);
        res.data.imgreciept
          ? setFilename(res.data.imgreciept)
          : setFilename(null);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [params.D_id, token]);

  return (
    <>
      <div className='column'>
        <br></br>
        <main>
          <div className='columns is-centered' style={styles.regPage}>
            <div className='column mt-4 pt-4 is-11'>
              <h1 className='title has-text-centered'>Edit your donation!</h1>
              {donoSpinner && <Loading />}
              <div className='p-4'>
                <div className='columns is-centered'>
                  <div className='column is-two-thirds'>
                    {isLoading ? (
                      <>
                        <Loading />
                      </>
                    ) : (
                      <>
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
                                onChange={(event) =>
                                  setDate(event.target.value)
                                }
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
                                  onChange={(event) =>
                                    setDono(event.target.value)
                                  }
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
                                  className='input is-rounded has-text-centered'
                                  id='dono-cause'
                                  required
                                  value={cause}
                                  onChange={(event) =>
                                    setCause(event.target.value)
                                  }
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
                                      setDeleteImage(false);
                                    }}
                                  />
                                  <div className='button is-info is-large is-rounded'>
                                    Choose a file…
                                  </div>
                                  <span className='file-name'>{filename}</span>
                                </label>
                              </div>
                              {image ? (
                                <div>
                                  <div className='columns is-centered mt-4'>
                                    <div
                                      className='button is-danger'
                                      onClick={() => {
                                        setImage(null);
                                        setFilename('No file uploaded...');
                                        setDeleteImage(true);
                                      }}
                                    >
                                      Remove
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
                              ) : (
                                <div>
                                  {filename && (
                                    <>
                                      <div className='columns is-centered mt-4'>
                                        <div
                                          className='button is-danger'
                                          onClick={() => {
                                            setImage(null);
                                            setFilename('');
                                            setDeleteImage(true);
                                          }}
                                        >
                                          Remove
                                        </div>
                                      </div>
                                      <div className='columns is-centered'>
                                        <img
                                          alt='not found'
                                          width={'250px'}
                                          src={filename}
                                        />
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className='field is-grouped is-grouped-centered'>
                            <div className='control'>
                              <button
                                type='submit'
                                className='button is-success is-large pl-6 pr-6'
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                          <div className='field is-grouped is-grouped-centered'>
                            <div className='control'>
                              <div
                                className='button is-size-5 is-danger pl-6 pr-6 mt-2 mb-4'
                                onClick={(event) => {
                                  handleDelete(event);
                                }}
                              >
                                Delete
                              </div>
                            </div>
                          </div>
                        </form>
                        <div className='field is-grouped is-grouped-centered'>
                          <div className='control'>
                            <Link to='/donations'>
                              <div className='button is-warning pl-6 pr-6 mt-4 mb-4'>
                                Back
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
