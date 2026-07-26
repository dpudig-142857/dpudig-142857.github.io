const progressBar = document.getElementById('scroll-progress');

function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress(); // set initial state on load

const triggerWord = 'dan';
let typedBuffer = '';
let chaosActive = false;

document.addEventListener('keydown', (e) => {
    if (e.key.length !== 1) return; // ignore Shift, Enter, arrows, etc.
    typedBuffer += e.key.toLowerCase();
    typedBuffer = typedBuffer.slice(-triggerWord.length); // keep buffer same length as trigger word

    if (typedBuffer === triggerWord) {
        triggerChaosMode();
        typedBuffer = '';
    }
});

function triggerChaosMode() {
    if (chaosActive) return;
    chaosActive = true;
    
    document.getElementById('page-wrapper').classList.add('chaos-pulse');

    const banner = document.createElement('div');
    banner.className = 'chaos-banner shake';
    banner.textContent = "DAN'S CHAOS MODE ACTIVATED";
    document.body.appendChild(banner);

    document.title = 'CHAOS MODE';
    
    //const targets = document.querySelector('.skill-box, .qual-box, .project-box, .about-box');
    const targets = document.querySelectorAll('.shake');
    targets.forEach(el => {
        el.style.animationDelay = `${Math.random() * 0.3}s`;
        el.classList.add('chaos-shake');
    });
    
    // falling dino emoji rain
    const emojiInterval = setInterval(() => {
        const emoji = document.createElement('div');
        emoji.className = 'chaos-emoji';
        emoji.innerHTML = '<img src="images/favicon.ico" alt="">';
        emoji.style.left = `${Math.random() * 100}vw`;
        const duration = 2 + Math.random() * 2;
        emoji.style.animationDuration = `${duration}s`;
        document.body.appendChild(emoji);
        setTimeout(() => emoji.remove(), duration * 1000);
    }, 120);
    
    setTimeout(() => {
        clearInterval(emojiInterval);
        document.getElementById('page-wrapper').classList.remove('chaos-pulse');
        targets.forEach(el => {
            el.classList.remove('chaos-shake');
            el.style.animationDelay = '';
        });
        banner.style.animation = 'bannerPop 0.3s ease-in reverse';
        document.title = `Dan Pudig's Portfolio Website`;
        setTimeout(() => banner.remove(), 300);
        chaosActive = false;
    }, 10000); // chaos lasts 10 seconds
}

/*const konamiCode = ['d', 'a', 'n'];
//const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;
let chaosActive = false;

document.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            triggerChaosMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = key === konamiCode[0] ? 1 : 0;
    }
});

function triggerChaosMode() {
    if (chaosActive) return; // prevent re-trigger while already running
    chaosActive = true;

    const banner = document.createElement('div');
    banner.className = 'chaos-banner';
    banner.textContent = '🦖 CHAOS MODE ACTIVATED 🦖';
    document.body.appendChild(banner);

    const targets = document.querySelectorAll('.skill-box, .qual-box, .project-box, .about-box');
    targets.forEach(el => {
        el.style.animationDelay = `${Math.random() * 0.3}s`;
        el.classList.add('chaos-shake');
    });

    setTimeout(() => {
        targets.forEach(el => {
            el.classList.remove('chaos-shake');
            el.style.animationDelay = '';
        });
        banner.style.animation = 'bannerPop 0.3s ease-in reverse';
        setTimeout(() => banner.remove(), 300);
        chaosActive = false;
    }, 10000); // chaos lasts 10 seconds
}*/

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        const headerOffset = document.querySelector('header').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const offset = window.pageYOffset;
    hero.style.backgroundPositionY = `${offset * 0.4}px`;
});

const heroSection = document.querySelector('#home');
let lastFootprint = 0;
let lastX = null;
let lastY = null;
let stepSide = 'left';

heroSection.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastFootprint < 180) return; // throttle for spacing between steps
    lastFootprint = now;

    let angle = 0;
    if (lastX !== null) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90; // point "feet" in movement direction
    }
    lastX = e.clientX;
    lastY = e.clientY;

    const footprint = document.createElement('div');
    footprint.className = `footprint ${stepSide}`;
    footprint.style.left = `${e.clientX}px`;
    footprint.style.top = `${e.clientY}px`;
    footprint.style.setProperty('--rotate', `${angle}deg`);
    document.body.appendChild(footprint);

    stepSide = stepSide === 'left' ? 'right' : 'left'; // alternate feet each step

    setTimeout(() => footprint.remove(), 900);
});

