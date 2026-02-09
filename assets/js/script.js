$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("EpK4uPh-n7szwjtvj");

        emailjs.sendForm('jhansi-contact-form', 'jhansi-email-template', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Jhansi Nalla Portfolio";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Jhansi Portfolio";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["UI/UX Designer", "ML Engineer"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    if (type === "skills" )
        response = await fetch("./skills.json")
    else if(type === "projects")
        response = await fetch("./data/projects.json")
    else if(type === "certifications")
        response = await fetch("./data/certifications.json")
    else if(type === "awards")
            response = await fetch("./data/awards.json"); 
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

// Replace the showProjects function in your script.js file with this updated version

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
          <h3>${project.name}</h3>
        </div>
        <div class="desc scrollable">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });
}

function showCertifications(certifications) {
    let certificationsContainer = document.querySelector("#certifications .box-container");
    let certificationHTML = "";
    
    console.log('Loading certifications:', certifications);
    
    certifications.slice(0, 10).forEach(certification => {
        certificationHTML += `
        <div class="box tilt">
            <img draggable="false" src="./assets/images/certifications/${certification.image}.png" alt="${certification.name}" />
            <div class="content">
                <div class="tag">
                    <h3>${certification.name}</h3>
                </div>
                <div class="desc scrollable">
                    <p>${certification.desc}</p>
                    <div class="btns">
                        <a href="${certification.links.view}" class="btn" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-eye"></i> View Certificate
                        </a>
                    </div>
                </div>
            </div>
        </div>`;
    });
    
    certificationsContainer.innerHTML = certificationHTML;

    // Initialize VanillaTilt for smooth tilt effect
    VanillaTilt.init(document.querySelectorAll(".certifications .box.tilt"), {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
    });

    // Initialize ScrollReveal for certifications
    const srtop = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });

    // Reveal certification boxes with stagger effect
    srtop.reveal('.certifications .box', { 
        interval: 200,
        scale: 0.9
    });
}

function showAwards(awards) {
    let awardsContainer = document.querySelector(".awards-container");
    let awardHTML = "";
    
    console.log('Loading awards:', awards);
    
    awards.forEach((award, index) => {
        awardHTML += `
        <div class="award-card">
            <span class="star-decoration">★</span>
            <span class="star-decoration">★</span>
            <span class="star-decoration">★</span>
            
            <div class="award-rank">#${index + 1}</div>
            
            <div class="award-image">
                <img src="./assets/images/awards/${award.image}.png" alt="${award.title}" draggable="false" />
            </div>
            
            <div class="award-content">
                <div class="award-trophy">
                    <i class="fas fa-trophy"></i>
                </div>
                
                <h3 class="award-title">${award.title}</h3>
                <p class="award-organization">${award.organization}</p>
                <span class="award-date">
                    <i class="far fa-calendar-alt"></i> ${award.date}
                </span>
                <p class="award-description">${award.description}</p>
                
                ${award.tags ? `
                <div class="award-tags">
                    ${award.tags.map(tag => `<span class="award-tag">${tag}</span>`).join('')}
                </div>
                ` : ''}
            </div>
        </div>`;
    });
    
    awardsContainer.innerHTML = awardHTML;

    // Initialize ScrollReveal for awards
    const srtop = ScrollReveal({
        origin: 'bottom',
        distance: '80px',
        duration: 1200,
        delay: 100,
        reset: true
    });

    // Reveal award cards with stagger effect
    srtop.reveal('.award-card', { 
        interval: 300,
        scale: 0.85
    });
}

// Add to your existing fetchData and initialization code
fetchData("awards").then(data => {
    showAwards(data);
});

// Add to your existing fetchData and initialization code
fetchData("awards").then(data => {
    showAwards(data);
});

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

fetchData("certifications").then(data => {
    showCertifications(data);
});

fetchData("awards").then(data => {
    showAwards(data);
});

/* SCROLL AWARDS */
srtop.reveal('.award-card', { interval: 300 });

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .Gmail', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });