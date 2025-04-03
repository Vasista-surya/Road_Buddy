// Queries Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Tab Switching
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
      // Toggle current item
      item.classList.toggle("active")

      // Close other items (optional)
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active")
        }
      })
    })
  })

  // Category Filtering
  const categoryBtns = document.querySelectorAll(".category-btn")

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all category buttons
      categoryBtns.forEach((b) => b.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Get selected category
      const category = this.getAttribute("data-category")

      // Filter FAQ items
      filterFAQs(category)
    })
  })

  function filterFAQs(category) {
    const faqItems = document.querySelectorAll(".faq-item")

    faqItems.forEach((item) => {
      if (category === "all" || item.getAttribute("data-category") === category) {
        item.style.display = "block"
      } else {
        item.style.display = "none"
      }
    })

    // Check if any items are visible
    const visibleItems = document.querySelectorAll('.faq-item[style="display: block;"]')
    const noResults = document.querySelector(".no-results")

    if (visibleItems.length === 0) {
      noResults.style.display = "block"
    } else {
      noResults.style.display = "none"
    }
  }

  // Search Functionality
  const searchInput = document.getElementById("search-input")
  const searchBtn = document.getElementById("search-btn")

  searchBtn.addEventListener("click", () => {
    searchFAQs()
  })

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchFAQs()
    }
  })

  function searchFAQs() {
    const searchTerm = searchInput.value.toLowerCase().trim()

    if (searchTerm === "") {
      // Reset to show all FAQs
      filterFAQs("all")
      return
    }

    // Switch to FAQ tab
    document.querySelector('.tab-btn[data-tab="faq"]').click()

    // Reset category filters
    document.querySelector('.category-btn[data-category="all"]').click()

    const faqItems = document.querySelectorAll(".faq-item")
    let matchFound = false

    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question h3").textContent.toLowerCase()
      const answer = item.querySelector(".faq-answer p").textContent.toLowerCase()

      if (question.includes(searchTerm) || answer.includes(searchTerm)) {
        item.style.display = "block"
        matchFound = true
      } else {
        item.style.display = "none"
      }
    })

    // Show/hide no results message
    const noResults = document.querySelector(".no-results")

    if (!matchFound) {
      noResults.style.display = "block"
    } else {
      noResults.style.display = "none"
    }
  }

  // Search Tags
  const searchTags = document.querySelectorAll(".tag")

  searchTags.forEach((tag) => {
    tag.addEventListener("click", function (e) {
      e.preventDefault()

      const tagValue = this.getAttribute("data-tag")
      searchInput.value = tagValue
      searchFAQs()
    })
  })

  // Submit Query Button in No Results
  const submitQueryBtn = document.querySelector(".submit-query-btn")

  if (submitQueryBtn) {
    submitQueryBtn.addEventListener("click", () => {
      document.querySelector('.tab-btn[data-tab="submit"]').click()
    })
  }

  // File Upload
  const fileInput = document.getElementById("attachment")
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

  // Form Submission
  const queryForm = document.querySelector(".query-form")

  if (queryForm) {
    queryForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const category = document.getElementById("category").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Simple validation
      if (name && email && category && subject && message) {
        // In a real application, you would send this data to a server
        alert(`Thank you for your query, ${name}! We will get back to you within 24 hours.`)
        this.reset()
        fileName.textContent = ""
      } else {
        alert("Please fill in all required fields.")
      }
    })
  }

  // Live Chat Button
  const chatBtn = document.querySelector(".chat-btn")

  if (chatBtn) {
    chatBtn.addEventListener("click", () => {
      alert("Live chat feature will be available soon!")
      // In a real application, this would open a chat window or redirect to a chat page
    })
  }

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

