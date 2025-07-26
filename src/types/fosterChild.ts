
import { type Home } from "./home"

export type FosterChild = {
    name: string;
    age: number;
    gender: string;
    traumaCare?: "At risk" | "Substance abuse" | "Co-occuring disorders" | "Sexual abuse survivors" | "Human trafficking survivors";
    matchedHome: Home | null;
  };
  