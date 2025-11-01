document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".btnHamburguesa");
    const nav = document.querySelector("header nav");
    const links = nav ? nav.querySelectorAll("a") : [];
  
    if (btn && nav) {
      btn.addEventListener("click", () => {
        nav.classList.toggle("nav--abierta");
        btn.setAttribute("aria-expanded", nav.classList.contains("nav--abierta") ? "true" : "false");
      });
    }
  
    links.forEach((a) =>
      a.addEventListener("click", () => {
        if (nav.classList.contains("nav--abierta")) {
          nav.classList.remove("nav--abierta");
          btn && btn.setAttribute("aria-expanded", "false");
        }
      })
    );
  
    const header = document.querySelector("header");
    const toggleHeaderShadow = () => {
      if (!header) return;
      if (window.scrollY > 10) header.classList.add("header--scrolled");
      else header.classList.remove("header--scrolled");
    };
    toggleHeaderShadow();
    window.addEventListener("scroll", toggleHeaderShadow);
  
    const path = location.pathname.split("/").pop();
    links.forEach((a) => {
      const href = a.getAttribute("href");
      if (href === path || (path === "" && href === "index.html")) {
        a.classList.add("link-activo");
      }
    });
  });
