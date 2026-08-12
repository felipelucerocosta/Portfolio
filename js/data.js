const tagIcons = {
    "ReactJS": "fab fa-react",
    "Express": "fas fa-server",
    "PostgreSQL": "devicon-postgresql-plain",
    "Typescript": "devicon-typescript-plain",
    "TypeScript": "devicon-typescript-plain",
    "Python": "fab fa-python",
    "SQLite": "fas fa-database",
    "CustomTkinter": "fas fa-window-maximize",
    "Javascript": "fab fa-js",
    "JavaScript": "fab fa-js",
    "HTML": "fab fa-html5",
    "CSS": "fab fa-css3-alt",
    "PHP": "fab fa-php",
    "Laravel": "fab fa-laravel",
    "NodeJS": "fab fa-node-js",
    "Java": "fab fa-java",
    "FastAPI": "fas fa-bolt",
    "WebSocket": "fas fa-plug",
    "JWT": "fas fa-key",
    "REST API": "fas fa-network-wired",
    "Docker": "fab fa-docker",
    "Cisco Packet Tracer": "fas fa-network-wired"
};

const neonColors = ["#00f7ff", "#00e5ff", "#b15eff", "#7000ff", "#38bdf8", "#06b6d4", "#8b5cf6", "#d946ef", "#0284c7"];

