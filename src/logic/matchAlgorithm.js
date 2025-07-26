import {generateChildData, generateBedData} from '../data/generateMockData.js';

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

export function matchChildrenToBeds(childrenCount, bedsCount) {
    // these will eventually come from the csv file
    const children = generateChildData(childrenCount); 
    const beds = generateBedData(bedsCount);

    let i=0;
    for (const child of children) {
        const topBeds = GetTopBeds(child, beds);
        console.log(i);
        console.log(
            `Top beds for ${child.name} ${child.age} ${child.gender}${child.trauma ? ` (${child.trauma})` : ''}:`,
            topBeds
        ); // return this data to the UI
        i++;
    }
}

// get top 3 beds for each child
function GetTopBeds(child, beds) {
    const scoredBeds = beds.map(bed => {
        return {
            bed,
            score: scoreMatch(child, bed)
        };
    });

    scoredBeds.sort((a, b) => b.score - a.score);

    return scoredBeds.slice(0, 3).map(item => item.bed);
}

// get score of each bed
function scoreMatch(child, bed) {
    let score = 0; // max score is 100
    // check trauma match
    if (child.trauma && child.trauma === bed.bedTrauma) {
        score += 25;
    }
    // weighted age check
    if (bed.bedAgeRange[0] <= child.age &&  child.age <= bed.bedAgeRange[1]) {
        score += 50;
    } // check if child age is within 1 - 2 years of the bed age range
    else if (bed.bedAgeRange[0] <= child.age && child.age <= bed.bedAgeRange[1] + 1) {
        score += 35;
    }
    else if (bed.bedAgeRange[0] <= child.age && child.age <= bed.bedAgeRange[1] + 2) {
        score += 15;
    } // weight gender check
    if (child.gender === bed.bedPreference || bed.bedPreference === "any") {
        score += 10;
    }
    else {
        score -= 100;
    }
    return score;
}

matchChildrenToBeds(5, 10); // take in csv file data instead of mock data