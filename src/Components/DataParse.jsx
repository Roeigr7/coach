import { useEffect, useState } from 'react';
import { usePapaParse } from 'react-papaparse';
import 'antd/dist/antd.min.css';
import { Table, Typography } from 'antd';

const { Text } = Typography;

const DataParse = () => {
  const { readRemoteFile } = usePapaParse();
  const [tableData, setTableData] = useState([
    { home: [] },
    { visitors: [] },
    { touchesTitles: [] },
    { passingTitles: [] },
    { statsResults: [] },
  ]);

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
        setTableData({
          home: results.data[0]['0'],
          visitors: results.data[3]['0'],
          touchesTitles: results.data[5].slice(0, 16),
          passingTitles: results.data[5].slice(-16),
          statsResults: handlePlayerStats(results),
          columns: handleColumns(results),
        });
      },
    });
    //Get all rows of playerStats
    const handlePlayerStats = (results) => {
      return playerStateProvider(results);
    };

    //handle columns
    const handleColumns = (results) => {
      let columnData = [];

      const playersStats = playerStateProvider(results);
      columnData.push({ title: 'Touches' }, { title: 'Passing' });

      columnData.forEach((element) => {
        let rowData = [];
        let kPassing, lTouches;
        if (element.title === 'Touches') {
          kPassing = 0;
          lTouches = 16;
        } else {
          kPassing = 16;
          lTouches = 24;
        }
        for (let i = kPassing; i < lTouches; i++) {
          let item = results.data[5][i];
          const columnFilters = playersStats.map((player, idx) => ({
            text: player[item],
            value: player[item],
          }));
          const columnUniqueFilters = columnFilters.filter(
            (currentValue, index, array) =>
              array.findIndex(
                (currentItem) =>
                  currentValue.text === currentItem.text &&
                  currentValue.value === currentItem.value
              ) === index
          );

          rowData.push({
            title: item,
            dataIndex: item,
            key: item,
            minWidth: 60,
            sorter: (a, b) => a[item] - b[item],
            filters: columnUniqueFilters,
            filterSearch: true,
            onFilter: (value, record) => record[item].startsWith(value),
          });
        }
        element.children = rowData;
      });
      return columnData;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Table
      columns={tableData.columns}
      dataSource={tableData.statsResults}
      bordered
      rowClassName={(record, index) => record.Min === '0' && 'notPlayed'}
      size='small'
      pagination={false}
      scroll={{
        x: 'max-content',
        y: 750,
      }}
      summary={(pageData) => {
        let minAvg = 0,
          tAvg = 0,
          attAvg = 0,
          faAvg = 0,
          toAvg = 0,
          shAvg = 0,
          ckAvg = 0,
          fkAvg = 0,
          crAvg = 0,
          tiAvg = 0,
          gkAvg = 0,
          gThAvg = 0,
          pAvg = 0,
          wAvg = 0;

        let col = 0;
        pageData.forEach((player, idx) => {
          minAvg += parseInt(player.Min);
          tAvg += parseInt(player.T);
          attAvg += parseInt(player['T Att 3rd']);
          faAvg += parseInt(player.FA);
          toAvg += parseInt(player.TO);
          shAvg += parseInt(player.SH);
          ckAvg += parseInt(player.CK);
          fkAvg += parseInt(player.FK);
          crAvg += parseInt(player.Cr);
          tiAvg += parseInt(player.TI);
          gkAvg += parseInt(player.GK);
          gThAvg += parseInt(player.GTh);
          pAvg += parseInt(player.P);
          wAvg += parseInt(player.W);
          col += 1;
        });
        minAvg /= col;
        tAvg /= col;
        attAvg /= col;
        faAvg /= col;
        toAvg /= col;
        shAvg /= col;
        ckAvg /= col;
        fkAvg /= col;
        crAvg /= col;
        tiAvg /= col;
        gkAvg /= col;
        gThAvg /= col;
        pAvg /= col;
        wAvg /= col;

        return (
          <Table.Summary.Row>
            {tableData?.statsResults?.map((player, idx) => {
              if (idx === 0) {
                return (
                  <Table.Summary.Cell index={idx}>
                    <Text type='success'>Average</Text>
                  </Table.Summary.Cell>
                );
              }
              if (idx === 1) {
                return (
                  <Table.Summary.Cell index={idx}>
                    <Text type='success'></Text>
                  </Table.Summary.Cell>
                );
              }
              if (idx === 2) {
                return (
                  <Table.Summary.Cell index={idx}>
                    <Text type='success'>{minAvg}</Text>
                  </Table.Summary.Cell>
                );
              }
              if (idx === 3) {
                return (
                  <Table.Summary.Cell index={idx}>
                    <Text type='success'>{tAvg}</Text>
                  </Table.Summary.Cell>
                );
              }
              if (idx === 4) {
                return (
                  <Table.Summary.Cell index={idx}>
                    <Text type='success'>{attAvg}</Text>
                  </Table.Summary.Cell>
                );
              }
              if (idx === 5) {
                return (
                  <Table.Summary.Cell index={idx}>
                    <Text type='success'>{faAvg}</Text>
                  </Table.Summary.Cell>
                );
              }
              if (idx === 6) {
                return (
                  <Table.Summary.Cell index={idx}>
                    <Text type='success'>{toAvg}</Text>
                  </Table.Summary.Cell>
                );
              }
              if (idx === 7) {
                return (
                  <Table.Summary.Cell index={idx}>
                    <Text type='success'>{shAvg}</Text>
                  </Table.Summary.Cell>
                );
              }
              if (idx === 8) {
                return (
                  <Table.Summary.Cell index={idx}>
                    <Text type='success'>{ckAvg}</Text>
                  </Table.Summary.Cell>
                );
              }
              if (idx === 9) {
                return (
                  <Table.Summary.Cell index={idx}>
                    <Text type='success'>{fkAvg}</Text>
                  </Table.Summary.Cell>
                );
              }
              if (idx === 10) {
                return (
                  <Table.Summary.Cell index={idx}>
                    <Text type='success'>{crAvg}</Text>
                  </Table.Summary.Cell>
                );
              }
              if (idx === 11) {
                return (
                  <Table.Summary.Cell index={idx}>
                    <Text type='success'>{tiAvg}</Text>
                  </Table.Summary.Cell>
                );
              }
              if (idx === 12) {
                return (
                  <Table.Summary.Cell index={idx}>
                    <Text type='success'>{gkAvg}</Text>
                  </Table.Summary.Cell>
                );
              }
              if (idx === 13) {
                return (
                  <Table.Summary.Cell index={idx}>
                    <Text type='success'>{gThAvg}</Text>
                  </Table.Summary.Cell>
                );
              }
              if (idx === 14) {
                return (
                  <Table.Summary.Cell index={idx}>
                    <Text type='success'>{pAvg}</Text>
                  </Table.Summary.Cell>
                );
              }
              if (idx === 15) {
                return (
                  <Table.Summary.Cell index={idx}>
                    <Text type='success'>{wAvg}</Text>
                  </Table.Summary.Cell>
                );
              }
            })}
          </Table.Summary.Row>
        );
      }}
    />
  );
};
export default DataParse;
