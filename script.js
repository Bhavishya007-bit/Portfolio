const projectData = {
  aura: {
    title: "Aura",
    badge: "Featured application",
    index: "01",
    tagline: "Your material. A more grounded way to study.",
    description:
      "A local study tutor that turns uploaded material into a workspace for questions, source excerpts, notes, summaries, flashcards, and assessments.",
    stages: [
      ["▤", "Study material", "Documents & images"],
      ["⌕", "Retrieve context", "PostgreSQL + pgvector"],
      ["✧", "Study & practice", "Local models via Ollama"],
    ],
    caption: "Workflow overview · runs on your own machine",
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Ollama"],
    url: "https://github.com/Bhavishya007-bit/aura",
    note: "Source & local setup instructions",
  },
  netflix: {
    title: "Netflix Analysis",
    badge: "Exploratory data analysis",
    index: "02",
    tagline: "A catalogue, a dataset, and a lot of questions.",
    description:
      "A Python exploration of Netflix movies and TV shows. The work starts with cleaning missing values, parsing dates, and separating movie durations from TV season counts.",
    stages: [
      ["▤", "Raw catalogue", "Netflix title dataset"],
      ["⌘", "Prepare the data", "Missing values & parsing"],
      ["▥", "Explore & visualise", "Python analysis"],
    ],
    caption: "Analysis workflow · source code and dataset in the repository",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    url: "https://github.com/Bhavishya007-bit/Netflix---Analysis",
    note: "Analysis code & notebook",
  },
  vision: {
    title: "OpenCV Projects",
    badge: "Computer vision experiments",
    index: "03",
    tagline: "What if a camera could be an input device?",
    description:
      "Small projects in face detection, hand tracking, and gesture-based volume control. A practical way to experiment with images, movement, and real-time interaction.",
    stages: [
      ["◎", "Camera input", "Visual information"],
      ["⌕", "Detect & track", "Faces, hands & gestures"],
      ["↗", "Create an interaction", "Gesture volume control"],
    ],
    caption: "Experiment overview · individual projects in the repository",
    tags: ["Python", "OpenCV", "Computer vision", "Hand tracking"],
    url: "https://github.com/Bhavishya007-bit/openCV-Projects",
    note: "Face detection, hand tracking & gestures",
  },
  ml: {
    title: "ML Learning",
    badge: "Learning notebooks",
    index: "04",
    tagline: "Understand the method. Then try it on data.",
    description:
      "My practice with regression, gradient descent, PCA, and feature transformations. These notebooks are a record of learning the fundamentals, rather than a claim of production-ready models.",
    stages: [
      ["∑", "Learn the concept", "Regression & optimisation"],
      ["⌘", "Work through it", "Jupyter notebooks"],
      ["▥", "Explore the result", "Transforms & PCA"],
    ],
    caption: "Learning workflow · notebooks and practice datasets",
    tags: ["Python", "Jupyter", "Regression", "PCA", "Feature preprocessing"],
    url: "https://github.com/Bhavishya007-bit/ML-Learning",
    note: "Practice notebooks & fundamentals",
  },
  api: {
    title: "FastAPI Practice",
    badge: "Backend learning",
    index: "05",
    tagline: "The logic is only part of the application.",
    description:
      "Practice with HTTP methods, query parameters, and Pydantic validation, including a patient-record example. Learning how to expose Python logic through clear API contracts.",
    stages: [
      ["↗", "Receive a request", "HTTP methods & queries"],
      ["✓", "Validate input", "Pydantic models"],
      ["{ }", "Return a response", "Python API logic"],
    ],
    caption: "Practice overview · examples and explanations in the repository",
    tags: ["Python", "FastAPI", "Pydantic", "HTTP", "JSON"],
    url: "https://github.com/Bhavishya007-bit/FastAPI",
    note: "API examples & learning notes",
  },
};
const detail = document.querySelector("#project-detail");
const selectors = document.querySelectorAll("[data-project]");
function chooseProject(key) {
  const project = projectData[key];
  if (!project) return;
  selectors.forEach((button) => {
    const selected = button.dataset.project === key;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  detail.querySelector(".project-badge").textContent =
    project.badge.toUpperCase();
  detail.querySelector(".project-overline .mono").textContent =
    project.index + " / 05";
  detail.querySelector("h3").textContent = project.title;
  detail.querySelector(".project-tagline").textContent = project.tagline;
  detail.querySelector(".project-description").textContent =
    project.description;
  detail.querySelectorAll(".architecture > div").forEach((stage, index) => {
    stage.querySelector(".architecture-icon").textContent =
      project.stages[index][0];
    stage.querySelector("strong").textContent = project.stages[index][1];
    stage.querySelector("small").textContent = project.stages[index][2];
  });
  detail
    .querySelector(".architecture")
    .setAttribute("aria-label", project.title + " workflow overview");
  detail.querySelector(".architecture-caption").textContent = project.caption;
  const tags = detail.querySelector(".tags");
  tags.replaceChildren(
    ...project.tags.map((tag) => {
      const item = document.createElement("li");
      item.textContent = tag;
      return item;
    }),
  );
  detail.querySelector(".project-bottom a").href = project.url;
  detail.querySelector(".project-note").textContent = project.note;
}
selectors.forEach((button) =>
  button.addEventListener("click", () => chooseProject(button.dataset.project)),
);

const dialog = document.querySelector("#command-dialog");
const paletteButton = document.querySelector("[data-palette]");
const search = document.querySelector("#command-search");
const results = Array.from(document.querySelectorAll("[data-search]"));
function filterPalette() {
  const query = search.value.toLowerCase().trim();
  results.forEach((link) => {
    link.hidden = !link.dataset.search.includes(query);
  });
  document.querySelector("#palette-empty").hidden = results.some(
    (link) => !link.hidden,
  );
}
function openPalette() {
  if (dialog.open) return;
  search.value = "";
  filterPalette();
  dialog.showModal();
  search.focus();
}
if (typeof dialog.showModal === "function") {
  paletteButton.hidden = false;
  paletteButton.addEventListener("click", openPalette);
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (dialog.open) dialog.close();
      else openPalette();
    }
  });
  document
    .querySelector("#palette-close")
    .addEventListener("click", () => dialog.close());
  search.addEventListener("input", filterPalette);
  search.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const first = results.find((link) => !link.hidden);
      if (first) first.click();
    }
  });
  results.forEach((link) =>
    link.addEventListener("click", () => dialog.close()),
  );
  dialog.addEventListener("click", (event) => {
    const box = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom)
    )
      dialog.close();
  });
}

