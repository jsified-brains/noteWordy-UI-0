import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen, SignInScreen } from '../screens';

const AppStackNavigator = createStackNavigator(
    {
      Home: { screen: HomeScreen },
      SignIn: { screen: SignInScreen }
    },
    {
      initialRouteName: 'SignIn',
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
    }
);

export const AppNavigationContainer = createAppContainer(AppStackNavigator);
