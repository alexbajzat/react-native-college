import API_URL from '../config/api.config'

export default class AccountService {
    construct() { }

    doLogin(account) {

        return fetch(API_URL + '/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: account.username,
                password: account.password
            })
        });
    }
}