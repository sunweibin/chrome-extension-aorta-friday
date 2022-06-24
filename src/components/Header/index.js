import React from 'react';
import PropTypes from 'prop-types';
import { ArrowLeftOutlined } from '@ant-design/icons';

import './index.less';

function Header(props) {
  const { title, backable } = props;

  return (
    <div className="block-header">
      {backable && (
        <div
          className="block-header-backIcon"
          onClick={props.onBack}
        >
          <ArrowLeftOutlined />
        </div>
      )}
      <div className="block-header-title">{title}</div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  backable: PropTypes.bool,
  onBack: PropTypes.func,
};

Header.defaultProps = {
  backable: false,
  onBack: () => {},
};

export default Header;
