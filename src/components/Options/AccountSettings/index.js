import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { PageHeader } from 'antd';

export default class AccountSettings extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <div>
        <PageHeader title="账户设置" />
      </div>
    );
  }
}
