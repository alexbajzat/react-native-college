import React, { Component } from 'react';
import { ListView, Text } from 'react-native'
import InfiniteScroll from 'react-native-infinite-scroll';
import PostService from '../../service/post.service'

export default class PostsListComponent extends Component {

    constructor() {
        super();
        console.log("in constructor");

        this.__postService = new PostService();
        this.__page = 0;
        this.__pageSize = 5;
        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
        var rows = [];
        console.log(rows);
        this.state = {
            data: rows,
            dataSource: dataSource.cloneWithRows(rows)
        };
        this.fetchPosts();
    }

    fetchPosts() {
        console.log("in call");
        this.__postService.fetchPosts(this.__page, this.__pageSize)
            .then((response) => response.json())
            .then((response) => { 
                let rows = this.state.data;
                rows.push.apply(rows, response);
        
                this.setState({
                    data: rows,
                    dataSource: this.state.dataSource.cloneWithRows(rows)
                }) })
            .catch((e) => {
                console.log(e);
                console.log("ERROR IN FETCHING POSTS");
            });
    };

    loadMorePages() {
        let newData = this.__postService.fetchPosts(this.__page, this.__pageSize);

    }

    render() {
        return (
            <InfiniteScroll
                horizontal={false}
                onLoadMoreAsync={this.loadMorePages}
                distanceFromEnd={10}>

                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={(data) => <Text>{data.title}</Text>}
                >
                </ListView>
            </InfiniteScroll>
        )
    }


}