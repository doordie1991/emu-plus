# emu-plus

## 关于她
> easy-modular-ui 升级版

emu-plus 是基于vue3+typescript+qiankun等技术栈实现的微前端应用框架，框架采用了monorepo+turborepo的代码管理方式，简化代码共享、构建部署等方面的复杂性，框架同时基于element-plus封装了多个实用组件，大大提供开发效率。

## 技术选型
| 项目 | 框架 |
| --- | ----------- |
| 前端框架 | vue 3.3+ |
| 路由管理 | vue-router 4+ |
| 状态管理 | pinia 2+ |
| 构建工具 | vite 4 |
| 包管理工具 | pnpm|
| 代码管理 | monorepo+turborepo |

## 程序目录
```

├── apps --应用模块
│   ├── emu-base --框架基座
│   └── emu-docs --框架文档
├── packages --公共模块
│   ├── assets
│   ├── components
│   ├── directive
│   ├── hooks
│   ├── locales
│   ├── store
│   ├── styles
│   ├── types
│   ├── utils
├── pnpm-workspace.yaml --pnpm工作间设置
└── turbo.json  --turborepo 设置

```

## 安装使用

安装依赖
```
pnpm i
```
启动项目
```
全部项目同时启动：npm run dev 
启动单个项目：npm run start:xxx
```

## 后续拓展
1. 迁移easy-modular-ui剩余的组件至新版本
2. 优化应用之间的通讯
3. 增加demo演示，补充部署策略说明
4. 增加框架脚手架，快速创建应用
5. 通过rollup插件的方式优化页面组件、store、api等的批量导出

