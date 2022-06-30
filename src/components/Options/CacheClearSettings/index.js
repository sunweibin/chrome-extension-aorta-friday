import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Tabs } from 'antd';
import CacheClearOptions from './CacheClearOptions';
import AllSiteCacheClearButtonConfig from './AllSiteCacheClearButtonConfig';

export default class CacheClearSettings extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <div>
        <PageHeader
          title="缓存清空项设置"
          footer={(
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane
                tab="缓存项设置"
                key="1"
              >
                <CacheClearOptions />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="清空按钮设置"
                key="2"
              >
                <AllSiteCacheClearButtonConfig />
              </Tabs.TabPane>
            </Tabs>
          )}
        />
      </div>
    );
  }
}
