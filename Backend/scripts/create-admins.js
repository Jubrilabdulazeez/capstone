const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmins() {
  try {
    console.log('🔧 Creating admin users...');

    // Admin credentials
    const admins = [
      {
        email: 'superadmin@educonnect.africa',
        password: 'SuperAdmin2024!',
        firstName: 'John',
        lastName: 'Doe',
        name: 'John Doe',
        role: 'ADMIN',
        verified: true,
        nationality: 'Nigeria'
      },
      {
        email: 'admin@educonnect.africa', 
        password: 'Admin2024!',
        firstName: 'Jane',
        lastName: 'Smith',
        name: 'Jane Smith',
        role: 'ADMIN',
        verified: true,
        nationality: 'Ghana'
      }
    ];

    // Create each admin
    for (const adminData of admins) {
      // Check if admin already exists
      const existingAdmin = await prisma.user.findUnique({
        where: { email: adminData.email }
      });

      if (existingAdmin) {
        console.log(`⚠️  Admin ${adminData.email} already exists`);
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(adminData.password, 12);

      // Create admin user
      const admin = await prisma.user.create({
        data: {
          ...adminData,
          password: hashedPassword
        }
      });

      console.log(`✅ Created admin: ${admin.email} (ID: ${admin.id})`);
    }

    console.log('\n🎉 Admin creation completed!');
    console.log('\n📋 Admin Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👑 SUPER ADMIN:');
    console.log('   Email: superadmin@educonnect.africa');
    console.log('   Password: SuperAdmin2024!');
    console.log('');
    console.log('🔧 ADMIN:');
    console.log('   Email: admin@educonnect.africa');
    console.log('   Password: Admin2024!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  } catch (error) {
    console.error('❌ Error creating admins:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmins();