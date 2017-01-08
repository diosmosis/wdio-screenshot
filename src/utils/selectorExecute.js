export default async function selectorExecute(browser, selectors, code, ...args) {
  if (!(selectors instanceof Array)) {
    selectors = [selectors];
  }

  let allElements = [];
  for (let i = 0; i != selectors.length; ++i) {
    const selected = (await element.all(by.css(selectors[i]))).map(function (e) {
      return e.getWebElement();
    });

    allElements = allElements.concat(selected);
  }

  return browser.executeScript(code, allElements, ...args);
}
