 
      const signupUI = document.getElementById("signUp-ui");
      const signinUI = document.getElementById("signIn-ui");

      const signInButtons = document.querySelectorAll(".signIn-btn");
      const signUpButtons = document.querySelectorAll(".signUp-btn");
      const register = document.getElementById("register-btn");
      const loginButton = document.getElementById("login-btn");

      // Switch to Sign In
      signInButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          signupUI.style.display = "none";
          signinUI.style.display = "initial";
          document.body.style.background = "#e0e5ecbd";
          document.title = "Sign In | MyApp";
          window.location.hash = "#login";

          signUpButtons.forEach((b) => b.classList.remove("active"));
          signInButtons.forEach((b) => b.classList.add("active"));
        });
      });

      // Switch to Sign Up
      signUpButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          signinUI.style.display = "none";
          signupUI.style.display = "initial";
          document.body.style.background = "#dde3f0";
          document.title = "Sign Up | MyApp";
          window.location.hash = "#signup";

          signInButtons.forEach((b) => b.classList.remove("active"));
          signUpButtons.forEach((b) => b.classList.add("active"));
        });
      });

      // Advanced features
      async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      }

      async function registerUser() {
        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#signUp-ui .email").value.trim();
        const password = document.querySelector("#signUp-ui .password").value;
        const confirmPassword =
          document.querySelector("#confirmPassword").value;

        if (!name || !email || !password || !confirmPassword) {
          showPopup("Please fill out all fields.");
          return;
        }

        if (password.length < 6) {
          showPopup("Password must be at least 6 characters.");
          return;
        }

        if (password !== confirmPassword) {
          showPopup("Passwords do not match.");
          return;
        }

        const hashedPassword = await hashPassword(password);
        let users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.some((user) => user.email === email);
        if (exists) {
          showPopup("Email already registered.");
          return;
        }

        users.push({ name, email, password: hashedPassword });
        localStorage.setItem("users", JSON.stringify(users));
        showPopup(`Welcome ${name}! Registration successful.`);
      }

      function openHome() {
        window.location.href = "portfolio.html";
      }

      loginButton.addEventListener("click", async () => {
        const email = document.querySelector("#login-email").value.trim();
        const password = document.querySelector("#login-password").value;

        if (!email || !password) {
          showPopup("Please enter both email and password.");
          return;
        }

        const hashedPassword = await hashPassword(password);
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const matchedUser = users.find(
          (u) => u.email === email && u.password === hashedPassword
        );
        if (matchedUser) {
          showPopup(
            `Welcome back, ${matchedUser.name}! Logged in successfully.`
          );
          setTimeout(() => {
            closePopup();
            openHome();
          }, 1500);
        } else {
          showPopup("Invalid email or password.");
        }
      });

      function showPopup(message) {
        document.getElementById("popup-message").textContent = message;
        document.getElementById("popup").style.display = "flex";
      }

      function closePopup() {
        document.getElementById("popup").style.display = "none";
      }

      // service unavailable popup set

      const unavailables = document.querySelectorAll('.forgot-pass, .social-icon')

      unavailables.forEach((unavailable)=>{
      unavailable.addEventListener('click', ()=>{
        showPopup('This feature is not available for now.')
      })
      })
        
    