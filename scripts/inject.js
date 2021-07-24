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
  },
  "scriptlets": {
    "build": function () {
      var script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      //
      script.textContent = `
        (function () {
          var pruner = function (o) {
            delete o.playerAds;
            delete o.adPlacements;
            //
            if (o.playerResponse) {
              delete o.playerResponse.playerAds;
              delete o.playerResponse.adPlacements;
            }
            //
            return o;
          }
          //
          JSON.parse = new Proxy(JSON.parse, {
            apply: function () {
              return pruner(Reflect.apply(...arguments));
            }
          });
          //
          Response.prototype.json = new Proxy(Response.prototype.json, {
            apply: function () {
              return Reflect.apply(...arguments).then(o => pruner(o));
            }
          });
        })();
        //
        ${setconstant.replace("{{1}}", "playerResponse.adPlacements").replace("{{2}}", "undefined")};
        ${setconstant.replace("{{1}}", "ytInitialPlayerResponse.adPlacements").replace("{{2}}", "undefined")};
      `;
      //
      document.documentElement.appendChild(script);
      script.remove();
    }
  }
};
config.load();
config.scriptlets.build();