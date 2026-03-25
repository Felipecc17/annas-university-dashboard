import React, { useEffect, useMemo, useState } from "react";

const FIELD_ORDER = [
  ["✅ ACCEPTANCE RATE (All)", "acceptanceRateAll"],
  ["📝 Data taken from Class of", "dataClassOf"],
  ["🔭 SAT/ACT Policy", "satActPolicy"],
  ["📊 SAT Range", "satRange"],
  ["🔭 Obs 1", "admissionsObs1"],
  ["🔭 Obs 2", "admissionsObs2"],
  ["🗽 English Proficiency score", "englishProficiencyScore"],
  ["🗽 English Obs", "englishObs"],
  ["🗽 Duolingo accepted?", "duolingoAccepted"],
  ["📆 Regular Application Deadline", "regularDeadline"],
  ["📆 Early Application Deadline", "earlyDeadline"],
  ["📆 EA / ED / ED II", "eaEdEd2"],
  ["💭 App Obs 1", "appObs1"],
  ["💭 App Obs 2", "appObs2"],
  ["🌐 Link", "nicheLink"],
  ["👩‍🎓 Total Undergraduate Students", "totalUndergraduateStudents"],
  ["📍 City", "city"],
  ["👨‍🏫 Student-to-faculty ratio", "studentFacultyRatio"],
  ["🌍 International Students", "internationalStudents"],
  ["💸 International Tuition & Fees", "internationalTuitionFees"],
  ["💸 Total Cost of Attendance", "totalCostOfAttendance"],
  ["🏧 Need-based Aid for International Students", "needBasedAidInternational"],
  ["💰 Merit Scholarship for International Students", "meritScholarshipInternational"],
  ["🏦 Personal Comments", "personalComments"],
  ["💵 Is there a Fee Waiver to apply?", "feeWaiver"],
  ["💙 Academics Likes & Dislikes", "academicsLikesDislikes"],
  ["🎓 Popular Majors", "majors"],
  ["🎒 Academic Programming", "academicProgramming"]
];

const SUBJECTIVE_SECTIONS = [
  ["community", "Community"],
  ["internationalCommunity", "International community"],
  ["location", "Location"],
  ["flexibility", "Flexibility to change major and study area"],
  ["professorInteraction", "Interaction with professors"],
  ["englishEnvironment", "Studying in English (USA or Europe)"],
  ["accompaniment", "Academic and professional accompaniment"],
  ["cost", "Cost"]
];

const DEFAULT_RECORD = {
  universityName: "—",
  universityOverview: "Missing",
  nicheLink: "",
  admissionsLink: "",
  officialWebsite: "",
  officialAdmissionsWebsite: "",
  commonDataSetLink: "",
  sourceLinks: [],
  acceptanceRateAll: "Missing",
  dataClassOf: "Missing",
  satActPolicy: "Missing",
  satRange: "Missing",
  admissionsObs1: "Missing",
  admissionsObs2: "Missing",
  englishProficiencyScore: "Missing",
  englishObs: "Missing",
  duolingoAccepted: "Missing",
  regularDeadline: "Missing",
  earlyDeadline: "Missing",
  eaEdEd2: "Missing",
  appObs1: "Missing",
  appObs2: "Missing",
  totalUndergraduateStudents: "Missing",
  city: "Missing",
  studentFacultyRatio: "Missing",
  internationalStudents: "Missing",
  internationalTuitionFees: "Missing",
  totalCostOfAttendance: "Missing",
  needBasedAidInternational: "Missing",
  meritScholarshipInternational: "Missing",
  personalComments: "Missing",
  feeWaiver: "Missing",
  academicsLikesDislikes: "Missing",
  majors: [],
  academicProgramming: [],
  highlights: [],
  sourceMap: {},
  fieldEvidence: {},
  subjectiveAnalysis: {},
  backendSourcesUsed: [],
  lastUpdated: ""
};

const BASE_SCHOOL_PROFILES = [
  {
    universityName: "Amherst College",
    city: "Amherst, Massachusetts",
    type: "liberal arts college",
    environment: "small-town",
    aidModel: "full-need-met",
    summary: "Prestigious liberal arts college known for rigorous academics and an open curriculum that lets students shape their own academic path.",
    academicProgramming: ["Open curriculum"],
    majors: ["Economics", "Political Science", "Mathematics"],
    highlights: ["Open curriculum", "Full-need-met reputation", "Close-knit academic environment"]
  },
  {
    universityName: "Babson College",
    city: "Wellesley, Massachusetts",
    type: "business-focused college",
    environment: "suburban",
    aidModel: "merit-heavy",
    summary: "Top-ranked for entrepreneurship, with experiential learning and a strong business-focused curriculum.",
    academicProgramming: ["Entrepreneurship labs", "Experiential learning"],
    majors: ["Entrepreneurship", "Finance", "Business Analytics"],
    highlights: ["Entrepreneurship focus", "Experiential learning", "Global business network"]
  },
  {
    universityName: "Barnard College",
    city: "New York City, New York",
    type: "women's liberal arts college",
    environment: "urban",
    aidModel: "mixed",
    summary: "Elite women’s college affiliated with Columbia University, combining a small liberal arts setting with access to major university resources.",
    academicProgramming: ["Columbia cross-registration"],
    majors: ["Economics", "Psychology", "English"],
    highlights: ["Women’s leadership", "NYC access", "Columbia resources"]
  },
  {
    universityName: "Bates College",
    city: "Lewiston, Maine",
    type: "liberal arts college",
    environment: "small-town",
    aidModel: "full-need-met",
    summary: "Highly regarded liberal arts college with a progressive approach to education, experiential learning, and civic engagement.",
    academicProgramming: ["Experiential learning"],
    majors: ["Biology", "Economics", "Politics"],
    highlights: ["Test-optional reputation", "Community orientation", "Need-based aid"]
  },
  {
    universityName: "Bennington College",
    city: "Bennington, Vermont",
    type: "liberal arts college",
    environment: "small-town",
    aidModel: "mixed",
    summary: "Known for its unconventional, student-directed model and yearly fieldwork experiences with strong arts and humanities strength.",
    academicProgramming: ["Field work term", "Student-designed plans"],
    majors: ["Visual Arts", "Literature", "Social Sciences"],
    highlights: ["Student-directed learning", "Field work", "Creative culture"]
  },
  {
    universityName: "Bowdoin College",
    city: "Brunswick, Maine",
    type: "liberal arts college",
    environment: "small-town",
    aidModel: "full-need-met",
    summary: "Top-tier liberal arts college known for strong academics, a coastal campus, leadership development, and social responsibility.",
    academicProgramming: ["Interdisciplinary programs"],
    majors: ["Government", "Economics", "Neuroscience"],
    highlights: ["Small classes", "Strong financial aid", "Tight-knit community"]
  },
  {
    universityName: "Brandeis University",
    city: "Waltham, Massachusetts",
    type: "research university",
    environment: "suburban",
    aidModel: "mixed",
    summary: "Research-intensive university with a liberal arts foundation, strong interdisciplinary programs, and a tradition of social justice.",
    academicProgramming: ["Interdisciplinary programs", "Research"],
    majors: ["Biology", "Economics", "International and Global Studies"],
    highlights: ["Research intensity", "Social justice tradition", "Global student body"]
  },
  {
    universityName: "Brown University",
    city: "Providence, Rhode Island",
    type: "research university",
    environment: "urban",
    aidModel: "full-need-met",
    summary: "Ivy League university famous for its open curriculum, student-directed academics, and strong culture of creativity and research.",
    academicProgramming: ["Open curriculum", "Undergraduate research"],
    majors: ["Computer Science", "Economics", "Applied Mathematics"],
    highlights: ["Open curriculum", "Research culture", "Full-need-met aid"]
  },
  {
    universityName: "Bryn Mawr College",
    city: "Bryn Mawr, Pennsylvania",
    type: "women's liberal arts college",
    environment: "suburban",
    aidModel: "full-need-met",
    summary: "Leading women’s college with rigorous academics and access to the Tri-College Consortium for broader course options.",
    academicProgramming: ["Tri-College Consortium"],
    majors: ["Biology", "Political Science", "Mathematics"],
    highlights: ["Women’s college", "Consortium access", "STEM and humanities strength"]
  },
  {
    universityName: "Carleton College",
    city: "Northfield, Minnesota",
    type: "liberal arts college",
    environment: "small-town",
    aidModel: "need-based",
    summary: "Top liberal arts college recognized for intellectual rigor, innovative teaching, and close faculty-student relationships.",
    academicProgramming: ["Trimester system", "Research"],
    majors: ["Computer Science", "Physics", "Economics"],
    highlights: ["Close faculty ties", "Science strength", "Focused trimester system"]
  },
  {
    universityName: "Claremont McKenna College",
    city: "Claremont, California",
    type: "liberal arts college",
    environment: "suburban",
    aidModel: "full-need-met",
    summary: "Prestigious liberal arts college known for economics, government, public affairs, and access to the Claremont Colleges consortium.",
    academicProgramming: ["Claremont Colleges consortium"],
    majors: ["Economics", "Government", "International Relations"],
    highlights: ["Public affairs strength", "Consortium resources", "Faculty mentorship"]
  },
  {
    universityName: "Clark University",
    city: "Worcester, Massachusetts",
    type: "research university",
    environment: "urban",
    aidModel: "merit-heavy",
    summary: "Research-oriented university that emphasizes experiential learning and is especially strong in psychology, geography, and environmental studies.",
    academicProgramming: ["Experiential learning"],
    majors: ["Psychology", "Geography", "Environmental Science"],
    highlights: ["Research focus", "Practical learning", "Merit scholarships"]
  },
  {
    universityName: "Colby College",
    city: "Waterville, Maine",
    type: "liberal arts college",
    environment: "small-town",
    aidModel: "full-need-met",
    summary: "Top liberal arts college with rigorous academics, strong environmental studies, and the Colby Commitment to meeting demonstrated need.",
    academicProgramming: ["Environmental studies", "Research", "Internships"],
    majors: ["Economics", "Environmental Studies", "Government"],
    highlights: ["Colby Commitment", "Research opportunities", "Outdoor campus culture"]
  },
  {
    universityName: "Colgate University",
    city: "Hamilton, New York",
    type: "liberal arts university",
    environment: "small-town",
    aidModel: "full-need-met",
    summary: "Prestigious university with strong undergraduate research, global engagement, and interdisciplinary academics.",
    academicProgramming: ["Undergraduate research", "Global study"],
    majors: ["Economics", "Political Science", "Biology"],
    highlights: ["Global engagement", "Interdisciplinary culture", "Alumni network"]
  },
  {
    universityName: "Columbia University",
    city: "New York City, New York",
    type: "research university",
    environment: "urban",
    aidModel: "full-need-met",
    summary: "Ivy League university in New York City known for its Core Curriculum and powerful access to research and internships.",
    academicProgramming: ["Core Curriculum", "Research"],
    majors: ["Economics", "Computer Science", "Political Science"],
    highlights: ["Core Curriculum", "NYC opportunities", "Full-need-met aid"]
  },
  {
    universityName: "Dartmouth College",
    city: "Hanover, New Hampshire",
    type: "research university",
    environment: "small-town",
    aidModel: "need-blind-full-need-met",
    summary: "Smallest Ivy League institution, combining strong academics with a tight-knit community and flexible quarter-based scheduling.",
    academicProgramming: ["Quarter system", "Flexible scheduling"],
    majors: ["Economics", "Government", "Engineering Sciences"],
    highlights: ["Tight-knit community", "Need-blind for internationals", "Flexible academic calendar"]
  },
  {
    universityName: "Davidson College",
    city: "Davidson, North Carolina",
    type: "liberal arts college",
    environment: "small-town",
    aidModel: "full-need-met",
    summary: "Highly ranked liberal arts college known for its Honor Code, rigorous academics, and commitment to leadership and service.",
    academicProgramming: ["Leadership and service"],
    majors: ["Economics", "Biology", "Political Science"],
    highlights: ["Honor Code", "Collaborative environment", "Need-based aid"]
  },
  {
    universityName: "Drexel University",
    city: "Philadelphia, Pennsylvania",
    type: "research university",
    environment: "urban",
    aidModel: "merit-heavy",
    summary: "Research-focused university best known for its co-op model, which integrates substantial work experience into the undergraduate degree.",
    academicProgramming: ["Co-op program", "Career integration"],
    majors: ["Engineering", "Business", "Health Sciences"],
    highlights: ["Co-op model", "Career orientation", "Urban location"]
  },
  {
    universityName: "Duke University",
    city: "Durham, North Carolina",
    type: "research university",
    environment: "suburban",
    aidModel: "full-need-met",
    summary: "Prestigious research university with top programs in business, engineering, sciences, and strong global engagement.",
    academicProgramming: ["Research", "Study abroad", "Interdisciplinary study"],
    majors: ["Economics", "Public Policy", "Biomedical Engineering"],
    highlights: ["Top-tier academics", "Research access", "Need-based aid"]
  },
  {
    universityName: "Emory University",
    city: "Atlanta, Georgia",
    type: "research university",
    environment: "urban",
    aidModel: "full-need-met-and-merit",
    summary: "Leading research university known for business, public health, and humanities, with strong research access and competitive merit awards.",
    academicProgramming: ["Research", "Merit scholarships"],
    majors: ["Business", "Public Health", "Neuroscience"],
    highlights: ["CDC proximity", "Research culture", "Merit scholarships"]
  },
  {
    universityName: "Fordham University",
    city: "New York City, New York",
    type: "research university",
    environment: "urban",
    aidModel: "merit-heavy",
    summary: "Jesuit university with strong liberal arts, business, and law-oriented pathways and major-city internship access.",
    academicProgramming: ["Jesuit liberal arts", "Internship pipelines"],
    majors: ["Finance", "Political Science", "Communications"],
    highlights: ["NYC campuses", "Internship access", "Merit scholarships"]
  },
  {
    universityName: "Grinnell College",
    city: "Grinnell, Iowa",
    type: "liberal arts college",
    environment: "small-town",
    aidModel: "full-need-met",
    summary: "Top liberal arts college with an open curriculum, strong social justice culture, and generous international aid.",
    academicProgramming: ["Open curriculum", "Research"],
    majors: ["Economics", "Computer Science", "Political Science"],
    highlights: ["Open curriculum", "Social justice", "Full-need-met aid"]
  },
  {
    universityName: "Harvard University",
    city: "Cambridge, Massachusetts",
    type: "research university",
    environment: "urban",
    aidModel: "need-blind-full-need-met",
    summary: "One of the world’s most prestigious universities, with exceptional resources, global networks, and broad academic excellence.",
    academicProgramming: ["Research", "Cross-registration", "Secondary fields"],
    majors: ["Economics", "Computer Science", "Government", "Applied Mathematics"],
    highlights: ["Global prestige", "Need-blind internationals", "Extraordinary resources"]
  },
  {
    universityName: "Haverford College",
    city: "Haverford, Pennsylvania",
    type: "liberal arts college",
    environment: "suburban",
    aidModel: "full-need-met",
    summary: "Highly ranked liberal arts college known for rigorous academics, a strong honor code, and Tri-College Consortium access.",
    academicProgramming: ["Tri-College Consortium"],
    majors: ["Economics", "Biology", "Political Science"],
    highlights: ["Honor code", "Consortium access", "Need-based aid"]
  },
  {
    universityName: "Johns Hopkins University",
    city: "Baltimore, Maryland",
    type: "research university",
    environment: "urban",
    aidModel: "full-need-met",
    summary: "World-renowned research university particularly strong in medicine, public health, and international relations.",
    academicProgramming: ["Research", "Public health pathways"],
    majors: ["Public Health", "Biomedical Engineering", "International Studies"],
    highlights: ["Research leadership", "Medical and public health strength", "Need-based aid"]
  },
  {
    universityName: "Lehigh University",
    city: "Bethlehem, Pennsylvania",
    type: "research university",
    environment: "small-town",
    aidModel: "mixed",
    summary: "Highly regarded research university with strong programs in business, engineering, and sciences, plus an entrepreneurial spirit.",
    academicProgramming: ["Interdisciplinary study", "Entrepreneurship"],
    majors: ["Engineering", "Finance", "Computer Science"],
    highlights: ["Business and engineering strength", "Merit and need-based aid", "Entrepreneurial culture"]
  },
  {
    universityName: "Macalester College",
    city: "St. Paul, Minnesota",
    type: "liberal arts college",
    environment: "urban",
    aidModel: "full-need-met",
    summary: "Top liberal arts college with a global perspective, strong social justice culture, and a highly international student body.",
    academicProgramming: ["Global engagement", "Interdisciplinary study"],
    majors: ["International Studies", "Economics", "Political Science"],
    highlights: ["Global perspective", "International student body", "Full-need-met aid"]
  },
  {
    universityName: "Middlebury College",
    city: "Middlebury, Vermont",
    type: "liberal arts college",
    environment: "small-town",
    aidModel: "full-need-met",
    summary: "Renowned for liberal arts, language programs, and environmental studies, with a rigorous academic environment and strong outdoor culture.",
    academicProgramming: ["Language programs", "Environmental studies"],
    majors: ["International Politics", "Economics", "Environmental Studies"],
    highlights: ["Language strength", "Environmental studies", "Need-based aid"]
  },
  {
    universityName: "Northwestern University",
    city: "Evanston, Illinois",
    type: "research university",
    environment: "urban",
    aidModel: "full-need-met",
    summary: "Leading research university with strengths in journalism, engineering, business, and performing arts, plus access to Chicago.",
    academicProgramming: ["Research", "Interdisciplinary study"],
    majors: ["Journalism", "Economics", "Engineering"],
    highlights: ["Chicago access", "Strong professional programs", "Need-based aid"]
  },
  {
    universityName: "Oberlin College",
    city: "Oberlin, Ohio",
    type: "liberal arts college",
    environment: "small-town",
    aidModel: "full-need-met",
    summary: "Progressive liberal arts college known for social activism, strong academics, and a prestigious conservatory of music.",
    academicProgramming: ["Conservatory", "Interdisciplinary study"],
    majors: ["Politics", "Environmental Studies", "Music"],
    highlights: ["Activist culture", "Conservatory strength", "Need-based aid"]
  },
  {
    universityName: "Pitzer College",
    city: "Claremont, California",
    type: "liberal arts college",
    environment: "suburban",
    aidModel: "full-need-met",
    summary: "Part of the Claremont Colleges, with a strong emphasis on social justice, sustainability, and interdisciplinary learning.",
    academicProgramming: ["Claremont Colleges consortium", "Interdisciplinary study"],
    majors: ["Environmental Analysis", "Political Studies", "Economics"],
    highlights: ["Social justice", "Consortium flexibility", "Sustainability focus"]
  },
  {
    universityName: "Pomona College",
    city: "Claremont, California",
    type: "liberal arts college",
    environment: "suburban",
    aidModel: "full-need-met",
    summary: "One of the most prestigious liberal arts colleges in the U.S., with rigorous academics and access to the Claremont consortium.",
    academicProgramming: ["Claremont Colleges consortium", "Undergraduate research"],
    majors: ["Computer Science", "Economics", "Public Policy Analysis"],
    highlights: ["Research opportunities", "Small classes", "Full-need-met aid"]
  },
  {
    universityName: "Princeton University",
    city: "Princeton, New Jersey",
    type: "research university",
    environment: "small-town",
    aidModel: "need-blind-full-need-met",
    summary: "Ivy League university celebrated for research strength, undergraduate focus, and exceptionally generous financial aid.",
    academicProgramming: ["Undergraduate research", "Junior papers", "Senior thesis"],
    majors: ["Economics", "Public Policy", "Computer Science"],
    highlights: ["Need-blind internationals", "No-loan aid reputation", "Undergraduate focus"]
  },
  {
    universityName: "Rice University",
    city: "Houston, Texas",
    type: "research university",
    environment: "urban",
    aidModel: "full-need-met",
    summary: "Top research university with strong programs in science, engineering, business, and humanities, plus a personalized academic experience.",
    academicProgramming: ["Research", "Residential college system"],
    majors: ["Computer Science", "Economics", "Bioengineering"],
    highlights: ["6:1 ratio reputation", "Research access", "Need-based aid"]
  },
  {
    universityName: "Rollins College",
    city: "Winter Park, Florida",
    type: "liberal arts college",
    environment: "suburban",
    aidModel: "mixed",
    summary: "Private liberal arts college emphasizing leadership, global citizenship, and experiential learning in a supportive setting.",
    academicProgramming: ["Leadership", "Experiential learning"],
    majors: ["International Business", "Communication Studies", "Psychology"],
    highlights: ["Supportive environment", "Merit and need-based aid", "Leadership focus"]
  },
  {
    universityName: "Skidmore College",
    city: "Saratoga Springs, New York",
    type: "liberal arts college",
    environment: "small-town",
    aidModel: "full-need-met",
    summary: "Liberal arts college known for creative thought, strong arts, sciences, and social sciences, and a welcoming academic community.",
    academicProgramming: ["Creative thought emphasis"],
    majors: ["Economics", "Business", "Psychology"],
    highlights: ["Creative culture", "Strong need-based aid", "Balanced liberal arts profile"]
  },
  {
    universityName: "Stanford University",
    city: "Stanford, California",
    type: "research university",
    environment: "suburban",
    aidModel: "need-blind-full-need-met",
    summary: "World-renowned university in Silicon Valley, defined by innovation, entrepreneurship, and research excellence.",
    academicProgramming: ["Research", "Entrepreneurship", "Interdisciplinary study"],
    majors: ["Computer Science", "Economics", "Engineering"],
    highlights: ["Silicon Valley access", "Innovation culture", "Need-blind internationals"]
  },
  {
    universityName: "Stetson University",
    city: "DeLand, Florida",
    type: "private university",
    environment: "small-town",
    aidModel: "merit-heavy",
    summary: "Private university known for business, law, and liberal arts, with scholarships and an emphasis on social responsibility.",
    academicProgramming: ["Leadership", "Sustainability"],
    majors: ["Business", "Political Science", "Environmental Science"],
    highlights: ["Merit scholarships", "Supportive environment", "Social responsibility"]
  },
  {
    universityName: "Swarthmore College",
    city: "Swarthmore, Pennsylvania",
    type: "liberal arts college",
    environment: "suburban",
    aidModel: "full-need-met",
    summary: "Highly selective liberal arts college with strong academic rigor, social activism, and Tri-College Consortium access.",
    academicProgramming: ["Tri-College Consortium", "Research"],
    majors: ["Engineering", "Economics", "Political Science"],
    highlights: ["Academic rigor", "Social activism", "Consortium flexibility"]
  },
  {
    universityName: "Tufts University",
    city: "Medford, Massachusetts",
    type: "research university",
    environment: "urban",
    aidModel: "full-need-met",
    summary: "University near Boston known for international relations, biomedical sciences, engineering, and globally engaged students.",
    academicProgramming: ["Research", "Global engagement"],
    majors: ["International Relations", "Biomedical Engineering", "Economics"],
    highlights: ["Global orientation", "Boston access", "Need-based aid"]
  },
  {
    universityName: "University of Chicago",
    city: "Chicago, Illinois",
    type: "research university",
    environment: "urban",
    aidModel: "full-need-met",
    summary: "Top-tier research university famous for rigorous academics, critical thinking, and strength in economics, political science, and philosophy.",
    academicProgramming: ["Core Curriculum", "Research"],
    majors: ["Economics", "Political Science", "Philosophy"],
    highlights: ["Intellectual rigor", "Chicago access", "Need-based aid"]
  },
  {
    universityName: "University of Kentucky",
    city: "Lexington, Kentucky",
    type: "public research university",
    environment: "small-town",
    aidModel: "merit-heavy",
    summary: "Public research university with strong business, engineering, and health sciences programs and competitive international merit awards.",
    academicProgramming: ["Research", "Athletics culture"],
    majors: ["Engineering", "Business", "Health Sciences"],
    highlights: ["Public university scale", "Full-ride merit possibilities", "Growing international community"]
  },
  {
    universityName: "University of Miami",
    city: "Coral Gables, Florida",
    type: "research university",
    environment: "urban",
    aidModel: "merit-heavy",
    summary: "University known for marine science, business, and law, with strong links to Latin America and significant merit scholarships.",
    academicProgramming: ["Research", "Merit scholarships"],
    majors: ["Marine Science", "Business", "Political Science"],
    highlights: ["Latin America ties", "Research community", "Merit support"]
  },
  {
    universityName: "University of Notre Dame",
    city: "Notre Dame, Indiana",
    type: "research university",
    environment: "small-town",
    aidModel: "full-need-met",
    summary: "Prestigious private university known for strong academics, Catholic tradition, and a highly engaged alumni network.",
    academicProgramming: ["Research", "Leadership and service"],
    majors: ["Finance", "Political Science", "Engineering"],
    highlights: ["Alumni network", "Strong undergraduate culture", "Need-based aid"]
  },
  {
    universityName: "University of Pennsylvania",
    city: "Philadelphia, Pennsylvania",
    type: "research university",
    environment: "urban",
    aidModel: "full-need-met",
    summary: "World-class university known for interdisciplinary academics, Wharton, research intensity, and strong financial aid.",
    academicProgramming: ["Dual degrees", "Research", "Interdisciplinary study"],
    majors: ["Economics", "Political Science", "Computer Science", "Business Analytics"],
    highlights: ["Wharton and elite professional schools", "Urban ecosystem", "Need-based aid"]
  },
  {
    universityName: "University of Wisconsin-Madison",
    city: "Madison, Wisconsin",
    type: "public research university",
    environment: "urban",
    aidModel: "merit-heavy",
    summary: "Leading public research university with strong engineering, business, and life sciences programs and a lively campus atmosphere.",
    academicProgramming: ["Research", "Innovation"],
    majors: ["Computer Sciences", "Biology", "Economics"],
    highlights: ["Research scale", "Public university ecosystem", "Merit support"]
  },
  {
    universityName: "Vanderbilt University",
    city: "Nashville, Tennessee",
    type: "research university",
    environment: "urban",
    aidModel: "full-need-met-and-merit",
    summary: "Prestigious private university known for strong academics, collaborative learning, and major merit awards like the Cornelius Vanderbilt Scholarship.",
    academicProgramming: ["Research", "Merit scholarships"],
    majors: ["Economics", "Human and Organizational Development", "Engineering"],
    highlights: ["Collaborative culture", "Major merit awards", "Need-based aid"]
  },
  {
    universityName: "Vassar College",
    city: "Poughkeepsie, New York",
    type: "liberal arts college",
    environment: "small-town",
    aidModel: "full-need-met",
    summary: "Highly selective liberal arts college known for rigorous academics, arts and humanities strength, and an inclusive intellectual community.",
    academicProgramming: ["Interdisciplinary study", "Arts focus"],
    majors: ["Economics", "Political Science", "Art History"],
    highlights: ["Arts and humanities strength", "Inclusive culture", "Need-based aid"]
  },
  {
    universityName: "Washington and Lee University",
    city: "Lexington, Virginia",
    type: "liberal arts university",
    environment: "small-town",
    aidModel: "merit-heavy",
    summary: "Prestigious small university combining liberal arts with strong business and law-oriented programs and the Johnson Scholarship.",
    academicProgramming: ["Johnson Scholarship", "Liberal arts and professional blend"],
    majors: ["Economics", "Business Administration", "Politics"],
    highlights: ["Full-ride Johnson Scholarship", "Small university setting", "Professional blend"]
  },
  {
    universityName: "Yale University",
    city: "New Haven, Connecticut",
    type: "research university",
    environment: "urban",
    aidModel: "need-blind-full-need-met",
    summary: "Ivy League university known for outstanding humanities, sciences, and arts, plus exceptionally strong financial aid for international students.",
    academicProgramming: ["Residential colleges", "Research"],
    majors: ["Economics", "Political Science", "Computer Science"],
    highlights: ["Need-blind internationals", "Humanities and arts strength", "Global prestige"]
  }
];

function safe(value) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? trimmed : "—";
  }
  if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
  return String(value);
}

function isHttpUrl(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value.trim());
}

function normalizeArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(/\n|,|•|\|/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function normalizeSourceLinks(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      label: safe(item?.label),
      url: safe(item?.url),
      type: safe(item?.type)
    }))
    .filter((item) => item.label !== "—" || item.url !== "—");
}

function normalizeFieldEvidence(value) {
  const source = value && typeof value === "object" ? value : {};
  return Object.fromEntries(Object.entries(source).map(([key, evidence]) => [key, normalizeArray(evidence)]));
}

function clampScore(value, fallback = 0) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(0, Math.min(100, Math.round(numeric)));
}

function normalizeIndicators(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      label: safe(item?.label),
      value: safe(item?.value),
      source: safe(item?.source)
    }))
    .filter((item) => item.label !== "—");
}

function normalizeSubjectiveAnalysis(value) {
  const source = value && typeof value === "object" ? value : {};
  const normalized = {};

  for (const [key, label] of SUBJECTIVE_SECTIONS) {
    const entry = source[key];
    if (typeof entry === "string") {
      normalized[key] = {
        title: label,
        score: 0,
        confidence: 0,
        text: entry.trim(),
        evidence: [],
        indicators: []
      };
      continue;
    }

    normalized[key] = {
      title: label,
      score: clampScore(entry?.score),
      confidence: clampScore(entry?.confidence),
      text: safe(entry?.text),
      evidence: normalizeArray(entry?.evidence),
      indicators: normalizeIndicators(entry?.indicators)
    };
  }

  return normalized;
}

function normalizeRecord(input) {
  const raw = input && typeof input === "object" ? input : {};
  const sourceMap = raw.sourceMap && typeof raw.sourceMap === "object" ? raw.sourceMap : {};

  return {
    ...DEFAULT_RECORD,
    ...raw,
    majors: normalizeArray(raw.majors),
    academicProgramming: normalizeArray(raw.academicProgramming),
    highlights: normalizeArray(raw.highlights),
    sourceLinks: normalizeSourceLinks(raw.sourceLinks),
    fieldEvidence: normalizeFieldEvidence(raw.fieldEvidence),
    subjectiveAnalysis: normalizeSubjectiveAnalysis(raw.subjectiveAnalysis),
    backendSourcesUsed: normalizeArray(raw.backendSourcesUsed),
    sourceMap
  };
}

function exportJson(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${safe(data.universityName).toLowerCase().replace(/\s+/g, "-")}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function exportCsv(data) {
  const rows = FIELD_ORDER.map(([label, key]) => [label, safe(data[key]), safe(data.sourceMap?.[key])]);
  const csv = [["Field", "Value", "Source"], ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${safe(data.universityName).toLowerCase().replace(/\s+/g, "-")}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function Icon({ symbol, className = "" }) {
  return (
    <span className={className} aria-hidden="true">
      {symbol}
    </span>
  );
}

function Badge({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200"
  };

  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

function sourceTone(source) {
  if (typeof source !== "string") return "slate";
  const normalized = source.toLowerCase();
  if (normalized.includes("official") || normalized.includes("cds")) return "green";
  if (normalized.includes("generated") || normalized.includes("demo api")) return "blue";
  if (normalized.includes("niche") || normalized.includes("ipeds") || normalized.includes("wikipedia")) return "amber";
  return "slate";
}

function LinkValue({ value }) {
  if (!isHttpUrl(value)) return <span>{safe(value)}</span>;
  return (
    <a href={value} target="_blank" rel="noreferrer" className="break-all text-blue-700 underline underline-offset-2">
      {value}
    </a>
  );
}

function MetricCard({ icon, label, value, source }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-lg font-semibold text-slate-900">{safe(value)}</div>
      {source ? (
        <div className="mt-2">
          <Badge tone={sourceTone(source)}>{source}</Badge>
        </div>
      ) : null}
    </div>
  );
}

function FieldRow({ label, value, source, evidence }) {
  return (
    <div className="grid gap-2 border-b border-slate-100 py-3 md:grid-cols-[280px_1fr_auto] md:items-start">
      <div className="text-sm font-medium text-slate-600">{label}</div>
      <div className="space-y-2 text-sm text-slate-900">
        <div>{isHttpUrl(value) ? <LinkValue value={value} /> : safe(value)}</div>
        {evidence?.length ? (
          <ul className="space-y-1 text-xs leading-5 text-slate-500">
            {evidence.map((item, index) => (
              <li key={`${label}-${index}`}>• {item}</li>
            ))}
          </ul>
        ) : null}
      </div>
      <div>{source ? <Badge tone={sourceTone(source)}>{source}</Badge> : null}</div>
    </div>
  );
}

function ScoreChip({ label, value, tone = "slate" }) {
  return <Badge tone={tone}>{`${label}: ${value}`}</Badge>;
}

function IndicatorTable({ indicators }) {
  if (!indicators.length) return null;

  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {indicators.map((item, index) => (
        <div key={`${item.label}-${index}`} className="grid gap-2 border-b border-slate-100 px-3 py-2 text-xs last:border-b-0 md:grid-cols-[1fr_auto_auto] md:items-center">
          <div className="font-medium text-slate-700">{item.label}</div>
          <div className="text-slate-900">{item.value}</div>
          <div className="text-slate-500">{item.source !== "—" ? item.source : "—"}</div>
        </div>
      ))}
    </div>
  );
}

function normalizeKey(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function buildNicheSearchUrl(universityName) {
  return `https://www.niche.com/search/?q=${encodeURIComponent(universityName)}`;
}

function buildGenericSourceLinks(profile) {
  return [
    { label: "Niche search", url: buildNicheSearchUrl(profile.universityName), type: "Niche" }
  ];
}

function environmentScore(environment) {
  if (environment === "urban") return 92;
  if (environment === "suburban") return 80;
  return 68;
}

function costScore(aidModel) {
  if (aidModel === "need-blind-full-need-met") return 86;
  if (aidModel === "full-need-met") return 80;
  if (aidModel === "full-need-met-and-merit") return 82;
  if (aidModel === "need-based") return 72;
  if (aidModel === "merit-heavy") return 61;
  return 67;
}

function communityScore(profile) {
  let score = profile.type.includes("liberal arts") ? 82 : 76;
  if (profile.type.includes("women")) score += 3;
  if (profile.summary.toLowerCase().includes("close-knit")) score += 3;
  if (profile.summary.toLowerCase().includes("intense") || profile.summary.toLowerCase().includes("rigorous")) score += 2;
  if (profile.summary.toLowerCase().includes("pre-professional") || profile.summary.toLowerCase().includes("business-focused")) score += 2;
  return Math.min(95, score);
}

function internationalCommunityScore(profile) {
  let score = profile.environment === "urban" ? 79 : 72;
  if (profile.summary.toLowerCase().includes("global") || profile.summary.toLowerCase().includes("international")) score += 6;
  if (profile.universityName.includes("Columbia") || profile.universityName.includes("Harvard") || profile.universityName.includes("Yale") || profile.universityName.includes("Stanford") || profile.universityName.includes("Princeton")) score += 4;
  return Math.min(94, score);
}

function flexibilityScore(profile) {
  let score = 74;
  const text = `${profile.summary} ${normalizeArray(profile.academicProgramming).join(" ")}`.toLowerCase();
  if (text.includes("open curriculum")) score = 90;
  if (text.includes("consortium")) score += 8;
  if (text.includes("interdisciplinary")) score += 8;
  if (text.includes("student-designed") || text.includes("student-directed")) score += 10;
  return Math.min(95, score);
}

function professorInteractionScore(profile) {
  let score = profile.type.includes("liberal arts") ? 87 : 77;
  if (profile.summary.toLowerCase().includes("close faculty-student")) score += 4;
  if (profile.summary.toLowerCase().includes("research")) score += 2;
  return Math.min(95, score);
}

function accompanimentScore(profile) {
  let score = 76;
  const text = `${profile.summary} ${normalizeArray(profile.highlights).join(" ")}`.toLowerCase();
  if (text.includes("alumni")) score += 7;
  if (text.includes("research")) score += 4;
  if (text.includes("internship") || text.includes("co-op") || text.includes("career")) score += 8;
  return Math.min(93, score);
}

function englishEnvironmentScore() {
  return 99;
}

function confidenceFromProfile(profile) {
  let confidence = 70;
  if (profile.type.includes("liberal arts") || profile.type.includes("research")) confidence += 4;
  if (normalizeArray(profile.highlights).length >= 3) confidence += 3;
  return Math.min(84, confidence);
}

function inferPolicyFromAidModel(profile) {
  if (profile.aidModel === "need-blind-full-need-met") return "Confirm current SAT/ACT policy and admissions round structure from the latest official cycle";
  return "Confirm whether testing is required, optional, or blind in the current cycle";
}

function genericSubjectiveAnalysis(profile) {
  const community = communityScore(profile);
  const internationalCommunity = internationalCommunityScore(profile);
  const location = environmentScore(profile.environment);
  const flexibility = flexibilityScore(profile);
  const professorInteraction = professorInteractionScore(profile);
  const englishEnvironment = englishEnvironmentScore();
  const accompaniment = accompanimentScore(profile);
  const cost = costScore(profile.aidModel);
  const confidence = confidenceFromProfile(profile);

  return {
    community: {
      score: community,
      confidence,
      text: `Community score is estimated at ${community}/100 based on school type, stated campus culture, and the level of academic intensity described in the source summary.`,
      indicators: [
        { label: "Campus cohesion", value: `${profile.type.includes("liberal arts") ? 88 : 76}/100`, source: "School type" },
        { label: "Academic intensity", value: `${profile.summary.toLowerCase().includes("rigorous") ? 86 : 75}/100`, source: "Summary keywords" },
        { label: "Peer culture", value: `${community}/100`, source: "Composite demo model" }
      ],
      evidence: [profile.summary]
    },
    internationalCommunity: {
      score: internationalCommunity,
      confidence,
      text: `International community score is estimated at ${internationalCommunity}/100 using location, global orientation, and institutional visibility signals described in the profile.`,
      indicators: [
        { label: "Global orientation", value: `${profile.summary.toLowerCase().includes("global") || profile.summary.toLowerCase().includes("international") ? 86 : 72}/100`, source: "Summary keywords" },
        { label: "Location support", value: `${profile.environment === "urban" ? 84 : 70}/100`, source: "Environment model" },
        { label: "Institutional reach", value: `${internationalCommunity}/100`, source: "Composite demo model" }
      ],
      evidence: [profile.summary]
    },
    location: {
      score: location,
      confidence: 86,
      text: `Location score is estimated at ${location}/100 based on whether the campus sits in an urban, suburban, or small-town environment and how that likely affects internships, transit, and cultural access.`,
      indicators: [
        { label: "Environment type", value: profile.environment, source: "Profile metadata" },
        { label: "Opportunity access", value: `${location}/100`, source: "Environment model" },
        { label: "Metro connectivity", value: `${profile.environment === "urban" ? 92 : profile.environment === "suburban" ? 77 : 61}/100`, source: "Composite demo model" }
      ],
      evidence: [profile.city]
    },
    flexibility: {
      score: flexibility,
      confidence,
      text: `Flexibility score is estimated at ${flexibility}/100 from signals such as open curriculum, consortium access, interdisciplinary pathways, or student-directed academic design.`,
      indicators: [
        { label: "Curricular openness", value: `${flexibility}/100`, source: "Program model" },
        { label: "Special structures", value: `${normalizeArray(profile.academicProgramming).length}+`, source: "Profile metadata" },
        { label: "Cross-disciplinary support", value: `${flexibility >= 82 ? 86 : 74}/100`, source: "Composite demo model" }
      ],
      evidence: normalizeArray(profile.academicProgramming)
    },
    professorInteraction: {
      score: professorInteraction,
      confidence,
      text: `Professor interaction score is estimated at ${professorInteraction}/100. Liberal arts settings start higher because they usually imply smaller-scale teaching, while research institutions gain from lab and mentorship access.`,
      indicators: [
        { label: "Teaching intimacy", value: `${profile.type.includes("liberal arts") ? 90 : 76}/100`, source: "School type" },
        { label: "Research access", value: `${profile.summary.toLowerCase().includes("research") ? 84 : 73}/100`, source: "Summary keywords" },
        { label: "Estimated faculty contact", value: `${professorInteraction}/100`, source: "Composite demo model" }
      ],
      evidence: [profile.summary]
    },
    englishEnvironment: {
      score: englishEnvironment,
      confidence: 96,
      text: `English-study environment is estimated at ${englishEnvironment}/100 because all institutions in this dashboard are English-medium universities or colleges in the U.S.`,
      indicators: [
        { label: "Instruction language", value: "100/100", source: "Institution context" },
        { label: "U.S. system alignment", value: "99/100", source: "Country context" }
      ],
      evidence: ["U.S.-based institution"]
    },
    accompaniment: {
      score: accompaniment,
      confidence,
      text: `Academic and professional accompaniment score is estimated at ${accompaniment}/100 from signals such as advising, research infrastructure, alumni networks, internships, or career integration.`,
      indicators: [
        { label: "Advising potential", value: `${accompaniment - 3}/100`, source: "Composite demo model" },
        { label: "Career integration", value: `${profile.summary.toLowerCase().includes("internship") || profile.summary.toLowerCase().includes("co-op") ? 90 : 78}/100`, source: "Summary keywords" },
        { label: "Network leverage", value: `${profile.highlights.some((item) => item.toLowerCase().includes("alumni")) ? 90 : 80}/100`, source: "Highlights model" }
      ],
      evidence: normalizeArray(profile.highlights)
    },
    cost: {
      score: cost,
      confidence: 82,
      text: `Cost accessibility score is estimated at ${cost}/100 using the aid model described for the institution. Full-need-met and need-blind structures score higher than primarily merit-based models.`,
      indicators: [
        { label: "Aid model", value: profile.aidModel, source: "Profile metadata" },
        { label: "Affordability potential", value: `${cost}/100`, source: "Aid model" },
        { label: "Scholarship competitiveness", value: `${profile.aidModel.includes("merit") ? 74 : 84}/100`, source: "Composite demo model" }
      ],
      evidence: [profile.summary]
    }
  };
}

function buildGenericRecord(profile) {
  return {
    universityName: profile.universityName,
    universityOverview: profile.summary,
    nicheLink: buildNicheSearchUrl(profile.universityName),
    admissionsLink: "Official admissions page to be added",
    officialWebsite: "Official website to be added",
    officialAdmissionsWebsite: "Official admissions website to be added",
    commonDataSetLink: "Common Data Set link to be added",
    sourceLinks: buildGenericSourceLinks(profile),
    acceptanceRateAll: "Data to be added",
    dataClassOf: "Curated record",
    satActPolicy: inferPolicyFromAidModel(profile),
    satRange: "Data to be added",
    admissionsObs1: profile.summary,
    admissionsObs2: "This record is part of the embedded university list.",
    englishProficiencyScore: "Data to be added",
    englishObs: "International testing requirements should come from the latest official admissions website.",
    duolingoAccepted: "Data to be added",
    regularDeadline: "Data to be added",
    earlyDeadline: "Data to be added",
    eaEdEd2: "Data to be added",
    appObs1: "Official admissions pages should override any third-party aggregator data.",
    appObs2: "This record prioritizes structure and selection coverage until all fields are audited.",
    totalUndergraduateStudents: "Data to be added",
    city: profile.city,
    studentFacultyRatio: profile.type.includes("liberal arts") ? "Typically favorable in liberal arts settings" : "Data to be added",
    internationalStudents: profile.environment === "urban" ? "Likely stronger urban/global exposure" : "Data to be added",
    internationalTuitionFees: "Data to be added",
    totalCostOfAttendance: "Data to be added",
    needBasedAidInternational: profile.aidModel.includes("full-need-met") || profile.aidModel.includes("need-blind") ? "Strong aid signal from curated list" : "Possible but should be confirmed from current materials",
    meritScholarshipInternational: profile.aidModel.includes("merit") ? "Strong merit signal from curated list" : "Not emphasized in curated list",
    personalComments: profile.summary,
    feeWaiver: "Data to be added",
    academicsLikesDislikes: profile.summary,
    majors: profile.majors,
    academicProgramming: profile.academicProgramming,
    highlights: profile.highlights,
    sourceMap: {
      acceptanceRateAll: "Embedded record",
      satRange: "Embedded record",
      city: "Curated list",
      needBasedAidInternational: "Curated list",
      meritScholarshipInternational: "Curated list",
      academicsLikesDislikes: "Curated list"
    },
    fieldEvidence: {
      satRange: ["SAT range field is included in the dashboard structure."],
      city: [profile.city],
      academicsLikesDislikes: [profile.summary],
      needBasedAidInternational: [profile.summary],
      meritScholarshipInternational: [profile.summary]
    },
    subjectiveAnalysis: genericSubjectiveAnalysis(profile),
    backendSourcesUsed: ["Embedded record", "Curated university list"],
    lastUpdated: "Embedded record"
  };
}

const DETAILED_OVERRIDES = {
  "University of Wisconsin-Madison": {
    universityOverview: "Wisconsin–Madison is especially known for pairing flagship-university scale with strong academics across a huge range of disciplines and one of the most energetic campus cultures in the country. It is particularly strong in business, engineering, computer sciences, economics, psychology, and the life sciences, and students benefit from extensive course choice, major research infrastructure, strong honors options, and a lively student environment in Madison.",
    nicheLink: "https://www.niche.com/colleges/university-of-wisconsin/",
    admissionsLink: "https://www.niche.com/colleges/university-of-wisconsin/admissions/",
    officialWebsite: "https://www.wisc.edu/",
    officialAdmissionsWebsite: "https://admissions.wisc.edu/",
    commonDataSetLink: "https://irads.wisc.edu/common-data-set/",
    sourceLinks: [
      { label: "UW–Madison facts", url: "https://www.wisc.edu/about/facts/", type: "Official" },
      { label: "Apply as a freshman", url: "https://admissions.wisc.edu/apply-as-a-freshman/", type: "Official" },
      { label: "International applicants", url: "https://admissions.wisc.edu/international/", type: "Official" },
      { label: "Required materials", url: "https://admissions.wisc.edu/required-materials/", type: "Official" },
      { label: "International quick facts", url: "https://international.wisc.edu/international-quick-facts-and-rankings/", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/university-of-wisconsin/", type: "Niche" }
    ],
    acceptanceRateAll: "41%",
    dataClassOf: "Fall 2025 official facts and current admissions pages",
    satActPolicy: "Test-optional through the 2028–29 academic year",
    satRange: "1280–1470",
    admissionsObs1: "UW–Madison’s official facts page reports 73,912 applicants, 30,167 admitted students, and 8,495 enrolled new freshmen in Fall 2025.",
    admissionsObs2: "The university uses an Early Action track and a Regular Decision track for first-year applicants.",
    englishProficiencyScore: "International applicants who need English testing can satisfy the requirement with TOEFL, IELTS, or Duolingo; the current reviewed public undergraduate pages did not clearly expose one single universal minimum table in the same snippet.",
    englishObs: "UW–Madison’s international-applicant pages indicate that English-proficiency requirements can be waived in some circumstances, including English-medium instruction histories.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 15",
    earlyDeadline: "November 1",
    eaEdEd2: "Early Action",
    appObs1: "$80 application fee for first-year applicants.",
    appObs2: "Business, engineering, and some other majors may carry additional tuition differentials beyond the basic nonresident rate.",
    totalUndergraduateStudents: "37,198 undergraduates (Fall 2025)",
    city: "Madison, Wisconsin",
    studentFacultyRatio: "The reviewed official public undergraduate pages emphasized class size and scale more than a single current ratio figure; a historical campus ratio cited by UW sources was about 13.2:1.",
    internationalStudents: "7,957 international students university-wide in 2024–25, including 3,782 undergraduates; about 15% of the total student body university-wide",
    internationalTuitionFees: "$44,191 undergraduate nonresident tuition for 2025–26, plus a $306 incoming freshman fee and possible school-specific differentials",
    totalCostOfAttendance: "The reviewed official admissions pages do not expose one single unified undergraduate COA figure in the same place; nonresident tuition is $44,191 before housing, food, books, insurance, and personal costs are added. For international undergraduates, separate funding and cost guidance is provided through admissions and international offices.",
    needBasedAidInternational: "The reviewed public pages emphasized scholarships and admissions access more than a broad institutional promise to meet full demonstrated need for international students.",
    meritScholarshipInternational: "Yes — UW–Madison publishes dedicated international scholarship information and encourages international applicants to explore scholarship pathways.",
    personalComments: "Wisconsin–Madison is especially strong for students who want a large flagship with broad academic choice, major-school strength, and a more accessible admissions profile than the elite privates in the list.",
    feeWaiver: "$80 fee; a broad first-year fee-waiver policy was not prominently stated on the reviewed public undergraduate pages",
    academicsLikesDislikes: "Students often value Madison’s scale, research energy, and broad academic ecosystem; the trade-off is that the undergraduate experience is less intimate and more self-directed than at small private colleges.",
    majors: ["Business", "Engineering", "Computer Sciences", "Economics", "Psychology"],
    academicProgramming: ["Large public research university", "200+ majors and certificates", "Early Action pathway"],
    highlights: ["41% admit rate", "37,198 undergraduates", "Test-optional through 2028–29", "3,782 international undergraduates"],
    sourceMap: {
      acceptanceRateAll: "Niche + official applicant counts",
      satActPolicy: "Official",
      satRange: "Niche",
      englishProficiencyScore: "Official admissions pages reviewed",
      duolingoAccepted: "Official admissions pages reviewed",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official materials reviewed",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official materials reviewed",
      needBasedAidInternational: "Official materials reviewed",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official admissions materials reviewed",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["UW–Madison’s official facts page reports 73,912 applicants and 30,167 admitted freshmen in Fall 2025, which is about 40.8%.", "Niche’s current page rounds the school to roughly the low-40% range."],
      satActPolicy: ["UW–Madison’s freshman admissions pages say the university is test-optional through the 2028–29 academic year."],
      regularDeadline: ["UW–Madison’s public admissions pages list November 1 for Early Action and January 15 for Regular Decision."],
      feeWaiver: ["UW–Madison’s required-materials and apply-as-a-freshman pages list an $80 application fee; a broad waiver policy was not prominently stated in the reviewed undergraduate materials."],
      totalUndergraduateStudents: ["UW–Madison’s official facts page lists 37,198 undergraduates in Fall 2025."],
      internationalStudents: ["UW–Madison’s International Quick Facts page lists 7,957 international students in 2024–25, including 3,782 undergraduates, and says this equals about 15% of the total student body."],
      internationalTuitionFees: ["UW–Madison’s official facts page lists undergraduate nonresident tuition of $44,191 for 2025–26, plus an additional $306 incoming freshman fee."],
      meritScholarshipInternational: ["UW–Madison publishes a dedicated international scholarships page for undergraduate applicants."],
      totalCostOfAttendance: ["The reviewed public pages did not present one single unified undergraduate COA figure alongside tuition on the same page, so the record uses the official published nonresident tuition plus a clear explanation of what remains outside that number."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official university facts", "Official international office pages", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Vanderbilt University": {
    universityOverview: "Vanderbilt is especially known for blending top-tier academics with a strong campus community, major merit scholarship opportunities, and a more personal undergraduate experience than many peer research universities. It is particularly strong in economics, engineering, neuroscience, political science, and human and organizational development, and students benefit from close advising, strong school spirit, and major-city opportunities in Nashville.",
    nicheLink: "https://www.niche.com/colleges/vanderbilt-university/",
    admissionsLink: "https://www.niche.com/colleges/vanderbilt-university/admissions/",
    officialWebsite: "https://www.vanderbilt.edu/",
    officialAdmissionsWebsite: "https://admissions.vanderbilt.edu/",
    commonDataSetLink: "https://www.vanderbilt.edu/stuaccts/fees/tuition_fees_2025-26_ugrd/",
    sourceLinks: [
      { label: "Vanderbilt early decision stats", url: "https://admissions.vanderbilt.edu/vandybloggers/2025/02/class-of-2029-early-decision-by-the-numbers/", type: "Official" },
      { label: "Vanderbilt regular decision stats", url: "https://admissions.vanderbilt.edu/vandybloggers/2025/04/class-of-2029-regular-decision-summary-statistics/", type: "Official" },
      { label: "Vanderbilt at a glance", url: "https://admissions.vanderbilt.edu/profile/", type: "Official" },
      { label: "Vanderbilt first-year process", url: "https://admissions.vanderbilt.edu/apply/first-year-process/", type: "Official" },
      { label: "Vanderbilt affordability", url: "https://admissions.vanderbilt.edu/affordability/", type: "Official" },
      { label: "Vanderbilt international costs", url: "https://admissions.vanderbilt.edu/affordability/international-costs-and-finances/", type: "Official" },
      { label: "Vanderbilt cost of attendance", url: "https://www.vanderbilt.edu/financialaid/costs-undergraduate/", type: "Official" }
    ],
    acceptanceRateAll: "About 4.6%",
    dataClassOf: "Class of 2029 ED and RD official statistics; Fall 2025 profile and 2025–26 cost pages",
    satActPolicy: "Test-optional for students applying for fall 2025, 2026, and 2027 entry",
    satRange: "1510–1560",
    admissionsObs1: "The official ED and RD statistics for the Class of 2029 imply an overall admit rate of about 4.6% when combined.",
    admissionsObs2: "Vanderbilt offers ED only I, Early Decision II, and Regular Decision.",
    englishProficiencyScore: "The reviewed public undergraduate pages did not publish one universal minimum English score threshold; Vanderbilt evaluates applicants holistically and provides separate aid and merit guidance for international students.",
    englishObs: "International first-year applicants are eligible to apply for all merit-based scholarships offered at Vanderbilt.",
    duolingoAccepted: "The reviewed public undergraduate pages did not clearly surface Duolingo as a standard English-proficiency requirement in the snippets used here",
    regularDeadline: "January 1",
    earlyDeadline: "November 1",
    eaEdEd2: "ED I + ED II",
    appObs1: "$50 nonrefundable application fee or fee waiver for qualified students.",
    appObs2: "The signature merit scholarships require a separate scholarship application by December 1.",
    totalUndergraduateStudents: "7,366 undergraduates (Fall 2025)",
    city: "Nashville, Tennessee",
    studentFacultyRatio: "8:1",
    internationalStudents: "13.1% of first-year students entering Fall 2025; Vanderbilt also reports aid and/or merit awards to 91 international students from 50 countries for fall 2025 admission",
    internationalTuitionFees: "$67,934 tuition for 2025–26",
    totalCostOfAttendance: "$94,274 in direct mandatory costs for on-campus undergraduates in 2025–26, plus at least $3,100 in published indirect costs before transportation allowance is added",
    needBasedAidInternational: "Yes — Vanderbilt offers need-based scholarships to a limited number of international undergraduate applicants, and review is need-aware for those seeking need-based aid.",
    meritScholarshipInternational: "Yes — international first-year applicants are eligible to apply for all merit-based scholarships, including the Ingram, Cornelius Vanderbilt, and Chancellor’s Scholarship programs.",
    personalComments: "Vanderbilt is especially strong for students who want a top-tier private university with major-city energy, strong undergraduate support, and both need-based and major merit scholarship pathways.",
    feeWaiver: "$50 fee or fee waiver for qualified students; for U.S. citizens and eligible non-citizens, Vanderbilt accepts Common App and Coalition fee-waiver requests, and QuestBridge applications are free",
    academicsLikesDislikes: "Students often value Vanderbilt’s blend of selectivity, campus culture, and scholarship generosity; the trade-off is that the environment can still feel quite competitive and polished in a very high-achieving way.",
    majors: ["Economics", "Engineering", "Human and Organizational Development", "Political Science", "Neuroscience"],
    academicProgramming: ["Top private research university", "Three signature full-tuition merit scholarships", "Opportunity Vanderbilt"],
    highlights: ["~4.6% combined admit rate", "1510–1560 SAT range", "8:1 student-faculty ratio", "7,366 undergraduates"],
    sourceMap: {
      acceptanceRateAll: "Official derived from ED and RD stats",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official undergraduate pages reviewed",
      duolingoAccepted: "Official undergraduate pages reviewed",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Vanderbilt’s official ED page lists 6,762 Early Decision applications with a 13.2% admit rate.", "Its official RD page lists 43,322 applications, 1,411 admits, and a 3.3% admit rate.", "Combined, these figures imply an overall admit rate of about 4.6% for the Class of 2029."],
      satRange: ["Vanderbilt At A Glance lists SAT Evidence-Based Reading and Writing 740–770 and SAT Math 770–790 for first-years entering Fall 2025, equivalent to 1510–1560 combined."],
      regularDeadline: ["Vanderbilt’s first-year process page lists November 1 for ED I and January 1 for ED II and Regular Decision."],
      feeWaiver: ["Vanderbilt’s first-year process page lists a $50 application fee or fee waiver for qualified students.", "Vanderbilt’s affordability and FAQ pages explain that Common App and Coalition fee-waiver requests are accepted for U.S. citizens and eligible non-citizens, and QuestBridge is free."],
      totalUndergraduateStudents: ["Vanderbilt At A Glance lists 7,366 undergraduates in Fall 2025."],
      studentFacultyRatio: ["Vanderbilt At A Glance lists an 8:1 student-to-faculty ratio."],
      internationalStudents: ["Vanderbilt At A Glance lists 13.1% international among first-year students entering Fall 2025.", "Vanderbilt’s international-costs page says 91 international students from 50 countries received need-based aid and/or merit scholarships for fall 2025 admission."],
      totalCostOfAttendance: ["Vanderbilt’s official undergraduate cost page lists direct mandatory costs of $94,274 for 2025–26, plus at least $3,100 in indirect costs before transportation."],
      needBasedAidInternational: ["Vanderbilt’s affordability pages say the university offers need-based scholarships to a limited number of international undergraduate applicants and reviews those applications on a need-aware basis."],
      meritScholarshipInternational: ["Vanderbilt’s international profile says international first-year applicants are eligible to apply for all merit-based scholarships, including the Ingram, Cornelius Vanderbilt, and Chancellor’s scholarships." ]
    },
    backendSourcesUsed: ["Official admissions pages", "Official cost pages", "Official affordability pages"],
    lastUpdated: "Audited embedded record"
  },
  "Vassar College": {
    universityOverview: "Vassar is widely known for its intellectually serious liberal arts culture, strong arts presence, and a campus environment that combines creativity with academic rigor. It is especially strong in economics, political science, psychology, biology, English, and arts-related study, and students benefit from close professor relationships, a discussion-based classroom culture, and one of the strongest need-based aid philosophies among elite liberal arts colleges.",
    nicheLink: "https://www.niche.com/colleges/vassar-college/",
    admissionsLink: "https://www.niche.com/colleges/vassar-college/admissions/",
    officialWebsite: "https://www.vassar.edu/",
    officialAdmissionsWebsite: "https://www.vassar.edu/admission",
    commonDataSetLink: "https://offices.vassar.edu/institutional-research/wp-content/uploads/sites/23/2025/03/Vassar-College-CDS-2024-2025-1.pdf",
    sourceLinks: [
      { label: "Vassar class profile", url: "https://www.vassar.edu/admission/quick-facts/class-profile/", type: "Official" },
      { label: "Vassar first-year applicants", url: "https://www.vassar.edu/admission/apply/requirements/", type: "Official" },
      { label: "Vassar how to apply", url: "https://www.vassar.edu/admission/apply/how-to-apply/", type: "Official" },
      { label: "Vassar international applicants", url: "https://www.vassar.edu/admission/apply/international/", type: "Official" },
      { label: "Vassar financial aid", url: "https://www.vassar.edu/admission/financial-aid/", type: "Official" },
      { label: "Vassar tuition and fees", url: "https://www.vassar.edu/admission/financial-aid/tuition/", type: "Official" }
    ],
    acceptanceRateAll: "18.6%",
    dataClassOf: "Class of 2028 profile and current aid pages reviewed in March 2026",
    satActPolicy: "Test-optional",
    satRange: "SAT combined average 1488 among submitters; the reviewed public class profile snippet did not expose a formal middle-50% combined range on the same page",
    admissionsObs1: "Vassar’s official Class of 2028 profile reports 665 students in the class and 12,447 applications.",
    admissionsObs2: "Vassar offers Early Decision I, Early Decision II, and Regular Decision.",
    englishProficiencyScore: "If English is neither the student’s first language nor the primary language of instruction in the past three years of secondary school, Vassar requires TOEFL, IELTS, or Duolingo.",
    englishObs: "The reviewed admissions pages did not publish one universal minimum score threshold on the same page, but they clearly state that TOEFL, IELTS, or Duolingo is required when applicable.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 8",
    earlyDeadline: "November 15",
    eaEdEd2: "ED I + ED II",
    appObs1: "$65 application fee or fee waiver.",
    appObs2: "Vassar-specific fee waivers can be requested on both the Common Application and the Coalition Application, and QuestBridge Finalists automatically receive fee waivers.",
    totalUndergraduateStudents: "The reviewed official class profile focused on the incoming class rather than publishing one single current all-undergraduate headcount on the same page.",
    city: "Poughkeepsie, New York",
    studentFacultyRatio: "The reviewed admissions pages emphasized the small-college experience, but the specific ratio was not foregrounded in the snippets used here.",
    internationalStudents: "18.2% of the Class of 2028 are international students, including dual citizens, from 57 countries",
    internationalTuitionFees: "Current public tuition pages say Vassar meets full demonstrated need and list tuition and fees on the financial-aid cost pages; the reviewed snippets did not expose one consolidated line-item table in the same snippet.",
    totalCostOfAttendance: "Current reviewed Vassar public pages focused on aid guarantees and scholarship averages; the CDS contains annual expenses, but the snippet used here did not expose the numeric table values directly.",
    needBasedAidInternational: "Yes — Vassar says it meets 100% of the full demonstrated need of all admitted students for all four years.",
    meritScholarshipInternational: "No — Vassar says financial aid is awarded exclusively on the basis of need.",
    personalComments: "Vassar is ideal for students who want a highly selective liberal arts college with a strong intellectual culture, strong aid, and a substantial international presence in a residential campus setting.",
    feeWaiver: "$65 fee or fee waiver; Vassar-specific waiver code available through the Coalition Application and school-specific waiver selection available on the Common App",
    academicsLikesDislikes: "Students often value Vassar’s intellectual culture, arts presence, and strong financial aid; the trade-off is that it is smaller and more self-contained than large research universities.",
    majors: ["Economics", "Political Science", "Biology", "English", "Psychology"],
    academicProgramming: ["Liberal arts college", "Need-blind aid model", "Need-only scholarship system"],
    highlights: ["18.6% admit rate", "18.2% international in Class of 2028", "$65 fee with broad waiver paths", "Need-only financial aid"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official class profile reviewed",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official admissions materials reviewed",
      city: "Official",
      studentFacultyRatio: "Official admissions materials reviewed",
      internationalStudents: "Official",
      internationalTuitionFees: "Official aid pages reviewed",
      totalCostOfAttendance: "Official CDS and aid pages reviewed",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Vassar’s official Class of 2028 profile reports 12,447 applications and 18.6% admitted."],
      satRange: ["Vassar’s official class profile says 44% of the class submitted testing and that the SAT combined average among submitters was 1488."],
      regularDeadline: ["Vassar’s first-year application page lists the test-optional form deadlines and indicates January 8 for Regular Decision and Early Decision II-related testing forms; the college’s broader application cycle follows November 15 ED I and early January regular timing."],
      feeWaiver: ["Vassar’s first-year applicants page lists a $65 application fee or fee waiver.", "Vassar’s how-to-apply page explains the Common App and Coalition-specific fee-waiver routes, including the Coalition code 'Vassar Fee Waiver'."],
      internationalStudents: ["Vassar’s class profile says the Class of 2028 is from 57 countries and is 18.2% international students, including dual citizens."],
      needBasedAidInternational: ["Vassar’s financial-aid page says the college meets 100% of the full demonstrated need of all admitted students for all four years."],
      meritScholarshipInternational: ["Vassar’s financial-aid page says aid is awarded exclusively on the basis of need."],
      englishProficiencyScore: ["Vassar’s first-year applicants page states that TOEFL, IELTS, or Duolingo is required if English is neither the student’s first language nor the primary language of instruction for the past three years of secondary school."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Official CDS"],
    lastUpdated: "Audited embedded record"
  },
  "Washington and Lee University": {
    universityOverview: "Washington and Lee is especially known for combining a small, highly residential undergraduate environment with unusual merit scholarship opportunities, especially through the Johnson Scholarship. It is particularly strong in economics, business administration, politics, accounting, and the liberal arts, and students benefit from small classes, close alumni ties, and a campus culture built around leadership, tradition, and personal mentorship.",
    nicheLink: "https://www.niche.com/colleges/washington-and-lee-university/",
    admissionsLink: "https://www.niche.com/colleges/washington-and-lee-university/admissions/",
    officialWebsite: "https://www.wlu.edu/",
    officialAdmissionsWebsite: "https://www.wlu.edu/admissions",
    commonDataSetLink: "https://my.wlu.edu/document/2025-common-data-set",
    sourceLinks: [
      { label: "W&L 2029 class profile", url: "https://www.wlu.edu/admissions/apply/new-class-profile", type: "Official" },
      { label: "W&L apply page", url: "https://www.wlu.edu/admissions/apply", type: "Official" },
      { label: "W&L early decision", url: "https://www.wlu.edu/admissions/apply/about-early-decision", type: "Official" },
      { label: "W&L international applicants", url: "https://www.wlu.edu/admissions/apply/for-international-applicants", type: "Official" },
      { label: "Johnson Scholarship", url: "https://www.wlu.edu/admissions/the-johnson-scholarship", type: "Official" },
      { label: "Tuition and costs", url: "https://www.wlu.edu/admissions/tuition-and-costs", type: "Official" }
    ],
    acceptanceRateAll: "17.6%",
    dataClassOf: "Class of 2029 profile and 2025–26 CDS / costs pages",
    satActPolicy: "Test-optional for applicants seeking entry in Fall 2026",
    satRange: "1450–1510",
    admissionsObs1: "W&L’s Class of 2029 profile reports a 17.6% acceptance rate.",
    admissionsObs2: "W&L offers Early Decision I, Early Decision II, and Regular Decision.",
    englishProficiencyScore: "The reviewed public international-applicant pages focused on transcript and scholarship requirements more than a public hard-minimum English score table, so no universal minimum is embedded here.",
    englishObs: "International applicants must submit school documents in English and complete additional materials related to finances and aid if applicable.",
    duolingoAccepted: "The reviewed public first-year international snippets did not clearly confirm Duolingo as a standard English-proficiency requirement in the materials used here",
    regularDeadline: "January 1",
    earlyDeadline: "November 1",
    eaEdEd2: "ED I + ED II",
    appObs1: "Some applicants may qualify to have their Common App or Coalition fee waived.",
    appObs2: "The Johnson Scholarship application serves as the application for all merit scholarships at W&L and is due December 1 even for ED applicants.",
    totalUndergraduateStudents: "The reviewed official admissions pages focused on the incoming class rather than one single current undergraduate total on the same page.",
    city: "Lexington, Virginia",
    studentFacultyRatio: "The reviewed public pages emphasize close faculty access; the specific current ratio was not foregrounded in the snippets used here.",
    internationalStudents: "9% of the Class of 2029",
    internationalTuitionFees: "$70,100 tuition + $1,265 required fees (2025–26 CDS)",
    totalCostOfAttendance: "$93,470 before travel and other expenses, based on tuition, fees, food and housing, and other expenses in the 2025–26 CDS; Johnson Scholarship materials also describe awards worth more than $89,000 per year plus summer funding",
    needBasedAidInternational: "Yes — W&L says it offers both merit-based scholarships and need-based financial aid to international applicants.",
    meritScholarshipInternational: "Yes — the Johnson Scholarship is W&L’s premier merit scholarship, covering at minimum tuition, housing, and food, plus $10,000 in summer funding, and up to 44 incoming first-year students receive Johnson awards or related merit scholarships.",
    personalComments: "Washington and Lee is a strong option for students who want a small, highly residential liberal arts university with unusually strong merit scholarship upside and a close-knit campus culture.",
    feeWaiver: "Fee-waiver request available through Common App or Coalition for eligible applicants",
    academicsLikesDislikes: "Students often value W&L’s residential culture, strong alumni loyalty, and scholarship opportunities; the trade-off is that it is smaller and more tradition-oriented than many urban national universities.",
    majors: ["Economics", "Business Administration", "Politics", "Biology", "Accounting"],
    academicProgramming: ["Johnson Scholarship program", "Liberal arts and professional blend", "Test-optional current cycle"],
    highlights: ["17.6% admit rate", "1450–1510 SAT range", "9% international in Class of 2029", "Johnson Scholarship worth over $89,000/year plus summer funding"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official international pages reviewed",
      duolingoAccepted: "Official international pages reviewed",
      regularDeadline: "Official CDS / admissions pages",
      earlyDeadline: "Official CDS / admissions pages",
      totalUndergraduateStudents: "Official admissions materials reviewed",
      city: "Official",
      studentFacultyRatio: "Official admissions materials reviewed",
      internationalStudents: "Official",
      internationalTuitionFees: "Official CDS",
      totalCostOfAttendance: "Official CDS + Johnson Scholarship page",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["W&L’s Class of 2029 profile reports a 17.6% acceptance rate."],
      satRange: ["W&L’s Class of 2029 profile reports a 1450–1510 middle-50% SAT range for submitting enrollees."],
      satActPolicy: ["W&L’s test-optional policy page says the policy is extended for applicants seeking entry in Fall 2026."],
      regularDeadline: ["W&L’s 2025–26 CDS and admissions pages indicate November 1 for ED I and January 1 for ED II / Regular Decision."],
      feeWaiver: ["W&L’s apply and early-decision pages say some applicants may qualify to have their Common App or Coalition fee waived."],
      internationalStudents: ["W&L’s Class of 2029 profile lists 9% international students."],
      totalCostOfAttendance: ["W&L’s 2025–26 CDS lists tuition of $70,100, required fees of $1,265, food and housing of $19,605, and other expenses of $2,630.", "The Johnson Scholarship page says the scholarship is worth more than $89,000 per year plus $10,000 for a summer experience."],
      meritScholarshipInternational: ["W&L’s international-applicant page says merit-based scholarships and need-based financial aid are both available.", "The Johnson Scholarship page says awards cover tuition, fees, housing and food, plus $10,000 in summer funding."],
      needBasedAidInternational: ["W&L’s international-applicant page explicitly says the university offers both merit-based scholarships and need-based financial aid."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official CDS", "Official scholarship pages"],
    lastUpdated: "Audited embedded record"
  },
  "Yale University": {
    universityOverview: "Yale is famous for combining extraordinary academic prestige with a strong liberal arts framework, famous residential college system, and one of the most generous need-based aid models in the world. It is especially strong in the humanities, economics, political science, computer science, and the sciences, and students benefit from intense faculty access, major research resources, global brand power, and a deeply residential undergraduate experience.",
    nicheLink: "https://www.niche.com/colleges/yale-university/",
    admissionsLink: "https://www.niche.com/colleges/yale-university/admissions/",
    officialWebsite: "https://www.yale.edu/",
    officialAdmissionsWebsite: "https://admissions.yale.edu/",
    commonDataSetLink: "https://admissions.yale.edu/resource/profile-of-the-first-year-class",
    sourceLinks: [
      { label: "Yale class profile", url: "https://admissions.yale.edu/resource/profile-of-the-first-year-class", type: "Official" },
      { label: "What Yale Looks For", url: "https://admissions.yale.edu/what-yale-looks-for", type: "Official" },
      { label: "Yale standardized testing", url: "https://admissions.yale.edu/standardized-testing", type: "Official" },
      { label: "Yale international students", url: "https://admissions.yale.edu/applying-yale-international-student", type: "Official" },
      { label: "Yale timelines", url: "https://admissions.yale.edu/timelines", type: "Official" },
      { label: "Yale affordability", url: "https://admissions.yale.edu/affordability", type: "Official" },
      { label: "Yale cost of attendance", url: "https://finaid.yale.edu/coa", type: "Official" }
    ],
    acceptanceRateAll: "4.8%",
    dataClassOf: "Class of 2029 profile and 2026–27 cost pages",
    satActPolicy: "Test-flexible: applicants must submit ACT, SAT, AP, or IB results",
    satRange: "Middle 80% SAT ERW 680–790 and SAT Math 690–800",
    admissionsObs1: "Yale uses Single-Choice Early Action and Regular Decision.",
    admissionsObs2: "Yale’s Class of 2029 profile reports a 4.8% rate of admission and 1,640 enrolled first-year students.",
    englishProficiencyScore: "For non-native English speakers without at least two years of English-medium secondary schooling, Yale’s most competitive applicants typically earn TOEFL 100+ (older format) or 5+ (newer format after Jan. 21, 2026), IELTS 7+, Cambridge 185+, and DET 120+.",
    englishObs: "Yale requires an English proficiency test in addition to its test-flexible admissions requirement when the applicant does not meet the English-medium schooling threshold.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 2",
    earlyDeadline: "November 1",
    eaEdEd2: "Single-Choice Early Action",
    appObs1: "Yale does not issue its own fee waivers; eligible applicants use Common App or Coalition Application fee-waiver processes, and QuestBridge is free.",
    appObs2: "Yale meets 100% of demonstrated need regardless of citizenship or immigration status and does not include loans in initial aid offers.",
    totalUndergraduateStudents: "The reviewed admissions pages focused on the entering class and affordability figures rather than a single all-undergraduate headcount figure on the same page.",
    city: "New Haven, Connecticut",
    studentFacultyRatio: "The reviewed admissions pages emphasized small classes and accessibility, though the specific ratio was not foregrounded in the snippets used here.",
    internationalStudents: "46 countries represented in the Class of 2029; Yale also states that all admitted international students are eligible for the same need-based aid as domestic students.",
    internationalTuitionFees: "$72,500 tuition + $185 student activity fee (2026–27)",
    totalCostOfAttendance: "$97,985 for 2026–27 including tuition, fee, housing, food, books, and personal expenses before travel adjustments",
    needBasedAidInternational: "Yes — Yale says it is need-blind for all applicants and meets 100% of demonstrated need regardless of citizenship or immigration status, without loans in initial aid offers.",
    meritScholarshipInternational: "No — Yale’s undergraduate aid is need-based rather than merit-based.",
    personalComments: "Yale is especially strong for students who want an ultra-selective university with extraordinary need-based aid, broad academic freedom inside a strong liberal arts framework, and one of the most globally recognized undergraduate brands in the world.",
    feeWaiver: "No Yale-issued waiver code; eligible applicants use Common App or Coalition waiver eligibility, and QuestBridge is free",
    academicsLikesDislikes: "Students are often drawn to Yale’s humanities strength, residential-college system, and generous aid; the trade-off is the same one found at the most selective Ivies: extraordinary competition for a very small number of seats.",
    majors: ["Economics", "Political Science", "Computer Science", "History", "Molecular Biophysics and Biochemistry"],
    academicProgramming: ["Residential college system", "Test-flexible admissions", "Need-based aid without loans"],
    highlights: ["4.8% admit rate", "Test-flexible with ACT/SAT/AP/IB", "$72,500 tuition in 2026–27", "100% demonstrated need met"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official admissions materials reviewed",
      city: "Official",
      studentFacultyRatio: "Official admissions materials reviewed",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official aid model",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Yale’s Class of 2029 profile reports a 4.8% rate of admission."],
      satActPolicy: ["Yale’s standardized-testing page says first-year applicants must submit one or more of ACT, SAT, AP, or IB results under Yale’s test-flexible policy."],
      satRange: ["Yale’s What Yale Looks For page lists the middle 80% SAT ERW range as 680–790 and SAT Math as 690–800."],
      regularDeadline: ["Yale’s timelines page lists November 1 for Single-Choice Early Action and January 2 for Regular Decision."],
      englishProficiencyScore: ["Yale’s standardized-testing and international-students pages say non-native English speakers without two years of English-medium secondary schooling must submit an English proficiency test; Yale’s most competitive applicants typically present TOEFL 100+, IELTS 7+, Cambridge 185+, and DET 120+."],
      feeWaiver: ["Yale’s counselors page says Yale does not issue its own fee waivers and that applicants should use the eligibility criteria of the Common App or Coalition Application; QuestBridge is free."],
      internationalStudents: ["Yale’s Class of 2029 profile and counselor newsletter say the class represents 46 countries."],
      totalCostOfAttendance: ["Yale’s undergraduate financial aid office lists a 2026–27 cost of attendance with tuition $72,500, student activity fee $185, housing $12,080, food $9,520, books $1,000, and personal expenses $2,700."],
      needBasedAidInternational: ["Yale’s affordability and international-students pages say Yale is need-blind for all applicants, meets 100% of demonstrated need regardless of citizenship or immigration status, and does not include loans in initial aid offers."],
      meritScholarshipInternational: ["Yale’s affordability pages describe all undergraduate aid as need-based rather than merit-based."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official affordability pages", "Official financial aid pages"],
    lastUpdated: "Audited embedded record"
  },
  "University of Chicago": {
    universityOverview: "UChicago is especially known for its intensely intellectual culture, strong core curriculum, and serious emphasis on theory, argument, and analytical depth. It is particularly famous for economics, mathematics, political science, public policy, and interdisciplinary social thought, and students benefit from discussion-heavy classes, rigorous academic training, major research access, and a campus culture built around ideas.",
    nicheLink: "https://www.niche.com/colleges/university-of-chicago/",
    admissionsLink: "https://www.niche.com/colleges/university-of-chicago/admissions/",
    officialWebsite: "https://www.uchicago.edu/",
    officialAdmissionsWebsite: "https://collegeadmissions.uchicago.edu/",
    commonDataSetLink: "https://data.uchicago.edu/common-data-set/",
    sourceLinks: [
      { label: "UChicago CDS", url: "https://data.uchicago.edu/common-data-set/", type: "Official" },
      { label: "UChicago class profile", url: "https://collegeadmissions.uchicago.edu/apply/class-profile/", type: "Official" },
      { label: "UChicago required materials", url: "https://collegeadmissions.uchicago.edu/apply/application/required-materials/", type: "Official" },
      { label: "UChicago international applicants", url: "https://collegeadmissions.uchicago.edu/apply/international-applicants/", type: "Official" },
      { label: "UChicago undergraduate costs", url: "https://financialaid.uchicago.edu/undergraduate/how-aid-works/undergraduate-costs/", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/university-of-chicago/", type: "Niche" }
    ],
    acceptanceRateAll: "4.6%",
    dataClassOf: "CDS 2024–25 and Class of 2028 profile pages reviewed in March 2026",
    satActPolicy: "Test-optional",
    satRange: "1510–1560",
    admissionsObs1: "UChicago offers Early Action, Early Decision I, Early Decision II, and Regular Decision.",
    admissionsObs2: "The 2024–25 CDS implies 42,831 first-year applicants and 1,955 admits, which is about a 4.6% admit rate for that cycle.",
    englishProficiencyScore: "UChicago expects a superior level of English competence but the reviewed public pages did not publish one universal minimum TOEFL/IELTS/DET score threshold.",
    englishObs: "International applicants follow the same required first-year materials and can also access international financial aid information through the College admissions site.",
    duolingoAccepted: "The reviewed public first-year pages did not clearly present Duolingo as a standard undergraduate English requirement",
    regularDeadline: "January 5",
    earlyDeadline: "November 3",
    eaEdEd2: "EA + ED I + ED II",
    appObs1: "UChicago does not charge an application fee for students applying for need-based financial aid.",
    appObs2: "All applicants are automatically considered for merit scholarships, with no separate application.",
    totalUndergraduateStudents: "7,519",
    city: "Chicago, Illinois",
    studentFacultyRatio: "7:1",
    internationalStudents: "1,332 nonresident undergraduates in the 2024–25 CDS, about 17.7% of all undergraduates",
    internationalTuitionFees: "$67,446 tuition + $2,064 student life fee + $1,080 wellness fee + two $696 class fees in the first two years (2025–26)",
    totalCostOfAttendance: "$95,793 for 2025–26 including tuition, fees, housing, food, books, transportation, and personal expenses",
    needBasedAidInternational: "Yes — UChicago says it is committed to meeting the full demonstrated need of every admitted first-year student through a grant-based package; international aid information is provided through the same admissions ecosystem.",
    meritScholarshipInternational: "Yes — all applicants are automatically considered for merit scholarships, and UChicago says merit aid is awarded without a separate application.",
    personalComments: "UChicago is best for students who want a hyper-intellectual, discussion-driven university with very high selectivity, very strong aid, and unusual respect for academic seriousness.",
    feeWaiver: "No application fee for students applying for need-based financial aid",
    academicsLikesDislikes: "Students who love deep reading, theory, and an intense academic culture often see Chicago as ideal; the trade-off is that the environment is famously demanding and can feel less conventionally social than many peer schools.",
    majors: ["Economics", "Mathematics", "Political Science", "Computer Science", "Public Policy"],
    academicProgramming: ["Quarter system", "Core curriculum", "Automatic merit scholarship consideration"],
    highlights: ["4.6% admit rate", "1510–1560 SAT range", "7,519 undergraduates", "No app fee if applying for need-based aid"],
    sourceMap: {
      acceptanceRateAll: "Official CDS",
      satActPolicy: "Official",
      satRange: "Official CDS",
      englishProficiencyScore: "Official admissions pages reviewed",
      duolingoAccepted: "Official admissions pages reviewed",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official CDS",
      city: "Official",
      studentFacultyRatio: "Official institutional materials",
      internationalStudents: "Official CDS",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["The 2024–25 UChicago CDS reports 42,831 first-year applicants and 1,955 admits, implying about a 4.6% admit rate."],
      satRange: ["The 2024–25 UChicago CDS reports a 25th–75th percentile SAT composite range of 1510–1560."],
      regularDeadline: ["UChicago’s applicant portal page lists November 3 for Early Action and Early Decision I, and January 5 for Early Decision II and Regular Decision."],
      feeWaiver: ["UChicago’s required-materials page states that the university does not charge an application fee for students applying for need-based financial aid."],
      totalUndergraduateStudents: ["The 2024–25 UChicago CDS reports 7,519 total undergraduate students."],
      internationalStudents: ["The 2024–25 UChicago CDS reports 1,332 nonresident undergraduates out of 7,519 total undergraduates."],
      totalCostOfAttendance: ["UChicago’s undergraduate-costs page lists a 2025–26 total estimated cost of attendance of $95,793."],
      meritScholarshipInternational: ["UChicago’s admissions site says all applicants are automatically considered for merit scholarships without a separate application."],
      needBasedAidInternational: ["UChicago’s No Barriers financial aid materials say the university meets the full demonstrated need of every admitted first-year student with grant-based aid."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official CDS", "Official financial aid pages", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "University of Kentucky": {
    universityOverview: "Kentucky is known for offering the scale and breadth of a major flagship university with a more accessible admissions process than the elite private schools in this list. It is especially strong in business, engineering, health sciences, biology, and psychology, and students benefit from wide academic choice, strong athletics culture, honors opportunities, and pathways to scholarships through Early Action and program-based application strategies.",
    nicheLink: "https://www.niche.com/colleges/university-of-kentucky/",
    admissionsLink: "https://www.niche.com/colleges/university-of-kentucky/admissions/",
    officialWebsite: "https://www.uky.edu/",
    officialAdmissionsWebsite: "https://admission.uky.edu/",
    commonDataSetLink: "https://irads.uky.edu/sites/default/files/2025-07/cds-2024-2025_0.pdf",
    sourceLinks: [
      { label: "UK freshman admissions", url: "https://admission.uky.edu/freshman", type: "Official" },
      { label: "UK freshman checklist", url: "https://admission.uky.edu/freshman/admission-checklist", type: "Official" },
      { label: "UK international admission requirements", url: "https://international.uky.edu/apply/admission-requirements", type: "Official" },
      { label: "UK tuition for internationals", url: "https://international.uky.edu/apply/tuition", type: "Official" },
      { label: "UK Why UK facts", url: "https://admission.uky.edu/ky-why-uk", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/university-of-kentucky/", type: "Niche" }
    ],
    acceptanceRateAll: "92%",
    dataClassOf: "Current freshman and international-admissions pages reviewed in March 2026",
    satActPolicy: "Test-optional through the 2028–29 academic year",
    satRange: "1090–1290",
    admissionsObs1: "UK uses an Early Action track and a Regular Decision track for freshmen.",
    admissionsObs2: "Selective majors and programs may have additional readiness requirements even though the university itself is broadly test-optional.",
    englishProficiencyScore: "Minimums include TOEFL iBT 71 or higher on the older version / 4 or higher on the newer TOEFL iBT scale, TOEFL Essentials 7.5, IELTS 6.0, and Duolingo 105.",
    englishObs: "International students from exempt countries may not need to submit English proficiency scores.",
    duolingoAccepted: "Yes",
    regularDeadline: "February 15",
    earlyDeadline: "December 1",
    eaEdEd2: "Early Action",
    appObs1: "The application fee is $50 for domestic applicants and $60 for international applicants.",
    appObs2: "UK encourages students who want competitive scholarships or Lewis Honors College consideration to apply by the Early Action deadline.",
    totalUndergraduateStudents: "Nearly 28,000 undergraduates in preliminary Fall 2025 reporting",
    city: "Lexington, Kentucky",
    studentFacultyRatio: "17:1",
    internationalStudents: "The current reviewed freshman pages emphasize broad growth and access, while the international center maintains separate admissions and tuition guidance rather than one highly visible single undergraduate percentage on the same page.",
    internationalTuitionFees: "Minimum I-20 funding estimate of $56,119, including tuition/fees, living expenses/books, and health insurance; actual tuition/fees are linked through UK official rates pages",
    totalCostOfAttendance: "$56,119 estimated minimum funding requirement for undergraduate international students, including tuition/fees, living expenses/books, and health insurance",
    needBasedAidInternational: "The reviewed public pages emphasize admission access and scholarship opportunities more than a broad published international need-based commitment.",
    meritScholarshipInternational: "Yes — UK explicitly states that scholarship opportunities remain available whether or not freshmen submit test scores, especially through Early Action timing.",
    personalComments: "Kentucky is a strong option for students who want a large flagship with broad program choice, accessible admissions, and scholarship potential without the hyper-selectivity of elite private universities.",
    feeWaiver: "$60 international application fee; no broad first-year fee-waiver policy was prominently stated on the reviewed freshman pages",
    academicsLikesDislikes: "Students often value UK’s large scale, strong school spirit, and breadth of majors; the trade-off is that the academic experience is less intimate and less globally branded than the elite privates in the list.",
    majors: ["Business", "Engineering", "Health Sciences", "Biology", "Psychology"],
    academicProgramming: ["200+ academic programs", "Lewis Honors College pathway", "Large flagship university"],
    highlights: ["92% admit rate", "Test-optional through 2028–29", "17:1 student-faculty ratio", "Early Action track"],
    sourceMap: {
      acceptanceRateAll: "Niche",
      satActPolicy: "Official",
      satRange: "Niche",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official news and facts pages",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official international materials reviewed",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official materials reviewed",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official admissions materials reviewed",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Niche’s current admissions page lists the University of Kentucky at a 92% acceptance rate."],
      satActPolicy: ["UK’s freshman admissions pages say the university is test-optional through the 2028–29 academic year."],
      regularDeadline: ["UK’s freshman application pages list December 1 for Early Action and February 15 for Regular Decision."],
      englishProficiencyScore: ["UK’s international admission requirements page lists TOEFL 71, IELTS 6.0, and Duolingo 105 as accepted thresholds."],
      totalUndergraduateStudents: ["UK’s 2025 enrollment news says preliminary fall enrollment included nearly 28,000 undergraduates."],
      studentFacultyRatio: ["UK’s Why UK page lists a 17:1 student-to-faculty ratio."],
      totalCostOfAttendance: ["UK International Center lists an estimated minimum undergraduate funding requirement of $56,119 including tuition/fees, living expenses/books, and health insurance."],
      meritScholarshipInternational: ["UK’s admissions pages state that scholarship opportunities remain available to freshmen whether or not they submit SAT/ACT scores, with Early Action especially important for scholarship consideration."],
      feeWaiver: ["UK’s freshman page lists the application fee as $50 domestic / $60 international; a broad first-year international fee-waiver policy was not prominently stated on the reviewed pages."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official international center pages", "Official institutional facts", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "University of Miami": {
    universityOverview: "Miami is especially known for combining a selective private university experience with strong links to Latin America, business, marine science, health-related fields, and communication-intensive careers. It is particularly attractive for students interested in business, biology, economics, communication, and marine science, and it offers a campus environment shaped by major-city access, warm climate, and strong merit scholarship opportunities.",
    nicheLink: "https://www.niche.com/colleges/university-of-miami/",
    admissionsLink: "https://www.niche.com/colleges/university-of-miami/admissions/",
    officialWebsite: "https://welcome.miami.edu/",
    officialAdmissionsWebsite: "https://admissions.miami.edu/undergraduate/",
    commonDataSetLink: "https://apir.miami.edu/facts-at-a-glance/common-data-set/index.html",
    sourceLinks: [
      { label: "UM class profile", url: "https://admissions.miami.edu/undergraduate/about/class-profile/index.html", type: "Official" },
      { label: "UM testing policy", url: "https://admissions.miami.edu/undergraduate/application-process/admission-requirements/testing-policy/index.html", type: "Official" },
      { label: "UM English proficiency", url: "https://admissions.miami.edu/undergraduate/application-process/admission-requirements/english-proficiency-requirements/index.html", type: "Official" },
      { label: "UM international FAQs", url: "https://admissions.miami.edu/undergraduate/about/FAQs/international-applicants/index.html", type: "Official" },
      { label: "UM cost of attendance", url: "https://finaid.miami.edu/cost/index.html", type: "Official" },
      { label: "UM merit scholarships", url: "https://admissions.miami.edu/undergraduate/financial-aid/scholarships/freshman/index.html", type: "Official" }
    ],
    acceptanceRateAll: "18%",
    dataClassOf: "Fall 2025 applicant data and 2025–26 cost pages",
    satActPolicy: "Required for Fall 2026",
    satRange: "1360–1480",
    admissionsObs1: "The University of Miami once again requires standardized test scores for Fall 2026 first-year applicants.",
    admissionsObs2: "UM’s class profile reports 58,139 completed applications and 10,205 admitted students in Fall 2025, which it rounds to an 18% admission rate.",
    englishProficiencyScore: "Official TOEFL, IELTS, or Duolingo English Test results are required when applicable; the reviewed page emphasizes official submission and waiver requests but the public snippet did not show one universal minimum score.",
    englishObs: "Applicants can request an English proficiency waiver through the applicant portal when eligible.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 1",
    earlyDeadline: "November 1",
    eaEdEd2: "EA + ED I + ED II",
    appObs1: "Application fee waivers are not broadly provided directly; students who obtain a fee waiver must email supporting documents to the admissions office.",
    appObs2: "International students are eligible for both merit and need-based aid, but must submit the CSS Profile for need-based consideration.",
    totalUndergraduateStudents: "12,000+ full-time degree-seeking undergraduates",
    city: "Coral Gables, Florida",
    studentFacultyRatio: "The reviewed admissions pages emphasize close access and student support, though the current snippet reviewed did not foreground one single ratio figure on the same page.",
    internationalStudents: "University of Miami emphasizes a strong international community and specifically states that international students are eligible for both merit and need-based aid; the reviewed class profile page did not surface one single percentage figure in the snippet.",
    internationalTuitionFees: "$63,456 tuition + $1,974 fees (2025–26)",
    totalCostOfAttendance: "$98,118 estimated cost of attendance for domestic full-time undergraduates living on campus in 2025–26; the itemized budget includes tuition, fees, food, housing, books, transportation, and personal expenses",
    needBasedAidInternational: "Yes — UM explicitly says international students are eligible for both merit and need-based aid, with CSS Profile required for need-based aid.",
    meritScholarshipInternational: "Yes — all incoming fall first-year students are automatically considered for merit scholarships, including major awards such as the Stamps Scholarship.",
    personalComments: "Miami is a strong option for students who want a selective private university with warm-weather location, strong scholarship pathways, and broad ties to Latin America and finance/health fields.",
    feeWaiver: "Fee-waiver support exists, but students must submit documentation by email; UM says it does not broadly provide application fee waivers directly in the FAQ language reviewed",
    academicsLikesDislikes: "Students often like Miami’s climate, campus energy, and scholarship opportunities; the trade-off is that it can feel more social and lifestyle-driven than the more austere academic cultures of some elite Northeastern schools.",
    majors: ["Business", "Marine Science", "Biology", "Economics", "Communication"],
    academicProgramming: ["Research university", "Strong merit scholarship ecosystem", "Atlantic / Latin America gateway"],
    highlights: ["18% admit rate", "1360–1480 SAT range", "Fall 2026 testing required", "International students eligible for merit and need-based aid"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official + Niche",
      earlyDeadline: "Official + Niche",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official admissions materials reviewed",
      internationalStudents: "Official international-aid pages",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official FAQ",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["UM’s class profile reports 58,139 completed applications, 10,205 admitted students, and an 18% admission rate for Fall 2025."],
      satRange: ["UM’s class profile lists a 1360–1480 middle-50% SAT range."],
      satActPolicy: ["UM’s testing policy page says the university will once again require standardized test scores for Fall 2026."],
      regularDeadline: ["UM’s public admissions structure uses November 1 for early plans and January 1 for Regular Decision."],
      englishProficiencyScore: ["UM’s English proficiency page says applicants must submit official TOEFL, IELTS, or DET results during the application process when required."],
      totalUndergraduateStudents: ["UM’s About Us page states there are approximately 12,000+ full-time, degree-seeking undergraduates."],
      totalCostOfAttendance: ["UM’s cost-of-attendance page lists tuition of $63,456, fees of $1,974, and a total cost of attendance of $98,118 for on-campus domestic undergraduates in 2025–26."],
      needBasedAidInternational: ["UM’s international FAQ states that international students are eligible for both merit and need-based aid and must submit the CSS Profile for need-based aid."],
      meritScholarshipInternational: ["UM’s first-year scholarship page says all incoming fall first-year students are automatically considered for merit scholarships."],
      feeWaiver: ["UM’s admission-process FAQ says students with a fee waiver should email supporting documents, and separately notes that the university does not broadly provide fee waivers directly in the reviewed FAQ language."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Official class profile", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "University of Notre Dame": {
    universityOverview: "Notre Dame is especially known for its strong undergraduate identity, deeply rooted campus culture, and combination of academic rigor with a values-driven institutional mission. It is particularly strong in finance, economics, political science, engineering, and pre-professional pathways, and students benefit from a powerful alumni network, close community life, and one of the strongest need-based aid models among top private universities.",
    nicheLink: "https://www.niche.com/colleges/university-of-notre-dame/",
    admissionsLink: "https://www.niche.com/colleges/university-of-notre-dame/admissions/",
    officialWebsite: "https://www.nd.edu/",
    officialAdmissionsWebsite: "https://admissions.nd.edu/",
    commonDataSetLink: "https://www3.nd.edu/~instres/data-reports/common-data-set/",
    sourceLinks: [
      { label: "Notre Dame apply page", url: "https://admissions.nd.edu/apply/", type: "Official" },
      { label: "Notre Dame evaluation criteria", url: "https://admissions.nd.edu/apply/evaluation-criteria/", type: "Official" },
      { label: "Notre Dame international application info", url: "https://admissions.nd.edu/apply/resources-for/international-applicants/application-information/", type: "Official" },
      { label: "Notre Dame international FAQs", url: "https://admissions.nd.edu/apply/resources-for/international-applicants/international-faqs/", type: "Official" },
      { label: "Notre Dame aid and affordability", url: "https://admissions.nd.edu/aid-affordability/", type: "Official" },
      { label: "Notre Dame aid FAQ", url: "https://admissions.nd.edu/admitted-students/faqs---financial-aid/", type: "Official" }
    ],
    acceptanceRateAll: "9%",
    dataClassOf: "Class of 2029 applicant pool and current aid pages",
    satActPolicy: "Test-optional through the 2026–27 school year",
    satRange: "1460–1540",
    admissionsObs1: "Notre Dame uses Restrictive Early Action and Regular Decision.",
    admissionsObs2: "The apply page reports 35,403 applications and a 9% admit rate for the Class of 2029.",
    englishProficiencyScore: "Strongly recommended scores are TOEFL 100+, IELTS 7.5+, Duolingo 125+, and PTE Academic 70.",
    englishObs: "Notre Dame will waive English proficiency if an applicant scores 650+ on SAT EBRW or 26+ on ACT English or Reading, and also accepts Duolingo when access or cost makes other exams difficult.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 2",
    earlyDeadline: "November 1",
    eaEdEd2: "Restrictive Early Action",
    appObs1: "The application fee is $85.",
    appObs2: "Notre Dame is now need-blind for all students, domestic and international, and says it meets 100% of demonstrated need with scholarships and grants rather than loans.",
    totalUndergraduateStudents: "The reviewed admissions pages center on applicant-pool and class-profile data; the current snippets used here did not foreground one single official undergraduate-enrollment total on the same page.",
    city: "Notre Dame, Indiana",
    studentFacultyRatio: "The reviewed pages emphasize close support and undergraduate formation; the specific ratio was not foregrounded in the snippets used here.",
    internationalStudents: "8% of the Class of 2029 enrolled student profile",
    internationalTuitionFees: "Current public admissions snippets reviewed focused on aid rather than publishing a full undergraduate tuition table; Notre Dame’s aid pages should be used for the latest official cost breakdown.",
    totalCostOfAttendance: "The reviewed admissions pages emphasized affordability guarantees rather than exposing one single full cost table in the snippet used here.",
    needBasedAidInternational: "Yes — Notre Dame says it is need-blind for all students, including international students, and meets 100% of demonstrated need.",
    meritScholarshipInternational: "Yes — Notre Dame says merit scholarships are available to international students and around four percent of admitted students receive merit aid.",
    personalComments: "Notre Dame is especially compelling for students who want a highly selective university with strong undergraduate identity, serious need-based aid, and a values-driven campus culture.",
    feeWaiver: "$85 fee; QuestBridge applicants do not pay an application fee, and general fee-waiver pathways exist through the application process",
    academicsLikesDislikes: "Students are often drawn to Notre Dame’s strong community, alumni network, and faith-informed institutional identity; the trade-off is that it can feel more tradition-oriented and values-driven than more secular peers.",
    majors: ["Finance", "Political Science", "Engineering", "Economics", "Biology"],
    academicProgramming: ["Restrictive Early Action", "Need-blind for all students", "Notre Dame Scholars' Program"],
    highlights: ["9% admit rate", "1460–1540 SAT range", "Need-blind for internationals", "8% international in Class of 2029"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official admissions materials reviewed",
      city: "Official",
      studentFacultyRatio: "Official admissions materials reviewed",
      internationalStudents: "Official",
      internationalTuitionFees: "Official admissions materials reviewed",
      totalCostOfAttendance: "Official aid pages reviewed",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Notre Dame’s apply page lists 35,403 applications and a 9% admit rate for the Class of 2029."],
      satRange: ["Notre Dame’s Class of 2029 enrolled-student profile lists a 1460–1540 SAT middle 50%."],
      satActPolicy: ["Notre Dame’s evaluation-criteria and application-overview pages state that the university is test-optional through at least the 2026–27 school year."],
      regularDeadline: ["Notre Dame’s application-overview and international-application pages list November 1 for Restrictive Early Action and January 2 for Regular Decision."],
      englishProficiencyScore: ["Notre Dame’s international-applicants pages strongly recommend TOEFL 100+, IELTS 7.5+, Duolingo 125+, and PTE 70."],
      internationalStudents: ["Notre Dame’s Class of 2029 enrolled-student profile lists 8% international students."],
      needBasedAidInternational: ["Notre Dame’s aid-and-affordability and FAQ pages state that Notre Dame is need-blind for all students, domestic and international, and meets 100% of demonstrated need."],
      meritScholarshipInternational: ["Notre Dame’s international FAQ states that all international students and U.S. citizens abroad are considered for merit scholarships, and the aid FAQ says around four percent of admitted students receive merit aid."],
      feeWaiver: ["Notre Dame’s application-overview page lists an $85 fee, while QuestBridge materials note no fee for QuestBridge applicants.", "General fee-waiver pathways are available through the application process."],
      totalCostOfAttendance: ["The reviewed admissions snippets emphasized affordability guarantees rather than surfacing a single cost table, so the record intentionally prioritizes verified admissions and aid policy over an unstated cost figure."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official aid pages", "Official international-applicant resources"],
    lastUpdated: "Audited embedded record"
  },
  "University of Pennsylvania": {
    universityOverview: "Penn is famous for combining Ivy-level academics with a strongly pre-professional and interdisciplinary culture, especially through the influence of Wharton and its multi-school structure. It is especially strong in business, economics, political science, computer science, biology, and interdisciplinary study, and students benefit from major flexibility, research access, and extensive academic and professional opportunities in Philadelphia and beyond.",
    nicheLink: "https://www.niche.com/colleges/university-of-pennsylvania/",
    admissionsLink: "https://www.niche.com/colleges/university-of-pennsylvania/admissions/",
    officialWebsite: "https://www.upenn.edu/",
    officialAdmissionsWebsite: "https://admissions.upenn.edu/",
    commonDataSetLink: "https://upenn.app.box.com/v/UPenn-CDS-2024-25",
    sourceLinks: [
      { label: "Penn facts", url: "https://www.upenn.edu/about/facts", type: "Official" },
      { label: "Penn incoming class profile", url: "https://admissions.upenn.edu/how-to-apply/resources-programs/incoming-class-profile", type: "Official" },
      { label: "Penn first-year applicants", url: "https://admissions.upenn.edu/how-to-apply/first-year-applicants", type: "Official" },
      { label: "Penn testing", url: "https://admissions.upenn.edu/how-to-apply/preparing-your-application/testing", type: "Official" },
      { label: "Penn international applicants", url: "https://admissions.upenn.edu/how-to-apply/international-applicants", type: "Official" },
      { label: "Penn cost of attendance", url: "https://srfs.upenn.edu/costs-budgeting/undergraduate-cost-attendance", type: "Official" },
      { label: "Penn financial aid", url: "https://admissions.upenn.edu/affording-penn/financial-aid", type: "Official" }
    ],
    acceptanceRateAll: "5%",
    dataClassOf: "Class of 2029 admissions facts and 2025–26 cost pages",
    satActPolicy: "Required for the 2025–26 application cycle, with hardship-based testing waivers available",
    satRange: "1510–1560",
    admissionsObs1: "Penn offers Early Decision and Regular Decision.",
    admissionsObs2: "Penn’s official facts page reports 72,544 applications and 3,570 offers of admission for the Class of 2029.",
    englishProficiencyScore: "Competitive applicants tend to have IELTS 7+ and Duolingo 130+; applicants who do not meet Penn’s English-language instruction criteria must submit TOEFL, IELTS, or Duolingo.",
    englishObs: "English proficiency is waived if English is the applicant’s native language or primary language of instruction throughout high school.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 5",
    earlyDeadline: "November 1",
    eaEdEd2: "ED only",
    appObs1: "$75 application fee or fee waiver through Common App or Coalition.",
    appObs2: "Penn is need-aware for international applicants, but admitted international students are eligible for full grant-based aid that meets 100% of demonstrated need.",
    totalUndergraduateStudents: "9,962 full-time + 509 part-time undergraduates",
    city: "Philadelphia, Pennsylvania",
    studentFacultyRatio: "6:1",
    internationalStudents: "15% of the incoming class by home address, with students from 90+ nations",
    internationalTuitionFees: "$63,204 tuition + $8,032 fees (2025–26)",
    totalCostOfAttendance: "$95,612 estimated on-campus total budget (2025–26)",
    needBasedAidInternational: "Yes — Penn is need-aware for international applicants, but admitted international students receive grant-based aid meeting 100% of demonstrated need.",
    meritScholarshipInternational: "No — Penn says undergraduate aid is entirely need-based and it does not award scholarships based on academic or athletic merit.",
    personalComments: "Penn is especially strong for students who want an elite university with powerful pre-professional options, especially in business, policy, engineering, and interdisciplinary study, all in a major city.",
    feeWaiver: "$75 fee or fee waiver through Common App or Coalition",
    academicsLikesDislikes: "Students are often drawn to Penn’s energy, Wharton adjacency, and interdisciplinary structure; the trade-off is that the environment can feel especially ambitious and professionally oriented.",
    majors: ["Economics", "Political Science", "Computer Science", "Business", "Biology"],
    academicProgramming: ["Four undergraduate schools", "Interdisciplinary pathways", "Grant-based aid with no merit scholarships"],
    highlights: ["5% admit rate", "1510–1560 SAT range", "6:1 student-faculty ratio", "15% international by home address"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Penn’s official facts page reports 72,544 applications and 3,570 offers of admission for the Class of 2029, or 5%."],
      satRange: ["Penn’s incoming class profile lists a 1510–1560 SAT range for enrolled students who submitted scores."],
      satActPolicy: ["Penn’s testing page says SAT or ACT is required for the 2025–26 admissions cycle, with a hardship-based testing waiver available."],
      regularDeadline: ["Penn’s first-year-applicants page lists November 1 for Early Decision and January 5 for Regular Decision."],
      englishProficiencyScore: ["Penn’s international-applicants page says applicants who do not meet the English-language criteria must submit TOEFL, IELTS, or Duolingo, and Penn’s FAQ says competitive applicants tend to have IELTS 7+ and Duolingo 130+."],
      totalUndergraduateStudents: ["Penn’s official facts page lists 9,962 full-time and 509 part-time undergraduates."],
      studentFacultyRatio: ["Penn’s official facts page reports a 6:1 student-to-faculty ratio."],
      internationalStudents: ["Penn’s incoming class profile says 15% of the incoming class has home addresses outside the U.S., representing 90+ nations."],
      totalCostOfAttendance: ["Penn’s cost-of-attendance page lists a 2025–26 on-campus total budget of $95,612."],
      needBasedAidInternational: ["Penn’s admissions financial-aid page says Penn is need-aware for international applicants, and SRFS says admitted international students receive grant-based aid meeting 100% of demonstrated need."],
      meritScholarshipInternational: ["Penn’s grants-and-scholarships page says Penn undergraduate aid is entirely need-based and that the university does not award scholarships based on academic or athletic merit."],
      feeWaiver: ["Penn’s application requirements page says the application fee is $75 and that fee waivers may be requested through either the Common App or Coalition Application."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Official cost pages"],
    lastUpdated: "Audited embedded record"
  },
  "Skidmore College": {
    universityOverview: "Skidmore is best known for its creative, energetic campus culture and for combining strong liberal arts academics with a notable presence in the arts. It is especially strong in economics, psychology, political science, English, and arts-related study, and students benefit from close professor relationships, a lively residential environment, and a college culture that values both intellectual seriousness and originality.",
    nicheLink: "https://www.niche.com/colleges/skidmore-college/",
    admissionsLink: "https://www.niche.com/colleges/skidmore-college/admissions/",
    officialWebsite: "https://www.skidmore.edu/",
    officialAdmissionsWebsite: "https://www.skidmore.edu/admissions/",
    commonDataSetLink: "https://www.skidmore.edu/ir/facts/common/CDS_2024-25.pdf",
    sourceLinks: [
      { label: "Skidmore Class of 2029", url: "https://www.skidmore.edu/news/2025/0903-welcoming-class-of-2029.php", type: "Official" },
      { label: "Skidmore international applicants", url: "https://www.skidmore.edu/admissions/apply/international.php", type: "Official" },
      { label: "Skidmore admission catalog page", url: "https://catalog.skidmore.edu/admission/", type: "Official" },
      { label: "Skidmore cost of attendance", url: "https://www.skidmore.edu/bursar/cost.php", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/skidmore-college/", type: "Niche" }
    ],
    acceptanceRateAll: "24%",
    dataClassOf: "Class of 2029 profile and 2025–26 cost pages",
    satActPolicy: "Test-optional",
    satRange: "1300–1460",
    admissionsObs1: "Skidmore welcomed 692 first-year students in the Class of 2029, selected from over 12,200 applicants.",
    admissionsObs2: "Skidmore does not charge an application fee.",
    englishProficiencyScore: "Skidmore accepts TOEFL, IELTS, or Duolingo when English is not the first language and the student has not studied for at least three years in an English-only instructional setting; the reviewed pages did not publish one universal minimum score.",
    englishObs: "Waivers are available for students completing the International Baccalaureate Diploma Programme.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 8",
    earlyDeadline: "November 1",
    eaEdEd2: "ED only",
    appObs1: "Need-based financial aid is available to international applicants through either CSS Profile or the Skidmore ISFAA.",
    appObs2: "Skidmore’s admissions FAQ confirms that submitting SAT or ACT scores is completely optional.",
    totalUndergraduateStudents: "2,591 campus enrollment figure; about 2,300 full-time students in current catalog language",
    city: "Saratoga Springs, New York",
    studentFacultyRatio: "8:1",
    internationalStudents: "Class of 2029 comes from more than 20 countries; institutional enrollment materials provide foreign-country enrollment maps rather than one single undergraduate-wide percentage on the reviewed pages.",
    internationalTuitionFees: "$70,430 tuition and required fees (2025–26)",
    totalCostOfAttendance: "$89,250–$89,400 depending on housing selection for 2025–26 direct billed tuition, housing, and food",
    needBasedAidInternational: "Yes — Skidmore states that need-based financial aid is available to international applicants.",
    meritScholarshipInternational: "Not emphasized on the reviewed undergraduate admissions and aid pages; current public aid messaging centers need-based support.",
    personalComments: "Skidmore is strongest for students who want a highly regarded liberal arts college with strong campus life, generous grant aid, and a more arts-oriented culture than many peer schools.",
    feeWaiver: "No application fee",
    academicsLikesDislikes: "Students often value Skidmore’s campus energy, arts presence, and close faculty relationships; the main trade-off is that it is less internationally branded than the most selective elite colleges in the dashboard.",
    majors: ["Business", "Psychology", "Economics", "English", "Political Science"],
    academicProgramming: ["Liberal arts curriculum", "Strong arts and humanities presence", "Need-based aid for internationals"],
    highlights: ["24% admit rate", "1300–1460 SAT range", "8:1 student-faculty ratio", "No application fee"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Niche",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Niche",
      earlyDeadline: "Niche",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official admissions and aid pages reviewed",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Skidmore’s Class of 2029 story says 692 students were selected from over 12,200 applicants, with a 24% admit rate."],
      satRange: ["Niche’s current admissions page lists a 1300–1460 SAT range."],
      studentFacultyRatio: ["Skidmore’s catalog and institutional pages describe an 8:1 student-to-faculty ratio."],
      feeWaiver: ["Skidmore’s catalog admission page explicitly states there is no fee to apply to Skidmore College."],
      totalCostOfAttendance: ["Skidmore’s 2025–26 bursar page lists $70,430 tuition and required fees, housing from $11,130, and food of $7,690."],
      needBasedAidInternational: ["Skidmore’s international-applicants page says need-based financial aid is available to international applicants through CSS Profile or the Skidmore ISFAA."],
      englishProficiencyScore: ["Skidmore’s international-applicants page lists TOEFL, IELTS, and Duolingo as accepted English-proficiency exams when required."],
      totalUndergraduateStudents: ["Skidmore’s enrollment-statistics page shows campus enrollment of 2,591, while its catalog describes about 2,300 full-time students."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official bursar pages", "Official catalog", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Stanford University": {
    universityOverview: "Stanford is famous for its combination of academic excellence, interdisciplinary freedom, and deep ties to innovation, technology, and entrepreneurship. It is especially strong in computer science, engineering, economics, biology, and political science, and students benefit from extraordinary research resources, flexible academic planning, startup culture, and one of the most globally influential university ecosystems in the world.",
    nicheLink: "https://www.niche.com/colleges/stanford-university/",
    admissionsLink: "https://www.niche.com/colleges/stanford-university/admissions/",
    officialWebsite: "https://www.stanford.edu/",
    officialAdmissionsWebsite: "https://admission.stanford.edu/",
    commonDataSetLink: "https://irds.stanford.edu/data-findings/cds",
    sourceLinks: [
      { label: "Stanford admission page", url: "https://www.stanford.edu/admission/", type: "Official" },
      { label: "Stanford first-year deadlines", url: "https://admission.stanford.edu/apply/first-year/", type: "Official" },
      { label: "Stanford testing policy", url: "https://admission.stanford.edu/apply/first-year/testing.html", type: "Official" },
      { label: "Stanford international applicants", url: "https://admission.stanford.edu/apply/international/index.html", type: "Official" },
      { label: "Stanford student budget", url: "https://financialaid.stanford.edu/undergrad/budget/index.html", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/stanford-university/", type: "Niche" }
    ],
    acceptanceRateAll: "4%",
    dataClassOf: "Current first-year policy for the Class of 2030; most recent official published score profile from the Class of 2028",
    satActPolicy: "Required",
    satRange: "1510–1570",
    admissionsObs1: "Stanford remained test-optional for students applying in fall 2024 for admission to the Class of 2029, but resumed requiring SAT or ACT for students applying in fall 2025 for admission to the Class of 2030.",
    admissionsObs2: "Stanford uses Restrictive Early Action rather than Early Decision.",
    englishProficiencyScore: "Stanford does not publish a universal minimum English-proficiency score on the reviewed undergraduate pages; international applicants may submit additional English evidence, but the main standardized testing requirement is SAT or ACT.",
    englishObs: "International applicants who request aid are reviewed in a need-aware process, but admitted students receive full demonstrated need regardless of citizenship.",
    duolingoAccepted: "Not listed as a primary undergraduate English requirement on the reviewed public first-year admissions pages",
    regularDeadline: "January 5",
    earlyDeadline: "November 1",
    eaEdEd2: "Restrictive Early Action",
    appObs1: "$100 nonrefundable application fee or fee waiver request.",
    appObs2: "Stanford does not provide CSS Profile fee-waiver codes; international applicants who cannot afford CSS may submit the ISAFA instead.",
    totalUndergraduateStudents: "7,289",
    city: "Stanford, California",
    studentFacultyRatio: "Approximately 5:1 to 6:1 in public-facing institutional materials; Stanford’s reviewed undergraduate admission landing page did not display a single explicit current ratio, so the dashboard uses the commonly cited small-ratio characterization rather than a hard unexplained number.",
    internationalStudents: "Class of 2029 from 64 countries; 16% of the Class of 2028 attended school internationally according to official enrollment reporting",
    internationalTuitionFees: "$67,731 tuition for 2025–26",
    totalCostOfAttendance: "About $89,898 in direct tuition, room, and board for 2025–26 before books, personal expenses, transportation, and health charges",
    needBasedAidInternational: "Yes — Stanford meets the full demonstrated financial need of admitted students regardless of citizenship, but for international citizens a request for aid is a factor in admission evaluation.",
    meritScholarshipInternational: "No broad merit program; Stanford says it does not offer merit scholarships outside of a limited number of athletic scholarships.",
    personalComments: "Stanford is strongest for students who want an ultra-selective university with extraordinary flexibility, interdisciplinary culture, and one of the most generous need-based aid structures in the world.",
    feeWaiver: "$100 fee or fee waiver",
    academicsLikesDislikes: "Students are usually drawn to Stanford’s flexibility, entrepreneurial energy, and interdisciplinary freedom; the trade-off is the extreme selectivity and the intensity of competing in such a concentrated high-achievement environment.",
    majors: ["Computer Science", "Engineering", "Economics", "Human Biology", "Political Science"],
    academicProgramming: ["Research university", "Interdisciplinary study", "Strong entrepreneurial ecosystem", "Restrictive Early Action"],
    highlights: ["4% admit rate", "1510–1570 SAT range", "7,289 undergraduates", "Full-need aid for admitted students"],
    sourceMap: {
      acceptanceRateAll: "Niche",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official admissions pages reviewed",
      duolingoAccepted: "Official admissions pages reviewed",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official materials reviewed",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Niche’s current public admissions page lists Stanford at a 4% acceptance rate."],
      satActPolicy: ["Stanford’s official testing policy says SAT or ACT became required again for students applying in fall 2025 for admission to the Class of 2030."],
      satRange: ["Stanford’s official testing page reports a 1510–1570 middle-50% SAT range for students in the Class of 2028 who submitted scores."],
      regularDeadline: ["Stanford’s first-year deadlines page lists November 1 for Restrictive Early Action and January 5 for Regular Decision."],
      feeWaiver: ["Stanford’s first-year fee page says the application fee is $100 or fee waiver.", "The same page says Stanford does not issue CSS Profile fee payment codes and international students who cannot afford CSS may submit ISAFA instead."],
      totalUndergraduateStudents: ["Stanford’s admission landing page lists 7,289 undergraduate students."],
      internationalStudents: ["Stanford’s admission landing page says the Class of 2029 comes from 64 countries.", "Official Stanford reporting on the Class of 2028 says 16% attended schools internationally."],
      totalCostOfAttendance: ["Stanford’s 2025–26 tuition notice lists $67,731 tuition and $22,167 standard room and board, totaling about $89,898 before other budget items."],
      needBasedAidInternational: ["Stanford’s international-applicants page says it meets full demonstrated need for admitted students regardless of citizenship, while also stating that an international citizen’s request for aid is a factor in admission evaluation."],
      meritScholarshipInternational: ["Stanford’s international-applicants page says it does not offer merit scholarships outside of a limited number of athletic scholarships."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Official tuition pages", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Stetson University": {
    universityOverview: "Stetson is especially known for its small-college atmosphere, close student-faculty interaction, and strong scholarship opportunities within a more accessible private-university setting. It is particularly attractive for students interested in business, communication, psychology, environmental science, and pre-law pathways, and it offers a personal academic environment that emphasizes mentoring and undergraduate support.",
    nicheLink: "https://www.niche.com/colleges/stetson-university/",
    admissionsLink: "https://www.niche.com/colleges/stetson-university/admissions/",
    officialWebsite: "https://www.stetson.edu/",
    officialAdmissionsWebsite: "https://www.stetson.edu/administration/admissions/",
    commonDataSetLink: "https://www.stetson.edu/administration/institutional-research/enrollment-reports.php",
    sourceLinks: [
      { label: "Stetson first-year admissions", url: "https://www.stetson.edu/administration/admissions/first-year-students.php", type: "Official" },
      { label: "Stetson application instructions", url: "https://www.stetson.edu/administration/admissions/first-year-application-instructions.php", type: "Official" },
      { label: "Stetson international admissions", url: "https://www.stetson.edu/administration/admissions/international-students.php", type: "Official" },
      { label: "Stetson tuition and costs", url: "https://www.stetson.edu/administration/financial-aid/tuition-and-costs.php", type: "Official" },
      { label: "Stetson scholarships", url: "https://www.stetson.edu/administration/financial-aid/scholarships/", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/stetson-university/", type: "Niche" }
    ],
    acceptanceRateAll: "86%",
    dataClassOf: "Current public admissions pages and 2026–27 tuition pages",
    satActPolicy: "Considered but not required / test-optional",
    satRange: "1090–1290",
    admissionsObs1: "Stetson’s public pages emphasize a personalized admissions process and a smaller community feel rather than extreme selectivity.",
    admissionsObs2: "Current public admissions pages reviewed do not prominently advertise a standard undergraduate application fee.",
    englishProficiencyScore: "Minimum acceptable scores are TOEFL 79, TOEFL Essentials 9, IELTS 6.0, and Duolingo 95.",
    englishObs: "Freshman applicants from English-speaking countries or who have attended English-speaking schools for at least three years are encouraged, but not required, to provide TOEFL scores.",
    duolingoAccepted: "Yes",
    regularDeadline: "Rolling / not prominently fixed on current official pages; Niche does not display a standard regular deadline",
    earlyDeadline: "No widely emphasized early deadline in the reviewed official public first-year pages",
    eaEdEd2: "No major early-plan emphasis visible in the reviewed first-year admissions pages",
    appObs1: "Stetson’s admissions process is straightforward and centered on transcript review, optional testing, and fit with the institution.",
    appObs2: "International students must complete a Certification of Finances for visa processing.",
    totalUndergraduateStudents: "2,188 spring 2026 undergraduates; 2,422 fall 2025 undergraduates",
    city: "DeLand, Florida",
    studentFacultyRatio: "Approximately 12:1 in current institutional materials; the admissions pages emphasize close faculty relationships rather than a single number on every page.",
    internationalStudents: "Stetson’s international-admissions page highlights an international student community and publishes a by-the-numbers section, but the reviewed snippet did not expose a single current percentage figure.",
    internationalTuitionFees: "$61,660 tuition + $400 fees (2026–27)",
    totalCostOfAttendance: "$84,242 estimated on-campus total student budget (2026–27)",
    needBasedAidInternational: "International students are eligible for scholarships and Stetson expects proof of funding through the Certification of Finances; the reviewed pages emphasize scholarships and financial planning more than a formal broad need-based commitment.",
    meritScholarshipInternational: "Yes — academic scholarships include awards such as the Presidential Scholarship up to $35,000, and institutional scholarships are available to eligible international students.",
    personalComments: "Stetson is best for students who want a smaller and more accessible private university with strong scholarship potential, close professor relationships, and a warmer campus environment.",
    feeWaiver: "Current first-year pages reviewed do not prominently list a standard undergraduate application fee",
    academicsLikesDislikes: "Students often like Stetson’s personal attention and smaller-scale campus life; the trade-off is that it does not have the global prestige or research scale of the most selective universities in the dashboard.",
    majors: ["Business", "Law-related studies", "Psychology", "Environmental Science", "Communication"],
    academicProgramming: ["Small-class environment", "Strong scholarship culture", "Close faculty relationships"],
    highlights: ["86% admit rate", "1090–1290 SAT range", "English minimums published", "$84,242 total on-campus budget"],
    sourceMap: {
      acceptanceRateAll: "Niche",
      satActPolicy: "Niche + official admissions materials reviewed",
      satRange: "Niche",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official admissions materials reviewed",
      earlyDeadline: "Official admissions materials reviewed",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official materials reviewed",
      internationalStudents: "Official international page reviewed",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official international and aid pages reviewed",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official admissions materials reviewed",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Niche’s current admissions page lists Stetson at an 86% acceptance rate."],
      satRange: ["Niche’s current admissions page lists a 1090–1290 SAT range."],
      englishProficiencyScore: ["Stetson’s international-admissions page lists minimum acceptable scores of TOEFL 79, TOEFL Essentials 9, IELTS 6.0, and Duolingo 95."],
      totalUndergraduateStudents: ["Stetson’s enrollment reports list 2,188 undergraduates in spring 2026 and 2,422 in fall 2025."],
      totalCostOfAttendance: ["Stetson’s 2026–27 tuition-and-costs page lists $61,660 tuition, $400 fees, $10,909 housing, $8,944 food, and total on-campus budget of $84,242."],
      meritScholarshipInternational: ["Stetson’s scholarship page says the Presidential Scholarship can be as high as $35,000 and that institutional scholarships are available to eligible international students."],
      needBasedAidInternational: ["Stetson’s international and financial-planning pages emphasize scholarship support plus proof-of-funding requirements via Certification of Finances rather than a published universal full-need policy."],
      feeWaiver: ["The reviewed first-year and international admissions pages did not prominently publish a standard undergraduate application fee, while Niche’s main profile lists the application fee as $0."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official international admissions pages", "Official financial aid pages", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Swarthmore College": {
    universityOverview: "Swarthmore is famous for its intense academic culture, highly selective liberal arts environment, and deep commitment to intellectual rigor. It is especially strong in economics, engineering, political science, biology, and the humanities, and students benefit from small classes, close faculty access, a powerful Honor Code culture, and strong cross-registration options through the Tri-College Consortium and Penn.",
    nicheLink: "https://www.niche.com/colleges/swarthmore-college/",
    admissionsLink: "https://www.niche.com/colleges/swarthmore-college/admissions/",
    officialWebsite: "https://www.swarthmore.edu/",
    officialAdmissionsWebsite: "https://www.swarthmore.edu/admissions-aid",
    commonDataSetLink: "https://www.swarthmore.edu/sites/default/files/assets/documents/institutional-effectiveness-research-assessment/Swarthmore-CDS-2025-26.pdf",
    sourceLinks: [
      { label: "Swarthmore admits 965 to Class of 2029", url: "https://www.swarthmore.edu/news-events/swarthmore-admits-965-to-class-2029", type: "Official" },
      { label: "Swarthmore by the numbers", url: "https://www.swarthmore.edu/meet-swarthmore/swarthmore-numbers", type: "Official" },
      { label: "Swarthmore affordability guide", url: "https://www.swarthmore.edu/admissions-aid/applying-affordable", type: "Official" },
      { label: "Swarthmore international financial aid", url: "https://www.swarthmore.edu/financial-aid/international-students", type: "Official" },
      { label: "Swarthmore tuition and fees", url: "https://www.swarthmore.edu/student-accounts-office/tuition-housing-food-fees", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/swarthmore-college/", type: "Niche" }
    ],
    acceptanceRateAll: "7.4%",
    dataClassOf: "Class of 2029 admissions news and 2025–26 cost pages",
    satActPolicy: "Test-optional",
    satRange: "1460–1560",
    admissionsObs1: "Swarthmore admitted 965 students to the Class of 2029 out of 12,995 applicants, implying about a 7.4% acceptance rate.",
    admissionsObs2: "Swarthmore offers Early Decision I, Early Decision II, and Regular Decision.",
    englishProficiencyScore: "The reviewed public admissions pages did not publish one universal minimum English score threshold, but Swarthmore requires or reviews English proficiency for applicants who need to demonstrate it.",
    englishObs: "Swarthmore’s aid and admissions pages focus more on affordability and application process than on a public hard-minimum English table.",
    duolingoAccepted: "The reviewed public snippets did not clearly confirm Duolingo as a first-year English-proficiency pathway, so this field should be read conservatively from currently visible text only",
    regularDeadline: "January 4",
    earlyDeadline: "November 15",
    eaEdEd2: "ED I + ED II",
    appObs1: "$60 application fee or fee waiver.",
    appObs2: "Swarthmore says international applicants admitted to the college still have 100% of determined need met through loan-free financial aid.",
    totalUndergraduateStudents: "1,702",
    city: "Swarthmore, Pennsylvania",
    studentFacultyRatio: "8:1",
    internationalStudents: "14% of the total student body by the numbers; 27% of the Class of 2029 are international citizens, dual citizens, or permanent residents",
    internationalTuitionFees: "$68,766 tuition and books + $460 student activity fee (2025–26)",
    totalCostOfAttendance: "$90,692 total billed costs for 2025–26; estimated future billed costs are listed at $99,961 on a later costs page",
    needBasedAidInternational: "Yes — Swarthmore says international students admitted to the college have 100% of determined need met through loan-free financial aid, though international admissions remain need-aware.",
    meritScholarshipInternational: "No — Swarthmore’s published aid model is centered on need-based, loan-free aid rather than merit awards.",
    personalComments: "Swarthmore is ideal for students seeking a highly selective liberal arts college with intense academics, very strong need-based aid, and a close-knit intellectual culture.",
    feeWaiver: "$60 fee or fee waiver; additional fee-waiver routes exist through Common App, QuestBridge, and SwatPass / Discover Swarthmore pathways",
    academicsLikesDislikes: "Students are often drawn to Swarthmore’s academic rigor, faculty access, and social-justice orientation; the trade-off is that the environment can feel especially demanding and serious.",
    majors: ["Economics", "Political Science", "Biology", "Engineering", "Psychology"],
    academicProgramming: ["Liberal arts college", "Honors Program", "Loan-free aid for admitted students"],
    highlights: ["7.4% admit rate", "1460–1560 SAT range", "8:1 student-faculty ratio", "Loan-free aid for admitted internationals"],
    sourceMap: {
      acceptanceRateAll: "Official + Niche",
      satActPolicy: "Official + Niche",
      satRange: "Niche",
      englishProficiencyScore: "Official admissions pages reviewed",
      duolingoAccepted: "Official admissions pages reviewed",
      regularDeadline: "Official CDS + Niche",
      earlyDeadline: "Official CDS + Niche",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official aid model",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Swarthmore’s March 2025 admissions news says 965 students were admitted out of 12,995 applicants for the Class of 2029, about 7.4%."],
      satRange: ["Niche’s current admissions page lists a 1460–1560 SAT range for Swarthmore."],
      regularDeadline: ["Swarthmore’s 2025–26 CDS lists November 15 for ED I, January 4 for ED II, and January 4 as the application closing date for the fall cycle."],
      feeWaiver: ["Swarthmore’s CDS lists a $60 application fee that can be waived for applicants with financial need.", "Swarthmore’s affordability pages mention Common App waivers, QuestBridge, and SwatPass / Discover Swarthmore routes."],
      totalUndergraduateStudents: ["Swarthmore by the Numbers lists 1,702 students and an 8:1 student-to-faculty ratio."],
      internationalStudents: ["Swarthmore by the Numbers lists 14% international in the total student body.", "Class of 2029 arrival coverage says 27% are international citizens, dual citizens, or permanent residents."],
      totalCostOfAttendance: ["Swarthmore by the Numbers lists 2025–26 tuition, housing, food, and fees totaling $90,692.", "A later tuition page lists estimated future billed costs of $99,961."],
      needBasedAidInternational: ["Swarthmore’s aid-access guide says international students admitted to Swarthmore still have 100% of determined need met through loan-free financial aid."],
      meritScholarshipInternational: ["Swarthmore’s published aid materials focus on need-based, loan-free aid and do not describe a broad merit scholarship model."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official affordability pages", "Official tuition pages", "Niche", "Official CDS"],
    lastUpdated: "Audited embedded record"
  },
  "Tufts University": {
    universityOverview: "Tufts is especially known for combining research-university resources with a liberal arts sensibility and a strong global orientation. It is particularly strong in international relations, engineering, economics, biology, public policy, and interdisciplinary study, and students benefit from major flexibility, close access to Boston-area opportunities, and a campus culture that blends intellectual seriousness with broad extracurricular engagement.",
    nicheLink: "https://www.niche.com/colleges/tufts-university/",
    admissionsLink: "https://www.niche.com/colleges/tufts-university/admissions/",
    officialWebsite: "https://www.tufts.edu/",
    officialAdmissionsWebsite: "https://admissions.tufts.edu/",
    commonDataSetLink: "https://provost.tufts.edu/institutionalresearch/wp-content/uploads/sites/5/CDS_2024-2025-1.pdf",
    sourceLinks: [
      { label: "Tufts enrolled student profile", url: "https://admissions.tufts.edu/apply/enrolled-student-profile/", type: "Official" },
      { label: "Tufts checklist and deadlines", url: "https://admissions.tufts.edu/apply/applying-to-tufts/checklist-and-deadlines/", type: "Official" },
      { label: "Tufts international applicants", url: "https://admissions.tufts.edu/apply/applying-as-an-international-s/", type: "Official" },
      { label: "Tufts international aid", url: "https://admissions.tufts.edu/tuition-and-aid/applying-for-aid/international-student-aid/", type: "Official" },
      { label: "Tufts estimate of expenses", url: "https://icenter.tufts.edu/get-started/checklist-for-new-students/student-visa-certificate/eoe-undergraduate/", type: "Official" },
      { label: "Tufts academics", url: "https://admissions.tufts.edu/discover-tufts/academics/", type: "Official" }
    ],
    acceptanceRateAll: "10.8%",
    dataClassOf: "Class of 2029 profile and 2025–26 cost pages",
    satActPolicy: "Test-optional",
    satRange: "1470–1560",
    admissionsObs1: "Tufts’ official Class of 2029 profile reports 33,415 first-year applications and 3,613 offers of admission.",
    admissionsObs2: "Tufts offers Early Decision I, Early Decision II, and Regular Decision.",
    englishProficiencyScore: "Recommended minimums: TOEFL 100+, IELTS 7+, PTE 68+, Duolingo 130+; Tufts says it has no score minimums.",
    englishObs: "Tufts requires proof of English proficiency when the applicant’s primary language is not English unless they have studied for at least three years in an English-instruction school.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 5",
    earlyDeadline: "November 3",
    eaEdEd2: "ED I + ED II",
    appObs1: "$75 application fee or fee waiver.",
    appObs2: "Tufts does not provide CSS Profile fee waivers at the application stage for international applicants, but all admitted international students who applied for aid receive a CSS fee waiver after admission.",
    totalUndergraduateStudents: "7,126 undergraduates (3,032 men, 3,940 women, 152 another gender, 2 unknown in the 2024–25 CDS total)",
    city: "Medford / Somerville, Massachusetts",
    studentFacultyRatio: "10:1",
    internationalStudents: "12% of the Class of 2029; Tufts International Center separately reports 1,473 international students university-wide in Fall 2025",
    internationalTuitionFees: "$71,982 tuition + $1,634 combined health/wellness and activity fees (2025–26)",
    totalCostOfAttendance: "$100,682 estimated total expenses for international undergraduates (2025–26)",
    needBasedAidInternational: "Yes — Tufts remains committed to robust need-based aid for international students, though the process is need-aware rather than need-blind.",
    meritScholarshipInternational: "Not prominently emphasized in the reviewed undergraduate admissions pages; the main public messaging for international students centers need-based aid and special programs such as the Davis United World Scholars Program.",
    personalComments: "Tufts is especially appealing for students who want a highly selective university with strong international relations, engineering, and interdisciplinary culture in the Boston area.",
    feeWaiver: "$75 fee or fee waiver; applicants can receive automatic or Tufts-specific fee waivers through the application process",
    academicsLikesDislikes: "Students often like Tufts’ blend of research, liberal-arts sensibility, and global orientation; the trade-off is that it can feel both selective and somewhat pre-professional without the same scale as the very largest research universities.",
    majors: ["International Relations", "Economics", "Biomedical Engineering", "Computer Science", "Biology"],
    academicProgramming: ["Nearly 150 majors and minors", "30 interdisciplinary programs", "Experimental College"],
    highlights: ["10.8% admit rate", "1470–1560 SAT range", "10:1 student-faculty ratio", "$100,682 international COA"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official CDS",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official admissions and aid pages reviewed",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Tufts’ Class of 2029 profile reports 33,415 applications and 3,613 offers of admission, a 10.8% admit rate."],
      satRange: ["Tufts’ Class of 2029 profile lists SAT Reading and Writing 730–770 and SAT Math 740–790, equivalent to 1470–1560 combined."],
      regularDeadline: ["Tufts’ checklist and deadlines page lists November 3 for ED I and January 5 for ED II and Regular Decision."],
      englishProficiencyScore: ["Tufts’ international-applicants page lists recommended minimums of TOEFL 100+, IELTS 7+, PTE 68+, and Duolingo 130+, while stating there are no hard score minimums."],
      feeWaiver: ["Tufts’ checklist page says the application fee is $75 or fee waiver, and that applicants automatically receive a fee waiver based on responses to prompts or Tufts-specific criteria."],
      totalUndergraduateStudents: ["Tufts’ 2024–25 CDS totals list 7,126 total undergraduate students across genders."],
      studentFacultyRatio: ["Tufts admissions academics page states a 10:1 student-faculty ratio."],
      internationalStudents: ["Tufts’ Class of 2029 profile lists 12% international students in the entering class.", "Tufts International Center reports 1,473 international students university-wide in Fall 2025."],
      totalCostOfAttendance: ["Tufts’ international estimate of expenses page lists total estimated expenses of $100,682 for international undergraduates in 2025–26."],
      needBasedAidInternational: ["Tufts’ aid pages say the university remains committed to robust need-based aid for international students, and admitted international students who applied for aid receive a CSS Profile fee waiver after admission."],
      meritScholarshipInternational: ["The reviewed undergraduate admissions materials emphasize need-based aid and the Davis United World Scholars Program rather than a broad merit-award system for international applicants."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official aid pages", "Official cost pages", "Official CDS"],
    lastUpdated: "Audited embedded record"
  },
  "Pitzer College": {
    universityOverview: "Pitzer is especially known for its socially conscious academic culture, flexible curriculum, and strong emphasis on interdisciplinary and student-designed study. It is particularly attractive for students interested in psychology, politics, environmental analysis, global studies, and social justice-oriented work, and it offers the added academic range of the Claremont Colleges consortium.",
    nicheLink: "https://www.niche.com/colleges/pitzer-college/",
    admissionsLink: "https://www.niche.com/colleges/pitzer-college/admissions/",
    officialWebsite: "https://www.pitzer.edu/",
    officialAdmissionsWebsite: "https://www.pitzer.edu/admission-aid",
    commonDataSetLink: "https://www.pitzer.edu/documents/revised-cds-data-2024",
    sourceLinks: [
      { label: "Pitzer admitted class profile", url: "https://www.pitzer.edu/documents/2025admittedclassprofile", type: "Official" },
      { label: "Pitzer first-year applicants", url: "https://www.pitzer.edu/admission-aid/how-apply/first-year-applicants", type: "Official" },
      { label: "Pitzer international applicants", url: "https://www.pitzer.edu/admission-aid/how-apply/international-applicants", type: "Official" },
      { label: "Pitzer tuition and fees", url: "https://www.pitzer.edu/offices/student-accounts/tuition-fees", type: "Official" },
      { label: "Pitzer cost of attendance", url: "https://www.pitzer.edu/offices/financial-aid/cost-attendance", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/pitzer-college/", type: "Niche" }
    ],
    acceptanceRateAll: "26.8%",
    dataClassOf: "2025 admitted class profile and 2026–27 tuition pages",
    satActPolicy: "Test-free through the 2025–2026 application cycle; SAT and ACT not accepted",
    satRange: "Not applicable — SAT/ACT scores are not used in admission for the current test-free cycle",
    admissionsObs1: "Pitzer’s admitted class profile reports 988 students in the admitted class as of July 7, 2025 and an acceptance rate of 26.8%.",
    admissionsObs2: "Pitzer offers Early Decision I, Early Decision II, and Regular Decision.",
    englishProficiencyScore: "Published minimums include IELTS 7.5 and Duolingo 135; the reviewed page also listed TOEFL iBT 105 for exams taken before January 2026.",
    englishObs: "Pitzer requires an English language test for non-native English speakers unless a waiver is granted.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 12",
    earlyDeadline: "November 15",
    eaEdEd2: "ED I + ED II",
    appObs1: "$70 application fee or fee-waiver request.",
    appObs2: "Pitzer requires the Common Application, Pitzer writing supplement, and one teacher recommendation for first-year applicants.",
    totalUndergraduateStudents: "1,191 degree-seeking students",
    city: "Claremont, California",
    studentFacultyRatio: "10:1",
    internationalStudents: "7.5% of the admitted class profile; Pitzer facts pages also emphasize a globally diverse community across the Claremont Colleges.",
    internationalTuitionFees: "$70,184 tuition + $312 student activities fee (2026–27 annualized)",
    totalCostOfAttendance: "$94,256 in direct billed tuition, housing, food, and student activities fees for 2026–27, plus SHIP of $3,219 if not waived",
    needBasedAidInternational: "Yes — Pitzer says it offers financial assistance to international students through need-based programs and states that it meets 100% of demonstrated need for aid applicants in general financial-aid messaging.",
    meritScholarshipInternational: "Yes — Pitzer states that it offers financial assistance to international students through both merit-based and need-based programs and also references two merit scholarships.",
    personalComments: "Pitzer is strongest for students who want a socially engaged, interdisciplinary Claremont environment with unusual academic flexibility and a clearly values-driven identity.",
    feeWaiver: "$70 application fee or fee-waiver request",
    academicsLikesDislikes: "Students are often drawn to Pitzer for its interdisciplinary ethos, social responsibility focus, and Claremont access; the trade-off is that it is less traditional and less numbers-driven than more pre-professional peers.",
    majors: ["Psychology", "Biology", "Political Science", "Economics", "Critical Global Studies"],
    academicProgramming: ["39 majors", "23 minors", "Design Your Own Major", "Claremont Colleges access"],
    highlights: ["26.8% admit rate", "Test-free cycle", "10:1 student-faculty ratio", "No SAT range by design"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Pitzer’s 2025 admitted class profile lists a 26.8% acceptance rate."],
      satActPolicy: ["Pitzer’s first-year and test-free policy pages state that SAT and ACT scores are not accepted in the current test-free cycle."],
      satRange: ["Pitzer does not use SAT/ACT scores in admission for the current cycle, so a SAT range is not published for current applicants."],
      englishProficiencyScore: ["Pitzer’s international-applicants page lists IELTS 7.5, Duolingo 135, and TOEFL iBT 105 for the older TOEFL format referenced on the page."],
      totalUndergraduateStudents: ["Pitzer Fast Facts lists 1,191 degree-seeking students."],
      studentFacultyRatio: ["Pitzer Fast Facts and academics pages list a 10:1 student-to-faculty ratio."],
      totalCostOfAttendance: ["Pitzer’s 2026–27 tuition page lists $35,092 tuition, $6,735 housing, $5,145 food, and $156 student activities fee per semester, totaling $94,256 annually before SHIP."],
      meritScholarshipInternational: ["Pitzer’s financial-aid pages say international applicants can receive both merit-based and need-based aid."],
      feeWaiver: ["Pitzer’s international-applicants checklist lists a $70 app fee or fee-waiver request."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Official tuition pages", "Official admitted class profile", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Pomona College": {
    universityOverview: "Pomona is famous for delivering elite liberal arts academics with unusually strong faculty access, generous research support, and the added scale of the Claremont Colleges system. It is especially strong in economics, computer science, mathematics, biology, and public policy-oriented study, and students benefit from small classes, serious academic culture, and broad course access across the consortium.",
    nicheLink: "https://www.niche.com/colleges/pomona-college/",
    admissionsLink: "https://www.niche.com/colleges/pomona-college/admissions/",
    officialWebsite: "https://www.pomona.edu/",
    officialAdmissionsWebsite: "https://www.pomona.edu/admissions-aid",
    commonDataSetLink: "https://www.pomona.edu/about/profile-who-goes-pomona",
    sourceLinks: [
      { label: "Pomona class of 2029 profile", url: "https://www.pomona.edu/about/profile-who-goes-pomona", type: "Official" },
      { label: "Pomona class of 2029 announcement", url: "https://www.pomona.edu/news/2025/09/12-pomona-college-class-2029-profile", type: "Official" },
      { label: "Pomona international applicants", url: "https://www.pomona.edu/admissions/apply/international-applicants", type: "Official" },
      { label: "Pomona financial aid", url: "https://www.pomona.edu/financial-aid", type: "Official" },
      { label: "Pomona cost of attendance", url: "https://www.pomona.edu/about/profile-who-goes-pomona", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/pomona-college/", type: "Niche" }
    ],
    acceptanceRateAll: "7%",
    dataClassOf: "Class of 2029 profile and 2025–26 cost pages",
    satActPolicy: "Considered but not required / test-optional",
    satRange: "1480–1560",
    admissionsObs1: "Pomona’s Class of 2029 profile reports 12,470 total applications and 15% international students by citizenship in the entering class.",
    admissionsObs2: "Pomona offers Early Decision I, Early Decision II, and Regular Decision; aid deadlines for prospective students are November 15 for ED I and January 15 for ED II and Regular Decision.",
    englishProficiencyScore: "Pomona’s reviewed public international-applicant pages did not publish one universal minimum English score, but the college accepts testing and third-party interview options and evaluates English preparation holistically.",
    englishObs: "Pomona’s international-applicant FAQ references interviews through InitialView, Vericant, and Duolingo, and the financial-aid pages provide separate international aid forms when CSS fees are burdensome.",
    duolingoAccepted: "Yes — Duolingo is referenced in Pomona’s international-applicant materials and interview options",
    regularDeadline: "January 8",
    earlyDeadline: "November 8",
    eaEdEd2: "ED I + ED II",
    appObs1: "$80 application fee, with Pomona Access Pass available for hardship-based waivers.",
    appObs2: "Admission for international applicants is need-aware, but Pomona says it meets the full demonstrated need of admitted international students and does not use loans to meet need.",
    totalUndergraduateStudents: "1,732 students",
    city: "Claremont, California",
    studentFacultyRatio: "7:1",
    internationalStudents: "15% of the Class of 2029 by citizenship; the class represents 26 countries and 41 U.S. states",
    internationalTuitionFees: "$68,250 tuition + $420 student fees (2025–26)",
    totalCostOfAttendance: "$93,734 in total billed charges for 2025–26 before health insurance and other individualized expenses",
    needBasedAidInternational: "Yes — Pomona says international admission is need-aware, but it meets the full need of admitted international students and approximately half of admitted international students receive aid.",
    meritScholarshipInternational: "No — Pomona explicitly says it does not provide merit or athletic scholarships and is committed to a fully need-based financial aid program.",
    personalComments: "Pomona is one of the strongest options for students who want an elite liberal arts college with Claremont access, very strong need-based aid, and a highly selective but student-centered academic environment.",
    feeWaiver: "$80 application fee or Pomona Access Pass fee waiver",
    academicsLikesDislikes: "Students are usually attracted by Pomona’s academic intensity, close faculty access, and Claremont consortium breadth; the trade-off is that the environment is highly selective and academically demanding even within the liberal arts context.",
    majors: ["Economics", "Computer Science", "Public Policy Analysis", "Biology", "Mathematics"],
    academicProgramming: ["48 majors and minors", "Claremont Colleges access", "Need-based aid without loans"],
    highlights: ["7% admit rate", "1480–1560 SAT range", "7:1 student-faculty ratio", "15% international in Class of 2029"],
    sourceMap: {
      acceptanceRateAll: "Niche",
      satActPolicy: "Official + Niche",
      satRange: "Niche",
      englishProficiencyScore: "Official international pages reviewed",
      duolingoAccepted: "Official",
      regularDeadline: "Niche + official aid deadlines",
      earlyDeadline: "Niche + official aid deadlines",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Niche’s current admissions page lists Pomona at a 7% acceptance rate."],
      satRange: ["Niche’s current admissions page lists a 1480–1560 SAT range."],
      totalUndergraduateStudents: ["Pomona’s Fact Sheet lists 1,732 students and a 7:1 student-to-faculty ratio."],
      internationalStudents: ["Pomona’s Class of 2029 profile lists 15% international students by citizenship and 26 countries represented."],
      totalCostOfAttendance: ["Pomona’s profile page lists 2025–26 tuition of $68,250, student fees of $420, housing and food of $22,464, and total billed charges of $93,734."],
      needBasedAidInternational: ["Pomona’s international-aid pages say international admission is need-aware but the college meets the full demonstrated need of admitted international students."],
      meritScholarshipInternational: ["Pomona’s international-applicants page explicitly states that Pomona does not provide merit or athletic scholarships."],
      feeWaiver: ["Pomona’s Paths to Apply page lists an $80 fee and says the Pomona Access Pass waives the fee without additional documentation."],
      englishProficiencyScore: ["Pomona’s reviewed international-applicant pages did not publish one universal minimum English score on the available public snippets."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official aid pages", "Official institutional profile", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Princeton University": {
    universityOverview: "Princeton is especially known for pairing Ivy-level resources with an unusually strong undergraduate focus, close faculty attention, and a deep culture of independent research. It is particularly strong in economics, public and international affairs, mathematics, computer science, and the sciences, and students benefit from generous funding, senior thesis traditions, and one of the most supportive academic environments among the Ivies.",
    nicheLink: "https://www.niche.com/colleges/princeton-university/",
    admissionsLink: "https://www.niche.com/colleges/princeton-university/admissions/",
    officialWebsite: "https://www.princeton.edu/",
    officialAdmissionsWebsite: "https://admission.princeton.edu/",
    commonDataSetLink: "https://ir.princeton.edu/document/546",
    sourceLinks: [
      { label: "Princeton admission statistics", url: "https://admission.princeton.edu/apply/admission-statistics", type: "Official" },
      { label: "Princeton profile: admission and costs", url: "https://profile.princeton.edu/admission-and-costs", type: "Official" },
      { label: "Princeton standardized testing", url: "https://admission.princeton.edu/apply/standardized-testing", type: "Official" },
      { label: "Princeton cost and aid", url: "https://admission.princeton.edu/cost-aid", type: "Official" },
      { label: "Princeton international students", url: "https://admission.princeton.edu/apply/international-students", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/princeton-university/", type: "Niche" }
    ],
    acceptanceRateAll: "4.4%",
    dataClassOf: "Class of 2029 admission profile and 2025–26 cost pages",
    satActPolicy: "Test-optional in the current cycle reviewed; standardized testing will return as required beginning with applicants seeking to enroll in fall 2028",
    satRange: "1500–1580",
    admissionsObs1: "Princeton uses Single-Choice Early Action and Regular Decision.",
    admissionsObs2: "Princeton’s Class of 2029 profile reports 42,303 applicants and 1,868 admitted students, implying an admit rate of about 4.4%.",
    englishProficiencyScore: "Princeton accepts Duolingo, TOEFL, IELTS, and Cambridge for students who choose to submit English-proficiency evidence, but the reviewed admissions pages did not publish a hard minimum score.",
    englishObs: "Princeton’s public admissions pages reviewed do not impose a universal English-proficiency minimum score threshold.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 1",
    earlyDeadline: "November 1",
    eaEdEd2: "Single-Choice Early Action",
    appObs1: "The application fee is $75, and international students are eligible for fee waivers when the fee would be a hardship.",
    appObs2: "Princeton applies the same financial-aid policy to international students as it does to U.S. students and does not offer academic or athletic merit scholarships.",
    totalUndergraduateStudents: "5,826 approximate undergraduate enrollment (2025–26)",
    city: "Princeton, New Jersey",
    studentFacultyRatio: "5:1",
    internationalStudents: "14.1% of the Class of 2029; 65 countries represented",
    internationalTuitionFees: "$65,210 tuition (2025–26)",
    totalCostOfAttendance: "$86,680 for tuition, fees, housing, and food (2025–26), with books and personal expenses estimated separately",
    needBasedAidInternational: "Yes — Princeton is need-blind for international applicants and meets the full need of all admitted international students.",
    meritScholarshipInternational: "No — Princeton explicitly says it does not offer academic or athletic merit scholarships.",
    personalComments: "Princeton is especially strong for students who want top-tier academics with intense faculty engagement, a strong undergraduate focus, and one of the most generous need-based aid systems in the world.",
    feeWaiver: "$75 application fee or fee waiver; international students are eligible for fee waivers",
    academicsLikesDislikes: "Students often value Princeton’s close faculty access, senior-thesis culture, and very strong undergraduate orientation; the trade-off is an extremely selective and demanding academic environment.",
    majors: ["Economics", "Computer Science", "Public and International Affairs", "Mathematics", "Molecular Biology"],
    academicProgramming: ["A.B. and B.S.E. pathways", "50+ minors and certificate programs", "Senior thesis and independent research"],
    highlights: ["4.4% admit rate", "1500–1580 SAT range", "5:1 student-faculty ratio", "Need-blind for internationals"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Niche",
      englishProficiencyScore: "Official admissions pages reviewed",
      duolingoAccepted: "Official admissions pages reviewed",
      regularDeadline: "Official + Niche",
      earlyDeadline: "Official + Niche",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Princeton’s Class of 2029 profile reports 42,303 applicants and 1,868 admits, about a 4.4% admit rate."],
      satRange: ["Niche’s current Princeton admissions page lists a 1500–1580 SAT range."],
      satActPolicy: ["Princeton’s standardized-testing page says testing will return as required beginning with applicants seeking to enroll in fall 2028, implying the current cycle remains test-optional."],
      totalUndergraduateStudents: ["Princeton’s profile pages list approximate undergraduate enrollment of 5,826 for 2025–26."],
      studentFacultyRatio: ["Princeton’s academics pages state a 5:1 student-to-faculty ratio."],
      internationalStudents: ["Princeton’s admissions statistics page lists 14.1% international citizens in the Class of 2029 and 65 countries represented."],
      totalCostOfAttendance: ["Princeton’s cost and aid page lists $86,680 for tuition, fees, housing, and food in 2025–26."],
      needBasedAidInternational: ["Princeton’s international-students page says the same financial-aid policy applies regardless of citizenship and that full need is met."],
      feeWaiver: ["Princeton’s FAQ and counselor pages say the application fee is $75 and that international students are eligible for fee waivers."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official aid pages", "Official institutional profile", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Rice University": {
    universityOverview: "Rice is widely known for combining top-tier academics with a smaller undergraduate population and a highly distinctive residential college system. It is especially strong in engineering, computer science, economics, biosciences, and policy-related study, and students benefit from close professor interaction, strong research access, and a collaborative campus culture that feels more personal than many peer research universities.",
    nicheLink: "https://www.niche.com/colleges/rice-university/",
    admissionsLink: "https://www.niche.com/colleges/rice-university/admissions/",
    officialWebsite: "https://www.rice.edu/",
    officialAdmissionsWebsite: "https://admission.rice.edu/",
    commonDataSetLink: "https://ideas.rice.edu/wp-content/uploads/2025/10/CDS_2024-25_WEBSITE.pdf",
    sourceLinks: [
      { label: "Rice class profile", url: "https://admission.rice.edu/apply/class-profile", type: "Official" },
      { label: "Rice first-year domestic applicants", url: "https://admission.rice.edu/apply/first-year-domestic-applicants", type: "Official" },
      { label: "Rice first-year international applicants", url: "https://admission.rice.edu/apply/first-year-international-applicants", type: "Official" },
      { label: "Rice cost of attendance", url: "https://financialaid.rice.edu/cost-attendance", type: "Official" },
      { label: "Rice merit scholarships", url: "https://financialaid.rice.edu/types-aid/merit-scholarships", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/rice-university/", type: "Niche" }
    ],
    acceptanceRateAll: "8.0%",
    dataClassOf: "2024–2025 cycle class profile and 2026–27 cost pages",
    satActPolicy: "Recommended",
    satRange: "1510–1560",
    admissionsObs1: "Rice offers Early Decision I, Early Decision II, and Regular Decision.",
    admissionsObs2: "The official class profile reports 36,791 applicants and 2,948 admits in the 2024–2025 cycle, for an 8.0% admit rate.",
    englishProficiencyScore: "Rice accepts TOEFL, IELTS, Duolingo, and Cambridge for non-native English speakers; the reviewed public pages did not publish one universal minimum score threshold.",
    englishObs: "Rice’s FAQ explicitly lists TOEFL, IELTS, Duolingo, and Cambridge as accepted English-proficiency tests.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 4",
    earlyDeadline: "November 1",
    eaEdEd2: "ED I + ED II",
    appObs1: "$75 nonrefundable application fee.",
    appObs2: "International applicants are not eligible to request an application fee waiver.",
    totalUndergraduateStudents: "4,776 undergraduates",
    city: "Houston, Texas",
    studentFacultyRatio: "Just under 6:1",
    internationalStudents: "13% of the enrolled class in the 2024–2025 cycle",
    internationalTuitionFees: "$71,140 tuition + $984 mandatory fees (2026–27 for students who entered 2024 or later)",
    totalCostOfAttendance: "$97,309 for on-campus living (2026–27), with separate travel estimates for foreign-country residents",
    needBasedAidInternational: "Limited — Rice is need-aware for international first-year applicants and offers need-based aid to a limited number of international admits each year.",
    meritScholarshipInternational: "Yes — all admitted freshman applicants are automatically considered for merit-based scholarships; Rice also states that merit-based aid is available to first-time incoming international freshmen.",
    personalComments: "Rice is especially compelling for students who want a top research university with a smaller undergraduate population, strong STEM and policy options, and unusually personal residential-college culture.",
    feeWaiver: "$75 fee; international applicants are not eligible for a fee waiver",
    academicsLikesDislikes: "Students tend to like Rice’s combination of elite academics, collaborative culture, and residential-college system; the trade-off is that international need-based aid is selective and the environment can still be highly intense academically.",
    majors: ["Computer Science", "Economics", "Bioengineering", "Mathematics", "Political Science"],
    academicProgramming: ["Residential college system", "Top research university", "Automatic merit scholarship consideration"],
    highlights: ["8.0% admit rate", "1510–1560 SAT range", "Just under 6:1 ratio", "4,776 undergraduates"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official + Niche",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official + Niche",
      earlyDeadline: "Official + Niche",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Rice’s class profile reports 36,791 applicants and 2,948 admits in the 2024–2025 cycle, for an 8.0% admit rate."],
      satRange: ["Rice’s official class profile lists a 1510–1560 SAT composite range for deposited students."],
      satActPolicy: ["Rice’s current public admissions materials show last applicable SAT/ACT dates and Niche lists the policy as recommended."],
      regularDeadline: ["Rice’s first-year pages list November 1 for ED I and January 4 for ED II and Regular Decision."],
      feeWaiver: ["Rice’s first-year international FAQ says the application fee is $75 and international applicants are not eligible for a fee waiver."],
      totalUndergraduateStudents: ["Rice’s official About page lists 4,776 undergraduates."],
      studentFacultyRatio: ["Rice’s official About page says the undergraduate student-to-faculty ratio is just under 6-to-1."],
      totalCostOfAttendance: ["Rice’s 2026–27 cost-of-attendance page lists $97,309 for on-campus students who entered in 2024 or later."],
      meritScholarshipInternational: ["Rice’s merit-scholarships page says all admitted freshman applicants are automatically considered for merit-based scholarships, and the international-aid pages confirm merit-based aid is available to first-time incoming international freshmen."],
      needBasedAidInternational: ["Rice’s international-aid pages say the university is need-aware for international first-year applicants and offers need-based aid to a limited number of international admits each year."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official aid pages", "Official class profile", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Rollins College": {
    universityOverview: "Rollins is especially known for offering a smaller private-college experience with strong mentoring, warm-weather campus life, and scholarship opportunities that can significantly reduce cost. It is particularly attractive for students interested in business, political science, communication, psychology, and international business, and it combines a personal classroom environment with accessible professional development.",
    nicheLink: "https://www.niche.com/colleges/rollins-college/",
    admissionsLink: "https://www.niche.com/colleges/rollins-college/admissions/",
    officialWebsite: "https://www.rollins.edu/",
    officialAdmissionsWebsite: "https://www.rollins.edu/apply/",
    commonDataSetLink: "https://rpublic.rollins.edu/sites/IR/Common%20Data%20Set%20CDS/CDS_2021-2022%20Rollins.pdf",
    sourceLinks: [
      { label: "Rollins apply page", url: "https://www.rollins.edu/apply/", type: "Official" },
      { label: "Rollins first-time applicants", url: "https://www.rollins.edu/apply/first-time/", type: "Official" },
      { label: "Rollins international applicants", url: "https://www.rollins.edu/apply/international/", type: "Official" },
      { label: "Rollins tuition costs", url: "https://www.rollins.edu/student-account-services/tuition-costs-and-due-dates/", type: "Official" },
      { label: "Rollins scholarships", url: "https://www.rollins.edu/scholarships-aid/scholarships/academic/", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/rollins-college/", type: "Niche" }
    ],
    acceptanceRateAll: "41%",
    dataClassOf: "Current admissions pages and 2026–27 tuition pages reviewed in March 2026",
    satActPolicy: "Considered but not required / test-optional",
    satRange: "1210–1360",
    admissionsObs1: "Rollins offers Early Action, Early Decision, and Regular Decision.",
    admissionsObs2: "Rollins has removed the application fee on its current first-time and international apply pages.",
    englishProficiencyScore: "The reviewed international-applicant page emphasized application requirements and funding forms but did not publish one universal minimum English-test threshold in the snippet reviewed.",
    englishObs: "International applicants complete a Non-US Citizen Financial Aid Application in lieu of the CSS Profile.",
    duolingoAccepted: "Not clearly confirmed on the reviewed public undergraduate international page snippet",
    regularDeadline: "February 1",
    earlyDeadline: "November 15",
    eaEdEd2: "EA + ED",
    appObs1: "Rollins says neither of its two application pathways requires an application fee.",
    appObs2: "Rollins is one of the relatively few U.S. colleges that says it offers need-based aid to international applicants in addition to academic scholarships.",
    totalUndergraduateStudents: "Recent public materials describe roughly 2,100+ undergraduates in the traditional College of Liberal Arts context; the currently reviewed admissions snippets did not publish one single updated all-undergraduate figure on the same page.",
    city: "Winter Park, Florida",
    studentFacultyRatio: "11:1",
    internationalStudents: "Rollins emphasizes international recruitment and publishes a dedicated international process; the reviewed public snippets did not provide one single current undergraduate-wide percentage figure.",
    internationalTuitionFees: "$65,410 tuition for the 2026–27 College of Liberal Arts comprehensive rate, before housing/food; direct billed total with a double room and 15-swipe meal plan is $83,570",
    totalCostOfAttendance: "At least $83,570 in direct billed tuition, room, and meal-plan charges for the 2026–27 College of Liberal Arts rate, before books, transportation, and personal expenses",
    needBasedAidInternational: "Yes — Rollins says international applicants are eligible for need-based financial aid.",
    meritScholarshipInternational: "Yes — Rollins says international scholarships range from $15,000 per year to full tuition, and academic scholarships are awarded automatically through the admission process.",
    personalComments: "Rollins is a good fit for students who want a more accessible private college with strong scholarship potential, a warmer location, and a smaller-college feel without the same level of selectivity as the ultra-elite institutions on the list.",
    feeWaiver: "No application fee",
    academicsLikesDislikes: "Students often value the personal attention, warm-weather campus, and scholarship access; the main trade-off is that Rollins is less globally prestigious and academically intense than the most selective schools in the dashboard.",
    majors: ["International Business", "Communication Studies", "Psychology", "Political Science", "Biology"],
    academicProgramming: ["College of Liberal Arts", "Automatic academic scholarship consideration", "No application fee"],
    highlights: ["41% admit rate", "1210–1360 SAT range", "11:1 student-faculty ratio", "International scholarships up to full tuition"],
    sourceMap: {
      acceptanceRateAll: "Niche",
      satActPolicy: "Official + Niche",
      satRange: "Niche",
      englishProficiencyScore: "Official international page reviewed",
      duolingoAccepted: "Official international page reviewed",
      regularDeadline: "Niche",
      earlyDeadline: "Niche",
      totalUndergraduateStudents: "Official materials reviewed",
      city: "Official",
      studentFacultyRatio: "Official + CDS",
      internationalStudents: "Official international page reviewed",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Niche’s current admissions page lists Rollins at a 41% acceptance rate."],
      satRange: ["Niche’s current admissions page lists a 1210–1360 SAT range."],
      feeWaiver: ["Rollins’ current apply pages say none of the application options require an application fee."],
      regularDeadline: ["Niche’s current admissions page lists a February 1 regular-decision deadline and November 15 for early action / early decision."],
      studentFacultyRatio: ["Rollins institutional materials and recent CDS materials describe an 11:1 student-to-faculty ratio."],
      totalCostOfAttendance: ["Rollins’ 2026–27 tuition-costs page lists tuition of $65,410, double-room housing of $11,040, and a 15-swipe meal plan of $7,120, for a direct billed total of $83,570."],
      meritScholarshipInternational: ["Rollins’ international-applicants FAQ says international scholarships range from $15,000 per year up to full tuition."],
      needBasedAidInternational: ["Rollins’ international-applicants page says international applicants are eligible for both academic scholarships and need-based financial aid."],
      englishProficiencyScore: ["The reviewed public international page emphasized the application checklist and funding forms but did not show one universal minimum English score threshold in the visible snippet."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official tuition pages", "Official scholarship pages", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Lehigh University": {
    universityOverview: "Lehigh is especially known for blending strong engineering and business programs with the feel of a mid-sized research university. It is particularly respected in finance, engineering, computer science, economics, and applied sciences, and students benefit from close faculty interaction, hands-on project work, strong career placement, and scholarship pathways that make it especially attractive for practical and ambitious students.",
    nicheLink: "https://www.niche.com/colleges/lehigh-university/",
    admissionsLink: "https://www.niche.com/colleges/lehigh-university/admissions/",
    officialWebsite: "https://www.lehigh.edu/",
    officialAdmissionsWebsite: "https://www2.lehigh.edu/admissions/undergraduate",
    commonDataSetLink: "https://www2.lehigh.edu/sites/www/files/2025-09/Common%20Data%20Set%202025-2026%20Lehigh%20University.pdf",
    sourceLinks: [
      { label: "Lehigh admissions stats", url: "https://www2.lehigh.edu/admissions/undergraduate/admissions-statistics", type: "Official" },
      { label: "Lehigh admissions home", url: "https://www2.lehigh.edu/admissions/undergraduate", type: "Official" },
      { label: "Lehigh international applicants", url: "https://www2.lehigh.edu/admissions/undergraduate/international-applicants", type: "Official" },
      { label: "Lehigh cost of attendance", url: "https://www2.lehigh.edu/admissions/undergraduate/tuition-affording-college/cost-of-attendance", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/lehigh-university/", type: "Niche" }
    ],
    acceptanceRateAll: "29%",
    dataClassOf: "Class of 2029 admissions statistics and 2026–27 cost pages",
    satActPolicy: "Test-optional",
    satRange: "1410–1530",
    admissionsObs1: "Lehigh’s official admissions statistics report 19,342 applicants and 5,601 admitted students for the Class of 2029.",
    admissionsObs2: "Lehigh offers Early Decision I, Early Decision II, and Regular Decision.",
    englishProficiencyScore: "Lehigh requires TOEFL, IELTS, or Duolingo for many international applicants educated where English is not the primary language of instruction, but the reviewed undergraduate pages did not publish one universal minimum score.",
    englishObs: "Undergraduate international guidance reviewed confirms TOEFL, IELTS, and Duolingo are accepted pathways for English-proficiency evaluation when required.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 1",
    earlyDeadline: "November 1",
    eaEdEd2: "ED I + ED II",
    appObs1: "Financial-aid deadlines differ from admission deadlines and should be tracked separately by round.",
    appObs2: "Lehigh’s current first-year pages reviewed did not prominently publish a broad undergraduate fee-waiver policy.",
    totalUndergraduateStudents: "5,986",
    city: "Bethlehem, Pennsylvania",
    studentFacultyRatio: "11:1",
    internationalStudents: "Class of 2029 students come from 21 countries; Lehigh’s reviewed public pages did not publish one single current all-undergraduate international percentage in the same place.",
    internationalTuitionFees: "$69,420 tuition",
    totalCostOfAttendance: "$93,400 projected international cost of attendance (2026–27)",
    needBasedAidInternational: "Limited — Lehigh says it offers a limited amount of funding for eligible first-year international students with demonstrated financial need.",
    meritScholarshipInternational: "Yes — Lehigh awards merit scholarships through the admissions process, and some named scholarships can be very substantial.",
    personalComments: "Lehigh is strongest for students who want a research university with especially strong business and engineering identity, a more collaborative mid-size environment, and meaningful scholarship potential.",
    feeWaiver: "A general undergraduate fee-waiver policy was not prominently stated on the reviewed first-year admissions pages; applicants with hardship should contact admissions directly.",
    academicsLikesDislikes: "Students often appreciate Lehigh’s balance of engineering, business, and campus community, plus strong career orientation; the main trade-off is that it is less internationally famous than the most globally branded privates on this list.",
    majors: ["Business", "Mechanical Engineering", "Computer Science", "Economics", "Bioengineering"],
    academicProgramming: ["Research university", "Strong engineering and business pathways", "Merit scholarship consideration through admission"],
    highlights: ["29% admit rate", "1410–1530 SAT range", "11:1 student-faculty ratio", "Strong merit potential"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official admissions materials reviewed",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Lehigh’s admissions statistics page reports 19,342 applicants and 5,601 admits for the Class of 2029."],
      satRange: ["Lehigh’s official admissions statistics list SAT EBRW 700–750 and Math 710–780, equivalent to 1410–1530 combined."],
      regularDeadline: ["Lehigh admissions pages list November 1 for ED I and January 1 for ED II and Regular Decision."],
      studentFacultyRatio: ["Lehigh admissions materials reviewed describe an 11:1 student-to-faculty ratio."],
      totalUndergraduateStudents: ["Lehigh’s official admissions statistics page lists 5,986 undergraduates."],
      totalCostOfAttendance: ["Lehigh’s international cost-of-attendance materials list a projected 2026–27 cost of attendance of $93,400."],
      needBasedAidInternational: ["Lehigh’s financial-aid FAQ says a limited amount of funding is available for eligible first-year international students with demonstrated financial need."],
      meritScholarshipInternational: ["Lehigh’s scholarship pages state that merit awards are made through the admissions process and include named scholarships with very large awards."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official cost pages", "Official scholarship pages", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Macalester College": {
    universityOverview: "Macalester is famous for its global outlook, highly international student body, and strong culture of political and social engagement. It is especially strong in international studies, economics, political science, biology, and interdisciplinary liberal arts work, and students benefit from a small-college setting with serious academics, strong advising, and exceptional exposure to cross-cultural perspectives.",
    nicheLink: "https://www.niche.com/colleges/macalester-college/",
    admissionsLink: "https://www.niche.com/colleges/macalester-college/admissions/",
    officialWebsite: "https://www.macalester.edu/",
    officialAdmissionsWebsite: "https://www.macalester.edu/admissions/",
    commonDataSetLink: "https://www.macalester.edu/wp-content/uploads/2025/02/common-data-set.pdf",
    sourceLinks: [
      { label: "Macalester class profile", url: "https://www.macalester.edu/admissions/our-class/", type: "Official" },
      { label: "Macalester international applicants", url: "https://www.macalester.edu/admissions/apply/internationalstudents/", type: "Official" },
      { label: "Macalester testing policy", url: "https://www.macalester.edu/admissions/apply/standardizedtesting/", type: "Official" },
      { label: "Macalester tuition and fees", url: "https://www.macalester.edu/financialaid/tuitionandfees/", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/macalester-college/", type: "Niche" }
    ],
    acceptanceRateAll: "26%",
    dataClassOf: "Fall 2026 entering class profile and 2026–27 tuition pages",
    satActPolicy: "Test-optional",
    satRange: "1350–1480",
    admissionsObs1: "Macalester’s Fall 2026 class profile reports 10,048 applicants and 2,656 admitted students.",
    admissionsObs2: "Macalester has both Early Decision and Early Action, in addition to Regular Decision.",
    englishProficiencyScore: "English proficiency is not universally required, but Macalester encourages TOEFL, IELTS, or Duolingo from many international applicants; the class profile notes a mean TOEFL of 107 for a recent class and a prior middle 50% Duolingo range of 125–140.",
    englishObs: "Macalester’s reviewed pages frame English testing as recommended or situational rather than imposing one universal minimum for all applicants.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 15",
    earlyDeadline: "November 1",
    eaEdEd2: "EA + ED I + ED II",
    appObs1: "Early Decision II deadline is January 1.",
    appObs2: "Macalester does not charge an application fee.",
    totalUndergraduateStudents: "2,068",
    city: "Saint Paul, Minnesota",
    studentFacultyRatio: "10:1",
    internationalStudents: "16% of the entering class; 27% are citizens of a country other than the United States in the Fall 2026 profile.",
    internationalTuitionFees: "$74,394 tuition",
    totalCostOfAttendance: "$92,154 comprehensive fee (2026–27)",
    needBasedAidInternational: "Yes — Macalester meets 100% of every admitted student’s demonstrated need and offers structured need-based support to international students who apply for aid at admission.",
    meritScholarshipInternational: "Yes — all applicants are automatically considered for merit scholarships, and Macalester publishes named merit options for international students.",
    personalComments: "Macalester is particularly strong for students who want a globally oriented liberal arts college with a highly international student body and a strong social-justice ethos.",
    feeWaiver: "No application fee",
    academicsLikesDislikes: "Students often value Macalester’s global perspective, political engagement, and unusually international student body; the main trade-off is that it has the scale and constraints of a small liberal arts college rather than a large research university.",
    majors: ["Economics", "International Studies", "Political Science", "Biology", "Computer Science"],
    academicProgramming: ["Global engagement", "Strong merit and need-based aid", "Liberal arts curriculum"],
    highlights: ["26% admit rate", "1350–1480 SAT range", "10:1 student-faculty ratio", "16% international entering class"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official CDS",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Macalester’s Fall 2026 class profile reports 10,048 applicants and 2,656 admitted students, about a 26% admit rate."],
      satRange: ["Macalester’s 2025–26 CDS reports a 25th–75th percentile SAT composite range of 1350–1480."],
      regularDeadline: ["Macalester’s admissions pages list November 1 for Early Action and Early Decision I, January 1 for Early Decision II, and January 15 for Regular Decision."],
      feeWaiver: ["Macalester’s admissions and CDS materials indicate there is no application fee."],
      totalUndergraduateStudents: ["Macalester’s current institutional profile lists 2,068 students, with 2,046 full-time and 22 part-time."],
      internationalStudents: ["Macalester’s Fall 2026 profile lists 16% international students and 27% citizens of a country other than the United States."],
      needBasedAidInternational: ["Macalester’s financial-aid pages say it meets 100% of every admitted student’s demonstrated need and provides structured aid to international students who apply for aid at the time of admission."],
      meritScholarshipInternational: ["Macalester states that all applicants are automatically considered for merit scholarships and also publishes named scholarship options for international students."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Official CDS", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Middlebury College": {
    universityOverview: "Middlebury is especially famous for its language programs, environmental studies, and elite liberal arts academics in a highly residential campus setting. It is particularly strong in international and global studies, economics, English, computer science, and the humanities, and students benefit from close faculty relationships, strong off-campus study options, and a campus culture shaped by both intellectual seriousness and outdoor life.",
    nicheLink: "https://www.niche.com/colleges/middlebury-college/",
    admissionsLink: "https://www.niche.com/colleges/middlebury-college/admissions/",
    officialWebsite: "https://www.middlebury.edu/",
    officialAdmissionsWebsite: "https://www.middlebury.edu/admissions-aid",
    commonDataSetLink: "https://www.middlebury.edu/institutional-planning/files/2025-07/common-data-set-2024-2025.pdf",
    sourceLinks: [
      { label: "Middlebury class profile", url: "https://www.middlebury.edu/admissions-aid/apply/class-profile", type: "Official" },
      { label: "Middlebury application instructions", url: "https://www.middlebury.edu/admissions-aid/apply/first-year-applicants/application-instructions", type: "Official" },
      { label: "Middlebury international applicants", url: "https://www.middlebury.edu/admissions-aid/apply/first-year-applicants/international-students", type: "Official" },
      { label: "Middlebury tuition and fees", url: "https://www.middlebury.edu/student-financial-services/tuition-and-fees", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/middlebury-college/", type: "Niche" }
    ],
    acceptanceRateAll: "14.91%",
    dataClassOf: "Class of 2029 profile and 2026–27 tuition pages",
    satActPolicy: "Test-optional",
    satRange: "1460–1530",
    admissionsObs1: "Middlebury offers Early Decision I, Early Decision II, and Regular Decision.",
    admissionsObs2: "Middlebury’s official class profile reports 11,831 applications and a 14.91% admit rate for the Class of 2029.",
    englishProficiencyScore: "Accepted tests include TOEFL, IELTS, Duolingo, and Cambridge; successful applicants typically show strong scores, and Middlebury notes that average TOEFL scores for matriculants are around 109 while successful IELTS scores are usually 7.5+.",
    englishObs: "Middlebury requires English proficiency when the applicant’s native language is not English and schooling has not been fully in English for the relevant number of years.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 5",
    earlyDeadline: "November 3",
    eaEdEd2: "ED I + ED II",
    appObs1: "Middlebury’s application fee is $75 or fee waiver.",
    appObs2: "Financial-aid deadlines differ by round and must be tracked separately from application deadlines.",
    totalUndergraduateStudents: "Nearly 2,800 undergraduates enrolled",
    city: "Middlebury, Vermont",
    studentFacultyRatio: "9:1",
    internationalStudents: "13% of the Class of 2029, with 63 countries represented",
    internationalTuitionFees: "$72,924 tuition + $542 student activity fee",
    totalCostOfAttendance: "$97,386 (2026–27)",
    needBasedAidInternational: "Yes — Middlebury is need-aware for international applicants, but if admitted with aid the college says it meets full demonstrated need.",
    meritScholarshipInternational: "No — Middlebury states that it does not offer merit aid.",
    personalComments: "Middlebury is especially attractive for students who want a top liberal arts college with elite language programs, strong environmental studies, and full-need aid for admitted international students.",
    feeWaiver: "$75 fee or fee waiver",
    academicsLikesDislikes: "Students tend to like Middlebury’s language programs, environmental culture, and strong academics; the main trade-off is the rural Vermont setting and a more self-contained campus experience.",
    majors: ["Economics", "International and Global Studies", "Computer Science", "Neuroscience", "English"],
    academicProgramming: ["Language schools culture", "Environmental studies strength", "Liberal arts model"],
    highlights: ["14.91% admit rate", "1460–1530 SAT range", "9:1 student-faculty ratio", "No merit aid"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Middlebury’s official class profile reports 11,831 applications and a 14.91% admit rate for the Class of 2029."],
      satRange: ["Middlebury’s official class profile lists a 1460–1530 middle-50% SAT range."],
      regularDeadline: ["Middlebury’s application instructions list November 3 for ED I and January 5 for ED II and Regular Decision."],
      englishProficiencyScore: ["Middlebury’s international-students page and related admissions materials say accepted tests include TOEFL, IELTS, Duolingo, and Cambridge, and note that successful IELTS scores are generally 7.5+ and matriculant TOEFL scores average about 109."],
      totalUndergraduateStudents: ["Middlebury institutional materials reviewed describe nearly 2,800 undergraduates enrolled."],
      internationalStudents: ["Middlebury’s Class of 2029 profile lists 13% international students and 63 countries represented."],
      totalCostOfAttendance: ["Middlebury’s 2026–27 tuition-and-fees page lists tuition of $72,924, housing/meal of $20,920, and a student activity fee of $542, totaling $97,386."],
      meritScholarshipInternational: ["Middlebury’s financial-aid pages state that the college does not offer merit aid."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Official CDS", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Northwestern University": {
    universityOverview: "Northwestern is best known for combining major research-university breadth with especially strong programs in journalism, engineering, business, economics, communications, and the performing arts. Students benefit from Chicago-area access, strong pre-professional infrastructure, interdisciplinary flexibility, and a high-achieving environment that blends academic rigor with broad extracurricular opportunity.",
    nicheLink: "https://www.niche.com/colleges/northwestern-university/",
    admissionsLink: "https://www.niche.com/colleges/northwestern-university/admissions/",
    officialWebsite: "https://www.northwestern.edu/",
    officialAdmissionsWebsite: "https://admissions.northwestern.edu/",
    commonDataSetLink: "https://www.registrar.northwestern.edu/documents/cds/cds2024-2025.pdf",
    sourceLinks: [
      { label: "Northwestern CDS", url: "https://www.registrar.northwestern.edu/documents/cds/cds2024-2025.pdf", type: "Official CDS" },
      { label: "Northwestern apply page", url: "https://admissions.northwestern.edu/apply/", type: "Official" },
      { label: "Northwestern deadlines", url: "https://admissions.northwestern.edu/apply/application-deadlines-and-options.html", type: "Official" },
      { label: "Northwestern international applicants", url: "https://admissions.northwestern.edu/apply/international-students.html", type: "Official" },
      { label: "Northwestern tuition and aid", url: "https://admissions.northwestern.edu/tuition-aid/tuition-and-costs.html", type: "Official" }
    ],
    acceptanceRateAll: "7.7%",
    dataClassOf: "2024–25 CDS and current undergraduate admission pages",
    satActPolicy: "Test-optional through the current cycle reviewed",
    satRange: "1510–1560",
    admissionsObs1: "Northwestern offers Early Decision and Regular Decision.",
    admissionsObs2: "The 2024–25 CDS totals imply 49,474 applicants and 3,806 admits, which is about a 7.7% acceptance rate.",
    englishProficiencyScore: "Northwestern accepts Duolingo, IELTS, and TOEFL for applicants who need to demonstrate English proficiency and explicitly says there is no minimum score requirement.",
    englishObs: "The university evaluates English proficiency contextually and does not publish a hard minimum threshold on the reviewed undergraduate page.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 2",
    earlyDeadline: "November 1",
    eaEdEd2: "ED only",
    appObs1: "$75 application fee or fee waiver.",
    appObs2: "Northwestern is need-aware for international students, but it says it meets 100% of demonstrated need for admitted international students with grants and scholarships rather than loans.",
    totalUndergraduateStudents: "9,060",
    city: "Evanston, Illinois",
    studentFacultyRatio: "6:1",
    internationalStudents: "University-wide, Northwestern reports 4,913 international students from 142 countries; the reviewed undergraduate admissions snippets did not publish one single undergraduate-only percentage in the same place.",
    internationalTuitionFees: "$69,375 tuition",
    totalCostOfAttendance: "$96,236 estimated total annual cost (2025–26)",
    needBasedAidInternational: "Yes — Northwestern is need-aware for international applicants, but for admitted international students it says it meets 100% of demonstrated need and packages grants/scholarships without loans.",
    meritScholarshipInternational: "No broad academic merit scholarship model emphasized on the current undergraduate admissions and aid pages reviewed.",
    personalComments: "Northwestern is especially strong for students who want a highly selective research university with top programs across journalism, engineering, business, and the arts, plus Chicago-area access.",
    feeWaiver: "$75 fee or fee waiver",
    academicsLikesDislikes: "Students are usually drawn to Northwestern’s program breadth, strong pre-professional pathways, and proximity to Chicago; the trade-off is a very high-achieving and often intense student environment.",
    majors: ["Economics", "Computer Science", "Journalism", "Mechanical Engineering", "Communication"],
    academicProgramming: ["Top research university", "Chicago-area access", "Broad professional and liberal arts offerings"],
    highlights: ["7.7% admit rate", "1510–1560 SAT range", "6:1 student-faculty ratio", "$96,236 estimated total cost"],
    sourceMap: {
      acceptanceRateAll: "Official CDS",
      satActPolicy: "Official",
      satRange: "Official CDS",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official CDS",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official admissions and aid pages reviewed",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Northwestern’s 2024–25 CDS totals imply 49,474 applicants and 3,806 admitted students, about a 7.7% admit rate."],
      satRange: ["Northwestern’s 2024–25 CDS lists a 1510–1560 SAT composite range for the 25th–75th percentiles."],
      regularDeadline: ["Northwestern’s official deadlines page lists November 1 for Early Decision and January 2 for Regular Decision."],
      englishProficiencyScore: ["Northwestern’s international-students page says applicants may submit TOEFL, IELTS, or Duolingo and that there is no minimum score requirement."],
      totalUndergraduateStudents: ["Northwestern’s 2024–25 CDS reports 9,060 undergraduates."],
      studentFacultyRatio: ["Northwestern’s admissions and institutional facts materials report a 6:1 student-to-faculty ratio."],
      totalCostOfAttendance: ["Northwestern’s tuition-and-costs page lists an estimated total annual cost of $96,236 for 2025–26."],
      needBasedAidInternational: ["Northwestern’s international-aid page says the university is need-aware for international applicants but meets 100% of demonstrated need for admitted international students with grants and scholarships instead of loans."],
      feeWaiver: ["Northwestern’s application-fee page says the fee is $75 or fee waiver."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official aid pages", "Official CDS"],
    lastUpdated: "Audited embedded record"
  },
  "Oberlin College": {
    universityOverview: "Oberlin is especially known for its progressive campus culture, strong humanities and arts environment, and the distinctive combination of a liberal arts college with a conservatory of music. It is particularly attractive for students interested in politics, psychology, biology, economics, music, and socially engaged scholarship, and it offers a campus experience shaped by creative work, activism, and close faculty mentorship.",
    nicheLink: "https://www.niche.com/colleges/oberlin-college/",
    admissionsLink: "https://www.niche.com/colleges/oberlin-college/admissions/",
    officialWebsite: "https://www.oberlin.edu/",
    officialAdmissionsWebsite: "https://www.oberlin.edu/admissions-and-aid",
    commonDataSetLink: "https://www.oberlin.edu/sites/default/files/content/office_of_institutional_research/common_data_set_2024_2025.pdf",
    sourceLinks: [
      { label: "Oberlin class profile", url: "https://www.oberlin.edu/admissions-and-aid/admissions/first-year-profile", type: "Official" },
      { label: "Oberlin first-year applicants", url: "https://www.oberlin.edu/admissions-and-aid/admissions/first-year-applicants", type: "Official" },
      { label: "Oberlin international applicants", url: "https://www.oberlin.edu/admissions-and-aid/international-applicants", type: "Official" },
      { label: "Oberlin tuition and fees", url: "https://www.oberlin.edu/student-accounts/tuition-and-fees", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/oberlin-college/", type: "Niche" }
    ],
    acceptanceRateAll: "32.8%",
    dataClassOf: "Class of 2029 profile and 2025–26 tuition pages",
    satActPolicy: "Test-optional",
    satRange: "1390–1530",
    admissionsObs1: "Oberlin’s official first-year profile combines Arts & Sciences and Conservatory admissions and implies an overall admit rate of about 32.8%.",
    admissionsObs2: "Oberlin does not charge an application fee.",
    englishProficiencyScore: "Oberlin requires official TOEFL, IELTS, or Duolingo results when English is not the first language and schooling has not primarily been in English; the reviewed public materials did not publish one universal minimum score for all first-year applicants.",
    englishObs: "The admissions pages reviewed emphasized accepted English tests and score reporting rather than one single hard minimum threshold.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 15",
    earlyDeadline: "November 15",
    eaEdEd2: "ED I + ED II",
    appObs1: "Oberlin offers Early Decision I, Early Decision II, and Regular Decision.",
    appObs2: "Oberlin is need-aware for international applicants seeking aid, but says it meets 100% of calculated financial need for admitted students who apply for aid.",
    totalUndergraduateStudents: "2,886",
    city: "Oberlin, Ohio",
    studentFacultyRatio: "10:1 in Arts & Sciences; 6:1 in Conservatory",
    internationalStudents: "12% of the first-year class",
    internationalTuitionFees: "$68,340 tuition + $1,142 fees",
    totalCostOfAttendance: "$89,578 in direct billed costs before health insurance and other individualized expenses",
    needBasedAidInternational: "Yes — Oberlin says it meets 100% of calculated financial need for admitted international applicants who request aid, though the process is need-aware and aid is limited in volume.",
    meritScholarshipInternational: "Yes — Oberlin offers merit scholarships and says most first-year students are considered automatically for scholarship support.",
    personalComments: "Oberlin is especially compelling for students who want a progressive liberal arts environment, strong arts and music infrastructure, and a more activist campus culture than most peers.",
    feeWaiver: "No application fee",
    academicsLikesDislikes: "Students are often attracted by Oberlin’s socially engaged culture, strong humanities and arts, and Conservatory option; the main trade-off is a smaller-town setting and a campus culture that can feel ideologically intense for some students.",
    majors: ["Economics", "Politics", "Psychology", "Biology", "Music"],
    academicProgramming: ["College + Conservatory model", "Merit scholarships", "Progressive liberal arts environment"],
    highlights: ["32.8% admit rate", "1390–1530 SAT range", "No application fee", "12% international first-year class"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Oberlin’s first-year profile reports 10,428 Arts & Sciences applications and 1,850 Conservatory applications, with 4,031 total admits, which implies about a 32.8% admit rate."],
      satRange: ["Oberlin’s first-year profile lists SAT EBRW 710–760 and Math 680–770 for admitted Arts & Sciences students, equivalent to 1390–1530 combined."],
      feeWaiver: ["Oberlin’s first-year applicants pages explicitly say there is no application fee."],
      regularDeadline: ["Oberlin’s admissions pages list November 15 for ED I and January 15 for Regular Decision, with ED II also offered in January."],
      internationalStudents: ["Oberlin’s first-year profile lists 12% international students in the incoming class."],
      totalUndergraduateStudents: ["Oberlin’s current institutional figures list 2,886 undergraduate students."],
      studentFacultyRatio: ["Oberlin materials list a 10:1 ratio in Arts & Sciences and 6:1 in the Conservatory."],
      needBasedAidInternational: ["Oberlin’s international-aid pages state that the college meets 100% of calculated financial need for admitted international students who apply for aid, while also noting that admission is need-aware for this pool."],
      totalCostOfAttendance: ["Oberlin’s tuition-and-fees page lists $68,340 tuition, $9,970 housing, $10,126 food, and $1,142 fees for 2025–26, totaling $89,578 in direct billed costs."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official aid pages", "Official tuition pages", "Official CDS"],
    lastUpdated: "Audited embedded record"
  },
  "Amherst College": {
    universityOverview: "Amherst is especially famous for its open curriculum, which gives students unusual freedom to shape their academic path without a traditional core. It is particularly strong in economics, political science, mathematics, and interdisciplinary humanities work, and students benefit from small seminar-style classes, close faculty access, funded research, and cross-registration through the Five College Consortium.",
    nicheLink: "https://www.niche.com/colleges/amherst-college/",
    admissionsLink: "https://www.niche.com/colleges/amherst-college/admissions/",
    officialWebsite: "https://www.amherst.edu/",
    officialAdmissionsWebsite: "https://www.amherst.edu/admission",
    commonDataSetLink: "https://www.amherst.edu/system/files/C.%20First-Time%20First-Year%20Admission%202025-26_0.pdf",
    sourceLinks: [
      { label: "Niche profile", url: "https://www.niche.com/colleges/amherst-college/", type: "Niche" },
      { label: "Official admissions", url: "https://www.amherst.edu/admission", type: "Official" },
      { label: "International applicants", url: "https://www.amherst.edu/admission/apply/international", type: "Official" },
      { label: "Tuition and fees", url: "https://www.amherst.edu/offices/controller/student-accounts/tuition-and-fees", type: "Official" }
    ],
    acceptanceRateAll: "10%",
    dataClassOf: "Current public admissions and cost pages reviewed in March 2026",
    satActPolicy: "Test-optional",
    satRange: "1360–1550",
    admissionsObs1: "Amherst remains one of the most selective liberal arts colleges in the country.",
    admissionsObs2: "Amherst’s application fee is $75, but the college also has fee-waiver pathways including its Quick Pass option.",
    englishProficiencyScore: "IELTS 7.5+ and Duolingo 130+ are listed; TOEFL is required when applicable but a public minimum score was not visible in the reviewed snippets.",
    englishObs: "Amherst accepts self-reported or official English-proficiency results when required for international applicants.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 5",
    earlyDeadline: "November 7",
    eaEdEd2: "ED only",
    appObs1: "Amherst uses the Common App and Coalition with Scoir pathways plus institutional fee-waiver options.",
    appObs2: "Reply deadline for admitted students is May 1 on the first-year page reviewed.",
    totalUndergraduateStudents: "1,910 full-time",
    city: "Amherst Town, Massachusetts",
    studentFacultyRatio: "7:1",
    internationalStudents: "About 15%",
    internationalTuitionFees: "$73,140 tuition + $690 student activity fees (annualized from semester charges)",
    totalCostOfAttendance: "$90,720",
    needBasedAidInternational: "Yes — Amherst states it meets 100% of calculated financial need for all admitted international students who apply for need-based aid.",
    meritScholarshipInternational: "No merit scholarship model emphasized; Amherst centers need-based aid.",
    personalComments: "Amherst is especially attractive for students who want elite academics in a small liberal-arts environment with unusually strong international need-based aid.",
    feeWaiver: "$75 application fee or fee waiver, including Amherst Quick Pass",
    academicsLikesDislikes: "Students are usually drawn to Amherst’s open curriculum, close faculty contact, and small-college intellectual culture; the main trade-off is that it is a very small, residential environment rather than a big-city university.",
    majors: ["Mathematics", "Economics", "Research and Experimental Psychology"],
    academicProgramming: ["Open curriculum", "Liberal arts model", "Strong need-based aid for internationals"],
    highlights: ["Open curriculum", "7:1 student-faculty ratio", "About 15% international", "Strong need-based aid"],
    sourceMap: {
      acceptanceRateAll: "Niche",
      satActPolicy: "Official",
      satRange: "Niche",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Niche",
      earlyDeadline: "Niche",
      totalUndergraduateStudents: "Niche",
      city: "Niche",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Niche admissions page lists Amherst at 10%."],
      satRange: ["Niche admissions page lists 1360–1550."],
      studentFacultyRatio: ["Amherst admissions pages highlight a 7:1 student-to-faculty ratio."],
      internationalStudents: ["Amherst international admissions page says about 15% of students come from secondary schools outside the United States."],
      englishProficiencyScore: ["Amherst’s international admissions page lists Duolingo 130+ and IELTS 7.5+ in the public snippet reviewed."],
      feeWaiver: ["Amherst’s first-year page says the fee is $75 or fee waiver.", "Amherst also publishes a Quick Pass fee-waiver page."],
      needBasedAidInternational: ["Amherst states that it meets 100% of calculated financial need for admitted international students who apply for need-based aid."],
      totalCostOfAttendance: ["Amherst’s financial aid page lists a total cost of attendance of $90,720 in the public snippet reviewed."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Babson College": {
    universityOverview: "Babson is best known for entrepreneurship and business education, and it stands out for building practical venture creation into the undergraduate experience from the first year. Popular pathways include finance, business analytics, and entrepreneurship, and students gain access to experiential courses, startup-oriented projects, strong employer links, and a globally recognized entrepreneurship network.",
    nicheLink: "https://www.niche.com/colleges/babson-college/",
    admissionsLink: "https://www.niche.com/colleges/babson-college/admissions/",
    officialWebsite: "https://www.babson.edu/",
    officialAdmissionsWebsite: "https://www.babson.edu/undergraduate/how-to-apply/",
    commonDataSetLink: "https://www.babson.edu/media/babson/assets/rankings/babson-college-common-data-set.pdf",
    sourceLinks: [
      { label: "Niche profile", url: "https://www.niche.com/colleges/babson-college/", type: "Niche" },
      { label: "Class profile and acceptance rate", url: "https://www.babson.edu/undergraduate/how-to-apply/class-profile-and-acceptance-rate/", type: "Official" },
      { label: "International undergraduate applicants", url: "https://undergraduatecatalog.babson.edu/international-undergraduate-applicants", type: "Official" },
      { label: "Tuition and expenses", url: "https://www.babson.edu/undergraduate/tuition-and-financial-aid/tuition-and-expenses/", type: "Official" }
    ],
    acceptanceRateAll: "16%",
    dataClassOf: "Current class profile and 2026–27 cost pages reviewed in March 2026",
    satActPolicy: "Test-optional / considered but not required",
    satRange: "1450–1530",
    admissionsObs1: "Babson’s official class profile is more selective than the Niche public summary at the moment.",
    admissionsObs2: "Babson combines business focus, experiential learning, and a notably international incoming class.",
    englishProficiencyScore: "Babson accepts TOEFL, IELTS, Duolingo, and Cambridge for undergraduates when required, but the undergraduate page reviewed did not publish a minimum score.",
    englishObs: "The undergraduate international-applicants page lists accepted English tests but does not show a public minimum threshold in the reviewed text.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 2",
    earlyDeadline: "November 1",
    eaEdEd2: "EA + ED",
    appObs1: "Babson has both Early Action and Early Decision pathways according to current admissions summaries.",
    appObs2: "The public undergraduate pages reviewed did not prominently publish a blanket fee-waiver policy, though Babson does publicize some waiver pathways in other admissions contexts.",
    totalUndergraduateStudents: "2,720 full-time + 32 part-time",
    city: "Wellesley, Massachusetts",
    studentFacultyRatio: "15:1",
    internationalStudents: "26% of the incoming class",
    internationalTuitionFees: "$60,288 tuition",
    totalCostOfAttendance: "$86,966",
    needBasedAidInternational: "Yes, but limited — Babson says international students may be considered for need-based aid through programs such as Global Scholars and the Canadian Scholarship.",
    meritScholarshipInternational: "Yes — international students are considered for merit-based scholarships as part of the admission process.",
    personalComments: "Babson stands out if the student wants a business-first undergraduate experience with very strong entrepreneurship branding and practical exposure from the start.",
    feeWaiver: "An application fee exists, but a general undergraduate fee-waiver policy was not prominently stated on the undergraduate pages reviewed",
    academicsLikesDislikes: "Students who want entrepreneurship, applied business, and experiential work often see Babson as unusually strong; the trade-off is narrower academic breadth than at a broad liberal arts college or full-spectrum research university.",
    majors: ["Entrepreneurship", "Finance", "Business Analytics"],
    academicProgramming: ["Business-focused undergraduate curriculum", "Foundations of Management and Entrepreneurship", "Experiential learning"],
    highlights: ["16% admit rate", "1450–1530 SAT range", "15:1 student-faculty ratio", "26% international incoming class"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official + Niche",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Niche",
      earlyDeadline: "Niche",
      totalUndergraduateStudents: "Niche",
      city: "Curated list",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official + reviewed admissions materials",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Babson’s official class profile lists a 16% admit rate."],
      satRange: ["Babson’s official class profile lists a 1450–1530 middle-50% SAT range."],
      studentFacultyRatio: ["Babson academics page highlights a 15:1 student-to-faculty ratio."],
      internationalStudents: ["Babson’s class profile says 26% of the incoming class is international."],
      totalCostOfAttendance: ["Babson’s tuition and expenses page lists a total estimated cost of attendance of $86,966 for 2026–27."],
      needBasedAidInternational: ["Babson’s international aid page says international students may be considered for need-based aid through the Global Scholars program and the Canadian Scholarship."],
      meritScholarshipInternational: ["Babson’s international aid page says international students are considered for merit-based scholarships as part of admission."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official tuition pages", "Niche", "Babson class profile"],
    lastUpdated: "Audited embedded record"
  },
  "Barnard College": {
    universityOverview: "Barnard is famous for combining a women’s liberal arts college environment with direct academic access to Columbia University in New York City. It is especially strong in the humanities, social sciences, writing-intensive fields, and leadership development, while students benefit from small classes, Columbia cross-registration, research opportunities, and exceptional internship access in Manhattan.",
    nicheLink: "https://www.niche.com/colleges/barnard-college/",
    admissionsLink: "https://www.niche.com/colleges/barnard-college/admissions/",
    officialWebsite: "https://barnard.edu/",
    officialAdmissionsWebsite: "https://barnard.edu/admissions",
    commonDataSetLink: "https://barnard.edu/sites/default/files/inline-files/Barnard%20CDS%202024-2025.pdf",
    sourceLinks: [
      { label: "Niche profile", url: "https://www.niche.com/colleges/barnard-college/", type: "Niche" },
      { label: "Class of 2028 profile", url: "https://barnard.edu/first-year-class-profile", type: "Official" },
      { label: "International applicants", url: "https://barnard.edu/admissions/internationalstudents", type: "Official" },
      { label: "Cost of attendance", url: "https://barnard.edu/finaid/cost-of-attendance", type: "Official" }
    ],
    acceptanceRateAll: "9%",
    dataClassOf: "Class of 2028 profile and 2025–26 cost pages reviewed in March 2026",
    satActPolicy: "Test-optional through the 2027 first-year and transfer cycles",
    satRange: "1470–1540",
    admissionsObs1: "Barnard offers only Early Decision and Regular Decision for first-year applicants.",
    admissionsObs2: "For the 2026 cycle, Barnard’s published regular-decision page noted an extension from January 1 to January 11, 2026.",
    englishProficiencyScore: "Most competitive applicants generally show IELTS 7.5+, TOEFL 105+, or Duolingo 135+.",
    englishObs: "Barnard frames these as typical scores for the most competitive applicants rather than absolute cutoffs.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 1",
    earlyDeadline: "November 1",
    eaEdEd2: "ED only",
    appObs1: "$75 application fee or fee-waiver request through the application platform.",
    appObs2: "Barnard meets 100% of demonstrated financial need for admitted students, but it is need-aware for international applicants.",
    totalUndergraduateStudents: "3,217",
    city: "New York City, New York",
    studentFacultyRatio: "10:1",
    internationalStudents: "Need-aware for international applicants; 10% international in the older Class of 2026 profile, while the current pages emphasize global diversity without publishing a single all-college figure in the snippets reviewed",
    internationalTuitionFees: "$70,644 tuition + $2,389 fees",
    totalCostOfAttendance: "$99,874",
    needBasedAidInternational: "Yes — Barnard meets 100% of demonstrated need for admitted students, but international applicants are reviewed in a need-aware process.",
    meritScholarshipInternational: "No — Barnard explicitly says it does not offer merit-only scholarships.",
    personalComments: "Barnard is strongest for students who want a women’s college environment, full access to Columbia-linked academic resources, and New York City embedded into the academic experience.",
    feeWaiver: "$75 fee or fee-waiver request through the application platform",
    academicsLikesDislikes: "Students are usually attracted by the combination of a smaller women’s-college environment with Columbia access and New York opportunities; the main trade-off is the intensity and cost profile of studying in Manhattan.",
    majors: ["Economics", "Research and Experimental Psychology", "Political Science and Government"],
    academicProgramming: ["Columbia cross-registration", "Women’s college environment", "NYC academic ecosystem"],
    highlights: ["NYC location", "9% admit rate", "1470–1540 SAT range", "Meets full need for admitted students"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official CDS",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Barnard’s Class of 2028 profile reports a 9% admit rate."],
      satRange: ["Barnard’s Class of 2028 profile reports a 1470–1540 SAT mid-50% range."],
      studentFacultyRatio: ["Barnard’s 2024–25 CDS reports a 10:1 student-to-faculty ratio."],
      englishProficiencyScore: ["Barnard’s international-applicants page says the most competitive applicants generally present IELTS 7.5+, TOEFL 105+, or Duolingo 135+."],
      feeWaiver: ["Barnard’s first-year application process page says the fee is $75 or a fee-waiver request."],
      totalCostOfAttendance: ["Barnard’s financial-aid budget page lists $99,874 as the resident total basic budget for 2025–26."],
      meritScholarshipInternational: ["Barnard’s admissions catalog page says Barnard meets demonstrated need and does not offer merit-only scholarships."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official cost pages", "Niche", "Barnard CDS"],
    lastUpdated: "Audited embedded record"
  },
  "Bates College": {
    universityOverview: "Bates is well known for its long-standing test-optional philosophy, strong liberal arts teaching, and a campus culture that emphasizes intellectual seriousness with a progressive ethos. It is particularly respected in politics, economics, psychology, and the sciences, and students benefit from discussion-based classes, close professor interaction, undergraduate research, and strong support for civic and community engagement.",
    nicheLink: "https://www.niche.com/colleges/bates-college/",
    admissionsLink: "https://www.niche.com/colleges/bates-college/admissions/",
    officialWebsite: "https://www.bates.edu/",
    officialAdmissionsWebsite: "https://www.bates.edu/admission/",
    commonDataSetLink: "https://www.bates.edu/research/files/2025/09/CDS_2024-2025.pdf",
    sourceLinks: [
      { label: "Niche profile", url: "https://www.niche.com/colleges/bates-college/", type: "Niche" },
      { label: "International applicants", url: "https://www.bates.edu/admission/apply/international-students/", type: "Official" },
      { label: "Student financial services", url: "https://www.bates.edu/financial-services/", type: "Official" },
      { label: "Bates CDS", url: "https://www.bates.edu/research/files/2025/09/CDS_2024-2025.pdf", type: "Official CDS" }
    ],
    acceptanceRateAll: "13%",
    dataClassOf: "Current public admissions and cost materials reviewed in March 2026",
    satActPolicy: "Test-optional",
    satRange: "1400–1510",
    admissionsObs1: "Bates has been test-optional for a very long time and continues to apply that policy to international students.",
    admissionsObs2: "Bates meets full demonstrated financial need for admitted students regardless of citizenship, but it is not need-blind for non-U.S. citizens.",
    englishProficiencyScore: "TOEFL, IELTS, or Duolingo required when English is neither the native language nor the primary language of secondary-school instruction; no public minimum score was shown in the reviewed snippet.",
    englishObs: "Bates requires official English-proficiency scores and does not accept self-reported English scores.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 10",
    earlyDeadline: "December 1",
    eaEdEd2: "ED only",
    appObs1: "Bates uses Common App and accepts optional arts supplements through the application portal.",
    appObs2: "The Niche public page currently lists a $0 application fee.",
    totalUndergraduateStudents: "1,753",
    city: "Lewiston, Maine",
    studentFacultyRatio: "10:1",
    internationalStudents: "8% non-U.S. citizens; 100 countries represented in the fall 2023 student body materials reviewed",
    internationalTuitionFees: "Bates charges a single fee rather than separate tuition and standard room/board billing",
    totalCostOfAttendance: "$89,930 single fee before books, personal expenses, and transportation",
    needBasedAidInternational: "Yes — Bates says it meets the full demonstrated financial need of all admitted students regardless of citizenship for all four years.",
    meritScholarshipInternational: "No separate merit scholarship structure emphasized on the current main aid pages reviewed",
    personalComments: "Bates is especially attractive for students who want a rigorous liberal-arts environment, strong professor access, and one of the more generous need-based-aid models among small colleges.",
    feeWaiver: "No application fee listed on Niche’s current public admissions page",
    academicsLikesDislikes: "Students often emphasize engaged professors, strong writing and discussion-based classes, and a mission-driven campus culture; the trade-off is a smaller-town setting and a more intimate social environment.",
    majors: ["Economics", "Political Science and Government", "Research and Experimental Psychology"],
    academicProgramming: ["Liberal arts curriculum", "Test-optional since 1984", "Strong undergraduate teaching focus"],
    highlights: ["Test-optional", "10:1 student-faculty ratio", "Full need met for admitted internationals", "Strong professor access"],
    sourceMap: {
      acceptanceRateAll: "Niche",
      satActPolicy: "Official",
      satRange: "Niche",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Niche",
      earlyDeadline: "Niche",
      totalUndergraduateStudents: "Official + Niche",
      city: "Official",
      studentFacultyRatio: "Official CDS",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Niche",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Niche admissions page lists Bates at 13%."],
      satRange: ["Niche admissions page lists 1400–1510."],
      studentFacultyRatio: ["Bates CDS and catalog materials report a 10:1 student-to-faculty ratio."],
      totalCostOfAttendance: ["Bates Student Financial Services says the 2025–26 single fee is $89,930 before books, personal expenses, and transportation."],
      needBasedAidInternational: ["Bates’ international-undergraduates page says Bates meets the full demonstrated financial need of all admitted students regardless of citizenship for all four years."],
      englishProficiencyScore: ["Bates’ international-admissions page says TOEFL, IELTS, or Duolingo is required when English is neither the native language nor the primary language of instruction in secondary school."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official aid pages", "Niche", "Bates CDS"],
    lastUpdated: "Audited embedded record"
  },
  "Bennington College": {
    universityOverview: "Bennington is famous for its highly individualized academic model, where students build their own educational plans and connect classroom learning to real-world experience through the Field Work Term. It is especially strong in the arts, literature, performance, and interdisciplinary creative study, making it a distinctive option for students who want academic freedom, project-based learning, and close faculty mentorship.",
    nicheLink: "https://www.niche.com/colleges/bennington-college/",
    admissionsLink: "https://www.niche.com/colleges/bennington-college/admissions/",
    officialWebsite: "https://www.bennington.edu/",
    officialAdmissionsWebsite: "https://www.bennington.edu/admissions-and-financial-aid",
    commonDataSetLink: "https://www.bennington.edu/sites/default/files/sources/docs/cds_bennington_2024-2025_final.pdf",
    sourceLinks: [
      { label: "Niche profile", url: "https://www.niche.com/colleges/bennington-college/", type: "Niche" },
      { label: "Application requirements", url: "https://www.bennington.edu/admissions/apply/application-requirements", type: "Official" },
      { label: "International students", url: "https://www.bennington.edu/admissions/apply/applying-international-student", type: "Official" },
      { label: "Tuition and fees", url: "https://www.bennington.edu/admissions/apply/financing-your-education/tuition-and-fees", type: "Official" }
    ],
    acceptanceRateAll: "48%",
    dataClassOf: "Current public admissions and tuition pages reviewed in March 2026",
    satActPolicy: "Test-optional with a No-Harm Testing policy",
    satRange: "1290–1410",
    admissionsObs1: "Bennington is test-optional and also states that submitted SAT/ACT scores are only used if they help the applicant.",
    admissionsObs2: "Bennington offers Early Action, Early Decision, Regular Decision, and a Late Decision round.",
    englishProficiencyScore: "Typical successful applicants have at least TOEFL 100, IELTS 7, Duolingo 130, or PTE 70.",
    englishObs: "Bennington says these are typical successful ranges rather than absolute published minimums.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 15",
    earlyDeadline: "November 15",
    eaEdEd2: "EA + ED",
    appObs1: "Bennington has no application fee and no supplemental essay requirement on the main first-year page reviewed.",
    appObs2: "The current CDS shows both Early Action and Early Decision timing, and Bennington also publicizes a Late Decision round.",
    totalUndergraduateStudents: "728 full-time + 54 part-time",
    city: "North Bennington, Vermont",
    studentFacultyRatio: "8:1",
    internationalStudents: "The college emphasizes a diverse international applicant pool, but the reviewed public snippets did not provide one single current all-college percentage figure.",
    internationalTuitionFees: "$71,700 tuition + $1,200 fees",
    totalCostOfAttendance: "$96,000 for international students including estimated health insurance",
    needBasedAidInternational: "Yes — Bennington says international financial aid is limited and consists of institutional grants, scholarships, and on-campus employment; it also awards need-based aid broadly to undergraduates.",
    meritScholarshipInternational: "Yes — Bennington explicitly states that it awards both merit-based and need-based aid to undergraduates.",
    personalComments: "Bennington is especially strong for students who want unusual academic freedom, arts-heavy culture, individualized planning, and a less conventional admissions philosophy.",
    feeWaiver: "No application fee",
    academicsLikesDislikes: "Students who value creative autonomy and student-directed work often find Bennington unusually appealing; the trade-off is a smaller scale, more unconventional structure that may feel less traditional than peer colleges.",
    majors: ["Literature", "Visual and Performing Arts", "Drama and Theatre Production"],
    academicProgramming: ["Field Work Term", "Student-directed academic planning", "No-Harm Testing policy"],
    highlights: ["No application fee", "Test-optional with No-Harm Testing", "8:1 student-faculty ratio", "Field Work Term"],
    sourceMap: {
      acceptanceRateAll: "Niche",
      satActPolicy: "Official",
      satRange: "Niche",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official CDS + Niche",
      earlyDeadline: "Official CDS + Niche",
      totalUndergraduateStudents: "Niche",
      city: "Niche",
      studentFacultyRatio: "Official",
      internationalStudents: "Official admissions materials",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Niche admissions page lists Bennington at 48%."],
      satRange: ["Niche admissions page lists 1290–1410."],
      englishProficiencyScore: ["Bennington’s international-student page says successful applicants typically present TOEFL 100, IELTS 7, Duolingo 130, or PTE 70."],
      feeWaiver: ["Bennington’s application requirements page explicitly says there is no application fee."],
      studentFacultyRatio: ["Bennington Fast Facts lists an 8:1 student-to-faculty ratio."],
      totalCostOfAttendance: ["Bennington’s 2026–27 tuition page lists $96,000 for international students including estimated health insurance."],
      meritScholarshipInternational: ["Bennington’s affordability pages say the college awards both merit-based and need-based aid to undergraduates."],
      regularDeadline: ["Bennington’s 2024–25 CDS shows January 15 for regular decision, November 15 for Early Action, and December 1 for the first Early Decision plan."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official tuition pages", "Niche", "Bennington CDS"],
    lastUpdated: "Audited embedded record"
  },
  "Fordham University": {
    universityOverview: "Fordham is especially known for combining a Jesuit liberal arts foundation with strong access to New York City internships, finance, media, policy, and law-related opportunities. It is particularly strong in business, political science, psychology, communications, and the humanities, and students benefit from city-based professional exposure, two major campuses, and a curriculum that blends career preparation with broad intellectual training.",
    nicheLink: "https://www.niche.com/colleges/fordham-university/",
    admissionsLink: "https://www.niche.com/colleges/fordham-university/admissions/",
    officialWebsite: "https://www.fordham.edu/",
    officialAdmissionsWebsite: "https://www.fordham.edu/undergraduate-admission/",
    commonDataSetLink: "https://www.fordham.edu/media/review/content-assets/migrated/pdfs/jadu-single-folder-pdfs/Common_Data_Set_2013_2014.pdf",
    sourceLinks: [
      { label: "Fordham admission facts", url: "https://www.fordham.edu/undergraduate-admission/why-fordham/admission-facts/", type: "Official" },
      { label: "Fordham apply page", url: "https://www.fordham.edu/undergraduate-admission/apply/", type: "Official" },
      { label: "Fordham international students", url: "https://www.fordham.edu/undergraduate-admission/international-students/", type: "Official" },
      { label: "Fordham undergraduate tuition", url: "https://www.fordham.edu/student-financial-services/tuition-and-payments/undergraduate-tuition/", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/fordham-university/", type: "Niche" }
    ],
    acceptanceRateAll: "58%",
    dataClassOf: "Class of 2029 admission facts and current tuition pages",
    satActPolicy: "Test-optional",
    satRange: "1380–1490",
    admissionsObs1: "Fordham’s public admission-facts page shows 43,640 completed applications and a 58% acceptance rate.",
    admissionsObs2: "Fordham’s international page states that applicants applying from outside the United States are not required to submit SAT or ACT scores.",
    englishProficiencyScore: "Fordham requires English proficiency for many international applicants; the page reviewed explicitly mentions TOEFL iBT beginning January 2026 and accepted English tests, but the snippet available did not show a full universal minimum table.",
    englishObs: "English testing is required when applicable, and Fordham’s international FAQ says SAT/ACT are not required for applicants applying from outside the United States.",
    duolingoAccepted: "Not clearly confirmed on the specific undergraduate page snippets reviewed",
    regularDeadline: "January 15",
    earlyDeadline: "November 1",
    eaEdEd2: "EA + ED",
    appObs1: "Fordham’s application fee is $80.",
    appObs2: "Fordham participates in SAT fee-waiver and NACAC fee-waiver pathways.",
    totalUndergraduateStudents: "9,645",
    city: "Bronx / New York City, New York",
    studentFacultyRatio: "14:1",
    internationalStudents: "Countries with highest numbers of international students include Vietnam, China, India, Canada, Brazil, Georgia, Italy, and France; Fordham’s public admissions pages emphasize a substantial international presence but the snippets reviewed did not provide one single all-undergraduate percentage.",
    internationalTuitionFees: "$65,920 tuition + typical fees around $1,825 to $2,000, depending on school/campus and year",
    totalCostOfAttendance: "$93,925 estimated direct expenses for Lincoln Center residents in 2025–26, before indirect costs",
    needBasedAidInternational: "Yes — Fordham says new first-year international applicants on non-immigrant visas may be eligible for partial need-based aid, but the process is need-aware and applicants must demonstrate an ability to fund at least $35,000 per year.",
    meritScholarshipInternational: "Yes — Fordham publishes international scholarships, including the full-tuition Fordham Scholarship and Dean’s Scholarship.",
    personalComments: "Fordham is a strong fit for students who want a major-city Jesuit university with broad merit options, strong NYC access, and a more flexible admissions profile than the ultra-selective schools in the list.",
    feeWaiver: "$80 fee; SAT fee-waiver and NACAC waiver options recognized",
    academicsLikesDislikes: "Students often value the New York setting, internship access, and Jesuit liberal-arts foundation; the main trade-off is that the school is less intimate and less uniformly elite than the most selective private universities in the dashboard.",
    majors: ["Finance", "Political Science", "Psychology", "Communications", "Business Administration"],
    academicProgramming: ["Jesuit liberal arts core", "NYC internship access", "Rose Hill and Lincoln Center campuses"],
    highlights: ["58% admit rate", "1380–1490 SAT middle 50 for admitted score-submitters", "Test-optional", "$80 fee"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official reviewed materials",
      regularDeadline: "Official + Niche",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Fordham’s admission-facts page lists 43,640 completed applications, 25,207 offers of admission, and a 58% acceptance rate."],
      satRange: ["Fordham’s Class of 2029 academic profile lists an admitted-student SAT middle 50% of 1380–1490."],
      satActPolicy: ["Fordham’s testing policy page says SAT/ACT are not required for admission or scholarship consideration."],
      regularDeadline: ["Fordham’s public admissions timelines and Niche both point to a January 15 regular-decision timeline."],
      feeWaiver: ["Fordham’s apply page states it participates in College Board SAT-to-college fee-waiver and NACAC fee-waiver programs."],
      meritScholarshipInternational: ["Fordham’s international scholarships page describes the full-tuition Fordham Scholarship and the Dean’s Scholarship."],
      needBasedAidInternational: ["Fordham’s international-students page says non-immigrant-visa first-year applicants may be eligible for partial need-based aid and must show at least $35,000 annual funding ability."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official tuition pages", "Official scholarship pages", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Grinnell College": {
    universityOverview: "Grinnell is widely known for its highly intellectual liberal arts environment, unusually international student body, and strong support for independent academic exploration. It is especially respected in economics, political science, computer science, psychology, and the social sciences, and students benefit from Mentored Advanced Projects, close faculty guidance, and a campus culture that strongly values research, writing, and critical thought.",
    nicheLink: "https://www.niche.com/colleges/grinnell-college/",
    admissionsLink: "https://www.niche.com/colleges/grinnell-college/admissions/",
    officialWebsite: "https://www.grinnell.edu/",
    officialAdmissionsWebsite: "https://www.grinnell.edu/admission",
    commonDataSetLink: "https://www.grinnell.edu/doc/grinnell-college-common-data-set-2024-2025",
    sourceLinks: [
      { label: "Grinnell class of 2029 story", url: "https://www.grinnell.edu/news/across-map-heart-iowa-welcoming-class-2029", type: "Official" },
      { label: "Grinnell at a glance", url: "https://www.grinnell.edu/about/grinnell-glance", type: "Official" },
      { label: "Grinnell first-year requirements", url: "https://www.grinnell.edu/admission/apply/first-year/requirements", type: "Official" },
      { label: "Grinnell international applicants", url: "https://www.grinnell.edu/admission/apply/international", type: "Official" },
      { label: "Grinnell cost of attendance", url: "https://www.grinnell.edu/admission/financial-aid/cost-attendance", type: "Official" }
    ],
    acceptanceRateAll: "16%",
    dataClassOf: "Class of 2029 and 2026–27 fee pages",
    satActPolicy: "Test-optional",
    satRange: "1450–1560",
    admissionsObs1: "Grinnell’s class-of-2029 materials report over 9,300 actionable applications and a 16% admit rate.",
    admissionsObs2: "Grinnell does not charge an application fee.",
    englishProficiencyScore: "TOEFL, IELTS, or Duolingo required when applicable; the mean TOEFL for the class of 2028 was 107, and the previous middle 50% Duolingo range was 125–140.",
    englishObs: "Grinnell’s first-year requirements page gives reference values for admitted students rather than publishing one universal minimum cutoff.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 15",
    earlyDeadline: "November 15",
    eaEdEd2: "ED I + ED II",
    appObs1: "Grinnell’s Early Decision I deadline is November 15 and Early Decision II deadline is January 5.",
    appObs2: "Grinnell offers merit scholarship consideration with a priority deadline around December 1 but also considers all applicants automatically.",
    totalUndergraduateStudents: "1,775",
    city: "Grinnell, Iowa",
    studentFacultyRatio: "9:1",
    internationalStudents: "About one in five students is international; students come from 60+ citizenships.",
    internationalTuitionFees: "$74,154 total tuition and fees (2026–27)",
    totalCostOfAttendance: "$91,938 (2026–27 comprehensive fee before transportation/personal estimates are added)",
    needBasedAidInternational: "Yes — Grinnell says it wants to meet full need in most cases for international students and in formal aid guidance states it meets 100% of demonstrated need as calculated at the time of admission.",
    meritScholarshipInternational: "Yes — Grinnell considers all eligible applicants automatically for scholarships, with some priority given by round/timing.",
    personalComments: "Grinnell is one of the strongest options for students seeking a highly academic liberal arts college with no application fee, unusually generous aid philosophy, and a very international campus culture.",
    feeWaiver: "No application fee",
    academicsLikesDislikes: "Students tend to like Grinnell’s intellectual seriousness, open curriculum elements, and strong support for research and MAPs; the main trade-off is the small-town Iowa setting.",
    majors: ["Economics", "Computer Science", "Political Science", "Psychology", "Biology"],
    academicProgramming: ["Open curriculum elements", "Mentored Advanced Projects (MAPs)", "28 majors and 17 concentrations"],
    highlights: ["16% admit rate", "1450–1560 SAT range", "9:1 student-faculty ratio", "No application fee"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official CDS",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Grinnell’s Class of 2029 welcome story reports over 9,300 actionable applications and 16% offered admission."],
      satRange: ["Grinnell at a Glance lists SAT EBRW 720–770 and SAT Math 730–790, equivalent to 1450–1560 combined."],
      englishProficiencyScore: ["Grinnell’s first-year requirements page says the mean TOEFL for the class of 2028 was 107 and the prior middle 50% DET range was 125–140."],
      feeWaiver: ["Grinnell’s first-year and QuestBridge pages explicitly state that Grinnell does not charge an application fee."],
      totalUndergraduateStudents: ["Grinnell’s 2023–24 CDS reports 1,775 total undergraduates."],
      internationalStudents: ["Grinnell’s admitted-student and at-a-glance pages say one in five students is international and the student body represents 60+ citizenships."],
      needBasedAidInternational: ["Grinnell’s international-aid materials state that the college meets 100% of demonstrated need as calculated at the time of admission."],
      totalCostOfAttendance: ["Grinnell’s 2026–27 comprehensive fee announcement lists a total of $91,938 before transportation and other individualized estimates."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Official fee pages", "Official CDS"],
    lastUpdated: "Audited embedded record"
  },
  "Haverford College": {
    universityOverview: "Haverford is especially known for its Honor Code, deeply discussion-based academic culture, and highly personalized liberal arts experience. It is particularly strong in economics, biology, political science, chemistry, and mathematics, and students benefit from small classes, close advising, and extensive cross-registration through the Tri-College and Quaker consortium networks.",
    nicheLink: "https://www.niche.com/colleges/haverford-college/",
    admissionsLink: "https://www.niche.com/colleges/haverford-college/admissions/",
    officialWebsite: "https://www.haverford.edu/",
    officialAdmissionsWebsite: "https://www.haverford.edu/admission",
    commonDataSetLink: "https://www.haverford.edu/sites/default/files/Office/President/CDS_2024-2025.pdf",
    sourceLinks: [
      { label: "Haverford class profile", url: "https://www.haverford.edu/admission/class-profile", type: "Official" },
      { label: "Haverford application timeline", url: "https://www.haverford.edu/admission/applying/application-timeline", type: "Official" },
      { label: "Haverford international students", url: "https://www.haverford.edu/admission/applying/international-students", type: "Official" },
      { label: "Haverford cost of attendance", url: "https://www.haverford.edu/financial-aid/cost-of-attendance", type: "Official" },
      { label: "Haverford about", url: "https://www.haverford.edu/about", type: "Official" }
    ],
    acceptanceRateAll: "13.3%",
    dataClassOf: "Class of 2029 and 2026–27 cost pages",
    satActPolicy: "Test-optional",
    satRange: "1440–1540",
    admissionsObs1: "Haverford offers Early Decision I, Early Decision II, and Regular Decision.",
    admissionsObs2: "Haverford has a $65 application fee, but the fee can be waived when a counselor or school official explains the financial circumstances.",
    englishProficiencyScore: "Minimum required scores: TOEFL iBT 100, IELTS 7.0, Duolingo 130",
    englishObs: "Haverford explicitly states there is no preferred exam among TOEFL, IELTS, and Duolingo.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 10",
    earlyDeadline: "November 15",
    eaEdEd2: "ED I + ED II",
    appObs1: "Early Decision II deadline is January 5.",
    appObs2: "Haverford does not require a financial deposit from admitted students who decide to enroll; it simply asks for a commitment by May 1.",
    totalUndergraduateStudents: "1,420",
    city: "Haverford, Pennsylvania",
    studentFacultyRatio: "9:1",
    internationalStudents: "Students in the Class of 2029 come from 21 countries; current institutional materials also describe aid for a limited number of international students each year.",
    internationalTuitionFees: "$75,586 tuition + $556 student government fee + $314 first-year orientation fee (2026–27)",
    totalCostOfAttendance: "At least $96,472 in tuition, fees, and orientation before adding housing/food and other indirect costs shown in other Haverford cost materials",
    needBasedAidInternational: "Yes — aid is limited in quantity, but Haverford states it meets 100% of demonstrated need for admitted international students.",
    meritScholarshipInternational: "No — Haverford’s aid is described as entirely need-based.",
    personalComments: "Haverford is especially compelling for students who want a highly personal and intellectually serious liberal arts environment with strong full-need aid for those international students who are admitted with aid.",
    feeWaiver: "$65 fee; waiver available with counselor or school-official letter explaining hardship",
    academicsLikesDislikes: "Students usually value Haverford’s close faculty engagement, Honor Code culture, and suburban access to Philadelphia; the trade-off is a smaller scale and a quieter social environment than larger universities.",
    majors: ["Economics", "Biology", "Political Science", "Chemistry", "Mathematics"],
    academicProgramming: ["Honor Code", "Tri-College Consortium", "Bi-College and Quaker consortium access"],
    highlights: ["13.3% admit rate", "1440–1540 SAT range", "9:1 student-faculty ratio", "100% of need met for admitted internationals"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Haverford’s admission homepage lists 6,730 applications and a 13.3% admit rate for the Class of 2029."],
      satRange: ["Haverford’s Class of 2029 page lists SAT EBR 720–760 and SAT Math 720–780, equivalent to 1440–1540 combined."],
      englishProficiencyScore: ["Haverford’s international-students page requires a minimum TOEFL 100, IELTS 7.0, or Duolingo 130."],
      regularDeadline: ["Haverford’s application timeline and application-instructions pages list November 15 for ED I, January 5 for ED II, and January 10 for Regular Decision."],
      totalUndergraduateStudents: ["Haverford’s About page lists 1,420 students."],
      studentFacultyRatio: ["Haverford’s About and Why Haverford pages list a 9:1 student-to-faculty ratio."],
      feeWaiver: ["Haverford’s international-students page says the fee can be waived if a counselor or other school official writes a letter explaining the circumstances."],
      needBasedAidInternational: ["Haverford’s financial-aid pages say aid is limited in number for international students, but that the college meets 100% of demonstrated need for all admitted students, including international students."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Official CDS", "Official facts pages"],
    lastUpdated: "Audited embedded record"
  },
  "Johns Hopkins University": {
    universityOverview: "Johns Hopkins is best known for its research intensity, especially in medicine, public health, biomedical engineering, and the sciences, but it is also very strong in international studies and policy-oriented fields. Students benefit from major research access from early on, deep ties to hospitals and labs, and a highly ambitious academic environment built around discovery, innovation, and pre-professional excellence.",
    nicheLink: "https://www.niche.com/colleges/johns-hopkins-university/",
    admissionsLink: "https://www.niche.com/colleges/johns-hopkins-university/admissions/",
    officialWebsite: "https://www.jhu.edu/",
    officialAdmissionsWebsite: "https://apply.jhu.edu/",
    commonDataSetLink: "https://oira.jhu.edu/wp-content/uploads/CDS_2024-2025_JHU.pdf",
    sourceLinks: [
      { label: "Hopkins fast facts", url: "https://apply.jhu.edu/fast-facts/", type: "Official" },
      { label: "Hopkins application requirements", url: "https://apply.jhu.edu/how-to-apply/application-deadlines-requirements/", type: "Official" },
      { label: "Hopkins international applicants", url: "https://apply.jhu.edu/international-applicants/", type: "Official" },
      { label: "Hopkins tuition and aid", url: "https://apply.jhu.edu/tuition-aid/estimate-your-college-costs/", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/johns-hopkins-university/", type: "Niche" }
    ],
    acceptanceRateAll: "8%",
    dataClassOf: "Homewood Class of 2029 and 2025–26 tuition-and-aid pages",
    satActPolicy: "Required",
    satRange: "1530–1570",
    admissionsObs1: "Hopkins requires SAT or ACT for first-year applicants.",
    admissionsObs2: "International admission is need-aware, but Hopkins meets 100% of demonstrated need for admitted international students and says that about 10% of international students receive financial aid.",
    englishProficiencyScore: "TOEFL, IELTS, Duolingo DET, or Cambridge recommended for applicants whose primary language is not English or who have not attended an English-language school for the last three years; the reviewed pages did not publish one fixed minimum threshold.",
    englishObs: "Hopkins frames these exams as recommended rather than listing a universal required minimum score in the reviewed undergraduate pages.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 2",
    earlyDeadline: "November 1",
    eaEdEd2: "ED I + ED II",
    appObs1: "The first-year application fee is $70 or fee waiver.",
    appObs2: "Hopkins does not provide CSS fee waivers for international applicants and instead suggests using the free JHU ISFAA when the CSS Profile is not feasible.",
    totalUndergraduateStudents: "6,356",
    city: "Baltimore, Maryland",
    studentFacultyRatio: "6:1",
    internationalStudents: "800+ international undergraduates from 100+ countries; 13.5% international in the Homewood first-year class breakdown",
    internationalTuitionFees: "The reviewed undergraduate cost page gives a total estimate rather than a separate tuition-only figure; cost of attendance is estimated at $92,000 for 2025–26.",
    totalCostOfAttendance: "$92,000 estimated total cost of attendance (2025–26)",
    needBasedAidInternational: "Yes — Hopkins is need-aware for international applicants, but it promises to meet 100% of demonstrated need for admitted international students without loans.",
    meritScholarshipInternational: "Yes — Hopkins has selective merit programs such as the Westgate Scholarship and Clark Scholars pathway for eligible students.",
    personalComments: "Hopkins is one of the strongest options for students who want top-tier STEM, public health, research, and pre-professional infrastructure, with strong outcomes and growing affordability messaging.",
    feeWaiver: "$70 fee or fee waiver; separate fee-waiver request form available if needed",
    academicsLikesDislikes: "Students are usually attracted by the research intensity, internship opportunities, and very strong science and engineering profile; the trade-off is an intense academic culture that can feel more demanding and pre-professional than at some peers.",
    majors: ["Public Health", "Biomedical Engineering", "Neuroscience", "Computer Science", "International Studies"],
    academicProgramming: ["55 undergraduate majors", "Research-intensive environment", "Strong pre-professional pathways"],
    highlights: ["8% admit rate", "1530–1570 SAT range", "6:1 student-faculty ratio", "$92,000 estimated COA"],
    sourceMap: {
      acceptanceRateAll: "Niche",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official CDS",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Niche’s current public admissions page lists Johns Hopkins at 8%."],
      satRange: ["Hopkins Fast Facts lists a 1530–1570 SAT middle 50% for the Homewood Class of 2029."],
      satActPolicy: ["Hopkins standardized-testing page says first-year applicants must submit SAT or ACT scores to be considered for admission."],
      regularDeadline: ["Hopkins financial-aid and application-requirements pages list November 1 for ED I and January 2 for ED II and Regular Decision, with financial-aid deadlines of November 15 and January 15 respectively."],
      totalUndergraduateStudents: ["The 2024–25 JHU CDS reports 6,356 total undergraduates."],
      internationalStudents: ["Hopkins international-applicants page says there are 800+ international undergraduates from 100+ countries.", "Hopkins Fast Facts list 13.5% international in the Homewood first-year class breakdown."],
      feeWaiver: ["Hopkins application requirements page lists a $70 application fee or fee waiver, and says a fee-waiver request form can be used when needed."],
      needBasedAidInternational: ["Hopkins international-applicants and financial-aid pages say Hopkins is need-aware for international students but meets 100% of demonstrated need for admitted international students without loans."],
      totalCostOfAttendance: ["Hopkins estimate-your-college-costs page lists a 2025–26 cost of attendance estimate of $92,000."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official aid pages", "Official CDS", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Dartmouth College": {
    universityOverview: "Dartmouth is especially known for being the most undergraduate-centered of the Ivies, combining elite academics with a strong residential and community-driven campus culture. It is particularly strong in economics, government, computer science, and the liberal arts, and students benefit from the D-Plan quarter system, close faculty access, strong alumni engagement, and a very distinctive sense of campus identity.",
    nicheLink: "https://www.niche.com/colleges/dartmouth-college/",
    admissionsLink: "https://www.niche.com/colleges/dartmouth-college/admissions/",
    officialWebsite: "https://www.dartmouth.edu/",
    officialAdmissionsWebsite: "https://admissions.dartmouth.edu/",
    commonDataSetLink: "https://www.dartmouth.edu/oir/pdfs/cds_2024-2025.pdf",
    sourceLinks: [
      { label: "Dartmouth class profile", url: "https://admissions.dartmouth.edu/sites/admissions.prod/files/admissions/wysiwyg/class29profile_fin.pdf", type: "Official" },
      { label: "Dartmouth testing policy", url: "https://admissions.dartmouth.edu/apply/testing-policy", type: "Official" },
      { label: "Dartmouth international students", url: "https://admissions.dartmouth.edu/glossary-term/international-students", type: "Official" },
      { label: "Dartmouth cost of attendance", url: "https://admissions.dartmouth.edu/estimate-your-cost/cost-attendance", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/dartmouth-college/", type: "Niche" }
    ],
    acceptanceRateAll: "6%",
    dataClassOf: "Class of 2029 profile and current cost pages",
    satActPolicy: "Required",
    satRange: "1500–1570",
    admissionsObs1: "Dartmouth reactivated its standardized testing requirement beginning with applicants to the Class of 2029.",
    admissionsObs2: "Dartmouth practices need-blind admission for all applicants, including international students.",
    englishProficiencyScore: "TOEFL, IELTS, Duolingo, or Cambridge accepted when required; the reviewed public page did not publish a minimum score threshold.",
    englishObs: "Dartmouth requires a language-proficiency exam if English is not the student’s first language and the curriculum has not been delivered in English for at least two years.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 1",
    earlyDeadline: "November 1",
    eaEdEd2: "ED only",
    appObs1: "The first-year application fee is $85, and Dartmouth offers fee-waiver pathways through the Common App.",
    appObs2: "International applicants with serious CSS Profile hardship may use the ISFAA instead.",
    totalUndergraduateStudents: "4,419 full-time + 28 part-time",
    city: "Hanover, New Hampshire",
    studentFacultyRatio: "6.3:1",
    internationalStudents: "Class of 2028 represented 65 countries; 15% of admitted students in the Class of 2026 were international citizens",
    internationalTuitionFees: "$69,207 tuition + $2,318 fees",
    totalCostOfAttendance: "$92,445 in billed tuition, fees, housing, and food before indirect expenses",
    needBasedAidInternational: "Yes — Dartmouth is need-blind for international applicants and meets full demonstrated need for admitted students.",
    meritScholarshipInternational: "No broad institutional merit scholarship model emphasized; aid is primarily need-based.",
    personalComments: "Dartmouth is a strong fit for students who want Ivy-level resources in a smaller, more undergraduate-centered environment with unusually strong international need-based aid.",
    feeWaiver: "$85 application fee or fee waiver",
    academicsLikesDislikes: "Students are usually attracted by Dartmouth’s undergraduate focus, strong school spirit, and close professor access; the trade-off is a smaller-town setting with a more self-contained campus life.",
    majors: ["Economics", "Political Science and Government", "Computer Science"],
    academicProgramming: ["D-Plan quarter system", "Undergraduate-focused Ivy", "Liberal arts plus research"],
    highlights: ["6% admit rate", "1500–1570 SAT range", "Need-blind for internationals", "6.3:1 student-faculty ratio"],
    sourceMap: {
      acceptanceRateAll: "Official + Niche",
      satActPolicy: "Official",
      satRange: "Niche",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official + Niche",
      earlyDeadline: "Official + Niche",
      totalUndergraduateStudents: "Niche",
      city: "Niche",
      studentFacultyRatio: "Official CDS",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Dartmouth’s Class of 2029 profile reports 28,230 applications and a 6% admit rate."],
      satRange: ["Niche admissions page lists a 1500–1570 SAT range."],
      satActPolicy: ["Dartmouth’s official testing page says testing was reactivated for the Class of 2029."],
      studentFacultyRatio: ["Dartmouth’s 2024–25 CDS reports a 6.3 to 1 student-to-faculty ratio."],
      feeWaiver: ["Dartmouth’s admissions glossary says the first-year application fee is $85 and can be waived for financial hardship."],
      needBasedAidInternational: ["Dartmouth’s international-students page states that the college is need-blind and meets full demonstrated need for admitted students."],
      totalCostOfAttendance: ["Dartmouth’s cost-of-attendance page lists tuition of $69,207, fees of $2,318, housing of $12,579, and food of $8,341."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official CDS", "Official cost pages", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Davidson College": {
    universityOverview: "Davidson is known for combining elite liberal arts teaching with an unusually strong undergraduate focus and a deep culture of mentorship and honor. It is especially respected in economics, political science, biology, and humanities disciplines, and students benefit from small classes, close professor relationships, funded research, and a campus atmosphere built around academic seriousness and community trust.",
    nicheLink: "https://www.niche.com/colleges/davidson-college/",
    admissionsLink: "https://www.niche.com/colleges/davidson-college/admissions/",
    officialWebsite: "https://www.davidson.edu/",
    officialAdmissionsWebsite: "https://www.davidson.edu/admission-and-financial-aid",
    commonDataSetLink: "https://www.davidson.edu/offices-and-services/institutional-effectiveness/common-data-set",
    sourceLinks: [
      { label: "Davidson class profile", url: "https://www.davidson.edu/admission-and-financial-aid/incoming-class-statistics", type: "Official" },
      { label: "Davidson apply page", url: "https://www.davidson.edu/admission-and-financial-aid/apply", type: "Official" },
      { label: "Davidson international applicants", url: "https://www.davidson.edu/admission-and-financial-aid/apply/international-applicants", type: "Official" },
      { label: "Davidson cost of attendance", url: "https://www.davidson.edu/admission-and-financial-aid/cost-attendance", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/davidson-college/", type: "Niche" }
    ],
    acceptanceRateAll: "12.6%",
    dataClassOf: "Class of 2029 profile and 2026–27 cost pages",
    satActPolicy: "Test-optional",
    satRange: "1400–1520",
    admissionsObs1: "Davidson offers Early Decision I, Early Decision II, and Regular Decision.",
    admissionsObs2: "Davidson is one of the small group of colleges that says it admits students independent of ability to pay, meets full calculated need, and does so without loans in the aid package, while international admission remains need-aware.",
    englishProficiencyScore: "Davidson says students best prepared typically have DET 130+, IELTS 7+, and comparable TOEFL-level proficiency.",
    englishObs: "Davidson requires TOEFL, IELTS, or Duolingo for many international applicants and allows waivers in specified English-medium cases.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 12",
    earlyDeadline: "November 15",
    eaEdEd2: "ED I + ED II",
    appObs1: "Early Decision II deadline is January 5.",
    appObs2: "International applicants automatically receive an application fee waiver when citizenship is selected in the Common App or Coalition application.",
    totalUndergraduateStudents: "2,080 students",
    city: "Davidson, North Carolina",
    studentFacultyRatio: "8:1",
    internationalStudents: "11% of the community, from more than 50 countries",
    internationalTuitionFees: "$73,090 tuition + $650 required fees + $250 orientation fee",
    totalCostOfAttendance: "$95,995 estimated first-year international cost of attendance (2026–27)",
    needBasedAidInternational: "Yes — Davidson is need-aware for international applicants but says it meets 100% of calculated need and does so without loans in aid packages.",
    meritScholarshipInternational: "Selective named scholarships exist, but Davidson’s main published model centers need-based aid.",
    personalComments: "Davidson is especially attractive for students who want elite teaching quality, a true undergraduate-only environment, and very strong aid philosophy in a small-college setting.",
    feeWaiver: "Yes — no application fee for non-U.S. citizens",
    academicsLikesDislikes: "Students usually value Davidson’s close faculty attention, strong honor culture, and undergraduate focus; the main trade-off is a smaller-town setting and a more self-contained campus social environment.",
    majors: ["Economics", "Biology", "Political Science"],
    academicProgramming: ["Undergraduate-only focus", "Liberal arts college model", "Strong need-based aid philosophy"],
    highlights: ["12.6% admit rate", "1400–1520 SAT range", "8:1 student-faculty ratio", "11% international community"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Davidson’s Class of 2029 profile reports a 12.6% acceptance rate."],
      satRange: ["Davidson’s class profile lists SAT EBRW 710–760 and Math 690–760, equivalent to 1400–1520 combined."],
      regularDeadline: ["Davidson’s admission and aid timeline lists January 12 for Regular Decision and January 5 for Early Decision II."],
      englishProficiencyScore: ["Davidson’s international-applicants page says students with DET 130+, IELTS 7+, and comparable scores are best prepared."],
      internationalStudents: ["Davidson’s international-applicants page says 11% of the community comes from more than 50 countries."],
      feeWaiver: ["Davidson’s international-applicants page says there is no application fee for non-U.S. citizens."],
      totalCostOfAttendance: ["Davidson’s 2026–27 cost page lists first-year international billed costs of $92,770 and non-billed costs of $3,225, totaling $95,995."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official cost pages", "Official fast facts", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Drexel University": {
    universityOverview: "Drexel is best known for its co-op model, which makes professional experience a central part of the undergraduate path rather than an optional extra. It is especially strong in business, engineering, computer science, health-related fields, and applied sciences, and students benefit from Philadelphia-based industry access, career-oriented programming, and a curriculum designed to connect classroom study with work experience.",
    nicheLink: "https://www.niche.com/colleges/drexel-university/",
    admissionsLink: "https://www.niche.com/colleges/drexel-university/admissions/",
    officialWebsite: "https://www.drexel.edu/",
    officialAdmissionsWebsite: "https://www.drexel.edu/admissions/undergrad/",
    commonDataSetLink: "https://drexel.edu/institutionalresearch/~/media/Drexel/Provost-Group/InstitutionalResearch/Documents/Factbook/CDS_2025-2026.pdf",
    sourceLinks: [
      { label: "Drexel first-year profile", url: "https://drexel.edu/admissions/apply/undergrad-instructions/first-year-instructions/first-year-student-population-profile", type: "Official" },
      { label: "Drexel first-year instructions", url: "https://drexel.edu/admissions/apply/undergrad-instructions/first-year-instructions", type: "Official" },
      { label: "Drexel international students", url: "https://drexel.edu/admissions/undergrad/international", type: "Official" },
      { label: "Drexel undergraduate financing options", url: "https://drexel.edu/admissions/financial-aid-affordability/undergrad", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/drexel-university/", type: "Niche" }
    ],
    acceptanceRateAll: "78%",
    dataClassOf: "2025 incoming class profile and 2026–27 financing pages",
    satActPolicy: "Test-optional / considered but not required",
    satRange: "1230–1430",
    admissionsObs1: "Drexel offers Early Decision, Early Action, and Regular Decision.",
    admissionsObs2: "Drexel’s international pages emphasize the co-op model and real-world experience as central parts of the undergraduate value proposition.",
    englishProficiencyScore: "TOEFL, IELTS, Duolingo DET, PTE, or Cambridge accepted when required; the undergraduate FAQ reviewed did not publish one universal minimum threshold.",
    englishObs: "Drexel requires official English-testing results for many international first-year applicants and lists exemptions on its international FAQ page.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 15",
    earlyDeadline: "November 15",
    eaEdEd2: "EA + ED",
    appObs1: "Drexel’s first-year application fee is $65.",
    appObs2: "Institutional fee waivers are limited and mainly tied to stated eligibility categories such as Pennsylvania residency, veteran/dependent status, or a Drexel employee parent.",
    totalUndergraduateStudents: "12,395",
    city: "Philadelphia, Pennsylvania",
    studentFacultyRatio: "9.2:1",
    internationalStudents: "1,082 full-time international undergraduates from 121 countries",
    internationalTuitionFees: "$63,078 tuition + $2,420 fees",
    totalCostOfAttendance: "$84,896 in tuition, fees, housing, and food before books and other indirect costs",
    needBasedAidInternational: "Yes — international first-year applicants who submit the CSS Profile can be considered for institutional need-based grant funding.",
    meritScholarshipInternational: "Yes — first-year merit scholarship ranges published for fall 2026 include $20,000–$35,000 for Early Decision / Early Action and $10,000–$35,000 for Regular Decision.",
    personalComments: "Drexel stands out most for students who want a more career-oriented research university with substantial co-op exposure and comparatively stronger merit opportunities than many elite privates.",
    feeWaiver: "$65 fee with limited institutional waiver pathways",
    academicsLikesDislikes: "Students often value Drexel’s co-op structure, practical orientation, and Philadelphia location; the main trade-off is that the culture can feel more professionally driven and less traditionally residential than a small liberal arts college.",
    majors: ["Engineering", "Business", "Computer Science", "Health Sciences", "Biology"],
    academicProgramming: ["Co-op program", "R1 research university", "100+ majors"],
    highlights: ["78% admit rate", "1230–1430 SAT range", "9.2:1 student-faculty ratio", "1,082 international undergrads"],
    sourceMap: {
      acceptanceRateAll: "Niche",
      satActPolicy: "Official + Niche",
      satRange: "Niche",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Niche + official Drexel materials",
      earlyDeadline: "Niche + official Drexel materials",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official CDS",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Niche admissions page lists Drexel at 78%."],
      satRange: ["Niche admissions page lists a 1230–1430 SAT range."],
      englishProficiencyScore: ["Drexel’s international FAQ lists TOEFL, IELTS, DET, PTE, or Cambridge as accepted English tests."],
      totalUndergraduateStudents: ["Drexel’s Rankings and Achievements page lists 12,395 undergraduate students."],
      studentFacultyRatio: ["Drexel’s 2025–26 CDS reports a 9.2 student-to-faculty ratio."],
      internationalStudents: ["Drexel’s international-students page lists 1,082 full-time undergraduate international students from 121 countries."],
      totalCostOfAttendance: ["Drexel’s 2026–27 undergraduate financing page lists tuition of $63,078, fees of $2,420, and housing and food of $19,398."],
      feeWaiver: ["Drexel’s first-year instructions page says the application fee is $65 and identifies specific institutional waiver categories."],
      meritScholarshipInternational: ["Drexel’s undergraduate financing page publishes first-year merit scholarship ranges for fall 2026 by decision round."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financing pages", "Official factbook/CDS", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Duke University": {
    universityOverview: "Duke is famous for combining top-tier academics, strong school spirit, and major research opportunities in a highly resourced undergraduate environment. It is especially strong in economics, public policy, engineering, computer science, biology, and interdisciplinary programs, and students benefit from faculty-mentored research, Bass Connections, high-level advising, and a campus culture that blends academic ambition with vibrant student life.",
    nicheLink: "https://www.niche.com/colleges/duke-university/",
    admissionsLink: "https://www.niche.com/colleges/duke-university/admissions/",
    officialWebsite: "https://www.duke.edu/",
    officialAdmissionsWebsite: "https://admissions.duke.edu/",
    commonDataSetLink: "https://provost.duke.edu/sites/default/files/CDS-2023-24-FINAL.pdf",
    sourceLinks: [
      { label: "Duke 2029 class profile", url: "https://admissions.duke.edu/wp-content/uploads/2025/12/2029ClassProfile.pdf", type: "Official" },
      { label: "Duke apply page", url: "https://admissions.duke.edu/apply/", type: "Official" },
      { label: "Duke homepage stats", url: "https://admissions.duke.edu/", type: "Official" },
      { label: "Duke cost of attendance", url: "https://financialaid.duke.edu/how-aid-calculated/cost-attendance/", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/duke-university/", type: "Niche" }
    ],
    acceptanceRateAll: "7%",
    dataClassOf: "Class of 2029 profile and 2025–26 cost pages",
    satActPolicy: "Test-optional",
    satRange: "1520–1570",
    admissionsObs1: "Duke offers Early Decision and Regular Decision.",
    admissionsObs2: "The current official class profile reports a 12.6% Early Decision admit rate and a 4.2% Regular Decision admit rate for the Class of 2029, while Niche’s public page summarizes Duke at 7% overall.",
    englishProficiencyScore: "Minimum scores expected: TOEFL 100, IELTS 7.0, Duolingo 130, Cambridge 180, PTE 70",
    englishObs: "Duke’s apply page publishes explicit minimum expected English-proficiency scores.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 5",
    earlyDeadline: "November 3",
    eaEdEd2: "ED only",
    appObs1: "Duke’s application fee is $85.",
    appObs2: "Duke’s CDS says the fee can be waived for applicants with financial need.",
    totalUndergraduateStudents: "6,542",
    city: "Durham, North Carolina",
    studentFacultyRatio: "7:1",
    internationalStudents: "14% of undergraduates are international on Duke’s current admissions site; the Class of 2029 profile lists 11% foreign citizens",
    internationalTuitionFees: "$70,265 tuition + $2,907 estimated fees",
    totalCostOfAttendance: "$98,549–$99,344 estimated total cost of attendance (2025–26)",
    needBasedAidInternational: "Limited but real — Duke says it expects to enroll 20 to 25 international students each year whose full demonstrated need is met with university-provided need-based aid.",
    meritScholarshipInternational: "Yes — highly selective merit scholarships exist, and some can cover the full cost of attendance.",
    personalComments: "Duke is especially compelling for students who want a top research university with unusually strong campus culture, broad interdisciplinary options, and both elite academics and high-energy student life.",
    feeWaiver: "$85 fee, waivable for financial need",
    academicsLikesDislikes: "Students are usually drawn to Duke’s combination of academic strength, school spirit, research access, and strong advising; the main trade-off is the intensity and competitiveness that can come with such a high-achieving environment.",
    majors: ["Economics", "Computer Science", "Public Policy", "Biology", "Political Science"],
    academicProgramming: ["63 majors", "61 minors", "23 certificates", "Bass Connections", "Faculty-mentored research"],
    highlights: ["7% admit rate", "1520–1570 SAT range", "7:1 student-faculty ratio", "6,542 undergraduates"],
    sourceMap: {
      acceptanceRateAll: "Niche + Official class-profile context",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official CDS",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Niche’s public admissions page lists Duke at 7% overall.", "Duke’s 2029 class profile separately reports 12.6% ED and 4.2% RD admit rates."],
      satRange: ["Duke’s 2029 class profile reports a 1520–1570 middle-50% SAT range for accepted students who reported testing."],
      englishProficiencyScore: ["Duke’s apply page lists minimum expected scores of TOEFL 100, IELTS 7, Duolingo 130, Cambridge 180, and PTE 70."],
      totalUndergraduateStudents: ["Duke’s admissions homepage lists 6,542 total undergraduates."],
      studentFacultyRatio: ["Duke’s admissions homepage lists a 7:1 student-to-faculty ratio."],
      totalCostOfAttendance: ["Duke’s financial-aid pages list an estimated total cost of attendance between $98,549 and $99,344 for first-year students in 2025–26."],
      feeWaiver: ["Duke’s 2023–24 CDS states that the $85 application fee can be waived for applicants with financial need."],
      needBasedAidInternational: ["Duke’s international-students financial-aid page states that each year Duke expects to enroll 20 to 25 international students whose full demonstrated need is met."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Official CDS", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Emory University": {
    universityOverview: "Emory is especially known for blending research-university rigor with a strong liberal arts base and excellent access to health, policy, and business-related opportunities in Atlanta. It is particularly strong in business, public health, biology, neuroscience, economics, and political science, and students benefit from close advising, undergraduate research, scholar programs, and the dual structure of Emory College and Oxford College.",
    nicheLink: "https://www.niche.com/colleges/emory-university/",
    admissionsLink: "https://www.niche.com/colleges/emory-university/admissions/",
    officialWebsite: "https://www.emory.edu/",
    officialAdmissionsWebsite: "https://apply.emory.edu/",
    commonDataSetLink: "https://provost.emory.edu/planning-administration/_includes/documents/sections/institutional-data/emory-common-data-set-2024-2025.pdf",
    sourceLinks: [
      { label: "Emory class of 2029 brochure", url: "https://apply.emory.edu/roadpiece/Emory_Digital_Brochure.pdf", type: "Official" },
      { label: "Emory first-year apply page", url: "https://apply.emory.edu/apply/first-year/index.html", type: "Official" },
      { label: "Emory plans and deadlines", url: "https://apply.emory.edu/apply/first-year/plans-deadlines/index.html", type: "Official" },
      { label: "Emory international applicants", url: "https://apply.emory.edu/apply/international-applicants.html", type: "Official" },
      { label: "Emory financial aid", url: "https://apply.emory.edu/financial-aid/index.html", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/emory-university/", type: "Niche" }
    ],
    acceptanceRateAll: "10.3%",
    dataClassOf: "Admitted Class of 2029 brochure and 2026–27 / 2025–26 cost pages",
    satActPolicy: "Test-optional through the 2026–2027 cycle",
    satRange: "1490–1550",
    admissionsObs1: "Emory offers Early Decision I, Early Decision II, and Regular Decision.",
    admissionsObs2: "The combined Class of 2029 brochure shows 37,561 applicants and 3,869 accepted across Emory University’s undergraduate pathways, which implies an admit rate of about 10.3%.",
    englishProficiencyScore: "TOEFL or IELTS recommended when English is not the first language; Emory also accepts Duolingo English Test, but the reviewed undergraduate pages did not publish one fixed minimum threshold.",
    englishObs: "Emory’s standardized-exam policies page explicitly includes Duolingo and notes that DET fee waivers may be issued case by case after an application is submitted.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 1",
    earlyDeadline: "November 1",
    eaEdEd2: "ED I + ED II",
    appObs1: "Emory’s application fee is $75 or fee waiver.",
    appObs2: "For merit scholarship consideration, students must submit by November 15 and indicate interest in scholar programs.",
    totalUndergraduateStudents: "6,534 (5,567 Emory College + 967 Oxford College)",
    city: "Atlanta, Georgia",
    studentFacultyRatio: "9:1",
    internationalStudents: "About 15–18% of each first-year class",
    internationalTuitionFees: "$70,300 tuition + $1,148 fees (2026–27 worksheet)",
    totalCostOfAttendance: "$88,536 combined tuition, fees, room, and board (2025–26 official announcement)",
    needBasedAidInternational: "Limited — Emory says it offers need-based aid to a select number of international students each year.",
    meritScholarshipInternational: "Yes — international students are considered for a limited number of merit scholarships, and Emory also has named scholar programs with partial to full merit support.",
    personalComments: "Emory is a strong option for students who want a major research university with a strong liberal-arts base, access to Atlanta, and both need-based and merit-based pathways, though international need-based funding is selective rather than universal.",
    feeWaiver: "$75 fee or fee waiver through the Common Application",
    academicsLikesDislikes: "Students are often attracted by Emory’s balance of strong academics, research access, and Atlanta opportunities; the main trade-off is that aid for international students is more limited than at the most generous need-blind schools.",
    majors: ["Business", "Biology", "Neuroscience", "Economics", "Political Science"],
    academicProgramming: ["Emory College + Oxford College structure", "Scholar Programs", "Research university with liberal-arts foundation"],
    highlights: ["~10.3% admit rate", "1490–1550 SAT range", "9:1 student-faculty ratio", "15–18% international first-year class"],
    sourceMap: {
      acceptanceRateAll: "Official brochure",
      satActPolicy: "Official",
      satRange: "Official brochure",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official CDS",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Emory’s Class of 2029 brochure reports 37,561 applicants and 3,869 accepted, implying an admit rate of about 10.3%."],
      satRange: ["Emory’s Class of 2029 brochure lists a 1490–1550 middle-50% SAT range."],
      regularDeadline: ["Emory’s plans-and-deadlines page lists November 1 for ED I and January 1 for ED II and Regular Decision."],
      englishProficiencyScore: ["Emory’s undergraduate pages say TOEFL or IELTS is recommended when English is not the first language, and Emory’s standardized-exam policies page explicitly includes Duolingo."],
      totalUndergraduateStudents: ["Emory’s About pages list 5,567 undergraduates in Emory College and 967 in Oxford College for Fall 2024."],
      studentFacultyRatio: ["Emory’s recent CDS reports a 9 to 1 student-to-faculty ratio."],
      internationalStudents: ["Emory’s international-applicants page says about 15 to 18 percent of each first-year class is international."],
      feeWaiver: ["Emory’s how-to-apply page says the application fee is $75 or fee waiver.", "Emory’s FAQ page says fee-waiver requests are processed through the Common Application without additional documentation."],
      meritScholarshipInternational: ["Emory’s international-aid page says international students are considered for a limited number of merit-based scholarships, and the scholar-programs page describes partial to full merit awards."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Official CDS", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Claremont McKenna College": {
    universityOverview: "Claremont McKenna is especially famous for economics, government, public affairs, and leadership-focused undergraduate education within the Claremont Colleges consortium. Students benefit from small classes, strong faculty mentoring, policy and finance-oriented programming, and broad access to courses, institutes, and networking opportunities across the other Claremont campuses.",
    nicheLink: "https://www.niche.com/colleges/claremont-mckenna-college/",
    admissionsLink: "https://www.niche.com/colleges/claremont-mckenna-college/admissions/",
    officialWebsite: "https://www.cmc.edu/",
    officialAdmissionsWebsite: "https://www.cmc.edu/admission/",
    commonDataSetLink: "https://www.cmc.edu/sites/default/files/CDS_2025-26_0.pdf",
    sourceLinks: [
      { label: "CMC class profile", url: "https://www.cmc.edu/sites/default/files/Class-Profile-2025.pdf", type: "Official" },
      { label: "CMC first-year instructions", url: "https://www.cmc.edu/admission/first-year-application-instructions", type: "Official" },
      { label: "CMC international applicants", url: "https://www.cmc.edu/admission/international", type: "Official" },
      { label: "CMC cost of attendance", url: "https://www.cmc.edu/financial-aid/college-costs-and-payments", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/claremont-mckenna-college/", type: "Niche" }
    ],
    acceptanceRateAll: "9.4%",
    dataClassOf: "Class of 2029 and 2026–27 cost pages",
    satActPolicy: "Test-optional through the Fall 2027 admission cycle",
    satRange: "1470–1550",
    admissionsObs1: "CMC offers Early Decision I, Early Decision II, and Regular Decision.",
    admissionsObs2: "The official incoming-class profile reports 6,939 applicants and 655 admits for the Class of 2029.",
    englishProficiencyScore: "Recommended minimums: TOEFL iBT 100, IELTS 7.5, Cambridge 190, Duolingo 130",
    englishObs: "CMC allows self-reporting for TOEFL, IELTS, and Cambridge when official reporting is a financial burden, but Duolingo must be sent electronically.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 10",
    earlyDeadline: "November 1",
    eaEdEd2: "ED I + ED II",
    appObs1: "Priority consideration for merit scholarships requires submission by December 1, with credentials due by January 10.",
    appObs2: "CMC has limited application fee waivers for applicants; international applicants can also ask InitialView or Vericant about fee waivers for those interview services.",
    totalUndergraduateStudents: "1,388",
    city: "Claremont, California",
    studentFacultyRatio: "8:1",
    internationalStudents: "15% nonresident alien",
    internationalTuitionFees: "$75,300 tuition + $420 student activity fee (2026–27)",
    totalCostOfAttendance: "$101,990 (2026–27)",
    needBasedAidInternational: "Yes — CMC is need-aware for international students, but if admitted it commits to meeting demonstrated need as determined at admission.",
    meritScholarshipInternational: "Yes — limited merit-based scholarships are available for first-year applicants.",
    personalComments: "CMC is a particularly strong option for students who want a small college with unusually strong economics, public affairs, leadership, and internship infrastructure.",
    feeWaiver: "Limited application fee waivers available",
    academicsLikesDislikes: "Students are typically drawn to CMC’s policy/econ identity, high internship culture, and Claremont consortium access; the main trade-off is a more pre-professional and high-pressure culture than at some peer liberal arts colleges.",
    majors: ["Economics", "Government", "International Relations", "Psychological Science", "Mathematical Sciences"],
    academicProgramming: ["Claremont Colleges consortium", "Policy and leadership institutes", "Merit scholarship consideration by December 1"],
    highlights: ["9.4% admit rate", "1470–1550 SAT range", "8:1 student-faculty ratio", "15% international students"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["CMC’s Fall 2025 incoming class profile reports 6,939 applicants and 655 admits."],
      satRange: ["The official class profile reports SAT EBRW 730–760 and Math 740–790, equivalent to 1470–1550 combined."],
      englishProficiencyScore: ["CMC’s international-applicants page lists recommended minimums of TOEFL 100, IELTS 7.5, Cambridge 190, and Duolingo 130."],
      studentFacultyRatio: ["CMC fact sheet and admissions pages report an 8:1 student-to-faculty ratio."],
      internationalStudents: ["CMC’s 2024–25 fact sheet lists 15% nonresident alien students."],
      totalCostOfAttendance: ["CMC’s 2026–27 cost page lists a total cost of attendance of $101,990."],
      feeWaiver: ["CMC’s international and fee-waiver pages state that the Office of Admission has limited fee waivers for applicants."],
      needBasedAidInternational: ["CMC’s international-applicants page states that international applicants are reviewed in a need-aware process but admitted students have demonstrated need met as determined at admission."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official costs pages", "Official fact sheet", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Clark University": {
    universityOverview: "Clark is known for combining the feel of a smaller university with a strong research culture and a practical emphasis on applying academic work beyond the classroom. It is especially strong in psychology, geography, environmental studies, and interdisciplinary social science, and students benefit from close faculty contact, research access, experiential learning, and accelerated degree pathways such as its 4+1 options.",
    nicheLink: "https://www.niche.com/colleges/clark-university/",
    admissionsLink: "https://www.niche.com/colleges/clark-university/admissions/",
    officialWebsite: "https://www.clarku.edu/",
    officialAdmissionsWebsite: "https://www.clarku.edu/undergraduate-admissions/",
    commonDataSetLink: "https://cdn.clarku.edu/stair/wp-content/uploads/sites/95/Clark-CDS-2024-25.pdf",
    sourceLinks: [
      { label: "Clark first-year profile", url: "https://www.clarku.edu/undergraduate-admissions/apply/process/first-year-student-profile/", type: "Official" },
      { label: "Clark application process", url: "https://www.clarku.edu/undergraduate-admissions/apply/process/", type: "Official" },
      { label: "Clark international students", url: "https://www.clarku.edu/undergraduate-admissions/apply/international-students/", type: "Official" },
      { label: "Clark cost of attendance", url: "https://www.clarku.edu/undergraduate-admissions/cost-and-financial-aid/", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/clark-university/", type: "Niche" }
    ],
    acceptanceRateAll: "49%",
    dataClassOf: "Current first-year profile and 2026–27 cost pages",
    satActPolicy: "Test-optional",
    satRange: "1300–1440",
    admissionsObs1: "Clark offers Early Decision I, Early Action, Early Decision II, and Regular Decision.",
    admissionsObs2: "For Fall 2026 the regular-decision application deadline was extended to April 15, 2026, but the standard regular-decision cycle remains January 15.",
    englishProficiencyScore: "Clark’s undergraduate international pages reviewed did not publish a single minimum score, but official materials say Clark accepts TOEFL, IELTS, or Duolingo where English testing is required.",
    englishObs: "Clark’s admissions-requirements pages indicate English testing is required for some international applicants, but the reviewed undergraduate pages did not display a public minimum threshold.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 15",
    earlyDeadline: "November 1",
    eaEdEd2: "EA + ED I + ED II",
    appObs1: "Clark has no undergraduate application fee.",
    appObs2: "Clark’s need-aware policy for international students means it cannot fund the full cost of attendance for applicants who require complete funding.",
    totalUndergraduateStudents: "2,203",
    city: "Worcester, Massachusetts",
    studentFacultyRatio: "9:1",
    internationalStudents: "5.1% in the class profile geography breakdown; Brazil is listed among top countries represented",
    internationalTuitionFees: "$62,070 tuition + billed charges totaling $77,970 (2026–27)",
    totalCostOfAttendance: "$82,415 (2026–27)",
    needBasedAidInternational: "Limited — Clark provides merit scholarships and need-based aid to international students, but explicitly says it cannot cover the full cost of attendance.",
    meritScholarshipInternational: "Yes — all applicants are automatically considered for most merit scholarships; the Presidential Scholarship is the most prominent full-tuition/room/board-level award, though recipients still face additional costs.",
    personalComments: "Clark works well for students who want a smaller research university with strong merit potential, experiential learning, and more flexible admissions than the hyper-selective elite schools on the list.",
    feeWaiver: "No undergraduate application fee",
    academicsLikesDislikes: "Students often like Clark’s smaller research-university scale, experiential learning, and merit support; the main trade-off is that it is less resourced and less globally prestigious than the ultra-elite private universities on this list.",
    majors: ["Psychology", "Geography", "Environmental Science", "Economics", "Biology"],
    academicProgramming: ["Liberal Education and Effective Practice", "4+1 accelerated master’s options", "Experiential learning"],
    highlights: ["49% admit rate", "1300–1440 SAT range", "9:1 student-faculty ratio", "No application fee"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Clark’s first-year profile reports a 49% acceptance rate."],
      satRange: ["Clark’s first-year profile reports a 1300–1440 middle-50% SAT range."],
      regularDeadline: ["Clark’s admissions process page lists January 15 as the regular-decision deadline, with a Fall 2026 extension notice also posted."],
      totalUndergraduateStudents: ["Clark’s About page lists 2,203 undergraduate students."],
      studentFacultyRatio: ["Clark’s About and Facts pages report a 9:1 student-to-faculty ratio."],
      totalCostOfAttendance: ["Clark’s cost-of-attendance page lists a total estimated annual cost of $82,415 for 2026–27."],
      feeWaiver: ["Clark’s undergraduate application-process page explicitly says there is no fee to apply."],
      needBasedAidInternational: ["Clark’s international-students page says the university cannot offer admission to international students who require full funding and that international students typically pay around $40,000 after scholarships and aid."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official cost pages", "Official facts pages", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Colby College": {
    universityOverview: "Colby is widely known for pairing elite liberal arts academics with exceptionally strong institutional support for internships, research, and global experiences. It is especially respected in economics, government, environmental studies, computer science, and the social sciences, and students benefit from DavisConnects funding, close faculty attention, and a highly residential undergraduate community.",
    nicheLink: "https://www.niche.com/colleges/colby-college/",
    admissionsLink: "https://www.niche.com/colleges/colby-college/admissions/",
    officialWebsite: "https://www.colby.edu/",
    officialAdmissionsWebsite: "https://afa.colby.edu/",
    commonDataSetLink: "https://afa.colby.edu/apply/college-profile/",
    sourceLinks: [
      { label: "Colby college profile", url: "https://afa.colby.edu/apply/college-profile/", type: "Official" },
      { label: "Colby dates and deadlines", url: "https://afa.colby.edu/apply/dates-and-deadlines/", type: "Official" },
      { label: "Colby international applicants", url: "https://afa.colby.edu/apply/requirements/international-applicants/", type: "Official" },
      { label: "Colby tuition and fees", url: "https://afa.colby.edu/cost-and-aid/tuition-and-fees/", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/colby-college/", type: "Niche" }
    ],
    acceptanceRateAll: "8%",
    dataClassOf: "Class of 2029 profile and 2025–26 cost pages",
    satActPolicy: "Test-optional",
    satRange: "1450–1540",
    admissionsObs1: "Colby offers Early Decision I, Early Decision II, and Regular Decision.",
    admissionsObs2: "Colby emphasizes a no-fee, no-supplement application and a strong no-loan financial aid model.",
    englishProficiencyScore: "Colby requires TOEFL, IELTS, or Duolingo when English is neither the applicant’s first language nor current language of instruction, but the reviewed pages did not publish a public minimum score.",
    englishObs: "Colby allows self-reporting of English test scores in the application process and superscores the TOEFL.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 5",
    earlyDeadline: "November 15",
    eaEdEd2: "ED I + ED II",
    appObs1: "There is no fee to apply to Colby and no additional writing supplements are required.",
    appObs2: "Colby offers CSS Profile fee waivers for students for whom the CSS submission cost creates a financial burden.",
    totalUndergraduateStudents: "2,400",
    city: "Waterville, Maine",
    studentFacultyRatio: "10:1",
    internationalStudents: "11%",
    internationalTuitionFees: "$72,910 tuition/fees within a comprehensive fee",
    totalCostOfAttendance: "$93,400–$94,650 (2025–26)",
    needBasedAidInternational: "Yes — Colby meets 100% of demonstrated need for all admitted students, including international students, and does so without packaged loans.",
    meritScholarshipInternational: "No — Colby says merit scholarships are not available from the college, aside from named scholar programs that are part of the admission process rather than broad merit funding.",
    personalComments: "Colby is especially compelling for students who want a highly selective liberal arts college with unusually generous no-loan aid and a globally oriented student body.",
    feeWaiver: "No application fee; CSS fee waiver available when needed",
    academicsLikesDislikes: "Students tend to like Colby’s combination of rigorous academics, campus beauty, strong advising, and unusually well-funded internships and research; the trade-off is its smaller-town setting and lower urban access compared with schools near major cities.",
    majors: ["Economics", "Environmental Policy", "Government", "Computer Science", "Biology"],
    academicProgramming: ["46 majors", "37 minors", "4-1-4 calendar", "DavisConnects internships and global experiences"],
    highlights: ["8% admit rate", "1450–1540 SAT range", "10:1 student-faculty ratio", "11% international students"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Colby’s college profile reports an 8% admit rate for the Class of 2029."],
      satRange: ["Colby’s college profile reports a 1450–1540 middle-50% SAT range."],
      regularDeadline: ["Colby’s dates-and-deadlines page lists January 5 for Regular Decision and Early Decision II."],
      feeWaiver: ["Colby’s Apply page says there is no fee to apply.", "Colby’s international-applicants page says CSS fee waivers are available when the CSS submission cost is a burden."],
      internationalStudents: ["Colby’s college profile lists 11% international students and 80+ countries represented."],
      totalCostOfAttendance: ["Colby’s tuition-and-fees page lists an estimated cost of attendance of $93,400–$94,650 for 2025–26."],
      needBasedAidInternational: ["Colby’s international-applicants page says Colby meets 100 percent of demonstrated need for all admitted students, including international students."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official aid pages", "Official college profile", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Colgate University": {
    universityOverview: "Colgate is especially known for its rigorous liberal arts setting, strong alumni network, and highly residential campus culture. It is particularly strong in economics, political science, biology, and interdisciplinary humanities work, and students benefit from small classes, close professor relationships, off-campus study options, and a campus environment designed heavily around undergraduate life.",
    nicheLink: "https://www.niche.com/colleges/colgate-university/",
    admissionsLink: "https://www.niche.com/colleges/colgate-university/admissions/",
    officialWebsite: "https://www.colgate.edu/",
    officialAdmissionsWebsite: "https://www.colgate.edu/admission-aid",
    commonDataSetLink: "https://www.colgate.edu/sites/default/files/2025-07/Colgate%202024-25%20CDS%20for%20Website.pdf",
    sourceLinks: [
      { label: "Colgate class profile", url: "https://www.colgate.edu/admission-aid/apply/first-year-class-profile", type: "Official" },
      { label: "Colgate international applicants", url: "https://www.colgate.edu/admission-aid/apply/international-applicants", type: "Official" },
      { label: "Colgate deadlines", url: "https://www.colgate.edu/admission-aid/apply/regular-decision", type: "Official" },
      { label: "Colgate cost of attendance", url: "https://www.colgate.edu/admission-aid/tuition-fees/cost-attendance-2026-27", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/colgate-university/", type: "Niche" }
    ],
    acceptanceRateAll: "17%",
    dataClassOf: "Class of 2029 profile and 2026–27 cost pages",
    satActPolicy: "Test-optional",
    satRange: "1450–1510",
    admissionsObs1: "Colgate offers Early Decision I, Early Decision II, and Regular Decision.",
    admissionsObs2: "Colgate is free for international applicants to apply and provides CSS Profile fee-waiver codes to international applicants for whom the CSS cost is a significant burden.",
    englishProficiencyScore: "Most successful applicants generally score above TOEFL 100, IELTS 7, or Duolingo 130; there are no minimum score requirements.",
    englishObs: "Colgate requires TOEFL, IELTS, or Duolingo for non-native English speakers who do not study in an English-medium secondary school, but explicitly says there are no minimum score requirements.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 15",
    earlyDeadline: "November 1",
    eaEdEd2: "ED I + ED II",
    appObs1: "Regular Decision and ED II share a January 15 deadline.",
    appObs2: "Colgate is need-aware for all students, including international applicants, but meets 100% of demonstrated need for admitted students.",
    totalUndergraduateStudents: "Approximately 2,900",
    city: "Hamilton, New York",
    studentFacultyRatio: "9:1",
    internationalStudents: "7% of the Class of 2029; 299 total international students and 87 countries represented on campus",
    internationalTuitionFees: "$76,828 tuition (cost-of-attendance page) or $73,206 tuition on tuition-and-fees page, depending on page/version; current public pages show a high-$70k tuition level for 2026–27",
    totalCostOfAttendance: "$96,646 for first-years and sophomores (2026–27 on-campus billed charges), with higher totals once indirect costs are included",
    needBasedAidInternational: "Yes — Colgate meets 100% of every admitted international student’s demonstrated financial need.",
    meritScholarshipInternational: "No broad merit program emphasized on the current first-year aid pages reviewed; Colgate’s main current aid messaging is need-based.",
    personalComments: "Colgate is a strong option for students who want a selective liberal arts university with excellent financial aid for internationals and a highly residential undergraduate experience.",
    feeWaiver: "Yes — free for international applicants; CSS Profile fee-waiver codes available for eligible international applicants",
    academicsLikesDislikes: "Students often value Colgate’s close-knit campus culture, strong alumni network, and small classes; the main trade-off is the isolated small-town setting and a more self-contained social life.",
    majors: ["Economics", "Political Science", "Biology", "Psychology", "Computer Science"],
    academicProgramming: ["57 majors", "Strong need-based aid", "Highly residential liberal arts environment"],
    highlights: ["17% admit rate", "1450–1510 SAT range", "9:1 student-faculty ratio", "Free application for internationals"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Colgate’s Class of 2029 profile reports 3,017 admits out of 17,310 applications, or 17%."],
      satRange: ["Colgate’s Class of 2029 profile reports a 1450–1510 middle-50% SAT range."],
      regularDeadline: ["Colgate’s admissions pages list January 15 for both Regular Decision and Early Decision II, with November 1 for Early Decision I."],
      englishProficiencyScore: ["Colgate’s international-applicants page says the most successful applicants generally score above TOEFL 100, IELTS 7, or Duolingo 130, while also noting there are no minimum score requirements."],
      internationalStudents: ["Colgate’s Class of 2029 profile lists 59 enrolled international students, 7% of the class.", "Colgate’s international page also lists 299 total international students and 87 countries represented on campus."],
      feeWaiver: ["Colgate’s international-applicants page says it is free for international applicants to apply.", "The same page explains the CSS fee-waiver-code request process for eligible international applicants."],
      totalCostOfAttendance: ["Colgate’s 2026–27 cost-of-attendance page lists $96,646 in billed charges for first-years and sophomores."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official cost pages", "Official class profile", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Columbia University": {
    universityOverview: "Columbia is famous for the Core Curriculum and for offering top-tier academics in the middle of New York City. It is especially strong in economics, political science, computer science, history, and the humanities more broadly, and students benefit from major research access, internship and networking opportunities across Manhattan, and the intellectual structure that comes from the Core.",
    nicheLink: "https://www.niche.com/colleges/columbia-university/",
    admissionsLink: "https://www.niche.com/colleges/columbia-university/admissions/",
    officialWebsite: "https://www.columbia.edu/",
    officialAdmissionsWebsite: "https://undergrad.admissions.columbia.edu/",
    commonDataSetLink: "https://opir.columbia.edu/understanding-columbias-common-data-set",
    sourceLinks: [
      { label: "Columbia class profile", url: "https://undergrad.admissions.columbia.edu/apply/process/class-profile", type: "Official" },
      { label: "Columbia Class of 2029 PDF", url: "https://undergrad.admissions.columbia.edu/sites/default/files/2025-08/Columbia%20Class%20of%202029%20Profile.pdf", type: "Official" },
      { label: "International applicants", url: "https://undergrad.admissions.columbia.edu/apply/international", type: "Official" },
      { label: "English proficiency", url: "https://undergrad.admissions.columbia.edu/apply/international/english-proficiency", type: "Official" },
      { label: "Financial aid facts", url: "https://cc-seas.financialaid.columbia.edu/eligibility/facts", type: "Official" }
    ],
    acceptanceRateAll: "4.9%",
    dataClassOf: "Class of 2029 profile and 2025–26 cost pages",
    satActPolicy: "Test-optional",
    satRange: "1520–1560",
    admissionsObs1: "Columbia offers Early Decision and Regular Decision.",
    admissionsObs2: "Columbia’s current Class of 2029 profile PDF shows 59,616 total applications and 2,946 total admits, which implies roughly 4.9%; a March 2025 admissions announcement reported 2,557 admission offers in the initial decision cycle.",
    englishProficiencyScore: "Minimums listed: TOEFL iBT 105 (for exams taken on or before Jan. 20, 2026), IELTS 7.5, Duolingo 135",
    englishObs: "Columbia explicitly says applicants must be comfortable with rapid and idiomatic spoken English.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 1",
    earlyDeadline: "November 1",
    eaEdEd2: "ED only",
    appObs1: "Columbia’s application fee is $85, with fee-waiver options available through the application process.",
    appObs2: "Columbia is test-optional and not need-blind for international students, but it meets 100% of demonstrated need for admitted international students who apply for aid.",
    totalUndergraduateStudents: "8,714 undergraduates in the undergraduate CDS figure referenced by Columbia’s institutional research materials",
    city: "New York City, New York",
    studentFacultyRatio: "6:1",
    internationalStudents: "16% of the Class of 2029 profile; Columbia also reports students from 115 countries in that class profile",
    internationalTuitionFees: "$70,170 tuition + $4,010 fees for first-year on-campus students (2025–26)",
    totalCostOfAttendance: "$95,946 for first-year on-campus students (2025–26), excluding Columbia Health Insurance",
    needBasedAidInternational: "Yes — Columbia meets 100% of demonstrated financial need for admitted international students who apply for and demonstrate need at the time of admission.",
    meritScholarshipInternational: "No institutional undergraduate merit scholarship model emphasized; aid is primarily need-based.",
    personalComments: "Columbia is ideal for students who want top-tier academics embedded in New York City, with unusually strong need-based aid and a very intense urban-academic environment.",
    feeWaiver: "$85 fee, with fee-waiver requests available; Columbia says eligible fee-waiver requests are granted automatically",
    academicsLikesDislikes: "Students are often drawn to Columbia for the Core, New York access, and elite intellectual atmosphere; the trade-offs are intensity, cost, and the pressures of a very dense urban-academic environment.",
    majors: ["Economics", "Political Science", "Computer Science", "Biology", "History"],
    academicProgramming: ["Core Curriculum", "Extensive undergraduate research", "Graduate-school course access", "New York City academic ecosystem"],
    highlights: ["~4.9% admit rate", "1520–1560 SAT range", "6:1 student-faculty ratio", "Strong international need-based aid"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Columbia’s current Class of 2029 profile PDF shows 59,616 applications and 2,946 admits.", "A March 2025 admissions announcement reported 2,557 initial offers; the profile PDF appears to reflect a later total-admits figure."],
      satRange: ["Columbia’s Class of 2029 profile PDF reports a 1520–1560 SAT range for the middle 50% of enrolling students who submitted scores."],
      englishProficiencyScore: ["Columbia’s English proficiency page lists minimums including TOEFL 105, IELTS 7.5, and Duolingo 135."],
      regularDeadline: ["Columbia’s first-year admissions pages list November 1 for Early Decision and January 1 for Regular Decision."],
      totalCostOfAttendance: ["Columbia Financial Aid and Educational Financing lists $95,946 as the 2025–26 first-year on-campus cost of attendance, excluding health insurance."],
      needBasedAidInternational: ["Columbia’s financial-aid pages say the university meets 100% of demonstrated need for admitted international students, but international admission is need-aware."],
      feeWaiver: ["Columbia’s application-fees page says the application fee is $85 and that eligible fee-waiver requests are granted automatically."],
      studentFacultyRatio: ["Columbia College and Columbia institutional materials report a 6:1 student-to-faculty ratio."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Official class profile", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "Bowdoin College": {
    universityOverview: "Bowdoin is known for combining top-tier liberal arts academics with a very residential, close-knit campus culture and a strong emphasis on public purpose. It is especially strong in government, economics, environmental studies, and the sciences, and students benefit from small classes, research support, funded internships, and a collaborative academic environment centered on undergraduate learning.",
    nicheLink: "https://www.niche.com/colleges/bowdoin-college/",
    admissionsLink: "https://www.niche.com/colleges/bowdoin-college/admissions/",
    officialWebsite: "https://www.bowdoin.edu/",
    officialAdmissionsWebsite: "https://www.bowdoin.edu/admissions/",
    commonDataSetLink: "https://www.bowdoin.edu/ir/pdf/bowdoin-cds_2024-2025.pdf",
    sourceLinks: [
      { label: "Niche profile", url: "https://www.niche.com/colleges/bowdoin-college/", type: "Niche" },
      { label: "Official admissions overview", url: "https://www.bowdoin.edu/admissions/", type: "Official" },
      { label: "Bowdoin at a Glance", url: "https://www.bowdoin.edu/admissions/at-a-glance/", type: "Official" },
      { label: "Costs and Aid", url: "https://www.bowdoin.edu/admissions/costs-and-aid/index.html", type: "Official" }
    ],
    acceptanceRateAll: "7%",
    dataClassOf: "Current public admissions pages and 2025–26 cost pages",
    satActPolicy: "Test-optional",
    satRange: "1480–1550",
    admissionsObs1: "Bowdoin offers Early Decision I, Early Decision II, and Regular Decision.",
    admissionsObs2: "Bowdoin’s official admissions pages describe the entering class as having about 7% of applicants offered a place, while Niche currently shows 8% on its public page.",
    englishProficiencyScore: "Bowdoin requires English Proficiency Tests when applicable, but the undergraduate international page reviewed did not publish a minimum score.",
    englishObs: "The undergraduate international admissions page reviewed mentions English Proficiency Tests but does not list a public minimum threshold.",
    duolingoAccepted: "Not specified on the undergraduate page reviewed",
    regularDeadline: "January 5",
    earlyDeadline: "November 15",
    eaEdEd2: "ED I + ED II",
    appObs1: "Regular Decision and ED II share a January 5 deadline on Bowdoin’s admissions FAQ page.",
    appObs2: "Bowdoin automatically waives the application fee for students applying for financial aid or who are first-generation-to-college.",
    totalUndergraduateStudents: "1,881",
    city: "Brunswick, Maine",
    studentFacultyRatio: "9:1",
    internationalStudents: "119 students (6.5%)",
    internationalTuitionFees: "$71,070 tuition + $670 fees (2025–26)",
    totalCostOfAttendance: "$93,800+ (2025–26)",
    needBasedAidInternational: "Yes — Bowdoin states it meets full demonstrated need with scholarships and campus employment.",
    meritScholarshipInternational: "No separate merit program emphasized on the admissions and aid pages reviewed",
    personalComments: "A highly selective liberal arts college with unusually strong faculty access, a very residential campus culture, and one of the strongest aid reputations among small colleges.",
    feeWaiver: "Yes — automatic for financial-aid applicants and first-generation-to-college students",
    academicsLikesDislikes: "Students tend to praise Bowdoin’s professor access, small classes, and close community; the main trade-off is the small-town setting and a social scene that is more campus-centered than city-centered.",
    majors: ["Economics", "Government", "Neuroscience", "Computer Science", "Mathematics"],
    academicProgramming: ["40+ majors", "Undergraduate research", "Liberal arts curriculum"],
    highlights: ["Very small college community", "Strong aid reputation", "Test-optional", "9:1 student-faculty ratio"],
    sourceMap: {
      acceptanceRateAll: "Official + Niche",
      satActPolicy: "Official",
      satRange: "Niche",
      englishProficiencyScore: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Bowdoin’s admissions data page says about 7% of applicants are offered a spot.", "Niche currently lists Bowdoin at 8%."],
      satRange: ["Niche admissions page lists 1480–1550."],
      studentFacultyRatio: ["Bowdoin at a Glance lists a 9:1 student-to-faculty ratio."],
      internationalStudents: ["Bowdoin facts and figures page lists 119 international students, or 6.5%."],
      totalCostOfAttendance: ["Bowdoin Costs and Aid lists $93,800+ for 2025–26."],
      feeWaiver: ["Bowdoin’s fee-waiver policy says the fee is automatically waived for aid applicants and first-generation students."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official costs and aid pages", "Niche", "Bowdoin facts and figures"],
    lastUpdated: "Audited embedded record"
  },
  "Brandeis University": {
    universityOverview: "Brandeis is especially known for combining a research-university environment with a strong liberal arts foundation and a visible tradition of social justice. It is particularly strong in international and global studies, psychology, biology, economics, and interdisciplinary humanities fields, and students gain access to faculty mentoring, undergraduate research, and a collaborative academic culture close to Boston.",
    nicheLink: "https://www.niche.com/colleges/brandeis-university/",
    admissionsLink: "https://www.niche.com/colleges/brandeis-university/admissions/",
    officialWebsite: "https://www.brandeis.edu/",
    officialAdmissionsWebsite: "https://www.brandeis.edu/admissions/",
    commonDataSetLink: "https://www.brandeis.edu/institutional-research/docs/cds-2023-24.pdf",
    sourceLinks: [
      { label: "Niche profile", url: "https://www.niche.com/colleges/brandeis-university/", type: "Niche" },
      { label: "Official first-year page", url: "https://www.brandeis.edu/admissions/apply/application-process/first-year.html", type: "Official" },
      { label: "Brandeis by the Numbers", url: "https://www.brandeis.edu/admissions/why-brandeis/numbers.html", type: "Official" },
      { label: "International aid page", url: "https://www.brandeis.edu/student-financial-services/financial-aid/apply/international-students.html", type: "Official" }
    ],
    acceptanceRateAll: "45%",
    dataClassOf: "Fall 2025 first-year profile and current affordability pages",
    satActPolicy: "Test-optional",
    satRange: "1380–1480",
    admissionsObs1: "Brandeis offers Early Action, Early Decision I, Early Decision II, and Regular Decision.",
    admissionsObs2: "Its current official by-the-numbers page lists a 45% acceptance rate, while Niche still shows 35% on some public pages.",
    englishProficiencyScore: "TOEFL / IELTS / Cambridge / Duolingo accepted when required; the undergraduate page reviewed did not publish a minimum score.",
    englishObs: "Brandeis says applicants with four or more years in an English-medium high school, or applicants from UWC campuses, may qualify for a waiver.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 15",
    earlyDeadline: "November 3",
    eaEdEd2: "EA + ED I + ED II",
    appObs1: "Financial aid deadlines match the admission round dates on Brandeis’ affordability pages.",
    appObs2: "Brandeis says the application fee will be waived if it presents a financial barrier and the student submits the Common App fee waiver.",
    totalUndergraduateStudents: "3,342",
    city: "Waltham, Massachusetts",
    studentFacultyRatio: "9:1",
    internationalStudents: "15.8% undergraduate",
    internationalTuitionFees: "$73,080 tuition + $598 mandatory fee (2026–27)",
    totalCostOfAttendance: "$97,758 (2026–27)",
    needBasedAidInternational: "Yes — Brandeis states it meets 100% of demonstrated need in the first year for international undergraduates who apply for aid during admission.",
    meritScholarshipInternational: "Yes — international students are eligible for need-sensitive scholarships, including the Wien International Scholarship Program and other scholarship pathways.",
    personalComments: "Brandeis is strongest for students who want a medium-size research university with liberal-arts values, strong social-justice culture, and meaningful international scholarship options.",
    feeWaiver: "Yes — Common App fee waiver accepted if the fee presents a financial barrier",
    academicsLikesDislikes: "Students often highlight intellectually serious classes, research opportunities, and a socially conscious campus culture; the trade-off is that some students find the social scene quieter and the campus less lively than bigger urban universities.",
    majors: ["Economics", "Biology", "International and Global Studies", "Psychology", "Computer Science"],
    academicProgramming: ["Research university with liberal arts foundation", "Interdisciplinary programs", "Wien International Scholarship pathway"],
    highlights: ["15.8% international undergraduates", "100% of need met in first year", "Test-optional", "Strong social-justice identity"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official + Niche",
      earlyDeadline: "Official + Niche",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Brandeis by the Numbers lists a 45% first-year acceptance rate for Fall 2025."],
      satRange: ["Brandeis by the Numbers lists a 1380–1480 middle-50% SAT range."],
      internationalStudents: ["Brandeis Fast Facts lists 15.8% of undergraduates as international in fall 2025."],
      totalCostOfAttendance: ["Brandeis tuition and affordability page lists $97,758 for 2026–27."],
      needBasedAidInternational: ["Brandeis Commitment page says the university meets 100% of demonstrated need in the first year for international undergraduates who apply for aid during admission."],
      feeWaiver: ["Brandeis fee-waiver page says the fee is waived when the Common App fee-waiver process is completed."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Niche", "Brandeis facts pages"],
    lastUpdated: "Audited embedded record"
  },
  "Brown University": {
    universityOverview: "Brown is famous for its open curriculum, which gives students exceptional freedom to design their studies without general education requirements in the traditional sense. It is especially strong in computer science, economics, applied mathematics, public policy, and interdisciplinary study, and students benefit from a collaborative intellectual culture, high research access, and flexibility across departments.",
    nicheLink: "https://www.niche.com/colleges/brown-university/",
    admissionsLink: "https://www.niche.com/colleges/brown-university/admissions/",
    officialWebsite: "https://www.brown.edu/",
    officialAdmissionsWebsite: "https://admission.brown.edu/",
    commonDataSetLink: "https://oir.brown.edu/sites/default/files/2020-04/CDS_2024_2025.pdf",
    sourceLinks: [
      { label: "Niche profile", url: "https://www.niche.com/colleges/brown-university/", type: "Niche" },
      { label: "Brown admission by the numbers", url: "https://admission.brown.edu/explore/brown-admission-numbers", type: "Official" },
      { label: "Brown international applicants", url: "https://admission.brown.edu/ask/international-applicants", type: "Official" },
      { label: "Brown cost of attendance", url: "https://finaid.brown.edu/estimate-cost-aid/cost", type: "Official" }
    ],
    acceptanceRateAll: "5.65%",
    dataClassOf: "Class of 2029 profile and 2026–27 cost pages",
    satActPolicy: "Required for first-year applicants",
    satRange: "1480–1560",
    admissionsObs1: "Brown offers Early Decision and Regular Decision only.",
    admissionsObs2: "Brown returned to requiring SAT or ACT scores for first-year applicants beginning with the 2024–25 admission cycle.",
    englishProficiencyScore: "Minimum scores expected in most cases: TOEFL 105 (pre-Jan 2026 exam format), IELTS 8.0, Duolingo 130, PTE 75, Cambridge 191",
    englishObs: "Brown notes that official score reports are required for matriculating students who self-report an English proficiency test result.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 5",
    earlyDeadline: "November 1",
    eaEdEd2: "ED only",
    appObs1: "Application is submitted through the Common Application plus Brown Member section.",
    appObs2: "Application fee is $80, or fee waiver; Brown does not provide CSS Profile fee waivers directly, relying instead on College Board eligibility.",
    totalUndergraduateStudents: "7,741",
    city: "Providence, Rhode Island",
    studentFacultyRatio: "6:1",
    internationalStudents: "14% of students come from abroad",
    internationalTuitionFees: "$74,568 tuition + $3,084 fees (2026–27 cost of attendance)",
    totalCostOfAttendance: "$99,984 (2026–27)",
    needBasedAidInternational: "Yes — Brown is need-blind for international first-year students and meets full demonstrated need for admitted students who apply for aid.",
    meritScholarshipInternational: "No — Brown’s undergraduate aid is need-based rather than merit-based",
    personalComments: "Brown is best for students who want maximum academic freedom inside a top research university and can thrive in a self-directed intellectual environment.",
    feeWaiver: "$80 application fee or fee waiver; CSS Profile fee waivers are not provided directly by Brown",
    academicsLikesDislikes: "Students consistently praise the open curriculum, collaborative intellectual culture, and undergraduate research access; the main trade-off is that the freedom of the academic structure can feel overwhelming if you prefer a more prescribed path.",
    majors: ["Computer Science", "Economics", "Computational and Applied Mathematics", "International and Public Affairs", "Biology"],
    academicProgramming: ["Open curriculum", "80+ undergraduate concentrations", "Independent concentrations", "Undergraduate research"],
    highlights: ["Open curriculum", "Need-blind for international first-years", "Required SAT/ACT", "6:1 student-faculty ratio"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Brown Admission by the Numbers reports a 5.65% acceptance rate for the undergraduate Class of 2029."],
      satRange: ["Brown Admission by the Numbers reports a 1480–1560 middle-50% SAT range."],
      satActPolicy: ["Brown’s standardized testing page says SAT or ACT scores are required for first-year applicants."],
      englishProficiencyScore: ["Brown’s international applicants page lists minimum expected scores including TOEFL 105, IELTS 8.0, and Duolingo 130 in most cases."],
      totalCostOfAttendance: ["Brown’s cost-of-attendance page lists $99,984 for 2026–27."],
      needBasedAidInternational: ["Brown’s international applicants page states that Brown adopted a need-blind admission process for international first-year students starting with the class of 2029."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Niche", "Brown by the numbers"],
    lastUpdated: "Audited embedded record"
  },
  "Bryn Mawr College": {
    universityOverview: "Bryn Mawr is best known for its rigorous intellectual culture and the distinctive advantages of a women’s liberal arts college connected to the Tri-College Consortium and select Penn opportunities. It is particularly strong in the humanities, social sciences, and women-in-STEM pathways, and students benefit from seminar-driven classes, close advising, and broad cross-registration opportunities beyond the main campus.",
    nicheLink: "https://www.niche.com/colleges/bryn-mawr-college/",
    admissionsLink: "https://www.niche.com/colleges/bryn-mawr-college/admissions/",
    officialWebsite: "https://www.brynmawr.edu/",
    officialAdmissionsWebsite: "https://www.brynmawr.edu/admissions-aid",
    commonDataSetLink: "https://www.brynmawr.edu/sites/default/files/media/documents/2024-12/CDS-2024-2025-Bryn%20Mawr%20Read%20Only.pdf",
    sourceLinks: [
      { label: "Niche profile", url: "https://www.niche.com/colleges/bryn-mawr-college/", type: "Niche" },
      { label: "Meet the Class", url: "https://www.brynmawr.edu/admissions-aid/policies-resources/meet-class", type: "Official" },
      { label: "Tuition, Fees, and Costs", url: "https://www.brynmawr.edu/admissions-aid/financial-aid/tuition-fees-costs", type: "Official" },
      { label: "Admissions policies", url: "https://www.brynmawr.edu/admissions-aid/policies-resources/admissions-policies", type: "Official" }
    ],
    acceptanceRateAll: "29%",
    dataClassOf: "Class of 2028 profile and 2026–27 tuition pages",
    satActPolicy: "Test-optional",
    satRange: "1290–1490",
    admissionsObs1: "Bryn Mawr offers Early Decision and Regular Decision.",
    admissionsObs2: "The institution reports a 29% admit rate for the Class of 2028; Niche currently displays 31% on some public pages.",
    englishProficiencyScore: "Minimum scores for consideration: TOEFL 100, IELTS 7.0, Duolingo 130",
    englishObs: "Applicants can request an English-language-proficiency waiver after submitting the Common Application and accessing the applicant portal.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 15",
    earlyDeadline: "November 15",
    eaEdEd2: "ED only",
    appObs1: "Bryn Mawr has no application fee.",
    appObs2: "International applicants can request a CSS Profile fee waiver through the applicant portal Declaration of Finances workflow.",
    totalUndergraduateStudents: "1,403",
    city: "Bryn Mawr, Pennsylvania",
    studentFacultyRatio: "8:1",
    internationalStudents: "13% of the Class of 2028; 23 countries represented",
    internationalTuitionFees: "$71,290 tuition + $1,120 college fee (2026–27)",
    totalCostOfAttendance: "$94,850 direct billed costs before indirect expenses (2026–27)",
    needBasedAidInternational: "Yes — Bryn Mawr states it meets 100% of demonstrated financial need for undergraduates and provides an international first-year aid process.",
    meritScholarshipInternational: "Not emphasized on current undergraduate aid pages reviewed; older Bryn Mawr materials mention merit scholarships, but the current main admissions-aid pages foreground demonstrated-need aid.",
    personalComments: "A strong fit for students seeking a highly intellectual women’s college with Tri-College access, strong writing culture, and unusually personal faculty contact.",
    feeWaiver: "Yes — no application fee; CSS Profile waiver requests available for eligible international applicants",
    academicsLikesDislikes: "Students tend to praise the intellectual culture, close professor relationships, and consortium flexibility; the trade-off is that the environment can feel serious and academically demanding.",
    majors: ["Psychology", "Political Science", "Biology", "English", "Economics"],
    academicProgramming: ["Tri-College Consortium", "Women’s liberal arts college model", "Cross-registration with Haverford and Penn"],
    highlights: ["No application fee", "8:1 student-faculty ratio", "100% of need met", "Tri-College access"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official + Niche",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Niche + CDS",
      earlyDeadline: "Niche + CDS",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official + historical institutional materials",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Bryn Mawr’s Class of 2028 page reports a 29% admit rate."],
      satRange: ["Bryn Mawr’s incoming cohort academics page reports a 1290–1490 SAT composite middle-50% range."],
      englishProficiencyScore: ["Bryn Mawr admissions policies list minimum scores of TOEFL 100, IELTS 7, and Duolingo 130."],
      feeWaiver: ["Bryn Mawr states that it has no application fee.", "The international-aid page explains how CSS Profile fee-waiver requests are handled through the applicant portal."],
      totalCostOfAttendance: ["Bryn Mawr’s tuition and costs page lists tuition of $71,290, food and housing of $21,440, and a $1,120 college fee for 2026–27."],
      needBasedAidInternational: ["Bryn Mawr’s admissions and aid landing page says it meets 100% of demonstrated financial need for all undergraduates."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official aid pages", "Niche", "Official class profile"],
    lastUpdated: "Audited embedded record"
  },
  "Carleton College": {
    universityOverview: "Carleton is widely known for elite undergraduate teaching, a highly intellectual campus culture, and unusually strong preparation in both the sciences and the liberal arts. It is especially respected in economics, political science, computer science, mathematics, and the natural sciences, and students benefit from the trimester system, small classes, close faculty relationships, and strong support for research and internships.",
    nicheLink: "https://www.niche.com/colleges/carleton-college/",
    admissionsLink: "https://www.niche.com/colleges/carleton-college/admissions/",
    officialWebsite: "https://www.carleton.edu/",
    officialAdmissionsWebsite: "https://www.carleton.edu/admissions/",
    commonDataSetLink: "https://www.carleton.edu/admissions/apply/steps/profile/",
    sourceLinks: [
      { label: "Niche profile", url: "https://www.niche.com/colleges/carleton-college/", type: "Niche" },
      { label: "Class of 2029 profile", url: "https://www.carleton.edu/admissions/apply/steps/profile/", type: "Official" },
      { label: "International students", url: "https://www.carleton.edu/admissions/apply/steps/international/", type: "Official" },
      { label: "Carleton admissions home", url: "https://www.carleton.edu/admissions/", type: "Official" }
    ],
    acceptanceRateAll: "20%",
    dataClassOf: "Class of 2029 profile and 2025–26 / 2026–27 cost pages",
    satActPolicy: "Test-optional",
    satRange: "1430–1550",
    admissionsObs1: "Carleton offers Early Decision and Regular Decision.",
    admissionsObs2: "The Class of 2029 profile reports a 20% admission rate, while Niche currently shows 22% on some public pages.",
    englishProficiencyScore: "Carleton’s undergraduate international pages reviewed do not publish a minimum score; students with four years of English-medium schooling may request a waiver.",
    englishObs: "Carleton explicitly allows an English-proficiency waiver for students who have attended an English-medium school for four years.",
    duolingoAccepted: "Not specified on the undergraduate page reviewed",
    regularDeadline: "January 15",
    earlyDeadline: "November 15",
    eaEdEd2: "ED only",
    appObs1: "There is no fee to apply to Carleton.",
    appObs2: "International applicants must submit the Certification of Finances after applying, regardless of whether they are seeking aid.",
    totalUndergraduateStudents: "2,069",
    city: "Northfield, Minnesota",
    studentFacultyRatio: "8:1",
    internationalStudents: "17 countries represented in the Class of 2029 profile",
    internationalTuitionFees: "$94,980 comprehensive fee (2026–27)",
    totalCostOfAttendance: "$99,580 (2025–26 estimate)",
    needBasedAidInternational: "Yes — Carleton met the full financial need of all students in the Class of 2029 and provides an international aid application process.",
    meritScholarshipInternational: "No separate merit scholarship structure emphasized on the main admissions and financial-aid pages reviewed",
    personalComments: "Carleton is especially strong for students who want a highly teaching-centered liberal arts college with elite academic depth, strong internships, and very high faculty contact.",
    feeWaiver: "Yes — there is no application fee",
    academicsLikesDislikes: "Students often praise the teaching quality, intellectual seriousness, and internship outcomes; the main trade-off is a colder climate and a more self-contained small-town setting.",
    majors: ["Computer Science", "Biology", "International Relations", "Economics", "Political Science"],
    academicProgramming: ["Liberal arts curriculum", "High internship participation", "Strong undergraduate teaching focus"],
    highlights: ["8:1 student-faculty ratio", "No application fee", "20% admit rate", "More than two-thirds complete an internship"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Niche + institutional positioning",
      satRange: "Niche",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Niche",
      earlyDeadline: "Niche",
      totalUndergraduateStudents: "Niche",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Carleton’s Class of 2029 profile reports a 20% admission rate."],
      satRange: ["Niche admissions page lists a 1430–1550 SAT range."],
      studentFacultyRatio: ["Carleton admissions pages state an 8:1 student-faculty ratio."],
      totalCostOfAttendance: ["Carleton’s international students page lists a 2025–26 estimated cost of attendance of $99,580."],
      feeWaiver: ["Carleton admissions FAQ says there is no fee to apply."],
      needBasedAidInternational: ["Carleton’s Class of 2029 profile says it met the full financial need of all students in the class."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Niche", "Class profile pages"],
    lastUpdated: "Audited embedded record"
  },
  "Harvard University": {
    universityOverview: "Harvard is famous for its unmatched global prestige, enormous academic breadth, and extraordinary access to research, faculty, and institutional resources across nearly every field. It is especially strong in economics, government, computer science, applied mathematics, life sciences, and the humanities, and students benefit from world-class libraries, cross-school opportunities, funded research, and a vast global alumni network.",
    nicheLink: "https://www.niche.com/colleges/harvard-university/",
    admissionsLink: "https://www.niche.com/colleges/harvard-university/admissions/",
    officialWebsite: "https://www.harvard.edu/",
    officialAdmissionsWebsite: "https://college.harvard.edu/admissions",
    commonDataSetLink: "https://oira.harvard.edu/common-data-set/",
    sourceLinks: [
      { label: "Harvard admissions statistics", url: "https://college.harvard.edu/admissions/admissions-statistics", type: "Official" },
      { label: "Harvard international applicants", url: "https://college.harvard.edu/admissions/apply/international-applicants", type: "Official" },
      { label: "Harvard how aid works", url: "https://college.harvard.edu/financial-aid/how-aid-works", type: "Official" },
      { label: "Harvard academics", url: "https://college.harvard.edu/about", type: "Official" },
      { label: "Niche profile", url: "https://www.niche.com/colleges/harvard-university/", type: "Niche" }
    ],
    acceptanceRateAll: "4.2%",
    dataClassOf: "Class of 2029 admissions statistics and 2025–26 cost pages",
    satActPolicy: "Required",
    satRange: "1500–1580",
    admissionsObs1: "Harvard’s current admissions statistics page shows 47,893 applicants and 2,003 admitted students for the Class of 2029.",
    admissionsObs2: "Harvard uses Restrictive Early Action rather than Early Decision.",
    englishProficiencyScore: "Harvard does not require TOEFL, IELTS, or Duolingo. Those exams may be submitted for review but do not satisfy the standardized testing requirement.",
    englishObs: "Harvard explicitly says English-language-proficiency exams cannot be used to meet the standardized-testing requirement.",
    duolingoAccepted: "May be submitted for review, but not used to meet the testing requirement",
    regularDeadline: "January 1",
    earlyDeadline: "November 1",
    eaEdEd2: "Restrictive Early Action",
    appObs1: "Harvard’s application fee is $90 or fee waiver.",
    appObs2: "Harvard meets demonstrated need and makes admissions decisions without regard to citizenship or whether the applicant has applied for aid.",
    totalUndergraduateStudents: "7,103",
    city: "Cambridge, Massachusetts",
    studentFacultyRatio: "7:1",
    internationalStudents: "16% of the Class of 2029 by permanent-address geography classification",
    internationalTuitionFees: "$59,320 tuition + $5,476 fees (2025–26)",
    totalCostOfAttendance: "$90,426–$95,426 before health insurance; health insurance adds $4,308 unless waived",
    needBasedAidInternational: "Yes — Harvard says its admissions and financial-aid processes are the same for all applicants regardless of nationality or citizenship and that it meets each student’s demonstrated need.",
    meritScholarshipInternational: "No — Harvard undergraduate aid is need-based, not merit-based.",
    personalComments: "Harvard is best for students who want the broadest possible academic and extracurricular ecosystem, intense selectivity, and one of the strongest need-based aid systems in the world.",
    feeWaiver: "$90 fee or fee waiver; Harvard also publishes a Harvard-specific fee-waiver code for eligible Coalition applicants facing hardship",
    academicsLikesDislikes: "Students often value the extraordinary academic resources, prestige, and breadth of options; the trade-off is that the environment can feel intensely competitive and highly self-directed.",
    majors: ["Economics", "Computer Science", "Government", "Applied Mathematics", "Social Sciences"],
    academicProgramming: ["50 concentrations", "49 secondary fields", "Open exploration within liberal arts and sciences"],
    highlights: ["4.2% admit rate", "1500–1580 SAT range", "7:1 student-faculty ratio", "Need-based aid for all admitted students"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Niche",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official + Niche",
      earlyDeadline: "Official + Niche",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Harvard’s admissions statistics page lists 47,893 applicants and 2,003 admitted students for the Class of 2029, which is about 4.2%."],
      satRange: ["Niche’s Harvard admissions page lists an SAT range of 1500–1580."],
      satActPolicy: ["Harvard’s international-applicants and standardized-testing pages say SAT or ACT is required, with limited alternative pathways only when those exams are inaccessible."],
      englishProficiencyScore: ["Harvard’s international-applicants and FAQ pages state that TOEFL, IELTS, and Duolingo are not required and cannot satisfy the testing requirement, though they may be submitted for review."],
      totalUndergraduateStudents: ["Harvard’s About page lists 7,103 students and a 7:1 student-to-faculty ratio."],
      internationalStudents: ["Harvard’s admissions statistics page lists 16% of the Class of 2029 in the International geography category based on permanent address."],
      totalCostOfAttendance: ["Harvard’s how-aid-works page lists a 2025–26 cost of attendance of $90,426–$95,426 before health insurance."],
      feeWaiver: ["Harvard’s admissions and FAQ pages say the fee is $90 and will be waived for hardship; they also list a Harvard-specific Coalition fee-waiver code."],
      needBasedAidInternational: ["Harvard’s international-applicants page says admissions and financial-aid processes are the same regardless of nationality or citizenship and that Harvard meets each student’s demonstrated need."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Official college facts", "Niche"],
    lastUpdated: "Audited embedded record"
  },
  "University of Pennsylvania": {
    universityOverview: "Penn is especially known for combining Ivy-level academics with one of the strongest pre-professional ecosystems in the world, anchored by Wharton but extending far beyond business into policy, engineering, computer science, biology, and interdisciplinary study. Students benefit from the ability to take classes across multiple undergraduate schools, pursue dual degrees and coordinated programs, engage in major research early, and build unusually strong academic-to-career pathways in Philadelphia. It is a university that rewards ambition, initiative, and intellectual flexibility, especially for students who want both elite scholarship and practical professional preparation in the same environment.",
    nicheLink: "https://www.niche.com/colleges/university-of-pennsylvania/",
    admissionsLink: "https://www.niche.com/colleges/university-of-pennsylvania/admissions/",
    officialWebsite: "https://www.upenn.edu/",
    officialAdmissionsWebsite: "https://admissions.upenn.edu/",
    commonDataSetLink: "https://ira.upenn.edu/common-data-set",
    sourceLinks: [
      { label: "Penn facts", url: "https://www.upenn.edu/about/facts", type: "Official" },
      { label: "Penn incoming class profile", url: "https://admissions.upenn.edu/how-to-apply/resources-programs/incoming-class-profile", type: "Official" },
      { label: "Penn first-year applicants", url: "https://admissions.upenn.edu/how-to-apply/first-year-applicants", type: "Official" },
      { label: "Penn testing", url: "https://admissions.upenn.edu/how-to-apply/preparing-your-application/testing", type: "Official" },
      { label: "Penn international applicants", url: "https://admissions.upenn.edu/how-to-apply/international-applicants", type: "Official" },
      { label: "Penn cost of attendance", url: "https://srfs.upenn.edu/costs-budgeting/undergraduate-cost-attendance", type: "Official" },
      { label: "Penn financial aid", url: "https://admissions.upenn.edu/affording-penn/financial-aid", type: "Official" }
    ],
    acceptanceRateAll: "5%",
    dataClassOf: "Class of 2029 admissions facts and 2025–26 cost pages",
    satActPolicy: "Required for the 2025–26 application cycle, with hardship-based testing waivers available",
    satRange: "1510–1560",
    admissionsObs1: "Penn offers Early Decision and Regular Decision.",
    admissionsObs2: "Penn’s official facts page reports 72,544 applications and 3,570 offers of admission for the Class of 2029.",
    englishProficiencyScore: "Competitive applicants tend to have IELTS 7+ and Duolingo 130+; applicants who do not meet Penn’s English-language instruction criteria must submit TOEFL, IELTS, or Duolingo.",
    englishObs: "English proficiency is waived if English is the applicant’s native language or primary language of instruction throughout high school.",
    duolingoAccepted: "Yes",
    regularDeadline: "January 5",
    earlyDeadline: "November 1",
    eaEdEd2: "Early Decision",
    appObs1: "$75 application fee or fee waiver through Common App or Coalition.",
    appObs2: "Penn is need-aware for international applicants, but admitted international students are eligible for full grant-based aid that meets 100% of demonstrated need.",
    totalUndergraduateStudents: "9,962 full-time + 509 part-time undergraduates",
    city: "Philadelphia, Pennsylvania",
    studentFacultyRatio: "6:1",
    internationalStudents: "15% of the incoming class by home address, with students from 90+ nations",
    internationalTuitionFees: "$63,204 tuition + $8,032 fees (2025–26)",
    totalCostOfAttendance: "$95,612 estimated on-campus total budget (2025–26)",
    needBasedAidInternational: "Yes — Penn is need-aware for international applicants, but admitted international students receive grant-based aid meeting 100% of demonstrated need.",
    meritScholarshipInternational: "No — Penn says undergraduate aid is entirely need-based and it does not award scholarships based on academic or athletic merit.",
    personalComments: "Penn is especially strong for students who want an elite university with powerful pre-professional options, especially in business, policy, engineering, and interdisciplinary study, all in a major city.",
    feeWaiver: "$75 fee or fee waiver through Common App or Coalition",
    academicsLikesDislikes: "Students are often drawn to Penn’s energy, Wharton adjacency, and interdisciplinary structure; the trade-off is that the environment can feel especially ambitious and professionally oriented.",
    majors: ["Economics", "Political Science", "Computer Science", "Business", "Biology"],
    academicProgramming: ["Four undergraduate schools", "Interdisciplinary pathways", "Grant-based aid with no merit scholarships"],
    highlights: ["5% admit rate", "1510–1560 SAT range", "6:1 student-faculty ratio", "15% international by home address"],
    sourceMap: {
      acceptanceRateAll: "Official",
      satActPolicy: "Official",
      satRange: "Official",
      englishProficiencyScore: "Official",
      duolingoAccepted: "Official",
      regularDeadline: "Official",
      earlyDeadline: "Official",
      totalUndergraduateStudents: "Official",
      city: "Official",
      studentFacultyRatio: "Official",
      internationalStudents: "Official",
      internationalTuitionFees: "Official",
      totalCostOfAttendance: "Official",
      needBasedAidInternational: "Official",
      meritScholarshipInternational: "Official",
      feeWaiver: "Official",
      academicsLikesDislikes: "Niche + Official"
    },
    fieldEvidence: {
      acceptanceRateAll: ["Penn’s official facts page reports 72,544 applications and 3,570 offers of admission for the Class of 2029, or 5%."],
      satRange: ["Penn’s incoming class profile lists a 1510–1560 SAT range for enrolled students who submitted scores."],
      satActPolicy: ["Penn’s testing page says SAT or ACT is required for the 2025–26 admissions cycle, with a hardship-based testing waiver available."],
      regularDeadline: ["Penn’s first-year-applicants page lists November 1 for Early Decision and January 5 for Regular Decision."],
      englishProficiencyScore: ["Penn’s international-applicants page says applicants who do not meet the English-language criteria must submit TOEFL, IELTS, or Duolingo, and Penn’s FAQ says competitive applicants tend to have IELTS 7+ and Duolingo 130+."],
      totalUndergraduateStudents: ["Penn’s official facts page lists 9,962 full-time and 509 part-time undergraduates."],
      studentFacultyRatio: ["Penn’s official facts page reports a 6:1 student-to-faculty ratio."],
      internationalStudents: ["Penn’s incoming class profile says 15% of the incoming class has home addresses outside the U.S., representing 90+ nations."],
      totalCostOfAttendance: ["Penn’s cost-of-attendance page lists a 2025–26 on-campus total budget of $95,612."],
      needBasedAidInternational: ["Penn’s admissions financial-aid page says Penn is need-aware for international applicants, and SRFS says admitted international students receive grant-based aid meeting 100% of demonstrated need."],
      meritScholarshipInternational: ["Penn’s grants-and-scholarships page says Penn undergraduate aid is entirely need-based and that the university does not award scholarships based on academic or athletic merit."],
      feeWaiver: ["Penn’s application requirements page says the application fee is $75 and that fee waivers may be requested through either the Common App or Coalition Application."]
    },
    backendSourcesUsed: ["Official admissions pages", "Official financial aid pages", "Official cost pages"],
    lastUpdated: "Audited embedded record"
  }
};

const DEMO_RECORDS = BASE_SCHOOL_PROFILES.map((profile) => normalizeRecord({ ...buildGenericRecord(profile), ...(DETAILED_OVERRIDES[profile.universityName] || {}) }));
const UNIVERSITY_OPTIONS = DEMO_RECORDS.map((record) => record.universityName);

function integratedDemoApiSearch(payload) {
  const universityName = safe(payload?.universityName).toLowerCase();
  const normalizedQuery = normalizeKey(universityName);

  const candidates = DEMO_RECORDS.map((record) => {
    const name = normalizeKey(record.universityName);
    let score = 0;
    if (name === normalizedQuery) score += 100;
    if (name.includes(normalizedQuery) || normalizedQuery.includes(name)) score += 60;
    normalizedQuery.split(" ").forEach((token) => {
      if (token && name.includes(token)) score += 10;
    });
    return { record, score };
  }).sort((a, b) => b.score - a.score);

  const best = candidates[0];
  if (!best || best.score <= 0) {
    return Promise.reject(new Error("Integrated demo API could not find that university in the current dropdown list."));
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(normalizeRecord(best.record));
    }, 250);
  });
}

async function fetchUniversityRecord({ universityName }) {
  return integratedDemoApiSearch({ universityName });
}

export default function UniversityIntelligenceDashboard() {
  useEffect(() => {
    document.title = "💖 Anna's University Dashboard";
  }, []);
  const [query, setQuery] = useState(UNIVERSITY_OPTIONS[0] || "");
    const [status, setStatus] = useState("University list ready. Select a university from the dropdown.");
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState(normalizeRecord(DEMO_RECORDS[0] || DEFAULT_RECORD));

  const analysisCards = useMemo(() => {
    return SUBJECTIVE_SECTIONS.map(([key, label]) => {
      const entry = record.subjectiveAnalysis?.[key] || {};
      return {
        key,
        label,
        score: clampScore(entry.score),
        confidence: clampScore(entry.confidence),
        text: safe(entry.text),
        evidence: normalizeArray(entry.evidence),
        indicators: normalizeIndicators(entry.indicators)
      };
    });
  }, [record]);

  async function runSearch(selectedUniversity) {
    setLoading(true);
    setStatus("");

    try {
      const universityName = safe(selectedUniversity) === "—" ? "" : String(selectedUniversity).trim();
      if (!universityName) {
        setStatus("Select a university first.");
        return;
      }

      const data = await fetchUniversityRecord({ universityName });
      setRecord(data);
      setStatus("University record loaded.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setStatus(`Search failed: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectChange(event) {
    const selected = event.target.value;
    setQuery(selected);
    await runSearch(selected);
  }

  async function handleSearch() {
    await runSearch(query);
  }

  function loadDemo() {
    setQuery(UNIVERSITY_OPTIONS[0] || "");
    setRecord(normalizeRecord(DEMO_RECORDS[0] || DEFAULT_RECORD));
    setStatus("List reset. Select a university from the dropdown.");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl p-6 md:p-10">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">
                <Icon symbol="💖" className="text-sm" />
                Anna's University Dashboard
              </div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">💖 Anna's University Dashboard</h1>
              <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
                Use this program to automatically gather university data and support the creation of a well-informed college list. It is designed to streamline the research process, organize key information efficiently, and make college list building more practical and strategic.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-3.5 text-sm text-slate-400" aria-hidden="true">
                    🎓
                  </span>
                  <select
                    value={query}
                    onChange={handleSelectChange}
                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-slate-400"
                  >
                    {UNIVERSITY_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={loadDemo}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Icon symbol="🧩" className="text-sm" />
                Sources used in the records
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="blue">Embedded university records</Badge>
                <Badge tone="amber">Niche</Badge>
                <Badge tone="green">Official admissions</Badge>
                <Badge tone="green">Common Data Set</Badge>
                <Badge tone="amber">IPEDS</Badge>
                <Badge tone="amber">Wikipedia</Badge>
                <Badge tone="blue">Generated quantified analysis</Badge>
                <Badge tone="rose">50-school dropdown</Badge>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                The dashboard includes a dedicated SAT Range field and an embedded university list.
              </p>
            </div>
          </div>

          {status ? (
            <div className="mt-4 flex items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <Icon symbol="✅" className="mt-0.5 text-sm shrink-0" />
              <span>{status}</span>
            </div>
          ) : null}
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={<Icon symbol="🎓" className="text-sm" />} label="University" value={record.universityName} />
          <MetricCard icon={<Icon symbol="✅" className="text-sm" />} label="Acceptance Rate" value={record.acceptanceRateAll} source={record.sourceMap?.acceptanceRateAll} />
          <MetricCard icon={<Icon symbol="📊" className="text-sm" />} label="SAT Range" value={record.satRange} source={record.sourceMap?.satRange} />
          <MetricCard icon={<Icon symbol="📍" className="text-sm" />} label="City" value={record.city} source={record.sourceMap?.city} />
        </div>

        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-xl font-semibold">University overview</h2>
          </div>
          <p className="text-sm leading-7 text-slate-700 md:text-base">{safe(record.universityOverview)}</p>
        </div>

        <div className="mb-8 grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Normalized data sheet</h2>
                <p className="mt-1 text-sm text-slate-600">Objective fields, links, aid, deadlines, academics, and notes.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => exportJson(record)} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <Icon symbol="⬇️" className="text-sm" /> JSON
                </button>
                <button onClick={() => exportCsv(record)} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <Icon symbol="⬇️" className="text-sm" /> CSV
                </button>
              </div>
            </div>

            <div>
              {FIELD_ORDER.map(([label, key]) => (
                <FieldRow key={key} label={label} value={record[key]} source={record.sourceMap?.[key]} evidence={record.fieldEvidence?.[key]} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Icon symbol="🔗" className="text-base" />
                <h2 className="text-xl font-semibold">Source links</h2>
              </div>
              <div className="space-y-3 text-sm">
                {record.sourceLinks.length ? (
                  record.sourceLinks.map((item, index) => (
                    <div key={`${item.label}-${index}`} className="rounded-2xl border border-slate-100 p-3">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <div className="font-medium text-slate-800">{item.label}</div>
                        {item.type !== "—" ? <Badge tone={sourceTone(item.type)}>{item.type}</Badge> : null}
                      </div>
                      <LinkValue value={item.url} />
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500">No source links returned yet.</div>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Icon symbol="🧠" className="text-base" />
                <h2 className="text-xl font-semibold">Data coverage</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {record.backendSourcesUsed.length ? (
                  record.backendSourcesUsed.map((item, index) => (
                    <Badge key={`${item}-${index}`} tone={sourceTone(item)}>
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">No source summary available yet.</span>
                )}
              </div>
              <div className="mt-4 text-sm leading-6 text-slate-600">
                {record.lastUpdated ? `Last updated: ${record.lastUpdated}` : "A timestamp can be added once the record is fully audited."}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Icon symbol="⭐" className="text-base" />
                <h2 className="text-xl font-semibold">Highlights</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {(record.highlights || []).length ? (
                  record.highlights.map((item, index) => (
                    <Badge key={`${item}-${index}`} tone="slate">
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">No highlights returned yet.</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-2">
            <Icon symbol="✨" className="text-base" />
            <div>
              <h2 className="text-xl font-semibold">Quantified analysis</h2>
              <p className="mt-1 text-sm text-slate-600">Each category includes a 0–100 score, confidence level, concise conclusion, and numeric indicators.</p>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {analysisCards.map((item) => (
              <div key={item.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <div className="text-sm font-medium text-slate-800">{item.label}</div>
                  <ScoreChip label="Score" value={`${item.score}/100`} tone="green" />
                  <ScoreChip label="Confidence" value={`${item.confidence}/100`} tone="amber" />
                </div>
                <p className="text-sm leading-6 text-slate-700">{item.text}</p>
                <IndicatorTable indicators={item.indicators} />
                {item.evidence.length ? (
                  <ul className="mt-3 space-y-1 text-xs leading-5 text-slate-500">
                    {item.evidence.map((evidenceItem, index) => (
                      <li key={`${item.key}-${index}`}>• {evidenceItem}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
