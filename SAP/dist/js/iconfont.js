"use strict";

(function (window) {
  var svgSprite = "<svg>" + "" + '<symbol id="icon-xuanze" viewBox="0 0 1024 1024">' + "" + '<path d="M887.465882 1024H136.534118c-75.407434 0-136.532583-61.132312-136.532583-136.532583V136.530536c0-75.400271 61.126172-136.530536 136.532583-136.530536h750.931764c75.403341 0 136.532583 61.129242 136.532583 136.530536v750.935858c0 75.400271-61.128219 136.533606-136.532583 136.533606z m68.26578-887.469464c0-37.700647-30.566156-68.266803-68.266803-68.266803H136.534118c-37.702694 0-68.266803 30.566156-68.266803 68.266803v750.935858c0 37.700647 30.563086 68.266803 68.266803 68.266803h750.931764c37.700647 0 68.266803-30.566156 68.266803-68.266803V136.530536h-0.001023zM457.174835 819.195497L170.666496 532.182668 243.889171 474.0292l165.812443 127.959324c67.707055-79.384002 218.377636-237.629095 426.047396-363.058806l17.582447 39.932477C662.646534 451.624934 506.487961 694.780907 457.174835 819.195497z" fill="" ></path>' + "" + "</symbol>" + "" + '<symbol id="icon-arrowleft" viewBox="0 0 1024 1024">' + "" + '<path d="M128 512l507.264 512L896 1024 388.48 512 896 0 635.264 0 128 512z"  ></path>' + "" + "</symbol>" + "" + '<symbol id="icon-jiantou" viewBox="0 0 1024 1024">' + "" + '<path d="M838.144 512 373.341091 0 185.856 0l464.756364 512L185.856 1024l187.485091 0L838.144 512z"  ></path>' + "" + "</symbol>" + "" + "</svg>";var script = function () {
    var scripts = document.getElementsByTagName("script");return scripts[scripts.length - 1];
  }();var shouldInjectCss = script.getAttribute("data-injectcss");var ready = function ready(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0);
      } else {
        var loadFn = function loadFn() {
          document.removeEventListener("DOMContentLoaded", loadFn, false);fn();
        };document.addEventListener("DOMContentLoaded", loadFn, false);
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn);
    }function IEContentLoaded(w, fn) {
      var d = w.document,
          done = false,
          init = function init() {
        if (!done) {
          done = true;fn();
        }
      };var polling = function polling() {
        try {
          d.documentElement.doScroll("left");
        } catch (e) {
          setTimeout(polling, 50);return;
        }init();
      };polling();d.onreadystatechange = function () {
        if (d.readyState == "complete") {
          d.onreadystatechange = null;init();
        }
      };
    }
  };var before = function before(el, target) {
    target.parentNode.insertBefore(el, target);
  };var prepend = function prepend(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild);
    } else {
      target.appendChild(el);
    }
  };function appendSvg() {
    var div, svg;div = document.createElement("div");div.innerHTML = svgSprite;svgSprite = null;svg = div.getElementsByTagName("svg")[0];if (svg) {
      svg.setAttribute("aria-hidden", "true");svg.style.position = "absolute";svg.style.width = 0;svg.style.height = 0;svg.style.overflow = "hidden";prepend(svg, document.body);
    }
  }if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true;try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e);
    }
  }ready(appendSvg);
})(window);