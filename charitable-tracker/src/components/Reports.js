import { useState } from 'react';
import Graphs2 from './Reports/Graphs2';
import Graphs4 from './Reports/Graphs4';
import Graphs6 from './Reports/Graphs6';
import axios from 'axios';
import Loading from './Loading/Loading';

export default function Reports({ token }) {
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
            <h1 className='title is-size-4-mobile'>My Reports</h1>
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
                    <Graphs2 token={token} />
                    <Graphs4 token={token} />
                    <Graphs6 token={token} />
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
