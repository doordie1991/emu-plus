const resolveApi = () => {
    let obj = {}
    const files = import.meta.globEager('./service/**/*.js')
    for (const path in files) {
        const name = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
        const def = files[path].default
        obj[name] = def(name)
    }

    return obj
}

export default {
    admin: resolveApi()
}
