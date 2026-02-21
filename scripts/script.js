const cards = document.querySelectorAll(".card");
// console.log(cards);
const allPage = document.getElementById("all");
// console.log(allPage);
const interviewPage = document.getElementById("interview");
// console.log(interviewPage);
const rejectedPage = document.getElementById("rejected");
// console.log(rejectedPage);

const jobs = [];

cards.forEach((card) => {
    const cardId = card.id;
    jobs[cardId] = {
        Element: card,
        status: card.querySelector(".status").innerHTML
    }
    // I learned This part from chatgpt

    const addInterviewBtn = card.querySelector(".addInterview");
    const addRejectedBtn = card.querySelector(".addRejected");
    const deleteCardBtn = card.querySelector(".remove");

    addInterviewBtn.addEventListener("click", () => {
        jobs[cardId].status = "interview";
        interviewPage.appendChild(card);
    });

    addRejectedBtn.addEventListener("click", () => {
        jobs[cardId].status = "rejected";
        rejectedPage.appendChild(card);
    });

    deleteCardBtn.addEventListener("click", () => {
        removeCard(cardId);
    });
});


function removeCard(cardId) {
    jobs[cardId].element.remove();
    delete jobs[cardId];
    newTabs();
    newCount();
}