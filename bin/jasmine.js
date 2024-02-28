#!/usr/bin/env node

/* global __dirname */

const path = require("path")
// Need to ignore this block to to a false positive: "Redefinition of 'jasmine'."
/* jshint ignore:start */
const Jasmine = require("jasmine")
const reporters = require("jasmine-reporters")

const jasmine = new Jasmine()
/* jshint ignore:end */
jasmine.loadConfigFile("jasmine.json")

const junitReporter = new reporters.JUnitXmlReporter({
  savePath: path.resolve(__dirname, "../.jasmine-results/"),
  consolidateAll: true
})
jasmine.addReporter(junitReporter)

jasmine.execute()
