import { Link } from 'react-router-dom';

export default function GoalSet(newUser) {
  const styles = {
    regPage: {
      height: '100vh',
      backgroundImage: 'linear-gradient(white, #F1F5FF, #CBD9FF)',
    },
  };

  console.log(newUser);
  return (
    <>
      <div className='columns is-centered' style={styles.regPage}>
        <div className='column mt-4 pt-4 is-three-quarters'>
          <h1 className='title has-text-centered'>Time to set some Goals!</h1>
          <div className='box p-4'>
            <div className='columns is-centered'>
              <div className='column is-two-thirds'>
                <div className='is-size-3 has-text-centered mb-6'>
                  {!newUser
                    ? `What kind of Goal would you like to set?`
                    : `Would you like to set a goal?`}
                </div>
                <div className='field is-grouped is-grouped-centered'>
                  <div className='control'>
                    <Link to='/new/goal/volunteering'>
                      <div className='button is-success is-size-3 is-large pl-5 pr-5 mb-4'>
                        Volunteering
                      </div>
                    </Link>
                  </div>
                </div>
                <div className='field is-grouped is-grouped-centered'>
                  <div className='control'>
                    <Link to='/new/goal/donation'>
                      <div className='button is-info is-size-3 is-large pl-6 pr-6 mt-4 mb-4'>
                        Donation
                      </div>
                    </Link>
                  </div>
                </div>
                {newUser && (
                  <>
                    <div className='field is-grouped is-grouped-centered mb-6'>
                      <div className='control'>
                        <Link to='/register'>
                          <div className='button is-black pl-6 pr-6 mt-6'>
                            Skip
                          </div>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
