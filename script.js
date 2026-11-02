const roleTarget = document.querySelector("#typed-role");
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#primary-menu");
const yearTarget = document.querySelector("#current-year");

yearTarget.textContent = new Date().getFullYear();

const roles = ["AI Developer", "Python Developer", "Computer Vision Engineer", "MCP / AI Agent Tooling"];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (roleTarget && !reduceMotion.matches) {
  let roleIndex = 0;
  let characterIndex = roles[0].length;
  let deleting = true;

  const typeNext = () => {
    const role = roles[roleIndex];
    roleTarget.textContent = role.slice(0, characterIndex);

    if (!deleting && characterIndex === role.length) {
      deleting = true;
      window.setTimeout(typeNext, 1450);
      return;
    }

    if (deleting && characterIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    characterIndex += deleting ? -1 : 1;
    window.setTimeout(typeNext, deleting ? 35 : 65);
  };

  window.setTimeout(typeNext, 1750);
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  menu.classList.toggle("is-open", !isOpen);
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.focus();
  }
});
