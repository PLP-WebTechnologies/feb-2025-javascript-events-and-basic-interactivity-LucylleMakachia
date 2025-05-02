// 1. Event Handling 🎈
const myButton = document.getElementById('myButton');
const hoverElement = document.getElementById('hoverMe');
const doubleClickElement = document.getElementById('doubleClickMe');
const longPressElement = document.getElementById('longPressMe');
let pressTimer;

myButton.addEventListener('click', function() {
  alert('Button clicked! 🎉');
  console.log('Button was clicked');
});

hoverElement.addEventListener('mouseover', function() {
  hoverElement.style.backgroundColor = 'lightblue';
  hoverElement.textContent = 'Hovering!';
});

hoverElement.addEventListener('mouseout', function() {
  hoverElement.style.backgroundColor = '';
  hoverElement.textContent = 'Hover Over Me';
});

document.addEventListener('keypress', function(event) {
  console.log(`You pressed the '${event.key}' key.`);
  const keyDisplay = document.getElementById('keyDisplay');
  if (keyDisplay) {
    keyDisplay.textContent = `Last key pressed: ${event.key}`;
  }
});

doubleClickElement.addEventListener('dblclick', function() {
  alert('Double-clicked! You found the secret!');
});

if (longPressElement) {
  longPressElement.addEventListener('mousedown', function() {
    pressTimer = setTimeout(function() {
      alert('Long press detected! Secret unlocked!');
    }, 1500);
  });

  longPressElement.addEventListener('mouseup', function() {
    clearTimeout(pressTimer);
  });

  longPressElement.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });
}

// 2. Interactive Elements 🎮
const changeButton = document.getElementById('changeButton');
let isColorRed = false;

changeButton.addEventListener('click', function() {
  if (isColorRed) {
    changeButton.textContent = 'Change to Red';
    changeButton.style.backgroundColor = 'green';
  } else {
    changeButton.textContent = 'Change to Green';
    changeButton.style.backgroundColor = 'red';
  }
  isColorRed = !isColorRed;
});

const galleryImages = document.querySelectorAll('.gallery-image');
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');
let currentIndex = 0;

function showImage(index) {
  galleryImages.forEach((img, i) => {
    img.style.display = i === index ? 'block' : 'none';
  });
}

function nextImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(currentIndex);
}

if (prevButton && nextButton && galleryImages.length > 0) {
  prevButton.addEventListener('click', prevImage);
  nextButton.addEventListener('click', nextImage);
  showImage(currentIndex); // Show the first image initially
}

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', function() {
    const tabId = this.getAttribute('data-tab');

    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    this.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  });
});

if (tabButtons.length > 0) {
  tabButtons[0].click(); // Activate the first tab by default
}

const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', function() {
    const content = this.nextElementSibling;
    const isActive = content.classList.contains('active');

    document.querySelectorAll('.accordion-content.active').forEach(item => {
      if (item !== content) {
        item.classList.remove('active');
        item.style.maxHeight = null;
      }
    });

    content.classList.toggle('active');
    content.style.maxHeight = isActive ? null : content.scrollHeight + 'px';
  });
});

const animatedDiv = document.getElementById('animatedDiv');
const startAnimationButton = document.getElementById('startAnimation');

function animateDivElement() {
  let position = 0;
  const interval = setInterval(frame, 20);

  function frame() {
    if (position === 150) {
      clearInterval(interval);
    } else {
      position++;
      animatedDiv.style.left = position + 'px';
    }
  }
}

if (startAnimationButton && animatedDiv) {
  startAnimationButton.addEventListener('click', animateDivElement);
}

// 3. Form Validation 📋✅
const form = document.getElementById('myForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessages = document.querySelectorAll('.error-message');

if (form) {
  form.addEventListener('submit', function(event) {
    let isValid = true;

    errorMessages.forEach(msg => msg.textContent = '');

    if (nameInput.value.trim() === '') {
      document.getElementById('nameError').textContent = 'Name is required.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
      document.getElementById('emailError').textContent = 'Email is required.';
      isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
      document.getElementById('emailError').textContent = 'Invalid email format.';
      isValid = false;
    }

    if (passwordInput.value.trim() === '') {
      document.getElementById('passwordError').textContent = 'Password is required.';
      isValid = false;
    } else if (passwordInput.value.length < 8) {
      document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long.';
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault();
    } else {
      alert('Form submitted successfully!');
      // You would typically handle form submission here (e.g., sending data to a server)
    }
  });
}

if (nameInput) {
  nameInput.addEventListener('input', function() {
    document.getElementById('nameError').textContent = nameInput.value.trim() === '' ? 'Name is required.' : '';
  });
}

if (emailInput) {
  emailInput.addEventListener('input', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorElement = document.getElementById('emailError');
    if (emailInput.value.trim() === '') {
      errorElement.textContent = 'Email is required.';
    } else if (!emailRegex.test(emailInput.value)) {
      errorElement.textContent = 'Invalid email format.';
    } else {
      errorElement.textContent = '';
    }
  });
}

if (passwordInput) {
  passwordInput.addEventListener('input', function() {
    const errorElement = document.getElementById('passwordError');
    if (passwordInput.value.trim() === '') {
      errorElement.textContent = 'Password is required.';
    } else if (passwordInput.value.length < 8) {
      errorElement.textContent = 'Password must be at least 8 characters long.';
    } else {
      errorElement.textContent = '';
    }
  });
}