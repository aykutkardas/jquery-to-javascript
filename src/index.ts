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

  static convert(input) {
    const {
      idSelectors
    } = Converter;

    let output = input;
    const processList = [idSelectors];

    processList.forEach(process => {
      output = process(output);
    });

    return output;
  }
}