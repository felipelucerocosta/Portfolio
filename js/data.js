const tagIcons = {
    "ReactJS": "fab fa-react",
    "Express": "fas fa-server",
    "PostgreSQL": "devicon-postgresql-plain",
    "Typescript": "devicon-typescript-plain",
    "Python": "fab fa-python",
    "SQLite": "fas fa-database",
    "CustomTkinter": "fas fa-window-maximize",
    "Javascript": "fab fa-js",
    "HTML": "fab fa-html5",
    "CSS": "fab fa-css3-alt",
    "PHP": "fab fa-php",
    "Laravel": "fab fa-laravel",
    "NodeJS": "fab fa-node-js",
    "Java": "fab fa-java"
};

const neonColors = ["#39ff14", "#7000ff", "#00f7ff", "#ff00ff", "#ffff00", "#ff4500", "#00ffcc", "#00bfff", "#ff007f", "#7fff00"];

const projects = [
    {
    id: 1,
    title: "Edu-Tech (En desarrollo)",
    theme: "web",
    category: "Plataforma Educativa",
    desc: "Plataforma educativa integral para la gestión y seguimiento académico.",
    longDesc: "Edu-Tech es una plataforma web creada para la Escuela Técnica N° 29 DE 6 que centraliza la interacción entre docentes, alumnos y familias. Integra gestión de clases, seguimiento académico, comunicación y métricas en una sola interfaz simple y accesible. Su objetivo es reducir la dispersión de herramientas y mejorar la gestión educativa, con una arquitectura escalable que permite sumar nuevas funcionalidades a futuro.",
    problem: "La falta de un sistema centralizado dificultaba el seguimiento académico y la comunicación entre docentes, alumnos y familias.",
    solution: "Se está desarrollando una plataforma unificada que simplifica la gestión educativa, mejora la comunicación y permite un seguimiento académico en tiempo real.",
    duration: "8 meses",
    events: ["Feria de Ciencias Escolares 2024", "Exposición Técnica Zonal"],
    versions: [
        { 
            stage: "Mockups Originales", 
            desc: "Conceptos iniciales bajo el nombre 'Tech-Room 29'. Estructuración del modal de creación de clases y esquema base.", 
            images: ["captura crear clase.png"] 
        },
        { 
            stage: "Primer Entregable", 
            desc: "Primera versión funcional de Tech-Room. Implementación del login y de un asistente virtual interactivo básico (Alfred).", 
            images: ["captura 2.png", "captura3.png"] 
        },
        { 
            stage: "Segundo Diseño", 
            desc: "Transición a la marca oficial Edu-Tech. Incorporación de foros de discusión y un calendario escolar interactivo para seguimiento.", 
            images: ["calendario.png", "foro.png"] 
        },
        { 
            stage: "Segundo Entregable", 
            desc: "Interfaz moderna premium Global definitiva. Reestructuración de la pantalla de inicio y un Dashboard interactivo más completo para la gestión.", 
            images: ["Captura login.png", "dashboard.png", "captura clases.png"] 
        }
    ],
    complications: [
        { 
            stage: "Diseño de base de datos", 
            desc: "La estructura inicial no soportaba múltiples usuarios concurrentes de forma eficiente.", 
            solution: "Se rediseñó el modelo de datos en PostgreSQL, normalizando tablas y optimizando consultas para mejorar el rendimiento." 
        }
    ],
    icon: "fas fa-user-graduate",
    color: "#7000ff",
    tags: ["ReactJS", "Express", "PostgreSQL", "TypeScript"],
    features: [
        "Dashboard interactivo para gestión académica",
        "Sistema de comunicación integrado",
        "Calendario de exámenes y entregas",
        "Libreta de notas digital en tiempo real",
        "Chatbot con asistencia inteligente",
        "Sistema de gamificación con ranking de alumnos"
    ],
    images: ["./dashboard.png", "./calendario.png", "./foro.png", "./captura clases.png", "./captura crear clase.png"],
    repo: "https://github.com/felipelucerocosta/EduTech1",
    demo: "#"
},
 {
    id: 2,
    title: "Wilson Hub (En desarrollo)",
    theme: "programas",
    category: "Software de Red",
    desc: "Plataforma integral para la gestión y optimización de dispositivos de red.",
    longDesc: "WILSON es un software en desarrollo orientado a la gestión avanzada de dispositivos de red. Permite administrar de forma centralizada la red LAN, gestionar unidades de almacenamiento y facilitar la interacción del usuario mediante un asistente de inteligencia artificial. El sistema está diseñado con una arquitectura moderna basada en APIs, ofreciendo escalabilidad, rendimiento y una experiencia de usuario eficiente.",
    problem: "La falta de herramientas integradas y accesibles para gestionar dispositivos de red de forma centralizada y eficiente.",
    solution: "Se está desarrollando una plataforma unificada que simplifica la administración del sistema, mejora el control sobre los recursos y optimiza la interacción del usuario mediante automatización e inteligencia artificial.",
    duration: "En desarrollo",
    events: [],
    galleryTimeline: [],
    icon: "fas fa-rocket",
    color: "#00ff80",
    tags: ["Python", "ReactJS", "SQLite", "FastAPI", "psutil", "WebSocket", "Axios", "JWT", "REST API", "Socket"],
    features: [
        "Asistente de inteligencia artificial integrado",
        "Gestión de red LAN en tiempo real",
        "Administración de unidades de almacenamiento",
        "Transferencia de archivos entre dispositivos conectados",
        "Comunicación en tiempo real mediante WebSockets",
        "Arquitectura basada en API REST segura con JWT"
    ],
    images: [],
    repo: "#",
    demo: "#"
},
{
    id: 3,
    title: "Jackie",
    theme: "ia",
    category: "Business AI",
    desc: "IA para análisis de mercado, definición de precios y evaluación de factibilidad de proyectos.",
    longDesc: "Jackie es una herramienta de inteligencia artificial desarrollada en Python, diseñada para analizar mercados, definir estrategias de precios y evaluar la factibilidad de productos o servicios.\n\nPermite procesar información sobre competencia, costos y demanda, generando recomendaciones claras sobre precios, posicionamiento y oportunidades de negocio. Está orientada a emprendedores, desarrolladores y pequeños equipos que necesitan tomar decisiones estratégicas sin depender de estudios complejos.\n\nDentro del crecimiento actual de herramientas de IA aplicadas a negocios, Jackie se posiciona como una solución accesible para validar ideas, analizar mercados y optimizar estrategias antes de lanzar un producto.\n\nSu integración con APIs de modelos de lenguaje permite adaptar el análisis a distintos contextos, haciendo que la herramienta sea flexible y escalable.",
    
    problem: "Emprendedores y equipos carecen de herramientas accesibles para analizar mercados, definir precios adecuados y evaluar la viabilidad de sus proyectos, lo que lleva a decisiones poco informadas.",
    
    solution: "Jackie automatiza el análisis de mercado, sugiere precios basados en datos y evalúa la factibilidad de proyectos, facilitando la toma de decisiones estratégicas.",
    
    duration: "1 mes",
    
    events: ["Talento Tech - Proyecto Final"],
    
    versions: [
        { 
            stage: "Primera versión funcional", 
            desc: "Implementación inicial en Python con integración a APIs de modelos de lenguaje para análisis de mercado y generación de recomendaciones estratégicas.", 
            images: ["Captura login.png"] 
        }
    ],
    
    complications: [],
    
    icon: "fas fa-chart-line",
    color: "#7fff00",
    
    tags: ["Python"],
    
    features: [
        "Análisis de mercado automatizado",
        "Sugerencia de precios basada en contexto",
        "Evaluación de factibilidad de proyectos",
        "Análisis de competencia",
        "Generación de estrategias de posicionamiento",
        "Explicaciones claras para la toma de decisiones",
        "Integración con modelos de IA",
        "Optimización de decisiones de negocio"
    ],
    
    images: ["Captura login.png"],
    
    repo: "https://github.com/felipelucerocosta/colossus",
    demo: ""
},
 {
    id: 4,
    title: "Colossus",
    theme: "ia",
    category: "Inteligencia Artificial",
    desc: "Asistente de IA para análisis, corrección y optimización de código.",
    longDesc: "Colossus es una herramienta de inteligencia artificial desarrollada en Python, diseñada para asistir a desarrolladores en el análisis, corrección y optimización de código. Permite procesar fragmentos o archivos completos, detectando errores, sugiriendo mejoras y promoviendo buenas prácticas de programación.\n\nEl sistema está orientado tanto al desarrollo profesional como al aprendizaje, proporcionando explicaciones claras y adaptadas al nivel del usuario. Cuenta con integración a APIs de modelos de lenguaje configurables, y está diseñado con una arquitectura escalable para su futura integración en la plataforma EduTech.",
    problem: "La falta de herramientas accesibles que permitan analizar y mejorar código de forma rápida y clara, sin depender de entornos complejos.",
    solution: "Se desarrolló una herramienta simple pero potente que automatiza el análisis de código, mejora la calidad del desarrollo y facilita el aprendizaje mediante explicaciones guiadas.",
    duration: "1 mes",
    events: ["Talento Tech - Proyecto Final"],
    versions: [
        { 
            stage: "Primera versión funcional", 
            desc: "Implementación inicial en Python con integración a APIs de modelos de lenguaje para análisis de código en tiempo real.", 
            images: ["Captura login.png"] 
        }
    ],
    complications: [],
    icon: "fas fa-fire",
    color: "#00bfff",
    tags: ["Python"],
    features: [
        "Análisis de código en tiempo real",
        "Detección de errores y sugerencias de mejora",
        "Optimización basada en buenas prácticas",
        "Explicaciones adaptadas al nivel del usuario",
        "Integración con modelos de IA configurables"
    ],
    images: ["Captura login.png"],
    repo: "https://github.com/felipelucerocosta/colossus",
    demo: ""
},
 {
    id: 4,
    title: "ET 29 - Portal Institucional",
    theme: "web",
    category: "Web Institucional",
    desc: "Portal web moderno para la gestión y comunicación de la comunidad educativa.",
    longDesc: "Desarrollé el portal institucional de la Escuela Técnica N° 29 DE 6 con el objetivo de centralizar la información y mejorar la comunicación entre directivos, alumnos y familias. La plataforma ofrece una interfaz moderna, accesible y completamente responsive.\n\nEl sistema está diseñado para facilitar el acceso a contenidos importantes y permitir la difusión de avisos urgentes en tiempo real, mejorando la organización y la eficiencia en la comunicación institucional.",
    problem: "La institución no contaba con una plataforma moderna y centralizada para comunicar información relevante de forma rápida y eficiente.",
    solution: "Se implementó un portal web accesible y responsive que centraliza la información y permite comunicar avisos importantes de manera clara e inmediata.",
    duration: "2 meses",
    events: ["Presentación oficial ante directivos de la institución"],
    versions: [
        { 
            stage: "Versión actual", 
            desc: "Lanzamiento del sitio web institucional con diseño responsive y optimización para distintos dispositivos.", 
            images: ["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000"] 
        }
    ],
    complications: [],
    icon: "fas fa-school",
    color: "var(--highlight)",
    tags: ["JavaScript", "HTML", "CSS"],
    features: [
        "Diseño totalmente responsive",
        "Chatbot institucional",
        "Sistema de avisos urgentes",
        "Estructura clara y accesible",
        "Optimización para experiencia de usuario"
    ],
    images: ["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000"],
    repo: "https://github.com/tecnica29de6/tecnica29de6.edu.ar/",
    demo: "https://tecnica29de6.github.io/tecnica29de6.edu.ar/"
},
 {
    id: 5,
    title: "WikiBots (En desarrollo)",
    theme: "web",
    category: "Plataforma Web Informativa",
    desc: "Plataforma web dinámica centrada en el programa BattleBots.",
    longDesc: "WikiBots es una plataforma web diseñada para centralizar información sobre el programa BattleBots. Permite a los usuarios explorar noticias, tendencias, robots y contenido relevante mediante una interfaz moderna, dinámica y responsive.\n\nEl proyecto busca construir una comunidad más conectada, ofreciendo herramientas interactivas como un simulador de batallas y una galería de robots, junto con un sistema de gestión de contenido escalable.",
    problem: "La comunidad de BattleBots no cuenta con una plataforma centralizada, moderna e interactiva para acceder a información relevante.",
    solution: "Se está desarrollando una plataforma web que unifica contenido, mejora la accesibilidad a la información y fomenta la interacción de la comunidad.",
    duration: "En desarrollo",
    events: [],
    versions: [
        { 
            stage: "Avance actual", 
            desc: "Desarrollo del simulador de batallas y estructuración de un layout completamente responsive.", 
            images: ["https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000"] 
        }
    ],
    complications: [],
    icon: "fas fa-fire",
    color: "#2600ffff",
    tags: ["PHP", "Laravel", "HTML", "CSS"],
    features: [
        "Gestión de contenido dinámico",
        "Simulador de batallas interactivo",
        "Galería de robots",
        "Diseño responsive",
        "Arquitectura escalable"
    ],
    images: ["https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000"],
    repo: "https://github.com/felipelucerocosta/Batllebots",
    demo: "https://battlebots11122.netlify.app/"
},
    {
    id: 6,
    title: "Project Tracker",
    theme: "programas",
    category: "Gestión de Proyectos",
    desc: "Aplicación de escritorio para la gestión y seguimiento de proyectos de software.",
    longDesc: "Project Tracker es una aplicación de escritorio desarrollada en Python que permite gestionar el ciclo de vida de proyectos de software de forma clara y organizada. Facilita el registro de tareas, hitos y deadlines, junto con la visualización del progreso mediante paneles dinámicos.\n\nEl sistema está orientado a mejorar la planificación y el control de tiempos, permitiendo detectar cuellos de botella y generar reportes exportables para el seguimiento del proyecto.",
    problem: "La gestión manual de múltiples proyectos generaba desorganización y dificultaba el seguimiento de tiempos y entregas.",
    solution: "Se desarrolló una herramienta que centraliza la información del proyecto, automatiza la visualización del progreso y facilita la toma de decisiones.",
    duration: "1 semana",
    events: ["Muestra Anual Institucional"],
    versions: [
        { 
            stage: "Versión final", 
            desc: "Implementación completa con visualización de tiempos y generación de reportes exportables.", 
            images: ["/captura 2.png"] 
        }
    ],
    complications: [
        { 
            stage: "Sincronización de datos temporales", 
            desc: "Los gráficos no reflejaban correctamente cambios en fechas pasadas.", 
            solution: "Se implementó un sistema de recálculo automático de métricas para mantener la coherencia de los datos." 
        }
    ],
    icon: "fas fa-project-diagram",
    color: "#ff4500",
    tags: ["Python", "SQLite", "CustomTkinter"],
    features: [
        "Visualización del progreso del proyecto",
        "Gestión de tareas, hitos y deadlines",
        "Generación de reportes exportables",
        "Control y análisis de tiempos",
        "Interfaz gráfica intuitiva"
    ],
    images: ["/captura 2.png"],
    repo: "https://github.com/felipelucerocosta/gestor-de-tiempos",
    demo: "ProjectTracker.exe"
},
 {
    id: 7,
    title: "Inventario - Reina Bazar",
    theme: "programas",
    category: "Gestión",
    desc: "Aplicación de escritorio para la gestión de stock y organización de productos.",
    longDesc: "Desarrollé un sistema de inventario para Reina Bazar con el objetivo de optimizar la gestión de productos y el control de stock. La aplicación permite administrar de forma eficiente ventas, clientes y productos desde una interfaz simple e intuitiva, mejorando la organización y reduciendo errores en el manejo del inventario.",
    problem: "La falta de un sistema digital dificultaba el control del stock y la gestión de ventas, generando desorden y posibles errores.",
    solution: "Se implementó una aplicación de escritorio que centraliza la información del negocio, permitiendo un control más preciso y organizado de los productos, ventas y clientes.",
    duration: "Proyecto personal",
    events: [],
    galleryTimeline: [],
    icon: "fas fa-rocket",
    color: "#7fff00",
    tags: ["Python", "SQLite", "CustomTkinter"],
    features: [
        "Gestión completa de stock",
        "Administración de productos",
        "Registro de ventas",
        "Gestión de clientes",
        "Interfaz gráfica intuitiva"
    ],
    images: [],
    repo: "#",
    demo: "#"
},
   
    {
    id: 8,
    title: "MagoSaid - Landing Page",
    theme: "web",
    category: "Web & Consulting",
    desc: "Landing page corporativa enfocada en conversión y posicionamiento digital.",
    longDesc: "Desarrollé una landing page para MagoSaid, una consultora estratégica en software, con el objetivo de transmitir profesionalismo y maximizar la conversión de visitantes en potenciales clientes. El diseño se centra en una estructura clara, contenido bien jerarquizado y una experiencia visual moderna.\n\nSe priorizó el rendimiento, la optimización SEO y la adaptabilidad a distintos dispositivos, logrando una presencia online sólida y alineada con los estándares actuales del desarrollo web.",
    problem: "La consultora no contaba con una presencia online profesional ni optimizada para la captación de clientes.",
    solution: "Se diseñó e implementó una landing page enfocada en conversión, con una estructura clara, optimización SEO y una experiencia de usuario moderna.",
    duration: "1 mes y medio",
    events: [],
    versions: [
        { 
            stage: "Lanzamiento", 
            desc: "Implementación de diseño moderno con foco en conversión, rendimiento y posicionamiento en buscadores.", 
            images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000"] 
        }
    ],
    complications: [],
    icon: "fas fa-magic",
    color: "#ff00ff",
    tags: ["TypeScript", "HTML", "CSS"],
    features: [
        "Diseño orientado a conversión",
        "Optimización SEO",
        "Interfaz moderna y atractiva",
        "Diseño responsive",
        "Buenas prácticas de rendimiento web"
    ],
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000"],
    repo: "https://github.com/felipelucerocosta/Magosaid",
    demo: "https://felipelucerocosta.github.io/Magosaid/index.html"
},
   
   
   {
    id: 9,
    title: "E-commerce de Reina Bazar",
    theme: "web",
    category: "E-commerce",
    desc: "Desarrollo de tienda online para potenciar la presencia digital de Reina Bazar.",
    longDesc: "Diseñé y desarrollé una tienda online para Reina Bazar con el objetivo de digitalizar su catálogo de productos y facilitar el proceso de compra para los clientes. El proyecto se enfoca en una interfaz clara, navegación intuitiva y una experiencia de usuario simple y efectiva.",
    problem: "Reina Bazar no contaba con presencia online, lo que limitaba su alcance y oportunidades de venta.",
    solution: "Se implementó una tienda web accesible y organizada que permite visualizar productos fácilmente, mejorando la visibilidad del negocio y ampliando su canal de ventas.",
    duration: "Proyecto personal",
    events: [],
    galleryTimeline: [],
    icon: "fas fa-code",
    color: "#ff0080",
    tags: ["HTML", "CSS"],
    features: [
        "Catálogo de productos organizado",
        "Diseño responsive",
        "Navegación intuitiva",
        "Estructura escalable para futuras mejoras"
    ],
    images: [],
    repo: "#",
    demo: "#"
},
  
   
];

