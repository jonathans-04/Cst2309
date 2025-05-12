// contact.js
document.addEventListener('DOMContentLoaded', () => {
    const slides = [
      'contact1.jpg',
      'contact2.jpg',
      'contact3.jpg'
    ];
    let current = 0;
  
    const img = document.getElementById('contactSlide');
    const next = document.getElementById('nextContact');
    const prev = document.getElementById('prevContact');
  
    console.log('Slideshow JS loaded:', { img, prev, next });
  
    function show(idx) {
      current = (idx + slides.length) % slides.length;
      img.src = slides[current];
    }
  
    // guard in case something is null
    if (!img || !next || !prev) return;
  
    show(0);
  
    next.addEventListener('click', () => {
      console.log('Next clicked');
      show(current + 1);
    });
    prev.addEventListener('click', () => {
      console.log('Prev clicked');
      show(current - 1);
    });
  
    setInterval(() => show(current + 1), 5000);
  });
  