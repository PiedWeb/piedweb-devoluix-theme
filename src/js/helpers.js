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
