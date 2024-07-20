import type { Component } from "vue";
import { ILocalesOptions, ILocalesMessge } from "../../types";
// 总配置
export interface IAppConfig {
  // 应用编码
  code: string;
  // 应用名称
  name: string;
  // 应用描述
  desc?: string;
  // 基座应用
  baseApp?: boolean;
  // 基座设置
  baseAppConfg?:IBaseAppConfig,
  // 微应用
  microApps?: IMicroAppConfig[];
  // 路由前缀
  routerPrefix?: string;
  // logo
  logoUrl?: string;
  // 首页
  home?: string;
  // 版本
  version: string;
  // 版权声明
  copyright?: string;
  // 页面
  pages?: IPageConfig[];
  // 请求配置
  httpCfg?: IHttpConfig;
  // 多语言
  localesMessage?: ILocalesMessge;
  // 多语言
  localesOptions?: ILocalesOptions;
}

// 微应用配置
export interface IMicroAppConfig {
  // 微应用名称
  name: string;
  // 微应用的入
  entry: string;
  // 微应用的容器节点的选择器或者 Element 实例
  container: string | HTMLElement;
  // 微应用的激活规则
  activeRule: string;
}

// 基座应用配置
export interface IBaseAppConfig {
  // 可选，是否开启预加载，默认为 true。
  prefetch: boolean;
  // 可选，是否开启沙箱，默认为 true。// （建议关闭，因为在vite 中子应用的样式会失效）
  strictStyleIsolation: boolean;
  // 可选，是否为单实例场景，单实例指的是同一时间只会渲染一个微应用。默认为 true。
  singular: boolean;
}

// 页面配置
export interface IPageConfig {
  // 标题
  title: string;
  // 路由名称
  name: string;
  // 路由路径
  path: string;
  // 图标
  icon: string;
  // 是否在框架内
  frameIn?: boolean;
  // 是否缓存
  cache?: boolean;
  // 组件
  component: Component;
  // 扩展属性
  [key: string]: any;
}

// 请求配置
export interface IHttpConfig {
  // 服务地址
  serviceUrl: string;
}
