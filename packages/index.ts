import { App } from "vue";
import { IAppConfig } from "./types";
import ElementPlus from "element-plus";
import "../packages/styles/element.scss";
import useUI from "./components";
import useLocales from "./locales";
import useDirective from "./directive";

export default {
  install: (app: App<Element>, config: IAppConfig) => {
    app.use(ElementPlus);
    window.Emu = {};

    useUI(app);
    useDirective(app);
    useLocales(app, config);

    return app;
  },
};
