// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Dark Mode Toggle
const toggleBtn = document.getElementById("toggle-dark");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Switch icon
    const isDark = document.body.classList.contains("dark-mode");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";

    // Save preference
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Load saved preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }
}


// Back to Top Button
const topBtn = document.getElementById("backToTop");
if (topBtn) {
  window.onscroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    topBtn.style.display = scrollTop > 100 ? "block" : "none";
  };
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Header Parallax
const header = document.querySelector("header");
const headerText = document.querySelector("header h1");
if (header && headerText) {
  let x = 0, y = 0;
  header.addEventListener("mousemove", (e) => {
    x = (e.clientX / window.innerWidth - 0.5) * 10;
    y = (e.clientY / window.innerHeight - 0.5) * 10;
  });
  const animateParallax = () => {
    headerText.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(animateParallax);
  };
  animateParallax();
}

// System Dark Mode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add("dark-mode");
}

// ScrollSpy
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Contact Form
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    fetch("https://formspree.io/f/your-id", {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok || data.success) {
        alert("Message sent successfully!");
        form.reset();
      } else {
        alert("There was an error sending your message.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("There was an error sending your message.");
    });
  });
}
