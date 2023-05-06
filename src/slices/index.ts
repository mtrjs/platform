import user from './user';
import application from './application';

const reducers = {
  user: user.reducer,
  application: application.reducer,
};

export { reducers };
export default { user, application };
