"use strict";

const CARD_API_URL = "https://deckofcardsapi.com/api/deck";

const $cardBtn = $('#new-card-btn');
const $cardContainer = $('.card-container');

let cardsRemaining;
let cardId;



async function handleCardBtn() {
  // const url = `${CARD_API_URL}/`
  const cardIdResponse = await fetch(`${CARD_API_URL}/new/shuffle`)




}

async function handlePageLoad() {
  const cardIdResponse = await fetch(`${CARD_API_URL}/new/shuffle`)

  const response = await cardIdResponse.json()
  cardId = await response.deck_id
  cardsRemaining = await response.remaining
}




$(document).ready(handlePageLoad)
$cardBtn.on("click", handleCardBtn)