document.addEventListener('DOMContentLoaded', newBoard);

const cards = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5'];
let flippedCard = [], matchedCard = [], gameOver = false;

function shuffle(arr) {
  return arr.length === 0 ? arr : [arr.splice(Math.floor(Math.random() * arr.length), 1)[0], ...shuffle(arr)];
}

function newBoard() {
  const cardGame = document.getElementById('cardGame');
  cardGame.innerHTML = '';
  shuffle([...cards]).forEach((cardValue, i) => cardGame.appendChild(createCard(i, cardValue)));
}

function createCard(index, cardValue) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.index = index;
  card.dataset.value = cardValue;
  card.addEventListener('click', flipCard);
  return card;
}

function flipCard(event) {
  if (gameOver || event.target.classList.contains('flipped') || flippedCard.length === 2) return;

  const card = event.target;
  card.classList.add('flipped');
  card.textContent = card.dataset.value;
  flippedCard.push(card);

  if (flippedCard.length === 2) setTimeout(checkMatch, 500);
}

function checkMatch() {
  const [card1, card2] = flippedCard;

  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCard.push(card1.dataset.value);
    flippedCard = [];

    if (matchedCard.length === cards.length / 2) {
      gameOver = true;
      alert('You won the game!');
      setTimeout(() => location.reload(), 3000);
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.textContent = card2.textContent = '';
    flippedCard = [];
  }
}
