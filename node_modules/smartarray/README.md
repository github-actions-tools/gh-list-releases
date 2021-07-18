# smartarray

Array's child class with additional utility methods

## Examples

```js
const { array } = require('smartarray');

const rangeList = `
0
1-2
`

distinct = new array(
             "1",
             "2",
             "3",
             "3",
             "4",
             "5",
             "5"
).distinct();

console.log(distinct);

range = new array(
             "1",
             "2",
             "3",
             "4",
             "5"
).getListRange(rangeList);

console.log(range);

multiple_ranges = new array(
             "1",
             "2",
             "3",
             "4",
             "5"
).getListRange(rangeList);

console.log(multiple_ranges);

range_removed = new array(
             "1",
             "2",
             "3",
             "4",
             "5"
).removeRangeList(rangeList);

console.log(range_removed);

const regex = "/^(?!1|3).*/i";

filtered = new array(
             "1",
             "2",
             "3",
             "4",
             "5"
).regexFilter(regex);

console.log(filtered);
```

## Install
```
    npm install smartarray
```
