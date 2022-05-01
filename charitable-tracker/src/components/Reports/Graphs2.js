import { useEffect, useState } from 'react';
import { VictoryContainer, VictoryPie, VictoryBar } from 'victory';

export default function Graphs2() {
  const [totalHours, setTotalHours] = useState(`<hours>`);
  const [data, setData] = useState([{ x: '', y: 0 }]);

  useEffect(() => {
    setData([
      { x: 'She Should Run', y: 35 },
      { x: 'Bellevue Presbyterian Church', y: 35 },
      { x: 'Toys for Tots', y: 35 },
      { x: 'Red Cross', y: 35 },
      { x: 'Tims Place', y: 35 },
    ]);
  }, []);

  return (
    <>
      <h1 className='has-text-centered has-text-black title'>{`You Volunteered ${totalHours} at these Organizations`}</h1>
      <div className='columns is-centered'>
        <div className='column'>
          <VictoryPie
            style={{ data: { stroke: 'grey', strokeWidth: '0.2' } }}
            innerRadius='80'
            colorScale={['#f9c316', '#b5d13f', '#f973bf', '#28c1e0', '#9f60e2']}
            padding={{ left: '250', right: '-150', top: '-70' }}
            containerComponent={<VictoryContainer width='800' height='360' />}
            animate={{ duration: 100, easing: 'exp' }}
            data={data}
          />
        </div>
      </div>
      <div className='columns is-centered'>
        <div className='column'>
          <VictoryBar />
        </div>
      </div>
    </>
  );
}
