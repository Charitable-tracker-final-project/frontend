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
import Switch from 'react-switch';

export default function Profile(props) {
  const [isActive, setIsActive] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [username] = useState(props.storeUsername);

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

  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };

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
                <div className='column mt-0 mb-0 pt-0 pb-0 has-text-right has-text-weight-bold is-clickable'>
                  <a
                    role='button'
                    className={`has-text-white SidebarHeadText ${
                      isActive ? 'is-active' : 'is-active'
                    }`}
                    aria-label='menu'
                    // eslint-disable-next-line jsx-a11y/aria-proptypes
                    aria-expanded={`${isActive ? 'true' : 'false'}`}
                    data-target='charitableNavbar'
                  >
                    {`${isActive ? `←` : `→`}`}
                  </a>
                </div>
              </div>{' '}
              <div className='columns mt-0 mb-0 pt-0 pb-0'>
                <div className='column mt-0 mb-0 pt-0 pb-0 has-text-right is-clickable'>
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
                    {`${isActive ? `${username}'s Dashboard` : ``}`}
                  </a>
                </div>
              </div>{' '}
              <div className='columns mt-0 mb-0 pt-0 pb-0'>
                <div className='column mt-0 mb-1 pt-0 pb-0 has-text-right is-clickable'>
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
          <SubMenu
            title='My Impact'
            className={`${isActive ? '' : 'is-invisible'}`}
          >
            <MenuItem className={`${isActive ? '' : 'is-invisible'}`}>
              <label htmlFor='timeline-switch' className=''>
                <p className='pr-1'>By Cause</p>
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
                <p className='pr-1'>By Organization</p>
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
          </SubMenu>
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
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}></MenuItem>
          <MenuItem className={`${isActive ? '' : 'is-invisible'}`}></MenuItem>
          <SubMenu
            title={
              props.donoGoal.length > 0
                ? 'Edit Donation Goal'
                : 'Add Donation Goal'
            }
            className={`${isActive ? '' : 'is-invisible'}`}
            onOpenChange={() => [
              props.setDGoalSuccess(false),
              props.setDGoalError(''),
            ]}
          >
            <MenuItem>
              {props.donoGoal.length > 0 ? (
                <>
                  <form onSubmit={props.handleDGoalSubmit}>
                    <div className='field'>
                      <div className='control'>
                        <div className='is-inline-flex is-size-4'>
                          $
                          <input
                            type='text'
                            className='input is-rounded'
                            id='income'
                            placeholder='150'
                            value={props.dGoalAmount}
                            onChange={(event) =>
                              props.setDGoalAmount(event.target.value)
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
                    {props.dGoalSuccess && (
                      <div className='box has-background-success has-text-white has-text-centered'>
                        Successfully updated
                        <br></br>
                        Donation Goal!
                      </div>
                    )}
                    {props.dGoalError && (
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
                  <form onSubmit={props.handleDGoalPost}>
                    <div className='field'>
                      <div className='control'>
                        <div className='is-inline-flex is-size-4'>
                          $
                          <input
                            type='text'
                            className='input is-rounded'
                            id='income'
                            placeholder='150'
                            value={props.dGoalAmount}
                            onChange={(event) =>
                              props.setDGoalAmount(event.target.value)
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
                    {props.dGoalSuccess && (
                      <div className='box has-background-success has-text-white has-text-centered'>
                        Successfully Added
                        <br></br>
                        Donation Goal!
                      </div>
                    )}
                    {props.dGoalError && !props.dGoalError.status === 204 && (
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
              props.volGoal.length > 0
                ? 'Edit Volunteer Goal'
                : 'Add Volunteer Goal'
            }
            className={`${isActive ? '' : 'is-invisible'}`}
            onOpenChange={() => [
              props.setVGoalSuccess(false),
              props.setVGoalError(''),
            ]}
          >
            <MenuItem>
              {props.volGoal.length > 0 ? (
                <>
                  <form onSubmit={props.handleVGoalSubmit}>
                    <div className='field'>
                      <div className='control'>
                        <div className='is-inline-flex is-align-items-center'>
                          <input
                            type='text'
                            className='input is-rounded'
                            id='income'
                            placeholder='60'
                            value={props.vGoalAmount}
                            onChange={(event) =>
                              props.setVGoalAmount(event.target.value)
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
                    {props.vGoalSuccess && (
                      <div className='box has-background-success has-text-white has-text-centered'>
                        Successfully updated
                        <br></br>
                        Volunteer Goal!
                      </div>
                    )}
                    {props.vGoalError && (
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
                  <form onSubmit={props.handleVGoalPost}>
                    <div className='field'>
                      <div className='control'>
                        <div className='is-inline-flex is-align-items-center'>
                          <input
                            type='text'
                            className='input is-rounded'
                            id='income'
                            placeholder='60'
                            value={props.vGoalAmount}
                            onChange={(event) =>
                              props.setVGoalAmount(event.target.value)
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
                    {props.vGoalSuccess && (
                      <div className='box has-background-success has-text-white has-text-centered'>
                        Successfully Added
                        <br></br>
                        Volunteer Goal!
                      </div>
                    )}
                    {props.vGoalError && !props.vGoalError.status === 204 && (
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
              props.isIncome.length > 0
                ? 'Edit Yearly Income'
                : 'Add Yearly Income'
            }
            className={`${isActive ? '' : 'is-invisible'}`}
            onOpenChange={() => [
              props.setIncomeSuccess(false),
              props.setIncomeError(''),
            ]}
          >
            Yearly Income:
            <MenuItem>
              {props.isIncome.length > 0 ? (
                <>
                  <form onSubmit={props.handleIncome}>
                    <div className='field'>
                      <div className='control'>
                        <div className='is-inline-flex is-size-4'>
                          $
                          <input
                            type='text'
                            className='input is-rounded'
                            id='income'
                            placeholder='35000'
                            value={props.incomeInput}
                            onChange={(event) =>
                              props.setIncomeInput(event.target.value)
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
                          onClick={() => props.setIncomeInput(props.oldIncome)}
                        >
                          Reset
                        </div>
                      </div>
                    </div>
                    {props.incomeSuccess && (
                      <div className='box has-background-success has-text-white has-text-centered'>
                        Successfully updated
                        <br></br>
                        annual income!
                      </div>
                    )}
                    {props.incomeError && (
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
                  <form onSubmit={props.handlePost}>
                    <div className='field'>
                      <div className='control'>
                        <div className='is-inline-flex is-size-4'>
                          $
                          <input
                            type='text'
                            className='input is-rounded'
                            id='income'
                            placeholder='35000'
                            value={props.incomeInput}
                            onChange={(event) =>
                              props.setIncomeInput(event.target.value)
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
                          onClick={() => props.setIncomeInput(props.oldIncome)}
                        >
                          Reset
                        </div>
                      </div>
                    </div>
                    {props.incomeSuccess && (
                      <div className='box has-background-success has-text-white has-text-centered'>
                        Successfully added
                        <br></br>
                        annual income!
                      </div>
                    )}
                    {props.incomeError && !props.incomeError.status === 204 && (
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
