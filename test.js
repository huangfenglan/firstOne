import { first } from 'lodash';

const arr = [
  {
    start: '开始1',
    data: [
      {
        money: 11,
        cash: [{ current: 'ceshi11' }, { current: 'ceshi_12' }],
      },
      {
        money: 12,
        cash: [{ current: 'ceshi11_12' }],
      },
    ],
  },
  {
    start: '开始22',
    data: [
      {
        money: 33,
        cash: [{ current: 'ceshi33' }, { current: 'ceshi_44' }],
      },
      {
        money: 44,
        cash: [{ current: 'ceshi11_66' }],
      },
    ],
  },
];

const handler = () => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const { data, start } = arr[i];
    let first = { span: 0 };
    for (var j = 0; j < data?.length; j++) {
      const { cash, money } = data[j];
      for (var k = 0; k < cash?.length; k++) {
        first.span = first.span++;
        result.push({
          ...cash[k],
          start,
          money,
          second: { span: k === 0 ? cash?.length : 0 },
          first: j === 0 && k === 0 ? first : 0,
        });
      }
    }
  }
};

console.log(result);
