"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const { input } = req.query;


    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum instanceof Error && initUnit instanceof Error) {
      res.json('invalid number and unit');
      return;
    }

    if (initNum instanceof Error) {
      res.json('invalid number');
      return;
    }

    if (initUnit instanceof Error) {
      res.json('invalid unit');
      return;
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);

    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );


    res.json({
      initNum,
      initUnit: initUnit,
      returnNum,
      returnUnit: returnUnit,
      string,
    });
  });
};
