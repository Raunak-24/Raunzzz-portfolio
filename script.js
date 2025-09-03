// Helpers
const pages = document.getElementById("pages");
const sections = [...pages.querySelectorAll("section[id]")];

// Build dots
const dotsBox = document.getElementById("dots");
sections.forEach((_, i) => {
  const b = document.createElement("button");
  b.className = "dot";
  b.ariaLabel = `Go to section ${i + 1}`;
  b.addEventListener("click", () =>
    sections[i].scrollIntoView({ behavior: "smooth" })
  );
  dotsBox.appendChild(b);
});

// Observe sections for fade in/out + dots state
const dots = [...dotsBox.querySelectorAll(".dot")];
const setActive = (i) => {
  dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
};

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      const i = sections.indexOf(e.target);
      if (e.isIntersecting) {
        e.target.classList.add("section-in");
        e.target.classList.remove("section-out");
        setActive(i);
      } else {
        e.target.classList.remove("section-in");
        e.target.classList.add("section-out");
      }
    });
  },
  { threshold: 0.6 }
);
sections.forEach((s) => io.observe(s));

// Smooth nav clicks (top-right)
document.querySelectorAll("a[href^='#']").forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// Optional: improve wheel snapping on some touchpads
let lock = false;
pages.addEventListener(
  "wheel",
  (e) => {
    if (lock) return;
    lock = true;
    const current = sections.findIndex((s) => {
      const r = s.getBoundingClientRect();
      return r.top >= -10 && r.bottom <= window.innerHeight + 10;
    });
    const next = e.deltaY > 0 ? Math.min(current + 1, sections.length - 1) : Math.max(current - 1, 0);
    sections[next].scrollIntoView({ behavior: "smooth" });
    setTimeout(() => (lock = false), 500);
  },
  { passive: true }
);
