import React from 'react';
import { ClearOutlined, UserSwitchOutlined, InfoCircleOutlined } from '@ant-design/icons';

export default [
  {
    key: 'cacheClear',
    icon: <ClearOutlined />,
    label: '缓存设置',
  },
  {
    key: 'accountSetting',
    icon: <UserSwitchOutlined />,
    label: '账户设置',
  },
  {
    key: 'information',
    icon: <InfoCircleOutlined />,
    label: '项目信息',
  },
];
