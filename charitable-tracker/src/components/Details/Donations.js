import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import Pagination from 'bulma-pagination-react';

export default function Donations(props) {
  const [donations, setDonations] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isImg, setIsImg] = useState(false);
  const [img, setImg] = useState('');
  const [imgDate, setImgDate] = useState('');
  const [current, setCurrent] = useState(1);
  const [pag, setPag] = useState(null);

  const dateConvert = (date) => {
    const [year, month, day] = date.split('-');
    return `${month}/${day}/${year}`;
  };

  const handlePage = (page) => {
    setError('');
    setCurrent(page);
    axios
      .get(
        `https://charitable-tracker.herokuapp.com/api/Drecords/?page=${page}`,
        {
          headers: {
            Authorization: `Token ${props.token}`,
          },
        }
      )
      .then((res) => {
        setDonations(res.data.results);
        setPag(res.data);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  useEffect(() => {
    axios
      .get('https://charitable-tracker.herokuapp.com/api/Drecords/', {
        headers: {
          Authorization: `Token ${props.token}`,
        },
      })
      .then((res) => {
        setDonations(res.data.results);
        setPag(res.data);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [props.token]);

  return (
    <>
      <div className='column is-11 is-5-widescreen box m-3 p-5'>
        <h1 className='is-9 has-text-link is-size-4 has-text-weight-bold is-size-5-mobile mb-0 pb-0'>
          My Donations:
        </h1>
        <hr />
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
                          <div className='p-5 mb-5' key={key}>
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
                                      <div className='button is-small is-warning'>
                                        Edit Donation
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                                <>
                                  <div className='field is-grouped is-grouped-centered'>
                                    <div className='control'>
                                      {d.imgreciept ? (
                                        <div
                                          className='button is-small is-info'
                                          onClick={
                                            isActive === D_id
                                              ? () => setIsActive(null)
                                              : () => setIsActive(D_id)
                                          }
                                        >
                                          View Receipt
                                        </div>
                                      ) : (
                                        <div
                                          className='button is-small is-info'
                                          disabled
                                        >
                                          View Receipt
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </>
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
                                  <div className='column is-flex is-3 is-align-content-center is-justify-content-center'>
                                    <img
                                      src={d.imgreciept}
                                      alt={`receipt from ${dateConvert(
                                        d.created_at
                                      )} donation`}
                                      maxwidth='100%'
                                      className='is-clickable'
                                      onClick={() => [
                                        setIsImg(true),
                                        setImg(d.imgreciept),
                                        setImgDate(dateConvert(d.created_at)),
                                        props.setHideSide(true),
                                      ]}
                                    />
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </>
                      )}
                      <hr />
                    </>
                  );
                })}
                <Pagination
                  pages={Math.ceil(pag.count / 5)}
                  currentPage={current}
                  onChange={(page) => handlePage(page)}
                  className='is-small'
                  prevClassName={pag.count <= 5 && 'is-hidden'}
                  nextClassName={pag.count <= 5 && 'is-hidden'}
                />
              </>
            )}
          </>
        )}
      </div>
      <div className={`modal ${isImg ? 'is-active' : ''}`}>
        <div className='modal-background'>
          <div className='modal-content'>
            <div className='column is-10-mobile'>
              <div className='box'>
                <img
                  src={img}
                  alt={`receipt from ${imgDate} donation`}
                  maxwidth={'600vw'}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className='modal-close is-large'
          aria-label='close'
          onClick={() => [
            setIsImg(false),
            setImg(''),
            setImgDate(''),
            props.setHideSide(false),
          ]}
        />
      </div>
    </>
  );
}
