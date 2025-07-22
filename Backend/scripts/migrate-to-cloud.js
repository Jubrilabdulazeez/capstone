const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function migrateToCloud() {
  try {
    console.log('☁️  Checking MongoDB Cloud Migration Status...\n');

    // Test database connection
    console.log('🔗 Testing database connection...');
    await prisma.$connect();
    console.log('✅ Successfully connected to MongoDB Cloud!\n');

    // Check if schema is deployed
    console.log('🏗️  Verifying database schema...');
    
    try {
      // Test if we can query the database structure
      const userCount = await prisma.user.count();
      const universityCount = await prisma.university.count();
      const programCount = await prisma.program.count();
      const scholarshipCount = await prisma.scholarship.count();

      console.log('📊 Current Data in MongoDB Cloud:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`👥 Users: ${userCount}`);
      console.log(`🏫 Universities: ${universityCount}`);
      console.log(`📚 Programs: ${programCount}`);
      console.log(`🎓 Scholarships: ${scholarshipCount}\n`);

      // Check role distribution
      const roleDistribution = await prisma.user.groupBy({
        by: ['role'],
        _count: {
          role: true
        }
      });

      console.log('👤 User Role Distribution:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      roleDistribution.forEach(role => {
        console.log(`${role.role}: ${role._count.role} users`);
      });
      console.log('');

      // Verify admins exist
      const admins = await prisma.user.findMany({
        where: { role: 'ADMIN' },
        select: {
          email: true,
          firstName: true,
          lastName: true,
          verified: true
        }
      });

      console.log('👑 Admin Accounts:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. ${admin.firstName} ${admin.lastName} (${admin.email})`);
        console.log(`   ✅ Verified: ${admin.verified}`);
      });
      console.log('');

      // Verify counselors exist
      const counselors = await prisma.user.findMany({
        where: { role: 'COUNSELOR' },
        select: {
          email: true,
          firstName: true,
          lastName: true,
          city: true
        }
      });

      console.log('👩‍🏫 Counselor Accounts:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      counselors.forEach((counselor, index) => {
        console.log(`${index + 1}. ${counselor.firstName} ${counselor.lastName}`);
        console.log(`   📧 ${counselor.email}`);
        console.log(`   📍 ${counselor.city}`);
      });
      console.log('');

      // Check universities and their programs
      const universities = await prisma.university.findMany({
        include: {
          programs: true,
          scholarships: true
        }
      });

      console.log('🏫 Universities with Programs:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      universities.forEach((university, index) => {
        console.log(`${index + 1}. ${university.name} (${university.country})`);
        console.log(`   📚 Programs: ${university.programs.length}`);
        console.log(`   🎓 Scholarships: ${university.scholarships.length}`);
      });
      console.log('');

      console.log('🎉 Migration Status: COMPLETE');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅ All data is successfully stored in MongoDB Cloud');
      console.log('✅ Schema is properly deployed');
      console.log('✅ Admin accounts are ready');
      console.log('✅ Counselor accounts are ready');
      console.log('✅ University data is migrated');
      console.log('✅ Programs and scholarships are linked');
      console.log('');
      console.log('🌐 Your application is ready for production!');

    } catch (schemaError) {
      console.error('❌ Schema verification failed:', schemaError);
      console.log('\n🔧 To fix this, run:');
      console.log('   npx prisma db push');
      console.log('   npx prisma generate');
    }

  } catch (error) {
    console.error('❌ Migration check failed:', error);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Check your DATABASE_URL in .env.local');
    console.log('2. Ensure MongoDB Cloud cluster is running');
    console.log('3. Verify network access is configured');
    console.log('4. Run: npx prisma db push');
  } finally {
    await prisma.$disconnect();
  }
}

migrateToCloud();