const output = document.querySelector("#terminal-output");
const terminalInput = document.querySelector("#terminal-input");
const commandHistory = [];
let historyIndex = 0;
const commands = {
  help: "Available commands:\n  whoami   — a short introduction\n  projects — my public project repositories\n  stack    — tools used in my work\n  education — my academic background\n  contact  — email and social profiles\n  clear    — clear this terminal",
  whoami:
    "Bhavishya Gaur\nLife Sciences student at NIT Rourkela.\nProgrammer, data science learner, and curious geek.",
  projects:
    "Aura · local, source-based study tutor\nNetflix Analysis · exploratory data analysis\nOpenCV Projects · vision experiments\nML Learning · fundamentals and notebooks\nFastAPI · backend practice\n\nExplore the Project Explorer above for the actual source.",
  stack:
    "Python / NumPy / Pandas / scikit-learn\nFastAPI / Pydantic / React / TypeScript\nPostgreSQL / pgvector / Ollama\nOpenCV / Jupyter / Git",
  education:
    "Integrated M.Sc. in Life Sciences — NIT Rourkela\nFoundation Level completed — IIT Madras online BS in Data Science and Applications",
  contact:
    "Email: bhavishyagaur6@gmail.com\nGitHub: github.com/Bhavishya007-bit\nLinkedIn: linkedin.com/in/bhavishya-gaur\nDelhi, India",
};
function runCommand(value) {
  const command = value.trim();
  if (!command) return;
  commandHistory.push(command);
  historyIndex = commandHistory.length;
  terminalInput.value = "";
  if (command.toLowerCase() === "clear") {
    output.replaceChildren();
    return;
  }
  const prompt = document.createElement("p");
  prompt.className = "terminal-success";
  prompt.textContent = "❯ " + command;
  const response = document.createElement("p");
  response.textContent =
    commands[command.toLowerCase()] ||
    'Unknown command. Type "help" to see what this portfolio shell supports.';
  output.append(prompt, response);
  while (output.children.length > 40) output.firstElementChild.remove();
  output.scrollTop = output.scrollHeight;
}
document.querySelector("#terminal-form").addEventListener("submit", (event) => {
  event.preventDefault();
  runCommand(terminalInput.value);
});
document.querySelectorAll("[data-command]").forEach((button) =>
  button.addEventListener("click", () => {
    runCommand(button.dataset.command);
    terminalInput.focus({ preventScroll: true });
  }),
);
terminalInput.addEventListener("keydown", (event) => {
  if (!["ArrowUp", "ArrowDown"].includes(event.key)) return;
  event.preventDefault();
  historyIndex = Math.max(
    0,
    Math.min(
      commandHistory.length,
      historyIndex + (event.key === "ArrowUp" ? -1 : 1),
    ),
  );
  terminalInput.value = commandHistory[historyIndex] || "";
});

