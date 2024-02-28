"use strict"

/* spellchecker:ignore Bendersky */

/*
  The lexer module is a slightly modified version of the handwritten lexer by Eli Bendersky.
  The parts not needed like comments and quotes were deleted and some things modified.
  Comments are left unchanged, the original lexer can be found here:
  http://eli.thegreenplace.net/2013/07/16/hand-written-lexer-in-javascript-compared-to-the-regex-based-ones
*/

var Lexer = function () {
  this.pos = 0
  this.buf = null
  this.bufferLength = 0

  // Operator table, mapping operator -> token name
  this.operatorTable = {
    "+": "PLUS",
    "-": "MINUS",
    "*": "MULTIPLY",
    "/": "DIVIDE",
    "^": "POWER",
    "(": "L_PAREN",
    ")": "R_PAREN",
    "=": "EQUALS"
  }
}

// Initialize the Lexer's buffer. This resets the lexer's internal
// state and subsequent tokens will be returned starting with the
// beginning of the new buffer.
Lexer.prototype.input = function (buf) {
  this.pos = 0
  this.buf = buf
  this.bufferLength = buf.length
}

// Get the next token from the current buffer. A token is an object with
// the following properties:
// - type: name of the pattern that this token matched (taken from rules).
// - value: actual string value of the token.
// - pos: offset in the current buffer where the token starts.
//
// If there are no more tokens in the buffer, returns null. In case of
// an error throws Error.
Lexer.prototype.token = function () {
  this._skipNonTokens()
  if (this.pos >= this.bufferLength) {
    return null
  }

  // The char at this.pos is part of a real token. Figure out which.
  var c = this.buf.charAt(this.pos)
  // Look it up in the table of operators
  var op = this.operatorTable[c]
  if (op !== undefined) {
    if (op === "L_PAREN" || op === "R_PAREN") {
      return { type: "PAREN", value: op, pos: this.pos++ }
    } else {
      return { type: "OPERATOR", value: op, pos: this.pos++ }
    }
  } else {
    // Not an operator - so it's the beginning of another token.
    if (Lexer._isAlpha(c)) {
      return this._process_identifier()
    } else if (Lexer._isDigit(c)) {
      return this._process_number()
    } else {
      throw new SyntaxError(
        "Token error at character " + c + " at position " + this.pos
      )
    }
  }
}

Lexer._isDigit = function (c) {
  return c >= "0" && c <= "9"
}

Lexer._isAlpha = function (c) {
  return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z")
}

Lexer._isAlphaNum = function (c) {
  return (
    (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || (c >= "0" && c <= "9")
  )
}

Lexer.prototype._process_digits = function (position) {
  var endPosition = position
  while (
    endPosition < this.bufferLength &&
    Lexer._isDigit(this.buf.charAt(endPosition))
  ) {
    endPosition++
  }
  return endPosition
}

Lexer.prototype._process_number = function () {
  //Read characters until a non-digit character appears
  var endPosition = this._process_digits(this.pos)
  //If it's a decimal point, continue to read digits
  if (this.buf.charAt(endPosition) === ".") {
    endPosition = this._process_digits(endPosition + 1)
  }
  //Check if the last read character is a decimal point.
  //If it is, ignore it and proceed
  if (this.buf.charAt(endPosition - 1) === ".") {
    throw new SyntaxError(
      "Decimal point without decimal digits at position " + (endPosition - 1)
    )
  }
  //construct the NUMBER token
  var tok = {
    type: "NUMBER",
    value: this.buf.substring(this.pos, endPosition),
    pos: this.pos
  }
  this.pos = endPosition
  return tok
}

Lexer.prototype._process_identifier = function () {
  var endPosition = this.pos + 1
  while (
    endPosition < this.bufferLength &&
    Lexer._isAlphaNum(this.buf.charAt(endPosition))
  ) {
    endPosition++
  }

  var tok = {
    type: "IDENTIFIER",
    value: this.buf.substring(this.pos, endPosition),
    pos: this.pos
  }
  this.pos = endPosition
  return tok
}

Lexer.prototype._skipNonTokens = function () {
  while (this.pos < this.bufferLength) {
    var c = this.buf.charAt(this.pos)
    if (c == " " || c == "\t" || c == "\r" || c == "\n") {
      this.pos++
    } else {
      break
    }
  }
}

module.exports = Lexer
