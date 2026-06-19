let cards = [
  { question: "What is HTML?", answer: "It is a markup language" },
  { question: "What is CSS?", answer: "It styles the webpage" }
];

let index = 0;
let showQuestion = true;

function showCard() {
  document.getElementById("card").innerText =
    showQuestion ? cards[index].question : cards[index].answer;
}

function nextCard() {
  index = (index + 1) % cards.length;
  showQuestion = true;
  showCard();
}

function prevCard() {
  index = (index - 1 + cards.length) % cards.length;
  showQuestion = true;
  showCard();
}

function flipCard() {
  showQuestion = !showQuestion;
  showCard();
}

function addCard() {
  let q = document.getElementById("questionInput").value;
  let a = document.getElementById("answerInput").value;

  if (q && a) {
    cards.push({ question: q, answer: a });
    document.getElementById("questionInput").value = "";
    document.getElementById("answerInput").value = "";
    alert("Card Added!");
  } else {
    alert("Please enter both question and answer");
  }
}