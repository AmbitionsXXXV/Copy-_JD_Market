const isIphonex = () => {
  if (typeof window !== 'undefined' && window) {
    // g	全局搜索。
    // i	不区分大小写搜索。
    return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;
  }
  return false;
};

window.isIphoneX = isIphonex();
