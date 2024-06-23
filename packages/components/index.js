export default function (app) {
    //自动注册组件（组件约定路径 /模块/组件名称/index.vue）
    const files = import.meta.globEager('../components/**/index.vue')
    for (const path in files) {
        const arrPath = path.split('/')

        if (arrPath.length !== 4) continue

        const name = arrPath[2]
        const cmp = files[path].default
        app.component(`em-${name}`, cmp)
    }
}
