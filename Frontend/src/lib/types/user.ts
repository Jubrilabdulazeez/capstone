export type QualificationType =
  | 'WAEC'
  | 'NECO'
  | 'IGCSE'
  | 'A-Levels'
  | 'IB'
  | 'Nigerian Diploma'
  | 'Nigerian Degree'
  | 'Other';

export type SubjectGrade = {
  subject: string;
  grade: string;
};

export type Qualification = {
  id: string;
  type: QualificationType;
  institution: string;
  yearCompleted: number;
  subjects: SubjectGrade[];
  certificate?: string; // URL to uploaded certificate
};

export type LanguageProficiency = {
  language: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Native' | 'Certified';
  certification?: string;
  score?: string;
};

export type FieldOfInterest =
  | 'Business & Management'
  | 'Engineering & Technology'
  | 'Medicine & Health Sciences'
  | 'Arts & Humanities'
  | 'Natural Sciences'
  | 'Social Sciences'
  | 'Computer Science & IT'
  | 'Education'
  | 'Law'
  | 'Agriculture & Environmental Sciences'
  | 'Media & Communications'
  | 'Architecture & Construction'
  | 'Other';

export type PreferredCountry =
  | 'Ghana'
  | 'South Africa'
  | 'Kenya'
  | 'Rwanda'
  | 'Egypt'
  | 'Morocco'
  | 'Tanzania'
  | 'Uganda'
  | 'Botswana'
  | 'Namibia'
  | 'Senegal'
  | 'Ethiopia'
  | 'Any';

export type StudyPreferences = {
  fieldsOfInterest: FieldOfInterest[];
  preferredCountries: PreferredCountry[];
  preferredDegreeTypes: ('Bachelor' | 'Master' | 'PhD' | 'Diploma' | 'Certificate')[];
  preferredLanguages: string[];
  budgetRange: {
    min: number;
    max: number;
  };
  accommodationPreference: 'Required' | 'Not Required' | 'No Preference';
  startDate: 'Immediate' | 'Next 3 Months' | 'Next 6 Months' | 'Next Year' | 'Flexible';
  studyMode: 'Full-time' | 'Part-time' | 'Online' | 'Hybrid' | 'No Preference';
  scholarshipRequired: boolean;
};

export type ApplicationStatus =
  | 'Preparing'
  | 'Submitted'
  | 'Documents Requested'
  | 'Under Review'
  | 'Interview Scheduled'
  | 'Approved'
  | 'Conditional Approval'
  | 'Rejected'
  | 'Deferred';

export type Application = {
  id: string;
  universityId: string;
  universityName: string;
  programId: string;
  programName: string;
  status: ApplicationStatus;
  applicationDate: string;
  lastUpdated: string;
  notes: string;
  documents: {
    name: string;
    status: 'Required' | 'Uploaded' | 'Approved' | 'Rejected';
    url?: string;
  }[];
  timeline: {
    date: string;
    status: ApplicationStatus;
    notes?: string;
  }[];
};

export type CounselingSession = {
  id: string;
  counselorId: string;
  counselorName: string;
  date: string;
  duration: number; // in minutes
  type: 'Video' | 'Audio' | 'Chat';
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Missed';
  notes: string;
  rating?: number;
  feedback?: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Prefer not to say' | 'Other';
  nationality: string;
  state?: string; // Nigerian state
  city?: string;
  address?: string;
  createdAt: string;
  verified: boolean;
  role: 'Student' | 'Admin' | 'Counselor';
  qualifications: Qualification[];
  languageProficiencies: LanguageProficiency[];
  studyPreferences: StudyPreferences;
  savedUniversities: string[]; // Array of university IDs
  applications: Application[];
  counselingSessions: CounselingSession[];
};
