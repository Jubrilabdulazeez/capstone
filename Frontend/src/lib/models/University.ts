import mongoose, { Document, Schema } from 'mongoose';

export interface IUniversity extends Document {
  _id: string;
  name: string;
  country: string;
  city: string;
  description: string;
  logo?: string;
  website?: string;
  email?: string;
  phoneNumber?: string;
  
  // Academic information
  type: 'public' | 'private';
  establishedYear?: number;
  accreditation?: string[];
  ranking?: {
    global?: number;
    national?: number;
    source?: string;
  };
  
  // Admission requirements
  admissionRequirements: {
    minimumWAECGrade?: string;
    minimumJAMBScore?: number;
    englishRequirement?: string;
    additionalRequirements?: string[];
  };
  
  // Programs offered
  programs: {
    name: string;
    degree: 'bachelor' | 'master' | 'phd' | 'diploma' | 'certificate';
    duration: number;
    tuitionFee?: {
      amount: number;
      currency: string;
      period: 'year' | 'semester' | 'total';
    };
    requirements?: string[];
  }[];
  
  // Facilities and features
  facilities?: string[];
  languageOfInstruction?: string[];
  studentPopulation?: number;
  internationalStudents?: number;
  
  // Application information
  applicationDeadlines?: {
    program?: string;
    deadline: Date;
    intake: string;
  }[];
  applicationFee?: {
    amount: number;
    currency: string;
  };
  
  // Status and metadata
  isActive: boolean;
  isVerified: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UniversitySchema = new Schema<IUniversity>({
  name: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String },
  website: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  
  type: { type: String, enum: ['public', 'private'], required: true },
  establishedYear: { type: Number },
  accreditation: [{ type: String }],
  ranking: {
    global: { type: Number },
    national: { type: Number },
    source: { type: String }
  },
  
  admissionRequirements: {
    minimumWAECGrade: { type: String },
    minimumJAMBScore: { type: Number },
    englishRequirement: { type: String },
    additionalRequirements: [{ type: String }]
  },
  
  programs: [{
    name: { type: String, required: true },
    degree: { type: String, enum: ['bachelor', 'master', 'phd', 'diploma', 'certificate'], required: true },
    duration: { type: Number, required: true },
    tuitionFee: {
      amount: { type: Number },
      currency: { type: String, default: 'USD' },
      period: { type: String, enum: ['year', 'semester', 'total'], default: 'year' }
    },
    requirements: [{ type: String }]
  }],
  
  facilities: [{ type: String }],
  languageOfInstruction: [{ type: String }],
  studentPopulation: { type: Number },
  internationalStudents: { type: Number },
  
  applicationDeadlines: [{
    program: { type: String },
    deadline: { type: Date },
    intake: { type: String }
  }],
  applicationFee: {
    amount: { type: Number },
    currency: { type: String, default: 'USD' }
  },
  
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  featured: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default mongoose.models.University || mongoose.model<IUniversity>('University', UniversitySchema);