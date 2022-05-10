import { useState } from 'react';
import Graphs2 from './Reports/Graphs2Cause';
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
      <div className='column is-11 is-6-widescreen'>
        <h1 className='title is-size-4-mobile'>My Impact:</h1>
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            {error && (
              <div className='box has-background-danger has-text-white'>
                <h3>{error}</h3>
              </div>
            )}
            <Graphs2 token={token} />
            <Graphs4 token={token} />
            <Graphs6 token={token} />
          </>
        )}
      </div>
    </>
  );
}
