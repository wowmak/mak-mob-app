import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// import Signon from './src/components/Signon.js'
import AppNavigator from './src/components/Appnavigator.js'
import {  createAppContainer } from "react-navigation";

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
