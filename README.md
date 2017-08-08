# elm-error

Trying our best to parse a JavaScript error into a simple Elm type.

```elm
-- The simple type
type alias Error =
  { name: String
  , message: String
  , stack: List String
  , location: Maybe { fileName: String, lineNumber: Int, columnNumber: Int }
  }

-- The simple parser
parse: Json.Encode.Value -> Error
```

As you can see, it will always return an `Error`. If we totally fail to parse, all properties will be empty (empty string, empty list, Nothing).

## Test

Just run `yarn install && yarn deps && yarn test`.

## License

This software is licensed under the Apache 2 license, quoted below.

Copyright Paul Dijou ([http://pauldijou.fr](http://pauldijou.fr)).

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
