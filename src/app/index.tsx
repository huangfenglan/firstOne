import React from 'react';
import { Tree, Button } from '@douyinfe/semi-ui';

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      treeData: [
        {
          key: '0',
          label: 'item-0',
          value: '0',
        },
      ],
    };
    this.add = this.add.bind(this);
  }
  add() {
    const itemLength = Math.floor(Math.random() * 5) + 1;
    const treeData = new Array(itemLength).fill(0).map((v, i) => {
      const length = Math.floor(Math.random() * 3);
      const children = new Array(length).fill(0).map((cv, ci) => {
        const child = {
          key: `${i}-${ci}`,
          label: `Leaf-${i}-${ci}`,
          value: `${i}-${ci}`,
        };
        return child;
      });
      const item = {
        key: `${i}`,
        label: `Item-${i}`,
        value: `${i}`,
        children,
      };
      return item;
    });
    this.setState({ treeData });
  }
  render() {
    const { treeData } = this.state;
    const style = {
      width: 260,
      height: 420,
      border: '1px solid var(--semi-color-border)',
    };
    return (
      <div style={style}>
        <Tree treeData={treeData} />
        <br />
        <Button onClick={this.add} style={{ margin: 20 }}>
          动态改变数据
        </Button>
      </div>
    );
  }
}
