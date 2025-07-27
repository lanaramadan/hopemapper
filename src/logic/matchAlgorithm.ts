import type { FosterChild } from "../types/fosterChild";
import type { Home } from "../types/home";

import {
  loadFosterChildrenFromText,
  loadHomesFromText,
} from "./csvLoaders";

// update and return the child's matched homes
export default function matchChildrenToHomes(
  children: FosterChild[],
  homes: Home[]
): FosterChild[] {
  return children.map((child) => {
    const topHomes = GetTopHomes(child, homes);
    console.log(topHomes)
    return {
      ...child,
      matchedHomes: topHomes.length > 0 ? topHomes : null,
    };
  });
}

// get top 3 homes for each child
function GetTopHomes(child: FosterChild, homes: Home[]) {
  const scoredHomes = homes.map((home) => {
    return {
      home,
      score: scoreMatch(child, home),
    };
  });

  scoredHomes.sort((a, b) => b.score - a.score);

  // return scoredHomes.slice(0, 3).map((item) => item.home);
  return scoredHomes.slice(0, 3);
}

// get score of each home
function scoreMatch(child: FosterChild, home: Home) {
  const TRAUMA_MATCH = 50;
  const TRAUMA_PARTIAL_MATCH = 25;

  const AGE_EXACT_MATCH = 50;
  const AGE_CLOSE_MATCH = 35;
  const AGE_FAR_MATCH = 15;

  const GENDER_MATCH = 50;
  const GENDER_MISMATCH = -100;

  const LANGUAGE_MATCH_PER_LANG = 20;


  let score = 0;
  // check trauma match
  if (child.traumaCare && child.traumaCare === home.traumaCare) {
    score += TRAUMA_MATCH;
  } else if (child.traumaCare && home.traumaCare) {
    const relatedTraumas = new Map([
      ["At risk youth", ["Co-occuring disorders"]],
      ["Co-occuring disorders", ["At risk youth"]],
      ["Substance abuse", []],
      ["Sexual abuse survivors", ["Human trafficking survivors"]],
      ["Human trafficking survivors", ["Sexual abuse survivors"]],
    ]);
    if (relatedTraumas.get(child.traumaCare)?.includes(home.traumaCare)) {
      score += TRAUMA_PARTIAL_MATCH;
    }
  }

  // weighted age check
  const [minAge, maxAge] = home.agePreference.split("-").map((n) => Number(n));
  if (minAge <= child.age && child.age <= maxAge) {
    score += AGE_EXACT_MATCH;
  } else if (minAge <= child.age && child.age <= maxAge + 1) {
    score += AGE_CLOSE_MATCH;
  } else if (minAge <= child.age && child.age <= maxAge + 2) {
    score += AGE_FAR_MATCH;
  }

  // weight gender check
  if (
    child.gender === home.genderPreference ||
    home.genderPreference === "any"
  ) {
    score += GENDER_MATCH;
  } else {
    score += GENDER_MISMATCH;
  }

  // language check
  if (child.languages.length > 0 && home.languages.length > 0) {
    const commonLangs = home.languages.filter((lang) =>
      child.languages.includes(lang)
    );
    score += commonLangs.length * LANGUAGE_MATCH_PER_LANG;
  }
  
  const maxScore = TRAUMA_MATCH + AGE_EXACT_MATCH + GENDER_MATCH + 3 * LANGUAGE_MATCH_PER_LANG;
  const normalizedScore = (score / maxScore) * 100;
  return Math.round(normalizedScore);
}

// Example usage in the browser (fetch CSV files and run matching)
export async function runMatching() {
  const fosterKidsRes = await fetch("/data/fosterKids.csv");
  const fosterKidsCsv = await fosterKidsRes.text();
  const homesRes = await fetch("/data/fosterHomes.csv");
  const homesCsv = await homesRes.text();

  const children = loadFosterChildrenFromText(fosterKidsCsv);
  const homes = loadHomesFromText(homesCsv);
  matchChildrenToHomes(children, homes);
}
