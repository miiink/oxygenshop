// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
const navbarMenu = document.querySelector(".navbar__menu");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("navbar__menu--open");
});

// Percentage scroller
const scrollProgress = document.querySelector(".progress-bar ");
document.addEventListener("scroll", function () {
  let w =
    ((document.body.scrollTop || document.documentElement.scrollTop) /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)) *
    100;
  scrollProgress.style.setProperty("width", w + "%");
});

// Show 'Return to the Top' when scrolling down
const arrowUp = document.querySelector(".arrow-up");
const whyus = document.querySelector("#whyus");
const whyusHeight = whyus.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > whyusHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// Function Scroll-into-view
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
// Handle click on the 'Return to the Top' button w/ delay time
arrowUp.addEventListener("click", delayScroll);

function delayScroll() {
  setTimeout(function () {
    scrollIntoView("#whyus");
  }, 200);
}

// Form validation
let id = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

let username = id("username"),
  email = id("email"),
  form = id("form"),
  errorMsg = classes("error"),
  successIcon = classes("success-icon"),
  failureIcon = classes("failure-icon");

// submit eventListener

form.addEventListener("submit", (e) => {
  e.preventDefault();

  engine(username, 0, "Name must be between 2 and 100");
  engine(email, 1, "Email cannot be blank");
});

// engine function

let engine = (id, serial, message) => {
  if (id.value.length < 2) {
    errorMsg[serial].innerHTML = message;
    id.style.borderBottom = "1px solid red";

    // icons
    failureIcon[serial].style.opacity = "1";
    successIcon[serial].style.opacity = "0";
  } else {
    errorMsg[serial].innerHTML = "";
    id.style.borderBottom = "1px solid green";

    // icons
    failureIcon[serial].style.opacity = "0";
    successIcon[serial].style.opacity = "1";
  }
};

// fetch

let inputName = document.querySelector(".contact__container2-name-bar");
let inputEmail = document.querySelector(".contact__container2-email-bar");

let formElement = document.querySelector(".contact__container2");

formElement.addEventListener("submit", function (event) {
  inputName = document.querySelector(".contact__container2-name-bar").value;
  inputEmail = document.querySelector(".contact__container2-email-bar").value;
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ name: inputName, email: inputEmail }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", { name: inputName, email: inputEmail });
    })
    .catch((error) => {
      console.error("Fail:", error);
    });
});

// Pop Up

const modal = document.getElementById("modal");
function modalOn() {
  modal.style.display = "flex";
}
function isModalOn() {
  return modal.style.display === "flex";
}
function modalOff() {
  modal.style.display = "none";
}

const closeBtn = modal.querySelector(".close-area");
closeBtn.addEventListener("click", (e) => {
  modalOff();
});

modal.addEventListener("click", (e) => {
  const evTarget = e.target;
  if (evTarget.classList.contains("modal-overlay")) {
    modal.style.display = "none";
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});

// fetch newsletter

setTimeout(showModal, 2000);

function showModal() {
  document.getElementsByClassName("modal-window")[0].style.display = "block";
}

let inputEmailNewsletter = document.querySelector("#newsletter-email");
let formElementNewsletter = document.querySelector("#newsletter-form");

formElementNewsletter.addEventListener("submit", function (event) {
  event.preventDefault();
  inputEmailNewsletter = document.querySelector("#newsletter-email").value;
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ email: inputEmailNewsletter }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", { email: inputEmailNewsletter });
    })
    .catch((error) => {
      console.error("Fail:", error);
    });
});

// Currency Selector

const api =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json";
const selectCurrency = document.querySelector("#currencies");
const PlanBasic = document.querySelector(".prices__container__dollar1");
const PlanPro = document.querySelector(".prices__container__dollar2");
const PlanPrem = document.querySelector(".prices__container__dollar3");

async function changeCurrency() {
  const response = await fetch(api);
  let data = await response.json();
  return data;
}

changeCurrency().then((data) => {
  selectCurrency.addEventListener("change", (e) => {
    switch (e.target.value) {
      case "usd":
        PlanBasic.textContent = "$0";
        PlanPro.textContent = "$25";
        PlanPrem.textContent = "$60";
        break;
      case "eur":
        PlanBasic.textContent = "€0";
        PlanPro.textContent = "€" + parseFloat(25 * data.usd.eur).toFixed(2); //punto decimal: 2
        PlanPrem.textContent = "€" + parseFloat(60 * data.usd.eur).toFixed(2);
        break;
      case "gbp":
        PlanBasic.textContent = "£0";
        PlanPro.textContent = "£" + parseFloat(25 * data.usd.gbp).toFixed(2);
        PlanPrem.textContent = "£" + parseFloat(60 * data.usd.gbp).toFixed(2);
        break;
    }
  });
});

// Slider

document.addEventListener("DOMContentLoaded", function () {
  let sliderList = document.querySelector("#slideShow"),
    innerPhoto = document.querySelectorAll(".inner-photo"),
    sliderBtnPrev = document.querySelector(".prev"),
    sliderBtnNext = document.querySelector(".next"),
    innerPhotoLength = innerPhoto.length,
    currentIndex = 0;

  function prevSlide() {
    innerPhoto[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + innerPhotoLength - 1) % innerPhotoLength;
    innerPhoto[currentIndex].classList.add("active");
  }

  function nextSlide() {
    setTimeout(nextSlide, 3000);
    if (currentIndex > 0) innerPhoto[currentIndex].classList.remove("active");
    else innerPhoto[0].classList.remove("active");

    currentIndex = (currentIndex + 1) % innerPhotoLength;
    innerPhoto[currentIndex].classList.add("active");
  }

  sliderBtnPrev.addEventListener("click", function () {
    prevSlide();
  });

  sliderBtnNext.addEventListener("click", function () {
    nextSlide();
  });

  nextSlide();
});
