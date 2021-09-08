export default {
  '/user/login': {
    code: 200,
    success: true,
    data: {
      token: 'i am token',
    },
  },
  '/user/logOut': {
    code: 200,
    success: true,
    data: {
      token: '',
    },
  },
};
