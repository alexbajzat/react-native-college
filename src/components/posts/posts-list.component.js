import React, { Component } from 'react';
import { ListView, Text, RefreshControl } from 'react-native';
import InfiniteScroll from 'react-native-infinite-scroll';
import PostService from '../../service/post.service';
import PostComponent from '../posts/post.component';

export default class PostsListComponent extends Component {

    constructor() {
        super();
        console.log("in constructor");

        this.__postService = new PostService();
        this.__page = 1;
        this.__pageSize = 5;
        var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
        var rows = [];

        console.log(rows);
        this.state = {
            data: rows,
            dataSource: dataSource.cloneWithRows(rows),
            refreshing: false,
        };
        this.fetchPosts();
    }

    __onRefresh() {
        console.log("refreshing");
        this.setState({ refreshing: true });
        this.__page = 0;
        this.__postService.fetchPosts(this.__page, this.__pageSize)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    data: response,
                    dataSource: this.state.dataSource.cloneWithRows(response),
                    refreshing: false
                })
                this.__page += 1;
            })
            .catch((e) => {
                console.log(e);
                console.log("ERROR IN FETCHING POSTS");
            });
    }

    fetchPosts = () => {
        console.log("in call");
        this.__postService.fetchPosts(this.__page, this.__pageSize)
            .then((response) => response.json())
            .then((response) => {
                let rows = this.state.data;
                rows.push.apply(rows, response);

                this.setState({
                    data: rows,
                    dataSource: this.state.dataSource.cloneWithRows(rows)
                })
                this.__page += 1;
            })
            .catch((e) => {
                console.log(e);
                console.log("ERROR IN FETCHING POSTS");
            });
    }

    loadMorePages = () => {
        this.fetchPosts();
    }

    render() {
        return (
            <InfiniteScroll
                horizontal={false}
                onLoadMoreAsync={this.loadMorePages}
                distanceFromEnd={10}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.__onRefresh.bind(this)}
                    />}
            >

                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    onChangeVisibleRows={(visible, changed) => false}
                    renderRow={(data) => <PostComponent content={data} />}

                />

            </InfiniteScroll>
        )
    }


}