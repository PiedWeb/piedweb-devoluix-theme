var bsn = require("bootstrap.native/dist/bootstrap-native-v4");

/*
 * Simple Image Lazy Loader
 * from : https://davidwalsh.name/lazyload-image-fade
 */
export function imgLazyLoad() {
  [].forEach.call(document.querySelectorAll("[data-img]"), function(img) {
    let newDomImg = document.createElement("img");
    let src = img.getAttribute("data-img");
    img.removeAttribute("data-img");
    for (var i = 0, n = img.attributes.length; i < n; i++) {
      newDomImg.setAttribute(
        img.attributes[i].nodeName,
        img.attributes[i].nodeValue
      );
    }
    if (newDomImg.getAttribute("alt") === null && img.textContent != "") {
      newDomImg.setAttribute("alt", img.textContent);
    }
    newDomImg.setAttribute("src", src);
    img.outerHTML = newDomImg.outerHTML;
  });
}

export function navbarOnScroll() {
  if (document.querySelector(".navbar") !== null) {
    window.onscroll = function() {
      if (pageYOffset > 50) {
        if (document.querySelector(".nostick") === null) {
          document.querySelector(".navbar").className += " nostick";
        }
      } else {
        document.querySelector(".navbar").classList.remove("nostick");
      }
    };
  }
}

export function jsLinks() {
    var test = []
    if (typeof test.push === "function") { // to avoid gooogle bot execute
        [].forEach.call(document.querySelectorAll("[data-href]"), function(element) {
            let link = document.createElement("a");
            let href = element.getAttribute("data-href");
            element.removeAttribute("data-href");
            for (var i = 0, n = element.attributes.length; i < n; i++) {
              link.setAttribute(
                element.attributes[i].nodeName,
                element.attributes[i].nodeValue
              );
            }
            link.textContent = element.textContent;
            link.setAttribute("href", href);
            element.outerHTML = link.outerHTML;
          });
    }
}

/*
 * Make a div clickable via a <a> contained
 */
export function clickable(current) {
  if (!current.querySelector("a")) return false;

  var link = current.querySelectorAll("a")[0];

  if (
    window.location.pathname.replace(/^\//, "") ==
      link.pathname.replace(/^\//, "") &&
    window.location.hostname == link.hostname
  ) {
    smoothScroll(link);
    return false;
  }
  window.location = link.getAttribute("href") === null ? '' : link.getAttribute("href");
  return false;
}

/*
 * Apply window height to a (selector)
 */
export function fullHeight(selector) {
  if (document.querySelector(selector) !== null)
    document.querySelector(selector).style.height = window.innerHeight + "px";
}

export function wideImgCentered(selector_img) {
  if (document.querySelector(selector_img) !== null) {
    let img = document.querySelector(selector_img);
    if (img === null) return;
    let container = img.parentNode;
    if (img.height > container.clientHeight) {
      let divide = img.height / container.clientHeight;
      console.log(divide);
      if (divide >= 4) {
        img.style.transform = "translate(0%, -50%)";
        console.log(document.querySelector(selector_img).style.transform);
      } else if (divide >= 2) {
        img.style.transform = "translate(0, -25%)";
      }
    }
  }
}

/*
 * Permit to create a smoothScroll Effect
 */
export function smoothScroll(link) {
  if (
    location.pathname.replace(/^\//, "") == link.pathname.replace(/^\//, "") &&
    location.hostname == link.hostname &&
    link.hash != ""
  ) {
    var target = document.querySelector(link.hash);
    target =
      target !== null
        ? target
        : document.querySelector("[name=" + link.hash.slice(1) + "]");
    if (target !== null) {
      event.preventDefault();

      //top: target.getBoundingClientRect().top + document.body.scrollTop,
      scrollTo({
        behavior: "smooth",
        left: 0,
        top: target.offsetTop
      });
    }
  }
}

/*
 * Transform an email encoded with rot13 in a readable mail (and add mailto:)
 */
export function readableEmail(id) {
  //if ($('#'+id).length) {
  let block = document.querySelector("#" + id);
  if (block !== null) {
    var mail = block.textContent.replace(/[a-zA-Z]/g, function(c) {
      return String.fromCharCode(
        (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
      );
    });
    block.innerHTML = '<a href="mailto:' + mail + '">' + mail + "</a>";
  }
}

/*
 * Add smoothscrolleffect on internal hash page links
 */
export function smoothScrollHash() {
  //$('a[href*="#"]').not('[href="#"]').on('click', function(event) {
  document.querySelectorAll('[href*="#"]').forEach(function(item) {
    item.addEventListener("click", function() {
      smoothScroll(item);
    });
  });
}

/*
 * Manage image responsively
 * Replace /default/ in the url per /(xs|md|sm|...)/
 * Don't test if image exist !
 */
export function responsiveBackgrounds() {
  var id = null;
  [].forEach.call(document.querySelectorAll("[data-bg]"), function(block) {
    var bg_src = block.dataset.bg;
    if (block.clientWidth <= 576) {
      bg_src = "url('" + bg_src.replace("/default/", "/xs/") + "')";
    } else if (block.clientWidth <= 768) {
      bg_src = "url('" + bg_src.replace("/default/", "/sm/") + "')";
    } else if (block.clientWidth <= 992) {
      bg_src = "url('" + bg_src.replace("/default/", "/md/") + "')";
    } else if (block.clientWidth <= 1200) {
      bg_src = "url('" + bg_src.replace("/default/", "/lg/") + "')";
    } else {
      // 1200+
      bg_src = "url('" + bg_src.replace("/default/", "/xl/") + "')";
    }

    if (block.getAttribute("data-darken")) {
      if (block.getAttribute("data-darken") == "center") {
        bg_src =
          "radial-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) ), " + bg_src;
      } else if (block.getAttribute("data-darken") == "inverse") {
        bg_src =
          "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3),  rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 1) ), " +
          bg_src;
      } else {
        bg_src =
          "linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), " +
          bg_src;
      }
      block.removeAttribute("data-darken");
    }
    block.removeAttribute("data-bg");
    block.setAttribute(
      "style",
      "background:" +
        bg_src +
        " no-repeat center center fixed;background-size:cover"
    );
  });
}
/*
 * idea borrowed from https://codepen.io/JacobLett/pen/xqpEYE
 */
export function bsVideo() {
  var $videoSrc;
  let modal = document.getElementById("video-modal");

  if (modal === null) return false;

  document.querySelectorAll(".play-btn").forEach(function(item) {
    item.addEventListener("click", function() {
      $videoSrc = item.dataset.src;
      let iModal = new bsn.Modal(modal);
      iModal.show();
    });
  });

  if (modal !== null) {
    modal.addEventListener("shown.bs.modal", function(e) {
      document
        .getElementById("video")
        .setAttribute(
          "src",
          $videoSrc +
            "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1"
        );
    });
    modal.addEventListener("hide.bs.modal", function(e) {
      document.getElementById("video").setAttribute("src", "");
    });
  }
}
