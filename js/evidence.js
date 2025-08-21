// بيانات الأدلة
const evidenceData = {
    fileLogs: [
        { username: 'Majed', action: 'Copy', fileName: 'Q4 Sales_Rep', fileSize: '2.5 MB', date: '22/08/2025', time: '01:30 AM' },
        { username: 'Layla', action: 'Access', fileName: '01 Customer Data.Csv', fileSize: '150 MB', date: '21/08/2025', time: '10:00 PM' },
        { username: 'Sami', action: 'Export', fileName: 'Malin_Customer_Database', fileSize: '3.8 GB', date: '21/08/2025', time: '09:45 PM' },
        { username: 'Majed', action: 'Access', fileName: 'Q2 Customer_Data.csv', fileSize: '200 MB', date: '21/08/2025', time: '09:30 PM' },
        { username: 'Sami', action: 'Access', fileName: 'Daily.Sales_Report.xlsx', fileSize: '1.2 MB', date: '21/08/2025', time: '04:00 PM' }
    ],
    networkLogs: [
        { username: 'Layla', date: '21/08/2025', time: '09:50 PM', device: 'Personal Phone' },
        { username: 'Majed', date: '21/08/2025', time: '09:00 PM', device: 'Office Computer' },
        { username: 'Sami', date: '24/08/2025', time: '09:40 PM', device: 'Unknown Device' }
    ],
    performance: [
        { employee: 'Sami', review: 'حصل مؤخرًا على تقييم أداء ضعيف وتم تحذيره بسبب ضعف أدائه. هناك ملاحظات حول عدم تحقيق أهداف المبيعات للربعين الأخيرين.' },
        { employee: 'Layla', review: 'أداء جيد خلال الفترة التجريبية. تظهر حماسًا للعمل ولكنها لا تزال تتعلم أنظمة الشركة.' },
        { employee: 'Majed', review: 'أداء متميز بشكل مستمر. يعمل بساعات إضافية طوعًا وغالبًا ما يتجاوز توقعات الأداء.' }
    ]
};

// تهيئة عرض الأدلة
function initializeEvidence() {
    const tabButtons = document.querySelectorAll('.evidence-tabs .tab-btn');
    const evidenceContent = document.getElementById('evidence-content');
    
    // إضافة مستمعي الأحداث لأزرار التبويب
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة النشاط للزر المحدد
            this.classList.add('active');
            
            // عرض المحتوى المناسب
            const tabId = this.getAttribute('data-tab');
            showEvidenceTab(tabId);
        });
    });
    
    // عرض المحتوى الأولي
    showEvidenceTab('file-logs');
}

// عرض محتوى تبويب الأدلة المحدد
function showEvidenceTab(tabId) {
    const evidenceContent = document.getElementById('evidence-content');
    
    switch(tabId) {
        case 'file-logs':
            evidenceContent.innerHTML = generateFileLogsTable();
            break;
        case 'network-logs':
            evidenceContent.innerHTML = generateNetworkLogsTable();
            break;
        case 'performance':
            evidenceContent.innerHTML = generatePerformanceReviews();
            break;
    }
}

// إنشاء جدول سجلات الملفات
function generateFileLogsTable() {
    let html = `<h3><i class="fas fa-file"></i> سجلات الوصول إلى الملفات</h3>
                <p class="table-description">سجلات أنشطة الملفات خلال الأسبوع الماضي. لاحظ حجم الملفات وأوقات الوصول.</p>
                <div class="table-container">
                <table class="evidence-table">
                    <thead>
                        <tr>
                            <th>المستخدم</th>
                            <th>الإجراء</th>
                            <th>اسم الملف</th>
                            <th>حجم الملف</th>
                            <th>التاريخ</th>
                            <th>الوقت</th>
                        </tr>
                    </thead>
                    <tbody>`;
    
    evidenceData.fileLogs.forEach(log => {
        // تمييز الصف إذا كان حجم الملف كبيرًا أو إجراء تصدير
        const isSuspicious = log.fileSize.includes('GB') || log.action === 'Export';
        const rowClass = isSuspicious ? 'class="suspicious-row"' : '';
        
        html += `<tr ${rowClass}>
                    <td>${log.username}</td>
                    <td><span class="action-badge action-${log.action.toLowerCase()}">${log.action}</span></td>
                    <td>${log.fileName}</td>
                    <td>${log.fileSize}</td>
                    <td>${log.date}</td>
                    <td>${log.time}</td>
                </tr>`;
    });
    
    html += `</tbody></table></div>`;
    return html;
}

// إنشاء جدول سجلات الشبكة
function generateNetworkLogsTable() {
    let html = `<h3><i class="fas fa-network-wired"></i> سجلات الوصول إلى الشبكة (VPN)</h3>
                <p class="table-description">سجلات اتصالات VPN خلال الأسبوع الماضي. لاحظ الأوقات والأجهزة المستخدمة.</p>
                <div class="table-container">
                <table class="evidence-table">
                    <thead>
                        <tr>
                            <th>المستخدم</th>
                            <th>التاريخ</th>
                            <th>الوقت</th>
                            <th>الجهاز المستخدم</th>
                        </tr>
                    </thead>
                    <tbody>`;
    
    evidenceData.networkLogs.forEach(log => {
        // تمييز الصف إذا كان الجهاز غير معروف أو خارج وقت العمل
        const isSuspicious = log.device === 'Unknown Device' || log.time.includes('PM');
        const rowClass = isSuspicious ? 'class="suspicious-row"' : '';
        
        html += `<tr ${rowClass}>
                    <td>${log.username}</td>
                    <td>${log.date}</td>
                    <td>${log.time}</td>
                    <td>${log.device}</td>
                </tr>`;
    });
    
    html += `</tbody></table></div>`;
    return html;
}

// إنشاء عرض تقييمات الأداء
function generatePerformanceReviews() {
    let html = `<h3><i class="fas fa-chart-line"></i> تقييمات أداء الموظفين</h3>
                <p class="table-description">آخر تقييمات أداء للموظفين المشتبه بهم. قد توفر هذه التقييمات دوافع محتملة.</p>`;
    
    evidenceData.performance.forEach(review => {
        // تحديد لون التقييم بناء على المحتوى
        let reviewClass = 'neutral-review';
        if (review.review.includes('ضعف') || review.review.includes('تحذير')) {
            reviewClass = 'negative-review';
        } else if (review.review.includes('متميز') || review.review.includes('جيد')) {
            reviewClass = 'positive-review';
        }
        
        html += `<div class="performance-review ${reviewClass}">
                    <h4>${review.employee}</h4>
                    <p>${review.review}</p>
                 </div>`;
    });
    
    return html;
}