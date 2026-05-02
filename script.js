const handleAuth = () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    // Твои настройки доступа
    const correctUser = "sister2026";
    const correctPass = "luchshaya";

    if (user === correctUser && pass === correctPass) {
        const overlay = document.getElementById('login-overlay');
        overlay.style.opacity = '0'; // Запускаем анимацию исчезновения
        setTimeout(() => {
            overlay.style.display = 'none'; // Полностью удаляем из верстки
        }, 800);
    } else {
        errorMsg.classList.remove('hidden'); // Показываем текст ошибки
    }
};

// Привязка событий (добавь это внутрь существующего document.addEventListener('DOMContentLoaded', ...))
// Находим место, где начинаются твои переменные, и добавь:
document.getElementById('loginBtn').addEventListener('click', handleAuth);
// Ждем загрузки документа
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const music = document.getElementById('bgMusic');
    const heartContainer = document.getElementById('heart-container');
    const card = document.getElementById('card-wrapper');
    const dotBtnWrapper = document.getElementById('dot-btn-wrapper');
    const nextStepWrapper = document.getElementById('next-step-wrapper');

    // 1. Указываем только 3 фотографии
    const photoFiles = ['1.jpg', '2.jpg', '3.jpg'];

    // ЭТАП 1: Нажатие на "Жми"
    startBtn.addEventListener('click', () => {
        // Быстрое исчезновение за 0.1 сек с уменьшением масштаба
        gsap.to(startBtn, { 
            duration: 0.1, 
            opacity: 0, 
            scale: 0.5, 
            onComplete: () => {
                document.getElementById('start-wrapper').classList.add('hidden');
            }
        });

        // Запуск музыки[cite: 17]
        music.volume = 0;
        music.play();
        gsap.to(music, { duration: 3, volume: 1 });

        createHeart();
    });

    // Функция создания сердца из фото
    function createHeart() {
        const totalPhotos = 40; 
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < totalPhotos; i++) {
            const img = document.createElement('img');
            // Выбор фото из массива по кругу[cite: 17]
            img.src = photoFiles[i % photoFiles.length];
            img.className = 'heart-photo';
            
            // Начальная позиция за экраном[cite: 17]
            const side = Math.floor(Math.random() * 4);
            if(side === 0) { img.style.left = "-100px"; img.style.top = Math.random() * window.innerHeight + "px"; }
            else { img.style.left = window.innerWidth + 100 + "px"; img.style.top = Math.random() * window.innerHeight + "px"; }

            heartContainer.appendChild(img);

            // Математика формы сердца[cite: 17]
            const t = (i / totalPhotos) * 2 * Math.PI;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            
            const finalX = centerX + x * 15; 
            const finalY = centerY + y * 15;

            // Сборка сердца через GSAP[cite: 17]
            gsap.to(img, {
                duration: 2,
                left: finalX - 40,
                top: finalY - 40,
                ease: "power2.out",
                delay: i * 0.02
            });

            // Эффект покачивания[cite: 17]
            gsap.to(img, {
                y: "+=15",
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: Math.random() * 2
            });
        }

        // Появление кнопки "..." через 3 секунды[cite: 17]
        setTimeout(() => {
            dotBtnWrapper.classList.remove('hidden');
            gsap.to(dotBtnWrapper, { duration: 1.5, opacity: 1 });
        }, 3000);
    }

    // Обработка кнопки "..."[cite: 17]
    document.getElementById('dotBtn').addEventListener('click', () => {
        gsap.to(dotBtnWrapper, { duration: 0.5, opacity: 0, onComplete: () => {
            dotBtnWrapper.classList.add('hidden');
            card.classList.remove('hidden');
            gsap.to(card, { duration: 0.8, opacity: 1, scale: 1 });
        }});
    });

    // Закрытие открытки[cite: 17]
    document.getElementById('closeCard').onclick = () => {
        gsap.to(card, { duration: 0.5, opacity: 0, scale: 0.5, onComplete: () => {
            card.classList.add('hidden');
            nextStepWrapper.classList.remove('hidden');
            gsap.to(nextStepWrapper, { duration: 1, opacity: 1 });
        }});
    };
});