var bsn = require("bootstrap.native/dist/bootstrap-native-v4");

/**
 * idea borrowed from https://codepen.io/JacobLett/pen/xqpEYE
 *
 * @param {string} id           Modal id (modal must be prepare in the dom with an empty <iframe id=video...
 * @param {string} selector     of all link to a video. Must be <span data-src="video-url" class="play-btn">...
 * @param {string} iframe_id    iframe prepared in the modal eg: <iframe id=video...
 */
export function watchVideoInBootstrapModal(
  id = "video-modal",
  selector = ".play-btn",
  iframe_id = "video"
) {
  var $videoSrc;
  var modal = document.getElementById(id);

  if (modal === null) return false;

  document.querySelectorAll(selector).forEach(function(item) {
    item.addEventListener("click", function() {
      $videoSrc = item.dataset.src;
      var iModal = new bsn.Modal(modal);
      iModal.show();
    });
  });

  if (modal !== null) {
    modal.addEventListener("shown.bs.modal", function(e) {
      document
        .getElementById(iframe_id)
        .setAttribute(
          "src",
          $videoSrc +
            "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1"
        );
    });
    modal.addEventListener("hide.bs.modal", function(e) {
      document.getElementById(iframe_id).setAttribute("src", "");
    });
  }
}

/**
 * Idea from flowtype.js
 * http://jsfiddle.net/xcLJ4/70/
 *
 * @example
 * flowtype( document.getElementById('demo-article'), {fontRatio:16} );
 */
export function flowtype(element, options) {
  // Establish default settings/variables
  // ====================================
  options.maximum = options.maximum || 9999;
  options.minimum = options.minimum || 1;
  options.maxFont = options.maxFont || 9999;
  options.minFont = options.minFont || 16;
  options.fontRatio = options.fontRatio || 35;
  options.lineRatio = options.lineRatio || 1.45;

  // Do the magic math
  // =================
  changes = function(el) {
    var elw = el.clientWidth,
      width =
        elw > options.maximum
          ? options.maximum
          : elw < options.minimum
          ? options.minimum
          : elw,
      fontBase = width / options.fontRatio,
      fontSize =
        fontBase > options.maxFont
          ? options.maxFont
          : fontBase < options.minFont
          ? options.minFont
          : fontBase;

    el.style.fontSize = fontSize + "px";
    el.style.lineHeight = fontSize * options.lineRatio + "px";
    console.log("well-done");
  };
  changes(element);
}

/**
 * Change theme color
 */
export function changeThemeColor(color) {
    var metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor === null) return;
    metaThemeColor.setAttribute("content", color);
}

/**
 * Add panelInaCorner accessible via a button
 *
 * @param {string} selector     for the button
 */
export function activePanelInACorner(selector = '.contact-icon') {
    document.querySelector(selector).addEventListener('click', (event) => {
        var icon = document.querySelector(selector);
        icon.classList.toggle('open');
        document.getElementById(icon.getAttribute('data-id')).classList.toggle('open');
    });
}
