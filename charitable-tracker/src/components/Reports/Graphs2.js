import { useEffect, useState } from 'react';
import {
  VictoryContainer,
  VictoryPie,
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
} from 'victory';

export default function Graphs2() {
  const [totalHours, setTotalHours] = useState(`<hours>`);
  const [data, setData] = useState([{ x: '', y: 0 }]);

  useEffect(() => {
    setData([
      { x: 'She Should Run', y: 25, percentage: '10%' },
      { x: 'Bellevue Presbyterian Church', y: 75, percentage: '30%' },
      { x: 'Toys for Tots', y: 33, percentage: '13%' },
      { x: 'Red Cross', y: 20, percentage: '8%' },
      { x: 'Tims Place', y: 100, percentage: '39%' },
    ]);
  }, []);

  return (
    <>
      <h1 className='has-text-centered has-text-black title'>{`You Volunteered ${totalHours} at these Organizations`}</h1>
      <div className='columns is-centered'>
        <div className='column'>
          <VictoryPie
            style={{ data: { stroke: 'grey', strokeWidth: '0.2' } }}
            innerRadius='70'
            colorScale={['#f9c316', '#b5d13f', '#f973bf', '#28c1e0', '#9f60e2']}
            padding={{ left: '250', right: '-150', top: '40', bottom: '90' }}
            containerComponent={<VictoryContainer width='800' height='360' />}
            animate={{ duration: 100, easing: 'exp' }}
            data={data}
            labelComponent={
              <VictoryLabel
                text={({ datum }) => [`${datum.x}`, `${datum.percentage}`]}
              />
            }
          />
        </div>
      </div>
      <div className='columns is-centered'>
        <div className='column'>
          <VictoryChart domainPadding='40' width={800}>
            <VictoryAxis
              style={{
                tickLabels: {
                  fontSize: 13,
                  angle: -10,
                },
              }}
            />
            <VictoryAxis
              dependentAxis
              orientation='left'
              style={{
                axisLabel: { padding: 30 },
                tickLabels: { fontSize: 15 },
              }}
              label='Hours'
            />
            <VictoryBar
              barWidth={60}
              data={data}
              animate={{ duration: 100, easing: 'exp' }}
              style={{ data: { fill: '#9f60e2' } }}
              labels={({ datum }) => [`${datum.y}`]}
              cornerRadius='4'
            />
          </VictoryChart>
        </div>
      </div>
    </>
  );
}
