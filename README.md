# wdio-screenshot-protractor
> Port of wdio-screenshot for Protractor.

## Installation

Install wdio-screenshot via NPM through git URL to this repo.

Note: If you want to improve performance, you can [install GraphicsMagick](#use-graphicsmagick).

## Configuration

Add the following to your protractor config:

```js
// protractor.conf.js

var saveDocumentScreenshot = require('wdio-screenshot/commands/saveDocumentScreenshot');
var saveElementScreenshot = require('wdio-screenshot/commands/saveElementScreenshot');
var saveViewportScreenshot = require('wdio-screenshot/commands/saveViewportScreenshot');

exports.config = {
  // ...
    onPrepare: function() {
    // Add wdio-screenshot methods to the browser object (super hacky, but it works)
    browser.saveDocumentScreenshot = saveDocumentScreenshot;
    browser.saveElementScreenshot = saveElementScreenshot;
    browser.saveViewportScreenshot = saveViewportScreenshot;
  },

  // ...
};
```


## Usage
wdio-screenshot enhances an WebdriverIO instance with the following commands:

* `browser.saveViewportScreenshot([fileName], [{options}]);`
* `browser.saveDocumentScreenshot([fileName], [{options}]);`
* `browser.saveElementScreenshot([fileName], elementSelector, [{options}]);`


All of these provide options that will help you to exclude unrelevant parts (e.g. content). The following options are
available:


* **exclude** `String[]|Object[]` (**not yet implemented**)<br>
  exclude frequently changing parts of your screenshot, you can either pass all kinds of different [WebdriverIO selector strategies](http://webdriver.io/guide/usage/selectors.html)
  that queries one or multiple elements or you can define x and y values which stretch a rectangle or polygon

* **hide** `String[]`<br>
  hides all elements queried by all kinds of different [WebdriverIO selector strategies](http://webdriver.io/guide/usage/selectors.html) (via `opacity: 0`)

* **remove** `String[]`<br>
  removes all elements queried by all kinds of different [WebdriverIO selector strategies](http://webdriver.io/guide/usage/selectors.html) (via `display: none`)

## Use GraphicsMagick
wdio-screenshot uses [GraphicsMagick](http://www.graphicsmagick.org/) for image processing when available. Without GraphicsMagick installed, wdio-screenshot fallbacks to [Jimp](https://github.com/oliver-moran/jimp) - a image processing library written in JS.

If you want to install GraphicsMagick, follow the instructions below.

#### Mac OS X using [Homebrew](http://mxcl.github.io/homebrew/)
```sh
$ brew install graphicsmagick
```

#### Ubuntu using apt-get
```sh
$ sudo apt-get install graphicsmagick
```

#### Windows

Download and install executables for [GraphicsMagick](http://www.graphicsmagick.org/download.html).
Please make sure you install the right binaries desired for your system (32bit vs 64bit).


### License

MIT


[build-badge]: https://travis-ci.org/zinserjan/wdio-screenshot.svg?branch=master
[build]: https://travis-ci.org/zinserjan/wdio-screenshot
[build-windows-badge]: https://ci.appveyor.com/api/projects/status/ef8r3rjiydld171i/branch/master?svg=true
[build-windows]: https://ci.appveyor.com/project/zinserjan/wdio-screenshot
[npm-badge]: https://img.shields.io/npm/v/wdio-screenshot.svg?style=flat-square
[npm]: https://www.npmjs.org/package/wdio-screenshot
