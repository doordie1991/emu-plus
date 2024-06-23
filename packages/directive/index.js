import permission from './permission'

const directives = [permission]

export default (app) => {
    directives.forEach((o) => {
        app.directive(o.name, o.directive)
    })
}
