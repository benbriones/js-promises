"use strict";

const CARD_API_URL = "https://deckofcardsapi.com/api/deck";

const $cardBtn = $('#new-card-btn');
const $cardContainer = $('.card-container');

let cardId;
let cardCount = 52;


/** when user clicks button make request to fetch card and append on screen */
async function handleCardBtn() {
  const url = `${CARD_API_URL}/${cardId}/draw`;

  cardCount--;

  if (!cardCount) {
    $cardBtn.hide();
    return;
  }

  const cardResp = await fetch(url);
  const cardData = await cardResp.json();
  // console.log(cardData.remaining);

  const $cardImg = $('<img>').attr('src', cardData.cards[0].image);


  $cardContainer.append($cardImg);

}

/** when page loads make fetch to get shuffled deck  */
async function handlePageLoad() {
  const cardIdResponse = await fetch(`${CARD_API_URL}/new/shuffle`);

  const response = await cardIdResponse.json();
  cardId = await response.deck_id;
}




$(document).ready(handlePageLoad);
$cardBtn.on("click", handleCardBtn);