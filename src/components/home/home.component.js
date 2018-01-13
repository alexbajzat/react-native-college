import React, { Component } from 'react';
import { View } from 'react-native';
import PostsListComponent from '../posts/posts-list.component';

export default class HomeComponent extends Component {
    render() {
        return (
            <View>
                <PostsListComponent/>
            </View>)
    }
}