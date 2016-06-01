(function(){

  'use strict';

  window.onYouTubeError = function(err) {
    console.error(err);
  };

  window.onYouTubeReady = function(event) {
    console.log('Ready');
    console.log(event);
  };

  window.onYouTubeStateChange = function(event) {
    console.log('StateChange');
    console.log(event);
  };

  window.onYouTubeIframeAPIReady = function() {
    var selector = 'div[id^="js-youtube-player"]',
        elements = document.querySelectorAll(selector),
        i, len, element, script, params;

    for (i = 0, len = elements.length; i < len; ++i) {
      element = elements[i];

      script = element.querySelector('script[type="application/json"]');
      params = JSON.parse(script.innerHTML);

      params.playerVars || (params.playerVars = {});
      params.playerVars.origin = location.origin;

      params.events = {
        onError: window.onYouTubeError,
        onReady: window.onYouTubeReady,
        onStateChange: window.onYouTubeStateChange
      };

      new YT.Player(element.id, params);
    }
  };

  var youtubeScript, firstScript;

  youtubeScript = document.createElement('script');
  youtubeScript.src = 'https://www.youtube.com/iframe_api';

  firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(youtubeScript, firstScript);

}());
