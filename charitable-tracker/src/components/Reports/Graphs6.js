import { useEffect, useState } from 'react';
import {
  VictoryContainer,
  VictoryPie,
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryLine,
} from 'victory';
import Loading from '../Loading/Loading';

export default function Graphs6({ token }) {
  const [percentage, setPercentage] = useState(0);
  const [goal, setGoal] = useState('Eagle Scout');
  const [progress, setProgress] = useState(192);
  const [goalMax, setGoalMax] = useState(250);
  const [totalHours, setTotalHours] = useState(`253`);
  const [pieData, setPieData] = useState([{ x: 'loading', y: 0 }]);
  const [barData, setBarData] = useState([{ x: 'loading', y: 0 }]);
  const [incomeSpinner, setIncomeSpinner] = useState(false);
  const [pieSpinner, setPieSpinner] = useState(false);
  const [barSpinner, setBarSpinner] = useState(false);

  const goalMath = (donos, income) => {
    let percentage = (donos / income) * 100;
    percentage = Math.round(percentage);
    return `Progress: ${percentage}%`;
  };

  useEffect(() => {
    setPieData([
      { x: 'She Should Run', y: 25, percentage: '10%' },
      { x: 'Bellevue Presbyterian Church', y: 75, percentage: '30%' },
      { x: 'Toys for Tots', y: 33, percentage: '13%' },
      { x: 'Red Cross', y: 20, percentage: '8%' },
      { x: 'Tims Place', y: 100, percentage: '39%' },
    ]);
  }, []);

  useEffect(() => {
    setBarData([
      {
        x: 'January',
        y: 1,
      },
      {
        x: 'February',
        y: 2,
      },
      {
        x: 'March',
        y: 4,
      },
      {
        x: 'April',
        y: 8,
      },
      {
        x: 'May',
        y: 16,
      },
      {
        x: 'June',
        y: 20,
      },
      {
        x: 'July',
        y: 22,
      },
      {
        x: 'August',
        y: 24,
      },
      {
        x: 'September',
        y: 25,
      },
      {
        x: 'October',
        y: 50,
      },
      {
        x: 'November',
        y: 75,
      },
      {
        x: 'December',
        y: 100,
      },
    ]);
  }, []);

  useEffect(() => {
    setPercentage((progress / goalMax) * 100);
  }, [goalMax, percentage, progress]);

  return (
    <>
      <div className='box p-5 mb-5'>
        <div className='columns'>
          <div className='column'>
            <h1 className='has-text-black has-text-info title is-size-6-mobile'>{`Progress towards ${goal}:`}</h1>
            <div className='columns is-centered'>
              <div className='column is-9'>
                {incomeSpinner && <Loading />}
                <progress
                  className={`progress m-0 ${
                    percentage < 25
                      ? 'is-danger'
                      : percentage > 24 && percentage < 50
                      ? 'is-warning'
                      : percentage > 49 && percentage < 75
                      ? 'is-link'
                      : 'is-success'
                  }`}
                  value={progress}
                  max={goalMax}
                ></progress>
                <div className='has-text-weight-medium is-size-5 is-size-6-mobile'>
                  {goalMath(progress, goalMax)}
                </div>
              </div>
            </div>
            <h1 className='has-text-black has-text-info title is-size-5-mobile'>{`Volunteer Time:`}</h1>
            <h1 className='has-text-centered title is-size-5-mobile'>{`You Volunteered ${totalHours} hours at these Organizations`}</h1>
            <div className='columns is-centered'>
              <div className='column'>
                {pieSpinner && <Loading />}
                <VictoryPie
                  style={{ data: { stroke: 'grey', strokeWidth: '0.2' } }}
                  innerRadius='70'
                  colorScale={[
                    '#f9c316',
                    '#b5d13f',
                    '#f973bf',
                    '#28c1e0',
                    '#9f60e2',
                  ]}
                  padding={{
                    left: '250',
                    right: '-150',
                    top: '40',
                    bottom: '90',
                  }}
                  containerComponent={
                    <VictoryContainer width='800' height='360' />
                  }
                  animate={{ duration: 400, easing: 'exp' }}
                  data={pieData}
                  labelComponent={
                    <VictoryLabel
                      text={({ datum }) => [
                        `${datum.x}`,
                        `${datum.percentage}`,
                      ]}
                    />
                  }
                />
              </div>
            </div>
            <h1 className='has-text-centered title is-size-6-mobile'>{`Your contributions over time`}</h1>
            <div className='columns is-centered'>
              <div className='column pt-2'>
                {barSpinner && <Loading />}
                <VictoryChart domainPadding='40' width={800}>
                  <VictoryAxis
                    style={{
                      tickLabels: {
                        fontSize: 15,
                        angle: -12,
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
                    barWidth={50}
                    data={barData}
                    animate={{ duration: 500, easing: 'exp' }}
                    style={{ data: { fill: '#b5d13f' } }}
                    labels={({ datum }) => [`${datum.y}`]}
                    cornerRadius='4'
                  />
                  <VictoryLine
                    data={barData}
                    interpolation='monotoneX'
                    animate={{ duration: 1300, easing: 'exp' }}
                    style={{ data: { stroke: '#f973bf' } }}
                  />
                </VictoryChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
