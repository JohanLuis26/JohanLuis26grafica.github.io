document.addEventListener('DOMContentLoaded', function () {
    
    const botonModo = document.getElementById('boton-modo');
    const iconoModo = document.getElementById('icono-modo');
    const textoModo = document.getElementById('texto-modo');

    const modoGuardado = localStorage.getItem('modo-claro');
    if (modoGuardado === 'activado') {
        document.body.classList.add('modo-claro');
        actualizarBoton(true);
    }

    function actualizarBoton(modoClaro) {
        if (modoClaro) {
            iconoModo.textContent = '☀️';
            textoModo.textContent = 'CLARO';
        } else {
            iconoModo.textContent = '🌙';
            textoModo.textContent = 'OSCURO';
        }
    }

    if (botonModo) {
        botonModo.addEventListener('click', function () {
            const esModoClaro = document.body.classList.toggle('modo-claro');
            localStorage.setItem('modo-claro', esModoClaro ? 'activado' : 'desactivado');
            actualizarBoton(esModoClaro);
        });
    }
    
    const sidebarMenu = document.getElementById('sidebar-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainContent = document.querySelector('.main-content');
    const navLinks = document.querySelectorAll('#sidebar-menu nav a');

    function isDesktop() {
        return window.innerWidth >= 1024;
    }

    function isMenuOpen() {
        if (!sidebarMenu) return false;
        if (isDesktop()) {
            return !sidebarMenu.classList.contains('desktop-hidden');
        } else {
            return sidebarMenu.classList.contains('open');
        }
    }

    function openMenu() {
        if (!sidebarMenu) return;
        
        if (isDesktop()) {
            sidebarMenu.classList.remove('desktop-hidden');
            if (mainContent) mainContent.classList.remove('full-width');
            if (menuOverlay) menuOverlay.classList.remove('active');
        } else {
            sidebarMenu.classList.add('open');
            if (menuOverlay) menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        document.body.classList.add('sidebar-open');
        localStorage.setItem('sidebar-open', 'true');
    }

    function closeMenu() {
        if (!sidebarMenu) return;
        
        if (isDesktop()) {
            sidebarMenu.classList.add('desktop-hidden');
            if (mainContent) mainContent.classList.add('full-width');
            if (menuOverlay) menuOverlay.classList.remove('active');
        } else {
            sidebarMenu.classList.remove('open');
            if (menuOverlay) menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (hamburgerBtn) hamburgerBtn.classList.remove('active');
        document.body.classList.remove('sidebar-open');
        localStorage.setItem('sidebar-open', 'false');
    }

    window.toggleMenu = function() {
        if (!sidebarMenu) return;
        
        if (isMenuOpen()) {
            closeMenu();
        } else {
            openMenu();
        }
    };
    
    const sidebarState = localStorage.getItem('sidebar-open');
    if (sidebarState === 'false') {
        closeMenu();
    } else if (sidebarState === 'true') {
        openMenu();
    } else {
        if (isDesktop()) {
            openMenu();
        } else {
            closeMenu();
        }
    }
    
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.toggleMenu();
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (!isDesktop()) {
                closeMenu();
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen()) {
            closeMenu();
        }
    });

    if (sidebarMenu) {
        sidebarMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const ahoraEsDesktop = isDesktop();
            const estabaAbierto = localStorage.getItem('sidebar-open') === 'true';
            
            if (ahoraEsDesktop) {
                sidebarMenu.classList.remove('open');
                if (estabaAbierto) {
                    sidebarMenu.classList.remove('desktop-hidden');
                    if (mainContent) mainContent.classList.remove('full-width');
                } else {
                    sidebarMenu.classList.add('desktop-hidden');
                    if (mainContent) mainContent.classList.add('full-width');
                }
                if (menuOverlay) menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                sidebarMenu.classList.remove('desktop-hidden');
                if (estabaAbierto) {
                    sidebarMenu.classList.add('open');
                    if (menuOverlay) menuOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                } else {
                    sidebarMenu.classList.remove('open');
                    if (menuOverlay) menuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
            
            if (hamburgerBtn) {
                if (isMenuOpen()) {
                    hamburgerBtn.classList.add('active');
                } else {
                    hamburgerBtn.classList.remove('active');
                }
            }
            
            if (isMenuOpen()) {
                document.body.classList.add('sidebar-open');
            } else {
                document.body.classList.remove('sidebar-open');
            }
            
            if (mainContent) {
                if (ahoraEsDesktop && !isMenuOpen()) {
                    mainContent.classList.add('full-width');
                } else {
                    mainContent.classList.remove('full-width');
                }
            }
            
        }, 250);
    });

});