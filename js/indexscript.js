
    document.addEventListener('DOMContentLoaded', function() {
        const contents = document.querySelectorAll('.hide-on-scroll');

        window.addEventListener('scroll', revealContent);

        function revealContent() {
            for (let content of contents) {
                let contentPosition = content.getBoundingClientRect().top;
                let screenPosition = window.innerHeight / 1.3;  // Adjust this value for the reveal position
                
                if (contentPosition < screenPosition) {
                    content.style.opacity = "1";
                    content.style.transform = 'translateY(0)';
                    content.style.visibility = 'visible';
                }
            }
        }

        revealContent();  // Initial check in case the user has a large screen
    });

