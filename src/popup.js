/*
 * @Author: sunweibin
 * @Date: 2022-06-21 16:36:02
 * @Last Modified by: sunweibin
 * @Last Modified time: 2022-06-24 08:33:05
 * @description Chrome Extension 的 popup 入口文件
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';

import './globalStyles/index.less';

import ActionPopup from './Pages/ActionPopup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ActionPopup />
  </React.StrictMode>,
);
