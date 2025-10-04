// Utility function to display non-blocking messages (replacing alert())
function alertMessage(message, type = 'info') {
    const typeClass = type === 'success' ? 'alert-success' : 
                      type === 'error' ? 'alert-error' : 'alert-info';

    const container = document.createElement('div');
    container.className = `alert-message ${typeClass}`;
    container.textContent = message;

    document.body.appendChild(container);

    setTimeout(() => {
        container.style.opacity = '0';
        container.addEventListener('transitionend', () => container.remove());
    }, 3000);
}

// Function for horizontal menu slider
function scrollSlider(direction) {
    const slider = document.getElementById('slider');
    if (!slider) return;

    const card = slider.querySelector('.card');
    if (!card) return;

    const cardWidth = card.offsetWidth + 20; 
    slider.scrollBy({
        left: direction * cardWidth,
        behavior: 'smooth'
    });
}

// Function to initialize all dynamic scripts
function initWebsiteScripts() {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
    } else {
        console.error("Lucide icons library not loaded or createIcons function missing.");
    }

    // 2. Handle Subscription Form Submission
    const subscribeForm = document.getElementById('subscribe-form');
    const emailField = document.getElementById('emailInput');

    if (subscribeForm && emailField) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault(); // stop default submit

            const email = emailField.value.trim();

            // Validate email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alertMessage("❌ Please enter a valid email address.", "error");
                return;
            }

            // Submit to Google Sheets
            fetch(subscribeForm.action, {
                method: "POST",
                body: new FormData(subscribeForm)
            })
            .then(() => {
                alertMessage("✅ Thanks for subscribing! Your email has been saved.", "success");
                subscribeForm.reset();
            })
            .catch(() => {
                alertMessage("⚠️ Something went wrong. Please try again later.", "error");
            });
        });
    }
}

function toggleProducts(button) {
    const moreProducts = button.previousElementSibling.querySelector('.more-products');
    if (moreProducts.style.display === "none") {
        moreProducts.style.display = "block";
        button.textContent = "View Less";
    } else {
        moreProducts.style.display = "none";
        button.textContent = "View More";
    }
}

// Wait for the entire document content to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', initWebsiteScripts);
