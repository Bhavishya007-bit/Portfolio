const header = document.querySelector("[data-header]");
const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card");
const learningRotator = document.querySelector("#learning-rotator");
const copyEmailButton = document.querySelector("[data-copy-email]");

const learningItems = [
  "Machine learning and deep learning fundamentals",
  "Computer vision with OpenCV, MediaPipe, YOLO, and TensorFlow",
  "FastAPI services with Pydantic validation",
  "Redis, PostgreSQL, Grafana, and Prometheus for backend systems",
  "DSA practice for stronger problem solving",
];

let learningIndex = 0;

function updateHeader() {
  if (window.scrollY > 24) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

function filterProjects(category) {
  projectCards.forEach((card) => {
    const categories = card.dataset.category.split(" ");
    const shouldShow = category === "all" || categories.includes(category);
    card.classList.toggle("hidden", !shouldShow);
  });
}

function activateFilter(button) {
  filterButtons.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  filterProjects(button.dataset.filter);
}

function rotateLearningItem() {
  if (!learningRotator) {
    return;
  }

  learningIndex = (learningIndex + 1) % learningItems.length;
  learningRotator.textContent = learningItems[learningIndex];
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

filterButtons.forEach((button) => {
  button.addEventListener("click", () => activateFilter(button));
});

setInterval(rotateLearningItem, 2800);

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = "bhavishyagaur6@gmail.com";

    try {
      await navigator.clipboard.writeText(email);
      copyEmailButton.textContent = "Copied";
    } catch {
      copyEmailButton.textContent = email;
    }

    window.setTimeout(() => {
      copyEmailButton.textContent = "Copy Email";
    }, 1600);
  });
}
