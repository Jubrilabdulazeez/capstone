import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from './prisma'

// Security constants
const SALT_ROUNDS = 12
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret-change-in-production'
console.log('DEBUG: JWT_SECRET in use:', JWT_SECRET)
const TOKEN_EXPIRY = '7d'

// Password security utilities
export class PasswordUtils {
  static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS)
  }

  static async verify(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }

  static validateStrength(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number')
    }
    
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?])/.test(password)) {
      errors.push('Password must contain at least one special character')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}

// JWT utilities
export class TokenUtils {
  static generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY })
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET)
    } catch (error) {
      throw new Error('Invalid or expired token')
    }
  }

  static generateRefreshToken(): string {
    return jwt.sign({ type: 'refresh' }, JWT_SECRET, { expiresIn: '30d' })
  }
}

// Role and permission management
export enum UserRole {
  STUDENT = 'STUDENT',
  COUNSELOR = 'COUNSELOR',
  ADMIN = 'ADMIN'
}

export enum Permission {
  // User permissions
  READ_PROFILE = 'READ_PROFILE',
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  DELETE_PROFILE = 'DELETE_PROFILE',
  
  // University permissions
  READ_UNIVERSITIES = 'READ_UNIVERSITIES',
  CREATE_UNIVERSITY = 'CREATE_UNIVERSITY',
  UPDATE_UNIVERSITY = 'UPDATE_UNIVERSITY',
  DELETE_UNIVERSITY = 'DELETE_UNIVERSITY',
  
  // Application permissions
  READ_APPLICATIONS = 'READ_APPLICATIONS',
  CREATE_APPLICATION = 'CREATE_APPLICATION',
  UPDATE_APPLICATION = 'UPDATE_APPLICATION',
  DELETE_APPLICATION = 'DELETE_APPLICATION',
  APPROVE_APPLICATION = 'APPROVE_APPLICATION',
  
  // Admin permissions
  MANAGE_USERS = 'MANAGE_USERS',
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  MANAGE_SYSTEM = 'MANAGE_SYSTEM',
  
  // Counseling permissions
  MANAGE_SESSIONS = 'MANAGE_SESSIONS',
  VIEW_ALL_SESSIONS = 'VIEW_ALL_SESSIONS'
}

// Role-based access control
export const RolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.STUDENT]: [
    Permission.READ_PROFILE,
    Permission.UPDATE_PROFILE,
    Permission.READ_UNIVERSITIES,
    Permission.READ_APPLICATIONS,
    Permission.CREATE_APPLICATION,
    Permission.UPDATE_APPLICATION,
    Permission.DELETE_APPLICATION,
  ],
  [UserRole.COUNSELOR]: [
    Permission.READ_PROFILE,
    Permission.UPDATE_PROFILE,
    Permission.READ_UNIVERSITIES,
    Permission.READ_APPLICATIONS,
    Permission.UPDATE_APPLICATION,
    Permission.MANAGE_SESSIONS,
  ],
  [UserRole.ADMIN]: [
    // Admin has all permissions
    ...Object.values(Permission)
  ]
}

// Authentication utilities
export class AuthUtils {
  static async getCurrentUser(request: NextRequest) {
    try {
      const session = await getServerSession()
      
      if (!session?.user?.email) {
        return null
      }

      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
          qualifications: true,
          studyPreferences: true
        }
      })

      return user
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  static hasPermission(userRole: UserRole, permission: Permission): boolean {
    const rolePermissions = RolePermissions[userRole]
    return rolePermissions.includes(permission)
  }

  static hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
    return permissions.some(permission => this.hasPermission(userRole, permission))
  }

  static async requireAuth(request: NextRequest) {
    const user = await this.getCurrentUser(request)
    
    if (!user) {
      throw new Error('Authentication required')
    }
    
    return user
  }

  static async requireRole(request: NextRequest, allowedRoles: UserRole[]) {
    const user = await this.requireAuth(request)
    
    if (!allowedRoles.includes(user.role as UserRole)) {
      throw new Error('Insufficient permissions')
    }
    
    return user
  }

  static async requirePermission(request: NextRequest, permission: Permission) {
    const user = await this.requireAuth(request)
    
    if (!this.hasPermission(user.role as UserRole, permission)) {
      throw new Error('Insufficient permissions')
    }
    
    return user
  }
}

// Rate limiting utilities
export class SecurityUtils {
  static generateSecureId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  static sanitizeInput(input: string): string {
    return input.trim().replace(/[<>\"']/g, '')
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static async logSecurityEvent(event: string, details: object) {
    console.log(`[SECURITY] ${event}:`, details)
    // In production, you'd save this to a security log database
  }
}

// Session management
export class SessionManager {
  static async createSession(userId: string, deviceInfo?: string) {
    const sessionData = {
      userId,
      deviceInfo: deviceInfo || 'Unknown',
      createdAt: new Date(),
      lastActivity: new Date(),
      isActive: true
    }

    // In production, you'd store sessions in Redis or database
    await SecurityUtils.logSecurityEvent('SESSION_CREATED', sessionData)
    
    return TokenUtils.generateToken(sessionData)
  }

  static async invalidateSession(sessionId: string) {
    await SecurityUtils.logSecurityEvent('SESSION_INVALIDATED', { sessionId })
    // Remove session from storage
  }

  static async refreshSession(sessionId: string) {
    // Update last activity and generate new token if needed
    const payload = TokenUtils.verifyToken(sessionId)
    payload.lastActivity = new Date()
    
    return TokenUtils.generateToken(payload)
  }
}