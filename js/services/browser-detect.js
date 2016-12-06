const CHROME_REGEX = /Chrome/;

export default {
  isChrome() {
    return window.chrome && CHROME_REGEX.test(window.navigator.appVersion);
  }
};
