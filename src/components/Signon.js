import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, Button, Image } from 'react-native';
import t from '../../node_modules/tcomb-form-native/index.js'
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './HomeScreen.js'

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String,
  mobileNo: t.Number
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
/*const styles = StyleSheet.create({
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
});*/

class Signon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'initiated',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
    fetch('http://192.168.1.12:9002/register', {
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
        this.handleLogin();
        this.setState({ status: 'success' });
      } else {
        this.setState({ status: 'failure' });
        throw new Error('Something went wrong, Please login again!');
      }
    })
      .catch((error) => {
        console.error("Exception is here:" + error);
      });
  }


  handleLogin = () => {
    console.log("Handling Login Process");
    const value = this._form.getValue();
    console.log('value: ', value);
    fetch('http://192.168.1.12:9002/login', {
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
        Alert.alert("Login Succesful." + response.headers.get('Authorization'));
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


  render() {
    return (
      <View style={styles.container}>
      <Image source={require('../../assets/img/Clogo.png')} style={{width: 250, height: 250}}  />
        <Form
          ref={c => this._form = c}
          type={User}
          options={options}
        />
        <Button style={{ backgroundColor: '#ffff99' }}
          title="Sign Up!"
          onPress={this.handleSubmit}
        // onPress={() => this.props.navigation.navigate('Home')}
        />
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
    backgroundColor: '#ff4d4d',
  },
});
//module.exports = Signon;
const AppNavigator = createStackNavigator(
  {
    Signon: Signon,
    Home: HomeScreen
  },
  {
    initialRouteName: "Signon"
  }
);

export default createAppContainer(AppNavigator);

  /*constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      mobile: ''
    };
    this._onPressSignUpBtn = this._onPressSignUpBtn.bind(this);

  }*/


 /* _onPressSignUpBtn() {
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
  }*/

 /* render() {

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
  }*/

