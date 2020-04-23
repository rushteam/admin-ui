import {types} from "mobx-state-tree";

export const User = types
    .model('User', {
        username: '',
        token: '',
    })
    .views((self) => ({
        get isAuthenticated() {
            return !!self.token;
        }
    }))
    .actions((self) => {
        return {
            login(token: string, username: string) {
                self.token = token;
                localStorage.setItem('token', self.token);
                self.username = username;
                localStorage.setItem('username', self.username);
            },
            logout() {
                self.token = '';
                localStorage.setItem('token', self.token);
                self.username = '';
                localStorage.setItem('token', self.username);
            },
            afterCreate() {
                self.token = localStorage.getItem('token') || '';
                self.username = localStorage.getItem('username') || '';
            }
        }
    });