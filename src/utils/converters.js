
const camelCase = str => str.toLowerCase().replace(/-(.)/g, (_,p) => p.toUpperCase());
export const css2obj = (strings, ...vals) => {
    const css = strings.reduce((acc, str, i) => acc + str + (vals[i] || ''), '')
    const regExp = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g, obj = {}
    css.replace(regExp, (m,p,v) => obj[camelCase(p)] = v)
    return obj
}

export const obj2css = (obj) => {
  let cssString = "";
  for (let objectKey in obj) {
      cssString += objectKey.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`) + ": " + obj[objectKey] + ";\n";
  }
  return cssString;
};

export const replaceKeyWordToTag = (text, desc) => {
    const keyWords = Object.keys(desc).filter((elem) =>
      text.includes(elem)
    );

    const textList = text.split(" ");
    const toolTip = textList.map((word) => {
      const regEx = /[|.|,]/;
      const keyWord = word.replace(regEx, "");
      const tag = `<span class="key-words" data-bs-toggle="tooltip" data-bs-placement="top" title="${desc[keyWord]}"> ${keyWord}</span>`;

      const elem = keyWords.includes(keyWord)
        ? word.replace(keyWord, tag)
        : word;
      return elem;
    });
    return keyWords.length !== 0 ? toolTip.join(" ") : text;
};