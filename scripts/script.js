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

let cards = document.querySelectorAll('.card');
cards.forEach(card => {
    const deleteBtn = card.querySelector('.remove');
    deleteBtn.addEventListener('click', function () {
        card.remove();
        deletedSection(card);
    })
    const addInterviewBtn = card.querySelector('.addInterview');
    addInterviewBtn.addEventListener('click', function () {
        card.classList.remove('rejected');
        card.classList.add('interview');
        interviewSectionUpdate(card);
        console.log(interviewCards);
    })
    const addRejectedBtn = card.querySelector('.addRejected');
    addRejectedBtn.addEventListener('click', function () {
        card.classList.remove('interview');
        card.classList.add('rejected');
        rejectedSectionUpdate(card);
        console.log(rejectedCards);
    })
})


function deletedSection(card) {
    deletedCards.push(card);
    console.log(deletedCards);
}

function interviewSectionUpdate(card) {
    if (interviewCards.includes(card)) {
        return;
    }
    else {
        const newInterviewCard = document.createElement('div');
        newInterviewCard.innerHTML = card.innerHTML;
        newInterviewCard.className = "interview card p-5 bg-white space-y-4 rounded-md";
        interviewCards.push(newInterviewCard);
        console.log(interviewCards);
        const interviewSection = document.querySelector('.interviewSection');
        interviewSection.appendChild(newInterviewCard);
        interviewCards.push(card);
    }
}

function rejectedSectionUpdate(card){
    if(rejectedCards.includes(card)){
        return;
    }
    else{
        const newRejectedCard = document.createElement('div');
        newRejectedCard.innerHTML = card.innerHTML;
        newRejectedCard.className = "rejected card p-5 bg-white space-y-4 rounded-md";
        rejectedCards.push(newRejectedCard);
        console.log(rejectedCards);
        const rejectedSection = document.querySelector('.rejectedSection');
        rejectedSection.appendChild(newRejectedCard);
        rejectedCards.push(card);
    }
}