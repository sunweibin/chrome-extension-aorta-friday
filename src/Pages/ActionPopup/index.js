/* eslint-disable camelcase */
/*
 * @Author: sunweibin
 * @Date: 2022-06-21 16:41:26
 * @Last Modified by: sunweibin
 * @Last Modified time: 2022-06-29 22:01:32
 * @description Chrome Extension Popup 的主体组件
 */

import React, { PureComponent } from 'react';
import { autobind } from 'core-decorators';
import {
  Tooltip,
  Divider,
} from 'antd';
import { SettingOutlined, UserSwitchOutlined } from '@ant-design/icons';

import CacheClear from '@/components/ActionPopup/CacheClear';
import AortaAccount from '@/components/ActionPopup/AortaAccount';

import './index.less';

class ActionPopup extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.accountPageRef = React.createRef();
  }

  @autobind
  toggleVisibleAccountPage() {
    const accountDomCls = this.accountPageRef.current.classList;
    accountDomCls.add('transition');
    accountDomCls.toggle('slideIn');
  }

  @autobind
  handleSwitchAccountClick() {
    this.toggleVisibleAccountPage();
  }

  @autobind
  handleAccountBack() {
    this.toggleVisibleAccountPage();
  }

  @autobind
  handleSettingsClick() {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  }

  @autobind
  handleClearCache() {
    this.toggleVisibleAccountPage();
  }

  render() {
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
                <SettingOutlined onClick={this.handleSettingsClick} />
              </Tooltip>
            </div>
            <div className="icon">
              <Tooltip
                placement="bottomRight"
                title="切换 Aorta 账号"
                color="blue"
                arrowPointAtCenter
              >
                <UserSwitchOutlined onClick={this.handleSwitchAccountClick} />
              </Tooltip>
            </div>
          </div>
        </div>
        <Divider />
        <CacheClear onCacheClear={this.handleClearCache} />
        <div
          className="aortaAccountPage"
          ref={this.accountPageRef}
        >
          <AortaAccount onBack={this.handleAccountBack} />
        </div>
      </div>
    );
  }
}

export default ActionPopup;
