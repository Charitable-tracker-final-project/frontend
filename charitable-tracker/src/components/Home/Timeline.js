import React from 'react';
import { Link } from 'react-router-dom';
import {
  Timeline,
  Events,
  UrlButton,
  ImageEvent,
  TextEvent,
  YouTubeEvent,
  createTheme,
  themes,
} from '@merc/react-timeline';
import logo from '../../images/logo192.png';

export default function TimelineCT() {
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
      <div className='columns is-centered'>
        <div className='column is-11'>
          <h1 className='is-size-7-mobile'>Contribution Timeline:</h1>
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
        </div>
      </div>
    </>
  );
}
