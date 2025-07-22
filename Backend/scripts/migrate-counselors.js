const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const counselorsData = [
  {
    email: "amina.ibrahim@educonnect.africa",
    password: "Counselor2024!",
    firstName: "Amina",
    lastName: "Ibrahim",
    name: "Dr. Amina Ibrahim",
    role: "COUNSELOR",
    verified: true,
    nationality: "Nigeria",
    phoneNumber: "+234 801 123 4567",
    city: "Lagos",
    // Additional counselor-specific data (for future counselor profile expansion)
    specialties: ["South Africa Universities", "Ghana Universities", "Medical Programs", "Scholarship Applications"],
    experience: "8+ years",
    rating: 4.9,
    countries: ["South Africa", "Ghana", "Rwanda"],
    languages: ["English", "Hausa", "Arabic"],
    bio: "Dr. Ibrahim has successfully guided over 500 Nigerian students to secure admissions at top African universities. She specializes in medical and health science programs with particular expertise in South African and Ghanaian institutions.",
  },
  {
    email: "michael.okonkwo@educonnect.africa",
    password: "Counselor2024!",
    firstName: "Michael",
    lastName: "Okonkwo",
    name: "Michael Okonkwo",
    role: "COUNSELOR",
    verified: true,
    nationality: "Nigeria",
    phoneNumber: "+234 802 123 4567",
    city: "Abuja",
    specialties: ["Engineering Programs", "Rwanda Universities", "STEM Fields", "Technology Programs"],
    experience: "6+ years",
    rating: 4.8,
    countries: ["Rwanda", "Ghana", "South Africa"],
    languages: ["English", "Igbo"],
    bio: "Michael has extensive experience in engineering education consulting. He previously worked as an admissions advisor at the University of Rwanda and has helped place students in top engineering programs across Africa.",
  },
  {
    email: "fatima.hassan@educonnect.africa",
    password: "Counselor2024!",
    firstName: "Fatima",
    lastName: "Hassan",
    name: "Dr. Fatima Hassan",
    role: "COUNSELOR",
    verified: true,
    nationality: "Nigeria",
    phoneNumber: "+234 803 123 4567",
    city: "Kano",
    specialties: ["Business Programs", "Egypt Universities", "Morocco Universities", "MBA Programs"],
    experience: "7+ years",
    rating: 4.9,
    countries: ["Egypt", "Morocco", "South Africa"],
    languages: ["English", "Arabic", "French"],
    bio: "Dr. Hassan specializes in business education and North African universities. She holds an MBA from American University in Cairo and has extensive knowledge of business programs across the continent.",
  },
  {
    email: "emmanuel.adebayo@educonnect.africa",
    password: "Counselor2024!",
    firstName: "Emmanuel",
    lastName: "Adebayo",
    name: "Emmanuel Adebayo",
    role: "COUNSELOR",
    verified: true,
    nationality: "Nigeria",
    phoneNumber: "+234 804 123 4567",
    city: "Port Harcourt",
    specialties: ["Kenya Universities", "Tanzania Universities", "Law Programs", "International Relations"],
    experience: "5+ years",
    rating: 4.7,
    countries: ["Kenya", "Tanzania", "Uganda"],
    languages: ["English", "Yoruba"],
    bio: "Emmanuel focuses on East African universities and has particular expertise in law and international relations programs. He maintains strong connections with admissions offices across the region.",
  },
  {
    email: "grace.chinonso@educonnect.africa",
    password: "Counselor2024!",
    firstName: "Grace",
    lastName: "Chinonso",
    name: "Grace Chinonso",
    role: "COUNSELOR",
    verified: true,
    nationality: "Nigeria",
    phoneNumber: "+234 805 123 4567",
    city: "Enugu",
    specialties: ["Health Sciences", "Public Health", "Research Programs", "Graduate Studies"],
    experience: "6+ years",
    rating: 4.8,
    countries: ["Ghana", "Rwanda", "Botswana"],
    languages: ["English", "Igbo"],
    bio: "Grace specializes in health sciences and public health programs. She has a background in public health research and helps students navigate complex admission requirements for medical and health-related programs.",
  }
];

async function migrateCounselors() {
  try {
    console.log('👥 Creating counselor accounts in database...');

    for (const counselorData of counselorsData) {
      // Check if counselor already exists
      const existingCounselor = await prisma.user.findUnique({
        where: { email: counselorData.email }
      });

      if (existingCounselor) {
        console.log(`⚠️  Counselor ${counselorData.email} already exists`);
        continue;
      }

      // Extract additional data that's not part of the User model
      const { specialties, experience, rating, countries, languages, bio, ...userData } = counselorData;

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 12);

      // Create counselor user
      const counselor = await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword
        }
      });

      console.log(`✅ Created counselor: ${counselor.email} (${counselor.firstName} ${counselor.lastName})`);
      console.log(`   📍 Location: ${counselor.city}, ${counselor.nationality}`);
      console.log(`   📞 Phone: ${counselor.phoneNumber}`);
    }

    console.log('\n🎉 Counselors migration completed!');
    console.log('📋 Counselor Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👩‍🏫 COUNSELORS:');
    counselorsData.forEach((counselor, index) => {
      console.log(`${index + 1}. ${counselor.name}`);
      console.log(`   Email: ${counselor.email}`);
      console.log(`   Password: ${counselor.password}`);
      console.log(`   Specialties: ${counselor.specialties.join(', ')}`);
      console.log('');
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  } catch (error) {
    console.error('❌ Error creating counselors:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateCounselors();