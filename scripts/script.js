
const allSection = document.querySelectorAll('.allSection');
const interviewSection = document.querySelectorAll('.interviewSection');
const rejectedSection = document.querySelectorAll('.rejectedSection');
const deletedCards = [];
const interviewCards = [];
const rejectedCards = [];
let currentSection = '';

const allSectionBtn = document.getElementById('allSectionBtn');
const interviewSectionBtn = document.getElementById('interviewSectionBtn');
const rejectedSectionBtn = document.getElementById('rejectedSectionBtn');

allSectionBtn.addEventListener('click', function () {
    document.querySelector('.allSection').classList.remove('hidden');
    document.querySelector('.interviewSection').classList.add('hidden');
    document.querySelector('.rejectedSection').classList.add('hidden');
    currentSection = 'allSection';
    updateAllSectionRightJobCount();
    showEmptyCard();
});

interviewSectionBtn.addEventListener('click', function () {
    document.querySelector('.allSection').classList.add('hidden');
    document.querySelector('.interviewSection').classList.remove('hidden');
    document.querySelector('.rejectedSection').classList.add('hidden');
    currentSection = 'interviewSection';
    updateInterviewSectionRightJobCount();
    showEmptyCard();
});

rejectedSectionBtn.addEventListener('click', function () {
    document.querySelector('.allSection').classList.add('hidden');
    document.querySelector('.interviewSection').classList.add('hidden');
    document.querySelector('.rejectedSection').classList.remove('hidden');
    currentSection = 'rejectedSection';
    updateRejectedSectionRightJobCount();
    showEmptyCard();
});
document.addEventListener('click', function (event) {

    // I learned and got help from ChatGpt for this part.
    const card = event.target.closest('.card');
    if (!card) return;

    if (event.target.classList.contains('remove')) {
        card.remove();
        const allSection = document.querySelector('.allSection');

        allSection.childNodes.forEach(oldCard => {
            if (oldCard.id === card.id) {
                oldCard.remove();
            }
        });
        const rejectedSection = document.querySelector('.rejectedSection');
        rejectedSection.childNodes.forEach(oldCard => {
            if (oldCard.id === card.id) {
                oldCard.remove();
                const index = rejectedCards.indexOf(card.id);
                if (index !== -1) {
                    rejectedCards.splice(index, 1);
                    updatedCounts(rejectedCards);
                }
            }
        });
        const interviewSection = document.querySelector('.interviewSection');
        interviewSection.childNodes.forEach(oldCard => {
            if (oldCard.id === card.id) {
                oldCard.remove();
                const index = interviewCards.indexOf(card.id);
                if (index !== -1) {
                    interviewCards.splice(index, 1);
                    updatedCounts(interviewCards);
                }
            }
        });
        const allCount = document.getElementById('allCount');
        allCount.innerHTML = allSection.querySelectorAll('.card').length;
        const interviewCount = document.getElementById('interviewCount');
        interviewCount.innerHTML = interviewSection.querySelectorAll('.card').length;
        const rejectedCount = document.getElementById('rejectedCount');
        rejectedCount.innerHTML = rejectedSection.querySelectorAll('.card').length;
        if (currentSection == 'allSection') {
            updateAllSectionRightJobCount();
        }
        else if (currentSection == 'interviewSection') {
            updateInterviewSectionRightJobCount();
        }
        else if (currentSection == 'rejectedSection') {
            updateRejectedSectionRightJobCount();
        }
        showEmptyCard();
    }

    if (event.target.classList.contains('addInterview')) {
        interviewSectionUpdate(card);
        if (currentSection == 'allSection') {
            updateAllSectionRightJobCount();
        }
        else if (currentSection == 'interviewSection') {
            updateInterviewSectionRightJobCount();
        }
        else if (currentSection == 'rejectedSection') {
            updateRejectedSectionRightJobCount();
        }
        showEmptyCard();
    }

    if (event.target.classList.contains('addRejected')) {
        rejectedSectionUpdate(card);
        if (currentSection == 'allSection') {
            updateAllSectionRightJobCount();
        }
        else if (currentSection == 'interviewSection') {
            updateInterviewSectionRightJobCount();
        }
        else if (currentSection == 'rejectedSection') {
            updateRejectedSectionRightJobCount();
        }
        showEmptyCard();
    }
});



