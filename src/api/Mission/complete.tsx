import { api } from '../axios';

interface CompleteApi {
  accessToken: string;
  usermissionid: number;
  resultText: string;
  resultImageUrl: string;
}

export const completeApi = ({
  accessToken,
  usermissionid,
  resultText,
  resultImageUrl,
}: CompleteApi) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const data = {
    resultText,
    resultImageUrl,
  };
  console.log('completedList', data, usermissionid, accessToken);
  return api.post(`/missions/${usermissionid}/complete`, data, { headers });
};
