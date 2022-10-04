export {};

const Urls = {
  API: {
    BASE: '/',
    AUTH: {
      INDEX: '/api/auth',
      SIGNUP: '/api/auth/signup',
      SIGNIN: '/api/auth/signin',
      LOGOUT: '/api/auth/logout',
      USER: '/api/auth/user',
      UPDATE_USER: '/api/auth/patch',
    },
    TOPICS: {
      INDEX: '/api/topics',
      ADD: '/api/topics/add',
      GET: '/api/topics',
      GET_CURRENT: '/api/topics/:id',
      EDIT: '/api/topics/edit/:id',
      DELETE: '/api/topics/:id',
    },
    COMMENTS: {
      INDEX: '/api/comments',
      ADD: '/api/comments/add',
      EDIT: '/api/comments/edit/:id',
      DELETE: '/api/comments/:id',
    },
  }
};

module.exports = Urls;
