import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Routes } from './src/config/routes';

export default class App extends React.Component {
  render() {
    return <Routes/>;
  }
}

