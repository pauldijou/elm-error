var _pauldijou$elm_error$Native_Error = function () {
  var Nil = _elm_lang$core$Native_List.Nil
  var Nothing = _elm_lang$core$Maybe$Nothing
  var Just = _elm_lang$core$Maybe$Just

  // Test if a value is a string
  function isString(value) {
    return typeof value === 'string'
  }

  // Test if a value is a valid number
  function isNumber(value) {
    return typeof value === 'number' && !isNaN(value)
  }

  // Try to parse a stack line
  // Most of the time, they look like: 'at <a path>:10:42'
  // so we can try to parse the needed infos to create a location
  function parseStackLine(line) {
    var parts = line.split(':')

    if (parts.length < 3) { return undefined }

    var columnNumber = parseInt(parts[parts.length - 1], 10)
    var lineNumber = parseInt(parts[parts.length - 2], 10)

    if (isNaN(columnNumber) || isNaN(lineNumber)) {
      return undefined
    }

    var fileName = parts[parts.length - 3]

    if (isString(fileName)) {
      fileName = fileName.split(' ').pop()
      if (fileName[0] === '(') {
        fileName = fileName.substr(1)
      }
    }

    return {
      fileName: fileName,
      lineNumber: lineNumber,
      columnNumber: columnNumber
    }
  }

  // Parse error all the way we can think of
  // and fallback to an empty error if we fail
  function parse(error) {
    var parsed = { name: '', message: error, stack: Nil, location: Nothing }

    if (isString(error)) {
      parsed.message = error
      return parsed
    }

    if (typeof error !== 'object') {
      return parsed
    }

    if (isString(error.name)) { parsed.name = error.name }
    if (isString(error.message)) { parsed.message = error.message }

    // Normalize stack as an array of string
    var stack = error.stack

    if (isString(stack)) {
      stack = stack.split('\n').map(function (str) { return str.trim() })
    } else if(Array.isArray(stack)) {
      stack = stack.filter(isString)
    } else {
      stack = []
    }

    // Normalize location if possible
    var location = undefined

    if (isString(error.fileName) && isNumber(error.lineNumber) && isNumber(error.columnNumber)) {
      // Thanks Mozilla for providing them out of the box!
      location = {
        fileName: error.fileName,
        lineNumber: error.lineNumber,
        columnNumber: error.columnNumber
      }
    } else {
      // Most of the time, the first line of the stack is the error message
      // so we will directly try to parse the 2nd line first
      if (stack.length > 1) {
        location = parseStackLine(stack[1])
      }
      // If we fail, we can still try to parse the 1st line
      if (location === undefined && stack.length > 0) {
        location = parseStackLine(stack[0])
      }
    }

    if (location !== undefined) {
      parsed.location = Just(location)
    }

    parsed.stack = _elm_lang$core$Native_List.fromArray(stack)

    return parsed
  }

  return {
    parse: parse
  }
}()
