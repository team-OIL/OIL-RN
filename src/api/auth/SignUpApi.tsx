import { api } from '../axios';

export const signUpApi = ({
  email,
  password,
  nickname,
  missionTime,
  isAlarmEnabled,
}: {
  email: string;
  password: string;
  nickname: string;
  missionTime: string;
  isAlarmEnabled: boolean;
}) => {
  const data = {
    email,
    password,
    nickname,
    missionTime,
    isAlarmEnabled,
  };
  console.log('회원가입 완료', data);
  return api.post('/auth/sign-up', data);
};
