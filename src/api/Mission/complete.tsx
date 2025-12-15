import { api } from '../axios';

interface CompleteApi {
  accessToken: string;
  missionId: number;
  resultText: string;
  resultImageUrl: string;
}

export const completeApi = ({
  accessToken,
  missionId,
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
  console.log('completedList', data, missionId, accessToken);
  return api.post(`/missions/${missionId}/complete`, data, { headers });
};
