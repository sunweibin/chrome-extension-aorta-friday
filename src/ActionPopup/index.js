/*
 * @Author: sunweibin
 * @Date: 2022-06-21 16:41:26
 * @Last Modified by: sunweibin
 * @Last Modified time: 2022-06-23 16:39:05
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
import { SettingOutlined } from '@ant-design/icons';

import CacheClearConifg from '../configs/CacheClearConfig';

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
      cacheDefaultValues: defaultValues,
    };
  }

  @autobind
  hanldeClearCacheChange(checkedValues) {
    console.log('====swb===', checkedValues);
  }

  @autobind
  handleCurrentSitCache() {

  }

  @autobind
  handleAllSitCache() {

  }

  @autobind
  renderCacheClearItem(item) {
    const {
      label, value, tip, defaultChecked,
    } = item;

    return (
      <Col
        span={12}
        key={value}
      >
        <Checkbox
          defaultChecked={defaultChecked}
          value={value}
        >
          {label}
        </Checkbox>
      </Col>
    );
  }

  render() {
    const { cacheDefaultValues } = this.state;

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
          defaultValue={cacheDefaultValues}
          onChange={this.hanldeClearCacheChange}
        >
          <Row gutter={[16, 16]}>
            {CacheClearConifg.map(this.renderCacheClearItem)}
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
