import { registerUser, loginUser } from './api.js';

// Registration
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const role = document.getElementById("regRole").value;
    const skills = document.getElementById("regSkills").value.trim();
    const errorDiv = document.getElementById("registerError");
    errorDiv.textContent = "";

    if (!name || !email || !password || !role) {
      errorDiv.textContent = "Please fill all required fields.";
      return;
    }
    if (password.length < 6) {
      errorDiv.textContent = "Password must be at least 6 characters.";
      return;
    }

    const res = await registerUser({ name, email, password, role, skills });
    if (res.message === "User registered successfully") {
      errorDiv.style.color = "green";
      errorDiv.textContent = "Registration successful! Redirecting to login...";
      setTimeout(() => window.location.href = "login.html", 1500);
    } else {
      errorDiv.style.color = "#dc3545";
      errorDiv.textContent = res.message || "Registration failed.";
    }
  });
}

// Login (Freelancer)
const freelancerLoginForm = document.getElementById("freelancerLoginForm");
if (freelancerLoginForm) {
  freelancerLoginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("freelancerEmail").value.trim();
    const password = document.getElementById("freelancerPassword").value;
    const errorDiv = document.getElementById("freelancerLoginError");
    errorDiv.textContent = "";

    if (!email || !password) {
      errorDiv.textContent = "Please fill all fields.";
      return;
    }

    const res = await loginUser({ email, password, role: "freelancer" });
    if (res.token) {
      localStorage.setItem("token", res.token);
      errorDiv.style.color = "green";
      errorDiv.textContent = "Login successful! Redirecting...";
      setTimeout(() => window.location.href = "index.html", 1500);
    } else {
      errorDiv.style.color = "#dc3545";
      errorDiv.textContent = res.message || "Login failed.";
    }
  });
}

// Login (Client)
const clientLoginForm = document.getElementById("clientLoginForm");
if (clientLoginForm) {
  clientLoginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("clientEmail").value.trim();
    const password = document.getElementById("clientPassword").value;
    const errorDiv = document.getElementById("clientLoginError");
    errorDiv.textContent = "";

    if (!email || !password) {
      errorDiv.textContent = "Please fill all fields.";
      return;
    }

    const res = await loginUser({ email, password, role: "client" });
    if (res.token) {
      localStorage.setItem("token", res.token);
      errorDiv.style.color = "green";
      errorDiv.textContent = "Login successful! Redirecting...";
      setTimeout(() => window.location.href = "index.html", 1500);
    } else {
      errorDiv.style.color = "#dc3545";
      errorDiv.textContent = res.message || "Login failed.";
    }
  });
}