const education = [
    {
        date: "Febrero 2021 - Actualidad ",
        title: "Secundario Técnico con especialidad en computación",
        org: "Escuela Técnica 29 DE 6 Reconquista de Buenos Aires",
        desc: "Enfoque en la programación, bases de datos, redes, hardware y el desarrollo de proyectos informáticos."
    },
    {
        date: "Actualidad - Junio 2026",
        title: "Curso de reparacion de computadoras",
        org: "Centro de formacion Profesional",
        desc: "Enfoque en la reparacion de computadoras."
    },
    {
        date: "Marzo 2026",
        title: "Workshop de Portfolio Estratégico",
        org: "Puerta 18",
        desc: "Enfoque en la creación de un portfolio profesional y atractivo para los reclutadores."
    },
    {
        date: "Marzo 2026",
        title: "Taller de Creación de agente de inteligencia artificial",
        org: "Puerta 18",
        desc: "Enfoque en la creación de agentes de inteligencia artificial."
    },
    {
        date: "Febrero 2026",
        title: "Workshop de Storytelling",
        org: "Puerta 18",
        desc: "Enfoque en contar historias para conectar con la audiencia."
    },
    {
        date: "mayo - octubre 2025",
        title: "Full Stack junior",
        org: "Generacion T",
        desc: "Enfoque en lógica de programación, bases de datos SQL y arquitectura web."
    },
    {
        date: "abril - junio 2025",
        title: "Curso de Agente de inteligencial con python y API de glock",
        org: "Talento tech",
        desc: "Enfoque en entender los conceptos basicos de agentes de inteligencia artificial y hacer una IA basica con python."
    }
];

