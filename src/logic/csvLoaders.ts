import type { FosterChild } from "../types/fosterChild";
import type { Home } from "../types/home";

// Helper to parse trauma care string to enum
function parseTraumaCare(
  str: string | undefined
): FosterChild["traumaCare"] | undefined {
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
    .map((line) =>
      line.split(",").map((cell) => cell.trim().replace(/^"|"$/g, ""))
    );
}

// Parse fosterKids.csv from a string (browser-friendly)
export function loadFosterChildrenFromText(csv: string): FosterChild[] {
  const rows = parseCSV(csv);
  const headers = rows[0];
  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((header, i) => {
      obj[header] = row[i] || "";
    });
    return {
      name: `${obj["First Name"]} ${obj["Last Name"]}`,
      age: Number(obj["Age"]),
      gender: parseGender(obj["Gender"]),
      traumaCare: parseTraumaCare(obj["Type of Trauma Care"]),
      matchedHomes: null,
      languages: obj["Languages Spoken"]
        ? obj["Languages Spoken"].split(" ").map((lang) => lang.trim())
        : [],
    };
  });
}

// Parse Foster_Family_Homes csv from a string (browser-friendly)
export function loadHomesFromText(csv: string): Home[] {
  const rows = parseCSV(csv);
  const headers = rows[0];
  return rows.slice(1).map((row) => {
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
      facilityType: obj["facility_type"],
      facilityNumber: obj["facility_number"],
      facilityName: obj["facility_name"],
      licensee: obj["licensee"],
      facilityAdministrator: obj["facility_administrator"],
      countyName: obj["county_name"],
      regionalOffice: obj["regional_office"],
      facilityStatus: obj["facility_status"],
      inferredTraumaCare: obj["inferred_trauma_care"],
      city: obj["city"],
      state: obj["state"],
      zipCode: obj["zip_code"],
      languages: obj["languages_spoken"]
        ? obj["languages_spoken"].split(" ").map((lang) => lang.trim())
        : [],
    };
  });
}
