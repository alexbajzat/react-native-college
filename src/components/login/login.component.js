import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native'

export default class LoginComponent extends Component {
    constructor() {
        super();
        this.state = { email: "Email", password: "Password" };
    }

    doLogin() {

    }


    render() {
        return (
            <View>
                <TextInput style={{ width: 150 }} placeholder='Email' onChangeText={(text) => this.setState({ email })} />
                <TextInput style={{ width: 150 }} placeholder='Password' onChangeText={(text) => this.setState({ password })} />
                <Button title="Submit"
                    onPress={this.doLogin} />
            </View>
        )
    }
}