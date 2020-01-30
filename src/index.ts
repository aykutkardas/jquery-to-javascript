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

  static convert(input) {
    const {
      idSelectors,
      classSelectors
    } = Converter;

    let output = input;
    const processList = [idSelectors, classSelectors];

    processList.forEach(process => {
      output = process(output);
    });

    return output;
  }
}