// showSection function create -- allSection, interviewSection, rejectedSection
// count id's allCount, interviewCount, rejectedCount
// interview, rejected btn -- class - addInterview, addRejected
// The first plan is to create arrays of those sections
// The second plan is to create functions to update those arrays, to update the counts, to add a universal delete function and simultaneously update those arrays.


const allSection = document.querySelectorAll('.allSection');
const interviewSection = document.querySelectorAll('.interviewSection');
const rejectedSection = document.querySelectorAll('.rejectedSection');
const deletedCards = [];
const interviewCards = [];
const rejectedCards = [];

document.addEventListener('click', function (event) {

    // I learned and got help from ChatGpt for this part.
    const card = event.target.closest('.card');
    if (!card) return;

    if (event.target.classList.contains('remove')) {
        console.log(card);
        card.remove();
        deletedSection(card);
    }

    if (event.target.classList.contains('addInterview')) {
        interviewSectionUpdate(card);
    }

    if (event.target.classList.contains('addRejected')) {
        rejectedSectionUpdate(card);
    }
});


function deletedSection(card) {
    deletedCards.push(card);
    console.log(deletedCards);
}

function interviewSectionUpdate(card) {
    console.log(card.id);
    if (interviewCards.includes(card.id)) {
        return;
    }
    else {
        const newCard = card.cloneNode(true);
        const rejectedSection = document.querySelector('.rejectedSection');
        rejectedSection.childNodes.forEach(oldCard => {
            if (oldCard.id === card.id) {
                oldCard.remove();
            }
        });
        const interviewSection = document.querySelector('.interviewSection');
        interviewSection.appendChild(newCard);
        interviewCards.push(card.id);
        console.log(interviewCards);
        updatedCounts(interviewCards);
    }
}

function rejectedSectionUpdate(card) {
    console.log(card.id);
    if (rejectedCards.includes(card.id)) {
        return;
    }
    else {
        const newCard = card.cloneNode(true);
        const interviewSection = document.querySelector('.interviewSection');
        interviewSection.childNodes.forEach(oldCard => {
            if (oldCard.id === card.id) {
                oldCard.remove();
            }
        });
        const rejectedSection = document.querySelector('.rejectedSection');
        rejectedSection.appendChild(newCard);
        rejectedCards.push(card.id);
        console.log(rejectedCards);
        updatedCounts(rejectedCards);
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