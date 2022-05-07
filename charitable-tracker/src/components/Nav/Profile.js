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
import Switch from 'react-switch';

export default function Profile(props) {
  const [isActive, setIsActive] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [isIncome, setIsIncome] = useState([]);
  const [incomeInput, setIncomeInput] = useState('');
  const [oldIncome, setOldIncome] = useState('');
  const [donoGoal, setDonoGoal] = useState([]);
  const [dGoalAmount, setDGoalAmount] = useState('');
  const [dGoalLoad, setDGoalLoad] = useState('');
  const [donoPK, setDonoPK] = useState(0);
  const [volGoal, setVolGoal] = useState([]);
  const [vGoalAmount, setVGoalAmount] = useState('');
  const [vGoalLoad, setVGoalLoad] = useState('');
  const [volPK, setVolPK] = useState(0);
  const [pk, setPk] = useState(0);
  const [username] = useState(props.storeUsername);
  const [isLoading, setIsLoading] = useState(true);
  const [incomeError, setIncomeError] = useState('');
  const [incomeSuccess, setIncomeSuccess] = useState(false);
  const [dGoalError, setDGoalError] = useState('');
  const [dGoalSuccess, setDGoalSuccess] = useState(false);
  const [vGoalError, setVGoalError] = useState('');
  const [vGoalSuccess, setVGoalSuccess] = useState(false);

  const styles = {
    sideBarHeight: {
      position: 'fixed',
      top: 0,
    },
    menuIcon: {
      float: 'right',
      margin: '10px',
    },
  };

  const handleIncome = (event) => {
    event.preventDefault();
    setIncomeError('');
    setIncomeSuccess(false);
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
        setIncomeSuccess(true);
        setOldIncome(incomeInput);
      })
      .catch((e) => {
        console.log(e);
        setIncomeError(e.message);
      });
  };

  const handleDGoalSubmit = (event) => {
    event.preventDefault();
    setDGoalError('');
    setDGoalSuccess(false);
    axios
      .put(
        `https://charitable-tracker.herokuapp.com/api/Dgoal/${donoPK}/`,
        {
          Dollars: dGoalAmount,
        },
        {
          headers: { Authorization: `Token ${props.token}` },
        }
      )
      .then((res) => {
        console.log('Successfully submitted Edit!');
        console.log(res);
        setDGoalSuccess(true);
        setDGoalLoad(dGoalAmount);
      })
      .catch((e) => {
        console.log(e);
        setDGoalError(e.message);
      });
  };

  const handleVGoalSubmit = (event) => {
    event.preventDefault();
    setVGoalError('');
    setVGoalSuccess(false);
    axios
      .put(
        `https://charitable-tracker.herokuapp.com/api/Vgoal/${volPK}/`,
        {
          Hours: vGoalAmount,
        },
        {
          headers: { Authorization: `Token ${props.token}` },
        }
      )
      .then((res) => {
        console.log('Successfully submitted Edit!');
        console.log(res);
        setVGoalSuccess(true);
        setVGoalLoad(vGoalAmount);
      })
      .catch((e) => {
        console.log(e);
        setVGoalError(e.message);
        setIsLoading(true);
      });
  };

  const handlePost = (event) => {
    event.preventDefault();
    setIncomeError('');
    setIncomeSuccess(false);
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
        setIncomeSuccess(true);
        setOldIncome(incomeInput);
      })
      .catch((e) => {
        console.log(e);
        setIncomeError(e.message);
      });
  };

  const handleDGoalPost = (event) => {
    event.preventDefault();
    setDGoalError('');
    setDGoalSuccess(false);
    axios
      .post(
        `https://charitable-tracker.herokuapp.com/api/Dgoals/`,
        {
          Dgoaltitle: `${username}'s Donation Goal`,
          Dollars: dGoalAmount,
        },
        {
          headers: { Authorization: `Token ${props.token}` },
        }
      )
      .then((res) => {
        console.log('Successfully submitted Post!');
        console.log(res);
        setDGoalSuccess(true);
        setIsLoading(true);
      })
      .catch((e) => {
        console.log(e);
        setDGoalError(e.message);
        setIsLoading(true);
      });
  };

  const handleVGoalPost = (event) => {
    event.preventDefault();
    setVGoalError('');
    setVGoalSuccess(false);
    axios
      .post(
        `https://charitable-tracker.herokuapp.com/api/Vgoals/`,
        {
          Vgoaltitle: `${username}'s Volunteer Goal`,
          Hours: vGoalAmount,
        },
        {
          headers: { Authorization: `Token ${props.token}` },
        }
      )
      .then((res) => {
        console.log('Successfully submitted Post!');
        console.log(res);
        setVGoalSuccess(true);
        setIsLoading(true);
      })
      .catch((e) => {
        console.log(e);
        setVGoalError(e.message);
        setIsLoading(true);
      });
  };

  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    setIncomeError('');
    setDGoalError('');
    setVGoalError('');

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
      .catch((e) => {
        setIncomeError(e.message);
      });

    axios
      .get('https://charitable-tracker.herokuapp.com/api/Dgoals/', {
        headers: {
          Authorization: `Token ${props.token}`,
        },
      })
      .then((res) => {
        console.log('Get Donation Goals Called');
        setDonoGoal(res.data);
        setDGoalAmount(
          res.data.find((e) => {
            return e.donationgoal;
          }).donationgoal
        );
        setDonoPK(
          res.data.find((e) => {
            return e.donationgoal;
          }).pk
        );
      })
      .catch((e) => {
        setDGoalError(e.message);
      });

    axios
      .get('https://charitable-tracker.herokuapp.com/api/Vgoals/', {
        headers: {
          Authorization: `Token ${props.token}`,
        },
      })
      .then((res) => {
        console.log('Get Volunteer Goals Called');
        setVolGoal(res.data);
        setVGoalAmount(
          res.data.find((e) => {
            return e.volunteergoal;
          }).volunteergoal
        );
        setVolPK(
          res.data.find((e) => {
            return e.volunteergoal;
          }).pk
        );
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        setDGoalError(e.message);
      });
  }, [props.token, oldIncome, dGoalLoad, vGoalLoad]);

  return (
    <>
      <ProSidebar
        style={styles.sideBarHeight}
        collapsed={collapsed}
        className='m-0 sidenav'
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
                      isActive ? 'is-active' : 'is-active is-invisible'
                    }`}
                    aria-label='menu'
                    // eslint-disable-next-line jsx-a11y/aria-proptypes
                    aria-expanded={`${isActive ? 'true' : 'false'}`}
                    data-target='charitableNavbar'
                  >
                    {`${isActive ? `${username}'s Dashboard` : `Settings`}`}
                  </a>
                </div>
              </div>{' '}
              <div className='columns mt-0 mb-0 pt-0 pb-0'>
                <div className='column mt-0 mb-1 pt-0 pb-0'>
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
            <label
              htmlFor='progress-switch'
              className='is-flex is-justify-content-space-between'
            >
              <p className='pr-1'>My Progress</p>
              <Switch
                onChange={() => {
                  props.setProgress(!props.progress);
                  props.setCookie(
                    'settings',
                    {
                      progress: !props.progress,
                      timeline: props.timeline,
                      graphs2: props.graphs2,
                      graphs4: props.graphs4,
                      graphs6: props.graphs6,
                      vol: props.vol,
                      dono: props.dono,
                    },
                    {
                      path: '/',
                      maxAge: 2147483647,
                    }
                  );
                }}
                checked={props.progress}
                className='progress-switch'
                height={20}
                width={50}
                onColor={'#b5d13f'}
              />
            </label>
          </MenuItem>
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}>
            <label
              htmlFor='timeline-switch'
              className='is-flex is-justify-content-space-between'
            >
              <p className='pr-1'>My Timeline</p>
              <Switch
                onChange={() => {
                  props.setTimeline(!props.timeline);
                  props.setCookie(
                    'settings',
                    {
                      progress: props.progress,
                      timeline: !props.timeline,
                      graphs2: props.graphs2,
                      graphs4: props.graphs4,
                      graphs6: props.graphs6,
                      vol: props.vol,
                      dono: props.dono,
                    },
                    {
                      path: '/',
                      maxAge: 2147483647,
                    }
                  );
                }}
                checked={props.timeline}
                className='progress-switch'
                height={20}
                width={50}
                onColor={'#b5d13f'}
              />
            </label>
          </MenuItem>
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}>
            <label
              htmlFor='progress-switch'
              className='is-flex is-justify-content-space-between'
            >
              <p className='pr-1'>My Volunteering</p>
              <Switch
                onChange={() => {
                  props.setVol(!props.vol);
                  props.setCookie(
                    'settings',
                    {
                      progress: props.progress,
                      timeline: props.timeline,
                      graphs2: props.graphs2,
                      graphs4: props.graphs4,
                      graphs6: props.graphs6,
                      vol: !props.vol,
                      dono: props.dono,
                    },
                    {
                      path: '/',
                      maxAge: 2147483647,
                    }
                  );
                }}
                checked={props.vol}
                className='progress-switch'
                height={20}
                width={50}
                onColor={'#b5d13f'}
              />
            </label>
          </MenuItem>
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}>
            <label
              htmlFor='progress-switch'
              className='is-flex is-justify-content-space-between'
            >
              <p className='pr-1'>My Donations</p>
              <Switch
                onChange={() => {
                  props.setDono(!props.dono);
                  props.setCookie(
                    'settings',
                    {
                      progress: props.progress,
                      timeline: props.timeline,
                      graphs2: props.graphs2,
                      graphs4: props.graphs4,
                      graphs6: props.graphs6,
                      vol: props.vol,
                      dono: !props.dono,
                    },
                    {
                      path: '/',
                      maxAge: 2147483647,
                    }
                  );
                }}
                checked={props.dono}
                className='progress-switch'
                height={20}
                width={50}
                onColor={'#b5d13f'}
              />
            </label>
          </MenuItem>
          <SubMenu
            title='My Impact'
            className={`${isActive ? '' : 'is-invisible'}`}
          >
            <MenuItem className={`${isActive ? '' : 'is-invisible'}`}>
              <label htmlFor='timeline-switch' className=''>
                <p className='pr-1'>By Donations/Volunteering</p>
                <Switch
                  onChange={() => {
                    props.setGraphs2(!props.graphs2);
                    props.setCookie(
                      'settings',
                      {
                        progress: props.progress,
                        timeline: props.timeline,
                        graphs2: !props.graphs2,
                        graphs4: props.graphs4,
                        graphs6: props.graphs6,
                        vol: props.vol,
                        dono: props.dono,
                      },
                      {
                        path: '/',
                        maxAge: 2147483647,
                      }
                    );
                  }}
                  checked={props.graphs2}
                  className='progress-switch'
                  height={20}
                  width={50}
                  onColor={'#b5d13f'}
                />
              </label>
            </MenuItem>
            <MenuItem className={`${isActive ? '' : 'is-invisible'}`}>
              <label htmlFor='timeline-switch' className=''>
                <p className='pr-1'>By Goal</p>
                <Switch
                  onChange={() => {
                    props.setGraphs6(!props.graphs6);
                    props.setCookie(
                      'settings',
                      {
                        progress: props.progress,
                        timeline: props.timeline,
                        graphs2: props.graphs2,
                        graphs4: props.graphs4,
                        graphs6: !props.graphs6,
                        vol: props.vol,
                        dono: props.dono,
                      },
                      {
                        path: '/',
                        maxAge: 2147483647,
                      }
                    );
                  }}
                  checked={props.graphs6}
                  className='progress-switch'
                  height={20}
                  width={50}
                  onColor={'#b5d13f'}
                />
              </label>
            </MenuItem>
            <MenuItem className={`${isActive ? '' : 'is-invisible'}`}>
              <label htmlFor='timeline-switch' className=''>
                <p className='pr-1'>By Organization</p>
                <Switch
                  onChange={() => {
                    props.setGraphs4(!props.graphs4);
                    props.setCookie(
                      'settings',
                      {
                        progress: props.progress,
                        timeline: props.timeline,
                        graphs2: props.graphs2,
                        graphs4: !props.graphs4,
                        graphs6: props.graphs6,
                        vol: props.vol,
                        dono: props.dono,
                      },
                      {
                        path: '/',
                        maxAge: 2147483647,
                      }
                    );
                  }}
                  checked={props.graphs4}
                  className='progress-switch'
                  height={20}
                  width={50}
                  onColor={'#b5d13f'}
                />
              </label>
            </MenuItem>
          </SubMenu>
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}></MenuItem>
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}></MenuItem>
          <SubMenu
            title={
              donoGoal.length > 0 ? 'Edit Donation Goal' : 'Add Donation Goal'
            }
            className={`${isActive ? '' : 'is-invisible'}`}
            onOpenChange={() => [setDGoalSuccess(false), setDGoalError('')]}
          >
            <MenuItem>
              {donoGoal.length > 0 ? (
                <>
                  <form onSubmit={handleDGoalSubmit}>
                    <div className='field'>
                      <div className='control'>
                        <div className='is-inline-flex is-size-4'>
                          $
                          <input
                            type='text'
                            className='input is-rounded'
                            id='income'
                            placeholder='150'
                            value={dGoalAmount}
                            onChange={(event) =>
                              setDGoalAmount(event.target.value)
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
                    </div>
                    {dGoalSuccess && (
                      <div className='box has-background-success has-text-white has-text-centered'>
                        Successfully updated
                        <br></br>
                        Donation Goal!
                      </div>
                    )}
                    {dGoalError && (
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
                  <form onSubmit={handleDGoalPost}>
                    <div className='field'>
                      <div className='control'>
                        <div className='is-inline-flex is-size-4'>
                          $
                          <input
                            type='text'
                            className='input is-rounded'
                            id='income'
                            placeholder='150'
                            value={dGoalAmount}
                            onChange={(event) =>
                              setDGoalAmount(event.target.value)
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
                    </div>
                    {dGoalError && !dGoalError.status === 204 && (
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
          <SubMenu
            title={
              volGoal.length > 0 ? 'Edit Volunteer Goal' : 'Add Volunteer Goal'
            }
            className={`${isActive ? '' : 'is-invisible'}`}
            onOpenChange={() => [setVGoalSuccess(false), setVGoalError('')]}
          >
            <MenuItem>
              {volGoal.length > 0 ? (
                <>
                  <form onSubmit={handleVGoalSubmit}>
                    <div className='field'>
                      <div className='control'>
                        <div className='is-inline-flex is-align-items-center'>
                          <input
                            type='text'
                            className='input is-rounded'
                            id='income'
                            placeholder='60'
                            value={vGoalAmount}
                            onChange={(event) =>
                              setVGoalAmount(event.target.value)
                            }
                            pattern='[0-9]+'
                          />
                          <p className='pl-1'>hours</p>
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
                    </div>
                    {vGoalSuccess && (
                      <div className='box has-background-success has-text-white has-text-centered'>
                        Successfully updated
                        <br></br>
                        Volunteer Goal!
                      </div>
                    )}
                    {vGoalError && (
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
                  <form onSubmit={handleVGoalPost}>
                    <div className='field'>
                      <div className='control'>
                        <div className='is-inline-flex is-align-items-center'>
                          <input
                            type='text'
                            className='input is-rounded'
                            id='income'
                            placeholder='60'
                            value={vGoalAmount}
                            onChange={(event) =>
                              setVGoalAmount(event.target.value)
                            }
                            pattern='[0-9]+'
                          />
                          <p className='pl-1'>hours</p>
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
                    </div>
                    {vGoalError && !vGoalError.status === 204 && (
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
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}></MenuItem>
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}></MenuItem>
          <SubMenu
            title={
              isIncome.length > 0 ? 'Edit Yearly Income' : 'Add Yearly Income'
            }
            className={`${isActive ? '' : 'is-invisible'}`}
            onOpenChange={() => [setIncomeSuccess(false), setIncomeError('')]}
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
                    {incomeSuccess && (
                      <div className='box has-background-success has-text-white has-text-centered'>
                        Successfully updated
                        <br></br>
                        annual income!
                      </div>
                    )}
                    {incomeError && (
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
                    {incomeError && !incomeError.status === 204 && (
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
