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
import { Route, Switch, Redirect, BrowserRouter as Router } from "react-router-dom";
import Login from './login/login';
import Index from './index/index';

// import './utils/polyfill';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bulma/css/bulma.css'
import 'amis/lib/themes/default.css';
import '../styles/app.styl'

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
            config.headers = headers || config.headers || {};
            config.withCredentials = true;
            if (config.cancelExecutor) {
                config.cancelToken = new axios.CancelToken(config.cancelExecutor);
            }
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
            store.user.token && (config.headers['Authorization'] = "Bearer " + store.user.token);

            data && (config.data = data);
            if (!/^https?\:\/\//.test(url)) {
                // url = "http://rap2.taobao.org:38080/app/mock/250494" + url
                url = "http://127.0.0.1:8000/v1" + url
            }
            return axios(url, config).then(resp =>{
                let payload = {
                    status: resp.data.status,
                    msg: resp.data.msg,
                    data: resp.data.data
                };
                return {
                    ...resp,
                    data: payload
                }
            });
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
                        <Route path={`/index`} component={Index} />
                        {/* <Route path={`/register`} exact component = { Register } /> */}
                        {store.user.isAuthenticated ? (
                        <Route path= {`/`} component = { Index } />
                        ) : (
                        <Route path= "*" exact component = { Login } />
                        )}

            {/* <Route component={ NotFound } /> */}
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}
