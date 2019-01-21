import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, Button, Image, AsyncStorage } from 'react-native';
import t from '../../node_modules/tcomb-form-native/index.js'

const Form = t.form.Form;
const STORAGE_KEY = 'SECRET';

const User = t.struct({
  email: t.String,
  password: t.String
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 3,
      fontWeight: '600'
    }
  }
}

let options = {
  auto: 'placeholders',
  fields: {
    email: {
      error: 'Email Address is required'
    },
    password: {
      error: 'Consider using strong password'
    }
    /*terms: {
      label: 'Agree to Terms',
    },*/
  },
  stylesheet: formStyles,
};

class Signin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'initiated',
    };
  }


  handleLogin = () => {
    console.log("Handling Login Process");
    const value = this._form.getValue();
    console.log('value: ', value);
    fetch('http://192.168.43.12:9002/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: value.email,
        password: value.password,
      }),
    }).then(response => {
      if (response.status === 200) {
        // Alert.alert("Login Succesful." + response.headers.get('Authorization'));
        AsyncStorage.setItem(STORAGE_KEY, response.headers.get('Authorization'));

        console.log(response.headers.get('Authorization'));

    
        console.log("Ready for navigation");
        this.props.navigation.navigate('Home');
      } else {
        this.setState({ status: 'failure' });
        throw new Error('Something went wrong, Please login again!');
      }
    })
      .catch((error) => {
        console.error("Exception is here:" + error);
      });
  }
  save = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, response.headers.get('Authorization'));
    }
    catch (error) {
      // Error saving data

    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/img/Clogo.png')} style={{ width: 250, height: 250 }} />
        <Form
          ref={c => this._form = c}
          type={User}
          options={options}
        />
        <Button style={{ backgroundColor: '#ffff99' }}
          title="Sign In!"
          onPress={this.handleLogin}
        />
        <Text style={{ color: 'white' }}
          onPress={() => this.props.navigation.navigate('Signon')}>
          New User ? SignUp
</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: 'blue',
  },
});
module.exports = Signin;

 
