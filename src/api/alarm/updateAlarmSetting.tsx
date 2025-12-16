import { api } from '../axios';

interface UpdateAlarmSettingParams {
  accessToken: string;
  alarmEnabled: boolean;
}

export const updateAlarmSetting = ({
  accessToken,
  alarmEnabled,
}: UpdateAlarmSettingParams) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const body = {
    alarmEnabled,
  };
  return api.patch('/users/settings/alarm', body, { headers });
};
