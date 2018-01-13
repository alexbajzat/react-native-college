import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import AccountService from '../../service/account.service'

export default class LoginComponent extends Component {
    constructor() {
        super();
        this.state = { email: "", password: "" };
        this.accountService = new AccountService()
    }

    doLogin = () => {
        let inst = this;

        this.accountService.doLogin({
            // username: this.state.email,
            // password: this.state.password
            username: 'mock',
            password: 'mockpass'
        }).then((response) => {
            inst.setState((previous) => {
                return {
                    email: ""
                    , password: ""
                }
            });
        })

    }

    render() {
        return (
            <View>
                <TextInput style={{ width: 150 }} value={this.state.email} placeholder='Email' onChangeText={(text) => this.setState({ email: text })} />
                <TextInput style={{ width: 150 }} value={this.state.password} placeholder='Password' onChangeText={(text) => this.setState({ password: text })} />
                <Button title="Submit"
                    onPress={this.doLogin} />
            </View>
        )
    }
}