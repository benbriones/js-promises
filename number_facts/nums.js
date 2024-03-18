"use strict";

const NUMBERS_API_URL = "http://numbersapi.com";

/** extracts a fact about a number */
async function showNumberTrivia(num) {
  const url = `${NUMBERS_API_URL}/${num}?json`;

  const response = await fetch(url);

  const data = await response.json();

  console.log("number fact is:", data.text);

}

/** takes 4 numbers, returns the trivia that comes back fastest  */
async function showNumberRace(nums) {
  const responsePromises = [];

  for (let num of nums) {
    let fact = fetch(`${NUMBERS_API_URL}/${num}?json`);
    responsePromises.push(fact);
  }

  const raceWinner = await Promise.race(responsePromises);
  const raceWinnerData = await raceWinner.json();
  console.log("showNumberRace Fact:", raceWinnerData.text);
}