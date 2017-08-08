var _pauldijou$elm_error$Native_Testing = function () {
  function CustomError(message) {
    this.name = 'CustomError'
    this.message = message
    this.stack = (new Error()).stack
  }
  CustomError.prototype = Object.create(Error.prototype)
  CustomError.prototype.constructor = CustomError

  return {
    emptyError: new Error(),
    error: function (msg) { return new Error(msg) },
    evalError: function (msg) { return new EvalError(msg) },
    rangeError: function (msg) { return new RangeError(msg) },
    referenceError: function (msg) { return new ReferenceError(msg) },
    syntaxError: function (msg) { return new SyntaxError(msg) },
    typeError: function (msg) { return new TypeError(msg) },
    customError: function (msg) { return new CustomError(msg) },
    throwAndCatch: function (value) {
      try { throw value }
      catch (e) { return e }
    }
  }
}()
