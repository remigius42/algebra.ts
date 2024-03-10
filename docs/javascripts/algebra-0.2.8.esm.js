function _assertClassBrand(e, t, n) {
  if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
  throw new TypeError("Private element is not present on this object");
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : String(i);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _classPrivateMethodInitSpec(obj, privateSet) {
  _checkPrivateRedeclaration(obj, privateSet);
  privateSet.add(obj);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$c =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$c = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$b = fails$c;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$b(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});

var fails$a = fails$c;

var functionBindNative = !fails$a(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$2 = functionBindNative;

var call$6 = Function.prototype.call;

var functionCall = NATIVE_BIND$2 ? call$6.bind(call$6) : function () {
  return call$6.apply(call$6, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$2(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$4 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype$2 = Function.prototype;
var call$5 = FunctionPrototype$2.call;
var uncurryThisWithBind = NATIVE_BIND$1 && FunctionPrototype$2.bind.bind(call$5, call$5);

var functionUncurryThis = NATIVE_BIND$1 ? uncurryThisWithBind : function (fn) {
  return function () {
    return call$5.apply(fn, arguments);
  };
};

var uncurryThis$a = functionUncurryThis;

var toString$3 = uncurryThis$a({}.toString);
var stringSlice$1 = uncurryThis$a(''.slice);

var classofRaw$1 = function (it) {
  return stringSlice$1(toString$3(it), 8, -1);
};

var uncurryThis$9 = functionUncurryThis;
var fails$9 = fails$c;
var classof$3 = classofRaw$1;

var $Object$4 = Object;
var split = uncurryThis$9(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$9(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$4('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$3(it) === 'String' ? split(it, '') : $Object$4(it);
} : $Object$4;

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
var isNullOrUndefined$2 = function (it) {
  return it === null || it === undefined;
};

var isNullOrUndefined$1 = isNullOrUndefined$2;

var $TypeError$9 = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$2 = function (it) {
  if (isNullOrUndefined$1(it)) throw new $TypeError$9("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = indexedObject;
var requireObjectCoercible$1 = requireObjectCoercible$2;

var toIndexedObject$5 = function (it) {
  return IndexedObject(requireObjectCoercible$1(it));
};

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var isCallable$f = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};

var isCallable$e = isCallable$f;

var isObject$9 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$e(it);
};

var global$b = global$c;
var isCallable$d = isCallable$f;

var aFunction = function (argument) {
  return isCallable$d(argument) ? argument : undefined;
};

var getBuiltIn$4 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$b[namespace]) : global$b[namespace] && global$b[namespace][method];
};

var uncurryThis$8 = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$8({}.isPrototypeOf);

var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

var global$a = global$c;
var userAgent = engineUserAgent;

var process = global$a.process;
var Deno = global$a.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = engineV8Version;
var fails$8 = fails$c;
var global$9 = global$c;

var $String$5 = global$9.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$8(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String$5(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$1 = symbolConstructorDetection;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var getBuiltIn$3 = getBuiltIn$4;
var isCallable$c = isCallable$f;
var isPrototypeOf$1 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$3 = Object;

var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$3('Symbol');
  return isCallable$c($Symbol) && isPrototypeOf$1($Symbol.prototype, $Object$3(it));
};

var $String$4 = String;

var tryToString$2 = function (argument) {
  try {
    return $String$4(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$b = isCallable$f;
var tryToString$1 = tryToString$2;

var $TypeError$8 = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$2 = function (argument) {
  if (isCallable$b(argument)) return argument;
  throw new $TypeError$8(tryToString$1(argument) + ' is not a function');
};

var aCallable$1 = aCallable$2;
var isNullOrUndefined = isNullOrUndefined$2;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$1 = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable$1(func);
};

var call$4 = functionCall;
var isCallable$a = isCallable$f;
var isObject$8 = isObject$9;

var $TypeError$7 = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$a(fn = input.toString) && !isObject$8(val = call$4(fn, input))) return val;
  if (isCallable$a(fn = input.valueOf) && !isObject$8(val = call$4(fn, input))) return val;
  if (pref !== 'string' && isCallable$a(fn = input.toString) && !isObject$8(val = call$4(fn, input))) return val;
  throw new $TypeError$7("Can't convert object to primitive value");
};

var sharedStore = {exports: {}};

var global$8 = global$c;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$5 = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$5(global$8, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$8[key] = value;
  } return value;
};

var globalThis$1 = global$c;
var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = '__core-js_shared__';
var store$3 = sharedStore.exports = globalThis$1[SHARED] || defineGlobalProperty$2(SHARED, {});

(store$3.versions || (store$3.versions = [])).push({
  version: '3.36.0',
  mode: 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.36.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var sharedStoreExports = sharedStore.exports;

var store$2 = sharedStoreExports;

var shared$3 = function (key, value) {
  return store$2[key] || (store$2[key] = value || {});
};

var requireObjectCoercible = requireObjectCoercible$2;

var $Object$2 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$4 = function (argument) {
  return $Object$2(requireObjectCoercible(argument));
};

var uncurryThis$7 = functionUncurryThis;
var toObject$3 = toObject$4;

var hasOwnProperty = uncurryThis$7({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$3(it), key);
};

var uncurryThis$6 = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$2 = uncurryThis$6(1.0.toString);

var uid$2 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$2(++id + postfix, 36);
};

var global$7 = global$c;
var shared$2 = shared$3;
var hasOwn$9 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var Symbol$1 = global$7.Symbol;
var WellKnownSymbolsStore = shared$2('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$8 = function (name) {
  if (!hasOwn$9(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$9(Symbol$1, name)
      ? Symbol$1[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var call$3 = functionCall;
var isObject$7 = isObject$9;
var isSymbol$1 = isSymbol$2;
var getMethod = getMethod$1;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$7 = wellKnownSymbol$8;

var $TypeError$6 = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$7('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$7(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$3(exoticToPrim, input, pref);
    if (!isObject$7(result) || isSymbol$1(result)) return result;
    throw new $TypeError$6("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$2 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

var global$6 = global$c;
var isObject$6 = isObject$9;

var document$1 = global$6.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$6(document$1) && isObject$6(document$1.createElement);

var documentCreateElement$2 = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};

var DESCRIPTORS$a = descriptors;
var fails$7 = fails$c;
var createElement = documentCreateElement$2;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$a && !fails$7(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});

var DESCRIPTORS$9 = descriptors;
var call$2 = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$3 = createPropertyDescriptor$4;
var toIndexedObject$4 = toIndexedObject$5;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$8 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$9 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$4(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$8(O, P)) return createPropertyDescriptor$3(!call$2(propertyIsEnumerableModule.f, O, P), O[P]);
};

var objectDefineProperty = {};

var DESCRIPTORS$8 = descriptors;
var fails$6 = fails$c;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$8 && fails$6(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});

var isObject$5 = isObject$9;

var $String$3 = String;
var $TypeError$5 = TypeError;

// `Assert: Type(argument) is Object`
var anObject$5 = function (argument) {
  if (isObject$5(argument)) return argument;
  throw new $TypeError$5($String$3(argument) + ' is not an object');
};

var DESCRIPTORS$7 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$4 = anObject$5;
var toPropertyKey = toPropertyKey$2;

var $TypeError$4 = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$7 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$4(O);
  P = toPropertyKey(P);
  anObject$4(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$4(O);
  P = toPropertyKey(P);
  anObject$4(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$4('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$6 = descriptors;
var definePropertyModule$3 = objectDefineProperty;
var createPropertyDescriptor$2 = createPropertyDescriptor$4;

var createNonEnumerableProperty$7 = DESCRIPTORS$6 ? function (object, key, value) {
  return definePropertyModule$3.f(object, key, createPropertyDescriptor$2(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var makeBuiltIn$2 = {exports: {}};

var DESCRIPTORS$5 = descriptors;
var hasOwn$7 = hasOwnProperty_1;

var FunctionPrototype$1 = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$5 && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$7(FunctionPrototype$1, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$5 || (DESCRIPTORS$5 && getDescriptor(FunctionPrototype$1, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var uncurryThis$5 = functionUncurryThis;
var isCallable$9 = isCallable$f;
var store$1 = sharedStoreExports;

var functionToString = uncurryThis$5(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$9(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$1 = store$1.inspectSource;

var global$5 = global$c;
var isCallable$8 = isCallable$f;

var WeakMap$1 = global$5.WeakMap;

var weakMapBasicDetection = isCallable$8(WeakMap$1) && /native code/.test(String(WeakMap$1));

var shared$1 = shared$3;
var uid = uid$2;

var keys = shared$1('keys');

var sharedKey$3 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$4 = {};

var NATIVE_WEAK_MAP = weakMapBasicDetection;
var global$4 = global$c;
var isObject$4 = isObject$9;
var createNonEnumerableProperty$6 = createNonEnumerableProperty$7;
var hasOwn$6 = hasOwnProperty_1;
var shared = sharedStoreExports;
var sharedKey$2 = sharedKey$3;
var hiddenKeys$3 = hiddenKeys$4;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$1 = global$4.TypeError;
var WeakMap = global$4.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$4(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError$1('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey$2('state');
  hiddenKeys$3[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn$6(it, STATE)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$6(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$6(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$6(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var uncurryThis$4 = functionUncurryThis;
var fails$5 = fails$c;
var isCallable$7 = isCallable$f;
var hasOwn$5 = hasOwnProperty_1;
var DESCRIPTORS$4 = descriptors;
var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
var inspectSource = inspectSource$1;
var InternalStateModule$1 = internalState;

var enforceInternalState = InternalStateModule$1.enforce;
var getInternalState$1 = InternalStateModule$1.get;
var $String$2 = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$4 = Object.defineProperty;
var stringSlice = uncurryThis$4(''.slice);
var replace$1 = uncurryThis$4(''.replace);
var join = uncurryThis$4([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS$4 && !fails$5(function () {
  return defineProperty$4(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
  if (stringSlice($String$2(name), 0, 7) === 'Symbol(') {
    name = '[' + replace$1($String$2(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn$5(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
    if (DESCRIPTORS$4) defineProperty$4(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$5(options, 'arity') && value.length !== options.arity) {
    defineProperty$4(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn$5(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS$4) defineProperty$4(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn$5(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return isCallable$7(this) && getInternalState$1(this).source || inspectSource(this);
}, 'toString');

var makeBuiltInExports = makeBuiltIn$2.exports;

var isCallable$6 = isCallable$f;
var definePropertyModule$2 = objectDefineProperty;
var makeBuiltIn = makeBuiltInExports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$3 = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable$6(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule$2.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$2 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$1(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

var toIntegerOrInfinity = toIntegerOrInfinity$2;

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$1 = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength = toLength$1;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$3 = function (obj) {
  return toLength(obj.length);
};

var toIndexedObject$3 = toIndexedObject$5;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike$2 = lengthOfArrayLike$3;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$3($this);
    var length = lengthOfArrayLike$2(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var uncurryThis$3 = functionUncurryThis;
var hasOwn$4 = hasOwnProperty_1;
var toIndexedObject$2 = toIndexedObject$5;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;

var push = uncurryThis$3([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$2(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$4(hiddenKeys$2, key) && hasOwn$4(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$4(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$1);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$2 = getBuiltIn$4;
var uncurryThis$2 = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$3 = anObject$5;

var concat = uncurryThis$2([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$2('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$3(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$3 = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$1 = objectDefineProperty;

var copyConstructorProperties$2 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$1.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$3(target, key) && !(exceptions && hasOwn$3(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$4 = fails$c;
var isCallable$5 = isCallable$f;

var replacement = /#|\.prototype\./;

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable$5(detection) ? fails$4(detection)
    : !!detection;
};

var normalize = isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = 'N';
var POLYFILL = isForced$1.POLYFILL = 'P';

var isForced_1 = isForced$1;

var global$3 = global$c;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$5 = createNonEnumerableProperty$7;
var defineBuiltIn$2 = defineBuiltIn$3;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties$1 = copyConstructorProperties$2;
var isForced = isForced_1;

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$3;
  } else if (STATIC) {
    target = global$3[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = global$3[TARGET] && global$3[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties$1(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$5(sourceProperty, 'sham', true);
    }
    defineBuiltIn$2(target, key, sourceProperty, options);
  }
};

var NATIVE_BIND = functionBindNative;

var FunctionPrototype = Function.prototype;
var apply$1 = FunctionPrototype.apply;
var call$1 = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$1.bind(apply$1) : function () {
  return call$1.apply(apply$1, arguments);
});

var uncurryThis$1 = functionUncurryThis;
var aCallable = aCallable$2;

var functionUncurryThisAccessor = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis$1(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};

var isObject$3 = isObject$9;

var isPossiblePrototype$1 = function (argument) {
  return isObject$3(argument) || argument === null;
};

var isPossiblePrototype = isPossiblePrototype$1;

var $String$1 = String;
var $TypeError$3 = TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (isPossiblePrototype(argument)) return argument;
  throw new $TypeError$3("Can't set " + $String$1(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = functionUncurryThisAccessor;
var anObject$2 = anObject$5;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject$2(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var defineProperty$3 = objectDefineProperty.f;

var proxyAccessor$1 = function (Target, Source, key) {
  key in Target || defineProperty$3(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};

var isCallable$4 = isCallable$f;
var isObject$2 = isObject$9;
var setPrototypeOf$2 = objectSetPrototypeOf;

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf$2 &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable$4(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject$2(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf$2($this, NewTargetPrototype);
  return $this;
};

var wellKnownSymbol$6 = wellKnownSymbol$8;

var TO_STRING_TAG$2 = wellKnownSymbol$6('toStringTag');
var test = {};

test[TO_STRING_TAG$2] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$3 = isCallable$f;
var classofRaw = classofRaw$1;
var wellKnownSymbol$5 = wellKnownSymbol$8;

var TO_STRING_TAG$1 = wellKnownSymbol$5('toStringTag');
var $Object$1 = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$2 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$1)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable$3(O.callee) ? 'Arguments' : result;
};

var classof$1 = classof$2;

var $String = String;

var toString$1 = function (argument) {
  if (classof$1(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};

var toString = toString$1;

var normalizeStringArgument$1 = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};

var isObject$1 = isObject$9;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$7;

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
var installErrorCause$1 = function (O, options) {
  if (isObject$1(options) && 'cause' in options) {
    createNonEnumerableProperty$4(O, 'cause', options.cause);
  }
};

var uncurryThis = functionUncurryThis;

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');
// eslint-disable-next-line redos/no-vulnerable -- safe
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

var errorStackClear = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};

var fails$3 = fails$c;
var createPropertyDescriptor$1 = createPropertyDescriptor$4;

var errorStackInstallable = !fails$3(function () {
  var error = new Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor$1(1, 7));
  return error.stack !== 7;
});

var createNonEnumerableProperty$3 = createNonEnumerableProperty$7;
var clearErrorStack = errorStackClear;
var ERROR_STACK_INSTALLABLE = errorStackInstallable;

// non-standard V8
var captureStackTrace = Error.captureStackTrace;

var errorStackInstall = function (error, C, stack, dropEntries) {
  if (ERROR_STACK_INSTALLABLE) {
    if (captureStackTrace) captureStackTrace(error, C);
    else createNonEnumerableProperty$3(error, 'stack', clearErrorStack(stack, dropEntries));
  }
};

var getBuiltIn$1 = getBuiltIn$4;
var hasOwn$2 = hasOwnProperty_1;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$7;
var isPrototypeOf = objectIsPrototypeOf;
var setPrototypeOf$1 = objectSetPrototypeOf;
var copyConstructorProperties = copyConstructorProperties$2;
var proxyAccessor = proxyAccessor$1;
var inheritIfRequired = inheritIfRequired$1;
var normalizeStringArgument = normalizeStringArgument$1;
var installErrorCause = installErrorCause$1;
var installErrorStack = errorStackInstall;
var DESCRIPTORS$3 = descriptors;

var wrapErrorConstructorWithCause$1 = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn$1.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (hasOwn$2(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn$1('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty$2(result, 'message', message);
    installErrorStack(result, WrappedError, result.stack, 2);
    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf$1) setPrototypeOf$1(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS$3 && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedError, OriginalError);

  try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty$2(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $$3 = _export;
var global$2 = global$c;
var apply = functionApply;
var wrapErrorConstructorWithCause = wrapErrorConstructorWithCause$1;

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = global$2[WEB_ASSEMBLY];

// eslint-disable-next-line es/no-error-cause -- feature detection
var FORCED$2 = new Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED$2);
  $$3({ global: true, constructor: true, arity: 1, forced: FORCED$2 }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED$2);
    $$3({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED$2 }, O);
  }
};

// https://tc39.es/ecma262/#sec-nativeerror
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply(init, this, arguments); };
});

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement$1 = documentCreateElement$2;

var classList = documentCreateElement$1('span').classList;
var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

var objectDefineProperties = {};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$1 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$2 = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule = objectDefineProperty;
var anObject$1 = anObject$5;
var toIndexedObject$1 = toIndexedObject$5;
var objectKeys = objectKeys$1;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
objectDefineProperties.f = DESCRIPTORS$2 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$1(O);
  var props = toIndexedObject$1(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};

var getBuiltIn = getBuiltIn$4;

var html$1 = getBuiltIn('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */
var anObject = anObject$5;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html = html$1;
var documentCreateElement = documentCreateElement$2;
var sharedKey$1 = sharedKey$3;

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$1('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

var wellKnownSymbol$4 = wellKnownSymbol$8;
var create$1 = objectCreate;
var defineProperty$2 = objectDefineProperty.f;

var UNSCOPABLES = wellKnownSymbol$4('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] === undefined) {
  defineProperty$2(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create$1(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$2 = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var iterators = {};

var fails$2 = fails$c;

var correctPrototypeGetter = !fails$2(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var hasOwn$1 = hasOwnProperty_1;
var isCallable$2 = isCallable$f;
var toObject$2 = toObject$4;
var sharedKey = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject$2(O);
  if (hasOwn$1(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable$2(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};

var fails$1 = fails$c;
var isCallable$1 = isCallable$f;
var isObject = isObject$9;
var getPrototypeOf$1 = objectGetPrototypeOf;
var defineBuiltIn$1 = defineBuiltIn$3;
var wellKnownSymbol$3 = wellKnownSymbol$8;

var ITERATOR$2 = wellKnownSymbol$3('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype$2) || fails$1(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype$2[ITERATOR$2].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable$1(IteratorPrototype$2[ITERATOR$2])) {
  defineBuiltIn$1(IteratorPrototype$2, ITERATOR$2, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var defineProperty$1 = objectDefineProperty.f;
var hasOwn = hasOwnProperty_1;
var wellKnownSymbol$2 = wellKnownSymbol$8;

var TO_STRING_TAG = wellKnownSymbol$2('toStringTag');

var setToStringTag$3 = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn(target, TO_STRING_TAG)) {
    defineProperty$1(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create = objectCreate;
var createPropertyDescriptor = createPropertyDescriptor$4;
var setToStringTag$2 = setToStringTag$3;
var Iterators$2 = iterators;

var returnThis$1 = function () { return this; };

var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype$1, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
  Iterators$2[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var $$2 = _export;
var call = functionCall;
var FunctionName = functionName;
var isCallable = isCallable$f;
var createIteratorConstructor = iteratorCreateConstructor;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag$1 = setToStringTag$3;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$7;
var defineBuiltIn = defineBuiltIn$3;
var wellKnownSymbol$1 = wellKnownSymbol$8;
var Iterators$1 = iterators;
var IteratorsCore = iteratorsCore;

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol$1('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    }

    return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR$1])) {
          defineBuiltIn(CurrentIteratorPrototype, ITERATOR$1, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$1(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
      }
    } else $$2({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
    defineBuiltIn(IterablePrototype, ITERATOR$1, defaultIterator, { name: DEFAULT });
  }
  Iterators$1[NAME] = defaultIterator;

  return methods;
};

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
var createIterResultObject$1 = function (value, done) {
  return { value: value, done: done };
};

var toIndexedObject = toIndexedObject$5;
var addToUnscopables$1 = addToUnscopables$2;
var Iterators = iterators;
var InternalStateModule = internalState;
var defineProperty = objectDefineProperty.f;
var defineIterator = iteratorDefine;
var createIterResultObject = createIterResultObject$1;
var DESCRIPTORS$1 = descriptors;

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return createIterResultObject(undefined, true);
  }
  switch (state.kind) {
    case 'keys': return createIterResultObject(index, false);
    case 'values': return createIterResultObject(target[index], false);
  } return createIterResultObject([index, target[index]], false);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables$1('keys');
addToUnscopables$1('values');
addToUnscopables$1('entries');

// V8 ~ Chrome 45- bug
if (DESCRIPTORS$1 && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }

var global$1 = global$c;
var DOMIterables = domIterables;
var DOMTokenListPrototype = domTokenListPrototype;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty = createNonEnumerableProperty$7;
var setToStringTag = setToStringTag$3;
var wellKnownSymbol = wellKnownSymbol$8;

var ITERATOR = wellKnownSymbol('iterator');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    setToStringTag(CollectionPrototype, COLLECTION_NAME, true);
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global$1[COLLECTION_NAME] && global$1[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

var classof = classofRaw$1;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$1 = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};

var DESCRIPTORS = descriptors;
var isArray = isArray$1;

var $TypeError$2 = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw new $TypeError$2('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};

var $TypeError$1 = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

var doesNotExceedSafeInteger$2 = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError$1('Maximum allowed index exceeded');
  return it;
};

var $$1 = _export;
var toObject$1 = toObject$4;
var lengthOfArrayLike$1 = lengthOfArrayLike$3;
var setArrayLength$1 = arraySetLength;
var doesNotExceedSafeInteger$1 = doesNotExceedSafeInteger$2;
var fails = fails$c;

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength$1 = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED$1 = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength$1();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$$1({ target: 'Array', proto: true, arity: 1, forced: FORCED$1 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject$1(this);
    var len = lengthOfArrayLike$1(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger$1(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength$1(O, len);
    return len;
  }
});

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = addToUnscopables$2;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('flatMap');

var tryToString = tryToString$2;

var $TypeError = TypeError;

var deletePropertyOrThrow$1 = function (O, P) {
  if (!delete O[P]) throw new $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
};

var $ = _export;
var toObject = toObject$4;
var lengthOfArrayLike = lengthOfArrayLike$3;
var setArrayLength = arraySetLength;
var deletePropertyOrThrow = deletePropertyOrThrow$1;
var doesNotExceedSafeInteger = doesNotExceedSafeInteger$2;

// IE8-
var INCORRECT_RESULT = [].unshift(0) !== 1;

// V8 ~ Chrome < 71 and Safari <= 15.4, FF < 23 throws InternalError
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).unshift();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_RESULT || !properErrorOnNonWritableLength();

// `Array.prototype.unshift` method
// https://tc39.es/ecma262/#sec-array.prototype.unshift
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  unshift: function unshift(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    if (argCount) {
      doesNotExceedSafeInteger(len + argCount);
      var k = len;
      while (k--) {
        var to = k + argCount;
        if (k in O) O[to] = O[k];
        else deletePropertyOrThrow(O, to);
      }
      for (var j = 0; j < argCount; j++) {
        O[j] = arguments[j];
      }
    } return setArrayLength(O, len + argCount);
  }
});

/* spellchecker:ignore varepsilon, vartheta, varrho, varphi */
function gcd(x, y) {
  while (y) {
    const temp = x;
    x = y;
    y = temp % y;
  }
  return x;
}
function lcm(x, y) {
  return x * y / gcd(x, y);
}
function isInt(thing) {
  return typeof thing == "number" && thing % 1 === 0;
}
const GREEK_LETTERS = ["alpha", "beta", "gamma", "Gamma", "delta", "Delta", "epsilon", "varepsilon", "zeta", "eta", "theta", "vartheta", "Theta", "iota", "kappa", "lambda", "Lambda", "mu", "nu", "xi", "Xi", "pi", "Pi", "rho", "varrho", "sigma", "Sigma", "tau", "upsilon", "Upsilon", "phi", "varphi", "Phi", "chi", "psi", "Psi", "omega", "Omega"];

class Fraction {
  constructor(a, b) {
    _defineProperty(this, "numer", void 0);
    _defineProperty(this, "denom", void 0);
    if (b === 0) {
      throw new EvalError("Divide By Zero");
    } else if (isInt(a) && isInt(b)) {
      this.numer = a;
      this.denom = b;
    } else {
      throw new TypeError("Invalid Argument (" + a.toString() + "," + b.toString() + "): Divisor and dividend must be of type Integer.");
    }
  }
  copy() {
    return new Fraction(this.numer, this.denom);
  }
  reduce() {
    const copy = this.copy();
    const g = gcd(copy.numer, copy.denom);
    copy.numer = copy.numer / g;
    copy.denom = copy.denom / g;
    if (Math.sign(copy.denom) == -1 && Math.sign(copy.numer) == 1) {
      copy.numer *= -1;
      copy.denom *= -1;
    }
    return copy;
  }
  equalTo(fraction) {
    if (fraction instanceof Fraction) {
      const thisReduced = this.reduce();
      const thatReduced = fraction.reduce();
      return thisReduced.numer === thatReduced.numer && thisReduced.denom === thatReduced.denom;
    } else {
      return false;
    }
  }
  add(f) {
    let simplify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let a, b;
    if (f instanceof Fraction) {
      a = f.numer;
      b = f.denom;
    } else if (typeof f === "number" && isInt(f)) {
      a = f;
      b = 1;
    } else {
      throw new TypeError("Invalid Argument (" + String(f) + "): Summand must be of type Fraction or Integer.");
    }
    const copy = this.copy();
    if (this.denom == b) {
      copy.numer += a;
    } else {
      const m = lcm(copy.denom, b);
      const thisM = m / copy.denom;
      const otherM = m / b;
      copy.numer *= thisM;
      copy.denom *= thisM;
      a *= otherM;
      copy.numer += a;
    }
    return simplify ? copy.reduce() : copy;
  }
  subtract(f) {
    let simplify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const copy = this.copy();
    if (f instanceof Fraction) {
      return copy.add(new Fraction(-f.numer, f.denom), simplify);
    } else if (typeof f === "number" && isInt(f)) {
      return copy.add(new Fraction(-f, 1), simplify);
    } else {
      throw new TypeError("Invalid Argument (" + String(f) + "): Subtrahend must be of type Fraction or Integer.");
    }
  }
  multiply(f) {
    let simplify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let a, b;
    if (f instanceof Fraction) {
      a = f.numer;
      b = f.denom;
    } else if (typeof f === "number" && isInt(f) && f !== 0) {
      a = f;
      b = 1;
    } else if (f === 0) {
      a = 0;
      b = 1;
    } else {
      throw new TypeError("Invalid Argument (" + String(f) + "): Multiplicand must be of type Fraction or Integer.");
    }
    const copy = this.copy();
    copy.numer *= a;
    copy.denom *= b;
    return simplify ? copy.reduce() : copy;
  }
  divide(f) {
    let simplify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (f === 0 || f instanceof Fraction && f.valueOf() === 0) {
      throw new EvalError("Divide By Zero");
    }
    const copy = this.copy();
    if (f instanceof Fraction) {
      return copy.multiply(new Fraction(f.denom, f.numer), simplify);
    } else if (typeof f === "number" && isInt(f)) {
      return copy.multiply(new Fraction(1, f), simplify);
    } else {
      throw new TypeError("Invalid Argument (" + String(f) + "): Divisor must be of type Fraction or Integer.");
    }
  }
  pow(n) {
    let simplify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let copy = this.copy();
    if (n >= 0) {
      copy.numer = Math.pow(copy.numer, n);
      copy.denom = Math.pow(copy.denom, n);
    } else if (n < 0) {
      copy = copy.pow(Math.abs(n));
      //Switch numerator and denominator
      const tmp = copy.numer;
      copy.numer = copy.denom;
      copy.denom = tmp;
    }
    return simplify ? copy.reduce() : copy;
  }
  abs() {
    const copy = this.copy();
    copy.numer = Math.abs(copy.numer);
    copy.denom = Math.abs(copy.denom);
    return copy;
  }
  valueOf() {
    return this.numer / this.denom;
  }
  toString() {
    if (this.numer === 0) {
      return "0";
    } else if (this.denom === 1) {
      return this.numer.toString();
    } else if (this.denom === -1) {
      return (-this.numer).toString();
    } else {
      return this.numer + "/" + this.denom;
    }
  }
  toTex() {
    if (this.numer === 0) {
      return "0";
    } else if (this.denom === 1) {
      return this.numer.toString();
    } else if (this.denom === -1) {
      return (-this.numer).toString();
    } else {
      return "\\frac{" + this.numer + "}{" + this.denom + "}";
    }
  }
  squareRootIsRational() {
    if (this.valueOf() === 0) {
      return true;
    }
    const sqrtNumer = Math.sqrt(this.numer);
    const sqrtDenom = Math.sqrt(this.denom);
    return isInt(sqrtNumer) && isInt(sqrtDenom);
  }
  cubeRootIsRational() {
    if (this.valueOf() === 0) {
      return true;
    }
    const cbrtNumer = Math.cbrt(this.numer);
    const cbrtDenom = Math.cbrt(this.denom);
    return isInt(cbrtNumer) && isInt(cbrtDenom);
  }
}

class Variable {
  constructor(variable) {
    _defineProperty(this, "variable", void 0);
    _defineProperty(this, "degree", void 0);
    if (typeof variable === "string") {
      this.variable = variable;
      this.degree = 1;
    } else {
      throw new TypeError("Invalid Argument (" + String(variable) + "): Variable initializer must be of type String.");
    }
  }
  copy() {
    const copy = new Variable(this.variable);
    copy.degree = this.degree;
    return copy;
  }
  toString() {
    const degree = this.degree;
    const variable = this.variable;
    if (degree === 0) {
      return "";
    } else if (degree === 1) {
      return variable;
    } else {
      return variable + "^" + degree;
    }
  }
  toTex() {
    const degree = this.degree;
    let variable = this.variable;
    if (GREEK_LETTERS.indexOf(variable) > -1) {
      variable = "\\" + variable;
    }
    if (degree === 0) {
      return "";
    } else if (degree === 1) {
      return variable;
    } else {
      return variable + "^{" + degree + "}";
    }
  }
}

var _Expression_brand = /*#__PURE__*/new WeakSet();
class Expression {
  constructor(variable) {
    _classPrivateMethodInitSpec(this, _Expression_brand);
    _defineProperty(this, "constants", void 0);
    _defineProperty(this, "terms", void 0);
    this.constants = [];
    if (typeof variable === "string") {
      const v = new Variable(variable);
      const t = new Term(v);
      this.terms = [t];
    } else if (typeof variable === "number" && isInt(variable)) {
      this.constants = [new Fraction(variable, 1)];
      this.terms = [];
    } else if (variable instanceof Fraction) {
      this.constants = [variable];
      this.terms = [];
    } else if (variable instanceof Term) {
      this.terms = [variable];
    } else if (typeof variable === "undefined") {
      this.terms = [];
    } else {
      throw new TypeError("Invalid Argument (" + String(variable) + "): Argument must be of type String, Integer, Fraction or Term.");
    }
  }
  get variableNames() {
    return [...new Set(this.terms.flatMap(t => t.variableNames))].sort();
  }
  constant() {
    return this.constants.reduce(function (p, c) {
      return p.add(c);
    }, new Fraction(0, 1));
  }
  simplify() {
    const copy = this.copy();
    //simplify all terms
    copy.terms = copy.terms.map(function (t) {
      return t.simplify();
    });
    copy.sort();
    _assertClassBrand(_Expression_brand, copy, _combineLikeTerms).call(copy);
    _assertClassBrand(_Expression_brand, copy, _moveTermsWithDegreeZeroToConstants).call(copy);
    _assertClassBrand(_Expression_brand, copy, _removeTermsWithCoefficientZero).call(copy);
    copy.constants = copy.constant().valueOf() === 0 ? [] : [copy.constant()];
    return copy;
  }
  copy() {
    const copy = new Expression();
    //copy all constants
    copy.constants = this.constants.map(function (c) {
      return c.copy();
    });
    //copy all terms
    copy.terms = this.terms.map(function (t) {
      return t.copy();
    });
    return copy;
  }
  add(a) {
    let simplify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const thisExp = this.copy();
    if (typeof a === "string" || a instanceof Term || isInt(a) || a instanceof Fraction) {
      const exp = new Expression(a);
      return thisExp.add(exp, simplify);
    } else if (a instanceof Expression) {
      const keepTerms = a.copy().terms;
      thisExp.terms = thisExp.terms.concat(keepTerms);
      thisExp.constants = thisExp.constants.concat(a.constants);
      thisExp.sort();
    } else {
      throw new TypeError("Invalid Argument (" + String(a) + "): Summand must be of type String, Expression, Term, Fraction or Integer.");
    }
    return simplify ? thisExp.simplify() : thisExp;
  }
  subtract(a) {
    let simplify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const negative = a instanceof Expression ? a.multiply(-1) : new Expression(a).multiply(-1);
    return this.add(negative, simplify);
  }
  multiply(a) {
    let simplify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const thisExp = this.copy();
    if (typeof a === "string" || a instanceof Term || isInt(a) || a instanceof Fraction) {
      const exp = new Expression(a);
      return thisExp.multiply(exp, simplify);
    } else if (a instanceof Expression) {
      const thatExp = a.copy();
      const newTerms = [];
      for (let i = 0; i < thisExp.terms.length; i++) {
        const thisTerm = thisExp.terms[i];
        for (let j = 0; j < thatExp.terms.length; j++) {
          const thatTerm = thatExp.terms[j];
          newTerms.push(thisTerm.multiply(thatTerm, simplify));
        }
        for (let j = 0; j < thatExp.constants.length; j++) {
          newTerms.push(thisTerm.multiply(thatExp.constants[j], simplify));
        }
      }
      for (let i = 0; i < thatExp.terms.length; i++) {
        const thatTerm = thatExp.terms[i];
        for (let j = 0; j < thisExp.constants.length; j++) {
          newTerms.push(thatTerm.multiply(thisExp.constants[j], simplify));
        }
      }
      const newConstants = [];
      for (let i = 0; i < thisExp.constants.length; i++) {
        const thisConst = thisExp.constants[i];
        for (let j = 0; j < thatExp.constants.length; j++) {
          const thatConst = thatExp.constants[j];
          let t = new Term();
          t = t.multiply(thatConst, false);
          t = t.multiply(thisConst, false);
          newTerms.push(t);
        }
      }
      thisExp.constants = newConstants;
      thisExp.terms = newTerms;
      thisExp.sort();
    } else {
      throw new TypeError("Invalid Argument (" + String(a) + "): Multiplicand must be of type String, Expression, Term, Fraction or Integer.");
    }
    return simplify ? thisExp.simplify() : thisExp;
  }
  divide(a) {
    let simplify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (a instanceof Fraction || typeof a === "number" && isInt(a)) {
      if (a === 0 || a.valueOf() === 0) {
        throw new EvalError("Divide By Zero");
      }
      const copy = this.copy();
      for (let i = 0; i < copy.terms.length; i++) {
        const thisTerm = copy.terms[i];
        for (let j = 0; j < thisTerm.coefficients.length; j++) {
          thisTerm.coefficients[j] = thisTerm.coefficients[j].divide(a, simplify);
        }
      }
      //divide every constant by a
      copy.constants = copy.constants.map(function (c) {
        return c.divide(a, simplify);
      });
      return copy;
    } else if (a instanceof Expression) {
      //Simplify both expressions
      let num = this.copy().simplify();
      const denom = a.copy().simplify();
      //Total amount of terms and constants
      const numTotal = num.terms.length + num.constants.length;
      const denomTotal = denom.terms.length + denom.constants.length;
      //Check if both terms are monomial
      if (numTotal === 1 && denomTotal === 1) {
        //Divide coefficients
        const numCoef = num.terms[0].coefficients[0];
        const denomCoef = denom.terms[0].coefficients[0];
        //The expressions have just been simplified - only one coefficient per term
        num.terms[0].coefficients[0] = numCoef.divide(denomCoef, simplify);
        denom.terms[0].coefficients[0] = new Fraction(1, 1);
        //Cancel variables
        for (let i = 0; i < num.terms[0].variables.length; i++) {
          const numVar = num.terms[0].variables[i];
          for (let j = 0; j < denom.terms[0].variables.length; j++) {
            const denomVar = denom.terms[0].variables[j];
            //Check for equal variables
            if (numVar.variable === denomVar.variable) {
              //Use the rule for division of powers
              num.terms[0].variables[i].degree = numVar.degree - denomVar.degree;
              denom.terms[0].variables[j].degree = 0;
            }
          }
        }
        //Invert all degrees of remaining variables
        for (let i = 0; i < denom.terms[0].variables.length; i++) {
          denom.terms[0].variables[i].degree *= -1;
        }
        //Multiply the inverted variables to the numerator
        num = num.multiply(denom, simplify);
        return num;
      } else {
        throw new TypeError("Invalid Argument ((" + num.toString() + ")/(" + denom.toString() + ")): Only monomial expressions can be divided.");
      }
    } else {
      throw new TypeError("Invalid Argument (" + String(a) + "): Divisor must be of type Fraction or Integer.");
    }
  }
  pow(a) {
    let simplify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (typeof a === "number" && isInt(a)) {
      let copy = this.copy();
      if (a === 0) {
        return new Expression().add(1);
      } else {
        for (let i = 1; i < a; i++) {
          copy = copy.multiply(this, simplify);
        }
        copy.sort();
      }
      return simplify ? copy.simplify() : copy;
    } else {
      throw new TypeError("Invalid Argument (" + String(a) + "): Exponent must be of type Integer.");
    }
  }
  eval(values) {
    let simplify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let exp = new Expression();
    exp.constants = simplify ? [this.constant()] : this.constants.slice();
    //add all evaluated terms of this to exp
    exp = this.terms.reduce(function (p, c) {
      return p.add(c.eval(values, simplify), simplify);
    }, exp);
    return exp;
  }
  summation(variable, lower, upper) {
    let simplify = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    const thisExpr = this.copy();
    let newExpr = new Expression();
    for (let i = lower; i < upper + 1; i++) {
      const sub = {};
      sub[variable] = i;
      newExpr = newExpr.add(thisExpr.eval(sub, simplify), simplify);
    }
    return newExpr;
  }
  toString() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      implicit: false
    };
    let str = "";
    for (let i = 0; i < this.terms.length; i++) {
      const term = this.terms[i];
      str += (term.coefficients[0].valueOf() < 0 ? " - " : " + ") + term.toString(options);
    }
    for (let i = 0; i < this.constants.length; i++) {
      const constant = this.constants[i];
      str += (constant.valueOf() < 0 ? " - " : " + ") + constant.abs().toString();
    }
    if (str.substring(0, 3) === " - ") {
      return "-" + str.substring(3, str.length);
    } else if (str.substring(0, 3) === " + ") {
      return str.substring(3, str.length);
    } else {
      return "0";
    }
  }
  toTex() {
    let dict = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      multiplication: "cdot"
    };
    let str = "";
    for (let i = 0; i < this.terms.length; i++) {
      const term = this.terms[i];
      str += (term.coefficients[0].valueOf() < 0 ? " - " : " + ") + term.toTex(dict);
    }
    for (let i = 0; i < this.constants.length; i++) {
      const constant = this.constants[i];
      str += (constant.valueOf() < 0 ? " - " : " + ") + constant.abs().toTex();
    }
    if (str.substring(0, 3) === " - ") {
      return "-" + str.substring(3, str.length);
    } else if (str.substring(0, 3) === " + ") {
      return str.substring(3, str.length);
    } else {
      return "0";
    }
  }
  sort() {
    function sortTerms(a, b) {
      const x = a.maxDegree();
      const y = b.maxDegree();
      if (x === y) {
        const m = a.variables.length;
        const n = b.variables.length;
        return n - m;
      } else {
        return y - x;
      }
    }
    this.terms = this.terms.sort(sortTerms);
    return this;
  }
  hasVariable(variable) {
    for (let i = 0; i < this.terms.length; i++) {
      if (this.terms[i].hasVariable(variable)) {
        return true;
      }
    }
    return false;
  }
  onlyHasVariable(variable) {
    for (let i = 0; i < this.terms.length; i++) {
      if (!this.terms[i].onlyHasVariable(variable)) {
        return false;
      }
    }
    return true;
  }
  noCrossProductsWithVariable(variable) {
    for (let i = 0; i < this.terms.length; i++) {
      const term = this.terms[i];
      if (term.hasVariable(variable) && !term.onlyHasVariable(variable)) {
        return false;
      }
    }
    return true;
  }
  noCrossProducts() {
    for (let i = 0; i < this.terms.length; i++) {
      const term = this.terms[i];
      if (term.variables.length > 1) {
        return false;
      }
    }
    return true;
  }
  maxDegree() {
    return this.terms.reduce(function (p, c) {
      return Math.max(p, c.maxDegree());
    }, 0);
  }
  maxDegreeOfVariable(variable) {
    return this.terms.reduce(function (p, c) {
      return Math.max(p, c.maxDegreeOfVariable(variable));
    }, 0);
  }
  quadraticCoefficients() {
    // This function isn't used until everything has been moved to the LHS in Equation.solve.
    let a = new Fraction(0, 1);
    let b = new Fraction(0, 1);
    for (let i = 0; i < this.terms.length; i++) {
      const thisTerm = this.terms[i];
      a = thisTerm.maxDegree() === 2 ? thisTerm.coefficient().copy() : a;
      b = thisTerm.maxDegree() === 1 ? thisTerm.coefficient().copy() : b;
    }
    const c = this.constant();
    return {
      a,
      b,
      c
    };
  }
  cubicCoefficients() {
    // This function isn't used until everything has been moved to the LHS in Equation.solve.
    let a = new Fraction(0, 1);
    let b = new Fraction(0, 1);
    let c = new Fraction(0, 1);
    for (let i = 0; i < this.terms.length; i++) {
      const thisTerm = this.terms[i];
      a = thisTerm.maxDegree() === 3 ? thisTerm.coefficient().copy() : a;
      b = thisTerm.maxDegree() === 2 ? thisTerm.coefficient().copy() : b;
      c = thisTerm.maxDegree() === 1 ? thisTerm.coefficient().copy() : c;
    }
    const d = this.constant();
    return {
      a,
      b,
      c,
      d
    };
  }
}
function _removeTermsWithCoefficientZero() {
  this.terms = this.terms.filter(function (t) {
    return t.coefficient().reduce().numer !== 0;
  });
  return this;
}
function _combineLikeTerms() {
  function alreadyEncountered(term, encountered) {
    for (let i = 0; i < encountered.length; i++) {
      if (term.canBeCombinedWith(encountered[i])) {
        return true;
      }
    }
    return false;
  }
  const newTerms = [];
  const encountered = [];
  for (let i = 0; i < this.terms.length; i++) {
    let thisTerm = this.terms[i];
    if (alreadyEncountered(thisTerm, encountered)) {
      continue;
    } else {
      for (let j = i + 1; j < this.terms.length; j++) {
        const thatTerm = this.terms[j];
        if (thisTerm.canBeCombinedWith(thatTerm)) {
          thisTerm = thisTerm.add(thatTerm);
        }
      }
      newTerms.push(thisTerm);
      encountered.push(thisTerm);
    }
  }
  this.terms = newTerms;
  return this;
}
function _moveTermsWithDegreeZeroToConstants() {
  const keepTerms = [];
  let constant = new Fraction(0, 1);
  for (let i = 0; i < this.terms.length; i++) {
    const thisTerm = this.terms[i];
    if (thisTerm.variables.length === 0) {
      constant = constant.add(thisTerm.coefficient());
    } else {
      keepTerms.push(thisTerm);
    }
  }
  this.constants.push(constant);
  this.terms = keepTerms;
  return this;
}
class Term {
  constructor(variable) {
    _defineProperty(this, "coefficients", void 0);
    _defineProperty(this, "variables", void 0);
    if (variable instanceof Variable) {
      this.variables = [variable.copy()];
    } else if (typeof variable === "undefined") {
      this.variables = [];
    } else {
      throw new TypeError("Invalid Argument (" + String(variable) + "): Term initializer must be of type Variable.");
    }
    this.coefficients = [new Fraction(1, 1)];
  }
  coefficient() {
    //calculate the product of all coefficients
    return this.coefficients.reduce(function (p, c) {
      return p.multiply(c);
    }, new Fraction(1, 1));
  }
  get variableNames() {
    return [...new Set(this.variables.map(v => v.variable))].sort();
  }
  simplify() {
    const copy = this.copy();
    copy.coefficients = [this.coefficient()];
    copy.combineVars();
    return copy.sort();
  }
  combineVars() {
    const uniqueVars = {};
    for (let i = 0; i < this.variables.length; i++) {
      const thisVar = this.variables[i];
      if (thisVar.variable in uniqueVars) {
        uniqueVars[thisVar.variable] += thisVar.degree;
      } else {
        uniqueVars[thisVar.variable] = thisVar.degree;
      }
    }
    const newVars = [];
    for (const v in uniqueVars) {
      const newVar = new Variable(v);
      newVar.degree = uniqueVars[v];
      newVars.push(newVar);
    }
    this.variables = newVars;
    return this;
  }
  copy() {
    const copy = new Term();
    copy.coefficients = this.coefficients.map(function (c) {
      return c.copy();
    });
    copy.variables = this.variables.map(function (v) {
      return v.copy();
    });
    return copy;
  }
  add(term) {
    if (term instanceof Term && this.canBeCombinedWith(term)) {
      const copy = this.copy();
      copy.coefficients = [copy.coefficient().add(term.coefficient())];
      return copy;
    } else {
      throw new TypeError("Invalid Argument (" + String(term) + "): Summand must be of type String, Expression, Term, Fraction or Integer.");
    }
  }
  subtract(term) {
    if (term instanceof Term && this.canBeCombinedWith(term)) {
      const copy = this.copy();
      copy.coefficients = [copy.coefficient().subtract(term.coefficient())];
      return copy;
    } else {
      throw new TypeError("Invalid Argument (" + String(term) + "): Subtrahend must be of type String, Expression, Term, Fraction or Integer.");
    }
  }
  multiply(a) {
    let simplify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const thisTerm = this.copy();
    if (a instanceof Term) {
      thisTerm.variables = thisTerm.variables.concat(a.variables);
      thisTerm.coefficients = a.coefficients.concat(thisTerm.coefficients);
    } else if (typeof a === "number" && isInt(a) || a instanceof Fraction) {
      const newCoef = typeof a === "number" ? new Fraction(a, 1) : a;
      if (thisTerm.variables.length === 0) {
        thisTerm.coefficients.push(newCoef);
      } else {
        thisTerm.coefficients.unshift(newCoef);
      }
    } else {
      throw new TypeError("Invalid Argument (" + String(a) + "): Multiplicand must be of type String, Expression, Term, Fraction or Integer.");
    }
    return simplify || simplify === undefined ? thisTerm.simplify() : thisTerm;
  }
  divide(a) {
    let simplify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (isInt(a) || a instanceof Fraction) {
      const thisTerm = this.copy();
      thisTerm.coefficients = thisTerm.coefficients.map(function (c) {
        return c.divide(a, simplify);
      });
      return thisTerm;
    } else {
      throw new TypeError("Invalid Argument (" + String(a) + "): Argument must be of type Fraction or Integer.");
    }
  }
  eval(values) {
    let simplify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const copy = this.copy();
    let exp = copy.coefficients.reduce(function (p, c) {
      return p.multiply(c, simplify);
    }, new Expression(1));
    for (let i = 0; i < copy.variables.length; i++) {
      const thisVar = copy.variables[i];
      let ev;
      if (thisVar.variable in values) {
        const sub = values[thisVar.variable];
        if (sub instanceof Expression) {
          ev = sub.pow(thisVar.degree);
        } else if (sub instanceof Fraction) {
          ev = new Expression(sub.pow(thisVar.degree));
        } else if (isInt(sub)) {
          ev = new Expression(Math.pow(sub, thisVar.degree));
        } else {
          throw new TypeError("Invalid Argument (" + sub + "): Can only evaluate Expressions or Fractions.");
        }
      } else {
        ev = new Expression(thisVar.variable).pow(thisVar.degree);
      }
      exp = exp.multiply(ev, simplify);
    }
    return exp;
  }
  hasVariable(variable) {
    for (let i = 0; i < this.variables.length; i++) {
      if (this.variables[i].variable === variable) {
        return true;
      }
    }
    return false;
  }
  maxDegree() {
    return this.variables.reduce(function (p, c) {
      return Math.max(p, c.degree);
    }, 0);
  }
  maxDegreeOfVariable(variable) {
    return this.variables.reduce(function (p, c) {
      return c.variable === variable ? Math.max(p, c.degree) : p;
    }, 0);
  }
  canBeCombinedWith(term) {
    const thisVars = this.variables;
    const thatVars = term.variables;
    if (thisVars.length != thatVars.length) {
      return false;
    }
    let matches = 0;
    for (let i = 0; i < thisVars.length; i++) {
      for (let j = 0; j < thatVars.length; j++) {
        if (thisVars[i].variable === thatVars[j].variable && thisVars[i].degree === thatVars[j].degree) {
          matches += 1;
        }
      }
    }
    return matches === thisVars.length;
  }
  onlyHasVariable(variable) {
    for (let i = 0; i < this.variables.length; i++) {
      if (this.variables[i].variable != variable) {
        return false;
      }
    }
    return true;
  }
  sort() {
    function sortVars(a, b) {
      return b.degree - a.degree;
    }
    this.variables = this.variables.sort(sortVars);
    return this;
  }
  toString() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      implicit: false
    };
    const implicit = options && options.implicit;
    let str = "";
    for (let i = 0; i < this.coefficients.length; i++) {
      const coef = this.coefficients[i];
      if (coef.abs().numer !== 1 || coef.abs().denom !== 1) {
        str += " * " + coef.toString();
      }
    }
    str = this.variables.reduce(function (p, c) {
      if (implicit && !!p) {
        const vStr = c.toString();
        return vStr ? p + "*" + vStr : p;
      } else return p.concat(c.toString());
    }, str);
    str = str.substring(0, 3) === " * " ? str.substring(3, str.length) : str;
    str = str.substring(0, 1) === "-" ? str.substring(1, str.length) : str;
    return str;
  }
  toTex() {
    let dict = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      multiplication: "cdot"
    };
    const op = " \\" + dict.multiplication + " ";
    let str = "";
    for (let i = 0; i < this.coefficients.length; i++) {
      const coef = this.coefficients[i];
      if (coef.abs().numer !== 1 || coef.abs().denom !== 1) {
        str += op + coef.toTex();
      }
    }
    str = this.variables.reduce(function (p, c) {
      return p.concat(c.toTex());
    }, str);
    str = str.substring(0, op.length) === op ? str.substring(op.length, str.length) : str;
    str = str.substring(0, 1) === "-" ? str.substring(1, str.length) : str;
    str = str.substring(0, 7) === "\\frac{-" ? "\\frac{" + str.substring(7, str.length) : str;
    return str;
  }
}

const ROOT_PRECISION = 10e-15;
var _Equation_brand = /*#__PURE__*/new WeakSet();
class Equation {
  constructor(lhs, rhs) {
    _classPrivateMethodInitSpec(this, _Equation_brand);
    _defineProperty(this, "lhs", void 0);
    _defineProperty(this, "rhs", void 0);
    if (lhs instanceof Expression) {
      this.lhs = lhs;
      if (rhs instanceof Expression) {
        this.rhs = rhs;
      } else if (rhs instanceof Fraction || isInt(rhs)) {
        this.rhs = new Expression(rhs);
      } else {
        throw new TypeError("Invalid Argument (" + String(rhs) + "): Right-hand side must be of type Expression, Fraction or Integer.");
      }
    } else {
      throw new TypeError("Invalid Argument (" + String(lhs) + "): Left-hand side must be of type Expression.");
    }
  }
  get variableNames() {
    return [...new Set([...this.lhs.variableNames, ...this.rhs.variableNames])].sort();
  }
  copy() {
    return new Equation(this.lhs.copy(), this.rhs.copy());
  }
  solveFor(variable) {
    let returnEquation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (!this.lhs.hasVariable(variable) && !this.rhs.hasVariable(variable)) {
      throw new TypeError("Invalid Argument (" + variable.toString() + "): Variable does not exist in the equation.");
    }
    let solution;
    if (this.isLinear() || _assertClassBrand(_Equation_brand, this, _variableCanBeIsolated).call(this, variable)) {
      // If the equation is linear and the variable in question can be isolated through arithmetic, solve.
      solution = _assertClassBrand(_Equation_brand, this, _solveLinearEquationWithSeparableVariable).call(this, variable);
    } else {
      // Otherwise, move everything to the LHS.
      let newLhs = this.lhs.copy();
      newLhs = newLhs.subtract(this.rhs);
      // If there are no terms left after this rearrangement and the constant is 0, there are infinite solutions.
      // Otherwise, there are no solutions.
      if (newLhs.terms.length === 0) {
        if (newLhs.constant().valueOf() === 0) {
          return [new Fraction(1, 1)];
        } else {
          throw new EvalError("No Solution");
        }
        // Otherwise, check degree and solve.
      } else if (this.isQuadratic(variable)) {
        solution = _assertClassBrand(_Equation_brand, this, _solveQuadraticEquation).call(this, newLhs);
      } else if (_assertClassBrand(_Equation_brand, this, _isCubic).call(this, variable)) {
        solution = _assertClassBrand(_Equation_brand, this, _solveCubicEquation).call(this, newLhs);
      } else {
        // throw new EvalError(
        //   "Unsupported equation type. Only certain linear, quadratic and cubic equations are supported."
        // )
        return undefined;
      }
    }
    if (returnEquation) {
      return new Equation(new Expression(variable), solution);
    } else {
      return solution;
    }
  }
  /**
   * Divide given right-hand side by given coefficient.
   *
   * Defining this operation as a class member simplifies handling side-effects,
   * for example in case of inequations which reverse if the coefficient is
   * negative.
   * Note that you should be careful when introducing side-effects to
   * ensure the methods are operating on a copy to prevent inadvertent
   * modification.
   */
  divideRhsByCoefficient(rhs, coefficient) {
    return rhs.divide(coefficient);
  }
  eval(values) {
    return new Equation(this.lhs.eval(values), this.rhs.eval(values));
  }
  evalToBoolean(values) {
    const equation = this.eval(values);
    if (equation.maxDegree() === 0) {
      return equation.lhs.constant().valueOf() === equation.rhs.constant().valueOf();
    } else {
      throw new EvalError("Can't evaluate equation to boolean since there are free variables.");
    }
  }
  toString() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      implicit: false
    };
    return this.lhs.toString(options) + " = " + this.rhs.toString(options);
  }
  toTex() {
    return this.lhs.toTex() + " = " + this.rhs.toTex();
  }
  maxDegree() {
    const lhsMax = this.lhs.maxDegree();
    const rhsMax = this.rhs.maxDegree();
    return Math.max(lhsMax, rhsMax);
  }
  maxDegreeOfVariable(variable) {
    return Math.max(this.lhs.maxDegreeOfVariable(variable), this.rhs.maxDegreeOfVariable(variable));
  }
  isLinear() {
    return this.maxDegree() === 1 && _assertClassBrand(_Equation_brand, this, _noCrossProducts).call(this);
  }
  isQuadratic(variable) {
    return this.maxDegree() === 2 && _assertClassBrand(_Equation_brand, this, _onlyHasVariable).call(this, variable);
  }
}
function _isCubic(variable) {
  return this.maxDegree() === 3 && _assertClassBrand(_Equation_brand, this, _onlyHasVariable).call(this, variable);
}
function _variableCanBeIsolated(variable) {
  return this.maxDegreeOfVariable(variable) === 1 && _assertClassBrand(_Equation_brand, this, _noCrossProductsWithVariable).call(this, variable);
}
function _noCrossProductsWithVariable(variable) {
  return this.lhs.noCrossProductsWithVariable(variable) && this.rhs.noCrossProductsWithVariable(variable);
}
function _noCrossProducts() {
  return this.lhs.noCrossProducts() && this.rhs.noCrossProducts();
}
function _onlyHasVariable(variable) {
  return this.lhs.onlyHasVariable(variable) && this.rhs.onlyHasVariable(variable);
}
function _solveLinearEquationWithSeparableVariable(variable) {
  const solvingFor = new Term(new Variable(variable));
  let newLhs = new Expression();
  let newRhs = new Expression();
  for (let i = 0; i < this.rhs.terms.length; i++) {
    const term = this.rhs.terms[i];
    if (term.canBeCombinedWith(solvingFor)) {
      newLhs = newLhs.subtract(term);
    } else {
      newRhs = newRhs.add(term);
    }
  }
  for (let i = 0; i < this.lhs.terms.length; i++) {
    const term = this.lhs.terms[i];
    if (term.canBeCombinedWith(solvingFor)) {
      newLhs = newLhs.add(term);
    } else {
      newRhs = newRhs.subtract(term);
    }
  }
  newRhs = newRhs.subtract(this.lhs.constant());
  newRhs = newRhs.add(this.rhs.constant());
  if (newLhs.terms.length === 0) {
    if (newLhs.constant().equalTo(newRhs.constant())) {
      return new Fraction(1, 1);
    } else {
      throw new EvalError("No Solution");
    }
  }
  newRhs = this.divideRhsByCoefficient(newRhs, newLhs.terms[0].coefficient());
  if (newRhs.terms.length === 0) {
    return newRhs.constant().reduce();
  }
  newRhs.sort();
  return newRhs;
}
function _solveQuadraticEquation(newLhs) {
  const coefs = newLhs.quadraticCoefficients();
  const a = coefs.a;
  const b = coefs.b;
  const c = coefs.c;
  // Calculate the discriminant, b^2 - 4ac.
  const discriminant = b.pow(2).subtract(a.multiply(c).multiply(4));
  // If the discriminant is greater than or equal to 0, there is at least one real root.
  if (discriminant.valueOf() >= 0) {
    // If the discriminant is equal to 0, there is one real root: -b / 2a.
    if (discriminant.valueOf() === 0) {
      return [b.multiply(-1).divide(a.multiply(2)).reduce()];
      // If the discriminant is greater than 0, there are two real roots:
      // (-b - √discriminant) / 2a
      // (-b + √discriminant) / 2a
    } else {
      let squareRootDiscriminant;
      // If the answers will be rational, return reduced Fraction objects.
      if (discriminant.squareRootIsRational()) {
        squareRootDiscriminant = discriminant.pow(0.5);
        const root1 = b.multiply(-1).subtract(squareRootDiscriminant).divide(a.multiply(2));
        const root2 = b.multiply(-1).add(squareRootDiscriminant).divide(a.multiply(2));
        return [root1.reduce(), root2.reduce()];
        // If the answers will be irrational, return numbers.
      } else {
        squareRootDiscriminant = Math.sqrt(discriminant.valueOf());
        const root1 = (-b.valueOf() - squareRootDiscriminant) / (2 * a.valueOf());
        const root2 = (-b.valueOf() + squareRootDiscriminant) / (2 * a.valueOf());
        return [root1, root2];
      }
    }
    // If the discriminant is negative, there are no real roots.
  } else {
    return [];
  }
}
function _solveCubicEquation(newLhs) {
  const coefs = newLhs.cubicCoefficients();
  const a = coefs.a;
  const b = coefs.b;
  const c = coefs.c;
  const d = coefs.d;
  // Calculate D and D0.
  let D = a.multiply(b).multiply(c).multiply(d).multiply(18);
  D = D.subtract(b.pow(3).multiply(d).multiply(4));
  D = D.add(b.pow(2).multiply(c.pow(2)));
  D = D.subtract(a.multiply(c.pow(3)).multiply(4));
  D = D.subtract(a.pow(2).multiply(d.pow(2)).multiply(27));
  const D0 = b.pow(2).subtract(a.multiply(c).multiply(3));
  // Check for special cases when D = 0.
  if (D.valueOf() === 0) {
    // If D = D0 = 0, there is one distinct real root, -b / 3a.
    if (D0.valueOf() === 0) {
      const root1 = b.multiply(-1).divide(a.multiply(3));
      return [root1.reduce()];
      // Otherwise, if D0 != 0, there are two distinct real roots.
      // 9ad - bc / 2D0
      // 4abc - 9a^2d - b^3 / aD0
    } else {
      let root1 = a.multiply(b).multiply(c).multiply(4);
      root1 = root1.subtract(a.pow(2).multiply(d).multiply(9));
      root1 = root1.subtract(b.pow(3));
      root1 = root1.divide(a.multiply(D0));
      const root2 = a.multiply(d).multiply(9).subtract(b.multiply(c)).divide(D0.multiply(2));
      return [root1.reduce(), root2.reduce()];
    }
    // Otherwise, use a different method for solving.
  } else {
    const f = (3 * (c.valueOf() / a.valueOf()) - Math.pow(b.valueOf(), 2) / Math.pow(a.valueOf(), 2)) / 3;
    let g = 2 * Math.pow(b.valueOf(), 3) / Math.pow(a.valueOf(), 3);
    g = g - 9 * b.valueOf() * c.valueOf() / Math.pow(a.valueOf(), 2);
    g = g + 27 * d.valueOf() / a.valueOf();
    g = g / 27;
    const h = Math.pow(g, 2) / 4 + Math.pow(f, 3) / 27;
    /*
                 if f = g = h = 0 then roots are equal (has been already taken care of!)
                 if h>0, only one real root
                 if h<=0, all three roots are real
               */
    if (h > 0) {
      const R = -(g / 2) + Math.sqrt(h);
      const S = Math.cbrt(R);
      const T = -(g / 2) - Math.sqrt(h);
      const U = Math.cbrt(T);
      const root1 = S + U - b.valueOf() / (3 * a.valueOf());
      return [root1].map(_roundRootToPrecision);
    } else {
      const i = Math.sqrt(Math.pow(g, 2) / 4 - h);
      const j = Math.cbrt(i);
      const k = Math.acos(-(g / (2 * i)));
      const L = -j;
      const M = Math.cos(k / 3);
      const N = Math.sqrt(3) * Math.sin(k / 3);
      const P = -(b.valueOf() / (3 * a.valueOf()));
      const root1 = 2 * j * Math.cos(k / 3) - b.valueOf() / (3 * a.valueOf());
      const root2 = L * (M + N) + P;
      const root3 = L * (M - N) + P;
      const roots = [root1, root2, root3].map(_roundRootToPrecision);
      roots.sort(function (a, b) {
        return a - b;
      }); // roots in ascending order
      return [roots[0], roots[1], roots[2]];
    }
  }
}
/**
 * Round root if the next integer is within ROOT_PRECISION.
 */
function _roundRootToPrecision(root) {
  const roundedRoot = Math.round(root);
  if (Math.abs(roundedRoot - root) < ROOT_PRECISION) {
    return roundedRoot;
  } else {
    return root;
  }
}

var _Inequation_brand = /*#__PURE__*/new WeakSet();
class Inequation extends Equation {
  constructor(lhs, rhs, _relation) {
    super(lhs, rhs);
    _classPrivateMethodInitSpec(this, _Inequation_brand);
    _defineProperty(this, "isLessThan", false);
    _defineProperty(this, "isInclusive", false);
    _assertClassBrand(_Inequation_brand, this, _parseRelation).call(this, _relation);
  }
  copy() {
    const equation = super.copy();
    return new Inequation(equation.lhs, equation.rhs, _assertClassBrand(_Inequation_brand, this, _relationToString).call(this));
  }
  solveFor(variable) {
    if (this.isLinear()) {
      const copy = new Inequation(this.lhs.copy(), this.rhs.copy(), _assertClassBrand(_Inequation_brand, this, _relationToString).call(this));
      return copy.solveForWithSideEffects(variable);
    } else {
      throw new EvalError("Only linear inequations are supported.");
    }
  }
  /**
   * Solve for a variable with possible side-effects like changing inequality.
   * In order to preserve state, this should normally be invoked on a copy.
   *
   * Note that the visibility of this method had to be switched from `#` to
   * `private` due to an issue with the TypeScript compiler when it comes to
   * references to `super`:
   * https://github.com/microsoft/TypeScript/issues/44515
   */
  solveForWithSideEffects(variable) {
    const solution = super.solveFor(variable);
    const rhs = solution instanceof Expression ? solution : new Expression(solution);
    this.lhs = new Expression(variable);
    this.rhs = rhs;
    return this;
  }
  divideRhsByCoefficient(rhs, coefficient) {
    const isCoefficientNegative = coefficient instanceof Fraction && coefficient.valueOf() < 0;
    if (isCoefficientNegative) {
      this.isLessThan = !this.isLessThan;
    }
    return rhs.divide(coefficient);
  }
  eval(values) {
    return new Inequation(this.lhs.eval(values), this.rhs.eval(values), _assertClassBrand(_Inequation_brand, this, _relationToString).call(this));
  }
  evalToBoolean(values) {
    const inequation = this.eval(values);
    if (inequation.maxDegree() == 0) {
      if (inequation.isLessThan && inequation.isInclusive) {
        return inequation.lhs.constant().valueOf() <= inequation.rhs.constant().valueOf();
      } else if (inequation.isLessThan && !inequation.isInclusive) {
        return inequation.lhs.constant().valueOf() < inequation.rhs.constant().valueOf();
      } else if (!inequation.isLessThan && inequation.isInclusive) {
        return inequation.lhs.constant().valueOf() >= inequation.rhs.constant().valueOf();
      } else {
        return inequation.lhs.constant().valueOf() > inequation.rhs.constant().valueOf();
      }
    } else {
      throw new EvalError("Can't evaluate inequation to boolean since there are free variables.");
    }
  }
  toString() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      implicit: false
    };
    return "".concat(this.lhs.toString(options), " ").concat(_assertClassBrand(_Inequation_brand, this, _relationToString).call(this), " ").concat(this.rhs.toString(options));
  }
  toTex() {
    let relationTexString = "";
    if (this.isInclusive) {
      relationTexString = this.isLessThan ? "\\le" : "\\ge";
    } else {
      relationTexString = _assertClassBrand(_Inequation_brand, this, _relationToString).call(this);
    }
    return "".concat(this.lhs.toTex(), " ").concat(relationTexString, " ").concat(this.rhs.toTex());
  }
}
function _relationToString() {
  return "".concat(this.isLessThan ? "<" : ">").concat(this.isInclusive ? "=" : "");
}
function _parseRelation(relation) {
  const RELATIONS = ["<", "<=", ">", ">="];
  if (RELATIONS.includes(relation)) {
    this.isLessThan = /^</.test(relation);
    this.isInclusive = /=$/.test(relation);
  } else {
    throw new SyntaxError("Relation \"".concat(relation, "\" is not supported. Only ").concat(RELATIONS.map(relation => "\"".concat(relation, "\"")).join(", "), " are supported."));
  }
}

var _Lexer;
var _Lexer_brand = /*#__PURE__*/new WeakSet();
/* spellchecker:ignore Bendersky */
/*
  The lexer module is a slightly modified version of the handwritten lexer by Eli Bendersky.
  The parts not needed like comments and quotes were deleted and some things modified.
  Comments are left unchanged, the original lexer can be found here:
  http://eli.thegreenplace.net/2013/07/16/hand-written-lexer-in-javascript-compared-to-the-regex-based-ones
*/
class Lexer {
  constructor() {
    _classPrivateMethodInitSpec(this, _Lexer_brand);
    _defineProperty(this, "pos", void 0);
    _defineProperty(this, "buf", void 0);
    _defineProperty(this, "bufferLength", void 0);
    // Operator table, mapping operator -> token name
    _defineProperty(this, "operatorTable", new Map([["+", "PLUS"], ["-", "MINUS"], ["*", "MULTIPLY"], ["/", "DIVIDE"], ["^", "POWER"], ["(", "L_PAREN"], [")", "R_PAREN"], ["=", "EQUALS"], ["<", "LESS_THAN"], [">", "GREATER_THAN"]]));
    this.pos = 0;
    this.buf = "";
    this.bufferLength = 0;
  }
  // Initialize the Lexer's buffer. This resets the lexer's internal
  // state and subsequent tokens will be returned starting with the
  // beginning of the new buffer.
  input(buf) {
    this.pos = 0;
    this.buf = buf;
    this.bufferLength = buf.length;
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
    _assertClassBrand(_Lexer_brand, this, _skipNonTokens).call(this);
    if (this.pos >= this.bufferLength) {
      return null;
    }
    // The char at this.pos is part of a real token. Figure out which.
    const c = this.buf.charAt(this.pos);
    // Look it up in the table of operators
    const op = this.operatorTable.get(c);
    if (op !== undefined) {
      if (op === "L_PAREN" || op === "R_PAREN") {
        return {
          type: "PAREN",
          value: op,
          pos: this.pos++
        };
      } else if (op === "LESS_THAN" || op === "GREATER_THAN") {
        if (this.buf.charAt(this.pos + 1) === "=") {
          const pos = this.pos;
          this.pos += 2;
          return {
            type: "OPERATOR",
            value: "".concat(op, "_EQUALS"),
            pos
          };
        } else {
          return {
            type: "OPERATOR",
            value: op,
            pos: this.pos++
          };
        }
      } else {
        return {
          type: "OPERATOR",
          value: op,
          pos: this.pos++
        };
      }
    } else {
      // Not an operator - so it's the beginning of another token.
      if (_isAlpha.call(Lexer, c)) {
        return _assertClassBrand(_Lexer_brand, this, _process_identifier).call(this);
      } else if (_isDigit.call(Lexer, c)) {
        return _assertClassBrand(_Lexer_brand, this, _process_number).call(this);
      } else {
        throw new SyntaxError("Token error at character " + c + " at position " + this.pos);
      }
    }
  }
}
_Lexer = Lexer;
function _isDigit(c) {
  return c >= "0" && c <= "9";
}
function _isAlpha(c) {
  return c >= "a" && c <= "z" || c >= "A" && c <= "Z";
}
function _isAlphaNum(c) {
  return c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c >= "0" && c <= "9";
}
function _process_digits(position) {
  let endPosition = position;
  while (endPosition < this.bufferLength && _isDigit.call(_Lexer, this.buf.charAt(endPosition))) {
    endPosition++;
  }
  return endPosition;
}
function _process_number() {
  //Read characters until a non-digit character appears
  let endPosition = _assertClassBrand(_Lexer_brand, this, _process_digits).call(this, this.pos);
  //If it's a decimal point, continue to read digits
  if (this.buf.charAt(endPosition) === ".") {
    endPosition = _assertClassBrand(_Lexer_brand, this, _process_digits).call(this, endPosition + 1);
  }
  //Check if the last read character is a decimal point.
  //If it is, ignore it and proceed
  if (this.buf.charAt(endPosition - 1) === ".") {
    throw new SyntaxError("Decimal point without decimal digits at position " + (endPosition - 1));
  }
  //construct the NUMBER token
  const tok = {
    type: "NUMBER",
    value: this.buf.substring(this.pos, endPosition),
    pos: this.pos
  };
  this.pos = endPosition;
  return tok;
}
function _process_identifier() {
  let endPosition = this.pos + 1;
  while (endPosition < this.bufferLength && _isAlphaNum.call(_Lexer, this.buf.charAt(endPosition))) {
    endPosition++;
  }
  const tok = {
    type: "IDENTIFIER",
    value: this.buf.substring(this.pos, endPosition),
    pos: this.pos
  };
  this.pos = endPosition;
  return tok;
}
function _skipNonTokens() {
  while (this.pos < this.bufferLength) {
    const c = this.buf.charAt(this.pos);
    if (c == " " || c == "\t" || c == "\r" || c == "\n") {
      this.pos++;
    } else {
      break;
    }
  }
}

var _Parser_brand = /*#__PURE__*/new WeakSet();
class Parser {
  constructor() {
    _classPrivateMethodInitSpec(this, _Parser_brand);
    _defineProperty(this, "lexer", void 0);
    _defineProperty(this, "current_token", void 0);
    this.lexer = new Lexer();
    this.current_token = null;
    /**
     * Base-grammar:
     *
     * expr   -> expr + term
     *        | expr - term
     *        | - term
     *        | term
     *
     * term   -> term * factor
     *        | term factor
     *        | term / factor
     *        | term ^ factor
     *        | factor
     *
     * factor -> (expr)
     *        | num
     *        | id
     *
     * ===============================
     *
     * Grammar without left recursion -> the grammar actually used
     *
     * eqn         -> expr = expr
     * expr        -> term expr_rest
     * expr_rest   -> + term expr_rest
     *             | - term expr_rest
     *             | ε
     *
     * term        -> factor term_rest
     * term_rest   -> * term term_rest
     *             |   term term_rest
     *             | ^ term term_rest
     *             | / term term_rest
     *             | ε
     *
     * factor      -> (expr)
     *             | num
     *             | id
     *
     **/
  }
  // Updates the current token to the next input token
  update() {
    this.current_token = this.lexer.token();
  }
  // Returns true if the current token matches the keyword
  match(keyword) {
    if (this.current_token === null) return keyword === "epsilon";
    switch (keyword) {
      case "plus":
        return this.current_token.type === "OPERATOR" && this.current_token.value === "PLUS";
      case "minus":
        return this.current_token.type === "OPERATOR" && this.current_token.value === "MINUS";
      case "multiply":
        return this.current_token.type === "OPERATOR" && this.current_token.value === "MULTIPLY";
      case "power":
        return this.current_token.type === "OPERATOR" && this.current_token.value === "POWER";
      case "divide":
        return this.current_token.type === "OPERATOR" && this.current_token.value === "DIVIDE";
      case "equal":
        return this.current_token.type === "OPERATOR" && this.current_token.value === "EQUALS";
      case "less_than":
        return this.current_token.type === "OPERATOR" && this.current_token.value === "LESS_THAN";
      case "less_than_equals":
        return this.current_token.type === "OPERATOR" && this.current_token.value === "LESS_THAN_EQUALS";
      case "greater_than":
        return this.current_token.type === "OPERATOR" && this.current_token.value === "GREATER_THAN";
      case "greater_than_equals":
        return this.current_token.type === "OPERATOR" && this.current_token.value === "GREATER_THAN_EQUALS";
      case "l_paren":
        return this.current_token.type === "PAREN" && this.current_token.value === "L_PAREN";
      case "r_paren":
        return this.current_token.type === "PAREN" && this.current_token.value === "R_PAREN";
      case "num":
        return this.current_token.type === "NUMBER";
      case "id":
        return this.current_token.type === "IDENTIFIER";
      default:
        return false;
    }
  }
  /*
      Initializes the parser internals and the lexer.
      The input is then parsed according to the grammar described in the
      header comment. The parsing process constructs a abstract syntax tree
      using the classes the algebra.js library provides
  */
  parse(input) {
    //pass the input to the lexer
    this.lexer.input(input);
    this.update();
    return _assertClassBrand(_Parser_brand, this, _parseEqn).call(this);
  }
}
function _parseEqn() {
  const ex1 = _assertClassBrand(_Parser_brand, this, _parseExpr).call(this);
  if (this.match("equal")) {
    this.update();
    const ex2 = _assertClassBrand(_Parser_brand, this, _parseExpr).call(this);
    return new Equation(ex1, ex2);
  } else if (_assertClassBrand(_Parser_brand, this, _isInequation).call(this)) {
    const relations = new Map([["LESS_THAN", "<"], ["LESS_THAN_EQUALS", "<="], ["GREATER_THAN", ">"], ["GREATER_THAN_EQUALS", ">="]]);
    if (this.current_token && relations.has(this.current_token.value)) {
      const relation = relations.get(this.current_token.value);
      this.update();
      const ex2 = _assertClassBrand(_Parser_brand, this, _parseExpr).call(this);
      return new Inequation(ex1, ex2, relation);
    } /* c8 ignore start */else {
      var _this$current_token;
      throw new Error("Should not be reached since the operator \"".concat((_this$current_token = this.current_token) === null || _this$current_token === void 0 ? void 0 : _this$current_token.value, "\" has been matched as inequation relational operator."));
      /* c8 ignore end */
    }
  } else if (this.match("epsilon")) {
    return ex1;
  } else {
    throw new SyntaxError("Unbalanced Parenthesis");
  }
}
function _isInequation() {
  return this.match("less_than") || this.match("less_than_equals") || this.match("greater_than") || this.match("greater_than_equals");
}
function _parseExpr() {
  const term = _assertClassBrand(_Parser_brand, this, _parseTerm).call(this);
  return _assertClassBrand(_Parser_brand, this, _parseExprRest).call(this, term);
}
function _parseExprRest(term) {
  if (this.match("plus")) {
    this.update();
    const plusTerm = _assertClassBrand(_Parser_brand, this, _parseTerm).call(this);
    if (term === undefined || plusTerm === undefined) throw new SyntaxError("Missing operand");
    return _assertClassBrand(_Parser_brand, this, _parseExprRest).call(this, term.add(plusTerm));
  } else if (this.match("minus")) {
    this.update();
    const minusTerm = _assertClassBrand(_Parser_brand, this, _parseTerm).call(this);
    //This case is entered when a negative number is parsed e.g. x = -4
    if (term === undefined) {
      return minusTerm ? _assertClassBrand(_Parser_brand, this, _parseExprRest).call(this, minusTerm.multiply(-1)) : undefined;
    } else {
      return _assertClassBrand(_Parser_brand, this, _parseExprRest).call(this, term.subtract(minusTerm));
    }
  } else {
    return term;
  }
}
function _parseTerm() {
  const factor = _assertClassBrand(_Parser_brand, this, _parseFactor).call(this);
  return _assertClassBrand(_Parser_brand, this, _parseTermRest).call(this, factor);
}
function _parseTermRest(factor) {
  if (factor === undefined) {
    return factor;
  } else if (this.match("multiply")) {
    this.update();
    const mulFactor = _assertClassBrand(_Parser_brand, this, _parseFactor).call(this);
    return factor.multiply(_assertClassBrand(_Parser_brand, this, _parseTermRest).call(this, mulFactor));
  } else if (this.match("power")) {
    this.update();
    const powFactor = _assertClassBrand(_Parser_brand, this, _parseFactor).call(this);
    //WORKAROUND: algebra.js only allows integers and fractions for raising
    return _assertClassBrand(_Parser_brand, this, _parseTermRest).call(this, factor.pow(parseInt(String(powFactor))));
  } else if (this.match("divide")) {
    this.update();
    const divFactor = _assertClassBrand(_Parser_brand, this, _parseFactor).call(this);
    //WORKAROUND: algebra.js only allows integers and fractions for division
    return divFactor ? _assertClassBrand(_Parser_brand, this, _parseTermRest).call(this, factor.divide(_assertClassBrand(_Parser_brand, this, _convertToFraction).call(this, divFactor))) : undefined;
  } else if (this.match("epsilon")) {
    return factor;
  } else {
    //a missing operator between terms is treated like a multiplier
    const mulFactor2 = _assertClassBrand(_Parser_brand, this, _parseFactor).call(this);
    if (mulFactor2 === undefined) {
      return factor;
    } else {
      return factor.multiply(_assertClassBrand(_Parser_brand, this, _parseTermRest).call(this, mulFactor2));
    }
  }
}
/**
 * Is used to convert expressions to fractions, as dividing by expressions is not possible
 **/
function _convertToFraction(expression) {
  if (expression.terms.length > 0) {
    throw new TypeError("Invalid Argument (" + expression.toString() + "): Divisor must be of type Integer or Fraction.");
  } else {
    const c = expression.constants[0];
    return new Fraction(c.numer, c.denom);
  }
}
function _parseFactor() {
  if (this.match("num")) {
    const num = _assertClassBrand(_Parser_brand, this, _parseNumber).call(this);
    this.update();
    return num;
  } else if (this.match("id")) {
    var _this$current_token2;
    const id = new Expression((_this$current_token2 = this.current_token) === null || _this$current_token2 === void 0 ? void 0 : _this$current_token2.value);
    this.update();
    return id;
  } else if (this.match("l_paren")) {
    this.update();
    const expr = _assertClassBrand(_Parser_brand, this, _parseExpr).call(this);
    if (this.match("r_paren")) {
      this.update();
      return expr;
    } else {
      throw new SyntaxError("Unbalanced Parenthesis");
    }
  } else {
    return undefined;
  }
}
// Converts a number token - integer or decimal - to an expression
function _parseNumber() {
  //Integer conversion
  if (this.current_token) {
    if (parseInt(this.current_token.value) === parseFloat(this.current_token.value)) {
      return new Expression(parseInt(this.current_token.value));
    } else {
      //Split the decimal number to integer and decimal parts
      const splits = this.current_token.value.split(".");
      //count the digits of the decimal part
      const decimals = splits[1].length;
      //determine the multiplication factor
      const factor = Math.pow(10, decimals);
      const float_op = parseFloat(this.current_token.value);
      //multiply the float with the factor and divide it again afterwards
      //to create a valid expression object
      return new Expression(float_op * factor).divide(factor);
    }
  } /* c8 ignore start */else {
    throw new Error("Should not be reached since the current token has been matched as a number");
    /* c8 ignore end */
  }
}

function parse(input) {
  const parser = new Parser();
  const result = parser.parse(input);
  return result;
}
function toTex(input) {
  if (input instanceof Fraction || input instanceof Expression || input instanceof Equation || input instanceof Inequation) {
    return input.toTex();
  } else if (input instanceof Array) {
    return input.map(e => {
      if (e instanceof Fraction) {
        return e.toTex();
      } else {
        return String(e);
      }
    }).join();
  } else {
    return String(input);
  }
}

export { Equation, Expression, Fraction, Inequation, Parser, Term, Variable, parse, toTex };
