import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  _id: string;
  studentId: mongoose.Types.ObjectId;
  type: 'university' | 'scholarship';
  targetId: mongoose.Types.ObjectId; // University or Scholarship ID
  
  // Application details
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'waitlisted';
  submittedAt?: Date;
  reviewedAt?: Date;
  
  // Student information (copied at time of application)
  studentInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    nationality?: string;
  };
  
  // Academic records
  academicRecords: {
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
    gpa?: number;
  };
  
  // Documents
  documents: {
    type: string;
    filename: string;
    url: string;
    uploadedAt: Date;
  }[];
  
  // Application specific data
  programOfInterest?: string;
  personalStatement?: string;
  reasonForApplying?: string;
  
  // For scholarship applications
  financialNeed?: string;
  previousScholarships?: {
    name: string;
    provider: string;
    amount: number;
    year: number;
  }[];
  
  // Review information
  reviewNotes?: string;
  reviewedBy?: mongoose.Types.ObjectId;
  rating?: number;
  
  // Payment information (for applications that require fees)
  paymentInfo?: {
    amount: number;
    currency: string;
    status: 'pending' | 'paid' | 'failed';
    transactionId?: string;
    paidAt?: Date;
  };
  
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['university', 'scholarship'], required: true },
  targetId: { type: Schema.Types.ObjectId, required: true },
  
  status: { 
    type: String, 
    enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'waitlisted'], 
    default: 'draft' 
  },
  submittedAt: { type: Date },
  reviewedAt: { type: Date },
  
  studentInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    dateOfBirth: { type: Date },
    nationality: { type: String }
  },
  
  academicRecords: {
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
    gpa: { type: Number }
  },
  
  documents: [{
    type: { type: String, required: true },
    filename: { type: String, required: true },
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
  }],
  
  programOfInterest: { type: String },
  personalStatement: { type: String },
  reasonForApplying: { type: String },
  
  financialNeed: { type: String },
  previousScholarships: [{
    name: { type: String },
    provider: { type: String },
    amount: { type: Number },
    year: { type: Number }
  }],
  
  reviewNotes: { type: String },
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, min: 1, max: 5 },
  
  paymentInfo: {
    amount: { type: Number },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    transactionId: { type: String },
    paidAt: { type: Date }
  }
}, {
  timestamps: true
});

export default mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);