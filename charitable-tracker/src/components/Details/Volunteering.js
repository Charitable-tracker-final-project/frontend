import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function Volunteering() {
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
      .get('https://charitable-tracker.herokuapp.com/api/Vrecords/')
      .then((res) => {
        console.log('Get Volunteering Called');
        console.log(res.data);
        setVolunteerings(res.data);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  return (
    <>
      <div className='column'>
        <br></br>
        <main>
          <div style={styles.regPage}>
            <h1 className='title'>My Volunteering</h1>
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
                    {volunteerings.map((v, key) => {
                      const V_id = v.pk;
                      return (
                        <div className='box p-5 mb-5' key={key}>
                          <div className='columns'>
                            <div className='column is-10'>
                              <p className='is-size-7 has-text-grey'>{`${dateConvert(
                                v.created_at
                              )}`}</p>
                              You volunteered <b>{`${v.hours} hours`}</b> with{' '}
                              <b>{`${v.organization}`}</b>, benefiting{' '}
                              <b>
                                <i>{`${v.cause}`}</i>
                              </b>
                            </div>
                            <div className='column is-2'>
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
