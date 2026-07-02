document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initTypingEffect();
    initOrbitAnimations();
    initSunPhotoModal();
    initSmoothScroll();
    initSectionAnimations();
    initProjectsPage();
});

function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) {
        return;
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    });
    
    sections.forEach(section => observer.observe(section));
}

function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    const phrases = [
        'Web Developer',
        'Bug Hunter', 
        'Problem Solver'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            // Deleting characters
            typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing characters
            typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100; // Normal typing speed
        }
        
        // When word is complete
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        } 
        // When word is completely deleted
        else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeEffect, typingSpeed);
    }

    if (typingText) {
        typeEffect();
    }
}



function initOrbitAnimations() {
    const planets = document.querySelectorAll('.random-orbit');

    planets.forEach((planet, index) => {
        const startAngle = Math.random() * 360;
        const viewportWidth = window.innerWidth;
        const radius = viewportWidth <= 640 ? 110 + (index * 14) : viewportWidth <= 768 ? 120 + (index * 16) : 140 + (index * 30);
        
        const duration = 15 + Math.random() * 15;
        const direction = Math.random() > 0.5 ? 'normal' : 'reverse';
        const delay = 0;

        planet.style.transform = `rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg)`;

        const animationName = `orbit${index}`;
        const keyframes = `
            @keyframes ${animationName} {
                from {
                    transform: rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg);
                }
                to {
                    transform: rotate(${startAngle + 360}deg) translateX(${radius}px) rotate(-${startAngle + 360}deg);
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);

        planet.style.animation = `${animationName} ${duration}s linear infinite ${direction}`;
        planet.style.animationDelay = `${delay}s`;

        planet.addEventListener('mouseenter', () => {
            planet.style.animationPlayState = 'paused';
        });

        planet.addEventListener('mouseleave', () => {
            planet.style.animationPlayState = 'running';
        });
    });
}

function initSunPhotoModal() {
    const sun = document.querySelector('.sun-core');
    const modal = document.getElementById('photo-modal');
    const closeBtn = document.querySelector('.close');
    const randomPhoto = document.getElementById('random-photo');

    if (sun && modal && closeBtn && randomPhoto) {
        sun.addEventListener('click', () => {
            const randomId = Math.floor(Math.random() * 1000) + 1;
            randomPhoto.src = `https://picsum.photos/600/400?random=${randomId}`;
            modal.style.display = 'block';
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initSectionAnimations() {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up');

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                if (entry.target.classList.contains('slide-in-left')) {
                    entry.target.style.transform = 'translateX(0)';
                } else if (entry.target.classList.contains('slide-in-right')) {
                    entry.target.style.transform = 'translateX(0)';
                } else {
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => elementObserver.observe(element));
}

function initProjectsPage() {
    const loginForm = document.getElementById('project-login-form');
    const form = document.getElementById('project-form');
    const list = document.getElementById('projects-list');
    const submitButton = document.getElementById('project-submit');
    const cancelEditButton = document.getElementById('project-cancel-edit');
    let editingId = null;
    let isAdmin = sessionStorage.getItem('revallProjectAdmin') === 'true';
    let projects = [];

    if (!loginForm || !form || !list || !submitButton || !cancelEditButton) {
        return;
    }

    const adminPassword = 'revalladmin';
    const firebaseConfig = {
        apiKey: 'ISI_API_KEY',
        authDomain: 'ISI_AUTH_DOMAIN',
        projectId: 'ISI_PROJECT_ID',
        storageBucket: 'ISI_STORAGE_BUCKET',
        messagingSenderId: 'ISI_MESSAGING_SENDER_ID',
        appId: 'ISI_APP_ID'
    };
    const isFirebaseReady = window.firebase && !Object.values(firebaseConfig).some(value => value.startsWith('ISI_'));
    const db = isFirebaseReady ? firebase.initializeApp(firebaseConfig).firestore() : null;

    function setAdminState() {
        loginForm.style.display = isAdmin ? 'none' : 'block';
        form.style.display = isAdmin ? 'block' : 'none';
    }

    function getProjectData() {
        return {
            title: document.getElementById('project-title').value,
            image: document.getElementById('project-image').value,
            description: document.getElementById('project-description').value,
            tech: document.getElementById('project-tech').value.split(',').map(item => item.trim()).filter(Boolean),
            demo: document.getElementById('project-demo').value,
            github: document.getElementById('project-github').value,
            updatedAt: Date.now()
        };
    }

    function renderProjects() {
        list.innerHTML = projects.map(project => `
            <div class="project-card">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(item => `<span>${item}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link">Live Demo</a>` : ''}
                        ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub</a>` : ''}
                        ${isAdmin ? `<button class="project-link project-edit" type="button" data-id="${project.id}">Edit</button><button class="project-link project-delete" type="button" data-id="${project.id}">Hapus</button>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    function resetProjectForm() {
        editingId = null;
        form.reset();
        submitButton.textContent = 'Tambah Project';
        cancelEditButton.style.display = 'none';
    }

    function loadLocalProjects() {
        projects = JSON.parse(localStorage.getItem('revallProjects')) || [];
        renderProjects();
    }

    function saveLocalProjects() {
        localStorage.setItem('revallProjects', JSON.stringify(projects));
    }

    if (db) {
        db.collection('projects').orderBy('updatedAt', 'desc').onSnapshot(snapshot => {
            projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            renderProjects();
        });
    } else {
        loadLocalProjects();
    }

    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        if (document.getElementById('project-password').value !== adminPassword) {
            alert('Password salah');
            return;
        }
        isAdmin = true;
        sessionStorage.setItem('revallProjectAdmin', 'true');
        setAdminState();
        renderProjects();
    });

    form.addEventListener('submit', async event => {
        event.preventDefault();
        const projectData = getProjectData();

        if (db) {
            if (editingId) {
                await db.collection('projects').doc(editingId).update(projectData);
            } else {
                await db.collection('projects').add({ ...projectData, createdAt: Date.now() });
            }
        } else if (editingId) {
            projects = projects.map(project => project.id === editingId ? { id: editingId, ...projectData } : project);
            saveLocalProjects();
            renderProjects();
        } else {
            projects.unshift({ id: String(Date.now()), ...projectData });
            saveLocalProjects();
            renderProjects();
        }

        resetProjectForm();
    });

    list.addEventListener('click', async event => {
        const id = event.target.dataset.id;
        const project = projects.find(item => item.id === id);

        if (event.target.classList.contains('project-edit') && project) {
            editingId = id;
            document.getElementById('project-title').value = project.title;
            document.getElementById('project-image').value = project.image;
            document.getElementById('project-description').value = project.description;
            document.getElementById('project-tech').value = project.tech.join(', ');
            document.getElementById('project-demo').value = project.demo;
            document.getElementById('project-github').value = project.github;
            submitButton.textContent = 'Update Project';
            cancelEditButton.style.display = 'inline-flex';
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        if (event.target.classList.contains('project-delete') && id) {
            if (db) {
                await db.collection('projects').doc(id).delete();
            } else {
                projects = projects.filter(projectItem => projectItem.id !== id);
                saveLocalProjects();
                renderProjects();
            }
            resetProjectForm();
        }
    });

    cancelEditButton.addEventListener('click', resetProjectForm);
    setAdminState();
    resetProjectForm();
}

console.log('Revall Portfolio loaded successfully!');
