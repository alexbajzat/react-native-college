import API_URL from '../config/api.config'

export default class PostService {
    fetchPosts(page, pageSize) {
        console.log("before http");

        return fetch(API_URL + `/posts?_page=${page}&_limit=${pageSize}`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-store',
                Pragma: 'no-cache',
                Expires: 0
            }
        });
    }
}