export type RootStackParamList = {
  SignIn: { name?: string };
  SignUp: undefined;
  SignInComplete: { nickname: string; isTaskStarted: boolean };
  BottomTabNavigator: { taskSuccess?: boolean; taskData?: any };
  AlarmSettings: { email: string; password: string };
  NicknamePage: {
    email: string;
    password: string;
    isAgreedToReceive: boolean;
    TastTime: string;
  };
  AlarmPage: { taskSuccess?: boolean };
  ChangeAlarmPage: undefined;
};
