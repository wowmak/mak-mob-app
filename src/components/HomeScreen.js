import React from "react";
import { View, Text, AsyncStorage, StyleSheet, Image } from "react-native";

const STORAGE_KEY = 'SECRET';

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ff4d4d',
  },

  childcontainer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ff4d4d',
  }
});

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }

  componentWillMount()
{
  console.log('Component Mount');
  this._retrieveData().then((token) => {
    //this callback is executed when your Promise is resolved
    fetch('http://192.168.43.12:9002/user', {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response.status === 200) {
        console.log("Status success from User API"); 
        console.log(response);        
        this.setState({user:response._bodyText});
      } else {
        
        throw new Error('Something went wrong, Please login again!');
      }
    })
      .catch((error) => {
        console.error("Exception is here:" + error);
      });
    }).catch((error) => {
    //this callback is executed when your Promise is rejected
    console.log('Promise is rejected with error: ' + error);
    }); 
  
}

_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value !== null) {
      // We have data!!
      console.log('Inside retrieve data-');

      console.log('Storage Key-' + value);
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
  
}

getData =  () => AsyncStorage.getItem('STORAGE_KEY').then((value) => this.setState({ 'secretToken': value }));
  


  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.user}</Text>
        <View style={styles.childcontainer}>
        <Image source={require('../../assets/img/Clogo.png')} style={{ width: 150, height: 100 }} />
        <Image source={require('../../assets/img/Clogo.png')} style={{ width: 150, height: 100 }} />
        </View>
      </View>
    );
  }
}
module.exports = HomeScreen;

