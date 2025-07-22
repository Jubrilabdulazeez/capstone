import { NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/database'

// GET /api/health - Health check endpoint
export async function GET() {
  try {
    const healthCheck = await DatabaseService.healthCheck()
    const stats = await DatabaseService.getStats()
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: healthCheck,
      stats,
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      { 
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
      },
      { status: 500 }
    )
  }
}