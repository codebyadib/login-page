 
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("nav-links");
      const mobileLogout = document.querySelector(".mobile-logout");

      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const isOpen = navLinks.classList.contains("open");
        if (window.innerWidth <= 768) {
          mobileLogout.style.display = isOpen ? "block" : "none";
        }
      });

      function logout() {
        window.location.href = "index.html";
      }

      // Highlight active link
      const currentPage = window.location.pathname.split("/").pop();
      const navItems = document.querySelectorAll(".nav-link");
      navItems.forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
          link.classList.add("active");
        }
      });
    