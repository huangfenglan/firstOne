'use client';

import { useEffect } from 'react';
import Jielun from './fangdou';
import PaiXu from './paiXu';
import TreeWithReduce from './arrToTree';
import Dumiao from './dumiao';
import Jishiqi from './jishiqi';
import Jianfa from './jianfa';
import Mianshi from './mianshi';
import Promise from './promise';
import PromiseAll from './promiseAll';
import MyPromiseRace from './myPromiseRace';
import MyPromiseAll from './myPromiseAll';
import PromiseSource from './promiseSource.js';
import Bianping from './bianping';
import GetKey from './getKey';
import Zifuchuan from './zifuchuan';
import FlatObj from './flatObj';
import Fraction from './fraction';

export default () => {
  return (
    <div>
      <Jielun />
      <PaiXu />
      <TreeWithReduce />
      <Dumiao />
      <Jishiqi />
      <Jianfa />
      <Mianshi />
      <Promise />
      <PromiseAll />
      <MyPromiseRace />
      <MyPromiseAll />
      <PromiseSource />
      <Bianping />
      <GetKey />
      <Zifuchuan />
      <FlatObj />
      <Fraction />
    </div>
  );
};
