function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    if (!input ) 
      return 1;
      
    const doubleFraction = input.match(/\d+\.?\d*([/.]\d+\.?\d*)?\/\d+\.?\d*([/.]\d+\.?\d*)?/);
    if (doubleFraction.length !== 0) {
      return new Error("Dobule-Fraction");
    }

    let matches = input.match(/\d+\.?\d*([/.]\d+\.?\d*)?/)
    if(matches.length === 0) {
      return 1;
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    result = input.initUnit;
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
