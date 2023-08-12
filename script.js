const maintenanceRewards = 600; // Maintenance Rewards
const liveRewards = 300;        // Livestrema Rewards
const events = 420 * 3;         // Minor Event
const mainEvent = 740;          // Major Event
const dailiesRewards = 60;      // Every Day Comissions
const characterTrials = 20 * 4; // 4 Character Trials per Patch

const primoConversion = 160;    // Primo to Fates
const patchDays = 42;           // Number of Days per Update
const softPity = 74;            // Soft Pity Count
const hardPity = 90;            // Hard Pity Count

let battlepassOwnership = false;  // If Owns the Battle Pass      REQUIRES INPUT
let welkinOwnership = false;      // If Owns Welkin               REQUIRES INPUT
let fiftyFifty = false;

let currentPrimo = 0;     // Current Primogem Count               REQUIRES INPUT
let currentPity = 0;      // Current Pity Count                   REQUIRES INPUT
let ifCount = 0;          // Current Intertwined Fate Count       REQUIRES INPUT
let stardustCount = 0;    // Current Stardust Count               REQUIRES INPUT
let starglitterCount = 0; // Current Starglitter Count            REQUIRES INPUT
let numDays = 0           // Predicted Wishing Date               REQUIRES INPUT

function primoToFates(currentPrimo, primoConversion) {   // Converts the input PrimoCount to Fates
  return currentPrimo / primoConversion;
}

// TODO: Make a converion for days to fate according to Maintenance, 
// livestreams, events, character trials, and daily comissions.
// Also add if welkin and battlepass is included.
function fateConversion(days) {
  let output = 0;
  let patchCount = days / patchDays;

  output += days * dailiesRewards;  // Days multiplied by the comissions rewards
  
  // TODO: A loop to check if there are more patch days,
  for (let i = 0; i < patchCount; i++) {
    output += liveRewards + maintenanceRewards;
    output += events + mainEvent;
    output += characterTrials;
  }

  if (welkinOwnership) {
    if (days >= 30) {
      output += 90 * 30;
    }
    else {
      output += 90 * days;
    }
  }

  if (battlepassOwnership) {
    output += (160 * 4) + 680;
  }

  return primoToFates(output, primoConversion);
}

// TODO: Add Abyss Detector

// TODO: Make a function that determines the predicted Pity of the user
// Make it so that it shows how many Full Cycles (90 Wishes) 
// and Quarter Cycles (75 Wishes) it will take. 
// Also add the predicted Pity it will land on after the cycles for both (75 and 90)

// Also Add the Starglitter and Stardusts counts when wishing, also apply the days for stardust


let fateCount = primoToFates(currentPrimo, primoConversion) 
  + fateConversion(numDays); // Estimated Total Fate Count

/**
 * Ask User for Primo Count 
 * Ask User for Current Pity
 * Ask User for Days Left
 * 
 * Optional
 * Ask User for Star(Dust/Glitter) Count
 * Ask User for Current Fate Count
 * 
 */

