import EMU from '../packages'
import config from './config'

//获取模块
const files = import.meta.globEager('./modules/**/main.js')
for (const path in files) {
    const module = files[path].default
    config.modules.push(module)
}

//系统管理模块
const adminModule = config.modules.find((m) => m.code === 'admin')

//注入应用基本接口
config.actions = {
    //身份认证相关方法
    auth: adminModule.api.admin.auth
}

EMU.install(config)