const typedPhrases = [
    'Solving problems, one semicolon at a time',
    'Turning data into decisions',
    'Junior Data Analyst @ Channel Seven',
    'Frontend developer at heart',
    'Always learning, always building',
    'Querying my way through life',
    'SQL by day, side projects by night',
    'Bachelor of Science in CS & Maths',
    'Databricks certified, water powered',
    'Turning messy data into clean insights',
    'Building dashboards that actually make sense',
    'Strategy games are my other debugging hobby',
    'UNSW grad, forever a student',
    'Clean code, clean charts',
    'One semicolon, one insight at a time',
    'Automating the boring stuff since forever'
];

function shufflePhrases(arr, avoidFirst = null) {
    let shuffled;
    do {
        shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
    } while (avoidFirst !== null && shuffled[0] === avoidFirst && arr.length > 1);
    return shuffled;
}

function typeLoop(elementId, phrases, { typeSpeed = 55, deleteSpeed = 30, pause = 1800 } = {}) {
    const el = document.getElementById(elementId);
    let order = shufflePhrases(phrases);
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
        const currentPhrase = order[phraseIndex];

        if (!deleting) {
            el.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentPhrase.length) {
                deleting = true;
                setTimeout(tick, pause);
                return;
            }
        } else {
            el.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                phraseIndex++;
                if (phraseIndex === order.length) {
                    const lastPhrase = order[order.length - 1];
                    order = shufflePhrases(phrases, lastPhrase); // reshuffle, but not starting with the phrase we just showed
                    phraseIndex = 0;
                }
            }
        }

        setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
    }

    tick();
}

typeLoop('typed-text', typedPhrases);

const skillBoxes = document.querySelectorAll('.skill-box');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const box = entry.target;
            const level = parseInt(box.dataset.level, 10);
            const circumference = 283;
            const offset = circumference - (level / 100) * circumference;
            const ringFill = box.querySelector('.ring-fill');
            ringFill.style.setProperty('--offset', offset);
            box.classList.add('in-view');
            skillObserver.unobserve(box);
        }
    });
}, { threshold: 0.4 });

skillBoxes.forEach(box => skillObserver.observe(box));

var form = document.getElementById("contact-s");
  
async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("contact-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Thanks for your submission!";
            form.reset()
        } else {
            response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
                status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
                status.innerHTML = "Oops! There was a problem submitting your form"
            }
            })
        }
    }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
    });
}

form.addEventListener("submit", handleSubmit);

function openModal(id) {
    document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Optional: Close when clicking outside the modal
window.onclick = function(event) {
    document.querySelectorAll('.modal').forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};

const arcadeCarousel = createCarousel({
    images: [
        'images/projects/arcade_0.webp',
        'images/projects/arcade_1.webp',
        'images/projects/arcade_2.webp',
        'images/projects/arcade_3.webp',
        'images/projects/arcade_4.webp',
        'images/projects/arcade_5.webp'
    ],
    imageId: 'arcadeImage',
    counterId: 'arcadeCounter'
});

const taxCarousel = createCarousel({
    images: ['images/projects/tax_calculator_0.webp'],
    imageId: 'taxImage',
    counterId: 'taxCounter'
});

const metabolomicsCarousel = createCarousel({
    images: ['images/projects/metabolomics_0.webp'],
    imageId: 'metabolomicsImage',
    counterId: 'metabolomicsCounter'
});

const gogCarousel = createCarousel({
    images: ['images/projects/gog_0.webp'],
    imageId: 'gogImage',
    counterId: 'gogCounter'
});

function createCarousel({ images, imageId, counterId }) {
    let currentIndex = 0;

    function show(index) {
        const img = document.getElementById(imageId);
        const counter = document.getElementById(counterId);
        img.src = images[index];
        counter.textContent = `${index + 1} / ${images.length}`;
    }

    function next() {
        currentIndex = (currentIndex + 1) % images.length;
        show(currentIndex);
    }

    function prev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        show(currentIndex);
    }

    show(currentIndex);

    return { next, prev, show };
}

document.querySelector('footer p').textContent = `© ${new Date().getFullYear()} Dan Pudig`;