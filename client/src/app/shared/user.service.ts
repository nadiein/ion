import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    selectedUser: User = {
        _id: '',
        fullName: '',
        email: '',
        password: ''
    };

    constructor(private http: HttpClient) { }

    noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

    postUser(user: User){
        return this.http.post(environment.apiBaseUrl + '/register', user, this.noAuthHeader);
    }

    auth(credentials) {
        return this.http.post(environment.apiBaseUrl + '/authenticate', credentials, this.noAuthHeader);
    }

    getUserProfile() {
        return this.http.get(environment.apiBaseUrl + '/userProfile')
    }

    updateUserProfile(user: User) {
        return this.http.put(environment.apiBaseUrl + '/updateProfile', user);
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    deleteToken() {
        localStorage.removeItem('token');
    }

    getUserPayload() {
        let token = this.getToken();

        if (token) {
            let userPayload = atob(token.split('.')[1]);
            return JSON.parse(userPayload);
        } else {
            return null;
        }
    }

    isLoggedIn() {
        var userPayload = this.getUserPayload();

        if (userPayload) {
            return userPayload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    getUser(token) {
        return this.http.get(environment.apiBaseUrl + '/userProfile/', { headers: {Authorization: 'Bearer ' + token}});
    }
}
