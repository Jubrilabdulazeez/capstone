const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const universitiesData = [
  {
    name: "University of Ghana",
    country: "Ghana",
    city: "Accra",
    logo: "/images/universities/university-of-ghana-logo.png",
    images: [
      "/images/universities/university-of-ghana-1.jpg",
      "/images/universities/university-of-ghana-2.jpg",
    ],
    description: "The University of Ghana is the oldest and largest of the thirteen Ghanaian national public universities. It was founded in 1948 as the University College of the Gold Coast, and was originally an affiliate college of the University of London, which supervised its academic programs and awarded degrees.",
    website: "https://www.ug.edu.gh",
    foundedYear: 1948,
    type: "PUBLIC",
    accreditation: ["National Accreditation Board of Ghana", "Association of African Universities"],
    ranking: "A",
    rankingScore: 85,
    studentsCount: 38000,
    nigerianStudentsCount: 1250,
    internationalStudentsPercentage: 0.15,
    acceptanceRate: 0.65,
    averageTuition: 3500,
    tuitionMin: 2500,
    tuitionMax: 5000,
    languagesOfInstruction: ["English"],
    accommodationAvailable: true,
    accommodationCostMin: 800,
    accommodationCostMax: 1500,
    admissionRequirementsGeneral: "Completed secondary education, proficiency in English",
    admissionRequirementsInternational: "Foreign qualification evaluation, proof of financial support, valid passport",
    admissionRequirementsNigerian: "WAEC/NECO with minimum 5 credits including English and Mathematics",
    admissionDeadlinesFall: "April 30th",
    admissionDeadlinesSpring: "October 31st",
    contactEmail: "admissions@ug.edu.gh",
    contactPhone: "+233 302 213820",
    contactAddress: "P.O. Box LG 25, Legon, Accra, Ghana",
    facilitiesAndServices: [
      "Modern libraries",
      "Computer labs",
      "Sports facilities",
      "Career services",
      "Health center",
      "International student office",
    ],
    strengths: [
      "Strong business and management programs",
      "Research opportunities",
      "Active international student community",
      "Affordable tuition compared to Western universities",
    ],
    virtualTour: "https://www.ug.edu.gh/virtual-tour",
    programs: [
      {
        name: "Business Administration",
        degreeType: "BACHELOR",
        durationYears: 4,
        annualTuition: 3200,
        currency: "USD",
        language: "English",
        hasScholarship: true,
        entryRequirements: "WAEC/NECO with minimum of 5 credits including English and Mathematics",
        description: "The Bachelor of Science in Business Administration program is designed to provide students with a solid foundation in business principles and practices.",
      },
      {
        name: "Computer Science",
        degreeType: "BACHELOR",
        durationYears: 4,
        annualTuition: 3500,
        currency: "USD",
        language: "English",
        hasScholarship: true,
        entryRequirements: "WAEC/NECO with minimum of 5 credits including English, Mathematics and Physics",
        description: "The Computer Science program offers comprehensive training in software development, data structures, algorithms, and other core areas of computer science.",
      },
    ],
    scholarships: [
      {
        name: "International Students Merit Scholarship",
        description: "Merit-based scholarship for international students with exceptional academic records.",
        coverage: "PARTIAL",
        coverageDetails: "50% tuition reduction",
        eligibilityCriteria: "Minimum 3.5 GPA or equivalent, recommendation letters",
        applicationDeadline: "March 15th",
        link: "https://www.ug.edu.gh/scholarships",
      },
    ],
  },
  {
    name: "University of Cape Town",
    country: "South Africa",
    city: "Cape Town",
    logo: "/images/universities/university-of-cape-town-logo.png",
    images: [
      "/images/universities/university-of-cape-town-1.jpg",
      "/images/universities/university-of-cape-town-2.jpg",
    ],
    description: "The University of Cape Town (UCT) is South Africa's oldest university, founded in 1829. It's widely regarded as one of Africa's leading universities. UCT has a proud tradition of academic excellence and effecting social change and development through its pioneering scholarship, faculty and students.",
    website: "https://www.uct.ac.za",
    foundedYear: 1829,
    type: "PUBLIC",
    accreditation: ["Council on Higher Education of South Africa", "Association of African Universities"],
    ranking: "A_PLUS",
    rankingScore: 92,
    studentsCount: 28000,
    nigerianStudentsCount: 950,
    internationalStudentsPercentage: 0.18,
    acceptanceRate: 0.4,
    averageTuition: 5000,
    tuitionMin: 4000,
    tuitionMax: 7000,
    languagesOfInstruction: ["English"],
    accommodationAvailable: true,
    accommodationCostMin: 1200,
    accommodationCostMax: 2000,
    admissionRequirementsGeneral: "National Senior Certificate or equivalent, admission point score (APS) calculation",
    admissionRequirementsInternational: "Verification of qualifications, proof of English proficiency, visa requirements",
    admissionRequirementsNigerian: "WAEC/NECO with minimum 6 credits including English and Mathematics, SAT or NBT scores may be required",
    admissionDeadlinesFall: "March 31st",
    admissionDeadlinesWinter: "September 30th",
    contactEmail: "admissions@uct.ac.za",
    contactPhone: "+27 21 650 9111",
    contactAddress: "University of Cape Town, Rondebosch, Cape Town, 7701, South Africa",
    facilitiesAndServices: [
      "World-class libraries",
      "State-of-the-art laboratories",
      "Sports complexes",
      "Health services",
      "Psychological services",
      "International student support office",
    ],
    strengths: [
      "Strong medical and engineering programs",
      "Research leadership in Africa",
      "Beautiful campus with modern facilities",
      "Strong industry connections",
      "International recognition of qualifications",
    ],
    virtualTour: "https://www.uct.ac.za/virtual-campus-tour",
    programs: [
      {
        name: "Medicine and Surgery",
        degreeType: "BACHELOR",
        durationYears: 6,
        annualTuition: 6800,
        currency: "USD",
        language: "English",
        hasScholarship: true,
        entryRequirements: "WAEC/NECO with minimum of 6 credits including English, Mathematics, Biology, Chemistry and Physics",
        description: "The Medicine and Surgery program at UCT is one of the most prestigious in Africa, offering world-class training in all aspects of medical science and practice.",
      },
      {
        name: "Electrical Engineering",
        degreeType: "BACHELOR",
        durationYears: 4,
        annualTuition: 5500,
        currency: "USD",
        language: "English",
        hasScholarship: true,
        entryRequirements: "WAEC/NECO with minimum of 5 credits including English, Mathematics and Physics",
        description: "The Electrical Engineering program provides students with a solid foundation in electrical systems, electronics, and modern communication technologies.",
      },
    ],
    scholarships: [
      {
        name: "UCT International Merit Scholarship",
        description: "Competitive scholarship for top-performing international students",
        coverage: "FULL",
        coverageDetails: "Full tuition, accommodation, and stipend",
        eligibilityCriteria: "Top 5% of academic performance, leadership qualities",
        applicationDeadline: "January 31st",
        link: "https://www.uct.ac.za/students/fees-funding",
      },
    ],
  },
  {
    name: "University of Nairobi",
    country: "Kenya",
    city: "Nairobi",
    logo: "/images/universities/university-of-nairobi-logo.png",
    images: [
      "/images/universities/university-of-nairobi-1.jpg",
      "/images/universities/university-of-nairobi-2.jpg",
    ],
    description: "The University of Nairobi is Kenya's largest and oldest university, founded in 1970 when the University of East Africa was split into three independent universities. It has a strong focus on research and innovation and is committed to academic excellence.",
    website: "https://www.uonbi.ac.ke",
    foundedYear: 1970,
    type: "PUBLIC",
    accreditation: ["Commission for University Education of Kenya", "Association of African Universities"],
    ranking: "A",
    rankingScore: 82,
    studentsCount: 32000,
    nigerianStudentsCount: 750,
    internationalStudentsPercentage: 0.12,
    acceptanceRate: 0.55,
    averageTuition: 3000,
    tuitionMin: 2200,
    tuitionMax: 4500,
    languagesOfInstruction: ["English", "Swahili"],
    accommodationAvailable: true,
    accommodationCostMin: 700,
    accommodationCostMax: 1300,
    admissionRequirementsGeneral: "Kenya Certificate of Secondary Education (KCSE) or equivalent",
    admissionRequirementsInternational: "Qualification evaluation by Kenya National Qualifications Authority, English proficiency",
    admissionRequirementsNigerian: "WAEC/NECO with minimum 5 credits including relevant subjects for chosen program",
    admissionDeadlinesFall: "May 31st",
    admissionDeadlinesSpring: "November 30th",
    contactEmail: "admissions@uonbi.ac.ke",
    contactPhone: "+254 20 4910000",
    contactAddress: "University of Nairobi, University Way, Nairobi, Kenya",
    facilitiesAndServices: [
      "Libraries",
      "Research centers",
      "Computer labs",
      "Student center",
      "Medical services",
      "International office",
    ],
    strengths: [
      "Strong programs in law and agriculture",
      "Affordable tuition fees",
      "Diverse student community",
      "Strategic location in East Africa's business hub",
      "Connections with local industries",
    ],
    programs: [
      {
        name: "Law",
        degreeType: "BACHELOR",
        durationYears: 4,
        annualTuition: 3800,
        currency: "USD",
        language: "English",
        hasScholarship: true,
        entryRequirements: "WAEC/NECO with minimum of 5 credits including English and Literature",
        description: "The Bachelor of Laws (LLB) program prepares students for careers in legal practice, academia, and public service with a focus on both Kenyan and international law.",
      },
      {
        name: "Agriculture",
        degreeType: "BACHELOR",
        durationYears: 4,
        annualTuition: 2800,
        currency: "USD",
        language: "English",
        hasScholarship: true,
        entryRequirements: "WAEC/NECO with minimum of 5 credits including English, Mathematics, and Biology",
        description: "The Agriculture program focuses on sustainable farming practices, agricultural economics, and modern agricultural technologies relevant to African contexts.",
      },
    ],
    scholarships: [
      {
        name: "East African Community Scholarship",
        description: "Scholarship for students from East African Community countries and other African nations",
        coverage: "PARTIAL",
        coverageDetails: "30-50% tuition reduction",
        eligibilityCriteria: "Academic merit, demonstrated financial need",
        applicationDeadline: "February 28th",
        link: "https://www.uonbi.ac.ke/scholarships",
      },
    ],
  },
  {
    name: "American University in Cairo",
    country: "Egypt",
    city: "Cairo",
    logo: "/images/universities/american-university-cairo-logo.png",
    images: [
      "/images/universities/american-university-cairo-1.jpg",
      "/images/universities/american-university-cairo-2.jpg",
    ],
    description: "The American University in Cairo (AUC) is an independent, English-language, liberal arts university founded in 1919. AUC is committed to providing quality higher education to students from Egypt and around the world while contributing to the intellectual, cultural and social life of the Arab region.",
    website: "https://www.aucegypt.edu",
    foundedYear: 1919,
    type: "PRIVATE",
    accreditation: ["Middle States Commission on Higher Education (USA)", "National Authority for Quality Assurance and Accreditation of Education (Egypt)"],
    ranking: "A",
    rankingScore: 87,
    studentsCount: 7000,
    nigerianStudentsCount: 320,
    internationalStudentsPercentage: 0.22,
    acceptanceRate: 0.45,
    averageTuition: 12000,
    tuitionMin: 10000,
    tuitionMax: 15000,
    languagesOfInstruction: ["English", "Arabic"],
    accommodationAvailable: true,
    accommodationCostMin: 2000,
    accommodationCostMax: 3500,
    admissionRequirementsGeneral: "High school certificate with strong academic record, standardized test scores",
    admissionRequirementsInternational: "Verification of qualifications, English proficiency (TOEFL/IELTS), financial guarantee",
    admissionRequirementsNigerian: "WAEC/NECO with strong results, SAT scores recommended",
    admissionDeadlinesFall: "February 1st",
    admissionDeadlinesSpring: "October 1st",
    contactEmail: "admissions@aucegypt.edu",
    contactPhone: "+20 2 2615 1000",
    contactAddress: "AUC Avenue, P.O. Box 74, New Cairo 11835, Egypt",
    facilitiesAndServices: [
      "Modern library",
      "Athletic facilities",
      "Student residences",
      "Career center",
      "Health clinic",
      "International student services",
    ],
    strengths: [
      "American-style liberal arts education",
      "Strong business and media programs",
      "State-of-the-art campus facilities",
      "Strong alumni network across Africa and the Middle East",
      "Internationally recognized degree",
      "English-language instruction",
    ],
    virtualTour: "https://www.aucegypt.edu/campus-life/virtual-tour",
    programs: [
      {
        name: "Business Administration",
        degreeType: "BACHELOR",
        durationYears: 4,
        annualTuition: 12500,
        currency: "USD",
        language: "English",
        hasScholarship: true,
        entryRequirements: "WAEC/NECO with minimum of 5 credits including English and Mathematics, SAT scores",
        description: "The Business Administration program provides a comprehensive education in business fundamentals with opportunities for specialization in various business disciplines.",
      },
      {
        name: "Media and Communication Studies",
        degreeType: "BACHELOR",
        durationYears: 4,
        annualTuition: 11800,
        currency: "USD",
        language: "English",
        hasScholarship: true,
        entryRequirements: "WAEC/NECO with minimum of 5 credits including English",
        description: "The Media and Communication Studies program prepares students for careers in journalism, public relations, and digital media with a focus on the Middle East and North Africa region.",
      },
    ],
    scholarships: [
      {
        name: "African Undergraduate Scholarship",
        description: "Competitive scholarship for high-achieving students from African countries",
        coverage: "PARTIAL",
        coverageDetails: "40-70% tuition reduction",
        eligibilityCriteria: "Academic excellence, demonstrated leadership potential",
        applicationDeadline: "February 15th",
        link: "https://www.aucegypt.edu/admissions/scholarships",
      },
    ],
  },
  {
    name: "University of Rwanda",
    country: "Rwanda",
    city: "Kigali",
    logo: "/images/universities/university-of-rwanda-logo.png",
    images: [
      "/images/universities/university-of-rwanda-1.jpg",
      "/images/universities/university-of-rwanda-2.jpg",
    ],
    description: "The University of Rwanda is Rwanda's largest higher education institution, formed in 2013 through the merger of Rwanda's public higher education institutions. The university focuses on research and programs that address Rwanda's development challenges.",
    website: "https://www.ur.ac.rw",
    foundedYear: 2013,
    type: "PUBLIC",
    accreditation: ["Higher Education Council of Rwanda", "East African Community"],
    ranking: "B_PLUS",
    rankingScore: 75,
    studentsCount: 25000,
    nigerianStudentsCount: 410,
    internationalStudentsPercentage: 0.08,
    acceptanceRate: 0.7,
    averageTuition: 2000,
    tuitionMin: 1500,
    tuitionMax: 3000,
    languagesOfInstruction: ["English", "French", "Kinyarwanda"],
    accommodationAvailable: true,
    accommodationCostMin: 500,
    accommodationCostMax: 900,
    admissionRequirementsGeneral: "Rwanda Advanced Level Certificate or equivalent, entrance examination for some programs",
    admissionRequirementsInternational: "Equivalent qualifications verification, English proficiency",
    admissionRequirementsNigerian: "WAEC/NECO with minimum 5 credits in relevant subjects",
    admissionDeadlinesFall: "May 15th",
    contactEmail: "admission@ur.ac.rw",
    contactPhone: "+250 788 521 800",
    contactAddress: "University of Rwanda, KK 737 Street, Gikondo, Kigali, Rwanda",
    facilitiesAndServices: [
      "Libraries",
      "ICT centers",
      "Student hostels",
      "Sports facilities",
      "Health services",
      "International office",
    ],
    strengths: [
      "Very affordable tuition",
      "Strong IT and health sciences programs",
      "Safe and stable country environment",
      "Growing technology hub in East Africa",
      "Connection to Rwanda's rapid development initiatives",
    ],
    programs: [
      {
        name: "Information Technology",
        degreeType: "BACHELOR",
        durationYears: 4,
        annualTuition: 2200,
        currency: "USD",
        language: "English",
        hasScholarship: true,
        entryRequirements: "WAEC/NECO with minimum of 5 credits including English, Mathematics and any Science subject",
        description: "The Information Technology program equips students with skills in software development, network management, and information systems design.",
      },
      {
        name: "Public Health",
        degreeType: "BACHELOR",
        durationYears: 4,
        annualTuition: 1900,
        currency: "USD",
        language: "English",
        hasScholarship: true,
        entryRequirements: "WAEC/NECO with minimum of 5 credits including English, Mathematics and Biology",
        description: "The Public Health program prepares students for careers in health policy, disease prevention, and community health education.",
      },
    ],
    scholarships: [
      {
        name: "Rwanda International Student Scholarship",
        description: "Scholarship for international students with focus on technology and health fields",
        coverage: "PARTIAL",
        coverageDetails: "50% tuition reduction and accommodation support",
        eligibilityCriteria: "Academic merit, interest in priority development areas",
        applicationDeadline: "April 15th",
        link: "https://www.ur.ac.rw/scholarships",
      },
    ],
  },
];

