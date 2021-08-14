# NamedParameter

NamedParameter is a small library that simply converts SQL with named parameters to those labeled with `?`.

## Installation

```
npm install --save @coder-ka/named-parameter
```

## Usage

The following example is the simplest one.

```typescript
import { replace } from "@coder-ka/named-parameter";

const { sql, params } = replace("select * from table where col=:value", {
  value: "val1",
});

console.log(sql);
// Output:
// select * from table where col=?
console.log(params);
// Output:
// ['val1']
```

It simply replaces the word `:value` with `?' and create parameter array to bind.

If you want to bind a parameter to multiple placeholders, you can do so.

```typescript
import { replace } from "@coder-ka/named-parameter";

const { sql, params } = replace(
  "select * from table where col1=:value and col2=:value",
  {
    value: "val1",
  }
);

console.log(sql);
// Output:
// select * from table where col1=? and col2=?
console.log(params);
// Output:
// ['val1', 'val1']
```

### Binding arrays

If you specify the value of an array as a parameter, the number of items in the array will be stored in the `?` concatenated with commas will be generated in parentheses.

```typescript
import { replace } from "@coder-ka/named-parameter";

const { sql, params } = replace(
  "select * from table where col in :values",
  {
    values: ["val1", "val2", "val3"],
  }
);

console.log(sql);
// Output:
// select * from table where col in (?,?,?)
console.log(params);
// Output:
// ['val1', 'val2', 'val3']
```

### Options

You can create a custom `replace` function by the `createReplace` method.

The type of Options is below.

```typescript
type Option = {
  // the starting character for named parameter.
  // default: ':'
  start: string;
  // function that create placeholder
  placeholder: (index: number) => string;
}
```

example:

```typescript
import { createReplace } from "@coder-ka/named-parameter";

const replace = createReplace({
  // change starting character
  start: '@',
  // change placeholder string
  placeholder: (index) => `$${index}`
})

const { sql, params } = replace("select * from table where col=@value1 or col=@value2", {
  value1: "val1",
  value2: "val2",
});

console.log(sql);
// Output:
// select * from table where col=$1 or col=$2
console.log(params);
// Output:
// ['val1', 'val2']
```
