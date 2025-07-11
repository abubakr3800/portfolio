// Portfolio Data and Functionality
class Portfolio {
    constructor() {
        this.data = null;
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.populateContent();
            this.setupEventListeners();
            this.setupSmoothScrolling();
            this.createParticles();
            this.setupScrollAnimations();
        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    }

    async loadData() {
        try {
            const response = await fetch('data/portfolio.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.data = await response.json();
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            // Fallback data in case JSON loading fails
            this.data = this.getFallbackData();
        }
    }

    getFallbackData() {
        return {
            personal: {
                name: "Ahmed Mohamed Abubakr",
                location: "Giza, Egypt",
                phone: "01113284597",
                email: "ahmed.mo.abubakr@gmail.com",
                objective: "To obtain an R&D Engineer position where I can apply my academic background in electronics, hands-on experience in analog IC layout design, and practical skills in tools such as Cadence, Proteus, and Altium to contribute to innovation and development in electronic systems."
            },
            education: {
                degree: "Bachelor of Electronics and Communications Engineering",
                institution: "Sohag University | Faculty of engineering",
                year: "2023"
            },
            experience: [],
            volunteering: [],
            skills: {
                technical: ["Cadence", "Linux", "Python", "MATLAB/Simulink"],
                teaching: ["Curriculum development", "Student mentoring"],
                languages: ["Fluent English (written/spoken)"]
            },
            projects: {
                electronics: [],
                web: []
            }
        };
    }

    populateContent() {
        this.populateHero();
        this.populateAbout();
        this.populateExperience();
        this.populateVolunteering();
        this.populateProjects();
        this.populateSkills();
        this.populateCertificates();
        this.populateContact();
    }

    populateHero() {
        const { personal } = this.data;
        document.getElementById('hero-name').textContent = personal.name;
        document.getElementById('hero-objective').textContent = personal.objective;
        
        // Add typing effect to hero title
        this.typeWriter('hero-title', 'R&D Engineer | Electronics & Communications', 100);
    }

    typeWriter(elementId, text, speed) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        setTimeout(type, 1000);
    }

    populateAbout() {
        const { personal, education } = this.data;
        
        // Education
        document.getElementById('education-degree').textContent = education.degree;
        document.getElementById('education-institution').textContent = education.institution;
        document.getElementById('education-year').textContent = education.year;
        
        // Contact Info
        document.getElementById('location').textContent = personal.location;
        document.getElementById('phone').textContent = personal.phone;
        document.getElementById('email').textContent = personal.email;
    }

