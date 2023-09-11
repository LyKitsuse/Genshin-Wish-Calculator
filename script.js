const MAINTENANCE_REWARDS = 600; // Maintenance Rewards
const LIVE_REWARDS = 300;        // Livestrema Rewards
const EVENTS = 420 * 3;         // Minor Event
const MAIN_EVENT = 740;          // Major Event
const DAILIES_REWARDS = 60;      // Every Day Comissions
const CHARACTER_TRIALS = 20 * 4; // 4 Character Trials per Patch

const PRIMO_CONVERSION = 160;    // Primo to Fates
const PATCH_DAYS = 42;           // Number of Days per Update
const SOFTPITY = 74;            // Soft Pity Count
const HARDPITY = 90;            // Hard Pity Count

let battlepassOwnership = false;  // If Owns the Battle Pass      REQUIRES INPUT
let welkinOwnership = false;      // If Owns Welkin               REQUIRES INPUT
let fiftyFifty = false;           // If not guaranteed            REQUIRES INPUT

let currentPrimo = 0;     // Current Primogem Count for dailies   REQUIRES INPUT
let currentPity = 0;      // Current Pity Count                   REQUIRES INPUT
let ifCount = 0;          // Current Intertwined Fate Count       REQUIRES INPUT
let stardustCount = 0;    // Current Stardust Count               REQUIRES INPUT
let starglitterCount = 0; // Current Starglitter Count            REQUIRES INPUT
let numDays = 0           // Predicted Wishing Date               REQUIRES INPUT

// TODO: Create a function that converts the primogem count into fates (For Primo Conversion)
function primosToFates(primos) {
  return primos / PRIMO_CONVERSION;
}

// TODO: Create a function that takes the number of input days and starglitter/dust into primogems
// TODO: Add the Battlepass/Welkin Moon on the same function (1 Battlepass & Welkin only)
function dailiesToFates(numDays, stardustCount, starglitterCount) {
  let primogemCount = 0;
  // Input Days 
  primogemCount += (numDays * DAILIES_REWARDS);    

  // Input Starglitter + Dust
  if (stardustCount >= 75) {
    // Stardust must not exceed more than 5
    let currentStarDust = stardustCount;
    let fateCount = 0;
    for (let i = 0; i < 5; i++) {
      currentStarDust -= 75;
      if (currentStarDust <= 0) {
        break;
      }
      fateCount++;
    }
    primogemCount += fateCount * 160;
  }
  if (starglitterCount >= 5) {
    primogemCount += starglitterCount / 5;
  }

  // Battlepass + Welkin Moon
  if (battlepassOwnership) {
    primogemCount += 680 + (4 * PRIMO_CONVERSION);
  }

  if (welkinOwnership) {
    primogemCount += (30 * PRIMO_CONVERSION);
  }

  return primogemCount;
}

// TODO: Make a function that takes the number of days and takes the 
// events + trials + maintenance + stream rewards on each patch
function eventsAndRewards(numDays) {
  let primogemCount = 0;

  // Days to Patches
  let patchCount = 0;
  if (numDays > PATCH_DAYS) {
    patchCount = numDays/PATCH_DAYS;
  }

  // USes the PatchCount to get the Event, Trial, Maintenance, and Live Rewards per patch
  for (let i 0; i < patchCount; i++) {
    primogemCount += EVENTS + CHARACTER_TRIALS + MAINTENANCE_REWARDS + LIVE_REWARDS;
  }
  
  return primogemCount;
}

let abyssFloor9 = 0;
let abyssFloor10 = 0;
let abyssFloor11 = 0;
let abyssFloor12 = 0;

// TODO: Create a function that detects the number of stars on spiral abyss and convert it into primos
function spiralAbyssCalculator() {

}

// TODO: A function that checks possible conversions of Starglitter/Dust after wishing
function starDetection(stardustCount, starglitterCount) {

}

// TODO: Main fucntion to complete the calculation 
//(Where the current Pity will determine the output as well as add the current IF)
function main() {

}