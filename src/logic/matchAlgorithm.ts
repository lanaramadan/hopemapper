import type { FosterChild } from "../types/fosterChild";
import type { Home } from "../types/home";

// Helper to parse trauma care string to enum
function parseTraumaCare(str: string | undefined): FosterChild["traumaCare"] | undefined {
  if (!str) return undefined;
  const normalized = str.trim();
  switch (normalized) {
    case "At risk youth":
      return "At risk youth";
    case "Substance abuse":
      return "Substance abuse";
    case "Co-occuring disorders":
      return "Co-occuring disorders";
    case "Sexual abuse survivors":
      return "Sexual abuse survivors";
    case "Human trafficking survivors":
      return "Human trafficking survivors";
    default:
      return undefined;
  }
}

// Helper to parse gender
function parseGender(str: string): "m" | "f" {
  return str.trim().toLowerCase() === "m" ? "m" : "f";
}

// Simple CSV parser (no quoted fields support)
function parseCSV(content: string): string[][] {
  return content
    .trim()
    .split("\n")
    .map(line => line.split(",").map(cell => cell.trim().replace(/^"|"$/g, "")));
}

// Parse fosterKids.csv from a string (browser-friendly)
export function loadFosterChildrenFromText(csv: string): FosterChild[] {
  const rows = parseCSV(csv);
  const headers = rows[0];
  return rows.slice(1).map(row => {
    const obj: Record<string, string> = {};
    headers.forEach((header, i) => {
      obj[header] = row[i] || "";
    });
    return {
      name: `${obj["First Name"]} ${obj["Last Name"]}`,
      age: Number(obj["Age"]),
      gender: parseGender(obj["Gender"]),
      traumaCare: parseTraumaCare(obj["Type of Trauma Care"]),
      matchedHome: null,
    };
  });
}

// Parse Foster_Family_Homes csv from a string (browser-friendly)
export function loadHomesFromText(csv: string): Home[] {
  const rows = parseCSV(csv);
  const headers = rows[0];
  return rows.slice(1).map(row => {
    const obj: Record<string, string> = {};
    headers.forEach((header, i) => {
      obj[header] = row[i] || "";
    });
    return {
      traumaCare: parseTraumaCare(obj["trauma_care"]) as Home["traumaCare"],
      address: obj["street_address"],
      location: {
        lat: Number(obj["latitude"]),
        long: Number(obj["longitude"]),
      },
      agePreference: `${obj["age_min"]}-${obj["age_max"]}`,
      genderPreference: obj["gender_preference"],
      bedNumber: Number(obj["facility_capacity"]),
    };
  });
}

export default function matchChildrenToHomes(children: FosterChild[], homes: Home[]) {
  for (const child of children) {
    const topHomes = GetTopHomes(child, homes);
    console.log(
      `Top homes for ${child.name} ${child.age} ${child.gender}${
        child.traumaCare ? ` (${child.traumaCare})` : ""
      }:`,
      topHomes
    );
  }
  return children;
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

  return scoredHomes.slice(0, 3).map((item) => item.home);
}

// get score of each home
function scoreMatch(child: FosterChild, home: Home) {
  let score = 0;
  // check trauma match
  if (child.traumaCare && child.traumaCare === home.traumaCare) {
    score += 25;
  }
  // weighted age check
  const [minAge, maxAge] = home.agePreference
    .split("-")
    .map((n) => Number(n));
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
  return score;
}

// Example usage in the browser (fetch CSV files and run matching)
export async function runMatching() {
  const fosterKidsRes = await fetch("/data/fosterKids.csv");
  const fosterKidsCsv = await fosterKidsRes.text();
  const homesRes = await fetch("/data/Foster_Family_Homes_-_3_Counties_2(in).csv");
  const homesCsv = await homesRes.text();

  const children = loadFosterChildrenFromText(fosterKidsCsv);
  const homes = loadHomesFromText(homesCsv);
  matchChildrenToHomes(children, homes);
}