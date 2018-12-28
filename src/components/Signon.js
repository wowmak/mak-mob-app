import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainers: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'blue'
  },
  labels: {
    color: 'blue'
  },
  txtInputs: {
    marginLeft: 10
  }
});

class Signon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      mobile: ''
    };
    this._onPressSignUpBtn = this._onPressSignUpBtn.bind(this);

  }


  _onPressSignUpBtn() {
    // Alert.alert(this.state.username+' with password:'+this.state.password+' and mob:'
    // +this.state.mobile+ 'tapped the button!')

    fetch('http://192.168.1.12:9002/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        mobile: this.state.mobile
      }),
    }).then(response => {
      if (response.status === 200) {
        Alert.alert("Registration Succesful..");
      } else {
        throw new Error('Something went wrong on api server!');
      }
    }) 
      .catch((error) => {
        console.error("Exception is here:"+error);
      });
  }

  render() {

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>Register here !!</Text>
        </View>
        <View style={styles.subContainers}>
          <Text style={styles.labels}>Username</Text>
          <TextInput style={styles.txtInputs}
            placeholder="Type Username!"
            onChangeText={(username) => this.setState({ username })}

          />
        </View>

        <View style={styles.subContainers}>
          <Text style={styles.labels}>Password</Text>
          <TextInput style={styles.txtInputs}
            placeholder="Type Password!"
            onChangeText={(password) => this.setState({ password })}

          />
        </View>
        <View style={styles.subContainers}>
          <Text style={styles.labels}>Mobile Number:</Text>
          <TextInput style={styles.txtInputs}
            placeholder="Type Mobile Number!"
            onChangeText={(mobile) => this.setState({ mobile })}
          />
        </View>
        <Button onPress={this._onPressSignUpBtn} title="Sign Up" />
      </View>
    );
  }
}

module.exports = Signon;

