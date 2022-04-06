var config = {
  "player": null,
  "button": null,
  "observer": null,
  "tag": "ytd-player",
  "selector": ".ytp-ad-skip-button.ytp-button",
  "find": function () {
    var button = document.querySelector(config.selector);
    if (button) {
      button.click();
    }
  },
  "load": function () {
    config.find();
    /*  */
    config.player = document.getElementsByTagName(config.tag)[0];
    if (!config.player) {
      return window.setTimeout(function () {
        config.load();
      }, 300);
    }
    /*  */
    config.observer = new MutationObserver(config.find);
    config.observer.observe(config.player, {
      "subtree": true,
      "childList": true
    });
  }
};
const clear = (() => {
  const defined = v => v !== null && v !== undefined;
  const timeout = setInterval(() => {
      const ad = [...document.querySelectorAll('.ad-showing')][0];
      if (defined(ad)) {
          const video = document.querySelector('video');
          if (defined(video)) {
              video.currentTime = video.duration;
          }
      }
  }, 500);
  return function() {
      clearTimeout(timeout);
  }
})();
clear();

config.load();
var dot;
setInterval(block,500)
function block(){
  dot = document.querySelector("ytd-rich-item-renderer>div>ytd-display-ad-renderer");
  if(dot){
    document.querySelector("ytd-rich-item-renderer").remove();
  }
}
