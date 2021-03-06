import React from 'react';
import styles from './styles.less';
import { Avatar, Dropdown, message } from 'antd';
import Menulist from './Menulist';
import { history, UserModelState, Loading, connect } from 'umi';

const RightRender = (props: any) => {
  let name = '陌心';
  const onClick = ({ key }: any): void => {
    message.destroy();
    if (key === '1') {
      history.push('/PersonalInformation');
    } else if (key === '3') {
      props
        .dispatch({
          type: 'userModels/getLogOut',
          payload: null,
        })
        .then((res: any) => {
          if (res.success) {
            history.push('/Login');
          }
        });
    } else {
      message.info(`Click on item ${key}`);
    }
  };

  return (
    <div>
      <Dropdown overlay={Menulist(onClick)}>
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

export default connect(
  ({
    userModels,
    loading,
  }: {
    userModels: UserModelState;
    loading: Loading;
  }) => ({
    userModels,
    loading: loading.models.index,
  }),
)(RightRender);
