import { App } from "vue";
export default function (app: App<Element>) {
  //自动注册组件（组件约定路径 /模块/组件名称/index.vue）
  const files = import.meta.globEager("../components/**/index.vue");
  for (const path in files) {
    const arrPath = path.split("/");

    if (arrPath.length !== 4) {
      continue;
    }

    const name = arrPath[2];
    const file: any = files[path];
    const cmp = file.default;
    app.component(`em-${name}`, cmp);
  }
}
