import React, { PureComponent } from 'react';
import { autobind } from 'core-decorators';
import {
  Table, Switch, Button, Space,
} from 'antd';
import _ from 'lodash';

import StorageKeys from '@/configs/StorageKeys';

const DEFAULT_CONFIGS = [
  {
    name: '清空所有网站Cache',
    enable: false,
  },
];

export default class AllSiteCacheClearButtonConfig extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      dataSource: DEFAULT_CONFIGS,
      saveBtnLoading: false,
    };
  }

  componentDidMount() {
    // NOTE: 确认初始选中的值
    // 1. 先获取上一次用户选择的值, 如果有则使用用户之前一次的选择
    // 2. 如果没有，则使用默认的
    this.getInitConfig()
      .then(this.initState);
  }

  @autobind
  getInitConfig() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([StorageKeys.AllSiteClearBtn], (data) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(data?.[StorageKeys.AllSiteClearBtn]);
        }
      });
    });
  }

  @autobind
  initState(userConfigs) {
    let configData = DEFAULT_CONFIGS;

    if (!_.isEmpty(userConfigs)) {
      configData = userConfigs;
    }

    this.setState({
      dataSource: configData,
    });
  }

  @autobind
  updateDataSource(record) {
    const { dataSource } = this.state;
    const newConigs = _.map(dataSource, (item) => {
      if (item.name === record.name) {
        return {
          ...item,
          ...record,
        };
      }

      return item;
    });

    this.setState({
      dataSource: newConigs,
    });
  }

  @autobind
  handleResetCacheConfig() {
    this.setState({
      dataSource: DEFAULT_CONFIGS,
    });
  }

  @autobind
  handleSaveCacheConfig() {
    const { dataSource } = this.state;
    this.setState({
      saveBtnLoading: true,
    });

    chrome.storage.local.set({ [StorageKeys.AllSiteClearBtn]: dataSource });

    _.delay(this.cancelSaveBtnLoading, 1000);
  }

  @autobind
  cancelSaveBtnLoading() {
    this.setState({
      saveBtnLoading: false,
    });
  }

  @autobind
  handleEnalbeChange(enable, record) {
    this.updateDataSource({
      ...record,
      enable,
    });
  }

  @autobind
  renderEnableColumn(enable, record) {
    return (
      <Switch
        key={record?.label}
        checked={enable}
        onChange={(checked) => this.handleEnalbeChange(checked, record)}
      />
    );
  }

  render() {
    const { dataSource, saveBtnLoading } = this.state;

    return (
      <div className="cacheOptions">
        <Space style={{ margin: '10px 0' }}>
          <Button onClick={this.handleResetCacheConfig}>恢复默认</Button>
          <Button
            loading={saveBtnLoading}
            type="primary"
            onClick={this.handleSaveCacheConfig}
          >
            保存修改
          </Button>
        </Space>
        <Table
          rowKey="name"
          dataSource={dataSource}
          pagination={false}
        >
          <Table.Column
            title="名称"
            dataIndex="name"
            key="name"
          />
          <Table.Column
            title="是否可用"
            dataIndex="enable"
            key="enable"
            render={this.renderEnableColumn}
          />
        </Table>
      </div>
    );
  }
}
