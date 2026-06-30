// All portfolio content lives here — edit text/data in one place.
import { Globe, Server, Database } from "lucide-react";
import maazProfile from "../../assets/maaz.jpg";
import imgFyp from "../../assets/fyp.png";
import imgInventory from "../../assets/inventory.png";
import imgQuickfix from "../../assets/quickfix.png";
import imgSnackhurt from "../../assets/snackhurt.png";

// ─── IMAGES ──────────────────────────────────────────────────────────────────
export const IMG_PROFILE = maazProfile;
export const IMG_WORKSPACE = "https://images.unsplash.com/photo-1754039984985-ef607d80113a?w=900&h=500&fit=crop&auto=format";
export const IMG_CODE = "https://images.unsplash.com/photo-1759661881353-5b9cc55e1cf4?w=900&h=500&fit=crop&auto=format";

// ─── SOCIAL / CONTACT LINKS ──────────────────────────────────────────────────
export const SOCIALS = {
  github:   "https://github.com/Maaz0869",
  linkedin: "https://www.linkedin.com/in/maaz-khan-a6076425a",
  email:    "maaz13888@gmail.com",
  phone:    "03449990869",
};

// Web3Forms access key — get a free one at https://web3forms.com using maaz13888@gmail.com.
// Paste the key here and the Contact form will email every message straight to your inbox.
export const WEB3FORMS_KEY = "17a8b29c-4d3e-4f1a-8b6c-2e9f0a1b3c5d";

// ─── ABOUT ───────────────────────────────────────────────────────────────────
export const ABOUT = {
  // Edit this text to tell your own story.
  paragraphs: [
    "I'm Maaz Khan — a MERN Stack Developer who turns ideas into fast, scalable web products. From a clean React frontend to a solid Node & MongoDB backend, I build the whole thing end-to-end and care about every detail in between.",
    "My work is driven by clean architecture, real performance, and experiences that actually feel good to use. So far I've built 4 full-stack projects — from a final-year management system and an inventory platform to an on-demand repair app and a food-ordering site.",
    "When I'm not shipping features, I'm exploring new tech, contributing to open-source, and constantly sharpening my craft. Always learning, always building.",
  ],
  facts: [
    { label: "Name", value: "Maaz Khan" },
    { label: "Role", value: "MERN Stack Developer" },
    { label: "Location", value: "Pakistan" },
    { label: "Experience", value: "Fresher" },
    { label: "Freelance", value: "Available" },
    { label: "Focus", value: "Web Apps" },
  ],
};

// ─── SKILLS ──────────────────────────────────────────────────────────────────
export const SKILLS = [
  { category: "Frontend", icon: Globe, color: "#e040fb", level: 95, items: ["React.js","Next.js","TypeScript","Tailwind CSS","Redux","HTML/CSS"] },
  { category: "Backend",  icon: Server, color: "#7c4dff", level: 90, items: ["Node.js","Express.js","REST APIs","GraphQL","Socket.io","JWT"] },
  { category: "Database", icon: Database, color: "#00bcd4", level: 88, items: ["MongoDB","Mongoose","PostgreSQL","Redis","Firebase","Supabase"] },
];

// ─── PROJECTS ────────────────────────────────────────────────────────────────
// For each project: `link` = live demo URL, `github` = repo URL.
// Leave a field as "" to hide that button. The whole card opens `link` (or github) on click.
export const PROJECTS = [
  { title:"FYP Management System", tag:"Final Year Project", desc:"Online platform to manage final-year projects end-to-end — separate student & teacher dashboards, supervisor allocation, proposal submission forms, and one-click PDF export.", tech:["React","Node.js","Express","MongoDB"], img: imgFyp, color:"#e040fb", link:"https://fyp-v1-aev6.vercel.app/", github:"" },
  { title:"Inventory Management", tag:"Business System", desc:"Inventory system for UF Cars to track stock, vehicles, and sales in real time — with a clean admin dashboard, search & filtering, and role-based access control.", tech:["React","Node.js","Express","MongoDB"], img: imgInventory, color:"#7c4dff", link:"https://inventory-for-uf-cars-wdok.vercel.app/", github:"" },
  { title:"Quick Fix", tag:"Service Platform", desc:"On-demand repair-order app that connects users with nearby technicians and handymen — booking, live request status, and ratings for fast home repairs.", tech:["React","Node.js","Express","MongoDB"], img: imgQuickfix, color:"#00bcd4", link:"https://qick-repair-order.vercel.app/", github:"" },
  { title:"The Snack Hurt", tag:"Food Ordering", desc:"Online food-ordering web app — browse the menu, add snacks to cart, and place orders through a smooth, responsive interface.", tech:["React","Node.js","Express","MongoDB"], img: imgSnackhurt, color:"#69f0ae", link:"https://the-snack-hurt-5vn5.vercel.app/", github:"" },
];

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  { role:"Learning MERN Stack", company:"Self-Taught Developer", period:"2025 — Present", desc:"Currently growing as a beginner MERN developer — going deeper into Node, Express & MongoDB and building real full-stack apps to turn what I learn into hands-on skills.", color:"#e040fb" },
  { role:"Building My First Projects", company:"Personal Projects", period:"2024 — 2025", desc:"Built 4 full-stack projects (FYP system, inventory, repair app & food-ordering site) to practice React, Node and MongoDB end-to-end.", color:"#7c4dff" },
  { role:"Web Development Foundations", company:"Self-Study", period:"2023 — 2024", desc:"Started my journey with HTML, CSS & JavaScript, then moved to React — building the fundamentals every web app stands on.", color:"#00bcd4" },
];

// ─── MISC ────────────────────────────────────────────────────────────────────
export const MARQUEE_ITEMS = ["MongoDB","Express.js","React.js","Node.js","TypeScript","Next.js","PostgreSQL","Redis","Docker","GraphQL","Socket.io","AWS"];

export const NAV = ["Home","About","Skills","Projects","Experience","Contact"];
