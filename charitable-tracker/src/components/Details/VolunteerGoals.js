import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function VolunteerGoals({ token }) {
  const [goals, setGoals] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const dateConvert = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    axios
      .get('https://charitable-tracker.herokuapp.com/api/Vgoals/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log('Get Donations Called');
        setGoals(res.data);
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
      <div className='column'>
        <br></br>
        <main>
          <div>
            <h1 className='title'>My Volunteer Goals</h1>
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
                    {!goals.length > 0 ? (
                      <>
                        <div className='box p-5 mb-5'>
                          <div className='columns is-centered'>
                            <div className='column is-10 has-text-centered'>
                              <h1 className='is-size-3 has-text-black'>
                                You haven't entered any volunteer goals yet...
                              </h1>
                              <div className='field is-grouped is-grouped-centered mt-5'>
                                <div className='control'>
                                  <Link to={`/new/goal/donationing`}>
                                    <div className='button is-large is-primary'>
                                      Enter New Volunteer Goal
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
                        {goals.map((g, key) => {
                          const G_id = g.pk;
                          return (
                            <div className='box p-5 mb-5' key={key}>
                              <div className='columns'>
                                <div className='column is-10'>
                                  <div className='columns is-centered'>
                                    <p className='is-size-7 has-text-grey has-text-centered'>{`${dateConvert(
                                      g.created_at
                                    )}`}</p>
                                  </div>
                                  <div className='columns is-7 is-centered'>
                                    <h1 className='is-size-4 has-text-centered'>
                                      {g.goaltitle}
                                    </h1>
                                  </div>
                                  <div className='has-text-centered'>
                                    You'd like to volunteer{' '}
                                    <b>{`${g.volunteergoal}`} hours</b> every{' '}
                                    <b>{`${g.interval}`}</b>
                                  </div>
                                </div>
                                <div className='column is-2 pr-6'>
                                  <div className='field is-grouped is-grouped-centered'>
                                    <div className='control'>
                                      <Link
                                        to={`/goals/volunteer/edit/${G_id}`}
                                      >
                                        <div className='button is-link'>
                                          Edit Goal
                                        </div>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className='field is-grouped is-grouped-centered'>
                                    <div className='control'>
                                      <Link to={`/goals/volunteer/${G_id}`}>
                                        <div className='button is-info'>
                                          View Volunteer Hours
                                        </div>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
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
