import debug from 'debug';

import scroll from '../scripts/scroll';
import scrollbars from '../scripts/scrollbars';
import modifyElements from '../scripts/modifyElements';
import triggerResize from '../scripts/triggerResize';
import selectorExecute from '../utils/selectorExecute';

const log = debug('wdio-screenshot:beforeScreenshot');

export default async function beforeScreenshot(browser, options) {
  // hide scrollbars
  log('hide scrollbars');
  await browser.executeScript(scrollbars, false);

  log('trigger resize event to allow js components to resize properly');
  await browser.executeScript(triggerResize);

  // hide elements
  if (Array.isArray(options.hide) && options.hide.length) {
    log('hide the following elements: %s', options.hide.join(', '));
    await selectorExecute(browser, options.hide, modifyElements, 'opacity', '0');
  }

  // remove elements
  if (Array.isArray(options.remove) && options.remove.length) {
    log('remove the following elements: %s', options.remove.join(', '));
    await selectorExecute(browser, options.remove, modifyElements, 'display', 'none');
  }

  // scroll back to start
  const x  = 0;
  const y = 0;
  log('scroll back to start x: %s, y: %s', x, y);
  await browser.executeScript(scroll, x, y);

  // wait a bit for browser render
  const pause = 200;
  log('wait %s ms for browser render', pause);
  await browser.sleep(pause);
}
