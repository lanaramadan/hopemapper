export type Home = {
    traumaCare:  "At risk" | "Substance abuse" | "Co-occuring disorders" | "Sexual abuse survivors" | "Human trafficking survivors";
    address: String;
    location: {
        lat: number;
        long: number;
    }
    agePreference: string;
    genderPreference: string;
    bedNumber: number;
}