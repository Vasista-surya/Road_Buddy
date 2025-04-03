// Privacy Policy Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Get the navbar height to offset the scroll position
        const navbarHeight = document.querySelector(".navbar").offsetHeight

        // Calculate the target position with offset
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20

        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Animation on scroll
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
  }

  // Elements to animate
  const revealElements = document.querySelectorAll(".reveal-text")

  function checkVisibility() {
    revealElements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add("active")
      }
    })
  }

  // Check visibility on scroll
  window.addEventListener("scroll", checkVisibility)

  // Check visibility on page load
  checkVisibility()

  // Highlight active section in navigation
  function highlightActiveSection() {
    const sections = document.querySelectorAll(".policy-section")
    const navLinks = document.querySelectorAll(".policy-navigation a")

    // Get current scroll position
    const scrollPosition = window.scrollY

    // Get navbar height for offset
    const navbarHeight = document.querySelector(".navbar").offsetHeight

    // Find the current section
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbarHeight - 100
      const sectionBottom = sectionTop + section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const sectionId = section.getAttribute("id")

        // Remove active class from all links
        navLinks.forEach((link) => {
          link.classList.remove("active")
        })

        // Add active class to current section link
        const activeLink = document.querySelector(`.policy-navigation a[href="#${sectionId}"]`)
        if (activeLink) {
          activeLink.classList.add("active")
        }
      }
    })
  }

  // Highlight active section on scroll
  window.addEventListener("scroll", highlightActiveSection)

  // Highlight active section on page load
  highlightActiveSection()
})

