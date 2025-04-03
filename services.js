// Services Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Tabs
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons and panes
      tabBtns.forEach((b) => b.classList.remove("active"))
      tabPanes.forEach((p) => p.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Show corresponding tab pane
      const tabId = this.getAttribute("data-tab")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active")
        }
      })

      // Toggle current item
      item.classList.toggle("active")
    })
  })

  // Service Card Hover Effect
  const serviceCards = document.querySelectorAll(".service-card")

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.height = "auto"
    })

    card.addEventListener("mouseleave", function () {
      this.style.height = "300px"
    })
  })

  // Contact Form Submission
  const contactForm = document.querySelector(".contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form values
      const name = this.querySelector('input[type="text"]').value
      const email = this.querySelector('input[type="email"]').value
      const subject = this.querySelector('input[placeholder="Subject"]').value
      const message = this.querySelector("textarea").value

      // Simple validation
      if (name && email && message) {
        // In a real application, you would send this data to a server
        alert(`Thank you for your message, ${name}! We will get back to you soon.`)
        this.reset()
      } else {
        alert("Please fill in all required fields.")
      }
    })
  }

  // Animation on scroll
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
  }

  // Elements to animate
  const animatedElements = document.querySelectorAll(".slide-in-left, .slide-in-right, .fade-in-up, .reveal-text")

  function checkVisibility() {
    animatedElements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add("active")
      }
    })
  }

  // Check visibility on scroll
  window.addEventListener("scroll", checkVisibility)

  // Check visibility on page load
  checkVisibility()

  // Initialize VanillaTilt for service cards
  if (typeof VanillaTilt !== "undefined") {
    try {
      VanillaTilt.init(document.querySelectorAll(".service-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.1,
      })
    } catch (e) {
      console.error("VanillaTilt is not defined. Make sure it's properly imported.", e)
    }
  }
})

