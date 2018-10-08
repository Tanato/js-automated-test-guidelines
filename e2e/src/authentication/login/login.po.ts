import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  getPageTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  logOut() {
    return element(by.css('a[href="/login"]')).click();
  }

}
