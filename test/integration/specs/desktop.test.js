import path from 'path';
import {assert} from 'chai';

import generateUUID from '../../../src/utils/generateUUID';
import setViewportSize from '../../../src/utils/setViewportSize';
import compareImages from '../../helper/compareImages';

try {
  const browser = require('protractor').browser;

  browser.ignoreSynchronization = true;
} catch (e) {
  // ignore
}

const tmpDir = path.join(process.cwd(), '.tmp');

const fixtureDir = path.join(process.cwd(), 'test/fixture');
const screenshotDir = path.join(fixtureDir, '/web/screenshots');

describe('integration tests for desktop browsers', function () {

  let browserName;

  let screenStaticDocument480;
  let screenStaticDocument1600;
  let screenStaticElemenentFooter;
  let screenStaticViewport480;
  let screenStaticViewport1600;
  let screenResponsiveDocument480;
  let screenResponsiveDocument1600;
  let screenResponsiveElemenentFooter480;
  let screenResponsiveElemenentFooter1600;
  let screenResponsiveViewport480;
  let screenResponsiveViewport1600;
  let screenResponsiveMinWidthDocument480;
  let screenResponsiveMinWidthDocument1600;
  let screenResponsiveMinWidthElemenentFooter;
  let screenResponsiveMinWidthViewport480;
  let screenResponsiveMinWidthViewport1600;
  let screenDynamicSizeDocument480;
  let screenDynamicSizeViewport480;
  let screenDynamicSizeElement480;
  let screenOverlayDocument480;
  let screenOverlayViewport480;
  let screenOverlayElement480;
  let screenFullpageModalDocument480;
  let screenFullpageModalViewport480;
  let screenElementModifierHideDocument480;
  let screenElementModifierHideViewport480;
  let screenElementModifierHideElement480;
  let screenElementModifierRemoveDocument480;
  let screenElementModifierRemoveViewport480;
  let screenElementModifierRemoveElement480;

  beforeEach(async function () {
    const capabilities = await Promise.resolve(browser.capabilities || browser.getCapabilities());
    browserName = capabilities.browserName;

    screenStaticDocument480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-static-document-480.png'));
    screenStaticDocument1600 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-static-document-1600.png'));
    screenStaticElemenentFooter = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-static-element-footer.png'));
    screenStaticViewport480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-static-viewport-480.png'));
    screenStaticViewport1600 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-static-viewport-1600.png'));

    screenResponsiveDocument480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-responsive-document-480.png'));
    screenResponsiveDocument1600 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-responsive-document-1600.png'));
    screenResponsiveElemenentFooter480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-responsive-element-footer-480.png'));
    screenResponsiveElemenentFooter1600 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-responsive-element-footer-1600.png'));
    screenResponsiveViewport480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-responsive-viewport-480.png'));
    screenResponsiveViewport1600 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-responsive-viewport-1600.png'));

    screenResponsiveMinWidthDocument480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-responsive-min-width-document-480.png'));
    screenResponsiveMinWidthDocument1600 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-responsive-min-width-document-1600.png'));
    screenResponsiveMinWidthElemenentFooter = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-responsive-min-width-element-footer.png'));
    screenResponsiveMinWidthViewport480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-responsive-min-width-viewport-480.png'));
    screenResponsiveMinWidthViewport1600 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-responsive-min-width-viewport-1600.png'));

    screenDynamicSizeDocument480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-dynamic-size-document-480.png'));
    screenDynamicSizeViewport480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-dynamic-size-viewport-480.png'));
    screenDynamicSizeElement480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-dynamic-size-element-480.png'));

    screenOverlayDocument480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-overlay-document-480.png'));
    screenOverlayViewport480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-overlay-viewport-480.png'));
    screenOverlayElement480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-overlay-element-480.png'));

    screenFullpageModalDocument480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-fullpage-modal-document-480.png'));
    screenFullpageModalViewport480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-fullpage-modal-viewport-480.png'));

    screenElementModifierHideDocument480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-element-modifier-hide-document-480.png'));
    screenElementModifierHideViewport480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-element-modifier-hide-viewport-480.png'));
    screenElementModifierHideElement480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-element-modifier-hide-element-480.png'));

    screenElementModifierRemoveDocument480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-element-modifier-remove-document-480.png'));
    screenElementModifierRemoveViewport480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-element-modifier-remove-viewport-480.png'));
    screenElementModifierRemoveElement480 = getBrowserSpecificFile(path.join(screenshotDir, 'desktop-element-modifier-remove-element-480.png'));
  });

  after(async function () {
    browser.close();
  });

  context('static sites - static.html', function () {
    beforeEach(async function () {
      await browser.get('/static.html');
      await browser.sleep(3000);
    });

    context('saveDocumentScreenshot', function () {
      it('with window size 480px', async function () {
        const screenPath = path.join(tmpDir, '/desktop-static-document-480', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 480, height: 500});
        await browser.sleep(500);
        await browser.saveDocumentScreenshot(screenPath);

        await compareImages(screenPath, screenStaticDocument480);
      });

      it('with window size 1600', async function () {
        const screenPath = path.join(tmpDir, '/desktop-static-document-1600', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 1600, height: 500});
        await browser.sleep(500);
        await browser.saveDocumentScreenshot(screenPath);

        await compareImages(screenPath, screenStaticDocument1600);
      });
    });

    context('saveElementScreenshot', function () {

      it('with window size 480px', async function () {
        const screenPath = path.join(tmpDir, '/desktop-static-element-footer', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 480, height: 500});
        await browser.sleep(500);
        await browser.saveElementScreenshot(screenPath, '.footer');

        await compareImages(screenPath, screenStaticElemenentFooter);
      });

      it('with window size 1600px', async function () {
        const screenPath = path.join(tmpDir, '/desktop-static-element-footer', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 1600, height: 500});
        await browser.sleep(500);
        await browser.saveElementScreenshot(screenPath, '.footer');

        await compareImages(screenPath, screenStaticElemenentFooter);
      });
    });

    context('saveViewportScreenshot', function () {

      it('with window size 480px', async function () {
        const screenPath = path.join(tmpDir, '/desktop-static-viewport-480', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 480, height: 500});
        await browser.sleep(500);
        await browser.saveViewportScreenshot(screenPath);

        await compareImages(screenPath, screenStaticViewport480);
      });

      it('with window size 1600', async function () {
        const screenPath = path.join(tmpDir, '/desktop-static-viewport-1600', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 1600, height: 500});
        await browser.sleep(500);
        await browser.saveViewportScreenshot(screenPath);

        await compareImages(screenPath, screenStaticViewport1600);
      });
    });
  });

  context('responsive sites - responsive.html', function () {
    beforeEach(async function () {
      await browser.get('/responsive.html');
      await browser.sleep(3000);
    });

    context('saveDocumentScreenshot', function () {
      it('with window size 480px', async function () {
        const screenPath = path.join(tmpDir, '/desktop-responsive-document-480', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 480, height: 500});
        await browser.sleep(500);

        await browser.saveDocumentScreenshot(screenPath);

        await compareImages(screenPath, screenResponsiveDocument480);
      });

      it('with window size 1600', async function () {
        const screenPath = path.join(tmpDir, '/desktop-responsive-document-1600', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 1600, height: 500});
        await browser.sleep(500);
        await browser.saveDocumentScreenshot(screenPath);

        await compareImages(screenPath, screenResponsiveDocument1600);
      });
    });

    context('saveElementScreenshot', function () {

      it('with window size 480px', async function () {
        const screenPath = path.join(tmpDir, '/desktop-responsive-element-footer-480', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 480, height: 500});
        await browser.sleep(500);
        await browser.saveElementScreenshot(screenPath, '.footer');

        await compareImages(screenPath, screenResponsiveElemenentFooter480);
      });

      it('with window size 1600px', async function () {
        const screenPath = path.join(tmpDir, '/desktop-responsive-element-footer-1600', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 1600, height: 500});
        await browser.sleep(500);
        await browser.saveElementScreenshot(screenPath, '.footer');

        await compareImages(screenPath, screenResponsiveElemenentFooter1600);
      });
    });

    context('saveViewportScreenshot', function () {

      it('with window size 480px', async function () {
        const screenPath = path.join(tmpDir, '/desktop-responsive-viewport-480', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 480, height: 500});
        await browser.sleep(500);
        await browser.saveViewportScreenshot(screenPath);

        await compareImages(screenPath, screenResponsiveViewport480);
      });

      it('with window size 1600', async function () {
        const screenPath = path.join(tmpDir, '/desktop-responsive-viewport-1600', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 1600, height: 500});
        await browser.sleep(500);
        await browser.saveViewportScreenshot(screenPath);

        await compareImages(screenPath, screenResponsiveViewport1600);
      });
    });
  });

  context('responsive sites with min-width - responsive-min-width.html', function () {
    beforeEach(async function () {
      await browser.get('/responsive-min-width.html');
      await browser.sleep(3000);
    });

    context('saveDocumentScreenshot', function () {
      it('with window size 480px', async function () {
        const screenPath = path.join(tmpDir, '/desktop-responsive-min-width-document-480', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 480, height: 500});
        await browser.sleep(500);

        await browser.saveDocumentScreenshot(screenPath);

        await compareImages(screenPath, screenResponsiveMinWidthDocument480);
      });

      it('with window size 1600', async function () {
        const screenPath = path.join(tmpDir, '/desktop-responsive-min-width-document-1600', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 1600, height: 500});
        await browser.sleep(500);
        await browser.saveDocumentScreenshot(screenPath);

        await compareImages(screenPath, screenResponsiveMinWidthDocument1600);
      });
    });

    context('saveElementScreenshot', function () {

      it('with window size 480px', async function () {
        const screenPath = path.join(tmpDir, '/desktop-responsive-min-width-element-footer-480', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 480, height: 500});
        await browser.sleep(500);
        await browser.saveElementScreenshot(screenPath, '.footer');

        await compareImages(screenPath, screenResponsiveMinWidthElemenentFooter);
      });

      it('with window size 1600px', async function () {
        const screenPath = path.join(tmpDir, '/desktop-responsive-min-width-element-footer-1600', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 1600, height: 500});
        await browser.sleep(500);
        await browser.saveElementScreenshot(screenPath, '.footer');

        await compareImages(screenPath, screenResponsiveMinWidthElemenentFooter);
      });
    });

    context('saveViewportScreenshot', function () {

      it('with window size 480px', async function () {
        const screenPath = path.join(tmpDir, '/desktop-responsive-min-width-viewport-480', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 480, height: 500});
        await browser.sleep(500);
        await browser.saveViewportScreenshot(screenPath);

        await compareImages(screenPath, screenResponsiveMinWidthViewport480);
      });

      it('with window size 1600', async function () {
        const screenPath = path.join(tmpDir, '/desktop-responsive-min-width-viewport-1600', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 1600, height: 500});
        await browser.sleep(500);
        await browser.saveViewportScreenshot(screenPath);

        await compareImages(screenPath, screenResponsiveMinWidthViewport1600);
      });
    });
  });

  context('dynamic size issues - size-dynamic.html', function () {
    beforeEach(async function () {
      await browser.get('/size-dynamic.html');
      await browser.sleep(3000);
    });

    context('saveDocumentScreenshot', function () {

      it('resizes elements properly', async function () {
        const screenPath = path.join(tmpDir, '/desktop-dynamic-size-document-480', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 480, height: 500});
        await browser.sleep(500);
        await browser.saveDocumentScreenshot(screenPath);

        await compareImages(screenPath, screenDynamicSizeDocument480);
      });
    });

    context('saveViewportScreenshot', function () {

      it('resizes elements properly', async function () {
        const screenPath = path.join(tmpDir, '/desktop-dynamic-size-viewport-480', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 480, height: 500});
        await browser.sleep(500);
        await browser.saveViewportScreenshot(screenPath);

        await compareImages(screenPath, screenDynamicSizeViewport480);
      });
    });
    context('saveElementScreenshot', function () {

      it('resizes elements properly', async function () {
        const screenPath = path.join(tmpDir, '/desktop-dynamic-size-element-480', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 480, height: 500});
        await browser.sleep(500);
        await browser.saveElementScreenshot(screenPath, '#dynamic-box');

        await compareImages(screenPath, screenDynamicSizeElement480);
      });
    });
  });

  context('overlay - overlay.html', function () {
    beforeEach(async function () {
      await browser.get('/overlay.html');
      await browser.sleep(3000);
    });

    context('saveDocumentScreenshot', function () {
      it('with window size 480px', async function () {
        const screenPath = path.join(tmpDir, '/desktop-overlay-document-480', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 480, height: 500});
        await browser.sleep(500);
        await browser.saveDocumentScreenshot(screenPath);

        await compareImages(screenPath, screenOverlayDocument480);
      });
    });

    context('saveViewportScreenshot', function () {
      it('with window size 480px', async function () {
        const screenPath = path.join(tmpDir, '/desktop-overlay-viewport-480', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 480, height: 500});
        await browser.sleep(500);
        await browser.saveViewportScreenshot(screenPath);

        await compareImages(screenPath, screenOverlayViewport480);
      });
    });

    context('saveElementScreenshot', function () {
      it('with window size 480px', async function () {
        const screenPath = path.join(tmpDir, '/desktop-overlay-element-480', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 480, height: 500});
        await browser.sleep(500);
        await browser.saveElementScreenshot(screenPath, '#overlay-content');

        await compareImages(screenPath, screenOverlayElement480);
      });
    });
  });

  context('fullpage modal - fullpage-modal.html', function () {
    beforeEach(async function () {
      await browser.get('/fullpage-modal.html');
      await browser.sleep(3000);
    });

    context('saveDocumentScreenshot', function () {
      it('with window size 480px', async function () {
        const screenPath = path.join(tmpDir, '/desktop-fullpage-modal-document-480', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 480, height: 500});
        await browser.sleep(500);
        await browser.saveDocumentScreenshot(screenPath);

        await compareImages(screenPath, screenFullpageModalDocument480);
      });
    });

    context('saveViewportScreenshot', function () {
      it('with window size 480px', async function () {
        const screenPath = path.join(tmpDir, '/desktop-fullpage-modal-viewport-480', `${generateUUID()}.png`);

        await setViewportSize(browser, {width: 480, height: 500});
        await browser.sleep(500);
        await browser.saveViewportScreenshot(screenPath);

        await compareImages(screenPath, screenFullpageModalViewport480);
      });
    });
  });

  context('element modifier - element-modifier.html', function () {
    beforeEach(async function () {
      await browser.get('/element-modifier.html');
      await browser.sleep(3000);
      await setViewportSize(browser, {width: 480, height: 500});
      await browser.sleep(500);
    });

    context('hide', function() {
      const options = {
        hide: ['.group', '.orange']
      };

      it('saveDocumentScreenshot', async function () {
        const screenPath = path.join(tmpDir, '/desktop-element-modifier-hide-document-480', `${generateUUID()}.png`);
        await browser.saveDocumentScreenshot(screenPath, options);
        await compareImages(screenPath, screenElementModifierHideDocument480);
      });

      it('saveViewportScreenshot', async function () {
        const screenPath = path.join(tmpDir, '/desktop-element-modifier-hide-viewport-480', `${generateUUID()}.png`);
        await browser.saveViewportScreenshot(screenPath, options);
        await compareImages(screenPath, screenElementModifierHideViewport480);
      });

      it('saveElementScreenshot', async function () {
        const screenPath = path.join(tmpDir, '/desktop-element-modifier-hide-element-480', `${generateUUID()}.png`);
        await browser.saveElementScreenshot(screenPath, '.wrapper', options);
        await compareImages(screenPath, screenElementModifierHideElement480);
      });
    });

    context('remove', function() {
      const options = {
        remove: ['.group', '.orange']
      };

      it('saveDocumentScreenshot', async function () {
        const screenPath = path.join(tmpDir, '/desktop-element-modifier-remove-document-480', `${generateUUID()}.png`);
        await browser.saveDocumentScreenshot(screenPath, options);
        await compareImages(screenPath, screenElementModifierRemoveDocument480);
      });

      it('saveViewportScreenshot', async function () {
        const screenPath = path.join(tmpDir, '/desktop-element-modifier-remove-viewport-480', `${generateUUID()}.png`);
        await browser.saveViewportScreenshot(screenPath, options);
        await compareImages(screenPath, screenElementModifierRemoveViewport480);
      });

      it('saveElementScreenshot', async function () {
        const screenPath = path.join(tmpDir, '/desktop-element-modifier-remove-element-480', `${generateUUID()}.png`);
        await browser.saveElementScreenshot(screenPath, '.wrapper', options);
        await compareImages(screenPath, screenElementModifierRemoveElement480);
      });
    });

  });

  function isIE() {
    return browserName === 'internet explorer';
  }

  function getBrowserSpecificFile(screenshotPath) {
    const dir = path.dirname(screenshotPath);
    const ext = path.extname(screenshotPath);
    const file = path.basename(screenshotPath, ext);

    if (isIE()) {
      return path.join(dir, `${file}_ie${ext}`);
    }
    return screenshotPath;
  }

  // context.only('take screenshots', function () {
  //   context('responsive sites - responsive.html', function () {
  //     beforeEach(async function () {
  //       await browser.get('/responsive-min-width.html');
  //       await browser.sleep(3000);
  //     });
  //
  //     context('saveDocumentScreenshot', function () {
  //       it('with window size 480px', async function () {
  //         await setViewportSize(browser, {width: 480, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveDocumentScreenshot(screenResponsiveMinWidthDocument480);
  //       });
  //
  //       it('with window size 1600', async function () {
  //         await setViewportSize(browser, {width: 1600, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveDocumentScreenshot(screenResponsiveMinWidthDocument1600);
  //       });
  //     });
  //
  //     context('saveElementScreenshot', function () {
  //       it('with window size 480px', async function () {
  //         await setViewportSize(browser, {width: 480, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveElementScreenshot(screenResponsiveMinWidthElemenentFooter, '.footer');
  //       });
  //
  //     });
  //
  //     context('saveViewportScreenshot', function () {
  //       it('with window size 480px', async function () {
  //         await setViewportSize(browser, {width: 480, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveViewportScreenshot(screenResponsiveMinWidthViewport480);
  //       });
  //
  //       it('with window size 1600', async function () {
  //         await setViewportSize(browser, {width: 1600, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveViewportScreenshot(screenResponsiveMinWidthViewport1600);
  //       });
  //     });
  //   });
  //
  //   context('responsive sites - responsive.html', function () {
  //     beforeEach(async function () {
  //       await browser.get('/responsive.html');
  //       await browser.sleep(3000);
  //     });
  //
  //     context('saveDocumentScreenshot', function () {
  //       it('with window size 480px', async function () {
  //         await setViewportSize(browser, {width: 480, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveDocumentScreenshot(screenResponsiveDocument480);
  //       });
  //
  //       it('with window size 1600', async function () {
  //         await setViewportSize(browser, {width: 1600, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveDocumentScreenshot(screenResponsiveDocument1600);
  //       });
  //     });
  //
  //     context('saveElementScreenshot', function () {
  //       it('with window size 480px', async function () {
  //         await setViewportSize(browser, {width: 480, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveElementScreenshot(screenResponsiveElemenentFooter480, '.footer');
  //       });
  //
  //       it('with window size 1600', async function () {
  //         await browser.windowHandleSize({width: 1600, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveElementScreenshot(screenResponsiveElemenentFooter1600, '.footer');
  //       });
  //     });
  //
  //     context('saveViewportScreenshot', function () {
  //       it('with window size 480px', async function () {
  //         await setViewportSize(browser, {width: 480, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveViewportScreenshot(screenResponsiveViewport480);
  //       });
  //
  //       it('with window size 1600', async function () {
  //         await setViewportSize(browser, {width: 1600, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveViewportScreenshot(screenResponsiveViewport1600);
  //       });
  //     });
  //   });
  //
  //   context('static sites - static.html', function () {
  //     context('saveDocumentScreenshot', function () {
  //       it('with window size 480px', async function () {
  //         await setViewportSize(browser, {width: 480, height: 500});
  //         await browser.sleep(500);
  //         await browser.get('/static.html');
  //         await browser.sleep(3000);
  //         await browser.saveDocumentScreenshot(screenStaticDocument480);
  //       });
  //
  //       it('with window size 1600', async function () {
  //         await setViewportSize(browser, {width: 1600, height: 500});
  //         await browser.sleep(500);
  //         await browser.get('/static.html');
  //         await browser.sleep(1000);
  //         await browser.saveDocumentScreenshot(screenStaticDocument1600);
  //       });
  //     });
  //
  //     context('saveElementScreenshot', function () {
  //       it('with window size 480px', async function () {
  //         await setViewportSize(browser, {width: 480, height: 500});
  //         await browser.sleep(500);
  //         await browser.get('/static.html');
  //         await browser.sleep(3000);
  //         await browser.saveElementScreenshot(screenStaticElemenentFooter, '.footer');
  //       });
  //
  //     });
  //
  //     context('saveViewportScreenshot', function () {
  //       it('with window size 480px', async function () {
  //         await setViewportSize(browser, {width: 480, height: 500});
  //         await browser.sleep(500);
  //         await browser.get('/static.html');
  //         await browser.sleep(3000);
  //         await browser.saveViewportScreenshot(screenStaticViewport480);
  //       });
  //
  //       it('with window size 1600', async function () {
  //         await setViewportSize(browser, {width: 1600, height: 500});
  //         await browser.sleep(500);
  //         await browser.get('/static.html');
  //         await browser.sleep(1000);
  //         await browser.saveViewportScreenshot(screenStaticViewport1600);
  //       });
  //     });
  //   });
  //
  //   context('dynamic size issues - size-dynamic.html', function () {
  //     beforeEach(async function () {
  //       await browser.get('/size-dynamic.html');
  //       await browser.sleep(3000);
  //
  //     });
  //
  //     context('saveDocumentScreenshot', function () {
  //       it('with window size 480px', async function () {
  //         await setViewportSize(browser, {width: 480, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveDocumentScreenshot(screenDynamicSizeDocument480);
  //       });
  //     });
  //
  //     context('saveViewportScreenshot', function () {
  //
  //       it('with window size 480px', async function () {
  //         await setViewportSize(browser, {width: 480, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveViewportScreenshot(screenDynamicSizeViewport480);
  //       });
  //     });
  //     context('saveElementScreenshot', function () {
  //
  //       it('with window size 480px', async function () {
  //         await setViewportSize(browser, {width: 480, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveElementScreenshot(screenDynamicSizeElement480, '#dynamic-box');
  //       });
  //     });
  //   });
  //
  //   context('overlay - overlay.html', function () {
  //     beforeEach(async function () {
  //       await browser.get('/overlay.html');
  //       await browser.sleep(3000);
  //
  //     });
  //
  //     context('saveDocumentScreenshot', function () {
  //       it('with window size 480px', async function () {
  //         await setViewportSize(browser, {width: 480, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveDocumentScreenshot(screenOverlayDocument480);
  //       });
  //     });
  //
  //     context('saveViewportScreenshot', function () {
  //
  //       it('with window size 480px', async function () {
  //         await setViewportSize(browser, {width: 480, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveViewportScreenshot(screenOverlayViewport480);
  //       });
  //     });
  //     context('saveElementScreenshot', function () {
  //
  //       it('with window size 480px', async function () {
  //         await setViewportSize(browser, {width: 480, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveElementScreenshot(screenOverlayElement480, '#overlay-content');
  //       });
  //     });
  //   });
  //
  //   context('fullpage modal - fullpage-modal.html', function () {
  //     beforeEach(async function () {
  //       await browser.get('/fullpage-modal.html');
  //       await browser.sleep(3000);
  //
  //     });
  //
  //     context('saveDocumentScreenshot', function () {
  //       it('with window size 480px', async function () {
  //         await setViewportSize(browser, {width: 480, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveDocumentScreenshot(screenFullpageModalDocument480);
  //       });
  //     });
  //
  //     context('saveViewportScreenshot', function () {
  //
  //       it('with window size 480px', async function () {
  //         await setViewportSize(browser, {width: 480, height: 500});
  //         await browser.sleep(500);
  //         await browser.saveViewportScreenshot(screenFullpageModalViewport480);
  //       });
  //     });
  //   });
  //
  //   context('element modifier - element-modifier.html', function () {
  //     beforeEach(async function () {
  //       await browser.get('/element-modifier.html');
  //       await browser.sleep(3000);
  //       await setViewportSize(browser, {width: 480, height: 500});
  //       await browser.sleep(500);
  //     });
  //
  //     context('hide', function() {
  //       const options = {
  //         hide: ['.group', '.orange']
  //       };
  //
  //       it('saveDocumentScreenshot', async function () {
  //         await browser.saveDocumentScreenshot(screenElementModifierHideDocument480, options);
  //       });
  //
  //       it('saveViewportScreenshot', async function () {
  //         await browser.saveViewportScreenshot(screenElementModifierHideViewport480, options);
  //       });
  //
  //       it('saveElementScreenshot', async function () {
  //         await browser.saveElementScreenshot(screenElementModifierHideElement480, '.wrapper', options);
  //       });
  //     });
  //
  //     context('remove', function() {
  //       const options = {
  //         remove: ['.group', '.orange']
  //       };
  //
  //       it('saveDocumentScreenshot', async function () {
  //         await browser.saveDocumentScreenshot(screenElementModifierRemoveDocument480, options);
  //       });
  //
  //       it('saveViewportScreenshot', async function () {
  //         await browser.saveViewportScreenshot(screenElementModifierRemoveViewport480, options);
  //       });
  //
  //       it('saveElementScreenshot', async function () {
  //         await browser.saveElementScreenshot(screenElementModifierRemoveElement480, '.wrapper', options);
  //       });
  //     });
  //   });
  // });
});
