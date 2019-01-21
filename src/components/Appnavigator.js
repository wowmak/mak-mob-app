import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './HomeScreen.js';
import Signin from './Signin.js';
import Signon from './Signon.js';

const AppNavigator = createStackNavigator(
    {
      Signon: Signon,
      Home: HomeScreen,
      Signin: Signin
    },
    {
      initialRouteName: "Signon"
    }
  );
  
  export default createAppContainer(AppNavigator);