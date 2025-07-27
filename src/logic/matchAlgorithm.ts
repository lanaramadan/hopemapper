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
  let score = 0;
  // check trauma match
  if (child.traumaCare && child.traumaCare === home.traumaCare) {
    score += 25;
  }
  // weighted age check
  const [minAge, maxAge] = home.agePreference.split("-").map((n) => Number(n));
  if (minAge <= child.age && child.age <= maxAge) {
    score += 50;
  } else if (minAge <= child.age && child.age <= maxAge + 1) {
    score += 35;
  } else if (minAge <= child.age && child.age <= maxAge + 2) {
    score += 15;
  }
  // weight gender check
  if (
    child.gender === home.genderPreference ||
    home.genderPreference === "any"
  ) {
    score += 10;
  } else {
    score -= 100;
  }

  // language check
  if (
    child.languages.length > 0 &&
    home.languages.some((lang) => child.languages.includes(lang))
  ) {
    score += 10;
  }
  
  return score;
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
