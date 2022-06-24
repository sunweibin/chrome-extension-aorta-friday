/*
 * @Author: sunweibin
 * @Date: 2022-06-21 16:41:26
 * @Last Modified by: sunweibin
 * @Last Modified time: 2022-06-24 10:58:39
 * @description Chrome Extension Popup 的主体组件
 */

import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
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
import { SettingOutlined, InfoCircleOutlined } from '@ant-design/icons';

import CacheClearConifg from '@/configs/CacheClearConfig';
import CacheClearOptions from '@/configs/CacheClearOptions';

import './index.less';
const CHECKBOX_GROUP_STYLES = { width: '100%' };

class ActionPopup extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);

    // TODO: 确认初始选中的值
    // 1. 先获取上一次用户选择的值, 如果有则使用用户之前一次的选择
    // 2. 如果没有，则使用默认的

    const defaultValues = _.map(CacheClearConifg, (item) => item.defaultChecked && item.value).filter(Boolean);

    this.state = {
      cacheClearConfig: CacheClearConifg,
      cacheOptionChecked: defaultValues,
    };
  }

  @autobind
  async getCurrentTab() {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
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
    console.log('===swb===ClearComplete');
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
          const url = new URL(currentTab.url);
          this.clearCache({ origins: [url.origin] });
        }
      });
  }

  @autobind
  handleAllSitCache() {

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
    } = this.state;

    return (
      <div className="popup">
        <div className="header">
          <div className="title">Aorta Friday</div>
          <div className="iconsArea">
            <div className="icon">
              <Tooltip
                placement="bottomRight"
                title="设置"
                color="blue"
                arrowPointAtCenter
              >
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
        </div>
        <Divider />
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
          size="large"
        >
          <Button
            block
            type="primary"
            shape="round"
            onClick={this.handleCurrentSitCache}
          >
            清空当前网站Cache
          </Button>
          <Button
            block
            danger
            shape="round"
            onClick={this.handleAllSitCache}
          >
            清空所有网站Cache
          </Button>
        </Space>
      </div>
    );
  }
}

export default ActionPopup;
