// Doubleer - Анонимный проект - основной JavaScript

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initStarField();
    // initCountdown(); // Удалено - таймер больше не нужен
    initComets();
    initParticles();
    initTypewriter();
    initHoverEffects();
    initGeometricShape();
    initAnonymousMask();
    initTrackingEmoji();
    initAnonymousPortal();
});

// Создание звездного неба
function initStarField() {
    const starField = document.getElementById('star-field');
    const numStars = 200;
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Случайные размеры и позиции
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Случайная задержка для мерцания
        star.style.animationDelay = Math.random() * 3 + 's';
        
        // Разная яркость
        const brightness = Math.random() * 0.8 + 0.2;
        star.style.opacity = brightness;
        
        starField.appendChild(star);
    }
    
    // Параллакс эффект при движении мыши
    document.addEventListener('mousemove', function(e) {
        const stars = document.querySelectorAll('.star');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        stars.forEach((star, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const translateX = (x - 0.5) * speed;
            const translateY = (y - 0.5) * speed;
            star.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    });
}

// Таймер обратного отсчета (исправленный)
function initCountdown() {
    const targetDate = new Date('2025-12-31T12:00:00+03:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Обновление всех элементов
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');
            
            if (daysElement) daysElement.textContent = days.toString().padStart(3, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
            
            // Анимация цифр
            if (seconds % 5 === 0) { // Анимация каждые 5 секунд
                animateCounter('days');
                animateCounter('hours');
                animateCounter('minutes');
                animateCounter('seconds');
            }
        } else {
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');
            
            if (daysElement) daysElement.textContent = '000';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
        }
    }
    
    function animateCounter(id) {
        const element = document.getElementById(id);
        if (element) {
            anime({
                targets: element,
                scale: [1, 1.1, 1],
                duration: 200,
                easing: 'easeInOutQuad'
            });
        }
    }
    
    // Обновление каждую секунду
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Создание падающих комет
function initComets() {
    function createComet() {
        const comet = document.createElement('div');
        comet.className = 'comet';
        
        // Случайная стартовая позиция
        const startX = Math.random() * window.innerWidth;
        const startY = -50;
        
        comet.style.left = startX + 'px';
        comet.style.top = startY + 'px';
        
        document.body.appendChild(comet);
        
        // Анимация падения
        anime({
            targets: comet,
            translateX: Math.random() * 200 - 100,
            translateY: window.innerHeight + 100,
            opacity: [1, 0],
            duration: 3000 + Math.random() * 2000,
            easing: 'easeInQuad',
            complete: function() {
                comet.remove();
            }
        });
    }
    
    // Создаем кометы с интервалом
    setInterval(createComet, 3000 + Math.random() * 5000);
}

// Система частиц
function initParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '1000';
    document.body.appendChild(particleContainer);
    
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        particleContainer.appendChild(particle);
        
        // Анимация частицы
        anime({
            targets: particle,
            translateX: (Math.random() - 0.5) * 100,
            translateY: (Math.random() - 0.5) * 100,
            opacity: [1, 0],
            scale: [1, 0],
            duration: 1000,
            easing: 'easeOutQuad',
            complete: function() {
                particle.remove();
            }
        });
    }
    
    // Создание частиц при движении мыши
    document.addEventListener('mousemove', function(e) {
        if (Math.random() < 0.1) {
            createParticle(e.clientX, e.clientY);
        }
    });
    
    // Создание частиц при клике
    document.addEventListener('click', function(e) {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createParticle(e.clientX, e.clientY);
            }, i * 50);
        }
    });
}

// Эффект печати текста
function initTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #ffffff';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                element.style.borderRight = 'none';
            }
        }
        
        // Запуск анимации через 1 секунду
        setTimeout(typeWriter, 1000);
    });
}

