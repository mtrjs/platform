import * as request from '@utils/request';

const apiPrefix = '/api/content/octopus';

export interface GetAlarmRuleParams extends Pager {
  name?: string;
}

export interface IAlarmRule {
  id: string;
  name: string;
  cycle: number;
  checkTimeStartAt: string;
  checkTimeEndAt: string;
  createdAt: string;
  updatedAt: string;
  rule: AlarmRule[];
  notification: AlarmNotification[];
  enabled: boolean;
}

export function getAlarmRuleList(params: GetAlarmRuleParams) {
  return request.post<ResponseList<IAlarmRule>>(`${apiPrefix}/alarm/rule/list`, params);
}

export interface AlarmRule {
  threshold: number;
  type: string;
  times: number;
}

export interface CreateAlarmRuleParams {
  name: string;
  cycle?: number;
  checkTimeStartAt?: string;
  checkTimeEndAt?: string;
  rule: AlarmRule[];
  notification: AlarmNotification[];
  enabled: boolean;
  createdAt?: string;
  id?: string;
}

export const updateAlarmRule = (params: CreateAlarmRuleParams) => {
  return request.post(`${apiPrefix}/alarm/rule`, params);
};

export function deleteRule(params: { id: string }) {
  return request.del(`${apiPrefix}/alarm/rule/${params.id}`);
}

export enum AlarmNoticeType {
  wecom = 'wecomBot',
  mail = 'mail',
}

export interface AlarmNotification {
  type: AlarmNoticeType;
  value: string;
}
