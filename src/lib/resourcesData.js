// Static enrichment data for Resources page.
// Case study topics/descriptions supplement Sanity post data (title/image/date).
// Explainer videos are Vimeo only — not stored in CMS.

export const CASE_STUDY_ENRICHMENT = {
  "modernizing-integrations-boomi-to-workato-migration-at-scale": {
    topics: ["Enterprise Integration"],
    duration: "3 Min Read",
    description: "Migrating 350+ integrations from Boomi to Workato to overcome sluggish performance, large-file limitations, and constrained scalability — boosting responsiveness and simplifying maintenance.",
  },
  "logistics-ai-rpa-automation-for-isf-10-customs-filing": {
    topics: ["AI", "RPA"],
    duration: "3 Min Read",
    description: "An international logistics company faced a 10% error rate and $5,000 fines per violation processing ISF-10 forms by hand. AI plus RPA replaced the manual workflow.",
  },
  "ai-powered-transcript-analytics-optimization": {
    topics: ["AI"],
    duration: "3 Min Read",
    description: "A medical-industry program used AI to automate transcript analytics — cutting costs, improving accuracy, and freeing teams from repetitive review.",
  },
  "ai-driven-credentialing-automation-for-government": {
    topics: ["AI", "RPA"],
    duration: "3 Min Read",
    description: "A U.S. government agency processed 50,000+ credentialing applications a month across IDs, photos, affidavits, and mixed documents. AI and RPA delivered a secure, accurate pipeline.",
  },
  "streamlining-global-shipping-company-compliance-ai": {
    topics: ["Enterprise Integration", "Intelligent Automation", "RPA"],
    duration: "3 Min Read",
    description: "AI, intelligent automation, and RPA reduced cost and risk in compliance filings for a global shipping operation while keeping goods moving smoothly.",
  },
  "machine-learning-and-rpa-logistics-solution": {
    topics: ["Intelligent Automation", "RPA"],
    duration: "3 Min Read",
    description: "ML-driven decisioning paired with RPA cut staffing time on compliance work by 95% while protecting margins for a logistics provider.",
  },
  "implementing-uipath-robot-healthcare-system": {
    topics: ["Intelligent Automation", "RPA"],
    duration: "3 Min Read",
    description: "A UiPath bot took over repetitive vendor reconciliation work — pushing accuracy to 100% and giving the healthcare system a reliable, cost-efficient process.",
  },
  "state-local-government-process-solution": {
    topics: ["Intelligent Automation", "RPA", "AI"],
    duration: "3 Min Read",
    description: "Modernizing manual process authorizations with intelligent automation, RPA, and AI unlocked six-figure annual savings across state and local government service contracts.",
  },
  "rpa-to-automate-hr-offboarding-process": {
    topics: ["Intelligent Automation", "RPA"],
    duration: "3 Min Read",
    description: "RPA orchestrated the full HR offboarding sequence — cutting manual effort, reducing risk, and giving HR teams predictable, auditable execution.",
  },
  "rpa-to-help-food-and-beverage-company": {
    topics: ["Intelligent Automation", "RPA"],
    duration: "3 Min Read",
    description: "UiPath plus RPA absorbed surging back-office volume, drove significant productivity gains, and let teams focus on growth instead of manual workflow toil.",
  },
  "leveraging-boomi-to-streamline-manufacturing-processes": {
    topics: ["Enterprise Integration"],
    duration: "3 Min Read",
    description: "Boomi-based integration unified a manufacturer's systems, improved operational efficiency, and made consistent delivery to customers repeatable.",
  },
  "successfully-implementing-complex-revenue-management-integration": {
    topics: ["Enterprise Integration"],
    duration: "3 Min Read",
    description: "A complex integration program brought large revenue data volumes under control, giving an energy company reliable, real-time visibility into revenue performance.",
  },
};

export const TOPICS = ["AI", "RPA", "Intelligent Automation", "Enterprise Integration"];

export const SOLUTION_AREAS = [
  "Working Capital & Spend Integrity",
  "Workflow Automation",
  "Decision-Ready Data",
  "Employee Knowledge & Productivity",
  "Customer Support Optimization",
  "AI Solution Delivery",
  "AI Risk, Cost & Governance",
];

export const EXCLUSIVE_REPORTS = [
  {
    title: "Bridging the Operational Gap with Intelligent Integration",
    description: "New research from MIT Technology Review Insights on why some organizations operationalize AI successfully — and what others can learn.",
    slug: "bridging-operational-gap",
    partner: "Celigo × NITCO",
    badge: "MIT Technology Review Insights",
  },
];

const vimeoThumb = (id) => `https://vumbnail.com/${id}.jpg`;

export const EXPLAINER_VIDEOS = [
  {
    title: "Intelligent Conversational AI for Cruise Ship Operations",
    description: "An AI-powered virtual assistant built on GPT-4o for managers at sea — operational support without the satellite friction.",
    image: vimeoThumb("1125558922"),
    href: "https://vimeo.com/1125558922",
    slug: "1125558922",
    type: "Explainer Video",
  },
  {
    title: "AI Powered Assistant for Real-Time Resident Engagement",
    description: "An AI-powered virtual assistant integrated with WhatsApp to handle resident operational tasks in real time.",
    image: vimeoThumb("1130305667"),
    href: "https://vimeo.com/1130305667",
    slug: "1130305667",
    type: "Explainer Video",
  },
  {
    title: "Revolutionize Document Processing with Azure",
    description: "How NITCO helped a government agency automate credentialing using Azure Document Intelligence.",
    image: vimeoThumb("1113243270"),
    href: "https://vimeo.com/1113243270",
    slug: "1113243270",
    type: "Explainer Video",
  },
  {
    title: "Streamline Supply Chain with EDI Solutions",
    description: "Modern EDI technology empowers organizations to seamlessly exchange documents across the supply chain.",
    image: vimeoThumb("1109943140"),
    href: "https://vimeo.com/1109943140",
    slug: "1109943140",
    type: "Explainer Video",
  },
  {
    title: "AI Customs Automation",
    description: "How NITCO put an AI chatbot to work for a logistics company — speed, accuracy, and consistency on customs filings.",
    image: vimeoThumb("678400634"),
    href: "https://vimeo.com/678400634",
    slug: "678400634",
    type: "Explainer Video",
  },
  {
    title: "Understanding Conversational Artificial Intelligence",
    description: "A grounded explainer of how conversational AI lets machines have meaningful conversations with people.",
    image: vimeoThumb("679220108"),
    href: "https://vimeo.com/679220108",
    slug: "679220108",
    type: "Explainer Video",
  },
  {
    title: "Automating Medicaid Claim Processing with RPA",
    description: "How NITCO created an automated solution to reduce operating cost and entry errors in Medicaid claim processing.",
    image: vimeoThumb("754893922"),
    href: "https://vimeo.com/754893922",
    slug: "754893922",
    type: "Explainer Video",
  },
  {
    title: "New Vehicle Title and Registration Application",
    description: "Digital automation for vehicle registration and title applications inside a county agency.",
    image: vimeoThumb("786735399"),
    href: "https://vimeo.com/786735399",
    slug: "786735399",
    type: "Explainer Video",
  },
];
