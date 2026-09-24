/* =========================================================================
   GIOVANI ALMEIDA — JAVASCRIPT 2027
   Interações Sensoriais • Padrão Apple Clean • Modais & Scroll Storytelling
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Constantes & WhatsApp Integration
    // -------------------------------------------------------------
    const PHONE_NUMBER = "5511964894096";

    const WHATSAPP_MESSAGES = {
        design: "Olá Giovani! Vim pelo seu portfólio e gostaria de orçar um projeto de Design (Branding / UI / Embalagem).",
        marketing: "Olá Giovani! Vim pelo seu portfólio e gostaria de conversar sobre consultoria e estratégia de Marketing.",
        fixo: "Olá Giovani! Gostei do seu portfólio e gostaria de saber mais para te contratar para uma posição estratégica em minha empresa."
    };

    const sendToWhatsApp = (serviceKey) => {
        const text = encodeURIComponent(WHATSAPP_MESSAGES[serviceKey] || WHATSAPP_MESSAGES.design);
        const url = `https://wa.me/${PHONE_NUMBER}?text=${text}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // -------------------------------------------------------------
    // 2. Modais: WhatsApp (Contato Direto) & Área do Cliente
    // -------------------------------------------------------------
    const whatsappModal = document.getElementById('whatsapp-modal');
    const closeWhatsAppModalBtn = document.getElementById('close-whatsapp-modal');
    const floatingWhatsAppBtn = document.getElementById('floating-whatsapp-cta');
    const openContactModalBtn = document.getElementById('open-contact-modal-btn');
    const openWhatsAppModalHub = document.getElementById('open-whatsapp-modal-hub');
    const modalOptCards = document.querySelectorAll('.modal-opt-card');
    const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
    const modalTabPanes = document.querySelectorAll('.modal-tab-pane');

    const clientModal = document.getElementById('client-area-modal');
    const closeClientModalBtn = document.getElementById('close-client-modal');
    const clientLoginLinks = document.querySelectorAll('.client-login-link');

    // Abre modal de WhatsApp
    const openWhatsAppModal = () => {
        if (whatsappModal) {
            whatsappModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeWhatsAppModal = () => {
        if (whatsappModal) {
            whatsappModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Abre modal de Área do Cliente
    const openClientModal = () => {
        if (clientModal) {
            clientModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeClientModal = () => {
        if (clientModal) {
            clientModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Eventos WhatsApp Modal
    if (floatingWhatsAppBtn) floatingWhatsAppBtn.addEventListener('click', openWhatsAppModal);
    if (openContactModalBtn) openContactModalBtn.addEventListener('click', openWhatsAppModal);
    if (openWhatsAppModalHub) openWhatsAppModalHub.addEventListener('click', openWhatsAppModal);
    if (closeWhatsAppModalBtn) closeWhatsAppModalBtn.addEventListener('click', closeWhatsAppModal);

    if (whatsappModal) {
        whatsappModal.addEventListener('click', (e) => {
            if (e.target === whatsappModal) closeWhatsAppModal();
        });
    }

    // Troca de Abas no Modal WhatsApp
    modalTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            modalTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            modalTabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `pane-${targetTab}`) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // Clique nas opções direciona para o WhatsApp
    modalOptCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceKey = card.getAttribute('data-service');
            sendToWhatsApp(serviceKey);
            closeWhatsAppModal();
        });
    });

    // Eventos Área do Cliente
    clientLoginLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openClientModal();
        });
    });

    if (closeClientModalBtn) closeClientModalBtn.addEventListener('click', closeClientModal);
    if (clientModal) {
        clientModal.addEventListener('click', (e) => {
            if (e.target === clientModal) closeClientModal();
        });
    }

    // Fechar com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeWhatsAppModal();
            closeClientModal();
        }
    });

    // -------------------------------------------------------------
    // 3. Botão Copiar E-mail com Feedback Rápido
    // -------------------------------------------------------------
    const copyEmailBtn = document.getElementById('btn-copy-email');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('contato@giovanialmeida.com').then(() => {
                const tooltip = copyEmailBtn.querySelector('.copy-tooltip');
                if (tooltip) {
                    const originalText = tooltip.textContent;
                    tooltip.textContent = 'Copiado!';
                    setTimeout(() => {
                        tooltip.textContent = originalText;
                    }, 2000);
                }
            }).catch(() => {
                window.location.href = 'mailto:contato@giovanialmeida.com';
            });
        });
    }

    // -------------------------------------------------------------
    // 4. Menu Mobile Overlay
    // -------------------------------------------------------------
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMobileMenu = () => {
        if (mobileOverlay) {
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        }
    };

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileLinks.forEach(l => l.addEventListener('click', toggleMobileMenu));

    // -------------------------------------------------------------
    // 5. Hero Fullscreen: Reprodução e Roll Animation
    // -------------------------------------------------------------
    const heroVideo = document.getElementById('heroVideo');
    const heroContent = document.querySelector('.hero-content-overlay');
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    const appleNav = document.querySelector('.apple-nav-header');

    if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.playsInline = true;
        heroVideo.loop = true;

        const attemptPlay = () => {
            const playPromise = heroVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    const onUserAction = () => {
                        heroVideo.play().catch(() => {});
                        ['scroll', 'touchstart', 'click', 'mousemove'].forEach(evt => {
                            window.removeEventListener(evt, onUserAction);
                        });
                    };
                    ['scroll', 'touchstart', 'click', 'mousemove'].forEach(evt => {
                        window.addEventListener(evt, onUserAction, { passive: true, once: true });
                    });
                });
            }
        };
        attemptPlay();
    }

    // -------------------------------------------------------------
    // 6. Scroll Storytelling (Roll Parallax com Fidelidade FHD)
    // -------------------------------------------------------------
    let isTicking = false;

    const onScrollUpdate = () => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        // Roll no Hero (apenas translação e escala suave, sem tocar na imagem pura em FHD!)
        if (scrollY <= vh * 1.2) {
            const progress = Math.min(scrollY / vh, 1);

            if (heroVideo) {
                const scaleVal = 1.02 + progress * 0.05;
                const translateYVal = scrollY * 0.28;
                heroVideo.style.transform = `scale(${scaleVal}) translateY(${translateYVal}px)`;
            }

            if (heroContent) {
                const textOpacity = Math.max(1 - progress * 1.7, 0);
                const textTranslate = -scrollY * 0.24;
                heroContent.style.opacity = textOpacity;
                heroContent.style.transform = `translateY(${textTranslate}px)`;
            }

            if (scrollIndicator) {
                scrollIndicator.style.opacity = Math.max(1 - progress * 4, 0);
            }
        }

        // Navbar Apple adaptativa (apenas adiciona 'on-hero' se o vídeo hero estiver na página)
        if (appleNav) {
            if (heroVideo && scrollY <= vh * 0.7) {
                appleNav.classList.add('on-hero');
            } else {
                appleNav.classList.remove('on-hero');
            }
        }

        isTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(onScrollUpdate);
            isTicking = true;
        }
    }, { passive: true });

    onScrollUpdate();

    // -------------------------------------------------------------
    // 7. Scroll Reveal Suave para Seções
    // -------------------------------------------------------------
    const revealElements = document.querySelectorAll('.project-card, .process-step, .manifesto-grid, .bio-photo-card, .bio-text-block, .matrix-column, .contact-channel-card, .contact-hub-left, .career-card, .personal-lifestyle-card, .role-badge, .skill-category, .apple-case-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    // -------------------------------------------------------------
    // 8. Controles do Carrossel Apple (cases.html)
    // -------------------------------------------------------------
    const carouselTrackWrapper = document.getElementById('apple-carousel-wrapper');
    const carouselPrevBtn = document.getElementById('apple-carousel-prev');
    const carouselNextBtn = document.getElementById('apple-carousel-next');

    if (carouselTrackWrapper && carouselPrevBtn && carouselNextBtn) {
        carouselPrevBtn.addEventListener('click', () => {
            carouselTrackWrapper.scrollBy({
                left: -440,
                behavior: 'smooth'
            });
        });

        carouselNextBtn.addEventListener('click', () => {
            carouselTrackWrapper.scrollBy({
                left: 440,
                behavior: 'smooth'
            });
        });
    }

    // -------------------------------------------------------------
    // 9. Scroll Suave para Links Internos
    // -------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // -------------------------------------------------------------
    // 10. Controle de Áudio do Banner com Legenda
    // -------------------------------------------------------------
    const methodologyVideo = document.getElementById('methodologyVideo');
    const toggleSoundBtn = document.getElementById('toggleMethodologySound');
    const soundIcon = document.getElementById('soundIcon');
    const soundText = document.getElementById('soundText');

    if (toggleSoundBtn && methodologyVideo) {
        toggleSoundBtn.addEventListener('click', () => {
            methodologyVideo.muted = !methodologyVideo.muted;
            if (methodologyVideo.muted) {
                if (soundIcon) soundIcon.className = 'ph ph-speaker-simple-slash';
                if (soundText) soundText.textContent = 'Ativar Áudio';
            } else {
                if (soundIcon) soundIcon.className = 'ph ph-speaker-simple-high';
                if (soundText) soundText.textContent = 'Desativar Áudio';
            }
        });
    }
});
