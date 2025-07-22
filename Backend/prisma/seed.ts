import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create sample universities
  const university1 = await prisma.university.create({
    data: {
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
    }
  })

  const university2 = await prisma.university.create({
    data: {
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
    }
  })

  const university3 = await prisma.university.create({
    data: {
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
    }
  })

  // Create programs for each university
  await prisma.program.createMany({
    data: [
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
        universityId: university1.id,
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
        universityId: university1.id,
      },
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
        universityId: university2.id,
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
        universityId: university2.id,
      },
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
        universityId: university3.id,
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
        universityId: university3.id,
      },
    ]
  })

  // Create scholarships
  await prisma.scholarship.createMany({
    data: [
      {
        name: "International Students Merit Scholarship",
        description: "Merit-based scholarship for international students with exceptional academic records.",
        coverage: "PARTIAL",
        coverageDetails: "50% tuition reduction",
        eligibilityCriteria: "Minimum 3.5 GPA or equivalent, recommendation letters",
        applicationDeadline: "March 15th",
        link: "https://www.ug.edu.gh/scholarships",
        universityId: university1.id,
      },
      {
        name: "UCT International Merit Scholarship",
        description: "Competitive scholarship for top-performing international students",
        coverage: "FULL",
        coverageDetails: "Full tuition, accommodation, and stipend",
        eligibilityCriteria: "Top 5% of academic performance, leadership qualities",
        applicationDeadline: "January 31st",
        link: "https://www.uct.ac.za/students/fees-funding",
        universityId: university2.id,
      },
      {
        name: "East African Community Scholarship",
        description: "Scholarship for students from East African Community countries and other African nations",
        coverage: "PARTIAL",
        coverageDetails: "30-50% tuition reduction",
        eligibilityCriteria: "Academic merit, demonstrated financial need",
        applicationDeadline: "February 28th",
        link: "https://www.uonbi.ac.ke/scholarships",
        universityId: university3.id,
      },
    ]
  })

  console.log('✅ Database seeding completed successfully!')
  console.log(`Created:`)
  console.log(`- 3 Universities`)
  console.log(`- 6 Programs`)
  console.log(`- 3 Scholarships`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })