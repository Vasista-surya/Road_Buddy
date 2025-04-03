// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.querySelector(".preloader")
  window.addEventListener("load", () => {
    preloader.classList.add("fade-out")
    setTimeout(() => {
      preloader.style.display = "none"
    }, 500)
  })

  // Set current date
  const currentDateElement = document.getElementById("current-date")
  if (currentDateElement) {
    const now = new Date()
    const options = { year: "numeric", month: "long", day: "numeric" }
    currentDateElement.textContent = now.toLocaleDateString("en-US", options)
  }

  // Sidebar Toggle
  const sidebarToggle = document.getElementById("sidebar-toggle")
  const sidebar = document.getElementById("sidebar")
  const content = document.getElementById("content")

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle")
  const sideMenu = document.getElementById("side-menu")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("menu-open")
      sideMenu.classList.toggle("active")
    })
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("collapsed")
      content.classList.toggle("expanded")

      // Change icon direction
      const icon = this.querySelector("i")
      if (sidebar.classList.contains("collapsed")) {
        icon.classList.remove("bx-chevron-left")
        icon.classList.add("bx-chevron-right")
      } else {
        icon.classList.remove("bx-chevron-right")
        icon.classList.add("bx-chevron-left")
      }
    })
  }

  // Mobile Sidebar Toggle
  function checkMobile() {
    if (window.innerWidth <= 992) {
      sidebar.classList.add("collapsed")
      content.classList.add("expanded")

      if (sidebarToggle) {
        const icon = sidebarToggle.querySelector("i")
        icon.classList.remove("bx-chevron-left")
        icon.classList.add("bx-chevron-right")
      }
    }

    if (window.innerWidth <= 576) {
      sidebar.classList.remove("collapsed")
      sidebar.classList.remove("active")
      content.classList.add("expanded")
    }
  }

  window.addEventListener("resize", checkMobile)
  checkMobile()

  // Navigation
  const menuItems = document.querySelectorAll(".menu-item")
  const pages = document.querySelectorAll(".page")

  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      menuItems.forEach((menuItem) => menuItem.classList.remove("active"))

      // Add active class to clicked item
      this.classList.add("active")

      // Show corresponding page
      const pageName = this.getAttribute("data-page")

      if (pageName) {
        pages.forEach((page) => {
          page.classList.remove("active")
        })

        document.getElementById(`${pageName}-page`)?.classList.add("active")
      }

      // Close sidebar on mobile after navigation
      if (window.innerWidth <= 576) {
        sidebar.classList.remove("active")
      }

      // Close mobile menu after navigation
      if (window.innerWidth <= 992) {
        menuToggle.classList.remove("menu-open")
        sideMenu.classList.remove("active")
      }
    })
  })

  // Theme Toggle
  const themeToggleCheckbox = document.getElementById("theme-toggle-checkbox")
  if (themeToggleCheckbox) {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode")
      themeToggleCheckbox.checked = true
    }

    // Add event listener
    themeToggleCheckbox.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode")

      // Add animation effect to the toggle switch
      const toggleSwitch = document.querySelector(".theme-toggle-switch")
      if (toggleSwitch) {
        toggleSwitch.classList.add("animating")
        setTimeout(() => {
          toggleSwitch.classList.remove("animating")
        }, 500)
      }

      // Save preference to localStorage
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark")
      } else {
        localStorage.setItem("theme", "light")
      }
    })
  }

  // Post Ride Form Steps
  const nextStepBtns = document.querySelectorAll(".next-step")
  const prevStepBtns = document.querySelectorAll(".prev-step")
  const formSteps = document.querySelectorAll(".form-step")
  const progressSteps = document.querySelectorAll(".progress-step")

  nextStepBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Find current active step
      const activeStep = document.querySelector(".form-step.active")
      const activeIndex = Array.from(formSteps).indexOf(activeStep)

      if (activeIndex < formSteps.length - 1) {
        // Hide current step
        activeStep.classList.remove("active")

        // Show next step
        formSteps[activeIndex + 1].classList.add("active")

        // Update progress
        progressSteps[activeIndex].classList.add("completed")
        progressSteps[activeIndex + 1].classList.add("active")

        // Scroll to top of form
        document.querySelector(".form-container").scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  prevStepBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Find current active step
      const activeStep = document.querySelector(".form-step.active")
      const activeIndex = Array.from(formSteps).indexOf(activeStep)

      if (activeIndex > 0) {
        // Hide current step
        activeStep.classList.remove("active")

        // Show previous step
        formSteps[activeIndex - 1].classList.add("active")

        // Update progress
        progressSteps[activeIndex].classList.remove("active")
        progressSteps[activeIndex - 1].classList.remove("completed")

        // Scroll to top of form
        document.querySelector(".form-container").scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  // Transport Type Selection
  const transportOptions = document.querySelectorAll('input[name="transport"]')
  const bikeDetails = document.getElementById("bike-details")
  const carDetails = document.getElementById("car-details")

  transportOptions.forEach((option) => {
    option.addEventListener("change", function () {
      if (this.value === "bike") {
        bikeDetails.style.display = "block"
        carDetails.style.display = "none"
      } else if (this.value === "car") {
        bikeDetails.style.display = "none"
        carDetails.style.display = "block"
      }
    })
  })

  // Seat Selection
  const seatBtns = document.querySelectorAll(".seat-btn")

  seatBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Find parent container
      const container = this.closest(".seat-selector")

      // Remove active class from all buttons in this container
      container.querySelectorAll(".seat-btn").forEach((button) => {
        button.classList.remove("active")
      })

      // Add active class to clicked button
      this.classList.add("active")
    })
  })

  // Filter Buttons
  const filterBtns = document.querySelectorAll(".filter-btn")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((filterBtn) => {
        filterBtn.classList.remove("active")
      })

      // Add active class to clicked button
      this.classList.add("active")

      // Get filter value
      const filter = this.getAttribute("data-filter")

      // Filter logic would go here
      console.log(`Filter by: ${filter}`)
    })
  })

  // Switch between My Posted Rides and My Booked Rides
  const switchToBooked = document.getElementById("switch-to-booked")
  const switchToPosted = document.getElementById("switch-to-posted")

  if (switchToBooked) {
    switchToBooked.addEventListener("click", () => {
      document.getElementById("my-rides-page").classList.remove("active")
      document.getElementById("booked-rides-page").classList.add("active")
    })
  }

  if (switchToPosted) {
    switchToPosted.addEventListener("click", () => {
      document.getElementById("booked-rides-page").classList.remove("active")
      document.getElementById("my-rides-page").classList.add("active")
    })
  }

  // Profile Tabs
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab")

      // Remove active class from all buttons and contents
      tabBtns.forEach((tabBtn) => tabBtn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      this.classList.add("active")
      document.getElementById(tabName)?.classList.add("active")
    })
  })

  // Logout Modal
  const logoutBtn = document.getElementById("logout-btn")
  const logoutModal = document.getElementById("logout-modal")
  const cancelLogout = document.getElementById("cancel-logout")
  const confirmLogout = document.getElementById("confirm-logout")
  const closeModalBtns = document.querySelectorAll(".close-modal")

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logoutModal.classList.add("active")
    })
  }

  if (cancelLogout) {
    cancelLogout.addEventListener("click", () => {
      logoutModal.classList.remove("active")
    })
  }

  if (confirmLogout) {
    confirmLogout.addEventListener("click", () => {
      // Redirect to logout page or perform logout action
      window.location.href = "index.html"
    })
  }

  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal")
      modal.classList.remove("active")
    })
  })

  // Emergency Button
  const emergencyBtn = document.getElementById("emergency-btn")
  const emergencyModal = document.getElementById("emergency-modal")
  const cancelEmergency = document.getElementById("cancel-emergency")
  const confirmEmergency = document.getElementById("confirm-emergency")

  if (emergencyBtn) {
    emergencyBtn.addEventListener("click", () => {
      emergencyModal.classList.add("active")
    })
  }

  if (cancelEmergency) {
    cancelEmergency.addEventListener("click", () => {
      emergencyModal.classList.remove("active")
    })
  }

  if (confirmEmergency) {
    confirmEmergency.addEventListener("click", () => {
      // Perform emergency action
      alert("Emergency alert sent! Your location has been shared with your emergency contacts.")
      emergencyModal.classList.remove("active")
    })
  }

  // Animate stats on scroll
  const statCards = document.querySelectorAll(".stat-card")

  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
  }

  function animateStats() {
    statCards.forEach((card) => {
      if (isInViewport(card) && !card.classList.contains("animated")) {
        card.classList.add("animated")
      }
    })
  }

  window.addEventListener("scroll", animateStats)
  animateStats() // Run once on page load

  // Close modals when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      event.target.classList.remove("active")
    }
  })

  // Add neon glow effect to elements on hover
  const neonElements = document.querySelectorAll(".btn-primary, .btn-outline, .ride-card, .activity-item, .stat-card")

  neonElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.3s ease"

      if (this.classList.contains("btn-primary")) {
        this.style.boxShadow = "var(--primary-neon-glow)"
      } else if (this.classList.contains("btn-outline")) {
        this.style.boxShadow = "var(--primary-neon-glow)"
      } else if (this.classList.contains("ride-card")) {
        this.style.boxShadow = "0 0 15px rgba(0, 255, 255, 0.3)"
      } else if (this.classList.contains("activity-item")) {
        this.style.boxShadow = "0 0 15px rgba(0, 255, 255, 0.3)"
      } else if (this.classList.contains("stat-card")) {
        this.style.boxShadow = "0 0 15px rgba(0, 255, 255, 0.3)"
      }
    })

    element.addEventListener("mouseleave", function () {
      this.style.boxShadow = ""
    })
  })

  // Post Ride Form Submission
  const postRideForm = document.getElementById("post-ride-form")

  if (postRideForm) {
    postRideForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Show success message
      alert("Ride posted successfully!")

      // Redirect to dashboard
      document.getElementById("post-ride-page").classList.remove("active")
      document.getElementById("dashboard-page").classList.add("active")

      // Update navigation
      menuItems.forEach((menuItem) => {
        menuItem.classList.remove("active")
      })

      document.querySelector('[data-page="dashboard"]').classList.add("active")
    })
  }

  // Notifications functionality
  const notifications = document.querySelector(".notifications")
  const markAllReadBtn = document.querySelector(".mark-all-read")
  const notificationMarkReadBtns = document.querySelectorAll(".notification-mark-read")

  if (markAllReadBtn) {
    markAllReadBtn.addEventListener("click", () => {
      const unreadNotifications = document.querySelectorAll(".notification-item.unread")
      unreadNotifications.forEach((notification) => {
        notification.classList.remove("unread")
      })

      // Update notification badge
      const notificationBadge = document.querySelector(".notification-badge")
      notificationBadge.style.display = "none"
    })
  }

  notificationMarkReadBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const notificationItem = this.closest(".notification-item")
      notificationItem.classList.remove("unread")

      // Update notification badge count
      const unreadCount = document.querySelectorAll(".notification-item.unread").length
      const notificationBadge = document.querySelector(".notification-badge")

      if (unreadCount === 0) {
        notificationBadge.style.display = "none"
      } else {
        notificationBadge.textContent = unreadCount
      }
    })
  })

  // Settings panel navigation for new panels
  document.querySelectorAll(".settings-nav-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()

      const settingsName = this.getAttribute("data-settings")

      // Remove active class from all items and panels
      document.querySelectorAll(".settings-nav-item").forEach((navItem) => {
        navItem.classList.remove("active")
      })

      document.querySelectorAll(".settings-panel").forEach((panel) => {
        panel.classList.remove("active")
      })

      // Add active class to clicked item and corresponding panel
      this.classList.add("active")
      document.getElementById(`${settingsName}-panel`)?.classList.add("active")
    })
  })

  // Payment Methods functionality
  const addPaymentMethodBtn = document.querySelector(".add-payment-method")
  const addMoneyBtns = document.querySelectorAll(".add-money")

  if (addPaymentMethodBtn) {
    addPaymentMethodBtn.addEventListener("click", () => {
      alert("Add payment method functionality will be implemented here.")
    })
  }

  addMoneyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Add money to wallet functionality will be implemented here.")
    })
  })
})

