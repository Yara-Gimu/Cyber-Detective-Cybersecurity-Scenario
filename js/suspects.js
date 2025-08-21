// بيانات المشتبه بهم
const suspectsData = [
    {
        id: 'sami',
        name: 'Sami',
        description: 'موظف قديم، لديه تاريخ أداء ضعيف',
        image: 'assets/icons/sami.png',
        details: {
            age: '42 سنة',
            position: 'مندوب مبيعات أول',
            employment: '6 سنوات في الشركة',
            lastEvaluation: 'ضعف في تحقيق الأهداف',
            accessLevel: 'مستوى وصول عالي لجميع قواعد البيانات'
        }
    },
    {
        id: 'layla',
        name: 'Layla',
        description: 'موظفة جديدة، سجل نظيف ومحايد',
        image: 'assets/icons/layla.png',
        details: {
            age: '28 سنة',
            position: 'مندوبة مبيعات',
            employment: '3 أشهر في الشركة',
            lastEvaluation: 'أداء جيد خلال الفترة التجريبية',
            accessLevel: 'مستوى وصول محدود للبيانات الأساسية فقط'
        }
    },
    {
        id: 'majed',
        name: 'Majed',
        description: 'موظف مجتهد يعمل لساعات متأخرة، قد يكون مشتبه فيه',
        image: 'assets/icons/majed.png',
        details: {
            age: '35 سنة',
            position: 'منسق المبيعات',
            employment: '3 سنوات في الشركة',
            lastEvaluation: 'يتجاوز التوقعات باستمرار',
            accessLevel: 'مستوى وصول متوسط لبيانات المبيعات'
        }
    }
];

// تهيئة عرض المشتبه بهم
function initializeSuspects() {
    const suspectsContainer = document.getElementById('suspects-container');
    suspectsContainer.innerHTML = '';
    
    suspectsData.forEach(suspect => {
        const suspectCard = document.createElement('div');
        suspectCard.className = 'suspect-card';
        suspectCard.innerHTML = `
            <img src="${suspect.image}" alt="${suspect.name}">
            <h3>${suspect.name}</h3>
            <div class="suspect-details">
                <p><strong>العمر:</strong> ${suspect.details.age}</p>
                <p><strong>المنصب:</strong> ${suspect.details.position}</p>
                <p><strong>مدة العمل:</strong> ${suspect.details.employment}</p>
                <p><strong>آخر تقييم:</strong> ${suspect.details.lastEvaluation}</p>
                <p><strong>مستوى الوصول:</strong> ${suspect.details.accessLevel}</p>
            </div>
        `;
        
        // إضافة حدث النقر لعرض التفاصيل
        suspectCard.addEventListener('click', function() {
            // إزالة النشاط من جميع البطاقات
            document.querySelectorAll('.suspect-card').forEach(card => {
                card.classList.remove('active');
            });
            // إضافة النشاط للبطاقة المحددة
            this.classList.add('active');
        });
        
        suspectsContainer.appendChild(suspectCard);
    });
}