emailjs.init("6xaVuP4V4pW_i-5la"); 

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');

mobileMenuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('show');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('show');
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Resume Button
document.getElementById('resume-btn').addEventListener('click', function() {
    console.log('Resume download initiated');
});

// Projects Data

const projects = [
  {
    title: "Car Rental Application",
    description:
      "Developed a full-stack car rental web application allowing users to browse, book, and manage car rentals online.",
    detailedDescription:
      "This MERN stack-based car rental application provides a complete rental management solution. Users can register and log in, browse available cars with filters, view detailed car information, select rental dates, and place bookings. The admin panel allows car management, booking management, and user tracking. The frontend is built with React and Tailwind CSS for a modern responsive UI, while the backend uses Node.js, Express.js, and MongoDB for secure data handling and scalable APIs.",
    category: "software",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "CSS"],
    image:
      "https://d1ss4nmhr4m5he.cloudfront.net/wp-content/uploads/2024/03/04080107/5-Essential-Car-Rental-Tips-for-a-Smooth-Business-Travel-Experience-1024x544.jpg",
    githubLink: "https://github.com/Chandan8757/CarRental-fullstack",
    liveDemo: "https://car-rental-henna-sigma.vercel.app/",
  },

  {
    title: "Portfolio",
    description:
      "Created a responsive personal portfolio website highlighting projects, skills, and achievements.",
    detailedDescription:
      "This project showcases my professional journey through a responsive personal portfolio website. It includes an About section, project highlights, skillset representation, and contact form. Built with HTML, CSS, and JavaScript, ensuring clean design and smooth user experience.",

    category: "software",
    tags: ["HTML", "CSS", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    githubLink: "https://github.com/Chandan8757/Portfolio",
    liveDemo: "https://portfolio-phi-amber-34.vercel.app/",
  },

  {
    title: "College Conference Website",
    description:
      "Designed and developed a responsive website for managing college conferences and events.",
    detailedDescription:
      "This project involved building a dynamic platform to showcase event details, schedules, and speaker information. Features included user-friendly navigation, responsive design for accessibility across devices, and interactive sections for registrations and announcements. Built with HTML, CSS, and JavaScript.",

    category: "software",
    tags: ["Mongo Db", "Express Js", "React Js", "Node Js"],
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    githubLink: "https://github.com/Chandan8757/College-conference-website",
    liveDemo: "https://chandankumar-ecommerce.netlify.app",
  },
  {
    title: "Ticket Booking Application",
    description:
      "Developed a ticket booking system with seat selection, booking confirmation, and user-friendly interface.",
    detailedDescription:
      "This project is a ticket booking web application that allows users to select seats, view availability, and confirm bookings. Built with HTML, CSS, and JavaScript, featuring dynamic UI updates and localStorage for booking persistence.",

    category: "software",
    tags: ["React Js"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    githubLink: "https://github.com/Chandan8757/Ticket-Booking",
    liveDemo: "https://tick-ticketing-nine.vercel.app/",
  },
];

// Render Projects
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category);
        projectCard.setAttribute('data-index', index);
        
        projectCard.innerHTML = `
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="#" class="view-details" data-index="${index}">View Details</a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });

    // Initialize modal functionality
    initModal();
}

// Initialize Project Modal
function initModal() {
    // Create modal if it doesn't exist
    if (!document.querySelector('.project-modal')) {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-body">
                    <div class="modal-image-container">
                        <img id="modal-image" src="" alt="">
                    </div>
                    <div class="modal-text-content">
                        <h2 id="modal-title"></h2>
                        <p id="modal-description"></p>
                        <div class="modal-tags"></div>
                        <div class="modal-links">
                            <a id="github-link" href="#" target="_blank" class="btn">View on GitHub</a>
                            <a id="live-demo-link" href="#" target="_blank" class="btn">Live Demo</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Add event listeners for modal
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const index = this.getAttribute('data-index');
            showProjectModal(index);
        });
    });

    document.querySelector('.close-modal')?.addEventListener('click', hideModal);
    document.querySelector('.project-modal')?.addEventListener('click', function(e) {
        if (e.target === this) hideModal();
    });
}

function showProjectModal(index) {
    const project = projects[index];
    const modal = document.querySelector('.project-modal');

    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.detailedDescription;
    document.getElementById('modal-image').src = project.image;
    document.getElementById('modal-image').alt = project.title;

    const tagsContainer = document.querySelector('.modal-tags');
    tagsContainer.innerHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');

    const githubLink = document.getElementById('github-link');
    githubLink.href = project.githubLink;

    const liveDemoLink = document.getElementById('live-demo-link');
    if (project.liveDemo) {
        liveDemoLink.href = project.liveDemo;
        liveDemoLink.style.display = 'inline-block';
    } else {
        liveDemoLink.style.display = 'none';
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    document.querySelector('.project-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// EmailJS Form Handling
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Generate a random ID for the contact
    this.contact_number.value = Math.random() * 100000 | 0;
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Validate form
    const name = this.user_name.value.trim();
    const email = this.user_email.value.trim();
    const message = this.message.value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill all required fields');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
    }
    
    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
    }
    
    // Send email
    emailjs.sendForm('service_k4tgdah', 'template_xwafed7', this)
        .then(() => {
            alert('Message sent successfully!');
            this.reset();
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            alert('Failed to send message. Please try again later.');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
});

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    renderProjects();
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.querySelector('.project-modal').style.display === 'block') {
            hideModal();
        }
    });
});

