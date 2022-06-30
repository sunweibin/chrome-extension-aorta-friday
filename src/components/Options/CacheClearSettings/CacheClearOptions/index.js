import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import {
  Table, Switch, Button, Space,
} from 'antd';
import _ from 'lodash';

import CacheClearConifg from '@/configs/CacheClearConfig';
import StorageKeys from '@/configs/StorageKeys';

import './index.less';

export default class CacheClearOptions extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      dataSource: CacheClearConifg,
      saveBtnLoading: false,
    };
  }

  @autobind
  updateDataSource(record) {
    const { dataSource } = this.state;
    const newConigs = _.map(dataSource, (item) => {
      if (item.value === record.value) {
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
      dataSource: CacheClearConifg,
    });
  }

  @autobind
  handleSaveCacheConfig() {
    const { dataSource } = this.state;
    this.setState({
      saveBtnLoading: true,
    });

    chrome.storage.local.set({ [StorageKeys.CacheClearConfig]: dataSource });

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
    const defaultCheckedConfig = enable ? {} : { defaultChecked: false };
    this.updateDataSource({
      ...record,
      enable,
      ...defaultCheckedConfig,
    });
  }

  @autobind
  handleDefaultCheckedChange(defaultChecked, record) {
    this.updateDataSource({
      ...record,
      defaultChecked,
    });
  }

  @autobind
  renderDefaultCheckedColumn(defaultChecked, record) {
    return (
      <Switch
        key={record?.label}
        disabled={!record.enable}
        defaultChecked={defaultChecked}
        onChange={(checked) => this.handleDefaultCheckedChange(checked, record)}
      />
    );
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
          rowKey="label"
          dataSource={dataSource}
          pagination={false}
          scroll={{ y: 395 }}
        >
          <Table.Column
            title="名称"
            dataIndex="label"
            key="label"
          />
          <Table.Column
            title="是否可用"
            dataIndex="enable"
            key="enable"
            render={this.renderEnableColumn}
          />
          <Table.Column
            key="defaultChecked"
            title="是否默认选中"
            dataIndex="defaultChecked"
            render={this.renderDefaultCheckedColumn}
          />
        </Table>
      </div>
    );
  }
}
