import React from 'react';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';

import menusConfig from './menusConfig';

import './index.less';

function Options() {
  const [collapsed, setCollapsed] = React.useState(false);
  const navigate = useNavigate();

  const handleSelectMenu = (menu) => {
    const { key } = menu;
    navigate(`/${key}`);
  };

  const handleSiderCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout
      hasSider
      className="optionsPage"
    >
      <Layout.Sider
        collapsible
        trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        collapsed={collapsed}
        onCollapse={handleSiderCollapse}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['CacheClearSettings']}
          items={menusConfig}
          onSelect={handleSelectMenu}
        />
      </Layout.Sider>
      <Layout className="siteContent">
        <Layout.Content className="content">
          <Outlet />
        </Layout.Content>
        <Layout.Footer className="footer">
          Aorta Friday ©2022 Created by Sunweibin
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}

export default Options;
