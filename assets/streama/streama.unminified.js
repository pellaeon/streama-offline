(function(){
'use strict';
//= wrapped

//= require_self
//= require lodashMixins.js

//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree domain
//= require_tree filters
//= require_tree templates

angular.module("systaro.core", []);

_.mixin({
  formatString: function(format, tokens) {
    var values = [];

    if(_.isArray(tokens) || _.isObject(tokens)) {
      values = tokens;
    } else {
      values = _.takeRight(arguments, arguments.length - 1);
    }

    _.forEach(values, function(value, key) {
      format = _.replace(format, '{' + key + '}', _.isUndefined(value) ? '' : _.toString(value));
    });

    return format;
  }
});
})();
(function(){
'use strict';
//= wrapped

_.mixin({
	formatString: formatString,
  formatStringEx: formatStringEx,
  joinBy: joinBy,
  joinCompact: joinCompact,
  joinCompactBy: joinCompactBy,
  asArray: asArray,
  getterSetter: getterSetter,
  watcher: watcher,
	replaceAll: replaceAll,
  isHex: isHex,
  href: href,
  objectToParams: objectToParams,
  formatFileSize: formatFileSize,
  pickDeep: pickDeep,
  isNamedFunction: isNamedFunction,
  isEqualBy: isEqualBy,
  rgbToHex: rgbToHex,
  findAndGetNext: findAndGetNext,
  findAndGetPrev: findAndGetPrev,
  subString: subString,
	acronym: acronym,
	isjQuery: isjQuery,
  randomInt: randomInt,
  randomFloat: randomFloat,
  randomBool: randomBool,
  isLikeNumber: isLikeNumber,
  hasValue: hasValue,
  or: or,
  compactStrict: compactStrict,
  orStrict: orStrict,
  isColorExp: isColorExp,
  hasOneOf: hasOneOf,
  maxWith: maxWith,
  tryParseNumber: tryParseNumber,
  clean: clean,
  keyByValue: keyByValue,
  deleteKeys: deleteKeys,
  deleteAllKeys: deleteAllKeys,
  hasKeys: hasKeys,
  changes: changes,
  joinKeyValues: joinKeyValues,
  guid: guid,
  insertOrReplaceBy: insertOrReplaceBy,
  insertOrUpdateBy: insertOrUpdateBy,
  spliceBy: spliceBy,
  updateBy: updateBy,
  removeAt: removeAt,
  move: move,
  toBlob: toBlob,
  getAspectRatio: getAspectRatio,
  gcd: gcd,
  parseUrl: parseUrl,
  extendUrlParams: extendUrlParams,
  splitToMap: splitToMap,
  search: search,
  keyByRemapValues: keyByRemapValues,
  remap: remap,
  pickValues: pickValues,
  filterByValues: filterByValues,
  bytes: bytes
});

/**
 * Replaces matching index tokens with value from arguments or array.
 *
 * @static
 * @memberOf _
 * @param {string} format - The string with replacement tokens.
 * @param {...string | string[] | object} tokens - The data used for the tokens to populate the format string.
 * @returns {string} The string with replaced tokens.
 * @example
 * _.formatString('Hallo {0}!', 'Welt') => 'Hallo Welt!'
 */
function formatString(format, tokens) {
  var values = [];

  if(_.isArray(tokens) || _.isObject(tokens)) {
    values = tokens;
  } else {
    values = _.takeRight(arguments, arguments.length - 1);
  }

  _.forEach(values, function(value, key) {
    format = _.replace(format, '{' + key + '}', _.isUndefined(value) ? '' : _.toString(value));
  });

  return format;
}

/**
 * Replaces matches for path tokens surrounded by single curly brackets in string with value from object. See _.get for path usage.
 *
 * @static
 * @memberOf _
 * @param {string} format - The string with replacement tokens.
 * @param {...*} data - The data used for the tokens to populate the format string.
 * @returns {string} The string with replaced tokens.
 * @example
 * _.formatStringEx('Hallo {[0]}!', 'Welt') => 'Hallo Welt!'
 */
function formatStringEx(format, data) {
  if(arguments.length > 2) {
    data = _.takeRight(arguments, arguments.length - 1);
  } else if (!(_.isArray(data) || _.isObject(data))) {
    data = [data];
  }

  return _.replace(format, /{(.+?)}/g, function(match, token) {
    return _.get(data, token);
  });
}


function joinBy(array, separator, iteratee) {
  return _.join(_.map(_.asArray(array), iteratee), separator);
}

function joinCompact(array, separator) {
  return _.join(_.compact(array), separator);
}

function joinCompactBy(array, separator, iteratee) {
  return _.join(_.map(_.compact(array), iteratee), separator);
}

function asArray(value) {
  return _.clean(_.isArray(value) ? value : [value]);
}

/**
 * Creates a ready to use GetSet-Function for ngModels with getterSetter option.
 *
 * @static
 * @memberOf _
 * @param {function} [onSet] - The function callback for setting the value.
 * @param {function} [onGet] - The function callback for getting the value.
 * @param {*|function} [value] - The default value for this GetSet-Function. Can be the value or a function which returns the value.
 * @returns {function} The GetSet-Function.
 */
function getterSetter(onSet, onGet, value) {
  value = (_.isFunction(value) ? value() : value);

  return function getterSetter(newValue) {
    if(arguments.length) {
      value = (_.isFunction(onSet) ? onSet(newValue, value) : newValue);
    }

    return (_.isFunction(onGet) ? onGet(value) : value);
  };
}

function watcher(onGet, onChange, interval, shouldDispose) {
  var lastValue;

  var timerId = setInterval(function() {
    var value = onGet();

    if(_.isFunction(shouldDispose) && shouldDispose()) {
      clearInterval(timerId);
    } else if(lastValue !== value) {
      lastValue = onChange(value, lastValue) || value;
    }
  }, interval || 100);

  return function() {
    clearInterval(timerId);
  };
}

function replaceAll(original, search, replacement) {
  return original.split(search).join(replacement);
}

function isHex(value) {
  return value.match(/^#(?:[0-9a-f]{3}){1,2}$/i);
}

function href(baseUrl, params) {
  var paramString = _.objectToParams(params);
  return baseUrl + (paramString ? '?' + paramString : '');
}

function objectToParams(params) {
  var paramMap = [];

  _.forEach(params, function(value, key) {
    if(_.isArray(value)) {
      _.forEach(value, function(value) {
        paramMap.push(createMapValue(key, value));
      });
    } else {
      paramMap.push(createMapValue(key, value));
    }
  });

  return (paramMap.length ? _.join(_.clean(paramMap), '&') : '');

  function createMapValue(key, value) {
    return (!_.isUndefined(key) && !_.isUndefined(value) ? encodeURIComponent(key) + '=' + encodeURIComponent(value) : null);
  }
}

function parseUrl(url) {
  var regex = /[?&]([^=#]+)=([^&#]*)/g;
  var params = {};
  var match;

  while((match = regex.exec(url))) {
    var key = decodeURIComponent(match[1]);
    var value = decodeURIComponent(match[2]);

    if(_.isLikeNumber(value)) {
      value = _.toNumber(value);
    } else switch(_.toLower(value)) {
      case 'true':
        value = true;
        break;
      case 'false':
        value = false;
        break;
      default:break;
    }

    if(_.has(params, key)) {
      if(_.isArray(params[key])) {
        params[key].push(value);
      } else {
        params[key] = [params[key], value];
      }
    } else {
      params[key] = value;
    }
  }

  return {
    path: _.first(_.split(url, '?')),
    params: params
  };
}

function extendUrlParams(url, params) {
  var _url = _.parseUrl(url);
  return _url.path + '?' + _.objectToParams(angular.extend(_url.params, params));
}

/**
 * Formats a file size to a more readable string.
 * For better understanding read the sections "Main memory" and "Disk drives" at "https://en.wikipedia.org/wiki/Binary_prefix"
 *
 * @static
 * @memberOf _
 * @param {number} bytes - The size of the file in bytes.
 * @param {string} [unit='iec'] - The format of the output.
 * @param {number} [fraction=2] - The fraction of floating numbers
 * @returns {string | undefined} The formatted file size.
 * @example
 * _.formatFileSize(1000000, 'iec'); => '976.56 KiB'
 * _.formatFileSize(1000000, 'si'); => '1 MB'
 * _.formatFileSize(1000000, 'ip'); => '976.56 KB'
 */
function formatFileSize(bytes, unit, fraction){
  if(_.isNumber(bytes)) {
    var factors = {
      'si': [1000, 'k', 'B'], // International System of Units (SI) (base 10)
      'iec': [1024, 'K', 'iB'], // International Electrotechnical Commission (IEC) (base 2)
      'ip': [1024, 'K', 'B'] // Industry Practice (base 2)
    };

    var factor = factors[_.toLower(unit)] || factors.ip;
    /*jshint -W016 */
    var a = Math.log(bytes) / Math.log(factor[0]) | 0;
    /*jshint +W016 */
    var value = (bytes / Math.pow(factor[0], a));

    return _.formatStringEx('{value} {unit}', {
      value: (a ? value.toFixed(_.isUndefined(fraction) ? 2 : fraction) : value),
      unit: (a ? (factor[1] + 'MGTPEZY')[--a] + factor[2] : 'Bytes')
    });
  }

  return undefined;
}

/**
 * This method is like _.pick except that it recursively retrieves the values.
 *
 * @static
 * @memberOf _
 * @param {object} object - The source object.
 * @param {...(string|string[])} paths - The property paths to pick.
 * @param {number} [limit] - The maximal path depth where values are picked, after that full objects are taken. Has to be greater than 0 to take effect.
 * @returns {object} The new object.
 * @example
 *
 * var data = {a: 1, b: {a: 1, b: 2, c: {a: 1, b: 2}}};
 *
 * _.pickDeep(data, 'b.c.a');
 * // => {b: {c: {a: 1}}}
 *
 * _.pickDeep(data, 'b.c.a', 1);
 * // => {b: {a: 1, b: 2, c: {a: 1, b: 2}}}
 *
 * _.pickDeep(data, 'b.c.a', 2);
 * // => {b: {c: {a: 1, b: 2}}}
 */
function pickDeep(object, paths, limit) {
  var result = {};

  if(_.isString(paths)) {
    paths = [paths];
  }

  if(_.isArray(paths)) {
    _.forEach(paths, function(path) {
      if(_.isNumber(limit) && limit > 0) {
        path = _.join(_.split(path, '.', limit), '.');
      }

      _.set(result, path, _.get(object, path));
    });
  }

  return result;
}

/**
 * Checks if a function is anonymous.
 *
 * @static
 * @memberOf _
 * @param {function} fn - The function to check.
 * @returns {boolean} Returns false if the function is anonymous, else true.
 */
function isNamedFunction(fn) {
  return _.isFunction(fn) && _.hasValue(fn, 'name');
}

/**
 * Performs a deep comparison between two values from the given property value to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @param {array|object} value - The value to compare.
 * @param {array|object} other - The other value to compare.
 * @param {string|function} predicate - The predicate to compare by.
 * @returns {boolean} Returns true if the values are equivalent else false.
 */
function isEqualBy(value, other, predicate) {
  return _.isFunction(predicate) ? _.isEqual(predicate(value), predicate(other)) : _.isString(predicate) ? _.isEqual(_.get(value, predicate), _.get(other, predicate)) : _.isEqual(value, other);
}

/**
 * Converts an css rgb color value to hex.
 *
 * @static
 * @memberOf _
 * @param {string} value - The rgb value to convert.
 * @returns {string} The hex string.
 */
function rgbToHex(value) {
  var values = _.map(value.match(/\d+/g), function(value) {
    return _.padStart(parseInt(value, 10).toString(16), 2, '0');
  });

  return values.length > 2 ? formatStringEx('#{[0]}{[1]}{[2]}', values) : undefined;
}

/**
 * Iterates over elements of collection, returning the element after the first element predicate returns truthy for.
 * The predicate is invoked with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @param {array|object} collection  - The collection to inspect.
 * @param {function} [predicate=_.identity] - The function invoked per iteration.
 * @param {number} [fromIndex=0] - The index to search from.
 * @returns {*} Returns the element after the matched element, else undefined.
 */
function findAndGetNext(collection, predicate, fromIndex) {
  return _.get(collection, _.findIndex(collection, predicate, fromIndex) + 1);
}

/**
 * Iterates over elements of collection, returning the element before the first element predicate returns truthy for.
 * The predicate is invoked with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @param {array|object} collection - The collection to inspect.
 * @param {function} [predicate=_.identity] - The function invoked per iteration.
 * @param {number} [fromIndex=0] - The index to search from.
 * @returns {*} Returns the element before the matched element, else undefined.
 */
function findAndGetPrev(collection, predicate, fromIndex) {
  return _.get(collection, _.findIndex(collection, predicate, fromIndex) - 1);
}


/**
 * This method extracts the characters in a string between "start" and "end", not including "end" itself.
 * If "start" is greater than "end", this method will swap the two arguments, meaning _.subString(string, 1, 4) == _.subString(string, 4, 1).
 * If either "start" or "stop" is less than 0, it is treated as if it were 0.
 *
 * @static
 * @memberOf _
 * @param {string} string - The string to extract the characters.
 * @param {number} [start=0] - The position where to start the extraction. First character is at index 0.
 * @param {number} [end=string.length] - The position where to start the extraction. First character is at index 0.
 * @returns {string} A new String containing the extracted characters.
 */
function subString(string, start, end) {
  return _.isString(string) ? string.substring(start, end) : undefined;
}

function acronym(string) {
  return string ? string.match(/\b(\w)/g).join('') : undefined;
}

/**
 * Checks if the given object is a jQuery object.
 *
 * @static
 * @memberOf _
 * @param {Object} object - The object to check.
 * @returns {number} Returns true if the object was an jQuery object, else false.
 */
function isjQuery(object) {
  return (object && (object instanceof jQuery || object.constructor.prototype.jquery));
}

/**
 * Creates a random float between min and max.
 *
 * @static
 * @memberOf _
 * @param {number} [min=0] - The minimum value.
 * @param {number} [max=1] - The maximum value.
 * @returns {number} Returns the random float between min and max.
 */
function randomFloat(min, max) {
  min = _.isNumber(min) ? min : 0;
  max = _.isNumber(max) ? max : 1;
  return min + (Math.random() * (max - min));
}

/**
 * Creates a random integer between min and max.
 *
 * @static
 * @memberOf _
 * @param {number} [min=0] - The minimum value.
 * @param {number} [max=1] - The maximum value.
 * @returns {number} Returns the random integer between min and max.
 */
function randomInt(min, max) {
  return Math.round(randomFloat(min, max));
}

/**
 * Creates a random boolean.
 *
 * @static
 * @memberOf _
 * @returns {boolean} Returns true or false.
 */
function randomBool() {
  return Math.round(Math.random()) > 0;
}

/**
 * Checks if a string can be fully converted into a number.
 *
 * @static
 * @memberOf _
 * @param {string} value - The string to check.
 * @returns {boolean} Returns true if the string can be converted, else false.
 */
function isLikeNumber(value) {
  return value === _.toString(parseFloat(value));
}

/**
 * Checks if path is a direct property of object and has an value other than undefined.
 *
 * @static
 * @memberOf _
 * @param {Object} object - The object to query.
 * @param {Array|string} path - The path to check.
 * @param {*|Function} [predicate] - The value or function at the path to compare with.
 * @returns {boolean} Returns true if path exists and has an value, else false.
 */
function hasValue(object, path, predicate) {
  var value = _.get(object, path);
  var result = false;

  if(arguments.length < 3) {
    result = !_.isNil(value);
  } else if(_.isFunction(predicate)) {
    result = predicate(value);
  } else {
    result = _.eq(predicate, value);
  }

  return result;
}

/**
 * Returns the first object which is not falsey. The values `null`, `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @param {...*|Array} array - The array to query.
 * @returns {boolean} Returns the first element which is not falsey, `undefined` if there is none.
 */
function or(array) {
  return  _.first(_.compact(_.isArray(array) ? array : arguments));
}

/**
 * Returns the first object which is not nullish. The values null and `undefined` and `nullish`.
 *
 * @static
 * @memberOf _
 * @param {...*|Array} array - The array to query.
 * @returns {boolean} Returns the first element which is not nullish, undefined if there is none.
 */
function orStrict(array) {
  return  _.first(_.compactStrict(_.isArray(array) ? array : arguments));
}

/**
 * Creates an array with all nullish values removed. The values `undefined` and `nullish` are falsey.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, undefined, 2, '', 3, Null]);
 * // => [0, 1, false, 2 '', 3]
 */
function compactStrict(array) {
  var index = -1,
    length = array ? array.length : 0,
    resIndex = 0,
    result = [];

  while (++index < length) {
    var value = array[index];
    if (!_.isNil(value)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Computes the maximum value of `array` by value from path. If `array` is empty or falsey, defaultValue is returned.
 *
 * @static
 * @memberOf _
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Array|Function|Object|string} [iteratee=_.identity]
 * @param {number} [defaultValue=undefined]
 * @returns {number} Returns the maximum value.
 */
function maxWith(array, iteratee, defaultValue) {
  return _.max(_.map(array, iteratee)) || defaultValue;
}

function tryParseNumber(value, defaultValue) {
  return isLikeNumber(value) ? parseInt(value, 10) : defaultValue;
}

function isColorExp(value) {
  var regex = /^(?:#(?:[A-Fa-f0-9]{3}){1,2}|(?:rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}|hsl[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*|(?:rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}|hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,)\s*0*(?:\.\d+|1(?:\.0*)?)\s*)[)]|transparent|aqua(?:marine)?|azure|beige|bisque|black|blanchedalmond|blue(?:violet)?|(?:alice|dodger|cadet|midnight|powder|royal|sky|slate|steel)blue|(?:rosy|saddle|sandy)?brown|burlywood5|chartreuse|chocolate|coral|corn(?:flowerblue|silk)|crimson|cyan|dark(?:(?:slate)?blue|cyan|goldenrod|(?:olive|sea)?green|(?:slate)?gr[ae]y|khaki|magenta|orange|orchid|red|salmon|turquoise|violet)|deep(?:pink|skyblue)|firebrick|fuchsia|gainsboro|gold(?:enrod)?|(?:dim|slate)?gr[ae]y|(?:forest|lawn|spring)?green|greenyellow|honeydew|indigo|ivory|khaki|lavender(?:blush)?|lemonchiffon|light(?:(?:sky|steel)?blue|coral|cyan|goldenrodyellow|(?:slate)?gr[ae]y|green|pink|salmon|seagreen|yellow)|lime(?:green)?|linen|magenta|maroon|medium(?:aquamarine|(?:slate)?blue|orchid|purple|s(?:ea|pring)green|turquoise|violetred)|mintcream|mistyrose|moccasin|navy|oldlace|olive(?:drab)?|orange(?:red)?|orchid|pale(?:goldenrod|green|turquoise|violetred)|papayawhip|peachpuff|peru|(?:hot)?pink|plum|purple|(?:indian)?red|salmon|sea(?:green|shell)|sienna|silver|snow|tan|teal|thistle|tomato|turquoise|violet|wheat|whitesmoke|(?:antique|floral|ghost|navajo)?white|yellow(?:green)?)$/gm;
  return regex.exec(value) !== null;
}

/**
 * Checks if an object has one of the key-values in predicate.
 *
 * @static
 * @memberOf _
 * @param {Object} object - The object to query.
 * @param {Object} predicate - The key-values to check for.
 * @param {Boolean} defaultValue - The result if there are key-values in predicate.
 * @returns {boolean} Returns true if the object has at least one of the predicates key-values.
 */
function hasOneOf(object, predicate, defaultValue) {
  var result = _.isBoolean(defaultValue) ? defaultValue : !predicate;

  _.forEach(predicate, function(value, key) {
    var objectValue = _.get(object, key);

    if(_.isArray(value) && !_.isArray(objectValue)) {
      result = _.includes(value, object[key]);
    } else if(!_.isArray(value) && _.isArray(objectValue)) {
      result = _.includes(objectValue, value);
    } else {
      result = (objectValue === value);
    }

    return !result;
  });

  return result;
}

/**
 * Creates an array with all nil values removed. The values null and undefined are nil.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to clean.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.clean([0, 1, undefined, false, 2, '', null, 3]);
 * // => [0, 1, false, 2, '', 3]
 */
function clean(array) {
  return _.reject(array, _.isNil);
}

function keyByValue(collection, value) {
  return Object.keys(collection)[Object.values(collection).indexOf(value)];
}

/**
 * Deletes the given properties of an object.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to delete the properties from.
 * @param {Array} keys The properties to delete.
 * @returns {Object} Returns a new Object with the removed key values.
 */
function deleteKeys(object, keys) {
  var deleted = {};

  _.forEach(keys, function(key) {
    if(_.has(object, key)) {
      deleted[key] = object[key];
      delete object[key];
    }
  });

  return deleted;
}

/**
 * Deletes all owned properties of an object.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to delete the properties from.
 */
function deleteAllKeys(object) {
  deleteKeys(object, _.keys(object));
}

/**
 * Checks if an object has at least one own or inherited enumerable.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to delete the properties from.
 * @param {boolean} [inherit] Allow inherited enumerable.
 * @returns {boolean} Returns true if the object has at least one own or inherited enumerable.
 */
function hasKeys(object, inherit) {
  return (inherit ? _.keysIn : _.keys)(object).length > 0;
}

/**
 * Creates an object of key-values that changed in the other given object using SameValueZero for equality comparisons.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @param {Object} other The other object to inspect.
 * @returns {boolean} Returns the new object with changed key-values.
 */
function changes(object, other) {
  return _.transform(_.assign({}, object, other), function(params, value, key) {
    if(object[key] !== other[key]) {
      params[key] = value;
    }
  });
}

/**
 * Converts all object path values into a string separated by separator.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @param {string|string[]} paths The property paths to pick.
 * @param {string} [separator=','] The element separator.
 * @param {Boolean} [filterNilValues=false] Ignore nil values.
 * @returns {string} Returns the joined string.
 */
function joinKeyValues(object, paths, separator, filterNilValues) {
  var values = _.pickValues(object, paths);

  if(filterNilValues) {
    values = _.compact(values);
  }

  return _.join(values, separator || ',');
}

/**
 * Creates an RFC4122 version 4 compliant GUID.
 *
 * @static
 * @memberOf _
 * @category String
 * @returns {string} Returns the GUID.
 */
function guid() {
  /*jshint -W016 */
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0;
    var v = (c === 'x' ? r : (r&0x3|0x8));
    return v.toString(16);
  });
  /*jshint +W016 */
}

/**
 * Inserts or replaces an element in an array by a given predicate.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to search.
 * @param {Array|Function|Object|string} [predicate=_.identity] The function invoked per iteration.
 * @param {*} object The data.
 * @param {boolean} [insertAtFront=false] Insert new elements at the front of the array.
 * @returns {Array} Returns the array.
 */
function insertOrReplaceBy(array, predicate, object, insertAtFront) {
  if(_.isArray(array)) {
    if(!spliceBy(array, predicate, object, insertAtFront)) {
      array.push(object);
    }
  } else {
    return [object];
  }

  return array;
}

/**
 * Inserts or updates an element in an array by a given predicate.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to search.
 * @param {Array|Function|Object|string} [predicate=_.identity] The function invoked per iteration.
 * @param {*} object The data.
 * @param {boolean} [insertAtFront=false] Insert new elements at the front of the array.
 * @returns {Array} Returns the array.
 */
function insertOrUpdateBy(array, predicate, object, insertAtFront) {
  if(_.isArray(array)) {
    if(!updateBy(array, predicate, object, insertAtFront)) {
      array.push(object);
    }
  } else {
    return [object];
  }

  return array;
}

function spliceBy(array, predicate, object, forceInsert) {
  var index = _.findIndex(array, predicate);

  if(index > -1) {
    array.splice(index, 1, object);
  } else if(forceInsert) {
    array.splice(0, 0, object);
  }

  return forceInsert || index > -1;
}

function updateBy(array, predicate, object, forceInsert) {
  var index = _.findIndex(array, predicate);

  if(index > -1) {
    _.assign(array[index], object);
  } else if(forceInsert) {
    array.splice(0, 0, object);
  }

  return forceInsert || index > -1;
}

/**
 * Removes an element from array at index and returns the removed element.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to modify.
 * @param {number} index The index of element to remove.
 * @returns {*} Returns the removed element.
 */
function removeAt(array, index) {
  return _.first(array.splice(index, 1));
}

/**
 * Moves an element inside an array by offset.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to modify.
 * @param {number} sourceIndex The index of element to move.
 * @param {number} [targetIndex] The index of element to move to.
 * @returns {*} Returns true if the array was mutated, else false.
 */
function move(array, sourceIndex, targetIndex) {
  if(!_.isNumber(targetIndex) || !_.isArray(array) || !_.inRange(targetIndex, 0, array.length)) {
    return false;
  }

  array.splice(targetIndex, 0, _.removeAt(array, sourceIndex));

  return true;
}

var BASE64_MARKER = ';base64,';
function toBlob(value) {
  if (value.indexOf(BASE64_MARKER) < 0) {
    return urlToBlob(value);
  }

  return base64ToBlob(value);
}

function base64ToBlob(data) {
  var parts = data.split(BASE64_MARKER);
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);

  var uInt8Array = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], {type: contentType});
}

function urlToBlob(url) {
  var parts = url.split(',');
  return new Blob([decodeURIComponent(parts[1])], {type: parts[0].split(':')[1]});
}

function getAspectRatio(width, height, isExact) {
  var _gcd = gcd(width, height);
  return (width / _gcd) + ':' + (height / _gcd);
}

/**
 * Gets the greatest common divider of two values.
 *
 * @static
 * @memberOf _
 * @category Number
 * @param {number} a The first value.
 * @param {number} b The second value.
 * @returns {number} Returns the greatest common divider.
 */
function gcd(a, b) {
  return b ? gcd(b, a % b) : Math.abs(a);
}


/**
 * Splits `string` by `separator` into `map`.
 *
 * **Note:** This method is based on
 * [`String#split`](https://mdn.io/String/split).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to split.
 * @param {RegExp|string} separator The separator pattern to split by.
 * @param {object} map The map with the binding indexies.
 * @param {number} [limit] The length to truncate results to.
 * @returns {Array} Returns the split values.
 * @example
 *
 * _.split('a-b-c', '-', {key: 0, value: 1});
 * // => {key: 'a', value: 'b'}
 */
function splitToMap(string, separator, map, limit) {
  var values = _.split(string, separator, limit);

  return _.transform(map, function(newMap, index, key) {
    newMap[key] = values[index];
  });
}

function search(values, query) {
  var results = [];
  var queries = getSearchQueries(query);

  values = _.asArray(values);

  _.forEach(values, function(value, index) {
    var lowerCaseValue = value.toLowerCase();
    var matches = [];

    _.forEach(queries, function(query, index) {
      var sensitiveIndex =  value.indexOf(query);
      var insensitiveIndex = lowerCaseValue.indexOf(query);

      if(sensitiveIndex > -1) {
        _.insertOrUpdateBy(matches, {index: sensitiveIndex}, {
          index: sensitiveIndex,
          length: query.length
        });
      }

      if(insensitiveIndex > -1) {
        _.insertOrUpdateBy(matches, {index: insensitiveIndex}, {
          index: insensitiveIndex,
          length: query.length
        });
      }
    });

    if(matches.length > 0) {
      results.push({
        index: index,
        value: value,
        matches: matches
      });
    }
  });

  var baseScore = _.max(_.map(results, 'value.length'));

  _.forEach(results, function(result) {
    result.score = 0;

    _.forEach(result.matches, function(match) {
      result.score += (baseScore - match.index) * match.length;
    });
  });

  return _.orderBy(results, ['score'], ['desc']);

  function getSearchQueries(query) {
    var queries = _.split(query, ' ');
    var result = [];

    for(var i = 0; i < queries.length; i++) {
      for(var index = 0; index < queries.length - i; index++) {
        var length = i+1;
        var resultValue = [];

        for(var j = 0; j < length; j++) {
          resultValue.push(queries[index+j]);
        }

        result.push(_.join(resultValue, ' '));
      }
    }

    return result;
  }

}

function keyByRemapValues(collection, keyIteratee, valueIteratee) {
  return _.mapValues(_.keyBy(collection, keyIteratee), valueIteratee);
}

/**
 * Copies all key-values in a object to a new object with new keys.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {object} object - The source object
 * @param {object} [mapping] - The mapping info
 * @param {boolean} [copyAll=true] - Copies key-values when they are not specified in the mapping.
 * @returns {object} The remapped object.
 * @example
 *
 * _.remap({a: 'test', b: 123, c: true}, {a: 'name', b: 'value'});
 * // => {name: '123', value: 123, c: true}
 *
 * _.remap({a: 'test', b: 123, c: true}, {a: 'name', b: 'value'}, false);
 * // => {name: '123', value: 123}
 *
 * _.remap({a: 'test', c: true}, {a: 'name', b: 'value'});
 * // => {name: '123', value: undefined, c: true}
 *
 * _.remap({a: 'test', c: true}, {a: 'name', b: 'value'}, false);
 * // => {name: '123', value: undefined}
 */
function remap(object, mapping, copyAll) {
  var result = _.zipObject(_.values(mapping), []);

  _.forEach(object, function(value, key) {
    if(_.has(mapping, key)) {
      _.set(result, _.get(mapping, key), value);
    } else if(copyAll !== false) {
      _.set(result, key, value);
    }
  });

  return result;
}

/**
 * Creates an array composed of the picked object property values. Values are returned in the same order as paths.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {object} object - The source object.
 * @param {string|string[]} [paths] - The property paths to pick.
 * @returns {Array}  Returns the picked values.
 * @example
 *
 * _.pickValues({a: 'test', b: 123, c: true}, ['b','a']);
 * // => [123, 'test']
 */
function pickValues(object, paths) {
  return _.map(paths, function(path) {
    return _.get(object, path);
  });
}

/**
 * Iterates over elements of collection, returning an array of all elements that has a one of the values in the path.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array - The array to iterate over.
 * @param {Array} values - The values to check for.
 * @param {string} path - The path of the property to compare with.
 * @returns {Array} Returns the new filtered array.
 * @example
 *
 * _.filterByValues([{id: 1}, {id: 2}, {id: 3}], [3, 2], 'id');
 * // => [{id: 3}, {id: 2}]
 */
function filterByValues(array, values, path) {
  return _.chain(array).keyBy(path).at(values).compact().value();
}


/**
 * Returns the number of bytes for a given value of type.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Number} value - The value.
 * @param {string} type - The type of the value.
 * @returns {Number} Returns the number of bytes.
 * @example
 *
 * _.bytes(10, 'MB');
 * // => 10485760
 *
 * _.bytes(1, 'TB');
 * // => 10995116277760
 *
 * _.bytes(15, 'KB');
 * // => 15360
 *
 * _.bytes(1, 'YB');
 * // => 1.8133887294219438e+25
 */
function bytes(value, type) {
  return value * Math.pow(2, (['KB','MB','GB','TB','PB','EB','ZB','YB'].indexOf(type) + 1) * 10);
}
})();
(function(){
'use strict';
//= wrapped

angular
	.module('systaro.core')
	.directive('uisOwlCarousel', uisOwlCarousel);

function uisOwlCarousel($timeout) {
	var directive = {
		restrict: 'A',
		link: link
	};

	return directive;


	function link($scope, $elem, $attr) {
		$timeout(function () {
			$($elem)
				.addClass('owl-carousel owl-theme')
				.owlCarousel({
					loop: true,
					items: 1,
					dots: true,
					autoplay: true,
					autoplaySpeed: 1000
				});
		}, 10);
	}
}
uisOwlCarousel.$inject = ["$timeout"];
})();
(function(){
'use strict';
//= wrapped
//= require_self
//= require_tree services

angular.module("streama.core", ['ngResource'])
    .constant("contextPath", window.contextPath)
    .config(config);

function config($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    $httpProvider.interceptors.push(httpRequestInterceptor);
}
config.$inject = ["$httpProvider"];

function httpRequestInterceptor(contextPath) {
    return {
        request: function (config) {
            if (!config.url.indexOf("/") == 0 && contextPath) {
                config.url = contextPath + "/" + config.url;
            }
            return config;
        }
    };
}
httpRequestInterceptor.$inject = ["contextPath"];
})();
(function(){
'use strict';
//= wrapped

/*
    NOTE: This file is used by the create-ng-domain action.
    You can modify or extend the DomainServiceFactory but it is recommended that you not delete it.
*/

angular
    .module("streama.core")
    .factory("DomainServiceFactory", DomainServiceFactory);

function DomainServiceFactory($resource) {
    return function(url, paramDefaults, actions, options) {
        var resourceActions = {"update": {method: "PUT"}, "list": {method: "GET", isArray: true}};
        angular.extend(resourceActions, actions);

        return $resource(
            url,
            paramDefaults || null,
            resourceActions,
            options || {}
        );
    }
}
DomainServiceFactory.$inject = ["$resource"];

})();
(function(){
'use strict';
//= wrapped

//= require_self
//= require_tree translations

angular.module('streama.translations', ['pascalprecht.translate'])
	.config(["$translateProvider", function ($translateProvider) {
		$translateProvider.determinePreferredLanguage();
		$translateProvider.fallbackLanguage('en');
	}])

	.run(["$rootScope", function ($rootScope) {
		$rootScope.availableLanguages = ['en', 'fr', 'es', 'de', 'kr', 'nl', 'pt', 'da', 'ja', 'it', 'ar', 'ru', 'cn', 'hu'];
	}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by antonia on 14/05/16.
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
  $translateProvider.translations('cn', {
    LOGIN: {
      TITLE: '请登录',
      USERNAME: '用户名',
      PASSWORD: '密码',
      FIRST_TIME_HINT: '第一次使用？ 试试用 \'admin\' 作为用户名和密码登录。',
      SUBMIT: '登录',
      SESSION_EXPIRED: '你的会话已过期，请重新登录'
    },
    DASHBOARD: {
      HOME: '主页',
      TV_SHOWS: '节目',
      MOVIES: '电影',
      MY_LIST:'我的片单',
      TITLE: '回到主页',
      RECOMMENDATIONS: '为你推荐',
      NEW_RELEASES: '最新发售',
      CONTINUE_WATCHING: '继续观看',
      DISCOVER_SHOWS: '探索更多节目',
      DISCOVER_MOVIES: '探索更多电影',
      DISCOVER_OTHER_VIDEOS: '探索更多内容',
      SORT: '排序：',
      SEARCH_BY_NAME: '输入一个名字...',
      FILTER_BY_TAG: '根据标签过滤...',
      FILTER_BY_GENRE: '根据类型过滤...',
      BROWSE_GENRES: '查看所有类型',
      LOOKING_AT_GENRE: '你正在查看：',
      MARK_COMPLETED: '标记为看过',
      NO_TVSHOWS_FOUND: '没有任何节目可用',
      NO_WATCHLIST_FOUND: '這裡什麼都沒有',
      NO_MOVIES_FOUND: '没有任何电影可用',
      WATCHLIST: '我的片单'
    },
    VIDEO: {
      RELEASED: '发布于',
      IMDB: 'IMDB',
      RATING: '评分',
      VOTES: '投票',
      OVERVIEW: '简介',
      GENRE: '类型',
      TRAILER: '预告',
      SEASON: '季度',
      SUBTITLES: '字幕',
      NO_SUBTITLE: '没有字幕',
      SUBTITLE_SIZE: '字幕尺寸',
      VIDEO_FILES: '视频源',
      UPNEXT: '即将播放...'
    },

    MESSAGES: {
      SHARE_SOCKET: '通过这个按钮你将会看到地址栏有一个唯一id值，请复制这个完整地址发送给您的好友，这样您的好友就会知道您的观看进度了',
      FILE_MISSING: '这个内容出现了一些问题，看起来你已经删除了相关的视频文件。',
      CODEC_PROBLEM: '向播放器中添加视频文件似乎有问题。这很可能是由于一个编解码器问题。尝试将其转换为兼容的HTML5编解码器，删除当前附加的文件并重新添加。如果编解码器没有问题，请检查服务器的错误日志和设置中的基本URL。',
      WRONG_BASEPATH: '您的视频使用了错误的基本路径，但是您正在通过“{{basePath}}”浏览页面。请确保在设置中设置了正确的基本路径，并使用它来浏览应用程序。',
      FILE_IN_FS_NOT_FOUND: '您的视频无法在任何位置可用的应用程序。请检查设置和文件系统，以确保应用程序可以访问这些文件'
    },
    MANAGE_CONTENT: '管理内容',
    MANAGE_SUB_PROFILES: '编辑个人资料',
    WHOS_WATCHING: '现在是谁在观看？',
    ADD_SUB_PROFILE: '添加个人资料',
    EDIT_BTN: '编辑',
    DONE_BTN: '好',
    SAVE_BTN: '保存',
    CREATE_BTN: '创建',
    CANCEL_BTN: '取消',
    DELETE_BTN: '抹掉',
    ENTER_NAME: '输入名字',
    EDIT_PROFILE: '编辑个人资料',
    CREATE_PROFILE: '创建个人资料',
    ADMIN: 'Admin',
    HELP: '帮助',
    HELP_FAQ: '帮助 / 常见问题',
    PROFILE_SETTINGS: '用户设置',
    LOGOUT: '登出',
    CHANGE_PASSWORD: '更改密码',
    LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_en: 'English',
    LANGUAGE_ru: 'Русский/Russian',
    LANGUAGE_de: 'Deutsch/German',
    LANGUAGE_fr: 'Français/French',
    LANGUAGE_es: 'Español/Spanish',
    LANGUAGE_kr: '한국어/Korean',
    LANGUAGE_nl: 'Nederlands/Dutch',
    LANGUAGE_pt: 'Português/Portuguese',
    LANGUAGE_ja: '日本語/Japanese',
    LANGUAGE_it: 'Italiano/Italian',
    LANGUAGE_da: 'Dansk/Danish',
    LANGUAGE_ar: 'عربى/Arabic',
    LANGUAGE_hu: 'Magyar/Hungarian',
    PROFIlE: {
      USERNAME: '用户名',
      FULL_NAME: '完整名字',
      LANGUAGE: '语言',
      PAUSE_ON_CLICK: '点击画面时暂停播放',
      FAVORITE_GENRES: '收藏的类型',
      AMOUNT_OF_MEDIA_ENTRIES: '主页显示的视频数量',
      SAVE: '保存',
      PASS: '密码',
      OLD_PASS: '旧密码',
      NEW_PASS: '新密码',
      NEW_PASS_PLACEHOLDER: '新密码  (最少6位数)',
      REPEAT_PASS: '重复密码',
      PASS_ERROR_EMPTY: '密码不能为空！',
      PASS_ERROR_LENGTH: '密码最少为6位数！',
      PASS_ERROR_REPEAT: '两次密码不匹配！',
      SAVE_PASS: '保存更改'
    },

    SORT_OPTIONS: {
      AZ: 'A-Z',
      ZA: 'Z-A',
      NEWEST_ADDED: '最近上架',
      OLDEST_ADDED: '最初上架',
      NEWEST_RELEASED: '最新发布',
      OLDEST_RELEASED: '最初发布',
      NEWEST_AIRED: '热门选择',
      OLDEST_AIRED: '重温老片',
      NEWEST_REPORTED: '最新报道',
      OLDEST_REPORTED: '最初报道',
      NEWEST_UPDATED: '最近更新',
      OLDEST_UPDATED: '最初更新'
    },

    FAQ: {
      UPLOAD_VIDEO: {
        TITLE: '我怎样才能上传视频？',
        TEXT: "你可以通过管理内容菜单来上传视频。选择是否上传电影、电视节目或其他视频。单击相关的子菜单选项" +
          " 在屏幕左侧的垂直导航栏上。你可以通过点击“新建电影/电视节目/其他视频”按钮或输入来上传视频" +
          " 要上载到搜索栏的视频的名称，并从搜索结果中选择相关的电影。之后，你可以选择填写视频" +
          " 的信息手动或从TheMovieDB加载其信息。之后，您可以通过单击“管理文件”按钮上传视频和字幕文件。"
      },
      DELETE_VIDEO: {
        TITLE: '我怎样才能删除一个视频？',
        TEXT: "您可以通过进入视频的信息页面，点击管理文件并选择红色垃圾桶图标来删除视频。点击编辑电影和选择" +
          " 删除影片是另一种方法。您还可以使用“管理内容”菜单中的“文件管理器”。你可以看到你上传的所有文件。点击" +
          " 删除文件的红色垃圾桶图标。"
      },
      VIDEO_FORMATS: {
        TITLE: '什么样的视频格式受支持？',
        TEXT: "MoviePlace目前只支持HTML5 player支持的视频文件格式。你可以通过拖放一个视频到浏览器来测试你的视频文件是否兼容HTML5 player"
      },
      SUBTITLES: {
        TITLE: '如何为视频添加字幕?',
        TEXT: "你可以通过点击视频信息页面上的“管理文件”按钮为视频添加字幕。你可以拖放字幕文件。" +
          " 以前您必须手动将它们转换为兼容的文件格式，但现在不需要了！现在MoviePlace将为您处理这个问题。"
      },
      INVITE_USERS: {
        TITLE: '如何邀请朋友观看我的视频?',
        TEXT:"你可以邀请你的朋友使用你的MoviePlace来分享你的视频。转到用户菜单并单击邀请用户按钮。填写邀请表格" +
          " 选择受邀者的角色。具有Admin角色的用户可以编辑用户和设置。具有角色内容管理器的用户可以编辑内容。你的朋友会" +
          " 接收到我们通过电子邮件发出的邀请。您还可以通过单击视频播放器的共享按钮并将会话URL链接到您的朋友来共享视频会话。"
      },
      BASE_URL: {
        TITLE: "什么是基本URL，我应该如何配置它?",
        TEXT: "Base-URL用于邀请邮件中的视频和链接。"
      },
      NOTIFICATIONS: {
        TITLE: "通知是什么?",
        TEXT: "你可以通过发送通知消息通知你的朋友上传的视频。您可以通过单击将它们添加到通知队列来发送它们" +
          " 添加通知按钮，这是在您的视频的信息页面，并前往通知菜单和点击发送队列按钮。"
      },
      VIDEO_PLAYER_SHORTCUTS: {
        TITLE: "视频播放器有快捷键吗?",
        TEXT: "是的。暂停/继续请按空格。音量:向上或向下的箭头键。跳过视频向前/向后:箭头键左或右。长跳过:" +
          " control + 方向键. 全屏开/关:alt + 回车。字幕开/关:S，静音:M，回到上一页" +
          " screen: delete 或者退格."
      },
      FAVORITE_GENRES: {
        TITLE: "用户喜欢的类型如何影响Streama?",
        TEXT: "暂无"
      },
      USEFUL_LINKS: {
        TITLE: "有用的链接",
        TEXT: "暂无"
      }
    }
  });
}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by antonia on 14/05/16.
 * Translation by @ManuGithubSteam and @bastilimbach on 14/01/17
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('de', {
		LOGIN: {
			TITLE: 'Bitte einloggen',
			USERNAME: 'Benutzername',
			PASSWORD: 'Passwort',
			FIRST_TIME_HINT: 'Erstes mal hier? Versuche \'admin\' als Benutzername und Passwort.',
			SUBMIT: 'Login',
      SESSION_EXPIRED: 'Deine Sitzung ist abgelaufen. Bitte logge dich erneut ein.'
		},
		DASHBOARD: {
      HOME: 'Startseite',
      TV_SHOWS: 'Fernsehshows',
      MOVIES: 'Filme',
      MY_LIST:'Meine Liste',
			TITLE: 'Dashboard',
			NEW_RELEASES: 'Neuerscheinungen',
			CONTINUE_WATCHING: 'Weiterschauen',
			DISCOVER_SHOWS: 'Entdecke Serien',
			DISCOVER_MOVIES: 'Entdecke Filme',
			DISCOVER_OTHER_VIDEOS: 'Entdecke Videos',
			SORT: 'Sortierung:',
			SEARCH_BY_NAME: 'Nach Namen suchen...',
			FILTER_BY_TAG: 'Nach Tag filtern...',
      FILTER_BY_GENRE: 'Nach Genre filtern...',
			BROWSE_GENRES: 'Genres',
			LOOKING_AT_GENRE: 'Ausgewähltes Genre:',
			MARK_COMPLETED: 'Als gesehen Markieren',
			NO_TVSHOWS_FOUND: 'Keine Serien verfügbar',
      NO_WATCHLIST_FOUND: 'Noch keine Einträge',
			NO_MOVIES_FOUND: 'Keine Filme verfügbar',
      WATCHLIST: 'Beobachtungsliste'
    },
		VIDEO: {
			RELEASED: 'Veröffentlichung',
			IMDB: 'IMDB',
			RATING: 'Bewertungen',
			VOTES: 'Stimmen',
			OVERVIEW: 'Zusammenfassung',
			GENRE: 'Genre',
			TRAILER: 'Trailer',
			SEASON: 'Staffel',
      NO_SUBTITLE: 'Keine Untertitel'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Mit dem erstellen einer neuen Sitzung bekommst du eine eindeutige ID, welche du dann an deine Freunde weiterleiten kannst um den Film mit ihnen synchron zu genießen!',
			FILE_MISSING: 'Es gibt ein Problem mit dem Video. Es scheint als sei die dazugehörig Videodatei entfernt worden.',
			CODEC_PROBLEM: 'Es gibt ein Problem beim hinzufügen des Videos zum Player. Dies ist meist ein Kodierungsproblem. Versuche deine Videos in einen HTML5 fähigen Codec zu konvertieren. Lösche die aktuelle Datei und füge die recodierte hinzu. Wenn der Codec korrekt ist, überprüfe die Error-Logs und die Servereinstellungen.',
			WRONG_BASEPATH: 'Dein Video wird mit einem falschen Basispfad eingefügt. Du besuchst diese Seite über "{{basePath}}". Vergewissere dich, ob der korrekte Basispfad in den Einstellungen hinterlegt ist, und du diesen beim nächsten mal besuchst.'
		},
		MANAGE_CONTENT: 'Inhalte verwalten',
    MANAGE_SUB_PROFILES: 'Profile verwalten',
    WHOS_WATCHING: 'Wer ist gerade aktiv?',
    ADD_SUB_PROFILE: 'Profil hinzufügen',
    EDIT_BTN: 'Bearbeiten',
    DONE_BTN: 'Fertig',
    SAVE_BTN: 'Speichern',
    CREATE_BTN: 'Erstellen',
    CANCEL_BTN: 'Abbrechen',
    DELETE_BTN: 'Löschen',
    ENTER_NAME: 'Namen eingeben',
    EDIT_PROFILE: 'Profil bearbeiten',
    CREATE_PROFILE: 'Profil erstellen',
		ADMIN: 'Administratorenbereich',
		HELP: 'Hilfe',
		HELP_FAQ: 'Hilfe / FAQ',
		PROFILE_SETTINGS: 'Profileinstellungen',
		LOGOUT: 'Ausloggen',
		CHANGE_PASSWORD: 'Passwort ändern',
	LANGUAGE_cn: 'Chinese/中文',
	LANGUAGE_en: 'English/Englisch',
    LANGUAGE_ru: 'Русский/Russisch',
    LANGUAGE_de: 'Deutsch',
    LANGUAGE_fr: 'Français/Französisch',
    LANGUAGE_es: 'Español/Spanisch',
    LANGUAGE_kr: '한국어/Koreanisch',
    LANGUAGE_nl: 'Nederlands/Niederländisch',
    LANGUAGE_pt: 'Português/Portugiesisch',
    LANGUAGE_ja: '日本語/Japanisch',
    LANGUAGE_it: 'Italiano/Italienisch',
    LANGUAGE_da: 'Dansk/Dänisch',
    LANGUAGE_ar: 'عربى/Arabisch',
    LANGUAGE_hu: 'Magyar/Ungarisch',
		PROFIlE: {
			USERNAME: 'Benutzername',
			FULL_NAME: 'Echter Name',
			LANGUAGE: 'Sprache',
			PAUSE_ON_CLICK: 'Videos durch klicken pausieren',
			FAVORITE_GENRES: 'Lieblingsgenres',
			SAVE: 'Profil speichern',
			OLD_PASS: 'Altes Passwort',
			NEW_PASS: 'Neues Passwort',
			NEW_PASS_PLACEHOLDER: 'Neues Passwort  (mindestens 6 Zeichen)',
			REPEAT_PASS: 'Passwort wiederholen',
			SAVE_PASS: 'Passwort speichern',
      AMOUNT_OF_MEDIA_ENTRIES: 'Aktivitäten auf dem Dashboard (Bevor per Button mehr geladen werden können)'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Zuletzt hinzugefügt',
			OLDEST_ADDED: 'Zuerst hinzugefügt',
			NEWEST_RELEASED: 'Neuste Veröffentlichung',
			OLDEST_RELEASED: 'Älteste Veröffentlichung',
			NEWEST_AIRED: 'Zuletzt ausgestrahlt',
			OLDEST_AIRED: 'Zuerst ausgestrahlt'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Wie kann ich ein Video hochladen?',
				TEXT: "Du kannst Videos hochladen indem du auf Inhalte verwalten klickst. Wähle aus, ob du eine Serie, einen Film oder ein Video hochladen möchtest. Klicke auf die relevante Option " +
				"auf der linken Seite. Dann klicke auf den Button rechts. Danach öffent sich die Suchleiste, in den du den Titel des Film eingibst. Dies kannst du auch manuell machen, falls keine Vorschläge geladen werden. " +
				"Im Anschluss kannst du das Video mit einer Datei verknüpfen oder eine Datei hochladen."

			},
			DELETE_VIDEO: {
				TITLE: 'Wie kann ich ein Video löschen?',
				TEXT: "Du kannst Videos in der Videoinformationsseite löschen, wenn du Inhalte verwalten anklickst und dann auf den roten Mülleimer. Video editieren anklicken und dann Video löschen" +
				" an zu klicken ist ein anderer Weg ein Video zu löschen. Du kannst auch den Filemanager benutzen, der sich im Inhalte Verwalten Menü befindet." +
				" Auch hier den roten Mülleimer verwenden."
			},
			VIDEO_FORMATS: {
				TITLE: 'Welche Video Formate werden unterstützt?',
				TEXT: "Streama unterstützt im Moment nur Formate für den HTML5 player. Du kannst testen ob deine Videodatei HTML5 kompatiebel ist, indem du diese in einem Browsertab/Browserfenster öffnest."
			},
			SUBTITLES: {
				TITLE: 'Wie kann ich Untertitel zu Videos hinzufügen?',
				TEXT: "Du kannst Untertitel in der Videosinformationsseite unter Inhalte verwalten. Du kannst dort Untertitel durch Drag and Drop hinzufügen. " +
				"Die Untertitel müssen nicht mehr konvertiert werden."
			},
			INVITE_USERS: {
				TITLE: 'Wie kann ich gehostete Videos mit Freunden teilen?',
				TEXT:"Du kannst deine Videos auf Streama teilen, indem du deine Freunde einlädst. Gehe zum Benutzermenü und klicke auf den Einladen-Button. Fülle das Formular aus" +
				" und wähle die Rollen. Benutzer mit der Rolle \"Admin\" können Benutzer und Einstellungen ändern. Benutzer mit der Rolle \"Content Manager\" können Inhalte verwalten." +
				" Deine Freunde werden durch eine E-Mail benachrichtigt, dass du sie eingeladen hast. Du kannst auch Videositzungen teilen (also Synchron gucken) indem du auf den Teilen Button des Videoplayers drückst und die Sitzungs-URL teilst."
			},
			BASE_URL: {
				TITLE: "Was ist die base URL und wie sollte sie konfiguriert werden?",
				TEXT: "Die base URL wird für Email Einladungen benutzt."
			},
			NOTIFICATIONS: {
				TITLE: "Was sind Benachrichtigungen?",
				TEXT: "Du kannst deine eingeladenen Freunde über hochgeladene Videos mit Benachrichtigungen informieren. Du kannst diese zur Benachrichtigungswarteschlange hinzufügen, indem du den Benachrichtigungsknopf in der Informationsseite drückst und im Benachrichtungsmenu auf Senden klickst."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "Unterstützt der Player Tastaturkurzbefehle?",
				TEXT: "Ja. Pause/Weiter: Leertaste. Lautstärke: Pfeiltasten hoch oder runter. Videosprünge vor/zurück: Pfeiltasten rechts oder links. Langer Sprung:" +
				" Steuerung + Pfeiltasten links oder rechts. Vollbildschirm an/aus: Alt + Enter. Untertitel an/aus: S, Mute: M, Zurück zum vorherigen Bildschirm" +
				" : Enf oder Rücktaste."
			},
			FAVORITE_GENRES: {
				TITLE: "Wie beeinflussen die Lieblings-Genres des Nutzers Streama?",
				TEXT: "Noch gar nicht, es wird daran gearbeitet."
			},
			USEFUL_LINKS: {
				TITLE: "Nützliche links",
				TEXT: "Auch hieran wird gearbeitet."
			}
		}
	});
}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by Anderzzenn on 05/03/17.
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('da', {
		LOGIN: {
			TITLE: 'Log Ind',
			USERNAME: 'Brugernavn',
			PASSWORD: 'Kodeord',
			FIRST_TIME_HINT: 'Første gang du logger ind? Prøv \'admin\' i begge felter.',
			SUBMIT: 'Log Ind',
      SESSION_EXPIRED: 'Din session er udløbet siden din sidste aktivitet. Venligst log ind igen.'
		},
		DASHBOARD: {
      HOME: 'Hjemmeside',
      TV_SHOWS: 'TV-shows',
      MOVIES: 'Films',
      MY_LIST:'Min liste',
			TITLE: 'Betjeningspanel',
			RECOMMENDATIONS: 'Foreslået til dig',
			NEW_RELEASES: 'Nye Udgivelser',
			CONTINUE_WATCHING: 'Se videre',
			DISCOVER_SHOWS: 'Opdag Serier',
			DISCOVER_MOVIES: 'Opdag Film',
			DISCOVER_OTHER_VIDEOS: 'Opdag Andre Videoer',
			SORT: 'Sorter:',
			SEARCH_BY_NAME: 'Søg via Navn...',
			FILTER_BY_TAG: 'Filtrer via Tag...',
			BROWSE_GENRES: 'Gennemse',
			LOOKING_AT_GENRE: 'Du ser på genren:',
			MARK_COMPLETED: 'Marker færdigt',
			NO_TVSHOWS_FOUND: 'Ingen TV-Serier tilgængelig',
      NO_WATCHLIST_FOUND: 'Intet her endnu',
			NO_MOVIES_FOUND: 'Ingen Film tilgængelig',
      WATCHLIST: 'se senere'
		},
		VIDEO: {
			RELEASED: 'Udgivet',
			IMDB: 'IMDB',
			RATING: 'Bedømmelse',
			VOTES: 'Stemmer',
			OVERVIEW: 'Oversigt',
			GENRE: 'Genre',
			TRAILER: 'Trailer',
			SEASON: 'Sæson',
      NO_SUBTITLE: 'Ingen undertekst'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Ved at lave en ny session vil du blive sendt tilbage til denne afspiller, men denne gang vil du have et unikt session ID i linket. Del dette med dine venner for at have en synkroniseret film oplevelse med dem!',
			FILE_MISSING: 'Der er et problem med dette indhold. Det virker til du har slettet video filen associeret med indholdet.',
			CODEC_PROBLEM: 'Der virker til at være et problem med at tilføje video filen til afspilleren. Det er mest sandsynligt pågrund af et kodeks problem. Prøv at konvertere til et HTML5 kompitabelt kodeks, fjern den nuværende fil og tilføj den igen. Hvis kodekset er korrekt, tjek serverns fejl log og Base URL i indstillingerne.',
			WRONG_BASEPATH: 'Din video bliver inkluderet med det forkerte base path, men du browser siden via "{{basePath}}. Vær sikker på du har sat den korrekte Base Path i indstillinger og at to bruger det til at browse applikationen.',
			FILE_IN_FS_NOT_FOUND: 'Din video kan ikke blive fundet i nogle af applikationens tilgænlige lokationer. Venligst tjek dine indstillger og dit fil system for at være sikker på at applikationen kan få adgang til filerne.'
		},
		MANAGE_CONTENT: 'Administrer Indhold',
    MANAGE_SUB_PROFILES: 'Administrere profiler',
    WHOS_WATCHING: 'Hvem ser det?',
    ADD_SUB_PROFILE: 'Tilføj profil',
    EDIT_BTN: 'Redigere',
    DONE_BTN: 'Færdig',
    SAVE_BTN: 'Gemme',
    CREATE_BTN: 'skab',
    CANCEL_BTN: 'Afbestille',
    DELETE_BTN: 'Slet',
    ENTER_NAME: 'Indtast navn',
    EDIT_PROFILE: 'Rediger profil',
    CREATE_PROFILE: 'Opret profil',
		ADMIN: 'Admin',
		HELP: 'Hjælp',
		HELP_FAQ: 'Hjælp / FAQ',
		PROFILE_SETTINGS: 'Profil Indstillinger',
		LOGOUT: 'Log Ud',
		CHANGE_PASSWORD: 'Skift Kodeord',
	LANGUAGE_en: 'English/Engelsk',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/Russisk',
    LANGUAGE_de: 'Deutsch/Tysk',
    LANGUAGE_fr: 'Français/Fransk',
    LANGUAGE_es: 'Español/Spansk',
    LANGUAGE_kr: '한국어/Koreansk',
    LANGUAGE_nl: 'Nederlands/Hollandsk',
    LANGUAGE_pt: 'Português/Portugisisk',
    LANGUAGE_ja: '日本語/Japansk',
    LANGUAGE_it: 'Italiano/Italiensk',
    LANGUAGE_da: 'Dansk',
    LANGUAGE_ar: 'عربى/Arabisk',
    LANGUAGE_hu: 'Magyar/Ungarsk',
		PROFIlE: {
			USERNAME: 'Brugernavn',
			FULL_NAME: 'Fulde Navn',
			LANGUAGE: 'Sprog',
			PAUSE_ON_CLICK: 'Pause videon når der klikkes',
			FAVORITE_GENRES: 'Favorit Genrer',
			SAVE: 'Gem Profil',
			PASS: 'Kodeord',
			OLD_PASS: 'Gammelt Kodeord',
			NEW_PASS: 'Nye Kodeord',
			NEW_PASS_PLACEHOLDER: 'Nye Kodeord  (min. 6 Tegn)',
			REPEAT_PASS: 'Gentag Kodeord',
			PASS_ERROR_EMPTY: 'Kodeordet kan ikke være tomt',
			PASS_ERROR_LENGTH: 'Kodeordet skal være mindst 6 tegn langt',
			PASS_ERROR_REPEAT: 'Kodeordene skal være ens.',
      AMOUNT_OF_MEDIA_ENTRIES: 'Antal videoer på Dashboard (Før "Load More")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Senest Tilføjet',
			OLDEST_ADDED: 'Tilføjet Først',
			NEWEST_RELEASED: 'Nyeste Udgivelse',
			OLDEST_RELEASED: 'Ældste Udgivelse',
			NEWEST_AIRED: 'Senest Udsendt',
			OLDEST_AIRED: 'Ældste Udsendt'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Hvordan uploader jeg en video?',
				TEXT: "Du kan uploade videoer ved at gå til Administrer Indhold menuen. Vælg om du vil uploade en Film, TV Serie eller en Anden video. Klik på den relevante undermenu mulighed" +
				"på den lodrette navigations bar på venstre side af skærmen. Du kan uploade en video ved at trykke på Opret Ny Film/TV Serie/Andre Film knappen eller ved at skrive" +
				" navnet på videoen du vil uploade til søge feltet og vælg the relevante film fra søge resultaterne. Efter det, kan du vælge at udfylde videons information" +
        " manuelt eller ved at indlæse dens information fra TheMovieDB. Efter det, kan du uploade video og undertekst filerne ved at trykke Administrer Filer knappen."
			},
			DELETE_VIDEO: {
				TITLE: 'Hvordan sletter jeg en video?',
				TEXT: "Du kan slette en video ved at gå til videoens informations side og trykke på Administrer Filer og så trykke på det røde skraldespands ikon. Du kan også trykke på" +
        " Rediger Film og så trykke på Slet Film. Du kan også bruge Filhåndtering som ligger i Administrer Indhold menuen. Du kan se alle filerne der er blevet upload der. Tryk" +
        " på det røde skraldespands ikon for at slette en fil."
			},
			VIDEO_FORMATS: {
				TITLE: 'Hvilke video typer er understøttet?',
				TEXT: "Lige nu understøtter Steama kun video typer som er understøttet af HTML5 spilleren. Du kan teste om din video fil er HTML5 kompitabel ved at trække og slippe" +
        " din fil på en tom fane i din browser."
			},
			SUBTITLES: {
				TITLE: 'Hvordan tilføjer jeg undertekster til videoer?',
				TEXT: "Du kan tilføje undertekster til videoer ved at trykke på Administrer Filer knappen som er under videoens informations side. Du kan trække og slippe" +
        " undertekst filer der. " +
        "Tidligere skulle du manuelt konvertere dem til en kompitabel fil format. Men det skal du ikke længere! Nu gør applikationen det for dig."
			},
			INVITE_USERS: {
				TITLE: 'Hvordan kan jeg invitere venner til at se mine hostede videoer?',
				TEXT:"Du kan dele dine videoer med dine venner ved at invitere dem til dit hostede Streama. Gå til Bruger menuen og klik på Inviter Bruger knappen. Udfyld invitations formen" +
        " og vælg den inviteredes rolle(r). Brugere med Admin rollen kan redigere Brugere & Indstillinger. Brugere med rollen Indholds Manager kan redigere indhold. Dine venner vil" +
        " få invitationen via email. Du kan også dele video sessioner med dine venner ved at trykke på video afspilerens Del knap og så sende dem session linket til dem."
			},
			BASE_URL: {
				TITLE: "Hvad er base URL og hvordan konfigurer jeg det?" +
        "What's the base URL and how should I configure it?",
				TEXT: "Base-URL bliver brugt til videoerne og linket i invitation-emails."
			},
			NOTIFICATIONS: {
				TITLE: "Hvad er notifikationer?",
				TEXT: "Du kan notificere dine inviterede venner omkring uploadede videoer ved at sende dem en notifikations meddelelse. Du kan sende dem ved at tilføje dem til din notifikations" +
        "kø ved at trykke på Tilføj Notifikation knappen hvilket er under din videos informations side og gå til Notifikations menuen og trykke på Send Queue knappen."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "Har video afspilleren nogle genvejs taster?",
				TEXT: "Ja. Pause/Unpause: Mellemrum. Juster lyd: piletasterne op eller ned. Spol frem og tilbage i videoen: piletasterne venstre eller højere." +
        " Langt spring: kontrol + piletasterne venstre eller højere. Fuldskærm fra/til: Alt + Enter. Undertekster til/fra: S, Slå lyd fra: M," +
        " Gå tilbage til den tidligere skærm: Delete eller tilbagetasten"
			},
			FAVORITE_GENRES: {
				TITLE: "Hvordan påvirker en brugers favorit genrer Streama?",
				TEXT: "Kommer snart..."
			},
			USEFUL_LINKS: {
				TITLE: "Brugfulde links",
				TEXT: "Kommer snart..."
			}
		}
	});
}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by antonia on 14/05/16.
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
  $translateProvider.translations('en', {
    LOGIN: {
      TITLE: 'Please Login',
      USERNAME: 'Username',
      PASSWORD: 'Password',
      FIRST_TIME_HINT: 'First time logging in? Try \'admin\' for both fields.',
      SUBMIT: 'Login',
      SESSION_EXPIRED: 'Your session expired since your last activity. Please login again.'
    },
    DASHBOARD: {
      HOME: 'Home',
      TV_SHOWS: 'TV Shows',
      MOVIES: 'Movies',
      MY_LIST:'My list',
      TITLE: 'Dashboard',
      RECOMMENDATIONS: 'Recommendations for you',
      NEW_RELEASES: 'New Releases',
      CONTINUE_WATCHING: 'Continue Watching',
      DISCOVER_SHOWS: 'Discover Shows',
      DISCOVER_MOVIES: 'Discover Movies',
      DISCOVER_OTHER_VIDEOS: 'Discover other videos',
      SORT: 'Sort:',
      SEARCH_BY_NAME: 'Search by Name...',
      FILTER_BY_TAG: 'Filter by Tag...',
      FILTER_BY_GENRE: 'Filter by Genre...',
      BROWSE_GENRES: 'Browse Genre',
      LOOKING_AT_GENRE: 'You\'re looking at the genre:',
      MARK_COMPLETED: 'Mark completed',
      NO_TVSHOWS_FOUND: 'No Tv-Shows Available',
      NO_WATCHLIST_FOUND: 'Nothing here yet',
      NO_MOVIES_FOUND: 'No Movies Available',
      WATCHLIST: 'Watchlist'
    },
    VIDEO: {
      RELEASED: 'Released',
      IMDB: 'IMDB',
      RATING: 'Rating',
      VOTES: 'Votes',
      OVERVIEW: 'Overview',
      GENRE: 'Genre',
      TRAILER: 'Trailer',
      SEASON: 'Season',
      SUBTITLES: 'Subtitles',
      NO_SUBTITLE: 'No Subtitle',
      SUBTITLE_SIZE: 'Subtitle Sizes',
      VIDEO_FILES: 'Video Sources',
      UPNEXT: 'Up Next...'
    },

    MESSAGES: {
      SHARE_SOCKET: 'By creating a new session you will be redirected back to this player, but this time you will have a unique session ID in the url. Share this with your friends to have a synchronized watching experience with them!',
      FILE_MISSING: 'There is a problem with this content. It seems you removed the associated video file from it.',
      CODEC_PROBLEM: 'There seems to be a problem adding the video-file to the player. This is most likely due to a codec-problem. Try converting it to a compatible HTML5 codec, remove the currently attached file and re-add it. If the codecs are fine, check the error log of the server and the base URL in the settings.',
      WRONG_BASEPATH: 'Your video get\'s included using the wrong Base Path, but you are browsing the page via "{{basePath}}". Make sure you set the correct Base Path in the settings and that you are using it to browse the application.',
      FILE_IN_FS_NOT_FOUND: 'Your video cannot be found in any of the locations available to the application. Please check your settings and your file system to make sure that the files are accessible by the application.'
    },
    MANAGE_CONTENT: 'Manage Content',
    MANAGE_SUB_PROFILES: 'Manage profiles',
    WHOS_WATCHING: 'Who\'s watching?',
    ADD_SUB_PROFILE: 'Add Profile',
    EDIT_BTN: 'Edit',
    DONE_BTN: 'Done',
    SAVE_BTN: 'Save',
    CREATE_BTN: 'Create',
    CANCEL_BTN: 'Cancel',
    DELETE_BTN: 'Delete',
    ENTER_NAME: 'Enter name',
    EDIT_PROFILE: 'Edit profile',
    CREATE_PROFILE: 'Create profile',
    ADMIN: 'Admin',
    HELP: 'Help',
    HELP_FAQ: 'HELP / FAQ',
    PROFILE_SETTINGS: 'User Settings',
    LOGOUT: 'Logout',
    CHANGE_PASSWORD: 'Change Password',
    LANGUAGE_en: 'English',
    LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/Russian',
    LANGUAGE_de: 'Deutsch/German',
    LANGUAGE_fr: 'Français/French',
    LANGUAGE_es: 'Español/Spanish',
    LANGUAGE_kr: '한국어/Korean',
    LANGUAGE_nl: 'Nederlands/Dutch',
    LANGUAGE_pt: 'Português/Portuguese',
    LANGUAGE_ja: '日本語/Japanese',
    LANGUAGE_it: 'Italiano/Italian',
    LANGUAGE_da: 'Dansk/Danish',
    LANGUAGE_ar: 'عربى/Arabic',
    LANGUAGE_hu: 'Magyar/Hungarian',
    PROFIlE: {
      USERNAME: 'Username',
      FULL_NAME: 'Full Name',
      LANGUAGE: 'Language',
      PAUSE_ON_CLICK: 'Pause Video on Click',
      FAVORITE_GENRES: 'Favorite Genres',
      AMOUNT_OF_MEDIA_ENTRIES: 'Amount of Videos on Dashboard (Before "Load More")',
      SAVE: 'Save Profile',
      PASS: 'Password',
      OLD_PASS: 'Old Password',
      NEW_PASS: 'New Password',
      NEW_PASS_PLACEHOLDER: 'New Password  (min. 6 Characters)',
      REPEAT_PASS: 'Repeat Password',
      PASS_ERROR_EMPTY: 'The password can not be empty',
      PASS_ERROR_LENGTH: 'The password must be at least 6 characters long',
      PASS_ERROR_REPEAT: 'The passwords need to match',
      SAVE_PASS: 'Set new password'
    },

    SORT_OPTIONS: {
      AZ: 'A-Z',
      ZA: 'Z-A',
      NEWEST_ADDED: 'Most Recently Added',
      OLDEST_ADDED: 'First Added',
      NEWEST_RELEASED: 'Latest Release',
      OLDEST_RELEASED: 'Oldest Release',
      NEWEST_AIRED: 'Most Recently Aired',
      OLDEST_AIRED: 'Oldest Air-Date',
      NEWEST_REPORTED: 'Most Recently Reported',
      OLDEST_REPORTED: 'Oldest Report',
      NEWEST_UPDATED: 'Most Recently Updated',
      OLDEST_UPDATED: 'Oldest Update'
    },

    FAQ: {
      UPLOAD_VIDEO: {
        TITLE: 'How can I upload a video?',
        TEXT: "You can upload videos by going to Manage Content menu. Choose if you want to upload a Movie, TV show or Other video. Click the relevant sub-menu option" +
          " on the vertical navigation bar on the left side of the screen. You can upload a video by clicking the Create New Movie/TV Show/Other Video button or by typing" +
          " the name of the video you want to upload to the search bar and selecting the relevant movie from search results. After that, you can choose to fill in the video's" +
          " information either manually or loading its information from TheMovieDB. After that, you can upload the video and subtitle files by clicking Manage Files button."
      },
      DELETE_VIDEO: {
        TITLE: 'How can I delete a video?',
        TEXT: "You can delete a video by going to the video's information page and clicking Manage Files and selecting the red trash can icon. Clicking Edit Movie and selecting" +
          " Delete Movie is another way to do it. You can also use the File Manager which is in the Manage Content menu. You can see all the files you have uploaded there. Click" +
          " the red trash can icon to delete a file."
      },
      VIDEO_FORMATS: {
        TITLE: 'Which video formats are supported?',
        TEXT: "Streama supports currently only the video file formats supported by HTML5 player. You can test if your video file is HTML5 player compatible by dragging and dropping" +
          " your file to an empty tab on your browser."
      },
      SUBTITLES: {
        TITLE: 'How can I add subtitles to videos?',
        TEXT: "You can add subtitles to videos by clicking Manage Files button which is in the video's information page. You can drag and drop subtitle files there." +
          " Previously you had to manually convert them into a compatible file format, but not anymore! Now the application handles that for you."
      },
      INVITE_USERS: {
        TITLE: 'How can I invite friends to watch my hosted videos?',
        TEXT:"You can share your videos with your friends by inviting them to use your hosted Streama. Go to the Users menu and click Invite User button. Fill in the invite form and" +
          " select the invitee's role(s). Users with the role Admin can edit Users & Settings. Users with the role Content Manager can edit content. Your friend will be notified about" +
          " the invitation via email. You can also share video sessions with your friends by clicking the video player's Share button and linking the session URL to them."
      },
      BASE_URL: {
        TITLE: "What's the base URL and how should I configure it?",
        TEXT: "The Base-URL is used for the videos and the link in the invitation-email."
      },
      NOTIFICATIONS: {
        TITLE: "What are notifications?",
        TEXT: "You can notify your invited friends about uploaded videos by sending them notification messages. You can send them by adding them your notification queue by clicking" +
          " Add Notification button which is in your video's information page and going to the Notifications menu and clicking Send Queue button."
      },
      VIDEO_PLAYER_SHORTCUTS: {
        TITLE: "Does the video player have shortcut keys?",
        TEXT: "Yes. Pause/unpause: space. Manage volume: arrow keys up or down. Skip video forward/backward: arrow keys left or right. Long skip:" +
          " control + arrow keys left or right. Fullscreen on/off: alt + enter. Subtitles on/off: S, Mute: M, Return to previous" +
          " screen: delete or backspace."
      },
      FAVORITE_GENRES: {
        TITLE: "How do user's favorite genres affect Streama?",
        TEXT: "Coming soon..."
      },
      USEFUL_LINKS: {
        TITLE: "Useful links",
        TEXT: "Coming soon..."
      }
    }
  });
}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by antonia on 14/05/16.
 * Improved translation by @Norwelian on 23/05/19
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('es', {
		LOGIN: {
			TITLE: 'Introduzca su usuario',
			USERNAME: 'Usuario',
			PASSWORD: 'Contraseña',
			FIRST_TIME_HINT: '¿Es tu primera vez? Prueba \'admin\' en ambos campos.',
			SUBMIT: 'Entrar',
      SESSION_EXPIRED: 'Su sesión expiró desde su última actividad. Por favor inicie sesión de nuevo.'
		},
		DASHBOARD: {
      HOME: 'Casa',
      TV_SHOWS: 'Programas de televisión',
      MOVIES: 'Películas',
      MY_LIST:'Mi lista',
			TITLE: 'Panel de control',
			NEW_RELEASES: 'Nuevas Publicaciones',
			CONTINUE_WATCHING: 'Continuar Viendo',
			DISCOVER_SHOWS: 'Descubre Series',
			DISCOVER_MOVIES: 'Descubre Películas',
			DISCOVER_OTHER_VIDEOS: 'Descubre otros vídeos',
			SORT: 'Ordenar:',
			SEARCH_BY_NAME: 'Buscar por Nombre...',
			FILTER_BY_TAG: 'Filtrar por Etiqueta...',
			BROWSE_GENRES: 'Buscar',
			LOOKING_AT_GENRE: 'Estás explorando el género:',
			MARK_COMPLETED: 'Marcar como Completado',
			NO_TVSHOWS_FOUND: 'No se han encontrado Series',
      NO_WATCHLIST_FOUND: 'Nada aquí todavía',
			NO_MOVIES_FOUND: 'No se han encontrado Películas',
      WATCHLIST: 'ver más tarde'
		},
		VIDEO: {
			RELEASED: 'Publicado',
			IMDB: 'IMDB',
			RATING: 'Puntuación',
			VOTES: 'Votos',
			OVERVIEW: 'Sinopsis',
			GENRE: 'Género',
			TRAILER: 'Trailer',
			SEASON: 'Temporada',
      NO_SUBTITLE: 'Sin subtítulos'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Creando una sesión nueva, seras redirigido de vuelta a este reproductor, pero esta vez tendrás un código de sesión único en la URL. ¡Comparte éste enlace con tus amigos para tener una experiencia de visión sincronizada con ellos!',
			FILE_MISSING: 'Hay un problema con este contenido. Parece el archivo asociado al mismo ha sido eliminado.',
			CODEC_PROBLEM: 'Parece que hay un problema añadiendo el archivo de vídeo al reproductor. Ésto suele deberse a un problema con los códecs. Prueba convirtiéndolo a un códec compatible con HTML5, elimina el fichero asociado, y añádelo de nuevo. Si los códecs son los correctos, comprueba el log del servidor y la URL base en las opciones.',
			WRONG_BASEPATH: 'Tu vídeo ha sido incluido usando una ruta incorrecta, pero estás accediendo a la página a traves de la ruta "{{basePath}}". Asegúrate de escribir la ruta correcta en las propiedades y de que estás usándola para acceder a la aplicación.'
		},
		MANAGE_CONTENT: 'Gestionar Contenido',
    MANAGE_SUB_PROFILES: 'Gestionar Perfiles',
    WHOS_WATCHING: '¿Quién está viendo?',
    ADD_SUB_PROFILE: 'Añadir perfil',
    EDIT_BTN: 'Editar',
    DONE_BTN: 'Hecho',
    SAVE_BTN: 'Guardar',
    CREATE_BTN: 'Crear',
    CANCEL_BTN: 'Cancelar',
    DELETE_BTN: 'Borrar',
    ENTER_NAME: 'Ingrese su nombre',
    EDIT_PROFILE: 'Editar perfil',
    CREATE_PROFILE: 'Crear perfil',
		ADMIN: 'Admin',
		HELP: 'Ayuda',
		HELP_FAQ: 'Ayuda / Preguntas Frecuentes',
		PROFILE_SETTINGS: 'Opciones de Perfil',
		LOGOUT: 'Salir',
		CHANGE_PASSWORD: 'Cambiar Contraseña',
	LANGUAGE_en: 'English/Inglés',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/Ruso',
    LANGUAGE_de: 'Deutsch/Alemán',
    LANGUAGE_fr: 'Français/Francés',
    LANGUAGE_es: 'Español',
    LANGUAGE_kr: '한국어/Coreano',
    LANGUAGE_nl: 'Nederlands/Holandés',
    LANGUAGE_pt: 'Português/Portugués',
    LANGUAGE_ja: '日本語/Japonés',
    LANGUAGE_it: 'Italiano/Italiano',
    LANGUAGE_da: 'Dansk/Danés',
    LANGUAGE_ar: 'عربى/Árabe',
    LANGUAGE_hu: 'Magyar/Húngaro',
		PROFIlE: {
			USERNAME: 'Nombre de usuario',
			FULL_NAME: 'Nombre completo',
			LANGUAGE: 'Idioma',
			PAUSE_ON_CLICK: 'Click en video para pausar',
			FAVORITE_GENRES: 'Géneros Favoritos',
			SAVE: 'Guardar Perfil',
			OLD_PASS: 'Antigua Contraseña',
			NEW_PASS: 'Nueva Contraseña',
			NEW_PASS_PLACEHOLDER: 'Nueva Contraseña  (min. 6 Caracteres)',
			REPEAT_PASS: 'Repite tu Contraseña',
			SAVE_PASS: 'Guardar Nueva Contraseña',
      AMOUNT_OF_MEDIA_ENTRIES: 'Cantidad de videos en la página principal (antes de que aparezca el botón "Cargar Más")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Añadidos Recientemente',
			OLDEST_ADDED: 'Añadidos Primero',
			NEWEST_RELEASED: 'Últimos Publicados',
			OLDEST_RELEASED: 'Primeros Publicados',
			NEWEST_AIRED: 'Transmitidos Recientemente',
			OLDEST_AIRED: 'Transmitidos Primero'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: '¿Cómo puedo subir un vídeo?',
				TEXT: "Puedes subir un vídeo accediendo al menú Gestionar Contenido. Elige si quieres subir una Película, una Serie o cualquier otro vídeo. Haz click en la opción correspondiente del menú" +
				" vertical en el lateral izquierdo de la aplicación. Puedes subir un vídeo haciendo click en el botón de Crear Nueva Película/Serie/Otro o escribiendo" +
				" el nombre del vídeo que quieres subir en la barra de búsqueda y seleccionando la entrada deseada de entre los resultados. Después de eso, puedes elegir rellenar la información del vídeo" +
				" manualmente o cargar la información desde TheMovieDB automáticamente. Posteriormente, puedes subir el vídeo y los archivos de subtítulos pulsando sobre el botón Gestionar Archivos."
			},
			DELETE_VIDEO: {
				TITLE: '¿Cómo puedo borrar un vídeo?',
				TEXT: "Puedes borrar un vídeo yendo a la página de información de dicho video, haciendo click en Gestionar Archivos y seleccionando el icono de una papelera roja. Otra manera es haciendo click en Editar Película" +
				" y seleccionando Borrar película. También puedes usar el Gestor de Archivos que se encuentra en el menú de Gestionar Contenido. De ésta manera puedes ver todos los archivos subidos. Haz click en Click" +
				" en el icono de la papelera roja para eliminar un fichero."
			},
			VIDEO_FORMATS: {
				TITLE: '¿Qué formatos de vídeo están soportados?',
				TEXT: "Streama soporta actualmente solo aquellos formatos de vídeo soportados por el reproductor HTML5. Puedes comprobar si un archivo de vídeo es compatible con HTML5 arrastrándolo" +
				" a una pestaña vacía de tu navegador."
			},
			SUBTITLES: {
				TITLE: '¿Cómo puedo añadir subtítulos a un vídeo?',
				TEXT: "Puedes añadir subtítulos a los vídeos haciendo click en el botón Gestionar Archivos que se encuentra en la página de información del vídeo. Arrastra los archivos ahí." +
				" Antiguamente teníamos que convertirlos manualmente a un formato de archivo compatible, ¡pero ya no! Ahora la aplicación se encarga de ello por ti."
			},
			INVITE_USERS: {
				TITLE: '¿Cómo puedo invitar a mis amigos a ver mis vídeos?',
				TEXT:"Puedes compartir tus vídeos con tus amigos invitándoles a usar tu Streama. Ve al menú de Usuarios y haz click en el botón de Invitar Usuario. Rellena el formulario de invitación y" +
				" selecciona el rol del invitado. Los usuarios con el rol de Administradores pueden editar Usuarios y Configuraciones. Los usuarios con el rol de Gestor de Contenido pueden editar el contenido. Tu amigo será notificado" +
				" a través de su correo electrónico. También puedes compartir una sesión de vídeo con tus amigos haciendo click sobre el botón Compartir del reproductor y enviándoles el enlace correspondiente."
			},
			BASE_URL: {
				TITLE: "¿Qué es la URL base y cómo debería configurarla?",
				TEXT: "LA URL base se utiliza en los vídeos y en los enlaces que se envían en las invitaciones por correo."
			},
			NOTIFICATIONS: {
				TITLE: "¿Qué son las notificaciones?",
				TEXT: "Puedes notificar a los amigos que invites mandándoles mensajes de notificación. Puedes enviarlas añadiéndolas a la cola de notificaciones haciendo click en" +
				" el botón de Añadir Notificación que se encuentra en la página de información del vídeo y accediendo al menú de Notificaciones y clickando en el botón de Enviar Cola."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "¿El reproductor tiene teclas de acceso rápido?",
				TEXT: "Si. Pausar/Continuar: espacio. Controlar el volúmen: flechas de arriba y abajo. Avanzar el vídeo adelante/atrás: flechas de derecha e izquierda. Salto grande:" +
				" control + flechas de derecha e izquierda. Pantalla completa on/off: alt + enter. Subtítulos on/off: S, Silenciar: M, Volver a la anterior" +
				" pantalla: delete o backspace."
			},
			FAVORITE_GENRES: {
				TITLE: "¿Cómo afectan a Streama los géneros favoritos del usuario?",
				TEXT: "Próximamente..."
			},
			USEFUL_LINKS: {
				TITLE: "Enlaces útiles",
				TEXT: "Próximamente..."
			}
		}
	});
}]);
})();
(function(){
'use strict';
//= wrapped
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('fr', {
		LOGIN: {
			TITLE: 'Veuillez vous connecter',
			USERNAME: 'Nom d\'utilisateur',
			PASSWORD: 'Mot de passe',
			FIRST_TIME_HINT: 'Première connexion ? Connectez-vous avec \'admin\'/\'admin\'.',
			SUBMIT: 'Connexion',
      SESSION_EXPIRED: 'Votre session a expiré depuis votre dernière activité. Veuillez vous reconnecter.'
		},
		DASHBOARD: {
      HOME: 'Accueil',
      TV_SHOWS: 'Séries',
      MOVIES: 'Films',
      MY_LIST:'Ma liste',
			TITLE: 'Tableau de bord',
			NEW_RELEASES: 'Nouvelles sorties',
			CONTINUE_WATCHING: 'Continuer le visionnage',
			DISCOVER_SHOWS: 'Découvrez des séries',
			DISCOVER_MOVIES: 'Découvrez des films',
			DISCOVER_OTHER_VIDEOS: 'Découvrez d\'autres vidéos',
			SORT: 'Tri :',
			SEARCH_BY_NAME: 'Chercher par nom...',
			FILTER_BY_TAG: 'Chercher par tag...',
			BROWSE_GENRES: 'Parcourir',
			LOOKING_AT_GENRE: 'Vous regardez le genre :',
			MARK_COMPLETED: 'Marquer comme fini',
			NO_TVSHOWS_FOUND: 'Aucune série disponible',
			NO_MOVIES_FOUND: 'Aucun film disponible',
      NO_WATCHLIST_FOUND: 'Votre liste est vide',
      WATCHLIST: 'Ma liste'
		},
		VIDEO: {
			RELEASED: 'Sorti',
			IMDB: 'IMDB',
			RATING: 'Note',
			VOTES: 'Votes',
			OVERVIEW: 'Résumé',
			GENRE: 'Genre',
			TRAILER: 'Bande annonce',
			SEASON: 'Saison',
      NO_SUBTITLE: 'Aucun sous-titre'
		},

		MESSAGES: {
			SHARE_SOCKET: 'En créant une nouvelle session, vous serez redirigé vers ce lecteur vidéo avec un identifiant de session unique dans l\'adresse. Partagez cette adresse avec vos amis pour regarder une vidéo de façon synchronisée !',
			FILE_MISSING: 'Il y\'a un problème avec ce contenu. Il semblerait que vous ayez supprimé le fichier vidéo associé.',
			CODEC_PROBLEM: 'Il semblerait qu\'il y ai un problème pour lire ce fichier. Cela est probablement dû à un problème de codec. Essayez de convertir votre vidéo en un format compatible HTML5, supprimez le fichier actuellement attaché et réajoutez le. Si le codec est bon, vérifier les logs d\'erreur sur le serveur et l\'URL racine dans les paramètres.',
			WRONG_BASEPATH: 'Votre vidéo a été ajouté avec un mauvais chemin racine, mais vous naviguez en utilisant "{{basePath}}". Vérifiez que le chemin racine est correct dans les paramètres et qu\'il correspond bien à l\'URL que vous utilisez pour naviguer cette application.'
		},
		MANAGE_CONTENT: 'Gérer le contenu',
    MANAGE_SUB_PROFILES: 'gérer les profils',
    WHOS_WATCHING: 'Qui regarde?',
    ADD_SUB_PROFILE: 'Ajouter un profil',
    EDIT_BTN: 'modifier',
    DONE_BTN: 'Terminé',
    SAVE_BTN: 'sauvegarder',
    CREATE_BTN: 'Créer',
    CANCEL_BTN: 'Annuler',
    DELETE_BTN: 'Effacer',
    ENTER_NAME: 'Entrez le nom',
    EDIT_PROFILE: 'Editer le profil',
    CREATE_PROFILE: 'Créer un profil',
		ADMIN: 'Paramètres',
		HELP: 'Aide',
		HELP_FAQ: 'Aide / FAQ',
		PROFILE_SETTINGS: 'Paramètres du profil',
		LOGOUT: 'Déconnexion',
		CHANGE_PASSWORD: 'Modifier le mot de passe',
	LANGUAGE_en: 'English/Anglais',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/Russe',
    LANGUAGE_de: 'Deutsch/Allemand',
    LANGUAGE_fr: 'Français',
    LANGUAGE_es: 'Español/Español',
    LANGUAGE_kr: '한국어/Coréen',
    LANGUAGE_nl: 'Nederlands/Néerlandais',
    LANGUAGE_pt: 'Português/Portugais',
    LANGUAGE_ja: '日本語/Japonais',
    LANGUAGE_it: 'Italiano/Italien',
    LANGUAGE_da: 'Dansk/Danois',
    LANGUAGE_ar: 'عربى/Arabe',
		LANGUAGE_hu: 'Magyar/Hongrois',
		PROFIlE: {
			USERNAME: 'Nom d\'utilisateur',
			FULL_NAME: 'Nom complet',
			LANGUAGE: 'Langue',
			PAUSE_ON_CLICK: 'Mettre la vidéo en pause au clic',
			FAVORITE_GENRES: 'Genres favoris',
			SAVE: 'Enregistrer le profil',
			OLD_PASS: 'Ancien mot de passe',
			NEW_PASS: 'Nouveau mot de passe',
			NEW_PASS_PLACEHOLDER: 'Nouveau mot de pass (min. 6 caractères)',
			REPEAT_PASS: 'Répétez le mot de passe',
			SAVE_PASS: 'Enregistrer le nouveau mot de passe',
      AMOUNT_OF_MEDIA_ENTRIES: 'Nombre de vidéos sur le tableau de bord (avant "Load More")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Ajoutés récemment',
			OLDEST_ADDED: 'Premiers ajoutés',
			NEWEST_RELEASED: 'Dernières sorties',
			OLDEST_RELEASED: 'Premières sorties',
			NEWEST_AIRED: 'Dernières sorties',
			OLDEST_AIRED: 'Premières sorties'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Comment ajouter une vidéo ?',
				TEXT: "Vous pouvez ajouter une vidéo en allant dans le menu Gérer le contenu. Choisissez si vous voulez ajouter un film, une série ou une autre vidéo. Cliquez sur le sous-menu correspondant" +
				" dans la barre de navigation verticale sur le coté gauche de l'écran. Vous pouvez ajouter une vidéo en cliquant sur le bouton Créer un film/série/autre vidéo ou en tapant" +
				" le nom de la vidéo que vous voulez ajouter dans la barre de recherche et en sélectionnant le film correspondant dans les résultats de recherche. Ensuite, vous pouvez choisir de renseigner les informations" +
				" sur la vidéo soit manuellement soit en chargeant les informations de TheMovieDB. Finalement, vous pouvez ajouter la vidéo et les sous-titres en cliquant sur le bouton Gérer les fichiers."
			},
			DELETE_VIDEO: {
				TITLE: 'Comment supprimer une vidéo ?',
				TEXT: "Vous pouvez supprimer une vidéo en allant sur la page des les informations d'une vidéo et en cliquant sur Gérer les fichiers puis en sélectionnant l'icône de corbeille rouge. Cliquer sur Modifier un film et sélectionner Supprimer le film" +
				" est un autre moyen. Vous pouvez également utiliser le Gestionnaire de fichiers dans le menu Gérer le contenu. Vous pouvez voir tous les fichiers ajoutés ici. Cliquez" +
				" sur l'icône de corbeille rouge pour supprimer un fichier."
			},
			VIDEO_FORMATS: {
				TITLE: 'Quels formats vidéos sont supportés ?',
				TEXT: "Streama supporte actuellement seulement les formats vidéos supportés par le lecteur HTML5. Vous pouvez tester si votre fichier vidéo est compatible HTML5 en le glissant déplaçant dans un onglet vide" +
				" de votre navigateur."
			},
			SUBTITLES: {
				TITLE: 'Comment ajouter des sous-titres à une vidéo ?',
				TEXT: "Vous pouvez ajouter des sous-titres aux vidéos en cliquant sur le bouton Gérer les fichiers situé dans la page d'information de la vidéo. Vous pouvez glisser déplacer les fichiers de sous-titres ici." +
				" Précedemment, vous deviez les convertir dans un format compatible, mais ce n'est plus nécessaire ! L'application s'en charge pour vous."
			},
			INVITE_USERS: {
				TITLE: 'Comment inviter un ami à voir mes vidéos ?',
				TEXT:"Vous pouvez partager vos vidéos avec vos amis en les invitant sur votre Streama. Allez dans le menus Utilisateurs et cliquer sur le bouton Inviter un utilisateur. Remplissez le formulaire d'invitation et" +
				" sélectionner le/les rôle(s) de l'invité. Les utilisateurs avec le rôle Administateur peuvent modifier les utilisateurs et les paramètres. Les utilisateurs avec le rôle Gestionnaire de contenu peuvent modifier le contenu. Votre ami sera notifié de l'invitation" +
				" par email. Vous pouvez également partager une session vidéo avec vos amis en cliquant sur le bouton Partager sur le lecteur vidéo et en leur envoyant le lien vers la session."
			},
			BASE_URL: {
				TITLE: "Quelle est l\'URL racine et comment doit-je la configurer ?",
				TEXT: "L\'URL racine est utilisée pour les vidéos et les liens dans les e-mails d'invitation."
			},
			NOTIFICATIONS: {
				TITLE: "Que sont les notifications ?",
				TEXT: "Vous pouvez notifier vos amis à propos de vidéos ajoutées en leur envoyant un message de notification. Vous pouvez les envoyer en les ajoutant dans votre liste de notification en cliquant" +
				" sur le bouton Ajouter une notification sur la page d'information de la vidéo puis en allant dans le menu des notifications et en cliquant sur le bouton Envoyer la liste."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "Est-ce que le lecteur vidéo a des raccourcis clavier ?",
				TEXT: "Oui. Pause/reprendre : espace. Modifier le volume : Flèche haut/bas. Vidéo suivante/précédente : Flèche gauche/droite. Avance rapide :" +
				" Ctrl + flèche gauche/droite. Plein écran oui/non : Alt + Entrée. Sous-titres oui/non : S, Muet : M, Retour à l'écran précédent" +
				" : Suppr ou Retour."
			},
			FAVORITE_GENRES: {
				TITLE: "En quoi les genres favoris d'un utilisateur affectent Streama ?",
				TEXT: "A venir..."
			},
			USEFUL_LINKS: {
				TITLE: "Liens utiles",
				TEXT: "A venir..."
			}
		}
	});
}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by antonia on 14/05/16.
 * Translated by Nargren 09/12/19.
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
  $translateProvider.translations('hu', {
    LOGIN: {
      TITLE: 'Jelentkezzen be',
      USERNAME: 'Felhasználónév',
      PASSWORD: 'Jelszó',
      FIRST_TIME_HINT: 'Első bejelentkezés? Próbálja meg az \'admin\'-t mindkét mezőbe.',
      SUBMIT: 'Bejelentkezés',
      SESSION_EXPIRED: 'Az ülése lejárt a legutóbbi aktivitás óta. Jelentkezzen be újra.'
    },
    DASHBOARD: {
      TITLE: 'Főoldal',
      RECOMMENDATIONS: 'Ajánlatok',
      NEW_RELEASES: 'Nemrég megjelent',
      CONTINUE_WATCHING: 'Megtekintés folytatása',
      DISCOVER_SHOWS: 'TV sorozatok felfedezése',
      DISCOVER_MOVIES: 'Filmek felfedezése',
      DISCOVER_OTHER_VIDEOS: 'Egyéb videók felfedezése',
      SORT: 'Szűrés:',
      SEARCH_BY_NAME: 'Név szerinti szűrés...',
      FILTER_BY_TAG: 'Címke szerinti szűrés...',
      FILTER_BY_GENRE: 'Műfaj szerinti szűrés...',
      BROWSE_GENRES: 'Böngészés',
      LOOKING_AT_GENRE: 'Ezt a műfajt nézi jelenleg:',
      MARK_COMPLETED: 'Megjelölés megnézettként',
      NO_TVSHOWS_FOUND: 'Nincsenek elérhető TV sorozatok ',
      NO_WATCHLIST_FOUND: 'Még nincs itt',
      NO_MOVIES_FOUND: 'Nincsenek elérhető filmek'
    },
    VIDEO: {
      RELEASED: 'Megjelent',
      IMDB: 'IMDB',
      RATING: 'Értékelés',
      VOTES: 'Szavazatok',
      OVERVIEW: 'Összefoglalás',
      GENRE: 'Műfaj',
      TRAILER: 'Előzetes',
      SEASON: 'Évad',
      SUBTITLES: 'Feliratok',
      NO_SUBTITLE: 'Nincs felirat',
      SUBTITLE_SIZE: 'Felirat méret',
      VIDEO_FILES: 'Videó források',
      UPNEXT: 'Most következik...'
    },

    MESSAGES: {
      SHARE_SOCKET: ' Ha egy új ülést nyit, vissza lesz irányítva ehhez a videólejátszóhoz, de egy egyedi ülés-azonosítót fog kapni. Ossza meg ezt az azonosítót (URL-t) ismerőseivel, hogy egyidőben élvezhessék a filmet!',
      FILE_MISSING: 'Probléma merült fel ezzel a tartalommal. Úgy tűnik, eltávolította a kapcsolódó videófájlt.',
      CODEC_PROBLEM: 'Probléma van a videó hozzáadásával a lejátszóhoz. Ez valószínüleg egy kódek probléma. Próbálja meg átkonvertálni a videót egy HTML5-kompatibilitis kódekformátumba, majd pedig távolítsa el a videót és adja hozzá újra. Ha a kódekkel nincsen probléma, ellenőrizze a szerver hibaüzeneteit és az alap URL-t a beállításoknál.',
      WRONG_BASEPATH: 'A videó rossz alap útvonallal jelenik meg, viszont ön ezt az oldalt nézi "{{basePath}}". Bizonyosodjon meg róla, hogy az alapértelmezett útvonal helyes és hogy ezt használja az alkalmazáshoz.',
      FILE_IN_FS_NOT_FOUND: 'A videó nem található egyik elérhető útvonalon sem. Ellenőrizze a beállításokban és a fájlrendszerben, hogy a fájlok elérhetőek legyenek az alkalmazás számára.'
    },
    MANAGE_CONTENT: 'Tartalom kezelése',
    MANAGE_SUB_PROFILES: 'Profilok kezelése',
    WHOS_WATCHING: 'Ki van itt?',
    ADD_SUB_PROFILE: 'Profil létrehozása',
    EDIT_BTN: 'Szerkesztés',
    DONE_BTN: 'Kész',
    SAVE_BTN: 'Mentés',
    CREATE_BTN: 'Létrehozás',
    CANCEL_BTN: 'Mégse',
    DELETE_BTN: 'Törlés',
    ENTER_NAME: 'Név megadása',
    EDIT_PROFILE: 'Profil szerkesztése',
    CREATE_PROFILE: 'Profil létrehozása',
    ADMIN: 'Adminisztrátor',
    HELP: 'Súgó',
    HELP_FAQ: 'Súgó / GYIK',
    PROFILE_SETTINGS: 'Felhasználói beállítások',
    LOGOUT: 'Kijelentkezés',
    CHANGE_PASSWORD: 'Jelszó megváltoztatása',
    LANGUAGE_en: 'Angol/English',
    LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Orosz/Russian',
    LANGUAGE_de: 'Német/German',
    LANGUAGE_fr: 'Francia/French',
    LANGUAGE_es: 'Spanyol/Spanish',
    LANGUAGE_kr: 'Koreai/Korean',
    LANGUAGE_nl: 'Holland/Dutch',
    LANGUAGE_pt: 'Portugál/Portuguese',
    LANGUAGE_ja: 'Japán/Japanese',
    LANGUAGE_it: 'Olasz/Italian',
    LANGUAGE_da: 'Dán/Danish',
    LANGUAGE_ar: 'Arab/Arabic',
    LANGUAGE_hu: 'Magyar',
    PROFIlE: {
      USERNAME: 'Felhasználónév',
      FULL_NAME: 'Teljes név',
      LANGUAGE: 'Nyelv',
      PAUSE_ON_CLICK: 'Videó szüneteltetése katintásra',
      FAVORITE_GENRES: 'Kedvenc műfajok',
      AMOUNT_OF_MEDIA_ENTRIES: 'Főoldalon lévő vidók száma (a \"Több betöltése\" előtt)',
      SAVE: 'Profil mentése',
      PASS: 'Jelszó',
      OLD_PASS: 'Régi jelszó',
      NEW_PASS: 'Új jelszó',
      NEW_PASS_PLACEHOLDER: 'Új jelszó  (min. 6 karakter)',
      REPEAT_PASS: 'Jelszó ismétlése',
      PASS_ERROR_EMPTY: 'A jelszó nem lehet üres',
      PASS_ERROR_LENGTH: 'A jelszó legalább 6 karakter kell legyen',
      PASS_ERROR_REPEAT: 'A jelszavaknak egyezniük kell',
      SAVE_PASS: 'Új jeszó beállítása'
    },

    SORT_OPTIONS: {
      AZ: 'A-Z',
      ZA: 'Z-A',
      NEWEST_ADDED: 'Legújabban hozzáadott',
      OLDEST_ADDED: 'Legrégebben hozzáadott',
      NEWEST_RELEASED: 'Legújabban megjelent',
      OLDEST_RELEASED: 'Legrégebben megjelent',
      NEWEST_AIRED: 'Legújabban vetített',
      OLDEST_AIRED: 'Legrégebben vetített',
      NEWEST_REPORTED: 'Legújabban bejelentett',
      OLDEST_REPORTED: 'Legrégebben bejelentett',
      NEWEST_UPDATED: 'Legújabban frissített',
      OLDEST_UPDATED: 'Legrégebben frissített'
    },

    FAQ: {
      UPLOAD_VIDEO: {
        TITLE: 'Hogyan tölthetek fel egy vidót?',
        TEXT: "Videók a Tartalom kezelése menüből tölthetőek fel, ahol kiválaszthatja, hogy Filmet, TV sorozatot vagy Egyéb videót szeretne hozzáadni. Kattintson a megfelelő" +
          " menüpontra a függőleges navigációs sávon a képernyő bal oldalán. Itt hozzáadhat egy filmet ha az Új Film / TV sorozat / Egyéb videó gombra kattint vagy amennyiben beírja" +
          " a videó címét a keresőmezőbe majd pedig kiválasztja a kívánt találatot. Ezután kitöltheti a videó adatait kézzel vagy pedig letöltheti ezt autómatikusan a TheMovieDB" +
          " oldalról. Végül pedig feltöltheti a videófájlt és a feliratokat a Fájlok kezelése gombra kattintva."
      },
      DELETE_VIDEO: {
        TITLE: 'Hogyan törölhetek le egy videót?',
        TEXT: "Egy videó a saját információs oldalán keresztül törölhető le. Itt válassza ki a Fájlok kezelése opciót majd pedig kattintson a piros szemeteskosár ikonra. Egy másik" +
          " lehetőség a Film szerkesztése menüponton belül a Film törlése opció. A Fájlok kezelése menüpont is használató, ami a Tartalom kezelése menün belül található. Itt látható" +
          " az összes feltöltött tartalom, ahol ismét a piros szemeteskosárra kattintva törölhető egy kiválasztott fájl."
      },
      VIDEO_FORMATS: {
        TITLE: 'Melyek a támogatott videóformátumok?',
        TEXT: "A Streama jelenleg csak a HTML5 által is támogatott videóformátumokat támogatja. Egy videófájl kompatibilitása tesztelhető amennyiben a kiválasztott fájlt egy" +
        " kattintással belehúzza egy üres böngészőablakba (drag and drop)."
      },
      SUBTITLES: {
        TITLE: 'Hogyan adhatok feliratot egy videóhoz?',
        TEXT: "Feliratok a Fájlok kezelése gombra kattintás után, a videó információs oldalán adhatók hozzá. Ide egy kattintással behúzhatóak a feliratfájlok (drag and drop)." +
          " Mindeddig a megfelelő formátumba kellett konvertálni a fájlokat, de ez többé már nem szükséges. Az alkalmazás ezt mostantól megteszi ön helyett."
      },
      INVITE_USERS: {
        TITLE: 'Hogyan hívhatom meg ismerőseimet, hogy megnézhessék a megoszott videóimat?',
        TEXT:"A filmek megosztásához meg kell hogy hívja ismerőseit az ön által futtatott Streama-ra. Menjen a Felhasználók menübe majd pedig kattintson a Felhasználó meghívása gombra." +
          " Töltse ki a megfelelő mezőket és adja meg a meghívott személy beosztását. Adminisztrátor szintű felhasználók szerkeszthetik más felhasználók beállításait illetve új" +
          " felhasználókat is beállíthatnak. Felhasználók a Tartalomkezelő beosztásban pedig szerkeszthetik a feltöltött tartalmakat. Az ismerősei emailben kapják meg a meghívást. Ezen " +
          " felül, kiválasztott (egyedi) videó üléseket is megoszthat ismerőseivel amennyiben a videólejátszó Megosztás gombjára kattint majd továbbítja a kapot URL-t nekik."
      },
      BASE_URL: {
        TITLE: "Mi az alapértelmezett URL és hogyan állítsam be?",
        TEXT: "Az alapértelmezett URL a meghívó emaileknél játszik szerepet ahol a Streama szerver címét mutatja."
      },
      NOTIFICATIONS: {
        TITLE: "Mik azok az üzenetek?",
        TEXT: "A feltöltött vidókról értesitő üzenetet küldhet ismerőseinek. Ehhez adjon hozzá egy új kimenő üzenetet az Ùj üzenet gombra kattinva, amely a videó információs oldalán" +
          " található. Az üzenet elküldéséhez nyissa meg az Üzenetek menüpontot majd pedig kattintson az Üzenetek elküldése gombra."
      },
      VIDEO_PLAYER_SHORTCUTS: {
        TITLE: "Vannak a videólejátszónak elérhető gyorsbillentyű kombinációi?",
        TEXT: "Igen, ezek a következők. Szünet/folytatás: szövegköz. Hangerő szabályozása: felfelés és lefelé nyilak. Rövid ugrás előre/vissza: balra és jobbra nyilak." +
          " Hosszabb ugrás előre/vissza: Ctrl + balra és jobbra nyilak. Teljes képernyő be/ki: Alt + Enter. Feliratok ki/be: S. Némítás: M. Visszatérés az előző" +
          " képernyőhöz: Delete vagy Backspace."
      },
      FAVORITE_GENRES: {
        TITLE: "Hogyan befolyásolják a felhasználók kedvenc műfajai a Streama-t?",
        TEXT: "Hamarosan..."
      },
      USEFUL_LINKS: {
        TITLE: "Hasznos linkek",
        TEXT: "Hamarosan..."
      }
    }
  });
}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by antonia on 14/05/16.
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('ar', {
		LOGIN: {
			TITLE: 'يرجى تسجيل الدخول',
			USERNAME: 'الاسم',
			PASSWORD: 'الرمز',
			FIRST_TIME_HINT: 'اول مرة تقوم بتسجيل الدخول؟ حاول ادخال \'admin\' بالفراغيين.',
			SUBMIT: 'تسجيل الدخول',
      SESSION_EXPIRED: 'انتهت صلاحية الدخول منذ اخر نشاط. الرجاء تسجيل الدخول مرة اخرى.'
		},
		DASHBOARD: {
      HOME: 'الصفحة الرئيسية',
      TV_SHOWS: 'عرض تلفزيوني',
      MOVIES: 'أفلام',
      MY_LIST:'قائمتي',
			TITLE: 'الواجهة الرئيسية',
			RECOMMENDATIONS: 'افضل الافلام',
			NEW_RELEASES: 'المصدرة حديثا',
			CONTINUE_WATCHING: 'الاستمرار في المشاهدة',
			DISCOVER_SHOWS: 'جميع العروض التلفزيونية',
			DISCOVER_MOVIES: 'جميع الافلام',
			DISCOVER_OTHER_VIDEOS: 'جميع مقاطع الفديو',
			SORT: 'فرز:',
			SEARCH_BY_NAME: 'البحث حول الاسم...',
			FILTER_BY_TAG: 'البحث بحسب...',
			BROWSE_GENRES: 'تصفح',
			LOOKING_AT_GENRE: 'كنت تبحث في هذا النوع:',
			MARK_COMPLETED: 'اكملت المشاهدة',
			NO_TVSHOWS_FOUND: 'لايوجد عروض تلفزيونية',
			NO_MOVIES_FOUND: 'لا يوجد افلام',
      NO_WATCHLIST_FOUND: 'لا يوجد شيء هنا حتى الآن',
      WATCHLIST: 'عرض لاحقا'
		},
		VIDEO: {
			RELEASED: 'الاصدار',
			IMDB: 'IMDB',
			RATING: 'التقييم',
			VOTES: 'التصويت',
			OVERVIEW: 'نظرة عامة',
			GENRE: 'الصنف',
			TRAILER: 'العرض الدعائي',
			SEASON: 'الموسم',
      NO_SUBTITLE: 'لا يوجد ترجمة'
		},

		MESSAGES: {
			SHARE_SOCKET: 'من خلال إنشاء تسجيل دخول جديد سيتم إعادة توجيهك إلى هذا الفديو، ولكن هذه المرة سيكون لديك معرف جلسة فريدة من نوعها في هذا الرابط. مشاركة هذا مع أصدقائك ليكون لديك تجربة مشاهدة متزامنة معهم!',
			FILE_MISSING: 'هناك مشكلة في هذا المحتوى. يبدو أنك أزلت ملف الفيديو المقترن منه.',
			CODEC_PROBLEM: 'يبدو أن هناك مشكلة في إضافة ملف الفيديو إلى المشغل. هذا هو الأرجح بسبب مشكلة الترميز. حاول تحويلها إلى برنامج ترميز متوافق وإزالة الملف المرفق حاليا وإعادة إضافته. إذا كانت برامج الترميز على ما يرام، تحقق من سجل خطأ الملقم وعنوان الرابط الأساسي في الإعدادات',
			WRONG_BASEPATH: 'لقد تم تضمين الفيديو باستخدام مسار أساسي خاطئ، ولكنك تتصفح الصفحة عبر "{{المسارات}}". تأكد من تعيين المسار الأساسي الصحيح في الإعدادات وأنك تستخدمه لتصفح التطبيق.',
			FILE_IN_FS_NOT_FOUND: 'لا يمكن العثور على الفيديو في أي من المواقع المتاحة للتطبيق. يرجى التحقق من الإعدادات الخاصة بك ونظام الملفات للتأكد من أن الملفات يمكن الوصول إليها من قبل التطبيق.'
		},
		MANAGE_CONTENT: 'تعديل المحتويات',
    MANAGE_SUB_PROFILES: 'إدارة ملفات التعريف',
    WHOS_WATCHING: 'من يشاهد؟',
    ADD_SUB_PROFILE: 'إضافة الملف الشخصي',
    EDIT_BTN: 'تصحيح',
    DONE_BTN: 'فعله',
    SAVE_BTN: 'حفظ',
    CREATE_BTN: 'خلق',
    CANCEL_BTN: 'إلغاء',
    DELETE_BTN: 'حذف',
    ENTER_NAME: 'أدخل الاسم',
    EDIT_PROFILE: 'تعديل الملف الشخصي',
    CREATE_PROFILE: 'إنشاء ملف تعريف',
		ADMIN: 'Admin',
		HELP: 'المساعدة',
		HELP_FAQ: 'المساعدة / الاراء المقدمة',
		PROFILE_SETTINGS: 'اعدادات الحساب',
		LOGOUT: 'تسجيل الخروج',
		CHANGE_PASSWORD: 'تعديل الرمز',
	LANGUAGE_en: 'English/الإنجليزية',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/الروسية',
    LANGUAGE_de: 'Deutsch/ألمانية',
    LANGUAGE_fr: 'Français/الفرنسية',
    LANGUAGE_es: 'Español/الأسبانية',
    LANGUAGE_kr: '한국어/الكورية',
    LANGUAGE_nl: 'Nederlands/هولندي',
    LANGUAGE_pt: 'Português/البرتغالية',
    LANGUAGE_ja: '日本語/اليابانية',
    LANGUAGE_it: 'Italiano/الإيطالي',
    LANGUAGE_da: 'Dansk/دانماركي',
    LANGUAGE_ar: 'عربى',
		LANGUAGE_hu: 'Magyar/الهنغارية',
		PROFIlE: {
			USERNAME: 'الاسم',
			FULL_NAME: 'الاسم الكامل',
			LANGUAGE: 'اللغة',
			PAUSE_ON_CLICK: 'توقف الفديو عند الظفط',
			FAVORITE_GENRES: 'الانواع المفضلة',
      AMOUNT_OF_MEDIA_ENTRIES: 'عدد الفديوات التي تظهر في الواجهة الرئيسية (قبل الظفط على "المزيد")',
			SAVE: 'حفظ الاعدادات',
			PASS: 'الرمز',
			OLD_PASS: 'الرمز القديم',
			NEW_PASS: 'الرمز الجديد',
			NEW_PASS_PLACEHOLDER: 'الرمز الجديد  (اقل شي. 6 حروف)',
			REPEAT_PASS: 'اعد ادخال الرمز',
			PASS_ERROR_EMPTY: 'الرمز لا يمكن ان يكون فارغ',
			PASS_ERROR_LENGTH: 'الرمز يجب ان يكول على الاقل 6 حروف',
			PASS_ERROR_REPEAT: 'الرمز يحتاج مطابقة',
			SAVE_PASS: 'حفظ الرمز الجديد'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'الافلام المضافة حديثا',
			OLDEST_ADDED: 'اول الافلام المظافة',
			NEWEST_RELEASED: 'الافلام المصدرة حديثا',
			OLDEST_RELEASED: 'الافلام المصدرة قديما',
			NEWEST_AIRED: 'الافلام المبثه حديثا',
			OLDEST_AIRED: 'الافلام المبثة قديما',
      NEWEST_REPORTED: 'احدث التقارير',
      OLDEST_REPORTED: 'اقدم التقارير',
      NEWEST_UPDATED: 'الافلام المحدثة حديثا',
      OLDEST_UPDATED: 'الافلام المحدثة قديما'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'كيف يمككني رفع فديو ؟',
				TEXT: "يمكنك تحميل مقاطع الفيديو من خلال الانتقال إلى قائمة إدارة المحتوى. اختر ما إذا كنت تريد تحميل فيلم أو برنامج تلفزيوني أو فيديو آخر. انقر على خيار القائمة الفرعية ذات الصلة" +
				" على شريط التنقل العمودي على الجانب الأيسر من الشاشة. يمكنك تحميل فيديو بالنقر على الزر إنشاء فيلم جديد / عرض تلفزيوني / فيديو آخر أو عن طريق الكتابة" +
				" واسم الفيديو الذي تريد تحميله إلى شريط البحث وتحديد الفيلم ذي الصلة من نتائج البحث. بعد ذلك، يمكنك اختيار لملء الفيديو " +
				" المعلومات إما يدويا أو تحميل معلوماتها من ثيموفيدب. بعد ذلك، يمكنك تحميل ملفات الفيديو والترجمة الفرعية عن طريق النقر على زر إدارة الملفات."
			},
			DELETE_VIDEO: {
				TITLE: 'كيف يمككني حذف فديو ؟',
				TEXT: "يمكنك حذف مقطع فيديو بالانتقال إلى صفحة معلومات الفيديو والنقر على إدارة الملفات وتحديد رمز سلة المهملات الحمراء. النقر على تعديل الفيلم وتحديده" +
				" حذف الفيلم هو طريقة أخرى للقيام بذلك. يمكنك أيضا استخدام إدارة الملفات الموجودة في قائمة إدارة المحتوى. يمكنك مشاهدة جميع الملفات التي قمت بتحميلها هناك. انقر" +
				" يمكن رمز سلة المهملات الحمراء لحذف ملف."
			},
			VIDEO_FORMATS: {
				TITLE: 'ما هيه صيغ الفديو القابلة للرفع ؟',
				TEXT: "ستريما يدعم حاليا فقط صيغ ملفات الفيديو التي يدعمها مشغل HTML5. يمكنك اختبار ما إذا كان ملف الفيديو الخاص بك هو مشغل HTML5 متوافق عن طريق سحب وإسقاط" +
				" الملف إلى علامة تبويب فارغة على المتصفح الخاص بك."
			},
			SUBTITLES: {
				TITLE: 'كيف يمككني اضافة الترجمة ؟',
				TEXT: "يمكنك إضافة ترجمات مصاحبة إلى مقاطع الفيديو بالنقر على زر إدارة الملفات الموجود في صفحة معلومات الفيديو. يمكنك سحب وإسقاط ملفات الترجمة هناك." +
				" سابقا كان لديك لتحويلها يدويا إلى تنسيق ملف متوافق، ولكن ليس بعد الآن! الآن تطبيق يعالج ذلك بالنسبة لك."
			},
			INVITE_USERS: {
				TITLE: 'كيف يمككني دعوة اصدقائي ؟',
				TEXT:"يمكنك مشاركة مقاطع الفيديو الخاصة بك مع أصدقائك من خلال دعوتهم لاستخدام ستريما استضافتها. انتقل إلى قائمة المستخدمون وانقر على زر دعوة المستخدم. املأ نموذج الدعوة و" +
				" حدد دور المدعو (الضيف). المستخدمون الذين لديهم الدور يمكن للمشرف تعديل المستخدمين والإعدادات. يمكن للمستخدمين الذين لديهم دور مدير المحتوى تعديل المحتوى. سيتم إبلاغ صديقك بالدعوة" +
				" الدعوة عبر البريد الإلكتروني. يمكنك أيضا مشاركة جلسات الفيديو مع أصدقائك من خلال النقر على زر مشاركة مشغل الفيديو وربط عنوان ورل للجلسة لهم."
			},
			BASE_URL: {
				TITLE: "ما عنوان الرابط الأساسي وكيف يجب أن أهيئه؟",
				TEXT: "يتم استخدام عنوان الرابط الأساسي لمقاطع الفيديو والرابط في رسالة الدعوة الإلكترونية."
			},
			NOTIFICATIONS: {
				TITLE: "ماهي الاشعارات ؟",
				TEXT: "أو يمكن أن يبلغ أصدقائك المدعوين حول أشرطة الفيديو التي تم تحميلها عن طريق إرسال رسائل لاعلامهم. يمكنك إرسالها عن طريق إضافتها إلى قائمة انتظار الإشعار بالنقر" +
				" يمكنك إضافة زر إشعارات في صفحة معلومات الفيديو والذهاب إلى قائمة الإشعارات والنقر على زر إرسال قائمة انتظار."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "هل لمشغل الفديو مفاتيح مختصرة ؟",
				TEXT: "نعم فعلا. إيقاف مؤقت / إلغاء الإيقاف المؤقت: مساحة. إدارة وحدة التخزين: مفاتيح الأسهم لأعلى أو لأسفل. تخطي الفيديو إلى الأمام / الخلف: مفاتيح الأسهم إلى اليسار أو اليمين. تخطي طويل" +
				" التحكم + مفاتيح الأسهم اليسار أو اليمين. ملء الشاشة تشغيل / إيقاف: ألت + إنتر. ترجمات / إيقاف: S، كتم الصوت: M، العودة إلى السابق" +
				" الشاشة: حذف أو مسافة للخلف."
			},
			FAVORITE_GENRES: {
				TITLE: "كيف تؤثر الأنواع المفضلة للمستخدم على مجموعات البث؟",
				TEXT: "قريبا..."
			},
			USEFUL_LINKS: {
				TITLE: "روابط مفيدة",
				TEXT: "قريبا..."
			}
		}
	});
}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by antonia on 14/05/16.
 *Translated by @DragonShura 23/01/17.
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('it', {
		LOGIN: {
			TITLE: 'Effettua il login',
			USERNAME: 'Nome utente',
			PASSWORD: 'Password',
			FIRST_TIME_HINT: 'Prima volta log-in? Provare \'admin\' per entrambi i campi.',
			SUBMIT: 'Account di accesso',
      SESSION_EXPIRED: 'La sessione è scaduta dall\'ultima attività. Per favore esegui l\'accesso di nuovo.'
		},
		DASHBOARD: {
      HOME: 'Casa',
      TV_SHOWS: 'Spettacoli televisivi',
      MOVIES: 'Films',
      MY_LIST:'La mia lista',
			TITLE: 'Cruscotto',
			NEW_RELEASES: 'Nuove uscite',
			CONTINUE_WATCHING: 'Continuare a guardare',
			DISCOVER_SHOWS: 'Scopri spettacoli',
			DISCOVER_MOVIES: 'Scopri i film',
			DISCOVER_OTHER_VIDEOS: 'Scopri altri video',
			SORT: 'Ordinamento:',
			SEARCH_BY_NAME: 'Ricerca per nome...',
			FILTER_BY_TAG: 'Filtra per Tag...',
			BROWSE_GENRES: 'Sfoglia',
			LOOKING_AT_GENRE: 'si sta guardando il genere:',
			MARK_COMPLETED: 'Mark completato',
			NO_TVSHOWS_FOUND: 'No Tv-Show disponibili',
			NO_MOVIES_FOUND: 'Nessun film disponibile',
      NO_WATCHLIST_FOUND: 'Ancora niente qui',
      WATCHLIST: 'visualizza più tardi'
		},
		VIDEO: {
			RELEASED: 'Rilasciato',
			IMDB: 'IMDB',
			RATING: 'Voto',
			VOTES: 'Voti',
			OVERVIEW: 'Panoramica',
			GENRE: 'Genere',
			TRAILER: 'Rimorchio',
			SEASON: 'Stagione',
      NO_SUBTITLE: 'Nessun sottotitolo'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Con la creazione di una nuova sessione Verrai reindirizzato torna a questo giocatore, ma questa volta avrete un ID di sessione univoco nell url. Condividi con i tuoi amici di avere una visione sincronizzata esperienza con loro!',
			FILE_MISSING: 'Cè un problema con questo contenuto. Sembra che è stato rimosso il file video associato da esso... Condividi con i tuoi amici di avere una visione sincronizzata esperienza con loro!',
			CODEC_PROBLEM: 'Sembra esserci un problema aggiungendo il file video sul lettore. Questo è probabilmente a causa di un problema di codec. Prova a convertirlo a un codec compatibile HTML5, rimuovere il file attualmente allegato e aggiungerlo nuovamente. Se i codec sono belle, controllare il log degli errori del server e URL di base nelle impostazioni.',
			WRONG_BASEPATH: 'Hai dei video get incluso utilizzando il percorso di Base sbagliato, ma si sta visualizzando la pagina via "{{basePath}}". Assicurarsi che si imposta il percorso di Base corretto nelle impostazioni e che si sta utilizzando per esplorare applicazione.'
		},
		MANAGE_CONTENT: 'Gestire i contenuti',
    MANAGE_SUB_PROFILES: 'Gestire i profili',
    WHOS_WATCHING: 'Chi sta guardando',
    ADD_SUB_PROFILE: 'Aggiungi profilo',
    EDIT_BTN: 'Modificare',
    DONE_BTN: 'Fatto',
    SAVE_BTN: 'Salvare',
    CREATE_BTN: 'Creare',
    CANCEL_BTN: 'Annulla',
    DELETE_BTN: 'Elimina',
    ENTER_NAME: 'Inserisci il nome',
    EDIT_PROFILE: 'Modifica Profilo',
    CREATE_PROFILE: 'Crea un profilo',
		ADMIN: 'Admin',
		HELP: 'Guida',
		HELP_FAQ: 'Guida / FAQ',
		PROFILE_SETTINGS: 'Impostazioni del profilo',
		LOGOUT: 'Logout',
		CHANGE_PASSWORD: 'Cambia Password',
	LANGUAGE_en: 'English/Inglese',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/Russo',
    LANGUAGE_de: 'Deutsch/Tedesco',
    LANGUAGE_fr: 'Français/Francese',
    LANGUAGE_es: 'Español/Spagnolo',
    LANGUAGE_kr: '한국어/Coreano',
    LANGUAGE_nl: 'Nederlands/Olandese',
    LANGUAGE_pt: 'Português/Portoghese',
    LANGUAGE_ja: '日本語/Giapponese',
    LANGUAGE_it: 'Italiano',
    LANGUAGE_da: 'Dansk/danese',
    LANGUAGE_ar: 'عربى/Arabo',
    LANGUAGE_hu: 'Magyar/Ungherese',
		PROFIlE: {
			USERNAME: 'Nome Utente',
			FULL_NAME: 'Nome e cognome',
			LANGUAGE: 'Lingua',
			PAUSE_ON_CLICK: 'Pausa Video su Click',
			FAVORITE_GENRES: 'Generi preferiti',
			SAVE: 'Salva il profilo',
			PASS: 'Parola d ordine',
			OLD_PASS: 'Vecchia password',
			NEW_PASS: 'Nuova password',
			NEW_PASS_PLACEHOLDER: 'Nuova password (min. 6 caratteri)',
			REPEAT_PASS: 'Ripeti la password',
			PASS_ERROR_EMPTY: 'La password non può essere vuoto',
			PASS_ERROR_LENGTH: 'La password deve essere lunga almeno 6 caratteri',
			PASS_ERROR_REPEAT: 'Le password devono corrispondere',
      AMOUNT_OF_MEDIA_ENTRIES: 'Quantità di video su Dashboard (prima di "Load More")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Aggiunto di recente',
			OLDEST_ADDED: 'Prima Aggiunto',
			NEWEST_RELEASED: 'Ultima uscita',
			OLDEST_RELEASED: 'I più vecchi di uscita',
			NEWEST_AIRED: 'In onda di recente',
			OLDEST_AIRED: 'I più vecchi Air-Date'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Come faccio a caricare un video?',
				TEXT: "È possibile caricare i video andando al menu Gestisci contenuti. Scegliere se si desidera caricare un film, show televisivo o altri video. Fare clic sull'opzione relativo sottomenu" +
					  "Sulla barra di navigazione verticale sul lato sinistro dello schermo. È possibile caricare un video cliccando sul TV Show Altro pulsante Nuovo Film / / Video Creare o digitando" +
					  "Il nome del video che si desidera caricare la barra di ricerca e selezionare il filmato in questione dai risultati di ricerca. Dopo di che, si può scegliere di compilare il del video" +
					  "Le informazioni manualmente o caricando le sue informazioni dal TheMovieDB. Dopo di che, è possibile caricare il file di sottotitoli video e facendo clic sul pulsante File di Gestione."
			},
			DELETE_VIDEO: {
				TITLE: 'Come posso eliminare un video?',
				TEXT: "È possibile eliminare un video andando alla pagina di informazioni del video e facendo clic su Gestione di file e selezionando l'icona del cestino rosso. Facendo clic su Modifica filmato e selezionando" +
					  "Elimina film è un altro modo per farlo. È anche possibile utilizzare il File Manager, che si trova nel menu Gestione contenuto. È possibile visualizzare tutti i file che hai caricato lì. Fai clic su" +
					  "Cestino rosso può icona per eliminare un file."
			},
			VIDEO_FORMATS: {
				TITLE: 'Quali formati video sono supportati?',
				TEXT: "Streama supporta attualmente solo i formati di file video supportati da player HTML5. È possibile verificare se il file video è compatibile con player HTML5 trascinando" +
					  "Il file a una scheda vuota sul tuo browser."
			},
			SUBTITLES: {
				TITLE: 'Come posso aggiungere sottotitoli ai video?',
				TEXT: "È possibile aggiungere i sottotitoli ai video facendo clic sul pulsante file che si trova nella pagina di informazioni del video Gestisci. È possibile trascinare e rilasciare i file di sottotitoli là " +
					  "in precedenza era necessario convertirli manualmente in un formato file compatibile, ma ora non più! Ora l'applicazione gestisce che per voi."
			},
			INVITE_USERS: {
				TITLE: 'Come posso invitare gli amici a guardare i miei video ospitati?',
				TEXT:"È possibile condividere i video con i tuoi amici, invitandoli a utilizzare il ospitato Streama. Vai al menu utenti e fare clic sul pulsante User Invita. Compila il modulo invitare e" +
					 "Selezionare il ruolo (s) del invitato. Gli utenti con il ruolo di amministratore possono modificare Utenti e Impostazioni. Gli utenti con il ruolo Content Manager possono modificare il contenuto. Il tuo amico verrà notificato di" +
					 "L'invito via e-mail. È inoltre possibile condividere le sessioni video con i tuoi amici cliccando del lettore video pulsante Condividi e che collega l'URL della sessione a loro."
			},
			BASE_URL: {
				TITLE: "Qual è l'URL di base e come devo configurarlo?",
				TEXT: "La Base-URL viene utilizzato per i video e il collegamento nell'invito-mail."
			},
			NOTIFICATIONS: {
				TITLE: "Quali sono le notifiche?",
				TEXT: "È possibile avvisare i tuoi amici invitati circa i video caricati inviando loro messaggi di notifica. È possibile inviare con l'aggiunta di loro la vostra coda di notifica facendo clic su" +
					  "Pulsante di notifica che si trova nella pagina di informazioni del tuo video e andando al menu Notifiche e cliccando il pulsante Invia Queue Aggiungi."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "Ha il lettore video sono tasti di scelta rapida?",
				TEXT: "Sì. Pausa / Riattiva: lo spazio. Gestire il volume: i tasti freccia su o giù. Skip video in avanti / indietro: i tasti freccia a destra oa sinistra. Skip Long:" +
					  "Controllo + tasti freccia a sinistra oa destra a tutto schermo on / off:. Alt + Invio sottotitoli ON / OFF:. S, Mute: M, tornare alla precedente" +
					  "Schermo: eliminare o backspace."
			},
			FAVORITE_GENRES: {
				TITLE: "Come generi preferiti dell'utente influenzano Streama?",
				TEXT: "Prossimamente..."
			},
			USEFUL_LINKS: {
				TITLE: "Link utili",
				TEXT: "Prossimamente..."
			}
		}
	});
}]);
})();
(function(){
'use strict';
//= wrapped
/**
* Translated by @DragonShura on 22/01/17.
*/
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('ja', {
		LOGIN: {
			TITLE: 'ログインしてください',
			USERNAME: 'ユーザー名',
			PASSWORD: 'パスワード',
			FIRST_TIME_HINT: '最初のログイン ? ログイン \'admin\' ユーザー名とパスワード。',
			SUBMIT: 'ログイン',
      SESSION_EXPIRED: 'あなたの最後の活動以来あなたのセッションは期限切れです。もう一度ログインしてください。'
		},
		DASHBOARD: {
      HOME: 'ホーム',
      TV_SHOWS: 'テレビ番組',
      MOVIES: '映画',
      MY_LIST:'私のリスト',
			TITLE: 'ダッシュ ボード',
			NEW_RELEASES: '新しいリリース',
			CONTINUE_WATCHING: '続きを見る',
			DISCOVER_SHOWS: 'ショーを発見します',
			DISCOVER_MOVIES: '映画を発見します',
			DISCOVER_OTHER_VIDEOS: '他の動画を発見します',
			SORT: '並べ替え :',
			SEARCH_BY_NAME: '名前で検索します...',
			FILTER_BY_TAG: 'タグで検索します...',
			BROWSE_GENRES: 'ジャンルを参照します',
			LOOKING_AT_GENRE: 'ジャンルを見てください :',
			MARK_COMPLETED: '完成品マーク',
			NO_TVSHOWS_FOUND: 'テレビ番組発見なし',
			NO_MOVIES_FOUND: 'ない映画',
      NO_WATCHLIST_FOUND: 'ここにはまだ何もありません',
      WATCHLIST: '後で見る'
		},
		VIDEO: {
			RELEASED: 'リリース',
			IMDB: 'IMDB',
			RATING: '評価',
			VOTES: '投票',
			OVERVIEW: '概要',
			GENRE: 'ジャンル',
			TRAILER: 'トレーラー',
			SEASON: 'シーズン',
      NO_SUBTITLE: '字幕なし'
		},

		MESSAGES: {
			SHARE_SOCKET: '新しいセッションを作成することによってこのプレーヤーにリダイレクトされますが、今回は url に一意のセッション ID があります。同期見て彼らと経験を持ってお友達とこれを共有!',
			FILE_MISSING: 'このコンテンツに問題があります。それから関連するビデオ ファイルを削除したようだ.同期見て彼らと経験を持ってお友達とこれを共有!',
			CODEC_PROBLEM: 'プレーヤーにビデオ ファイルを追加する問題があるようです。これはコーデックの問題が原因らしいです。互換性のある HTML5 コーデックに変換してみてください、現在添付されているファイルを削除し、再度追加。コーデックは、罰金は場合、は、サーバーとの設定でベース URL のエラー ログを確認します。',
			WRONG_BASEPATH: 'あなたビデオ取得の間違った基本パスを使用してが \'{{ベースパス}}\' を介してページを拾い読みしています。設定で基本の正しいパスを設定して、あなたがアプリケーションの閲覧に使用していることを確認します。'
		},
		MANAGE_CONTENT: 'コンテンツを管理します',
    MANAGE_SUB_PROFILES: 'プロファイルを管理する',
    WHOS_WATCHING: '誰が見ている？',
    ADD_SUB_PROFILE: 'プロフィールを追加',
    EDIT_BTN: '編集',
    DONE_BTN: '完了',
    SAVE_BTN: '保存する',
    CREATE_BTN: '作成する',
    CANCEL_BTN: 'キャンセル',
    DELETE_BTN: '削除',
    ENTER_NAME: '名前を入力',
    EDIT_PROFILE: 'プロファイル編集',
    CREATE_PROFILE: 'プロフィール作成',
		ADMIN: '管理者',
		HELP: 'ヘルプ',
		HELP_FAQ: 'ヘルプ / FAQ',
		PROFILE_SETTINGS: 'プロファイルの設定',
		LOGOUT: 'ログアウト',
		CHANGE_PASSWORD: 'パスワードを変更します',
	LANGUAGE_en: 'English/英語',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/ロシア',
    LANGUAGE_de: 'Deutsch/ドイツ語',
    LANGUAGE_fr: 'Français/フランス語',
    LANGUAGE_es: 'Español/スペイン語',
    LANGUAGE_kr: '한국어/韓国語',
    LANGUAGE_nl: 'Nederlands/オランダ語',
    LANGUAGE_pt: 'Português/ポルトガル語',
    LANGUAGE_ja: '日本語',
    LANGUAGE_it: 'Italiano/イタリアの',
    LANGUAGE_da: 'Dansk/デンマーク語',
    LANGUAGE_ar: 'عربى/アラビア語',
		LANGUAGE_hu: 'Magyar/ハンガリー人',
		PROFIlE: {
			USERNAME: 'ユーザー名',
			FULL_NAME: '完全な名前',
			LANGUAGE: '言語',
			PAUSE_ON_CLICK: 'クリックでビデオを一時停止します',
			FAVORITE_GENRES: '好きなジャンル',
			SAVE: '保存',
			OLD_PASS: '古いパスワード',
			NEW_PASS: '新しいパスワード',
			NEW_PASS_PLACEHOLDER: '新しいパスワード (最低 6 文字)',
			REPEAT_PASS: 'パスワードを再入力します',
			PASS_ERROR_EMPTY: 'パスワードは空にできません',
			PASS_ERROR_LENGTH: 'パスワードは少なくとも 6 文字の長さにする必要があります',
			PASS_ERROR_REPEAT: 'パスワードは一致する必要があります',
			SAVE_PASS: 'パスワードを保存します',
      AMOUNT_OF_MEDIA_ENTRIES: 'ダッシュボード上のビデオの量（前 "Load More")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: '最新の追加',
			OLDEST_ADDED: '最古の付加',
			NEWEST_RELEASED: '最新のリリース',
			OLDEST_RELEASED: '最も古いリリース',
			NEWEST_AIRED: '最新放映',
			OLDEST_AIRED: '最も古い放映'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'どのようにビデオをアップロードできますか ?',
				TEXT: "動画をアップロードするにはコンテンツの管理メニューに行くことによって。映画、テレビ番組または他のビデオをアップロードしたいかどうかに選択します。関連するサブメニューのオプションをクリックして" +
				" 画面の左側の垂直ナビゲーション バー。作成新しい映画/テレビ番組をクリックしてビデオをアップロードすることができます/その他ビデオ ボタンまたは入力して" +
				"検索バーと検索結果から関連する動画を選択してアップロードするビデオの名前。その後、ビデオの入力することができます" +
				" 情報どちらか手動で TheMovieDB からの情報を読み込んだりします。その後、ファイルの管理] をクリックして、動画と字幕ファイルをアップロードできます"
			},
			DELETE_VIDEO: {
				TITLE: 'どのようにビデオを削除できますか。',
				TEXT: "動画の情報ページに行くことによってビデオを削除することができ、ファイルの管理をクリックし、赤いゴミ箱を選択することができますアイコン。ムービーの編集をクリックし、選択" +
				" 削除映画は、それを行う別の方法です。また、コンテンツの管理メニューでファイル マネージャーを使用できます。アップロードしたすべてのファイルを見ることができます。クリックします。" +
				" 赤のゴミ箱では、アイコン ファイルを削除することができます。"
			},
			VIDEO_FORMATS: {
				TITLE: 'どのビデオ フォーマットをサポートしていますか ?',
				TEXT: "Streama は、現在、HTML5 プレーヤーでサポートされているビデオ ファイル形式のみをサポートしています。ビデオ ファイルのドラッグ アンド ドロップによって HTML5 プレーヤーの互換性のある場合をテストすることができます" +
				" お使いのブラウザーに空のタブにファイル。"
			},
			SUBTITLES: {
				TITLE: '動画に字幕を追加する方法 ?',
				TEXT: "動画の情報ページにあるファイルの管理] をクリックして、動画に字幕を追加できます。ドラッグ アンド ドロップで字幕ファイルができます。" +
				" 互換性のあるファイル形式に手動で変換するにいたが今はもうない!今アプリケーションを処理します。"
			},
			INVITE_USERS: {
				TITLE: '私のホストのビデオを視聴するお友達を招待する方法はできますか ?',
				TEXT:"お友達とあなたのビデオを共有するにはホストの Streama を使用してもらう。[ユーザー] メニューの [ユーザの招待] ボタンをクリックします。招待フォームに記入し、" +
				"出席者の役割を選択します。管理者の役割を持つユーザーは、ユーザーの設定を編集できます。コンテンツ マネージャーの役割を持つユーザーは、コンテンツを編集できます。あなたの友人が通知されます。" +
				" メールで招待状。お友達とビデオ プレーヤーの [共有] ボタンをクリックし、セッション URL をリンク ・ ビデオ ・ セッションを共有することも。"
			},
			BASE_URL: {
				TITLE: "ベース URL とどのようにそれを構成する必要がありますか ?",
				TEXT: "ベース URL は、ビデオと招待メール内のリンクに使用されます。"
			},
			NOTIFICATIONS: {
				TITLE: "通知とは何ですか ?",
				TEXT: "アップロードした動画について、招待された友人は、通知メッセージを送信して通知できます。クリックして、通知キューを追加することによってそれらを送信できます" +
				" 動画の情報ページと通知メニューに行くことおよびキューの送信ボタンをクリックすると、通知ボタンを追加します。"
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "ビデオ プレーヤーのショートカットキーですか ?",
				TEXT: "うん。一時停止/再開: スペース。ボリュームの管理: 矢印キーを上下に移動します。ビデオ前方/後方スキップ: 左または右矢印キー。長いスキップ :" +
				" 左または右の矢印キーを制御します。全画面表示オン/オフ: alt キーを入力してください。字幕オン/オフ: S、ミュート: M、前に戻る '' 画面: 削除またはバック スペースします。"
			},
			FAVORITE_GENRES: {
				TITLE: "ユーザーの好きなジャンルは Streama をどのように影響するのか ?",
				TEXT: "近日公開..."
			},
			USEFUL_LINKS: {
				TITLE: "役に立つリンク",
				TEXT: "近日公開..."
			}
		}
	});
}]);
})();
/**
 * Created by antonia on 14/05/16.
 * Translation by @imkimchi on 16/05/16
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('kr', {
		LOGIN: {
			TITLE: '로그인이 필요합니다.',
			USERNAME: '아이디',
			PASSWORD: '비밀번호',
			FIRST_TIME_HINT: '처음 로그인 하시나요? \'admin\'를 입력해보세요!',
			SUBMIT: '로그인',
      SESSION_EXPIRED: '마지막 활동 이후 세션이 만료되었습니다. 다시 로그인하십시오.'
		},
		DASHBOARD: {
      HOME: '집',
      TV_SHOWS: 'TV 프로그램',
      MOVIES: '영화 산업',
      MY_LIST:'나의 목록',
			TITLE: '대시보드',
			NEW_RELEASES: '신작',
			CONTINUE_WATCHING: '계속해서 보기',
			DISCOVER_SHOWS: '드라마 찾기',
			DISCOVER_MOVIES: '영화 찾기',
			DISCOVER_OTHER_VIDEOS: '다른 영상들을 찾아보기',
			SORT: '정렬:',
			SEARCH_BY_NAME: '제목으로 찾아보기...',
			FILTER_BY_TAG: '태그로 찾아보기...',
			BROWSE_GENRES: '장르 탐색',
			LOOKING_AT_GENRE: '장르를 보고있습니다.',
			MARK_COMPLETED: '선택 완료',
			NO_TVSHOWS_FOUND: '해당 드라마를 찾지 못했습니다.',
			NO_MOVIES_FOUND: '해당 영화를 찾지 못했습니다.',
      NO_WATCHLIST_FOUND: '아직 아무것도 없습니다',
      WATCHLIST: '나중에 볼'
		},
		VIDEO: {
			RELEASED: '출시',
			IMDB: 'IMDB',
			RATING: '평점',
			VOTES: '투표',
			OVERVIEW: '줄거리',
			GENRE: '장르',
			TRAILER: '트레일러',
			SEASON: '시즌',
      NO_SUBTITLE: '부제 없음'
		},

		MESSAGES: {
			SHARE_SOCKET: '새로운 세션을 만들면 이 플레이어로 다시 돌아오지만, 지금은 URL에 유니크 세션 ID가 있습니다. 세션 ID를 친구들과 공유해서 동시에 시청해보세요!',
			FILE_MISSING: '비디오 파일이 찾을 수 없습니다. 친구들과 공유해서 동시에 시청해보세요!',
			CODEC_PROBLEM: '비디오 파일을 플레이어에 추가하는데 문제가 발생했습니다. 코덱의 문제일 가능성이 높습니다. 호환 가능한 HTML5 코덱으로 변경하고, 현재 파일을 삭제하고 다시 추가해보세요. 만약 코덱에 문제가 없다면 환경설정에서 에러 로그와 base URL를 확인해보세요.',
			WRONG_BASEPATH: '잘못된 경로입니다, 현재 페이지는 "{{basePath}}" 입니다. 올바른 경로로 설정해주세요.'
		},
		MANAGE_CONTENT: '컨텐츠 관리',
    MANAGE_SUB_PROFILES: '프로필 관리',
    WHOS_WATCHING: '누가보고있어?',
    ADD_SUB_PROFILE: '프로필 추가',
    EDIT_BTN: '편집하다',
    DONE_BTN: '끝난',
    SAVE_BTN: '구하다',
    CREATE_BTN: '몹시 떠들어 대다',
    CANCEL_BTN: '취소',
    DELETE_BTN: '지우다',
    ENTER_NAME: '이름을 입력하시오',
    EDIT_PROFILE: '프로필 편집',
    CREATE_PROFILE: '프로필 만들기',
		ADMIN: '관리자',
		HELP: '도움',
		HELP_FAQ: '도움 / 질문',
		PROFILE_SETTINGS: '프로필 설정',
		LOGOUT: '로그아웃',
		CHANGE_PASSWORD: '비밀번호 변경',
	LANGUAGE_en: 'English/영어',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/러시아인',
    LANGUAGE_de: 'Deutsch/독일어',
    LANGUAGE_fr: 'Français/프랑스의',
    LANGUAGE_es: 'Español/스페인어',
    LANGUAGE_kr: '한국어',
    LANGUAGE_nl: 'Nederlands/네덜란드',
    LANGUAGE_pt: 'Português/포르투갈어',
    LANGUAGE_ja: '日本語/일본어',
    LANGUAGE_it: 'Italiano/이탈리아 사람',
    LANGUAGE_da: 'Dansk/덴마크 말',
    LANGUAGE_ar: 'عربى/아라비아 말',
    LANGUAGE_hu: 'Magyar/헝가리 인',
		PROFIlE: {
			USERNAME: '아이디',
			FULL_NAME: '이름',
			LANGUAGE: '언어',
			PAUSE_ON_CLICK: '클릭해서 재생을 멈춥니다.',
			FAVORITE_GENRES: '좋아하는 장르',
			SAVE: '저장',
			OLD_PASS: '기존 비밀번호',
			NEW_PASS: '새 비밀번호',
			NEW_PASS_PLACEHOLDER: '새 비밀번호 (최소 6글자)',
			REPEAT_PASS: '비밀번호 재입력',
			SAVE_PASS: '새 비밀번호 설정',
      AMOUNT_OF_MEDIA_ENTRIES: '대시 보드의 비디오 양 (이전 "Load More")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: '최근 추가된 순',
			OLDEST_ADDED: '늦게 추가된 순',
			NEWEST_RELEASED: '최근 출시된 순 ',
			OLDEST_RELEASED: '늦게 출시된 순',
			NEWEST_AIRED: '최근에 방영된 순',
			OLDEST_AIRED: '늦게 방영된 순 '
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: '비디오를 어떻게 업로드 하나요?',
				TEXT: "컨텐츠 관리 메뉴에서 비디오를 업로드 할 수 있습니다. 영화, 드라마, 영상를 업로드할건지 선택해주세요. 하위 메뉴를 클릭하세요." +
				" 화면 좌측에 있는 네비게이션 바. 새로운 영화/드라마/영상 버튼을 클릭하거나 입력해서 동영상을 업로드 할 수 있습니다" +
				" 검색 창에서 업로드 하고 싶은 동영상을 검색하세요. 검색 결과중에 원하는 영화를 클릭하면 동영상 리스트에 추가할 수 있습니다." +
				" TheMovieDB 또는 로컬 파일을 파일 관리 버튼을 클릭해서 동영상과 자막 파일을 추가할 수 있습니다."
			},
			DELETE_VIDEO: {
				TITLE: '비디오를 어떻게 삭제 하나요?',
				TEXT: "비디오 정보 페이지 -> 파일 관리 -> 빨간색 휴지통 아이콘 -> 영화 수정 -> 선택" +
				" 영화 삭제 를 통해 삭제 할 수 있습니다. 컨텐츠 관리 메뉴에 있는 파일 관리자를 사용해서 삭제할 수도 있습니다. 파일 관리자로 업로드한 영상들을 모두 확인할 수 있습니다." +
				" 빨간 휴지통 아이콘을 클릭해서 삭제하세요."
			},
			VIDEO_FORMATS: {
				TITLE: '어떤 동영상 포맷을 지원하나요?',
				TEXT: "Streama는 HTML5 플레이어가 지원하는 형식의 동영상 포맷만 지원합니다. 빈 창에 동영상을 드래그 앤 드랍을 통해 HTML5 플레이어와 호환이 되는지 확인할 수 있습니다."
			},
			SUBTITLES: {
				TITLE: '자막을 어떻게 추가 할 수 있나요?',
				TEXT: "비디오 정보 페이지에 있는 파일 관리자를 클릭해서 동영상에 자막을 추가할 수 있습니다. 드래그 앤 드랍을 통해서 추가할 수 도 있습니다." +
				" 이전에는 수동으로 파일 형식을 호환 가능한 파일 형식으로 변환해야했지만 Streama가 대신 해드립니다!"
			},
			INVITE_USERS: {
				TITLE: '내가 추가한 동영상을 친구들이 볼 수있도록 할 수있나요?',
				TEXT:" Streama를 통해 친구들을 초대하여 친구들에게 동영상을 공유할 수있습니다. 유저 메뉴에서 유저 초대 버튼을 클릭하세요. 초대 리스트를 작성하고" +
				" 초대하려는 친구의 권한을 설정하세요. 관리자 권한을 가진 유저는 유저 & 설정을 변경할 수 있습니다. 파일 관리자 권한을 가진 유저는 파일을 변경할 수 있습니다. 초대가 된 이후에, 당신의 친구들에게 이메일로 알람이 갑니다." +
				" 비디오 플레이어의 공유 버튼을 클릭한 후, 링크를 공유해서 친구들에게 동영상을 공유할 수도 있습니다."
			},
			BASE_URL: {
				TITLE: "Base URL이 어떤 것이고 어떻게 설정할 수 있나요?",
				TEXT: "Base-URL 은 동영상과 초대 이메일의 링크로 쓰입니다."
			},
			NOTIFICATIONS: {
				TITLE: "알람들이 뭔가요?",
				TEXT: "초대된 친구들한테 업로드 된 영상을 알릴 수 있습니다. 비디오 정보 페이지 -> 알람 -> 대기열 전송을 클릭 해서 알람 대기열에 추가 시킬 수 있습니다."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "단축키가 있나요?",
				TEXT: "정지: space. 볼륨 조절: 방향키 위/아래. 동영상 건너뛰기: 단축키 우측/좌측. 길게 건너뛰기:" +
				" control + 방향키 좌측/우측. 전체화면 on/off: alt + enter. 자막 on/off: S, 음소거: M, 뒤로가기" +
				" screen: delete키 혹은 backspace."
			},
			FAVORITE_GENRES: {
				TITLE: "유저의 장르 취향이 Stream에 어떤 영향을 주나요?",
				TEXT: "Coming soon..."
			},
			USEFUL_LINKS: {
				TITLE: "유용한 링크",
				TEXT: "Coming soon..."
			}
		}
	});
}]);

/**
 * Created by antonia on 14/05/16.
 * Translated by Steyn Guelen on 15/05/16.
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
  $translateProvider.translations('nl', {
    LOGIN: {
      TITLE: 'Graag inloggen',
      USERNAME: 'Gebruikersnaam',
      PASSWORD: 'Wachtwoord',
      FIRST_TIME_HINT: 'Eerste keer dat u inlogt? Probeer \'admin\' voor gebruikersnaam en wachtwoord.',
      SUBMIT: 'Login',
      SESSION_EXPIRED: 'Je sessie is verlopen sinds je laatste activiteit. Log alsjeblieft nogmaals in.'
    },
    DASHBOARD: {
      HOME: 'Huis',
      TV_SHOWS: 'Tv shows',
      MOVIES: 'Films',
      MY_LIST:'Mijn lijst',
      TITLE: 'Dashboard',
      RECOMMENDATIONS: 'Aanbevelingen voor u',
      NEW_RELEASES: 'Nieuw uitgebracht',
      CONTINUE_WATCHING: 'Verder kijken',
      DISCOVER_SHOWS: 'Ontdek series',
      DISCOVER_MOVIES: 'Ontdek films',
      DISCOVER_OTHER_VIDEOS: 'Ontdek andere videos.',
      SORT: 'Sorteer op',
      SEARCH_BY_NAME: 'Zoek met naam...',
      FILTER_BY_TAG: 'Filter op tag...',
      BROWSE_GENRES: 'Verken',
      LOOKING_AT_GENRE: 'Je kijkt naar het genre',
      MARK_COMPLETED: 'Markeer als bekeken',
      NO_TVSHOWS_FOUND: 'Geen series beschikbaar',
      NO_MOVIES_FOUND: 'Geen films beschikbaar',
      NO_WATCHLIST_FOUND: 'Hier nog niets',
      WATCHLIST:'later bekijken'
    },
    VIDEO: {
      RELEASED: 'Uitgebracht op',
      IMDB: 'IMDB',
      RATING: 'Waardering',
      VOTES: 'Aantal stemmen',
      OVERVIEW: 'Overzicht',
      GENRE: 'Genre',
      TRAILER: 'Trailer',
      SEASON: 'Seizoen',
      NO_SUBTITLE: 'Geen ondertiteling'
    },

    MESSAGES: {
      SHARE_SOCKET: 'Door een nieuwe sessie te starten zal je teruggestuurd worden naar dit venster, maar deze keer zal de url een unieke sessie id bevatten. Deel deze met je vrienden om een gesynchroniseerde kijkervaring te beleven!',
      FILE_MISSING: 'Er is een probleem met deze video. Het lijkt erop dat het bestand verwijderd is.',
      CODEC_PROBLEM: 'Het lijkt er op dat er een probleem is met het toevoegen van het bestand. Dit komt waarschijnlijk door een verkeerde codec. Converteer het bestand naar een HTML5-codec, verwijder het huidige bestand en probeer het nieuwe bestand opnieuw toe te voegen. Is de codec wel geschikt? Check de server log en Base URL.',
      WRONG_BASEPATH: 'Uw video wordt toegevoegd met het verkeerde basispad, u bekijkt de pagina via "{{basePath}}". Wees er weker van dat u het juiste basispad instelt en dat je dit gebruikt om de applicatie te bereiken.',
      FILE_IN_FS_NOT_FOUND: 'Uw video kan niet gevonden worden op een van de locaties die beschikbaar zijn voor de toepassing. Herzie uw instellingen en uw bestandssyteem om er zeker van te zijn dat alle bestanden bereikbaar zijn voor de applicatie.'
    },
    MANAGE_CONTENT: 'Beheer content',
    MANAGE_SUB_PROFILES: 'Profielen beheren',
    WHOS_WATCHING: 'Wie kijkt?',
    ADD_SUB_PROFILE: 'Profiel toevoegen',
    EDIT_BTN: 'Bewerk',
    DONE_BTN: 'Gedaan',
    SAVE_BTN: 'Opslaan',
    CREATE_BTN: 'creëren',
    CANCEL_BTN: 'annuleren',
    DELETE_BTN: 'Verwijder',
    ENTER_NAME: 'Voer naam in',
    EDIT_PROFILE: 'Bewerk profiel',
    CREATE_PROFILE: 'Maak een profiel aan',
    ADMIN: 'Administrator',
    HELP: 'Help',
    HELP_FAQ: 'HELP / FAQ',
    PROFILE_SETTINGS: 'Profielinstellingen',
    LOGOUT: 'Uitloggen',
    CHANGE_PASSWORD: 'Wachtwoord wijzigen',
    LANGUAGE_en: 'English/Engels',
    LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/Russisch',
    LANGUAGE_de: 'Deutsch/Duits',
    LANGUAGE_fr: 'Français/Frans',
    LANGUAGE_es: 'Español/Spaans',
    LANGUAGE_kr: '한국어/Koreaans',
    LANGUAGE_nl: 'Nederlands',
    LANGUAGE_pt: 'Português/Portugees',
    LANGUAGE_ja: '日本語/Japans',
    LANGUAGE_it: 'Italiano/Italiaans',
    LANGUAGE_da: 'Dansk/Deens',
    LANGUAGE_ar: 'عربى/Arabisch',
    LANGUAGE_hu: 'Magyar/Hongaars',
    PROFIlE: {
      USERNAME: 'Gebruikersnaam',
      FULL_NAME: 'Volledige naam',
      LANGUAGE: 'Taal',
      PAUSE_ON_CLICK: 'Pauzeer video met klik',
      FAVORITE_GENRES: 'Favoriete Genres',
      AMOUNT_OF_MEDIA_ENTRIES: 'Aantal video\'s op dashboard (voorheen "Meer laden")',
      SAVE: 'Opslaan',
      PASS: 'Wachtwoord',
      OLD_PASS: 'Oud wachtwoord',
      NEW_PASS: 'Nieuw wachtwoord',
      NEW_PASS_PLACEHOLDER: 'Nieuw wachtwoord (minimaal 6 karakters',
      REPEAT_PASS: 'Herhaal wachtwoord',
      PASS_ERROR_EMPTY: 'Het wachtwoord mag niet leeg zijn',
      PASS_ERROR_LENGTH: 'Het wachtwoord moet minstens 6 karakters lang zijn',
      PASS_ERROR_REPEAT: 'De wachtwoorden moeten overeenstemmen',
      SAVE_PASS: 'Opslaan'
    },

    SORT_OPTIONS: {
      AZ: 'A-Z',
      ZA: 'Z-A',
      NEWEST_ADDED: 'Meest recent toegevoegd',
      OLDEST_ADDED: 'Als eerste toegevoegd',
      NEWEST_RELEASED: 'Laatst uitgebracht',
      OLDEST_RELEASED: 'Als eerste uitgebracht',
      NEWEST_AIRED: 'Meest recent uitgezonden',
      OLDEST_AIRED: 'Als eerste uitgezonden',
      NEWEST_REPORTED: 'Laatst Gerapporteerd',
      OLDEST_REPORTED: 'Als eerste gerapporteerd',
      NEWEST_UPDATED: 'Laatst Bijgewerkt',
      OLDEST_UPDATED: 'Als eerste bijgewerkt'
    },

    FAQ: {
      UPLOAD_VIDEO: {
        TITLE: 'Hoe kan ik een video uploaden?',
        TEXT: "U kan een video oploaden door naar het Beheer Content menu te gaan. Kies tussen het uploaden van een Film, Serie of andere soort video. Klik op de relevante sub-menu optie" +
          " te vinden op de verticale navigatiebar op de linkerkant van het scherm. Je kan een nieuwe video toevoegen door te klikken op Create New Movie/TV Show/Other Video knop" +
          " of door de film te zoeken via de zoekbalk en het relevante resultaat te kiezen. Nadien kan je de informatie van de video manueel invullen of de informatie laden vanuit TheMovieDB." +
          " Als laatste voegt u de video en mogelijke ondertitels toe via de Mqnqge Files knop."
      },
      DELETE_VIDEO: {
        TITLE: 'Hoe kan ik een video verwijderen?',
        TEXT: "U kan een video verwijderen door naar de infromatie pagina van de videos te gaan en op Manage Files te klikken. Daar klikt op het icoon van de rode vuilbak." +
          " Klikken op Edit Movie en Delete Movie selecteren is een tweede manier. Een derde manier is naar het Manage Content Menu te gaan en te klikken op het rode vuilbak icoon van" +
          " het te verwijderen bestand."
      },
      VIDEO_FORMATS: {
        TITLE: 'Welke video indelingen worden ondersteund?',
        TEXT: "Streama ondersteund momenteel enkel de video indelingen die ondersteund zijn door de HTML5 Player. U kan testen of uw video HTML5 compatibel is door uw bestand" +
          " naar een leeg browsertablad te slepen."
      },
      SUBTITLES: {
        TITLE: 'Hoe kan ik ondertitels toevoegen aan videos?',
        TEXT: "U kan ondertitels toevoegen voor een bepaalde video door naar de informatiepagina van de video te gaan en de knop Manage Files in te drukken." +
          " U kan hier simpelweg ondertitel bestanden naartoe slepen. Voordien moest u de bestanden converteren naar een gekende bestandsindeling, maar niet langer!" +
          " De applicatie zorgt hier nu volledig zelf voor."
      },
      INVITE_USERS: {
        TITLE: 'Hoe kan ik vrienden uitnodigen om mijn gehoste video te bekijken?',
        TEXT: "U kan uw videos delen met uw vrienden door ze uit te nodigen om uw Streama te gebruiken. Ga naar het Users Menu en klik op Invite User. Vul het uitnodigingsformulier" +
          " in en selecteer de rol(len) van de genodigde. Gebuikers met de rol Admin kunnen gebruikers en instellen aanpassen. Gebruikers met de rol Content Manager kunnen materiaal" +
          " beheren. Uw vriend zal op de hoogte gebracht worden van de uitnodiging via mail. U kan ook video sessies delen met vrienden door de Share-knop in te drukken tijdens het" +
          " spelen van de video. De getoonde link kan u delen met hen."
      },
      BASE_URL: {
        TITLE: "Wat is de basis URL en hoe moet ik deze configureren?",
        TEXT: "De basis URL wordt gebruikt voor de videos en de link in de invitatie email."
      },
      NOTIFICATIONS: {
        TITLE: "Wat zijn notificaties?",
        TEXT: "U kan uw uitgenodigde vrienden op de hoogte brengen van nieuw materiaal door hen notificaties te sturen. U kan deze sturen door ze toe te voegen aan de notificatierij." +
          " Dit door te klikken op Add Notification in de video\'s informatiepagina en naar het notificatiemenu te gaan en te klikken op Send Queue."
      },
      VIDEO_PLAYER_SHORTCUTS: {
        TITLE: "Heeft de videospeler shortcut knoppen?",
        TEXT: "Ja. Pauze/hervatten: spatiebalk. Volume regelen: Pijltjestoetsen op en neer. Videos overslaan vooruit/achteruit: Pijltjestoetsen links en rechts. Lang overslaan:" +
          " control + Pijltjestoetsen links en rechts. Volledig scherm aan/uit: alt + enter. Ondertitels aan/uit: S, Mute: M, Naar het vorige scherm: delete or backspace."
      },
      FAVORITE_GENRES: {
        TITLE: "Welk effect heeft uw favoriete genre op Streama?",
        TEXT: "Komt Binnenkort..."
      },
      USEFUL_LINKS: {
        TITLE: "Handige links",
        TEXT: "Komt Binnenkort..."
      }
    }
  });
}]);

(function(){
'use strict';
//= wrapped
/**
 * Created by antonia on 14/05/16.
 *
 * Last update: 10/02/2020
 *
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('pt', {
		LOGIN: {
			TITLE: 'Fazer Login',
			USERNAME: 'Usuário',
			PASSWORD: 'Senha',
			FIRST_TIME_HINT: 'Primeira vez fazendo login? Tente \'admin\' nos dois campos.',
			SUBMIT: 'Entrar',
			SESSION_EXPIRED: 'Sua sessão expirou desde sua última atividade. Por favor faça login novamente.'
		},
		DASHBOARD: {
			HOME: 'Início',
			TV_SHOWS: 'Programas de televisão',
			MOVIES: 'Filmes',
			MY_LIST:'Minha lista',
			TITLE: 'Painel',
			RECOMMENDATIONS: 'Sugestões para você',
			NEW_RELEASES: 'Novos lançamentos',
			CONTINUE_WATCHING: 'Continue assistindo',
			DISCOVER_SHOWS: 'Descubra séries',
			DISCOVER_MOVIES: 'Descubra filmes',
			DISCOVER_OTHER_VIDEOS: 'Descubra outros vídeos',
			SORT: 'Ordenar:',
			SEARCH_BY_NAME: 'Pesquisar por Nome...',
			FILTER_BY_TAG: 'Filtrar por Tag...',
			BROWSE_GENRES: 'Navegar',
			LOOKING_AT_GENRE: 'Você está vendo o gênero:',
			MARK_COMPLETED: 'Concluído',
			NO_TVSHOWS_FOUND: 'Nenhuma Série Disponível',
			NO_MOVIES_FOUND: 'Nenhum Filme Disponível',
      NO_WATCHLIST_FOUND: 'Nada aqui ainda',
			WATCHLIST: 'ver mais tarde'
		},
		VIDEO: {
			RELEASED: 'Lançamento',
			IMDB: 'IMDB',
			RATING: 'Classificação',
			VOTES: 'Votos',
			OVERVIEW: 'Sinopse',
			GENRE: 'Gênero',
			TRAILER: 'Trailer',
			SEASON: 'Temporada',
			NO_SUBTITLE: 'Sem legenda',
			UPNEXT: 'A seguir...'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Ao criar uma nova sessão você será redirecionado de volta para esse player, mas dessa vez você terá um ID de sessão único na url. Compartilhe isso com seus amigos e tenha uma experiência sincronizada com eles!',
			FILE_MISSING: 'Houve um problema com esse conteúdo. Parece que você removeu o arquivo de vídeo associado a ele.',
			CODEC_PROBLEM: 'Parece que houve um problema ao adicionar o arquivo de vídeo ao player. Isso aconteceu provavelmente por causa de um problema de codec. Tente converter o vídeo para um codec compatível com HTML5, remova o arquivo de vídeo atual e re-adicione ele. Se os codecs estão ok, cheque o log de erros do servidor e a URL base nas configurações.',
			WRONG_BASEPATH: 'Seu vídeo foi incluído usando o caminho base errado, mas você está navegando na página via "{{basePath}}". Verifique se você usou o caminho base correto nas configurações e que você está usando ele para navegar na aplicação.',
			FILE_IN_FS_NOT_FOUND: 'Seu vídeo não pode ser encontrado em nenhum dos locais disponíveis para o aplicativo. Por favor, verifique suas configurações e seus arquivos de sistema para ter certeza de que os arquivos estão acessíveis para o programa.'
		},
		MANAGE_CONTENT: 'Gerenciar Conteúdo',
		MANAGE_SUB_PROFILES: 'Gerenciar perfis',
		WHOS_WATCHING: 'Quem está assistindo?',
		ADD_SUB_PROFILE: 'Adicionar perfil',
		EDIT_BTN: 'Editar',
		DONE_BTN: 'Concluir',
		SAVE_BTN: 'Salvar',
		CREATE_BTN: 'Criar',
		CANCEL_BTN: 'Cancelar',
		DELETE_BTN: 'Excluir',
		ENTER_NAME: 'Digite o nome',
		EDIT_PROFILE: 'Editar Perfil',
		CREATE_PROFILE: 'Criar perfil',
		ADMIN: 'Admin',
		HELP: 'Ajuda',
		HELP_FAQ: 'AJUDA / FAQ',
		PROFILE_SETTINGS: 'Configurações do Perfil',
		LOGOUT: 'Sair',
		CHANGE_PASSWORD: 'Alterar Senha',
		LANGUAGE_en: 'English/Inglês',
		LANGUAGE_cn: '中文/Chinês',
		LANGUAGE_ru: 'Русский/Russo',
		LANGUAGE_de: 'Deutsch/Alemão',
		LANGUAGE_fr: 'Français/Francês',
		LANGUAGE_es: 'Español/Espanhol',
		LANGUAGE_kr: '한국어/Coreano',
		LANGUAGE_nl: 'Nederlands/Holandês',
		LANGUAGE_pt: 'Português',
		LANGUAGE_ja: '日本語/Japonês',
		LANGUAGE_it: 'Italiano/Italiano',
		LANGUAGE_da: 'Dansk/Dinamarquês',
		LANGUAGE_ar: 'عربى/Árabe',
		LANGUAGE_hu: 'Magyar/Húngaro',
		PROFIlE: {
			USERNAME: 'Usuário',
			FULL_NAME: 'Nome completo',
			LANGUAGE: 'Idioma',
			PAUSE_ON_CLICK: 'Pausar vídeo ao Clicar',
			FAVORITE_GENRES: 'Gêneros favoritos',
			SAVE: 'Salvar Perfil',
			PASS: 'Senha',
			OLD_PASS: 'Senha Atual',
			NEW_PASS: 'Nova Senha',
			NEW_PASS_PLACEHOLDER: 'Nova Senha (min. 6 caracteres)',
			REPEAT_PASS: 'Repita a Senha',
			PASS_ERROR_EMPTY: 'A senha não pode estar vazia',
			PASS_ERROR_LENGTH: 'A senha tem que ter pelo menos 6 caracteres',
			PASS_ERROR_REPEAT: 'As senhas têm que coincidir',
			AMOUNT_OF_MEDIA_ENTRIES: 'Quantidade de Vídeos no Painel de Controle (Antes de "Load More")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Adicionado por Último',
			OLDEST_ADDED: 'Adicionado Primeiro',
			NEWEST_RELEASED: 'Lançado por Último',
			OLDEST_RELEASED: 'Lançado Primeiro',
			NEWEST_AIRED: 'Transmitido por Último',
			OLDEST_AIRED: 'Transmitido Primeiro'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Como eu envio um vídeo?',
				TEXT: "Você pode enviar conteúdo no menu Gerenciar Conteúdo. Escolha se você quer Enviar um Filme, uma Série ou outro tipo de conteúdo. Clique na opção relevante no sub-menu" +
				" na barra vertical de navegação do lado esquerdo da tela. Você pode enviar um vídeo clicando no botão \"Create New Movie/TV Show/Other Video\" ou digitando" +
				" o nome do vídeo que você quer enviar na barra de pesquisa e selecionando o vídeo relevante nos resultados da busca. Depois disso, você pode escolher preencher as informações" +
				" do vídeo ou manualmente ou carregando as informações do TheMovieDB. Depois disso, você pode enviar o vídeo e os arquivos de legenda clicando no botão Gerenciar Conteúdo."
			},
			DELETE_VIDEO: {
				TITLE: 'Como eu deleto um vídeo?',
				TEXT: "Você pode deletar um vídeo indo para a página de informação do vídeo e clicando em Gerenciar Conteúdo e clicando no botão vermelho de lixeira. Clicar em Edit Movie" +
				" e então em Delete Movie é outro jeito de fazer isso. Você também pode usar o Gerenciador de Arquivos que fica no Gerenciador de Conteúdo. Você pode ver todos os arquivos que" +
				" você enviou lá. Clique no botão da lixeira vermelha para deletar um arquivo."
			},
			VIDEO_FORMATS: {
				TITLE: 'Que formatos de vídeo são suportados?',
				TEXT: "O Streama atualmente suporta apenas formatos de vídeo suportados pelo player HTML5. Você pode testar se o seu arquivo de vídeo é compatível com o player HTML5 simplesmente" +
				" arrastando e soltando seu arquivo numa nova aba do seu navegador."
			},
			SUBTITLES: {
				TITLE: 'Como eu adiciono legendas para os vídeos?',
				TEXT: "Você pode adicionar legendas para os vídeos clicando no botão Gerenciar Arquivos, que fica na página de informações do vídeo. Você pode arrastar e soltar" +
				" o arquivo das legendas lá. Antigamente você tinha que manualmente converter a legenda para um formato compatível, mas não mais! Agora a aplicação converte para você."
			},
			INVITE_USERS: {
				TITLE: 'Como eu convido meus amigos para assistir meus vídeos hosteados?',
				TEXT:"Você pode compartilhar seus vídeos com seus amigos convidando eles para usar o seu Streama hosteado. Vá para o menu de Usuários e clique o botão Invite User. Preencha o formulário e" +
				" selecione os cargos do convidado. Usuários com o cargo Admin podem editar Usuários & Configurações. Usuários com o cargo Content Manager podem editar conteúdo. Seu amigo será notificado sobre" +
				" o convite via email. Você também pode compartilhar sessões de vídeo com seus amigos clicando no botão de Compartilhar dentro do player e mandando o link da sessão para eles."
			},
			BASE_URL: {
				TITLE: "O que é a URL base e como eu devo configurá-la?",
				TEXT: "A URL base é usada para vídeos e para o link no email de convite."
			},
			NOTIFICATIONS: {
				TITLE: "O que são notificações?",
				TEXT: "Você pode notificar seus amigos que foram convidados sobre vídeos enviados mandando notificações para eles. Você pode enviar notificações adicionando eles a fila de notificações ao clicar" +
				" Adicione o botão Notificação, que está na página de informações do seu vídeo, indo até o menu Notificações e clicando no botão Enviar Fila."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "O player tem botões de atalho?",
				TEXT: "Sim. Pausar/resumir: espaço. Volume: setas para cima e para baixo. Pular vídeo para frente ou para trás: setas para esquerda e para direita. Pulo longo:" +
				" control + setas para esquerda e para direita. Ligar ou desligar a tela cheia: alt + enter. Ligar ou desligar legendas: S, Mutar: M, Voltar para e tela anterior:" +
				" delete ou backspace."
			},
			FAVORITE_GENRES: {
				TITLE: "Como os gêneros favoritos do usuário afetam o Streama?",
				TEXT: "Em breve..."
			},
			USEFUL_LINKS: {
				TITLE: "Links úteis",
				TEXT: "Em breve..."
			}
		}
	});
}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by shardik on 21/01/18.
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('ru', {
		LOGIN: {
			TITLE: 'Пожалуйста, авторизуйтесь',
			USERNAME: 'Логин',
			PASSWORD: 'Пароль',
			FIRST_TIME_HINT: 'Впервые? Используйте \'admin\' в качестве логина и пароля для входа.',
			SUBMIT: 'Войти',
      SESSION_EXPIRED: 'Ваша сессия истекла. Пожалуйста, войдите снова.'
		},
		DASHBOARD: {
      HOME: 'Домашняя страница',
      TV_SHOWS: 'ТВ шоу',
      MOVIES: 'Фильмы',
      MY_LIST:'Мой список',
			TITLE: 'Главная',
			RECOMMENDATIONS: 'Рекомендовано для вас',
			NEW_RELEASES: 'Новое на сайте',
			CONTINUE_WATCHING: 'Продолжить просмотр',
			DISCOVER_SHOWS: 'Обзор тв-шоу',
			DISCOVER_MOVIES: 'Обзор кино',
			DISCOVER_OTHER_VIDEOS: 'Обзор остального видео',
			SORT: 'Сортировать по:',
			SEARCH_BY_NAME: 'имени...',
			FILTER_BY_TAG: 'тегу...',
			BROWSE_GENRES: 'Обзор',
			LOOKING_AT_GENRE: 'Вы смотрите по жанру:',
			MARK_COMPLETED: 'Уже просмотрено!',
			NO_TVSHOWS_FOUND: 'ТВ-шоу пока недоступно',
			NO_MOVIES_FOUND: 'Кино пока недоступно',
      NO_WATCHLIST_FOUND: 'Здесь пока ничего',
      WATCHLIST: 'Посмотреть позже'
		},
		VIDEO: {
			RELEASED: 'Дата выхода',
			IMDB: 'IMDB',
			RATING: 'Рейтинг',
			VOTES: 'Голосов',
			OVERVIEW: 'Описание',
			GENRE: 'Жанр',
			TRAILER: 'Трейлер',
			SEASON: 'Сезон',
      NO_SUBTITLE: 'без субтитров'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Создавая новую сессию, вы будете перенаправлены обратно на этот плеер, но на этот раз у вас будет уникальный идентификатор сессии в URL-адресе. Поделитесь этим видео с друзьями, чтобы синхронизировать их с ними!',
			FILE_MISSING: 'Существует проблема с этим контентом. Кажется, вы удалили из него связанный видеофайл.',
			CODEC_PROBLEM: 'Кажется, что проблема связана с добавлением видеофайла в плеер. Это, скорее всего, связано с проблемой кодека. Попробуйте преобразовать его в совместимый кодек HTML5, удалите прикрепленный файл и снова добавьте его. Если кодеки в порядке, проверьте данные об ошибках сервера и базового URL в настройках.',
			WRONG_BASEPATH: 'Вы пытаетесь просмотреть видео с использованием неправильного базового пути, но просматриваете страницу через переменную «{{basePath}}». Убедитесь, что вы установили правильный базовый путь в настройках и используете его для просмотра приложения.',
			FILE_IN_FS_NOT_FOUND: 'Ваше видео не может быть найдено ни в одном из мест, доступных для приложения. Проверьте свои настройки и файловую систему, чтобы убедиться, что файлы доступны для приложения.'
		},
		MANAGE_CONTENT: 'Управление',
    MANAGE_SUB_PROFILES: 'Управление профилями',
    WHOS_WATCHING: 'Кто будет смотреть?',
    ADD_SUB_PROFILE: 'Добавить профайл',
    EDIT_BTN: 'Изменить',
    DONE_BTN: 'Сделано',
    SAVE_BTN: 'Сохранить',
    CREATE_BTN: 'Создать',
    CANCEL_BTN: 'Отменить',
    DELETE_BTN: 'Удалить',
    ENTER_NAME: 'Введите имя',
    EDIT_PROFILE: 'Редактировать профиль',
    CREATE_PROFILE: 'Создать профиль',
		ADMIN: 'Админка',
		HELP: 'Помощь',
		HELP_FAQ: 'ПОМОЩЬ / ЧаВО',
		PROFILE_SETTINGS: 'Настройки',
		LOGOUT: 'Выйти',
		CHANGE_PASSWORD: 'Изменить пароль',
	LANGUAGE_en: 'English/английский',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский',
    LANGUAGE_de: 'Deutsch/Немецкий',
    LANGUAGE_fr: 'Français/Французский',
    LANGUAGE_es: 'Español/испанский',
    LANGUAGE_kr: '한국어/корейский язык',
    LANGUAGE_nl: 'Nederlands/Голландский',
    LANGUAGE_pt: 'Português/португальский',
    LANGUAGE_ja: '日本語/японский язык',
    LANGUAGE_it: 'Italiano/итальянский',
    LANGUAGE_da: 'Dansk/датский',
    LANGUAGE_ar: 'عربى/арабский',
		LANGUAGE_hu: 'Magyar/венгерский',
		PROFIlE: {
			USERNAME: 'Логин',
			FULL_NAME: 'Имя',
			LANGUAGE: 'Язык',
			PAUSE_ON_CLICK: 'Поставить на паузу при клике',
			FAVORITE_GENRES: 'Любимые жанры',
      AMOUNT_OF_MEDIA_ENTRIES: 'Количество видео на главной странице (до ссылки «Загрузить больше»)',
			SAVE: 'Сохранить профиль',
			PASS: 'Пароль',
			OLD_PASS: 'Старый пароль',
			NEW_PASS: 'Новый пароль',
			NEW_PASS_PLACEHOLDER: 'Новый пароль (минимум 6 символов)',
			REPEAT_PASS: 'Повоторите пароль',
			PASS_ERROR_EMPTY: 'Пароль не должен быть пустым',
			PASS_ERROR_LENGTH: 'Пароль должен быть не менее 6 символов',
			PASS_ERROR_REPEAT: 'Пароли не совпадают',
			SAVE_PASS: 'Установить новый пароль'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Самые последние',
			OLDEST_ADDED: 'Самые новые',
			NEWEST_RELEASED: 'Последние поступления',
			OLDEST_RELEASED: 'Старые поступления',
			NEWEST_AIRED: 'Самые новые',
			OLDEST_AIRED: 'Самые старые',
      NEWEST_REPORTED: 'Самые последние сообщения',
      OLDEST_REPORTED: 'Старое сообщение',
      NEWEST_UPDATED: 'Самые последние обновления',
      OLDEST_UPDATED: 'Последнее обновление'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Как я могу загрузить видео?',
				TEXT: "Вы можете загружать видео, перейдя в меню «Управление». Выберите, что вы хотите загрузить: фильм, телешоу или другое видео. Выберите соответствующее подменю "+
               "в левой части экрана. Вы можете загрузить видео, нажав кнопку «Создать новый фильм / ТВ-шоу / другое видео или набрав" +
               "название видео, которое вы хотите загрузить в панель поиска, и выбрать соответствующий фильм из результатов поиска. После этого вы можете выбрать, как удобно добавить видео:" +
               "вводя всю информацию вручную, либо загружая свою информацию из базы TheMovieDB (автоматически), после чего вы можете загрузить видео и файлы субтитров, нажав кнопку «Управление»."
			},
			DELETE_VIDEO: {
				TITLE: 'Как мне удалить видео?',
				TEXT: "Вы можете удалить видео, перейдя на страницу информации о видео и нажав «Управление файлами» и выбрав красную иконку со значком мусорной корзины. Нажав «Изменить фильм» и выбрав "+
"Удалить фильм - это еще один способ сделать так. Вы также можете использовать Диспетчер файлов, который находится в меню «Управление». Вы можете увидеть все файлы, которые вы там загрузили. Нажмите" +
"красную иконку со значком мусорной корзины, чтобы удалить файл."
			},
			VIDEO_FORMATS: {
				TITLE: 'Какие форматы видео поддерживаются?',
				TEXT: "Streama поддерживает в настоящее время только те форматы видеофайлов, поддерживаемые проигрывателем стандарта HTML5. Вы можете проверить, совместим ли ваш видеофайл с HTML5-плеером,"+
				" перетащив ваш файл на пустую закладку в вашем браузере. Если видео откроется и начнет воспроизводиться, значит формат поддерживается."
			},
			SUBTITLES: {
				TITLE: 'Как добавить субтитры к видео?',
				TEXT: "Вы можете добавить субтитры к видео, нажав кнопку «Управление», которая находится на странице информации о видео. Вы можете перетащить туда файлы субтитров. "+
"Раньше вам приходилось вручную преобразовывать их в совместимый формат файла (WebVTT), мучаясь с перекодированием! Теперь приложение обрабатывает за вас весь рутинный процесс."
			},
			INVITE_USERS: {
				TITLE: 'Как я могу пригласить друзей посмотреть мои размещенные видео?',
				TEXT:"Вы можете поделиться своими видео с друзьями, предложив им просмотр на размещенном вами сайте с использованием Streama. Перейдите в меню «Пользователи» и нажмите «Пригласить пользователя». Заполните форму приглашения и "+
"выберите роль приглашенного пользователя. Пользователи с ролью Admin могут редактировать пункт «Пользователи и настройки». Пользователи с ролью Content Manager могут редактировать контент. Ваш друг будет извещен о" +
"приглашении по электронной почте. Вы также можете обмениваться видеосессиями с друзьями, нажав кнопку «Поделиться» видеопроигрывателя, связав URL-адрес сессии с ними."
			},
			BASE_URL: {
				TITLE: "Какой базовый URL-адрес Streama и как его настроить?",
				TEXT: "Базовый URL-адрес используется для воспроизведения видео и ссылки в приглашении по электронной почте."
			},
			NOTIFICATIONS: {
				TITLE: "Что такое уведомления?",
				TEXT: "Вы можете уведомить своих приглашенных друзей о новых загруженных видео, отправив им уведомления. Вы можете отправить их, добавляя в очередь уведомлений, нажав на кнопку "+
"«Добавить уведомлениe», которая находится на странице информации вашего видео, и перейти в меню «Уведомления», нажав кнопку «Отправить в очередь»."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "Имеет ли видеоплеер сочетания клавиш?",
				TEXT: "Да. Пауза/Воспроизведение: пробел. Управление звуком: клавиши со стрелками вверх и вниз. Промотать видео вперед/назад: клавиши со стрелками влево и вправо. Длинная промотка:" +
				" Клавиша Ctrl  + клавиши со стрелками влево и вправо. Выключение/выключение полноэкранного режима: Клавиши Alt + Enter. Включение/выключение субтитров: клавиша S(«Ы»), Приглушение звука: M(«Ь»), Вернуться" +
				" к предыдущему экрану: клавиши Delete или Backspace."
			},
			FAVORITE_GENRES: {
				TITLE: "Как любимые жанры пользователя влияют на потоки?",
				TEXT: "В процессе..."
			},
			USEFUL_LINKS: {
				TITLE: "Полезные ссылки",
				TEXT: "Тоже в процессе..."
			}
		}
	});
}]);
})();
(function(){
'use strict';
//= wrapped

//= require /systaro/core/systaro.core
//= require /streama/core/streama.core
//= require /streama/streama.translations

//= require_self


//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree domain
//= require_tree filters
//= require_tree templates

//= require streama.run
//= require streama.routes
//= require streama.interceptor

angular.module('streama', [
    'systaro.core',
    'streama.core',
    'streama.translations',
    'ui.router',
    'ui.bootstrap',
    'ngFileUpload',
    'ui.slider',
    'LocalStorageModule',
    'ui.select',
    'ngSanitize'
]);



angular.module('streama').config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/dash');
}]);




})();
'use strict';

angular.module('streama').factory('apiService', ["$http", "$rootScope", "contextPath", function ($http, $rootScope, contextPath) {
	return{
		currentUser: function () {
			return $http.get('user/current.json');
		},

		tvShow: {
			get: function (id) {
				return $http.get('tvShow/show.json', {params: {id: id}});
			},
			save: function (data) {
				return $http.post('tvShow/save.json', data);
			},
			delete: function (id) {
				return $http.delete('tvShow/delete.json', {params: {id: id}});
			},
			list: function (params) {
				return $http.get('tvShow.json', {params: params});
			},
			episodesForTvShow: function (id) {
				return $http.get('tvShow/episodesForTvShow.json', {params: {id: id}});
			},
			adminEpisodesForTvShow: function (id) {
				return $http.get('tvShow/adminEpisodesForTvShow.json', {params: {id: id}});
			},
			removeSeason: function (showId, season_number) {
				return $http.get('tvShow/removeSeason.json', {params: {showId: showId, season_number: season_number}});
			}
		},

		user: {
			save: function (data) {
				return $http.post('user/save.json', data);
			},
			delete: function (id) {
				return $http.delete('user/delete.json', {params: {id: id}});
			},
			list: function () {
				return $http.get('user.json');
			},
			checkAvailability: function (username, isInvite) {
				return $http.get('user/checkAvailability.json', {params: {username: username, isInvite: isInvite}});
			},
      saveAndCreateUser: function (user) {
        return $http.post('user/saveAndCreateUser.json', user);
      },
			saveAndInviteUser: function (user) {
				return $http.post('user/saveAndInviteUser.json', user);
			},
      saveProfile: function (user) {
				return $http.post('user/saveProfile.json', user);
			},
      availableRoles: function () {
				return $http.get('user/availableRoles.json');
			},
      changePassword: function (data) {
				return $http.post('user/changePassword.json', data);
			}
		},

    userActivity: {
      list: function (params) {
        return $http.get('userActivity.json', {params: params});
      }
    },

		tag:{
			save: function (data) {
				return $http.post('tag/save.json', data);
			},
			delete: function (id) {
				return $http.delete('tag/delete.json', {params: {id: id}});
			},
			list: function () {
				return $http.get('tag.json');
			}
		},

		video: {
			get: function (id) {
				return $http.get('video/show.json', {params: {id: id}});
			},
			save: function (data) {
				return $http.post('video/save.json', data);
			},
			delete: function (id) {
				return $http.delete('video/delete.json', {params: {id: id}});
			},
			list: function (params) {
				return $http.get('video.json', {params: params});
			},
			dash: function () {
				return $http.get('video/dash.json');
			},
			removeFile: function (videoId, fileId) {
				return $http.get('video/removeFile.json', {params: {videoId: videoId, fileId: fileId}});
			},
			listAllFiles: function (params) {
				return $http.get('file.json', {params: params});
			},
			removeFileFromDisk: function (id, path) {
				return $http.delete('file/removeFileFromDisk.json', {params: {id: id, path: path}});
			},
      removeMultipleFilesFromDisk: function(bulk) {
        return $http.delete('file/removeMultipleFilesFromDisk.json', {params: {id: bulk}});
      },
			cleanUpFiles: function (type) {
				return $http.delete('file/cleanUpFiles.json', {params: {type: type}});
			},
			addFile: function (videoId, fileId) {
				return $http.get('video/addFile.json', {params: {videoId: videoId, fileId: fileId}});
			},
			refetch: function (videoId) {
				return $http.get('video/refetch.json', {params: {videoId: videoId}});
			},
			addExternalUrl: function (params) {
				return $http.get('video/addExternalUrl.json', {params: params});
			},
      addLocalFile: function (params) {
        return $http.get('video/addLocalFile.json', {params: params});
      }
		},

    report: {
      list: function (params) {
        return $http.get('report.json', {params: params});
      },
      reportsById: function (videoId) {
        return $http.get('report/reportsById.json', {params: {videoId: videoId}});
      },
      save: function (videoId, errorCode) {
        return $http.put('report/save.json', {videoId: videoId, errorCode: errorCode});
      },
      resolve: function (reportId) {
        return $http.post('report/resolve.json', {reportId: reportId});
      },
      unresolve: function (reportId) {
        return $http.post('report/unresolve.json', {reportId: reportId});
      },
      resolveMultiple: function(bulk) {
        return $http.post('report/resolveMultiple.json', {ids: bulk});
      }
    },

    file: {
      localFiles: function(path) {
        return $http.get('file/localFiles.json', {params: {path: path}});
      },
			matchMetaDataFromFiles: function (files) {
				return $http.post('file/matchMetaDataFromFiles.json', {files: files});
			},
      bulkAddMediaFromFile: function (files) {
				return $http.post('file/bulkAddMediaFromFile.json', {files: files});
			},
      save: function(data) {
        return $http.post('file/save.json', data);
      },
      getURL: function (id) {
        return $http.get('file/getURL.json', {params: {id: id}});
      }
    },

		episode: {
			get: function (id) {
				return $http.get('episode/show.json', {params: {id: id}});
			},
			save: function (data) {
				return $http.post('episode/save.json', data);
			},
			delete: function (id) {
				return $http.delete('episode/delete.json', {params: {id: id}});
			},
			list: function (params) {
				return $http.get('episode.json', {params: params});
			}
		},

		movie: {
			get: function (id) {
				return $http.get('movie/show.json', {params: {id: id}});
			},
      getsimilar: function (id) {
        return $http.get('movie/getsimilar.json', {params: {id: id}});
      },
			save: function (data) {
				return $http.post('movie/save.json', data);
			},
			delete: function (id) {
				return $http.delete('movie/delete.json', {params: {id: id}});
			},
			list: function (params) {
				return $http.get('movie.json', {params: params});
			}
		},

		genericVideo: {
			get: function (id) {
				return $http.get('genericVideo/show.json', {params: {id: id}});
			},
			save: function (data) {
				return $http.post('genericVideo/save.json', data);
			},
			delete: function (id) {
				return $http.delete('genericVideo/delete.json', {params: {id: id}});
			},
			list: function () {
				return $http.get('genericVideo.json');
			}
		},

		viewingStatus: {
			save: function (params) {
				return $http.get('viewingStatus/save.json', {params: params});
			},
			markCompleted: function (viewingStatus) {
				return $http.get('viewingStatus/markCompleted.json', {params: {id: viewingStatus.id}});
			},
			delete: function (id) {
				return $http.delete('viewingStatus/delete.json', {params: {id: id}});
			}
		},

    watchlistEntry: {
      create: function (item) {
        return $http.post('watchlistEntry/create.json', {params: {id: item.id, mediaType: item.mediaType}});
      },
		  delete: function (item) {
        return $http.delete('watchlistEntry/delete.json', {params: {id: item.id, mediaType: item.mediaType}})
      },
      list: function (params) {
        return $http.get('watchlistEntry/list.json', {params: params});
      }
    },

		genres: {
			get: function (id) {
				return $http.get('genre/show.json', {params: {id: id}});
			},
			list: function () {
				return $http.get('genre.json');
			}
		},

    settings: {
			list: function () {
				return $http.get('settings.json');
			},
			updateMultiple: function (data) {
				return $http.post('settings/updateMultiple.json', data);
			},
      validateSettings: function (data) {
				return $http.post('settings/validateSettings.json', data);
			}
		},

		notification: {
			list: function () {
				return $http.get('notificationQueue/index.json');
			},
			listNewReleases: function () {
				return $http.get('notificationQueue/listNewReleases.json');
			},
			addMovieToCurrentNotification: function (movieId) {
				return $http.get('notificationQueue/addMovieToCurrentNotification.json', {params: {id: movieId}});
			},
			highlightOnDashboard: function (newRelease) {
				return $http.post('notificationQueue/highlightOnDashboard.json', newRelease);
			},
			addTvShowToCurrentNotification: function (tvShowId, text) {
				return $http.get('notificationQueue/addTvShowToCurrentNotification.json', {params: {id: tvShowId, description: text}});
			},
			sendCurrentNotifcation: function () {
				return $http.get('notificationQueue/sendCurrentNotifcations.json');
			},
			delete: function (id) {
				return $http.delete('notificationQueue/delete.json', {params: {id: id}});
			},
		},

		theMovieDb: {
      hasKey: function (params) {
        return $http.get('theMovieDb/hasKey.json');
      },
			search: function (type, name) {
				return $http.get('theMovieDb/search.json', {params: {type: type, name: name}});
			},
			seasonNumberForShow: function (params) {
				return $http.get('theMovieDb/seasonNumberForShow.json', {params: params});
			},
			seasonForShow: function (params) {
				return $http.get('theMovieDb/seasonForShow.json', {params: params});
			},
      availableGenres: function (params) {
				return $http.get('theMovieDb/availableGenres.json');
			},
			countNewEpisodesForSeason: function (params) {
				return $http.get('theMovieDb/countNewEpisodesForSeason', {params: params});
			},
      imagesForMedia: function (params) {
				return $http.get('theMovieDb/imagesForMedia', {params: params});
			},
      checkAndFixImageIntegrity: function (data) {
        return $http.post('theMovieDb/checkAndFixImageIntegrity.json', data);
      },
      pollImageIntegrityFix: function (data) {
        return $http.get('theMovieDb/pollImageIntegrityFix.json', data);
      }
		},

		dash: {
			searchMedia: function (query) {
				return $http.get('dash/searchMedia.json', {params: {query: query}});
			},

			listContinueWatching: function () {
				return $http.get('dash/listContinueWatching.json');
			},

			listMovies: function (params) {
				return $http.get('dash/listMovies.json', {params: params});
			},

			listShows: function (params) {
				return $http.get('dash/listShows.json', {params: params});
			},

			firstEpisodeForShow: function (id) {
				return $http.get('dash/firstEpisodeForShow.json', {params: {id: id}});
			},

			listGenres: function () {
				return $http.get('dash/listGenres.json');
			},

			listGenericVideos: function (params) {
				return $http.get('dash/listGenericVideos.json', {params: params});
			},

			listNewReleases: function () {
				return $http.get('dash/listNewReleases.json');
			},

			listRecommendations: function () {
				return $http.get('dash/listRecommendations.json');
			}
		},

		websocket: {
			triggerPlayerAction: function (params) {
				return $http.get('websocket/triggerPlayerAction.json', {params: params});
			}
		},

    profile: {
		  save: function (params) {
        return $http.post('profile/save',  params)
      },
		  update: function (params) {
        return $http.put('profile/update.json',  params)
      },
		  delete: function (id) {
        return $http.delete('profile/delete.json',  {params: {id: id}})
      },
      getUserProfiles: function () {
        return $http.get('profile/getUserProfiles.json')
      }
    }

	};
}]);

'use strict';

angular.module('streama').filter('padnumber', [function () {
	return function(input, length) {
		return pad(input, length);
	};

}]);


angular.module('streama').filter('secondsToDateTime', [function() {
	return function(seconds) {
		return new Date(1970, 0, 1).setSeconds(seconds);
	};
}]);

// <span ng-if="videoDuration >= 3600">{{videoDuration | secondsToDateTime | date:'hh:mm:ss'}}</span>
// <span ng-if="videoDuration < 3600">{{videoDuration | secondsToDateTime | date:'mm:ss'}}</span>

angular.module('streama').filter('secondsToTimeDisplay', ['$filter', function($filter) {
	return function(seconds) {
    var date = new Date(1970, 0, 1).setSeconds(seconds);
    var format = seconds  >= 3600 ? 'hh:mm:ss' : 'mm:ss';
    var result = $filter('date')(date, format);
    return result;
	};
}]);

angular.module('streama').filter('trustResourceUrl', ['$sce', function($sce) {
	return function(input) {
		return $sce.trustAsResourceUrl(input);
	};
}]);

angular.module('streama').filter('trustHtml', ['$sce', function($sce) {
	return function(input) {
		return $sce.trustAsHtml(input);
	};
}]);


function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

angular.module('streama').filter('propsFilter', function() {
	return function(items, props) {
		var out = [];

		if (angular.isArray(items)) {
			var keys = Object.keys(props);

			items.forEach(function(item) {
				var itemMatches = false;

				for (var i = 0; i < keys.length; i++) {
					var prop = keys[i];
					var text = props[prop].toLowerCase();
					if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
						itemMatches = true;
						break;
					}
				}

				if (itemMatches) {
					out.push(item);
				}
			});
		} else {
			// Let the output be the input untouched
			out = items;
		}

		return out;
	};
});



/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function(min, max) {
	return Math.min(Math.max(this, min), max);
};

'use strict';

angular.module('streama').factory('mediaListService', function () {
  var LIST_MAX;

  return{
    init: function (endpoint, defaultSort, currentUser) {
      LIST_MAX = _.get(currentUser, 'amountOfMediaEntries', 30);
      var mediaListConfig = {
        total: 0,
        currentSort: defaultSort || {sort: 'title', order: 'ASC'},
        list: [],
        currentOffset: 0,
        isLoading: true,
        sorter: _.getterSetter(setSort, getSort),
        setFilter: setFilter,
        filter: {
          tags: null,
          genre: [],
          title: null
        },
        fetch: endpoint,
        search: search,
        loadMore: loadMore
      };

      fetchData(mediaListConfig);

      return mediaListConfig;


      function setFilter() {
        fetchData(mediaListConfig);
      }

      function search() {
        fetchData(mediaListConfig);
      }

      function getSort() {
        return mediaListConfig.currentSort;
      }

      function setSort(sort) {
        mediaListConfig.currentSort = sort;
        mediaListConfig.currentOffset = 0;
        fetchData(mediaListConfig);
      }

      function loadMore() {
        mediaListConfig.currentOffset += LIST_MAX;
        fetchData(mediaListConfig);
      }
    }
  };


  function fetchData(mediaConfig) {
    var params = {
      max: LIST_MAX,
      offset: mediaConfig.currentOffset,
      sort: mediaConfig.currentSort.sort,
      order: mediaConfig.currentSort.order
    };
    angular.extend(params, mediaConfig.filter);

    mediaConfig.fetch(params).then(function (response) {
      var data = response.data;
      mediaConfig.total = data.total;
      if(mediaConfig.currentOffset > 0){
        mediaConfig.list = _.unionBy(mediaConfig.list, data.list, 'id');
      }else{
        mediaConfig.list = data.list;
      }
      mediaConfig.isLoading = false;
    });
  }

});

(function(){
'use strict';
//= wrapped

angular.module('streama')
	.factory('modalService', modalService);

function modalService($uibModal, $state) {
	return {
		tvShowModal: tvShowModal,
		notificationAddModal: notificationAddModal,
		movieModal: movieModal,
		genericVideoModal: genericVideoModal,
		videoModal: videoModal,
		openFileBrowser: openFileBrowser,
		openUserEditModal: openUserEditModal,
		userCreateModal: userCreateModal,
		userInviteModal: userInviteModal,
		fileManagerModal: fileManagerModal,
		newReleaseModal: newReleaseModal,
		mediaDetailModal: mediaDetailModal,
		openPlaybackOptions: openPlaybackOptions,
		createFromFilesModal: createFromFilesModal,
    openImageChooser: openImageChooser
	};

	function tvShowModal (tvShow, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--tvShow.htm',
			controller: 'modalTvShowCtrl',
			size: 'lg',
			resolve: {
				tvShow: function () {
					return tvShow;
				}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

	function notificationAddModal (notification, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--notification-add.htm',
			controller: 'modalNotificationAddCtrl',
			size: 'lg',
			resolve: {
				notification: function () {
					return notification;
				}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

	function movieModal (movie, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--movie.htm',
			controller: 'modalMovieCtrl',
			size: 'lg',
			resolve: {
				movie: function () {
					return movie;
				}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

	function genericVideoModal (video, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--genericVideo.htm',
			controller: 'modalGenericVideoCtrl',
			size: 'lg',
			resolve: {
				video: function () {
					return video;
				}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

	function videoModal (video, isManual, tvShow, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--video.htm',
			controller: 'modalVideoCtrl',
			size: 'lg',
			resolve: {
				isManual: function () {
					return isManual;
				},
				video: function () {
					return video;
				},
				tvShow: function () {
					return tvShow;
				}
			}
		});

		modalInstance.result.then(function (data) {
			console.log('%c modal close', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', arguments);
			(callback || angular.noop)(data);
		});
	}

	function openFileBrowser (callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--file-browser.htm',
			controller: 'modalFileBrowserCtrl',
			size: 'lg'
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

	function openUserEditModal (user, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--edit-user.htm',
			controller: 'modalUserCtrl',
			size: 'lg',
			resolve: {
				user: function () {
					return user;
				},
				isInvite: function () {
					return true;
				}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

	function userCreateModal (user, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--create-user.htm',
			controller: 'modalUserCtrl',
			size: 'lg',
			resolve: {
				user: function () {
					return user;
				},
				isInvite: function () {
					return false;
				}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

	function userInviteModal (user, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--invite-user.htm',
			controller: 'modalUserCtrl',
			size: 'lg',
			resolve: {
				user: function () {
					return user;
				},
				isInvite: function () {
					return true;
				}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

	function fileManagerModal (video, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--manage-files.htm',
			controller: 'modalFileCtrl',
			size: 'lg',
			backdrop: 'static',
			keyboard: false,
			resolve: {
				video: function () {
					return video;
				}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

	function newReleaseModal (media, type, episodes, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--new-release.htm',
			controller: 'modalNewReleaseCtrl',
			resolve: {
				media: function () {return media;},
				type: function () {return type;},
				episodes: function () {return episodes;}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

    /**
     * opens mediaDetail Modal with Trailer, Genre, Description, Poster etc
     * @param config
     * 				config.mediaId    						Integer				The id of the media, will be queried from REST endpoint. Requires mediaType
     * 				config.mediaType    					String				The name of the mediaType, can be one of TvShow|Movie|GenericVideo. Requires mediaId
     * 				config.isEditButtonHidden    	Boolean				Determines, whether the edit-Button should be hidden or not
     * 			  config.mediaObject	          Object        The media object
     * 			  config.isApiMovie             Boolean       Determines, if the movie is api-based or if it exists locally
     * @param callback
     */
		function mediaDetailModal (config, callback) {
			$state.go($state.current.name, {isApiMovie: config.isApiMovie, isEditButtonHidden: true, mediaModal: config.mediaId, mediaType: config.mediaType});

			var modalInstance = $uibModal.open({
				templateUrl: '/streama/modal--media-detail.htm',
				controller: 'modalMediaDetailCtrl',
				size: 'lg',
				resolve: {
					config: function () {
						return config;
					}
				}
			});

			modalInstance.result.then(function (data) {
				//$state.go('dash', {mediaModal: null, mediaType: null});
				(callback || angular.noop)(data);
			}, function () {
				//$state.go('dash', {mediaModal: null, mediaType: null});
			});
		}


	function createFromFilesModal(mediaType) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--create-from-file.htm',
			controller: 'modalCreateFromFileCtrl as vm',
			size: 'lg',
			backdrop: 'static',
			keyboard: false,
			resolve: {
				dialogOptions: function () {
					return {
						mediaType: mediaType
					};
				}
			}
		});

		return modalInstance.result;
	}

	function openImageChooser(mediaType, media) {
    var modalInstance = $uibModal.open({
      templateUrl: '/streama/modal--image-chooser.htm',
      controller: 'imageChooserModalCtrl as vm',
      size: 'lg',
      resolve: {
        dialogOptions: function () {
          return {
            mediaType: mediaType,
            media: media
          };
        }
      }
    });

    return modalInstance.result;
  }
  
  function openPlaybackOptions(playerOptions) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--playback-options.htm',
			controller: 'playbackOptionsModalCtrl as vm',
			size: 'lg',
			resolve: {
				dialogOptions: function () {
					return {
						playerOptions: playerOptions
					};
				}
			}
		});

		return modalInstance.result;
	}
}
modalService.$inject = ["$uibModal", "$state"];
})();
'use strict';

angular.module('streama').factory('playerService',
  ["$stateParams", "$sce", "$state", "$rootScope", "socketService", "apiService", "$interval", "$filter", "contextPath", "$uibModal", function ($stateParams, $sce, $state, $rootScope, socketService, apiService, $interval, $filter, contextPath, $uibModal) {

    var videoData = null;
    var videoOptions;
    var defaultVideoOptions = {
      customStartingTime: 0,
      rememberVolumeSetting: true,
      videoMetaTitle: '',
      videoMetaSubtitle: '',
      videoMetaDescription: '',
      videoSrc: '',
      videoType: '',
      videoTrack: '',
      subtitleSize: 'md',
      videoOverlayEnabled: true,
      showEpisodeBrowser: false,
      showNextButton: false,
      showSocketSession: true,
      showDownloadButton: false,
      isAutoplayNextActive: false,
      episodeList: [],
      selectedEpisodes: [],
      currentEpisode: {},
      nextVideo: {},
      outro_start: null,
      subtitles: [],
      videoFiles: [],
      onSocketSessionCreate: angular.noop,
      onTimeChange: angular.noop,
      onError: angular.noop,
      onPlay: angular.noop,
      onPause: angular.noop,
      onClose: angular.noop,
      onNext: angular.noop,
      onVideoClick: angular.noop,
      onEditVideo: angular.noop
    };

    return {
      getVideoOptions: function()
      {
        return videoOptions;
      },
      setVideoOptions: function (video, settings) {
        videoOptions = angular.copy(defaultVideoOptions);
        videoData = video;
        videoOptions.videoSrc = $sce.trustAsResourceUrl(video.defaultVideoFile.src || video.defaultVideoFile.externalLink);
        videoOptions.originalFilename = video.defaultVideoFile.originalFilename;
        videoOptions.videoType = video.defaultVideoFile.contentType;
        videoOptions.selectedVideoFile = video.defaultVideoFile;
        videoOptions.showDownloadButton = $rootScope.isDownloadButtonVisible;

        if(video.videoFiles && video.videoFiles.length){
          videoOptions.videoFiles = video.videoFiles;
        }

        if(video.subtitles && video.subtitles.length){
          videoOptions.subtitles = video.subtitles;
        }

        videoOptions.isExternalLink = video.files[0].externalLink;
        videoOptions.videoMetaTitle = (video.show ? video.show.name : video.title);
        videoOptions.videoMetaSubtitle = (video.show ? video.episodeString + ' - ' + video.name : (video.release_date ? video.release_date.substring(0, 4) : ''));
        videoOptions.videoMetaDescription = video.overview;

        videoOptions.nextVideo = videoData.nextEpisode || videoData.nextVideo;
        videoOptions.isAutoplayNextActive = !!videoData.nextEpisode;
        videoOptions.outro_start = videoData.outro_start;

        if(videoOptions.nextVideo){
          videoOptions.showNextButton = true;
        }

        if(videoData.show){
          videoOptions.showEpisodeBrowser = true;

          apiService.tvShow.episodesForTvShow(videoData.show.id).then(function (response) {
            var episodes = response.data;
            videoOptions.episodeList = _.groupBy(episodes, 'season_number');
            videoOptions.selectedEpisodes = videoOptions.episodeList[videoData.season_number];
            videoOptions.currentEpisode = {
              episode: videoData.episode_number,
              season: videoData.season_number,
              intro_start: videoData.intro_start,
              intro_end: videoData.intro_end
            };
          });
        }

        if($stateParams.currentTime){
          videoOptions.customStartingTime = $stateParams.currentTime;
        }
        else if(video.viewedStatus){
          videoOptions.customStartingTime = video.viewedStatus.currentPlayTime;
        }else{
          videoOptions.customStartingTime = 0;
        }

        videoOptions.onPlay = this.onVideoPlay.bind(videoOptions);
        videoOptions.onPause = this.onVideoPause.bind(videoOptions);
        videoOptions.onError = this.onVideoError.bind(videoOptions);
        videoOptions.onTimeChange = this.onVideoTimeChange.bind(videoOptions);
        videoOptions.onClose = this.onVideoClose.bind(videoOptions);
        videoOptions.onNext = this.onNext.bind(videoOptions);
        videoOptions.onVideoClick = this.onVideoClick.bind(videoOptions);
        videoOptions.onSocketSessionCreate = this.onSocketSessionCreate.bind(videoOptions);
        videoOptions.onEditVideo = this.onEditVideo.bind(videoData, videoOptions);

        return videoOptions;
      },

      viewingStatusSaveInterval: null,

      onVideoPlay: function (videoElement, socketData) {
        var that = this;
        console.log('%c onVideoPlay', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');

        that.viewingStatusSaveInterval = $interval(function() {
          var params = {videoId: videoData.id, currentTime: videoElement.currentTime, runtime: videoElement.duration};

          if(params.runtime && params.videoId){
            apiService.viewingStatus.save(params);
          }
        }, 5000);


        if($stateParams.sessionId && !socketData){
          console.log('%c send socket event PLAY', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
          apiService.websocket.triggerPlayerAction({socketSessionId: $stateParams.sessionId, playerAction: 'play', currentPlayerTime: videoElement.currentTime});
        }
      },

      onVideoPause: function (videoElement, socketData) {
        console.log('%c onVideoPause', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', socketData);
        var that = this;
        $interval.cancel(that.viewingStatusSaveInterval);

        if($stateParams.sessionId && socketData){
          if(videoElement.currentTime+1.5 > socketData.currentPlayerTime || videoElement.currentTime-1.5 < socketData.currentPlayerTime){
            videoElement.currentTime = socketData.currentPlayerTime;
          }
        }


        if($stateParams.sessionId && !socketData){
          console.log('%c send socket event PAUSE', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
          apiService.websocket.triggerPlayerAction({socketSessionId: $stateParams.sessionId, playerAction: 'pause', currentPlayerTime: videoElement.currentTime});
        }
      },

      onVideoClose: function () {
        console.log('%c onVideoClose', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
        var that = this;
        $state.go('dash', {});
      },


      onVideoError: function (errorCode) {
        if ($state.current.name !== 'player') {
          return;
        }
        console.log('onVideoError');
        errorCode = errorCode || 'CODEC_PROBLEM';
        var modalInstance = $uibModal.open({
        templateUrl: '/streama/modal--error-report.htm',
        controller: 'modalErrorReportCtrl',
        controllerAs: 'vm',
        size: 'lg',
        backdrop: 'static',
        resolve: {
          errorCode: function () {
            return errorCode;
          },
          videoData: function () {
            return videoData;
          }
        }

      });

      modalInstance.result.then(function (data) {
        // (callback || angular.noop)(data);
      });
    },

      // onVideoError: function (errorCode) {
      //   var that = this;
		//   		errorCode = errorCode || 'CODEC_PROBLEM';
      //   console.log('%c onVideoError', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
      //
      //
      //   if($state.current.name == 'player'){
      //     alertify.alert($filter('translate')('MESSAGES.' + errorCode), function () {
      //       if($rootScope.currentUser.authorities.length){
      //         if(videoData.show){
      //           $state.go('admin.show', {showId: videoData.show.id});
      //         }else{
      //           $state.go('admin.movie', {movieId: videoData.id});
      //         }
      //       }else{
      //         $state.go('dash', {});
      //       }
      //
      //     });
      //   }
      // },

      onVideoTimeChange: function (slider, duration) {
        var params = {videoId: videoData.id, currentTime: slider.value, runtime: duration};
        apiService.viewingStatus.save(params);


        if($stateParams.sessionId){
          apiService.websocket.triggerPlayerAction({socketSessionId: $stateParams.sessionId, playerAction: 'timeChange', currentPlayerTime: slider.value});
        }
      },

      onSocketSessionCreate: function () {
        alertify.set({ buttonReverse: true, labels: {ok: "OK", cancel : "Cancel"}});
        alertify.confirm($filter('translate')('MESSAGES.SHARE_SOCKET'), function (confirmed) {
          if(confirmed){
            $stateParams.sessionId = socketService.getUUID();
            $state.go($state.current, $stateParams, {reload: true});
          }
        });
      },

      onEditVideo: function () {
        if(videoData.show){
          $state.go('admin.show', {showId: videoData.show.id, episodeId: videoData.id, season: videoData.season_number});
        }else{
          $state.go('admin.movie', {movieId: videoData.id});
        }
      },

      handleMissingFileError: function (video) {
        var hasError = false;

        if(!video.files || !video.files.length){
          hasError = true;
          alertify.alert($filter('translate')('MESSAGES.FILE_MISSING'), function () {
            if($rootScope.currentUser.authorities.length){
              if(video.show){
                $state.go('admin.show', {showId: video.show.id});
              }else{
                $state.go('admin.movie', {movieId: video.id});
              }
            }else{
              $state.go('dash', {});
            }

          });
        }

        return hasError;
      },

      handleWrongBasepathError: function (video) {
        var hasError = false;
        var videoSource = video.files[0].src;
        var externalLink = video.files[0].externalLink;
        var basePath = location.origin + contextPath;

        if(videoSource && videoSource.indexOf(basePath) == -1 && !externalLink){
          hasError = true;
          alertify.alert($filter('translate')('MESSAGES.WRONG_BASEPATH', {basePath: basePath}), function () {
            if(_.find($rootScope.currentUser.authorities, {authority: "ROLE_ADMIN"})){
              $state.go('settings.settings');
            }else{
              $state.go('dash', {});
            }

          });
        }
        return hasError;
      },

      registerSocketListener: function () {
        if($stateParams.sessionId){
          socketService.registerPlayerSessonListener($stateParams.sessionId);
        }
      },

      destroyPlayer: function () {
        console.log('%c $stateChangeSuccess', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
        var that = this;
        $interval.cancel(that.viewingStatusSaveInterval);
        socketService.unsubscribe();
      },

      handleSocketEvent: function (data) {
        if(data.browserSocketUUID != socketService.browserSocketUUID){
          console.log('%c handleSocketEvent', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
          switch (data.playerAction){
            case 'play':
              $rootScope.$broadcast('triggerVideoPlay', data);
              break;
            case 'pause':
              $rootScope.$broadcast('triggerVideoPause', data);
              break;
            case 'timeChange':
              $rootScope.$broadcast('triggerVideoTimeChange', data);
              break;
          }
        }
      },


      onNext: function () {
        if(typeof videoData.nextEpisode !== 'undefined'){
          $state.go('player', {videoId: videoData.nextEpisode.id});
        }else if(typeof  videoData.nextVideo !== 'undefined'){
          $state.go('player', {videoId: videoData.nextVideo.id});
        }
      },


      onVideoClick: function () {
        if($rootScope.currentUser.pauseVideoOnClick){
          $rootScope.$broadcast('triggerVideoToggle');
        }
      }
    };
}]);

'use strict';

angular.module('streama').factory('profileService', ["localStorageService", "apiService", "$state", "$rootScope", "$translate", function (localStorageService, apiService, $state, $rootScope, $translate) {

  function setCurrentProfile(profile) {
    localStorageService.set('currentProfile', profile);
    $rootScope.currentProfile = profile;
    $state.go('dash', {}, {reload: true});
    $translate.use(_.get($rootScope, 'currentProfile.profileLanguage') || _.get($rootScope, 'currentUser.language') || 'en');
  }

  function getCurrentProfile() {
      return localStorageService.get('currentProfile') || null;
  }

  function getUserProfiles() {
    return apiService.profile.getUserProfiles();
  }

  return {
    setCurrentProfile: setCurrentProfile,
    getCurrentProfile: getCurrentProfile,
    getUserProfiles: getUserProfiles
  };

}]);

'use strict';

angular.module('streama').factory('socketService', ["$rootScope", "contextPath", "$timeout", function ($rootScope, contextPath, $timeout) {



  return {
    subscription: null,
    browserSocketUUID: null,

    getUUID: function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    },

    registerPlayerSessonListener: function (projectSessionId) {
      var that = this;

      var urlBase = contextPath;

      var socket = new SockJS(urlBase + 'stomp');
      var client = Stomp.over(socket);


      client.connect({}, function() {
        that.subscription = client.subscribe("/topic/playerSession/" + projectSessionId, function(data) {
          $rootScope.$broadcast('playerSession', JSON.parse(data.body.toString()));
        });
      });

      this.browserSocketUUID = this.getUUID();
      $rootScope.browserSocketUUID = this.browserSocketUUID;
    },

    unsubscribe: function () {
      if(this.subscription){
        this.subscription.unsubscribe();
        this.browserSocketUUID = null;
        $rootScope.browserSocketUUID = null;
      }
    }
  }
}]);

'use strict';

angular.module('streama').factory('uploadService', ["$http", "Upload", "contextPath", function ($http, Upload, contextPath) {
	return {
		doUpload: function (uploadStatus, endpoint, callback, errCallback, files) {
			if (files && files.length) {
				for (var i = 0; i < files.length; i++) {
					var file = files[i];

					Upload.upload({
						url: contextPath + endpoint,
						sendObjectsAsJsonBlob: true,
						file: file
					})

						.progress(function (evt) {
							var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
							uploadStatus.percentage = progressPercentage;
						})

						.success(callback || angular.noop)
						.error(function (err) {
              console.log('%c err', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', arguments);
              alertify.error("File upload failed. Please close this popup and try again.", 0);
              uploadStatus.percentage = null;
              (errCallback || angular.noop)(err);
            });

				}
			}
		}
	};
}]);

'use strict';

angular.module('streama').factory('userService', ["$rootScope", "$translate", function ($rootScope, $translate) {
	return {
		setCurrentUser: function (data) {
			$rootScope.currentUser = data;
		}
	};
}]);

'use strict';

angular.module('streama').controller('adminCtrl', ['$scope', 'apiService', 'modalService', '$rootScope', function ($scope, apiService, modalService, $rootScope) {

}]);







angular.module('streama').controller('adminFileManagerCtrl', ['$scope', 'apiService', 'modalService', '$state', function ($scope, apiService, modalService, $state) {


	$scope.maxPerPage = 10;
	$scope.offset = 0;
	$scope.pagination = {};

	$scope.activeListDisplay = 'table';

	$scope.selectedFiles = [];

	$scope.changeListDisplay = function (displayType) {
		$scope.activeListDisplay = displayType;
	};

	$scope.removeFile = function(file){
		var confirmText;
		if(file.isHardDriveFile){
			confirmText = 'This file is not associated with any object in the database and is therefore a sort of artifact. Do you want to remove it now?';
		}
		else if(file.videos && file.videos.length){
			confirmText = 'This file is associated with '+file.videos[0].title+'. Do you want to remove this File from the hard drive?';
		}else {
			confirmText = 'This file is not associated with any Video. Do you want to remove this File from the hard drive?';
		}
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm(confirmText, function (confirmed) {
			if(confirmed){
				apiService.video.removeFileFromDisk(file.id, file.path).then(function () {
					_.remove($scope.files, {id: file.id});
					_.remove($scope.files, {path: file.path});
          alertify.success('File deleted.');
				}, function (err) {
					console.log(err);
					alertify.error('An error occured. ' + err.data);
				});
			}
		})
	};

	$scope.removeMultipleFiles = function() {
	  if($scope.selectedFiles.length > 0) {
      var confirmText = "This will delete all selected Files. Do you want to proceed?";
      alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
      alertify.confirm(confirmText, function (confirmed) {
        if(confirmed){
          apiService.video.removeMultipleFilesFromDisk($scope.selectedFiles).then(function (response) {
						var data = response.data;
            _.forEach(data.successes, function (id) {
								// TODO investigate why {id: id} doesn't work
								_.remove($scope.files, function(file) {
									return file.id === id;
								});
						});
            selectedFiles = [];
            alertify.success(data.successes.length + ' of ' + $scope.selectedFiles.length + ' files deleted.');
          }, function (response) {
						alertify.error(data.successes.length + ' of ' + $scope.selectedFiles.length + ' files could be deleted. (this could be due to them being associated with the file-browser or an externalLink)');
					});
        }
      });
	  }
	};

	$scope.addOrRemoveFromSelection = function($event, file) {
	  if($event.target.checked) {
      $scope.selectedFiles.push(file.id);
    } else {
      _.remove($scope.selectedFiles, function(id) {
        return id === file.id;
      });
    }
	};

	$scope.pageChanged = function () {
		var newOffset = $scope.maxPerPage*($scope.pagination.currentPage-1);
		loadFiles({max: $scope.maxPerPage, filter: $scope.listFilter, offset: newOffset});
	};


	$scope.refreshList = function (filter) {
		$scope.listFilter = filter;
		loadFiles({max: $scope.maxPerPage, filter: filter, offset: $scope.offset});
	};


	var loadFiles = function (params) {
		$scope.loading = true;
		$scope.files = [];
		$scope.filesCount = 0;
		apiService.video.listAllFiles(params).then(function (response) {
				var data = response.data;
			  console.log(data);
				$scope.loading = false;
				$scope.files = data.files;
				$scope.filesCount = data.count;
			}, function () {
				alertify.error('An error occurred.');
			});
	};


	$scope.cleanUpFiles = function(type){
		var message;
		if(type == 'noVideos'){
			message = 'Are you sure you want to proceed? This will delete all file-objects that are missing the corresponding file in the file-system';
		}else if(type == 'noFile'){
			message = 'Are you sure you want to proceed? This will delete all non-associated files from the harddrive';
		}
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm(message, function (confirmed) {
			if(confirmed){
				$scope.loading = true;
				apiService.video.cleanUpFiles(type).then(function () {
					$scope.refreshList('all');
				});
			}
		})
	};



	//Initial Load
	$scope.refreshList('all');
}]);



angular.module('streama').controller('adminMovieCtrl', [
	'$scope', 'apiService', '$stateParams', 'modalService', '$state', 'uploadService',
	function ($scope, apiService, $stateParams, modalService, $state, uploadService) {
    $scope.loading = true;
    $scope.LoadingSimilar = true;
    apiService.movie.get($stateParams.movieId).then(function (response) {
      var data = response.data;
      $scope.movie = data;
      $scope.reportsForMovie();
      $scope.loading = false;
			$scope.highlightOnDashboard = modalService.newReleaseModal.bind(modalService, $scope.movie,'movie');
      if($scope.movie.hasOwnProperty('apiId')){//if the data came from moviedb
        $scope.loadsimilar();
      }
      else{
        $scope.LoadingSimilar = false;
      }
    });

		$scope.reportsForMovie= function () {
      apiService.report.reportsById($stateParams.movieId).then(function (response) {
        $scope.movie.reportCount = response.data.reportCount;
      });
    };


    $scope.loadsimilar= function () {
      apiService.movie.getsimilar($stateParams.movieId).then(function (response) {
        $scope.LoadingSimilar = false;
        $scope.movie.similarMovies = response.data;
      });
    };

    $scope.showDetails = function (media) {
      $scope.media = media;
      modalService.mediaDetailModal({isEditButtonHidden: true,mediaId: media.id, mediaType: media.mediaType, mediaObject: media, isApiMovie: true});
    };


    $scope.openMovieModal = function () {
      modalService.movieModal($scope.movie, function (data) {
        angular.merge($scope.movie, data);
      });
    };

		$scope.delete = function(){
      alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
			alertify.confirm("Are you sure you want to delete this Movie?", function (confirmed) {
				if(confirmed){
					apiService.movie.delete($stateParams.movieId).then(function () {
						$state.go('admin.movies');
					});
				}
			})
		};

		$scope.addToCurrentNotification = function(){
			apiService.notification.addMovieToCurrentNotification($stateParams.movieId).then(function () {
        alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "No"}});
        alertify.confirm('The movie was added to the current notification queue. Would you like to send it?', function (send) {
          if(send){
            apiService.notification.sendCurrentNotifcation();
            alertify.success('Notification sent.');
          }
          else{
            alertify.success('The movie was added to the current notification queue.');
          }
        })
			});
		};


		$scope.deleteMovie = function(movie){
			alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
			alertify.confirm("Are you sure, you want to delete this Movie?", function (confirmed) {
				if(confirmed){
					apiService.movie.delete(movie.id).then(function () {
						$state.go('admin.movies');
						$uibModalInstance.dismiss('cancel');
					});
				}
			})
		};

    $scope.manageFiles = function(movie){
      modalService.fileManagerModal(movie, function (data) {
				movie.hasFiles = !!movie.files.length;
			});
    };


		$scope.addSimilarMovieToStreama = function(movie, redirect){
      alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
			alertify.confirm("Do you want to add \""+ movie.title +"\" to the Streama library?", function (confirmed) {
				if(confirmed){

          var apiId = movie.id;
          delete movie.id;
          movie.apiId = apiId;

          apiService.movie.save(movie).then(function (response) {
						if(redirect){
							$state.go('admin.movie', {movieId: response.data.id});
						}
          });
				}
			})
		};

		$scope.uploadStatus = {};

		$scope.upload = uploadService.doUpload.bind(uploadService, $scope.uploadStatus, 'video/uploadFile.json?id=' + $stateParams.movieId, function (data) {
			$scope.uploadStatus.percentage = null;

			if(data.error) return

			$scope.movie.files = $scope.movie.files || [];
			$scope.movie.files.push(data);
		}, function () {});





}]);



angular.module('streama').controller('adminMoviesCtrl', [
  'apiService', 'modalService', '$state', 'mediaListService',
  function (apiService, modalService, $state, mediaListService) {
  var vm = this;

  vm.hasMovieDBKey = true;
  vm.searchText = "Search Movie from collection or TheMovieDB...";

  vm.createFromFiles = createFromFiles;
  vm.openMovieModal = openMovieModal;
  vm.doSearch = doSearch;
  vm.alreadyAdded = alreadyAdded;
  vm.addFromSuggested = addFromSuggested;

  init();

  function init() {
    vm.movie = mediaListService.init(apiService.movie.list);
    apiService.theMovieDb.hasKey().then(function (data) {
      if (!data.data.key) {
        vm.hasMovieDBKey = false;
        vm.searchText = "Search Movie from collection...";
      }
    });
  }


  function openMovieModal() {
    modalService.movieModal(null, function (data) {
      $state.go('admin.movie', {movieId: data.id});
    });
  }

  function doSearch(query) {
    vm.movie.search();
    if (vm.hasMovieDBKey) {
      return apiService.theMovieDb.search('movie', query).then(function (data) {
        vm.suggestedMovies = data.data;
      });
    }
  }

  function addFromSuggested(movie, redirect) {
    var tempMovie = angular.copy(movie);
    var apiId = tempMovie.id;
    delete tempMovie.id;
    tempMovie.apiId = apiId;

    apiService.movie.save(tempMovie).then(function (response) {
      if(redirect){
        $state.go('admin.movie', {movieId: response.data.id});
      }else{
        vm.movie.list.push(response.data);
      }
    });
  }

  function alreadyAdded(movie) {
    console.log('%c movie', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', movie);
    return movie.id && _.find(vm.movie.list, {apiId: movie.id.toString()});
  }


  function createFromFiles() {
    modalService.createFromFilesModal('movie').then(function (data) {
      apiService.movie.list().then(function (response) {
        angular.extend(vm.movie.list, response.data);
      });
    });
  }

}]);



angular.module('streama').controller('adminNewReleasesCtrl', ['$scope', 'apiService', 'modalService', '$state', function ($scope, apiService, modalService, $state) {

	$scope.loading = true;

	apiService.notification.listNewReleases().then(function (data) {
		$scope.notifications = data.data;
		$scope.loading = false;
	});


	$scope.delete = function (notification) {
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm('Are you sure you want to delete this highlight?', function (confirmed) {
			if(confirmed){
				apiService.notification.delete(notification.id).then(function (data) {
					_.remove($scope.notifications, {id: notification.id})
				});
			}
		})
	};

}]);



angular.module('streama').controller('adminNotificationsCtrl', ['$scope', 'apiService', 'modalService', '$state', function ($scope, apiService, modalService, $state) {

	$scope.loading = true;

	$scope.openNotificationModal = openNotificationModal;



   apiService.notification.list().then(function (data) {
    	$scope.notifications = data.data;
    	$scope.loading = false;
   });

	$scope.sendCurrentNotifcation = function () {
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm("Are you sure you want to send all of the open Notifications in the queue?", function (confirmed) {
			if(confirmed){
				apiService.notification.sendCurrentNotifcation()
					.then(function () {
						_.forEach($scope.notifications, function (notification) {
							notification.isCompleted = true;
						});

						alertify.success('The notification was sent for ' + $scope.openNotificationAmount() + ' entries.');
					}, function (err) {
						alertify.error('There were no open notifications to send.');
					});
			}
		})
	};

	function openNotificationModal() {
	    modalService.notificationAddModal({}, function (data) {
	        console.log(data);
	        $scope.notifications.push(data);
      });
	};

	$scope.openNotificationAmount = function () {
		console.log('%c open', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;',_.filter($scope.notifications, 'isCompleted') );
		return _.reject($scope.notifications, 'isCompleted').length;
	};

	$scope.openMovieModal = function () {
		modalService.movieModal(null, function (data) {
			$state.go('admin.movie', {movieId: data.id});
		});
	}

	$scope.delete = function (notification) {
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm('Are you sure you want to delete this notification?', function (confirmed) {
			if(confirmed){
				apiService.notification.delete(notification.id).then(function (data) {
					_.remove($scope.notifications, {id: notification.id})
				});
			}
		})
	};

}]);

(function(){
'use strict';
//= wrapped

angular.module('streama').controller('adminReportsCtrl', [
  'apiService', '$state', '$rootScope', '$filter', function (apiService, $state, $rootScope, $filter) {
    var vm = this;
    var selectedReports = [];

    vm.isResolvedFilter = 'all';
    vm.maxPerPage = 15;
    vm.pagination = {};
    vm.sortAndOrderBy = {
      sort: 'dateCreated',
      order: 'DESC'
    };

    var currentOffset = 0;

    vm.resolveMultiple = resolveMultiple;
    vm.resolve = resolve;
    vm.unresolve = unresolve;
    vm.pageChanged = pageChanged;
    vm.refreshList = refreshList;
    vm.addOrRemoveFromSelection = addOrRemoveFromSelection;

    function pageChanged () {

      currentOffset = vm.maxPerPage*(vm.pagination.currentPage-1);
      loadReports({max: vm.maxPerPage, filter: vm.listFilter, offset: currentOffset, sort: vm.sortAndOrderBy.sort, order: vm.sortAndOrderBy.order});
    }

    function refreshList (isResolved) {
      if (isResolved) {
        vm.isResolvedFilter = isResolved;
        vm.pagination.currentPage = 1;
        currentOffset = 0;
      }
      loadReports({max: vm.maxPerPage, resolved: vm.isResolvedFilter, offset: currentOffset, sort: vm.sortAndOrderBy.sort, order: vm.sortAndOrderBy.order});
    }

    function loadReports (params) {
      vm.reports = [];
      vm.reportsCount = 0;
      apiService.report.list(params)
        .then(function (response) {
          vm.reports = response.data.reports;
          vm.reportsCount = response.data.count;
        }, function () {
          alertify.error('An error occurred.');
        });
    }

    function addOrRemoveFromSelection($event, report) {
      if($event.target.checked && report.resolved === false) {
        selectedReports.push(report.id);
      } else {
        _.remove(selectedReports, function(id) {
          return id === report.id;
        });
      }
    }

    function resolve(oldReport) {
      apiService.report.resolve(oldReport.id).then
      (function (response) {
        var newReport = response.data;
        oldReport.resolved = newReport.resolved;
        oldReport.lastUpdated = newReport.lastUpdated;
        alertify.success('Selected report has been resolved.');
      }, function () {
        alertify.error('Report could not be resolved.');
      });
      }

    function unresolve(oldReport) {
      apiService.report.unresolve(oldReport.id).then
      (function (response) {
        var newReport = response.data;
        oldReport.resolved = newReport.resolved;
        oldReport.lastUpdated = newReport.lastUpdated;
        alertify.success('Selected report has been unresolved.');
      }, function () {
        alertify.error('Report could not be unresolved.');
      });
    }

    function resolveMultiple() {
      if(selectedReports.length > 0) {
        var confirmText = "This will resolve all selected reports. Do you want to proceed?";
        alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
        alertify.confirm(confirmText, function (confirmed) {
          if(confirmed){
            apiService.report.resolveMultiple(selectedReports).then
            (function (response) {
              var newReports = response.data;
              _.forEach(newReports, function (newReport) {
                  var vmReport = _.find(vm.reports, {id: newReport.id});
                  _.set(vmReport, 'resolved', true);
              });
              selectedReports = [];
              alertify.success('Selected reports have been resolved.');
            }, function () {
              alertify.error('Reports could not be resolved.');
            });
          }
        });
      } else {
        alertify.error('No reports selected.');
      }
    }
    refreshList();
  }]);


})();


angular.module('streama').controller('adminShowCtrl', [
	'$scope', '$q', 'apiService', '$stateParams', 'modalService', '$state', 'uploadService',
	function ($scope, $q, apiService, $stateParams, modalService, $state, uploadService) {

	var episodesFetched = 0;
	var maxSeason = 0;

	$scope.seasonOpened = null;
	$scope.showLoading = true;
	$scope.hasMovieDBKey = true;

	$scope.listEpisodesForSeason = listEpisodesForSeason;

  apiService.theMovieDb.hasKey().then(function (response) {
    if (!response.data.key) {
      $scope.hasMovieDBKey = false;
    }
  });

	apiService.tvShow.get($stateParams.showId).then(function (response) {
		$scope.show = response.data;

		apiService.tvShow.adminEpisodesForTvShow($stateParams.showId).then(function (response) {
			var episodes = $scope.episodes = response.data;
			if(episodes.length){
				$scope.seasons = _.chain(episodes).map('season_number').uniq().value();
        var defaultSeasion = parseInt($stateParams.season) || _.min(episodes, 'season_number').season_number;
        $scope.setCurrentSeason(defaultSeasion);
			}
			$scope.showLoading = false;
			$scope.highlightOnDashboard = modalService.newReleaseModal.bind(modalService, $scope.show,'tvShow', episodes);
		});
	});

  $scope.openShowModal = function () {
    modalService.tvShowModal($scope.show, function (data) {
      angular.merge($scope.show, data);
    });
  };



	$scope.addToCurrentNotification = function(){
    alertify.set({ buttonReverse: true, labels: {ok: "OK", cancel : "Cancel"}});
		alertify.prompt('Add a description to this TvShow. For instance, tell the users which season you added.', function (confirmed, text) {
			if(confirmed){
				apiService.notification.addTvShowToCurrentNotification($stateParams.showId, text).then(function () {
					alertify.success('The TvShow was added to the current notification queue.');
				});
			}
		})
	};


	$scope.addNewEpisode = function(){
		modalService.videoModal(null, 'manual', $scope.show, function (response) {
			var data = response.data;
			$scope.seasons = $scope.seasons || [];
			var seasonNum = parseInt(data.season_number);
			if($scope.seasons.indexOf(seasonNum) === -1){
				$scope.seasons.push(seasonNum);
			}
			$scope.episodes.push(data);
			$scope.setCurrentSeason(data.season_number);
		});
	};


	$scope.deleteShow = function(){
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm("Are you sure you want to delete this Show?", function (confirmed) {
			if(confirmed){
				apiService.tvShow.delete($scope.show.id).then(function () {
					$state.go('admin.shows');
				});
			}
		})

	};

	$scope.openSeason = function (index) {
		if($scope.seasonOpened != index){
			$scope.seasonOpened = index;

		}else{
			$scope.seasonOpened = null;
		}
	};

	$scope.setCurrentSeason = function (index) {
		$scope.currentSeason = index;
		if(index){
		  if($scope.hasMovieDBKey){
        apiService.theMovieDb.countNewEpisodesForSeason({apiId: $scope.show.apiId, showId: $stateParams.showId, season: index})
          .then(function (response) {
            $scope.newEpisodesForSeason = response.data;
          })
      }
		}

	};

	var seasonForShow = function (season) {
    if($scope.hasMovieDBKey){
      return apiService.theMovieDb.seasonForShow({apiId: $scope.show.apiId, showId: $stateParams.showId, season: season})
				.then(function (response) {
					var data = response.data;
					console.log('%c seasonForShow', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
					$scope.seasons = $scope.seasons ||  [];
					if($scope.seasons.indexOf(season) === -1) {
						$scope.seasons.push(season);
					}

					$scope.episodes = $scope.episodes.concat(data);
					$scope.newEpisodesForSeason = null;
					maxSeason = Math.max(maxSeason, season);
					if (maxSeason == season) {
						$scope.setCurrentSeason(season);
					}
					episodesFetched += data.length;
				});
    }
	};

	var getEpisodesForSeasons = function (seasons) {
		var promises = [];
		for (var i = 0; i < seasons.length; i++) {
			promises.push(seasonForShow(seasons[i]));
		}

		$q.all(promises).then(function() {
			$scope.loading = false;
			maxSeason = 0;
			alertify.success(episodesFetched + " Episodes fetched");
			episodesFetched = 0;
		});
	};

	$scope.fetchEpisodes = function(){
    	alertify.set({ buttonReverse: true, labels: {ok: "OK", cancel : "Cancel"}});
		alertify.prompt("For which seasons would you like to fetch the episodes? (Leave blank to fetch for all seasons)", function (confirmed, season) {
			if (confirmed) {
				$scope.loading = true;
				var seasons = [];

				if (!season) {
					apiService.theMovieDb.seasonNumberForShow({apiId: $scope.show.apiId}).then(function(data) {
						getEpisodesForSeasons(data.data);
					});
					return;
				} else if (season.indexOf('-') > -1) {
					var start = parseInt(season.substring(0, season.indexOf('-')));
					var end = parseInt(season.substring(season.indexOf('-') + 1));
					if (start > end) {
						var temp = start;
						start = end;
						end = temp;
					}

					seasons = _.range(start, end+1);
				} else {
					seasons.push(parseInt(season));
				}

				getEpisodesForSeasons(seasons);
			}
		})
	};

	$scope.refetchSeason = function (season_number) {
		seasonForShow(season_number);
	};

	$scope.deleteSeason = function (season_number) {
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});

		alertify.confirm("Are you sure you want to remove the entire season " + season_number + "?", function (confirmed) {
			if(confirmed){
				$scope.loading = true;
				apiService.tvShow.removeSeason($stateParams.showId, season_number).then(function () {
					$scope.seasons.splice($scope.seasons.indexOf(season_number), 1);
					$scope.loading = false;
					var lowestSeasonNumber = _.min($scope.seasons);
					if(lowestSeasonNumber){
						$scope.setCurrentSeason(lowestSeasonNumber);
					}
				});

			}
		})
	};

	$scope.imageUpload = {};

	$scope.uploadPoster = uploadService.doUpload.bind(uploadService, $scope.imageUpload, 'file/upload.json', function (data) {
		console.log('%c test', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', data);
		$scope.imageUpload.percentage = null;

		if(data.error) return

		$scope.show.poster_image = data.id;

		apiService.tvShow.save($scope.show).then(function (response) {
			var data = response.data;
			$scope.show.poster_image_src = data.poster_image_src;
		});
	}, function () {});

	function listEpisodesForSeason(seasonNum) {
		return _.filter($scope.episodes, {'season_number': seasonNum});
	}
}]);



angular.module('streama')
  .controller('adminShowsCtrl',
    ['$scope', 'apiService', '$state', 'modalService', 'mediaListService', '$interval',
    function ($scope, apiService, $state, modalService, mediaListService, $interval) {

	$scope.loading = false;
	$scope.bigLoading = false;
  $scope.hasMovieDBKey = true;
  $scope.searchText = "Search Show from collection or TheMovieDB...";

	$scope.createFromFiles = createFromFiles;

  apiService.theMovieDb.hasKey().then(function (data) {
    if (!data.data.key) {
      $scope.hasMovieDBKey = false;
      $scope.searchText = "Search Show from collection...";
    }
  });


  $scope.tvShow = mediaListService.init(apiService.tvShow.list, {sort: 'name', order: 'ASC'});

  $scope.openShowModal = function () {
		modalService.tvShowModal(null, function (data) {
			$state.go('admin.show', {showId: data.id});
		});
	};

  $scope.doSearch = function (query) {
    $scope.tvShow.search();
    if ($scope.hasMovieDBKey && query) {
      return apiService.theMovieDb.search('tv', query).then(function (data) {
        $scope.suggestedShows = data.data;
      });
    }
  };

  $scope.addFromSuggested = function (show, redirect) {
    var tempShow = angular.copy(show);
    var apiId = tempShow.id;
    delete tempShow.id;
    tempShow.apiId = apiId;

    apiService.tvShow.save(tempShow).then(function (response) {
      var data = response.data;
      if(redirect){
        $state.go('admin.show', {showId: data.id});
      }else{
        $scope.shows.push(data);
      }
    });
  };

  $scope.alreadyAdded = function (show) {
    // console.log('%c show', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', show);
    return show.id && _.find($scope.shows, {apiId: show.id.toString()});
  };

	function createFromFiles() {
		modalService.createFromFilesModal('tvShow').then(function (data) {
			apiService.tvShow.list().then(function (response) {
        var data = response.data;
				angular.extend($scope.shows, data);
			});
		});
	}

}]);



angular.module('streama').controller('adminVideoCtrl', [
	'$scope', 'apiService', '$stateParams', 'modalService', '$state', 'uploadService',
	function ($scope, apiService, $stateParams, modalService, $state, uploadService) {
    $scope.loading = true;

		apiService.genericVideo.get($stateParams.videoId).then(function (response) {
			var data = response.data;
			$scope.video = data;
      $scope.loading = false;
		});

    $scope.openVideoModal = function () {
      modalService.genericVideoModal($scope.video, function (data) {
        angular.merge($scope.video, data)
      });
    };

		$scope.delete = function(){
      alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
			alertify.confirm("Are you sure, you want to delete this Video?", function (confirmed) {
				if(confirmed){
					apiService.genericVideo.delete($stateParams.videoId).then(function () {
						$state.go('admin.videos');
					});
				}
			})
		};

		$scope.addToCurrentNotification = function(){
			apiService.notification.addMovieToCurrentNotification($stateParams.movieId).then(function () {
				alertify.success('The movie was added to the current notification queue.');
			});
		};

    $scope.manageFiles = function(video){
      modalService.fileManagerModal(video);
    };


		$scope.addSimilarMovieToStreama = function(movie, redirect){
      alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});

			alertify.confirm("Do you want to add \""+ movie.title +"\" to the Streama library?", function (confirmed) {
				if(confirmed){

          var apiId = movie.id;
          delete movie.id;
          movie.apiId = apiId;

          apiService.movie.save(movie).then(function (data) {
						if(redirect){
							$state.go('admin.movie', {movieId: data.data.id});
						}
          });
				}
			})
		};

		$scope.uploadStatus = {};

		$scope.upload = uploadService.doUpload.bind(uploadService, $scope.uploadStatus, 'video/uploadFile.json?id=' + $stateParams.movieId, function (data) {
			$scope.uploadStatus.percentage = null;
			
			if(data.error) return
			
			$scope.video.files = $scope.video.files || [];
			$scope.video.files.push(data);
		}, function () {});





}]);



angular.module('streama').controller('adminVideosCtrl', ['$scope', 'apiService', 'modalService', '$state', function ($scope, apiService, modalService, $state) {

	$scope.loading = true;


	apiService.genericVideo.list().then(function (response) {
		$scope.videos = response.data;
		$scope.loading = false;
	});

	$scope.openGenericVideoModal = function () {
		modalService.genericVideoModal(null, function (data) {
			$state.go('admin.video', {videoId: data.id});
		});
	};

	$scope.addFromSuggested = function (movie, redirect) {
		var tempMovie = angular.copy(movie);
		var apiId = tempMovie.id;
		delete tempMovie.id;
		tempMovie.apiId = apiId;

		apiService.movie.save(tempMovie).then(function (response) {
			if(redirect){
				$state.go('admin.movie', {movieId: response.data.id});
			}else{
				$scope.movies.push(response.data);
			}
		});
	};

	$scope.alreadyAdded = function (movie) {
		console.log('%c movie', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', movie);
		return movie.id && _.find($scope.movies, {apiId: movie.id.toString()});
	};

}]);

(function(){
'use strict';
//= wrapped

angular.module('streama')
  .controller('modalCreateFromFileCtrl', modalCreateFromFileCtrl);

function modalCreateFromFileCtrl($scope, $uibModalInstance, apiService, uploadService, dialogOptions, modalService, $state) {
  var vm = this;
  var STATUS_NO_MATCH = 0;
  var STATUS_MATCH_FOUND = 1;
  var STATUS_EXISTING = 2;
  var STATUS_CREATED = 3;
  var STATUS_LIMIT_REACHED = 4;
  var STATUS_EXISTING_FOR_SUBTITLE = 5;
  var STATUS_SUBTITLE_MATCH = 6;
  var STATUS_SUBTITLE_ADDED = 7;

	vm.loading = false;
	vm.localFilesEnabled = false;
	vm.localFiles = [];
	vm.localDir = [];
	vm.video = null;
	vm.mediaType = dialogOptions.mediaType;
	vm.uploadStatus = {};
	vm.hasMatcherResult = false;

	vm.loadLocalFiles = loadLocalFiles;
	vm.backLocalDirectory = backLocalDirectory;
	vm.openLocalDirectory = openLocalDirectory;
	vm.close = close;
	vm.toggleSelectAll = toggleSelectAll;
	vm.runMatcher = runMatcher;
	vm.toggleSelection = toggleSelection;
	vm.toggleDirectorySelection = toggleDirectorySelection;
	vm.getMatchForPath = getMatchForPath;
	vm.getMatchDisplay = getMatchDisplay;
	vm.selection = [];
  vm.addAllMatches = addAllMatches;
  vm.addSelectedFile = addSelectedFile;
  vm.openMediaDetail = openMediaDetail;
  vm.openAdminForm = openAdminForm;
  vm.isSelected = isSelected;
  vm.hasStatus = hasStatus;


	init();


	function init() {
		loadLocalFiles('');
	}

	function openAdminForm(mediaObject) {
		var url = $state.href('admin.' + mediaObject.importedType, {showId: mediaObject.importedId, movieId: mediaObject.importedId, season:  mediaObject.season});
		window.open(url,'_blank');
	}

	function openMediaDetail(mediaObject) {
		modalService.mediaDetailModal({
			mediaObject: mediaObject,
			isApiMovie: true,
			mediaType: mediaObject.type
		});
	}

	function loadLocalFiles(path) {
		apiService.file.localFiles(path).then(function(response) {
			var data = response.data;
			vm.localFilesEnabled = true;
			vm.localFiles = data;
		}, function(data) {
			if (data.code == 'LocalFilesNotEnabled') {
				vm.localFilesEnabled = false;
			}
			alertify.error(data.message);
		});
	}

	function backLocalDirectory() {
		vm.localFiles = [];
		vm.localDir.pop();
		vm.loadLocalFiles(vm.localDir.join('/'));
	}

	function openLocalDirectory(dir, forceOpen, onSuccess) {
		// vm.localFiles = [];
		// vm.localDir.push(dir.name);
		// vm.loadLocalFiles(vm.localDir.join('/'));
    dir.showFiles = (dir.showFiles == true && !forceOpen) ? false : true;
    if(!dir.localFiles || !dir.localFiles.length){
			dir.localFiles = [];
			apiService.file.localFiles(dir.path).then(function(response) {
				var data = response.data;
				dir.localFiles = data;
				(onSuccess || angular.noop)(data);
			});
			console.log(dir);
		}else{
			(onSuccess || angular.noop)(dir.localFiles);
		}

	}

	function close() {
		$uibModalInstance.close();
	}



	function toggleSelectAll() {
		alert('toggleSelectAll needs implementation.')
	}

	function runMatcher() {
		vm.isMatcherLoading = true;
    vm.matchResult = null;
		var fileSelection = _.filter(vm.selection, {directory: false});
		apiService.file.matchMetaDataFromFiles(fileSelection).then(function (response) {
			var data = response.data;
			vm.isMatcherLoading = false;
			vm.matchResult = data;
			//console.log(data);
      deselectByStatus(STATUS_EXISTING);
		});
	}

	function toggleSelection(file) {
		vm.selection = _.xorBy(vm.selection, [file], 'path');
	}

	function deselect(file) {
	  _.remove(vm.selection, {path: file.path});
	}

	function isSelected(file) {
		return _.some(vm.selection, {path: file.path});
	}

	function toggleDirectorySelection(directory) {
		directory.isSelected = !directory.isSelected;
	  if(directory.isSelected){
      openLocalDirectory(directory, true, function () {
        _.forEach(directory.localFiles, function (file) {
          toggleSelection(file);
        });
      });
    }else{
      _.forEach(directory.localFiles, function (file) {
        deselect(file);
        directory.showFiles = false;
      });
    }

	}

	function getMatchForPath(path) {
		return _.find(vm.matchResult, {file: path});
	}

	function getMatchDisplay(file) {
		var match =_.find(vm.matchResult, {file: file.path});
		if(match.type === 'episode'){
			return match.showName + ' ' + 'S'+ _.padStart(match.season, 2, "0") +'E'+  _.padStart( match.episodeNumber, 2, "0")
		}

		if(match.type === 'movie'){
			return match.title + ' (' + match.release_date.substring(0, 4)  + ')'
		}
		console.log('%c match', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', match);

	}



  function addAllMatches() {
		var allFoundMatches = _.filter(vm.matchResult, function (match) {
			return (match.status === STATUS_MATCH_FOUND || match.status === STATUS_EXISTING_FOR_SUBTITLE || match.status === STATUS_SUBTITLE_MATCH)
		});
		if(allFoundMatches.length == 0){
			alertify.success('Nothing to add.');
		}

    apiService.file.bulkAddMediaFromFile(allFoundMatches).then(function (response) {
			var data = response.data;
      if(_.some(data, {status: STATUS_LIMIT_REACHED})){
        alertify.log("not all files were added unfortunately. This is due to TheMovieDB API LIMIT constraints. Just try again in a couple of seconds :). ")
      }else{
        alertify.success("All matches have been added to the database and files connected");
      }
      mergeMatchResults(data);
    });

  }

	function addSelectedFile(file) {
    var fileMatch = _.find(vm.matchResult, {"file": file.path});
    apiService.file.bulkAddMediaFromFile([fileMatch]).then(function (response) {
			var result = response.data;
      if(_.some(result, {status: STATUS_LIMIT_REACHED})){
        alertify.log("not all files were added unfortunately. This is due to TheMovieDB API LIMIT constraints. Just try again in a couple of seconds :) ")
      }else{
        alertify.success(fileMatch.title || fileMatch.episodeName + " has been added");
      }
      mergeMatchResults(result);
    });
	}

  function mergeMatchResults(result) {
    vm.matchResult = _.map(vm.matchResult, function (match) {
      return _.find(result, {file: match.file}) || match;
    });

    deselectByStatus(STATUS_CREATED);
  }


  function deselectByStatus(status) {
    _.forEach(_.filter(vm.matchResult, {status: status}), function (file) {
      var localFile = _.find(vm.selection, {path: file.file});
      toggleSelection(localFile);
    });
  }

  function hasStatus(file, status) {
		var matchForPath = getMatchForPath(file.path);
		if(!matchForPath){
			return false;
		}
		return (matchForPath.status === status);
	}

}
modalCreateFromFileCtrl.$inject = ["$scope", "$uibModalInstance", "apiService", "uploadService", "dialogOptions", "modalService", "$state"];
})();
'use strict';

angular.module('streama').controller('dashCtrl',
	["$scope", "apiService", "$state", "$rootScope", "localStorageService", "modalService", "$stateParams", "mediaListService", "currentUser", function ($scope, apiService, $state, $rootScope, localStorageService, modalService, $stateParams, mediaListService, currentUser ) {
  var vm = this;

    var LIST_MAX = 30;
		vm.fetchFirstEpisodeAndPlay = fetchFirstEpisodeAndPlay;
    vm.showDetails = showDetails;
    vm.handleWatchlistUpdate = handleWatchlistUpdate;
    vm.addToWatchlist = addToWatchlist;
    vm.removeFromWatchlist = removeFromWatchlist;
    vm.markCompleted = markCompleted;
    vm.loadingRecommendations = true;
    vm.isDashSectionHidden = isDashSectionHidden;
    vm.isDashType = isDashType;

    $scope.$on('changedGenre', onChangedGenre);

    init();

    function init() {
      if ($rootScope.currentUser.isAdmin) {
        showInitialSettingsWarning();
      }
      if ($stateParams.mediaModal) {
        modalService.mediaDetailModal({mediaId: $stateParams.mediaModal, mediaType: $stateParams.mediaType, isApiMovie: false});
      }

      if(!localStorageService.get('currentProfile')){
        apiService.profile.getUserProfiles().then(function(response) {
            var data = response.data;
            localStorageService.set('currentProfile', data[0]);
            initMedia();
          }
        , function (data) {
          alertify.error(data.message);
        });
      } else {
        initMedia();
      }
    }

    function initMedia() {
      if(isDashType("home") || isDashType("discover-movies")){
        vm.movie = mediaListService.init(apiService.dash.listMovies, {sort: 'title', order: 'ASC'}, currentUser);
      }
      if(isDashType("home") || isDashType("discover-shows")){
        vm.tvShow = mediaListService.init(apiService.dash.listShows, {sort: 'name', order: 'ASC'}, currentUser);
      }
      if(isDashType("home") || isDashType("watchlist")){
        vm.watchlistEntry = mediaListService.init(apiService.watchlistEntry.list, {sort: 'id', order: 'DESC'}, currentUser);
      }
      if(isDashType("home")){
        vm.genericVideo = mediaListService.init(apiService.dash.listGenericVideos, {sort: 'title', order: 'ASC'}, currentUser);
        apiService.dash.listNewReleases().then(onNewReleasesLoaded);
        apiService.dash.listContinueWatching().then(onContinueWatchingLoaded);
        apiService.dash.listRecommendations().then(onRecommendedLoaded);
      }

      apiService.dash.listGenres().then(onGenreLoaded);
      apiService.tag.list().then(onTagsLoaded);
    }


    function isDashType(type) {
      return ($state.params.dashType === type || (type === 'home' && !$state.params.dashType));
    }
    // HOISTED FUNCTIONS BELOW

    function onRecommendedLoaded(response) {
      var data = response.data;
      vm.recommendations = data;
      vm.loadingRecommendations = false;
    }

    function fetchData(mediaConfig) {
      mediaConfig.fetch({max: LIST_MAX, offset: mediaConfig.currentOffset, sort: mediaConfig.currentSort.sort, order: mediaConfig.currentSort.order}).then(function (response) {
        var data = response.data;
        mediaConfig.total = data.total;
        if(mediaConfig.currentOffset > 0){
          mediaConfig.list = _.unionBy(mediaConfig.list, data.list, 'id');
        }else{
          mediaConfig.list = data.list;
        }
        mediaConfig.isLoading = false;
      });
    }

    function onContinueWatchingLoaded(response) {
      var data = response.data;
      vm.continueWatching = data;
    }

    function onNewReleasesLoaded(response) {
      var data = response.data;
      vm.newReleases = data;
    }

    function onTagsLoaded(response) {
      var data = response.data;
      vm.tags = data;
    }

    function onGenreLoaded(response) {
      var data = response.data;
      $rootScope.genres = data;

      if ($stateParams.genreId) {
        $rootScope.selectedGenre = _.find(data, {id: parseInt($stateParams.genreId)});
        vm.movie.filter.genre = [$rootScope.selectedGenre];
        vm.tvShow.filter.genre = [$rootScope.selectedGenre];
      }
    }

    function showInitialSettingsWarning() {
      var settingsPromise = apiService.settings.list();
      settingsPromise.then(function (response) {
        var data = response.data;
        $scope.settings = data;
        var TheMovieDbAPI = _.find(data, {settingsKey: 'Upload Directory'});

        if (!TheMovieDbAPI.value) {
          alertify.alert('You need to fill out some required base-settings. You will be redirected to the settings page now.', function () {
            $state.go('settings.settings');
          });
        }
      });
      return settingsPromise;
    }

    function onChangedGenre(e, genre) {
      $rootScope.selectedGenre = genre;
      var genreFilter;
      if ($rootScope.selectedGenre) {
        genreFilter = [$rootScope.selectedGenre.id];
      } else {
        genreFilter = [];
      }
      vm.movie.filter.genre = genreFilter;
      vm.tvShow.filter.genre = genreFilter;
      vm.movie.setFilter();
      vm.tvShow.setFilter();
    }

    function fetchFirstEpisodeAndPlay(tvShow) {
      apiService.dash.firstEpisodeForShow(tvShow.id).then(function (response) {
        $state.go('player', {videoId: response.data.id});
      });
    }

    function showDetails(media) {
      if(media.mediaType === 'episode'){
        modalService.mediaDetailModal({mediaId: media.tvShowId, mediaType: 'tvShow', isApiMovie: false});
      }else{
        modalService.mediaDetailModal({mediaId: media.id, mediaType: media.mediaType, isApiMovie: false}, function (response) {
          updateWatchlist(response.action, vm.watchlistEntry.list, media, response.watchlistEntry);
        });
      }
    }

    function handleWatchlistUpdate(action, item){
      switch (action) {
        case "added":
          addToWatchlist(item);
          break;
        case "removed":
          removeFromWatchlist(item);
          break;
      }
    }

    function addToWatchlist(item) {
      apiService.watchlistEntry.create(item).then(function (response) {
        vm.watchlistEntry.list = vm.watchlistEntry.list ? vm.watchlistEntry.list : [];
        updateWatchlist("added", vm.watchlistEntry.list, item, response.data);
      });
    }

    function removeFromWatchlist(item) {
      alertify.set({buttonReverse: true, labels: {ok: "Yes", cancel: "Cancel"}});
      alertify.confirm("Are you sure you want to remove this video from your watchlist?", function (confirmed) {
        if (confirmed) {
          apiService.watchlistEntry.delete(item).then(function (response) {
            updateWatchlist("removed", vm.watchlistEntry.list, item);
          });
        }
      });
    }

    function updateWatchlist(action, list, media, watchlistEntry) {
      var type = handleVideoListsUpdate(media);
      if(action === 'added'){
        list.push(watchlistEntry);
        alertify.success('The '+type+' was added to your watchlist.');
      }else if (action === 'removed'){
        removeMediaFromList(list, media);
        alertify.success('The '+type+' was removed from your watchlist.');
      }
      list.sort(function(a,b) { return (a.id < b.id) ? 1 : ((a.id > b.id) ? -1 : 0)});
    }

    function removeMediaFromList(list, media){
      _.remove(list, function (watchlistEntry) {
        return (watchlistEntry.video ? watchlistEntry.video.id : watchlistEntry.tvShow.id) === media.id
      });
    }

    function handleVideoListsUpdate(media){
      var type = media.mediaType;
      switch (type) {
        case "tvShow":
          watchlistStatusHandler(vm.tvShow.list, media);
          type = "show";
          break;
        case "movie":
          watchlistStatusHandler(vm.movie.list, media);
          type = 'movie';
          break;
        case "genericVideo":
          watchlistStatusHandler(vm.genericVideo.list, media);
          type = 'video';
          break;
        default:
          break;
      }
      watchlistStatusHandler(vm.newReleases, media);
      watchlistStatusHandler(vm.continueWatching, media);
      return type
    }

    function watchlistStatusHandler(mediaList, item){
      var index = _.findIndex(mediaList, function(element) { return item.id === element.id});
      if(index > 0){
        mediaList[index].inWatchlist = !mediaList[index].inWatchlist
      }
    }

    function applyFilter(item, filterObj) {
      var showItemArray = [];

      _.forEach(filterObj, function (filterVal, key) {
        if (_.isArray(filterVal) && filterVal.length) {
          var intersection = _.intersectionBy(item[key], filterVal, 'id');
          var isVisible = (intersection.length ? true : false);
          showItemArray.push(isVisible);
        }
        if (_.isString(filterVal) && filterVal.length >= 1) {
          var isVisible = (_.includes(item[key].toLowerCase(), filterVal.toLowerCase()) ? true : false);
          showItemArray.push(isVisible);
        }
      });

      return (showItemArray.indexOf(false) < 0);
    }

    function markCompleted(viewingStatus) {
      alertify.set({buttonReverse: true, labels: {ok: "Yes", cancel: "Cancel"}});
      alertify.confirm("Are you sure you want to mark this video as completed?", function (confirmed) {
        if (confirmed) {
          apiService.viewingStatus.delete(viewingStatus.id).then(function (data) {
            _.remove(vm.continueWatching, {'id': viewingStatus.id});
          });
        }
      })
    }

    function isDashSectionHidden(sectionName) {
      var hiddenDashSectionSetting = _.find($scope.settings, {name: 'hidden_dash_sections'});
      if(_.get(hiddenDashSectionSetting, 'parsedValue')){
        var hiddenDashSections = hiddenDashSectionSetting.parsedValue.split(',');
        return (hiddenDashSections.indexOf(sectionName) > -1);
      }
    }

	}]);


angular.module('streama').controller('helpCtrl', ['$anchorScroll', '$location', '$scope',
  function ($anchorScroll, $location, $scope) {

    //This function is copied and modified from the AngularJS documentation: https://docs.angularjs.org/api/ng/service/$anchorScroll
    $scope.gotoAnchor = function(x) {
      var newHash = 'question' + x;
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash('question' + x);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
    };

    //Array of question objects. Help page contents are constructed by reading these.
    $scope.questions = [ 'UPLOAD_VIDEO', 'DELETE_VIDEO', 'VIDEO_FORMATS', 'SUBTITLES', 'INVITE_USERS', 'BASE_URL',
      'NOTIFICATIONS', 'VIDEO_PLAYER_SHORTCUTS', 'FAVORITE_GENRES', 'USEFUL_LINKS']

  }
]);

(function(){
'use strict';
//= wrapped

angular.module('streama')
  .controller('imageChooserModalCtrl', imageChooserModalCtrl);

function imageChooserModalCtrl($uibModalInstance, dialogOptions, apiService) {
  var vm = this;
	vm.mediaType = dialogOptions.mediaType;
	vm.media = dialogOptions.media;
  vm.imagesForMedia = [];

  vm.chooseImage = chooseImage;
  vm.close = $uibModalInstance.close;

  init();


  function init() {
    apiService.theMovieDb.imagesForMedia({type: vm.mediaType, apiId: vm.media.apiId}).then(function (response) {
      vm.imagesForMedia = response.data;
    });
  }

  function chooseImage(image) {
    vm.media.backdrop_path = image.file_path;
    $uibModalInstance.close();
  }
}
imageChooserModalCtrl.$inject = ["$uibModalInstance", "dialogOptions", "apiService"];
})();
(function(){
'use strict';
//= wrapped

angular.module('streama').controller('modalErrorReportCtrl', [
  'apiService', '$state', '$uibModalInstance', 'errorCode', 'videoData', '$rootScope', function (apiService, $state, $uibModalInstance, errorCode, videoData, $rootScope) {
    var vm = this;
    vm.close = close;
    vm.errorCode = errorCode;
    function close(data) {
      if (data === 'withReport') {
          apiService.report.save(videoData.id, errorCode).then(function () {
              closeModalAndRedirect();
              alertify.success('Report sent successfully.');
          }, function (error) {
            closeModalAndRedirect();
            alertify.error(error.data);
          });
      } else {
        closeModalAndRedirect();
      }
    }

    function closeModalAndRedirect() {
      if ($rootScope.currentUser.isAdmin || $rootScope.currentUser.isContentManager) {
        if (videoData.show) {
          $state.go('admin.show', {showId: videoData.show.id});
        } else {
          $state.go('admin.movie', {movieId: videoData.id});
        }
        $uibModalInstance.close();
      } else {
        $state.go('dash');
        $uibModalInstance.close();
      }
    }
  }]);


})();
'use strict';

angular.module('streama').controller('modalFileBrowserCtrl', [
	'$scope', '$uibModalInstance', 'apiService',
	function ($scope, $uibModalInstance, apiService) {
		$scope.loading = true;

		apiService.video.listAllFiles().then(function (response) {
				var data = response.data;
				$scope.loading = false;
				$scope.files = data;
			}, function () {
				alertify.error('Failed to load the list of files.');
			});

		$scope.chooseFile = function (file) {
			$uibModalInstance.close(file);
		};


		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
}]);

'use strict';

angular.module('streama').controller('modalFileCtrl', [
  '$scope', '$uibModalInstance', 'apiService', 'uploadService', 'video', 'localStorageService', '$rootScope',
  function ($scope, $uibModalInstance, apiService, uploadService, video, localStorageService, $rootScope) {
    $scope.loading = false;
    $scope.localFilesEnabled = false;
    $scope.localFiles = [];
    $scope.activeTab = localStorageService.get('activeFileModalTab')|| 'upload';
    $scope.closeOnSelect = localStorageService.get('fileModal.closeOnSelect');
    if($scope.closeOnSelect == null){$scope.closeOnSelect = true;}

    var localFileLastPath = localStorageService.get('localFileLastPath')|| '';
		$scope.localDir = localFileLastPath.split('/') || [];
    $scope.video = video;
    $scope.uploadStatus = {};
    $scope.upload = uploadService.doUpload.bind(uploadService, $scope.uploadStatus, 'video/uploadFile.json?id=' + video.id, onUploadSuccess, function () {});

    $scope.loadLocalFiles = loadLocalFiles;
		$scope.backLocalDirectory = backLocalDirectory;
		$scope.openLocalDirectory = openLocalDirectory;
		$scope.toggleCloseOnSelect = toggleCloseOnSelect;
    $scope.addLocalFile = addLocalFile;
    $scope.cancel = cancel;
    $scope.removeFile = removeFile;
    $scope.saveChanges = saveChanges;
    $scope.getFilesForExtensions = getFilesForExtensions;
    $scope.addExternalUrl = addExternalUrl;
    $scope.toggleEdit = toggleEdit;
    $scope.isEditing = isEditing;

		$scope.loadLocalFiles(localFileLastPath);

		$scope.$watch('activeTab', onTabChange);

    function onTabChange(newVal, oldVal) {
      localStorageService.set('activeFileModalTab', newVal);
    }

		function loadLocalFiles(path) {
      if(!_.get($rootScope.getSetting('Local Video Files'), 'value')){
        return;
      }
			apiService.file.localFiles(path).then(function(response) {
				localStorageService.set('localFileLastPath', path);
				$scope.localFilesEnabled = true;
				$scope.localFiles = response.data;
			}, function(data) {
				if (data.code == 'LocalFilesNotEnabled') {
					$scope.localFilesEnabled = false;
					return;
				}
				alertify.error(data.message);
			});
		}

    function backLocalDirectory() {
      $scope.localFiles = [];
      $scope.localDir.pop();
      $scope.loadLocalFiles($scope.localDir.join('/'));
    }

    function openLocalDirectory(dir) {
      $scope.localFiles = [];
      $scope.localDir.push(dir.name);
      $scope.loadLocalFiles($scope.localDir.join('/'));
    }


    function addExternalUrl(externalUrl) {
      apiService.video.addExternalUrl({id: $scope.video.id, externalUrl: externalUrl}).then(function (response) {
        alertify.success("External URL Added.");
        $scope.video.externalLink = null;

        if(_.find($scope.video.videoFiles, {id: response.data.id})){
          $scope.video.videoFiles[_.indexOf($scope.video.videoFiles, {id: data.id})] = response.data;
        }else{
          $scope.video.videoFiles = $scope.video.videoFiles || [];
          $scope.video.videoFiles.push(data);
          $scope.video.hasFiles = true;
        }
      });
    }

    function addLocalFile(localFile) {
      apiService.video.addLocalFile({id: $scope.video.id, localFile: localFile}).then(function (response) {
        var data = response.data;
        alertify.success("Local File Added.");
        $scope.video.localFile = null;

        if(_.find($scope.video.videoFiles, {id: data.id})){
          $scope.video.videoFiles[_.indexOf($scope.video.videoFiles, {id: data.id})] = data;
        }else{
          $scope.video.videoFiles = $scope.video.videoFiles || [];
          $scope.video.videoFiles.push(data);
          $scope.video.hasFiles = true;
        }
        if($scope.closeOnSelect){
          $uibModalInstance.dismiss('cancel');
        }
      }, function(data) {
        alertify.error(data.message);
      });
    }

    function removeFile(file) {
      alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
      alertify.confirm('Are you sure you want to remove the file "'+file.originalFilename+'"?', function (confirmed) {
        if(confirmed){
          apiService.video.removeFile($scope.video.id, file.id).then(function () {
            if(file.extension == '.srt' || file.extension == '.vtt'){
              _.remove($scope.video.subtitles, {id: file.id});
              alertify.success('Subtitles deleted.');
            }else{
              _.remove($scope.video.videoFiles, {id: file.id});
              alertify.success('Video deleted.');
            }
          });
        }
      });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
    function saveChanges(file) {
      apiService.file.save(file).then(function (data) {
        alertify.success('File successfully saved.');
        toggleEdit(file);
      });
    }

    function onUploadSuccess(data) {
      $scope.uploadStatus.percentage = null;
      if(data.error) return;

      if(data.extension == '.srt' || data.extension == '.vtt'){
        $scope.video.subtitles = $scope.video.subtitles || [];
        $scope.video.subtitles.push(data);
        $scope.video.hasFiles = true;
        alertify.success('Subtitles uploaded successfully.');
      }else{
        $scope.video.videoFiles = $scope.video.videoFiles || [];
        $scope.video.videoFiles.push(data);
        $scope.video.hasFiles = true;
        alertify.success('Video uploaded successfully.');
      }

    }


    function toggleCloseOnSelect() {
      $scope.closeOnSelect = !$scope.closeOnSelect;
      localStorageService.set('fileModal.closeOnSelect', $scope.closeOnSelect);
    }

    function getFilesForExtensions(extensions){
      return _.filter($scope.video.videoFiles, function (file) {
        return (extensions.indexOf(file.extension.toLowerCase()) > -1);
      })
    }

    function toggleEdit(file) {
      file._isEditing = !file._isEditing;
    }

    function isEditing(file) {
      return file._isEditing;
    }

  }]);

'use strict';

angular.module('streama').controller('modalGenericVideoCtrl', [
	'$scope', '$uibModalInstance', 'apiService', 'video', 'uploadService',
	function ($scope, $uibModalInstance, apiService, video, uploadService) {
	$scope.loading = false;

	$scope.video = video || {};

	$scope.saveVideo = function (video) {
		apiService.genericVideo.save(video).then(function (response) {
			$uibModalInstance.close(response.data);
		});
	};


	$scope.imageUpload = {};

	$scope.uploadImage = function (files, type) {
		uploadService.doUpload($scope.imageUpload, 'file/upload.json', function (data) {
			$scope.imageUpload.percentage = null;
			
			if(data.error) return
			
			console.log('%c type', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', type);
			$scope.video[type] = data;
			$scope.video[type+'_src'] = data.src;
		}, function () {}, files);
	};



	apiService.genres.list().then(function (data) {
		$scope.genres = data.data;
	});


	$scope.deleteMovie = function(movie){
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm("Are you sure, you want to delete this Episode?", function (confirmed) {
			if(confirmed){
				apiService.movie.delete(movie.id).then(function () {
					$uibModalInstance.close({deleted: true});
				});
			}
		})
	};

	$scope.onTagSelect = function (tag) {
		apiService.tag.save(tag);
	};

	$scope.tagTransform = function (newTag) {
		var item = {
			name: newTag,
			isNew: true
		};

		return item;
	};

	$scope.deleteTag = function (tag) {
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm('Are you sure you want to delete the tag ' + tag.name, function (confirmed) {
			if(confirmed){
				apiService.tag.delete(tag.id).then(function () {
					_.remove($scope.tags, {id: tag.id});
				})
			}
		});
	};

	apiService.tag.list().then(function (response) {
		$scope.tags = response.data;
	});


	setTimeout(function () {
		$('.name-input').focus();
	}, 200);


	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
}]);

'use strict';

angular.module('streama').controller('modalMediaDetailCtrl', [
  '$scope', '$uibModalInstance', '$rootScope', 'config', '$state', 'apiService',
  function ($scope, $uibModalInstance, $rootScope, config, $state, apiService) {
    var action;

    $scope.mediaType = config.mediaType;
    var mediaId = config.mediaId;
    $scope.isEditButtonHidden = config.isEditButtonHidden;

    $scope.listEpisodesForSeason = listEpisodesForSeason;
    $scope.addToWatchlist = addToWatchlist;
    $scope.removeFromWatchlist = removeFromWatchlist;

    if(config.mediaObject) {
      $scope.media = config.mediaObject;
      $scope.isApiMovie = config.isApiMovie;
    }
    else if(mediaId && $scope.mediaType){

      console.log('%c media', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', mediaId);
      apiService[$scope.mediaType].get(mediaId).then(function (response) {
        var data = response.data;
        $scope.media = data;

        if($scope.mediaType == 'tvShow'){
          $scope.currentSeason = 0;
          apiService.tvShow.episodesForTvShow($scope.media.id).then(function (response) {
            var episodes = $scope.episodes = response.data;
            if(episodes.length){
              $scope.seasons = _.chain(episodes).map('season_number').uniq().value();
              $scope.currentSeason = _.min(episodes, 'season_number').season_number;
            }
          });
          apiService.dash.firstEpisodeForShow($scope.media.id).then(function (response) {
            var firstEpisode = response.data;
            $scope.firstEpisode = firstEpisode;
          });
        }
      });
    }
    else if(!config.mediaObject && !mediaId && !$scope.mediaType) {
      alertify.error('No data available');
    }
    $scope.cancel = function () {
      $uibModalInstance.close({
        watchlistEntry: $scope.watchlistEntry,
        video: $scope.media,
        action: action
      });
      if($state.current.name === 'dash'){
        $state.go('dash', {mediaModal: null, mediaType: null});
      }
	};
	$scope.setCurrentSeason = function (index) {
		$scope.currentSeason = index;
	};
	$scope.editMedia = function (media) {
		if($rootScope.currentUser.isContentManager){
			console.log('%c media', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', media);
			if(media.isGenericVideo){
				$state.go('admin.video', {videoId: media.id});
			}
			if(media.title){
				$state.go('admin.movie', {movieId: media.id});
			}
			else if(media.name){
				$state.go('admin.show', {showId: media.id});
			}
			$uibModalInstance.dismiss('cancel');
		}
	};

		$scope.$on('$stateChangeStart', function () {
			$uibModalInstance.dismiss('cancel');
		});

    function listEpisodesForSeason(seasonNum) {
      return _.filter($scope.episodes, {'season_number': seasonNum});
    }

    function addToWatchlist(item) {
      apiService.watchlistEntry.create(item).then(function (response) {
        var data = response.data;
        $scope.media = data.video ? data.video : data.tvShow;
        $scope.watchlistEntry = data;
        action = 'added'
      });
    }

    function removeFromWatchlist(item) {
      alertify.set({buttonReverse: true, labels: {ok: "Yes", cancel: "Cancel"}});
      alertify.confirm("Are you sure you want to remove this video from your watchlist?", function (confirmed) {
        if (confirmed) {
          apiService.watchlistEntry.delete(item).then(function (response) {
            var data = response.data;
            $scope.media = data;
            action = 'removed'
          });
        }
      })
    }
}]);

'use strict';

angular.module('streama').controller('modalMovieCtrl', [
	'$scope', '$uibModalInstance', 'apiService', 'movie', '$state', 'uploadService', 'modalService',
	function ($scope, $uibModalInstance, apiService, movie, $state, uploadService, modalService) {
	$scope.loading = false;

	$scope.movie = movie || {};
	$scope.movieDB = true;
	$scope.hasMovieDBKey = true;
  $scope.addManually = ($scope.movie.id && !$scope.movie.apiId);
	$scope.chooseNewBackdrop = chooseNewBackdrop;

	$scope.imageUpload = {};
	$scope.uploadImage = uploadImage;
	$scope.saveMovie = saveMovie;
	$scope.toggleAddManually = toggleAddManually;
	$scope.selectFromAPI = selectFromAPI;
	$scope.search = search;
	$scope.onTagSelect = onTagSelect;
	$scope.tagTransform = tagTransform;
	$scope.deleteTag = deleteTag;
	$scope.cancel = cancel;

	init();

	function init() {
		apiService.genres.list().then(function (data) {
			$scope.genres = data.data;
		});

		apiService.theMovieDb.hasKey().then(function (response) {
			if (!response.data.key) {
				$scope.hasMovieDBKey = false;
				$scope.addManually = true;
			}
		});

		apiService.tag.list().then(function (response) {
			$scope.tags = response.data;
		});

		setTimeout(function () {
			$('.name-input').focus();
		}, 200);
	}

	function saveMovie(movie) {
		apiService.movie.save(movie).then(function (response) {
			$uibModalInstance.close(response.data);
			alertify.success("Movie saved.");
		});
	}

	function toggleAddManually() {
		$scope.addManually = !$scope.addManually;
	}
	function selectFromAPI($item) {
		console.log('%c selectFromAPI', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
		var apiId = $item.id;
		delete $item.id;
		$scope.movie = $item;
		$scope.movie.apiId = apiId;
		$scope.addManually = false;
		$scope.hasMovieDBKey = true;

		$scope.formVisible = true;
	}
	function search(query) {
		return apiService.theMovieDb.search('movie', query).then(function (data) {
			return data.data;
		});
	}

	function uploadImage(files, type) {
		uploadService.doUpload($scope.imageUpload, 'file/upload.json', function (data) {
			$scope.imageUpload.percentage = null;
			if(data.error) return

			$scope.movie[type] = data;
			$scope.movie[type+'_src'] = data.src;
		}, function () {}, files);
	}

	function onTagSelect(tag) {
		apiService.tag.save(tag);
	}

	function tagTransform(newTag) {
		var item = {
			name: newTag,
			isNew: true
		};

		return item;
	}

	function deleteTag(tag) {
		alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm('Are you sure you want to delete the tag ' + tag.name, function (confirmed) {
			if(confirmed){
				apiService.tag.delete(tag.id).then(function () {
					_.remove($scope.tags, {id: tag.id});
				})
			}
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	function chooseNewBackdrop() {
    modalService.openImageChooser('movie', $scope.movie);
  }
}]);

'use strict';

angular.module('streama').controller('modalNewReleaseCtrl', [
  '$scope', '$uibModalInstance', 'apiService', 'uploadService', 'media', 'type', 'episodes',
  function ($scope, $uibModalInstance, apiService, uploadService, media, type, episodes) {
    $scope.loading = false;
    $scope.type = type;
    $scope.media = media;
    $scope.episodes = episodes;
    $scope.newRelease = {
      mediaId: media.id,
      mediaType: type
    };


    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


    $scope.save = function (newRelease) {
      apiService.notification.highlightOnDashboard(newRelease)
        .then(function () {
          alertify.success('Highlight complete.');
          $uibModalInstance.close();
        })
        .error(function (err, status) {
          console.log('%c error', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
          alertify.error(err.message);
        });
    };
  }]);

'use strict';

angular.module('streama').controller('modalNotificationAddCtrl', [
  '$scope', '$uibModalInstance', 'apiService',
  function ($scope, $uibModalInstance, apiService) {

    $scope.notification = {};
    $scope.selectedItem = {};
    $scope.typeahead = {currentTitle:''};

    $scope.cancel = cancel;
    $scope.saveNotification = saveNotification;
    $scope.search = search;
    $scope.selectFromAPI = selectFromAPI;
    $scope.clearNotification = clearNotification;

    function search (query) {
    		return apiService.dash.searchMedia(query).then(function (data) {
    		  return data.data.shows.concat(data.data.movies);
    			//return data.data;
    	  });
    };

    function selectFromAPI ($item) {
        $scope.selectedItem = $item;
    		$scope.notification.id = $item.id;
    };

    function notificationSuccess (response) {
      var data = response.data;
      $uibModalInstance.close(data);
    }

    function saveNotification (notification) {
        if($scope.selectedItem.mediaType == 'movie'){
            apiService.notification.addMovieToCurrentNotification($scope.selectedItem.id).then(notificationSuccess);
        }else if($scope.selectedItem.mediaType == 'tvShow')
            apiService.notification.addTvShowToCurrentNotification($scope.selectedItem.id, $scope.notification.description).then(notificationSuccess);
    }

    function clearNotification (){
      $scope.selectedItem = {};
      $scope.typeahead.currentTitle = '';
    }

    function cancel () {
    		$uibModalInstance.dismiss('cancel');
    };

  }]);

'use strict';

angular.module('streama').controller('modalTvShowCtrl', [
	'$scope', '$uibModalInstance', 'apiService', 'tvShow',
	function ($scope, $uibModalInstance, apiService, tvShow) {

  $scope.loading = false;
  $scope.tvShow = tvShow || {};
  $scope.hasMovieDBKey = true;

	$scope.cancel = cancel;
	$scope.saveShow = saveShow;
	$scope.selectFromAPI = selectFromAPI;
	$scope.search = search;
	$scope.toggleAddManually = toggleAddManually;

	init();

  function init(){
    apiService.genres.list().then(function (data) {
      $scope.genres = data.data;
    });

		apiService.theMovieDb.hasKey().then(function (data) {
			if (!data.data.key) {
				$scope.tvShow.manualInput = true;
				$scope.hasMovieDBKey = false;
			}
		});

		setTimeout(function () {
			$('.name-input').focus();
		}, 200);
	}

	function toggleAddManually() {
		$scope.tvShow.manualInput = !$scope.tvShow.manualInput;
	}

	function saveShow(video) {
		apiService.tvShow.save(video).then(function (data) {
			$uibModalInstance.close(data.data);
			alertify.success("TV Show saved.");
		});
	}

	function selectFromAPI($item) {
		var apiId = $item.id;
		delete $item.id;
		$scope.tvShow = $item;
		$scope.tvShow.apiId = apiId;
		$scope.hasMovieDBKey = true;
		$scope.tvShow.manualInput = false;
	}

	function search(query) {
		return apiService.theMovieDb.search('tv', query).then(function (data) {
			return data.data;
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

}]);

'use strict';

angular.module('streama').controller('modalUserCtrl', [
	'$scope', '$uibModalInstance', 'apiService', 'user', 'isInvite',
	function ($scope, $uibModalInstance, apiService, user, isInvite) {

		$scope.user = angular.copy(user) || {};
		$scope.loading = false;
		$scope.validPassword = isInvite ? true : false;

		apiService.user.availableRoles().then(function (response) {
      var data = response.data;
      $scope.roles = data;
    });

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.checkAvailability = function (username) {
			$scope.error = null;
			$scope.validUser = false;

			if(username){
				apiService.user.checkAvailability(username).then(function (response) {
          var data = response.data;
					if(data.error){
						$scope.error = 	data.error;
					}else{
						$scope.validUser = true;
					}
				});
			}
    };

		$scope.checkPassword = function (password, passwordRepeat) {
			$scope.validPassword = true;
			$scope.passwordValidationError = null;
			if(!password){
				$scope.passwordValidationError = "PASS_ERROR_EMPTY";
				$scope.validPassword = false;
				return;
			}
			if(password.length < 6){
				$scope.passwordValidationError = "PASS_ERROR_LENGTH";
				$scope.validPassword = false;
				return;
			}
			if(password != passwordRepeat){
				$scope.passwordValidationError = "PASS_ERROR_REPEAT";
				$scope.validPassword = false;
				return;
			}
		};

	$scope.checkAuthorities = function (id) {
	  return _.some($scope.user.authorities, {id: id});
	};

	$scope.toggleAuthorities = function (value) {
	  $scope.user.authorities = _.xorBy($scope.user.authorities, [value], "id");
	};

    $scope.toggleSelection = function (value, array) {
      if(array.indexOf(value) > -1){
        array.splice(array.indexOf(value), 1);
      }else{
        array.push(value);
      }
    };


		$scope.saveAndInviteUser = function (user) {
			$scope.loading = true;
      var dateObj = angular.copy(user);
			apiService.user.saveAndInviteUser(dateObj).then(function (response) {
			  var data = response.data;
				  if(user.id){
            alertify.success('User Updated!');
            $uibModalInstance.close(data);
            $scope.loading = false;
            return;
          }
          var basicProfile = {
            profileName: data.username,
            profileLanguage: data.language,
            isChild: false,
            user: data
          };
          apiService.profile.save(basicProfile).then(function () {
              alertify.success('Profile Created!');
              $uibModalInstance.close(data);
              $scope.loading = false;
            }, function (data) {
              alertify.error(data.message);
              $scope.loading = false;
            });
				}, function (response) {
					$scope.loading = false;
					if(_.get(response, 'errors')){
					  _.forEach(response.errors, function(error){
              alertify.error('Error: ' + error.message);
            });
          }else{
            alertify.error('There was an error saving the user.');
          }
				});
		};

    $scope.saveAndCreateUser = function (user) {
      $scope.loading = true;
      var dateObj = angular.copy(user);
      apiService.user.saveAndCreateUser(dateObj).then(function (response) {
         var data = response.data;
          var basicProfile = {
            profileName: data.username,
            profileLanguage: data.language,
            isChild: false,
            user: data
          };
          apiService.profile.save(basicProfile).then(function () {
              alertify.success('Profile Created!');
              $uibModalInstance.close(data);
              $scope.loading = false;
            }, function (data) {
              alertify.error(data.message);
              $scope.loading = false;
            });
        }, function () {
          $scope.loading = false;
          alertify.error('There was an error saving the user.');
        });
    };

}]);

'use strict';

angular.module('streama').controller('modalVideoCtrl', [
	'$scope', '$uibModalInstance', 'apiService', 'video', 'isManual', 'tvShow', 'uploadService',
	function ($scope, $uibModalInstance, apiService, video, isManual, tvShow, uploadService) {
	$scope.loading = false;
	$scope.addManually = isManual;

	$scope.episode = video || {};

	$scope.saveEpisode = function (episode) {
		if(tvShow)
			episode.show = tvShow.id;

		delete episode.dateCreated;
		delete episode.lastUpdated;

		apiService.episode.save(episode).then(function (data) {
				$uibModalInstance.close(data);
        alertify.success("Video saved.");
			}, function () {
				alertify.error("An error occured.");
			});
	};

  $scope.imageUpload = {};
  $scope.uploadImage = function (files, type) {
    uploadService.doUpload($scope.imageUpload, 'file/upload.json', function (data) {
      $scope.imageUpload.percentage = null;
      if(data.error) return

      $scope.episode[type] = data;
      $scope.episode[type+'_src'] = data.src;
    }, function () {}, files);
  };


    $scope.deleteVideo = function(video){
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm("Are you sure you want to delete this Episode?", function (confirmed) {
			if(confirmed){
				apiService.video.delete(video.id).then(function () {
					$uibModalInstance.close({deleted: true});
				});
			}
		})

	};

	$scope.refetch = function(video){
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm("Are you sure you want to re-fetch the meta-data from TheMovieDb? " +
				"All your changes except for the added files will be overridden.", function (confirmed) {
			if(confirmed){
				apiService.video.refetch(video.id).then(function (result) {
					_.assign(video, result.data);
					alertify.success('Fetch successful');
				});
			}
		})

	};

	setTimeout(function () {
		$('.name-input').focus();
	}, 200);


	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
}]);

(function(){
'use strict';
//= wrapped

angular.module('streama')
  .controller('playbackOptionsModalCtrl', playbackOptionsModalCtrl);

function playbackOptionsModalCtrl($uibModalInstance, dialogOptions, apiService) {
  var vm = this;
  vm.playerOptions = _.clone(dialogOptions.playerOptions);
  vm.selectVideoFile = selectVideoFile;
  vm.changeSubtitleSize = changeSubtitleSize;
  vm.isVideoFileSelected = isVideoFileSelected;
  vm.selectSubtitle = selectSubtitle;
  vm.isSubtitleSelected = isSubtitleSelected;
  vm.submit = submit;
  vm.close = $uibModalInstance.close;


  function selectSubtitle(track) {
    vm.playerOptions.selectedSubtitle = track;
  }

  function isSubtitleSelected(track) {
    return (_.get(vm.playerOptions, 'selectedSubtitle.id') === _.get(track, 'id'));
  }

  function selectVideoFile(track) {
    vm.playerOptions.selectedVideoFile = track;
  }

  function isVideoFileSelected(track) {
    return (_.get(vm.playerOptions, 'selectedVideoFile.id') === _.get(track, 'id'));
  }

  function changeSubtitleSize(size) {
    vm.playerOptions.subtitleSize = size;
  }

  function submit() {
    $uibModalInstance.close(vm.playerOptions);
  }
}
playbackOptionsModalCtrl.$inject = ["$uibModalInstance", "dialogOptions", "apiService"];
})();
'use strict';

angular.module('streama').controller('playerCtrl', [
	'$scope', 'apiService', '$stateParams', 'playerService', '$rootScope',
	function ($scope, apiService, $stateParams, playerService, $rootScope) {

		apiService.video.get($stateParams.videoId).then(function (response) {
			$scope.video = response.data;

			var missingFileError = playerService.handleMissingFileError($scope.video);

			if(!missingFileError){
				$scope.videoOptions = playerService.setVideoOptions($scope.video, $rootScope.settings);
			}

			playerService.registerSocketListener();

		});

		$rootScope.$on('$stateChangeStart', function(e, toState){
			if(toState.name != 'player'){
				playerService.destroyPlayer();
			}
		});

		$scope.$on('playerSession', function (e, data) {
			playerService.handleSocketEvent(data);
		});
	}]);

'use strict';

angular.module('streama').controller('settingsCtrl', ['$scope', 'apiService', 'modalService', '$rootScope', function ($scope, apiService, modalService, $rootScope) {

}]);





'use strict';

angular.module('streama')
  .controller('settingsSettingsCtrl',
    ['$scope', 'apiService', '$sce', 'uploadService',
    function ($scope, apiService, $sce, uploadService) {
      $scope.bigLoading = false;
      $scope.loading = true;
      $scope.syncImages = syncImages;

      apiService.settings.list().then(function (response) {
        var data = response.data;
        $scope.settings = data;

        _.forEach(data, function (setting) {
          setting.description = $sce.trustAsHtml(Autolinker.link(setting.description, { newWindow: "true" } ));
        });
        $scope.loading = false;
      });

      $scope.updateMultipleSettings = function (settings) {
        settings.invalid = false;
        apiService.settings.updateMultiple(settings).then(function () {
            window.location.reload();
            alertify.success('Settings saved.');
          })
      };


      $scope.validateSettings = function (settings) {
        if($scope.loading === true){
          return
        }

        $scope.changeValue(settings);
        $scope.loading = true;

        apiService.settings.validateSettings(settings).then(function (response) {
            var data = response.data;
            alertify.success(data.message || 'validation successful');
            settings.valid = true;
            $scope.loading = false;
          }, function (response) {
          var data = response.data;
            alertify.error(data.message);
            settings.invalid = true;
            $scope.loading = false;
          });
      };

      $scope.changeValue = function (settings) {
        if(settings.validationRequired === false){
          settings.valid = true;
          settings.invalid = false;
        }else{
          settings.valid = undefined;
          settings.invalid = undefined;
          settings.dirty = settings.value;
        }
      };


      $scope.uploadStatus = {};
      $scope.upload = function (setting, files) {
        //check if upload dir is set
        apiService.settings.list().then(function (response) {
          var data = response.data;
          var uploadDir = _.find(data, {settingsKey: 'Upload Directory'});
          if (uploadDir.value) {
            //do upload
            uploadService.doUpload($scope.uploadStatus, 'file/upload.json?isPublic=true', function (data) {
              $scope.uploadStatus.percentage = null;
              if(data.error) return;

              setting.value = "upload:" + data.id;
              $scope.getAssetFromSetting(setting);
            }, function () {}, files);
          }else{
            alertify.error("You have to set and save Upload Directory first");
          }
        });
      };

      $scope.getAssetFromSetting = function (setting) {
        if(typeof setting === "undefined")return false;
        var assetURL = setting.value;

        if(assetURL !== setting.prevValue) {
          setting.prevValue = assetURL;

          if (assetURL.startsWith("upload:")) {

            var id = assetURL.split(":")[1];
            apiService.file.getURL(id).then(function (response) {
                setting.src = response.data.url;
                return true;
              });

          } else {
            setting.src = assetURL;
            return true;
          }

        }else{
          return true;
        }

      }

      $scope.anySettingsInvalid = function () {
        return _.find($scope.settings, function (setting) {
            return (setting.validationRequired !== false && (setting.invalid || (setting.dirty && !setting.valid) || (!setting.value && setting.required)));
       });
      };

      $scope.resetBaseURL = function (settings) {
        settings.value = 'http://localhost:8080';
        settings.valid = true;
      }


      function syncImages() {
        alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
        alertify.confirm("Are you sure, you want to sync all images? This might take a while. (check the server logs for status updates)", function (confirmed) {
          if(confirmed){
            $scope.bigLoading = true;
            apiService.theMovieDb.checkAndFixImageIntegrity().then(function () {
              $scope.bigLoading = false;
            });
          }
        });
      }
}]);

angular.module('streama').controller('settingsUserActivityCtrl', ['$scope', 'apiService', 'modalService', '$rootScope',
  function ($scope, apiService, modalService, $rootScope) {
    var MAX_PER_PAGE = 10;
    var vm = this;
    vm.currentOffset = 0;
    vm.loading = true;
    vm.maxPerPage = MAX_PER_PAGE;
    vm.userIdFilter = null;
    vm.currentType = 'login';
    vm.currentSort = 'dateCreated';
    vm.sortOptions = [
      {key: 'lastUpdated', label: 'Last Updated'},
      {key: 'dateCreated', label: 'Date Created'},
      {key: 'ipAddress', label: 'IP Address'},
      {key: 'operatingSystem', label: 'Operating System'},
      {key: 'device', label: 'Device'},
      {key: 'browser', label: 'Browser'}
    ];
    vm.changeType = changeType;
    vm.filter = {
      user: null
    };

    vm.onUserSelect = onUserSelect;
    vm.onSortChange = onSortChange;

    vm.pagination = {
      currentPage: 1,
      onChange: function () {
        loadList();
      }
    };

    init();

    function init() {
      loadList();

      apiService.user.list().then(function (data) {
        vm.users = data.data;
        vm.loading = false;
      });
    }

    function changeType(type) {
      vm.currentType = type;
      loadList();
    }

    function onUserSelect() {
      loadList();
    }

    function onSortChange() {
      loadList();
    }

    function loadList() {
      apiService.userActivity.list({
        offset: getOffset(),
        max: MAX_PER_PAGE,
        userId: _.get(vm.filter, 'user.id'),
        type: vm.currentType,
        sort: vm.currentSort
      }).then(function (data) {
        vm.userActivity = data.data;
      });
    }

    function getOffset() {
      return vm.pagination.currentPage === 1 ? 0 : (vm.pagination.currentPage - 1) * MAX_PER_PAGE;
    }


  }]);



angular.module('streama').controller('settingsUsersCtrl', ['$scope', 'apiService', 'modalService', '$rootScope', function ($scope, apiService, modalService, $rootScope) {
	$scope.loading = true;

	apiService.user.list().then(function (response) {
    var data = response.data;
		$scope.users = data;
		$scope.loading = false;

	});

  $scope.openUserEditModal = function (user) {
    modalService.openUserEditModal(user, function (data) {
      if(!_.find($scope.users, {id: data.id})){
        $scope.users.push(data);
      }else{

        var index = $scope.users.indexOf(user);
        $scope.users[index] = data;

        if(data.id != $rootScope.currentUser.id){
          alertify.alert('If you made any changes to the roles, please make sure to inform the user that he has to log out of the application and log back in for the changes to take effect.');
        }else{
          alertify.alert('If you made any changes to the roles, please log out of the application and log back in for the changes to take effect.');
        }
      }
    });
  };

  $scope.openUserCreateModal = function (user) {
    if(user==null){
      user = {}
      user.language = "en";
    }
    modalService.userCreateModal(user, function (data) {
      if(!_.find($scope.users, {id: data.id})){
        $scope.users.push(data);
      }else{

        var index = $scope.users.indexOf(user);
        $scope.users[index] = data;

        if(data.id != $rootScope.currentUser.id){
          alertify.alert('If you made any changes to the roles, please make sure to inform the user that he has to log out of the application and log back in for the changes to take effect.');
        }else{
          alertify.alert('If you made any changes to the roles, please log out of the application and log back in for the changes to take effect.');
        }
      }
    });
  };

	$scope.openUserInviteModal = function (user) {
		modalService.userInviteModal(user, function (data) {
			if(!_.find($scope.users, {id: data.id})){
				$scope.users.push(data);
			}else{

        var index = $scope.users.indexOf(user);
        $scope.users[index] = data;

        if(data.id != $rootScope.currentUser.id){
          alertify.alert('If you made any changes to the roles, please make sure to inform the user that he has to log out of the application and log back in for the changes to take effect.');
        }else{
          alertify.alert('If you made any changes to the roles, please log out of the application and log back in for the changes to take effect.');
        }
      }
		});
	};

	$scope.delete = function (user) {
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm('Are you sure you want to delete ' + user.username + '?', function (confirmed) {
			if(confirmed){
				apiService.user.delete(user.id).then(function (data) {
          _.remove($scope.users, {id: user.id})
				});
			}
		})
	};

	$scope.isAdmin = function (user) {
		return _.find(user.authorities, {authority: 'ROLE_ADMIN'});
	};

	$scope.isContentManager = function (user) {
		return _.find(user.authorities, {authority: 'ROLE_CONTENT_MANAGER'});
	};

  $scope.isTrustedUser = function (user) {
    return _.find(user.authorities, {authority: 'ROLE_TRUSTED_USER'});
  };

}]);

'use strict';

angular.module('streama').controller('subProfilesCtrl',
  ["$scope", "apiService", "$rootScope", "userService", "localStorageService", "$state", "profileService", function ($scope, apiService, $rootScope, userService, localStorageService, $state, profileService) {

    $scope.profile = {
      profileName: '',
      profileLanguage: 'en',
      isChild: false,
      avatarColor: '0b74b2'
    };
    $scope.standardColor = '0b74b2';
    $scope.existingProfiles = [];
    $scope.loading = true;
    $scope.isManageProfiles = false;
    $scope.isEditProfile = false;
    $scope.isCreateProfile = false;
    $scope.availableColors = [
      '0b74b2','ba1c56','099166','d1b805','c03da7',
      '488f16','d36e10','4b4b4b','3a328b','b81f1f'
    ];

    profileService.getUserProfiles().then(
      function(data) {
        $scope.existingProfiles = data.data;
      }
    );
    $scope.setCurrentProfile = profileService.setCurrentProfile;

    $scope.setProfileColor = function(color){
      $scope.profile.avatarColor = color;
    };

    $scope.toggleManageProfiles = function(){
      $scope.isManageProfiles = !$scope.isManageProfiles;
    };

    $scope.goToEditProfile = function(profile){
      $scope.isEditProfile = !$scope.isEditProfile;
      $scope.profile = profile;
    };

    $scope.goToCreateProfile = function(){
      $scope.isCreateProfile = !$scope.isCreateProfile;
      $scope.profile = {
        profileName: '',
        profileLanguage: 'en',
        isChild: false,
        avatarColor: '0b74b2'
      }
    };

    $scope.deleteProfile = function(){
      if($scope.existingProfiles.length === 1){
        alertify.error("You must have at least ONE profile!");
        return;
      }
      if($scope.profile.id === profileService.getCurrentProfile().id){
        alertify.error("You currently use this profile! Change profile first");
        return;
      }
      if(!$scope.profile.id){
        return;
      }
      apiService.profile.delete($scope.profile.id).then(function () {
          alertify.success('Profile Deleted!');
          $scope.getAllProfiles();
          $scope.loading = false;
          $scope.refreshStates();
        }, function (data) {
          alertify.error(data.message);
          $scope.loading = false;
        });
    };

    $scope.refreshStates = function(){
      $scope.isEditProfile = false;
      $scope.isCreateProfile = false;
    };

    $scope.saveProfile = function(){
      if (!$scope.profile.profileName) {
        return;
      }
      var saveProfileEndpoint;
      if ($scope.profile.id) {
        saveProfileEndpoint = apiService.profile.update;
      }else {
        saveProfileEndpoint = apiService.profile.save;
      }
      saveProfileEndpoint($scope.profile).then(function () {
          alertify.success($scope.profile.id ? 'Profile Updated!' : 'Profile Created!');
          $scope.getAllProfiles();
          $scope.loading = false;
          $rootScope.$broadcast('streama.profiles.onChange');
        }, function (data) {
          alertify.error(data.message);
          $scope.loading = false;
        });
    };

    $scope.getAllProfiles = function () {
      apiService.profile.getUserProfiles().then(function (data) {
          $scope.existingProfiles = data.data;
          $scope.refreshStates();
        }, function (data) {
          alertify.error(data.message);
          $scope.loading = false;
        });
    };

    $scope.showPreviewProfiles = function() {
      return !$scope.isManageProfiles && !($scope.isEditProfile || $scope.isCreateProfile);
    };

    $scope.showEditProfiles = function() {
      return $scope.isManageProfiles && !($scope.isEditProfile || $scope.isCreateProfile);
    }
  }]);

'use strict';

angular.module('streama').controller('userSettingsCtrl', ["$scope", "apiService", "$rootScope", "userService", function ($scope, apiService, $rootScope, userService) {
  $scope.user = angular.copy($rootScope.currentUser);
  $scope.loading = true;
  $scope.passwordData = {};
  $scope.passwordsInvalid = true;
  $scope.languages = true;


  apiService.theMovieDb.availableGenres().then(function (response) {
    var data = response.data;
    $scope.availableGenres = data;
    $scope.loading = false;
  });

  $scope.toggleSelectGenre = function (genre) {
    $scope.user.favoriteGenres = _.xorBy($scope.user.favoriteGenres, [genre], 'apiId');
    $scope.profileForm.$setDirty();
  };

  $scope.isGenreSelected = function (genre) {
    return _.find($scope.user.favoriteGenres, {apiId: genre.apiId});
  };

  $scope.saveProfile = function () {
    $scope.loading = true;
    apiService.user.saveProfile($scope.user).then(function (response) {
      var data = response.data;
        $scope.loading = false;
        userService.setCurrentUser(data);
        alertify.success('Your profile was successfully saved.');
        $scope.profileForm.$setPristine();
      }, function () {
        $scope.loading = false;
      });
  };

  $scope.toggleChangePassword = function () {
    $scope.changePasswordIsActive = !$scope.changePasswordIsActive;
  };

  $scope.validatePasswords = function () {
    if($scope.passwordData.newPassword != $scope.passwordData.repeatPassword || $scope.passwordData.newPassword.length < 6){
      $scope.passwordsInvalid = true;
    }else{
      $scope.passwordsInvalid = false;
    }
  };

  $scope.saveNewPassword = function () {
    $scope.loading = true;

    apiService.user.changePassword($scope.passwordData).then(function () {
        alertify.success('Password was successfully changed.');
        $scope.passwordData = {};
        $scope.passwordsInvalid = true;
        $scope.toggleChangePassword();
        $scope.loading = false;
      }, function (data) {
        alertify.error(data.message);
        $scope.loading = false;
      });
  };

}]);

'use strict';

angular.module('streama').directive('adminEpisode', [
	'uploadService', 'modalService', 'apiService', '$stateParams', function (uploadService, modalService, apiService, $stateParams) {
	return {
		restrict: 'AE',
		templateUrl: '/streama/directive--admin-episode.htm',
		scope: {
			episode: '='
		},
		link: function ($scope, $elem, $attrs) {
			$scope.uploadStatus = {};

      addHighlighting();

      $scope.reportsForEpisode= function () {
        apiService.report.reportsById($scope.episode.id).then(function (response) {
          $scope.episode.reportCount = response.data.reportCount;
        });
      }();


      $scope.editEpisode = function(episode){
				modalService.videoModal(episode, null, null, function (data) {
					if(data.deleted){
						episode.deleted = true;
					}
				});
			};


			$scope.openFileBrowser = function(){
				modalService.openFileBrowser(function (file) {
					apiService.video.addFile($scope.episode.id, file.id).then(function () {
						$scope.episode.videoFiles = $scope.episode.videoFiles || [];
						$scope.episode.videoFiles.push(file);
					});
				});
			};


			$scope.manageFiles = function(episode){
				modalService.fileManagerModal(episode);
			};


      var uploadUrl = 'video/uploadFile.json?id=' + $scope.episode.id;
      $scope.upload = uploadService.doUpload.bind(uploadService, $scope.uploadStatus, uploadUrl, uploadSuccess, uploadError);

      function uploadSuccess (data) {
        $scope.uploadStatus.percentage = null;
        $scope.episode.videoFiles = $scope.episode.videoFiles || [];
        $scope.episode.videoFiles.push(data);
      }

      function uploadError(err) {
        //TODO remove upload-overlay on error
      }

      function addHighlighting() {
        if (parseInt($stateParams.episodeId) === $scope.episode.id) {
          setTimeout(function () {
            var HEADER_HEIGHT = 55;
            var offsetTop = $elem.find('.media-list-item').offset().top;
            jQuery('.admin-content').scrollTop(offsetTop - HEADER_HEIGHT);
            $elem.addClass('highlight');
          }, 400);

          setTimeout(function () {
            $elem.removeClass('highlight');
          }, 2000);
        }
      }
		}
	}
}]);

(function(){
'use strict';
//= wrapped


angular.module('streama')
  .directive('streamaHeaderDirective', streamaHeaderDirective);

function streamaHeaderDirective($window) {
  return {
    restrict: 'A',
    scope: {},
    link: function ($scope, $elem, $attrs) {
      angular.element($window).bind('scroll', function () {
        if($window.pageYOffset > 0){
          $elem.css({'background': 'rgb(20, 20, 20)'});
        }else{
          $elem.css({'background': 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))'});
        }
      });
    }
  }
}
streamaHeaderDirective.$inject = ["$window"];;
})();
(function(){
'use strict';
//= wrapped

angular.module('streama').directive('streamaProgressBar', function () {
  return {
    restrict: 'E',
    templateUrl: '/streama/directive--streama-progress-bar.htm',
    scope: {
      video: '=',
      hideTime: '@'
    },
    link: function ($scope, $elem, $attrs) {
      // $scope.videoObject = angular.merge({}, $scope.video);
      // $scope.videoObject.currentPlayTime = $scope.video.currentPlayTime || $scope.runtime;
      // $scope.videoObject.runtime = $scope.video.runtime || $scope.total;
    }
  }
});
})();
(function(){
'use strict';
//= wrapped

angular.module('streama').directive('streamaVideoImage', ["uploadService", "modalService", "apiService", "$stateParams", function (uploadService, modalService, apiService, $stateParams) {
  return {
    restrict: 'E',
    templateUrl: '/streama/directive--streama-video-image.htm',
    scope: {
      video: '=',
      type: '@',
      size: '@'
    },
    link: function ($scope, $elem, $attrs) {

    }
  }
}]);
})();
'use strict';

angular.module('streama').directive('streamaVideoPlayer', [
  'uploadService', 'apiService', 'localStorageService', '$timeout', 'playerService', '$http', '$sce', 'modalService',
  function (uploadService, apiService, localStorageService, $timeout, playerService, $http, $sce, modalService) {

    return {
      restrict: 'AE',
      templateUrl: '/streama/streama-video-player.htm',
      scope: {
        options: '='
      },

      link: function ($scope, $elem, $attrs) {
        var video;
        var controlDisplayTimeout;
        var overlayTimeout;
        var volumeChangeTimeout;
        var currentTimeChangeTimeout;
        var isTimeScrubbingActive = false;
        var currEpisode = null;
        var skippingDuration = 20;  //Skipping duration for holding an arrow key to left or right.
        var longSkippingDuration = 60; //Skipping duration for holding ctrl + arrow key.
        var END_OF_VIDEO = 30;
        var skipIntro = true;         //Userflag intro should be skipped
        var minimizeOnOutro = true;   //Userflag skip to next episode on outro
        var videoSrc = $scope.options.videoSrc.toString();

        $scope.showControls = showControls;
        $scope.toggleSelectEpisodes = toggleSelectEpisodes;
        $scope.createNewPlayerSession = createNewPlayerSession;
        $scope.openPlaybackOptions = openPlaybackOptions;
        $scope.toggleTextTrack = toggleTextTrack;
        $scope.selectSubtitle = selectSubtitle;
        $scope.changeSubtitle = changeSubtitle;
        $scope.hideSubtitle = hideSubtitle;
        $scope.playerVolumeToggle = playerVolumeToggle;
        $scope.play = play;
        $scope.pause = pause;
        $scope.skip = skip;
        $scope.closeVideo = closeVideo;
        $scope.clickVideo = clickVideo;
        $scope.fullScreen = toggleFullScreen;
        $scope.getCustomSubtitleSize = getCustomSubtitleSize;
        $scope.next = $scope.options.onNext;
        $scope.isInitialized = false;
        $scope.isNextVideoShowing = false;
        $scope.loading = true;
        $scope.initialPlay = false;

        if (!$scope.options.isExternalLink) {
          $http.head(videoSrc)
            .then(function () {
              initDirective();
            },
              function (data, status) {
              if (status == 406) {
                $scope.options.onError('FILE_IN_FS_NOT_FOUND');
              }
            });
        } else {
          initDirective();
        }

        function initDirective() {
          $scope.isInitialized = true;

          $elem.addClass('nocursor');

          initMouseWheel();
          initMousetrap();
          initExternalTriggers();
          initIsMobile();


          $scope.$on('$destroy', onDirectiveDestroy);
          $scope.$on('$stateChangeSuccess', onStateChangeSuccess);

          $timeout(function () {
            var $video = $elem.find('video');
            $video.bind("contextmenu", function () {
              return false;
            });
            video = $video[0];
            video.oncanplay = oncanplay;
            video.onwaiting = onwaiting;
            video.onplaying = onplaying;
            video.onerror = onerror;
            video.ontimeupdate = ontimeupdate;
            video.addEventListener('ended', onVideoEnded);
            $scope.scrubberOptions = generateScrupperOoptions();
            $scope.volumeScrubberOptions = generateVolumeScrubberOptions();
            $scope.volumeLevel = localStorageService.get('volumeLevel') || 5;
            setVolume($scope.volumeLevel);
            var selectedSubtitleLanguage = localStorageService.get('selectedSubtitleLanguage');

            if (selectedSubtitleLanguage) {
              var selectedSubtitle = _.find($scope.options.subtitles, {subtitleSrcLang: selectedSubtitleLanguage});
              changeSubtitle(selectedSubtitle);
            }
            var savedVideoFileLabel = localStorageService.get('selectedVideoFile');
            if (savedVideoFileLabel) {
              var selectedVideoFile = _.find($scope.options.videoFiles, {label: savedVideoFileLabel});
              changeVideoFile(selectedVideoFile);
            }
            //Autoloads sub#0 if the setting is true on Admin>Settings, and if the subtitle exists (by Norwelian)
            var sub_auto_load_value = false;
            apiService.settings.list().then(function(data){
                data['data'].forEach(function callback(currentValue, index, array) {
                    if(currentValue.name == "subtitle_auto_load")
                        sub_auto_load_value = currentValue.parsedValue;
                });
                if(sub_auto_load_value && $scope.options.subtitles){
                    hideSubtitle();
                    changeSubtitle($scope.options.subtitles[0]);
                }
            });

            $scope.options.subtitleSize = localStorageService.get('subtitleSize') || 'md';
            $scope.options.hasCustomSubtitleSize = localStorageService.get('hasCustomSubtitleSize') || false;
            $scope.options.customSubtitleSize = localStorageService.get('customSubtitleSize') || null;
          });
        }

        //$scope.controlsVisible = true;
        function showControls() {
          $elem.removeClass('nocursor');
          $timeout.cancel(controlDisplayTimeout);
          $timeout.cancel(overlayTimeout);
          $scope.controlsVisible = true;
          $scope.overlayVisible = false;


          controlDisplayTimeout = $timeout(function () {
            $scope.controlsVisible = false;

            if (!$scope.playing) {
              overlayTimeout = $timeout(function () {
                if (!$scope.playing) {
                  $scope.overlayVisible = true;
                }
              }, 5000);
            } else {
              $elem.addClass('nocursor');
            }

          }, 1000);
        }

        function generateScrupperOoptions() {
          return {
            orientation: 'horizontal',
            min: 0,
            max: 255,
            range: 'min',
            change: function (e, slider) {
              angular.element('#playerDurationSlider .ui-slider-handle').blur();
            },
            start: function () {
              isTimeScrubbingActive = true;
            },
            stop: function (e, slider) {
              isTimeScrubbingActive = false;
              angular.element('#playerDurationSlider .ui-slider-handle').blur();
              video.currentTime = slider.value;
              $scope.currentTime = slider.value;
              $scope.options.onTimeChange(slider, $scope.videoDuration);

            }
          };
        }

        function generateVolumeScrubberOptions() {
          return {
            orientation: 'vertical',
            range: 'min',
            change: function (e, slider) {
              setVolume(slider.value);
              angular.element('#playerVolumeSlider .ui-slider-handle').blur();
            },
            slide: function (e, slider) {
              setVolume(slider.value);
              angular.element('#playerVolumeSlider .ui-slider-handle').blur();
            }
          };
        }

        function closeVideo() {

          //If full screen is enabled, it will be canceled.
          if ($scope.isFullScreen == true) {
            $scope.fullScreen();
          }

          $scope.options.onClose();
        }

        function clickVideo() {
          $scope.options.onVideoClick();
        }

        function getCustomSubtitleSize() {
          return $scope.options.hasCustomSubtitleSize ? $scope.options.customSubtitleSize : null;
        }

        function toggleFullScreen() {
          var docElm;
          var docElmClose = document;
          if ($scope.isMobile) {
            docElm = video;
          } else {
            docElm = document.documentElement;
          }
          var isFullScreen = window.innerHeight == screen.height;
          if (!isFullScreen) {
            $scope.isFullScreen = true;
            if (docElm.requestFullscreen) {
              docElm.requestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
              docElm.mozRequestFullScreen();
            } else if (docElm.webkitRequestFullScreen) {
              docElm.webkitRequestFullScreen();
            } else if (docElm.msRequestFullscreen) {
              docElm.msRequestFullscreen();
            }
          } else {
            $scope.isFullScreen = false;
            if (docElmClose.exitFullscreen) {
              docElmClose.exitFullscreen();
            } else if (docElmClose.mozCancelFullScreen) {
              docElmClose.mozCancelFullScreen();
            } else if (docElmClose.webkitExitFullscreen) {
              docElmClose.webkitExitFullscreen();
            } else if (docElmClose.msExitFullscreen) {
              docElmClose.msExitFullscreen();
            }
          }
        }

        function setVolume(value) {
          video.volume = value / 10;
          if ($scope.options.rememberVolumeSetting) {
            localStorageService.set('volumeLevel', $scope.volumeLevel);
          }
        }

        function playerVolumeToggle() {
          if ($scope.volumeLevel == 0) {
            $scope.volumeLevel = 5;
          } else {
            $scope.volumeLevel = 0;
          }
        }

        function initExternalTriggers() {
          $scope.$on('triggerVideoPlay', function (e, data) {
            $scope.play(data);
          });
          $scope.$on('triggerVideoPause', function (e, data) {
            $scope.pause(data);
          });
          $scope.$on('triggerVideoToggle', function (e, data) {
            if ($scope.playing) {
              $scope.pause(data);
            } else {
              $scope.play(data);
            }
          });
          $scope.$on('triggerVideoTimeChange', function (e, data) {
            video.currentTime = data.currentPlayerTime;
            $scope.currentTime = data.currentPlayerTime;
          });
        }

        function onStateChangeSuccess(e, toState) {
          if (toState.name != "player") {
            //If full screen is enabled, it will be canceled.
            if ($scope.isFullScreen = true) {
              $scope.fullScreen();
            }
          }
        }

        function onDirectiveDestroy() {

          //Disable these shortcut keys for other pages. They are re-initialized when the user opens the player again.
          Mousetrap.reset();

          console.log("destroy");
          video.pause();
          video.src = '';
          $elem.find('video').children('source').prop('src', '');
          $elem.find('video').remove().length = 0;
        }

        function ontimeupdate(event) {
          if (isTimeScrubbingActive) {
            return;
          }
          $scope.currentTime = video.currentTime;
          determineNextVideoShowing();
          $scope.$apply();

          if (skipIntro) {
            if (currEpisode == null) {
              currEpisode = playerService.getVideoOptions().currentEpisode;
            }
            if (currEpisode.intro_start < this.currentTime && this.currentTime < currEpisode.intro_end) {
              video.currentTime = currEpisode.intro_end;
            }
          }
        }

        function determineNextVideoShowing() {
          var videoOutroStart = $scope.options.outro_start;
          var nextVideoId = _.get($scope.options, 'nextVideo.id');
          if (videoOutroStart) {
            $scope.isNextVideoShowing = (nextVideoId && video.currentTime > videoOutroStart);
          } else {
            var remainingDurationSeconds = video.duration - video.currentTime;
            $scope.isNextVideoShowing = (nextVideoId && remainingDurationSeconds < END_OF_VIDEO);
          }
        }

        function onVideoEnded() {
          if ($scope.options.showNextButton && $scope.options.isAutoplayNextActive) {
            $scope.options.onNext();
          }
        }

        function onerror() {
          if (!video.duration && !$scope.initialPlay) {
            $scope.options.onError();
          }
        }

        function onplaying() {
          $scope.loading = false;
        }

        function oncanplay() {
          if (!$scope.initialPlay) {
            $scope.canplay = true;
            console.log('%c oncanplay', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
            $scope.loading = false;
            if (!$scope.isMobile) {
              $scope.play();
            } else {
              $scope.pause();
            }
            $scope.videoDuration = video.duration;
            video.currentTime = $scope.options.customStartingTime || 0;
            $scope.currentTime = video.currentTime;
            $scope.initialPlay = true;
            if ($scope.options.videoTrack) {
              video.textTracks[0].mode = "hidden";
            }
          }
        }

        function onwaiting() {
          $scope.loading = true;
        }

        function toggleSelectEpisodes(episodes) {
          $scope.options.selectedEpisodes = episodes;
        }

        function pause(socketData) {
          video.pause();
          $scope.playing = false;
          $scope.options.onPause(video, socketData);
        }

        function play(socketData) {
          video.play();
          $scope.playing = true;
          $scope.options.onPlay(video, socketData);
          $scope.overlayVisible = false;
        }

        function createNewPlayerSession() {
          $scope.options.onSocketSessionCreate();
        }

        //bei hidden wirklich alle verstecken, und bei showing nur den anzeigen, der auch wirklich angezeigt werden soll, nicht immer index 0
        function toggleTextTrack() {
          $scope.isTextTrackVisible = !$scope.isTextTrackVisible;

          if ($scope.isTextTrackVisible) {
            _.forEach(video.textTracks, function (value, key) {
              if ($scope.selectedLanguage) {
                if (value.language === $scope.selectedLanguage) {
                  value.mode = 'showing';
                }
              } else {
                video.textTracks[0].mode = 'showing';
              }
            });
          } else {
            _.forEach(video.textTracks, function (value, key) {
              value.mode = 'hidden';
            });
          }
        }

        function selectSubtitle() {
          $scope.multipleSubtitleBrowser = !$scope.multipleSubtitleBrowser;
        }

        function hideSubtitle() {
          _.forEach(video.textTracks, function (value, key) {
            value.mode = 'hidden';
          });
          $scope.selectedSubtitleId = null;
          $scope.selectedLanguage = null;

        }

        function changeSubtitle(subtitle) {
          $scope.options.selectedSubtitle = subtitle;
          if(!subtitle){
            hideSubtitle();
            return;
          }
          _.forEach(video.textTracks, function (value, key) {
            if (value.id !== 'subtitle-' + subtitle.id) {
              value.mode = 'hidden';
            } else if (value.id === 'subtitle-' + subtitle.id) {
              value.mode = 'showing';
              $scope.selectedLanguage = value.language;
              $scope.selectedSubtitleId = subtitle.id;
              localStorageService.set('selectedSubtitleLanguage', value.language);
            }
          });
        }

        function changeVideoFile(videoFile, videoTime) {
          if(!videoFile){
            return;
          }
          if(videoTime){
            $scope.options.customStartingTime = videoTime;
          }
          $scope.initialPlay = false;
          $scope.options.selectedVideoFile = videoFile;
          $scope.options.videoSrc = $sce.trustAsResourceUrl(videoFile.src || videoFile.externalLink);
          $scope.options.originalFilename = videoFile.originalFilename;
          $scope.options.videoType = videoFile.contentType;
          localStorageService.set('selectedVideoFile', videoFile.label);
        }

        //Changes the video player's volume. Takes the changing amount as a parameter.
        function changeVolume(amount) {
          $scope.volumeChanged = true;
          $timeout.cancel(volumeChangeTimeout);
          //console.log('%c event', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', event);
          $scope.volumeLevel += amount;
          //console.log('%c event', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', event.deltaY, $scope.volumeLevel);
          $scope.volumeLevel = $scope.volumeLevel.clamp(0, 10);
          $scope.$apply();

          volumeChangeTimeout = $timeout(function () {
            $scope.volumeChanged = false;
          }, 1500);
        }

        function initIsMobile() {
          $scope.isMobile = false; //initiate as false
          // device detection
          if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
            $scope.isMobile = true;
          }
        }

        //Shows the video's current time and duration on the upper right corner of the screen for a limited time.
        function skipActivated() {

          $scope.currentTimeChanged = true;
          $scope.options.onTimeChange(video.currentTime, $scope.videoDuration);
          $timeout.cancel(currentTimeChangeTimeout);

          currentTimeChangeTimeout = $timeout(function () {
            $scope.currentTimeChanged = false;
          }, 10000);
        }


        function initMouseWheel() {
          var isMouseWheelVolumeCtrlActive = true;
          jQuery($elem).mousewheel(function (event) {
            if (!isMouseWheelVolumeCtrlActive) {
              return;
            }
            if (event.deltaY > 0) {
              changeVolume(1);
            } else if (event.deltaY < 0) {
              changeVolume(-1);
            }
            $scope.showControls();
          });
          var episodeSelector = document.querySelector('#player-menu-episode-selector');
          if (episodeSelector) {
            episodeSelector.addEventListener('mouseenter', function (event) {
              isMouseWheelVolumeCtrlActive = false;
            });
            episodeSelector.addEventListener('mouseleave', function (event) {
              isMouseWheelVolumeCtrlActive = true;
            });
          }
        }

        function openPlaybackOptions() {
          $scope.pause();
          modalService.openPlaybackOptions($scope.options).then(function (response) {
            $scope.play();
            if(!response){
              return;
            }

            $scope.options.hasCustomSubtitleSize = response.hasCustomSubtitleSize;
            $scope.options.customSubtitleSize = response.customSubtitleSize;
            $scope.options.subtitleSize = response.subtitleSize;
            localStorageService.set('subtitleSize', response.subtitleSize);
            localStorageService.set('hasCustomSubtitleSize', response.hasCustomSubtitleSize);
            localStorageService.set('customSubtitleSize', response.customSubtitleSize);

            if(!_.isEqualBy(response.selectedVideoFile, $scope.options.selectedVideoFile, 'id')){
              changeVideoFile(response.selectedVideoFile, video.currentTime);
            }
            if(!_.isEqualBy(response.selectedSubtitle, $scope.options.selectedSubtitle, 'id')){
              changeSubtitle(response.selectedSubtitle);
            }
          });
        }

        function initMousetrap() {
          //Shortcuts:
          Mousetrap.bind('left', function (event) {
            event.preventDefault();
            skipActivated();
            $scope.$apply();
            video.currentTime -= skippingDuration;
          }, 'keyup');

          Mousetrap.bind('right', function (event) {
            event.preventDefault();
            skipActivated();
            $scope.$apply();
            video.currentTime += skippingDuration;
          }, 'keyup');

          Mousetrap.bind('ctrl+right', function (event) {
            event.preventDefault();
            skipActivated();
            $scope.$apply();
            video.currentTime += longSkippingDuration;
          }, 'keyup');

          Mousetrap.bind('ctrl+left', function (event) {
            event.preventDefault();
            skipActivated();
            $scope.$apply();
            video.currentTime -= longSkippingDuration;
          }, 'keyup');

          Mousetrap.bind('alt+enter', function (event) {
            event.preventDefault();
            $scope.fullScreen();
          });

          Mousetrap.bind(['backspace', 'del'], function (event) {
            event.preventDefault();
            $scope.closeVideo();
          });

          Mousetrap.bind('s', function (event) {
            event.preventDefault();
            $scope.toggleTextTrack();
          });

          Mousetrap.bind('up', function (event) {
            event.preventDefault();
            changeVolume(1);
          });

          Mousetrap.bind('down', function (event) {
            event.preventDefault();
            changeVolume(-1);
          });

          Mousetrap.bind('m', function (event) {
            event.preventDefault();
            $scope.playerVolumeToggle();
            $scope.showControls();
          });

          Mousetrap.bind('e', function (event) {
            event.preventDefault();
            $scope.toggleSelectEpisodes();
            $scope.showControls();
          });

          Mousetrap.bind('space', function () {
            if ($scope.playing) {
              $scope.pause();
            } else {
              $scope.play();
            }
            $scope.$apply();
          });
        }

        function skip(direction, seconds) {
          skipActivated();

          if(direction === 'rewind'){
            video.currentTime -= seconds;
          }
          if(direction === 'fastForward'){
            video.currentTime += seconds;
          }
        }


      }
    }
  }]);

(function(){
'use strict';
//= wrapped

angular.module('streama')
  .directive('streamaWysiwyg', function () {
  return {
    require: 'ngModel',
    restrict: 'E',
    template: '<div class="quill-editor"></div>',
    scope: {
    },
    link: function ($scope, $elem, $attrs, $ctrl) {

      var toolbarOptions = [
        ['bold', 'italic', 'underline'],        // toggled buttons
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']                                         // remove formatting button
      ];

      $ctrl.$render = render;
      var quill = new Quill($elem[0], {
        theme: 'bubble',
        modules: {
          toolbar: toolbarOptions
        }
      });
      quill.on('text-change', onTextChange);

      function onTextChange(delta, oldDelta, source) {
        $ctrl.$setViewValue(quill.root.innerHTML);
      }

      function render() {
        quill.root.innerHTML = $ctrl.$modelValue;
      }
    }
  }
});
})();
'use strict';

angular.module('streama').directive('videoSortOrderDropdown', [function () {
		return {
		  require: 'ngModel',
			restrict: 'AE',
			templateUrl: '/streama/directive--video-sort-order-dropdown.htm',
			scope: {
				dropdownType: '='
			},
			link: function ($scope, $elem, $attrs, $controller) {

        $controller.$formatters.push(formatter);

				$scope.sortOrders = [];

				if($scope.dropdownType == 'movie'){
					$scope.sortOrders = $scope.sortOrders.concat([
						{sort: 'title', order: 'ASC', label: 'SORT_OPTIONS.AZ'},
						{sort: 'title', order: 'DESC', label: 'SORT_OPTIONS.ZA'},
						{sort: 'release_date', order: 'DESC', label: 'SORT_OPTIONS.NEWEST_RELEASED'},
						{sort: 'release_date', order: 'ASC', label: 'SORT_OPTIONS.OLDEST_RELEASED'},
            {sort: 'dateCreated', order: 'DESC', label: 'SORT_OPTIONS.NEWEST_ADDED'},
            {sort: 'dateCreated', order: 'ASC', label: 'SORT_OPTIONS.OLDEST_ADDED'}
					])
				}

				if($scope.dropdownType == 'tvShow'){
					$scope.sortOrders = $scope.sortOrders.concat([
						{sort: 'name', order: 'ASC', label: 'SORT_OPTIONS.AZ'},
						{sort: 'name', order: 'DESC', label: 'SORT_OPTIONS.ZA'},
						{sort: 'first_air_date', order: 'DESC', label: 'SORT_OPTIONS.NEWEST_AIRED'},
						{sort: 'first_air_date', order: 'ASC', label: 'SORT_OPTIONS.OLDEST_AIRED'},
            {sort: 'dateCreated', order: 'DESC', label: 'SORT_OPTIONS.NEWEST_ADDED'},
            {sort: 'dateCreated', order: 'ASC', label: 'SORT_OPTIONS.OLDEST_ADDED'}
					])
				}

				if($scope.dropdownType == 'report'){
					$scope.sortOrders = $scope.sortOrders.concat([
						{sort: 'dateCreated', order: 'DESC',label: 'SORT_OPTIONS.NEWEST_REPORTED'},
						{sort: 'dateCreated', order: 'ASC', label: 'SORT_OPTIONS.OLDEST_REPORTED'},
						{sort: 'lastUpdated', order: 'DESC', label: 'SORT_OPTIONS.NEWEST_UPDATED'},
						{sort: 'lastUpdated', order: 'ASC', label: 'SORT_OPTIONS.OLDEST_UPDATED'}
					]);
				}

        if($scope.dropdownType == 'watchlist'){
          $scope.sortOrders = $scope.sortOrders.concat([
            {sort: 'id', order: 'DESC', label: 'SORT_OPTIONS.NEWEST_ADDED'},
            {sort: 'id', order: 'ASC', label: 'SORT_OPTIONS.OLDEST_ADDED'}
          ])
        }


        function formatter(value) {

          $scope.currentSort = _.find($scope.sortOrders, value) || $scope.sortOrders[0];
        }

				$scope.setCurrentSort = function (sortOrder) {
          $scope.currentSort = sortOrder;
          $controller.$setViewValue(sortOrder);
				};

			}
		}
	}]);

'use strict';

/** Directive for formatting from mm:ss to int and back */
angular.module('streama').directive("videoTimeFormat", function(){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelController) {
      var _timeInSeconds;

      //view to model
      ngModelController.$parsers.push(function(data) {
        var timeSegments = data.split(":");
        var hours = timeSegments.length >= 3 ? timeSegments[timeSegments.length - 3]: 0;
        var minutes = timeSegments.length >= 2 ? timeSegments[timeSegments.length - 2] : 0;
        var seconds = timeSegments[timeSegments.length - 1];
        _timeInSeconds = hours*3600 + minutes*60 + seconds*1;
        return _timeInSeconds;
      });


      //model to view
      ngModelController.$formatters.push(function(timeInSeconds) {
        if(timeInSeconds == undefined)
        {
          return '';
        }
        return getViewValue(timeInSeconds);
      });


      function getViewValue(timeInSeconds) {
        _timeInSeconds = timeInSeconds;
        var remainingTime = timeInSeconds;
        var hours = Math.floor(timeInSeconds / 3600);
        remainingTime = remainingTime % 3600;
        var minutes = Math.floor(remainingTime / 60);
        var seconds = remainingTime % 60;
        var viewValue = _.padStart(hours, 2, '0')  + ':' + _.padStart(minutes, 2, '0') + ':' + _.padStart(seconds, 2, '0');
        return viewValue;
      }

      element.blur(function (event) {
        ngModelController.$processModelValue();
      });
    }
  };
});

angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/admin-fileManager.htm', '<div class="row"> <div class="col-md-6"> <h1> File Manager </h1> </div> </div> <div class="row"> <div class="col-md-12"> <div class="btn-group"> <button class="btn btn-default btn-sm" ng-class="{\'btn-primary\': listFilter== \'all\'}" ng-click="refreshList(\'all\')"> All </button> <button class="btn btn-default btn-sm" ng-class="{\'btn-primary\': listFilter== \'noVideos\'}" ng-click="refreshList(\'noVideos\')"> Only Non-Associated Files </button> <button class="btn btn-default btn-sm" ng-class="{\'btn-primary\': listFilter== \'noFile\'}" ng-click="refreshList(\'noFile\')"> Only Files that don\'t exist on Hard-Drive </button> <button class="btn btn-default btn-sm" ng-class="{\'btn-primary\': listFilter== \'onlyFile\'}" ng-click="refreshList(\'onlyFile\')"> Files that only exist on Hard-Drive </button> </div> <button class="btn btn-danger btn-sm pull-right" ng-click="removeMultipleFiles()"> Delete Multiple Files </button> </div> </div> <div class="margin-top-10"> <div class="spinner big" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> <table class="table table-striped file-manager-table" ng-if="activeListDisplay == \'table\'"> <thead> <tr> <th></th> <th>Name</th> <th>Uploaded</th> <th>Content-Type</th> <th>File Exists?</th> <th>Associated with</th> <th></th> </tr> </thead> <tbody> <tr ng-repeat="file in files"> <td><input type="checkbox" ng-click="addOrRemoveFromSelection($event, file)"/></td> <td> <div><strong>{{file.originalFilename}}</strong></div> <div ng-if="file.src"><a href="{{file.src}}">{{file.src}}</a></div> <div ng-if="file.path"><strong>PATH: </strong>{{file.path}}</div> <div>{{file.sha256Hex}}</div> </td> <td>{{file.dateCreated}}</td> <td>{{file.contentType}}</td> <td>{{file.fileExists}}</td> <td> <div ng-repeat="video in file.videos"><img width="40px" ng-src="https://image.tmdb.org/t/p/w92/{{video.poster_path}}"/></div> <div class="fade-50" ng-if="!file.videos.length"> None </div> </td> <td style="padding: 6px;"> <button title="Delete file" class="btn btn-xs btn-danger" ng-click="removeFile(file)"><i class="ion-trash-a"></i></button> </td> </tr> </tbody> </table> <ul uib-pagination ng-if="filesCount> maxPerPage && files.length < filesCount" max-size="7" force-ellipses="true" boundary-links="true" total-items="filesCount" ng-model="pagination.currentPage" ng-change="pageChanged()"></ul> </div> <hr/>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/admin-movie.htm', '<ul class="breadcrumb"> <li><a ui-sref="admin.movies">Movies</a></li> <li class="active">{{movie.title}}</li> </ul> <div class="spinner big" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> <div class="movie-content" ng-show="movie.title" ngf-drop ngf-drag-over-class="manageFiles(movie)" ngf-change="upload($files)"> <div class="row"> <div class="col-md-8 col-lg-9"> <div class="row"> <div class="col-md-11"> <h1> {{movie.title}} &nbsp; <a ng-show="movie.hasFiles" class="ion-android-arrow-dropright-circle" ui-sref="player({videoId: movie.id})"></a> </h1> <span class="label label-danger" ng-click="manageFiles(movie)" ng-show="!movie.hasFiles"><i class="ion-alert-circled"></i> No Video File yet!</span> <a ui-sref="admin.reports" class="label label-danger" ng-show="movie.hasFiles && movie.reportCount"> <i class="ion-alert-circled"></i> <span ng-if="movie.reportCount == 1">1 Report!</span> <span ng-if="movie.reportCount> 1" >{{movie.reportCount}} Reports!</span> </a> </div> <div class="col-md-1"> <div class="btn-group pull-right"> <span uib-dropdown on-toggle="toggled(open)"> <i class="ion-ios-settings icon-xl" uib-dropdown-toggle></i> <ul class="dropdown-menu" uib-dropdown-menu aria-labelledby="simple-dropdown"> <li><a ng-click="openMovieModal()">Edit info</a></li> <li><a ng-click="manageFiles(movie)">Manage Files</a></li> <li><a ng-click="deleteMovie(movie)">Delete Movie</a></li> <li><a ng-click="addToCurrentNotification()">Add to Email-Notification</a></li> <li><a ng-click="highlightOnDashboard()">Highlight on Dashboard</a></li> </ul> </span> </div> </div> </div> <hr/> <div class="row"> <div class="col-sm-2"> <label>Release Date</label> <p class="data-display">{{movie.release_date}}</p> <p ng-show="!movie.release_date" class="data-display fade-50">-</p> </div> <div class="col-sm-2" ng-show="movie.imdb_id"> <label>IMDB Link</label> <p class="data-display"><a target="_blank" href="http://www.imdb.com/title/{{movie.imdb_id}}">{{movie.title}}</a></p> <p ng-show="!movie.imdb_id" class="data-display fade-50">-</p> </div> <div class="col-sm-2" ng-show="movie.vote_average"> <label>Rating</label> <p ng-show="movie.vote_average" class="data-display">{{movie.vote_average}}/10</p> </div> <div class="col-sm-2" ng-show="movie.vote_count"> <label>Rating Count</label> <p class="data-display">{{movie.vote_count}}</p> </div> </div> <br/> <div class="row"> <div class="col-sm-12"> <label>Overview</label> <p class="data-display">{{movie.overview}}</p> </div> <div class="col-sm-2" ng-if="movie.trailerKey"> <label>Trailer</label> <iframe width="560" height="315" ng-src="{{\'https://www.youtube.com/embed/\'+movie.trailerKey+\'?rel=0\' | trustResourceUrl}}" frameborder="0" allowfullscreen></iframe> </div> <div class="col-sm-12"> <label>Genre</label> <ul class="genre-list"> <li class="genre-tag interactive" ng-repeat="genre in movie.genre" ui-sref="dash({genreId: genre.id})"> {{genre.name}} </li> </ul> <p ng-show="!movie.genre.length" class="data-display fade-50">No genre added yet</p> </div> <div class="col-sm-12" ng-if="movie.trailer"> <label>Trailer</label> <br> <iframe width="560" height="315" ng-src="{{\'https://www.youtube.com/embed/\'+movie.trailerKey+\'?rel=0\' | trustResourceUrl}}" frameborder="0" allowfullscreen></iframe> </div> </div> <div class="row" ng-show="!movie.hasFiles"> <hr/> <button class="btn btn-danger btn-block btn-lg" ng-click="manageFiles(movie)"> <i class="ion-alert-circled"></i> No Video File yet! Drop file or click here to add </button> </div> </div> <div class="col-sm-4 col-lg-3"> <img ng-if="!movie.poster_path && !movie.poster_image_src" ng-src="{{basePath}}assets/poster-not-found.png"/> <img ng-if="movie.poster_path" ng-src="https://image.tmdb.org/t/p/w500/{{movie.poster_path}}"/> <img ng-if="movie.poster_image_src" ng-src="{{movie.poster_image_src}}"/> </div> </div> </div> <br/> <hr/> <div> <div class="spinner" ng-show="LoadingSimilar"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> </div> <div ng-show="movie.similarMovies"> <h3>Similar Movies</h3> <h5>Suggested by TheMovieDb.org</h5> <div class="media-list similar-media"> <div class="media-list-item" ng-repeat="movie in movie.similarMovies"> <div class="hover-overlay"> <div> <button class="btn btn-primary btn-sm btn-block" ng-click="addSimilarMovieToStreama(movie, true)">Add and Open</button> <button class="btn btn-primary btn-sm btn-block" ng-click="addSimilarMovieToStreama(movie, false)">Add and Continue</button> <button class="btn btn-primary btn-sm btn-block" ng-click="showDetails(movie)">Trailer & Details</button> </div> </div> <div class="media-item"> <img ng-src="https://image.tmdb.org/t/p/w300/{{movie.poster_path}}"/> </div> <div class="media-meta">Release: {{movie.release_date.substring(0, 4)}} | <i class="ion-ios-star"></i> {{movie.vote_average}}</div> </div> </div> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/admin-movies.htm', '<div class="row"> <div class="col-md-6"> <h1> Movies <video-sort-order-dropdown ng-model="vm.movie.sorter" ng-model-options="{getterSetter: true}" dropdown-type="\'movie\'"/> </h1> <input placeholder="{{vm.searchText}}" type="text" ng-model="vm.movie.filter.title" ng-change="vm.doSearch(vm.movie.filter.title)" ng-model-options="{debounce: 333}" class="form-control input-sm"/> </div> <div class="col-md-6"> <br> <div class="btn-group pull-right"> <button class="btn btn-primary" ng-click="vm.createFromFiles()">Bulk-Create from file(s)</button> <button class="btn btn-primary" ng-click="vm.openMovieModal()">Create new Movie</button> </div> </div> </div> <div class="spinner big" ng-show="vm.movie.isLoading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> <div ng-show="vm.movie.list.length"> <hr/> <div class="media-list"> <div class="media-list-item media-poster-item" ng-class="{\'no-files\': !movie.hasFiles}" ng-repeat="movie in vm.movie.list" ui-sref="admin.movie({movieId: movie.id})"> <div class="media-item"> <streama-video-image type="poster" size="300" video="movie"></streama-video-image> <div class="play-text"> <h4>{{::movie.title}}</h4> <p>{{::movie.release_date.substring(0,4)}}</p> <span class="label label-danger" ng-show="!movie.hasFiles"><i class="ion-alert-circled"></i> No Video File yet!</span> </div> <i class="warning-icon ion-alert-circled" ng-show="!movie.hasFiles"></i> </div> </div> </div> <div class="text-center" ng-if="vm.movie.total> vm.movie.list.length"> <button class="btn btn-primary btn-outline" ng-click="vm.movie.loadMore()">Load more ...</button> </div> </div> <div ng-if="vm.suggestedMovies.length"> <hr> <h3>Want to add a new Movie?</h3> <div class="media-list similar-media"> <div class="media-list-item" ng-repeat="movie in vm.suggestedMovies | filter:vm.search | orderBy: \'-vote_count\'" ng-if="!vm.alreadyAdded(movie)"> <div class="hover-overlay"> <div> <button class="btn btn-primary btn-sm btn-block" ng-click="vm.addFromSuggested(movie, true)">Add and Open</button> <button class="btn btn-primary btn-sm btn-block" ng-click="vm.addFromSuggested(movie, false)">Add and Continue</button> </div> </div> <div class="media-item"> <img ng-src="https://image.tmdb.org/t/p/w300/{{movie.poster_path}}"/> </div> <div class="media-meta">Release: {{::movie.release_date.substring(0, 4)}} | <i class="ion-ios-star"></i> {{::movie.vote_average}}</div> </div> </div> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/admin-new-releases.htm', '<h1>Dashboard Highlights</h1> <div class="spinner big" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> <hr/> <p>Here you can manage the highlights currently displayed on the dashboard. To add new ones, go into the movie/tvShow page and create a new Highlight Entry from there.</p> <table class="table table-striped"> <thead> <tr> <td>date Created</td> <td>movie / tv Show</td> <td>Description</td> <td></td> </tr> </thead> <tr ng-repeat="notification in notifications | orderBy: \'-dateCreated\'"> <td>{{notification.dateCreated | date:\'short\'}}</td> <td> <img ng-if="notification.media.poster_path" ng-src="https://image.tmdb.org/t/p/w92/{{notification.media.poster_path}}" style="max-width: 50px; margin-right: 10px;"/> {{notification.media.title || notification.media.name}} <span ng-if="notification.media.release_date">({{notification.media.release_date.substring(0,4)}})</span> </td> <td> {{notification.description}}</span> </td> <td style="width: 1px;"> <button class="btn btn-xs btn-danger" ng-click="delete(notification)">delete</button> </td> </tr> </table>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/admin-notifications.htm', '<div class="pull-right"> <button class="btn btn-success" ng-if="openNotificationAmount()" ng-click="sendCurrentNotifcation()">Send Current Notification Queue</button> <button class="btn btn-success" ng-click="openNotificationModal()">Add to Email-Notification</button> </div> <h1>Notification Queue</h1> <div class="spinner big" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> <hr/> <p>This page can be used to send notifications about what you have uploaded to other users.</p> <p>Use the Add Notification button inside a Movie\'s or a TV Show\'s information page to add to this queue.</p> <table class="table table-striped"> <thead> <tr> <td>date Created</td> <td>movie / tv Show</td> <td>Description</td> <td>is Completed</td> <td></td> </tr> </thead> <tr ng-repeat="notification in notifications | orderBy: \'-dateCreated\'" ng-class="{\'fade-50\': notification.isCompleted}"> <td>{{notification.dateCreated | date:\'short\'}}</td> <td ng-if="notification.movie"> <img ng-if="notification.movie.poster_path" ng-src="https://image.tmdb.org/t/p/w92/{{notification.movie.poster_path}}" style="max-width: 50px; margin-right: 10px;"/> {{notification.movie.title}} ({{notification.movie.release_date.substring(0,4)}}) </td> <td ng-if="notification.tvShow"> <img ng-if="notification.tvShow.poster_path" ng-src="https://image.tmdb.org/t/p/w92/{{notification.tvShow.poster_path}}" style="max-width: 50px; margin-right: 10px;"/> {{notification.tvShow.name}} ({{notification.tvShow.first_air_date.substring(0,4)}}) </td> <td>{{notification.description}}</td> <td style="width: 117px;" class="text-center"> <i class="ion-ios-checkmark text-success" ng-if="notification.isCompleted" style="font-size: 42px; line-height: 1.7em;"></i> </td> <td style="width: 1px;"> <button class="btn btn-xs btn-danger" ng-click="delete(notification)">delete</button> </td> </tr> </table>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/admin-reports.htm', '<h1>Reports</h1> <p>Here you can see the reports users have made.</p> <div class="row"> <div class="col-md-12"> <div class="btn-group"> <button class="btn btn-default btn-sm pull-left show-reports-button" ng-class="{\'btn-primary\': vm.isResolvedFilter == \'all\'}" ng-click="vm.refreshList(\'all\')"> All </button> <button class="btn btn-default btn-sm pull-left show-reports-button" ng-class="{\'btn-primary\': vm.isResolvedFilter === \'false\'}" ng-click="vm.refreshList(\'false\')"> Only Unresolved Reports </button> <button class="btn btn-default btn-sm pull-left show-reports-button" ng-class="{\'btn-primary\': vm.isResolvedFilter === \'true\'}" ng-click="vm.refreshList(\'true\')"> Only Resolved Reports </button> </div> <button class="btn btn-success btn-sm pull-right resolve-reports-button" ng-click="vm.resolveMultiple()"> Resolve Multiple Reports </button> </div> </div> <div class="report-sorter"> {{\'DASHBOARD.SORT\' | translate}} <video-sort-order-dropdown ng-model="vm.sortAndOrderBy" ng-change="vm.refreshList()" dropdown-type="\'report\'"></video-sort-order-dropdown> </div> <div> <table class="table table-striped table-reports"> <thead> <tr> <th></th> <th>Edit Page</th> <th>Play</th> <th>Report ID</th> <th>Reported On</th> <th>Last Updated</th> <th>User</th> <th>Resolved</th> <th></th> </tr> </thead> <tr ng-repeat="report in vm.reports | filter: vm.showReports"> <td> <input type="checkbox" ng-if="report.resolved == false" ng-click="vm.addOrRemoveFromSelection($event, report)"> </td> <td> <a ng-if="report.showId" ui-sref="admin.show({showId: report.showId})">{{report.videoTitle}}</a> <a ng-if="!report.showId" ui-sref="admin.movie({movieId: report.videoId})">{{report.videoTitle}}</a> <p ng-if="report.episodeString"> ({{report.episodeString}}) </p> </td> <td> <a class="ion-android-arrow-dropright-circle" style="font-size: 30px" ui-sref="player({videoId: report.videoId})"></a> </td> <td> {{report.id}} </td> <td> {{report.dateCreated | date : \'short\'}} </td> <td> {{report.lastUpdated | date : \'short\'}} </td> <td> {{report.userName}} </td> <td> <i ng-if="report.resolved == true" title="Resolved" class="ion-checkmark bg-success report-status-icon"></i> <i ng-if="report.resolved == false" title="Unesolved" class="ion-close bg-danger report-status-icon"></i> </td> <td> <button ng-if="report.resolved == false" class="btn btn-xs" ng-click="vm.resolve(report)">Resolve</button> <button ng-if="report.resolved == true" class="btn btn-xs" ng-click="vm.unresolve(report)">Unresolve</button> </td> </tr> </table> <ul uib-pagination ng-if="vm.reportsCount> vm.maxPerPage" max-size="7" force-ellipses="true" boundary-links="true" total-items="vm.reportsCount" ng-model="vm.pagination.currentPage" items-per-page="vm.maxPerPage" ng-change="vm.pageChanged()"></ul> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/admin-show.htm', '<ul class="breadcrumb"> <li><a ui-sref="admin.shows">Shows</a></li> <li class="active">{{show.name}}</li> </ul> <div class="row"> <div class="col-md-8"> <div class="row"> <div class="col-md-11"> <h1> {{show.name}} <div class="spinner" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> </h1> </div> <div class="col-md-1"> <div class="btn-group pull-right"> <span uib-dropdown on-toggle="toggled(open)"> <i class="ion-ios-settings icon-xl" uib-dropdown-toggle></i> <ul class="dropdown-menu" uib-dropdown-menu aria-labelledby="simple-dropdown"> <li><a ng-click="openShowModal()">Edit info</a></li> <li><a ng-click="deleteShow()">Delete TV-Show</a></li> <li><a ng-click="addToCurrentNotification()">Add to Email-Notification</a></li> <li><a ng-click="highlightOnDashboard()">Highlight on Dashboard</a></li> </ul> </span> </div> </div> </div> <hr> <div class="row"> <div class="col-sm-2"> <label>Release Date</label> <p class="data-display">{{show.first_air_date}}</p> <p ng-show="!show.first_air_date" class="data-display fade-50">-</p> </div> <div class="col-sm-2"> <label>IMDB Link</label> <p class="data-display" ng-if="show.imdb_id"><a href="http://www.imdb.com/title/{{show.imdb_id}}">{{show.name}}</a></p> <p ng-show="!show.imdb_id" class="data-display fade-50">-</p> </div> <div ng-show="show.vote_average" class="col-sm-2"> <label>Rating</label> <p class="data-display">{{show.vote_average}}/10</p> </div> <div ng-show="show.vote_count"class="col-sm-2"> <label>Rating Count</label> <p class="data-display">{{show.vote_count}}</p> </div> </div> <br/> <div class="row"> <div class="col-sm-12"> <label>Overview</label> <p class="data-display">{{show.overview}}</p> <p ng-show="!show.overview" class="data-display fade-50">No overview added yet</p> </div> </div> <label>Genre</label> <ul class="genre-list"> <li class="genre-tag interactive" ng-repeat="genre in show.genre" ui-sref="dash({genreId: genre.id})"> {{genre.name}} </li> </ul> <p ng-show="!show.genre.length" class="data-display fade-50">No genre added yet</p> </div> <div class="col-sm-4"> <div ng-if="!show.manualInput"> <img ng-show="show.poster_path" ng-src="https://image.tmdb.org/t/p/w500/{{show.poster_path}}"/> <img ng-show="!show.poster_path" ng-src="{{basePath}}assets/poster-not-found.png"/> </div> <div ng-if="show.manualInput"> <img ng-show="show.poster_image_src" ng-src="{{show.poster_image_src}}"/> <div class="upload-poster" ng-class="{\'update-poster\': show.poster_image_src}" ng-model="manualPoster" class="btn btn-primary btn-block btn-lg" ngf-change="uploadPoster($files)" ngf-select ngf-drop ngf-drag-over-class="dragover"> <span class="main-text">Upload Poster</span> <span class="size-info">300x450 px</span> <span ng-show="imageUpload.percentage">{{imageUpload.percentage}}%</span> </div> </div> </div> </div> <hr/> <br/><br/> <div class="spinner" ng-show="showLoading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> <div ng-show="!showLoading"> <button class="btn btn-primary" ng-click="addNewEpisode()">Add New Episode Manually</button> <button class="btn btn-primary" ng-click="fetchEpisodes()" ng-if="!show.manualInput" ng-show="hasMovieDBKey">Fetch Episodes</button> <div ng-if="!seasons" class="no-episodes-yet">No Episodes yet</div> <div ng-if="seasons"> <hr> <div class="season-picker-list"> <span class="season-picker-item" ng-class="{\'active\': currentSeason== season}" ng-click="setCurrentSeason(season)" ng-repeat="season in seasons | orderBy:number"> Season {{season}} </span> </div> <div class="season-wrapper"> <div> <button ng-click="refetchSeason(currentSeason)" ng-show="newEpisodesForSeason.count> 0" class="btn btn-success btn-xs"> {{newEpisodesForSeason.count}} new Episodes For this Season. Re-fetch now</button> <button ng-click="deleteSeason(currentSeason)" class="btn btn-danger btn-xs">Delete Season</button> </div> <div class="media-list"> <admin-episode episode-id="{{episode.id}}" episode="episode" ng-repeat="episode in listEpisodesForSeason(currentSeason) | orderBy:\'episode_number\'"></admin-episode> </div> </div> </div> </div> <br/> <br/> <br/>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/admin-shows.htm', '<div class="row"> <div class="col-md-6"> <h1> Shows <video-sort-order-dropdown ng-model="tvShow.sorter" ng-model-options="{getterSetter: true}" dropdown-type="\'tvShow\'"/> </h1> </div> <div class="col-md-6"> <br> <div class="btn-group pull-right"> <button class="btn btn-primary" ng-click="createFromFiles()">Bulk-Create from file(s)</button> <button class="btn btn-primary " ng-click="openShowModal()">Create new Show</button> </div> </div> </div> <div class="row"> <div class="col-md-5"> <input placeholder="{{searchText}}" type="text" ng-model="tvShow.filter.name" ng-change="doSearch(tvShow.filter.name)" ng-model-options="{debounce: 333}" class="form-control input-sm"/> </div> </div> <div class="spinner big" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> <hr/> <div class="media-list"> <div class="media-list-item media-poster-item" ng-class="{\'no-files\': !show.episodesWithFilesCount}" ng-repeat="show in tvShow.list" ui-sref="admin.show({showId: show.id})"> <div class="media-item"> <img ng-if="show.poster_path" ng-src="https://image.tmdb.org/t/p/w300/{{show.poster_path}}"/> <img ng-if="!show.poster_path && !show.manualInput" ng-src="{{basePath}}assets/poster-not-found.png"/> <img ng-show="show.manualInput && show.poster_image_src" ng-src="{{show.poster_image_src}}"> <div class="play-text"> <h4>{{show.name}}</h4> <p>{{show.first_air_date}} | <i class="ion-ios-star"></i>{{show.vote_average}} </p> <p ng-class="{\'label label-danger\': !show.episodesWithFilesCount}">{{show.episodesWithFilesCount}}/{{show.episodesCount}} uploaded</p> </div> <i class="warning-icon ion-alert-circled" ng-show="!show.episodesWithFilesCount"></i> </div> </div> </div> <div class="text-center" ng-if="tvShow.total> tvShow.list.length"> <button class="btn btn-primary btn-outline" ng-click="tvShow.loadMore()">Load more ...</button> </div> <div ng-if="suggestedShows.length"> <hr> <h3>Want to add a new Show?</h3> <div class="media-list similar-media"> <div class="media-list-item" ng-repeat="show in suggestedShows | filter:search | orderBy: \'-vote_count\'" ng-if="!alreadyAdded(show)"> <div class="hover-overlay"> <div> <button class="btn btn-primary btn-sm btn-block" ng-click="addFromSuggested(show, true)">Add and Open</button> <button class="btn btn-primary btn-sm btn-block" ng-click="addFromSuggested(show, false)">Add and Continue</button> </div> </div> <div class="media-item"> <img ng-src="https://image.tmdb.org/t/p/w300/{{show.poster_path}}"/> </div> <div class="media-meta">Release: {{::show.release_date.substring(0, 4)}} | <i class="ion-ios-star"></i> {{::show.vote_average}}</div> </div> </div> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/admin-video.htm', '<ul class="breadcrumb"> <li><a ui-sref="admin.videos">Videos</a></li> <li class="active">{{video.title}}</li> </ul> <div class="spinner big" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> <div class="movie-content" ng-show="video.title" ngf-drop ngf-drag-over-class="movie-dragover-upload" ngf-change="upload($files)"> <div class="row"> <div class="col-md-8 col-lg-9"> <div class="row"> <div class="col-md-11"> <h1> {{video.title}} &nbsp; <a ng-show="video.files.length" class="ion-android-arrow-dropright-circle" ui-sref="player({videoId: video.id})"></a> </h1> <span class="label label-danger" ng-click="manageFiles(video)" ng-show="!video.files.length"><i class="ion-alert-circled"></i> No Video File yet!</span> </div> <div class="col-md-1"> <div class="btn-group pull-right"> <span uib-dropdown on-toggle="toggled(open)"> <i class="ion-ios-settings icon-xl" uib-dropdown-toggle></i> <ul class="dropdown-menu" uib-dropdown-menu aria-labelledby="simple-dropdown"> <li><a ng-click="openVideoModal()">Edit info</a></li> <li><a ng-click="manageFiles(video)">Manage Files</a></li> <li><a ng-click="delete()">Delete Video</a></li> </ul> </span> </div> </div> </div> <hr/> <div class="row"> <div class="col-sm-2"> <label>Release Date</label> <p class="data-display">{{video.release_date}}</p> </div> <div class="col-sm-2"> <label>IMDB Link</label> <p class="data-display"><a href="http://www.imdb.com/title/{{video.imdb_id}}">{{video.title}}</a></p> </div> <div class="col-sm-2" ng-show="video.vote_average"> <label>Rating</label> <p ng-show="video.vote_average" class="data-display">{{video.vote_average}}/10</p> </div> <div class="col-sm-2" ng-show="video.vote_count"> <label>Rating Count</label> <p class="data-display">{{video.vote_count}}</p> </div> </div> <br/> <div class="row"> <div class="col-sm-12"> <label>Overview</label> <p ng-show="video.overview" class="data-display">{{video.overview}}</p> <p ng-show="!video.overview" class="data-display fade-50">No overview added yet</p> </div> <br> <div class="col-sm-12"> <label>Genre</label> <ul class="genre-list"> <li class="genre-tag interactive" ng-repeat="genre in video.genre" ui-sref="dash({genreId: genre.id})"> {{genre.name}} </li> </ul> <p ng-show="!video.genre.length" class="data-display fade-50">No genre added yet</p> </div> <br> <div class="col-sm-12" ng-if="video.trailerKey"> <label>Trailer</label> <br> <iframe width="560" height="315" ng-src="{{\'https://www.youtube.com/embed/\'+video.trailerKey+\'?rel=0\' | trustResourceUrl}}" frameborder="0" allowfullscreen></iframe> </div> </div> <div class="row" ng-show="!video.files.length"> <hr/> <button class="btn btn-danger btn-block btn-lg" ng-click="manageFiles(video)"> <i class="ion-alert-circled"></i> No Video File yet! Drop file or click here to add </button> </div> </div> <div class="col-sm-4 col-lg-3"> <img ng-show="!video.poster_image_src" ng-src="{{basePath}}assets/poster-not-found.png"/> <img ng-show="video.poster_image_src" ng-src="{{video.poster_image_src}}"/> </div> </div> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/admin-videos.htm', '<button class="btn btn-primary pull-right btn-lg" ng-click="openGenericVideoModal()">Create generic video</button> <h1> Other Videos <video-sort-order-dropdown ng-model="currentSort" dropdown-type="\'movie\'"/> </h1> <div class="row"> <div class="col-md-5"> <input placeholder="Search Videos..." type="text" ng-model="search" class="form-control input-sm"/> </div> </div> <div class="spinner big" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> <div ng-show="videos.length"> <hr/> <div class="media-list-item media-poster-item" ng-class="{\'no-files\': !video.hasFiles}" ng-repeat="video in videos | filter:search | orderBy:(currentSort.order == \'DESC\' ? \'-\' : \'\' + currentSort.sort)" ui-sref="admin.video({videoId: video.id})"> <div class="media-item"> <img ng-show="video.poster_image_src" ng-src="{{video.poster_image_src}}"> <div class="play-text"> <h4>{{::video.title}}</h4> <p>{{::video.release_date.substring(0,4)}}</p> <span class="label label-danger" ng-show="!video.hasFiles"><i class="ion-alert-circled"></i> No Video File yet!</span> </div> <i class="warning-icon ion-alert-circled" ng-show="!video.hasFiles"></i> </div> </div> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/admin.htm', '<div class="admin"> <div class="nav"> <ul> <li ng-class="{\'active\': (isCurrentState(\'admin.shows\') || isCurrentState(\'admin.show\'))}" ng-if="$root.currentUser.isContentManager"> <a ui-sref="admin.shows">TV Shows</a> </li> <li ng-class="{\'active\': isCurrentState(\'admin.movies\')}" ng-if="$root.currentUser.isContentManager"> <a ui-sref="admin.movies">Movies</a> </li> <li ng-class="{\'active\': isCurrentState(\'admin.videos\')}" ng-if="$root.currentUser.isContentManager"> <a ui-sref="admin.videos">Other Videos</a> </li> <li ng-class="{\'active\': isCurrentState(\'admin.fileManager\')}" ng-if="$root.currentUser.isContentManager"> <a ui-sref="admin.fileManager">File Manager</a> </li> <li ng-class="{\'active\': isCurrentState(\'admin.notifications\')}" ng-if="$root.currentUser.isAdmin"> <a ui-sref="admin.notifications">Notifications</a> </li> <li ng-class="{\'active\': isCurrentState(\'admin.newReleases\')}" ng-if="$root.currentUser.isContentManager"> <a ui-sref="admin.newReleases">Dashboard Highlights</a> </li> <li ng-class="{\'active\': isCurrentState(\'admin.reports\')}" ng-if="$root.currentUser.isContentManager"> <a ui-sref="admin.reports">Reports</a> </li> </ul> </div> <div class="admin-content"> <ui-view/> </div> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/dash.htm', '<div class="dashboard"> <div ng-if="vm.newReleases.length && !$root.selectedGenre && vm.isDashType(\'home\') && !vm.isDashSectionHidden(\'new-releases\')"> <h3>{{\'DASHBOARD.NEW_RELEASES\' | translate}}</h3> <div uis-owl-carousel class="new-releases-slider"> <div ng-repeat="newRelease in vm.newReleases" class="new-releases-slide"> <div ng-if="newRelease.media.poster_path"> <img class="poster-image" ng-src="https://image.tmdb.org/t/p/w342/{{newRelease.media.poster_path}}" class="pull-left"> </div> <div ng-if="newRelease.media.poster_image_src"> <img class="poster-image" ng-src="{{newRelease.media.poster_image_src}}" class="pull-left"> </div> <div class="image-background" style="background: url(\'https://image.tmdb.org/t/p/original{{newRelease.media.backdrop_path}}\') no-repeat center; background-size: cover;"> <div> <i ng-class="newRelease.media.inWatchlist ? \'remove-icon ion-android-remove-circle\' : \'add-icon ion-android-add-circle\'" ng-click="vm.handleWatchlistUpdate(newRelease.media.inWatchlist ? \'removed\' : \'added\', newRelease.media)"></i> </div> <i class="info-icon ion-ios-information" ng-click="vm.showDetails(newRelease.media)"></i> <div class="new-release-footer"> <a class="play-icon ion-ios-play" ui-sref="player({videoId: newRelease.videoToPlayId})"></a> <div class="new-releases-description"> <h3> {{newRelease.media.title || newRelease.media.name}} <span ng-if="newRelease.media.release_date">({{newRelease.media.release_date.substring(0,4)}})</span> </h3> <h4>{{newRelease.description}}</h4> <p>{{newRelease.media.overview}}</p> </div> </div> </div> </div> </div> </div> <h2 class="genre-display" ng-if="$root.selectedGenre">{{\'DASHBOARD.LOOKING_AT_GENRE\' | translate}} <strong ng-bind="$root.selectedGenre.name"></strong></h2> <div ng-if="vm.continueWatching.length && !$root.selectedGenre && vm.isDashType(\'home\') && !vm.isDashSectionHidden(\'continue-watching\')"> <hr/> <h3>{{\'DASHBOARD.CONTINUE_WATCHING\' | translate}}</h3> <div class="media-list media-list-continue-watching"> <div class="media-list-item media-poster-item" ng-repeat="viewingStatus in vm.continueWatching"> <div class="media-item"> <streama-video-image type="poster" video="viewingStatus.video" size="300"></streama-video-image> <div class="play-text"> <h4>Continue "<span ng-bind="::(viewingStatus.video.title || viewingStatus.video.show.name)"></span>"</h4> <button class=" btn btn-secondary btn-xss complete-watching" ng-click="vm.markCompleted(viewingStatus)"> {{\'DASHBOARD.MARK_COMPLETED\' | translate}}</button> <p ng-show="viewingStatus.video.isEpisode"><span ng-bind="::viewingStatus.video.episodeString"></span></p> </div> <i class="info-icon ion-ios-information" ng-click="vm.showDetails(viewingStatus.video)"></i> <a class="play-icon ion-ios-play" ui-sref="player({videoId: viewingStatus.video.id})"></a> </div> <div class="media-progress-wrapper"> <div class="progress-info" ng-show="viewingStatus.video.isEpisode"> <span ng-bind="::viewingStatus.video.episodeString"></span> - <span ng-bind="::viewingStatus.video.title"></span> </div> <div class="progress-info" ng-show="!viewingStatus.video.isEpisode" ng-bind="::viewingStatus.video.title"></div> <div class="progress-time"> <span ng-bind="::(viewingStatus.currentPlayTime | secondsToTimeDisplay)"></span> <span class="text-muted">/ <span ng-bind="::(viewingStatus.runtime | secondsToTimeDisplay)"></span></span> </div> <div class="media-progress" ng-if="viewingStatus.runtime"> <div class="progress-inner" style="width: {{viewingStatus.currentPlayTime / viewingStatus.runtime * 100}}%;"></div> </div> </div> </div> </div> </div> <div ng-if="vm.recommendations.length && !$root.selectedGenre && vm.isDashType(\'home\') && !vm.isDashSectionHidden(\'recommends\')"> <hr/> <h3>{{\'DASHBOARD.RECOMMENDATIONS\' | translate}}</h3> <div class="media-list media-list-continue-watching"> <div class="media-list-item media-poster-item" ng-repeat="video in vm.recommendations track by video.id"> <div class="media-item"> <streama-video-image type="poster" video="video"></streama-video-image> <div class="play-text"> <h4 ng-bind="::(video.title || video.show.name)"></h4> <p ng-show="video.isEpisode"><span ng-bind="::video.episodeString"></span></p> </div> <div> <i ng-class="video.inWatchlist ? \'remove-icon ion-android-remove-circle\' : \'add-icon ion-android-add-circle\'" ng-click="vm.handleWatchlistUpdate(video.inWatchlist ? \'removed\' : \'added\', video)"></i> </div> <i class="info-icon ion-ios-information" ng-click="vm.showDetails(video)"></i> <a class="play-icon ion-ios-play" ui-sref="player({videoId: video.id})"></a> </div> </div> </div> </div> <div ng-if="vm.isDashType(\'home\') && vm.watchlistEntry.list.length && !vm.isDashSectionHidden(\'watchlist\')"> <hr/> <h3>{{\'DASHBOARD.WATCHLIST\' | translate}}</h3> <div class="row dash-filter"> <div class="col-md-3"> {{\'DASHBOARD.SORT\' | translate}} <video-sort-order-dropdown ng-model="vm.watchlistEntry.sorter" ng-model-options="{getterSetter: true}" dropdown-type="\'watchlist\'"></video-sort-order-dropdown> </div> </div> <br> <div class="media-list"> <div class="media-list-item media-poster-item" ng-repeat="watchlistEntry in vm.watchlistEntry.list track by watchlistEntry.id"> <div class="media-item" ng-if="watchlistEntry.tvShow"> <streama-video-image type="poster" size="300" video="watchlistEntry.tvShow"></streama-video-image> <div class="play-text"> <h4 ng-bind="::watchlistEntry.tvShow.name"></h4> </div> <i class="remove-icon ion-android-remove-circle" ng-click="vm.removeFromWatchlist(watchlistEntry.tvShow)"></i> <div> <i ng-class="\'remove-icon ion-android-remove-circle\'" ng-click="vm.handleWatchlistUpdate(\'removed\', watchlistEntry.tvShow)"></i> </div> <i class="info-icon ion-ios-information" ng-click="vm.showDetails(watchlistEntry.tvShow)"></i> <a class="play-icon ion-ios-play" ng-click="vm.fetchFirstEpisodeAndPlay(watchlistEntry.tvShow)"></a> </div> <div class="media-item" ng-if="watchlistEntry.video"> <streama-video-image type="poster" size="300" video="watchlistEntry.video"></streama-video-image> <div class="play-text"> <h4 ng-bind="::watchlistEntry.video.title"></h4> <p ng-bind="::watchlistEntry.video.release_date.substring(0,4)"></p> </div> <div> <i ng-class="\'remove-icon ion-android-remove-circle\'" ng-click="vm.handleWatchlistUpdate(\'removed\', watchlistEntry.video)"></i> </div> <i class="info-icon ion-ios-information" ng-click="vm.showDetails(watchlistEntry.video)"></i> <a class="play-icon ion-ios-play" ui-sref="player({videoId: watchlistEntry.video.id})"></a> </div> </div> </div> </div> <div ng-if="vm.isDashType(\'watchlist\') && !vm.watchlistEntry.list.length"> <p class="no-episodes-yet"> {{\'DASHBOARD.NO_WATCHLIST_FOUND\' | translate}} </p> </div> <div ng-if="(vm.isDashType(\'home\') || vm.isDashType(\'discover-shows\')) && (!$root.currentProfile.isChild || vm.tvShow.list.length) && !vm.isDashSectionHidden(\'discover-shows\')"> <hr/> <h3> <span ng-show="!$root.selectedGenre">{{\'DASHBOARD.DISCOVER_SHOWS\' | translate}}</span> <span ng-show="$root.selectedGenre">{{::$root.selectedGenre.name}} TV Shows</span> </h3> <div class="row dash-filter"> <div class="col-sm-3"> {{\'DASHBOARD.SORT\' | translate}} <video-sort-order-dropdown ng-model="vm.tvShow.sorter" ng-model-options="{getterSetter:true}" dropdown-type="\'tvShow\'"></video-sort-order-dropdown> </div> <div class="col-sm-4"> <ui-select class="tag-select" multiple ng-model="vm.tvShow.filter.genre" ng-change="vm.tvShow.setFilter()" theme="bootstrap" title="Filter by Genre"> <ui-select-match placeholder="{{\'DASHBOARD.FILTER_BY_GENRE\' | translate}}">{{$item.name}}</ui-select-match> <ui-select-choices repeat="genre.id as genre in genres | propsFilter: {name: $select.search}"> <div class="tag-wrapper"> <div class="tag-name" ng-bind-html="genre.name | highlight: $select.search"></div> </div> </ui-select-choices> </ui-select> </div> <div class="col-sm-4"> <input class="form-control input-sm" type="text" ng-model="vm.tvShow.filter.name" ng-model-options="{debounce: 400}" placeholder="{{\'DASHBOARD.SEARCH_BY_NAME\' | translate}}" ng-change="vm.tvShow.setFilter()"/> </div> </div> <br> <div class="spinner" ng-show="vm.tvShow.isLoading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> <p class="no-episodes-yet" ng-show="!vm.tvShow.list.length"> {{\'DASHBOARD.NO_TVSHOWS_FOUND\' | translate}} </p> <div class="media-list"> <div class="media-list-item media-poster-item" ng-repeat="tvShow in vm.tvShow.list | filter: vm.tvShow.filter.execute"> <div class="media-item"> <streama-video-image type="poster" size="300" video="tvShow"></streama-video-image> <div class="play-text"> <h4 ng-bind="::tvShow.name"></h4> </div> <div> <i ng-class="tvShow.inWatchlist ? \'remove-icon ion-android-remove-circle\' : \'add-icon ion-android-add-circle\'" ng-click="vm.handleWatchlistUpdate(tvShow.inWatchlist ? \'removed\' : \'added\', tvShow)"></i> </div> <i class="info-icon ion-ios-information" ng-click="vm.showDetails(tvShow)"></i> <a class="play-icon ion-ios-play" ng-click="vm.fetchFirstEpisodeAndPlay(tvShow)"></a> </div> </div> </div> <div class="text-center" ng-if="vm.tvShow.total> vm.tvShow.list.length"> <button class="btn btn-primary btn-outline" ng-click="vm.tvShow.loadMore()">Load more ...</button> </div> </div> <div ng-if="(vm.isDashType(\'home\') || vm.isDashType(\'discover-movies\')) && (!$root.currentProfile.isChild || vm.movie.list.length) && !vm.isDashSectionHidden(\'discover-movies\')"> <hr/> <h3> <span ng-show="!selectedGenre">{{\'DASHBOARD.DISCOVER_MOVIES\' | translate}}</span> <span ng-show="selectedGenre">{{::selectedGenre.name}} Movies</span> </h3> <div class="row dash-filter" ng-hide="!vm.movie.filter && !vm.movie.list.length"> <div class="col-sm-3"> {{\'DASHBOARD.SORT\' | translate}} <video-sort-order-dropdown ng-model="vm.movie.sorter" ng-model-options="{getterSetter:true}" dropdown-type="\'movie\'"></video-sort-order-dropdown> </div> <div class="col-sm-4"> <ui-select class="tag-select" multiple ng-model="vm.movie.filter.genre" ng-change="vm.movie.setFilter()" theme="bootstrap" title="Filter by Genre"> <ui-select-match placeholder="{{\'DASHBOARD.FILTER_BY_GENRE\' | translate}}">{{$item.name}}</ui-select-match> <ui-select-choices repeat="genre.id as genre in genres | propsFilter: {name: $select.search}"> <div class="tag-wrapper"> <div class="tag-name" ng-bind-html="genre.name | highlight: $select.search"></div> </div> </ui-select-choices> </ui-select> </div> <div class="col-sm-4"> <input class="form-control input-sm" type="text" ng-model="vm.movie.filter.title" ng-model-options="{debounce: 400}" placeholder="{{\'DASHBOARD.SEARCH_BY_NAME\' | translate}}" ng-change="vm.movie.setFilter()"/> </div> </div> <br> <div class="spinner" ng-show="vm.movie.isLoading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> <p class="no-episodes-yet" ng-show="!vm.movie.list.length"> {{\'DASHBOARD.NO_MOVIES_FOUND\' | translate}} </p> <div class="media-list"> <div class="media-list-item media-poster-item" ng-repeat="movie in vm.movie.list | orderBy:vm.movie.sorter.sort |filter: vm.movie.filter.execute"> <div class="media-item"> <streama-video-image type="poster" size="300" video="movie"></streama-video-image> <div class="play-text"> <h4 ng-bind="::movie.title"></h4> <p ng-bind="::movie.release_date.substring(0,4)"></p> </div> <div> <i ng-class="movie.inWatchlist ? \'remove-icon ion-android-remove-circle\' : \'add-icon ion-android-add-circle\'" ng-click="vm.handleWatchlistUpdate(movie.inWatchlist ? \'removed\' : \'added\', movie)"></i> </div> <i class="info-icon ion-ios-information" ng-click="vm.showDetails(movie)"></i> <a class="play-icon ion-ios-play" ui-sref="player({videoId: movie.id})"></a> </div> </div> </div> <div class="text-center" ng-if="vm.movie.total> vm.movie.list.length"> <button class="btn btn-primary btn-outline" ng-click="vm.movie.loadMore()">Load more ...</button> </div> </div> <div ng-if="vm.genericVideo.list.length && vm.isDashType(\'home\') && !vm.isDashSectionHidden(\'discover-generic\')"> <hr/> <h3> <span ng-show="!$root.selectedGenre">{{\'DASHBOARD.DISCOVER_OTHER_VIDEOS\' | translate}}</span> <span ng-show="$root.selectedGenre">{{::$root.selectedGenre.name}} Videos</span> </h3> <div class="row dash-filter"> <div class="col-md-3"> {{\'DASHBOARD.SORT\' | translate}} <video-sort-order-dropdown ng-model="vm.genericVideo.sorter" ng-model-options="{getterSetter: true}" dropdown-type="\'movie\'"></video-sort-order-dropdown> </div> <div class="col-sm-4"> <input class="form-control input-sm" type="text" ng-model="vm.genericVideo.filter.title" placeholder="Search by Title..." ng-model-options="{debounce: 400}" ng-change="vm.genericVideo.setFilter()"/> </div> </div> <br> <div class="spinner" ng-show="vm.genericVideo.isLoading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> <div class="media-list"> <div class="media-list-item media-poster-item" ng-repeat="movie in vm.genericVideo.list |filter: vm.genericVideo.filter.title"> <div class="media-item"> <streama-video-image type="poster" size="300" video="movie"></streama-video-image> <div class="play-text"> <h4 ng-bind="::movie.title"></h4> <p ng-bind="::movie.release_date.substring(0,4)"></p> </div> <div> <i ng-class="movie.inWatchlist ? \'remove-icon ion-android-remove-circle\' : \'add-icon ion-android-add-circle\'" ng-click="vm.handleWatchlistUpdate(movie.inWatchlist ? \'removed\' : \'added\', movie)"></i> </div> <i class="info-icon ion-ios-information" ng-click="vm.showDetails(movie)"></i> <a class="play-icon ion-ios-play" ui-sref="player({videoId: movie.id})"></a> </div> </div> </div> </div> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/directive--admin-episode.htm', '<div class="media-list-item episode-wrapper" ng-class="{\'no-files\': !episode.videoFiles.length, \'uploading\': uploadStatus.percentage != null}" ngf-drop ngf-drag-over-class="dragover-upload" ngf-change="upload($files)" ng-if="!episode.deleted"> <div class="upload-overlay" ng-class="{\'visible\': uploadStatus.percentage != null}"> <span class="hint" ng-show="uploadStatus.percentage == null">Upload File</span> <span class="percentage" ng-show="uploadStatus.percentage != null && uploadStatus.percentage < 100">{{uploadStatus.percentage}} %</span> <span class="processing" ng-show="uploadStatus.percentage == 100"> <span> <div class="spinner"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> </span> </span> </div> <span class="label label-danger pull-right" ng-show="!episode.videoFiles.length"><i class="ion-alert-circled"></i> No Video File yet!</span> <a ui-sref="admin.reports" class="label label-danger pull-right" ng-show="episode.videoFiles.length && episode.reportCount"> <i class="ion-alert-circled"></i> <span ng-if="episode.reportCount == 1">1 Report!</span> <span ng-if="episode.reportCount> 1" >{{episode.reportCount}} Reports!</span> </a> <h3 class="media-episode-string"> <span ng-show="episode.episodeString">{{episode.episodeString}}</span> <span ng-show="!episode.episodeString">s{{episode.season_number | padnumber:2}}e{{episode.episode_number | padnumber:2}}</span> </h3> <h3 class="media-title">{{episode.name}}</h3> <div class="media-item"> <img ng-if="episode.still_path" ng-src="https://image.tmdb.org/t/p/w300/{{episode.still_path}}"/> <img ng-if="!episode.still_path && episode.still_image_src" ng-src="{{episode.still_image_src}}"/> <div ng-if="!episode.still_path && !episode.still_image_src" class="fallback-image"></div> <a ng-show="episode.videoFiles.length" ui-sref="player({videoId: episode.id})" class="play-icon ion-ios-play"></a> </div> <div class="button-wrapper"> <button ng-click="editEpisode(episode)" class="btn btn-secondary btn-xs">Edit</button> <button class="btn btn-secondary btn-xs" ng-click="manageFiles(episode)">Manage Files</button> </div> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/directive--streama-progress-bar.htm', '<div class="media-progress-wrapper"> <div class="progress-info" ng-show="video.isEpisode"> <span ng-bind="::video.episodeString"></span> - <span ng-bind="::video.title"></span> </div> <div class="progress-info" ng-show="!video.isEpisode" ng-bind="::video.title"></div> <div class="progress-time" ng-if="!hideTime"><span ng-bind="(video.currentPlayTime | secondsToDateTime | date:\'mm:ss\')"></span> min</div> <div class="media-progress" ng-if="video.runtime"> <div class="progress-inner" style="width: {{video.currentPlayTime / video.runtime * 100}}%;"></div> </div> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/directive--streama-video-image.htm', '<img ng-if="video[type + \'_image_src\']" ng-src="{{::video[type + \'_image_src\']}}"/> <img ng-if="!video[type + \'_image_src\'] && video[type + \'_path\']" ng-src="https://image.tmdb.org/t/p/w{{size}}/{{::video[type + \'_path\']}}"/> <img ng-if="!video[type + \'_path\'] && !video[type + \'_image_src\']" ng-src="{{$root.basePath}}assets/poster-not-found.png"/>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/directive--video-sort-order-dropdown.htm', '<div class="sort-by btn-group" uib-dropdown dropdown-append-to-body> <button id="btn-append-to-body" type="button" class="btn btn-white btn-outline btn-sm" uib-dropdown-toggle> {{currentSort.label | translate}}<span class="caret"></span> </button> <ul uib-dropdown-menu role="menu" aria-labelledby="btn-append-to-body"> <li role="menuitem" ng-repeat="sortOrder in sortOrders"><a ng-click="setCurrentSort(sortOrder)"> {{sortOrder.label | translate}} </a></li> </ul> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/help.htm', '<div class="admin"> <div class="nav"> <ul> <div question-object="question" ng-repeat="question in questions" ng-cloak> <li> <a href="" ng-click="gotoAnchor($index+1)">{{$index+1}}. {{ \'FAQ.\' + question + \'.TITLE\' | translate }}</a> </li> </div> </ul> </div> <div class="admin-content"> <h1> {{\'HELP_FAQ\' | translate}} <div class="spinner" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> </h1> <hr/> <div question-object="question" ng-repeat="question in questions" ng-cloak> <br> <h2 id="question{{$index+1}}" class="anchor">{{$index+1}}. {{ \'FAQ.\' + question + \'.TITLE\' | translate }}</h2> <br> <p>{{ \'FAQ.\' + question + \'.TEXT\' | translate }}</p> <br> <br> <br> <br> <br> </div> <div id="help-page-bottom"></div> </div> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--create-from-file-recursive-item.htm', '<div ng-if="file.directory"> <div class="row"> <div class="checkbox-wrapper"> <input type="checkbox" ng-click="vm.toggleDirectorySelection(file)" ng-checked="vm.isSelected(file)"> </div> <div class="col-md-8" ng-click="vm.openLocalDirectory(file)"> <i class="ion-folder"></i> {{ file.name }} </div> <div class="col-md-3"> <span ng-if="vm.getMatchForPath(file.path)"> {{vm.getMatchForPath(file.path).message}} </span> <button class="btn btn-xs btn-success button-icon" ng-if="vm.hasStatus(file, 1)" ng-click="vm.addSelectedFile()">Add this file </button> </div> </div> <ul ng-if="file.showFiles"> <li ng-repeat="file in file.localFiles | orderBy: [\'-directory\', \'name\'] | filter:vm.localFileSearch" ng-include="\'/streama/modal--create-from-file-recursive-item.htm\'"> </li> </ul> </div> <div class="row" ng-if="!file.directory"> <div class="checkbox-wrapper"> <input type="checkbox" ng-click="vm.toggleSelection(file)" ng-checked="vm.isSelected(file)"> </div> <div class="col-md-8"> <i class="ion-document"></i> {{ file.name }} </div> <div class="col-md-3" style="padding-right: 0;"> <i class="ion-load-c spin column-loading" ng-show="vm.isMatcherLoading && vm.isSelected(file) && (!vm.getMatchForPath(file.path) || vm.hasStatus(file, 1))"></i> <span ng-if="vm.getMatchForPath(file.path) && (vm.hasStatus(file, 1) || vm.hasStatus(file, 6))"> <a ng-click="vm.openMediaDetail(vm.getMatchForPath(file.path))"> <i class="ion-ios-eye"></i> {{vm.hasStatus(file, 6) ? \'Subtitle\': \'\'}} Match: {{vm.getMatchDisplay(file)}} </a> </span> <span ng-if="vm.getMatchForPath(file.path) && vm.hasStatus(file, 2)"> already added </span> <span ng-if="vm.getMatchForPath(file.path) && vm.hasStatus(file, 3)"> created </span> <span ng-if="vm.getMatchForPath(file.path) && vm.hasStatus(file, 7)"> subtitle added </span> <span ng-if="vm.getMatchForPath(file.path) && vm.hasStatus(file, 5)"> found Media for Subtitle: <a ng-click="vm.openAdminForm(vm.getMatchForPath(file.path))" class="text-success">{{vm.getMatchDisplay(file)}} <i class="ion-android-open"></i></a> </span> <span ng-if="vm.getMatchForPath(file.path) && vm.hasStatus(file, 0)"> {{vm.getMatchForPath(file.path).message}} </span> <span class="text-danger" ng-if="vm.getMatchForPath(file.path) && vm.hasStatus(file, 4)"> TheMovieDB Error: &nbsp;<i class="ion-help-circled" title="{{vm.getMatchForPath(file.path).errorMessage}}"></i> </span> <br> <button class="btn btn-xs btn-success button-icon" ng-if="vm.hasStatus(file, 1)" ng-click="vm.addSelectedFile(file)">Add this file </button> <button class="btn btn-xs btn-success button-icon" ng-if="vm.hasStatus(file, 5)" ng-click="vm.addSelectedFile(file)">Add subtitle file </button> <a ng-if="vm.hasStatus(file, 2) || vm.hasStatus(file, 3) || vm.hasStatus(file, 7)" ng-click="vm.openAdminForm(vm.getMatchForPath(file.path))" class="text-success">Go to: {{vm.getMatchDisplay(file)}} <i class="ion-android-open"></i></a> </div> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--create-from-file.htm', '<div class="modal-body"> <legend> Create {{vm.mediaType}}s from Files </legend> <div> <div class="form-group"> <input type="text" ng-model="vm.localFileSearch" class="form-control input-sm" placeholder="Search current directory..."> </div> </div> <div> <ul class="create-from-file-tree"> <li ng-repeat="file in vm.localFiles | orderBy: [\'-directory\', \'name\'] | filter:vm.localFileSearch" ng-include="\'/streama/modal--create-from-file-recursive-item.htm\'"> </li> </ul> </div> </div> <div class="modal-footer"> <button class="btn btn-success button-icon" ng-show="vm.matchResult" ng-click="vm.addAllMatches()"> Add all found matches </button> <button class="btn btn-success button-icon" ng-disabled="!vm.selection.length" ng-click="vm.runMatcher()"> Run Matcher <i class="ion-load-c spin" ng-show="vm.isMatcherLoading"></i> </button> <button class="btn btn-default" ng-disabled="vm.isMatcherLoading" ng-click="vm.close()">Close</button> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--create-user.htm', '<div class="modal-body"> <form class="form-horizontal"> <legend> Create User <div class="spinner" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> </legend> <div class="panel panel-danger" ng-if="passwordValidationError || error"> <div class="panel-body" ng-if="passwordValidationError"> {{(\'PROFIlE.\' + passwordValidationError) | translate}} </div> <div class="panel-body" ng-if="error"> {{error}} </div> </div> <div ng-class="{\'has-error has-feedback\': error, \'has-success has-feedback\': validUser}"> <div class="form-group"> <div class="col-sm-3"> <label class="control-label">Username</label> </div> <div class="col-sm-8"> <input type="text" class="form-control" ng-model="user.username" placeholder="Username" ng-model-options="{updateOn: \'blur\'}" ng-change="checkAvailability(user.username)"> <span class="ion-close form-control-feedback" ng-show="error" aria-hidden="true"></span> <span class="ion-checkmark form-control-feedback" ng-show="validUser" aria-hidden="true"></span> </div> </div> </div> <div ng-class="{\'has-error has-feedback\': !validPassword, \'has-success has-feedback\': validPassword}"> <div class="form-group"> <div class="col-sm-3"> <label class="control-label">{{\'PROFIlE.PASS\' | translate}}</label> </div> <div class="col-sm-8"> <input type="password" class="form-control" ng-model="user.password" placeholder="{{\'PROFIlE.PASS\' | translate}}" ng-model-options="{updateOn: \'blur\'}" ng-change="checkPassword(user.password, user.passwordRepeat)"> <span class="ion-close form-control-feedback" ng-show="!validPassword" aria-hidden="true"></span> <span class="ion-checkmark form-control-feedback" ng-show="validPassword" aria-hidden="true"></span> </div> </div> </div> <div ng-class="{\'has-error has-feedback\': !validPassword, \'has-success has-feedback\': validPassword}"> <div class="form-group"> <div class="col-sm-3"> <label class="control-label">{{\'PROFIlE.REPEAT_PASS\' | translate}}</label> </div> <div class="col-sm-8"> <input type="password" class="form-control" ng-model="user.passwordRepeat" placeholder="{{\'PROFIlE.REPEAT_PASS\' | translate}}" ng-model-options="{updateOn: \'blur\'}" ng-change="checkPassword(user.password, user.passwordRepeat)"> <span class="ion-close form-control-feedback" ng-show="!validPassword" aria-hidden="true"></span> <span class="ion-checkmark form-control-feedback" ng-show="validPassword" aria-hidden="true"></span> </div> </div> </div> <div class="form-group"> <div class="col-sm-8 col-sm-offset-3"> <label> <input type="checkbox" ng-model="user.enabled"/> &nbsp; Enabled (user can log in and view videos)</label> </div> </div> <div class="form-group"> <div class="col-sm-3"> <label class="control-label">Roles</label> </div> <div class="col-sm-8"> <div class="form-control" style="height: auto;"> <div ng-repeat="role in roles"> <input type="checkbox" name="authorities[]" value="{{role.id}}" ng-checked="checkAuthorities(role.id)" ng-click="toggleAuthorities(role)"> {{role.displayName}} </div> </div> </div> </div> <div class="form-group"> <div class="col-sm-3"> <label class="control-label">{{\'PROFIlE.LANGUAGE\' | translate}}</label> </div> <div class="col-sm-8"> <select class="form-control" ng-model="user.language" ng-options="lang as (\'LANGUAGE_\'+lang | translate) for lang in $root.availableLanguages"></select> </div> </div> </form> </div> <div class="modal-footer"> <button ng-if="!user.id" class="btn btn-success" ng-disabled="(!validUser || !validPassword) && !user.id" ng-click="saveAndCreateUser(user)">Save & Create User</button> <button ng-if="user.id" class="btn btn-success" ng-click="saveAndInviteUser(user)">Save User</button> <button type="button" class="btn btn-danger" ng-click="cancel()">Cancel</button> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--edit-user.htm', '<div class="modal-body"> <form class="form-horizontal"> <legend> Edit User <div class="spinner" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> </legend> <div ng-class="{\'has-error has-feedback\': error, \'has-success has-feedback\': validUser}"> <label class="control-label" ng-show="error">{{error}}</label> <div class="form-group"> <div class="col-sm-3"> <label class="control-label">Username</label> </div> <div class="col-sm-8"> <input type="text" class="form-control" ng-model="user.username" placeholder="Username" ng-model-options="{updateOn: \'blur\'}" ng-change="checkAvailability(false, user.username)"> <span class="ion-close form-control-feedback" ng-show="error" aria-hidden="true"></span> <span class="ion-checkmark form-control-feedback" ng-show="validUser" aria-hidden="true"></span> </div> </div> </div> <div class="form-group"> <div class="col-sm-8 col-sm-offset-3"> <label> <input type="checkbox" ng-model="user.enabled"/> &nbsp; Enabled (user can log in and view videos)</label> </div> <div class="col-sm-8 col-sm-offset-3"> <label> <input type="checkbox" ng-model="user.accountExpired"/> &nbsp; Expire account</label> </div> </div> <div class="form-group"> <div class="col-sm-3"> <label class="control-label">{{\'PROFIlE.NEW_PASS\' | translate}}</label> </div> <div class="col-sm-8"> <input type="password" class="form-control" ng-model="user.password" placeholder="{{\'PROFIlE.NEW_PASS_PLACEHOLDER\' | translate}}"> </div> </div> <div class="form-group"> <div class="col-sm-3"> <label class="control-label">Roles</label> </div> <div class="col-sm-8"> <div class="form-control" style="height: auto;"> <div ng-repeat="role in roles"> <input type="checkbox" name="authorities[]" value="{{role.id}}" ng-checked="checkAuthorities(role.id)" ng-click="toggleAuthorities(role)"> {{role.displayName}} </div> </div> </div> </div> <div class="form-group"> <div class="col-sm-3"> <label class="control-label">{{\'PROFIlE.LANGUAGE\' | translate}}</label> </div> <div class="col-sm-8"> <select class="form-control" ng-model="user.language" ng-options="lang as (\'LANGUAGE_\'+lang | translate) for lang in $root.availableLanguages"></select> </div> </div> </form> </div> <div class="modal-footer"> <button ng-if="!user.id" class="btn btn-success" ng-disabled="!valid && !user.id" ng-click="saveAndCreateUser(user)">Save & Create User</button> <button ng-if="user.id" class="btn btn-success" ng-click="saveAndInviteUser(user)">Save User</button> <button type="button" class="btn btn-danger" ng-click="cancel()">Cancel</button> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--error-report.htm', '<div class="modal-body"> <p>{{\'MESSAGES.\' + vm.errorCode | translate}}</p> </div> <div class="modal-footer"> <button class="btn btn-sm" ng-click="vm.close(\'withReport\', vm.videoId)">Send Report</button> <button class="btn btn-sm" ng-click="vm.close()">Close</button> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--file-browser.htm', '<div class="modal-header"> <h3>File Browser</h3> <div class="spinner" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> </div> <div class="modal-body"> <input class="form-control input-sm" type="text" ng-model="search" placeholder="Search..."/> <br/> <ul class="list-group"> <li class="list-group-item" ng-repeat="file in files | filter:search"> {{file.originalFilename}} <button class="btn pull-right btn-success btn-xss" ng-click="chooseFile(file)">choose</button> </li> </ul> </div> <div class="modal-footer"> <button class="btn btn-sm" ng-click="cancel()">Cancel</button> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--file.htm', '<div class="modal-body"> <form class="form-horizontal"> <legend> Add File <div class="spinner" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> </legend> <video ng-repeat="file in video.files" src="{{file.src}}"></video> <button ng-model="file" class="btn btn-primary btn-block btn-lg" ngf-drop ngf-drag-over-class="dragover-upload" ngf-change="upload($files)" ngf-select> Drop or Select Attachment <span ng-show="uploadStatus.percentage">{{uploadStatus.percentage}}%</span> </button> </form> </div> <div class="modal-footer"> <button class="btn btn-success" ng-click="saveShow(newShow)">Save File</button> <button class="btn btn-warning" ng-click="cancel()">Cancel</button> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--genericVideo.htm', '<form class="form-horizontal"> <div class="modal-body"> <legend> Generic Video </legend> <div class="form-group"> <div class="col-sm-12"> <input type="text" class="form-control" ng-model="video.title" placeholder="Video Name"> </div> </div> <div> <div class="form-group row-slim"> <div class="col-sm-2"> <label>Release Date</label> <input type="text" class="form-control input-sm" ng-model="video.release_date" placeholder="2003-01-23"/> </div> <div class="col-sm-2"> <label>IMDB ID</label> <input type="text" class="form-control input-sm" ng-model="video.imdb_id" placeholder="i.e. tt0383126"/> </div> <div class="col-sm-2"> <label>Rating</label> <input type="text" class="form-control input-sm" ng-model="video.vote_average" placeholder="Rating 1-10"/> </div> <div class="col-sm-2"> <label>Rating Count</label> <input type="text" class="form-control input-sm" ng-model="video.vote_count" placeholder="Rating Count"/> </div> <div class="col-sm-2"> <label>YouTube Trailer ID</label> <input type="text" class="form-control input-sm" ng-model="video.trailerKey" placeholder="i.e. XAoQPp9XLt8"/> </div> </div> <div class="form-group"> <div class="col-sm-12"> <label>Overview</label> <textarea class="form-control" cols="30" rows="4" ng-model="video.overview" placeholder="Overview"></textarea> </div> </div> <div class="form-group"> <div class="col-sm-12"> <label>Genre</label> <ui-select class="tag-select" multiple ng-model="video.genre" theme="bootstrap" title="Add Genre"> <ui-select-match placeholder="Select Genre...">{{$item.name}}</ui-select-match> <ui-select-choices repeat="genre in genres | propsFilter: {name: $select.search}"> <div class="tag-name" ng-bind-html="genre.name | highlight: $select.search"></div> </ui-select-choices> </ui-select> </div> </div> <div class="form-group" ng-video="video.id"> <div class="col-sm-12"> <label>Tags</label> <ui-select class="tag-select" multiple tagging="tagTransform" ng-model="video.tags" theme="bootstrap" title="Add Tags" on-select="onTagSelect($item, $model)"> <ui-select-match placeholder="Select tag...">{{$item.name}}</ui-select-match> <ui-select-choices repeat="tag in tags | propsFilter: {name: $select.search}"> <div ng-if="tag.isNew" ng-bind-html="tag.name +\' <small>(new)</small>\'| highlight: $select.search"></div> <div ng-if="!tag.isNew" class="tag-wrapper"> <div class="tag-name" ng-bind-html="tag.name + tag.isTag| highlight: $select.search"></div> <i class="ion-trash-a" ng-click="deleteTag(tag)"></i> </div> </ui-select-choices> </ui-select> </div> </div> <div class="form-group"> <div class="col-sm-12"> <label>Poster Image</label> <br/> <div class="row"> <div class="col-sm-8"> <div class="upload-poster" ng-class="{\'update-poster\': video.poster_image_src}" ng-model="manualPoster" class="btn btn-primary btn-block btn-lg" ngf-change="uploadImage($files, \'poster_image\')" ngf-select ngf-drop ngf-drag-over-class="dragover"> <span class="main-text">Upload Poster</span> <span class="size-info">300x450 px</span> <span ng-show="imageUpload.percentage">{{imageUpload.percentage}}%</span> </div> </div> <div class="col-sm-4"> <img ng-show="video.poster_image || video.poster_image_src" ng-src="{{video.poster_image.src || video.poster_image_src}}"/> </div> </div> </div> </div> <div class="form-group"> <div class="col-sm-12"> <label>Backdrop Image</label> <br/> <div class="row"> <div class="col-sm-8"> <div class="upload-poster" ng-class="{\'update-poster\': video.backdrop_image_src}" ng-model="manualPoster" class="btn btn-primary btn-block btn-lg" ngf-change="uploadImage($files, \'backdrop_image\')" ngf-select ngf-drop ngf-drag-over-class="dragover"> <span class="main-text">Upload Backdrop</span> <span class="size-info">600x340 px</span> <span ng-show="imageUpload.percentage">{{imageUpload.percentage}}%</span> </div> </div> <div class="col-sm-4"> <img ng-show="video.backdrop_image_src" ng-src="{{video.backdrop_image_src}}"/> </div> </div> </div> </div> </div> </div> <div class="modal-footer"> <button ng-disabled="!video.title" class="btn btn-success" ng-click="saveVideo(video)">Save</button> <button class="btn btn-danger" ng-click="cancel()">Cancel</button> </div> </form>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--image-chooser.htm', '<div class="modal-body"> <legend> Choose new Image </legend> <div class="row"> <div class="col-xs-6 col-md-4" ng-repeat="image in vm.imagesForMedia"> <a ng-click="vm.chooseImage(image)" class="thumbnail"> <img ng-src="https://image.tmdb.org/t/p/w300{{image.file_path}}" class=""/> </a> </div> </div> </div> <div class="modal-footer"> <button class="btn btn-default" ng-click="vm.close()">Close</button> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--invite-user.htm', '<div class="modal-body"> <form class="form-horizontal"> <legend> Invite User <div class="spinner" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> </legend> <div class="panel panel-danger" ng-if="error"> <div class="panel-body" ng-if="error"> {{error}} </div> </div> <div ng-class="{\'has-error has-feedback\': error, \'has-success has-feedback\': validUser}"> <div class="form-group"> <div class="col-sm-3"> <label class="control-label">E-Mail-Address</label> </div> <div class="col-sm-8"> <input type="email" class="form-control" ng-model="user.username" placeholder="E-Mail-Address" ng-model-options="{updateOn: \'blur\'}" ng-change="checkAvailability(user.username)"> <span class="ion-close form-control-feedback" ng-show="error" aria-hidden="true"></span> <span class="ion-checkmark form-control-feedback" ng-show="validUser" aria-hidden="true"></span> </div> </div> </div> <div class="form-group"> <div class="col-sm-8 col-sm-offset-3"> <label> <input type="checkbox" ng-model="user.enabled"/> &nbsp; Enabled (user can log in and view videos)</label> </div> </div> <div class="form-group"> <div class="col-sm-3"> <label class="control-label">Roles</label> </div> <div class="col-sm-8"> <div class="form-control" style="height: auto;"> <div ng-repeat="role in roles"> <input type="checkbox" name="authorities[]" value="{{role.id}}" ng-checked="checkAuthorities(role.id)" ng-click="toggleAuthorities(role)"> {{role.displayName}} </div> </div> </div> </div> </form> </div> <div class="modal-footer"> <button ng-if="!user.id" class="btn btn-success" ng-disabled="!validUser && !user.id" ng-click="saveAndInviteUser(user)">Save & Invite User</button> <button ng-if="user.id" class="btn btn-success" ng-click="saveAndInviteUser(user)">Save User</button> <button type="button" class="btn btn-danger" ng-click="cancel()">Cancel</button> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--manage-files.htm', '<div class="modal-body"> <legend> Videos and subtitles for "{{video.name || video.title}}" </legend> <ul class="nav nav-tabs"> <li ng-class="{\'active\': activeTab== \'upload\'}" ng-click="activeTab = \'upload\'"><a>Upload</a></li> <li ng-class="{\'active\': activeTab== \'url\'}" ng-click="activeTab = \'url\'"><a>External URL</a></li> <li ng-class="{\'active\': activeTab== \'local\'}" ng-click="activeTab = \'local\'"><a>Local File</a></li> </ul> <div class="tab-content"> <div class="tab-pane" ng-class="{\'active\': activeTab== \'upload\'}"> <button ng-model="file" class="btn btn-dropzone btn-block btn-lg" ngf-drop ngf-drag-over-class="dragover-upload" ngf-change="upload($files)" ngf-select> <span ng-show="uploadStatus.percentage == null">Drop File or Click to Choose</span> <span ng-show="uploadStatus.percentage != null && uploadStatus.percentage < 100">Uploading {{uploadStatus.percentage}}%</span> <span ng-show="uploadStatus.percentage == 100"> <i class="ion-load-c spin icon-xl"></i> <br> Processing... </span> </button> </div> <div class="tab-pane" ng-class="{\'active\': activeTab== \'url\'}"> <div> <div class="form-group"> <input type="url" ng-model="video.externalLink" class="form-control input-sm" placeholder="External URL"> </div> </div> <button class="btn btn-success btn-sm" ng-click="addExternalUrl(video.externalLink)" ng-disabled="!video.externalLink">Add External URL</button> </div> <div class="tab-pane" ng-class="{\'active\': activeTab== \'local\'}"> <p ng-if="!$root.getSetting(\'Local Video Files\').value" class="alert alert-warning" role="alert">You dont have a local Directory set up. As an admin, go to the settings page to configure it now.</p> <div ng-if="$root.getSetting(\'Local Video Files\').value"> <div> <div class="form-group"> <input type="text" ng-model="localFileSearch" class="form-control input-sm" placeholder="Search current directory..."> </div> </div> <div style="overflow-y: auto; max-height: 200px;"> <span class="btn btn-default btn-sm" ng-click="backLocalDirectory()" ng-if="localDir.length> 0"> <span class="ion-android-arrow-back"></span> </span> <span>{{ localDir.join(\'/\') }}</span> <table class="table table-striped"> <tr ng-repeat="file in localFiles | orderBy: [\'-directory\', \'name\'] | filter:localFileSearch"> <td> <span ng-if="file.directory" ng-click="openLocalDirectory(file)"> <span class="ion-folder"></span> {{ file.name }} </span> <span ng-if="!file.directory"> <span class="ion-document"></span> {{ file.name }} </span> </td> <td> <span class="btn btn-success btn-xs" ng-click="addLocalFile(file.path)" ng-if="!file.directory"> Choose </span> </td> </tr> </table> </div> <div class="checkbox"> <label> <input type="checkbox" ng-model="closeOnSelect" ng-click="toggleCloseOnSelect()"> Close Modal on Select </label> </div> </div> </div> </div> <h4>Video Files</h4> <table class="table table-striped" style="font-size: 14px;" ng-show="video.videoFiles.length"> <thead> <tr> <th>ID</th> <th>Name </th> <th>Type</th> <th style="width: 86px;">is Default</th> <th>Label</th> <th style="width: 68px;"></th> </tr> </thead> <tbody> <tr ng-repeat="file in video.videoFiles"> <td>{{file.id}}</td> <td>{{file.originalFilename}}</td> <td>{{file.contentType}}</td> <td class="text-center"> <i ng-if="!isEditing(file)" ng-class="{\'ion-checkmark-round text-success\': file.isDefault, \'ion-close-round text-danger\': !file.isDefault}"></i> <input ng-if="isEditing(file)" type="checkbox" ng-model="file.isDefault"/> </td> <td> <span ng-if="!isEditing(file)">{{file.label}}</span> <input ng-if="isEditing(file)" class="form-control input-xs" value="{{file.label}}" placeholder="Language/Quality" ng-model="file.label"/> </td> <td style="padding: 6px;"> <a ng-if="!isEditing(file)" target="_blank" href="{{file.src}}" class="btn btn-xs btn-primary"><i class="ion-eye"></i></a> <button ng-if="!isEditing(file)" class="btn btn-xs" ng-click="toggleEdit(file)"><i class="ion-edit"></i></button> <button ng-if="isEditing(file)" title="Delete file" class="btn btn-xs btn-danger" ng-click="removeFile(file)"><i class="ion-trash-a"></i></button> <button ng-if="isEditing(file)" title="" class="btn btn-xs btn-success" ng-click="saveChanges(file)"><i class="ion-checkmark"></i></button> </td> </tr> </tbody> </table> <div ng-show="video.subtitles.length"> <br/> <h4>Subtitles</h4> <table class="table table-striped" style="font-size: 14px;"> <thead> <tr> <th>ID</th> <th>Name</th> <th>Type</th> <th>Label</th> <th>Language</th> <th style="width: 68px;"></th> </tr> </thead> <tbody> <tr ng-repeat="file in video.subtitles"> <td>{{file.id}}</td> <td>{{file.originalFilename}}</td> <td>{{file.contentType}}</td> <th> <input class="form-control input-xs" value="{{file.subtitleLabel}}" placeholder="Country" ng-change="subtitleLabel" ng-model="file.subtitleLabel"></input> </th> <th> <input class="form-control input-xs" value="{{file.subtitleSrcLang}}" placeholder="ISO-3166 Country Code" ng-change="subtitleSrcLang" ng-model="file.subtitleSrcLang"></input> </th> <td style="padding: 6px;"> <button title="Delete file" class="btn btn-xs btn-danger" ng-click="removeFile(file)"><i class="ion-trash-a"></i></button> <button title="" class="btn btn-xs btn-primary" ng-click="saveChanges(file)"><i class="ion-checkmark"></i></button> </td> </tr> </tbody> </table> </div> </div> <div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">Close</button> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--media-detail.htm', '<div class="modal-body modal-media-detail"> <div class="row"> <div class="col-xs-10"> <legend> {{media.name || media.title || media.showName}} <a ng-if="$root.isDownloadButtonVisible && mediaType== \'movie\'" href="{{media.videoFiles[0].src}}" download="{{media.videoFiles[0].originalFilename}}"> <i class="ion-android-download" style="font-size: 24px;"></i> </a> </legend> </div> <div class="col-xs-2"> <div class="pull-right"> <button ng-if="currentUser.isContentManager && !isEditButtonHidden && !isApiMovie" class="btn btn-primary btn-xs pull-left" style="margin-right: 15px;" ng-click="editMedia(media)">edit</button> <i class="ion-close pull-left" ng-click="cancel()"></i> </div> </div> </div> <div> </div> <div class="row"> <div class="col-xs-12"> <a ng-if="!isApiMovie" class="icon-play ion-android-arrow-dropright-circle" ui-sref="player({videoId: (firstEpisode.id || media.id)})"></a> <div ng-if="!media.inWatchlist" class="watchlist-button"> <i class="add-icon ion-android-add-circle" ng-click="addToWatchlist(media)"></i> </div> <div ng-if="media.inWatchlist" class="watchlist-button"> <i class="remove-icon ion-android-remove-circle" ng-click="removeFromWatchlist(media)"></i> </div> </div> </div> <hr> <div class="spinner big" ng-show="!media"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> <div ng-show="media"> <div class="row"> <div class="col-sm-8"> <div ng-if="mediaType != \'episode\'"> <ul class="info-list"> <li><strong>{{\'VIDEO.RELEASED\' | translate}}: </strong> {{media.release_date.substring(0,4) || media.first_air_date.substring(0,4)}}</li> <li><strong>{{\'VIDEO.IMDB\' | translate}}: </strong> <a target="_blank" href="http://www.imdb.com/title/{{media.imdb_id}}">{{media.name || media.title}}</a> </li> <li><strong>{{\'VIDEO.RATING\' | translate}}: </strong> {{media.vote_average}}/10 ({{media.vote_count}} {{\'VIDEO.VOTES\' | translate}}) </li> </ul> <hr/> </div> <div ng-if="mediaType == \'episode\'"> <h3>S{{media.season | padnumber:2}}E{{media.episodeNumber | padnumber:2}} - {{media.episodeName}}</h3> <ul class="info-list"> <li><strong>Air Date: </strong> {{media.first_air_date}}</li> </ul> </div> <h4>{{\'VIDEO.OVERVIEW\' | translate}}</h4> <p class="overview-text">{{media.overview || media.episodeOverview}}</p> <div ng-if="media.genre.length"> <h4>{{\'VIDEO.GENRE\' | translate}}</h4> <ul class="genre-list"> <li class="genre-tag interactive" ng-repeat="genre in media.genre" ui-sref="dash({genreId: genre.id})"> {{genre.name}} </li> </ul> </div> <img ng-if="media.still_path" ng-src="https://image.tmdb.org/t/p/w300/{{media.still_path}}"/> <div ng-if="media.trailerKey"> <h4>{{\'VIDEO.TRAILER\' | translate}}</h4> <iframe width="560" height="315" ng-src="{{\'https://www.youtube.com/embed/\'+media.trailerKey+\'?rel=0\' | trustResourceUrl}}" frameborder="0" allowfullscreen></iframe> </div> </div> <div class="col-sm-4"> <img ng-if="media.poster_path && !media.poster_image_src" ng-src="https://image.tmdb.org/t/p/w300/{{media.poster_path}}"/> <img ng-if="media.poster_image_src" ng-src="{{media.poster_image_src}}"/> </div> </div> <hr> <div class="season-picker-list"> <span class="season-picker-item" ng-class="{\'active\': currentSeason== season}" ng-click="setCurrentSeason(season)" ng-repeat="season in seasons | orderBy:number"> {{\'VIDEO.SEASON\' | translate}} {{season}} </span> </div> <div class="media-list"> <div class="media-list-item episode-wrapper" style="padding-bottom: 8px;" ng-repeat="episode in listEpisodesForSeason(currentSeason) | orderBy:\'episode_number\'" ng-class="{\'no-files\': !episode.hasFile}"> <h3 class="media-episode-string"> <span ng-show="episode.episodeString">{{episode.episodeString}}</span> <span ng-show="!episode.episodeString">s{{episode.season_number | padnumber:2}}e{{episode.episode_number | padnumber:2}}</span> <a class="pull-right" ng-if="$root.isDownloadButtonVisible" href="{{episode.videoFiles[0].src}}" download="{{episode.videoFiles[0].originalFilename}}"> <i class="ion-android-download" style="font-size: 24px;"></i> </a> </h3> <h3 class="media-title">{{episode.name}}</h3> <div class="media-item"> <img ng-if="episode.still_path" ng-src="https://image.tmdb.org/t/p/w300/{{episode.still_path}}"/> <img ng-if="!episode.still_path && episode.still_image_src" ng-src="{{episode.still_image_src}}"/> <div ng-if="!episode.still_path && !episode.still_image_src" class="fallback-image"></div> <a ng-show="episode.hasFile" ui-sref="player({videoId: episode.id})" class="play-icon ion-ios-play"></a> </div> <streama-progress-bar video="episode" ng-if="episode.isInProgress"></streama-progress-bar> <div style="height: 35px;" ng-if="!episode.isInProgress"></div> </div> </div> </div> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--movie.htm', '<form class="form-horizontal"> <div class="modal-body"> <legend> Movie <button class="btn btn-sm btn-white btn-outline pull-right" ng-show="hasMovieDBKey" ng-click="toggleAddManually()"> <span ng-show="!addManually && !movie.id">Add Manually</span> <span ng-show="addManually">Add Automatically</span> </button> </legend> <div class="form-group"> <div class="col-sm-12 typeahead-wrapper" ng-if="!addManually"> <input type="text" class="form-control name-input" ng-model="movie.title" placeholder="Search from TheMovieDB..." typeahead-loading="loading" typeahead-append-to-body="true" uib-typeahead="item.title for item in search($viewValue)" typeahead-on-select="selectFromAPI($item)" typeahead-template-url="/streama/typeahead--movie.htm"> <div class="spinner" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> </div> <div class="col-sm-12" ng-if="addManually"> <input type="text" class="form-control" ng-model="movie.title" placeholder="Movie Name"> </div> </div> <div ng-show="movie.apiId || addManually"> <div class="form-group row-slim"> <div class="col-sm-2"> <label>Release Date</label> <input type="text" class="form-control input-sm" ng-model="movie.release_date" placeholder="2003-01-23"/> </div> <div class="col-sm-2"> <label>IMDB ID</label> <input type="text" class="form-control input-sm" ng-model="movie.imdb_id" placeholder="tt0383126"/> </div> <div ng-hide="addManually"> <div class="col-sm-2"> <label>TheMovieDB ID</label> <input type="text" class="form-control input-sm" disabled ng-model="movie.apiId" placeholder="TheMovieDB ID"/> </div> <div class="col-sm-2"> <label>Rating</label> <input type="text" class="form-control input-sm" ng-model="movie.vote_average" placeholder="Rating"/> </div> <div class="col-sm-2"> <label>Rating Count</label> <input type="text" class="form-control input-sm" ng-model="movie.vote_count" placeholder="Rating Count"/> </div> <div class="col-sm-2"> <label>Outro Start</label> <input type="text" class="form-control input-sm" ng-model="movie.outro_start" video-time-format placeholder="00:00:00 (time of outro start)"/> </div> </div> </div> <div class="form-group row-slim"> <div class="col-sm-3"> <label>YouTube Trailer Key</label> <input type="text" class="form-control input-sm" ng-model="movie.trailerKey"/> </div> <div class="col-sm-3"> <label>Timestamp Added</label> <input type="text" class="form-control input-sm" ng-model="movie.dateCreated"/> </div> <div class="col-sm-3"> <label>Poster ID</label> <input type="text" class="form-control input-sm" ng-model="movie.poster_path"/> </div> <div class="col-sm-3"> <label>Backdrop ID</label> <input type="text" class="form-control input-sm" ng-model="movie.backdrop_path"/> </div> </div> <div class="form-group row-slim" ng-if="movie.apiId"> <div class="col-sm-3"> <label>TMDB Link:</label> <a ng-href="https://www.themoviedb.org/movie/{{movie.apiId}}" target="_blank">{{movie.title}}</a> </div> </div> <div class="form-group"> <div class="col-sm-12"> <label>Overview</label> <textarea class="form-control" cols="30" rows="4" ng-model="movie.overview" placeholder="Overview"></textarea> </div> </div> <div ng-hide="addManually"> <div class="form-group"> <div class="col-sm-12"> <label>Genre</label> <ui-select class="tag-select" multiple ng-model="movie.genre" theme="bootstrap" title="Add Genre"> <ui-select-match placeholder="Select Genre...">{{$item.name}}</ui-select-match> <ui-select-choices repeat="genre in genres | propsFilter: {name: $select.search}"> <div class="tag-wrapper"> <div class="tag-name" ng-bind-html="genre.name + genre.isTag| highlight: $select.search"></div> </div> </ui-select-choices> </ui-select> </div> </div> </div> <div class="form-group" ng-show="movie.id"> <div class="col-sm-12"> <label>Tags</label> <ui-select class="tag-select" multiple tagging="tagTransform" ng-model="movie.tags" theme="bootstrap" title="Add Tags" on-select="onTagSelect($item, $model)"> <ui-select-match placeholder="Select tag...">{{$item.name}}</ui-select-match> <ui-select-choices repeat="tag in tags | propsFilter: {name: $select.search}"> <div ng-if="tag.isNew" ng-bind-html="tag.name +\' <small>(new)</small>\'| highlight: $select.search"></div> <div ng-if="!tag.isNew" class="tag-wrapper"> <div class="tag-name" ng-bind-html="tag.name + tag.isTag| highlight: $select.search"></div> <i class="ion-trash-a" ng-click="deleteTag(tag)"></i> </div> </ui-select-choices> </ui-select> </div> </div> <div class="form-group" ng-if="movie.backdrop_path"> <div class="col-sm-6"> <label>Image</label> <br/> <img ng-src="https://image.tmdb.org/t/p/w300/{{movie.backdrop_path}}"/> <br> <br> <button class="btn btn-default btn-sm" ng-click="chooseNewBackdrop()">Choose another image</button> </div> </div> <div class="form-group" ng-if="!movie.backdrop_path && movie.id"> <div class="col-sm-12"> <label>Poster Image</label> <br/> <div class="row"> <div class="col-sm-8"> <div class="upload-poster" ng-class="{\'update-poster\': movie.poster_image_src}" ng-model="manualPoster" class="btn btn-primary btn-block btn-lg" ngf-change="uploadImage($files, \'poster_image\')" ngf-select ngf-drop ngf-drag-over-class="dragover"> <span class="main-text">Upload Poster</span> <span class="size-info">300x450 px</span> <span ng-show="imageUpload.percentage">{{imageUpload.percentage}}%</span> </div> </div> <div class="col-sm-4"> <img ng-show="movie.poster_image || movie.poster_image_src" ng-src="{{movie.poster_image.src || movie.poster_image_src}}"/> </div> </div> </div> </div> </div> </div> <div class="modal-footer" ng-if="movie.apiId || addManually"> <button class="btn btn-success" ng-click="saveMovie(movie)" ng-disabled="!movie.title">Save</button> <button class="btn btn-default" ng-click="cancel()">Cancel</button> </div> </form>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--new-release.htm', '<div class="modal-body"> <form class="form-horizontal"> <legend> Highlight on Dashboard </legend> <div class="form-group"> <div class="col-sm-12"> <label>Highlight Description:</label> <input class="form-control" type="text" ng-model="newRelease.description" placeholder="Optional description for new release"> </div> </div> <div class="form-group" ng-if="episodes.length"> <div class="col-sm-12"> <label>Starting Episode:</label> <select class="form-control" ng-model="newRelease.videoToPlay" required ng-options="episode as (episode.episodeString + \' - \' + episode.name) for episode in episodes"></select> </div> </div> </form> </div> <div class="modal-footer"> <button class="btn btn-success" ng-click="save(newRelease)">Save Highlight</button> <button class="btn btn-warning" ng-click="cancel()">Cancel</button> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--notification-add.htm', '<form class="form-horizontal" name="notificationForm" novalidate> <div class="modal-body"> <legend> New Notification </legend> <div class="form-group" ng-show="!selectedItem.id"> <div class="col-sm-12 typeahead-wrapper" ng-if="!addManually"> <input type="text" class="form-control name-input" ng-model="typeahead.currentTitle" placeholder="Search from TV-Shows/Movies..." typeahead-loading="loading" typeahead-append-to-body="true" uib-typeahead="item.title for item in search($viewValue)" typeahead-on-select="selectFromAPI($item)" typeahead-template-url="/streama/typeahead--media.htm" typeahead-min-length="3" typeahead-wait-ms="500" required> <div class="spinner" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> </div> </div> <div class="form-group" ng-show="selectedItem.id"> <button type="button" class="close pull-right" aria-label="Close" ng-click="clearNotification()"><span aria-hidden="true">&times;</span></button> <div ng-switch="selectedItem.mediaType"> <div ng-switch-when="tvShow"> <div class="col-md-4" ng-if="selectedItem.backdrop_path"> <img ng-src="https://image.tmdb.org/t/p/w300/{{selectedItem.backdrop_path}}"/> </div> <div class="col-md-8"> <h2>{{selectedItem.name}}</h2> <p>{{selectedItem.overview}}</p> </div> </div> <div ng-switch-when="movie"> <div class="col-md-4" ng-if="selectedItem.poster_path"> <img ng-src="https://image.tmdb.org/t/p/w300/{{selectedItem.poster_path}}"/> </div> <div class="col-md-8"> <h2>{{selectedItem.title}}</h2> <p>{{selectedItem.overview}}</p> </div> </div> </div> </div> <div class="form-group" ng-show="selectedItem.id && selectedItem.mediaType==\'tvShow\'"> <div class="col-sm-12"> <label>Description</label> <textarea class="form-control" cols="30" rows="4" ng-model="notification.description" placeholder="Description"></textarea> </div> </div> </div> <div class="modal-footer"> <button class="btn btn-danger" ng-click="cancel()">Cancel</button> <button class="btn btn-success" ng-click="saveNotification(notification)" ng-disabled="!selectedItem.id">Save Notification</button> </div> </form>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--playback-options.htm', '<div class="modal-body"> <legend> Playback Options </legend> <div class="row"> <div class="col-md-6"> <h4>{{\'VIDEO.SUBTITLES\' | translate}}</h4> <ul class="track-selector-list"> <li class="track-selector-item" ng-class="{\'active\': vm.isSubtitleSelected(null)}" ng-click="vm.selectSubtitle()"> {{\'VIDEO.NO_SUBTITLE\' | translate}} &nbsp; <i ng-if="vm.isSubtitleSelected(null)" class="ion-checkmark"></i> </li> <li class="track-selector-item" ng-class="{\'active\': vm.isSubtitleSelected(track)}" ng-repeat="track in vm.playerOptions.subtitles" ng-click="vm.selectSubtitle(track)"> {{track.subtitleLabel || track.originalFilename}} <i ng-if="vm.isSubtitleSelected(track)" class="ion-checkmark"></i> </li> </ul> <div> <h4>{{\'VIDEO.SUBTITLE_SIZE\' | translate}}</h4> <ul class="subtitle-size-picker" ng-if="!vm.playerOptions.hasCustomSubtitleSize"> <li class="subtitle-size-lg" ng-class="{\'active\': vm.playerOptions.subtitleSize == \'lg\'}" ng-click="vm.changeSubtitleSize(\'lg\')">A</li> <li class="subtitle-size-md" ng-class="{\'active\': vm.playerOptions.subtitleSize == \'md\'}" ng-click="vm.changeSubtitleSize(\'md\')">A</li> <li class="subtitle-size-sm" ng-class="{\'active\': vm.playerOptions.subtitleSize == \'sm\'}" ng-click="vm.changeSubtitleSize(\'sm\')">A</li> </ul> <div> <label><input type="checkbox" ng-model="vm.playerOptions.hasCustomSubtitleSize"> Custom Size?</label> <input ng-if="vm.playerOptions.hasCustomSubtitleSize" class="form-control input-sm" type="text" placeholder="Custom Font Size (in px)" ng-model="vm.playerOptions.customSubtitleSize"> </div> </div> </div> <div class="col-md-6"> <h4>{{\'VIDEO.VIDEO_FILES\' | translate}}</h4> <ul class="track-selector-list"> <li class="track-selector-item" ng-class="{\'active\': vm.isVideoFileSelected(track)}" ng-repeat="track in vm.playerOptions.videoFiles" ng-click="vm.selectVideoFile(track)"> {{track.label || track.originalFilename}} <i ng-if="vm.isVideoFileSelected(track)" class="ion-checkmark"></i> </li> </ul> </div> </div> </div> <div class="modal-footer"> <button class="btn btn-default btn-sm" ng-click="vm.close()">Close</button> <button class="btn btn-success btn-sm" ng-click="vm.submit()">Submit</button> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--tvShow.htm', '<form class="form-horizontal"> <div class="modal-body"> <legend> New Show <button class="btn btn-sm btn-white btn-outline pull-right" ng-show="hasMovieDBKey" ng-click="toggleAddManually()"> <span ng-show="!tvShow.manualInput">Add Manually</span> <span ng-show="tvShow.manualInput">Add Automatically</span> </button> </legend> <div class="form-group"> <div class="col-sm-12 typeahead-wrapper" ng-if="!tvShow.manualInput"> <input type="text" class="form-control name-input" ng-model="tvShow.name" placeholder="Search from TheMovieDb..." typeahead-loading="loading" typeahead-append-to-body="true" uib-typeahead="show.name for show in search($viewValue)" typeahead-on-select="selectFromAPI($item)" typeahead-template-url="/streama/typeahead--tvShow.htm"> <div class="spinner" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> </div> <div class="col-sm-12"> <input class="form-control name-input" ng-if="tvShow.manualInput" type="text" ng-model="tvShow.name" placeholder="Show Name*"> </div> </div> <div ng-show="tvShow.apiId || tvShow.manualInput"> <div class="form-group row-slim"> <div class="col-sm-2"> <label>Release Date</label> <input type="text" class="form-control input-sm" ng-model="tvShow.first_air_date" placeholder="yyyy-mm-dd"/> </div> <div class="col-sm-2"> <label>IMDB ID</label> <input type="text" class="form-control input-sm" ng-model="tvShow.imdb_id" placeholder="tt0383126"/> </div> <div ng-hide="tvShow.manualInput"> <div class="col-sm-2"> <label>TheMovieDB ID</label> <input type="text" class="form-control input-sm" ng-disabled="tvShow.manualInput" ng-model="tvShow.apiId" placeholder="TheMovieDB ID"/> </div> <div class="col-sm-2"> <label>Rating</label> <input type="text" class="form-control input-sm" ng-model="tvShow.vote_average" placeholder="Rating"/> </div> <div class="col-sm-2"> <label>Rating Count</label> <input type="text" class="form-control input-sm" ng-model="tvShow.vote_count" placeholder="Rating Count"/> </div> </div> </div> <div class="form-group row-slim"> <div class="col-sm-3"> <label>Timestamp Added</label> <input type="text" class="form-control input-sm" ng-model="tvShow.dateCreated"/> </div> <div class="col-sm-3"> <label>Poster ID</label> <input type="text" class="form-control input-sm" ng-model="tvShow.poster_path"/> </div> <div class="col-sm-3"> <label>Backdrop ID</label> <input type="text" class="form-control input-sm" ng-model="tvShow.backdrop_path"/> </div> </div> <div class="form-group row-slim"> <div class="col-sm-3"> <label>TMDB Link:</label> <a ng-href="https://www.themoviedb.org/tv/{{tvShow.apiId}}" target="_blank">{{tvShow.name}}</a> </div> </div> <div class="form-group"> <div class="col-sm-12"> <label>Overview</label> <textarea class="form-control" cols="30" rows="4" ng-model="tvShow.overview" placeholder="Overview"></textarea> </div> </div> <div ng-hide="tvShow.manualInput"> <div class="form-group"> <div class="col-sm-12"> <label>Genre</label> <ui-select class="tag-select" multiple ng-model="tvShow.genre" theme="bootstrap" title="Add Genre"> <ui-select-match placeholder="Select Genre...">{{$item.name}}</ui-select-match> <ui-select-choices repeat="genre in genres | propsFilter: {name: $select.search}"> <div class="tag-wrapper"> <div class="tag-name" ng-bind-html="genre.name + genre.isTag| highlight: $select.search"></div> </div> </ui-select-choices> </ui-select> </div> </div> </div> <div class="form-group" ng-if="!tvShow.manualInput"> <div class="col-sm-6"> <label>Image</label> <br/> <img ng-src="https://image.tmdb.org/t/p/w300/{{tvShow.backdrop_path}}"/> </div> </div> </div> </div> <div class="modal-footer" ng-show="tvShow.apiId || tvShow.manualInput"> <button class="btn btn-success" ng-click="saveShow(tvShow)">Save Show</button> <button class="btn btn-danger" ng-click="cancel()">Cancel</button> </div> </form>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--video.htm', '<form class="form-horizontal"> <div class="modal-body"> <legend> Episode &nbsp;<span ng-if="episode.id" class="text-muted text-sm">(id: {{episode.id}})</span> </legend> <div class="form-group"> <div class="col-sm-12 typeahead-wrapper" ng-if="!addManually"> <input type="text" class="form-control name-input" ng-model="episode.name" placeholder="Episode Name" typeahead-loading="loading" typeahead="episode.episodename for episode in search($viewValue)" typeahead-on-select="selectEpisode($item)" typeahead-template-url="typeahead--episode.htm"> <div class="spinner" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> </div> <div class="col-sm-12" ng-if="addManually"> <input type="text" class="form-control" ng-model="episode.name" placeholder="Episode Name*"> </div> </div> <div ng-show="episode.episode_number || addManually"> <div class="form-group row-slim"> <div class="col-sm-2"> <label>Episode Number*</label> <input type="text" class="form-control input-sm" ng-model="episode.episode_number" placeholder="#"/> </div> <div class="col-sm-2"> <label>Season Number*</label> <input type="text" class="form-control input-sm" ng-model="episode.season_number" placeholder="#"/> </div> <div class="col-sm-2"> <label>Episode String</label> <input type="text" class="form-control input-sm" ng-model="episode.episodeString" placeholder="s##e##"/> </div> <div class="col-sm-2"> <label>First Aired</label> <input type="text" class="form-control input-sm" ng-model="episode.air_date" placeholder="yyyy-mm-dd"/> </div> <div class="col-sm-2"> <label>TheMovieDB ID</label> <input type="text" class="form-control input-sm" ng-disabled="addManually" ng-model="episode.apiId" placeholder="TheMovieDB ID"/> </div> <div class="col-sm-2"> <label>Rating</label> <input type="text" class="form-control input-sm" ng-disabled="addManually" ng-model="episode.vote_average" placeholder="Rating"/> </div> </div> <div class="form-group row-slim"> <div class="col-sm-2"> <label>Intro Start</label> <input type="text" class="form-control input-sm" video-time-format ng-model="episode.intro_start" placeholder="0:0"/> </div> <div class="col-sm-2"> <label>Intro End</label> <input type="text" class="form-control input-sm" ng-model="episode.intro_end" video-time-format placeholder="0:0"/> </div> <div class="col-sm-2"> <label>Outro Start</label> <input type="text" class="form-control input-sm" ng-model="episode.outro_start" video-time-format placeholder="00:00:00"/> </div> </div> <div class="form-group"> <div class="col-sm-12"> <label>Overview</label> <textarea class="form-control" cols="30" rows="4" ng-model="episode.overview" placeholder="Overview"></textarea> </div> </div> <div class="form-group" ng-if="episode.still_path && episode.id"> <div class="col-sm-6"> <label>Image</label> <br/> <img ng-if="episode.still_path" ng-src="https://image.tmdb.org/t/p/w500/{{episode.still_path}}"/> </div> </div> <div class="form-group" ng-if="!episode.still_path && episode.id"> <div class="col-sm-12"> <label>Episode Image</label> <br/> <div class="row"> <div class="col-sm-8"> <div class="upload-poster" ng-class="{\'update-poster\': episode.still_image_src}" ng-model="manualImage" class="btn btn-primary btn-block btn-lg" ngf-change="uploadImage($files, \'still_image\')" ngf-select ngf-drop ngf-drag-over-class="dragover"> <span class="main-text">Upload Episode Image</span> <span class="size-info">(recommended: 1000x563 px)</span> <span ng-show="imageUpload.percentage">{{imageUpload.percentage}}%</span> </div> </div> <div class="col-sm-4"> <img ng-show="episode.still_image || episode.still_image_src" ng-src="{{episode.still_image.src || movie.still_image_src}}"/> </div> </div> </div> </div> </div> </div> <div class="modal-footer"> <div class="btn-group pull-left" ng-if="episode.id"> <button class="btn btn-danger btn-sm" ng-if="episode.id" ng-click="deleteVideo(episode)">Delete Episode</button> <button class="btn btn-sm" ng-click="refetch(episode)">Re-Fetch Episode</button> </div> <div class="btn-group"> <button class="btn btn-success" ng-disabled="!episode.episode_number" ng-click="saveEpisode(episode)">Save</button> </div> </div> </form>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/player.htm', '<div class="player-wrapper"> <streama-video-player options="videoOptions" ng-if="videoOptions.videoSrc"> </streama-video-player> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/popover--files.htm', '<div class="files-wrapper" ng-show="episode.videoFiles.length"> <div class="file-wrapper" ng-repeat="file in episode.videoFiles"> <div class="file-name"> {{file.originalFilename}} &nbsp; <button ng-click="removeFile(file)" title="Remove File" class="btn btn-danger btn-xxs"><i class="ion-close"></i></button> </div> </div> </div> <div class="files-wrapper" ng-show="episode.subtitles.length"> <hr/> <h4>Added Subtitles</h4> <div class="file-wrapper" ng-repeat="file in episode.subtitles"> <div class="file-name"> {{file.originalFilename}} &nbsp; <button ng-click="removeFile(file)" title="Remove File" class="btn btn-danger btn-xxs"><i class="ion-close"></i></button> </div> </div> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/popover--movie-files.htm', '<div class="files-wrapper" ng-show="movie.files.length"> <div class="file-wrapper" ng-repeat="file in movie.files"> <div class="file-name"> {{file.originalFilename}} &nbsp; <button ng-click="removeFile(file)" tooltip="Remove File" class="btn btn-danger btn-xxs"><i class="ion-close"></i></button> </div> </div> </div> <div class="files-wrapper" ng-show="movie.subtitles.length"> <hr/> <h4>Added Subtitles</h4> <div class="file-wrapper" ng-repeat="file in movie.subtitles"> <div class="file-name"> {{file.originalFilename}} &nbsp; <button ng-click="removeFile(file)" tooltip="Remove File" class="btn btn-danger btn-xxs"><i class="ion-close"></i></button> </div> </div> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/settings-settings.htm', '<button class="btn btn-primary pull-right" ng-click="updateMultipleSettings(settings)" ng-disabled="anySettingsInvalid()">Save Settings</button> <button class="btn btn-info pull-right" style="margin-left: 4px;" ng-click="syncImages()"><i class="ion-arrow-return-right"></i> Fix & Sync Images</button> <h1> Settings <div class="spinner" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> </h1> <div class="spinner big big-loading" ng-show="bigLoading"> <i class="ion-load-c spin"></i> </div> <hr/> <form name="settings-form" class="settings-form"> <div class="form-group row-slim" ng-repeat="setting in settings"> <div class="col-sm-3"> <label class="control-label">{{setting.settingsKey}} <span ng-if="setting.required" style="color:red">*</span></label> </div> <div ng-switch="setting.settingsType"> <div ng-switch-when="string"> <div class="col-sm-7" ng-class="{\'has-error has-feedback\': setting.invalid, \'has-success has-feedback\': setting.valid}"> <input ng-required="setting.required" type="text" class="form-control" ng-model="setting.value" placeholder="{{setting.settingsKey}}" ng-change="changeValue(setting)" ng-blur="(!setting.valid && setting.dirty && setting.validationRequired!==false)?validateSettings(setting):fasle"> <span class="glyphicon ion-close form-control-feedback" ng-show="setting.invalid" aria-hidden="true"></span> <span class="glyphicon ion-checkmark form-control-feedback" ng-show="setting.valid" aria-hidden="true"></span> </div> <div class="col-sm-2"> <div type="button" class="btn btn-success btn-block" ng-click="validateSettings(setting)" ng-show="!setting.valid && setting.dirty && setting.validationRequired !== false">validate</div> </div> </div> <div ng-switch-when="boolean" class="col-sm-2"> <input type="checkbox" ng-model="setting.value" ng-init="setting.value = (setting.value == \'true\')"/> </div> <div ng-switch-when="integer" class="col-sm-2"> <input type="text" class="form-control" ng-model="setting.value"/> </div> <div ng-switch-when="wysiwyg" class="col-md-6"> <streama-wysiwyg ng-model="setting.value"></streama-wysiwyg> </div> <div ng-switch-when="fileUpload" class="col-sm-7"> <div class="row"> <div class="col-md-6"> <div ng-model="file" class="btn btn-dark" ngf-drop ngf-drag-over-class="dragover-upload" ngf-change="upload(setting, $files)" ngf-select> Drop or Select Logo <span ng-show="uploadStatus.percentage">{{uploadStatus.percentage}}%</span> </div> </div> <div class="col-md-6"> <div> <img class="pull-right" ng-show="getAssetFromSetting(setting)" ng-src="{{setting.src}}" alt="Streama Logo"> </div> <div> <input ng-required="setting.required" ng-init="setting.required=true" class="form-control input-sm" type="text" ng-model="setting.value"/> </div> <div> <div class="btn btn-sm btn-dark" ng-click="setting.value = setting.defaultValue"> Reset to default </div> </div> </div> </div> </div> </div> <div class="col-sm-7 col-sm-offset-3"> <a ng-if="setting.settingsKey==\'Base URL\'" ng-click="resetBaseURL(setting)"> Reset to default value.</a> <p class="settings-description" ng-bind-html="setting.description"></p> </div> <hr class="col-xs-12"> </div> </form> <p style="color:red">* required field</p> <hr/> <button class="btn btn-primary pull-right" ng-click="updateMultipleSettings(settings)" ng-disabled="anySettingsInvalid()">Save Settings</button>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/settings-user-activity.htm', '<h1>User Activity</h1> <div class="spinner big" ng-show="vm.loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> <hr/> <div class="row"> <div class="col-sm-6"> <h4>Filter</h4> <select class="form-control input-sm" ng-model="vm.filter.user" ng-options="user as user.username for user in vm.users" ng-change="vm.onUserSelect()"> <option value="">---All Users---</option> </select> </div> <div class="col-sm-6"> <h4>Sort</h4> <select class="form-control input-sm" ng-model="vm.currentSort" ng-options="sortOption.key as sortOption.label for sortOption in vm.sortOptions" ng-change="vm.onSortChange()"> </select> </div> </div> <br> <uib-tabset active="activePill"> <uib-tab index="0" heading="Login Activity" ng-click="vm.changeType(\'login\')"> <table class="table table-striped"> <thead> <tr> <td>User</td> <td>date Created</td> <td>Device</td> <td>Operating System</td> <td>Browser</td> <td>IP Address</td> </tr> </thead> <tr ng-repeat="activity in vm.userActivity.list"> <td>{{activity.username}} <span class="opacity-50 text-sm">(id: {{activity.userId}})</span></td> <td>{{activity.dateCreated | date:\'short\'}}</td> <td>{{activity.device}}</td> <td>{{activity.operatingSystem}}</td> <td>{{activity.browser}}</td> <td>{{activity.ipAddress}}</td> </tr> </table> <ul uib-pagination ng-if="vm.userActivity.list.length < vm.userActivity.total" max-size="7" force-ellipses="true" boundary-links="true" total-items="vm.userActivity.total" ng-model="vm.pagination.currentPage" ng-change="vm.pagination.onChange()"></ul> </uib-tab> <uib-tab index="1" heading="Video Activity" ng-click="vm.changeType(\'video\')"> <table class="table table-striped"> <thead> <tr> <td>User</td> <td>last viewed</td> <td>Video</td> <td>Play</td> <td>Device</td> <td>Operating System</td> <td>Browser</td> <td>IP Address</td> </tr> </thead> <tr ng-repeat="activity in vm.userActivity.list"> <td>{{activity.username}} <span class="opacity-50 text-sm">(id: {{activity.userId}})</span></td> <td>{{(activity.lastUpdated || activity.dateCreated) | date:\'short\'}}</td> <td style="width: 185px;"> <img ng-if="activity.video.poster_path || activity.video.show.poster_path" ng-src="https://image.tmdb.org/t/p/w92/{{activity.video.show.poster_path || activity.video.poster_path}}" style="max-width: 50px; margin-right: 10px; float: left;"/> <div>{{activity.video.title || activity.video.name}}</div> <div class="text-muted" ng-if="activity.video.canonicalName === \'streama.Episode\'">s{{activity.video.season_number| padnumber:2}}e{{activity.video.episode_number | padnumber:2}}</div> <div class="text-muted">({{(activity.video.show.first_air_date || activity.video.release_date).substring(0,4)}})</div> </td> <td> <a class="ion-android-arrow-dropright-circle" style="font-size: 30px" ui-sref="player({videoId: activity.video.id})"></a> </td> <td>{{activity.device}}</td> <td>{{activity.operatingSystem}}</td> <td>{{activity.browser}}</td> <td>{{activity.ipAddress}}</td> </tr> </table> <ul uib-pagination ng-if="vm.userActivity.list.length < vm.userActivity.total" max-size="7" force-ellipses="true" boundary-links="true" total-items="vm.userActivity.total" ng-model="vm.pagination.currentPage" ng-change="vm.pagination.onChange()"></ul> </uib-tab> </uib-tabset>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/settings-users.htm', '<div class="pull-right"> <button class="btn btn-primary" ng-click="openUserInviteModal()">Invite User via email</button> <button class="btn btn-primary" ng-click="openUserCreateModal()">Create User</button> </div> <h1>Users</h1> <div class="spinner big" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> <hr/> <table class="table table-striped"> <thead> <tr> <td>Username</td> <td>date Created</td> <td>enabled</td> <td>invitation link</td> <td>roles</td> <td></td> </tr> </thead> <tr ng-repeat="user in users"> <td>{{user.username}}</td> <td>{{user.dateCreated | date:\'short\'}}</td> <td> <i class="ion-checkmark color-success" ng-show="user.enabled"></i> <i class="ion-close color-danger" ng-show="!user.enabled"></i> </td> <td> <input ng-if="user.invitationLink" class="form-control input-xs" type="text" ng-model="user.invitationLink"/> </td> <td> <span class="comma-separatad" ng-repeat="role in user.authorities">{{role.displayName}}</span></td> <td style="width: 110px;"> <button class="btn btn-xs btn-primary" ng-click="openUserEditModal(user)">edit</button> <button class="btn btn-xs btn-danger" ng-click="delete(user)">delete</button> </td> </tr> </table> <hr/> <p class="text-muted"> Users with the role <strong>Admin</strong> can edit Users & Settings. <br/> Users with the role <strong>Content Manager</strong> can edit content. <br/> Users with <strong>both rules</strong> have full rights.</p>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/settings.htm', '<div class="admin"> <div class="nav"> <ul> <li ng-class="{\'active\': isCurrentState(\'settings.settings\')}" ng-if="$root.currentUser.isAdmin"> <a ui-sref="settings.settings">Settings</a> </li> <li ng-class="{\'active\': isCurrentState(\'settings.users\')}" ng-if="$root.currentUser.isAdmin"> <a ui-sref="settings.users">Users</a> </li> <li ng-class="{\'active\': isCurrentState(\'settings.userActivity\')}" ng-if="$root.currentUser.isAdmin"> <a ui-sref="settings.userActivity">User Activity</a> </li> </ul> </div> <div class="admin-content"> <ui-view/> </div> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/streama-video-player.htm', '<div class="video-wrapper-inner" ng-mousemove="showControls()" ng-mouseleave="delayHideControls()" ng-class="{\'controls-visible\': controlsVisible}"> <div> <div class="volume-info" ng-show="volumeChanged"> {{volumeLevel * 10}}% Volume </div> <div class="volume-info" ng-show="currentTimeChanged"> <br> <strong ng-show="currentTime"> <span>{{currentTime | secondsToTimeDisplay}}</span> </strong> <span>{{videoDuration | secondsToTimeDisplay}}</span> </div> </div> <i class="ion-android-arrow-back player-back" ng-class="{\'visible\': controlsVisible}" ng-click="closeVideo()"></i> <div class="spinner" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> <div class="overlay" ng-class="{\'visible\': overlayVisible}" ng-if="options.videoOverlayEnabled"> <div class="video-info"> <p>You\'re watching</p> <h1>{{options.videoMetaTitle}}</h1> <h3>{{options.videoMetaSubtitle}}</h3> <p ng-if="!isMobile">{{options.videoMetaDescription}}</p> </div> </div> <div class="next-video-overlay" ng-if="isNextVideoShowing"> <div class="row next-video-overlay-inner"> <div class="col-xs-3"> <streama-video-image video="options.nextVideo" type="poster" size="154"></streama-video-image> </div> <div class="col-xs-8"> <h4>{{\'VIDEO.UPNEXT\' | translate}}</h4> <h3>{{options.nextVideo.fullTitle || options.nextVideo.title}}</h3> <p>{{options.nextVideo.overview.length > 150 ? options.nextVideo.overview.substring(0, 150) + \'...\' : options.nextVideo.overview}}</p> <button class="play-button with-label" ng-click="next()"> <span class="play-label">play now</span> <i class="ion-ios-play"></i></button> </div> </div> </div> <i ng-if="isMobile && !playing && canplay" class="play-button ion-ios-play" ng-click="pause();play()"></i> <div class="player-controls-wrapper player-active no-select" ng-class="{\'visible\': controlsVisible}" ng-hide="loading && !initialPlay"> <div class="slider-ui-wrapper" ng-show="!volumeOpen"> <div id="playerDurationSlider" class="player-ui-slider" ui-slider="scrubberOptions" min="0" max="{{videoDuration}}" ng-model="currentTime"></div> <div class="time-display"> <strong ng-show="currentTime"> <span ng-if="currentTime>= 3600">{{currentTime | secondsToDateTime | date:\'hh:mm:ss\'}}</span> <span ng-if="currentTime < 3600">{{currentTime | secondsToDateTime | date:\'mm:ss\'}}</span> </strong> <span ng-if="videoDuration>= 3600">{{videoDuration | secondsToDateTime | date:\'hh:mm:ss\'}}</span> <span ng-if="videoDuration < 3600">{{videoDuration | secondsToDateTime | date:\'mm:ss\'}}</span> </div> </div> <section class="player-control-bar no-select"> <div class="player-control-button player-skip-rewind icon-rotate-ccw3" ng-click="skip(\'rewind\', 10)"> <span class="player-skip-number">10</span> </div> <div class="player-control-button player-skip-fast-forward icon-rotate-cw3" ng-click="skip(\'fastForward\', 10)"> <span class="player-skip-number">10</span> </div> <div class="player-control-button player-play-pause play ion-play" ng-show="!playing" ng-click="play()"></div> <div class="player-control-button player-play-pause play ion-pause" ng-show="playing" ng-click="pause()"></div> <div class="volume-control player-control-button volume" ng-mouseleave="volumeOpen = false" ng-mouseenter="volumeOpen = true"> <i ng-class="{ \'ion-volume-mute\': volumeLevel== 0, \'ion-volume-low\': volumeLevel> 0 && volumeLevel < 3, \'ion-volume-medium\': volumeLevel>= 3 && volumeLevel < 6, \'ion-volume-high\': volumeLevel>= 6 }" ng-click="playerVolumeToggle()" ></i> <div id="player-menu-volume" class="player-menu" ng-show="volumeOpen"> <div class="volume-menu-content"> <div id="playerVolumeSlider" class="player-ui-slider volume-scrubber" ui-slider="volumeScrubberOptions" min="0" max="10" step="1" ng-model="volumeLevel"></div> </div> </div> </div> <div class="player-status"> <span class="player-status-main-title">{{options.videoMetaTitle}}</span> <span>{{options.videoMetaSubtitle}}</span> </div> <a class="player-control-button player-next-episode ion-edit" ng-click="options.onEditVideo()" ng-if="$root.currentUser.isContentManager"></a> <a class="player-control-button player-next-episode ion-ios-cloud-download" ng-if="options.showDownloadButton" href="{{options.videoSrc}}" download="{{options.originalFilename}}"></a> <div class="player-control-button player-next-episode ion-ios-skipforward" ng-if="options.showNextButton" ng-click="next()"></div> <div class="player-control-button player-episode-selector" ng-if="options.showEpisodeBrowser"> <i class="ion-ios-browsers" ng-click="episodeBrowseOpen = !episodeBrowseOpen"></i> <div id="player-menu-episode-selector" class="player-menu" ng-show="episodeBrowseOpen"> <div class="episode-selector-container"> <div class="episode-selector-slider" ng-class="{\'slide-left\': options.selectedEpisodes}"> <div class="season-list-container"> <h2 class="seasons-title">{{options.videoMetaTitle}}</h2> <ul class="season-list"> <li class="season" ng-click="toggleSelectEpisodes(episodes)" ng-repeat="(season, episodes) in options.episodeList"> <span>{{\'VIDEO.SEASON\' | translate}} {{season}}</span> </li> </ul> </div> </div> <div class="episode-selector-slider" ng-class="{\'slide-left\': options.selectedEpisodes}"> <div class="season-list-container"> <h2 class="seasons-title" ng-click="toggleSelectEpisodes()"> <span class="back-button"><i class="ion-chevron-left"></i></span> {{\'VIDEO.SEASON\' | translate}} {{options.selectedEpisodes[0].season_number}} </h2> <ul class="episode-list"> <li class="episode" ng-repeat="episode in options.selectedEpisodes" ng-class="{\'current\': (episode.episode_number == options.currentEpisode.episode && episode.season_number == options.currentEpisode.season), \'no-files\': !episode.hasFile}"> <div class="flex-wrapper"> <span class="episode-number">{{episode.episode_number | padnumber:2}}</span> <span class="episode-name" ng-click="visible = !visible">{{episode.name}}</span> <span class="episode-play" ng-if="episode.hasFile" ui-sref="player({videoId: episode.id})"><i class="ion-play"></i></span> </div> <streama-progress-bar ng-if="episode.currentPlayTime" video="episode" hide-time="true"></streama-progress-bar> <div class="extra-episode-info" ng-if="visible || (episode.episode_number == video.episode_number && episode.season_number == video.season_number)"> <div class="image-wrapper"> <img ng-if="episode.still_path" ng-src="https://image.tmdb.org/t/p/w92/{{episode.still_path}}"/> <img ng-if="!episode.still_path && episode.still_image_src" ng-src="{{episode.still_image_src}}"/> <div ng-if="!episode.still_path && !episode.still_image_src" class="fallback-image"></div> </div> <p>{{episode.overview.length > 250 ? (episode.overview.substring(0, 250) + \'...\') : episode.overview}}</p> </div> </li> </ul> </div> </div> </div> </div> </div> <div class="player-control-button player-fill-screen ion-android-wifi" ng-if="options.showSocketSession" ng-click="createNewPlayerSession()"></div> <div class="player-control-button player-fill-screen ion-android-textsms" ng-if="options.subtitles.length>= 1 || options.videoFiles.length > 1" ng-click="openPlaybackOptions()"></div> <div class="player-control-button player-fill-screen" ng-click="fullScreen()" ng-class="{\'ion-arrow-shrink\': isFullScreen, \'ion-arrow-expand\': !isFullScreen}"></div> </section> </div> <video ng-if="isInitialized" id="video" ng-src="{{options.videoSrc}}" type="{{options.videoType}}" ng-click="clickVideo()" class="subtitle-size-{{options.subtitleSize}} subtitle-size-custom-{{getCustomSubtitleSize()}}"> <track ng-repeat="subtitle in options.subtitles" ng-src="{{subtitle.src}}" kind="subtitles" id="subtitle-{{subtitle.id}}" srclang="{{subtitle.subtitleSrcLang}}" label="{{subtitle.subtitleLabel}}" src="{{subtitle.src}}"> </video> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/sub-profiles.htm', '<div class="sub-profile-page-container"> <div class="profiles-container" ng-if="showPreviewProfiles()"> <p class="who-watching-header">{{\'WHOS_WATCHING\' | translate}}</p> <div class="select-profile-container" ng-if="existingProfiles.length"> <div class="item-profile-container" ng-repeat="subp in existingProfiles" ng-click="setCurrentProfile(subp)"> <div class="avatar" ng-style="{\'background-color\': \'#\'+(subp.avatarColor || standardColor)}"> <img src="/assets/streama-profile-smiley.png" alt=""> </div> <p class="profile-name">{{subp.profileName}}</p> </div> <div class="add-profile" ng-click="goToCreateProfile()"> <div class="avatar"> <p class="add">+</p> </div> <p class="profile-name">{{\'ADD_SUB_PROFILE\' | translate}}</p> </div> </div> <div class="select-profile-container" ng-if="!existingProfiles.length"> <div class="add-profile" ng-click="goToCreateProfile()"> <div class="avatar"> <p class="add">+</p> </div> <p class="profile-name">{{\'ADD_SUB_PROFILE\' | translate}}</p> </div> </div> <button class="manage-profiles-btn" ng-click="toggleManageProfiles()">{{\'MANAGE_SUB_PROFILES\' | translate}}</button> </div> <div class="profiles-container" ng-if="showEditProfiles()"> <p class="who-watching-header">{{\'MANAGE_SUB_PROFILES\' | translate}}:</p> <div class="select-profile-container" ng-if="existingProfiles.length"> <div class="item-editable-container" ng-repeat="subp in existingProfiles" ng-click="goToEditProfile(subp)"> <div class="avatar" ng-style="{\'background-color\': \'#\'+(subp.avatarColor || standardColor)}"> <img src="/assets/streama-profile-smiley.png" alt=""> </div> <div class="grey-editable-avatar"></div> <div class="edit-label-container"><p>{{\'EDIT_BTN\' | translate}}</p></div> <p class="profile-name">{{subp.profileName}}</p> </div> <div class="add-profile" ng-click="goToCreateProfile()"> <div class="avatar"> <p class="add">+</p> </div> <p class="profile-name">{{\'ADD_SUB_PROFILE\' | translate}}</p> </div> </div> <div class="select-profile-container" ng-if="!existingProfiles.length"> <div class="add-profile" ng-click="goToCreateProfile()"> <div class="avatar"> <p class="add">+</p> </div> <p class="profile-name">{{\'ADD_SUB_PROFILE\' | translate}}</p> </div> </div> <button class="manage-profiles-btn done-btn" ng-click="toggleManageProfiles()">{{\'DONE_BTN\' | translate}}</button> </div> <div class="profiles-container" ng-if="isEditProfile || isCreateProfile"> <p class="who-watching-header">{{isEditProfile ? (\'EDIT_PROFILE\' | translate) : (\'CREATE_PROFILE\' | translate) }}</p> <div class="form-container"> <div class="choose-avatar-color"> <div class="form-avatar" ng-style="{\'background-color\': \'#\' + profile.avatarColor || standardColor}"> <img src="/assets/streama-profile-smiley.png" alt=""> </div> <div class="colors-container"> <div class="single-color" ng-repeat="col in availableColors" ng-style="{\'background-color\': \'#\'+col}" ng-click="setProfileColor(col)"></div> </div> </div> <input type="text" class="form-control" ng-model="profile.profileName" placeholder="{{\'ENTER_NAME\' | translate}}"> <div class="is-kid-container"> <input type="checkbox" ng-model="profile.isChild"> <p>Child?</p> </div> <select class="form-control" ng-model="profile.profileLanguage" ng-options="lang as (\'LANGUAGE_\'+lang | translate) for lang in $root.availableLanguages"> <option value="">Select Language</option> </select> </div> <div class="btns-container"> <button class="manage-profiles-btn done-btn" ng-click="saveProfile()"> {{isEditProfile ? (\'SAVE_BTN\' | translate) : (\'CREATE_BTN\' | translate) }} </button> <button class="manage-profiles-btn " ng-click="refreshStates()">{{\'CANCEL_BTN\' | translate}}</button> <button class="manage-profiles-btn " ng-if="isEditProfile" ng-click="deleteProfile()">{{\'DELETE_BTN\' | translate}}</button> </div> </div> </div>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/typeahead--episode.htm', '<a> <span>s{{match.model.seasonnumber | padnumber:2}}e{{match.model.episodenumber | padnumber:2}}</span> - <span bind-html-unsafe="match.model.episodename | typeaheadHighlight:query"></span> </a>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/typeahead--media.htm', '<a class="typeahead-item" ng-class="{\'inactive\': !match.model.hasFiles}"> <img ng-if="match.model.poster_path" ng-src="https://image.tmdb.org/t/p/w92/{{match.model.poster_path}}" width="60px"/> <img ng-if="!match.model.poster_path" ng-src="{{basePath}}assets/poster-not-found.png" width="60px"/> &nbsp; <div> <span>{{(match.model.title || match.model.name)}}</span> <span style="opacity: .5;">({{match.model.release_date.substring(0, 4) || match.model.first_air_date.substring(0, 4)}})</span> <br/> <span class="label label-danger" ng-show="!match.model.hasFiles"><i class="ion-alert-circled"></i> No Video File yet!</span> </div> </a>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/typeahead--movie.htm', '<a> <div class="flex-row center"> <div class="image no-flex col"> <img ng-if="match.model.poster_path" ng-src="https://image.tmdb.org/t/p/w92/{{match.model.poster_path}}" width="60px"/> <img ng-if="!match.model.poster_path" src="/assets/poster-not-found.png" width="60px"> </div> <div class="detail col"> <span ng-bind-html="match.model.title | uibTypeaheadHighlight:query"></span> <br> <span ng-show="match.model.release_date" style="opacity: .5;">{{match.model.release_date.substring(0, 4)}}</span> <br> <uib-rating ng-model="match.model.vote_average" max="10" state-on="\'ion-ios-star\'" state-off="\'ion-ios-star-outline\'" readonly="true"></uib-rating> <span style="font-size: 11px; font-weight: 300;">({{match.model.vote_average}} / 10)</span> </div> </div> </a>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/typeahead--tvShow.htm', '<a> <img ng-show="match.model.poster_path" ng-src="https://image.tmdb.org/t/p/w92/{{match.model.poster_path}}" width="60px"/> <img ng-show="!match.model.poster_path" ng-src="/assets/poster-not-found.png" width="60px"/> &nbsp; <span ng-bind-html="match.model.name | uibTypeaheadHighlight:query"></span> <span ng-show="match.model.first_air_date" style="opacity: .5;">({{match.model.first_air_date.substring(0, 4)}})</span> </a>');
}]);
angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/user-settings.htm', '<div class="profile"> <div class="profile-heading"> <div class="btn-group pull-right"> <button type="button" class="btn btn-secondary" ng-click="toggleChangePassword()" ng-if="!changePasswordIsActive">{{\'CHANGE_PASSWORD\' | translate}}</button> </div> <h1> <i class="ion-ios-arrow-thin-left" ng-if="changePasswordIsActive" ng-click="toggleChangePassword()"></i> {{\'PROFILE_SETTINGS\' | translate}} <div class="spinner" ng-show="loading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> </h1> <hr/> </div> <div class="profile-inner" ng-class="{\'password-active\': changePasswordIsActive}"> <form name="profileForm" class="form-horizontal profile-data-form"> <div class="form-group"> <div class="col-sm-3"> <label class="control-label">{{\'PROFIlE.USERNAME\' | translate}}</label> </div> <div class="col-sm-9"> <input type="email" class="form-control" disabled ng-model="user.username" placeholder="{{\'PROFIlE.USERNAME\' | translate}}"> </div> </div> <div class="form-group"> <div class="col-sm-3"> <label class="control-label">{{\'PROFIlE.FULL_NAME\' | translate}}</label> </div> <div class="col-sm-9"> <input type="text" class="form-control" ng-model="user.fullName" placeholder="{{\'PROFIlE.FULL_NAME\' | translate}}"> </div> </div> <div class="form-group"> <div class="col-sm-3"> <label class="control-label">{{\'PROFIlE.PAUSE_ON_CLICK\' | translate}}</label> </div> <div class="col-sm-9"> <input type="checkbox" ng-model="user.pauseVideoOnClick"> </div> </div> <div class="form-group" ng-show="availableGenres.length"> <div class="col-sm-3"> <label class="control-label">{{\'PROFIlE.FAVORITE_GENRES\' | translate}}</label> </div> <div class="col-sm-9"> <ul class="genre-list"> <li class="genre-tag" ng-class="{\'active\': isGenreSelected(genre)}" ng-repeat="genre in availableGenres | orderBy:\'name\'" ng-click="toggleSelectGenre(genre)"> {{genre.name}} </li> </ul> </div> </div> <div class="form-group"> <div class="col-sm-3"> <label class="control-label">{{\'PROFIlE.AMOUNT_OF_MEDIA_ENTRIES\' | translate}}</label> </div> <div class="col-sm-9"> <input type="number" class="form-control" ng-model="user.amountOfMediaEntries" placeholder="{{\'PROFIlE.AMOUNT_OF_MEDIA_ENTRIES\' | translate}}"> </div> </div> <hr/> <button class="btn btn-success pull-right" ng-show="profileForm.$dirty" ng-click="saveProfile()">{{\'PROFIlE.SAVE\' | translate}}</button> </form> <form class="form-horizontal password-form"> <div class="form-group"> <div class="col-sm-3"> <label class="control-label">{{\'PROFIlE.OLD_PASS\' | translate}}</label> </div> <div class="col-sm-9"> <input type="password" class="form-control" ng-model="passwordData.oldPassword" placeholder="{{\'PROFIlE.OLD_PASS\' | translate}}"> </div> </div> <div class="form-group" ng-class="{\'has-success has-feedback\': !passwordsInvalid}"> <div class="col-sm-3"> <label class="control-label">{{\'PROFIlE.NEW_PASS\' | translate}}</label> </div> <div class="col-sm-9"> <input type="password" class="form-control" ng-model="passwordData.newPassword" placeholder="{{\'PROFIlE.NEW_PASS_PLACEHOLDER\' | translate}}" ng-change="validatePasswords()"> <span class="ion-checkmark form-control-feedback" ng-show="!passwordsInvalid" aria-hidden="true"></span> </div> </div> <div class="form-group" ng-class="{\'has-success has-feedback\': !passwordsInvalid}"> <div class="col-sm-3"> <label class="control-label">{{\'PROFIlE.REPEAT_PASS\' | translate}}</label> </div> <div class="col-sm-9"> <input type="password" class="form-control" ng-model="passwordData.repeatPassword" placeholder="{{\'PROFIlE.REPEAT_PASS\' | translate}}" ng-change="validatePasswords()"> <span class="ion-checkmark form-control-feedback" ng-show="!passwordsInvalid" aria-hidden="true"></span> </div> </div> <hr/> <div class="btn-group pull-right"> <button type="button" class="btn btn-secondary" ng-disabled="passwordsInvalid" ng-click="saveNewPassword()"> {{\'PROFIlE.SAVE_PASS\' | translate}} </button> </div> </form> </div> </div>');
}]);
angular.module('streama')
  .run(["$window", "$rootScope", "$state", "localStorageService", "apiService", "modalService", "userService", "profileService", "$translate", function ($window, $rootScope, $state, localStorageService, apiService, modalService,
                 userService, profileService, $translate) {

	$rootScope.baseData = {};
	$rootScope.isCurrentState = isCurrentState;
	$rootScope.searchMedia = searchMedia;
	$rootScope.getSetting = getSetting;
	$rootScope.selectFromSearch = selectFromSearch;
	$rootScope.toggleGenreMenu = toggleGenreMenu;
	$rootScope.changeGenre = changeGenre;
	$rootScope.changeDashType = changeDashType;
	$rootScope.isDashType = isDashType;
	$rootScope.loginUser = loginUser;


	$rootScope.$on('streama.profiles.onChange', loadAndInitProfiles);
	$rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);

	init();

	function init() {
		apiService.currentUser().then(onCurrentUserLoaded);
		loadAndInitProfiles();
	}

	function onCurrentUserLoaded(data) {
		userService.setCurrentUser(data);

		apiService.settings.list().then(function (response) {
			$rootScope.settings = response.data;
			$rootScope.isDownloadButtonVisible = getSetting('player_showDownloadButton').parsedValue && ($rootScope.currentUser.isTrustedUser || getSetting('player_downloadForAllUsers').parsedValue);
		});
	}

	function getSetting(name) {
		return _.find($rootScope.settings, {name: name}) || _.find($rootScope.settings, {settingsKey: name});
	}

	function searchMedia(query) {
		return apiService.dash.searchMedia(query).then(function (data) {
			return data.data.movies.concat(data.data.shows);
		});
	}

	function selectFromSearch(item) {
		modalService.mediaDetailModal({mediaId: item.id, mediaType: item.mediaType});
	}

	function toggleGenreMenu(close) {
		if(close){
			$rootScope.genreMenuOpen = false;
		}else{
			$rootScope.genreMenuOpen = !$rootScope.genreMenuOpen;
		}
	}

	function isCurrentState(stateName) {
		return ($state.current.name == stateName);
	}

	function changeGenre(genre) {
		$rootScope.toggleGenreMenu(true);
		$state.go('dash', {genreId: (genre ? genre.id : null)});
		$rootScope.$broadcast('changedGenre', genre);
	}

	function changeDashType(dashType) {
    $state.go('dash', {dashType: dashType}, {reload: true});
  }

  function isDashType(dashType) {
    return _.get($state.params, 'dashType') === dashType;
  }

	function loginUser() {
		$window.location.assign('/login/login');
	}

	function onStateChangeSuccess(e, toState) {
		$rootScope.toggleGenreMenu(true);
		if(toState.name == "player"){
			localStorageService.set('originUrl', location.href);
		}
	}


	function loadAndInitProfiles() {
    profileService.getUserProfiles().then(
      function(data) {
        var savedProfile = profileService.getCurrentProfile();
        if(!savedProfile){
          $state.go('sub-profiles');
        }
        $rootScope.usersProfiles = data.data;
        $rootScope.currentProfile = savedProfile || $rootScope.usersProfiles[0];
        $translate.use(_.get($rootScope, 'currentProfile.profileLanguage') || _.get($rootScope, 'currentUser.language') || 'en')
      });
    $rootScope.setCurrentSubProfile = profileService.setCurrentProfile;
  }
}]);

(function(){
'use strict';
//= wrapped


angular.module('streama').config(["$stateProvider", function ($stateProvider) {

	$stateProvider

		//BASE ROUTES
		.state('dash', {
			url: '/dash?genreId?mediaModal?mediaType?dashType',
			templateUrl: '/streama/dash.htm',
			controller: 'dashCtrl as vm',
			reloadOnSearch: false,
			resolve: {
				currentUser: resolveCurrentUser
			}
		})

		.state('player', {
			url: '/player/:videoId?currentTime?sessionId',
			templateUrl: '/streama/player.htm',
			controller: 'playerCtrl',
			resolve: {
				currentUser: resolveCurrentUser
			}
		})
		.state('sub-profiles', {
			url: '/sub-profiles',
			templateUrl: '/streama/sub-profiles.htm',
			controller: 'subProfilesCtrl'
		})

		.state('userSettings', {
			url: '/user-settings',
			templateUrl: '/streama/user-settings.htm',
			controller: 'userSettingsCtrl',
			resolve: {
				currentUser: resolveCurrentUser
			}
		})

		.state('help', {
			url: '/help',
			templateUrl: '/streama/help.htm',
			controller: 'helpCtrl'
		})


		//ADMIN ROUTES
		.state('admin', {
			url: '/admin',
			templateUrl: '/streama/admin.htm',
			controller: 'adminCtrl',
			resolve: {
				currentUser: checkPermission
			}
		})
		.state('admin.fileManager', {
			url: '/fileManager',
			templateUrl: '/streama/admin-fileManager.htm',
			controller: 'adminFileManagerCtrl'
		})
		.state('admin.movies', {
			url: '/movies',
			templateUrl: '/streama/admin-movies.htm',
			controller: 'adminMoviesCtrl as vm'
		})
		.state('admin.movie', {
			url: '/movie/:movieId',
			templateUrl: '/streama/admin-movie.htm',
			controller: 'adminMovieCtrl'
		})
		.state('admin.videos', {
			url: '/videos',
			templateUrl: '/streama/admin-videos.htm',
			controller: 'adminVideosCtrl'
		})
		.state('admin.video', {
			url: '/video/:videoId',
			templateUrl: '/streama/admin-video.htm',
			controller: 'adminVideoCtrl'
		})

		.state('admin.notifications', {
			url: '/notifications',
			templateUrl: '/streama/admin-notifications.htm',
			controller: 'adminNotificationsCtrl',
			resolve: {
				currentUser: checkPermissionAdmin
			}
		})

		.state('admin.newReleases', {
			url: '/newReleases',
			templateUrl: '/streama/admin-new-releases.htm',
			controller: 'adminNewReleasesCtrl'
		})
		.state('admin.shows', {
			url: '/shows',
			templateUrl: '/streama/admin-shows.htm',
			controller: 'adminShowsCtrl'
		})
		.state('admin.show', {
			url: '/show/:showId?episodeId?season',
			templateUrl: '/streama/admin-show.htm',
			controller: 'adminShowCtrl'
		})
    .state('admin.reports', {
      url: '/reports',
      templateUrl: '/streama/admin-reports.htm',
      controller: 'adminReportsCtrl',
      controllerAs: "vm"
    })



		//SETTINGS ROUTES
		.state('settings.users', {
			url: '/users',
			templateUrl: '/streama/settings-users.htm',
			controller: 'settingsUsersCtrl',
			resolve: {
				currentUser: checkPermissionAdmin
			}
		})
		.state('settings.userActivity', {
			url: '/user-activity',
			templateUrl: '/streama/settings-user-activity.htm',
			controller: 'settingsUserActivityCtrl',
      controllerAs: 'vm',
			resolve: {
				currentUser: checkPermissionAdmin
			}
		})
		.state('settings.settings', {
			url: '/settings',
			templateUrl: '/streama/settings-settings.htm',
			controller: 'settingsSettingsCtrl',
			resolve: {
				currentUser: checkPermissionAdmin
			}
		})

		.state('settings', {
			url: '/settings',
			templateUrl: '/streama/settings.htm',
			controller: 'settingsCtrl',
			resolve: {
				currentUser: checkPermission
			}
		});


	function resolveCurrentUser(apiService, $rootScope) {
		return apiService.currentUser().then(function (response) {
			var data = response.data;
			if(!data){
				location.href = '/login/auth'
			}

			if (data) {
				$rootScope.currentUser = data;
				return data;
			}
		}, function (err, status) {
      if(status === 401){
        location.href = '/login/auth?sessionExpired=true'
      }
    });
	}
	resolveCurrentUser.$inject = ["apiService", "$rootScope"];

	function checkPermissionAdmin(apiService, $rootScope, $state) {
		return apiService.currentUser().then(function (response) {
			var data = response.data;
			if(!data){
				location.href = '/login/auth'
			}
			if (data.isAdmin) {
				$rootScope.currentUser = data;
				return data;
			} else {
				$state.go('dash');
			}
		});
	}
	checkPermissionAdmin.$inject = ["apiService", "$rootScope", "$state"];

	function checkPermission(apiService, $rootScope, $state) {
		return apiService.currentUser().then(function (response) {
			var data = response.data;
			if(!data){
				location.href = '/login/auth'
			}
			if (data && data.authorities.length) {
				$rootScope.currentUser = data;
				return data;
			} else {
				$state.go('dash');
			}
		});
	}
	checkPermission.$inject = ["apiService", "$rootScope", "$state"];

}]);

})();
(function(){
'use strict';
//= wrapped

angular.module('streama').config(["$httpProvider", function ($httpProvider) {
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	$httpProvider.interceptors.push('httpInterceptor');
}]);


angular.module('streama').factory('httpInterceptor', ["$rootScope", "$q", "localStorageService", function ($rootScope, $q, localStorageService) {
	return {
		request: function (config) {
			config.params = config.params || {};
			if(config.params.socketSessionId){
				config.params.browserSocketUUID = $rootScope.browserSocketUUID;
			}
			if (localStorageService.get('currentProfile')){
        config.headers.profileId = localStorageService.get('currentProfile').id || 0;
      }
			return config || $q.when(config);
		},
		response: function (response) {
			return response || $q.when(response);
		},
		responseError: function (response) {

			if(response.status == 500){
				alertify.error('An internal Server error occured.');
			}

			if(response.status == 403){
				alertify.error('You do not have the rights to carry out this action.');
			}
			else if(response.status != 404 && response.status != 401 && response.status != 406){
				//alertify.error('A system error occurred');
			}


			return $q.reject(response);
		}
	};
}]);
})();
