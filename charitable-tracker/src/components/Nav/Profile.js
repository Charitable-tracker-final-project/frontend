/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarHeader,
  SubMenu,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../Nav/custom.scss';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [isActive, setIsActive] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [income, setIncome] = useState('');
  const username = 'Adam';
  const styles = {
    sideBarHeight: {
      height: '100vh',
    },
    menuIcon: {
      float: 'right',
      margin: '10px',
    },
  };

  const handleIncome = (event) => {
    event.preventDefault();
    return null;
  };

  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <ProSidebar
        style={styles.sideBarHeight}
        collapsed={collapsed}
        className='m-0'
      >
        <SidebarHeader>
          <div style={styles.menuIcon} onClick={onClickMenuIcon}>
            <a
              onClick={() => {
                setIsActive(!isActive);
              }}
              role='button'
              className={`has-text-white ${isActive ? 'is-active' : ''}`}
              aria-label='menu'
              // eslint-disable-next-line jsx-a11y/aria-proptypes
              aria-expanded={`${isActive ? 'true' : 'false'}`}
              data-target='charitableNavbar'
            >
              {`${isActive ? `${username}'s Profile` : 'Profile'}`}
            </a>
          </div>
        </SidebarHeader>
        <Menu iconShape='square' className='has-text-white'>
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}>
            <Link
              to='/goals'
              onClick={() => {
                setIsActive(!isActive);
                onClickMenuIcon();
              }}
            >
              My Goals
            </Link>
          </MenuItem>
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}>
            <Link
              to='/volunteering'
              onClick={() => {
                setIsActive(!isActive);
                onClickMenuIcon();
              }}
            >
              My Volunteering
            </Link>
          </MenuItem>
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}>
            <Link
              to='/donations'
              onClick={() => {
                setIsActive(!isActive);
                onClickMenuIcon();
              }}
            >
              My Donations
            </Link>
          </MenuItem>
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}></MenuItem>
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}>
            <Link
              to='/new/goal'
              onClick={() => {
                setIsActive(!isActive);
                onClickMenuIcon();
              }}
            >
              Create Goal
            </Link>
          </MenuItem>
          <SubMenu
            title='Edit Yearly Income'
            className={`${isActive ? '' : 'is-invisible'}`}
          >
            Yearly Income:
            <MenuItem>
              <form onSubmit={handleIncome}>
                <div className='field'>
                  <div className='control'>
                    <input
                      type='number'
                      className='input is-rounded'
                      id='income'
                      value={income}
                      onChange={(event) => setIncome(event.target.value)}
                    />
                  </div>
                </div>
                <div className='field is-grouped is-grouped-centered'>
                  <div className='control'>
                    <button className='button is-sucess is-small' type='submit'>
                      Submit
                    </button>
                  </div>
                  <div className='control'>
                    <div className='button is-waring is-small' type='reset'>
                      Reset
                    </div>
                  </div>
                </div>
              </form>
            </MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </>
  );
}
