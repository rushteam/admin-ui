import * as React from 'react';
import { Provider } from "mobx-react";
import {
    ToastComponent,
    AlertComponent,
    toast,
    alert,
    confirm
} from 'amis';
import axios from 'axios';
import { MainStore } from '../stores/index';
import { Route, Switch, Redirect, BrowserRouter as Router, HashRouter } from "react-router-dom";
import Login from './login/login';

import mockData from '../mock/index';

//import './utils/polyfill';
// import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'amis/lib/themes/default.css';
// import './scss/style.scss'

export default function():JSX.Element {
    const store = (window as any).store = MainStore.create({}, {
        fetcher: ({
            url,
            method,
            data,
            config,
            headers
        }: any) => {
            config = config || {};
            config.headers = config.headers || {};
            config.withCredentials = true;

            if (config.cancelExecutor) {
                config.cancelToken = new axios.CancelToken(config.cancelExecutor);
            }

            config.headers = headers || {};
            config.method = method;
            if (method === 'get' && data) {
                config.params = data;
            } else if (data && data instanceof FormData) {
                config.headers['Content-Type'] = 'multipart/form-data';
            } else if (data
                && typeof data !== 'string'
                && !(data instanceof Blob)
                && !(data instanceof ArrayBuffer)
            ) {
                data = JSON.stringify(data);
                config.headers['Content-Type'] = 'application/json';
            }

            data && (config.data = data);
            url = "http://rap2.taobao.org:38080/app/mock/250494" + url
            return axios(url, config);
        },
        isCancel: (e:any) => axios.isCancel(e),
        notify: (type: 'success' | 'error' | 'info', msg: string) => {
            toast[type] ? toast[type](msg, type === 'error' ? '系统错误' : '系统消息') : console.warn('[Notify]', type, msg);
            console.log('[notify]', type, msg);
        },
        alert,
        confirm,
        copy: (contents: string, options: any = {}) => {
        }
    });
    return (
        <Provider store={store}>
            <Router>
                <div className="routes-wrapper" >
                    <ToastComponent key="toast" position={'top-right'} theme={store.theme} />
                    <AlertComponent key="alert" theme={store.theme} />
                    <Switch>
                        <Redirect to={`/login`} from={`/`} exact />
                        <Route path={`/login`} exact component={Login} />
                        {/* <Route path={`/register`} exact component = { Register } />

            {store.user.isAuthenticated ? (
            <Route path= {`/admin`} component = { AdminRoute } />
            ) : (
            <Route path= "*" exact component = { Login } />
            )}

            <Route component={ NotFound } /> */}
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}
