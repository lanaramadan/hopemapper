export type Home = {
  traumaCare:
    | "At risk"
    | "Substance abuse"
    | "Co-occuring disorders"
    | "Sexual abuse survivors"
    | "Human trafficking survivors";
  address: String;
  location: {
    lat: number;
    long: number;
  };
  agePreference: string;
  genderPreference: string;
  bedNumber: number;
  facilityType: string;
  facilityNumber: string;
  facilityName: string;
  licensee: string;
  facilityAdministrator: string;
  countyName: string;
  regionalOffice: string;
  facilityStatus: string;
  inferredTraumaCare: string;
  city: string;
  state: string;
  zipCode: string;
};
