import mongoose, { Document, Schema } from 'mongoose';

export interface IScholarship extends Document {
  _id: string;
  title: string;
  description: string;
  provider: string;
  country: string;
  type: 'full' | 'partial' | 'merit' | 'need-based' | 'research';
  amount?: {
    value: number;
    currency: string;
    coverage: string; // e.g., "full tuition", "living expenses", etc.
  };
  
  // Eligibility criteria
  eligibility: {
    minimumGPA?: number;
    nationality?: string[];
    ageRange?: {
      min: number;
      max: number;
    };
    educationLevel: string[];
    fieldOfStudy?: string[];
    languageRequirements?: string[];
    otherRequirements?: string[];
  };
  
  // Application details
  applicationDeadline: Date;
  applicationStartDate?: Date;
  applicationProcess: string;
  requiredDocuments: string[];
  website?: string;
  contactEmail?: string;
  
  // Benefits
  benefits: {
    tuitionCoverage?: boolean;
    livingExpenses?: boolean;
    accommodation?: boolean;
    healthInsurance?: boolean;
    travelAllowance?: boolean;
    otherBenefits?: string[];
  };
  
  // Academic requirements
  academicRequirements?: {
    minimumWAECGrades?: string;
    minimumJAMBScore?: number;
    englishProficiency?: string;
    researchExperience?: boolean;
  };
  
  // Metadata
  numberOfAwards?: number;
  renewable?: boolean;
  duration?: number; // in years
  tags?: string[];
  isActive: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ScholarshipSchema = new Schema<IScholarship>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  provider: { type: String, required: true },
  country: { type: String, required: true },
  type: { type: String, enum: ['full', 'partial', 'merit', 'need-based', 'research'], required: true },
  amount: {
    value: { type: Number },
    currency: { type: String, default: 'USD' },
    coverage: { type: String }
  },
  
  eligibility: {
    minimumGPA: { type: Number },
    nationality: [{ type: String }],
    ageRange: {
      min: { type: Number },
      max: { type: Number }
    },
    educationLevel: [{ type: String, required: true }],
    fieldOfStudy: [{ type: String }],
    languageRequirements: [{ type: String }],
    otherRequirements: [{ type: String }]
  },
  
  applicationDeadline: { type: Date, required: true },
  applicationStartDate: { type: Date },
  applicationProcess: { type: String, required: true },
  requiredDocuments: [{ type: String, required: true }],
  website: { type: String },
  contactEmail: { type: String },
  
  benefits: {
    tuitionCoverage: { type: Boolean, default: false },
    livingExpenses: { type: Boolean, default: false },
    accommodation: { type: Boolean, default: false },
    healthInsurance: { type: Boolean, default: false },
    travelAllowance: { type: Boolean, default: false },
    otherBenefits: [{ type: String }]
  },
  
  academicRequirements: {
    minimumWAECGrades: { type: String },
    minimumJAMBScore: { type: Number },
    englishProficiency: { type: String },
    researchExperience: { type: Boolean }
  },
  
  numberOfAwards: { type: Number },
  renewable: { type: Boolean, default: false },
  duration: { type: Number },
  tags: [{ type: String }],
  isActive: { type: Boolean, default: true },
  featured: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default mongoose.models.Scholarship || mongoose.model<IScholarship>('Scholarship', ScholarshipSchema);