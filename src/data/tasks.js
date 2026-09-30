/**
 * Initial dataset for Task Manager
 * Realistic academic, study, and personal tasks
 */

export const initialTasks = [
  {
    id: 1,
    title: "Complete DBMS Assignment",
    description: "Prepare the ER diagram, normalization, and SQL queries for the DBMS assignment.",
    priority: "High",
    category: "Study",
    dueDate: "28 Aug 2026",
    status: "Pending",
    tags: ["DBMS", "ER Diagram", "Normalization", "SQL"],
  },
  {
    id: 2,
    title: "Computer Networks Seminar",
    description: "Prepare presentation slides and protocol architecture analysis for the seminar.",
    priority: "Medium",
    category: "Study",
    dueDate: "30 Aug 2026",
    status: "Pending",
    tags: ["Networking", "Slides", "Protocols", "TCP/IP"],
  },
  {
    id: 3,
    title: "Scholarship Renewal",
    description: "Submit quarterly scholarship renewal documents and academic transcripts to registrar.",
    priority: "High",
    category: "Personal",
    dueDate: "02 Sep 2026",
    status: "Pending",
    tags: ["Registrar", "Documents", "Finance"],
  },
  {
    id: 4,
    title: "React Router Nested Routes",
    description: "Implement nested routing outlet hierarchy and dynamic parameters in web project.",
    priority: "Medium",
    category: "Work",
    dueDate: "05 Sep 2026",
    status: "Pending",
    tags: ["React", "Routing", "Frontend", "Vite"],
  },
  {
    id: 5,
    title: "OOP Lecture Review",
    description: "Review Object Oriented Programming lecture notes on polymorphism and inheritance.",
    priority: "Low",
    category: "Study",
    dueDate: "10 Sep 2026",
    status: "Pending",
    tags: ["OOP", "Java", "Concepts"],
  },
  {
    id: 6,
    title: "Web Lab Environment Setup",
    description: "Configure Vite, React 19, and Node runtime for the upcoming web technologies lab.",
    priority: "Medium",
    category: "Study",
    dueDate: "24 Aug 2026",
    status: "Completed",
    tags: ["Setup", "Vite", "Node"],
  },
  {
    id: 7,
    title: "Library Card Renewal",
    description: "Renew college library membership card and return semester reference textbooks.",
    priority: "Low",
    category: "Personal",
    dueDate: "25 Aug 2026",
    status: "Completed",
    tags: ["Library", "Books", "Campus"],
  },
];

export const CATEGORIES = ["Study", "Personal", "Work"];
export const PRIORITIES = ["Low", "Medium", "High"];
export const STATUSES = ["Pending", "Completed"];
