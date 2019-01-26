import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';
import t from '../../../node_modules/tcomb-form-native/index.js';
import {Signup_URL,Signin_URL} from '../../config/api.config';
import {styles} from './Signon.component.style';



const Form = t.form.Form;
const STORAGE_KEY = 'SECRET';

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(email);
});
const MobileNo = t.refinement(t.Number, mobileNo => {
  const reg = /^\d{10}$/;
  return reg.test(mobileNo);
});


const User = t.struct({
  email: Email,
  password: t.String,
  mobileNo: MobileNo
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
    },
    mobileNo: {
      error: 'Mobile No. is required',
      placeholder: 'Mobile No.'
    },
    /*terms: {
      label: 'Agree to Terms',
    },*/
  },
  stylesheet: formStyles,
};


class Signon extends Component {
  static navigationOptions = {
    title: 'SignUp',
    /* No more header config here! */
  };

  constructor(props) {
    super(props);
    this.state = {
      status: 'initiated',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = () => {
    const value = this._form.getValue();
    if(value)
    {
    console.log('value: ', value);
    console.log('Signup_URL:'+Signup_URL);
    fetch(Signup_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: value.email,
        password: value.password,
        mobile: value.mobileNo
      }),
    }).then(response => {
      if (response.status === 200) {
        console.log('Handling login now..');
        this.handleLogin();
        this.setState({ status: 'success' });
      } else {
        this.setState({ status: 'failure' });
        throw new Error('Something went wrong, Please signup again!');
      }
    })
      .catch((error) => {
        console.log("Exception is here:" + error);
        Alert.alert("Technical Error Occured, Please try again later");
      });
    }
    else{
      Alert.alert("Input values as required");
    }
  }


  handleLogin = () => {
    console.log("Handling Login Process");
    const value = this._form.getValue();
    console.log('value: ', value);
    fetch(Signin_URL, {
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
       // this.save();
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
        <Image source={require('../../../assets/img/Clogo.png')} style={{ width: 250, height: 250 }} />
        <Form
          ref={c => this._form = c}
          type={User}
          options={options}
        />
        <Button style={{ backgroundColor: '#ffff99' }}
          title="Sign Up!"
         onPress={this.handleSubmit}
         //onPress={() => this.props.navigation.navigate('Home')}
        />
        <Text style={{ color: 'blue' }}
          onPress={() => this.props.navigation.navigate('Signin')}>
          Already have an account ? SignIn
</Text>
      </View>
    );
  }
}

module.exports = Signon;


 