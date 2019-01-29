import React from "react";
import DatePicker from 'react-native-datepicker'
import { Alert, View, DatePickerAndroid, Text, AsyncStorage, TouchableHighlight, Button } from "react-native";
import { styles } from './ScheduleService.component.style';
import t from '../../../node_modules/tcomb-form-native/index.js';

const Form = t.form.Form;

const MobileNo = t.refinement(t.Number, mobileNo => {
    const reg = /^\d{10}$/;
    return reg.test(mobileNo);
});

const serviceDetails = t.struct({
    registrationNo: t.String,
    pickupAddress: t.String,
    mobileNo: MobileNo,
    requiredService: t.String
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
        registrationNo: {
            error: 'registrationNo is required'
        },
        pickupAddress: {
            error: 'pickupAddress is must'
        },
        mobileNo: {
            error: 'Mobile No. is required',
            placeholder: 'Mobile No.'
        },
        requiredService: {
            error: 'Please elaborate a bit about required service'
        }
    },
    stylesheet: formStyles,
};


class ScheduleService extends React.Component {

    constructor(props){
        super(props)
        this.state = {date:new Date()}
      }

    static navigationOptions = {
        title: 'Schedule Service',
        /* No more header config here! */
    };

    bookService = () => {
        const value = this._form.getValue();
        if (value) {
            Alert.alert("Service booked; Mak agent will contact yu shortly")
        }

        else {
            Alert.alert("Incorrect Inputs")
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Form
                    ref={c => this._form = c}
                    type={serviceDetails}
                    options={options}
                />
                <View style={styles.childcontainer}>
                <Text style={styles.heading}>Choose Service Slot</Text>
                <DatePicker
                    date={this.state.date}
                    mode="date"
                    onDateChange={date => this.setState({ date })}
                />
                </View>
                <Button style={{ backgroundColor: '#ffff99' }}
                    title="Book Service!"
                    onPress={this.bookService}
                />
            </View>
        );
    }
}

module.exports = ScheduleService;
