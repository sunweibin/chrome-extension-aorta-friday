/*
 * @Author: sunweibin
 * @Date: 2022-06-21 16:41:26
 * @Last Modified by: sunweibin
 * @Last Modified time: 2022-06-25 00:14:22
 * @description Chrome Extension Popup 的 CacheClear 组件
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import {
  Tooltip,
  Divider,
  Row,
  Col,
  Checkbox,
  Button,
  Space,
} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import CacheClearConifg from '@/configs/CacheClearConfig';
import CacheClearOptions from '@/configs/CacheClearOptions';
import Header from '../Header';

import './index.less';

const CHECKBOX_GROUP_STYLES = { width: '100%' };

class CacheClear extends PureComponent {
  static propTypes = {
    onCacheClear: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const defaultValues = _.map(CacheClearConifg, (item) => item.defaultChecked && item.value).filter(Boolean);

    this.state = {
      // Clear Cache 选项配置，用于页面初始化渲染
      cacheClearConfig: CacheClearConifg,
      // 用户选择的 Clear Cache 选项
      cacheOptionChecked: defaultValues,
      // 清空当前网站Cache 按钮 Loading
      currentClearLoading: false,
      // 清空所有网站Cache 按钮 Loading
      allClearLoading: false,
    };

    this.clearStamp = 0;
  }

  componentDidMount() {
    // NOTE: 确认初始选中的值
    // 1. 先获取上一次用户选择的值, 如果有则使用用户之前一次的选择
    // 2. 如果没有，则使用默认的
    this.getInitCacehClearConfigData()
      .then(this.initState);
  }

  @autobind
  initState(userCacheClearCofig) {
    let configData = CacheClearConifg;

    if (!_.isEmpty(userCacheClearCofig)) {
      configData = userCacheClearCofig;
    }

    const defaultValues = _.map(configData, (item) => item.defaultChecked && item.value).filter(Boolean);

    this.setState({
      // Clear Cache 选项配置，用于页面初始化渲染
      cacheClearConfig: userCacheClearCofig || CacheClearConifg,
      // 用户选择的 Clear Cache 选项
      cacheOptionChecked: defaultValues,
    });
  }

  @autobind
  async getCurrentTab() {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  @autobind
  getInitCacehClearConfigData() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['cacheClearConfig'], (data) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(data?.cacheClearConfig);
        }
      });
    });
  }

  @autobind
  getClearOptions() {
    const { cacheOptionChecked } = this.state;

    return _.reduce(cacheOptionChecked, (result, item) => ({
      ...result,
      [item]: true,
    }), {});
  }

  @autobind
  clearCache(params = {}) {
    const userCacheOptions = this.getClearOptions();

    chrome.browsingData.remove(params, {
      ...CacheClearOptions,
      ...userCacheOptions,
    }, this.handleClearComplete);
  }

  @autobind
  handleClearComplete() {
    const now = Date.now();
    if ((now - this.clearStamp) > 1000) {
      this.cacelClearBtnLoading();
    } else {
      window.setTimeout(this.cacelClearBtnLoading, 1000);
    }
    this.clearStamp = 0;
  }

  @autobind
  cacelClearBtnLoading() {
    this.saveUserOptions();
    this.setState({
      currentClearLoading: false,
      allClearLoading: false,
    }, this.props.onCacheClear);
  }

  @autobind
  saveUserOptions() {
    const { cacheClearConfig, cacheOptionChecked } = this.state;
    const userOptionsConifg = _.map(cacheClearConfig, (item) => ({
      ...item,
      defaultChecked: _.includes(cacheOptionChecked, item.value),
    }));
    chrome.storage.local.set({ cacheClearConfig: userOptionsConifg });
  }

  @autobind
  hanldeClearCacheChange(cacheOptionChecked) {
    this.setState({
      cacheOptionChecked,
    });
  }

  @autobind
  handleCurrentSitCache() {
    this.getCurrentTab()
      .then((currentTab) => {
        if (currentTab?.url) {
          this.setState({
            currentClearLoading: true,
          });
          const url = new URL(currentTab.url);
          this.clearCache({ origins: [url.origin] });
        }
      });
  }

  @autobind
  handleAllSitCache() {
    this.setState({
      allClearLoading: true,
    });
    this.clearStamp = Date.now();
    this.clearCache();
  }

  @autobind
  renderCacheClearItem(item) {
    const {
      label,
      value,
      tip,
      enable,
      defaultChecked,
    } = item;

    return (
      <Col
        span={12}
        key={value}
      >
        <Checkbox
          disabled={!enable}
          defaultChecked={defaultChecked}
          value={value}
        >
          {label}
          <Tooltip
            placement="bottomRight"
            title={tip}
            color="blue"
            arrowPointAtCenter
          >
            <InfoCircleOutlined className="checkboxTips" />
          </Tooltip>
        </Checkbox>
      </Col>
    );
  }

  render() {
    const {
      cacheOptionChecked,
      cacheClearConfig,
      currentClearLoading,
      allClearLoading,
    } = this.state;

    return (
      <div className="cacheClear">
        <Header title="Cache Clear" />
        <Checkbox.Group
          style={CHECKBOX_GROUP_STYLES}
          value={cacheOptionChecked}
          onChange={this.hanldeClearCacheChange}
        >
          <Row gutter={[16, 16]}>
            {cacheClearConfig.map(this.renderCacheClearItem)}
          </Row>
        </Checkbox.Group>
        <Divider />
        <Space
          className="buttonArea"
          direction="vertical"
          size="middle"
        >
          <Button
            block
            type="primary"
            shape="round"
            loading={currentClearLoading}
            onClick={this.handleCurrentSitCache}
          >
            清空当前网站Cache
          </Button>
          <Button
            block
            danger
            shape="round"
            loading={allClearLoading}
            onClick={this.handleAllSitCache}
          >
            清空所有网站Cache
          </Button>
        </Space>
      </div>
    );
  }
}

export default CacheClear;
