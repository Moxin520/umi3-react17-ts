import { Redirect } from 'umi';

export default (props: any) => {
  const token = window.localStorage.getItem('token');
  if (token && token !== '') {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/Login" />;
  }
};
