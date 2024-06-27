let currentIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelector('.carousel-slide');
    const totalSlides = slides.children.length;
    
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }
    const translateX = -currentIndex * 650;
    slides.style.transform = `translateX(${translateX}px)`;
    console.log("rodou aqui");
}
const intervalo = 4000;

const par = 1
setInterval(() => moveSlide(par), intervalo);