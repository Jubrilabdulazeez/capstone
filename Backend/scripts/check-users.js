const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    console.log('🔍 Checking user roles in database...\n');

    // Get all users with their roles
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        verified: true,
        createdAt: true
      },
      orderBy: {
        role: 'asc'
      }
    });

    console.log(`📊 Total users in database: ${users.length}\n`);

    // Group users by role
    const usersByRole = users.reduce((acc, user) => {
      if (!acc[user.role]) {
        acc[user.role] = [];
      }
      acc[user.role].push(user);
      return acc;
    }, {});

    // Display users by role
    for (const [role, roleUsers] of Object.entries(usersByRole)) {
      console.log(`👥 ${role} USERS (${roleUsers.length}):`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      roleUsers.forEach((user, index) => {
        console.log(`${index + 1}. ${user.firstName} ${user.lastName}`);
        console.log(`   📧 Email: ${user.email}`);
        console.log(`   🆔 ID: ${user.id}`);
        console.log(`   ✅ Verified: ${user.verified ? 'Yes' : 'No'}`);
        console.log(`   📅 Created: ${user.createdAt.toLocaleDateString()}`);
        console.log('');
      });
    }

    // Check schema Role enum
    console.log('🏗️  Available Roles in Schema:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('- STUDENT: Regular students using the platform');
    console.log('- ADMIN: Administrators with full system access');
    console.log('- COUNSELOR: Education counselors providing guidance');
    console.log('');

    console.log('🎯 Role Distribution Summary:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    Object.entries(usersByRole).forEach(([role, users]) => {
      console.log(`${role}: ${users.length} users`);
    });

  } catch (error) {
    console.error('❌ Error checking users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();