import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert, Modal } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { API_URL } from '../../config/api.config';
import PostService from '../../service/post.service';
import LocationComponent from '../location/location.component';
import Collapsible from 'react-native-collapsible';

export default class PostComponent extends Component {
    constructor(content) {
        super(content)
        this.state = {
            liked: this.props.content.added_to_favourite,
            favedNow: false,
            collapsedMap: true
        }
        this.imageURL = API_URL + '/resources/' + this.props.content.image;
        this.__postService = new PostService();
    }


    addToFavs = () => {
        console.log(" add to fav " + this.props.content.id);
        post = this.props.content;
        console.log(post);
        if (post.added_to_favourite == false) {
            post.added_to_favourite = true;
            this.setState({ favedNow: true, liked: true });

            this.__postService.likePost(post)
                .then((response) => {
                    if (response.status === 200) {
                        console.log("succes");

                    } else {
                        console.log("cannot add");
                    }
                }).catch((e) => {
                    console.log(" ERROR" + e);
                });
        }
    }

    collapseMap = () => {
        if (this.state.collapsedMap == true) {
            this.setState({
                collapsedMap: false
            })
        } else {
            this.setState({
                collapsedMap: true
            })
        }
    }

    __closeModal = () => {

    }

    render() {
        return (
            <Card>
                <View style={style.title_container}>
                    <Text style={style.title}>{this.props.content.title}</Text>
                    <Text>{this.props.content.author} </Text>
                </View>
                <Image style={style.image} source={{ uri: this.imageURL }} />
                <View style={style.description_container}>
                    <Text style={style.description}>{this.props.content.description} </Text>
                </View >
                {!this.state.liked && <Button onPress={this.addToFavs} title='I like this' />}
                {this.state.liked && !this.state.favedNow && <Text style={style.alredy_faved_text}> You faved this already</Text>}
                {this.state.favedNow && <Icon name='like' type='evilicon' color='#4CAF50' />}
                <View style={style.pin_container}>
                    <Icon name='map-pin' type='feather' reverse color='#4CAF50' onPress={this.collapseMap} />
                </View>
                <Collapsible collapsed={this.state.collapsedMap}>
                    <Text style={style.location_title}> Location </Text>
                    <View style={style.map_modal}>
                        <LocationComponent location={this.props.content.coordinates} />
                    </View>
                </Collapsible>
            </Card>
        )
    }

}

const style = StyleSheet.create({
    title_container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20
    },
    image: {
        flex: 1,
        width: 600,
        height: 200
    },
    description_container: {
        paddingTop: 20,
        paddingBottom: 20
    },
    description: {
        color: 'gray',
        fontStyle: 'italic'
    },
    alredy_faved_text: {
        color: 'green',
        fontSize: 10
    },
    map_modal: {
        height: 200,
        width: 400,
    },
    pin_container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    location_title: {
        fontStyle: 'italic',
        fontSize: 12,
        color: 'gray'
    }
});