// Dashboard JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Splash Screen
  const splashScreen = document.querySelector(".splash-screen")
  setTimeout(() => {
    splashScreen.classList.add("fade-out")
    setTimeout(() => {
      splashScreen.style.display = "none"
    }, 500)
  }, 2000)

  // Navigation
  const navItems = document.querySelectorAll(".nav-item")
  const pages = document.querySelectorAll(".page")

  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove active class from all items
      navItems.forEach((navItem) => navItem.classList.remove("active"))

      // Add active class to clicked item
      this.classList.add("active")

      // Show corresponding page
      const pageName = this.getAttribute("data-page")

      if (pageName) {
        pages.forEach((page) => {
          page.classList.remove("active")
        })

        document.getElementById(`${pageName}-page`)?.classList.add("active")
      }
    })
  })

  // Quick Action Buttons
  const postRideBtn = document.getElementById("post-ride-btn")
  const findRideBtn = document.getElementById("find-ride-btn")

  if (postRideBtn) {
    postRideBtn.addEventListener("click", () => {
      navItems.forEach((navItem) => navItem.classList.remove("active"))
      document.querySelector('[data-page="post-ride"]').classList.add("active")

      pages.forEach((page) => {
        page.classList.remove("active")
      })
      document.getElementById("post-ride-page").classList.add("active")
    })
  }

  if (findRideBtn) {
    findRideBtn.addEventListener("click", () => {
      navItems.forEach((navItem) => navItem.classList.remove("active"))
      document.querySelector('[data-page="find-ride"]').classList.add("active")

      pages.forEach((page) => {
        page.classList.remove("active")
      })
      document.getElementById("find-ride-page").classList.add("active")
    })
  }

  // Search Toggle
  const searchToggle = document.querySelector(".search-toggle")
  const searchOverlay = document.querySelector(".search-overlay")
  const closeSearch = document.querySelector(".close-search")

  if (searchToggle) {
    searchToggle.addEventListener("click", () => {
      searchOverlay.classList.add("active")
    })
  }

  if (closeSearch) {
    closeSearch.addEventListener("click", () => {
      searchOverlay.classList.remove("active")
    })
  }

  // Post Ride Form Steps
  const nextStepBtns = document.querySelectorAll(".next-step")
  const prevStepBtns = document.querySelectorAll(".prev-step")
  const formSteps = document.querySelectorAll(".form-step")
  const progressSteps = document.querySelectorAll(".progress-step")

  nextStepBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Find current active step
      const activeStep = document.querySelector(".form-step.active")
      const activeIndex = Array.from(formSteps).indexOf(activeStep)

      if (activeIndex < formSteps.length - 1) {
        // Hide current step
        activeStep.classList.remove("active")

        // Show next step
        formSteps[activeIndex + 1].classList.add("active")

        // Update progress
        progressSteps[activeIndex + 1].classList.add("active")
        progressSteps[activeIndex].classList.add("completed")

        // Scroll to top of form
        document.querySelector(".post-ride-container").scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  prevStepBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Find current active step
      const activeStep = document.querySelector(".form-step.active")
      const activeIndex = Array.from(formSteps).indexOf(activeStep)

      if (activeIndex > 0) {
        // Hide current step
        activeStep.classList.remove("active")

        // Show previous step
        formSteps[activeIndex - 1].classList.add("active")

        // Update progress
        progressSteps[activeIndex].classList.remove("active")

        // Scroll to top of form
        document.querySelector(".post-ride-container").scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  // Transport Type Selection
  const transportOptions = document.querySelectorAll('input[name="transport"]')
  const bikeDetails = document.getElementById("bike-details")
  const carDetails = document.getElementById("car-details")

  transportOptions.forEach((option) => {
    option.addEventListener("change", function () {
      if (this.value === "bike") {
        bikeDetails.style.display = "block"
        carDetails.style.display = "none"
      } else if (this.value === "car") {
        bikeDetails.style.display = "none"
        carDetails.style.display = "block"
      }
    })
  })

  // Seat Selection
  const seatBtns = document.querySelectorAll(".seat-btn")

  seatBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Find parent container
      const container = this.closest(".seat-selector")

      // Remove active class from all buttons in this container
      container.querySelectorAll(".seat-btn").forEach((button) => {
        button.classList.remove("active")
      })

      // Add active class to clicked button
      this.classList.add("active")
    })
  })

  // Filter Buttons
  const filterBtns = document.querySelectorAll(".filter-btn")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((filterBtn) => {
        filterBtn.classList.remove("active")
      })

      // Add active class to clicked button
      this.classList.add("active")

      // Get filter value
      const filter = this.getAttribute("data-filter")

      // Filter logic would go here
      console.log(`Filter by: ${filter}`)
    })
  })

  // My Rides Tabs
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab")

      // Remove active class from all buttons and contents
      tabBtns.forEach((tabBtn) => tabBtn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      this.classList.add("active")
      document.getElementById(tabName)?.classList.add("active")
    })
  })

  // Settings Navigation
  const settingsNavItems = document.querySelectorAll(".settings-nav-item")
  const settingsPanels = document.querySelectorAll(".settings-panel")

  settingsNavItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()

      const settingsName = this.getAttribute("data-settings")

      // Remove active class from all items and panels
      settingsNavItems.forEach((navItem) => navItem.classList.remove("active"))
      settingsPanels.forEach((panel) => panel.classList.remove("active"))

      // Add active class to clicked item and corresponding panel
      this.classList.add("active")
      document.getElementById(`${settingsName}-panel`)?.classList.add("active")
    })
  })

  // Theme Toggle
  // const themeToggleCheckbox = document.getElementById("theme-toggle-checkbox")
  // const body = document.body

  // // Check for saved theme preference
  // const savedTheme = localStorage.getItem("theme")
  // if (savedTheme === "dark") {
  //   body.classList.add("dark-mode")
  //   themeToggleCheckbox.checked = true
  // }

  // if (themeToggleCheckbox) {
  //   themeToggleCheckbox.addEventListener("change", () => {
  //     body.classList.toggle("dark-mode")

  //     if (body.classList.contains("dark-mode")) {
  //       localStorage.setItem("theme", "dark")
  //     } else {
  //       localStorage.setItem("theme", "light")
  //     }
  //   })
  // }

  // Color Theme Selection
  const colorOptions = document.querySelectorAll('input[name="accent-color"]')

  // Check for saved color preference
  const savedColor = localStorage.getItem("color-theme")
  if (savedColor) {
    document.body.classList.add(`theme-${savedColor}`)
    document.querySelector(`input[value="${savedColor}"]`).checked = true
  }

  colorOptions.forEach((option) => {
    option.addEventListener("change", function () {
      // Remove all theme classes
      document.body.classList.remove("theme-purple", "theme-teal", "theme-orange")

      // Add selected theme class
      if (this.value !== "blue") {
        document.body.classList.add(`theme-${this.value}`)
        localStorage.setItem("color-theme", this.value)
      } else {
        localStorage.removeItem("color-theme")
      }
    })
  })

  // Logout Modal
  const logoutTrigger = document.getElementById("logout-trigger")
  const logoutModal = document.getElementById("logout-modal")
  const cancelLogout = document.getElementById("cancel-logout")
  const confirmLogout = document.getElementById("confirm-logout")
  const closeModalBtns = document.querySelectorAll(".close-modal")

  if (logoutTrigger) {
    logoutTrigger.addEventListener("click", (e) => {
      e.preventDefault()
      logoutModal.classList.add("active")
    })
  }

  if (cancelLogout) {
    cancelLogout.addEventListener("click", () => {
      logoutModal.classList.remove("active")
    })
  }

  if (confirmLogout) {
    confirmLogout.addEventListener("click", () => {
      // Redirect to logout page or perform logout action
      alert("Logged out successfully!")
      window.location.href = "index.html"
    })
  }

  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal")
      modal.classList.remove("active")
    })
  })

  // Emergency Button
  const emergencyBtn = document.getElementById("emergency-btn")
  const emergencyModal = document.getElementById("emergency-modal")
  const cancelEmergency = document.getElementById("cancel-emergency")
  const confirmEmergency = document.getElementById("confirm-emergency")

  if (emergencyBtn) {
    emergencyBtn.addEventListener("click", () => {
      emergencyModal.classList.add("active")
    })
  }

  if (cancelEmergency) {
    cancelEmergency.addEventListener("click", () => {
      emergencyModal.classList.remove("active")
    })
  }

  if (confirmEmergency) {
    confirmEmergency.addEventListener("click", () => {
      // Perform emergency action
      alert("Emergency alert sent! Your location has been shared with your emergency contacts.")
      emergencyModal.classList.remove("active")
    })
  }

  // Close modals when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      event.target.classList.remove("active")
    }

    if (event.target.classList.contains("search-overlay")) {
      event.target.classList.remove("active")
    }
  })

  // Post Ride Form Submission
  const postRideForm = document.getElementById("post-ride-form")

  if (postRideForm) {
    postRideForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Show success message
      alert("Ride posted successfully!")

      // Redirect to dashboard
      navItems.forEach((navItem) => navItem.classList.remove("active"))
      document.querySelector('[data-page="dashboard"]').classList.add("active")

      pages.forEach((page) => {
        page.classList.remove("active")
      })
      document.getElementById("dashboard-page").classList.add("active")
    })
  }

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".stat-card, .ride-card, .activity-item, .route-card")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (elementPosition < screenPosition) {
        element.style.transform = "translateY(0)"
        element.style.opacity = "1"
      }
    })
  }

  // Set initial state for animation
  const elementsToAnimate = document.querySelectorAll(".stat-card, .ride-card, .activity-item, .route-card")
  elementsToAnimate.forEach((element) => {
    element.style.transform = "translateY(20px)"
    element.style.opacity = "0"
    element.style.transition = "transform 0.5s ease, opacity 0.5s ease"
  })

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)
})

