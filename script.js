
/*
=====================================
MAIN JAVASCRIPT
=====================================
*/

// DOM Elements
const projectsGrid = document.getElementById("projectsGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.getElementById("filterButtons");
const emptyState = document.getElementById("emptyState");

const projectCount = document.getElementById("projectCount");
const totalProjects = document.getElementById("totalProjects");
const totalCategories = document.getElementById("totalCategories");

const projectModal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const modalOverlay = document.getElementById("modalOverlay");

let activeFilter = "All";


// Initialize Website
document.addEventListener("DOMContentLoaded", () => {

    renderProjects(projects);
    updateStatistics();

    document.getElementById("currentYear").textContent =
        new Date().getFullYear();

    initializeNavigation();
    initializeFilters();
    initializeSearch();

    if (window.lucide) {
        lucide.createIcons();
    }

});


// Render Projects
function renderProjects(projectList) {

    projectsGrid.innerHTML = "";

    if (projectList.length === 0) {
        emptyState.hidden = false;
        projectCount.textContent = "0 Projects";
        return;
    }

    emptyState.hidden = true;

    projectCount.textContent =
        `${projectList.length} ${projectList.length === 1 ? "Project" : "Projects"}`;

    projectList.forEach((project, index) => {

        const card = document.createElement("article");
        card.className = "project-card";

        card.style.animationDelay = `${index * 0.06}s`;

        const techHTML = project.technologies
            .map(tech => `<span>${escapeHTML(tech)}</span>`)
            .join("");

        const imageHTML = project.image
            ? `<img src="${escapeHTML(project.image)}"
                    alt="${escapeHTML(project.title)}"
                    loading="lazy"
                    onerror="this.style.display='none'">`
            : `<div class="project-placeholder">&lt;/&gt;</div>`;

        card.innerHTML = `

            <div class="project-image">

                ${imageHTML}

                <span class="project-category">
                    ${escapeHTML(project.category)}
                </span>

            </div>

            <div class="project-content">

                <h3>${escapeHTML(project.title)}</h3>

                <p>${escapeHTML(project.description)}</p>

                <div class="tech-stack">
                    ${techHTML}
                </div>

                <div class="project-actions">

                    <button type="button"
                            data-action="details"
                            data-id="${project.id}">
                        <i data-lucide="eye"></i>
                        Details
                    </button>

                    <a href="${safeExternalURL(project.github)}"
                       target="_blank"
                       rel="noopener noreferrer">
                        <i data-lucide="github"></i>
                        Source Code
                    </a>

                    <a href="${safeExternalURL(project.demo)}"
                       target="_blank"
                       rel="noopener noreferrer">
                        <i data-lucide="external-link"></i>
                        Demo
                    </a>

                </div>

            </div>

        `;

        projectsGrid.appendChild(card);

    });

    if (window.lucide) {
        lucide.createIcons();
    }

}


// Search Projects
function initializeSearch() {

    searchInput.addEventListener("input", () => {
        applyFilters();
    });

}


// Filter Projects
function initializeFilters() {

    filterButtons.addEventListener("click", (event) => {

        const button = event.target.closest(".filter-btn");

        if (!button) return;

        activeFilter = button.dataset.filter;

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        applyFilters();

    });

}


// Apply Search and Category Filters
function applyFilters() {

    const searchTerm = searchInput.value
        .trim()
        .toLowerCase();

    const filteredProjects = projects.filter(project => {

        const matchesCategory =
            activeFilter === "All" ||
            project.category === activeFilter;

        const searchableText = [
            project.title,
            project.description,
            project.fullDescription,
            project.category,
            ...project.technologies,
            ...project.features
        ].join(" ").toLowerCase();

        const matchesSearch =
            searchableText.includes(searchTerm);

        return matchesCategory && matchesSearch;

    });

    renderProjects(filteredProjects);

}


// Update Project Statistics
function updateStatistics() {

    const categories = new Set(
        projects.map(project => project.category)
    );

    totalProjects.textContent =
        String(projects.length).padStart(2, "0");

    totalCategories.textContent =
        String(categories.size).padStart(2, "0");

}


// Show Project Details
projectsGrid.addEventListener("click", (event) => {

    const button = event.target.closest(
        '[data-action="details"]'
    );

    if (!button) return;

    const projectId = Number(button.dataset.id);

    const project = projects.find(
        item => item.id === projectId
    );

    if (!project) return;

    showProjectDetails(project);

});


function showProjectDetails(project) {

    const featuresHTML = project.features
        .map(feature => `<li>${escapeHTML(feature)}</li>`)
        .join("");

    const technologiesHTML = project.technologies
        .map(tech => `<span>${escapeHTML(tech)}</span>`)
        .join("");

    const imageHTML = project.image
        ? `<img class="modal-body-image"
                src="${escapeHTML(project.image)}"
                alt="${escapeHTML(project.title)}">`
        : "";

    modalBody.innerHTML = `

        <span class="section-label">
            ${escapeHTML(project.category)}
        </span>

        <h2 id="modalTitle">
            ${escapeHTML(project.title)}
        </h2>

        ${imageHTML}

        <p>${escapeHTML(project.fullDescription)}</p>

        <h3>Key Features</h3>

        <ul>
            ${featuresHTML}
        </ul>

        <h3>Technologies Used</h3>

        <div class="tech-stack">
            ${technologiesHTML}
        </div>

        <div class="contact-buttons">

            <a href="${safeExternalURL(project.github)}"
               target="_blank"
               rel="noopener noreferrer"
               class="btn btn-outline">
                <i data-lucide="github"></i>
                GitHub
            </a>

            <a href="${safeExternalURL(project.demo)}"
               target="_blank"
               rel="noopener noreferrer"
               class="btn btn-primary">
                <i data-lucide="external-link"></i>
                Live Demo
            </a>

        </div>

    `;

    projectModal.hidden = false;
    document.body.style.overflow = "hidden";

    if (window.lucide) {
        lucide.createIcons();
    }

    modalClose.focus();

}


// Close Project Details
function closeProjectModal() {

    projectModal.hidden = true;
    document.body.style.overflow = "";

}


modalClose.addEventListener("click", closeProjectModal);

modalOverlay.addEventListener("click", closeProjectModal);

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && !projectModal.hidden) {
        closeProjectModal();
    }

});


// Mobile Navigation
function initializeNavigation() {

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.innerHTML = isOpen
            ? '<i data-lucide="x"></i>'
            : '<i data-lucide="menu"></i>';

        if (window.lucide) {
            lucide.createIcons();
        }

    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i data-lucide="menu"></i>';

            if (window.lucide) {
                lucide.createIcons();
            }

        });

    });

}


// Escape HTML to prevent injected markup in project content
function escapeHTML(value) {

    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);

}


// Accept only valid HTTP(S) links
function safeExternalURL(value) {

    try {

        const url = new URL(value);

        if (url.protocol === "https:" || url.protocol === "http:") {
            return url.href;
        }

    } catch (error) {
        // Invalid or missing URL
    }

    return "#";

}
