const camelCase = str => str.replace(/-(.)/g, (_,p) => p.toUpperCase())
const css2obj = (strings, ...vals) => {
    const css = strings.reduce((acc, str, i) => acc + str + (vals[i] || ''), '')
    const regExp = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g, obj = {}
    css.replace(regExp, (m,p,v) => obj[camelCase(p)] = v)
    return obj
}
export default css2obj;