// Add this to the DOMContentLoaded event listener

// Enhanced Notifications functionality
document.addEventListener("DOMContentLoaded", () => {
  const notifications = document.querySelector(".notifications")
  const markAllReadBtn = document.querySelector(".mark-all-read")
  const notificationMarkReadBtns = document.querySelectorAll(".notification-mark-read")
  const notificationBadge = document.querySelector(".notification-badge")

  if (markAllReadBtn) {
    markAllReadBtn.addEventListener("click", () => {
      const unreadNotifications = document.querySelectorAll(".notification-item.unread")
      unreadNotifications.forEach((notification) => {
        notification.classList.remove("unread")
      })

      // Update notification badge
      notificationBadge.style.display = "none"
    })
  }

  notificationMarkReadBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation() // Prevent closing the dropdown
      const notificationItem = this.closest(".notification-item")
      notificationItem.classList.remove("unread")

      // Update notification badge count
      const unreadCount = document.querySelectorAll(".notification-item.unread").length

      if (unreadCount === 0) {
        notificationBadge.style.display = "none"
      } else {
        notificationBadge.textContent = unreadCount
      }
    })
  })

  // Keep dropdowns open when clicking inside them
  document.querySelectorAll(".notifications-dropdown, .user-menu").forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      e.stopPropagation()
    })
  })

  // Enhanced Color Theme Selection
  const colorOptions = document.querySelectorAll('input[name="accent-color"]')

  // Check for saved color preference
  const savedColor = localStorage.getItem("color-theme")
  if (savedColor) {
    document.body.classList.add(`theme-${savedColor}`)
    const colorInput = document.querySelector(`input[value="${savedColor}"]`)
    if (colorInput) {
      colorInput.checked = true
    }
  }

  colorOptions.forEach((option) => {
    option.addEventListener("change", function () {
      // Remove all theme classes
      document.body.classList.remove("theme-purple", "theme-teal", "theme-orange", "theme-green", "theme-red")

      // Add selected theme class
      if (this.value !== "blue") {
        document.body.classList.add(`theme-${this.value}`)
        localStorage.setItem("color-theme", this.value)
      } else {
        localStorage.removeItem("color-theme")
      }
    })
  })

  // Enhanced Theme Toggle Animation
  document.getElementById("theme-toggle-checkbox")?.addEventListener("change", () => {
    // Add animation effect
    const toggleSwitch = document.querySelector(".theme-toggle-switch")
    if (toggleSwitch) {
      toggleSwitch.classList.add("animating")
      setTimeout(() => {
        toggleSwitch.classList.remove("animating")
      }, 500)
    }
  })
})

