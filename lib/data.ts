export const profile = {
  name: "Richard Cole",
  role: "Software Engineer",
  tagline:
    "A Software Engineer who has developed countless innovative solutions.",
  // Drop the file in public/ and set this to "/resume.pdf" to show the badge.
  resumeUrl: "",
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
  ],
};

export const hero = {
  titleTop: "SOFTWARE",
  titleBottom: "ENGINEER",
  description:
    "Passionate about building fast, reliable products. I specialize in turning ambitious ideas into clean, scalable software.",
  stats: [
    { value: "8+", label: "Years of\nExperience" },
    { value: "40+", label: "Projects\nCompleted" },
    { value: "25+", label: "Worldwide\nClients" },
  ],
};

export const categories: {
  title: string;
  color: "orange" | "lime";
  icon: "layers" | "grid";
}[] = [
  {
    title: "Full-Stack Development, System Design",
    color: "orange",
    icon: "layers",
  },
  {
    title: "React, Next.js, Node.js, TypeScript",
    color: "lime",
    icon: "grid",
  },
];

// `href` is optional — a project without one renders as plain text instead of
// a link that goes nowhere.
export const projects: {
  name: string;
  type: string;
  gradient: string;
  year: string;
  role: string;
  description: string;
  stack: string[];
  href?: string;
}[] = [
  {
    name: "Pulse",
    type: "SaaS Analytics Dashboard",
    gradient: "from-violet-600 to-fuchsia-500",
    year: "2025",
    role: "Lead Engineer",
    description:
      "Real-time analytics for product teams. Streams several million events a day into dashboards that stay responsive under load.",
    stack: ["Next.js", "TypeScript", "ClickHouse", "Redis"],
  },
  {
    name: "Horizon",
    type: "E-Commerce Platform",
    gradient: "from-slate-200 to-slate-400",
    year: "2024",
    role: "Full-Stack Engineer",
    description:
      "Headless storefront and checkout for a multi-region retailer, rebuilt around a catalogue service and edge-cached product pages.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    name: "Nimbus",
    type: "Cloud Infrastructure Tool",
    gradient: "from-orange-500 to-amber-400",
    year: "2023",
    role: "Backend Engineer",
    description:
      "A CLI and web console that turns infrastructure definitions into reviewable pull requests instead of console clicks.",
    stack: ["Go", "Terraform", "AWS", "React"],
  },
  {
    name: "Fieldbook",
    type: "Mobile App for Sales Teams",
    gradient: "from-emerald-500 to-teal-400",
    year: "2022",
    role: "Mobile Engineer",
    description:
      "Offline-first field sales app with conflict-free sync, so reps can capture orders with no signal and reconcile later.",
    stack: ["React Native", "SQLite", "GraphQL", "Expo"],
  },
];

export const experience = [
  {
    company: "Nova Systems",
    title: "Senior Software Engineer",
    description:
      "Led backend architecture for a suite of internal tools, improving system reliability and cutting deployment time in half.",
    period: "Jan 2023 - Present",
    highlights: [
      "Cut median deploy time from 40 minutes to under 6",
      "Designed the event pipeline behind three internal products",
      "Mentored four engineers through their first year",
    ],
    stack: ["TypeScript", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    company: "BlueWave Innovators",
    title: "Full-Stack Engineer",
    description:
      "Developed and shipped customer-facing web applications, collaborating closely with design and product to raise engagement.",
    period: "Jun 2020 - Dec 2022",
    highlights: [
      "Rebuilt the onboarding flow, lifting activation by 18%",
      "Introduced the design system now used across four apps",
      "Owned the migration from CRA to Next.js",
    ],
    stack: ["React", "Next.js", "GraphQL", "Docker"],
  },
  {
    company: "PixelForge Studios",
    title: "Software Engineer",
    description:
      "Built and maintained REST and GraphQL APIs powering mobile and web clients for a fast-growing startup.",
    period: "Aug 2018 - May 2020",
    highlights: [
      "Shipped the public API used by every client app",
      "Added the test and CI setup the team still runs on",
      "Reduced p95 response time by 60% through query work",
    ],
    stack: ["Node.js", "Express", "MongoDB", "Jest"],
  },
];

export const about = {
  titleTop: "ABOUT",
  titleBottom: "ME",
  paragraphs: [
    "I'm a software engineer with eight years spent mostly on the unglamorous half of product work: the data models, the deploy pipeline, the request that got slow and nobody knows why. I like that half.",
    "Most of my work sits between frontend and infrastructure — shipping interfaces people use daily, then making sure the systems behind them stay boring under load. I care about code that the next person can read, and about shipping something small this week over something perfect next quarter.",
    "Outside work I write about system design, contribute to a couple of open-source tools, and spend more time than I should tuning my editor config.",
  ],
  facts: [
    { label: "Based in", value: "Accra, Ghana" },
    { label: "Availability", value: "Open to work" },
    { label: "Focus", value: "Product & platform" },
    { label: "Languages", value: "English, Twi" },
  ],
};

export const services = [
  {
    title: "Product Engineering",
    description:
      "End-to-end feature work — from the first sketch to the thing running in production with tests and monitoring around it.",
  },
  {
    title: "APIs & Backend Systems",
    description:
      "REST and GraphQL services, data modelling, and the migrations that get you from the schema you have to the one you need.",
  },
  {
    title: "Performance & Reliability",
    description:
      "Finding out why it's slow, why it fell over, and fixing the cause rather than adding another cache in front of it.",
  },
  {
    title: "Technical Consulting",
    description:
      "Architecture reviews, build-vs-buy calls, and second opinions for teams about to commit to something expensive.",
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Native",
      "Accessibility",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "NestJS", "Go", "GraphQL", "PostgreSQL", "Redis"],
  },
  {
    title: "Infrastructure",
    items: ["Docker", "AWS", "Terraform", "GitHub Actions", "Vercel", "Grafana"],
  },
  {
    title: "Ways of working",
    items: [
      "System design",
      "Testing",
      "Code review",
      "Technical writing",
      "Mentoring",
      "Incident response",
    ],
  },
];

export const education = [
  {
    school: "Kwame Nkrumah University of Science and Technology",
    credential: "BSc, Computer Science",
    period: "2014 - 2018",
  },
];

export const certifications = [
  { name: "AWS Certified Solutions Architect – Associate", year: "2023" },
  { name: "Certified Kubernetes Application Developer", year: "2022" },
];

export const testimonials = [
  {
    quote:
      "Richard has a rare talent for making complicated systems feel simple. He rewrote a service we'd been afraid to touch for two years, and it has not paged us since.",
    name: "Ama Boateng",
    role: "Engineering Manager, Nova Systems",
  },
  {
    quote:
      "He asks the question everyone else is avoiding, usually in the first ten minutes of the meeting. It saved us a quarter of wasted work more than once.",
    name: "Daniel Osei",
    role: "Product Lead, BlueWave Innovators",
  },
];
