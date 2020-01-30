# jQuery to Javascript

This repo is the [jquery-to-javascript-convert](https://github.com/tayfunerbilen/jquery-to-javascript-convert) repository adapted to javascript.

 ## Installation

 ```sh
 npm install jquery-to-javascript
 ```

 or

 ```sh
 yarn add jquery-to-javascript
 ```

## Usage

```js
import toJS from 'jquery-to-javascript';

const script = `$(".detail").html("<b>any text</b>");`;

toJS.convert(script);
// document.getElementByClassName("detail").innerHTML = "<b>any text</b>";
```

