import React from 'react';
import styles from './index.less';

const NotFound = () => {
  return (
    <div className={styles.is404}>
      <h1>本界面为404界面</h1>
      <h1>你要找的路由不存在</h1>
    </div>
  );
};

export default NotFound;
