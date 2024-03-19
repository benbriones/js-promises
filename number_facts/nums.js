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

  const responsePromises = nums.map(num => {
    return fetch(`${NUMBERS_API_URL}/${num}?json`);
  });

  const raceWinner = await Promise.race(responsePromises);
  const raceWinnerData = await raceWinner.json();
  console.log("showNumberRace Fact:", raceWinnerData.text);
}

/** takes 4 numbers, returns trivia about all resolved promises */
async function showNumberAll(nums) {

  const responsePromises = nums.map(num => {
    return fetch(`${NUMBERS_API_URL}/${num}?json`);
  });

  const settledData = await Promise.allSettled(responsePromises);

  const successfulResps = settledData.filter(resp => resp.status === 'fulfilled' && resp.value.ok === true);
  const successfulRespsData = successfulResps.map(resp => resp.value.json());

  const successfulRespVals = await Promise.all(successfulRespsData);
  const successfulFacts = successfulRespVals.map(resp => resp.text);

  const unsuccessfulResps = settledData.filter(resp => resp.status === 'fulfilled' && resp.value.ok === false);
  const errors = unsuccessfulResps.map(resp => resp.value.statusText);

  console.log(`Success:`, successfulFacts);
  console.log(`Unsuccessful:`, errors);
}

/** Function to call three previous functions and log in order */

async function main() {
  await showNumberTrivia(24);
  await showNumberRace([2, 44, 5, 8]);
  await showNumberAll(['abc', 33, 2, 1]);
}