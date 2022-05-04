import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function SingleVolunteerGoal({ token }) {
  const params = useParams();
  const [title, setTitle] = useState('');
  const [volunteerings, setVolunteerings] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(0);

  const styles = {
    regPage: {
      minHeight: '78vh',
      height: '100%',
    },
  };

  const dateConvert = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    axios
      .get(
        `https://charitable-tracker.herokuapp.com/api/Vbreakdown/${params.G_id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        console.log('Get Volunteering Called');
        setTitle(res.data.goaltitle);
        setVolunteerings(res.data.vrecord);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [params.G_id, token]);

  return (
    <>
      <div className='column'>
        <br></br>
        <main>
          <div style={styles.regPage}>
            <div className='columns'>
              <div className='column is-9'>
                <h1 className='title'>{`Volunteering towards ${title}`}</h1>
              </div>
              <div className='column is-3'>
                <div className='field is-grouped is-grouped-centered'>
                  <div className='control'>
                    <Link to='/goals/volunteer'>
                      <div className='button is-warning pl-6 pr-6'>Back</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {isLoading ? (
              <>
                <Loading />
              </>
            ) : (
              <>
                <div className='columns is-centered'>
                  <div className='column is-11'>
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
                                You haven't contributed to this goal yet...
                              </h1>
                              <div className='field is-grouped is-grouped-centered mt-5'>
                                <div className='control'>
                                  <Link to={`/new/volunteer-hours`}>
                                    <div className='button is-large is-primary'>
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
                            <div className='box p-5 mb-5' key={key}>
                              <div className='columns'>
                                <div className='column is-10'>
                                  <p className='is-size-7 has-text-grey'>{`${dateConvert(
                                    v.created_at
                                  )}`}</p>
                                  You volunteered <b>{`${v.hours} hours`}</b>{' '}
                                  with <b>{`${v.organization}`}</b>, benefiting{' '}
                                  <b>
                                    <i>{`${v.cause}`}</i>
                                  </b>
                                </div>
                                <div className='column is-2 pr-6'>
                                  <div className='field is-grouped is-grouped-centered'>
                                    <div className='control'>
                                      <Link to={`/volunteering/edit/${V_id}`}>
                                        <div className='button is-link'>
                                          Edit Volunteering
                                        </div>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className='field is-grouped is-grouped-centered'>
                                    <div className='control'>
                                      <div
                                        className='button is-info'
                                        onClick={
                                          isActive === V_id
                                            ? () => setIsActive(null)
                                            : () => setIsActive(V_id)
                                        }
                                      >
                                        View Details
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {isActive === V_id && (
                                <>
                                  <hr></hr>
                                  <div className='columns is-centered'>
                                    <div className='column'>
                                      <p>{v.description}</p>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
