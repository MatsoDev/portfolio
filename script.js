const roleTarget = document.querySelector("#typed-role");
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#primary-menu");
const yearTarget = document.querySelector("#current-year");
document.documentElement.classList.add("has-js");

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


const mobileMotion = window.matchMedia("(max-width: 767px)").matches;
const cardEntranceVariants = ["from-left", "from-right", "from-below"];
const assignCardEntrances = (selector) => {
  document.querySelectorAll(selector).forEach((card, index) => {
    card.classList.add("reveal", "card-enter", `card-enter--${cardEntranceVariants[index % cardEntranceVariants.length]}`);
    card.style.setProperty("--reveal-delay", `${Math.min(index, 4) * (mobileMotion ? 24 : 30)}ms`);
  });
};
[".stat-item", ".quick-facts > div", ".skill-group", ".project-card", ".background-card"].forEach(assignCardEntrances);
document.querySelectorAll(".section-heading").forEach((heading) => heading.classList.add("reveal"));


const revealItems = document.querySelectorAll(".reveal");
const revealImmediately = (item) => {
  item.classList.add("is-visible");
  if (item.classList.contains("card-enter")) item.classList.add("revealed");
};
if (reduceMotion.matches || !("IntersectionObserver" in window)) {
  revealItems.forEach(revealImmediately);
} else {
  const observerOptions = {
    rootMargin: "0px 0px -5% 0px",
    threshold: 0.05
  };
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        revealImmediately(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll(".reveal").forEach((item, index) => {
    if (!item.style.getPropertyValue("--reveal-delay")) {
      item.style.setProperty("--reveal-delay", `${index === 0 ? 0 : Math.min(index, 4) * 30}ms`);
    }
    revealObserver.observe(item);
  });
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

// Subtle coral sparkles follow pointer movement on devices with a fine pointer.
if (window.matchMedia("(pointer: fine)").matches && !reduceMotion.matches) {
  let lastSparkle = 0;
  document.addEventListener("pointermove", (event) => {
    const now = performance.now();
    if (now - lastSparkle < 85) return;
    lastSparkle = now;
    const sparkle = document.createElement("span");
    sparkle.className = "pointer-sparkle";
    sparkle.textContent = Math.random() > 0.5 ? "✦" : "·";
    sparkle.style.left = `${event.clientX}px`;
    sparkle.style.top = `${event.clientY}px`;
    document.body.append(sparkle);
    window.setTimeout(() => sparkle.remove(), 700);
  }, { passive: true });
}
