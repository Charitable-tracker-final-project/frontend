import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function Donations({ token }) {
  const [donations, setDonations] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const dateConvert = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    axios
      .get('https://charitable-tracker.herokuapp.com/api/Drecords/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log('Get Donations Called');
        setDonations(res.data);
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
        <h1 className='title'>My Donations:</h1>
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
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
                        You haven't entered any donations yet...
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
                    <>
                      {d.amountdonated && (
                        <>
                          <div className='box p-5 mb-5' key={key}>
                            <div className='columns'>
                              <div className='column is-9'>
                                <p className='is-size-7 has-text-grey'>{`${dateConvert(
                                  d.created_at
                                )}`}</p>
                                <div>
                                  You donated{' '}
                                  <b>{`$${d.amountdonated.toFixed(2)}`}</b> to{' '}
                                  <b>{`${d.organization}`}</b>, benefiting{' '}
                                  <b>
                                    <i>{`${d.cause}`}</i>
                                  </b>
                                </div>
                              </div>
                              <div className='column is-1' />
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
                                {d.imgreciept && (
                                  <>
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
                                  </>
                                )}
                              </div>
                            </div>
                            {isActive === D_id && (
                              <>
                                <hr></hr>
                                <div className='columns'>
                                  <p className='is-size-7 has-text-grey'>{`${d.imgreciept.replace(
                                    'https://charitabletracker.s3.amazonaws.com/reciepts/',
                                    ''
                                  )}`}</p>
                                </div>
                                <div className='columns is-centered'>
                                  <div className='column is-flex is-align-content-center is-justify-content-center'>
                                    <img
                                      src={d.imgreciept}
                                      alt={`receipt from ${dateConvert(
                                        d.created_at
                                      )} donation`}
                                      maxWidth='100%'
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
