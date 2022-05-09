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
        console.log('Get Donations Called');
        console.log(res.data);
        setRecords(res.data.results);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [error, props.token]);

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
      <div className='column is-11 is-6-widescreen'>
        <h1 className='title'>Contribution Timeline:</h1>
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className='box p-0'>
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
      </div>
    </>
  );
}
