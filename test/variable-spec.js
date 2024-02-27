var Variable = require('../src/expressions').Variable;
var Fraction = require('../src/fractions');

describe("A variable", function() {
    const x = new Variable("x");

    it("is initalized with a variable name", function() {
        expect(x.variable).toEqual("x");
    });

    it("is initialized with a degree of 1", function() {
        expect(x.degree).toEqual(1);
    });

    it("should throw an error if initialized with an integer", function() {
        expect(function(){new Variable(5);}).toThrow(new TypeError("Invalid Argument (5): Variable initalizer must be of type String."));
    });

    it("should throw an error if initialized with a float", function() {
        expect(function(){new Variable(5.1);}).toThrow(new TypeError("Invalid Argument (5.1): Variable initalizer must be of type String."));
    });
});

describe("Variable printing to string", function() {
    it("should print just the variable when the degree is 1", function() {
        const x = new Variable("x");

        expect(x.toString()).toEqual("x");
    });

    it("should print the degree if it's greater than 1", function() {
        const x = new Variable("x");
        x.degree = 2;

        expect(x.toString()).toEqual("x^2");
    });

    it("should print an empty string if the degree is 0", function() {
        const x = new Variable("x");
        x.degree = 0;

        expect(x.toString()).toEqual("");
    });
});

describe("Variable printing to tex", function() {
    it("should print just the variable when the degree is 1", function() {
        const x = new Variable("x");

        expect(x.toTex()).toEqual("x");
    });

    it("should print the degree if it's greater than 1", function() {
        const x = new Variable("x");
        x.degree = 2;

        expect(x.toTex()).toEqual("x^{2}");
    });

    it("should print an empty string if the degree is 0", function() {
        const x = new Variable("x");
        x.degree = 0;
        
        expect(x.toTex()).toEqual("");
    });
});