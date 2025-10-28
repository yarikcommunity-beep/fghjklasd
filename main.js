// Слежение смайлика за мышкой
function initTrackingEmoji() {
    const emoji = document.getElementById('tracking-emoji');
    if (!emoji) return;
    
    document.addEventListener('mousemove', function(e) {
        const rect = emoji.getBoundingClientRect();
        const emojiCenterX = rect.left + rect.width / 2;
        const emojiCenterY = rect.top + rect.height / 2;
        
        // Вычисляем разницу между позицией мыши и центром эмодзи
        const deltaX = e.clientX - emojiCenterX;
        const deltaY = e.clientY - emojiCenterY;
        
        // Вычисляем углы поворота (максимум 25 градусов)
        const rotateX = Math.min(Math.max(-deltaY / 10, -25), 25);
        const rotateY = Math.min(Math.max(deltaX / 10, -25), 25);
        
        // Применяем трансформацию с плавным переходом
        emoji.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // Возвращаем в исходное положение, когда мышь уходит
    document.addEventListener('mouseleave', function() {
        emoji.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
}

// Вызываем функцию после загрузки страницы
document.addEventListener('DOMContentLoaded', initTrackingEmoji);