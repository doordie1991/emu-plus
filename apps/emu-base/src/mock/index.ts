import Mock from 'mockjs'

const files = import.meta.globEager('./modules/**/*.ts')
Object.values(files).map((m: any) => {
    const item = m.default
    if (item) {
        Object.keys(item).forEach((key) => {
            Mock.mock(item[key].url, item[key].type, item[key].response)
        })
    }
})

