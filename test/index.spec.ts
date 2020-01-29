import Converter from "../src/index";
import { expect } from "chai";
import "mocha";

describe("idSelectors", () => {
  it("should return .getElementById", () => {
    const result = Converter.idSelectors("$('#selector')");
    expect(result).to.equal("document.getElementById(\"selector\")");
  });
});

describe("classSelectors", () => {
  it("should return .getElementByClassName", () => {
    const result = Converter.classSelectors("$('.selector')");
    expect(result).to.equal("document.getElementByClassName(\"selector\")");
  });
});