function interviewSectionUpdate(card) {
    if (interviewCards.includes(card.id)) {
        return;
    }
    else {
        const newCard = card.cloneNode(true);
        card.classList.remove('rejected');
        card.classList.add('interview');
        newCard.classList.remove('rejected');
        newCard.classList.add('interview');
        card.querySelector('.currentStatus').innerHTML = 'Interview';
        newCard.querySelector('.currentStatus').innerHTML = 'Interview';
        const rejectedSection = document.querySelector('.rejectedSection');
        rejectedSection.childNodes.forEach(oldCard => {
            if (oldCard.id === card.id) {
                oldCard.remove();
                const index = rejectedCards.indexOf(card.id);
                if (index !== -1) {
                    rejectedCards.splice(index, 1);
                    updatedCounts(rejectedCards);
                }
            }
        });
        const interviewSection = document.querySelector('.interviewSection');
        interviewSection.appendChild(newCard);
        interviewCards.push(card.id);
        updatedCounts(interviewCards);
        removeEmptyCard(document.querySelector('.interviewSection'));
    }
}

function rejectedSectionUpdate(card) {
    if (rejectedCards.includes(card.id)) {
        return;
    }
    else {
        const newCard = card.cloneNode(true);
        card.classList.remove('interview');
        card.classList.add('rejected');
        newCard.classList.remove('interview');
        newCard.classList.add('rejected');
        card.querySelector('.currentStatus').innerHTML = 'Rejected';
        newCard.querySelector('.currentStatus').innerHTML = 'Rejected';

        const interviewSection = document.querySelector('.interviewSection');
        interviewSection.childNodes.forEach(oldCard => {
            if (oldCard.id === card.id) {
                oldCard.remove();
                const index = interviewCards.indexOf(card.id);
                if (index !== -1) {
                    interviewCards.splice(index, 1);
                    updatedCounts(interviewCards);
                }
            }
        });
        const rejectedSection = document.querySelector('.rejectedSection');
        rejectedSection.appendChild(newCard);
        rejectedCards.push(card.id);
        updatedCounts(rejectedCards);
        removeEmptyCard(document.querySelector('.rejectedSection'));
    }
}

function updatedCounts(arr) {
    if (arr == rejectedCards) {
        document.getElementById('rejectedCount').innerHTML = arr.length;
    }
    else if (arr == interviewCards) {
        document.getElementById('interviewCount').innerHTML = arr.length;
    }
}



function updateAllSectionRightJobCount() {
    const innertext = document.querySelector('.allSection').childElementCount;
    document.getElementById('rightJob').innerText = `${innertext} jobs`;
}

function updateInterviewSectionRightJobCount() {
    const innertext = document.querySelectorAll('.interviewSection .card').length;
    const totalJob = document.querySelectorAll('.allSection .card').length;
    document.getElementById('rightJob').innerText = `${innertext} jobs of ${totalJob} total`;
}

function updateRejectedSectionRightJobCount() {
    const innertext = document.querySelectorAll('.rejectedSection .card').length;
    const totalJob = document.querySelectorAll('.allSection .card').length;
    document.getElementById('rightJob').innerText = `${innertext} jobs of ${totalJob} total`;
}


function showEmptyCard() {

    function createEmptyCard() {
        const div = document.createElement('div');
        div.className = "emptyCard";
        div.innerHTML = `
            <div class="p-5 bg-white rounded-md flex flex-col justify-between items-center">
                <div class="pt-[60px]"><img src="assets/jobs.png" alt=""></div>
                <h1 class="text-[24px] font-bold">No Jobs Available</h1>
                <p class="text-gray-700 pb-[60px]">
                    Check back soon for new job opportunities
                </p>
            </div>`;
        return div;
    }

    const all = document.querySelector('.allSection');
    const interview = document.querySelector('.interviewSection');
    const rejected = document.querySelector('.rejectedSection');

    if (all.childElementCount === 0 && !all.querySelector('.emptyCard')) {
        all.appendChild(createEmptyCard());
    }

    if (interview.childElementCount === 0 && !interview.querySelector('.emptyCard')) {
        interview.appendChild(createEmptyCard());
    }

    if (rejected.childElementCount === 0 && !rejected.querySelector('.emptyCard')) {
        rejected.appendChild(createEmptyCard());
    }
}

function removeEmptyCard(section) {
    const emptyCard = section.querySelector('.emptyCard');
    // I took help from chatgpt for this part
    if (emptyCard != null) {
        emptyCard.remove();
    }
}

const sectionBtns = document.querySelectorAll('.sectionBtn');
sectionBtns.forEach(Btn => {
    Btn.addEventListener('click', function () {
        sectionBtns.forEach(btn => btn.classList.remove('active'));
        Btn.classList.add('active');
    });
})

allSectionBtn.click();