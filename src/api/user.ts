import * as request from '@utils/request';

interface LoginBody {
  name: string;
  password: string;
}

interface User {
  name: string;
  access_token: string;
  id: string;
}

export function login(data: LoginBody) {
  return request.post<Response<User>>('/user/login', data);
}

export function getUser() {
  return request.get<Response<User>>('/user');
}

export interface ApplicationInfo {
  app_id: string;
  createdAt: string;
  env: string;
  id: number;
  type: number;
  name: string;
  user_id: number;
}

export function getApplicationList() {
  return request.get<Response<ApplicationInfo[]>>('/user/application/list');
}

interface CreateApplicationBody {
  name: string;
  type: number;
  env: string;
}

export function createApplication(data: CreateApplicationBody) {
  return request.post('/user/application', data);
}
