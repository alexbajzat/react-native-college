import API_URL from '../config/api.config'

export default class PostService {
    fetchPosts(page, pageSize) {
        console.log("before http");

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