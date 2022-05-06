import React, { useState } from 'react';
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

export default function TimelineCT() {
  const [isLoading, setIsLoading] = useState(false);

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
                  <TextEvent date='3/14/22' text='' marker={logoMarker}>
                    <Link
                      to='/donations#3'
                      className='is-size-7-mobile has-text-black'
                    >
                      Donated <b>$15</b> to <b>She Should Run</b>, benefiting{' '}
                      <i>Womens Rights</i>
                    </Link>
                  </TextEvent>
                  <TextEvent date='2/24/22' text='' marker={logoMarker}>
                    <Link
                      to='/volunteering#2'
                      className='is-size-7-mobile has-text-black'
                    >
                      Volunteered <b>5 hours</b> for{' '}
                      <b>Bellevue Presbyterian Church</b>, benefiting{' '}
                      <i>Worship</i>
                    </Link>
                  </TextEvent>
                  <TextEvent date='1/2/22' text='' marker={logoMarker}>
                    <Link
                      to='/donations#2'
                      className='is-size-7-mobile has-text-black'
                    >
                      Donated <b>$25</b> to <b>The American Red Cross</b>,
                      benefiting <i>Disaster Relief</i>
                    </Link>
                  </TextEvent>
                  <TextEvent
                    date='1/1/22'
                    text=''
                    marker={logoMarker}
                    className='is-size-7-mobile'
                  >
                    <Link
                      to='/volunteering#1'
                      className='is-size-7-mobile has-text-black'
                    >
                      Volunteered <b>4 hours</b> for <b>Wings Over America</b>,
                      benefiting <i>Education</i>
                    </Link>
                  </TextEvent>
                </Events>
              </Timeline>
            </div>
          </>
        )}
      </div>
    </>
  );
}
