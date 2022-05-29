import React from 'react';
// import Chart from "react-apexcharts";
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import { usePapaParse } from 'react-papaparse';
import 'antd/dist/antd.min.css';
import { columnTitles } from '../constData';
import { Select } from 'antd';
const { Option } = Select;

const Charts = () => {
  const { readRemoteFile } = usePapaParse();
  const [yColumn, setYcolumn] = useState('Min');
  const [tableData, setTableData] = useState([
    { home: [] },
    { visitors: [] },
    { touchesTitles: [] },
    { passingTitles: [] },
    { statsResults: [] },
  ]);
  const [chartData, setChartData] = useState({ series: [], options: {} });

  function getPlayerStates(stats, keys) {
    return stats.map((player, idx) => {
      return player.reduce((initialValue, value, idx) => {
        return { ...initialValue, [keys[idx]]: value };
      }, {});
    });
  }

  function playerStateProvider(results) {
    const keys = results.data[5];
    const stats = results.data.slice(6);
    return getPlayerStates(stats, keys);
  }

  useEffect(() => {
    readRemoteFile('/u20advancedstats.csv', {
      complete: (results) => {
        setChartData({
          series: [
            {
              name: 'Puebla F.C. Roster',
              data: handlePlayerStats(results).map((value) => value[yColumn]),
            },
          ],
          options: {
            chart: {
              type: 'bar',
              height: 350,
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              },
            },
            dataLabels: {
              enabled: false,
            },

            xaxis: {
              categories: handlePlayerStats(results).map(
                (item) => item['Athlete']
              ),
            },
          },
        });

        setTableData({
          home: results.data[0]['0'],
          visitors: results.data[3]['0'],
          touchesTitles: results.data[5].slice(0, 16),
          passingTitles: results.data[5].slice(-16),
          statsResults: handlePlayerStats(results),
          athelatePlots: athleteHandler(results),
        });
      },
    });

    const athleteHandler = (results) => {
      return playerStateProvider(results).map((item) => item['Athlete']);
    };
    //Get all rows of playerStats
    const handlePlayerStats = (results) => {
      return playerStateProvider(results);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yColumn]);

  const handleChangeYaxis = (value) => {
    setYcolumn(value);
  };
  return (
    <div className='app' style={{ margin: '80px 0 30px 80px' }}>
      <Select
        defaultValue='Min'
        style={{
          width: 120,
        }}
        onChange={handleChangeYaxis}
      >
        {columnTitles.map((colName, idx) => (
          <Option key={idx} value={colName}>
            {colName}
          </Option>
        ))}
      </Select>
      <div className='row'>
        <div className='mixed-chart' id='chart'>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type='bar'
            width='870'
          />
        </div>
      </div>
    </div>
  );
};
export default Charts;
