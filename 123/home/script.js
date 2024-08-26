const panels = document.querySelectorAll('.panel');
let currentIndex = 0;

function setActivePanel(index) {
    removeActiveClasses();
    panels[index].classList.add('active');
}

function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
}

function autoScroll() {
    currentIndex++;
    if (currentIndex >= panels.length) {
        currentIndex = 0;
    }
    setActivePanel(currentIndex);
}

setActivePanel(currentIndex);

panels.forEach(panel => {
    panel.addEventListener('mouseover', () => {
        removeActiveClasses();
        panel.classList.add('active');
        currentIndex = Array.from(panels).indexOf(panel);
    });
    panel.addEventListener('mouseout', () => {
        removeActiveClasses();
        setActivePanel(currentIndex);
    });
    panel.addEventListener('click', () => {
        const link = panel.getAttribute('data-link');
        window.open(link, '_blank');
    });
});

setInterval(autoScroll, 3000);

document.addEventListener('DOMContentLoaded', () => {
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.5}s`;
    });
});



const button = document.getElementById('button')
const toasts = document.getElementById('toasts')

const messages = [
    'Message One',
    'Message Two',
    'Message Three',
    'Message Four',
]

const types = ['info', 'success', 'error']

button.addEventListener('click', () => createNotification())

function createNotification(message = null, type = null) {
    const notif = document.createElement('div')
    notif.classList.add('toast')
    notif.classList.add(type ? type : getRandomType())

    notif.innerText = message ? message : getRandomMessage()

    toasts.appendChild(notif)

    setTimeout(() => {
        notif.remove()
    }, 3000)
}

function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)]
}

function getRandomType() {
    return types[Math.floor(Math.random() * types.length)]
}
const features = document.querySelectorAll('.feature');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    } else {
      entry.target.classList.remove('animate');
    }
  });
}, { threshold: 0.1 });

features.forEach(feature => {
  observer.observe(feature);
});
// Get the header element
const header = document.querySelector('header');

// Add an event listener to the window scroll event
window.addEventListener('scroll', () => {
  // Get the current scroll position
  const scrollPosition = window.scrollY;

  // If the scroll position is greater than 0, hide the header
  if (scrollPosition > 0) {
    header.classList.add('hidden');
  } else {
    // Otherwise, show the header
    header.classList.remove('hidden');
  }
});

document.addEventListener("DOMContentLoaded", function () {
    var sidebar = document.querySelector(".sidebar");
    var hamburger = document.querySelector(".hamburger");

    hamburger.addEventListener("click", function () {
        // Toggle the hamburger icon animation
        hamburger.classList.toggle("is-active");

        // Toggle the sidebar visibility
        sidebar.classList.toggle("sidebar-visible");
    });
});


