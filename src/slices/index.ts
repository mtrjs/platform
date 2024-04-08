import user from './user';
import application from './application';
import setting from './setting';

const reducers = {
  user: user.reducer,
  application: application.reducer,
  setting: setting.reducer,
};

export { reducers };
export default { user, application };
