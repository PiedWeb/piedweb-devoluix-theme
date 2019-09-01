/**
 * Feel Free to copy this file in yourt app
 * /!\ You just need to change './helper.js' (line 21) to '~/node_modules/piedweb-devoluix-theme/src/js/helpers.js'
 *
 * Advice: to maximize the speed rendering, you should split this file in two and keep in the first one only the essentiel to render block on top of float lign
 */

/* Import CSS */
require("../scss/main.scss");
import "typeface-poppins";

/* Import JS Lib */
import BootstrapCookieConsent from "bootstrap-cookie-consent";

import baguetteBox from "baguettebox.js";

import Macy from "macy";

var bsn = require("bootstrap.native/dist/bootstrap-native-v4");

import { tns } from "~/node_modules/tiny-slider/src/tiny-slider";

import { watchVideoInBootstrapModal, activePanelInACorner } from "./helpers.js";

import {
  imgLazyLoad,
  backgroundLazyLoad,
  convertInLinks,
  convertInLinksFromRot13,
  clickable,
  resizeWithScreenHeight,
  wideImgCentered,
  smoothScroll,
  rot13ToText,
  readableEmail,
  applySmoothScroll,
  addAClassOnScroll,
  allClickable
} from "~/node_modules/piedweb-tyrol-free-bootstrap-4-theme/src/js/helpers.js";

/* Action */
document.addEventListener("DOMContentLoaded", function() {
  applyOnDomLoaded();
  /**/
  new BootstrapCookieConsent({
    services: ["StatistiquesAnonymes", "YouTube"],
    services_descr: {
      StatistiquesAnonymes:
        "Nous permet d'améliorer le site en fonction de son utilisation",
      YouTube: "Affiche les vidéos du service youtube.com"
    },
    method: "bsn"
  });
  /**/
  if (document.querySelector(".tns") !== null) {
    tns({
      container: ".tns",
      controls: false,
      nav: false,
      autoWidth: true,
      loop: false,
      mouseDrag: true,
      slideBy: "page",
      swipeAngle: false,
      items: 1
    });
  }
  watchVideoInBootstrapModal();
  activePanelInACorner();
  addAClassOnScroll(".navbar", "nostick", 50);
});

function applyOnDomLoaded() {
  allClickable(".clickable");
  imgLazyLoad();
  readableEmail("#contact-email");
  backgroundLazyLoad();
  convertInLinks();
  applySmoothScroll();
  baguetteBox.run(".mimg", {
    captions: function(element) {
      return element.getElementsByTagName("img")[0].alt;
    }
  });
  wideImgCentered(".ic");

  if (document.querySelector("#flex-masonry") !== null) {
    var masonry = new Macy({
      container: '#flex-masonry',
      columns: 3,
      margin: {
        y: 12,
        x: 12
      },
      breakAt: {
        1200: 2,
        768: 1
      },
    });
  }

  document.documentElement.className = "js";
}
