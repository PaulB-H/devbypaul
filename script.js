let closestId = document
  .elementFromPoint($(window).width() / 2, $(window).height() / 2)
  .closest("li").id;

$(".content").scroll(function () {
  let middleElem = document.elementFromPoint(
    $(window).width() / 2,
    $(window).height() / 2
  );
  closestId = middleElem.closest("li").id;
});

// Note: Still possible to log 0 horizontal movement
// when using laptop track pad, triggering action I wanted specifically
// for mousewheel
// Not as much of an issue since 'smooth-scroll polyfill' fixed
// the smooth  part of '.scrollIntoView({ behavior: "smooth" })'
window.addEventListener("wheel", function (e) {
  if (e.deltaX === 0) {
    console.log("You are using the mousewheel");
    if (e.deltaY > 0) {
      // slider.scrollLeft += window.innerWidth;
      if (closestId === "home") {
        document
          .getElementById("portfolio")
          .scrollIntoView({ behavior: "smooth" });
      } else if (closestId === "portfolio") {
        document
          .getElementById("contact")
          .scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // slider.scrollLeft -= window.innerWidth;
      if (closestId === "contact") {
        document
          .getElementById("portfolio")
          .scrollIntoView({ behavior: "smooth" });
      } else if (closestId === "portfolio") {
        document.getElementById("home").scrollIntoView({ behavior: "smooth" });
      }
    }
  } else {
    console.log("You are using the trackpad");
  }
});

let currentDetails;
$(".portfolioItem").on("click", function () {
  $("#portfolioItems, #tapforinfo, #portfolioHeader").css("display", "none");
  currentDetails = $(`.${this.id}`);
  $(`.${this.id}`).css("display", "flex");
});

function reset() {
  $("#portfolioItems").css("display", "grid");
  $("#tapforinfo, #portfolioHeader").css("display", "initial");
  currentDetails.css("display", "none");
}

function navScroll(id) {
  document.getElementById(`${id}`).scrollIntoView({ behavior: "smooth" });
}

function copyEmail() {
  let text = "p.bernardhall@gmail.com";
  navigator.clipboard.writeText(text);
  document.getElementById("copy-email").innerHTML = "Copied to clipboard!";
  window.setTimeout(() => {
    document.getElementById("copy-email").innerHTML = "Copy Email";
  }, 5000);
}
