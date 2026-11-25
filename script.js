
const projects = [
    {
        name: "Project One",
        description: "Add a description of your first web development project here.",
        technologies: "HTML • CSS • JavaScript",
        github: "https://github.com/rajisdevil",
        demo: "#"
    },
    {
        name: "Project Two",
        description: "Showcase another creative website or front-end implementation.",
        technologies: "HTML • CSS • JavaScript",
        github: "https://github.com/rajisdevil",
        demo: "#"
    }
];

const projectGrid = document.getElementById("projectGrid");

projects.forEach(project => {
    const card = document.createElement("article");
    card.className = "project-card";

    card.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="tags">${project.technologies}</div>
        <a href="${project.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        ${project.demo !== "#" ? 
            `<span> | </span><a href="${project.demo}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>` 
            : ""}
    `;

    projectGrid.appendChild(card);
});

document.getElementById("year").textContent =
    new Date().getFullYear();
