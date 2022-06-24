/*
 * @Author: sunweibin
 * @Date: 2022-06-21 16:36:02
 * @Last Modified by: sunweibin
 * @Last Modified time: 2022-06-24 23:27:45
 * @description Chrome Extension 的 options.html 入口文件
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';

import './globalStyles/index.less';

import Options from './Pages/Options';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
);
