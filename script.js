
const GITHUB_REPO = "https://github.com/rajisdevil/Python-Mini-Projects";

const projects = [
  {
    name: "Calculator",
    icon: "🧮",
    category: "Beginner",
    description: "A simple calculator performing basic arithmetic operations.",
    file: "Calculator"
  },
  {
    name: "Number Guessing Game",
    icon: "🎯",
    category: "Beginner",
    description: "Guess a randomly generated number with helpful hints.",
    file: "Number-Guessing-Game"
  },
  {
    name: "Password Generator",
    icon: "🔐",
    category: "Beginner",
    description: "Generate random passwords using letters, numbers and symbols.",
    file: "Password-Generator"
  },
  {
    name: "To-Do List",
    icon: "📝",
    category: "Beginner",
    description: "Create and manage daily tasks using Python.",
    file: "To-Do-List"
  },
  {
    name: "Rock Paper Scissors",
    icon: "✊",
    category: "Beginner",
    description: "Play the classic game against the computer.",
    file: "Rock-Paper-Scissors"
  },
  {
    name: "Quiz Application",
    icon: "💡",
    category: "Intermediate",
    description: "An interactive quiz application with score tracking.",
    file: "Quiz-Application"
  },
  {
    name: "Expense Tracker",
    icon: "💰",
    category: "Intermediate",
    description: "Track expenses and manage your personal budget.",
    file: "Expense-Tracker"
  },
  {
    name: "Weather Application",
    icon: "🌤️",
    category: "Intermediate",
    description: "Display weather information using a weather API.",
    file: "Weather-Application"
  },
  {
    name: "Library Management",
    icon: "📚",
    category: "Advanced",
    description: "Manage books, borrowing records and library information.",
    file: "Library-Management"
  }
];

const grid = document.getElementById("projectGrid");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");

let activeCategory = "All";

function renderProjects() {
  const search = searchInput.value.toLowerCase();

  const filtered = projects.filter(project => {
    const matchesCategory =
      activeCategory === "All" || project.category === activeCategory;

    const matchesSearch =
      project.name.toLowerCase().includes(search) ||
      project.description.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = filtered.map(project => `
    <article class="project-card">
      <div class="project-icon">${project.icon}</div>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="project-meta">
        <span class="level">${project.category}</span>
        <a class="project-link"
           href="${GITHUB_REPO}/tree/main/${encodeURIComponent(project.file)}"
           target="_blank" rel="noopener noreferrer">
          Source Code ↗
        </a>
      </div>
    </article>
  `).join("");

  emptyMessage.hidden = filtered.length !== 0;
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    button.classList.add("active");
    activeCategory = button.dataset.category;
    renderProjects();
  });
});

searchInput.addEventListener("input", renderProjects);

document.getElementById("projectCount").textContent = projects.length;
document.getElementById("year").textContent = new Date().getFullYear();

renderProjects();
