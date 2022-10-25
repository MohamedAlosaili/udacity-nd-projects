// Main Variables
let linkes;

const header = document.getElementById("header");
const navList = document.querySelector("#nav-list");
const toggler = document.querySelector("#toggler");
const scrollBar = document.querySelector("#scroll-bar");
const scrollToTop = document.querySelector("#scroll-to-top");
const sections = Array.from(document.querySelectorAll("[data-nav]"));
const footer = document.querySelector(".footer");

const { bottom } = footer.getBoundingClientRect();
const pageHeight = bottom - window.innerHeight;

// Functions Invoke
windowListener();
createNavList();

linkes = document.querySelectorAll(".nav-link");
linkes[0].classList.add("active");

// Listeners
window.addEventListener("scroll", windowListener);

linkes.forEach((link) => link.addEventListener("click", linkesListener));

toggler.addEventListener("click", () => toggler.classList.toggle("active"));

scrollToTop.addEventListener("click", () =>
  window.scroll({ top: 0, behavior: "smooth" })
);

// Listeners Functions
/**
 * @description
 *      - Added class sticky to the header if scrollY greater then 100 and remove it if not
 *      - Added class active to scrollToTop if scrollY greater then 300 and remove it if not
 *      - invoke updateNavlist() & updateScrollBar
 */
function windowListener() {
  let scrollY = window.scrollY;

  scrollY >= 100
    ? header.classList.add("sticky")
    : header.classList.remove("sticky");

  scrollY >= 300
    ? scrollToTop.classList.add("active")
    : scrollToTop.classList.remove("active");

  linkes && updateNavlist();
  updateScrollBar(scrollY);
}

/**
 * @description Update navLinkes on each click & remove class active from toggler
 * @param {object} e - event object
 */
function linkesListener(e) {
  e.preventDefault();
  linkes.forEach((link) => link.classList.remove("active"));
  this.classList.add("active");

  toggler.classList.remove("active");
  navigateToSection(this.dataset.section);
}

// Action Functions
/**
 * @description Map Over the sections and create a nav item depending on data-nav property and append it to navList
 */
function createNavList() {
  const navListFrg = document.createDocumentFragment("ul");
  sections.forEach((section) => {
    const item = document.createElement("li");
    const name = section.dataset.nav;

    item.innerHTML = `
            <a href="#" class="nav-link parent-hover-effect" data-section="${name}">
            ${name}
                <div class="hover-effect">
                    <span class="one"></span>
                    <span class="two"></span>
                    <span class="three"></span>
                </div>
            </a>
    `;

    navListFrg.append(item);
  });
  navList.append(navListFrg);
}

/**
 * @description Scroll into section clicked depending on the navItem name
 * @param {string} sectionName - The name of the section to scroll to
 */
function navigateToSection(sectionName) {
  const section = sections.find(
    (section) => section.dataset.nav == sectionName
  );

  section.scrollIntoView({ behavior: "smooth" });
}

/**
 * @description Update the navItem's class depending on the sections showed in the window
 */
function updateNavlist() {
  const windowHeight = window.innerHeight / 2;
  let currentSection = "";

  sections.forEach((section) => {
    const { top } = section.getBoundingClientRect();

    if (top >= -windowHeight && top <= windowHeight)
      currentSection = section.dataset.nav;
  });

  linkes.forEach((link) => {
    link.dataset.section === currentSection
      ? link.classList.add("active")
      : link.classList.remove("active");
  });
}

/**
 * @description Update the bar width at the bottom of the header using current scroll value
 * @param {number} scrollY - Current value in scrollY
 */
function updateScrollBar(scrollY) {
  scrollBar.style.width = `${(scrollY / pageHeight) * 100}%`;
}
