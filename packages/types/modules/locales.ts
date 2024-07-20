export declare type Locale = "cn" | "en";

export interface ILocalesMessge {
  en: any;
  cn: any;
}

export interface ILocalesOptions {
  // 使用Composition API模式，则需要将其设置为false
  legacy: boolean;
  // 全局注入
  globalInjection: boolean;
  locale: Locale;
  fallbackLocale: Locale;
  missingWarn: boolean;
}
