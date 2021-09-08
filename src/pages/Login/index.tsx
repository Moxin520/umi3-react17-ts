import React, { FC } from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { history, UserModelState, ConnectProps, Loading, connect } from 'umi';

interface PageProps extends ConnectProps {
  userModels: UserModelState;
  loading: boolean;
  dispatch: any;
}
export const Login: FC<PageProps> = ({ userModels, dispatch }) => {
  const { token } = userModels;
  const login = () => {
    dispatch({
      type: 'userModels/getLogin',
      payload: null,
    }).then((res: any) => {
      if (res.success) {
        history.push('/');
      }
    });
  };
  return (
    <div className={styles.title}>
      <h1>登陆界面</h1>
      <div>{token} </div>
      <Button onClick={login}>登 录</Button>
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
)(Login);
