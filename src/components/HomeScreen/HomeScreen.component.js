import React from "react";
import { Alert, View, Text, AsyncStorage, TouchableHighlight, Image } from "react-native";
import { GetUser_URL } from '../../config/api.config.js';
import { styles } from './HomeScreen.component.style';


const STORAGE_KEY = 'SECRET';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    /* No more header config here! */
  };
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }

  componentWillMount() {
    console.log('Component Mount');
    this._retrieveData().then((token) => {
      //this callback is executed when your Promise is resolved
      fetch(GetUser_URL, {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
      }).then(response => {
        if (response.status === 200) {
          console.log("Status success from User API");
          console.log(response);
          this.setState({ user: response._bodyText });
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

  onPress = () => {
    this.props.navigation.navigate('ScheduleService');

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.user}</Text>
        <View style={styles.childcontainer}>
          <View style={styles.serviceContainer}>
            <TouchableHighlight onPress={this.onPress}>

              <Image source={require('../../../assets/img/Clogo.png')} style={{ width: 150, height: 100 }} />
            </TouchableHighlight>
            <Text>General Service</Text>
          </View>


          <View style={styles.serviceContainer}>
            <TouchableHighlight onPress={this.onPress}>

              <Image source={require('../../../assets/img/Clogo.png')} style={{ width: 150, height: 100 }} />
            </TouchableHighlight>
            <Text>Premium Service</Text>
          </View>
        </View>

        <View style={styles.serviceContainer}>
          <TouchableHighlight onPress={this.onPress}>

            <Image source={require('../../../assets/img/Clogo.png')} style={{ width: 150, height: 100 }} />
          </TouchableHighlight>
          <Text>Repair Job</Text>
        </View>

      </View>
    );
  }
}
module.exports = HomeScreen;

