
export interface Rating {
  aesthetics: number;
  ambience: number;
  vibes: number;
  lightStudy: number;
  focusedStudy: number;
  socialAtmosphere: number;
  creativeEnvironment: number;
  wifiPower: number;
  coffeeQuality: number;
  seatingComfort: number;
  noiseLevel: number;
  lighting: number;
  accessibility: number;
  bathroom: number;
}

export interface Review {
  ratings: Rating;
  review: string;
  tips: string;
  timestamp: number;
  tags: string[];
}
