import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import placeholder from '../../images/logo512.png';

export default function Donations() {
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
      .get('https://charitable-tracker.herokuapp.com/api/Drecords/')
      .then((res) => {
        console.log('Get Donations Called');
        console.log(res.data);
        setDonations(res.data);
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
            <h1 className='title'>My Donations</h1>
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
                            <div className='column is-2'>
                              <div className='field is-grouped is-grouped-centered'>
                                <div className='control'>
                                  <Link to={`/volunteering/edit/${D_id}`}>
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
