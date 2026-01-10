// Dropdown
const dropdownBtn = document.querySelector(".dropbtn");
const dropdownMenu = document.querySelector(".dropdown-menu");
const arrow = document.querySelector(".arrow");

if(dropdownBtn && dropdownMenu){
    dropdownBtn.addEventListener("click", e => {
        e.preventDefault();
        const isOpen = dropdownMenu.style.display === "block";
        dropdownMenu.style.display = isOpen ? "none" : "block";
        arrow.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
    });

    document.addEventListener("click", e => {
        if(!e.target.closest(".dropdown")){
            dropdownMenu.style.display = "none";
            arrow.style.transform = "rotate(0deg)";
        }
    });
}

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// Navbar scroll
const header = document.getElementById("navbar");
window.addEventListener("scroll", ()=>{
    header.classList.toggle("scrolled", window.scrollY > 50);
});

// Animate main content only
const scrollElements = document.querySelectorAll("main h1,main h2,main h3,main h4,main h5,main h6,main p");
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("active");
            }
        });
    },
    { threshold:0.2 }
);
scrollElements.forEach(el => observer.observe(el));

const counters = document.querySelectorAll(".counter");

const runCounter = (counter) => {
    const target = +counter.dataset.target;
    let count = 0;
    const speed = 200;

    const update = () => {
        const increment = Math.ceil(target / speed);
        if (count < target) {
            count += increment;
            counter.innerText = count;
            setTimeout(update, 20);
        } else {
            counter.innerText = target;
        }
    };

    update();
};

// Trigger on scroll (only once)
const observer1 = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                observer1.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.6 }
);

counters.forEach(counter => observer1.observe(counter));

const canvas = document.getElementById("dustCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
const particleCount = 8;

class Dust {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        // Very small dust
        this.size = Math.random() * 1.5 + 1;

        // Slow cinematic movement
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;

        // Subtle opacity
        this.opacity = Math.random() * 0.08 + 0.02;

        // color
        this.color='#1E88C8';
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.hexToRGBA(this.color, this.opacity);
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    
        // 🔥 Direction-based color
        if (this.speedX > 0.01) {
            this.color = "#1E88C8"; // Blue
        } else if(this.speedX<-0.01){
            this.color = "#C4162A"; // Red
        }
    
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    hexToRGBA(hex, alpha) {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return 'rgba(${r}, ${g}, ${b}, ${alpha})';
    }
}

function initDust() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Dust());
    }
}

function animateDust() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateDust);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initDust();
});

initDust();
animateDust();