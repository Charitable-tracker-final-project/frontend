import { useState } from 'react';
import Graphs2 from './Reports/Graphs2';
import Graphs4 from './Reports/Graphs4';
import Graphs6 from './Reports/Graphs6';
import axios from 'axios';
import Loading from './Loading/Loading';

export default function Reports() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const styles = {
    regPage: {
      minHeight: '78vh',
      height: '100%',
    },
  };

  return (
    <>
      <div className='column'>
        <br></br>
        <main>
          <div style={styles.regPage}>
            <h1 className='title'>My Donations</h1>
            {isLoading ? (
              <>
                <Loading />
              </>
            ) : (
              <>
                <div className='columns is-centered'>
                  <div className='column is-11'>
                    {error && (
                      <div className='box has-background-danger has-text-white'>
                        <h3>{error}</h3>
                      </div>
                    )}
                    <div className='box p-5 mb-5'>
                      <div className='columns'>
                        <div className='column'>
                          <Graphs2 />
                          <Graphs4 />
                          <Graphs6 />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
