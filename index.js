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

const arcadeImages = [
  'projects/arcade_0.png',
  'projects/arcade_1.png',
  'projects/arcade_2.png',
  'projects/arcade_3.png',
  'projects/arcade_4.png',
  'projects/arcade_5.png'
];

let currArcade = 0;

function showArcade(index) {
  const img = document.getElementById('arcadeImage');
  const counter = document.getElementById('arcadeCounter');
  img.src = arcadeImages[index];
  counter.textContent = `${index + 1} / ${arcadeImages.length}`;
}

function nextArcade() {
  currArcade = (currArcade + 1) % arcadeImages.length;
  showArcade(currArcade);
}

function prevArcade() {
  currArcade = (currArcade - 1 + arcadeImages.length) % arcadeImages.length;
  showArcade(currArcade);
}

const taxImages = [
    'projects/tax_calculator_0.png'
];

let currTax = 0;

function showTax(index) {
  const img = document.getElementById('taxImage');
  const counter = document.getElementById('taxCounter');
  img.src = taxImages[index];
  counter.textContent = `${index + 1} / ${taxImages.length}`;
}

function nextTax() {
  currTax = (currTax + 1) % taxImages.length;
  showMetabolomics(currTax);
}

function prevTax() {
  currTax = (currTax - 1 + taxImages.length) % taxImages.length;
  showMetabolomics(currTax);
}

const metabolomicsImages = [
    'projects/metabolomics_0.png'
];

let currMetabolomics = 0;

function showMetabolomics(index) {
  const img = document.getElementById('metabolomicsImage');
  const counter = document.getElementById('metabolomicsCounter');
  img.src = metabolomicsImages[index];
  counter.textContent = `${index + 1} / ${metabolomicsImages.length}`;
}

function nextMetabolomics() {
  currMetabolomics = (currMetabolomics + 1) % metabolomicsImages.length;
  showMetabolomics(currMetabolomics);
}

function prevMetabolomics() {
  currMetabolomics = (currMetabolomics - 1 + metabolomicsImages.length) % metabolomicsImages.length;
  showMetabolomics(currMetabolomics);
}

const gogImages = [
    'projects/gog_0.png'
];

let currGoG = 0;

function showGoG(index) {
  const img = document.getElementById('gogImage');
  const counter = document.getElementById('gogCounter');
  img.src = gogImages[index];
  counter.textContent = `${index + 1} / ${gogImages.length}`;
}

function nextGoG() {
  currGoG = (currGoG + 1) % gogImages.length;
  showGoG(currGoG);
}

function prevGoG() {
  currGoG = (currGoG - 1 + gogImages.length) % gogImages.length;
  showGoG(currGoG);
}