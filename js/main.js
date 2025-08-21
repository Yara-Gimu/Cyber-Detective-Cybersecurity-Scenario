// إدارة التنقل بين الشاشات
document.addEventListener('DOMContentLoaded', function() {
    // إخفاء شاشة التحميل بعد انتهاء التحميل
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
            showScreen('start');
        }, 500);
    }, 2500);
    
    // عناصر الشاشات
    const screens = {
        start: document.getElementById('start-screen'),
        help: document.getElementById('help-screen'),
        story: document.getElementById('story-screen'),
        suspects: document.getElementById('suspects-screen'),
        comparison: document.getElementById('comparison-screen'),
        evidence: document.getElementById('evidence-screen'),
        solve: document.getElementById('solve-screen')
    };
    
    // الأزرار الرئيسية
    const startBtn = document.getElementById('start-btn');
    const helpBtn = document.getElementById('help-btn');
    const continueBtn = document.getElementById('continue-btn');
    const toEvidenceBtn = document.getElementById('to-evidence-btn');
    const solveBtn = document.getElementById('solve-btn');
    const restartCaseBtn = document.getElementById('restart-case');
    const downloadReportBtn = document.getElementById('download-report');
    
    // أزرار الرجوع
    const backFromHelpBtn = document.getElementById('back-from-help');
    const backFromStoryBtn = document.getElementById('back-from-story');
    const backFromSuspectsBtn = document.getElementById('back-from-suspects');
    const backFromComparisonBtn = document.getElementById('back-from-comparison');
    const backFromEvidenceBtn = document.getElementById('back-from-evidence');
    const backFromSolveBtn = document.getElementById('back-from-solve');
    
    // تاريخ التنقل للرجوع
    let navigationHistory = [];
    
    // وظائف التنقل
    function showScreen(screenId, addToHistory = true) {
        // إخفاء جميع الشاشات
        for (const key in screens) {
            if (screens[key]) {
                screens[key].classList.remove('active');
            }
        }
        
        // إضافة إلى تاريخ التنقل إذا طلبنا ذلك
        if (addToHistory && screens[screenId]) {
            navigationHistory.push(screenId);
        }
        
        // إظهار الشاشة المطلوبة
        if (screens[screenId]) {
            screens[screenId].classList.add('active');
            
            // عند الانتقال إلى شاشة الأدلة، تأكد من عرض المحتوى الصحيح
            if (screenId === 'evidence') {
                initializeEvidence();
            }
            
            // عند الانتقال إلى شاشة الحل، تأكد من تهيئة الخيارات
            if (screenId === 'solve') {
                initializeSolution();
            }
            
            // التمرير إلى الأعلى
            window.scrollTo(0, 0);
        }
    }
    
    function goBack() {
        if (navigationHistory.length > 1) {
            // إزالة الشاشة الحالية
            navigationHistory.pop();
            // الانتقال إلى الشاشة السابقة
            const previousScreen = navigationHistory[navigationHistory.length - 1];
            showScreen(previousScreen, false);
        } else {
            // إذا لم يكن هناك تاريخ، الانتقال إلى الشاشة الرئيسية
            showScreen('start', false);
        }
    }
    
    // إضافة مستمعي الأحداث للتنقل الرئيسي
    if (startBtn) startBtn.addEventListener('click', () => showScreen('story'));
    if (helpBtn) helpBtn.addEventListener('click', () => showScreen('help'));
    if (continueBtn) continueBtn.addEventListener('click', () => showScreen('suspects'));
    if (toEvidenceBtn) toEvidenceBtn.addEventListener('click', () => showScreen('evidence'));
    if (solveBtn) solveBtn.addEventListener('click', () => showScreen('solve'));
    
    // إضافة مستمعي الأحداث لأزرار الرجوع
    if (backFromHelpBtn) backFromHelpBtn.addEventListener('click', goBack);
    if (backFromStoryBtn) backFromStoryBtn.addEventListener('click', goBack);
    if (backFromSuspectsBtn) backFromSuspectsBtn.addEventListener('click', goBack);
    if (backFromComparisonBtn) backFromComparisonBtn.addEventListener('click', goBack);
    if (backFromEvidenceBtn) backFromEvidenceBtn.addEventListener('click', goBack);
    if (backFromSolveBtn) backFromSolveBtn.addEventListener('click', goBack);
    
    // إضافة أحداث التبويبات في شاشة المشتبه بهم
    const tabButtons = document.querySelectorAll('.tab-navigation .tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة النشاط للزر المحدد
            this.classList.add('active');
            
            // عرض المحتوى المناسب
            const tabId = this.getAttribute('data-tab');
            if (tabId === 'comparison') {
                showScreen('comparison');
            } else {
                // البقاء في شاشة المشتبه بهم
                showScreen('suspects', false);
            }
        });
    });
    
    // إعادة开始 التحقيق
    if (restartCaseBtn) {
        restartCaseBtn.addEventListener('click', () => {
            // مسح الملاحظات
            const notesElement = document.getElementById('investigator-notes');
            if (notesElement) notesElement.value = '';
            
            // إعادة تعيين تاريخ التنقل
            navigationHistory = ['start'];
            
            // إعادة开始 من الشاشة الأولى
            showScreen('start', false);
        });
    }
    
    // تحميل التقرير (وهمي)
    if (downloadReportBtn) {
        downloadReportBtn.addEventListener('click', () => {
            alert('سيتم تحميل تقرير التحقيق قريباً! هذه الميزة قيد التطوير.');
        });
    }
    
    // تهيئة البيانات
    initializeSuspects();
    initializeEvidence(); // تأكد من تهيئة الأدلة أيضا
    
    // بدء من الشاشة الرئيسية
    showScreen('start');
});