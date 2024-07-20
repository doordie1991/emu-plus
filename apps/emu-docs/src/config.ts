import { IAppConfig } from "emu-plus/types";

const config: IAppConfig = {
  // 应用名称
  code: "emu-doc",
  // 应用名称
  name: "emu-doc",
  // 应用描述
  desc: "emu-plus文档",
  // 应用logo
  logoUrl: "/images/logo.png",
  // 路由前缀
  routerPrefix: "/docs",
  // 版本号
  version: "1.0.0",
  // 版权
  copyright: "版权所有：陈曦·LR | 用代码改变世界 Powered by EasyModular",
  // 请求配置
  httpCfg: {
    serviceUrl: "/api",
  },
};

export default config;
