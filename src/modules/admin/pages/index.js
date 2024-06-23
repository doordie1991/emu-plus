const pageFiles = import.meta.globEager('../pages/**/page.js')
export default Object.values(pageFiles).map((m) => m.default)
