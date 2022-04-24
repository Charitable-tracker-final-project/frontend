/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import logo from '../images/logo192.png';

export default function Home({ handleLogOut }) {
  return (
    <>
      <nav
        className='navbar pr-2 pt-1 has-background-link-light'
        role='navigation'
        aria-label='main navigation'
      >
        <div className='navbar-brand'>
          <Link className='navbar-item' to='/'>
            <img src={logo} alt='webiste logo' height={2000} className='logo' />
          </Link>
          <a
            role='button'
            className='navbar-burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='charitableNavbar'
          >
            <span aria-hidden='true' />
            <span aria-hidden='true' />
            <span aria-hidden='true' />
          </a>
        </div>

        <div id='charitableNavbar' className='navbar-menu'>
          <div className='navbar-start'>
            <Link to='/new/donation' className='navbar-item'>
              Enter Donations
            </Link>
            <Link to='/new/volunteer-hours' className='navbar-item'>
              Enter Volunteer Hours
            </Link>
          </div>
          <div className='navbar-end'>
            <Link className='navbar-item' to='/results'>
              Results
            </Link>
            <a className='button is-warning mt-1' onClick={handleLogOut}>
              Log Out
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
