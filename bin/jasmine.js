#!/usr/bin/env node

const path = require("path")
const Jasmine = require("jasmine")
const reporters = require("jasmine-reporters")

const jasmine = new Jasmine()
jasmine.loadConfigFile("jasmine.json")

const junitReporter = new reporters.JUnitXmlReporter({
  savePath: path.resolve(__dirname, "../.jasmine-results/"),
  consolidateAll: true,
})
jasmine.addReporter(junitReporter)

jasmine.execute()
