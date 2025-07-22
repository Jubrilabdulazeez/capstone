import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: 'STUDENT' | 'COUNSELOR' | 'ADMIN';
  profilePicture?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  nationality?: string;
  
  // Student specific fields
  waecGrades?: {
    subject: string;
    grade: string;
  }[];
  jamb?: {
    score: number;
    year: number;
  };
  postUTME?: {
    institution: string;
    score: number;
    year: number;
  };
  currentEducationLevel?: string;
  desiredCourse?: string;
  preferredCountries?: string[];
  
  // Counselor specific fields
  specialization?: string[];
  experience?: number;
  qualifications?: string[];
  bio?: string;
  availableHours?: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  rating?: number;
  totalSessions?: number;
  
  // Common fields
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['STUDENT', 'COUNSELOR', 'ADMIN'], required: true },
  profilePicture: { type: String },
  phoneNumber: { type: String },
  dateOfBirth: { type: Date },
  nationality: { type: String },
  
  // Student specific fields
  waecGrades: [{
    subject: { type: String },
    grade: { type: String }
  }],
  jamb: {
    score: { type: Number },
    year: { type: Number }
  },
  postUTME: {
    institution: { type: String },
    score: { type: Number },
    year: { type: Number }
  },
  currentEducationLevel: { type: String },
  desiredCourse: { type: String },
  preferredCountries: [{ type: String }],
  
  // Counselor specific fields
  specialization: [{ type: String }],
  experience: { type: Number },
  qualifications: [{ type: String }],
  bio: { type: String },
  availableHours: [{
    day: { type: String },
    startTime: { type: String },
    endTime: { type: String }
  }],
  rating: { type: Number, default: 0 },
  totalSessions: { type: Number, default: 0 },
  
  // Common fields
  verified: { type: Boolean, default: false },
  lastLogin: { type: Date }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);