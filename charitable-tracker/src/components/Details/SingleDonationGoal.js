import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import placeholder from '../../images/logo512.png';

export default function SingleDonationGoal({ token }) {
  const params = useParams();
  const [title, setTitle] = useState('');
  const [donations, setDonations] = useState(null);
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
        `https://charitable-tracker.herokuapp.com/api/Dbreakdown/${params.G_id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        console.log('Get Donations Called');
        setTitle(res.data.goaltitle);
        setDonations(res.data.drecord);
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
                <h1 className='title'>{`Donations towards ${title}`}</h1>
              </div>
              <div className='column is-3'>
                <div className='field is-grouped is-grouped-centered'>
                  <div className='control'>
                    <Link to='/goals/donation'>
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
                    {!donations.length > 0 ? (
                      <>
                        <div className='box p-5 mb-5'>
                          <div className='columns is-centered'>
                            <div className='column is-10 has-text-centered'>
                              <h1 className='is-size-3 has-text-black'>
                                You haven't contributed to this goal yet...
                              </h1>
                              <div className='field is-grouped is-grouped-centered mt-5'>
                                <div className='control'>
                                  <Link to={`/new/donation`}>
                                    <div className='button is-large is-primary'>
                                      Enter New Donation
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
                        {donations.map((d, key) => {
                          const D_id = d.pk;
                          return (
                            <div className='box p-5 mb-5' key={key}>
                              <div className='columns'>
                                <div className='column is-10'>
                                  <p className='is-size-7 has-text-grey'>{`${dateConvert(
                                    d.created_at
                                  )}`}</p>
                                  You donated{' '}
                                  <b>{`$${d.amountdonated.toFixed(2)}`}</b> to{' '}
                                  <b>{`${d.organization}`}</b>, benefiting{' '}
                                  <b>
                                    <i>{`${d.cause}`}</i>
                                  </b>
                                </div>
                                <div className='column is-2 pr-5'>
                                  <div className='field is-grouped is-grouped-centered'>
                                    <div className='control'>
                                      <Link to={`/donations/edit/${D_id}`}>
                                        <div className='button is-link'>
                                          Edit Donation
                                        </div>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className='field is-grouped is-grouped-centered'>
                                    <div className='control'>
                                      <div
                                        className='button is-info'
                                        onClick={
                                          isActive === D_id
                                            ? () => setIsActive(null)
                                            : () => setIsActive(D_id)
                                        }
                                      >
                                        View Receipt
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {isActive === D_id && (
                                <>
                                  <hr></hr>
                                  <div className='columns'>
                                    <p className='is-size-7 has-text-grey'>{`<filename would go here>`}</p>
                                  </div>
                                  <div className='columns is-centered'>
                                    <div className='column is-flex is-align-content-center is-justify-content-center'>
                                      <img
                                        src={placeholder}
                                        alt={`receipt from ${dateConvert(
                                          d.created_at
                                        )} donation`}
                                      />
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
