type AppState = AppModel;
type UserState = UserModel;
type ApplicationState = ApplicationModel;

interface StoreState {
  app: AppState;
  user: UserState;
  application: ApplicationState;
}

interface UserModel {
  /** 用户Id */
  id?: string;
  /** 用户名 */
  name?: string;

  /** 用户 token */
  access_token?: string;
}

interface ApplicationModel {
  app_id: string;
  name: string;
  list: ApplicationInfo[];
}
