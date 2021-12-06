var dot,ads;
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
setInterval(block,300)
function block(){
  dot = document.querySelector("ytd-rich-item-renderer>div>ytd-display-ad-renderer");
  ads = document.querySelector(".ytp-ad-skip-button.ytp-button");
  if(dot){document.querySelector("ytd-rich-item-renderer").remove();}
  if (ads) {ads.click();}

}
