var buffer = {};
var base64Js = {};
var hasRequiredBase64Js;
function requireBase64Js() {
  if (hasRequiredBase64Js) return base64Js;
  hasRequiredBase64Js = 1;
  base64Js.byteLength = byteLength;
  base64Js.toByteArray = toByteArray;
  base64Js.fromByteArray = fromByteArray;
  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
  function getLens(b64) {
    var len2 = b64.length;
    if (len2 % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len2;
    var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
    return [validLen, placeHoldersLen];
  }
  function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i2;
    for (i2 = 0; i2 < len2; i2 += 4) {
      tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
      arr[curByte++] = tmp >> 16 & 255;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 2) {
      tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 1) {
      tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    return arr;
  }
  function tripletToBase64(num) {
    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
  }
  function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i2 = start; i2 < end; i2 += 3) {
      tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
      output.push(tripletToBase64(tmp));
    }
    return output.join("");
  }
  function fromByteArray(uint8) {
    var tmp;
    var len2 = uint8.length;
    var extraBytes = len2 % 3;
    var parts = [];
    var maxChunkLength = 16383;
    for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
      parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
    }
    if (extraBytes === 1) {
      tmp = uint8[len2 - 1];
      parts.push(
        lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
      );
    } else if (extraBytes === 2) {
      tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
      parts.push(
        lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
      );
    }
    return parts.join("");
  }
  return base64Js;
}
var ieee754 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var hasRequiredIeee754;
function requireIeee754() {
  if (hasRequiredIeee754) return ieee754;
  hasRequiredIeee754 = 1;
  ieee754.read = function(buffer2, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer2[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer2[offset + i], i += d, nBits -= 8) {
    }
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer2[offset + i], i += d, nBits -= 8) {
    }
    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
  };
  ieee754.write = function(buffer2, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }
      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }
    for (; mLen >= 8; buffer2[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
    }
    e = e << mLen | m;
    eLen += mLen;
    for (; eLen > 0; buffer2[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
    }
    buffer2[offset + i - d] |= s * 128;
  };
  return ieee754;
}
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var hasRequiredBuffer;
function requireBuffer() {
  if (hasRequiredBuffer) return buffer;
  hasRequiredBuffer = 1;
  (function(exports) {
    var base64 = requireBase64Js();
    var ieee7542 = requireIeee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        var arr = new Uint8Array(1);
        var proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      var buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer.prototype);
      return buf;
    }
    function Buffer(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      var valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer.from(valueOf, encodingOrOffset, length);
      }
      var b = fromObject(value);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer.from(
          value[Symbol.toPrimitive]("string"),
          encodingOrOffset,
          length
        );
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      var length = byteLength(string, encoding) | 0;
      var buf = createBuffer(length);
      var actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      var length = array.length < 0 ? 0 : checked(array.length) | 0;
      var buf = createBuffer(length);
      for (var i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        var copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      var buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer.isBuffer(obj)) {
        var len = checked(obj.length) | 0;
        var buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer.alloc(+length);
    }
    Buffer.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer.prototype;
    };
    Buffer.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
      if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b) return 0;
      var x = a.length;
      var y = b.length;
      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer.alloc(0);
      }
      var i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      var buffer2 = Buffer.allocUnsafe(length);
      var pos = 0;
      for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer2.length) {
            Buffer.from(buf).copy(buffer2, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer2,
              buf,
              pos
            );
          }
        } else if (!Buffer.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer2, pos);
        }
        pos += buf.length;
      }
      return buffer2;
    };
    function byteLength(string, encoding) {
      if (Buffer.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      var len = string.length;
      var mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      var loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer.prototype._isBuffer = true;
    function swap(b, n, m) {
      var i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer.prototype.swap16 = function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer.prototype.swap32 = function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer.prototype.swap64 = function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer.prototype.toString = function toString() {
      var length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer.prototype.toLocaleString = Buffer.prototype.toString;
    Buffer.prototype.equals = function equals(b) {
      if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer.compare(this, b) === 0;
    };
    Buffer.prototype.inspect = function inspect() {
      var str = "";
      var max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
    }
    Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer.from(target, target.offset, target.byteLength);
      }
      if (!Buffer.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      var x = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x, y);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
      if (buffer2.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer2.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer2.length + byteOffset;
      if (byteOffset >= buffer2.length) {
        if (dir) return -1;
        else byteOffset = buffer2.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer.from(val, encoding);
      }
      if (Buffer.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      var indexSize = 1;
      var arrLength = arr.length;
      var valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      var i;
      if (dir) {
        var foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          var found = true;
          for (var j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      var remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      var strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      for (var i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      var res = [];
      var i = start;
      while (i < end) {
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      var len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      var res = "";
      var i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      var len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      var out = "";
      for (var i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      var bytes = buf.slice(start, end);
      var res = "";
      for (var i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer.prototype.slice = function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      var newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      var val = this[offset + --byteLength2];
      var mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var i = byteLength2;
      var mul = 1;
      var val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee7542.read(this, offset, true, 23, 4);
    };
    Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee7542.read(this, offset, false, 23, 4);
    };
    Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee7542.read(this, offset, true, 52, 8);
    };
    Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee7542.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var mul = 1;
      var i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4);
      }
      ieee7542.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8);
      }
      ieee7542.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      var i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
        var len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      var codePoint;
      var length = string.length;
      var leadSurrogate = null;
      var bytes = [];
      for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      var c, hi, lo;
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      for (var i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      var alphabet = "0123456789abcdef";
      var table = new Array(256);
      for (var i = 0; i < 16; ++i) {
        var i16 = i * 16;
        for (var j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    }();
  })(buffer);
  return buffer;
}
requireBuffer();
const json = (obj) => JSON.parse(JSON.stringify(obj));
const ensureLength = (str, length, char = " ", right = true) => {
  let i = 0;
  while (str.length < length && i++ < 100) {
    if (right) {
      str = char + str;
    } else {
      str = str + char;
    }
  }
  return str;
};
const el = (msg, length = 30, space = " ") => ensureLength(msg, length, space);
const sl = (msg, length = 30, space = " ") => el(msg, length, space);
var AppType = /* @__PURE__ */ ((AppType2) => {
  AppType2["unknown"] = "0";
  AppType2["spa"] = "1";
  AppType2["pwa"] = "2";
  AppType2["bex"] = "3";
  AppType2["capacitor"] = "4";
  AppType2["electron"] = "5";
  return AppType2;
})(AppType || {});
var AppMode = /* @__PURE__ */ ((AppMode2) => {
  AppMode2["normal"] = "normal";
  AppMode2["bg"] = "bg";
  AppMode2["offscreen"] = "offscreen";
  AppMode2["enable"] = "enable";
  AppMode2["signTx"] = "signTx";
  AppMode2["signData"] = "signData";
  AppMode2["sidePanel"] = "sidePanel";
  AppMode2["permissions"] = "permissions";
  return AppMode2;
})(AppMode || {});
var Platform = /* @__PURE__ */ ((Platform2) => {
  Platform2["unknown"] = "0";
  Platform2["web"] = "1";
  Platform2["ios"] = "2";
  Platform2["android"] = "3";
  Platform2["windows"] = "4";
  Platform2["mac"] = "5";
  Platform2["linux"] = "6";
  return Platform2;
})(Platform || {});
var Environment = /* @__PURE__ */ ((Environment2) => {
  Environment2["unknown"] = "unknown";
  Environment2["production"] = "production";
  Environment2["development"] = "development";
  return Environment2;
})(Environment || {});
let _apiURL = null;
const setApiURL = (url) => {
  try {
    const _url = new URL(url).toString();
    _apiURL = _url.substring(0, _url.length - 1);
  } catch (err) {
    console.error("setApiURL", err);
  }
};
const _appInfo = {
  appType: AppType.unknown,
  appMode: AppMode.normal,
  platform: Platform.unknown,
  environment: Environment.unknown,
  token: "",
  pen: "",
  isStaging: false,
  isBeta: false,
  addApex: false,
  isMobileApp: false,
  isIosApp: false,
  isAndroidApp: false,
  hasWebUSB: false,
  useCoolify: false,
  localSwapBackend: "",
  doRestrictFeatures: true
};
const initAppInfo = (params2) => {
  var _a;
  _appInfo.appType = checkAppType(params2.TYPE);
  _appInfo.appMode = checkAppMode(AppMode.normal);
  _appInfo.platform = checkPlatform(params2.PLATFORM);
  _appInfo.environment = checkEnvironment(params2.ENVIRONMENT);
  _appInfo.token = params2.TOKEN;
  _appInfo.pen = params2.PEN;
  _appInfo.isStaging = params2.IS_STAGING === "yes";
  _appInfo.isBeta = params2.IS_BETA === "yes";
  _appInfo.addApex = params2.ADD_APEX === "yes";
  _appInfo.useCoolify = params2.USE_COOLIFY === "yes";
  _appInfo.localSwapBackend = params2.LOCAL_SWAP_BACKEND;
  _appInfo.isMobileApp = _appInfo.appType === AppType.capacitor;
  _appInfo.isIosApp = _appInfo.isMobileApp && _appInfo.platform === Platform.ios;
  _appInfo.isAndroidApp = _appInfo.isMobileApp && _appInfo.platform === Platform.android;
  _appInfo.hasWebUSB = "usb" in navigator;
  const hostName = ((_a = globalThis == null ? void 0 : globalThis.location) == null ? void 0 : _a.hostname) ?? "";
  let apiURL = params2.HOST_API;
  if (_appInfo.environment === Environment.production && (_appInfo.appType === AppType.spa || _appInfo.appType === AppType.pwa) && !hostName.toLowerCase().includes("local") && !apiURL) {
    apiURL = "https://api." + hostName;
  }
  _appInfo.doRestrictFeatures = _appInfo.environment === Environment.production && (apiURL.includes("ccwallet.io") || apiURL.includes("ccvault.io") || apiURL.includes("localhost"));
  setApiURL(apiURL);
};
const checkAppType = (type) => {
  let res = AppType.unknown;
  switch (type) {
    case "spa":
      res = AppType.spa;
      break;
    case "pwa":
      res = AppType.pwa;
      break;
    case "bex":
      res = AppType.bex;
      break;
    case "capacitor":
      res = AppType.capacitor;
      break;
    case "electron":
      res = AppType.electron;
      break;
  }
  return res;
};
const checkPlatform = (platform) => {
  let res = Platform.unknown;
  switch (platform) {
    case "web":
      res = Platform.web;
      break;
    case "ios":
      res = Platform.ios;
      break;
    case "android":
      res = Platform.android;
      break;
    case "windows":
      res = Platform.windows;
      break;
    case "mac":
      res = Platform.mac;
      break;
    case "linux":
      res = Platform.linux;
      break;
  }
  return res;
};
const checkEnvironment = (environment) => {
  switch (environment) {
    case Environment.unknown:
    case Environment.production:
    case Environment.development:
      return environment;
  }
  return Environment.unknown;
};
const checkAppMode = (mode) => {
  switch (mode) {
    case AppMode.normal:
    case AppMode.bg:
    case AppMode.enable:
    case AppMode.signTx:
    case AppMode.signData:
      return mode;
  }
  return AppMode.normal;
};
const params = {
  HOST_API: "https://api.eternl.io",
  USE_COOLIFY: "yes",
  TOKEN: "#!l4n56cGPHoHM3Z@xiT&CV8",
  ENVIRONMENT: "production",
  TYPE: "bex",
  PEN: "k%%2Gb6^!m8iMIvwlnS2xpWC",
  PLATFORM: "web",
  IS_STAGING: "no",
  IS_BETA: "no",
  ADD_APEX: "yes",
  LOCAL_SWAP_BACKEND: void 0
};
initAppInfo(params);
const setAppMode$1 = (mode) => {
  _appInfo.appMode = mode;
  if (typeof window !== "undefined") {
    window.appMode = mode;
  }
};
const networkIdList = ["mainnet", "preprod", "preview", "guild", "sancho", "afvt", "afpt", "afpm"];
const networkFeaturesMap = networkIdList.reduce((o, n) => {
  o[n] = 0;
  return o;
}, {});
networkFeaturesMap["mainnet"] = 255;
networkFeaturesMap["guild"] = 1;
networkFeaturesMap["sancho"] = 1 | 16 | 8;
networkFeaturesMap["preprod"] = 1 | 16 | 8 | 4;
networkFeaturesMap["preview"] = 1 | 16 | 8;
networkFeaturesMap["afpt"] = 1;
networkFeaturesMap["afpm"] = 1;
networkFeaturesMap["afvt"] = 16;
networkFeaturesMap["afvm"] = 16;
const getNetworkId$1 = (id) => {
  switch (id) {
    case "mainnet":
      return 1;
    case "guild":
      return 0;
    case "sancho":
      return 0;
    case "preprod":
      return 0;
    case "preview":
      return 0;
    case "afvt":
      return 2;
    case "afvm":
      return 3;
    case "afpt":
      return 0;
    case "afpm":
      return 1;
  }
  throw new Error("Error: INetwork.getNetworkId: unknown network: " + id);
};
const isSupportedNetworkId = (id) => networkIdList.includes(id);
const setAppMode = (mode) => {
  if (mode === AppMode.normal) {
    setAppMode$1(AppMode.normal);
  } else if (mode === AppMode.enable) {
    setAppMode$1(AppMode.enable);
  } else if (mode === AppMode.signTx) {
    setAppMode$1(AppMode.signTx);
  } else if (mode === AppMode.signData) {
    setAppMode$1(AppMode.signData);
  } else if (mode === AppMode.bg) {
    setAppMode$1(AppMode.bg);
  } else if (mode === AppMode.offscreen) {
    setAppMode$1(AppMode.offscreen);
  } else if (mode === AppMode.sidePanel) {
    setAppMode$1(AppMode.sidePanel);
  }
};
const extCip30 = { cip: 30 };
const extCip95 = { cip: 95 };
const extCip103 = { cip: 103 };
const extCip104 = { cip: 104 };
const extCip142 = { cip: 142 };
const supportedExtensions = [
  extCip30,
  extCip95,
  extCip103,
  extCip104,
  extCip142
];
const autoGrantWithCIP30List = [
  extCip103,
  extCip142
];
const METHOD = {
  enable: "enable",
  isEnabled: "isEnabled",
  getExtensions: "getExtensions",
  getNetworkId: "getNetworkId",
  signData: "signData",
  signTx: "signTx",
  enableLogs: "enableLogs",
  // CIP-103
  signTxs: "signTxs",
  // CIP-142
  getNetworkMagic: "getNetworkMagic",
  // experimental
  getConnectedNetworkId: "getConnectedNetworkId"
};
var ApiChannel = /* @__PURE__ */ ((ApiChannel2) => {
  ApiChannel2["domToCS"] = "eternl-dom-to-cs";
  ApiChannel2["csToDom"] = "eternl-cs-to-dom";
  ApiChannel2["csToBg"] = "eternl-cs-to-bg";
  ApiChannel2["bgToCs"] = "eternl-bg-to-cs";
  ApiChannel2["bgToEnable"] = "eternl-bg-to-enable";
  ApiChannel2["enableToBg"] = "eternl-enable-to-bg";
  ApiChannel2["bgToSidePanel"] = "eternl-bg-to-side-panel";
  ApiChannel2["sidePanelToBg"] = "eternl-side-panel-to-bg";
  ApiChannel2["bgToMain"] = "eternl-bg-to-main";
  ApiChannel2["mainToBg"] = "eternl-main-to-bg";
  ApiChannel2["bgToPermissions"] = "eternl-bg-to-permissions";
  ApiChannel2["permissionsToBg"] = "eternl-permissions-to-bg";
  ApiChannel2["bgToSignTx"] = "eternl-bg-to-sign-tx";
  ApiChannel2["signTxToBg"] = "eternl-sign-tx-to-bg";
  ApiChannel2["bgToSignData"] = "eternl-bg-to-sign-data";
  ApiChannel2["signDataToBg"] = "eternl-sign-data-to-bg";
  ApiChannel2["bgToOffscreen"] = "eternl-bg-to-offscreen";
  ApiChannel2["offscreenToBg"] = "eternl-offscreen-to-bg";
  return ApiChannel2;
})(ApiChannel || {});
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let doLogAll = false;
const enableLogs = (enable) => {
  doLogAll = enable;
};
var ApiErrorCode = /* @__PURE__ */ ((ApiErrorCode2) => {
  ApiErrorCode2[ApiErrorCode2["InvalidRequest"] = -1] = "InvalidRequest";
  ApiErrorCode2[ApiErrorCode2["InternalError"] = -2] = "InternalError";
  ApiErrorCode2[ApiErrorCode2["Refused"] = -3] = "Refused";
  ApiErrorCode2[ApiErrorCode2["AccountChange"] = -4] = "AccountChange";
  return ApiErrorCode2;
})(ApiErrorCode || {});
var DataSignErrorCode = /* @__PURE__ */ ((DataSignErrorCode2) => {
  DataSignErrorCode2[DataSignErrorCode2["ProofGeneration"] = 1] = "ProofGeneration";
  DataSignErrorCode2[DataSignErrorCode2["AddressNotPK"] = 2] = "AddressNotPK";
  DataSignErrorCode2[DataSignErrorCode2["UserDeclined"] = 3] = "UserDeclined";
  DataSignErrorCode2[DataSignErrorCode2["InvalidFormat"] = 4] = "InvalidFormat";
  return DataSignErrorCode2;
})(DataSignErrorCode || {});
var TxSignErrorCode = /* @__PURE__ */ ((TxSignErrorCode2) => {
  TxSignErrorCode2[TxSignErrorCode2["ProofGeneration"] = 1] = "ProofGeneration";
  TxSignErrorCode2[TxSignErrorCode2["UserDeclined"] = 2] = "UserDeclined";
  TxSignErrorCode2[TxSignErrorCode2["DeprecatedCertificate"] = 3] = "DeprecatedCertificate";
  return TxSignErrorCode2;
})(TxSignErrorCode || {});
const createInternalError = (info) => ({ success: false, error: { code: ApiErrorCode.InternalError, info } });
const createInvalidRequestError = (info) => ({ success: false, error: { code: ApiErrorCode.InvalidRequest, info } });
const errorInternal = (e) => createInternalError(e);
const errorNoReqId = () => createInternalError("Error: no reqId");
const errorNoApi = () => createInternalError("Error: no api");
const errorNoPayload = () => createInternalError("Error: no payload");
const errorNoOrigin = () => createInternalError("Error: no origin");
const errorComsMalformed = () => createInternalError("Error: coms malformed");
const errorNoAccount = () => createInternalError("no account set");
const errorNoNetworkId = () => createInternalError("no networkId");
const errorNoNetworkMagic = () => createInternalError("no network magic");
const errorNotConnected = () => createInvalidRequestError("not connected");
const errorInvalidArgument = () => createInvalidRequestError("invalid argument");
const errorUnsupportedExtensions = (extensions) => createInvalidRequestError("unsupported extensions requested: " + extensions);
const errorConnectionRefused = () => ({ success: false, error: { code: ApiErrorCode.Refused, info: "user canceled connection" } });
const errorAccountChanged = () => ({ success: false, error: { code: ApiErrorCode.AccountChange, info: "account changed" } });
const errorTxUserDeclined = () => ({ success: false, error: { code: TxSignErrorCode.UserDeclined, info: "user declined sign tx" } });
const errorDataUserDeclined = () => ({ success: false, error: { code: DataSignErrorCode.UserDeclined, info: "user declined sign data" } });
const urlSidePanel = "app/sidePanel.html";
const urlPermissions = "app/permissions.html";
const _pendingApiRequestList = [];
const getAllPendingAPIRequests = async () => {
  return new Promise((resolve) => {
    chrome.storage.local.get("pendingApiRequests", (result) => {
      if (chrome.runtime.lastError) {
        console.error("getAllPendingAPIRequests:", chrome.runtime.lastError);
      }
      if (result.pendingApiRequests && Array.isArray(result.pendingApiRequests)) {
        resolve(result.pendingApiRequests);
      } else {
        resolve([]);
      }
    });
  });
};
const setAllPendingAPIRequests = async (allPendingAPIRequests) => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ pendingApiRequests: allPendingAPIRequests }, () => {
      if (chrome.runtime.lastError) {
        console.error("setAllPendingAPIRequests:", chrome.runtime.lastError);
      }
      resolve();
    });
  });
};
const addPendingAPIRequest = (pendingAPIRequest) => {
  const removedRequestList = [];
  _pendingApiRequestList.unshift(pendingAPIRequest);
  setAllPendingAPIRequests(_pendingApiRequestList);
  return removedRequestList;
};
const removeAllPendingSidePanelAPIRequests = () => {
  const removedRequestList = [];
  for (let i = _pendingApiRequestList.length - 1; i >= 0; i--) {
    const removedRequest = _pendingApiRequestList[i];
    if (removedRequest.isSidePanel) {
      removedRequestList.push(removedRequest);
      _pendingApiRequestList.splice(i, 1);
    }
  }
  setAllPendingAPIRequests(_pendingApiRequestList);
  return removedRequestList;
};
const removePendingAPIRequest = (reqId) => {
  for (let i = _pendingApiRequestList.length - 1; i >= 0; i--) {
    if (_pendingApiRequestList[i].reqId === reqId) {
      _pendingApiRequestList.splice(i, 1);
    }
  }
  setAllPendingAPIRequests(_pendingApiRequestList);
};
const getPendingAPIRequest = (req) => {
  let _req = _pendingApiRequestList.find((r) => r.reqId === req.reqId);
  if (!_req) {
    if (req.hasOwnProperty("timestamp")) {
      _req = req;
    }
  }
  return _req ?? null;
};
const getPendingAPIRequestListByAPI = (api) => {
  const pendingAPIRequestList = _pendingApiRequestList.filter((r) => r.api === api);
  return pendingAPIRequestList;
};
const hasPendingAPIRequestByAPI = (req) => {
  for (let i = _pendingApiRequestList.length - 1; i >= 0; i--) {
    const _req = _pendingApiRequestList[i];
    const timeElapsed = Date.now() - _req.timestamp;
    if (_req.api === req.api && _req.reqId !== req.reqId && timeElapsed < 1e3) {
      return true;
    }
  }
  return false;
};
const numSidePanelRequest = (req) => {
  let numSidePanels = 0;
  for (const pendingAPIRequest of _pendingApiRequestList) {
    if (pendingAPIRequest.reqId !== req.reqId && pendingAPIRequest.isSidePanel) {
      numSidePanels++;
    }
  }
  return numSidePanels;
};
const loadPendingApiRequestListIntoMemory = async () => {
  const allPendingAPIRequests = await getAllPendingAPIRequests();
  for (const pendingAPIRequest of allPendingAPIRequests) {
    if (!pendingAPIRequest.reqId || !pendingAPIRequest.origin || !pendingAPIRequest.tabId || !pendingAPIRequest.timestamp) {
      continue;
    }
    if (Date.now() - pendingAPIRequest.timestamp < 1e3 * 60 * 5) {
      _pendingApiRequestList.push(pendingAPIRequest);
    }
  }
  return setAllPendingAPIRequests(_pendingApiRequestList);
};
loadPendingApiRequestListIntoMemory();
const doLog$1 = false;
let _isSidePanelOpen = false;
const getIsSidePanelOpen = () => _isSidePanelOpen;
const setIsSidePanelOpen = () => {
  _isSidePanelOpen = true;
};
const setIsSidePanelClosed = () => {
  _isSidePanelOpen = false;
};
let _isMainUI = false;
const getIsMainUIOpen = () => _isMainUI;
const setIsMainUIOpen = () => {
  _isMainUI = true;
};
const setIsMainUIClosed = () => {
  _isMainUI = false;
};
const closeSidePanel = () => {
  setTimeout(() => {
    chrome.sidePanel.setOptions({ enabled: false }, () => {
      console.log("Side panel has been closed/hidden.");
    });
  }, 200);
};
const openBexSidePanel = () => new Promise(async (resolve, reject) => {
  const route = urlSidePanel;
  if (doLogAll || doLog$1) {
    console.warn(el("openBexSidePanel"), route, getIsSidePanelOpen());
  }
  if (getIsSidePanelOpen()) {
    return resolve(true);
  }
  if (doLogAll || doLog$1) {
    console.warn(el("openBexSidePanel"), "chrome.sidePanel", chrome.sidePanel);
  }
  chrome.windows.getLastFocused({}, (window2) => {
    if (doLogAll || doLog$1) {
      console.warn(el("openBexSidePanel"), sl("window"), window2);
    }
    if (!window2 || !window2.id) {
      return reject("no window or window id");
    }
    if (!chrome.sidePanel) {
      return resolve(true);
    }
    chrome.sidePanel.setOptions({ path: chrome.runtime.getURL(route), enabled: true });
    chrome.sidePanel.open({
      windowId: window2.id
    }).then(async () => {
      let i = 0;
      while (i++ < 20 && !getIsSidePanelOpen()) {
        if (doLogAll || doLog$1) {
          console.warn(el("openBexSidePanel"), sl("waiting for connection"));
        }
        await sleep(250);
      }
      if (getIsSidePanelOpen()) {
        if (doLogAll || doLog$1) {
          console.warn(el("openBexSidePanel"), sl("connection established"));
        }
      } else {
        if (doLogAll || doLog$1) {
          console.warn(el("openBexSidePanel"), sl("connection not established"));
        }
        return reject("Sidepanel failed to connect.");
      }
      return resolve(true);
    }).catch((error) => {
      console.error(error);
      return reject(error);
    });
  });
});
const doLog = false;
const storeId$3 = "initOffscreenPage";
if (doLogAll || doLog) {
  console.warn(el(storeId$3), sl("loaded"));
}
let _offscreenCreationPromise = null;
const ensureOffscreenPage = async () => {
  const hasDocument = await chrome.offscreen.hasDocument();
  if (hasDocument) {
    return;
  }
  if (doLogAll) {
    console.warn(el(storeId$3), sl("ensureOffscreenPage"), _offscreenCreationPromise);
  }
  if (!_offscreenCreationPromise) {
    _offscreenCreationPromise = chrome.offscreen.createDocument({
      url: "app/offscreen.html",
      justification: "Manage localStorage. Manage parallel syncing using workers.",
      reasons: [
        chrome.offscreen.Reason.LOCAL_STORAGE,
        chrome.offscreen.Reason.WORKERS
      ]
    }).then(() => {
      _offscreenCreationPromise = null;
    }).catch((err) => {
      console.error("Error creating offscreen page:", err);
      _offscreenCreationPromise = null;
      throw err;
    });
  }
  if (chrome.runtime.lastError) {
    console.error(el("ensureOffscreenPage"), sl("chrome.offscreen.createDocument"), chrome.runtime.lastError);
  }
  await _offscreenCreationPromise;
  await sleep(500);
};
const openUI = async (deeplink, route = "index.html") => {
  await ensureOffscreenPage();
  const url = chrome.runtime.getURL(route) + (deeplink ? "#?dl=" + deeplink : "");
  return new Promise((resolve) => {
    chrome.tabs.query({ url }, (tabs) => {
      if (chrome.runtime.lastError) {
        return console.error("openUI: query", chrome.runtime.lastError);
      }
      if (tabs && tabs.length > 0) {
        const tab = tabs[0];
        const tabId = tab.id;
        if (tabId !== void 0) {
          chrome.tabs.update(tabId, { active: true }, () => {
            if (chrome.runtime.lastError) {
              console.error("openUI: updating tab:", chrome.runtime.lastError);
            }
            resolve(tabId);
          });
          chrome.windows.update(tab.windowId, { focused: true }, () => {
            if (chrome.runtime.lastError) {
              console.error("openUI: updating window:", chrome.runtime.lastError);
            }
          });
        }
      } else {
        chrome.tabs.create({ url }, (tab) => {
          if (chrome.runtime.lastError) {
            console.error("openUI: creating tab:", chrome.runtime.lastError);
          }
          resolve(tab.id ?? null);
        });
      }
    });
  });
};
const closeUI = async (route = "index.html") => {
  const url = chrome.runtime.getURL(route);
  chrome.tabs.query({ url }, (tabs) => {
    if (chrome.runtime.lastError) {
      return console.error("closeUI: query", chrome.runtime.lastError);
    }
    if (tabs && tabs.length > 0) {
      const tab = tabs[0];
      const tabId = tab.id;
      if (tabId !== void 0) {
        chrome.tabs.remove(tabId, () => {
          if (chrome.runtime.lastError) {
            console.error("closeUI: updating tab:", chrome.runtime.lastError);
          }
        });
      }
    }
  });
};
let _connectedOriginsMap = {};
let _networkId = "mainnet";
let _dappAccountId = "";
let _originAccountList = [];
const getDappAccountId = () => _dappAccountId;
const getNetworkId = () => _networkId;
const setConnectedOriginsMap = (connectedOriginsMap) => {
  _connectedOriginsMap = connectedOriginsMap;
  return _connectedOriginsMap;
};
const setDappAccountId = (dappAccountId) => {
  _dappAccountId = dappAccountId;
  return _dappAccountId;
};
const setNetworkId = (networkId2) => {
  _networkId = networkId2;
  return _networkId;
};
const setOriginAccountList = (originAccountList) => {
  _originAccountList = originAccountList;
  return _originAccountList;
};
const addConnectedOrigin$1 = (origin, extensions) => {
  if (!extensions) {
    return _connectedOriginsMap;
  }
  const originExtensionList = _connectedOriginsMap[origin] ?? [];
  for (const extension of extensions) {
    if (!originExtensionList.some((e) => e.cip === extension.cip)) {
      originExtensionList.push(extension);
    }
  }
  _connectedOriginsMap[origin] = originExtensionList;
  return _connectedOriginsMap;
};
const isConnectedOrigin$1 = (origin, extensions) => {
  if (!origin) {
    return void 0;
  }
  const map = _connectedOriginsMap;
  let originExtensions = map[origin];
  if (!originExtensions) {
    return extensions;
  }
  const grantExtensionList = [];
  if (extensions) {
    grantExtensionList.push(...extensions);
  }
  if (typeof originExtensions === "object") {
    originExtensions = Object.values(originExtensions);
  }
  for (let i = 0; i < originExtensions.length; i++) {
    const extension = originExtensions[i];
    const index = grantExtensionList.findIndex((e) => e.cip === extension.cip);
    if (index > -1) {
      grantExtensionList.splice(index, 1);
    }
  }
  return grantExtensionList.length === 0 ? null : grantExtensionList;
};
const getConnectedExtensions$1 = (origin) => {
  const map = _connectedOriginsMap;
  return origin ? map[origin] ?? [] : [];
};
const setOriginAccount$1 = (origin, domId, calledEnable) => {
  if (!domId) {
    domId = "/ndi";
  }
  if (!domId.startsWith("/")) {
    domId = "/" + domId;
  }
  let found = false;
  let originAccount = null;
  for (let i = 0; i < _originAccountList.length; i++) {
    const entry = _originAccountList[i];
    if (entry.origin === origin && entry.domId === domId) {
      originAccount = entry;
      entry.lastUpdated = Date.now();
      if (entry.accountId === _dappAccountId) {
        entry.needsEnableCall = false;
      } else if (calledEnable) {
        entry.accountId = _dappAccountId;
        entry.needsEnableCall = false;
      } else {
        entry.needsEnableCall = true;
      }
      found = true;
      break;
    }
  }
  if (!found) {
    originAccount = {
      accountId: _dappAccountId,
      origin,
      domId,
      lastUpdated: Date.now(),
      needsEnableCall: !calledEnable
    };
    _originAccountList.push(originAccount);
  }
  for (let i = _originAccountList.length - 1; i >= 0; i--) {
    const entry = _originAccountList[i];
    if (entry.lastUpdated < Date.now() - 1e3 * 60 * 60 * 4) {
      _originAccountList.splice(i, 1);
    }
  }
  return { originAccountList: _originAccountList, originAccount };
};
const getStorageDappAccountId = getDappAccountId;
const getStorageNetworkId = getNetworkId;
const initChromeStorage = () => {
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace !== "local") {
      return;
    }
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      if (key === "originEnabledMap") {
        setConnectedOriginsMap(newValue);
      } else if (key === "originAccountList") {
        setOriginAccountList(newValue);
      } else if (key === "networkId") {
        const changed = getNetworkId() !== newValue;
        if (changed) {
          setNetworkId(newValue);
        }
      } else if (key === "dappAccountId") {
        const changed = getDappAccountId() !== newValue;
        if (changed) {
          setDappAccountId(newValue);
        }
      }
    }
  });
  const calls = [];
  calls.push(
    chrome.storage.local.get("originEnabledMap").then((res) => {
      setConnectedOriginsMap(res.originEnabledMap ?? {});
    })
  );
  calls.push(
    chrome.storage.local.get("originAccountList").then((res) => {
      setOriginAccountList(res.originAccountList ?? []);
    })
  );
  calls.push(
    chrome.storage.local.get("dappAccountId").then((res) => {
      setDappAccountId(res.dappAccountId ?? "");
    })
  );
  calls.push(
    chrome.storage.local.get("networkId").then((res) => {
      setNetworkId(res.networkId ?? "mainnet");
    })
  );
  return Promise.allSettled(calls);
};
const addConnectedOrigin = (origin, extensions) => {
  const _connectedOriginsMap2 = addConnectedOrigin$1(origin, extensions);
  storeOriginEnableMap(_connectedOriginsMap2);
  return _connectedOriginsMap2;
};
const isConnectedOrigin = (origin, extensions) => {
  return isConnectedOrigin$1(origin, extensions);
};
const getConnectedExtensions = (origin) => {
  return getConnectedExtensions$1(origin);
};
const setOriginAccount = (origin, domId, calledEnable) => {
  const {
    originAccountList,
    originAccount
  } = setOriginAccount$1(origin, domId, calledEnable);
  storeAccountOriginList(originAccountList);
  return originAccount;
};
const storeOriginEnableMap = (map) => {
  return chrome.storage.local.set({ originEnabledMap: map });
};
const storeAccountOriginList = (list) => {
  return chrome.storage.local.set({ originAccountList: list });
};
const storeDappAccountId = (dappAccountId) => {
  return chrome.storage.local.set({ dappAccountId });
};
const storeNetworkId = (networkId2) => {
  return chrome.storage.local.set({ networkId: networkId2 });
};
const initContentScriptFromSW = () => {
  var _a;
  const manifest = chrome.runtime.getManifest();
  const csList = manifest.content_scripts;
  if (csList) {
    for (const cs of csList) {
      if (!cs.js || !((_a = cs.js[0]) == null ? void 0 : _a.includes("content.js"))) {
        continue;
      }
      chrome.tabs.query({}).then((tabs) => {
        var _a2;
        if (chrome.runtime.lastError) {
          console.error("initContentScriptFromSW", chrome.runtime.lastError);
        }
        for (const tab of tabs) {
          if ((_a2 = tab.url) == null ? void 0 : _a2.includes("chrome://extensions")) {
            continue;
          }
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: cs.js
          }).then((obj) => {
          }).catch((err) => {
          });
        }
      });
    }
  }
  return true;
};
const storageArea = chrome.storage.local;
const TEST_INTERVAL_MS = 1e3 * 10;
const STORAGE_WAIT_TIME_MS = 5e3;
const hasChromiumIssue395536907 = () => {
  return new Promise((resolve) => {
    let dispatched = false;
    const testEventDispatching = () => {
      storageArea.onChanged.removeListener(testEventDispatching);
      dispatched = true;
    };
    storageArea.onChanged.addListener(testEventDispatching);
    storageArea.set({ testEventDispatching: Math.random() });
    setTimeout(() => resolve(!dispatched), STORAGE_WAIT_TIME_MS);
  });
};
const cleanupExtension = () => {
  chrome.tabs.query({}).then((tabs) => {
    if (chrome.runtime.lastError) {
      console.error("fixChromiumIssue395536907: query", chrome.runtime.lastError);
    }
    for (const tab of tabs) {
      const url = tab.url ?? "";
      if (url.includes("app/signTx") || url.includes("app/signData") || url.includes("app/enable")) {
        console.error("fixChromiumIssue395536907: closing extension popup:", tab.url);
        chrome.tabs.remove(tab.id, () => {
          if (chrome.runtime.lastError) {
            console.error("fixChromiumIssue395536907: remove", chrome.runtime.lastError);
          }
        });
      }
    }
  }).then(() => {
    setTimeout(() => {
      console.error("fixChromiumIssue395536907: reloading extension.");
      chrome.runtime.reload();
    }, 250);
  });
};
self.cleanupExtension = cleanupExtension;
const logChromiumIssue395536907 = () => {
  hasChromiumIssue395536907().then((hasIssue) => {
    if (hasIssue) {
      console.warn("Chromium issue 395536907 detected.");
    }
    setTimeout(logChromiumIssue395536907, TEST_INTERVAL_MS);
  });
};
const activeSlotsCoeff$8 = 0.05;
const protocolParams$8 = { "protocolVersion": { "minor": 0, "major": 2 }, "decentralisationParam": 1, "eMax": 18, "extraEntropy": { "tag": "NeutralNonce" }, "maxTxSize": 16384, "maxBlockBodySize": 65536, "maxBlockHeaderSize": 1100, "minFeeA": 44, "minFeeB": 155381, "minUTxOValue": 1e6, "poolDeposit": 5e8, "minPoolCost": 34e7, "keyDeposit": 2e6, "nOpt": 150, "rho": 3e-3, "tau": 0.2, "a0": 0.3 };
const updateQuorum$8 = 5;
const networkId$8 = "Mainnet";
const initialFunds$1 = {};
const maxLovelaceSupply$8 = 45e15;
const networkMagic$8 = 764824073;
const epochLength$8 = 432e3;
const systemStart$8 = "2017-09-23T21:44:51Z";
const slotsPerKESPeriod$8 = 129600;
const slotLength$8 = 1;
const maxKESEvolutions$8 = 62;
const securityParam$8 = 2160;
const mainnetShelley = {
  activeSlotsCoeff: activeSlotsCoeff$8,
  protocolParams: protocolParams$8,
  updateQuorum: updateQuorum$8,
  networkId: networkId$8,
  initialFunds: initialFunds$1,
  maxLovelaceSupply: maxLovelaceSupply$8,
  networkMagic: networkMagic$8,
  epochLength: epochLength$8,
  systemStart: systemStart$8,
  slotsPerKESPeriod: slotsPerKESPeriod$8,
  slotLength: slotLength$8,
  maxKESEvolutions: maxKESEvolutions$8,
  securityParam: securityParam$8
};
const maxLovelaceSupply$7 = 45e15;
const securityParam$7 = 36;
const slotsPerKESPeriod$7 = 129600;
const updateQuorum$7 = 1;
const activeSlotsCoeff$7 = 0.05;
const protocolParams$7 = { "minUTxOValue": 1e6, "eMax": 18, "extraEntropy": { "tag": "NeutralNonce" }, "minFeeB": 1e3, "tau": 0.1, "maxBlockBodySize": 65536, "minPoolCost": 34e7, "minFeeA": 1, "maxTxSize": 16384, "nOpt": 10, "maxBlockHeaderSize": 1100, "keyDeposit": 2e6, "protocolVersion": { "minor": 0, "major": 2 }, "poolDeposit": 5e8, "a0": 0.3, "rho": 3e-4, "decentralisationParam": 0.8 };
const networkMagic$7 = 141;
const maxKESEvolutions$7 = 62;
const networkId$7 = "Testnet";
const slotLength$7 = 1;
const systemStart$7 = "2021-12-09T22:55:22Z";
const epochLength$7 = 3600;
const guildShelley = {
  maxLovelaceSupply: maxLovelaceSupply$7,
  securityParam: securityParam$7,
  slotsPerKESPeriod: slotsPerKESPeriod$7,
  updateQuorum: updateQuorum$7,
  activeSlotsCoeff: activeSlotsCoeff$7,
  protocolParams: protocolParams$7,
  networkMagic: networkMagic$7,
  maxKESEvolutions: maxKESEvolutions$7,
  networkId: networkId$7,
  slotLength: slotLength$7,
  systemStart: systemStart$7,
  epochLength: epochLength$7
};
const maxLovelaceSupply$6 = 45e15;
const securityParam$6 = 432;
const slotsPerKESPeriod$6 = 129600;
const updateQuorum$6 = 3;
const activeSlotsCoeff$6 = 0.05;
const protocolParams$6 = { "a0": 0.3, "decentralisationParam": 1, "eMax": 18, "extraEntropy": { "tag": "NeutralNonce" }, "keyDeposit": 2e6, "maxBlockBodySize": 65536, "maxBlockHeaderSize": 1100, "maxTxSize": 16384, "minFeeA": 44, "minFeeB": 155381, "minPoolCost": 34e7, "minUTxOValue": 1e6, "nOpt": 150, "poolDeposit": 5e8, "protocolVersion": { "major": 6, "minor": 0 }, "rho": 3e-3, "tau": 0.2 };
const networkMagic$6 = 4;
const initialFunds = {};
const maxKESEvolutions$6 = 62;
const networkId$6 = "Testnet";
const slotLength$6 = 1;
const systemStart$6 = "2023-06-15T00:30:00Z";
const epochLength$6 = 86400;
const sanchoShelley = {
  maxLovelaceSupply: maxLovelaceSupply$6,
  securityParam: securityParam$6,
  slotsPerKESPeriod: slotsPerKESPeriod$6,
  updateQuorum: updateQuorum$6,
  activeSlotsCoeff: activeSlotsCoeff$6,
  protocolParams: protocolParams$6,
  networkMagic: networkMagic$6,
  initialFunds,
  maxKESEvolutions: maxKESEvolutions$6,
  networkId: networkId$6,
  slotLength: slotLength$6,
  systemStart: systemStart$6,
  epochLength: epochLength$6
};
const activeSlotsCoeff$5 = 0.05;
const epochLength$5 = 432e3;
const maxKESEvolutions$5 = 62;
const maxLovelaceSupply$5 = 45e15;
const networkId$5 = "Testnet";
const networkMagic$5 = 1;
const protocolParams$5 = { "protocolVersion": { "minor": 0, "major": 2 }, "decentralisationParam": 1, "eMax": 18, "extraEntropy": { "tag": "NeutralNonce" }, "maxTxSize": 16384, "maxBlockBodySize": 65536, "maxBlockHeaderSize": 1100, "minFeeA": 44, "minFeeB": 155381, "minUTxOValue": 1e6, "poolDeposit": 5e8, "minPoolCost": 34e7, "keyDeposit": 2e6, "nOpt": 150, "rho": 3e-3, "tau": 0.2, "a0": 0.3 };
const securityParam$5 = 2160;
const slotLength$5 = 1;
const slotsPerKESPeriod$5 = 129600;
const systemStart$5 = "2022-06-01T00:00:00Z";
const updateQuorum$5 = 5;
const preprodShelley = {
  activeSlotsCoeff: activeSlotsCoeff$5,
  epochLength: epochLength$5,
  maxKESEvolutions: maxKESEvolutions$5,
  maxLovelaceSupply: maxLovelaceSupply$5,
  networkId: networkId$5,
  networkMagic: networkMagic$5,
  protocolParams: protocolParams$5,
  securityParam: securityParam$5,
  slotLength: slotLength$5,
  slotsPerKESPeriod: slotsPerKESPeriod$5,
  systemStart: systemStart$5,
  updateQuorum: updateQuorum$5
};
const activeSlotsCoeff$4 = 0.05;
const epochLength$4 = 86400;
const maxKESEvolutions$4 = 62;
const maxLovelaceSupply$4 = 45e15;
const networkId$4 = "Testnet";
const networkMagic$4 = 2;
const protocolParams$4 = { "protocolVersion": { "minor": 0, "major": 6 }, "decentralisationParam": 1, "eMax": 18, "extraEntropy": { "tag": "NeutralNonce" }, "maxTxSize": 16384, "maxBlockBodySize": 65536, "maxBlockHeaderSize": 1100, "minFeeA": 44, "minFeeB": 155381, "minUTxOValue": 1e6, "poolDeposit": 5e8, "minPoolCost": 34e7, "keyDeposit": 2e6, "nOpt": 150, "rho": 3e-3, "tau": 0.2, "a0": 0.3 };
const securityParam$4 = 432;
const slotLength$4 = 1;
const slotsPerKESPeriod$4 = 129600;
const systemStart$4 = "2022-10-25T00:00:00Z";
const updateQuorum$4 = 5;
const previewShelley = {
  activeSlotsCoeff: activeSlotsCoeff$4,
  epochLength: epochLength$4,
  maxKESEvolutions: maxKESEvolutions$4,
  maxLovelaceSupply: maxLovelaceSupply$4,
  networkId: networkId$4,
  networkMagic: networkMagic$4,
  protocolParams: protocolParams$4,
  securityParam: securityParam$4,
  slotLength: slotLength$4,
  slotsPerKESPeriod: slotsPerKESPeriod$4,
  systemStart: systemStart$4,
  updateQuorum: updateQuorum$4
};
const systemStart$3 = "2024-06-22T10:37:36.000000000Z";
const networkMagic$3 = 1127;
const networkId$3 = "Testnet";
const activeSlotsCoeff$3 = 0.25;
const securityParam$3 = 216;
const epochLength$3 = 8640;
const slotsPerKESPeriod$3 = 129600;
const maxKESEvolutions$3 = 62;
const slotLength$3 = 1;
const updateQuorum$3 = 2;
const maxLovelaceSupply$3 = 3e15;
const protocolParams$3 = { "minFeeA": 45, "minFeeB": 156253, "maxBlockBodySize": 180224, "maxTxSize": 16384, "maxBlockHeaderSize": 1100, "keyDeposit": 0, "poolDeposit": 0, "eMax": 18, "nOpt": 100, "a0": 0, "rho": 1e-5, "tau": 1e-6, "minPoolCost": 0, "decentralisationParam": 0.7, "extraEntropy": { "tag": "NeutralNonce" }, "protocolVersion": { "major": 7, "minor": 0 }, "minUTxOValue": 1e6 };
const afvtShelley = {
  systemStart: systemStart$3,
  networkMagic: networkMagic$3,
  networkId: networkId$3,
  activeSlotsCoeff: activeSlotsCoeff$3,
  securityParam: securityParam$3,
  epochLength: epochLength$3,
  slotsPerKESPeriod: slotsPerKESPeriod$3,
  maxKESEvolutions: maxKESEvolutions$3,
  slotLength: slotLength$3,
  updateQuorum: updateQuorum$3,
  maxLovelaceSupply: maxLovelaceSupply$3,
  protocolParams: protocolParams$3
};
const systemStart$2 = "2024-06-22T10:37:36.000000000Z";
const networkMagic$2 = 3327;
const networkId$2 = "Testnet";
const activeSlotsCoeff$2 = 0.25;
const securityParam$2 = 216;
const epochLength$2 = 8640;
const slotsPerKESPeriod$2 = 129600;
const maxKESEvolutions$2 = 62;
const slotLength$2 = 1;
const updateQuorum$2 = 2;
const maxLovelaceSupply$2 = 3e15;
const protocolParams$2 = { "minFeeA": 45, "minFeeB": 156253, "maxBlockBodySize": 180224, "maxTxSize": 16384, "maxBlockHeaderSize": 1100, "keyDeposit": 0, "poolDeposit": 0, "eMax": 18, "nOpt": 100, "a0": 0, "rho": 1e-5, "tau": 1e-6, "minPoolCost": 0, "decentralisationParam": 0.7, "extraEntropy": { "tag": "NeutralNonce" }, "protocolVersion": { "major": 7, "minor": 0 }, "minUTxOValue": 1e6 };
const afvmShelley = {
  systemStart: systemStart$2,
  networkMagic: networkMagic$2,
  networkId: networkId$2,
  activeSlotsCoeff: activeSlotsCoeff$2,
  securityParam: securityParam$2,
  epochLength: epochLength$2,
  slotsPerKESPeriod: slotsPerKESPeriod$2,
  maxKESEvolutions: maxKESEvolutions$2,
  slotLength: slotLength$2,
  updateQuorum: updateQuorum$2,
  maxLovelaceSupply: maxLovelaceSupply$2,
  protocolParams: protocolParams$2
};
const systemStart$1 = "2024-05-16T17:18:10.000000000Z";
const networkMagic$1 = 3311;
const networkId$1 = "Testnet";
const activeSlotsCoeff$1 = 0.05;
const securityParam$1 = 2160;
const epochLength$1 = 432e3;
const slotsPerKESPeriod$1 = 129600;
const maxKESEvolutions$1 = 62;
const slotLength$1 = 1;
const updateQuorum$1 = 2;
const maxLovelaceSupply$1 = 3e15;
const protocolParams$1 = { "minFeeA": 47, "minFeeB": 158298, "maxBlockBodySize": 65536, "maxTxSize": 16384, "maxBlockHeaderSize": 1100, "keyDeposit": 0, "poolDeposit": 0, "eMax": 18, "nOpt": 100, "a0": 0, "rho": 38e-4, "tau": 1e-6, "minPoolCost": 0, "decentralisationParam": 0.7, "extraEntropy": { "tag": "NeutralNonce" }, "protocolVersion": { "major": 7, "minor": 0 }, "minUTxOValue": 1e6 };
const afptShelley = {
  systemStart: systemStart$1,
  networkMagic: networkMagic$1,
  networkId: networkId$1,
  activeSlotsCoeff: activeSlotsCoeff$1,
  securityParam: securityParam$1,
  epochLength: epochLength$1,
  slotsPerKESPeriod: slotsPerKESPeriod$1,
  maxKESEvolutions: maxKESEvolutions$1,
  slotLength: slotLength$1,
  updateQuorum: updateQuorum$1,
  maxLovelaceSupply: maxLovelaceSupply$1,
  protocolParams: protocolParams$1
};
const systemStart = "2024-05-13T17:40:00.000000000Z";
const networkMagic = 764824073;
const networkId = "Mainnet";
const activeSlotsCoeff = 0.05;
const securityParam = 2160;
const epochLength = 432e3;
const slotsPerKESPeriod = 129600;
const maxKESEvolutions = 60;
const slotLength = 1;
const updateQuorum = 5;
const maxLovelaceSupply = 3e15;
const protocolParams = { "minFeeA": 47, "minFeeB": 158298, "maxBlockBodySize": 65536, "maxTxSize": 16384, "maxBlockHeaderSize": 1100, "keyDeposit": 0, "poolDeposit": 0, "eMax": 18, "nOpt": 100, "a0": 0, "rho": 1e-5, "tau": 1e-6, "minPoolCost": 0, "decentralisationParam": 0.7, "extraEntropy": { "tag": "NeutralNonce" }, "protocolVersion": { "major": 2, "minor": 0 }, "minUTxOValue": 1e6 };
const afpmShelley = {
  systemStart,
  networkMagic,
  networkId,
  activeSlotsCoeff,
  securityParam,
  epochLength,
  slotsPerKESPeriod,
  maxKESEvolutions,
  slotLength,
  updateQuorum,
  maxLovelaceSupply,
  protocolParams
};
const blockVersionData$8 = { "heavyDelThd": "300000000000", "maxBlockSize": "2000000", "maxHeaderSize": "2000000", "maxProposalSize": "700", "maxTxSize": "4096", "mpcThd": "20000000000000", "scriptVersion": 0, "slotDuration": "20000", "softforkRule": { "initThd": "900000000000000", "minThd": "600000000000000", "thdDecrement": "50000000000000" }, "txFeePolicy": { "multiplier": "43946000000", "summand": "155381000000000" }, "unlockStakeEpoch": "18446744073709551615", "updateImplicit": "10000", "updateProposalThd": "100000000000000", "updateVoteThd": "1000000000000" };
const ftsSeed = "76617361206f7061736120736b6f766f726f64612047677572646120626f726f64612070726f766f6461";
const protocolConsts$8 = { "k": 2160, "protocolMagic": 764824073, "vssMaxTTL": 6, "vssMinTTL": 2 };
const startTime$8 = 1506203091;
const mainnetByron = {
  blockVersionData: blockVersionData$8,
  ftsSeed,
  protocolConsts: protocolConsts$8,
  startTime: startTime$8
};
const startTime$7 = 1639090522;
const blockVersionData$7 = { "scriptVersion": 0, "slotDuration": "100", "maxBlockSize": "641000", "maxHeaderSize": "200000", "maxTxSize": "4096", "maxProposalSize": "700", "mpcThd": "200000", "heavyDelThd": "300000", "updateVoteThd": "100000", "updateProposalThd": "100000", "updateImplicit": "10000", "softforkRule": { "initThd": "900000", "minThd": "600000", "thdDecrement": "100000" }, "txFeePolicy": { "summand": "0", "multiplier": "439460" }, "unlockStakeEpoch": "184467" };
const protocolConsts$7 = { "k": 36, "protocolMagic": 141 };
const avvmDistr$2 = {};
const guildByron = {
  startTime: startTime$7,
  blockVersionData: blockVersionData$7,
  protocolConsts: protocolConsts$7,
  avvmDistr: avvmDistr$2
};
const startTime$6 = 1686789e3;
const blockVersionData$6 = { "avvmDistr": {}, "heavyDelThd": "300000000000", "maxBlockSize": "2000000", "maxHeaderSize": "2000000", "maxProposalSize": "700", "maxTxSize": "4096", "mpcThd": "20000000000000", "scriptVersion": 0, "slotDuration": "20000", "softforkRule": { "initThd": "900000000000000", "minThd": "600000000000000", "thdDecrement": "50000000000000" }, "txFeePolicy": { "multiplier": "43946000000", "summand": "155381000000000" }, "unlockStakeEpoch": "18446744073709551615", "updateImplicit": "10000", "updateProposalThd": "100000000000000", "updateVoteThd": "1000000000000" };
const protocolConsts$6 = { "k": 432, "protocolMagic": 4 };
const sanchoByron = {
  startTime: startTime$6,
  blockVersionData: blockVersionData$6,
  protocolConsts: protocolConsts$6
};
const startTime$5 = 1654041600;
const blockVersionData$5 = { "scriptVersion": 0, "slotDuration": "20000", "maxBlockSize": "2000000", "maxHeaderSize": "2000000", "maxTxSize": "4096", "maxProposalSize": "700", "mpcThd": "20000000000000", "heavyDelThd": "300000000000", "updateVoteThd": "1000000000000", "updateProposalThd": "100000000000000", "updateImplicit": "10000", "softforkRule": { "initThd": "900000000000000", "minThd": "600000000000000", "thdDecrement": "50000000000000" }, "txFeePolicy": { "summand": "155381000000000", "multiplier": "43946000000" }, "unlockStakeEpoch": "18446744073709551615" };
const protocolConsts$5 = { "k": 2160, "protocolMagic": 1 };
const preprodByron = {
  startTime: startTime$5,
  blockVersionData: blockVersionData$5,
  protocolConsts: protocolConsts$5
};
const startTime$4 = 1666656e3;
const blockVersionData$4 = { "scriptVersion": 0, "slotDuration": "20000", "maxBlockSize": "2000000", "maxHeaderSize": "2000000", "maxTxSize": "4096", "maxProposalSize": "700", "mpcThd": "20000000000000", "heavyDelThd": "300000000000", "updateVoteThd": "1000000000000", "updateProposalThd": "100000000000000", "updateImplicit": "10000", "softforkRule": { "initThd": "900000000000000", "minThd": "600000000000000", "thdDecrement": "50000000000000" }, "txFeePolicy": { "summand": "155381000000000", "multiplier": "43946000000" }, "unlockStakeEpoch": "18446744073709551615" };
const protocolConsts$4 = { "k": 432, "protocolMagic": 2 };
const previewByron = {
  startTime: startTime$4,
  blockVersionData: blockVersionData$4,
  protocolConsts: protocolConsts$4
};
const startTime$3 = 1719052656;
const blockVersionData$3 = { "scriptVersion": 0, "slotDuration": "20000", "maxBlockSize": "2000000", "maxHeaderSize": "2000000", "maxTxSize": "4096", "maxProposalSize": "700", "mpcThd": "20000000000000", "heavyDelThd": "300000000000", "updateVoteThd": "1000000000000", "updateProposalThd": "100000000000000", "updateImplicit": "10000", "softforkRule": { "initThd": "900000000000000", "minThd": "600000000000000", "thdDecrement": "50000000000000" }, "txFeePolicy": { "summand": "155381000000000", "multiplier": "43946000000" }, "unlockStakeEpoch": "18446744073709551615" };
const protocolConsts$3 = { "k": 216, "protocolMagic": 1127 };
const avvmDistr$1 = {};
const afvtByron = {
  startTime: startTime$3,
  blockVersionData: blockVersionData$3,
  protocolConsts: protocolConsts$3,
  avvmDistr: avvmDistr$1
};
const startTime$2 = 1719052656;
const blockVersionData$2 = { "scriptVersion": 0, "slotDuration": "20000", "maxBlockSize": "2000000", "maxHeaderSize": "2000000", "maxTxSize": "4096", "maxProposalSize": "700", "mpcThd": "20000000000000", "heavyDelThd": "300000000000", "updateVoteThd": "1000000000000", "updateProposalThd": "100000000000000", "updateImplicit": "10000", "softforkRule": { "initThd": "900000000000000", "minThd": "600000000000000", "thdDecrement": "50000000000000" }, "txFeePolicy": { "summand": "155381000000000", "multiplier": "43946000000" }, "unlockStakeEpoch": "18446744073709551615" };
const protocolConsts$2 = { "k": 216, "protocolMagic": 1127 };
const avvmDistr = {};
const afvmByron = {
  startTime: startTime$2,
  blockVersionData: blockVersionData$2,
  protocolConsts: protocolConsts$2,
  avvmDistr
};
const startTime$1 = 1715879890;
const blockVersionData$1 = { "scriptVersion": 0, "slotDuration": "20000", "maxBlockSize": "2000000", "maxHeaderSize": "2000000", "maxTxSize": "4096", "maxProposalSize": "700", "mpcThd": "20000000000000", "heavyDelThd": "300000000000", "updateVoteThd": "1000000000000", "updateProposalThd": "100000000000000", "updateImplicit": "10000", "softforkRule": { "initThd": "900000000000000", "minThd": "600000000000000", "thdDecrement": "50000000000000" }, "txFeePolicy": { "summand": "155381000000000", "multiplier": "43946000000" }, "unlockStakeEpoch": "18446744073709551615" };
const protocolConsts$1 = { "k": 2160, "protocolMagic": 3311 };
const afptByron = {
  startTime: startTime$1,
  blockVersionData: blockVersionData$1,
  protocolConsts: protocolConsts$1
};
const startTime = 1715622e3;
const blockVersionData = { "scriptVersion": 0, "slotDuration": "20000", "maxBlockSize": "2000000", "maxHeaderSize": "2000000", "maxTxSize": "4096", "maxProposalSize": "700", "mpcThd": "20000000000000", "heavyDelThd": "300000000000", "updateVoteThd": "1000000000000", "updateProposalThd": "100000000000000", "updateImplicit": "10000", "softforkRule": { "initThd": "900000000000000", "minThd": "600000000000000", "thdDecrement": "50000000000000" }, "txFeePolicy": { "summand": "155381000000000", "multiplier": "43946000000" }, "unlockStakeEpoch": "18446744073709551615" };
const protocolConsts = { "k": 2160, "protocolMagic": 764824073 };
const afpmByron = {
  startTime,
  blockVersionData,
  protocolConsts
};
const GenesisStore = {
  mainnet: {
    shelley: mainnetShelley,
    byron: mainnetByron
  },
  guild: {
    shelley: guildShelley,
    byron: guildByron
  },
  sancho: {
    shelley: sanchoShelley,
    byron: sanchoByron
  },
  preprod: {
    shelley: preprodShelley,
    byron: preprodByron
  },
  preview: {
    shelley: previewShelley,
    byron: previewByron
  },
  afvt: {
    shelley: afvtShelley,
    byron: afvtByron
  },
  afvm: {
    shelley: afvmShelley,
    byron: afvmByron
  },
  afpt: {
    shelley: afptShelley,
    byron: afptByron
  },
  afpm: {
    shelley: afpmShelley,
    byron: afpmByron
  }
};
const getNetworkMagic = (networkId2) => GenesisStore[networkId2].shelley.networkMagic;
const storeId$2 = "bgCip30";
const _cip30_enable = (extensions) => {
  if (doLogAll) {
    console.log(el(storeId$2), sl("_cip30_enable"), extensions);
  }
  const unsupportedExtensionList = [];
  if (!extensions || !Array.isArray(extensions)) {
    extensions = [extCip30];
  }
  for (const extension of extensions) {
    if (!extension.hasOwnProperty("cip") || Number.isNaN(parseInt(extension.cip))) {
      return void 0;
    }
    if (!supportedExtensions.some((e) => e.cip === extension.cip)) {
      if (unsupportedExtensionList.some((e) => e.cip === extension.cip)) {
        continue;
      }
      unsupportedExtensionList.push(extension);
    }
  }
  return unsupportedExtensionList.length === 0 ? null : unsupportedExtensionList;
};
const _cip30_getNetworkId = (networkId2) => {
  let respNetworkId = void 0;
  try {
    respNetworkId = getNetworkId$1(networkId2);
  } catch (e) {
  }
  if (doLogAll) {
    console.log(el(storeId$2), sl("_cip30_getNetworkId"), networkId2, respNetworkId);
  }
  return respNetworkId;
};
const _cip30_getNetworkMagic = (networkId2) => {
  let respNetworkMagic = void 0;
  try {
    respNetworkMagic = getNetworkMagic(networkId2);
  } catch (e) {
  }
  if (doLogAll) {
    console.log(el(storeId$2), sl("_cip30_getNetworkMagic"), networkId2, respNetworkMagic);
  }
  return respNetworkMagic;
};
const _cip30_getConnectedNetworkId = (networkId2) => {
  let respNetworkId = void 0;
  try {
    respNetworkId = isSupportedNetworkId(networkId2) ? networkId2 : void 0;
  } catch (e) {
  }
  if (doLogAll) {
    console.log(el(storeId$2), sl("_cip30_getConnectedNetworkId"), networkId2, respNetworkId);
  }
  return respNetworkId;
};
const checkEnable = (req) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el(storeId$2), sl("checkEnable"), req, origin);
  }
  let wantedExtensionList = req.payload.extensions;
  if (!wantedExtensionList || !Array.isArray(wantedExtensionList)) {
    wantedExtensionList = [extCip30];
  }
  const unsupportedExtensions = _cip30_enable(wantedExtensionList);
  if (unsupportedExtensions === void 0) {
    req.response = errorInvalidArgument();
  } else if (unsupportedExtensions) {
    req.response = errorUnsupportedExtensions(unsupportedExtensions);
  }
  if (req.response) {
    if (doLogAll) {
      console.error(el(storeId$2), sl("checkEnable"), sl("error"), req.response);
    }
    return req;
  }
  if (wantedExtensionList.some((e1) => autoGrantWithCIP30List.some((e2) => e2.cip === e1.cip)) && !wantedExtensionList.some((e) => e.cip === extCip30.cip)) {
    wantedExtensionList.push(extCip30);
  }
  for (let i = wantedExtensionList.length - 1; i >= 0; i--) {
    const ext = wantedExtensionList[i];
    if (autoGrantWithCIP30List.some((e) => e.cip === ext.cip)) {
      wantedExtensionList.splice(i, 1);
    }
  }
  const grantExtensionList = isConnectedOrigin(origin, wantedExtensionList);
  if (grantExtensionList === void 0) {
    req.response = errorInvalidArgument();
    return req;
  }
  const isConnected = !grantExtensionList;
  if (doLogAll) {
    console.log(el(storeId$2), sl("checkEnable"), "isConnected", isConnected, origin, req);
  }
  if (isConnected) {
    if (getStorageDappAccountId()) {
      const originAccount = setOriginAccount(origin, req.payload.domId, req.api === METHOD.enable);
      req.response = { success: true, isEnabled: !originAccount.needsEnableCall };
    } else {
      req.response = errorNoAccount();
    }
    if (doLogAll) {
      console.warn(el(storeId$2), sl("checkEnable"), sl("isConnected"), req);
    }
    return req;
  }
  req.payload.extensions = grantExtensionList ?? wantedExtensionList;
  return req;
};
const _isEnabled = (req) => {
  const origin = req.payload.origin;
  const isEnabled = isConnectedOrigin(origin, []) === null;
  if (doLogAll) {
    console.warn(el(storeId$2), sl("_isEnabled"), sl("origin"), origin, isEnabled);
  }
  return isEnabled;
};
const _didAccountChange = (req) => {
  if (getStorageDappAccountId()) {
    const originAccount = setOriginAccount(req.payload.origin, req.payload.domId, req.api === METHOD.enable);
    if (doLogAll) {
      console.warn(el(storeId$2), sl("_didAccountChange"), sl("originAccount"), originAccount);
    }
    return originAccount.needsEnableCall;
  }
  return true;
};
const handleIsEnabled = (req) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el(storeId$2), sl("handleIsEnabled"), sl("req"), req, origin);
  }
  req.response = {
    success: true,
    isEnabled: isConnectedOrigin(origin, []) === null
  };
  if (doLogAll) {
    console.warn(el(storeId$2), sl("handleIsEnabled"), sl("response"), req.response);
  }
  return req;
};
const handleGetNetworkId = (req) => {
  const resNetworkId = _cip30_getNetworkId(getStorageNetworkId());
  if (resNetworkId !== void 0) {
    req.response = { success: true, networkId: resNetworkId };
  } else {
    req.response = errorNoNetworkId();
  }
  if (doLogAll) {
    console.warn(el(storeId$2), sl("handleGetNetworkId"), sl("req"), req);
  }
  return req;
};
const handleGetNetworkMagic = (req) => {
  const resNetworkMagic = _cip30_getNetworkMagic(getStorageNetworkId());
  if (resNetworkMagic !== void 0) {
    req.response = { success: true, networkMagic: resNetworkMagic };
  } else {
    req.response = errorNoNetworkMagic();
  }
  if (doLogAll) {
    console.warn(el("handleGetNetworkMagic"), sl("req"), req);
  }
  return req;
};
const handleGetConnectedNetworkId = (req) => {
  const resNetworkId = _cip30_getConnectedNetworkId(getStorageNetworkId());
  if (resNetworkId !== void 0) {
    req.response = { success: true, connectedNetworkId: resNetworkId };
  } else {
    req.response = errorNoNetworkId();
  }
  if (doLogAll) {
    console.warn(el("handleGetConnectedNetworkId"), sl("req"), req);
  }
  return req;
};
const handleGetExtensions = (req) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el(storeId$2), sl("handleGetExtensions"), sl("req"), req, origin);
  }
  const extensions = getConnectedExtensions(origin);
  req.response = { success: true, extensions };
  if (doLogAll) {
    console.warn(el(storeId$2), sl("handleGetExtensions"), sl("response"), req);
  }
  return req;
};
const storeId$1 = "bgHandleRequest";
const handleApiRequest = (req) => {
  if (doLogAll) {
    console.warn(el(storeId$1), sl("req"), json(req));
  }
  if (doLogAll) {
    console.warn(el(storeId$1), sl("api"), req.api);
  }
  if (req.api === METHOD.enableLogs) {
    enableLogs(req.payload.enable);
  }
  switch (req.api) {
    // Check only, not handle. If no response, service worker will open enable-popup which will handle the request.
    case METHOD.enable:
      return checkEnable(req);
    case METHOD.isEnabled:
      return handleIsEnabled(req);
    case METHOD.getNetworkId:
      return handleGetNetworkId(req);
    case METHOD.getNetworkMagic:
      return handleGetNetworkMagic(req);
    case METHOD.getConnectedNetworkId:
      return handleGetConnectedNetworkId(req);
    case METHOD.getExtensions:
      return handleGetExtensions(req);
  }
  return req;
};
setAppMode(AppMode.bg);
const storeId = "bg";
if (doLogAll) {
  console.warn(el(storeId), sl("loaded"));
}
self.addEventListener("error", (event) => {
  console.error("Global error in service worker:", event.error, event);
});
self.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection in service worker:", event.reason, event);
});
let _isAwake = false;
const checkIApiRequest = (req) => {
  if (!req) {
    return null;
  }
  if (!req.reqId) {
    req.response = errorNoReqId();
    return req;
  }
  if (!req.api) {
    req.response = errorNoApi();
    return req;
  }
  if (!req.payload) {
    req.response = errorNoPayload();
    return req;
  }
  if (!req.payload.origin) {
    req.response = errorNoOrigin();
    return req;
  }
  return req;
};
const sendResponse = async (req, handleErrors) => {
  const pendingReq = getPendingAPIRequest(req);
  if (!pendingReq) {
    if (doLogAll) {
      console.error(el(storeId), sl("sendResponse: no pendingReq"), json(req));
    }
    return;
  }
  removePendingAPIRequest(req.reqId);
  const tabId = pendingReq.tabId;
  if (doLogAll) {
    console.log(el(storeId), sl("sendResponse: tabId, req:"), pendingReq.tabId, json(req));
  }
  req.channel = ApiChannel.bgToCs;
  if (!req.response && handleErrors) {
    handleErrors(req);
  }
  await chrome.tabs.sendMessage(tabId, req);
  if (chrome.runtime.lastError) {
    console.error("sendResponse", chrome.runtime.lastError);
  }
};
const handleRemovedRequests = (reqList) => {
  if (doLogAll) {
    console.log(el(storeId), sl("handleRemovedRequests"), reqList);
  }
  for (const req of reqList) {
    if (doLogAll) {
      console.log(el(storeId), sl("handleRemovedRequests"), req);
    }
    handleMissingSidePanelResponse(req);
    handleMissingOffscreenResponse(req);
    sendResponse(req);
  }
};
const createPendingAPIRequest = (req, senderTabId) => {
  if (senderTabId > 0) {
    const pendingReq = {
      ...req,
      origin: req.payload.origin,
      tabId: senderTabId,
      timestamp: Date.now(),
      isSidePanel: false
    };
    if (doLogAll) {
      console.log(el(storeId), sl("createPendingAPIRequest"), pendingReq);
    }
    const removedRequestList = addPendingAPIRequest(pendingReq);
    handleRemovedRequests(removedRequestList);
    return pendingReq;
  }
  return null;
};
const sendToOffscreen = async (req) => {
  await ensureOffscreenPage();
  req.channel = ApiChannel.bgToOffscreen;
  if (doLogAll) {
    console.log(el(storeId), sl("sendToOffscreen"), json(req));
  }
  chrome.runtime.sendMessage(req).then((response) => {
    if (chrome.runtime.lastError) {
      if (doLogAll) {
        console.log(el(storeId), sl("sendToOffscreen: response"), json(req), response);
      }
      console.error("Error in sendMessage (sendToOffscreen):", chrome.runtime.lastError);
      if (!req.response) {
        req.response = errorInternal(chrome.runtime.lastError);
      }
      sendResponse(req);
    }
  });
};
const handleMissingOffscreenResponse = (req) => {
  if (doLogAll) {
    console.error(el(storeId), sl("handleMissingOffscreenResponse"), json(req));
  }
  if (!req.response) {
    req.response = errorComsMalformed();
  }
};
const handleMissingSidePanelResponse = (req) => {
  if (doLogAll) {
    console.error(el(storeId), sl("handleMissingSidePanelResponse"), json(req));
  }
  if (req.response) {
    return;
  }
  switch (req.api) {
    case METHOD.enable:
      req.response = errorConnectionRefused();
      break;
    case METHOD.signTx:
      req.response = errorTxUserDeclined();
      break;
    case METHOD.signData:
      req.response = errorDataUserDeclined();
      break;
    default:
      req.response = errorComsMalformed();
      break;
  }
};
const triggerUserInput = (req, senderTabId) => {
  if (doLogAll) {
    console.log(el(storeId), sl("triggerUserInput"), json(req));
  }
  if (req.payload.isIframe || !chrome.sidePanel) {
    return sendToMainUi(req);
  }
  return sendToSidePanel(req);
};
const sendToSidePanel = (req, senderTabId) => {
  req.channel = ApiChannel.bgToSidePanel;
  return openBexSidePanel().then(() => {
    if (doLogAll) {
      console.log(el(storeId), sl("sendToSidePanel"), "opened");
    }
    return chrome.runtime.sendMessage(req);
  }).catch((err) => {
    if (doLogAll) {
      console.error(el(storeId), sl("sendToSidePanel"), err);
    }
    const errStr = err ? err.toString() : "";
    if (errStr.includes("sidePanel.open") && errStr.includes("user gesture")) {
      return sendToMainUi(req);
    } else {
      req.response = errorInternal("SidePanel: " + err ? err.toString() : "");
      return sendResponse(req);
    }
  });
};
const onConnectPanel = (port) => {
  if (port.name === ApiChannel.sidePanelToBg) {
    setIsSidePanelOpen();
    port.onDisconnect.addListener(() => {
      if (doLogAll) {
        console.log(el(storeId), sl("onDisconnect ApiChannel.sidePanelToBg"));
      }
      const removedRequestList = removeAllPendingSidePanelAPIRequests();
      handleRemovedRequests(removedRequestList);
      setIsSidePanelClosed();
    });
  }
  if (port.name === ApiChannel.mainToBg) {
    setIsMainUIOpen();
    port.onDisconnect.addListener(() => {
      if (doLogAll) {
        console.log(el(storeId), sl("onDisconnect ApiChannel.mainToBg"));
      }
      const removedRequestList = removeAllPendingSidePanelAPIRequests();
      handleRemovedRequests(removedRequestList);
      setIsMainUIClosed();
    });
  }
};
const responseCache = {};
const sendToMainUi = async (req, senderTabId) => {
  req.channel = ApiChannel.bgToMain;
  if (doLogAll) {
    console.warn(el(storeId), sl("sendToMainUi"), req);
  }
  const tabId = await openUI();
  if (tabId) {
    let i = 0;
    while (i++ < 20 && !getIsMainUIOpen()) {
      if (doLogAll) {
        console.warn(el("sendToMainUi"), sl("waiting for connection"));
      }
      await sleep(250);
    }
    chrome.runtime.sendMessage(req).then((response) => {
      if (doLogAll) {
        console.warn(el(storeId), sl("sendToMainUi: response"), req, response);
      }
      if (chrome.runtime.lastError) {
        console.error("sendToMainUi:", chrome.runtime.lastError);
      }
    });
  }
};
let _initChromeStorage = initChromeStorage();
const onMessage = async (message, sender) => {
  var _a, _b;
  const req = checkIApiRequest(message);
  if (doLogAll) {
    console.log(el(storeId), sl("onMessage: start"), json(req));
  }
  if (!req) {
    return;
  }
  if (req.reqId === "0") {
    if (doLogAll) {
      console.log(el(storeId), sl("onMessage: command"), req.api, req.payload.deeplink ?? req.payload.map ?? req.payload.networkId ?? req.payload.dappAccountId);
    }
    if (req.api === "closedSidePanel") {
      return setIsSidePanelClosed();
    }
    if (req.api === "closePermissionUI") {
      return closeUI(urlPermissions);
    }
    if (req.api === "openUI") {
      return openUI(req.payload.deeplink);
    }
    if (req.api === "openPermissionUI") {
      return openUI(req.payload.deeplink, urlPermissions);
    }
    if (req.api === "updateConnectedOriginsMap") {
      return storeOriginEnableMap(req.payload.map);
    }
    if (req.api === "updateNetworkId") {
      return storeNetworkId(req.payload.networkId);
    }
    if (req.api === "updateDappAccountId") {
      return storeDappAccountId(req.payload.dappAccountId);
    }
    if (doLogAll) {
      console.error(el(storeId), sl("onMessage: unrecognized command"), req.api);
    }
    return;
  }
  if (req.response) {
    if (req.channel === ApiChannel.sidePanelToBg && (req.api === METHOD.enable || req.api === METHOD.signTx || req.api === METHOD.signData)) {
      if (req.api === METHOD.enable) {
        if (req.response.success && req.response.isEnabled) {
          const map = addConnectedOrigin(req.payload.origin, req.payload.extensions);
          setOriginAccount(req.payload.origin, req.payload.domId, true);
          const tmpReq = {
            reqId: "1",
            api: "updateConnectedOriginsMap",
            payload: {
              origin: req.payload.origin,
              originEnabledMap: map
            }
          };
          if (doLogAll) {
            console.log(el(storeId), sl("onMessage: update originEnabledMap and send to OFFSCREEN"), tmpReq);
          }
          sendToOffscreen(tmpReq);
        }
      }
      const numSidePanelRequests = numSidePanelRequest(req);
      if (doLogAll) {
        console.log(el(storeId), sl("onMessage: numSidePanelRequests"), numSidePanelRequests);
      }
      if (numSidePanelRequests < 1) {
        if (doLogAll) {
          console.log(el(storeId), sl("onMessage: closing SIDEPANEL"), req.api);
        }
        if (!chrome.sidePanel) ;
        else {
          closeSidePanel();
        }
      } else {
        if (doLogAll) {
          console.log(el(storeId), sl("onMessage: more than one request in SIDEPANEL"));
        }
      }
    }
    if (req.channel === ApiChannel.offscreenToBg) {
      responseCache[req.api] = req;
      setTimeout(() => {
        delete responseCache[req.api];
      }, 1e3);
      const requestList = getPendingAPIRequestListByAPI(req.api);
      for (const pendingAPIRequest of requestList) {
        if (pendingAPIRequest.reqId === req.reqId) {
          continue;
        }
        pendingAPIRequest.response = req.response;
        if (doLogAll) {
          console.log(el(storeId), sl("onMessage: BULK RESPONSE"), pendingAPIRequest);
        }
        sendResponse(pendingAPIRequest);
      }
    }
    return sendResponse(req);
  }
  if (req.channel === ApiChannel.offscreenToBg) {
    if (doLogAll) {
      console.error(el(storeId), sl("onMessage: no response from OFFSCREEN"), json(req));
    }
    return sendResponse(req, handleMissingOffscreenResponse);
  }
  if (req.channel === ApiChannel.sidePanelToBg) {
    if (doLogAll) {
      console.error(el(storeId), sl("onMessage: no response from SIDEPANEL"), json(req));
    }
    return sendResponse(req, handleMissingSidePanelResponse);
  }
  const senderTabId = (_a = sender.tab) == null ? void 0 : _a.id;
  if (!senderTabId) {
    if (doLogAll) {
      console.error(el(storeId), sl("onMessage: no senderTabId"), json(req));
    }
    if (doLogAll) {
      console.error(el(storeId), sl("onMessage: no senderTabId"), sender);
    }
    return;
  }
  if (message.channel === ApiChannel.csToBg) {
    const isUserGesture = ((_b = req.payload) == null ? void 0 : _b.isUserGesture) ?? false;
    const isAwake = _isAwake;
    if (!isAwake) {
      await _initChromeStorage;
    }
    const pending = createPendingAPIRequest(req, senderTabId);
    handleApiRequest(req);
    if (doLogAll) {
      console.log(el(storeId), sl("onMessage: handleApiRequest"), json(req));
    }
    if (req.response) {
      return sendResponse(req);
    }
    if (req.api !== METHOD.enable) {
      if (!_isEnabled(req)) {
        req.response = errorNotConnected();
        if (doLogAll) {
          console.error(el(storeId), sl("onMessage: not connected 1:"), req);
        }
        return sendResponse(req);
      }
      if (_didAccountChange(req)) {
        req.response = errorAccountChanged();
        if (doLogAll) {
          console.error(el(storeId), sl("onMessage: account changed"), req);
        }
        return sendResponse(req);
      }
    } else if (!isUserGesture && !req.payload.isIframe) {
      req.response = errorNotConnected();
      if (doLogAll) {
        console.error(el(storeId), sl("onMessage: not connected 2:"), req);
      }
      return sendResponse(req);
    }
    if (req.api === METHOD.enable || req.api === METHOD.signTx || req.api === METHOD.signTxs || req.api === METHOD.signData) {
      if (pending) {
        pending.isSidePanel = true;
      }
      return triggerUserInput(req);
    }
    if (responseCache[req.api]) {
      req.response = responseCache[req.api].response;
      if (doLogAll) {
        console.warn(el(storeId), sl("onMessage: SEND CACHED"), json(req));
      }
      return sendResponse(req);
    } else if (hasPendingAPIRequestByAPI(req)) {
      if (doLogAll) {
        console.warn(el(storeId), sl("onMessage: WAITING"), json(req));
      }
      return;
    }
    if (doLogAll) {
      console.warn(el(storeId), sl("onMessage: TO OFFSCREEN"), json(req));
    }
    return sendToOffscreen(req);
  }
  return false;
};
chrome.runtime.onMessage.addListener(onMessage);
chrome.action.onClicked.addListener(() => openUI());
chrome.runtime.onConnect.addListener((port) => onConnectPanel(port));
const init = async () => {
  await _initChromeStorage;
  await ensureOffscreenPage();
  initContentScriptFromSW();
  logChromiumIssue395536907();
  _isAwake = true;
};
init();
