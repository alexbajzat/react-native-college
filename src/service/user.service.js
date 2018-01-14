import API_URL from '../config/api.config';

export default class UserService {

    fetchUserInfo() {
        return fetch(`${API_URL}/profile`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                Pragma: 'no-cache',
                Expiration: 0,
                'Cache-Control': 'no-cache, no-store'
            }
        }).then((response) => response.json());
    }
}