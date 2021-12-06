domReady(() => {
  translateHTML()
  initRateButton()
  initBeggingButton()
})

function domReady (callback) {
  if (document.readyState === 'complete') {
    callback()
  } else {
    window.addEventListener('load', callback, false);
  }
}

function translateHTML (dataKey = 'message') {
  for (const $element of document.getElementsByTagName('*')) {
    if ($element.dataset && $element.dataset[dataKey]) {
      $element.innerText = chrome.i18n.getMessage($element.dataset[dataKey])
    }
  }
}



function initRateButton() {
  document.querySelector('.teaser').href = `https://addons.mozilla.org/en-US/firefox/addon/video-ads-blocker-for-youtube/`;
}
function initBeggingButton() {
  document.querySelector('.begging').href = `https://thegayen.github.io/Begging/`;
}