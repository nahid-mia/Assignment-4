// showSection function create -- allSection, interviewSection, rejectedSection
// count id's allCount, interviewCount, rejectedCount
// interview, rejected btn -- class - addInterview, addRejected


let cards = document.querySelectorAll(".card");
let rejectedCount = 0;
let allCount = 8;
console.log(cards);

cards.forEach(card => {
    const addInterviewBtn = card.querySelector('.addInterview');
    const addRejectedBtn = card.querySelector('.addRejected');
    const deleteBtn = card.querySelector('.remove');

    deleteBtn.addEventListener("click", function () {
        card.remove();
        let cards = document.querySelectorAll(".card");
        const allCount = document.querySelector("#allCount");
        allCount.innerHTML = cards.length;
    });

    addInterviewBtn.addEventListener("click", function () {
        const newCard = card.cloneNode(true);
        const currentStatus = newCard.querySelector(".currentStatus");
        currentStatus.textContent = "Interview";
        const interviewSection = document.querySelector(".interview");
        const interviewSectionCards = interviewSection.childNodes;
        for (const interviewCard of interviewSectionCards) {
            if (interviewCard.id == newCard.id) {
                return;
            }
        }
        interviewSection.appendChild(newCard);
        const interviewCount = document.querySelector("#interviewCount");
        interviewCount.innerHTML = interviewSectionCards.length;
    })

    addRejectedBtn.addEventListener("click", function () {
        const newCard = card.cloneNode(true);
        const rejectedSection = document.querySelector(".rejected");
        rejectedSection.appendChild(newCard);
        console.log(rejectedSection);
    });

})
