import * as React from 'react';
import AMisRender from '../../components/AMisRender';
import { Schema } from "amis/lib/types";

export default function (props: any): JSX.Element{
    // menus: null
    // uris: null
    const menusTree = [
        {
            label: 'Folder A',
            value: 1,
            children: [
                {
                    label: 'file A',
                    value: 2
                },
                {
                    label: 'file B',
                    value: 3
                }
            ]
        },
        {
            label: 'file C',
            value: 4
        },
        {
            label: 'file D',
            value: 5
        }
    ]
    const urisTree = menusTree
    const statusMaps = {
        "1": "<span class='label label-success'>正常</span>",
        "2": "<span class='label label-danger'>禁用</span>",
        "*": "未知(${type})"
    }
    const schema: Schema = {
        "$schema": "https://houtai.baidu.com/v2/schemas/page.json#",
        "type": "page",
        "title": "角色管理",
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
                        "api": "",
                        "controls": [
                            {
                                "type": "alert",
                                "level": "info",
                                "body": "因为没有配置 api 接口，不能真正的提交哈！"
                            },
                            {
                                "type": "text",
                                "name": "text",
                                "label": "文本",
                                "required": true
                            },
                            {
                                "type": "divider"
                            },
                            {
                                "type": "image",
                                "name": "image",
                                "label": "图片",
                                "required": true
                            },
                            {
                                "type": "divider"
                            },
                            {
                                "type": "date",
                                "name": "date",
                                "label": "日期",
                                "required": true
                            },
                            {
                                "type": "divider"
                            },
                            {
                                "type": "select",
                                "name": "type",
                                "label": "选项",
                                "options": [
                                    {
                                        "label": "漂亮",
                                        "value": "1"
                                    },
                                    {
                                        "label": "开心",
                                        "value": "2"
                                    },
                                    {
                                        "label": "惊吓",
                                        "value": "3"
                                    },
                                    {
                                        "label": "紧张",
                                        "value": "4"
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        "body": [
            {
                "type": "crud",
                "api": "/api/admin/roles",
                "defaultParams": {
                    "ps": 10
                },
                expandConfig: {
                    expand: 'first',
                    accordion: true
                },
                "columns": [
                    {
                        "name": "role_id",
                        "label": "角色ID",
                        "type": "text"
                    },
                    {
                        "name": "role_label",
                        "label": "角色名称",
                        "type": "text"
                    },
                    {
                        "name": "created_at",
                        "type": "date",
                        "label": "创建时间"
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
                                        "api": "/api/admin/roles_save",
                                        "controls": [
                                            {
                                                "name": "role_id",
                                                "type": "hidden",
                                            },
                                            { "type": "divider" },
                                            {
                                                type: 'tabs',
                                                tabs: [
                                                    {
                                                        title: '菜单权限',
                                                        controls: [
                                                            {
                                                                type: 'tree',
                                                                name: 'menus',
                                                                label: false,
                                                                multiple: true,
                                                                options: menusTree,
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        title: '资源权限',
                                                        controls: [
                                                            {
                                                                type: 'tree',
                                                                name: 'uris',
                                                                label: false,
                                                                multiple: true,
                                                                options: urisTree,
                                                            },
                                                        ]
                                                    },
                                                ]
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
                                        "api": "/api/admin/roles_save",
                                        "controls": [
                                            {
                                                "name": "role_id",
                                                "type": "hidden",
                                            },
                                            {
                                                "name": "role_label",
                                                "label": "角色名",
                                                "type": "static",
                                                "required": true
                                            },
                                            { "type": "divider" }
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