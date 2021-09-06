import React from 'react';
import styles from './styles.less';
import { Avatar, Menu, Dropdown, message } from 'antd';

const Menulist = () => {
  const onClick = ({ key }: any): void => {
    message.info(`Click on item ${key}`);
  };
  return (
    <Menu onClick={onClick}>
      <Menu.Item key="1">个人信息</Menu.Item>
      <Menu.Item key="2">密码修改</Menu.Item>
      <Menu.Item key="3">退出登陆</Menu.Item>
    </Menu>
  );
};

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
