const dropdownBtn = document.querySelector(".dropbtn");
const dropdownMenu = document.querySelector(".dropdown-menu");
const arrow = document.querySelector(".arrow");

if (dropdownBtn && dropdownMenu) {
  dropdownBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const isOpen = dropdownMenu.style.display === "block";

    dropdownMenu.style.display = isOpen ? "none" : "block";
    arrow.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
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