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
                        "name": "group",
                        "label": "分组",
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
                        "name": "desc",
                        "label": "描述",
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
                                                "label": "分组",
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
                                                "name": "desc",
                                                "label": "描述",
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