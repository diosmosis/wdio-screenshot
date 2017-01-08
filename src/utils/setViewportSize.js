export default async function setViewportSize(browser, { width, height }) {
  const heightDelta = await browser.executeScript(function () {
    return window.outerHeight - window.innerHeight;
  });
  browser.driver.manage().window().setSize(width, height + heightDelta);
};
