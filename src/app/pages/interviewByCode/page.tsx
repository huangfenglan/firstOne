'use client';
import { useEffect, useMemo } from 'react';
import { Table } from 'antd';
import { log } from 'node:console';

const arr = [
  {
    endTime: 1784790000000,
    data: [
      {
        codeName: 'ASPL40',
        currencyList: [
          {
            amountAt: '299.00',
            currency: 'USD',
            decreaseMoney: '40.00',
          },
          {
            amountAt: '1200.00',
            currency: 'PLN',
            decreaseMoney: '160.00',
          },
        ],
      },
      {
        codeName: 'ASPL41',
        currencyList: [
          {
            amountAt: '399.00',
            currency: 'USD',
            decreaseMoney: '60.00',
          },
          {
            amountAt: '1600.00',
            currency: 'PLN',
            decreaseMoney: '75.00',
          },
        ],
      },
    ],
    startTime: 1706688000000,
  },
];

const columns = [
  {
    title: 'amountAt',
    dataIndex: 'amountAt',
    rowScope: 'row',
  },
  {
    title: 'currency',
    dataIndex: 'currency',
    rowScope: 'row',
  },
  {
    title: 'decreaseMoney',
    dataIndex: 'decreaseMoney',
    rowScope: 'row',
  },
  {
    title: 'codeName',
    // colSpan: 2,
    dataIndex: 'codeName',
    onCell: ({ secondSpan }: any) => {
      console.log(secondSpan, 'secondSpan');

      return secondSpan;
    },
  },
  {
    title: 'startTime',
    // colSpan: 2,
    dataIndex: 'startTime',
    onCell: ({ firstSpan }, index) => {
      const { index: curIndex, rowSpan } = firstSpan;
      console.log(firstSpan, '0000', curIndex);
      const count = Math.floor(index % rowSpan);
      if (count === 0) {
        return { rowSpan, colSpan: 2 };
      }
      return { rowSpan: 0 };
    },
  },
  {
    title: 'endTime',
    // colSpan: 2,
    dataIndex: 'endTime',
    onCell: ({ firstSpan }, index) => {
      const { index: curIndex, rowSpan } = firstSpan;
      console.log(firstSpan, '0000', curIndex);
      const count = Math.floor(index % rowSpan);
      if (count === 0) {
        return { rowSpan, colSpan: 0 };
      }
      return { rowSpan: 0, colSpan: 0 };
    },
  },
];

export default () => {
  const handlerData = () => {
    const data = [];
    for (var i = 0; i < arr?.length; i++) {
      const dataList = arr[i]?.data || [];
      const { endTime, startTime } = arr[i];
      const firstSpan = { rowSpan: 0, index: i };

      dataList.forEach(
        ({ currencyList, ...restCurrency }: any, curIndex: number) => {
          // firstSpan.index = curIndex;
          currencyList.forEach((val, index) => {
            firstSpan.rowSpan += 1;
            data.push({
              ...val,
              ...restCurrency,
              endTime,
              startTime,
              firstSpan,
              secondSpan: { rowSpan: index === 0 ? currencyList?.length : 0 },
            });
          });
        }
      );
    }

    return data;
  };

  const tableData = useMemo(() => {
    return handlerData();
  }, []);

  useEffect(() => {
    console.log('走了几次99', handlerData());
  }, []);
  return <Table columns={columns} dataSource={tableData} bordered />;
};
