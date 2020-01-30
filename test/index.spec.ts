import Converter from "../src/index";
import { expect } from "chai";
import "mocha";

describe("$('#selector')", () => {
  it("should return .getElementById", () => {
    const result = Converter.idSelectors("$('#selector')");
    expect(result).to.equal("document.getElementById(\"selector\")");
  });
  it("should return .getQuerySelectorAll", () => {
    const result = Converter.idSelectors("$('#selector sub-selector')");
    expect(result).to.equal("document.querySelectorAll(\"#selector sub-selector\")");
  });
});

describe("$('.selector')", () => {
  it("should return .getElementByClassName", () => {
    const result = Converter.classSelectors("$('.selector')");
    expect(result).to.equal("document.getElementByClassName(\"selector\")");
  });
  it("should return .getQuerySelectorAll", () => {
    const result = Converter.classSelectors("$('.selector sub-selector')");
    expect(result).to.equal("document.querySelectorAll(\".selector sub-selector\")");
  });
});

describe(".html()", () => {
  it("should return .innerHTML", () => {
    const result = Converter.html(".html()");
    expect(result).to.equal(".innerHTML");
  });
  it("should return .innerHTML = key", () => {
    const result = Converter.html(".html('text')");
    expect(result).to.equal(".innerHTML = 'text'");
  });
});
