import React, { Component } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Card , Icon} from 'react-native-elements';
import UserService from '../../service/user.service';
import { API_URL } from '../../config/api.config';

export default class UserComponent extends Component {
    constructor() {
        super();
        this.__userService = new UserService();
        this.state = {
            profile: {}
        };
        this.fetchUserProfile();
    }

    fetchUserProfile() {
        this.__userService.fetchUserInfo()
            .then((response) => {
                this.setState({
                    profile: response,
                    imageURL: `${API_URL}/resources/${response.image}`
                })
            }).catch((e) => {
                console.log(" ERROR IN FETCHING USER");
            })
    }

    render() {
        return (
            <Card>
                <View style={styles.user_logo_container}>
                    <Image style={styles.user_logo} source={{ uri: this.state.imageURL }} />
                </View>
                <View style={styles.centered_container}>
                    <Text style={styles.name}>
                        {this.state.profile.name}
                    </Text>
                </View>
                <View style={styles.user_details_container}>
                    <View style={styles.centered_container}>

                        <Text style={styles.email}>
                            {this.state.profile.email}
                        </Text>
                    </View>
                    <View style={styles.centered_container}>
                        <Icon type='font-awesome' name= 'trophy' color='#FF8F00'/>
                        <Text>
                            {this.state.profile.level}
                        </Text>
                    </View>
                </View>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    user_logo_container: {
        alignItems: 'center'
    },
    user_logo: {
        borderRadius: 50,
        height: 100,
        width: 100
    },
    user_details_container: {
        flexDirection: 'row'
    },
    centered_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    email: {
        fontStyle: 'italic',
        color: 'gray'
    },
    name: {
        fontSize: 15,
        color: 'green'
    }
})