import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, Button } from 'react-native';
import t from '../../node_modules/tcomb-form-native/index.js'

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

const options = {
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
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Form 
          ref={c => this._form = c}
          type={User} 
          options={options}
        />
        <Button style={{backgroundColor: '#ffff99'}}
          title="Sign Up!"
          onPress={this.handleSubmit}
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
module.exports = Signon;
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

