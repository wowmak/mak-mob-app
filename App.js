import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// import Signon from './src/components/Signon.js'
import AppNavigator from './src/components/Signon.js'
import { createStackNavigator, createAppContainer } from "react-navigation";


// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//       <Image source={require('./assets/img/Clogo.png')} style={{width: 250, height: 250}}  />
//         <Signon></Signon>
//       </View>

//     );
//   }
// }
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ff4d4d',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