const projects = [
    {
        id: 1,
        title: "Edu-Tech (En desarrollo)",
        theme: "web",
        category: "Plataforma Educativa",
        desc: "Plataforma educativa integral para la gestión y seguimiento académico institucional.",
        longDesc: "Edu-Tech es una plataforma web creada para la Escuela Técnica N° 29 DE 6 que centraliza la interacción entre docentes, alumnos y familias. Integra gestión de clases, seguimiento académico, comunicación y métricas en una sola interfaz simple y accesible. Su objetivo es reducir la dispersión de herramientas y mejorar la gestión educativa, con una arquitectura escalable que permite sumar nuevas funcionalidades a futuro.",
        problem: "La falta de un sistema centralizado dificultaba el seguimiento académico y la comunicación entre docentes, alumnos y familias.",
        solution: "Se está desarrollando una plataforma unificada que simplifica la gestión educativa, mejora la comunicación y permite un seguimiento académico en tiempo real.",
        duration: "8 meses",
        events: ["Feria de Ciencias Escolares 2024", "Exposición Técnica Zonal"],
        versions: [
            {
                stage: "Primer Diseño (Wireframing & UI Inicial)",
                desc: "Exploración conceptual y esquematización de la interfaz. Definición de la arquitectura de la información para el login, gestión de clases y prototipado del calendario interactivo.",
                images: ["./img/Edu-tech/Diseño preeliminar Login mockup.PNG", "./img/Edu-tech/Diseño preeliminar clases.PNG", "./img/Edu-tech/Diseño pre eliminar calendario.PNG"]
            },
            {
                stage: "Desarrollo del MVP y Pruebas Base",
                desc: "Implementación del Minimum Viable Product (MVP). Despliegue de funcionalidades core, integración de foros de discusión interactivos y calibración del asistente virtual.",
                images: ["./img/Edu-tech/captura 2.png", "./img/Edu-tech/captura3.png", "./img/Edu-tech/foro.png"]
            },
            {
                stage: "Diseño Nuevo (Final Release)",
                desc: "Despliegue de la versión estable con un renovado Design System. Reingeniería premium del dashboard administrativo, jerarquización visual y optimización integral de la experiencia de usuario (UX).",
                images: ["./img/Edu-tech/Diseño actual login.PNG", "./img/Edu-tech/Diseño actual foro.PNG", "./img/Edu-tech/Diseño clases actual.PNG", "./img/Edu-tech/dashboard.png"]
            }
        ],
        complications: [
            {
                stage: "Arquitectura de Base de Datos",
                desc: "La estructura relacional inicial generaba cuellos de botella y no soportaba múltiples usuarios concurrentes de forma eficiente.",
                solution: "Se rediseñó el modelo de datos en PostgreSQL aplicando técnicas de normalización avanzada y creando índices estratégicos para optimizar drásticamente los tiempos de lectura."
            },
            {
                stage: "Latencia en Comunicación (WebSockets)",
                desc: "El sistema de foros y actualizaciones dependía de peticiones HTTP estándar (polling), lo cual saturaba el servidor y producía latencias altas.",
                solution: "Se migró la capa de mensajería a una arquitectura asíncrona mediante WebSockets, permitiendo actualizaciones de la interfaz en tiempo real y reduciendo la carga del servidor en un 60%."
            },
            {
                stage: "Seguridad y Gestión de Sesiones",
                desc: "El almacenamiento inicial de tokens en localStorage exponía riesgos de vulnerabilidad ante posibles inyecciones XSS.",
                solution: "Se implementó una política de autenticación robusta utilizando JWT almacenados en cookies 'HttpOnly' y 'SameSite', blindando el sistema contra exfiltraciones."
            },
            {
                stage: "Responsive Design y UX Móvil",
                desc: "Módulos complejos como el calendario y el dashboard presentaban problemas de maquetación en resoluciones móviles y tablets.",
                solution: "Se refactorizó el frontend con un enfoque 'Mobile-First' y CSS Grid dinámico, asegurando una adaptabilidad total sin perder funcionalidades ni comprometer el rendimiento visual."
            }
        ],
        timeline: [
            {
                step: "01",
                title: "La Idea & Arquitectura",
                date: "Marzo 2024",
                desc: "Conceptualización de la solución para la Escuela Técnica 29 DE 6. Análisis de requerimientos de docentes y estudiantes.",
                images: ["./img/Edu-tech/Diseño preeliminar Login mockup.PNG"],
                tech: ["Prototipado UI", "Análisis de Requerimientos"]
            },
            {
                step: "02",
                title: "Wireframes & Prototipo Inicial",
                date: "Mayo 2024",
                desc: "Esquematización del layout, estructura de login y sistema de clases.",
                images: ["./img/Edu-tech/Diseño preeliminar clases.PNG", "./img/Edu-tech/Diseño pre eliminar calendario.PNG"],
                tech: ["Figma", "HTML5", "CSS3"]
            },
            {
                step: "03",
                title: "Desarrollo del MVP Core",
                date: "Julio 2024",
                desc: "Construcción de la API Backend en Express, integración de PostgreSQL y desarrollo del frontend reactivo.",
                images: ["./img/Edu-tech/captura 2.png", "./img/Edu-tech/foro.png"],
                tech: ["ReactJS", "Express", "PostgreSQL", "NodeJS"]
            },
            {
                step: "04",
                title: "Resolución de Desafíos Técnicos",
                date: "Septiembre 2024",
                desc: "Optimización de la base de datos, migración de polling HTTP a WebSockets y reforzamiento de la seguridad JWT HttpOnly.",
                images: ["./img/Edu-tech/captura3.png"],
                tech: ["WebSockets", "JWT", "PostgreSQL Indexing"]
            },
            {
                step: "05",
                title: "Rediseño UI/UX & Versión Final",
                date: "Noviembre 2024",
                desc: "Despliegue del nuevo Design System abisal, dashboard interactivo en tiempo real y optimización responsive completa.",
                images: ["./img/Edu-tech/Diseño actual login.PNG", "./img/Edu-tech/dashboard.png"],
                tech: ["ReactJS", "TypeScript", "CSS Grid/Flexbox"]
            }
        ],
        icon: "fas fa-user-graduate",
        color: "#00f7ff",
        tags: ["ReactJS", "Express", "PostgreSQL", "TypeScript"],
        features: [
            "Dashboard interactivo para gestión académica",
            "Sistema de comunicación integrado",
            "Calendario de exámenes y entregas",
            "Libreta de notas digital en tiempo real",
            "Chatbot con asistencia inteligente",
            "Sistema de gamificación con ranking de alumnos"
        ],
        images: ["./img/Edu-tech/Diseño actual login.PNG", "./img/Edu-tech/Diseño actual foro.PNG", "./img/Edu-tech/Diseño clases actual.PNG", "./img/Edu-tech/dashboard.png", "./img/Edu-tech/Diseño pre eliminar calendario.PNG"],
        repo: "https://github.com/felipelucerocosta/EduTech1",
        demo: "#"
    },
    {
        id: 2,
        title: "Wilson Hub (En desarrollo)",
        theme: "programas",
        category: "Software de Red & Sistemas",
        desc: "Plataforma integral para la gestión, monitoreo y optimización de dispositivos de red LAN.",
        longDesc: "WILSON es un software en desarrollo orientado a la gestión avanzada de dispositivos de red. Permite administrar de forma centralizada la red LAN, gestionar unidades de almacenamiento y facilitar la interacción del usuario mediante un asistente de inteligencia artificial. El sistema está diseñado con una arquitectura moderna basada en APIs, ofreciendo escalabilidad, rendimiento y una experiencia de usuario eficiente.",
        problem: "La falta de herramientas integradas y accesibles para gestionar dispositivos de red de forma centralizada y eficiente.",
        solution: "Se está desarrollando una plataforma unificada que simplifica la administración del sistema, mejora el control sobre los recursos y optimiza la interacción del usuario mediante automatización e inteligencia artificial.",
        duration: "En desarrollo",
        events: [],
        versions: [
            {
                stage: "Fase 1 — Arquitectura de Red",
                desc: "Diseño de la API REST y módulos de monitoreo en Python utilizando psutil y WebSockets.",
                images: ["img/packet_tracer.png"]
            }
        ],
        complications: [
            {
                stage: "Monitoreo en tiempo real de interfaz LAN",
                desc: "Elevado consumo de CPU al sondear métricas de red mediante lecturas síncronas.",
                solution: "Se migró a hilos asíncronos con FastAPI y WebSockets con búfer circular de métricas."
            }
        ],
        timeline: [
            {
                step: "01",
                title: "Concepto & Topología LAN",
                date: "2024",
                desc: "Definición del software de administración centralizada de nodos de red local.",
                images: ["img/packet_tracer.png"],
                tech: ["Redes LAN", "FastAPI", "Python"]
            },
            {
                step: "02",
                title: "Prototipo de API & Monitoreo",
                date: "2024",
                desc: "Creación del motor en Python con lectura de sockets y estado de hardware en tiempo real.",
                images: ["img/packet_tracer.png"],
                tech: ["Python", "psutil", "WebSockets"]
            },
            {
                step: "03",
                title: "Integración Frontend & Asistente IA",
                date: "2024",
                desc: "Maquetación de la interfaz gráfica en ReactJS con conexión directa a la API REST.",
                images: ["img/IA.png"],
                tech: ["ReactJS", "Axios", "REST API"]
            },
            {
                step: "04",
                title: "Optimización de Concurrencia",
                date: "2024",
                desc: "Control de sesiones seguras mediante JWT y canal de datos en vivo vía WebSockets.",
                images: ["img/Tecnología y productividad en acción.png"],
                tech: ["JWT", "SQLite", "Socket"]
            }
        ],
        icon: "fas fa-network-wired",
        color: "#00e5ff",
        tags: ["Python", "ReactJS", "SQLite", "FastAPI", "WebSocket", "JWT", "REST API"],
        features: [
            "Asistente de inteligencia artificial integrado",
            "Gestión de red LAN en tiempo real",
            "Administración de unidades de almacenamiento",
            "Transferencia de archivos entre dispositivos conectados",
            "Comunicación en tiempo real mediante WebSockets",
            "Arquitectura basada en API REST segura con JWT"
        ],
        images: ["img/packet_tracer.png", "img/IA.png"],
        repo: "#",
        demo: "#"
    },
    {
        id: 3,
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
                stage: "Versión Actual Estable",
                desc: "Lanzamiento del sitio web institucional con diseño responsive y optimización para distintos dispositivos.",
                images: ["img/Logo minimalista con globo y www.png"]
            }
        ],
        complications: [],
        timeline: [
            {
                step: "01",
                title: "Requerimientos Institucionales",
                date: "2024",
                desc: "Reunión con directivos y análisis de la arquitectura de información de la institución.",
                images: ["img/Logo minimalista con globo y www.png"],
                tech: ["UX Research", "Estructuración Web"]
            },
            {
                step: "02",
                title: "Maquetado & Accesibilidad",
                date: "2024",
                desc: "Construcción de la maquetación accesible HTML5/CSS3 con jerarquía clara y tipografía moderna.",
                images: ["img/Logo minimalista con globo y www.png"],
                tech: ["HTML5", "CSS3", "JavaScript"]
            },
            {
                step: "04",
                title: "Despliegue Institucional",
                date: "2024",
                desc: "Lanzamiento oficial en servidores institucionales y optimización de velocidad de carga.",
                images: ["img/Logo minimalista con globo y www.png"],
                tech: ["GitHub Pages", "Performance Tuning"]
            }
        ],
        icon: "fas fa-school",
        color: "#b15eff",
        tags: ["JavaScript", "HTML", "CSS"],
        features: [
            "Diseño totalmente responsive",
            "Chatbot institucional",
            "Sistema de avisos urgentes",
            "Estructura clara y accesible",
            "Optimización para experiencia de usuario"
        ],
        images: ["img/Logo minimalista con globo y www.png"],
        repo: "https://github.com/tecnica29de6/tecnica29de6.edu.ar/",
        demo: "https://tecnica29de6.github.io/tecnica29de6.edu.ar/"
    },
    {
        id: 4,
        title: "WikiBots (En desarrollo)",
        theme: "web",
        category: "Plataforma Web Informativa",
        desc: "Plataforma web dinámica centrada en la robótica de competición BattleBots.",
        longDesc: "WikiBots es una plataforma web diseñada para centralizar información sobre el programa BattleBots. Permite a los usuarios explorar noticias, tendencias, robots y contenido relevante mediante una interfaz moderna, dinámica y responsive.\n\nEl proyecto busca construir una comunidad más conectada, ofreciendo herramientas interactivas como un simulador de batallas y una galería de robots, junto con un sistema de gestión de contenido escalable.",
        problem: "La comunidad de BattleBots no cuenta con una plataforma centralizada, moderna e interactiva para acceder a información relevante.",
        solution: "Se está desarrollando una plataforma web que unifica contenido, mejora la accesibilidad a la información y fomenta la interacción de la comunidad.",
        duration: "En desarrollo",
        events: [],
        versions: [
            {
                stage: "Avance Actual",
                desc: "Desarrollo del simulador de batallas y estructuración de un layout completamente responsive en Laravel.",
                images: ["img/Tecnología y productividad en acción.png"]
            }
        ],
        complications: [],
        timeline: [
            {
                step: "01",
                title: "Investigación & Base de Robótica",
                date: "2024",
                desc: "Definición del modelo de datos de competidores, categorías de peso y componentes de robótica.",
                images: ["img/Tecnología y productividad en acción.png"],
                tech: ["Robótica", "PHP", "Laravel"]
            },
            {
                step: "02",
                title: "Simulador de Batallas",
                date: "2024",
                desc: "Programación del algoritmo de simulación con cálculo de daño y métricas de blindaje.",
                images: ["img/Tecnología y productividad en acción.png"],
                tech: ["Laravel", "Blade", "JavaScript"]
            },
            {
                step: "03",
                title: "Galería Dinámica & Filtros",
                date: "2024",
                desc: "Estructuración del catálogo interactivo de robots con búsqueda en tiempo real.",
                images: ["img/Tecnología y productividad en acción.png"],
                tech: ["HTML5", "CSS3", "PHP"]
            }
        ],
        icon: "fas fa-robot",
        color: "#38bdf8",
        tags: ["PHP", "Laravel", "HTML", "CSS"],
        features: [
            "Gestión de contenido dinámico",
            "Simulador de batallas interactivo",
            "Galería de robots de competición",
            "Diseño responsive adaptativo",
            "Arquitectura escalable en Laravel"
        ],
        images: ["img/Tecnología y productividad en acción.png"],
        repo: "https://github.com/felipelucerocosta/Batllebots",
        demo: "https://battlebots11122.netlify.app/"
    },
    {
        id: 5,
        title: "Project Tracker",
        theme: "programas",
        category: "Gestión de Proyectos",
        desc: "Aplicación de escritorio para la gestión y seguimiento del ciclo de vida de software.",
        longDesc: "Project Tracker es una aplicación de escritorio desarrollada en Python que permite gestionar el ciclo de vida de proyectos de software de forma clara y organizada. Facilita el registro de tareas, hitos y deadlines, junto con la visualización del progreso mediante paneles dinámicos.\n\nEl sistema está orientado a mejorar la planificación y el control de tiempos, permitiendo detectar cuellos de botella y generar reportes exportables para el seguimiento del proyecto.",
        problem: "La gestión manual de múltiples proyectos generaba desorganización y dificultaba el seguimiento de tiempos y entregas.",
        solution: "Se desarrolló una herramienta que centraliza la información del proyecto, automatiza la visualización del progreso y facilita la toma de decisiones.",
        duration: "1 semana",
        events: ["Muestra Anual Institucional"],
        versions: [
            {
                stage: "Versión Final Estable",
                desc: "Implementación completa con visualización de tiempos y generación de reportes exportables.",
                images: ["img/Edu-tech/captura 2.png"]
            }
        ],
        complications: [
            {
                stage: "Sincronización de datos temporales",
                desc: "Los gráficos no reflejaban correctamente cambios en fechas pasadas.",
                solution: "Se implementó un sistema de recálculo automático de métricas para mantener la coherencia de los datos."
            }
        ],
        timeline: [
            {
                step: "01",
                title: "Diseño de la Interfaz GUI",
                date: "2024",
                desc: "Creación del prototipo de ventanas en CustomTkinter con modo oscuro.",
                images: ["img/Edu-tech/captura 2.png"],
                tech: ["Python", "CustomTkinter"]
            },
            {
                step: "02",
                title: "Base de Datos SQLite & Métricas",
                date: "2024",
                desc: "Modelado de tablas para hitos, actividades y cálculo automático de avance porcentual.",
                images: ["img/Edu-tech/captura 2.png"],
                tech: ["SQLite", "SQL Query Optimization"]
            },
            {
                step: "03",
                title: "Exportación & Compilación Executable",
                date: "2024",
                desc: "Generación de reportes de tiempos y empaquetado final a ejecutable nativo (.exe).",
                images: ["img/Edu-tech/captura 2.png"],
                tech: ["PyInstaller", "Python Desktop"]
            }
        ],
        icon: "fas fa-project-diagram",
        color: "#8b5cf6",
        tags: ["Python", "SQLite", "CustomTkinter"],
        features: [
            "Visualización del progreso del proyecto",
            "Gestión de tareas, hitos y deadlines",
            "Generación de reportes exportables",
            "Control y análisis de tiempos",
            "Interfaz gráfica intuitiva de escritorio"
        ],
        images: ["img/Edu-tech/captura 2.png"],
        repo: "https://github.com/felipelucerocosta/gestor-de-tiempos",
        demo: "ProjectTracker.exe"
    },
    {
        id: 6,
        title: "Inventario - Reina Bazar",
        theme: "programas",
        category: "Sistemas de Gestión",
        desc: "Aplicación de escritorio para el control de stock, clientes y ventas de local comercial.",
        longDesc: "Desarrollé un sistema de inventario para Reina Bazar con el objetivo de optimizar la gestión de productos y el control de stock. La aplicación permite administrar de forma eficiente ventas, clientes y productos desde una interfaz simple e intuitiva, mejorando la organización y reduciendo errores en el manejo del inventario.",
        problem: "La falta de un sistema digital dificultaba el control del stock y la gestión de ventas, generando desorden y posibles errores.",
        solution: "Se implementó una aplicación de escritorio que centraliza la información del negocio, permitiendo un control más preciso y organizado de los productos, ventas y clientes.",
        duration: "Proyecto personal",
        events: [],
        versions: [
            {
                stage: "Versión Producción",
                desc: "Sistema en escritorio para control directo de productos y registro de clientes.",
                images: ["img/Tecnología y productividad en acción.png"]
            }
        ],
        complications: [],
        timeline: [
            {
                step: "01",
                title: "Análisis de Inventario",
                date: "2024",
                desc: "Modelado del catálogo de productos y flujo de registro de transacciones diarias.",
                images: ["img/Tecnología y productividad en acción.png"],
                tech: ["Análisis de Sistemas", "Python"]
            },
            {
                step: "02",
                title: "Desarrollo GUI & SQLite",
                date: "2024",
                desc: "Construcción de formularios de alta/baja/modificación e historial de ventas.",
                images: ["img/Tecnología y productividad en acción.png"],
                tech: ["CustomTkinter", "SQLite"]
            }
        ],
        icon: "fas fa-boxes",
        color: "#06b6d4",
        tags: ["Python", "SQLite", "CustomTkinter"],
        features: [
            "Gestión completa de stock",
            "Administración de productos",
            "Registro de ventas y facturación",
            "Gestión de clientes habituales",
            "Interfaz gráfica intuitiva de escritorio"
        ],
        images: ["img/Tecnología y productividad en acción.png"],
        repo: "#",
        demo: "#"
    },
    {
        id: 7,
        title: "MagoSaid - Landing Page",
        theme: "web",
        category: "Web Corporativa",
        desc: "Landing page institucional enfocada en alta conversión y posicionamiento estratégico.",
        longDesc: "Desarrollé una landing page para MagoSaid, una consultora estratégica en software, con el objetivo de transmitir profesionalismo y maximizar la conversión de visitantes en potenciales clientes. El diseño se centra en una estructura clara, contenido bien jerarquizado y una experiencia visual moderna.\n\nSe priorizó el rendimiento, la optimización SEO y la adaptabilidad a distintos dispositivos, logrando una presencia online sólida y alineada con los estándares actuales del desarrollo web.",
        problem: "La consultora no contaba con una presencia online profesional ni optimizada para la captación de clientes.",
        solution: "Se diseñó e implementó una landing page enfocada en conversión, con una estructura clara, optimización SEO y una experiencia de usuario moderna.",
        duration: "1 mes y medio",
        events: [],
        versions: [
            {
                stage: "Lanzamiento Oficial",
                desc: "Despliegue con enfoque SEO, maquetación adaptativa y diseño visual de alta gama.",
                images: ["img/Logo minimalista con globo y www.png"]
            }
        ],
        complications: [],
        timeline: [
            {
                step: "01",
                title: "Wireframing & UI System",
                date: "2024",
                desc: "Diseño de la estructura visual orientada a captación de prospectos de software.",
                images: ["img/Logo minimalista con globo y www.png"],
                tech: ["Figma", "UI/UX Design"]
            },
            {
                step: "02",
                title: "Desarrollo Frontend TypeScript",
                date: "2024",
                desc: "Maquetado modular en HTML5, CSS3 y TypeScript para interacciones dinámicas.",
                images: ["img/Logo minimalista con globo y www.png"],
                tech: ["TypeScript", "HTML5", "CSS3"]
            },
            {
                step: "03",
                title: "Optimización SEO & Despliegue",
                date: "2024",
                desc: "Auditoría de rendimiento Lighthouse 95+ y despliegue continuo en GitHub Pages.",
                images: ["img/Logo minimalista con globo y www.png"],
                tech: ["SEO Optimization", "Performance"]
            }
        ],
        icon: "fas fa-magic",
        color: "#d946ef",
        tags: ["TypeScript", "HTML", "CSS"],
        features: [
            "Diseño orientado a conversión",
            "Optimización SEO técnica",
            "Interfaz moderna y atractiva",
            "Diseño responsive completo",
            "Buenas prácticas de rendimiento web"
        ],
        images: ["img/Logo minimalista con globo y www.png"],
        repo: "https://github.com/felipelucerocosta/Magosaid",
        demo: "https://felipelucerocosta.github.io/Magosaid/index.html"
    },
    {
        id: 8,
        title: "E-commerce de Reina Bazar",
        theme: "web",
        category: "E-commerce",
        desc: "Tienda online moderna para la digitalización del catálogo de productos comerciales.",
        longDesc: "Diseñé y desarrollé una tienda online para Reina Bazar con el objetivo de digitalizar su catálogo de productos y facilitar el proceso de compra para los clientes. El proyecto se enfoca en una interfaz clara, navegación intuitiva y una experiencia de usuario simple y efectiva.",
        problem: "Reina Bazar no contaba con presencia online, lo que limitaba su alcance y oportunidades de venta.",
        solution: "Se implementó una tienda web accesible y organizada que permite visualizar productos fácilmente, mejorando la visibilidad del negocio y ampliando su canal de ventas.",
        duration: "Proyecto personal",
        events: [],
        versions: [
            {
                stage: "Maquetación Base E-Commerce",
                desc: "Estructura del catálogo de productos y carrito interactivo.",
                images: ["img/Tecnología y productividad en acción.png"]
            }
        ],
        complications: [],
        timeline: [
            {
                step: "01",
                title: "Diseño del Catálogo Digital",
                date: "2024",
                desc: "Estructuración de categorías de productos y maquetado de vitrina comercial.",
                images: ["img/Tecnología y productividad en acción.png"],
                tech: ["HTML5", "CSS Grid"]
            },
            {
                step: "02",
                title: "Navegación Intuitiva & Mobile",
                date: "2024",
                desc: "Optimización de la tienda para una compra ágil en dispositivos móviles.",
                images: ["img/Tecnología y productividad en acción.png"],
                tech: ["CSS3 Flexbox", "JavaScript"]
            }
        ],
        icon: "fas fa-shopping-cart",
        color: "#0284c7",
        tags: ["HTML", "CSS", "Javascript"],
        features: [
            "Catálogo de productos organizado",
            "Diseño responsive adaptativo",
            "Navegación intuitiva",
            "Estructura escalable para futuras mejoras"
        ],
        images: ["img/Tecnología y productividad en acción.png"],
        repo: "#",
        demo: "#"
    }
];

