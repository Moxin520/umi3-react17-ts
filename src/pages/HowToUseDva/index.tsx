import React, { FC } from 'react';
import { IndexModelState, ConnectProps, Loading, connect } from 'umi';
import styles from './index.less';
import { Button } from 'antd';
interface PageProps extends ConnectProps {
  howToUseDva: IndexModelState;
  loading: boolean;
  dispatch: any;
}
let changeStatus = true;

const HowToUseDva: FC<PageProps> = ({ howToUseDva, dispatch }) => {
  const { name } = howToUseDva;
  const changeName = (): void => {
    let payload = '';
    if (changeStatus) {
      payload = '我是修改后的值';
    } else {
      payload = '我是修改前的值';
    }
    changeStatus = !changeStatus;
    dispatch({
      type: 'howToUseDva/query',
      payload,
    });
  };
  return (
    <div className={styles.howToUseDva}>
      <h1>dva一般使用方法</h1>
      <Button onClick={changeName}> 修改dva值 </Button>
      <h1>dva状态值name：{name}</h1>
    </div>
  );
};

export default connect(
  ({
    howToUseDva,
    loading,
  }: {
    howToUseDva: IndexModelState;
    loading: Loading;
  }) => ({
    howToUseDva,
    loading: loading.models.index,
  }),
)(HowToUseDva);
