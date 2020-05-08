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
            uri: "/test",
            children: [
                {
                    label: 'file A',
                    value: 2,
                    uri: "/test/2"
                },
                {
                    label: 'file B',
                    value: 3,
                    uri: "/test/3"
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
        1: "<span class='label label-success'>正常</span>",
        2: "<span class='label label-danger'>禁用</span>",
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
                        "api": "/api/admin/roles_save",
                        "controls": [
                            {
                                "name": "label",
                                "label": "角色名",
                                "type": "text",//static
                                "required": true
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
            }
        ],
        "body": [
            {
                "type": "crud",
                "api": "/api/admin/roles",
                "defaultParams": {},
                expandConfig: {
                    expand: 'first',
                    accordion: true
                },
                "columns": [
                    {
                        "name": "id",
                        "label": "角色ID",
                        "type": "text"
                    },
                    {
                        "name": "label",
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
                                                "name": "id",
                                                "type": "hidden",
                                            },
                                            {
                                                "name": "label",
                                                "label": "角色名",
                                                "type": "text",//static
                                                "required": true
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
                                                                name: 'menu_id',
                                                                label: false,
                                                                multiple: true,
                                                                options: menusTree,
                                                                joinValues: false,
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        title: '资源权限',
                                                        controls: [
                                                            {
                                                                type: 'tree',
                                                                name: 'uris_id',
                                                                label: false,
                                                                multiple: true,
                                                                options: urisTree,
                                                                joinValues:false,
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
                                "icon": "fa fa-plus",
                                "tooltip": "新增子角色",
                                "level": "link",
                                "actionType": "drawer",
                                data: {
                                    name:"",
                                    pid:"",
                                    // "pid":"${id}"
                                },
                                "drawer": {
                                    "position": "right",
                                    "size": "lg",
                                    "title": "新增子角色",
                                    
                                    "body": {
                                        "type": "form",
                                        "name": "sample-add-form",
                                        "api": "/api/admin/roles_save",
                                        "controls": [
                                            {
                                                "name": "id",
                                                "type": "hidden",
                                            },
                                            {
                                                "name": "label",
                                                "label": "角色名",
                                                "type": "text",//static
                                                "required": true
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
                                                                name: 'menu_id',
                                                                label: false,
                                                                multiple: true,
                                                                options: menusTree,
                                                                joinValues: false,
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        title: '资源权限',
                                                        controls: [
                                                            {
                                                                type: 'tree',
                                                                name: 'uris_id',
                                                                label: false,
                                                                multiple: true,
                                                                options: urisTree,
                                                                joinValues: false,
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
                                "level": "link",
                                "icon": "fa fa-times text-danger",
                                "actionType": "ajax",
                                "tooltip": "删除",
                                "confirmText": "确认要删除?",
                                "api": "/api/admin/roles_del"
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