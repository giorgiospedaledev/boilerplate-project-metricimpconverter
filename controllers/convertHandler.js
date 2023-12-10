function ConvertHandler() {
  const units = ["gal", "L", "mi", "km", "lbs", "kg"];
  const spelledOutUnits = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"]

  this.getNum = function (input) {
    //check if the string is not empty
    if (!input) return 1;

    //check if there is a double fraction
    const doubleFraction = input.match(/\d+\.?\d*\/\d+\.?\d*\/\d+\.?\d*/);
    if (doubleFraction) {
      return new Error("Dobule-Fraction");
    }

    //check if there is a number

    let matches = input.match(/\d+\.?\d*([/.]\d+\.?\d*)?/);
    if (!matches) {
      return 1;
    }

    let result;
    let numerator;
    let denominator;

    //separate the fraction
    const parts = matches[0].split("/");
    //if the string isnt a fraction
    if (parts.length === 1) {
      //parse the numerator
      result = parseFloat(parts[0]);
    } else {
      //otherwise parse the num and den then create the float number
      numerator = parseFloat(parts[0]);
      denominator = parseFloat(parts[1]);
      result = numerator / denominator;
    }

    return result;
  };

  this.getUnit = function (input) {
    let result;
    const unit = input.match(/[a-Z]+/);
    if (!unit) {
      return new Error("Invalid input unit");
    }

    if (!units.some((value) => value.toLowerCase() == unit.toLowerCase()))
      return new Error("Invalid input unit");

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    let i = 0;
    while (i < units.length) {
      if (units[i].toLowerCase() == initUnit.toLowerCase()) {
        if (i % 2 === 0) {
          return units[i + 1];
        } else {
          return units[i - 1];
        }
      }
      i++;
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    return spelledOutUnits[units.indexOf(unit.toLowerCase())]
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit.toLowerCase()) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${spellOutUnit(initUnit)} converts to ${returnNum} ${spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
