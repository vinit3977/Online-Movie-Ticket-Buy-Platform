let id = null;

function signButton() {
  event.preventDefault();
  let email = document.getElementById("signupEmail").value
  let name = document.getElementById("signupName").value
  let number = document.getElementById("signupNumber").value
  let password = document.getElementById("signupPassword").value
  let otp = document.getElementById("otp").value
  // Send data to backend
  fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, number, password ,otp}),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Signup successful! Check your email for OTP verification.");
        window.open("../123/home/")
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
}

// document
//   .getElementById("loginForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     const email = document.getElementById("loginEmail").value;
//     const password = document.getElementById("loginPassword").value;

//     // Send data to backend
//     fetch("http://localhost:3000/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           alert("Login successful!");
//           window.location.href = "home.html";
//         } else {
//           alert(data.message);
//         }
//       })
//       .catch((error) => console.error("Error:", error));
//   });

function otpButton() {
  event.preventDefault();
  document.getElementById("otp-button").style.display = "none";
  document.getElementById("sign-button").style.display = "block";
  document.getElementById("otp-text").style.display = "block";
  const email = document.getElementById("signupEmail").value;

  // Send data to backend
  fetch("http://localhost:3000/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => response.json())
    .then((data) => {
      id = data.id
    })
    .catch((error) => console.error("Error:", error));
}
