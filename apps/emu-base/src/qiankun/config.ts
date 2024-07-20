import { registerMicroApps, start, initGlobalState, MicroAppStateActions, RegistrableApp } from 'qiankun'

export const apps: RegistrableApp<any>[] = [
    {
        name: 'emu-docs',
        entry: '//localhost:8002',
        container: '#renderView',
        activeRule: '/docs',
        props: {}
    }
]

// 应用全局数据
export const globalState = {
    token: '',
    userInfo: {}
}

export const lifeCycles: any = {
    beforeLoad: (app: RegistrableApp<any>) => console.log('before load', app.name),
    beforeMount: (app: RegistrableApp<any>) => console.log('before mount', app.name),
    afterMount: (app: RegistrableApp<any>) => console.log('after mount', app.name),
    beforeUnmount: (app: RegistrableApp<any>) => console.log('before mount', app.name),
    afterUnmount: (app: RegistrableApp<any>) => console.log('after unmount', app.name)
}