const skillsData = {
    frontend: [
        { name: "HTML y CSS", icon: "fab fa-html5" },
        { name: "Javascript", icon: "fab fa-js" },
        { name: "ReactJs", icon: "fab fa-react" },
        { name: "Typescript", icon: "devicon-typescript-plain" },
        { name: "CustomTkinter", icon: "fas fa-window-maximize" }
    ],
    backend: [
        { name: "NodeJS", icon: "fab fa-node-js" },
        { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
        { name: "Python", icon: "fab fa-python" },
        { name: "SQLite", icon: "fas fa-database" }
    ],
    tools: [
        { name: "Diagramas con Lucidchart", icon: "lucidchart", isSvg: true },
        { name: "Gantt", icon: "gantt", isSvg: true },
        { name: "Cisco Packet Tracer", icon: "packettracer", isSvg: true },
        { name: "GitHub", icon: "fab fa-github" },
        { name: "Docker", icon: "fab fa-docker" },
        { name: "Inglés Medio", icon: "fas fa-language" }
    ],
    blandas: [
        { name: "Responsabilidad", icon: "fas fa-clipboard-check" },
        { name: "Capacidad de dar y recibir retroalimentación", icon: "fas fa-sync-alt" },
        { name: "Flexibilidad para adaptarse a roles diferentes", icon: "fas fa-user-tag" },
        { name: "Análisis de situaciones complejas", icon: "fas fa-brain" },
        { name: "Flexibilidad para adaptarse a cambios", icon: "fas fa-exchange-alt" },
        { name: "Manejo de plazos", icon: "fas fa-hourglass-half" },
        { name: "Autocontrol", icon: "fas fa-balance-scale" },
        { name: "Toma de decisiones en grupo", icon: "fas fa-users-cog" },
        { name: "Evaluar las alternativas", icon: "fas fa-code-branch" },
        { name: "Aprender de los errores", icon: "fas fa-level-up-alt" },
        { name: "Estar dispuesto a recibir capacitación y mejorar constantemente", icon: "fas fa-chart-line" }
    ]
};

const svgIcons = {
    lucidchart: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="skill-svg-icon" fill="currentColor"><title>Lucidchart</title><path d="M12 0 3.694 4.8V24L12 19.2Zm0 19.2v4.502h8.305V14.4Z"/></svg>`,
    gantt: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" class="skill-svg-icon" fill="currentColor"><rect x="20" y="20" width="10" height="216"/><rect x="20" y="226" width="216" height="10"/><rect x="40" y="50" width="60" height="30" rx="4"/><rect x="80" y="100" width="80" height="30" rx="4"/><rect x="140" y="150" width="70" height="30" rx="4"/><rect x="180" y="200" width="40" height="30" rx="4"/></svg>`,
    packettracer: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="skill-svg-icon" fill="currentColor"><title>Cisco Packet Tracer</title><path d="M12.915 2.114V21.88h-1.83V2.114h1.83zm-3.829 1.154v17.47h-1.83V3.268h1.83zm7.658 0v17.47h-1.83V3.268h1.83zM5.257 6.15v11.7h-1.83v-11.7h1.83zm13.486 0v11.7h-1.83v-11.7h1.83zM1.428 9.034v5.93h-1.4v-5.93h1.4zm21.144 0v5.93h-1.4v-5.93h1.4z"/></svg>`
};
