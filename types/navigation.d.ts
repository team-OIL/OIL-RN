export type RootStackParamList = {
  SignIn: { name?: string };
  SignUp: undefined;
  SignInComplete: { name: string; isTaskStarted: boolean };
  BottomTabNavigator: { taskSuccess?: boolean };
  AlarmSettings: undefined;
  NicknamePage: undefined;
  AlarmPage: { taskSuccess?: boolean };
};
