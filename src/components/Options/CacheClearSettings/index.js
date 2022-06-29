import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'antd';

export default class CacheClearSettings extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <div>
        <PageHeader title="缓存清空项设置" />
      </div>
    );
  }
}
