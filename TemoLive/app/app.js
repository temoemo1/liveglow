// إدارة التنقل بين الصفحات
let currentPage = 'auth';
let userBalance = 10000; // رصيد افتراضي
let currentStream = null;

// دالة إظهار صفحة التسجيل
function showSignup() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
}

// دالة إظهار تسجيل الدخول
function showLogin() {
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
}

// التبديل بين الصفحات
function switchPage(pageId) {
    // إخفاء جميع الصفحات
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.classList.add('hidden');
    });
    
    // إظهار الصفحة المطلوبة
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
        targetPage.classList.add('active');
    }
    
    currentPage = pageId;
}

// فتح البث المباشر
function openStream(streamId) {
    currentStream = streamId;
    switchPage('stream');
    
    // محاكاة تحميل الفيديو
    setTimeout(() => {
        console.log('Stream loaded:', streamId);
        // هنا يتم ربط الفيديو الفعلي
    }, 500);
    
    // بدء تحديث عدد المشاهدين
    updateViewerCount();
}

// إغلاق البث المباشر
function closeStream() {
    currentStream = null;
    switchPage('home');
}

// تحديث عدد المشاهدين بشكل عشوائي
function updateViewerCount() {
    if (!currentStream) return;
    
    const viewerElement = document.getElementById('viewer-count');
    if (viewerElement) {
        let count = parseInt(viewerElement.textContent.replace(',', ''));
        count += Math.floor(Math.random() * 20) - 10;
        count = Math.max(100, count);
        viewerElement.textContent = count.toLocaleString();
    }
    
    setTimeout(updateViewerCount, 3000);
}

// إرسال رسالة في الدردشة
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message) {
        addChatMessage(message, 'user');
        input.value = '';
        
        // محاكاة ردود تلقائية
        setTimeout(() => {
            const responses = [
                'رائع! 👍',
                'ممتاز 🎉',
                'أحب هذا البث ❤️',
                'استمر يا بطل! 💪'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addChatMessage(randomResponse, 'viewer');
        }, 1000 + Math.random() * 2000);
    }
}

// إضافة رسالة للدردشة
function addChatMessage(text, type) {
    const chatContainer = document.getElementById('chat-messages');
    if (!chatContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message';
    
    if (type === 'user') {
        messageDiv.style.color = '#4ecdc4';
        messageDiv.innerHTML = `<strong>أنت:</strong> ${text}`;
    } else {
        messageDiv.style.color = '#ffffff';
        const usernames = ['أحمد', 'سارة', 'محمد', 'فاطمة', 'علي'];
        const username = usernames[Math.floor(Math.random() * usernames.length)];
        messageDiv.innerHTML = `<strong>${username}:</strong> ${text}`;
    }
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// فتح لوحة الهدايا
function openGiftPanel() {
    document.getElementById('gift-panel').classList.remove('hidden');
}

// إغلاق لوحة الهدايا
function closeGiftPanel() {
    document.getElementById('gift-panel').classList.add('hidden');
}

// إرسال هدية
function sendGift(giftId, price) {
    if (price === 'random') {
        price = Math.floor(Math.random() * 1000) + 100;
    }
    
    if (userBalance < price) {
        alert('رصيدك غير كافٍ! يرجى شحن المحفظة.');
        return;
    }
    
    // خصم السعر من الرصيد
    userBalance -= price;
    updateBalance();
    
    // إظهار تأثير الهدية
    showGiftAnimation(giftId);
    
    // إغلاق لوحة الهدايا
    closeGiftPanel();
    
    // إضافة رسالة للهدية في الدردشة
    const giftNames = {
        'pop-pass': 'Pop Pass',
        'ice-cream': 'Ice Cream 🍦',
        'coffee': 'Coffee ☕',
        'cheers': 'Cheers 🎉',
        'love-doll': 'Love Doll 💕',
        'boxing': 'Boxing 🥊',
        'diamond-fountain': 'Diamond Fountain 💎',
        'lucky-box': 'Lucky Box 🎁'
    };
    
    const giftName = giftNames[giftId] || giftId;
    addChatMessage(`<span style="color: #ff6b6b;">🎁 أرسل هدية ${giftName}</span>`, 'user');
    
    // تشغيل صوت الهدية
    playGiftSound(giftId);
}

// إظهار تأثير الهدية
function showGiftAnimation(giftId) {
    const animationContainer = document.getElementById('gift-animation');
    const contentDiv = animationContainer.querySelector('.animation-content');
    
    const giftEmojis = {
        'pop-pass': '🎫',
        'ice-cream': '🍦',
        'coffee': '☕',
        'cheers': '🎉',
        'love-doll': '💕',
        'boxing': '🥊',
        'diamond-fountain': '💎',
        'lucky-box': '🎁'
    };
    
    contentDiv.textContent = giftEmojis[giftId] || '🎁';
    contentDiv.className = `animation-content gift-effect-${giftId}`;
    
    animationContainer.classList.remove('hidden');
    
    // إخفاء التأثير بعد انتهاء الحركة
    setTimeout(() => {
        animationContainer.classList.add('hidden');
        contentDiv.className = 'animation-content';
    }, 3000);
}

// تشغيل صوت الهدية
function playGiftSound(giftId) {
    // هنا يمكن إضافة ملفات الصوت الفعلية
    console.log('Playing sound for:', giftId);
    
    // محاكاة الأصوات المختلفة
    const sounds = {
        'pop-pass': 'pop',
        'ice-cream': 'crunch',
        'coffee': 'pour',
        'cheers': 'celebration',
        'love-doll': 'romantic',
        'boxing': 'punch',
        'diamond-fountain': 'sparkle',
        'lucky-box': 'surprise'
    };
    
    // في التطبيق الحقيقي، سيتم تشغيل الملفات الصوتية
    // const audio = new Audio(`assets/audio/${sounds[giftId]}.mp3`);
    // audio.play();
}

// تحديث الرصيد المعروض
function updateBalance() {
    const balanceElements = document.querySelectorAll('.balance');
    balanceElements.forEach(el => {
        el.textContent = `${userBalance.toLocaleString()} عملة`;
    });
}

// دعم Enter لإرسال الرسائل
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // معالجة نماذج التسجيل
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // محاكاة تسجيل الدخول
            switchPage('home');
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // محاكاة إنشاء حساب
            switchPage('home');
        });
    }
    
    // تحديث عداد PK Battle
    startPKTimer();
});

