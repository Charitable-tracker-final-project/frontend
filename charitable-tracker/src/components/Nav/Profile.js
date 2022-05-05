/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
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
import axios from 'axios';

export default function Profile(props) {
  const [isActive, setIsActive] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [isIncome, setIsIncome] = useState([]);
  const [incomeInput, setIncomeInput] = useState('');
  const [oldIncome, setOldIncome] = useState('');
  const [pk, setPk] = useState(0);
  const [username, setUsername] = useState(props.storeUsername);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [deleteIncome, setDeleteIncome] = useState(false);

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
    setError('');
    setSuccess(false);
    axios
      .put(
        `https://charitable-tracker.herokuapp.com/api/annualincome/${pk}/`,
        {
          annual_income: incomeInput,
        },
        {
          headers: { Authorization: `Token ${props.token}` },
        }
      )
      .then((res) => {
        console.log('Successfully submitted Edit!');
        console.log(res);
        setSuccess(true);
        setOldIncome(incomeInput);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  };

  const handleDelete = (event) => {
    console.log('Handle Delete Called');
    event.preventDefault();
    setError('');
    axios
      .delete(
        `https://charitable-tracker.herokuapp.com/api/annualincome/${pk}/`,
        {
          headers: { Authorization: `Token ${props.token}` },
        }
      )
      .then((res) => {
        console.log('Successfully deleted income!');
        console.log(res);
        setOldIncome('');
        setIncomeInput('');
        setDeleteIncome(true);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  };

  const handlePost = (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);
    setDeleteIncome(false);
    axios
      .post(
        `https://charitable-tracker.herokuapp.com/api/annualincome/`,
        {
          annual_income: incomeInput,
        },
        {
          headers: { Authorization: `Token ${props.token}` },
        }
      )
      .then((res) => {
        console.log('Successfully submitted Edit!');
        console.log(res);
        setSuccess(true);
        setOldIncome(incomeInput);
        setDeleteIncome(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  };

  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    setError('');
    axios
      .get('https://charitable-tracker.herokuapp.com/api/annualincome/', {
        headers: {
          Authorization: `Token ${props.token}`,
        },
      })
      .then((res) => {
        console.log('Get Income Called');
        setIsIncome(res.data);
        setIncomeInput(
          res.data.find((e) => {
            return e.annual_income;
          }).annual_income
        );
        setOldIncome(
          res.data.find((e) => {
            return e.annual_income;
          }).annual_income
        );
        setPk(
          res.data.find((e) => {
            return e.annual_income;
          }).pk
        );
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [props.token, oldIncome]);

  console.log(username, props.token);
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
                    {`${isActive ? `${username}'s Dashboard` : ''}`}
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
              to='/volunteering'
              onClick={() => {
                setIsActive(!isActive);
                onClickMenuIcon();
              }}
            >
              My Volunteer Hours
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
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}></MenuItem>
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}>
            <Link
              to='/goals/volunteer'
              onClick={() => {
                setIsActive(!isActive);
                onClickMenuIcon();
              }}
            >
              My Volunteer Goals
            </Link>
          </MenuItem>
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}>
            <Link
              to='/goals/donation'
              onClick={() => {
                setIsActive(!isActive);
                onClickMenuIcon();
              }}
            >
              My Donation Goals
            </Link>
          </MenuItem>
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}></MenuItem>
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}></MenuItem>
          <SubMenu
            title={
              isIncome.length > 0 ? 'Edit Yearly Income' : 'Add Yearly Income'
            }
            className={`${isActive ? '' : 'is-invisible'}`}
            onOpenChange={() => [setSuccess(false), setError('')]}
          >
            Yearly Income:
            <MenuItem>
              {isIncome.length > 0 ? (
                <>
                  <form onSubmit={handleIncome}>
                    <div className='field'>
                      <div className='control'>
                        <div className='is-inline-flex is-size-4'>
                          $
                          <input
                            type='text'
                            className='input is-rounded'
                            id='income'
                            placeholder='35000'
                            value={isLoading ? <></> : incomeInput}
                            onChange={(event) =>
                              setIncomeInput(event.target.value)
                            }
                            pattern='[0-9]+'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='field is-grouped is-grouped-centered'>
                      <div className='control'>
                        <button
                          className='button is-sucess is-small'
                          type='submit'
                        >
                          Submit
                        </button>
                      </div>
                      <div className='control'>
                        <div
                          className='button is-waring is-small'
                          type='reset'
                          onClick={() => setIncomeInput(oldIncome)}
                        >
                          Reset
                        </div>
                      </div>
                    </div>
                    <div className='field is-grouped is-grouped-centered'>
                      <div className='control'>
                        <div
                          className='button is-danger is-small'
                          type='reset'
                          onClick={(event) => handleDelete(event)}
                        >
                          Delete
                        </div>
                      </div>
                    </div>
                    {success && (
                      <div className='box has-background-success has-text-white has-text-centered'>
                        Successfully updated
                        <br></br>
                        annual income!
                      </div>
                    )}
                    {deleteIncome && (
                      <div className='box has-background-warning has-text-white has-text-centered'>
                        Successfully deleted
                        <br></br>
                        annual income!
                      </div>
                    )}
                    {error && (
                      <div className='box has-background-danger has-text-white has-text-centered'>
                        Request Failed
                        <br></br>
                        Please try again later
                      </div>
                    )}
                  </form>
                </>
              ) : (
                <>
                  <form onSubmit={handlePost}>
                    <div className='field'>
                      <div className='control'>
                        <div className='is-inline-flex is-size-4'>
                          $
                          <input
                            type='text'
                            className='input is-rounded'
                            id='income'
                            placeholder='35000'
                            value={incomeInput}
                            onChange={(event) =>
                              setIncomeInput(event.target.value)
                            }
                            pattern='[0-9]+'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='field is-grouped is-grouped-centered'>
                      <div className='control'>
                        <button
                          className='button is-sucess is-small'
                          type='submit'
                        >
                          Submit
                        </button>
                      </div>
                      <div className='control'>
                        <div
                          className='button is-waring is-small'
                          type='reset'
                          onClick={() => setIncomeInput(oldIncome)}
                        >
                          Reset
                        </div>
                      </div>
                    </div>
                    {deleteIncome && (
                      <div className='box has-background-warning has-text-black has-text-centered'>
                        Successfully deleted
                        <br></br>
                        annual income!
                      </div>
                    )}
                    {error && !error.status === 204 && (
                      <div className='box has-background-danger has-text-white has-text-centered'>
                        Request Failed
                        <br></br>
                        Please try again later
                      </div>
                    )}
                  </form>
                </>
              )}
            </MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </>
  );
}
