module Error exposing (Error, parse)

{-|
Trying to parse and normalize any JavaScript error

@docs Error, parse
-}

import Json.Encode

import Native.Error

{-| Our best effort to normalize the error -}
type alias Error =
  { name: String
  , message: String
  , stack: List String
  , location: Maybe { fileName: String, lineNumber: Int, columnNumber: Int }
  }

{-| Parse the JavaScript error to an Elm record. If it fails, the record will have empty properties -}
parse: Json.Encode.Value -> Error
parse =
  Native.Error.parse
