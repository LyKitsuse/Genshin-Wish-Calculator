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

let battlepassOwnership = document.querySelector('#battlepassOwnership');  // If Owns the Battle Pass      REQUIRES INPUT
let welkinOwnership = document.querySelector('#welkinOwnership');      // If Owns Welkin               REQUIRES INPUT
let fiftyFifty = document.querySelector('#fiftyFifty');           // If not guaranteed            REQUIRES INPUT

let currentPrimos = document.querySelector('#currentPrimo');         // Current Primogem Count for dailies   REQUIRES INPUT
let currentPity = document.querySelector('#currentPity');           // Current Pity Count                   REQUIRES INPUT
let ifCount = document.querySelector('#ifCount');                    // Current Intertwined Fate Count       REQUIRES INPUT
let stardustCount = document.querySelector('#stardustCount');       // Current Stardust Count               REQUIRES INPUT
let starglitterCount = document.querySelector('#starglitterCount'); // Current Starglitter Count            REQUIRES INPUT
let numDays = document.querySelector('#numDays');                   // Predicted Wishing Date               REQUIRES INPUT

let calculateBtn = document.querySelector('#calculate');

// TODO: Create a function that converts the primogem count into fates (For Primo Conversion)
function primosToFates(primos) {
  return primos / PRIMO_CONVERSION;
}

// A function that takes the number of input days and starglitter/dust into primogems
// Adds the Battlepass/Welkin Moon on the same function (1 Battlepass & Welkin only)
function dailiesToFates() {
  let primogemCount = 0;
  // Input Days 
  primogemCount += (parseInt(numDays.value) * DAILIES_REWARDS);    

  // Input Starglitter + Dust
  if (parseInt(stardustCount.value) >= 75) {
    // Stardust must not exceed more than 5
    let currentStarDust = parseInt(stardustCount.value);
    let fateCount = 0;
    for (let i = 0; i < 5; i++) {
      currentStarDust -= 75;
      fateCount++;
      if (currentStarDust <= 0) {
        break;
      }
    }
    primogemCount += fateCount * 160;
  }
  if (parseInt(starglitterCount.value) >= 5) {
    primogemCount += parseInt(starglitterCount.value) / 5;
  }

  // Battlepass + Welkin Moon
  if (battlepassOwnership.checked) {
    primogemCount += 680 + (4 * PRIMO_CONVERSION);
  }

  if (welkinOwnership.checked) {
    // Change so that it can get the number of days with welkin
    primogemCount += (30 * 90);
  }

  return primogemCount;
}

// A function that takes the number of days and takes the 
// events + trials + maintenance + stream rewards on each patch
function eventsAndRewards() {
  let primogemCount = 0;

  // Days to Patches
  let patchCount = 0;
  if (parseInt(numDays.value) > PATCH_DAYS) {
    patchCount = parseInt(numDays.value)/PATCH_DAYS;
  }

  // USes the PatchCount to get the Event, Trial, Maintenance, and Live Rewards per patch
  for (let i = 0; i < patchCount; i++) {
    primogemCount += EVENTS + CHARACTER_TRIALS + MAINTENANCE_REWARDS + LIVE_REWARDS;
  }
  
  return primogemCount;
}

let abyssFloor9 = 0;
let abyssFloor10 = 0;
let abyssFloor11 = 0;
let abyssFloor12 = 0;

// TODO: Create a function that detects the number of stars on spiral abyss and convert it into primos
function spiralAbyssCalculator(abyssFloor9, abyssFloor10, abyssFloor11, abyssFloor12) {
  let primogemCount = 0;
  // Every 3 full stars in the abyss + 50; Max 9 Stars
  // Floor 9
  primogemCount += (abyssFloor9 / 3) * 50;
  // Floor 10
  primogemCount += (abyssFloor10 / 3) * 50;
  // Floor 11
  primogemCount += (abyssFloor11 / 3) * 50;
  // Floor 12
  primogemCount += (abyssFloor12 / 3) * 50;
  return primogemCount;
}

// TODO: A function that checks possible conversions of Starglitter/Dust after wishing
function starDetection(stardustCount, starglitterCount, wishCount, numDays) {
  // Converts wishes to number of 4 stars
  // Converts wishes to number of 5 stars 
  // Converts days to stardust
}

// Calculate when btn is pressed
calculateBtn.onclick = calculate;

// DOM Stuff
let totalPrimoCount = document.createElement("h4");

let totalPrimoAppend = document.createElement('h4');
let totalPrimoDOM = document.querySelector('#totalPrimogemCount');

let wishCountAppend = document.createElement('h4');
let wishCountDOM = document.querySelector('#wishCount');

let fourStarAppend= document.createElement('h4');
let fourStarDOM = document.querySelector('#fourStars');

let softPityAppend = document.createElement("h4");
let softPityDOM = document.querySelector('#softPity');

let hardPityAppend = document.createElement("h4");
let hardPityDOM = document.querySelector('#hardPity');

// TODO: Main fucntion to complete the calculation 
//(Where the current Pity will determine the output as well as add the current IF)
function calculate() {
  let dailies = dailiesToFates();
  let events = eventsAndRewards();
  // let abyss = spiralAbyssCalculator();

  // let totalPrimo = dailies + events + abyss;
  let totalPrimo = dailies + events + parseInt(currentPrimos.value);
  let totalFates = primosToFates(totalPrimo);



  // DOM Print
  let softPityCount = totalFates/SOFTPITY;
  let hardPityCount = totalFates/HARDPITY;
  let fourStarCount = totalFates/10

  totalPrimoDOM.append(totalPrimoAppend);
  totalPrimoAppend.textContent = totalPrimo;

  wishCountDOM.append(wishCountAppend);
  wishCountAppend.textContent = totalFates;

  fourStarDOM.append(fourStarAppend);
  fourStarAppend.textContent = fourStarCount;

  softPityDOM.append(softPityAppend);
  softPityAppend.textContent = softPityCount.toFixed(3);

  hardPityDOM.append(hardPityAppend);
  hardPityAppend.textContent = hardPityCount.toFixed(3);
}


