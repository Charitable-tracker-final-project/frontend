import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function Volunteering({ token }) {
  const [volunteerings, setVolunteerings] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDActive, setIsDActive] = useState(0);
  const [isRActive, setIsRActive] = useState(0);

  const dateConvert = (date) => {
    const [year, month, day] = date.split('-');
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    axios
      .get('https://charitable-tracker.herokuapp.com/api/Vrecords/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log('Get Volunteering Called');
        console.log(res.data.results);
        setVolunteerings(res.data.results);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [token]);

  return (
    <>
      <div className='column is-11 is-6-widescreen'>
        <h1 className='title'>My Volunteering:</h1>
        {isLoading ? (
          <>
            <Loading />
            {error && (
              <div className='box has-background-danger has-text-white'>
                <h3>{error}</h3>
              </div>
            )}
          </>
        ) : (
          <>
            {error && (
              <div className='box has-background-danger has-text-white'>
                <h3>{error}</h3>
              </div>
            )}
            {!volunteerings.length > 0 ? (
              <>
                <div className='box p-5 mb-5'>
                  <div className='columns is-centered'>
                    <div className='column is-10 has-text-centered'>
                      <h1 className='is-size-3 has-text-black'>
                        You haven't entered any volunteer hours yet...
                      </h1>
                      <div className='field is-grouped is-grouped-centered mt-5'>
                        <div className='control'>
                          <Link to={`/new/volunteer-hours`}>
                            <div className='button is-large is-info'>
                              Enter New Volunteer Hours
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {volunteerings.map((v, key) => {
                  const V_id = v.pk;
                  return (
                    <>
                      {v.hoursdonated && (
                        <>
                          <div className='box p-5 mb-5' key={key}>
                            <div className='columns'>
                              <div className='column is-9'>
                                <p className='is-size-7 has-text-grey'>{`${dateConvert(
                                  v.created_at
                                )}`}</p>
                                <div>
                                  You volunteered{' '}
                                  <b>{`${v.hoursdonated} hours`}</b> with{' '}
                                  <b>{`${v.organization}`}</b>, benefiting{' '}
                                  <b>
                                    <i>{`${v.cause}`}</i>
                                  </b>
                                </div>
                              </div>
                              <div className='column is-1' />
                              <div className='column is-2 pr-6'>
                                <div className='field is-grouped is-grouped-centered'>
                                  <div className='control'>
                                    <Link to={`/volunteering/edit/${V_id}`}>
                                      <div className='button is-link p-1'>
                                        Edit Volunteering
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                                {v.description && (
                                  <>
                                    <div className='field is-grouped is-grouped-centered'>
                                      <div className='control'>
                                        <div
                                          className='button is-info pl-5 pr-5'
                                          onClick={
                                            isDActive === V_id
                                              ? () => setIsDActive(null)
                                              : () => setIsDActive(V_id)
                                          }
                                        >
                                          View Notes
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                                {v.imgreciept && (
                                  <>
                                    <div className='field is-grouped is-grouped-centered'>
                                      <div className='control'>
                                        <div
                                          className='button is-info p-4'
                                          onClick={
                                            isRActive === V_id
                                              ? () => setIsRActive(null)
                                              : () => setIsRActive(V_id)
                                          }
                                        >
                                          View Receipt
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            {isDActive === V_id && (
                              <>
                                <hr></hr>
                                <div className='columns is-centered'>
                                  <div className='column'>
                                    <p>{v.description}</p>
                                  </div>
                                </div>
                              </>
                            )}
                            {isRActive === V_id && (
                              <>
                                <hr></hr>
                                <div className='columns'>
                                  <p className='is-size-7 has-text-grey'>{`${v.imgreciept.replace(
                                    'https://charitabletracker.s3.amazonaws.com/reciepts/',
                                    ''
                                  )}`}</p>
                                </div>
                                <div className='columns is-centered'>
                                  <div className='column is-flex is-align-content-center is-justify-content-center'>
                                    <img
                                      src={v.imgreciept}
                                      alt={`receipt from ${dateConvert(
                                        v.created_at
                                      )} donation`}
                                    />
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