const copyButton = document.querySelector("[data-copy-email]");
if (navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("bhavishyagaur6@gmail.com");
      document.querySelector("#copy-status").textContent =
        "Email copied to clipboard.";
    } catch {
      document.querySelector("#copy-status").textContent =
        "Couldn't copy. You can select the email address above.";
    }
  });
}
const motionButtons = document.querySelectorAll(
  "[data-motion-toggle], #motion-toggle",
);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let pauseMotion = reducedMotion.matches;
let userSelectedMotion = false;
function updateMotion() {
  document.body.classList.toggle("motion-paused", pauseMotion);
  document.body.classList.toggle("motion-enabled", !pauseMotion);
  document.documentElement.classList.toggle("motion-paused", pauseMotion);
  motionButtons.forEach((button) => {
    button.hidden = false;
    button.setAttribute("aria-pressed", String(pauseMotion));
    button.setAttribute(
      "aria-label",
      pauseMotion
        ? "Enable background animation"
        : "Pause background animation",
    );
    const label = button.querySelector("[data-motion-label], small");
    if (label) label.textContent = pauseMotion ? "Motion: off" : "Motion: on";
  });
  document.documentElement.style.setProperty("--rx", "0deg");
  document.documentElement.style.setProperty("--ry", "0deg");
}
updateMotion();
reducedMotion.addEventListener("change", (event) => {
  if (!userSelectedMotion) {
    pauseMotion = event.matches;
    updateMotion();
  }
});
motionButtons.forEach((button) =>
  button.addEventListener("click", () => {
    userSelectedMotion = true;
    pauseMotion = !pauseMotion;
    updateMotion();
  }),
);
const scene = document.querySelector(".spatial-scene");
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  scene.addEventListener("pointermove", (event) => {
    if (pauseMotion) return;
    const rect = scene.getBoundingClientRect();
    document.documentElement.style.setProperty(
      "--ry",
      ((event.clientX - rect.left) / rect.width - 0.5) * 8 + "deg",
    );
    document.documentElement.style.setProperty(
      "--rx",
      ((event.clientY - rect.top) / rect.height - 0.5) * -6 + "deg",
    );
  });
  scene.addEventListener("pointerleave", () => {
    document.documentElement.style.setProperty("--rx", "0deg");
    document.documentElement.style.setProperty("--ry", "0deg");
  });
}
if ("IntersectionObserver" in window) {
  const links = Array.from(document.querySelectorAll('.dock a[href^="#"]'));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          if (link.hash === "#" + entry.target.id)
            link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-10% 0px -55% 0px", threshold: 0 },
  );
  links.forEach((link) => observer.observe(document.querySelector(link.hash)));
}