const education = [
    {
        date: "Febrero 2021 - Actualidad",
        title: "Secundario Técnico con especialidad en computación",
        org: "Escuela Técnica N° 29 DE 6 'Reconquista de Buenos Aires'",
        desc: "Formación integral en desarrollo de software, arquitectura de sistemas, infraestructura de redes y tecnologías web. Orientación técnica enfocada en resolución de problemas complejos, lógica de programación y hardware."
    },
    {
        date: "Mayo 2026",
        title: "Capacitación en Redes Wi-Fi & Conectividad LAN",
        org: "TP-Link Academy",
        desc: "Capacitación en diseño, implementación y optimización de redes inalámbricas, protocolos de conectividad y configuración avanzada de routers y switches."
    },
    {
        date: "Mayo - Actualidad",
        title: "Desarrollo de Proyectos con Inteligencia Artificial",
        org: "Generación T",
        desc: "Implementación de modelos de lenguaje, automatización de procesos y desarrollo de soluciones inteligentes aplicadas al software."
    },
    {
        date: "Abril - Actualidad",
        title: "Armado, Reparación y Mantenimiento de PC",
        org: "Centro de Formación Profesional",
        desc: "Diagnóstico avanzado de hardware, mantenimiento preventivo/correctivo, ensamblado de arquitectura informáticas y soporte técnico de sistemas."
    },
    {
        date: "2026",
        title: "Marketing Digital & Posicionamiento Web",
        org: "Puerta 18",
        desc: "Estrategias de SEO técnico, análisis de tráfico y comunicación de marca para productos tecnológicos."
    },
    {
        date: "Mayo - Octubre 2025",
        title: "Desarrollo Full Stack Junior",
        org: "Generación T",
        desc: "Formación práctica en Frontend y Backend, creación de aplicaciones web con arquitectura en capas y bases de datos relacionales."
    },
    {
        date: "Abril - Junio 2025",
        title: "Agentes de Inteligencia Artificial con Python",
        org: "Talento Tech",
        desc: "Diseño y despliegue de agentes autónomos, procesamiento de datos y llamadas a APIs de inteligencia artificial."
    }
];

