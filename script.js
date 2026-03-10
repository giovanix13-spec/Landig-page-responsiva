document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================
       Cursor Customizado Moderno (Minimalista)
       ========================================================== */
    const follower = document.querySelector('.cursor-follower');
    const dot = document.querySelector('.cursor-dot');
    const circle = document.querySelector('.cursor-circle');
    
    if (follower && dot && circle && window.innerWidth >= 1024) {
        let mouseX = 0, mouseY = 0;
        let circleX = 0, circleY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Ponto central segue instataneamente
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        });

        // Suavização do círculo externo (Linear Interpolation sutil)
        const lerp = (start, end, amt) => (1 - amt) * start + amt * end;
        
        const animateCursor = () => {
            circleX = lerp(circleX, mouseX, 0.15);
            circleY = lerp(circleY, mouseY, 0.15);
            
            circle.style.left = circleX + 'px';
            circle.style.top = circleY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Efeito de Hover em links e botões
        const hoverTags = 'a, button, .portfolio-card, .contact-method-card, .hobby-item';
        const interactives = document.querySelectorAll(hoverTags);
        
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => follower.classList.add('is-hovering'));
            el.addEventListener('mouseleave', () => follower.classList.remove('is-hovering'));
        });
    }

    /* ==========================================================
       Header Change on Scroll
       ========================================================== */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================
       Menu Mobile
       ========================================================== */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    };

    if (mobileMenuBtn && closeMenuBtn && mobileOverlay) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    /* ==========================================================
       Scroll Reveal Animations
       ========================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('active');
            // Opcional: descomente a linha abaixo se quiser que a animação rode apenas 1x
            // observer.unobserve(entry.target); 
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================
       Active Navigation Link on Scroll
       ========================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================
       Smooth Scroll to Top
       ========================================================== */
    const scrollTopBtn = document.getElementById('scrollToTop');
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================================
       Play Hero Video on interaction (Mouse move / Scroll / Click)
       ========================================================== */
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        let isVideoPlaying = false;

        const attemptPlay = () => {
            if (isVideoPlaying || !heroVideo.paused) return;

            const playPromise = heroVideo.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isVideoPlaying = true;
                    // Força a classe no CSS que revela o vídeo suavemente
                    heroVideo.classList.add('is-playing');
                    
                    // Remove listeners após sucesso
                    ['mousemove', 'touchstart', 'scroll', 'click'].forEach(evt => 
                        window.removeEventListener(evt, attemptPlay)
                    );
                }).catch(error => {
                    console.log("Aguardando interação válida do usuário para tocar o vídeo...");
                });
            }
        };

        // Escuta os eventos para forçar o autoplay nativo burlado
        ['mousemove', 'touchstart', 'scroll', 'click'].forEach(evt => 
            window.addEventListener(evt, attemptPlay, { passive: true })
        );
    }
    /* ==========================================================
       WhatsApp Budget & Recruitment Modal Logic
       ========================================================== */
    const floatingCta = document.getElementById('floating-whatsapp-cta');
    const closeModalBtn = document.getElementById('close-whatsapp-modal');
    const modalOverlay = document.getElementById('whatsapp-modal');
    const modalOptions = document.querySelectorAll('.modal-opt-btn');
    const tabBtns = document.querySelectorAll('.modal-tab-btn');
    const tabPanes = document.querySelectorAll('.modal-tab-pane');

    const PHONE_NUMBER = "5511964894096";

    const MESSAGES = {
        design: "Olá, vim pelos serviços de design e gostaria de orçar um trabalho.",
        marketing: "Olá, vim pelos serviços de marketing e gostaria de orçar um trabalho.",
        fixo: "Giovani gostei do seu trabalho e gosatria de saber mais, para te contratar para minha empresa"
    };

    const openModal = () => {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (modalOverlay) {
        // Gatilho: Botão flutuante
        if (floatingCta) {
            floatingCta.addEventListener('click', openModal);
        }
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        // Fechar ao clicar fora
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        // Lógica de Troca de Abas
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                    if (pane.id === `pane-${targetTab}`) {
                        pane.classList.add('active');
                    }
                });
            });
        });

        // Lógica de Redirecionamento WhatsApp
        modalOptions.forEach(btn => {
            btn.addEventListener('click', () => {
                const service = btn.getAttribute('data-service');
                const text = encodeURIComponent(MESSAGES[service]);
                const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${text}`;
                
                window.open(whatsappUrl, '_blank');
                closeModal();
            });
        });
    }
});
