import React from 'react';
import styles from './styles.less';
import { Avatar, Dropdown } from 'antd';
import Menulist from './Menulist';

const RightRender = () => {
  let name = '陌心';
  return (
    <div>
      <Dropdown overlay={Menulist}>
        <div className={styles.displayFlexSb}>
          <div className={styles.topName}>{name}</div>
          <Avatar
            size={40}
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default RightRender;
