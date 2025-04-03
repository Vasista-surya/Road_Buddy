document.addEventListener("DOMContentLoaded", () => {
  // Toggle password visibility
  const togglePassword = document.querySelector(".toggle-password")
  const passwordInput = document.querySelector("#password")

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
      passwordInput.setAttribute("type", type)
      this.classList.toggle("fa-eye")
      this.classList.toggle("fa-eye-slash")
    })
  }

  // Form submission
  const loginForm = document.getElementById("login-form")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Add loading animation to button
      const submitBtn = document.querySelector(".submit-btn")
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...'
      submitBtn.disabled = true

      // Simulate API call
      setTimeout(() => {
        // For demo purposes only - in a real app, you would validate with a server
        if (email && password) {
          // Success animation
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!'
          submitBtn.style.background = "linear-gradient(135deg, #4CAF50, #2E7D32)"

          // Redirect after success
          setTimeout(() => {
            window.location.href = "dashboard.html"
          }, 1500)
        } else {
          // Error animation
          submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed'
          submitBtn.style.background = "linear-gradient(135deg, #f44336, #d32f2f)"

          setTimeout(() => {
            submitBtn.innerHTML = "Login"
            submitBtn.style.background = "var(--gradient-primary)"
            submitBtn.disabled = false
          }, 1500)
        }
      }, 2000)
    })
  }

  // Input animations
  const inputs = document.querySelectorAll("input")

  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("input-focus")
    })

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("input-focus")
    })
  })

  // Social login buttons animation
  const socialBtns = document.querySelectorAll(".social-btn")

  socialBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
    })

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })

    btn.addEventListener("click", function () {
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...'

      setTimeout(() => {
        this.innerHTML = this.classList.contains("google")
          ? '<i class="fab fa-google"></i> <span>Continue with Google</span>'
          : '<i class="fab fa-facebook-f"></i> <span>Continue with Facebook</span>'
      }, 2000)
    })
  })
})

