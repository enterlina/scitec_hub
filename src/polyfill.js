import "babel-polyfill";
Array.prototype.containsArray = function ( array /*, index, last*/ ) {
  
      if( arguments[1] ) {
          var index = arguments[1], last = arguments[2];
      } else {
          var index = 0, last = 0; this.sort(); array.sort();
      };
  
      return index == array.length
          || ( last = this.indexOf( array[index], last ) ) > -1
          && this.containsArray( array, ++index, ++last );
  
  };

if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}
