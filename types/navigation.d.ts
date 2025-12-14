export type RootStackParamList = {
  SignIn: { name?: string };
  SignUp: undefined;
  SignInComplete: { name: string; isTaskStarted: boolean };
  BottomTabNavigator: { taskSuccess?: boolean };
  AlarmSettings: { email: string; password: string };
  NicknamePage: {
    email: string;
    password: string;
    isAgreedToReceive: boolean;
    TastTime: string;
  };
  AlarmPage: { taskSuccess?: boolean };
};
