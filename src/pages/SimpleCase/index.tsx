import React from 'react';
import styles from './index.less';
import { Button } from 'antd';
function SimpleCase() {
  let arr: string[] = [];
  const arrPush = () => {
    arr.push('333');
    console.log(arr);
  };
  return (
    <div className={styles.simpleCase}>
      <h1>简单案例尝试界面</h1>
      <div>
        <Button onClick={arrPush}>ts数组添加</Button>
      </div>
    </div>
  );
}

export default SimpleCase;