async function migrateUniversities() {
  try {
    console.log('🏫 Migrating universities data to database...');

    for (const universityData of universitiesData) {
      // Check if university already exists
      const existingUniversity = await prisma.university.findFirst({
        where: { 
          name: universityData.name,
          country: universityData.country 
        }
      });

      if (existingUniversity) {
        console.log(`⚠️  University ${universityData.name} already exists`);
        continue;
      }

      // Extract programs and scholarships
      const { programs, scholarships, ...universityMainData } = universityData;

      // Create university
      const university = await prisma.university.create({
        data: universityMainData
      });

      console.log(`✅ Created university: ${university.name} (ID: ${university.id})`);

      // Create programs
      if (programs && programs.length > 0) {
        for (const programData of programs) {
          const program = await prisma.program.create({
            data: {
              ...programData,
              universityId: university.id
            }
          });
          console.log(`   📚 Created program: ${program.name}`);
        }
      }

      // Create scholarships
      if (scholarships && scholarships.length > 0) {
        for (const scholarshipData of scholarships) {
          const scholarship = await prisma.scholarship.create({
            data: {
              ...scholarshipData,
              universityId: university.id
            }
          });
          console.log(`   🎓 Created scholarship: ${scholarship.name}`);
        }
      }
    }

    console.log('\n🎉 Universities migration completed!');
    console.log(`📊 Successfully migrated ${universitiesData.length} universities to the database`);

  } catch (error) {
    console.error('❌ Error migrating universities:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateUniversities();