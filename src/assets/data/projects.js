
const projects = [
  {
    id: 1,
    title: "Banking Core Platform",
    techStack: ["Java", "Spring Boot", "React", "PostgreSQL", "Redis", "Kafka", "Docker", "Kubernetes"],
    overview: "A cloud-native microservices banking platform engineered for reliable financial transactions, concurrency control, and distributed event processing.",
    features: [
      "Implemented idempotent fund transfers using pessimistic locking and deadlock-safe ordering.",
      "Built Kafka-driven fraud detection and asynchronous event processing.",
      "Integrated Redis caching, JWT authentication, and Kubernetes autoscaling."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/banking-core-platform"
  },
  {
    id: 2,
    title: "HealthBOXD (Multi-Tenant Healthcare ERP)",
    techStack: ["Java 21", "Spring Boot", "React", "PostgreSQL", "Docker", "JWT"],
    overview: "A multi-tenant hospital management platform designed for independent healthcare operations, patient records, and clinical administration.",
    features: [
      "Implemented tenant isolation using hospital-scoped data access.",
      "Developed EMR, appointments, prescriptions, billing, and pharmacy workflows.",
      "Built JWT authentication, ABAC authorization, and audit trails."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/HealthBOXD"
  },
  {
    id: 3,
    title: "Anton (Distributed Storage Platform)",
    techStack: ["Java", "Spring Boot", "React", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
    overview: "A distributed object storage platform inspired by Amazon S3, featuring resumable uploads, file versioning, and secure resource sharing.",
    features: [
      "Implemented resumable chunked uploads and file versioning with rollback support.",
      "Built token-based sharing, JWT authentication, and owner-scoped access control.",
      "Integrated Redis metadata caching and SHA-256 integrity verification."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/anton-storage"
  },
  {
    id: 4,
    title: "EventStream (Real-Time Processing Platform)",
    techStack: ["React", "Node.js", "Express", "Kafka", "Redis", "MongoDB", "Socket.IO", "Docker"],
    overview: "A real-time event processing platform demonstrating distributed messaging, asynchronous event consumption, and live system monitoring.",
    features: [
      "Implemented Kafka-based event ingestion and asynchronous consumer processing.",
      "Integrated Redis buffering, rate tracking, and MongoDB event persistence.",
      "Built WebSocket-powered dashboards with real-time analytics and alerts."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/rte-processing-platform"
  },
  {
    id: 5,
    title: "Harvest Box (Crop Health Monitoring System)",
    techStack: ["React.js", "Spring Boot", "FastAPI", "PyTorch", "Docker", "AWS S3"],
    overview: "An agricultural intelligence platform combining crop disease detection, weather analysis, and automated diagnostic reporting.",
    features: [
      "Developed DenseNet121-based grape disease classification across four disease categories.",
      "Integrated FastAPI inference, weather intelligence, and Spring Boot orchestration.",
      "Generated PDF reports featuring disease heatmaps, forecasts, and treatment plans."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/Harvest-Box"
  },
  {
    id: 6,
    title: "Freight Cost Anomaly Assistant",
    techStack: ["Python", "Pandas", "Pytest", "LLM Integration"],
    overview: "A deterministic freight analytics system that identifies unusual transportation cost increases and evaluates supporting evidence before assigning verdicts.",
    features: [
      "Implemented historical and peer-route baselines for freight cost anomaly detection.",
      "Built evidence-based verdict classification using route, cause, and date validation.",
      "Integrated optional LLM explanations with output validation and deterministic fallbacks."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/freight-anomaly-assistant"
  },
  {
    id: 7,
    title: "Certi-Sphere (Bulk Certificate Generator)",
    techStack: ["Python", "FastAPI", "SQLAlchemy", "SQLite", "ReportLab", "Pytest"],
    overview: "A lightweight certificate generation service that processes bulk recipient data and produces downloadable PDF certificates through asynchronous jobs.",
    features: [
      "Implemented CSV and JSON ingestion with individual recipient validation.",
      "Built background processing with job tracking, failure isolation, and resumability.",
      "Generated customized PDF certificates with individual downloads and ZIP archives."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/cert-sphere"
  },
  {
    id: 8,
    title: "Smart Expense Tracker API",
    techStack: ["Java 21", "Spring Boot", "MapStruct", "JUnit", "Mockito", "OpenAPI"],
    overview: "A RESTful expense management service featuring structured API design, financial summaries, and comprehensive application testing.",
    features: [
      "Implemented layered REST APIs with complete expense CRUD operations.",
      "Developed category filtering, keyword search, and monthly expense summaries.",
      "Integrated DTO mapping, validation, exception handling, and automated tests."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/expense-tracker"
  },
  {
    id: 9,
    title: "MediaSphere Suite (Open Source)",
    techStack: ["Electron.js", "Node.js", "JavaScript"],
    overview: "An open-source, modular desktop software ecosystem bringing document editing, digital reading, and multimedia playback into a unified cross-platform experience.",
    features: [
      "Developed independent applications for PDF, EPUB, music, video, and document management.",
      "Designed modular architecture enabling standalone applications and independent development.",
      "Built cross-platform desktop experiences with local file handling and customizable interfaces."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/MediaSphereDocs"
  },
  {
    id: 10,
    title: "MediaSphere PDF Viewer (Open Source)",
    techStack: ["Electron.js", "JavaScript"],
    overview: "An open-source, lightweight desktop PDF reader focused on performance, readability, and intuitive document navigation.",
    features: [
      "Implemented PDF rendering with smooth document navigation.",
      "Developed dark mode and readability-focused viewing controls.",
      "Built a lightweight cross-platform Electron desktop interface."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/MediaSpherePDFViewer"
  },
  {
    id: 11,
    title: "MediaSphere EPUB Viewer (Open Source)",
    techStack: ["Electron.js", "JavaScript"],
    overview: "An open-source desktop e-book reader supporting EPUB2 and EPUB3 with customizable reading experiences.",
    features: [
      "Implemented EPUB parsing with table-of-contents and chapter navigation.",
      "Developed customizable typography and reading controls.",
      "Built responsive layouts for different screen sizes."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/MediaSphereEPUBViewer"
  },
  {
    id: 12,
    title: "MediaSphere Music Player (Open Source)",
    techStack: ["Electron.js", "JavaScript"],
    overview: "An open-source desktop music player featuring local media management, playlist organization, and interactive playback.",
    features: [
      "Implemented multi-format audio playback.",
      "Developed drag-and-drop playlist creation and management.",
      "Built interactive playback controls and desktop UI."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/MediaSphereMusicPlayer"
  },
  {
    id: 13,
    title: "MediaSphere Video Player (Open Source)",
    techStack: ["Electron.js", "JavaScript"],
    overview: "An open-source desktop video player supporting multiple media formats and customizable playback interfaces.",
    features: [
      "Implemented MP4, AVI, and MKV format support.",
      "Developed customizable dark and light themes.",
      "Built playlist management and resizable playback interfaces."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/MediaSphereVideoPlayer"
  },
  {
    id: 14,
    title: "MediaSphere Docs (Open Source)",
    techStack: ["Electron.js", "JavaScript"],
    overview: "An open-source desktop document editor designed around rich-text authoring and a distraction-free writing experience.",
    features: [
      "Implemented rich-text editing and formatting tools.",
      "Developed automatic local document persistence.",
      "Built a minimal desktop writing interface."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/MediaSphereDocs"
  },
  {
    id: 15,
    title: "Eat Your Meal",
    techStack: ["Flutter", "Dart", "Provider", "SharedPreferences"],
    overview: "A cross-platform meal reminder and food diary application featuring persistent scheduling and dietary activity tracking.",
    features: [
      "Implemented recurring daily, weekday, and weekend notifications.",
      "Developed a food diary with meal logging, notes, and mood tracking.",
      "Integrated timezone-aware notifications and persistent local storage."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/Eat_Your_Meal"
  },
  {
    id: 16,
    title: "Meal Reminder App",
    techStack: ["Flutter", "Dart"],
    overview: "A mobile application designed to help users maintain consistent meal schedules through customizable reminders.",
    features: [
      "Implemented configurable meal scheduling and notifications.",
      "Developed a lightweight interface for managing reminders.",
      "Built mobile-first functionality using Flutter."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/meal_reminder_app"
  },
  {
    id: 17,
    title: "Pixel Pioneers",
    techStack: ["JavaScript", "HTML", "CSS"],
    overview: "A collaborative frontend development project focused on interactive web experiences and modern interface design.",
    features: [
      "Developed interactive frontend components and responsive layouts.",
      "Explored modern web design patterns and UI interactions.",
      "Collaborated on frontend implementation and component integration."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/pixel_pioneers"
  },
  {
    id: 18,
    title: "Smart Park (IoT Parking System)",
    techStack: ["C++", "Arduino", "IoT"],
    overview: "An IoT-based smart parking prototype designed to automate parking slot monitoring and improve space utilization.",
    features: [
      "Implemented sensor-based parking slot detection.",
      "Developed Arduino-controlled parking automation.",
      "Integrated parking occupancy and slot availability logic."
    ],
    githubLink: "https://github.com/AtheeqAhmedMJ/SmartPark"
  }
];

export default projects;
