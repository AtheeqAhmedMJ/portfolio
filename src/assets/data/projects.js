const projects = [
  {
    id: 1,
    title: "Harvest Box (AI Crop Monitoring System)",
    techStack: ["React.js", "Spring Boot", "FastAPI", "Docker", "AWS"],
    summary: "A cloud-based AI-powered crop health monitoring system that detects plant diseases from leaf images and generates automated reports.",
    features: [
      "Image-based disease detection using ML models.",
      "FastAPI microservice for real-time inference.",
      "Spring Boot backend for API orchestration.",
      "Automated report generation with disease insights.",
      "Containerized deployment using Docker and AWS."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/Harvest-Box"
  },
  {
    id: 2,
    title: "Health Box (Hospital Management System)",
    techStack: ["Spring Boot", "React.js", "PostgreSQL"],
    summary: "A full-scale hospital and pharmacy ERP system designed for clinics, handling EMR, billing, appointments, and role-based workflows.",
    features: [
      "Electronic Medical Records (EMR) management.",
      "Role-based access control (RBAC) for staff.",
      "Appointment scheduling and billing system.",
      "Secure REST API architecture.",
      "Modular backend design for scalability."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/Health-Box"
  },
  {
    id: 3,
    title: "MediaSphere Suite",
    techStack: ["Electron.js", "Node.js", "JavaScript"],
    summary: "A modular cross-platform media suite integrating PDF, EPUB, music, video, and document editing into a single desktop ecosystem.",
    features: [
      "Unified desktop experience for multiple media formats.",
      "Modular architecture for scalability.",
      "Offline-first functionality with local file handling.",
      "Real-time file indexing and playlist management."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/MediaSphereDocs"
  },
  {
    id: 4,
    title: "MediaSphere PDF Viewer",
    techStack: ["Electron.js", "JavaScript"],
    summary: "A dedicated cross-platform PDF viewer focused on performance and smooth navigation.",
    features: [
      "Smooth PDF rendering and navigation.",
      "Dark mode optimized for readability.",
      "Lightweight and fast Electron-based UI."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/MediaSpherePDFViewer"
  },
  {
    id: 5,
    title: "MediaSphere EPUB Viewer",
    techStack: ["Electron.js", "JavaScript"],
    summary: "An EPUB reader supporting EPUB2 and EPUB3 with responsive text rendering.",
    features: [
      "TOC parsing and chapter navigation.",
      "Customizable reading experience.",
      "Responsive layout for different screen sizes."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/MediaSphereEPUBViewer"
  },
  {
    id: 6,
    title: "MediaSphere Music Player",
    techStack: ["Electron.js", "JavaScript"],
    summary: "A feature-rich desktop music player with playlist management and custom playback controls.",
    features: [
      "Supports multiple audio formats.",
      "Drag-and-drop playlist creation.",
      "Interactive playback controls and UI."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/MediaSphereMusicPlayer"
  },
  {
    id: 7,
    title: "MediaSphere Video Player",
    techStack: ["Electron.js", "JavaScript"],
    summary: "A video player with multi-format support and customizable UI themes.",
    features: [
      "Supports MP4, AVI, MKV formats.",
      "Theme switching (dark/light).",
      "Playlist and resizable player support."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/MediaSphereVideoPlayer"
  },
  {
    id: 8,
    title: "MediaSphere Docs",
    techStack: ["Electron.js", "JavaScript"],
    summary: "A desktop document editor offering rich text editing similar to modern editors.",
    features: [
      "Rich text formatting tools.",
      "Real-time local saving.",
      "Clean and minimal writing interface."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/MediaSphereDocs"
  },
  {
    id: 9,
    title: "Pixel Pioneers",
    techStack: ["JavaScript", "Web Development"],
    summary: "A collaborative web project focused on creative frontend development and interactive UI experiences.",
    features: [
      "Interactive UI components.",
      "Frontend-focused project collaboration.",
      "Experimentation with modern web design patterns."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/pixel_pioneers"
  },
  {
    id: 10,
    title: "Meal Reminder App",
    techStack: ["Flutter", "Dart"],
    summary: "A mobile app designed to help users maintain consistent meal schedules.",
    features: [
      "Custom meal reminders.",
      "Simple and clean UI.",
      "Lightweight performance."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/meal_reminder_app"
  },
  {
    id: 11,
    title: "Smart Park (IoT Parking System)",
    techStack: ["C++", "Arduino"],
    summary: "An IoT-based smart parking system prototype for real-time slot detection.",
    features: [
      "Sensor-based parking detection.",
      "Arduino-controlled automation.",
      "Efficient space utilization logic."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/SmartPark"
  }
];

export default projects;
