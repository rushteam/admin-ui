import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IMainStore } from '../../stores/index';
import { RouteComponentProps, Route, Link, Switch, Redirect, matchPath } from 'react-router-dom';
import { mapTree } from 'amis/lib/utils/helper';

import {
    Layout,
    Button,
    AsideNav
} from 'amis';

interface IndexProps extends RouteComponentProps<any> {
    store: IMainStore
};
type NavItem = {
    label: string;
    children?: Array<NavItem>;
    icon?: string;
    path?: string;
    component?: React.ReactType;
    getComponent?: () => Promise<React.ReactType>;
};
const navigations: Array<NavItem> = [
    {
        label: '导航',
        children: [
            {
                path: 'dashboard',
                label: 'Dashboard',
                icon: 'glyphicon glyphicon-signal',
                // component: Dashboard
            },
            {
                label: '表单页面',
                icon: 'glyphicon glyphicon-edit'
            },
        ]
    },
];
function navigations2route(pathPrefix = '') {
    let routes: Array<JSX.Element> = [];
    navigations.forEach(root => {
        root.children && mapTree(root.children, (item: any) => {
            if (item.path && item.component) {
                routes.push(
                    <Route
                        key={routes.length + 1}
                        path={item.path[0] === '/' ? (item.path) : `${pathPrefix}/${item.path}`}
                        component={item.component}
                        exact
                    />
                )
            } else if (item.path && item.getComponent) {
                routes.push(
                    <Route
                        key={routes.length + 1}
                        path={item.path[0] === '/' ? (item.path) : `${pathPrefix}/${item.path}`}
                        getComponent={item.getComponent}
                        exact
                    />
                )
            }
        });
    });
    return routes;
}

function isActive(link: any, location: any) {
    const ret = matchPath(location.pathname, {
        path: link ? link.replace(/\?.*$/, '') : '',
        exact: true,
        strict: true
    });
    return !!ret;
}

@inject("store")
@observer
export default class Index extends React.Component<IndexProps> {
    renderHeader() {
        const store = this.props.store;
        return (
            <div>
                <div className={`a-Layout-brandBar`}>
                    <button
                        onClick={store.toggleOffScreen}
                        className="pull-right visible-xs"
                    >
                        <i className="glyphicon glyphicon-align-justify"></i>
                    </button>
                    <div className={`a-Layout-brand`}>
                        <i className="fa fa-paw"></i>
                        <span className="hidden-folded m-l-sm">AdminUI</span>
                    </div>
                </div>
                <div className={`a-Layout-headerBar`}>
                    <div className="nav navbar-nav hidden-xs">
                        <Button
                            level="link"
                            className="no-shadow navbar-btn"
                            onClick={store.toggleAsideFolded}
                            tooltip="展开或收起侧边栏"
                            placement="bottom"
                            iconOnly
                        >
                            <i className={store.asideFolded ? 'fa fa-indent' : 'fa fa-dedent'} />
                        </Button>
                    </div>
                    <div className="hidden-xs p-t-sm pull-right">
                        {/* <UserInfo user={store.user} /> */}
                    </div>
                </div>
            </div>
        );
    }

    renderAside() {
        const location = this.props.location;
        const store = this.props.store;
        return (
            <AsideNav
                key={store.asideFolded ? 'folded-aside' : 'aside'}
                navigations={navigations}
                renderLink={({ link, toggleExpand, classnames: cx, depth }: any) => {

                    if (link.hidden) {
                        return null;
                    }

                    let children = [];

                    if (link.children) {
                        children.push(
                            <span
                                key="expand-toggle"
                                className={cx('AsideNav-itemArrow')}
                                onClick={(e) => toggleExpand(link, e)}
                            ></span>
                        );
                    }

                    link.badge && children.push(
                        <b key="badge" className={cx(`AsideNav-itemBadge`, link.badgeClassName || 'bg-info')}>{link.badge}</b>
                    );

                    if (link.icon) {
                        children.push(
                            <i key="icon" className={cx(`AsideNav-itemIcon`, link.icon)} />
                        )
                    } else if (store.asideFolded && depth === 1) {
                        children.push(
                            <i key="icon" className={cx(`AsideNav-itemIcon`, link.children ? 'fa fa-folder' : 'fa fa-info')} />
                        )
                    };

                    children.push(
                        <span key="label" className={cx('AsideNav-itemLabel')}>{link.label}</span>
                    );

                    return link.path
                        ? (link.active ? <a>{children}</a> : <Link to={link.path[0] === '/' ? (link.path) : `/${link.path}`}>{children}</Link>)
                        : (<a onClick={link.onClick ? link.onClick : link.children ? () => toggleExpand(link) : undefined}>{children}</a>);
                }}
                isActive={(link: any) => isActive(link.path && link.path[0] === '/' ? (link.path) : `/${link.path}`, location)}
            />
        );
    }


    render() {
        const store = this.props.store;

        return (
            <Layout
                aside={this.renderAside()}
                header={this.renderHeader()}
                folded={store.asideFolded}
                offScreen={store.offScreen}
            >
                <Switch>
                    {/* <Redirect to={`/dashboard`} from={`/`} exact /> */}
                    {navigations2route()}
                    {/* <Redirect to={`/404`} /> */}
                </Switch>
            </Layout>
        );
    }
}