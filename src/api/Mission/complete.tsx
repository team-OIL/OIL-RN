import { api } from '../axios';

interface CompleteApi {
  accessToken: string;
  userMissionid: number;
  resultText: string;
  resultImageUrl: string;
}

export const completeApi = ({
  accessToken,
  userMissionid,
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
  return api.post(`/missions/${userMissionid}/complete`, data, { headers });
};
