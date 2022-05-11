import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Timeline,
  Events,
  TextEvent,
  createTheme,
  themes,
} from '@merc/react-timeline';
import logo from '../../images/logo192.png';
import Loading from '../Loading/Loading';
import axios from 'axios';

export default function TimelineCT(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [records, setRecords] = useState(null);

  const dateConvert = (date) => {
    const [year, month, day] = date.split('-');
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    setIsLoading(true);
    setError('');
    axios
      .get('https://charitable-tracker.herokuapp.com/api/record-list/', {
        headers: {
          Authorization: `Token ${props.token}`,
        },
      })
      .then((res) => {
        setRecords(res.data.results);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [props.token]);

  const logoMarker = () => (
    <img src={logo} alt='logo marker' width='25' className='pl-1' />
  );

  const customTheme = createTheme(themes.default, {
    card: {
      backgroundColor: '',
    },
    date: {
      backgroundColor: '#f973bf',
    },
    marker: {
      borderColor: '#b5d13f',
    },
    timelineTrack: {
      backgroundColor: '#f9c316',
    },
  });

  return (
    <>
      <div className='column is-11 is-5-widescreen box m-3 p-5'>
        <h1 className='olumn is-9 has-text-link is-size-4 has-text-weight-bold is-size-5-mobile mb-0 pb-0'>
          Contribution Timeline:
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
            {!records.length > 0 ? (
              <>
                <h1 className='is-size-4 has-text-black'>
                  You haven't made any records yet...
                </h1>
                <div className='field is-grouped is-grouped-centered mt-5'>
                  <div className='control'>
                    <Link to={`/new/donation`}>
                      <div className='button is-primary'>
                        Enter New Donation
                      </div>
                    </Link>
                  </div>
                </div>
                <div className='field is-grouped is-grouped-centered mt-5'>
                  <div className='control'>
                    <Link to={`/new/volunteer-hours`}>
                      <div className='button is-info'>
                        Enter New Volunteering
                      </div>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='p-1'>
                  <Timeline theme={customTheme}>
                    <Events>
                      {records.map((r, key) => {
                        return (
                          <TextEvent
                            date={dateConvert(r.created_at)}
                            text=''
                            marker={logoMarker}
                          >
                            {r.amountdonated && (
                              <>
                                <div className='is-size-7-mobile has-text-black'>
                                  Donated <b>{`$${r.amountdonated}`}</b> to{' '}
                                  <b>{`${r.organization}`}</b>, benefiting{' '}
                                  <i>{`${r.cause}`}</i>
                                </div>
                              </>
                            )}
                            {r.hoursdonated && (
                              <>
                                <div className='is-size-7-mobile has-text-black'>
                                  Donated <b>{`${r.hoursdonated} hours`}</b> to{' '}
                                  <b>{`${r.organization}`}</b>, benefiting{' '}
                                  <i>{`${r.cause}`}</i>
                                </div>
                              </>
                            )}
                          </TextEvent>
                        );
                      })}
                    </Events>
                  </Timeline>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
