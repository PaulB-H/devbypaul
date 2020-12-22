const slider = document.querySelector(".gallery");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", (_) => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mouseup", (_) => {
  isDown = false;
  slider.classList.remove("active");
  slider.style.userSelect = "initial";
  slider.style.cursor = "initial";
});
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const SCROLL_SPEED = 3;
  const walk = (x - startX) * SCROLL_SPEED;
  slider.scrollLeft = scrollLeft - walk;
  slider.style.userSelect = "none";
  slider.style.cursor = "grabbing";
});

let closestId = document
  .elementFromPoint($(window).width() / 2, $(window).height() / 2)
  .closest("li").id;

$(".gallery").scroll(function () {
  let middleElem = document.elementFromPoint(
    $(window).width() / 2,
    $(window).height() / 2
  );
  closestId = middleElem.closest("li").id;
});

window.addEventListener("wheel", function (e) {
  if (e.deltaY > 0) {
    // slider.scrollLeft += window.innerWidth;
    if (closestId === "home") {
      document
        .getElementById("portfolio")
        .scrollIntoView({ behavior: "smooth" });
    } else if (closestId === "portfolio") {
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
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
});
