// js/membership.js
document.addEventListener('DOMContentLoaded', () => {
    // — Slideshow —
    const slides = document.querySelectorAll('.slide');
    let current = 0;
    function show(idx) {
      slides.forEach((s,i) => s.style.display = i === idx ? 'block' : 'none');
    }
    function next() {
      current = (current + 1) % slides.length;
      show(current);
    }
    show(current);
    setInterval(next, 3000);
  
    // — Elements & setup —
    const form = document.getElementById('membershipForm');
    const cardInput = form.cardNumber;
    const cardTypeDisplay = document.getElementById('cardType');
    const cardSelect = form.cardTypeSelect;
  
    // — Card-type detection (now includes Discover) —
    function getCardType(num) {
      const patterns = {
        Visa:       /^4[0-9]{12}(?:[0-9]{3})?$/,
        MasterCard: /^5[1-5][0-9]{14}$/,
        Amex:       /^3[47][0-9]{13}$/,
        Discover:   /^6(?:011|5[0-9]{2})[0-9]{12}$/
      };
      for (const [name, regex] of Object.entries(patterns)) {
        if (regex.test(num)) return name;
      }
      return null;
    }
  
    // Show detected type as user types
    cardInput.addEventListener('input', () => {
      const num = cardInput.value.replace(/\D/g, '');
      const type = getCardType(num);
      cardTypeDisplay.textContent = type || '';
    });
  
    // — Luhn’s algorithm —
    function luhnCheck(num) {
      let sum = 0, dbl = false;
      for (let i = num.length - 1; i >= 0; i--) {
        let d = +num[i];
        if (dbl) {
          d *= 2;
          if (d > 9) d -= 9;
        }
        sum += d;
        dbl = !dbl;
      }
      return sum % 10 === 0;
    }
  
    // — Form submission validation —
    form.addEventListener('submit', e => {
      // Clear previous custom errors
      form.querySelectorAll('input, select').forEach(f => f.setCustomValidity(''));
  
      // 1) Built-in HTML5
      if (!form.checkValidity()) {
        form.reportValidity();
        e.preventDefault();
        return;
      }
  
      // 2) Expiry date
      const [y, m] = form.expiry.value.split('-').map(Number);
      const now = new Date();
      if (new Date(y, m - 1) < new Date(now.getFullYear(), now.getMonth())) {
        form.expiry.setCustomValidity('Expiry must be in the future.');
        form.reportValidity();
        e.preventDefault();
        return;
      }
  
      // 3) Luhn check
      const num = cardInput.value.replace(/\D/g, '');
      if (!luhnCheck(num)) {
        cardInput.setCustomValidity('Invalid card number.');
        form.reportValidity();
        e.preventDefault();
        return;
      }
  
      // 4) Card type support
      const detected = getCardType(num);
      if (!detected) {
        cardInput.setCustomValidity('Card type not supported.');
        form.reportValidity();
        e.preventDefault();
        return;
      }
  
      // 5) Match selected type
      if (cardSelect.value !== detected) {
        cardSelect.setCustomValidity(`Number does not match ${cardSelect.value}.`);
        form.reportValidity();
        e.preventDefault();
        return;
      }
      // All good → allow submit
    });
  });
  