// مؤقت معركة PK
function startPKTimer() {
    const timerElement = document.getElementById('pk-time');
    if (!timerElement) return;
    
    let timeLeft = 180; // 3 دقائق
    
    const interval = setInterval(() => {
        if (timeLeft <= 0 || currentPage !== 'pk') {
            clearInterval(interval);
            return;
        }
        
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // تحديث نقاط اللاعبين بشكل عشوائي
        updatePKScores();
    }, 1000);
}

// تحديث نقاط PK
function updatePKScores() {
    const score1 = document.getElementById('score1');
    const score2 = document.getElementById('score2');
    const progress1 = document.getElementById('progress1');
    const progress2 = document.getElementById('progress2');
    
    if (!score1 || !score2) return;
    
    let s1 = parseInt(score1.textContent) + Math.floor(Math.random() * 100);
    let s2 = parseInt(score2.textContent) + Math.floor(Math.random() * 100);
    
    score1.textContent = s1.toLocaleString();
    score2.textContent = s2.toLocaleString();
    
    const total = s1 + s2;
    if (total > 0) {
        const p1 = (s1 / total) * 100;
        progress1.style.width = `${p1}%`;
        progress2.style.width = `${100 - p1}%`;
    }
}

// بدء بث مباشر جديد
function startNewStream() {
    // طلب إذن الكاميرا والميكروفون
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                const video = document.getElementById('live-video');
                if (video) {
                    video.srcObject = stream;
                    video.play();
                }
                console.log('Stream started successfully');
            })
            .catch(error => {
                console.error('Error accessing media devices:', error);
                alert('لا يمكن الوصول إلى الكاميرا أو الميكروفون');
            });
    }
}

// مشاركة البث
function shareStream() {
    if (navigator.share) {
        navigator.share({
            title: 'TemoLive - بث مباشر',
            text: 'شاهد هذا البث المباشر على TemoLive!',
            url: window.location.href
        }).catch(console.error);
    } else {
        alert('تم نسخ رابط البث إلى الحافظة');
    }
}

// متابعة المذيع
function toggleFollow() {
    const btn = document.querySelector('.btn-follow-large');
    if (btn) {
        if (btn.textContent === 'متابعة') {
            btn.textContent = 'متابَع';
            btn.style.background = '#ccc';
        } else {
            btn.textContent = 'متابعة';
            btn.style.background = 'var(--primary-color)';
        }
    }
}

// تبديل فئات الهدايا
function filterGifts(category) {
    document.querySelectorAll('.gift-cat-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // تصفية الهدايا حسب الفئة
    const gifts = document.querySelectorAll('.gift-item');
    gifts.forEach(gift => {
        if (category === 'الكل') {
            gift.style.display = 'block';
        } else {
            // منطق التصفية هنا
            gift.style.display = 'block';
        }
    });
}

// شحن الرصيد
function rechargeBalance(amount) {
    // محاكاة عملية الشحن
    userBalance += amount || 1000;
    updateBalance();
    alert(`تم شحن ${amount || 1000} عملة بنجاح!`);
}

// تسجيل الخروج
function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        switchPage('auth');
        userBalance = 10000;
        updateBalance();
    }
}

console.log('TemoLive App Initialized 🚀');
