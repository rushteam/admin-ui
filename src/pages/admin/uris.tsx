import * as React from 'react';
import AMisRender from '../../components/AMisRender';
import { Schema } from "amis/lib/types";

export default function (props: any): JSX.Element{
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
                        "api": "/api/admin/uris_save",
                        "controls": [
                            { "type": "divider" },
                            {
                                "name": "type",
                                "label": "类别(Type)",
                                "type": "text",
                                "required": true
                            },
                            {
                                "name": "uri",
                                "label": "路径(Uri)",
                                "type": "text",
                                "required": true
                            },
                            {
                                "name": "method",
                                "label": "方法(Method)",
                                "type": "text",
                                "required": true
                            },
                            {
                                "name": "label",
                                "label": "描述(Label)",
                                "type": "text",
                                "required": true
                            },
                        ]
                    }
                }
            }
        ],
        "body": [
            {
                "type": "crud",
                "api": "/api/admin/uris",
                "defaultParams": {
                    "ps": 10
                },
                expandConfig: {
                    expand: 'first',
                    accordion: true
                },
                "columns": [
                    {
                        "name": "id",
                        "label": "ID",
                        "type": "text"
                    },
                    {
                        "name": "type",
                        "label": "分组(Type)",
                        "type": "text"
                    },
                    {
                        "name": "uri",
                        "label": "路径(Uri)",
                        "type": "text"
                    },
                    {
                        "name": "method",
                        "label": "方法(Method)",
                        "type": "text"
                    },
                    {
                        "name": "label",
                        "label": "描述(Label)",
                        "type": "text"
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
                                        "api": "/api/admin/uris_save",
                                        "controls": [
                                            {
                                                "name": "id",
                                                "type": "hidden",
                                            },
                                            { "type": "divider" },
                                            {
                                                "name": "type",
                                                "label": "类别(Type)",
                                                "type": "text",
                                                "required": true
                                            },
                                            {
                                                "name": "uri",
                                                "label": "路径(Uri)",
                                                "type": "text",
                                                "required": true
                                            },
                                            {
                                                "name": "method",
                                                "label": "方法(Method)",
                                                "type": "text",
                                                "required": true
                                            },
                                            {
                                                "name": "label",
                                                "label": "描述(Label)",
                                                "type": "text",
                                                "required": true
                                            },
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
                                "api": "/api/admin/uris_del"
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