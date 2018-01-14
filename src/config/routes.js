import React from 'react';
import { StackNavigator } from 'react-navigation';

import LoginComponent from '../components/login/login.component';
import HomeComponent from '../components/home/home.component';

export const Routes = StackNavigator({
    Login: {
        navigationOptions: {
            header: null,
        },
        screen: LoginComponent,
    },
    Home: {
        screen: HomeComponent,
        navigationOptions: {
            title: 'Nature Escape'
        }
    }
});