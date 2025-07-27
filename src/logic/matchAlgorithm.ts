
import type { FosterChild } from "../types/fosterChild";

// const child = {
//             name: generateRandomName(),
//             age: generateRandomAge(),
//             gender: generateRandomGender(),
//             trauma: generateChildTrauma(),
//     }

// const bed = {
//     bedPreference: generateBedGender(),
//     bedAgeRange: generateBedAge(),
//     bedTrauma: generateBedTrauma(),
// };

export default function matchChildrenToBeds(children: FosterChild[], beds: any[]) {
  console.log(children)
  let i = 0;
  for (const child of children) {
    const topBeds = GetTopBeds(child, beds);
    console.log(i);
    console.log(
      `Top beds for ${child.name} ${child.age} ${child.gender}${
        child.traumaCare ? ` (${child.traumaCare})` : ""
      }:`,
      topBeds
    ); // return this data to the UI
    i++;
  }
  return children
}

// get top 3 beds for each child
function GetTopBeds(child: FosterChild, beds) {
  const scoredBeds = beds.map((bed) => {
    return {
      bed,
      score: scoreMatch(child, bed),
    };
  });

  scoredBeds.sort((a, b) => b.score - a.score);

  return scoredBeds.slice(0, 3).map((item) => item.bed);
}

// get score of each bed
function scoreMatch(child: FosterChild, bed) {
  let score = 0; // max score is 100
  // check trauma match
  if (child.traumaCare && child.traumaCare === bed.bedTrauma) {
    score += 25;
  }
  // weighted age check
  if (bed.bedAgeRange[0] <= child.age && child.age <= bed.bedAgeRange[1]) {
    score += 50;
  } // check if child age is within 1 - 2 years of the bed age range
  else if (
    bed.bedAgeRange[0] <= child.age &&
    child.age <= bed.bedAgeRange[1] + 1
  ) {
    score += 35;
  } else if (
    bed.bedAgeRange[0] <= child.age &&
    child.age <= bed.bedAgeRange[1] + 2
  ) {
    score += 15;
  } // weight gender check
  if (child.gender === bed.bedPreference || bed.bedPreference === "any") {
    score += 10;
  } else {
    score -= 100;
  }
  return score;
}