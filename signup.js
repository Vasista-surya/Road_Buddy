document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    // Password strength meter
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Calculate password strength
            if (password.length >= 8) strength += 25;
            if (password.match(/[A-Z]/)) strength += 25;
            if (password.match(/[0-9]/)) strength += 25;
            if (password.match(/[^A-Za-z0-9]/)) strength += 25;
            
            // Update strength bar
            strengthBar.style.width = strength + '%';
            
            // Update color and text based on strength
            if (strength <= 25) {
                strengthBar.style.backgroundColor = '#f44336';
                strengthText.textContent = 'Weak password';
                strengthText.style.color = '#f44336';
            } else if (strength <= 50) {
                strengthBar.style.backgroundColor = '#ff9800';
                strengthText.textContent = 'Fair password';
                strengthText.style.color = '#ff9800';
            } else if (strength <= 75) {
                strengthBar.style.backgroundColor = '#4CAF50';
                strengthText.textContent = 'Good password';
                strengthText.style.color = '#4CAF50';
            } else {
                strengthBar.style.backgroundColor = '#2E7D32';
                strengthText.textContent = 'Strong password';
                strengthText.style.color = '#2E7D32';
            }
        });
    }
    
    // Form submission
    const signupForm = document.getElementById('signup-form');
    const confirmPassword = document.getElementById('confirm-password');
    
    if (signupForm && passwordInput && confirmPassword) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if passwords match
            if (passwordInput.value !== confirmPassword.value) {
                alert('Passwords do not match!');
                return;
            }
            
            // Add loading animation to button
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
            submitBtn.disabled = true;
            
            // Update progress steps
            const steps = document.querySelectorAll('.progress-step');
            steps[0].classList.add('completed');
            steps[1].classList.add('active');
            
            // Simulate API call
            setTimeout(() => {
                // For demo purposes - in a real app, you would send data to a server
                steps[1].classList.add('completed');
                steps[2].classList.add('active');
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Account Created!';
                submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
                
                // Show success message
                const formBox = document.querySelector('.form-box');
                formBox.innerHTML = `
                    <div class="success-animation">
                        <div class="checkmark-circle">
                            <div class="checkmark draw"></div>
                        </div>
                    </div>
                    <h2 class="success-title">Registration Successful!</h2>
                    <p class="success-text">Your account has been created successfully.</p>
                    <p class="success-text">A verification email has been sent to your email address.</p>
                    <a href="login.html" class="success-btn">Proceed to Login</a>
                `;
                
                // Add success styles
                const successStyle = document.createElement('style');
                successStyle.textContent = `
                    .success-animation {
                        margin: 30px auto;
                        width: 80px;
                        height: 80px;
                        position: relative;
                    }
                    .checkmark-circle {
                        width: 80px;
                        height: 80px;
                        position: relative;
                        background: #4CAF50;
                        border-radius: 50%;
                        animation: checkmark-circle 0.5s ease-in-out;
                    }
                    .checkmark {
                        border-radius: 0;
                        left: 27px;
                        top: 40px;
                        width: 25px;
                        height: 12.5px;
                        border-left: 4px solid white;
                        border-bottom: 4px solid white;
                        transform: rotate(-45deg);
                        position: absolute;
                        animation: checkmark 0.25s ease-in-out 0.5s forwards;
                        opacity: 0;
                    }
                    @keyframes checkmark-circle {
                        0% { transform: scale(0); }
                        100% { transform: scale(1); }
                    }
                    @keyframes checkmark {
                        0% { opacity: 0; }
                        100% { opacity: 1; }
                    }
                    .success-title {
                        color: #4CAF50;
                        text-align: center;
                        margin-bottom: 20px;
                        animation: fadeInUp 0.5s ease-out;
                    }
                    .success-text {
                        text-align: center;
                        color: #666;
                        margin-bottom: 10px;
                        animation: fadeInUp 0.5s ease-out 0.2s forwards;
                        opacity: 0;
                    }
                    .success-text:nth-child(4) {
                        animation-delay: 0.4s;
                    }
                    .success-btn {
                        display: block;
                        width: 200px;
                        margin: 30px auto 0;
                        padding: 12px;
                        background: linear-gradient(135deg, #4CAF50, #2E7D32);
                        color: white;
                        text-align: center;
                        border-radius: 8px;
                        text-decoration: none;
                        font-weight: 600;
                        animation: fadeInUp 0.5s ease-out 0.6s forwards;
                        opacity: 0;
                        transition: all 0.3s ease;
                    }
                    .success-btn:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                    }
                `;
                document.head.appendChild(successStyle);
                
            }, 3000);
        });
    }
    
    // Input animations
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focus');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focus');
        });
    });
    
    // Social login buttons animation
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        btn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
            
            setTimeout(() => {
                this.innerHTML = this.classList.contains('google') ? 
                    '<i class="fab fa-google"></i> <span>Sign up with Google</span>' : 
                    '<i class="fab fa-facebook-f"></i> <span>Sign up with Facebook</span>';
            }, 2000);
        });
    });
});