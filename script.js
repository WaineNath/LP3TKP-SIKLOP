document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const themeToggleButton = document.getElementById('theme-toggle');
    const mobileMenuToggleButton = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // --- Header Style Logic --- //
    function handleHeaderStyle() {
        const isBerandaActive = document.getElementById('beranda').classList.contains('active');
        
        if (isBerandaActive && window.innerWidth > 992) {
            if (window.scrollY > 50) {
                navbar.classList.remove('on-hero');
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.add('on-hero');
                navbar.classList.remove('scrolled');
            }
        } else {
            navbar.classList.remove('on-hero');
            navbar.classList.add('scrolled');
        }
    }
    window.addEventListener('scroll', handleHeaderStyle);

    // --- Theme Toggler --- //
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    themeToggleButton.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // --- Navigation Logic --- //
    function showContent(targetId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkTarget = link.getAttribute('data-target');
            const parentDropdown = link.closest('.dropdown');
            if (linkTarget === targetId) {
                link.classList.add('active');
                if(parentDropdown) {
                    parentDropdown.querySelector('.nav-link').classList.add('active');
                }
            }
        });

        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
        handleHeaderStyle();
        window.scrollTo(0, 0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.target;
            const parentLi = link.closest('li');

            if (parentLi.classList.contains('dropdown')) {
                const firstSubmenuLink = parentLi.querySelector('.dropdown-menu .nav-link');
                if (firstSubmenuLink && link.nextElementSibling) { // It is a main dropdown link
                    const firstTargetId = firstSubmenuLink.dataset.target;
                    showContent(firstTargetId);
                } else { // It is a link inside a dropdown
                     showContent(targetId);
                }

                if (window.innerWidth <= 992) {
                    parentLi.classList.toggle('open');
                }
            } else {
                if (targetId) {
                    showContent(targetId);
                }
            }
        });
    });

    // --- Mobile Menu Toggle --- //
    mobileMenuToggleButton.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Initialize with Beranda view
    showContent('beranda');
});
