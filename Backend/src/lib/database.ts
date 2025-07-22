import { prisma } from './prisma'
import type { 
  University, 
  Program, 
  Scholarship, 
  User, 
  Application,
  CounselingSession 
} from '@prisma/client'

// University Operations
export class UniversityService {
  static async getAll(filters?: {
    country?: string
    ranking?: string
    limit?: number
    offset?: number
  }) {
    const where: any = {}
    
    if (filters?.country) {
      where.country = filters.country
    }
    
    if (filters?.ranking) {
      where.ranking = filters.ranking
    }

    const universities = await prisma.university.findMany({
      where,
      include: {
        programs: true,
        scholarships: true,
      },
      take: filters?.limit || 20,
      skip: filters?.offset || 0,
      orderBy: {
        rankingScore: 'desc'
      }
    })

    const total = await prisma.university.count({ where })

    return {
      universities,
      total,
      limit: filters?.limit || 20,
      offset: filters?.offset || 0
    }
  }

  static async getById(id: string) {
    return await prisma.university.findUnique({
      where: { id },
      include: {
        programs: true,
        scholarships: true,
      }
    })
  }

  static async create(data: Omit<University, 'id' | 'createdAt' | 'updatedAt'>) {
    return await prisma.university.create({
      data,
      include: {
        programs: true,
        scholarships: true,
      }
    })
  }

  static async update(id: string, data: Partial<University>) {
    return await prisma.university.update({
      where: { id },
      data,
      include: {
        programs: true,
        scholarships: true,
      }
    })
  }

  static async delete(id: string) {
    return await prisma.university.delete({
      where: { id }
    })
  }

  static async search(query: string) {
    return await prisma.university.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { city: { contains: query, mode: 'insensitive' } },
          { country: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ]
      },
      include: {
        programs: true,
        scholarships: true,
      },
      take: 10
    })
  }
}

// Program Operations
export class ProgramService {
  static async getByUniversityId(universityId: string) {
    return await prisma.program.findMany({
      where: { universityId, isActive: true },
      include: {
        university: true
      }
    })
  }

  static async getById(id: string) {
    return await prisma.program.findUnique({
      where: { id },
      include: {
        university: true
      }
    })
  }

  static async create(data: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>) {
    return await prisma.program.create({
      data,
      include: {
        university: true
      }
    })
  }

  static async update(id: string, data: Partial<Program>) {
    return await prisma.program.update({
      where: { id },
      data,
      include: {
        university: true
      }
    })
  }
}

// User Operations
export class UserService {
  static async getById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        qualifications: true,
        languageProficiencies: true,
        studyPreferences: true,
        applications: {
          include: {
            university: true,
            program: true
          }
        },
        counselingSessions: true,
        savedUniversities: true
      }
    })
  }

  static async getByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        qualifications: true,
        languageProficiencies: true,
        studyPreferences: true,
        applications: {
          include: {
            university: true,
            program: true
          }
        },
        counselingSessions: true,
        savedUniversities: true
      }
    })
  }

  static async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    return await prisma.user.create({
      data,
      include: {
        qualifications: true,
        languageProficiencies: true,
        studyPreferences: true
      }
    })
  }

  static async update(id: string, data: Partial<User>) {
    return await prisma.user.update({
      where: { id },
      data,
      include: {
        qualifications: true,
        languageProficiencies: true,
        studyPreferences: true,
        savedUniversities: true
      }
    })
  }

  static async saveUniversity(userId: string, universityId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { savedUniversityIds: true }
    })

    if (!user) throw new Error('User not found')

    const updatedIds = user.savedUniversityIds.includes(universityId)
      ? user.savedUniversityIds.filter(id => id !== universityId)
      : [...user.savedUniversityIds, universityId]

    return await prisma.user.update({
      where: { id: userId },
      data: { savedUniversityIds: updatedIds },
      include: { savedUniversities: true }
    })
  }
}

// Application Operations
export class ApplicationService {
  static async getByUserId(userId: string) {
    return await prisma.application.findMany({
      where: { userId },
      include: {
        university: true,
        program: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  static async getById(id: string) {
    return await prisma.application.findUnique({
      where: { id },
      include: {
        university: true,
        program: true,
        user: true
      }
    })
  }

  static async create(data: Omit<Application, 'id' | 'createdAt' | 'updatedAt' | 'lastUpdated'>) {
    return await prisma.application.create({
      data,
      include: {
        university: true,
        program: true
      }
    })
  }

  static async updateStatus(id: string, status: any, notes?: string) {
    return await prisma.application.update({
      where: { id },
      data: {
        status,
        notes,
        timeline: {
          push: {
            date: new Date(),
            status,
            notes
          }
        }
      },
      include: {
        university: true,
        program: true
      }
    })
  }
}

// Counseling Session Operations
export class CounselingService {
  static async getByUserId(userId: string) {
    return await prisma.counselingSession.findMany({
      where: { userId },
      orderBy: {
        date: 'desc'
      }
    })
  }

  static async getById(id: string) {
    return await prisma.counselingSession.findUnique({
      where: { id },
      include: {
        user: true
      }
    })
  }

  static async create(data: Omit<CounselingSession, 'id' | 'createdAt' | 'updatedAt'>) {
    return await prisma.counselingSession.create({
      data
    })
  }

  static async updateStatus(id: string, status: any, notes?: string) {
    return await prisma.counselingSession.update({
      where: { id },
      data: { status, notes }
    })
  }

  static async addFeedback(id: string, rating: number, feedback: string) {
    return await prisma.counselingSession.update({
      where: { id },
      data: { rating, feedback }
    })
  }
}

// Database Health Check
export class DatabaseService {
  static async healthCheck() {
    try {
      await prisma.$ping()
      return { status: 'healthy', timestamp: new Date().toISOString() }
    } catch (error) {
      return { 
        status: 'unhealthy', 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString() 
      }
    }
  }

  static async getStats() {
    try {
      const [
        universityCount,
        programCount,
        userCount,
        applicationCount,
        sessionCount
      ] = await Promise.all([
        prisma.university.count(),
        prisma.program.count(),
        prisma.user.count(),
        prisma.application.count(),
        prisma.counselingSession.count()
      ])

      return {
        universities: universityCount,
        programs: programCount,
        users: userCount,
        applications: applicationCount,
        counselingSessions: sessionCount,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      throw new Error(`Failed to get database stats: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}