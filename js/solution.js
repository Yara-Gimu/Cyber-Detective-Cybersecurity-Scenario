// تهيئة شاشة الحل
function initializeSolution() {
    const suspectsChoice = document.getElementById('suspects-choice');
    const solutionExplanation = document.getElementById('solution-explanation');
    const caseActions = document.getElementById('case-actions');
    
    // مسح المحتوى السابق
    suspectsChoice.innerHTML = '';
    solutionExplanation.classList.add('hidden');
    caseActions.classList.add('hidden');
    
    // إنشاء خيارات المشتبه بهم
    suspectsData.forEach(suspect => {
        const choiceDiv = document.createElement('div');
        choiceDiv.className = 'suspect-choice';
        choiceDiv.dataset.suspect = suspect.id;
        choiceDiv.innerHTML = `
            <img src="${suspect.image}" alt="${suspect.name}">
            <h3>${suspect.name}</h3>
        `;
        
        // إضافة حدث النقر للاختيار
        choiceDiv.addEventListener('click', function() {
            showSolution(suspect.id);
        });
        
        suspectsChoice.appendChild(choiceDiv);
    });
}

// عرض شرح الحل
function showSolution(selectedSuspectId) {
    const solutionExplanation = document.getElementById('solution-explanation');
    const caseActions = document.getElementById('case-actions');
    const suspectChoices = document.querySelectorAll('.suspect-choice');
    
    // إزالة جميع التصنيفات
    suspectChoices.forEach(choice => {
        choice.classList.remove('correct', 'incorrect');
    });
    
    // التحقق من الإجابة الصحيحة (Sami)
    if (selectedSuspectId === 'sami') {
        // الإجابة صحيحة
        document.querySelector('.suspect-choice[data-suspect="sami"]').classList.add('correct');
        solutionExplanation.innerHTML = `
            <div class="solution-section">
                <h4><i class="fas fa-check-circle" style="color: var(--color-success);"></i> إجابة صحيحة! Sami هو المذنب.</h4>
                <p>لقد نجحت في حل اللغز واكتشاف الموظف المسؤول عن تسريب البيانات.</p>
            </div>
            <div class="solution-section">
                <h4>كيف تم حل اللغز:</h4>
                <p><strong>Red Herring (مضلل):</strong> Majed كان يشتبه به بسبب تسجيله المتأخر، لكن هذا كان مجرد صدفة.</p>
                <p><strong>الدليل الحاسم (Crucial Clue):</strong> Sami هو الوحيد الذي قام بعملية "Export" لملف كبير جدًا (3.8 GB) والذي يحتمل أن يكون قاعدة البيانات المسربة.</p>
                <p><strong>الدليل التأكيدي (Confirmatory Evidence):</strong> عملية Export حصلت بنفس وقت تسجيل Sami دخول الشبكة من "Unknown Device" مما يشير إلى محاولة إخفاء الهوية.</p>
                <p><strong>الدافع (Motive):</strong> تقييم الأداء الضعيف يعطي سبب منطقي لأفعال Sami كرد انتقامي.</p>
            </div>
            <div class="solution-section">
                <h4>الإجراءات الموصى بها:</h4>
                <p>1. مواجهة Sami بالأدلة</p>
                <p>2. تعليق وصوله إلى أنظمة الشركة</p>
                <p>3. مراجعة سياسات الأمن السيبراني للشركة</p>
                <p>4. إبلاغ الجهات المختصة إذا لزم الأمر</p>
            </div>
        `;
    } else {
        // الإجابة خاطئة
        document.querySelector(`.suspect-choice[data-suspect="${selectedSuspectId}"]`).classList.add('incorrect');
        document.querySelector('.suspect-choice[data-suspect="sami"]').classList.add('correct');
        
        let wrongSuspectName = selectedSuspectId === 'layla' ? 'Layla' : 'Majed';
        
        solutionExplanation.innerHTML = `
            <div class="solution-section">
                <h4><i class="fas fa-times-circle" style="color: var(--color-danger);"></i> إجابة خاطئة!</h4>
                <p>لم تنجح في تحديد المذنب الصحيح. حاول تحليل الأدلة مرة أخرى.</p>
            </div>
            <div class="solution-section">
                <h4>لماذا ${wrongSuspectName} ليس المذنب:</h4>
                ${selectedSuspectId === 'layla' ? `
                    <p>- Layla فقط قامت بوصول إلى الملف ولكن لم تقم بنسخ أو تصدير</p>
                    <p>- الجهاز المستخدم هو هاتفها الشخصي، مما يجعل عملية تسريب بيانات كبيرة غير عملية</p>
                    <p>- لا يوجد دافع واضح لها للقيام بالتسريب</p>
                ` : `
                    <p>- Majed قام بنسخ ملف صغير (2.5 MB) فقط وليس قاعدة البيانات الكبيرة</p>
                    <p>- قام بالوصول من كمبيوتر المكتب، مما يجعله أقل محاولة لإخفاء الهوية</p>
                    <p>- وقت الوصول مختلف عن وقت التسريب الرئيسي</p>
                `}
            </div>
            <div class="solution-section">
                <h4>الحل الصحيح:</h4>
                <p>Sami هو المذنب للأسباب التالية:</p>
                <p><strong>الدليل الحاسم:</strong> Sami هو الوحيد الذي قام بعملية "Export" لملف كبير جدًا (3.8 GB).</p>
                <p><strong>الدليل التأكيدي:</strong> عملية Export حصلت بنفس وقت تسجيل Sami دخول الشبكة من "Unknown Device".</p>
                <p><strong>الدافع:</strong> تقييم الأداء الضعيف يعطي سبب منطقي لأفعال Sami.</p>
            </div>
        `;
    }
    
    solutionExplanation.classList.remove('hidden');
    caseActions.classList.remove('hidden');
    
    // التمرير إلى شرح الحل
    solutionExplanation.scrollIntoView({ behavior: 'smooth' });
}