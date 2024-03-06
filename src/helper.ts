/* spellchecker:ignore varepsilon, vartheta, varrho, varphi */

export function gcd(x, y) {
  while (y) {
    const temp = x
    x = y
    y = temp % y
  }

  return x
}

export function lcm(x, y) {
  return (x * y) / gcd(x, y)
}

export function isInt(thing?) {
  return typeof thing == "number" && thing % 1 === 0
}

export function round(decimal, places = 2) {
  const x = Math.pow(10, places)
  return Math.round(parseFloat(decimal) * x) / x
}

export const GREEK_LETTERS = [
  "alpha",
  "beta",
  "gamma",
  "Gamma",
  "delta",
  "Delta",
  "epsilon",
  "varepsilon",
  "zeta",
  "eta",
  "theta",
  "vartheta",
  "Theta",
  "iota",
  "kappa",
  "lambda",
  "Lambda",
  "mu",
  "nu",
  "xi",
  "Xi",
  "pi",
  "Pi",
  "rho",
  "varrho",
  "sigma",
  "Sigma",
  "tau",
  "upsilon",
  "Upsilon",
  "phi",
  "varphi",
  "Phi",
  "chi",
  "psi",
  "Psi",
  "omega",
  "Omega"
]
