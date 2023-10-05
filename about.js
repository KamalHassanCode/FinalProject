var navbar = document.querySelector("header");

// Get the initial position of the navbar
var navbarPosition = navbar.offsetTop;

// Function to handle scroll events
function handleScroll() {
    // Check if the user has scrolled past the initial position of the navbar
    if (window.pageYOffset >= navbarPosition) {
        navbar.style.top = "0"; // Show the navbar
    } else {
        navbar.style.top = "-80px"; // Hide the navbar
    }
}

// Add a scroll event listener
window.addEventListener("scroll", handleScroll);






let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slideIndex++;
    
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    slides[slideIndex - 1].style.display = "block";
    
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}

showSlides(); // Start the slideshow

