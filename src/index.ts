export default class Converter {

  // $("#selector") -> document.getElementById("selector");
  // $("#selector sub-selector") -> document.querySelectorAll("#selector sub-selector");
  static idSelectors(input: string) {
    const pattern = /\$\(\s?('|\")\s?\#([0-9a-zA-Z-_ ]+)\s?('|\")\s?\)/gm;
    return input.replace(pattern, function (match) {
      const regexResult = pattern.exec(match);
      const key = regexResult[2];
      if (key && key.length > 0) {
        if (key.includes(" ")) {
          return `document.querySelectorAll("#${key}")`;
        } else {
          return `document.getElementById("${key}")`;
        }
      }
    });
  }

  // $(".selector") -> document.getElementByClassName("selector");
  // $(".selector sub-selector") -> document.querySelectorAll(".selector sub-selector");
  static classSelectors(input: string) {
    const pattern = /\$\(\s?('|\")\s?\.([0-9a-zA-Z-_\s]+)\s?('|\")\s?\)/gm;
    return input.replace(pattern, function (match) {
      const regexResult = pattern.exec(match);
      const key = regexResult[2];
      if (key && key.length > 0) {
        if (key.includes(" ")) {
          return `document.querySelectorAll(".${key}")`;
        } else {
          return `document.getElementByClassName("${key}")`;
        }
      }
    });
  }

  // .html() -> .innerHTML
  // .html(x) -> .innerHTML = x
  static html(input: string): string {
    const pattern = /.html\((.*?)\)/gm;
    return input.replace(pattern, function (match) {
      const regexResult = pattern.exec(match);
      const key = regexResult[1];
      const otherKey = regexResult[0];

      if (key && key.length > 0) {
        return `.innerHTML = ${key}`;
      } else if (otherKey && otherKey.length > 0) {
        return `.innerHTML`;
      }
    });
  }

  // .text() -> .innerText
  // .text(x) -> .innerText = x
  static text(input: string) {
    const pattern = /.text\((.*?)\)/gm;
    return input.replace(pattern, function (match) {
      const regexResult = pattern.exec(match);
      const key = regexResult[1];
      const otherKey = regexResult[0];

      if (key && key.length > 0) {
          return `.innerText = ${key}`;
      } else if (otherKey && otherKey.length > 0) {
        return `.innerText`;
      }
    });
  }

  // .toggleClass(x) -> .classList.toggle(x)
  static toggleClass(input: string): string {
    const pattern = /.toggleClass\(('|\")([0-9a-zA-Z-_]+)('|\")\)/gm;
    return input.replace(pattern, function (match) {
      const regexResult = pattern.exec(match);
      const key = regexResult[2];
  
      return `.classList.toggle("${key}")`;
    });
  }

  static convert(input: string, config?: IConvertConfig) {
    const processList = [
      "idSelectors",
      "classSelectors",
      "html",
      "text",
    ];

    let output = input;

    let excludeList = [];

    if (config && config.exclude && Array.isArray(config.exclude)) {
      excludeList = config.exclude;
    }


    processList.forEach(process => {
      if (!excludeList.includes(process)) {
        output = Converter[process](output);
      }
    });

    return output;
  }
}

interface IConvertConfig {
  exclude: string[];
}