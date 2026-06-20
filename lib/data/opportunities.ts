export type OpportunityCategory =
  | "Scholarship"
  | "Entry-Level Job"
  | "Cohort Training"
  | "Grant & Funding"
  | "Fellowship"
  | "Volunteer & Internship";

export type WorkType = "Remote" | "Hybrid" | "Onsite";

export interface Opportunity {
  id: string;
  title: string;
  organisation: string;
  category: OpportunityCategory;
  workType: WorkType;
  deadline: string; // ISO date string
  isPaid: boolean;
  location: string;
  link: string;
  description: string;
  tags: string[];
}

export const opportunities: Opportunity[] = [
  // Scholarships
  {
    id: "opp-001",
    title: "Mastercard Foundation Scholars Program",
    organisation: "Mastercard Foundation",
    category: "Scholarship",
    workType: "Onsite",
    deadline: "2025-09-30",
    isPaid: true,
    location: "Pan-Africa",
    link: "https://mastercardfdn.org/scholars",
    description:
      "Full scholarship for academically gifted yet economically disadvantaged students to study at leading universities across Africa and abroad.",
    tags: ["University", "Full Scholarship", "Leadership"],
  },
  {
    id: "opp-002",
    title: "African Union Youth Scholarship Scheme",
    organisation: "African Union Commission",
    category: "Scholarship",
    workType: "Onsite",
    deadline: "2025-08-15",
    isPaid: true,
    location: "Africa-wide",
    link: "https://au.int/youth",
    description:
      "Scholarships for African youth to pursue undergraduate and postgraduate studies at African universities.",
    tags: ["Government", "Undergraduate", "Postgraduate"],
  },

  // Entry-Level Jobs
  {
    id: "opp-003",
    title: "Junior Data Analyst",
    organisation: "Safaricom PLC",
    category: "Entry-Level Job",
    workType: "Hybrid",
    deadline: "2025-07-31",
    isPaid: true,
    location: "Nairobi, Kenya",
    link: "https://safaricom.co.ke/careers",
    description:
      "Entry-level data analyst role supporting business intelligence teams. No prior experience required — training provided.",
    tags: ["Tech", "Data", "Kenya"],
  },
  {
    id: "opp-004",
    title: "Community Outreach Officer",
    organisation: "Amref Health Africa",
    category: "Entry-Level Job",
    workType: "Onsite",
    deadline: "2025-07-20",
    isPaid: true,
    location: "Multiple Regions",
    link: "https://amref.org/careers",
    description:
      "Work with grassroots communities to support health programme rollout. Open to recent graduates with a passion for community work.",
    tags: ["Health", "Community", "NGO"],
  },

  // Cohort Trainings
  {
    id: "opp-005",
    title: "Africa Agility Digital Skills Bootcamp",
    organisation: "Africa Agility",
    category: "Cohort Training",
    workType: "Remote",
    deadline: "2025-08-01",
    isPaid: false,
    location: "Online",
    link: "https://africaagility.org",
    description:
      "12-week cohort training in digital skills — covering web development, digital marketing, and data literacy for African youth.",
    tags: ["Tech", "Digital Skills", "12 Weeks"],
  },
  {
    id: "opp-006",
    title: "Financial Literacy for Youth Cohort",
    organisation: "Youth Forward Kenya",
    category: "Cohort Training",
    workType: "Hybrid",
    deadline: "2025-07-25",
    isPaid: false,
    location: "Nairobi, Kenya",
    link: "https://youthforwardkenya.org",
    description:
      "8-week structured programme covering budgeting, saving, credit, and entrepreneurship for youth aged 18–30.",
    tags: ["Finance", "Entrepreneurship", "8 Weeks"],
  },

  // Grants & Funding
  {
    id: "opp-007",
    title: "Tony Elumelu Foundation Entrepreneurship Programme",
    organisation: "Tony Elumelu Foundation",
    category: "Grant & Funding",
    workType: "Hybrid",
    deadline: "2025-10-01",
    isPaid: true,
    location: "Pan-Africa",
    link: "https://tonyelumelufoundation.org/teep",
    description:
      "USD $5,000 seed capital, mentoring, and training for African entrepreneurs. Open to early-stage business owners.",
    tags: ["Entrepreneurship", "Seed Grant", "$5,000"],
  },
  {
    id: "opp-008",
    title: "Hivos Youth Innovation Fund",
    organisation: "Hivos East Africa",
    category: "Grant & Funding",
    workType: "Remote",
    deadline: "2025-08-30",
    isPaid: true,
    location: "East Africa",
    link: "https://hivos.org/youth",
    description:
      "Funding for youth-led social innovations tackling climate, inequality, and social justice in East Africa.",
    tags: ["Social Innovation", "Climate", "East Africa"],
  },

  // Fellowships
  {
    id: "opp-009",
    title: "Mandela Washington Fellowship",
    organisation: "U.S. Department of State",
    category: "Fellowship",
    workType: "Onsite",
    deadline: "2025-11-15",
    isPaid: true,
    location: "United States",
    link: "https://yali.state.gov/mwf",
    description:
      "Flagship exchange programme for young African leaders in business, civic leadership, and public management.",
    tags: ["Leadership", "USA", "Prestigious"],
  },
  {
    id: "opp-010",
    title: "African Leadership Academy Fellowship",
    organisation: "African Leadership Academy",
    category: "Fellowship",
    workType: "Onsite",
    deadline: "2025-09-01",
    isPaid: true,
    location: "Johannesburg, South Africa",
    link: "https://africaleadershipacademy.org",
    description:
      "A two-year residential fellowship for emerging African leaders aged 15–19, focusing on entrepreneurial leadership.",
    tags: ["Leadership", "Residential", "Teens"],
  },

  // Volunteer & Internships
  {
    id: "opp-011",
    title: "UN Volunteers Programme — Kenya",
    organisation: "United Nations Volunteers",
    category: "Volunteer & Internship",
    workType: "Hybrid",
    deadline: "2025-08-10",
    isPaid: false,
    location: "Nairobi, Kenya",
    link: "https://unv.org",
    description:
      "Volunteer placements with UN agencies in Kenya supporting development, environment, and humanitarian programmes.",
    tags: ["UN", "Development", "Volunteer"],
  },
  {
    id: "opp-012",
    title: "GIZ Youth Internship Programme",
    organisation: "Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ)",
    category: "Volunteer & Internship",
    workType: "Onsite",
    deadline: "2025-07-15",
    isPaid: true,
    location: "East Africa",
    link: "https://giz.de/careers",
    description:
      "Paid internship programme for recent graduates in sustainable development, agriculture, and policy in East Africa.",
    tags: ["International", "Paid", "Development"],
  },
  {
    id: "opp-013",
    title: "Ushahidi Open Source Internship",
    organisation: "Ushahidi",
    category: "Volunteer & Internship",
    workType: "Remote",
    deadline: "2025-08-20",
    isPaid: true,
    location: "Remote (Global)",
    link: "https://ushahidi.com/careers",
    description:
      "Remote internship for developers and UX designers contributing to open-source civic tech tools used across Africa.",
    tags: ["Tech", "Open Source", "Remote"],
  },
];

export const categoryMeta: {
  label: OpportunityCategory;
  icon: string;
  count: number;
  description: string;
}[] = [
  {
    label: "Scholarship",
    icon: "GraduationCap",
    count: 2,
    description: "Funded education opportunities at African and global universities",
  },
  {
    label: "Entry-Level Job",
    icon: "Briefcase",
    count: 2,
    description: "No-experience-required jobs open to fresh graduates and youth",
  },
  {
    label: "Cohort Training",
    icon: "Users",
    count: 2,
    description: "Structured group programmes building skills over weeks or months",
  },
  {
    label: "Grant & Funding",
    icon: "Banknote",
    count: 2,
    description: "Capital and funding for youth entrepreneurs and innovators",
  },
  {
    label: "Fellowship",
    icon: "Award",
    count: 2,
    description: "Prestigious programmes for emerging African leaders",
  },
  {
    label: "Volunteer & Internship",
    icon: "Heart",
    count: 3,
    description: "Hands-on experience through internships and volunteer placements",
  },
];
