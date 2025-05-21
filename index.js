document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

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
        'projects/arcade_0.webp',
        'projects/arcade_1.webp',
        'projects/arcade_2.webp',
        'projects/arcade_3.webp',
        'projects/arcade_4.webp',
        'projects/arcade_5.webp'
    ],
    imageId: 'arcadeImage',
    counterId: 'arcadeCounter'
});

const taxCarousel = createCarousel({
    images: ['projects/tax_calculator_0.webp'],
    imageId: 'taxImage',
    counterId: 'taxCounter'
});

const metabolomicsCarousel = createCarousel({
    images: ['projects/metabolomics_0.webp'],
    imageId: 'metabolomicsImage',
    counterId: 'metabolomicsCounter'
});

const gogCarousel = createCarousel({
    images: ['projects/gog_0.webp'],
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