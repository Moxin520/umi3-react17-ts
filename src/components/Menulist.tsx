import React from 'react';
import { history } from 'umi';
import { Menu, message } from 'antd';
import {
  AliwangwangOutlined,
  KeyOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';

const Menulist = (onClick: any) => {
  return (
    <Menu onClick={onClick}>
      <Menu.Item key="1">
        <AliwangwangOutlined /> 个人信息
      </Menu.Item>
      <Menu.Item key="2">
        <KeyOutlined /> 密码修改
      </Menu.Item>
      <Menu.Item key="3">
        <PoweroffOutlined /> 退出登陆
      </Menu.Item>
    </Menu>
  );
};

export default Menulist;
// export default connect(({ userModels }: { userModels: UserModelState }) => ({
//   userModels,
// }))(Menulist);
