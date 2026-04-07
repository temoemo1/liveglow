// إدارة التنقل بين أقسام لوحة التحكم
let currentSection = 'dashboard';

// إظهار قسم معين
function showSection(sectionId) {
    // إخفاء جميع الأقسام
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // إظهار القسم المطلوب
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // تحديث القائمة الجانبية
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // تحديث عنوان الصفحة
    const titles = {
        'dashboard': 'لوحة التحكم الرئيسية',
        'users': 'إدارة المستخدمين',
        'streams': 'إدارة البثوث المباشرة',
        'gifts': 'إدارة الهدايا',
        'finance': 'النظام المالي',
        'reports': 'التقارير والإحصائيات',
        'moderation': 'إشراف المحتوى',
        'settings': 'إعدادات التطبيق'
    };
    
    document.getElementById('page-title').textContent = titles[sectionId] || 'لوحة التحكم';
    
    currentSection = sectionId;
    
    // تحميل الرسوم البيانية إذا لزم الأمر
    if (sectionId === 'dashboard') {
        loadCharts();
    }
}

// تبديل القائمة الجانبية في الشاشات الصغيرة
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// تحميل الرسوم البيانية
function loadCharts() {
    // رسم بياني لنمو المستخدمين
    const usersCtx = document.getElementById('usersChart');
    if (usersCtx) {
        new Chart(usersCtx, {
            type: 'line',
            data: {
                labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
                datasets: [{
                    label: 'المستخدمين الجدد',
                    data: [150, 230, 180, 320, 290, 410, 380],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // رسم بياني للإيرادات
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [{
                    label: 'الإيرادات ($)',
                    data: [15000, 18000, 22000, 17000, 25000, 28000, 32000],
                    backgroundColor: 'rgba(139, 92, 246, 0.7)',
                    borderColor: '#8b5cf6',
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // رسم بياني دائري لتوزيع الهدايا
    const giftsCtx = document.getElementById('giftsChart');
    if (giftsCtx) {
        new Chart(giftsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Pop Pass', 'Ice Cream', 'Coffee', 'Cheers', 'Love Doll', 'Diamond Fountain'],
                datasets: [{
                    data: [35, 25, 20, 12, 6, 2],
                    backgroundColor: [
                        '#6366f1',
                        '#8b5cf6',
                        '#a855f7',
                        '#d946ef',
                        '#ec4899',
                        '#f43f5e'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        rtl: true
                    }
                }
            }
        });
    }
    
    // رسم بياني للبثوث الأكثر مشاهدة
    const streamsCtx = document.getElementById('streamsChart');
    if (streamsCtx) {
        new Chart(streamsCtx, {
            type: 'horizontalBar',
            data: {
                labels: ['أحمد محمد', 'سارة علي', 'محمد أحمد', 'فاطمة حسن', 'علي محمود'],
                datasets: [{
                    label: 'عدد المشاهدين',
                    data: [2500, 1800, 1500, 1200, 950],
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.7)',
                        'rgba(139, 92, 246, 0.7)',
                        'rgba(168, 85, 247, 0.7)',
                        'rgba(217, 70, 239, 0.7)',
                        'rgba(236, 72, 153, 0.7)'
                    ],
                    borderColor: [
                        '#6366f1',
                        '#8b5cf6',
                        '#a855f7',
                        '#d946ef',
                        '#ec4899'
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

// إدارة المستخدمين
function viewUser(userId) {
    console.log('عرض المستخدم:', userId);
    // فتح نافذة منبثقة بتفاصيل المستخدم
}

function editUser(userId) {
    console.log('تعديل المستخدم:', userId);
    // فتح نموذج التعديل
}

function banUser(userId) {
    if (confirm('هل أنت متأكد من حظر هذا المستخدم؟')) {
        console.log('حظر المستخدم:', userId);
        // تنفيذ الحظر
        alert('تم حظر المستخدم بنجاح');
    }
}

// إدارة البثوث
function watchStream(streamId) {
    console.log('مشاهدة البث:', streamId);
    // فتح البث في نافذة جديدة
}

function stopStream(streamId) {
    if (confirm('هل أنت متأكد من إيقاف هذا البث؟')) {
        console.log('إيقاف البث:', streamId);
        // تنفيذ الإيقاف
        alert('تم إيقاف البث بنجاح');
    }
}

function reportStream(streamId) {
    console.log('الإبلاغ عن البث:', streamId);
    // فتح نموذج الإبلاغ
}

// إدارة الهدايا
function editGift(giftId) {
    console.log('تعديل الهدية:', giftId);
    // فتح نموذج التعديل
}

function deleteGift(giftId) {
    if (confirm('هل أنت متأكد من حذف هذه الهدية؟')) {
        console.log('حذف الهدية:', giftId);
        // تنفيذ الحذف
        alert('تم حذف الهدية بنجاح');
    }
}

function addNewGift() {
    console.log('إضافة هدية جديدة');
    // فتح نموذج إضافة هدية جديدة
}

// تصدير البيانات
function exportData() {
    console.log('تصدير البيانات');
    alert('جاري تحضير ملف التصدير... سيتم تحميله قريباً');
}

// تحديث البيانات
function refreshData() {
    console.log('تحديث البيانات');
    // إعادة تحميل البيانات
    location.reload();
}

// البحث
function searchUsers() {
    const query = document.querySelector('.search-input').value;
    console.log('البحث عن:', query);
    // تنفيذ البحث
}

// معالجة النماذج
document.addEventListener('DOMContentLoaded', () => {
    // تحميل الرسوم البيانية عند التحميل
    loadCharts();
    
    // معالجة زر تسجيل الخروج
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                window.location.href = '../app/index.html';
            }
        });
    }
    
    // معالجة أزرار الإجراءات
    document.querySelectorAll('.btn-action.view').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const userId = row.cells[1].textContent.trim();
            viewUser(userId);
        });
    });
    
    document.querySelectorAll('.btn-action.edit').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const userId = row.cells[1].textContent.trim();
            editUser(userId);
        });
    });
    
    document.querySelectorAll('.btn-action.ban').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const userId = row.cells[1].textContent.trim();
            banUser(userId);
        });
    });
    
    // معالجة أزرار الهدايا
    document.querySelectorAll('.gift-actions .btn-action.edit').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.gift-card-admin');
            const giftName = card.querySelector('h4').textContent;
            editGift(giftName);
        });
    });
    
    document.querySelectorAll('.gift-actions .btn-action.delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.gift-card-admin');
            const giftName = card.querySelector('h4').textContent;
            deleteGift(giftName);
        });
    });
    
    // معالجة زر إضافة هدية
    const addGiftBtn = document.querySelector('#gifts .btn-add');
    if (addGiftBtn) {
        addGiftBtn.addEventListener('click', addNewGift);
    }
    
    // معالجة زر تصدير البيانات
    const exportBtn = document.querySelector('.btn-export');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportData);
    }
    
    // معالجة زر التحديث
    const refreshBtn = document.querySelector('.btn-refresh');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshData);
    }
    
    // معالجة البحث
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchUsers();
            }
        });
    }
});

// تحديث الإحصائيات بشكل دوري (محاكاة)
setInterval(() => {
    if (currentSection === 'dashboard') {
        // تحديث عشوائي للإحصائيات
        console.log('تحديث الإحصائيات...');
    }
}, 30000); // كل 30 ثانية

console.log('TemoLive Admin Panel Initialized 🎛️');
