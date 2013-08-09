module.exports = function (callbacks) {
  return function (req) {
    var n = callbacks.length;
    var i;
    var wrapped = new Array(n);
  
    function wrap (current, next) {
      return function () { 
        current(req, next); 
      };
    }

    for (i = n-1; i >= 0; i -= 1) {
      wrapped[i] = wrap(callbacks[i], wrapped[i+1]);
    }

    wrapped[0](req);
  };
};