    populateExperience() {
        const container = document.getElementById('experience-container');
        const { experience } = this.data;

        experience.forEach((exp, index) => {
            const card = document.createElement('div');
            card.className = 'col-lg-6 col-md-12';
            card.style.animationDelay = `${index * 0.2}s`;
            card.innerHTML = `
                <div class="experience-card" data-aos="fade-up" data-aos-delay="${index * 200}">
                    <h4>${exp.title}</h4>
                    <div class="company">${exp.company}</div>
                    <div class="period">${exp.period}</div>
                    <ul>
                        ${exp.description.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
            container.appendChild(card);
        });
    }

    populateVolunteering() {
        const container = document.getElementById('volunteering-container');
        const { volunteering } = this.data;

        volunteering.forEach((vol, index) => {
            const card = document.createElement('div');
            card.className = 'col-lg-6 col-md-12';
            card.style.animationDelay = `${index * 0.2}s`;
            
            let achievementsHtml = '';
            if (vol.achievements) {
                achievementsHtml = `<ul>${vol.achievements.map(item => `<li>${item}</li>`).join('')}</ul>`;
            }

            card.innerHTML = `
                <div class="volunteering-card" data-aos="fade-up" data-aos-delay="${index * 200}">
                    <h4>${vol.title}</h4>
                    <div class="organization">${vol.organization}</div>
                    ${vol.role ? `<div class="role">${vol.role}</div>` : ''}
                    ${achievementsHtml}
                </div>
            `;
            container.appendChild(card);
        });
    }

    populateProjects() {
        const { projects } = this.data;
        // Clear containers
        const electronicsContainer = document.getElementById('electronics-projects');
        const webContainer = document.getElementById('web-projects');
        electronicsContainer.innerHTML = '';
        webContainer.innerHTML = '';

        // Helper to render a project carousel card
        const renderProjectCarousel = (project, category, index) => {
            const galleryId = `carousel-${category}-${index}`;
            const images = project.images || (project.image ? [project.image] : []);
            const mainImage = images[0] || '';
            // Only show the first image on the card
            let mainImgHtml = mainImage ? `
                <img src="${mainImage}" class="project-carousel-img" alt="${project.name}">
            ` : '';
            // Button to open GLightbox gallery
            let btnHtml = images.length ? `
                <button class="btn btn-primary project-carousel-btn" data-gallery="${galleryId}">View Details</button>
            ` : '';
            // Compose card
            const html = `
                <div class="project-carousel-card">
                    ${mainImgHtml}
                    <div class="project-carousel-title">${project.name}</div>
                    ${btnHtml}
                </div>
            `;
            return html;
        };
        // Render electronics projects
        let electronicsHtml = '<div class="projects-carousel"><div class="carousel-scroll">';
        projects.electronics.forEach((project, idx) => {
            electronicsHtml += renderProjectCarousel(project, 'electronics', idx);
        });
        electronicsHtml += '</div></div>';
        electronicsContainer.innerHTML = electronicsHtml;
        // Render web projects
        let webHtml = '<div class="projects-carousel"><div class="carousel-scroll">';
        projects.web.forEach((project, idx) => {
            webHtml += renderProjectCarousel(project, 'web', idx);
        });
        webHtml += '</div></div>';
        webContainer.innerHTML = webHtml;
        // Add event listeners for buttons to open GLightbox
        setTimeout(() => {
            document.querySelectorAll('.project-carousel-btn').forEach((btn, i) => {
                btn.addEventListener('click', function() {
                    const galleryId = btn.getAttribute('data-gallery');
                    // Build GLightbox gallery for this project
                    let project, images;
                    if (btn.closest('#electronics-projects')) {
                        project = projects.electronics[i];
                        images = project.images || (project.image ? [project.image] : []);
                    } else {
                        project = projects.web[i];
                        images = project.images || (project.image ? [project.image] : []);
                    }
                    const glightboxItems = images.map(img => ({ href: img, type: 'image' }));
                    if (window.GLightbox) {
                        GLightbox({ elements: glightboxItems });
                    }
                });
            });
        }, 100);
    }

    createProjectCard(project, category, index) {
        const card = document.createElement('div');
        card.className = 'col-lg-4 col-md-6 mt-5';
        card.setAttribute('data-category', category);
        card.style.animationDelay = `${index * 0.1}s`;

        // Images
        const images = project.images || (project.image ? [project.image] : []);
        let imagesHtml = '';
        if (images.length > 0) {
            imagesHtml = images.map((img, idx) => `
                <a class="glightbox" data-gallery="project-gallery-${category}-${index}" href="${img}">
                    <img src="${img}" class="img-fluid rounded mb-2 me-2" alt="Project Image ${idx + 1}" style="max-width: 80px; max-height: 60px;">
                </a>
            `).join('');
        }

        // Main image as GLightbox trigger
        let mainImageHtml = '';
        if (images[0]) {
            mainImageHtml = `
                <a class="glightbox" data-gallery="project-gallery-${category}-${index}" href="${images[0]}">
                    <img src="${images[0]}" alt="${project.name}" class="project-image mb-3 rounded" style="width:100%;height:200px;object-fit:cover;">
                </a>
            `;
        }

        // Technologies
        const techHtml = `<div class="technology-tags mb-3">${project.technologies.map(tech => `<span class="technology-tag">${tech}</span>`).join('')}</div>`;

        // Links
        let linksHtml = '';
        if (project.liveUrl) {
            linksHtml += `<a href="${project.liveUrl}" class="btn btn-primary me-2 mb-2" target="_blank">View Live</a>`;
        }
        if (project.sourceUrl) {
            linksHtml += `<a href="${project.sourceUrl}" class="btn btn-outline-primary mb-2" target="_blank">Source Code</a>`;
        }

        card.innerHTML = `
            <div class="project-card" style="cursor:pointer;">
                ${mainImageHtml}
                <div class="project-content">
                    <h4>${project.name}</h4>
                    <p>${project.description}</p>
                    ${techHtml}
                    <div class="d-flex flex-wrap align-items-center mb-2 project-thumbnails" style="height: 0;overflow: hidden;">
                        ${imagesHtml}
                    </div>
                    <div>${linksHtml}</div>
                </div>
            </div>
        `;

        return card;
    }

    // After rendering all project cards, re-initialize GLightbox
    populateProjects() {
        const { projects } = this.data;
        // Electronics Projects
        const electronicsContainer = document.getElementById('electronics-projects');
        electronicsContainer.innerHTML = '';
        projects.electronics.forEach((project, index) => {
            const card = this.createProjectCard(project, 'electronics', index);
            electronicsContainer.appendChild(card);
        });
        // Web Projects
        const webContainer = document.getElementById('web-projects');
        webContainer.innerHTML = '';
        projects.web.forEach((project, index) => {
            const card = this.createProjectCard(project, 'web', index);
            webContainer.appendChild(card);
        });
        // Re-initialize GLightbox
        if (window.GLightbox) {
            GLightbox({ selector: '.glightbox' });
        }
    }

    populateSkills() {
        const { skills } = this.data;
        
        // Technical Skills
        const technicalContainer = document.getElementById('technical-skills');
        skills.technical.forEach((skill, index) => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.textContent = skill;
            skillItem.style.animationDelay = `${index * 0.1}s`;
            technicalContainer.appendChild(skillItem);
        });

        // Teaching Skills
        const teachingContainer = document.getElementById('teaching-skills');
        skills.teaching.forEach((skill, index) => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.textContent = skill;
            skillItem.style.animationDelay = `${index * 0.1}s`;
            teachingContainer.appendChild(skillItem);
        });

        // Language Skills
        const languageContainer = document.getElementById('language-skills');
        skills.languages.forEach((skill, index) => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.textContent = skill;
            skillItem.style.animationDelay = `${index * 0.1}s`;
            languageContainer.appendChild(skillItem);
        });
    }

    populateContact() {
        const { personal } = this.data;
        
        document.getElementById('contact-email').textContent = personal.email;
        document.getElementById('contact-phone').textContent = personal.phone;
        document.getElementById('contact-location').textContent = personal.location;
    }

    populateCertificates() {
        const container = document.getElementById('certificates-container');
        const { certificates } = this.data;

        if (!certificates) return;

        certificates.forEach((cert, index) => {
            const card = document.createElement('div');
            card.className = 'col-lg-4 col-md-6';
            card.style.animationDelay = `${index * 0.2}s`;
            
            const pdfIndicator = cert.pdfUrl ? 
                `<div class="pdf-indicator">
                    <i class="fas fa-file-pdf"></i>
                </div>` : '';
            
            const pdfAvailable = cert.pdfUrl ? 
                '<small class="text-success"><i class="fas fa-check-circle me-1"></i>PDF Available</small>' : 
                '<small class="text-muted"><i class="fas fa-info-circle me-1"></i>Image Only</small>';
            
            card.innerHTML = `
                <div class="certificate-card" onclick="portfolio.openCertificateModal('${cert.name}')" data-aos="fade-up" data-aos-delay="${index * 200}">
                    ${pdfIndicator}
                    <img src="${cert.image}" alt="${cert.name}" class="certificate-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZjNzU3ZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNlcnRpZmljYXRlPC90ZXh0Pjwvc3ZnPg=='">
                    <div class="certificate-content">
                        <h4>${cert.name}</h4>
                        <div class="issuer">${cert.issuer}</div>
                        <div class="date">${cert.date}</div>
                        ${pdfAvailable}
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    setupEventListeners() {
        // Project filter buttons
        const filterButtons = document.querySelectorAll('[data-filter]');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.filterProjects(e.target.dataset.filter);
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(52, 58, 64, 0.95)';
            } else {
                navbar.style.background = '#343a40';
            }
        });

        // Contact form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm();
            });
        }

        // Add hover effects to cards
        this.addHoverEffects();
    }

    setupSmoothScrolling() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    setupScrollAnimations() {
        // Add scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards and sections
        document.querySelectorAll('.about-card, .experience-card, .volunteering-card, .project-card, .skills-card, .certificate-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    addHoverEffects() {
        // Add creative hover effects to cards
        document.querySelectorAll('.project-card, .certificate-card, .experience-card, .volunteering-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    filterProjects(category) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const cardCategory = card.parentElement.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.parentElement.style.display = 'block';
                card.parentElement.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.parentElement.style.display = 'none';
            }
        });
    }

    openProjectModal(category, projectName) {
        const { projects } = this.data;
        const projectList = category === 'electronics' ? projects.electronics : projects.web;
        const project = projectList.find(p => p.name === projectName);
        
        if (!project) return;

        // Populate modal
        document.getElementById('modal-title').textContent = project.name;
        document.getElementById('modal-description').innerHTML = `<p>${project.description}</p>`;
        
        // Technologies
        document.getElementById('modal-technologies').innerHTML = `
            <div class="technology-tags mb-3">
                ${project.technologies.map(tech => `<span class="technology-tag">${tech}</span>`).join('')}
            </div>
        `;

        // Images gallery with Venobox
        const images = project.images || (project.image ? [project.image] : []);
        let imagesHtml = '';
        if (images.length > 0) {
            imagesHtml = images.map((img, idx) => `
                <a class="venobox" data-gall="project-gallery" href="${img}">
                    <img src="${img}" class="img-fluid rounded mb-2" alt="Project Image ${idx + 1}">
                </a>
            `).join('');
        }
        document.getElementById('modal-images').innerHTML = imagesHtml;

        // Links (View Live, Source Code)
        let linksHtml = '';
        if (project.liveUrl) {
            linksHtml += `<a href="${project.liveUrl}" class="btn btn-primary me-2 mb-2" target="_blank">View Live</a>`;
        }
        if (project.sourceUrl) {
            linksHtml += `<a href="${project.sourceUrl}" class="btn btn-outline-primary mb-2" target="_blank">Source Code</a>`;
        }
        document.getElementById('modal-links').innerHTML = linksHtml;

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('projectModal'));
        modal.show();

        // Initialize Venobox for gallery
        setTimeout(() => {
            if (window.VenoBox) {
                new VenoBox({ selector: '.venobox' });
            }
        }, 200);
    }

    openCertificateModal(certificateName) {
        const { certificates } = this.data;
        const certificate = certificates.find(cert => cert.name === certificateName);
        if (!certificate) return;

        // Fill in the Bootstrap modal for certificates
        document.getElementById('certificateModalTitle').textContent = certificate.name;
        document.getElementById('certificateModalBody').innerHTML = `
            <div class="row">
                <div class="col-md-6 text-center">
                    <img src="${certificate.image}" alt="${certificate.name}" class="img-fluid rounded mb-3 certificate-modal-image">
                </div>
                <div class="col-md-6">
                    <h6 class="text-primary mb-2">${certificate.issuer}</h6>
                    <p class="text-muted mb-3">${certificate.date}</p>
                    <p class="mb-3">${certificate.description}</p>
                    ${certificate.pdfUrl ? `
                        <div class="mt-3">
                            <a href="${certificate.pdfUrl}" target="_blank" class="btn btn-primary me-2">
                                <i class="fas fa-eye me-2"></i>View Certificate
                            </a>
                            <a href="${certificate.pdfUrl}" download class="btn btn-outline-primary">
                                <i class="fas fa-download me-2"></i>Download PDF
                            </a>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        // Show the Bootstrap modal
        const modal = new bootstrap.Modal(document.getElementById('certificateModal'));
        modal.show();
    }

    handleContactForm() {
        const form = document.getElementById('contact-form');
        const sendBtn = document.getElementById('send-btn');
        const sendText = document.getElementById('send-text');
        const sendLoading = document.getElementById('send-loading');
        const formMessage = document.getElementById('form-message');

        // Show loading state
        sendText.style.display = 'none';
        sendLoading.style.display = 'inline-block';
        sendBtn.disabled = true;
        formMessage.innerHTML = '';
        formMessage.className = '';

        const formData = new FormData(form);

        fetch('sendmail.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            sendText.style.display = 'inline';
            sendLoading.style.display = 'none';
            sendBtn.disabled = false;

            if (data.success) {
                formMessage.innerHTML = '<div class="form-message success">Message sent successfully! I\'ll get back to you soon.</div>';
                form.reset();
            } else {
                formMessage.innerHTML = '<div class="form-message error">Failed to send message. ' + (data.error || 'Please try again or contact me directly.') + '</div>';
            }
        })
        .catch(() => {
            sendText.style.display = 'inline';
            sendLoading.style.display = 'none';
            sendBtn.disabled = false;
            formMessage.innerHTML = '<div class="form-message error">Failed to send message. Please try again or contact me directly.</div>';
        });
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new Portfolio();
});

// Add CSS animation for fadeIn
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style); 