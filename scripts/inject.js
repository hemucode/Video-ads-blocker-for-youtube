var devoloper,channelurl,sub,likebtn,liketiger,tutorial;
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

config.load();
