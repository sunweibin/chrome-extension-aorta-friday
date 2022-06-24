import React from 'react';
import PropTypes from 'prop-types';
import {
  Descriptions,
  Radio,
  Button,
  Select,
  Input,
} from 'antd';
import { CaretDownOutlined, PhoneOutlined } from '@ant-design/icons';

import Header from '../Header';

import './index.less';

function AortaAccount(props) {
  return (
    <div className="aortaAccount">
      <Header
        title="Aorta 账号"
        backable
        onBack={props.onBack}
      />
      <Descriptions
        layout="horizontal"
        size="middle"
        bordered
      >
        <Descriptions.Item label="环境">
          <Radio.Group>
            <Radio value="61">61</Radio>
            <Radio value="63">63</Radio>
          </Radio.Group>
        </Descriptions.Item>
        <Descriptions.Item label="平台">
          <Radio.Group>
            <Radio value="PC">PC</Radio>
            <Radio value="APP">APP</Radio>
          </Radio.Group>
        </Descriptions.Item>
        <Descriptions.Item label="工号">
          <Select
            style={{ width: '100%' }}
            placeholder="--请选择一个工号--"
            showSearch
            allowClear
            suffixIcon={<CaretDownOutlined />}
          />
        </Descriptions.Item>
        <Descriptions.Item label="号码">
          <Input addonBefore={<PhoneOutlined />} />
        </Descriptions.Item>
      </Descriptions>
      <div className="whiteSpace" />
      <Button
        block
        shape="round"
        type="primary"
      >
        登录
      </Button>
    </div>
  );
}

AortaAccount.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default AortaAccount;
