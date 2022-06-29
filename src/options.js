/*
 * @Author: sunweibin
 * @Date: 2022-06-21 16:36:02
 * @Last Modified by: sunweibin
 * @Last Modified time: 2022-06-29 22:23:28
 * @description Chrome Extension 的 options.html 入口文件
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Navigate, HashRouter, Route, Routes,
} from 'react-router-dom';
import CacheClearSettings from '@/components/Options/CacheClearSettings';
import AccountSettings from '@/components/Options/AccountSettings';
import Informations from '@/components/Options/Informations';

import 'normalize.css';
import './globalStyles/index.less';

import Options from './Pages/Options';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter basename="/">
      <Routes>
        <Route
          path="/"
          element={<Options />}
        >
          <Route
            path="cacheClear"
            element={<CacheClearSettings />}
          />
          <Route
            path="accountSetting"
            element={<AccountSettings />}
          />
          <Route
            path="information"
            element={<Informations />}
          />
        </Route>
        <Route
          index
          element={(
            <Navigate
              to="/cacheClear"
              replace
            />
          )}
        />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
