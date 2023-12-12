const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();
const units = ["gal", "L", "mi", "km", "lbs", "kg"];

suite("Unit Tests", function () {
  test("Read Number input", () => {
    assert.isNumber(convertHandler.getNum("1"), "Should return a number");
  });

  test("Read decimal number input", () => {
    assert.isNumber(convertHandler.getNum("1.2"), "Should return a number");
  });

  test("Read fractional input" ,() => {
    assert.isNumber(convertHandler.getNum("5/3"), "Should return a number");
  })
  test("read a fractional input", ()=> {
    assert.isNumber(convertHandler.getNum("5.3/3"), "Should return a number");
  })

  test("return an error on a double-fraction" , () => {
    assert.isTrue(convertHandler.getNum("3/2/3") instanceof Error, "Invalid number");
  });

  test("default to a numerical input of 1 when no numerical input is provided.", () => {
    assert.equal(convertHandler.getNum(""), 1, "Should give 1");
  })

  test("read each valid input unit", () => {
    assert.equal(convertHandler.getUnit("gal"), "gal", "should return gal");
    assert.equal(convertHandler.getUnit("L"), "L", "should return L");
    assert.equal(convertHandler.getUnit("mi"), "mi", "should return mi");
    assert.equal(convertHandler.getUnit("km"), "km", "should return km");
    assert.equal(convertHandler.getUnit("lbs"), "lbs", "should return lbs");
    assert.equal(convertHandler.getUnit("kg"), "kg", "should return kg");
  })
  test("return an error for an invalid input unit", () => {
    assert.isTrue(convertHandler.getUnit("gallons") instanceof Error, "Invalid unit");
  });


  test("return the correct return unit for each valid input unit", () => {
    assert.equal(convertHandler.getReturnUnit("gal"), "L", "should return L");
    assert.equal(convertHandler.getReturnUnit("L"), "gal", "should return gal");
    assert.equal(convertHandler.getReturnUnit("mi"), "km", "should return km");
    assert.equal(convertHandler.getReturnUnit("km"), "mi", "should return mi");
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg", "should return kg");
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs", "should return lbs");
  })

  test(" return the spelled-out string unit for each valid input unit.", () => {
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons", "should return gallons");
    assert.equal(convertHandler.spellOutUnit("L"), "liters", "should return liters");
    assert.equal(convertHandler.spellOutUnit("mi"), "miles", "should return miles");
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers", "should return kilometers");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds", "should return pounds");
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms", "should return kilograms");
  })

  

  test("correctly convert gal to L", () => {
    assert.approximately(convertHandler.convert(1, "gal"), 3.78541,  0.05, "should return 3.78541");
  })

  test("correctly convert L to gal", () => {
    assert.approximately(convertHandler.convert(1, "l"), 0.26417, 0.05, "should return 0.26417");
  })

  test("correctly convert mi to km", () => {
    assert.approximately(convertHandler.convert(1, "mi"), 1.60934,  0.05, "should return 1.60934");
  })

  test("correctly convert km to mi", () => {
    assert.approximately(convertHandler.convert(1, "km"), 0.62137, 0.05, "should return 0.62137");
  })

  test("correctly convert lbs to kg", () => {
    assert.approximately(convertHandler.convert(1, "lbs"), 0.45359, 0.05, "should return 0.45359");
  })

  test("correctly convert kg to lbs", () => {
    assert.approximately(convertHandler.convert(1, "kg"), 2.20462, 0.05, "should return 2.20462");
  })

});
