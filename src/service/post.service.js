import API_URL from '../config/api.config';
import { AsyncStorage } from 'react-native';

export default class PostService {
    constructor() {
        this.token = null;
        var instance = this;
        AsyncStorage.getItem('@NatureEscapeStore')
            .then((e) => {
                console.log('from store', e);
                instance.token = e;
            });
        console.log('token', this.token);
    }
    fetchPosts(page, pageSize) {
        return fetch(`${API_URL}/posts?_page=${page}&_limit=${pageSize}`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-store',
                Pragma: 'no-cache',
                Expires: 0
            }
        });
    }

    likePost(post) {
        return fetch(`${API_URL}/posts/${post.id}`, {
            method: 'PUT',
            headers: {
                'Cache-Control': 'no-store',
                'Content-Type': 'application/json',
                Pragma: 'no-cache',
                Expires: 0
            },
            body: JSON.stringify({
                id: post.id,
                title: post.title,
                author: post.author,
                added_to_favourite: post.added_to_favourite,
                description: post.description,
                image: post.image,
                coordinates: post.coordinates
            })
        })
    }
}