const skillsData = {
    frontend: [
        { name: "HTML5 / CSS3 Avanzado", icon: "fab fa-html5", level: "Avanzado" },
        { name: "JavaScript ES6+", icon: "fab fa-js", level: "Intermedio / Avanzado" },
        { name: "ReactJS", icon: "fab fa-react", level: "Intermedio" },
        { name: "TypeScript", icon: "devicon-typescript-plain", level: "Intermedio" },
        { name: "CustomTkinter (Desktop)", icon: "fas fa-window-maximize", level: "Intermedio" }
    ],
    backend: [
        { name: "NodeJS & Express", icon: "fab fa-node-js", level: "Intermedio" },
        { name: "Python & FastAPI", icon: "fab fa-python", level: "Intermedio" },
        { name: "PostgreSQL", icon: "devicon-postgresql-plain", level: "Intermedio" },
        { name: "SQLite", icon: "fas fa-database", level: "Intermedio" },
        { name: "PHP & Laravel", icon: "fab fa-laravel", level: "Básico / Integración" },
        { name: "Java Base", icon: "fab fa-java", level: "Básico" }
    ],
    redes: [
        { name: "Arquitectura de Redes LAN", icon: "fas fa-network-wired", level: "Intermedio / Avanzado" },
        { name: "Cisco Packet Tracer", icon: "packettracer", isSvg: true, level: "Avanzado" },
        { name: "Capacitación Wi-Fi TP-Link", icon: "fas fa-wifi", level: "Intermedio" },
        { name: "Protocolos Sockets & WebSockets", icon: "fas fa-plug", level: "Intermedio" },
        { name: "Seguridad JWT & HttpOnly Cookies", icon: "fas fa-shield-alt", level: "Intermedio" }
    ],
    hardware: [
        { name: "Armado y Reparación de PC", icon: "fas fa-microchip", level: "Avanzado" },
        { name: "Robótica & Electrónica Base", icon: "fas fa-robot", level: "Intermedio" },
        { name: "Diagramación Lucidchart", icon: "lucidchart", isSvg: true, level: "Avanzado" },
        { name: "Planificación Gantt", icon: "gantt", isSvg: true, level: "Avanzado" },
        { name: "GitHub & Control de Versiones", icon: "fab fa-github", level: "Intermedio" },
        { name: "Docker Base", icon: "fab fa-docker", level: "Básico" }
    ],
    blandas: [
        { name: "Resolución de Problemas Técnicos", icon: "fas fa-brain" },
        { name: "Pensamiento Lógico & Arquitectura", icon: "fas fa-project-diagram" },
        { name: "Trabajo en Equipo & Comunicación", icon: "fas fa-users" },
        { name: "Adaptabilidad & Aprendizaje Autónomo", icon: "fas fa-sync-alt" },
        { name: "Gestión de Tiempos & Entregas", icon: "fas fa-hourglass-half" },
        { name: "Atención al Detalle & UX", icon: "fas fa-eye" }
    ]
};

const svgIcons = {
    lucidchart: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="skill-svg-icon" fill="currentColor"><title>Lucidchart</title><path d="M12 0 3.694 4.8V24L12 19.2Zm0 19.2v4.502h8.305V14.4Z"/></svg>`,
    gantt: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" class="skill-svg-icon" fill="currentColor"><rect x="20" y="20" width="10" height="216"/><rect x="20" y="226" width="216" height="10"/><rect x="40" y="50" width="60" height="30" rx="4"/><rect x="80" y="100" width="80" height="30" rx="4"/><rect x="140" y="150" width="70" height="30" rx="4"/><rect x="180" y="200" width="40" height="30" rx="4"/></svg>`,
    packettracer: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="skill-svg-icon" fill="currentColor"><title>Cisco Packet Tracer</title><path d="M12.915 2.114V21.88h-1.83V2.114h1.83zm-3.829 1.154v17.47h-1.83V3.268h1.83zm7.658 0v17.47h-1.83V3.268h1.83zM5.257 6.15v11.7h-1.83v-11.7h1.83zm13.486 0v11.7h-1.83v-11.7h1.83zM1.428 9.034v5.93h-1.4v-5.93h1.4zm21.144 0v5.93h-1.4v-5.93h1.4z"/></svg>`
};
