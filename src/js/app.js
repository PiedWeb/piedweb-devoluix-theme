import BootstrapCookieConsent from "bootstrap-cookie-consent";
import { tns } from "./../../node_modules/tiny-slider/src/tiny-slider";
import baguetteBox from "baguettebox.js";
import "bootstrap.native";
//import { register } from 'register-service-worker'

import {
  fullHeight,
  navbarOnScroll,
  wideImgCentered,
  smoothScrollHash,
  clickable,
  responsiveBackgrounds,
  imgLazyLoad,
  readableEmail,
  bsVideo
} from "./helpers.js";

document.addEventListener("DOMContentLoaded", function() {
  "use strict";

  fullHeight(".fullscreen");
  wideImgCentered(".ic");

  baguetteBox.run(".mimg", {
    captions: function(element) {
      return element.getElementsByTagName("img")[0].alt;
    }
  });

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

  bsVideo();

  /**
    new BootstrapCookieConsent({
        services: ['StatistiquesAnonymes', 'YouTube'],
        services_descr: {
            'StatistiquesAnonymes': 'Nous permet d\'améliorer le site en fonction de son utilisation',
            'YouTube': 'Affiche les vidéos du service youtube.com'
        },
        method: 'bsn'
    });
/**/
  document.querySelectorAll(".clickable").forEach(function(item) {
    item.addEventListener("click", function() {
      clickable(item);
    });
  });
  smoothScrollHash();
  imgLazyLoad();
  readableEmail("contact-email");

  responsiveBackgrounds();


  navbarOnScroll();

  //register('/service-worker.js');

  // App Function
  //responsiveBackgrounds();
  //ajaxForm();
  //loadFooter();
});
