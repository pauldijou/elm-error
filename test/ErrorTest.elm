port module ErrorTest exposing (..)

import Json.Encode as Encode
import Ordeal exposing (..)

import Error exposing (Error)
import Native.Testing

main: Ordeal
main = run emit tests

port emit : Event -> Cmd msg

errorMessage = "My error message"

emptyError = Error.parse <| Native.Testing.emptyError
defaultError = Error.parse <| Native.Testing.error errorMessage
evalError = Error.parse <| Native.Testing.evalError errorMessage
rangeError = Error.parse <| Native.Testing.rangeError errorMessage
referenceError = Error.parse <| Native.Testing.referenceError errorMessage
syntaxError = Error.parse <| Native.Testing.syntaxError errorMessage
typeError = Error.parse <| Native.Testing.typeError errorMessage
customError = Error.parse <| Native.Testing.customError errorMessage

stringError = Error.parse <| Native.Testing.throwAndCatch errorMessage

nullError = Error.parse <| Native.Testing.throwAndCatch Encode.null


testError: String -> Error -> Test
testError name error =
  test name (
    all
      [ error.name |> shouldEqual name
      , error.message |> shouldEqual errorMessage
      , List.length error.stack |> shouldBeGreaterThan 3
      , error.location |> shouldPass (\mLocation ->
        case mLocation of
          Nothing -> False
          Just location ->
            location.lineNumber > 1000 &&
            location.columnNumber > 0 &&
            String.contains "elm_ordeal" location.fileName
      )
      ]
  )


tests: Test
tests =
  describe "Error"
    [ test "empty" (
      all
      [ emptyError.name |> shouldEqual "Error"
      , emptyError.message |> shouldEqual ""
      , List.length emptyError.stack |> shouldBeGreaterThan 3
      ]
    )
    , testError "Error" defaultError
    , testError "EvalError" evalError
    , testError "RangeError" rangeError
    , testError "ReferenceError" referenceError
    , testError "SyntaxError" syntaxError
    , testError "TypeError" typeError
    , test "stringError" (
      all
      [ stringError.name |> shouldEqual ""
      , stringError.message |> shouldEqual errorMessage
      , List.length stringError.stack |> shouldEqual 0
      , stringError.location |> shouldBeNothing
      ]
    )
    , test "nullError" (
      all
      [ nullError.name |> shouldEqual ""
      , nullError.message |> shouldEqual ""
      , List.length nullError.stack |> shouldEqual 0
      , nullError.location |> shouldBeNothing
      ]
    )
    ]
