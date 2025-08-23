// Smooth scrolling for nav links
document.querySelectorAll("nav ul li a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// Fade in sections on scroll
// Smooth scrolling for navigation
document.querySelectorAll("nav ul li a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Fade-in sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".section").forEach(section => {
  section.classList.add("hidden");
  observer.observe(section);
});

// Light/Dark Theme Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
});

// Play engine sound on hover
const engineSound = document.getElementById("engineSound");
const carImages = document.querySelectorAll(".car-sound");

carImages.forEach(img => {
  img.addEventListener("mouseenter", () => {
    engineSound.currentTime = 10; // Start sound from 5 seconds
    engineSound.volume = 0.5; // Set volume to 50%
    engineSound.loop = true; // Loop the sound
    engineSound.play();
  });

  img.addEventListener("mouseleave", () => {
    engineSound.pause();
    engineSound.currentTime = 0;
  });
});
// Replace these with your project's config details from Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.name.value;
  const email = this.email.value;
  const message = this.message.value;

  db.collection("messages").add({
    name,
    email,
    message,
    timestamp: new Date()
  }).then(() => {
    alert("Message sent successfully!");
    this.reset();
  }).catch(error => {
    alert("Error: " + error.message);
  });
});
const auth = firebase.auth();
const message = document.getElementById("authMessage");

function registerUser() {
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      message.textContent = "Registered successfully!";
    })
    .catch(error => {
      message.textContent = error.message;
    });
}

function loginUser() {
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      message.textContent = "Logged in!";
    })
    .catch(error => {
      message.textContent = error.message;
    });
}

function logoutUser() {
  auth.signOut().then(() => {
    message.textContent = "Logged out.";
  });
}
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("User signed in:", user.email);
  } else {
    console.log("No user signed in.");
  }
});
auth.onAuthStateChanged(user => {
  const dashboard = document.getElementById("dashboard");
  const authSection = document.getElementById("auth");
  const userEmailSpan = document.getElementById("userEmail");

  if (user) {
    dashboard.style.display = "block";
    authSection.style.display = "none";
    userEmailSpan.textContent = user.email;
  } else {
    dashboard.style.display = "none";
    authSection.style.display = "block";
  }
});
