// Header
const menu = document.querySelector(".menu");
const openMenuBtn = document.querySelector(".open-menu-btn");
const closeMenuBtn = document.querySelector(".close-menu-btn");

function openMenu() {
    menu.classList.add("open");
    menu.style.transition = "transform 0.5s ease";
    document.body.style.overflow = 'hidden'; 
    updateAria(openMenuBtn, true);
}

function closeMenu() {
    menu.classList.remove("open");
    menu.style.transition = "transform 0.5s ease";
    document.body.style.overflow = ''; 
    updateAria(openMenuBtn, false);
}

function updateAria(button, isOpen) {
    button.setAttribute("aria-expanded", isOpen);
}

openMenuBtn.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);

menu.addEventListener("transitionend", function() {
    this.removeAttribute("style");
});

menu.querySelectorAll(".dropdown > i").forEach((arrow) => {
    arrow.addEventListener("click", function() {
        const dropdown = this.closest(".dropdown");
        dropdown.classList.toggle("active");
        const isMobileOrTablet = window.matchMedia("(max-width: 991px)").matches;
        
        if (isMobileOrTablet) {
            const iconClass = dropdown.classList.contains("active") 
                ? "fa-solid fa-chevron-up" 
                : "fa-solid fa-chevron-down";
            this.className = iconClass; 
        }
        
        updateAria(this, dropdown.classList.contains("active"));
    });
});

const header = document.querySelector('header');

const changeHeaderOnScroll = () => {
    if (window.scrollY > 0) { 
        header.classList.add('scrolled');
        openMenuBtn.classList.add('scrolled'); 
    } else {
        header.classList.remove('scrolled');
        openMenuBtn.classList.remove('scrolled'); 
    }
};
window.addEventListener('scroll', changeHeaderOnScroll);




// About Us 
const aboutItems = document.querySelectorAll('.about-item');

aboutItems.forEach(item => {
    item.addEventListener('click', () => {    
        aboutItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                const content = otherItem.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                }
            }
        });
        item.classList.toggle('active');
        const content = item.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});



// Ranking section
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter-number');
  
    const updateCount = (counter) => {
        const target = +counter.getAttribute('data-to-value'); 
        const count = +counter.innerText.replace(/\D/g, ''); 
        const speed = 1000; 
        const increment = Math.ceil(target / (speed / 100)); 

        if (count < target) {
            counter.innerText = count + increment + (counter.innerText.match(/\D+/) ? counter.innerText.match(/\D+/)[0] : ''); 
            setTimeout(() => updateCount(counter), 100);
        } else {
            counter.innerText = target + (counter.innerText.match(/\D+/) ? counter.innerText.match(/\D+/)[0] : ''); 
        }
    };
    const onIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                updateCount(counter); 
                observer.unobserve(counter); 
            }
        });
    };   
    const observer = new IntersectionObserver(onIntersection, {
        threshold: 0.5 
    });
    counters.forEach(counter => {
        observer.observe(counter);
    });
});


// Portfolio 
document.addEventListener("DOMContentLoaded", function () {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const updateProgressBar = (bar) => {
        const value = parseInt(bar.getAttribute('data-value'), 10); 
        const fill = bar.querySelector('.skill-fill');
        const percentageText = bar.querySelector('.number-percentage');

        fill.style.width = value + '%'; 

        let count = 0;
        const updatePercentage = () => {
            if (count < value) {
                percentageText.innerText = count + '%';
                count++;
                const delay = Math.floor(1000 / value); 
                setTimeout(updatePercentage, delay);
            } else {
                percentageText.innerText = value + '%';
            }
        };
        updatePercentage();
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateProgressBar(entry.target);
            }
        });
    }, { threshold: 0.6 }); 

    progressBars.forEach(bar => {
        observer.observe(bar); 
    });
});



// Companies Logo

const carouselInner = document.querySelector('.company-carousel-inner');

const logoItems = carouselInner.innerHTML;
carouselInner.innerHTML += logoItems;








