import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function CreateDonation() {
  const [money, setMoney] = useState(0);
  const [timeframe, setTimeframe] = useState('');
  const [reminded, setReminded] = useState(false);
  const [no, setNo] = useState(false);
  const [reminder, setReminder] = useState('');
  const [email, setEmail] = useState('');

  // Possible way to add multiple forms:
  // function Clone() {
  //   useEffect(() => {
  //     const elem = document.querySelector('#clonable');
  //     const clone = elem.cloneNode(true);
  //     clone.id = (elem.id += 1);
  //     elem.after(clone);
  //   });
  // }

  const styles = {
    regPage: {
      minHeight: '100vh',
      height: '100%',
      backgroundImage: 'linear-gradient(white, #F1F5FF, #CBD9FF)',
    },
  };

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();
  let params = query.get('newuser');

  console.log(params);

  return (
    <>
      <div className='columns is-centered' style={styles.regPage}>
        <div className='column mt-4 pt-4 is-three-quarters'>
          <h1 className='title has-text-centered'>Time to set some Goals!</h1>
          <div className='box pt-4 px-4 pb-6'>
            <h1 className='is-size-3 has-text-centered mb-6'>
              Set a Donation Goal
            </h1>
            <div className='field' id='clonable'>
              <div className='control is-flex is-flex-direction-column is-align-items-center mb-5'>
                <label className='label has-text-centered' htmlFor='don-money'>
                  <div className='is-size-4'>
                    How much money would you like to donate?
                  </div>
                </label>
                <div className='is-inline-flex mb-6'>
                  <div className='is-inline-flex is-size-4'>
                    $
                    <input
                      type='number'
                      className='input is-rounded'
                      id='don-money'
                      required
                      placeholder='#'
                      value={money}
                      onChange={(event) => setMoney(event.target.value)}
                    />
                  </div>
                  <label className='label px-4 mt-1' htmlFor='vol-timeframe'>
                    per
                  </label>
                  <div className='select is-rounded'>
                    <select
                      id='vol-timeframe'
                      onChange={(event) => setTimeframe(event.target.value)}
                    >
                      <option>Day</option>
                      <option>Week</option>
                      <option>Month</option>
                      <option>Year</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {!reminded ? (
              <>
                <div className='has-text-centered is-size-4'>
                  <b>Would you like to be reminded about this?</b>
                </div>
                <div className='field is-grouped is-grouped-centered'>
                  <div className='control'>
                    <div
                      className='button is-success is-light pl-6 pr-6'
                      onClick={() => [
                        setReminded(true),
                        setEmail(
                          'Hi! This is a friendly reminder to log your recent donations. You are receiving this message because you signed up for reminders'
                        ),
                      ]}
                    >
                      Yes
                    </div>
                  </div>
                </div>
                <div className='field is-grouped is-grouped-centered'>
                  <div className='control'>
                    <div
                      className='button is-danger is-light pl-6 pr-6'
                      onClick={() => setNo(true)}
                    >
                      No
                    </div>
                  </div>
                </div>
                {no && (
                  <>
                    <div className='has-text-centered is-size-6 has-text-grey'>
                      <i>ok, we won't remind you...</i>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className='field'>
                  <div className='control is-flex is-flex-direction-column is-align-items-center mb-5'>
                    <div className='has-text-centered has-text-weight-bold has-text-dark is-size-4'>
                      How often would you like to be reminded about this?
                    </div>
                    <label
                      className='label is-size-5 has-text-black mt-5'
                      htmlFor='vol-reminder'
                    >
                      Every:
                    </label>
                    <div className='select is-rounded'>
                      <select
                        id='vol-reminder'
                        onChange={(event) => setReminder(event.target.value)}
                      >
                        <option>Day</option>
                        <option>Week</option>
                        <option>Month</option>
                        <option>Year</option>
                      </select>
                    </div>
                    <label
                      className='label has-text-centered mt-6'
                      htmlFor='don-email'
                    >
                      <div className='is-size-4'>
                        What would you like your reminder say?
                      </div>
                    </label>
                    <div className='column is-three-quarters'>
                      <textarea
                        type='text'
                        className='textarea is-rounded'
                        id='don-email'
                        required
                        placeholder='Hi! This is a friendly reminder to log your recent donations. You are receiving this message because you signed up for reminders'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className='field is-grouped is-grouped-centered'>
                  <div className='control'>
                    <div
                      className='button is-danger is-light pl-6 pr-6'
                      onClick={() => [setReminded(false), setNo(true)]}
                    >
                      Nevermind, don't remind me
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className='field is-grouped is-grouped-centered mt-6'>
              <div className='control'>
                {params === 'true' ? (
                  <>
                    <Link to='/new/goal?newuser=true'>
                      <div className='button is-success pl-6 pr-6'>Submit</div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to='/new/goal'>
                      <div className='button is-success pl-6 pr-6'>Submit</div>
                    </Link>
                  </>
                )}
              </div>
              <div className='control'>
                {params === 'true' ? (
                  <>
                    <Link to='/new/goal?newuser=true'>
                      <div className='button is-warning pl-6 pr-6'>Back</div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to='/new/goal'>
                      <div className='button is-warning pl-6 pr-6'>Back</div>
                    </Link>
                  </>
                )}
              </div>
              {/*<div className='control'>
                <Link to={{ pathname: '/register', state: { step: 3 } }}>
                  <div className='button is-small'>Skip</div>
                </Link> 
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
