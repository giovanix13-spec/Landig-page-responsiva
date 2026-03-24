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
       Number Counter Animation (Prova Social)
       ========================================================== */
    const countElements = document.querySelectorAll('.count-up');
    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const duration = 2000; // 2 segundos
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCount = () => {
                    current += step;
                    if (current < target) {
                        el.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        el.innerText = target;
                    }
                };
                
                // Pequeno delay para sincronizar com a entrada (reveal) do elemento
                setTimeout(updateCount, 400); 
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    countElements.forEach(el => countObserver.observe(el));

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
                
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                closeModal();
            });
        });
    }

    /* ==========================================================
       Security & Privacy Hardening
       ========================================================== */
    // 1. Frame Busting (Anti-Clickjacking - Impede iframe não autorizado)
    try {
        if (window.top !== window.self) {
            window.top.location.replace(window.self.location.href);
        }
    } catch (e) {
        // Bloqueado pelo navegador
    }

    // 2. Proteção de Imagens (dificulta clique direito em imagens)
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
            e.preventDefault();
        }
    });

    // 3. Ofuscação de E-mail (protege contra bots/scrapers)
    const secureEmails = document.querySelectorAll('[data-secure-mailto="true"]');
    secureEmails.forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            const m1 = this.getAttribute('data-m1');
            const m2 = this.getAttribute('data-m2');
            if (typeof trackEvent === 'function') trackEvent('click_email', 'Contact', 'Email_Obfuscated');
            window.location.href = `mailto:${m1}@${m2}`;
        });
    });

    // 4. Validação Limpa e Honeypot (Anti-spam) no Formulário
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Honeypot check (Se _honey tiver valor, é bot)
            const honey = this.querySelector('[name="_honey"]').value;
            if (honey) {
                console.warn('Envio bloqueado (Anti-Spam).');
                return; // Silenciosamente falha pro bot
            }
            
            // Sanitização mega básica simulada contra <tags>
            const nameInput = document.getElementById('name');
            nameInput.value = nameInput.value.replace(/<[^>]*>?/gm, '');
            
            // Simulação de Sucesso / Preparação para requisição POST real futura
            if (typeof trackEvent === 'function') trackEvent('generate_lead', 'Conversion', 'Contact_Form_Submit');
            
            const btnOriginalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Protegido & Enviado! <i class="ph ph-shield-check"></i>';
            submitBtn.style.backgroundColor = '#16a085'; // verde sutil
            submitBtn.style.pointerEvents = 'none';
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = btnOriginalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.pointerEvents = 'auto';
            }, 4000);
        });
    }

    /* ==========================================================
       Global Conversion Tracking (GA4, GTM, Meta Pixel)
       ========================================================== */
    window.trackEvent = function(eventName, category, label) {
        try {
            // 1. GTM (DataLayer)
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': eventName,
                'event_category': category,
                'event_label': label
            });

            // 2. Google Ads / GA4 (gtag direct)
            if (typeof gtag === 'function') {
                gtag('event', eventName, {
                    'event_category': category,
                    'event_label': label
                });
            }

            // 3. Meta Pixel (Facebook)
            if (typeof fbq === 'function') {
                let fbEvent = 'Contact'; 
                if(eventName === 'generate_lead' || eventName === 'form_submit') fbEvent = 'Lead';
                fbq('trackCustom', fbEvent, { content_name: label, content_category: category });
            }

            console.log(`[Tracking Activo] Evento: ${eventName} | Categ: ${category} | Label: ${label}`);
        } catch(e) { console.error('Tracking Error', e); }
    };

    // A. Captura automática de Interações em Links do WhatsApp e CTAs Extras
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            const href = this.getAttribute('href') || '';
            const isBtn  = this.classList.contains('btn');
            
            if (href.includes('wa.me') || href.includes('whatsapp.com')) {
                trackEvent('click_whatsapp', 'Contact', 'WhatsApp_Direct_Link');
            } else if (href.includes('mailto:')) {
                trackEvent('click_email', 'Contact', 'Email_Direct_Link');
            } else if (isBtn) {
                trackEvent('click_cta', 'Engagement', this.innerText.trim());
            }
        });
    });

    // B. Captura do CTA Flutuante
    const floatCta = document.getElementById('floating-whatsapp-cta');
    if (floatCta) {
        floatCta.addEventListener('click', () => {
            trackEvent('click_whatsapp_floating', 'Contact', 'WhatsApp_Floating_CTA');
        });
    }

    // C. Modal Área do Cliente
    const clientModalOverride = document.getElementById('client-area-modal');
    const closeClientModalBtn = document.getElementById('close-client-modal');
    const clientForm = document.getElementById('clientAccessForm');
    const clientSubmitBtn = document.getElementById('clientSubmitBtn');

    document.querySelectorAll('.client-login-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if(clientModalOverride) {
                clientModalOverride.classList.add('active');
                document.body.style.overflow = 'hidden';
                if (typeof trackEvent === 'function') trackEvent('open_client_area', 'Engagement', 'Client_Area_Modal');
            }
        });
    });

    const closeClientModalDef = () => {
        if(clientModalOverride) {
            clientModalOverride.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (closeClientModalBtn) closeClientModalBtn.addEventListener('click', closeClientModalDef);
    
    if (clientModalOverride) {
        clientModalOverride.addEventListener('click', (e) => {
            if (e.target === clientModalOverride) closeClientModalDef();
        });
    }

    if (clientForm && clientSubmitBtn) {
        clientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const honey = this.querySelector('[name="_honey"]').value;
            if (honey) return; 

            if (typeof trackEvent === 'function') trackEvent('request_client_access', 'Lead', 'Client_Area_Request');
            
            const btnOriginalText = clientSubmitBtn.innerHTML;
            clientSubmitBtn.innerHTML = 'Solicitação Recebida! <i class="ph ph-check"></i>';
            clientSubmitBtn.style.backgroundColor = '#16a085'; 
            clientSubmitBtn.style.pointerEvents = 'none';
            
            setTimeout(() => {
                clientForm.reset();
                clientSubmitBtn.innerHTML = btnOriginalText;
                clientSubmitBtn.style.backgroundColor = '';
                clientSubmitBtn.style.pointerEvents = 'auto';
                closeClientModalDef();
            }, 3000);
        });
    }
});
