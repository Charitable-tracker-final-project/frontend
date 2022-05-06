/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo192.png';

export default function Navbar({ handleLogOut }) {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <nav
        className={`navbar is-spaced has-shadow has-background-link-light ${
          location.pathname === '/' && 'ml-5 pl-6'
        }`}
        role='navigation'
        aria-label='main navigation'
      >
        <div className='navbar-brand'>
          <Link className='navbar-item' to='/'>
            <img src={logo} alt='webiste logo' />
            <div className='pl-1'>Charitable Tracker</div>
          </Link>
          <a
            onClick={() => {
              setIsActive(!isActive);
            }}
            role='button'
            className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
            aria-label='menu'
            // eslint-disable-next-line jsx-a11y/aria-proptypes
            aria-expanded={`${isActive ? 'true' : 'false'}`}
            data-target='charitableNavbar'
          >
            <span aria-hidden='true' />
            <span aria-hidden='true' />
            <span aria-hidden='true' />
          </a>
        </div>

        <div
          id='charitableNavbar'
          className={`navbar-menu ${isActive ? 'is-active' : ''}`}
        >
          <div className='navbar-start'>
            <Link to='/' className='navbar-item'>
              Dashboard
            </Link>
            <Link to='/new/donation' className='navbar-item'>
              Enter Donations
            </Link>
            <Link to='/new/volunteer-hours' className='navbar-item'>
              Enter Volunteer Hours
            </Link>
            <Link to='/new/goal' className='navbar-item'>
              Create Goal
            </Link>
          </div>
          <div className='navbar-end'>
            <div className='button is-warning mt-1' onClick={handleLogOut}>
              <Link to='/'>Log Out</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
