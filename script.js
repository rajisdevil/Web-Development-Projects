
console.log("Welcome to Web Development Projects!");

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("active");
    });
});
