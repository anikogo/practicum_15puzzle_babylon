const Urls = {
  API: {
    BASE: '/',
    AUTH: {
      INDEX: '/api/auth',
      SIGNUP: '/api/auth/signup',
      SIGNIN: '/api/auth/signin',
    },
    TOPICS: {
      INDEX: '/api/topics',
      ADD: '/api/topics/add',
      GET: '/api/topics/:id',
      EDIT: '/api/topics/edit',
      DELETE: '/api/topics/:id',
    },
    COMMENTS: {
      INDEX: '/api/comments',
      ADD: '/api/comments/add',
      GET: '/api/commentS/:id',
      EDIT: '/api/comments/edit',
      DELETE: '/api/comments/:id',
    },
    USERS: {
      INDEX: '/api/users',
      GET: '/api/users/:id',
      UPDATE: '/api/users/patch',
      LOGOUT: '/api/users/logout',
    },
    LIKE: {
      INDEX: '/api/likes',
      GET: '/api/likes/:id',
      ADD: '/api/likes/add',
      DELETE: '/api/likes/:id',
    },
    THEMES: {
      INDEX: '/api/themes',
    },
  },
};

export default Urls;
