import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import Pagination from 'bulma-pagination-react';

export default function Volunteering(props) {
  const [volunteerings, setVolunteerings] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDActive, setIsDActive] = useState(0);
  const [isRActive, setIsRActive] = useState(0);
  const [isImg, setIsImg] = useState(false);
  const [img, setImg] = useState('');
  const [imgDate, setImgDate] = useState('');
  const [pag, setPag] = useState(null);
  const [current, setCurrent] = useState(1);

  const dateConvert = (date) => {
    const [year, month, day] = date.split('-');
    return `${month}/${day}/${year}`;
  };

  const handlePage = (page) => {
    setError('');
    setCurrent(page);
    axios
      .get(
        `https://charitable-tracker.herokuapp.com/api/Vrecords/?page=${page}`,
        {
          headers: {
            Authorization: `Token ${props.token}`,
          },
        }
      )
      .then((res) => {
        setVolunteerings(res.data.results);
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
      .get('https://charitable-tracker.herokuapp.com/api/Vrecords/', {
        headers: {
          Authorization: `Token ${props.token}`,
        },
      })
      .then((res) => {
        setVolunteerings(res.data.results);
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
          My Volunteering:
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
            {!volunteerings.length > 0 ? (
              <>
                <h1 className='is-size-4 has-text-black'>
                  You haven't entered any volunteer hours yet...
                </h1>
                <div className='field is-grouped is-grouped-centered mt-5'>
                  <div className='control'>
                    <Link to={`/new/volunteer-hours`}>
                      <div className='button is-info'>
                        Enter New Volunteer Hours
                      </div>
                    </Link>
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
                          <div className='p-5 mb-5' key={key}>
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
                                      <div className='button is-small is-warning p-1'>
                                        Edit Volunteering
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                                <>
                                  <div className='field is-grouped is-grouped-centered'>
                                    <div className='control'>
                                      {v.description ? (
                                        <div
                                          className='button is-small has-background-primary-dark has-text-white pl-4 pr-4'
                                          onClick={
                                            isDActive === V_id
                                              ? () => setIsDActive(null)
                                              : () => setIsDActive(V_id)
                                          }
                                        >
                                          View Notes
                                        </div>
                                      ) : (
                                        <div
                                          className='button is-small has-background-primary-dark has-text-white pl-4 pr-4'
                                          disabled
                                        >
                                          View Notes
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </>
                                <>
                                  <div className='field is-grouped is-grouped-centered'>
                                    <div className='control'>
                                      {v.imgreciept ? (
                                        <div
                                          className='button is-small is-info p-2'
                                          onClick={
                                            isRActive === V_id
                                              ? () => setIsRActive(null)
                                              : () => setIsRActive(V_id)
                                          }
                                        >
                                          View Receipt
                                        </div>
                                      ) : (
                                        <div
                                          className='button is-small is-info p-2'
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
                            {isDActive === V_id && (
                              <>
                                <div className='columns is-centered box is-rounded has-background-white-ter'>
                                  <div className='column'>
                                    <p>
                                      <i className='has-text-black'>
                                        {v.description}
                                      </i>
                                    </p>
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
                                  <div className='column is-flex is-3 is-align-content-center is-justify-content-center'>
                                    <img
                                      src={v.imgreciept}
                                      alt={`receipt from ${dateConvert(
                                        v.created_at
                                      )} donation`}
                                      className='is-clickable'
                                      onClick={() => [
                                        setIsImg(true),
                                        setImg(v.imgreciept),
                                        setImgDate(dateConvert(v.created_at)),
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
                  prevClassName={pag.next && 'is-hidden'}
                  nextClassName={pag.previous && 'is-hidden'}
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
                  width={'600vw'}
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
