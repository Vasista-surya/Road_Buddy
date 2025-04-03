// Feedback Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Star Rating System
  const starRatings = document.querySelectorAll(".star-rating")

  starRatings.forEach((ratingGroup) => {
    const stars = ratingGroup.querySelectorAll("i")
    const ratingText = ratingGroup.querySelector(".rating-text")

    stars.forEach((star) => {
      // Hover effect
      star.addEventListener("mouseover", function () {
        const value = Number.parseInt(this.getAttribute("data-value"))

        // Reset all stars
        stars.forEach((s) => {
          s.classList.remove("fas")
          s.classList.add("far")
        })

        // Fill stars up to the hovered one
        stars.forEach((s) => {
          const starValue = Number.parseInt(s.getAttribute("data-value"))
          if (starValue <= value) {
            s.classList.remove("far")
            s.classList.add("fas")
          }
        })

        // Update rating text
        updateRatingText(value, ratingText)
      })

      // Click to set rating
      star.addEventListener("click", function () {
        const value = Number.parseInt(this.getAttribute("data-value"))

        // Set data attribute for the rating value
        ratingGroup.setAttribute("data-rating", value)

        // Fill stars up to the clicked one
        stars.forEach((s) => {
          const starValue = Number.parseInt(s.getAttribute("data-value"))
          if (starValue <= value) {
            s.classList.remove("far")
            s.classList.add("fas")
          } else {
            s.classList.remove("fas")
            s.classList.add("far")
          }
        })

        // Update rating text
        updateRatingText(value, ratingText)
      })
    })

    // Mouse leave event for the rating group
    ratingGroup.addEventListener("mouseleave", function () {
      const currentRating = Number.parseInt(this.getAttribute("data-rating")) || 0

      // Reset all stars
      stars.forEach((s) => {
        s.classList.remove("fas")
        s.classList.add("far")
      })

      // Fill stars up to the current rating
      stars.forEach((s) => {
        const starValue = Number.parseInt(s.getAttribute("data-value"))
        if (starValue <= currentRating) {
          s.classList.remove("far")
          s.classList.add("fas")
        }
      })

      // Update rating text
      updateRatingText(currentRating, ratingText)
    })
  })

  function updateRatingText(value, textElement) {
    if (value === 0) {
      textElement.textContent = "Click to rate"
    } else {
      const ratingTexts = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"]
      textElement.textContent = ratingTexts[value]
    }
  }

  // Submit Rating Button
  const submitRatingBtn = document.querySelector(".submit-rating-btn")

  if (submitRatingBtn) {
    submitRatingBtn.addEventListener("click", () => {
      const ratingGroups = document.querySelectorAll(".star-rating")
      let allRated = true
      const ratings = {}

      ratingGroups.forEach((group) => {
        const category = group.getAttribute("data-category")
        const rating = Number.parseInt(group.getAttribute("data-rating")) || 0

        if (rating === 0) {
          allRated = false
        }

        ratings[category] = rating
      })

      const comment = document.querySelector(".rating-comment textarea").value

      if (allRated) {
        // In a real application, you would send this data to a server
        console.log("Ratings:", ratings)
        console.log("Comment:", comment)

        // Show thank you modal
        showThankYouModal()

        // Reset ratings
        resetRatings()
      } else {
        alert("Please rate all categories before submitting.")
      }
    })
  }

  function resetRatings() {
    const ratingGroups = document.querySelectorAll(".star-rating")

    ratingGroups.forEach((group) => {
      group.removeAttribute("data-rating")

      const stars = group.querySelectorAll("i")
      stars.forEach((star) => {
        star.classList.remove("fas")
        star.classList.add("far")
      })

      const ratingText = group.querySelector(".rating-text")
      ratingText.textContent = "Click to rate"
    })

    document.querySelector(".rating-comment textarea").value = ""
  }

  // Feedback Form Submission
  const feedbackForm = document.querySelector(".feedback-form")

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("feedback-name").value
      const email = document.getElementById("feedback-email").value
      const type = document.getElementById("feedback-type").value
      const subject = document.getElementById("feedback-subject").value
      const message = document.getElementById("feedback-message").value
      const contactPermission = document.getElementById("contact-permission").checked

      // In a real application, you would send this data to a server
      console.log("Feedback Form Data:", {
        name,
        email,
        type,
        subject,
        message,
        contactPermission,
      })

      // Show thank you modal
      showThankYouModal()

      // Reset form
      this.reset()
      document.querySelector(".file-name").textContent = ""
    })
  }

  // File Upload
  const fileInput = document.getElementById("feedback-attachment")
  const fileName = document.querySelector(".file-name")

  if (fileInput) {
    fileInput.addEventListener("change", function () {
      if (this.files.length > 0) {
        fileName.textContent = this.files[0].name
      } else {
        fileName.textContent = ""
      }
    })
  }

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

  // Testimonials Slider
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
  if (prevBtn && nextBtn) {
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
  }

  // Auto slide every 5 seconds
  setInterval(() => {
    if (testimonials.length > 0) {
      let newIndex = currentIndex + 1
      if (newIndex >= testimonials.length) {
        newIndex = 0
      }
      showTestimonial(newIndex)
    }
  }, 5000)

  // Thank You Modal
  const modal = document.getElementById("thank-you-modal")
  const closeModal = document.querySelector(".close-modal")
  const modalBtn = document.querySelector(".modal-btn")

  function showThankYouModal() {
    modal.classList.add("active")
  }

  function hideThankYouModal() {
    modal.classList.remove("active")
  }

  if (closeModal) {
    closeModal.addEventListener("click", hideThankYouModal)
  }

  if (modalBtn) {
    modalBtn.addEventListener("click", hideThankYouModal)
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      hideThankYouModal()
    }
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
})

