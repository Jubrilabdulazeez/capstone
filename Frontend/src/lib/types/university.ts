export type UniversityRanking = 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'Not Ranked';

export type Program = {
  id: string;
  name: string;
  degreeType: 'Bachelor' | 'Master' | 'PhD' | 'Diploma' | 'Certificate';
  durationYears: number;
  annualTuition: number; // in USD
  currency: string;
  language: string;
  hasScholarship: boolean;
  entryRequirements: string;
  description: string;
};

export type Scholarship = {
  id: string;
  name: string;
  description: string;
  coverage: 'Full' | 'Partial' | 'Specific';
  coverageDetails: string;
  eligibilityCriteria: string;
  applicationDeadline: string;
  link: string;
};

export type University = {
  id: string;
  name: string;
  country: string;
  city: string;
  logo: string;
  images: string[];
  description: string;
  website: string;
  foundedYear: number;
  type: 'Public' | 'Private' | 'Mixed';
  accreditation: string[];
  ranking: UniversityRanking;
  rankingScore?: number; // Optional numerical score
  studentsCount: number;
  nigerianStudentsCount: number;
  internationalStudentsPercentage: number;
  acceptanceRate: number; // As a decimal (0-1)
  averageTuition: number; // Average annual tuition in USD
  tuitionRange: {
    min: number;
    max: number;
  };
  languagesOfInstruction: string[];
  accommodationAvailable: boolean;
  accommodationCost?: {
    min: number;
    max: number;
  };
  programs: Program[];
  scholarships: Scholarship[];
  admissionRequirements: {
    general: string;
    international: string;
    nigerian: string;
  };
  admissionDeadlines: {
    fall: string;
    spring?: string;
    winter?: string;
    summer?: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  facilitiesAndServices: string[];
  strengths: string[];
  virtualTour?: string;
};

export type UniversityCard = Pick<
  University,
  | 'id'
  | 'name'
  | 'country'
  | 'city'
  | 'logo'
  | 'ranking'
  | 'acceptanceRate'
  | 'averageTuition'
  | 'nigerianStudentsCount'
>;

export type UniversitySearchFilters = {
  countries?: string[];
  programTypes?: string[];
  tuitionRange?: {
    min?: number;
    max?: number;
  };
  rankings?: UniversityRanking[];
  languages?: string[];
  accommodationRequired?: boolean;
};

export type UniversityMatchResult = {
  university: UniversityCard;
  matchPercentage: number;
  strengths: string[];
  matchFactors: {
    academic: number;
    financial: number;
    location: number;
    community: number;
  };
};
