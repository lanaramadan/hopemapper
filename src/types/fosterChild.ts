
import { type Home } from "./home"

export type HomeMatch = {
  home: Home;
  score: number;
};

export type FosterChild = {
    name: string;
    age: number;
    gender: "m" | "f";
    traumaCare?: "At risk youth" | "Substance abuse" | "Co-occuring disorders" | "Sexual abuse survivors" | "Human trafficking survivors";
    languages: string[];
    matchedHomes: HomeMatch[] | null;
  };
  