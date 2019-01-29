import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from '../components/HomeScreen/HomeScreen.component';
import Signin from '../components/Signin/Signin.component';
import Signon from '../components/Signon/Signon.component';
import ScheduleService from '../components/ScheduleService/ScheduleService.component';

const AppNavigator = createStackNavigator(
    {
      Signon: Signon,
      Home: HomeScreen,
      Signin: Signin,
      ScheduleService:ScheduleService,
    },
    {
      initialRouteName: "Signon",
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#ff4d4d',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    }
  );
  
  export default createAppContainer(AppNavigator);