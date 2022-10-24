// Main Variables
const sections = Array.from(document.querySelectorAll("[data-nav]"));
const header = document.getElementById("header");
const navList = document.querySelector("#nav-list");
const toggler = document.getElementById("toggler");

// Functions Invoke
windowListener();

// Create listItem + added them to navList
sections.forEach((section) => {
  const listItem = (name) => `
    <li class="list-item">
        <a href="#" class="nav-link parent-hover-effect" data-section="${name}">
        ${name}
        <div class="hover-effect">
        <span class="one"></span>
        <span class="two"></span>
        <span class="three"></span>
        </div>
        </a>
        </li>
        `;

  navList.insertAdjacentHTML("beforeend", listItem(section.dataset.nav));
});

const linkes = document.querySelectorAll(".nav-link");
linkes[0].classList.add("active");

// Listeners
window.addEventListener("scroll", windowListener);

linkes.forEach((link) => link.addEventListener("click", linkesListener));

toggler.addEventListener("click", () => toggler.classList.toggle("active"));

// Listeners Functions
function windowListener() {
  let scrollY = window.scrollY;

  scrollY > 100
    ? header.classList.add("sticky")
    : header.classList.remove("sticky");
}

function linkesListener(e) {
  e.preventDefault();
  linkes.forEach((link) => link.classList.remove("active"));
  this.classList.add("active");

  toggler.classList.remove("active");
  navigateToSection(this.dataset.section);
}

// Action Functions
function createSectionsObj() {
  sections.forEach((section) => {
    sectionsInfo.push({
      name: section.dataset.nav,
      location: 0,
    });
  });
}

function navigateToSection(sectionName) {
  const section = sections.find(
    (section) => section.dataset.nav == sectionName
  );

  section.scrollIntoView({ behavior: "smooth" });
}
