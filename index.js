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



/*const form = document.getElementById("contact-form");

form.addEventListener("submit", async function (e) {
    e.preventDefault(); // prevent default form submission
    const status = document.getElementById("form-status");

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/xyzabcde", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: formData
      });

      if (response.ok) {
        status.textContent = "Thanks for your message!";
        form.reset();
      } else {
        const result = await response.json();
        status.textContent = result.errors?.[0]?.message || "Oops! Something went wrong.";
      }
    } catch (error) {
      status.textContent = "Network error. Please try again.";
    }
});*/