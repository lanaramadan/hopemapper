function generateRandomAge() {
  return Math.floor(Math.random() * 22); // generates a random age between 0 and 21
}

function generateRandomGender() {
  return Math.random() < 0.5 ? "F" : "M"; // randomly returns 'F' or 'M'
}

function generateRandomName() {
  const first = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Ethan",
    "Fiona",
    "George",
    "Hannah",
    "Liam",
    "Noah",
    "Oliver",
    "James",
    "Elijah",
    "Mateo",
    "Theodore",
    "Henry",
    "Lucas",
    "William",
    "Benjamin",
    "Sebastian",
    "Jack",
    "Ezra",
    "Michael",
    "Daniel",
    "Leo",
    "Owen",
    "Samuel",
    "Olivia",
    "Emma",
    "Charlotte",
    "Amelia",
    "Sophia",
    "Mia",
    "Isabella",
    "Ava",
    "Evelyn",
    "Luna",
  ];
  const last = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Perez",
    "Thompson",
    "White",
    "Harris",
    "Sanchez",
    "Clark",
    "Ramirez",
    "Lewis",
    "Robinson",
    "Walker",
    "Young",
    "Allen",
    "King",
    "Wright",
    "Scott",
    "Torres",
    "Nguyen",
    "Hill",
    "Flores",
  ];
  return `${first[Math.floor(Math.random() * first.length)]} ${
    last[Math.floor(Math.random() * last.length)]
  }`;
}

function generateChildTrauma() {
  if (Math.random() < 0.3) {
    return generateBedTrauma();
  } else {
    return null;
  }
}

function generateBedGender() {
  if (Math.random() < 0.4) {
    return "F";
  } else if (Math.random() < 0.8) {
    return "M";
  } else {
    return "any";
  }
}

function generateBedTrauma() {
  const trauma = [
    "At risk",
    "Substance abuse",
    "Co-occuring disorders",
    "Sexual abuse survivors",
    "Human trafficking survivors",
  ];
  return trauma[Math.floor(Math.random() * trauma.length)];
}

function generateBedAge() {
  const ageGroups = [
    ["0", "6"],
    ["7", "11"],
    ["12", "14"],
    ["15", "17"],
    ["18", "21"],
  ];
  return ageGroups[Math.floor(Math.random() * ageGroups.length)];
}

export function generateChildData(count) {
  const children = [];
  for (let i = 0; i < count; i++) {
    const child = {
      name: generateRandomName(),
      age: generateRandomAge(),
      gender: generateRandomGender(),
      trauma: generateChildTrauma(),
    };
    children.push(child);
  }
  return children;
}

export function generateBedData(count) {
  const beds = [];
  for (let i = 0; i < count; i++) {
    const bed = {
      bedPreference: generateBedGender(),
      bedAgeRange: generateBedAge(), // or
      // bedAgeMin:
      // bedAgeMax:
      bedTrauma: generateBedTrauma(),
    };
    beds.push(bed);
  }
  return beds;
}
