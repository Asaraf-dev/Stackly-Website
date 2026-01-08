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