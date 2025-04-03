// Testimonials Slider
document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  let currentIndex = 0

  // Function to show testimonial by index
  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active")
    })

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Show the selected testimonial and activate corresponding dot
    testimonials[index].classList.add("active")
    dots[index].classList.add("active")

    // Update current index
    currentIndex = index
  }

  // Event listeners for dots
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const index = Number.parseInt(this.getAttribute("data-index"))
      showTestimonial(index)
    })
  })

  // Event listeners for prev/next buttons
  prevBtn.addEventListener("click", () => {
    let newIndex = currentIndex - 1
    if (newIndex < 0) {
      newIndex = testimonials.length - 1
    }
    showTestimonial(newIndex)
  })

  nextBtn.addEventListener("click", () => {
    let newIndex = currentIndex + 1
    if (newIndex >= testimonials.length) {
      newIndex = 0
    }
    showTestimonial(newIndex)
  })

  // Auto slide every 5 seconds
  setInterval(() => {
    let newIndex = currentIndex + 1
    if (newIndex >= testimonials.length) {
      newIndex = 0
    }
    showTestimonial(newIndex)
  }, 5000)

  // Animation on scroll
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
  }

  // Animate value cards when they come into view
  const valueCards = document.querySelectorAll(".value-card")

  function checkVisibility() {
    valueCards.forEach((card) => {
      if (isInViewport(card)) {
        card.classList.add("active")
      }
    })
  }

  // Check visibility on scroll
  window.addEventListener("scroll", checkVisibility)

  // Check visibility on page load
  checkVisibility()
})

