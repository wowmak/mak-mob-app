import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Signon from './src/components/Signon.js'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontWeight:'bold'}}>WowMak : Your trusted mechanic !!</Text>
        <Signon></Signon>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
