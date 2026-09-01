import type { Achievement } from "./types";

/**
 * Achievements. The hackathon entry is the lead exhibit.
 * Helios Protocol's demo and repository are the ONLY external project links on the site
 * (owner-supplied this session); the three backend projects have no public links.
 */
export const achievements: Achievement[] = [
  {
    id: "prompt-rachna",
    title: "1st Place — Prompt Rachna 2.0",
    summary:
      "First place at the Prompt Rachna 2.0 hackathon (Techstacy 2.0), competing as team Spring Storm.",
    detail: [
      "Qualified through the virtual round and advanced to the finals, held live at Unstop Headquarters, Saket, Delhi, among 100+ participants.",
      "The team designed and built Helios Protocol — a cyberpunk-themed interactive storytelling experience where each decision shapes the narrative and determines the ending.",
      "Helios Protocol features multiple branching storylines with unique endings, hidden routes, time-sensitive quick-time events, story-integrated mini-games, choice-driven gameplay, and a custom cyberpunk UI/UX.",
      "Presented before a judging panel on the location.",
    ],
    meta: [
      { label: "Team", value: "Spring Storm" },
      { label: "Finals", value: "Unstop HQ, Saket, Delhi" },
      { label: "Field", value: "100+ participants" },
      { label: "Project", value: "Helios Protocol" },
    ],
    links: [
      {
        label: "Helios Protocol — live demo",
        href: "https://cyber-death2-0.vercel.app/",
        external: true,
      },
      {
        label: "Helios Protocol — repository",
        href: "https://github.com/Prakhar3518/CyberDeath2.0",
        external: true,
      },
    ],
    certificate: {
      src: "/certificate/prompt-rachna-2-0.jpeg",
      alt: "Certificate of Appreciation presented to Dhruv Bamal for being placed as 1st team in Prompt Rachna x Design Forge on 14th March 2026, conducted by The Computer Society of India Student’s chapter and Tech4Hack.",
      caption:
        "Certificate of Appreciation — Prompt Rachna x Design Forge, 14 March 2026. Computer Society of India Student’s chapter and Tech4Hack.",
    },
    featured: true,
    source: ["resume", "certificate", "owner-session-answer"],
  },
  {
    id: "leetcode",
    title: "200+ problems solved",
    summary:
      "Solved 200+ problems on LeetCode, with consistent practice in C++.",
    detail: [
      "Consistent algorithmic practice in C++, underpinning the systems-design foundation described in the professional summary.",
    ],
    meta: [
      { label: "Platform", value: "LeetCode" },
      { label: "Language", value: "C++" },
    ],
    links: [
      // Owner-supplied profile URL (session 2026-09-01).
      {
        label: "LeetCode profile",
        href: "https://leetcode.com/_dhruvbamal",
        external: true,
      },
    ],
    source: ["resume", "owner-session-answer"],
  },
  {
    id: "forage-yc",
    title: "Y Combinator Startup Simulation",
    summary:
      "Completed Y Combinator's working-startup simulation through a Forage virtual internship.",
    detail: [
      "Covered early-stage dynamics, product-market fit, and entrepreneurial problem-solving.",
      "A simulation programme, not employment.",
    ],
    meta: [
      { label: "Programme", value: "Forage Virtual Internship" },
      { label: "Kind", value: "Simulation" },
    ],
    source: "resume",
  },
];
