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

export default function Profile(storeUsername) {
  console.log(storeUsername);
  const [isActive, setIsActive] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [income, setIncome] = useState('');
  const [incomeInput, setIncomeInput] = useState('');
  const [username, setUsername] = useState(storeUsername.storeuUsername);
  const styles = {
    sideBarHeight: {
      height: '100%',
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
          <div
            onClick={() => {
              setIsActive(!isActive);
            }}
          >
            <div style={styles.menuIcon} onClick={onClickMenuIcon}>
              <div className='columns mt-0 mb-0 pt-0 pb-0'>
                <div className='column mt-0 mb-0 pt-0 pb-0'>
                  <a
                    role='button'
                    className={`has-text-white SidebarHeadText ${
                      isActive ? 'is-active' : ''
                    }`}
                    aria-label='menu'
                    // eslint-disable-next-line jsx-a11y/aria-proptypes
                    aria-expanded={`${isActive ? 'true' : 'false'}`}
                    data-target='charitableNavbar'
                  >
                    {`${isActive ? `${username}'s Dashboard` : 'Dashboard'}`}
                  </a>
                </div>
              </div>{' '}
              <div className='columns mt-0 mb-0 pt-0 pb-0'>
                <div className='column mt-0 mb-0 pt-0 pb-0'>
                  <a
                    role='button'
                    className={`has-text-white SidebarHeadText ${
                      isActive ? 'is-active' : ''
                    }`}
                    aria-label='menu'
                    // eslint-disable-next-line jsx-a11y/aria-proptypes
                    aria-expanded={`${isActive ? 'true' : 'false'}`}
                    data-target='charitableNavbar'
                  >
                    Settings
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SidebarHeader>
        <Menu iconShape='square' className='has-text-white'>
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}>
            <Link
              to='/reports'
              onClick={() => {
                setIsActive(!isActive);
                onClickMenuIcon();
              }}
            >
              Reports
            </Link>
          </MenuItem>
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
                      type='text'
                      className='input is-rounded'
                      id='income'
                      placeholder='35000'
                      value={incomeInput}
                      onChange={(event) => setIncomeInput(event.target.value)}
                      pattern='[0-9]+'
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
                    <div
                      className='button is-waring is-small'
                      type='reset'
                      onClick={() => setIncomeInput('')}
                    >
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
