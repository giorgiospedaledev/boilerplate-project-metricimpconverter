function ConvertHandler() {
  const units = ["gal", "L", "mi", "km", "lbs", "kg"];
  const spelledOutUnits = [
    "gallons",
    "liters",
    "miles",
    "kilometers",
    "pounds",
    "kilograms",
  ];

  

  this.getNum = function (input) {

    if (!input) 
      return 1;

    if (!/\d/.test(input)) 
      return 1;
    // Check if there is a double fraction
    let doubleFraction = input.match(/\d+(\.?\d*)?\/+\d+\.?\d*\/\d+\.?\d*/);
    if (doubleFraction) {
      console.log(input)
      return new Error("Invalid number: double fraction");
    }

    doubleFraction = input.match(/\d*\.?\d*\/\/\d*\.?\d*/);
    if (doubleFraction) {
      return new Error("Invalid number: double fraction");
    }

    // Check if there is a number
    const matches = input.match(/\d+\.?\d*([/.]\d+\.?\d*)?/);
    if (!matches) {
      // If there's no valid number, check if the input contains only a unit
      const unitOnly = input.match(/[a-zA-Z]+/);
      if (unitOnly && !input.match(/\d/)) {
        return "1";
      } else {
        return new Error("Invalid number");
      }
    }

    let result;
    const parts = matches[0].split("/");

    if (parts.length === 1) {
      // Parse the numerator
      result = parseFloat(parts[0]);
    } else {
      // Parse the num and den then create the float number
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);

      if (denominator === 0) {
        return new Error("Invalid number: division by zero");
      }

      result = Number.parseFloat(numerator) / Number.parseFloat(denominator);
    }

    return result;
  };

  // this.getNum = function (input) {
  //   // Check if the string is not empty
  //   if (!input) {
  //     return 1;
  //   }

  //   // Check if there is a double fraction
  //   let doubleFraction = input.match(/\d+(\.?\d*)?\/+\d+\.?\d*\/?\d+\.?\d*/);
  //   if (doubleFraction) {
  //     return new Error("Invalid number: double fraction");
  //   }

  //   doubleFraction = input.match(/\d*\.?\d*\/\/\d*\.?\d*/);
  //   if (doubleFraction) {
  //     return new Error("Invalid number: double fraction");
  //   }

  //   // Check if there is a number
  //   const matches = input.match(/\d+\.?\d*([/.]\d+\.?\d*)?/);
  //   if (!matches) {
  //     // If there's no valid number, check if the input contains only a unit
  //     const unitOnly = input.match(/[a-zA-Z]+/);
  //     if (unitOnly && !input.match(/\d/)) {
  //       return 1;
  //     } else {
  //       return new Error("Invalid number");
  //     }

  //   }

  //   let result;
  //   const parts = matches[0].split("/");

  //   if (parts.length === 1) {
  //     // Parse the numerator
  //     result = parseFloat(parts[0]);
  //   } else {
  //     // Parse the num and den then create the float number
  //     const numerator = parseFloat(parts[0]);
  //     const denominator = parseFloat(parts[1]);

  //     if (denominator === 0) {
  //       return new Error("Invalid number: division by zero");
  //     }

  //     result = numerator / denominator;
  //   }

  //   return result.toFixed(5);
  // };

  this.getUnit = function (input) {
    let result;
    if (!input) {
      return new Error("Invalid unit");
    }

    const unit = input.match(/[A-Za-z]+/);
    if (!unit) {
      return new Error("Invalid unit");
    }

    if (!units.some((value) => value.toLowerCase() == unit[0].toLowerCase()))
      return new Error("Invalid unit");

    if (unit[0].toLowerCase() == "l") {
      return unit[0].toUpperCase();
    }
    result = unit[0];
    return result.toLowerCase();
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

    return result.toLowerCase();
  };

  this.spellOutUnit = function (unit) {
    return spelledOutUnits[units.indexOf(unit)];
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

    return Number.parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
