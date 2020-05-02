import * as React from 'react';
// import { inject, observer } from 'mobx-react';
// import { RouteComponentProps, withRouter } from 'react-router';
// import { IMainStore } from '../../stores/index';
import AMisRender from '../../components/AMisRender';
import { Schema } from "amis/lib/types";

// @inject("store")
// @observer
// export default class Users extends React.Component<IndexProps> {
//     render() {
//         const store = this.props.store;
//         return (
//             <AMisRender schema={schema} />
//         );
//     }
// }
export default function (props: any): JSX.Element{
    const genderMaps = {
        "1": "男",
        "2": "女",
        "*": "${type}"
    }
    const statusMaps = {
        "1": "<span class='label label-success'>正常</span>",
        "2": "<span class='label label-danger'>禁用</span>",
        // "2": "<span class='label label-warning'>禁用</span>",
        // "2": "<span class='label label-info'>漂亮</span>",
        "*": "${type}"
    }
    const statusOptions = [
        { "label": "正常","value": "1"},
        { "label": "禁用","value": "2"},
    ]
    const schema: Schema = {
        "$schema": "https://houtai.baidu.com/v2/schemas/page.json#",
        "type": "page",
        "title": "管理员列表",
        "toolbar": [
            {
                "type": "button",
                "actionType": "dialog",
                "label": "新增",
                "icon": "fa fa-plus pull-left",
                "primary": true,
                "dialog": {
                    "title": "新增",
                    "body": {
                        "type": "form",
                        "name": "sample-edit-form",
                        "api": "/api/admin/users_save",
                        "controls": [
                            // {
                            //     "type": "alert",
                            //     "level": "info",
                            //     "body": "因为没有配置 api 接口，不能真正的提交哈！"
                            // },
                            { "type": "divider" },
                            {
                                "name": "nickname",
                                "label": "昵称",
                                "type": "text",
                                "required": true
                            },
                            {
                                "name": "avatar",
                                "label": "头像",
                                "type": "image",
                                "multiple": false,
                                "required": false
                            },
                            { "type": "divider" },
                            {
                                "name": "status",
                                "label": "状态",
                                "type": "select",
                                "options": statusOptions,
                            }
                        ]
                    }
                }
            }
        ],
        "body": [
            {
                "type": "crud",
                //https://houtai.baidu.com/api/mock2/crud/list
                "api": "/api/admin/users",
                "defaultParams": {
                    "ps": 10
                },
                "columns": [
                    {
                        "name": "uid",
                        "label": "UID",
                        "type": "text"
                    },
                    {
                        "name": "avatar",
                        "label": "头像",
                        "type": 'tpl',
                        "tpl": '<img style="width:30px;" src="${avatar}" />',
                        // "type": "image",
                        // "multiple": false,
                        "popOver": {
                            "title": "高清",
                            "body": "<div class=\"w-xxl\"><img class=\"w-full\" src=\"${image}\"/></div>"
                        }
                    },
                    {
                        "name": "nickname",
                        "label": "昵称",
                        "type": "text"
                    },
                    {
                        "name": "gender",
                        "label": "性别",
                        "type": "mapping",
                        "map": genderMaps,
                    },
                    {
                        "name": "created_at",
                        "type": "date",
                        "label": "注册日期"
                    },
                    {
                        "name": "status",
                        "label": "状态",
                        "type": "mapping",
                        "map": statusMaps
                    },
                    {
                        "type": "container",
                        "label": "操作",
                        "body": [
                            {
                                "type": "button",
                                "icon": "fa fa-eye",
                                "level": "link",
                                "actionType": "dialog",
                                "tooltip": "查看",
                                "dialog": {
                                    "title": "查看",
                                    "body": {
                                        "type": "form",
                                        "controls": [
                                            {
                                                "name": "uid",
                                                "label": "UID",
                                                "type": "static",
                                            },
                                            {"type": "divider"},
                                            {
                                                "name": "nickname",
                                                "label": "昵称",
                                                "type": "static",
                                            },
                                            { "type": "divider" },
                                            {
                                                "name": "avatar",
                                                "label": "头像",
                                                "type": "static-image",
                                                "popOver": {
                                                    "title": "高清",
                                                    "body": "<div class=\"w-xxl\"><img class=\"w-full\" src=\"${avatar}\"/></div>"
                                                }
                                            },
                                            { "type": "divider" },
                                            {
                                                "name": "created_at",
                                                "label": "注册日期",
                                                "type": "static-date",
                                            },
                                            { "type": "divider" },
                                            {
                                                "name": "status",
                                                "label": "状态",
                                                "type": "static-mapping",
                                                "map": statusMaps
                                            }
                                        ]
                                    }
                                }
                            },
                            {
                                "type": "button",
                                "icon": "fa fa-pencil",
                                "tooltip": "编辑",
                                "level": "link",
                                "actionType": "drawer",
                                "drawer": {
                                    "position": "right",
                                    "size": "lg",
                                    "title": "编辑",
                                    "body": {
                                        "type": "form",
                                        "name": "sample-edit-form",
                                        "api": "/api/admin/users_save",
                                        "controls": [
                                            // {
                                            //     "type": "alert",
                                            //     "level": "info",
                                            //     "body": "因为没有配置 api 接口，不能真正的提交哈！"
                                            // },
                                            {
                                                "name": "uid",
                                                "label": "UID",
                                                "type": "static",
                                            },
                                            { "type": "divider" },
                                            {
                                                "name": "nickname",
                                                "label": "昵称",
                                                "type": "text",
                                                "required": true
                                            },
                                            {
                                                "name": "avatar",
                                                "label": "图片",
                                                "type": "image",
                                                "multiple": false,
                                                "required": true
                                            },
                                            {
                                                "name": "date",
                                                "label": "日期",
                                                "type": "date",
                                                "disabled": true,
                                            },
                                            { "type": "divider" },
                                            {
                                                "name": "status",
                                                "label": "状态",
                                                "type": "select",
                                                "options": statusOptions,
                                            }
                                        ]
                                    }
                                }
                            },
                            {
                                "type": "button",
                                "icon": "fa fa-pencil",
                                "tooltip": "角色",
                                "level": "link",
                                "actionType": "drawer",
                                "drawer": {
                                    "position": "right",
                                    "size": "lg",
                                    "title": "分配角色",
                                    "body": {
                                        "type": "form",
                                        "name": "sample-edit-form",
                                        "api": "/api/admin/users_roles_save",
                                        "controls": [
                                            // {
                                            //     "type": "alert",
                                            //     "level": "info",
                                            //     "body": "因为没有配置 api 接口，不能真正的提交哈！"
                                            // },
                                            {
                                                "name": "uid",
                                                "label": "UID",
                                                "type": "static",
                                            },
                                            { "type": "divider" },
                                            {
                                                "name": "status",
                                                "label": "状态",
                                                "type": "select",
                                                "options": statusOptions,
                                            }
                                        ]
                                    }
                                }
                            },
                            {
                                "type": "button",
                                "level": "link",
                                "icon": "fa fa-times text-danger",
                                "actionType": "ajax",
                                "tooltip": "删除",
                                "confirmText": "确认要删除?",
                                "api": "/api/admin/users_del"
                            }
                        ]
                    }
                ]
            }
        ]
    }
    return (
        <AMisRender schema={schema} {...props} />
    )
}