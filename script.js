/* ==================================================
   MOBILE MENU
================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


menuToggle.addEventListener("click", () => {

    mainNav.classList.toggle("active");


    if (mainNav.classList.contains("active")) {

        menuToggle.textContent = "✕";

    } else {

        menuToggle.textContent = "☰";

    }

});


/* Close menu after clicking a link */

const navLinks =
    document.querySelectorAll("#mainNav a");


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("active");

        menuToggle.textContent = "☰";

    });

});



/* ==================================================
   DARK / LIGHT MODE
================================================== */

const themeToggle =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.textContent = "☀️";

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");


    const darkMode =
        document.body.classList.contains("dark-mode");


    if (darkMode) {

        themeToggle.textContent = "☀️";

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        themeToggle.textContent = "🌙";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});



/* ==================================================
   SCROLL ANIMATION
================================================== */

const animatedElements =
    document.querySelectorAll(
        ".section-heading, .about-text, .about-info, .skill-card, .project-card, .cv-text, .cv-preview, .contact-text, .contact-form"
    );


animatedElements.forEach(element => {

    element.classList.add(
        "scroll-hidden"
    );

});


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "scroll-show"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


animatedElements.forEach(element => {

    observer.observe(element);

});



/* ==================================================
   ACTIVE NAVIGATION
================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


window.addEventListener(
    "scroll",
    () => {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            if (
                window.scrollY >=
                sectionTop - 250
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href") ===
                "#" + currentSection
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);



/* ==================================================
   BACK TO TOP
================================================== */

const backToTop =
    document.getElementById(
        "backToTop"
    );


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);



/* ==================================================
   CONTACT FORM VALIDATION
================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


const formStatus =
    document.getElementById(
        "formStatus"
    );


contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "name"
            );


        const email =
            document.getElementById(
                "email"
            );


        const message =
            document.getElementById(
                "message"
            );


        let valid = true;


        /* Clear previous errors */

        document
            .querySelectorAll(
                ".error-message"
            )
            .forEach(error => {

                error.textContent = "";

            });


        document
            .querySelectorAll(
                ".form-group input, .form-group textarea"
            )
            .forEach(input => {

                input.classList.remove(
                    "input-error"
                );

            });


        /* NAME */

        if (
            name.value.trim() === ""
        ) {

            showError(
                name,
                "Please enter your name."
            );

            valid = false;

        }


        /* EMAIL */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            email.value.trim() === ""
        ) {

            showError(
                email,
                "Please enter your email."
            );

            valid = false;

        }

        else if (
            !emailPattern.test(
                email.value.trim()
            )
        ) {

            showError(
                email,
                "Please enter a valid email."
            );

            valid = false;

        }


        /* MESSAGE */

        if (
            message.value.trim() === ""
        ) {

            showError(
                message,
                "Please enter your message."
            );

            valid = false;

        }

        else if (
            message.value.trim().length < 10
        ) {

            showError(
                message,
                "Message must contain at least 10 characters."
            );

            valid = false;

        }


        /* SUCCESS */

        if (valid) {

            formStatus.textContent =
                "✓ Message submitted successfully!";

            formStatus.className =
                "success-message";


            contactForm.reset();

        }

    }
);



/* ==================================================
   SHOW ERROR
================================================== */

function showError(
    input,
    message
) {

    input.classList.add(
        "input-error"
    );


    const error =
        input.parentElement.querySelector(
            ".error-message"
        );


    error.textContent =
        message;

}



/* ==================================================
   CLEAR ERROR WHILE TYPING
================================================== */

const formInputs =
    document.querySelectorAll(
        "#contactForm input, #contactForm textarea"
    );


formInputs.forEach(input => {

    input.addEventListener(
        "input",
        () => {

            input.classList.remove(
                "input-error"
            );


            const error =
                input.parentElement.querySelector(
                    ".error-message"
                );


            error.textContent = "";


            formStatus.textContent = "";

        }
    );

});



/* ==================================================
   AUTOMATIC YEAR
================================================== */

const yearElement =
    document.querySelector(
        ".footer-year"
    );


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}