/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const header = document.querySelector(".page__header");
const navbarMenu = document.querySelector(".navbar__menu");
const sections = document.querySelectorAll("section");
let hideTimeout = null;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const buildNavList = () => {
  const navbarList = document.createElement("ul");
  navbarList.setAttribute("id", "menu__link");

  sections.forEach((section) => {
    const navItem = document.createElement("li");
    navItem.classList.add("navbar__item");

    navItem.insertAdjacentHTML(
      "afterbegin",
      `<a href='${section.id}'>${section.dataset.nav}</a>`
    );

    navItem.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    });

    navbarList.appendChild(navItem);
  });

  return navbarList;
};

// Add class 'active' to section when near top of viewport
const detectActiveNavItem = () => {
  const navbarList = document.querySelectorAll(".navbar__item");

  sections.forEach((section, id) => {
    const sectionBoundView = section.getBoundingClientRect();
    const isInViewPort =
      sectionBoundView.top < window.innerHeight / 2 &&
      sectionBoundView.bottom > 300;
    if (isInViewPort) {
      navbarList[id].classList.add("nav__active");
    } else {
      navbarList[id].classList.remove("nav__active");
    }
  });
};

// toggle header visibility
const toggleHeaderVisibility = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout);
  }
  header.classList.remove("hidden");

  hideTimeout = setTimeout(() => {
    header.classList.add("hidden");
  }, [4000]);
};

// Build menu
navbarMenu.appendChild(buildNavList());

// Listen scroll event to detect active nav and toggle header's visibility
window.addEventListener("scroll", (e) => {
  detectActiveNavItem();
  toggleHeaderVisibility();
});