// Hover эффекты
function initHoverEffects() {
    // Эффекты для кнопок
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Эффекты для навигации
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                translateY: -2,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        link.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                translateY: 0,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Анимация геометрической фигуры
function initGeometricShape() {
    const shape = document.querySelector('.geometric-shape');
    
    // Дополнительная анимация при наведении
    shape.addEventListener('mouseenter', function() {
        anime({
            targets: this,
            scale: 1.2,
            duration: 500,
            easing: 'easeOutQuad'
        });
        
        // Создание вихря частиц
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                particle.style.background = '#ffffff';
                document.body.appendChild(particle);
                
                anime({
                    targets: particle,
                    translateX: (Math.random() - 0.5) * 200,
                    translateY: (Math.random() - 0.5) * 200,
                    opacity: [1, 0],
                    scale: [1, 0],
                    duration: 1500,
                    easing: 'easeOutQuad',
                    complete: function() {
                        particle.remove();
                    }
                });
            }, i * 100);
        }
    });
    
    shape.addEventListener('mouseleave', function() {
        anime({
            targets: this,
            scale: 1,
            duration: 500,
            easing: 'easeOutQuad'
        });
    });
}

// Анимация маски анонимности
function initAnonymousMask() {
    const mask = document.querySelector('.anonymous-mask');
    
    mask.addEventListener('mouseenter', function() {
        anime({
            targets: this,
            scale: 1.1,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
    
    mask.addEventListener('mouseleave', function() {
        anime({
            targets: this,
            scale: 1,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
}

// Слежение смайлика за мышкой
function initTrackingEmoji() {
    const emoji = document.getElementById('tracking-emoji');
    if (!emoji) return;
    
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Ограничиваем движение смайлика
        const rotateX = (y - 0.5) * 30; // -15 до 15 градусов
        const rotateY = (x - 0.5) * 30; // -15 до 15 градусов
        
        emoji.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });
}

// Инициализация улучшенного портала анонимности
function initAnonymousPortal() {
    const portal = document.getElementById('anonymous-portal');
    if (!portal) return;
    
    portal.addEventListener('mouseenter', function() {
        // Создание дополнительных эффектов при наведении
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                particle.style.background = '#ffffff';
                particle.style.position = 'fixed';
                particle.style.zIndex = '1000';
                
                document.body.appendChild(particle);
                
                anime({
                    targets: particle,
                    translateX: (Math.random() - 0.5) * 300,
                    translateY: (Math.random() - 0.5) * 300,
                    opacity: [1, 0],
                    scale: [1, 0],
                    duration: 2000,
                    easing: 'easeOutQuad',
                    complete: function() {
                        particle.remove();
                    }
                });
            }, i * 100);
        }
    });
}

// Дополнительные эффекты
function createSpiralEffect() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.background = '#ffffff';
            document.body.appendChild(particle);
            
            const angle = (i / 50) * Math.PI * 4;
            const radius = (i / 50) * 200;
            
            anime({
                targets: particle,
                translateX: Math.cos(angle) * radius,
                translateY: Math.sin(angle) * radius,
                opacity: [1, 0],
                scale: [1, 0],
                duration: 2000,
                easing: 'easeOutQuad',
                complete: function() {
                    particle.remove();
                }
            });
        }, i * 100);
    }
}

// Запуск спирального эффекта каждые 10 секунд
setInterval(createSpiralEffect, 10000);

// Инициализация звуков (опционально)
function initAudio() {
    // Создание аудио контекста для электронных звуков
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playElectronicSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
    
    // Подключение звуков к событиям
    document.addEventListener('click', playElectronicSound);
}

// Инициализация аудио по первому клику
let audioInitialized = false;
document.addEventListener('click', function() {
    if (!audioInitialized) {
        try {
            initAudio();
            audioInitialized = true;
        } catch (error) {
            console.log('Audio not supported');
        }
    }
}, { once: true });

// Обработка изменения размера окна
window.addEventListener('resize', function() {
    // Пересоздание звезд для нового размера
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
    });
});

// Консольное сообщение
console.log(`
🎭 DOUBLEER - АНОНИМНЫЙ ПРОЕКТ 🎭
Создатель: @qeqeeeee
Запуск: 31.12.2025 12:00 МСК
Мы не забываем. Мы не прощаем. Мы не спим.
`);nction() {
    // Пересоздание звезд для нового размера
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
    });
});

// Консольное сообщение
console.log(`
🌌 КОСМИЧЕСКИЙ ХАКЕРСКИЙ ПРОЕКТ 🌌
Создатель: @qeqeeeee
Запуск: 3