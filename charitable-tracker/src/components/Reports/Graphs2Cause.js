import { useEffect, useState } from 'react';
import {
  VictoryContainer,
  VictoryPie,
  VictoryLabel,
  VictoryLegend,
} from 'victory';
import axios from 'axios';

export default function Graphs2Cause({ token }) {
  const [totalDonos, setTotalDonos] = useState('');
  const [totalHours, setTotalHours] = useState('');
  const [pieDataDonos, setPieDataDonos] = useState([{ x: 'loading', y: 0 }]);
  const [pieDataVol, setPieDataVol] = useState([{ x: 'loading', y: 0 }]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [toggle, setToggle] = useState('Donations');

  useEffect(() => {
    axios
      .get('https://charitable-tracker.herokuapp.com/api/causedonation/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setTotalDonos(res.data[0].alldonated.amountdonated__sum);
        setPieDataDonos(
          res.data.filter(
            (cause) => cause.total_by_cause_donated.amountdonated__sum
          )
        );
        setIsLoading(false);
      })
      .then(() => {
        axios
          .get('https://charitable-tracker.herokuapp.com/api/causetime/', {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((res) => {
            setTotalHours(res.data[0].allhours.hoursdonated__sum);
            setPieDataVol(
              res.data.filter(
                (cause) => cause.total_by_cause_time.hoursdonated__sum
              )
            );
            setIsLoading(false);
          })
          .catch((e) => {
            setError(e.message);
          });
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [token]);

  return (
    <>
      <div className='column is-11 is-6-widescreen'>
        <div className='box p-5 mb-5'>
          {isLoading && !totalDonos && !totalHours ? (
            <>
              {error && !totalDonos && totalHours && (
                <div className='box has-background-danger has-text-white'>
                  <h3>{error}</h3>
                </div>
              )}
              {`Enter some records to see your impact with the causes you believe
              in!`}
              <div className='columns is-centered'>
                <div className='column is-6'>
                  <VictoryPie
                    standalone={true}
                    style={{
                      data: { stroke: 'grey', strokeWidth: '0.2' },
                      labels: {
                        fontSize: 20,
                      },
                    }}
                    innerRadius='70'
                    colorScale={['#28c1e0', '#9f60e2']}
                    padding={{
                      left: '50',
                      right: '-150',
                      top: '40',
                      bottom: '90',
                    }}
                    animate={{ duration: 400, easing: 'exp' }}
                    data={[{ x: 'No Data', y: 1 }]}
                    containerComponent={
                      <VictoryContainer width='600' height='360' />
                    }
                    labelComponent={
                      toggle === 'Donations' ? (
                        <VictoryLabel text={({ datum }) => [`${datum.x}`]} />
                      ) : (
                        <VictoryLabel text={({ datum }) => [`${datum.x}`]} />
                      )
                    }
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {error && (
                <div className='box has-background-danger has-text-white'>
                  <h3>{error}</h3>
                </div>
              )}
              <div className='columns'>
                <h1 className='column is-9 has-text-link is-size-4 has-text-weight-bold is-size-5-mobile'>
                  Impact of your{' '}
                  {toggle === 'Donations' ? `Donations` : `Volunteer Time`} to
                  your Causes:
                </h1>
                <div className='select is-3'>
                  <select
                    className='input is-rounded has-text-centered'
                    id='dono-cause'
                    required
                    value={toggle}
                    onChange={(event) => setToggle(event.target.value)}
                  >
                    <option>Donations</option>
                    <option>Volunteering</option>
                  </select>
                </div>
              </div>
              <hr />
              <h1 className='has-text-centered is-size-4 has-text-weight-semibold is-size-5-mobile pb-5'>
                {toggle === 'Donations'
                  ? `You donated $${totalDonos} to these causes`
                  : `You Volunteered ${totalHours} hours at these causes`}
              </h1>
              <div className='columns is-centered'>
                <div className='column is-5'>
                  <VictoryLegend
                    standalone={true}
                    containerComponent={
                      <VictoryContainer height='100%' width='20%' />
                    }
                    colorScale={[
                      '#f9c316',
                      '#b5d13f',
                      '#f973bf',
                      '#28c1e0',
                      '#9f60e2',
                    ]}
                    x={0}
                    y={0}
                    orientation='vertical'
                    gutter={20}
                    style={{ border: { stroke: 'light grey' } }}
                    data={
                      pieDataDonos && pieDataVol
                        ? toggle === 'Donations'
                          ? pieDataDonos.map((d, key) => {
                              return {
                                name: `${d.cause} - $${
                                  d.total_by_cause_donated.amountdonated__sum &&
                                  d.total_by_cause_donated.amountdonated__sum
                                }`,
                              };
                            })
                          : pieDataVol.map((d, key) => {
                              return {
                                name: `${d.cause} - ${
                                  d.total_by_cause_time.hoursdonated__sum &&
                                  d.total_by_cause_time.hoursdonated__sum
                                } hrs`,
                              };
                            })
                        : { name: `enter some records to see data!` }
                    }
                  />
                </div>
                <div className='column is-7'>
                  <VictoryPie
                    standalone={true}
                    style={{
                      data: { stroke: 'grey', strokeWidth: '0.2' },
                      labels: {
                        fontSize: 20,
                      },
                    }}
                    innerRadius='70'
                    colorScale={[
                      '#f9c316',
                      '#b5d13f',
                      '#f973bf',
                      '#28c1e0',
                      '#9f60e2',
                    ]}
                    padding={{
                      left: '50',
                      right: '-150',
                      top: '40',
                      bottom: '90',
                    }}
                    animate={{ duration: 400, easing: 'exp' }}
                    data={
                      pieDataDonos && pieDataVol
                        ? toggle === 'Donations'
                          ? pieDataDonos.map((d, key) => {
                              return {
                                x: `${d.cause}`,
                                y: d.total_by_cause_donated.amountdonated__sum,
                              };
                            })
                          : pieDataVol.map((d, key) => {
                              return {
                                x: `${d.cause}`,
                                y: d.total_by_cause_time.hoursdonated__sum,
                              };
                            })
                        : { x: 'No Data', y: 0 }
                    }
                    containerComponent={
                      <VictoryContainer width='600' height='360' />
                    }
                    labelComponent={
                      toggle === 'Donations' ? (
                        <VictoryLabel text={({ datum }) => [`$${datum.y}`]} />
                      ) : (
                        <VictoryLabel
                          text={({ datum }) => [`${datum.y} hrs`]}
                        />
                      )
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
