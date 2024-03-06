/* spellchecker:ignore Bendersky */

/*
  The lexer module is a slightly modified version of the handwritten lexer by Eli Bendersky.
  The parts not needed like comments and quotes were deleted and some things modified.
  Comments are left unchanged, the original lexer can be found here:
  http://eli.thegreenplace.net/2013/07/16/hand-written-lexer-in-javascript-compared-to-the-regex-based-ones
*/

export class Lexer {
  private pos: number
  private buf: string
  private bufferLength: number
  private operatorTable = {
    // Operator table, mapping operator -> token name
    "+": "PLUS",
    "-": "MINUS",
    "*": "MULTIPLY",
    "/": "DIVIDE",
    "^": "POWER",
    "(": "L_PAREN",
    ")": "R_PAREN",
    "=": "EQUALS",
    "<": "LESS_THAN",
    ">": "GREATER_THAN"
  }

  constructor() {
    this.pos = 0
    this.buf = ""
    this.bufferLength = 0
  }

  // Initialize the Lexer's buffer. This resets the lexer's internal
  // state and subsequent tokens will be returned starting with the
  // beginning of the new buffer.
  input(buf) {
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
  token() {
    this.#skipNonTokens()
    if (this.pos >= this.bufferLength) {
      return null
    }

    // The char at this.pos is part of a real token. Figure out which.
    const c = this.buf.charAt(this.pos)
    // Look it up in the table of operators
    const op = this.operatorTable[c]
    if (op !== undefined) {
      if (op === "L_PAREN" || op === "R_PAREN") {
        return { type: "PAREN", value: op, pos: this.pos++ }
      } else if (op === "LESS_THAN" || op === "GREATER_THAN") {
        if (this.buf.charAt(this.pos + 1) === "=") {
          const pos = this.pos
          this.pos += 2
          return { type: "OPERATOR", value: `${op}_EQUALS`, pos }
        } else {
          return { type: "OPERATOR", value: op, pos: this.pos++ }
        }
      } else {
        return { type: "OPERATOR", value: op, pos: this.pos++ }
      }
    } else {
      // Not an operator - so it's the beginning of another token.
      if (Lexer.#isAlpha(c)) {
        return this.#process_identifier()
      } else if (Lexer.#isDigit(c)) {
        return this.#process_number()
      } else {
        throw new SyntaxError(
          "Token error at character " + c + " at position " + this.pos
        )
      }
    }
  }

  static #isDigit(c) {
    return c >= "0" && c <= "9"
  }

  static #isAlpha(c) {
    return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z")
  }

  static #isAlphaNum(c) {
    return (
      (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || (c >= "0" && c <= "9")
    )
  }

  #process_digits(position) {
    let endPosition = position
    while (
      endPosition < this.bufferLength &&
      Lexer.#isDigit(this.buf.charAt(endPosition))
    ) {
      endPosition++
    }
    return endPosition
  }

  #process_number() {
    //Read characters until a non-digit character appears
    let endPosition = this.#process_digits(this.pos)
    //If it's a decimal point, continue to read digits
    if (this.buf.charAt(endPosition) === ".") {
      endPosition = this.#process_digits(endPosition + 1)
    }
    //Check if the last read character is a decimal point.
    //If it is, ignore it and proceed
    if (this.buf.charAt(endPosition - 1) === ".") {
      throw new SyntaxError(
        "Decimal point without decimal digits at position " + (endPosition - 1)
      )
    }
    //construct the NUMBER token
    const tok = {
      type: "NUMBER",
      value: this.buf.substring(this.pos, endPosition),
      pos: this.pos
    }
    this.pos = endPosition
    return tok
  }

  #process_identifier() {
    let endPosition = this.pos + 1
    while (
      endPosition < this.bufferLength &&
      Lexer.#isAlphaNum(this.buf.charAt(endPosition))
    ) {
      endPosition++
    }

    const tok = {
      type: "IDENTIFIER",
      value: this.buf.substring(this.pos, endPosition),
      pos: this.pos
    }
    this.pos = endPosition
    return tok
  }

  #skipNonTokens() {
    while (this.pos < this.bufferLength) {
      const c = this.buf.charAt(this.pos)
      if (c == " " || c == "\t" || c == "\r" || c == "\n") {
        this.pos++
      } else {
        break
      }
    }
  }
}
