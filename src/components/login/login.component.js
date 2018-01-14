import React, { Component } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, ActivityIndicator, AsyncStorage } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AccountService from '../../service/account.service';

export default class LoginComponent extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            loading: false,
            succes: false,
            loginAttempt: false,
            keepLogged: false
        };
        this.accountService = new AccountService()
    }

    onRemember = () => {
        this.setState({
            keepLogged: !this.state.keepLogged
        })
    }

    doLogin = () => {
        let inst = this;
        this.setState({
            loading: true
        })

        this.accountService.doLogin({
            // username: this.state.email,
            // password: this.state.password
            username: 'mock',
            password: 'mockpass'
        }).then((response) => {
            let succes = false;
            if (response.status === 200) {
                succes = true
            }
            if (this.state.keepLogged) {
                console.log('response', response);
                let token = response.body;
                console.log('saving token; ', token);
                if (token) {
                    AsyncStorage.setItem("@NatureEscapeStore:token", token)
                        .then(() => {

                        });
                }
            }
            setTimeout(() => {
                inst.setState({
                    loading: false,
                    succes: succes,
                    loginAttempt: true
                })
            }, 1000)

            if (succes) {
                setTimeout(() => {
                    inst.props.navigation.navigate('Home');

                    //set back to init state
                    inst.setState({
                        loginAttempt: false,
                        succes: false
                    })
                }, 2000)
            }

        })

    }

    render() {
        return (
            <View style={styles.main_container}>
                <Text style={styles.title}> Login </Text>
                <View style={styles.form_container}>
                    <TextInput style={styles.input} value={this.state.email} placeholder='Email' autoCapitalize='none'
                        onChangeText={(text) => this.setState({ email: text })} />
                </View>
                <View style={styles.form_container}>
                    <TextInput style={styles.input} secureTextEntry value={this.state.password} placeholder='Password' autoCapitalize='none'
                        onChangeText={(text) => this.setState({ password: text })} />
                </View>
                <CheckBox
                    title='remember me'
                    checked={this.state.keepLogged}
                    onPress={this.onRemember}
                />

                <View style={styles.logo_container}>
                    <Image source={require('../../assets/tree-logo.png')} style={styles.logo} />
                </View>

                {!this.state.loading && !this.state.succes && <Button title="Log me in" color="#4CAF50"
                    onPress={this.doLogin} />}
                {this.state.succes && <Text style={styles.succes_message} > Perfect, let`s go! </Text>}
                {!this.state.succes && this.state.loginAttempt && !this.state.loading && <Text style={styles.error_message} > Ups, wrong email or password? </Text>}
                {this.state.loading && <ActivityIndicator size="large" color="#4CAF50" animating={this.state.loading} />}
            </View >
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        flex: 1,
    },
    logo_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: 20,
        paddingBottom: 30
    },
    input: {
        flex: 1,
        alignSelf: 'center'
    },
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 60
    },
    form_container: {
        flexDirection: 'row',
        margin: 5
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        fontStyle: 'italic',
        color: 'green'
    },
    succes_message: {
        color: 'green',
        fontStyle: 'italic',
        alignContent: 'center',
        alignSelf: 'center'
    },
    error_message: {
        color: 'red',
        fontStyle: 'italic',
        alignContent: 'center',
        alignSelf: 'center'
    }
});