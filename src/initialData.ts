import { ERSRequirement, ScrumTask, ChangeRequest, Character, SystemLog, Story, World } from './types';

export const initialRequirements: ERSRequirement[] = [
  {
    id: 'RF01',
    title: 'Registrar Usuario',
    description: 'El sistema permitirá registrar un nuevo usuario mediante el ingreso de Nombre, Correo y Contraseña.',
    category: 'Autenticación',
    priority: 'Alta',
    status: 'Aprobado',
    type: 'Funcional'
  },
  {
    id: 'RF02',
    title: 'Iniciar Sesión',
    description: 'El sistema permitirá autenticar a un usuario mediante correo electrónico y contraseña haseada.',
    category: 'Autenticación',
    priority: 'Alta',
    status: 'Aprobado',
    type: 'Funcional'
  },
  {
    id: 'RF03',
    title: 'Cerrar Sesión',
    description: 'Permite finalizar la sesión activa del usuario, eliminando el token de sesión y bloqueando rutas protegidas.',
    category: 'Autenticación',
    priority: 'Alta',
    status: 'Aprobado',
    type: 'Funcional'
  },
  {
    id: 'RF04',
    title: 'Crear personaje',
    description: 'Permitir registrar un personaje (Nombre, Raza, Clase, Atributos de Fuerza/Destreza/Inteligencia/Carisma, e Historia) asociado al usuario.',
    category: 'Gestión de Personajes',
    priority: 'Alta',
    status: 'Aprobado',
    type: 'Funcional'
  },
  {
    id: 'RF05',
    title: 'Editar personaje',
    description: 'Permitir modificar los datos de un personaje previamente registrado y mantener historial de cambios.',
    category: 'Gestión de Personajes',
    priority: 'Media',
    status: 'Aprobado',
    type: 'Funcional'
  },
  {
    id: 'RF06',
    title: 'Eliminar personaje',
    description: 'Permite eliminar permanentemente o archivar un personaje a petición del creador original.',
    category: 'Gestión de Personajes',
    priority: 'Baja',
    status: 'Aprobado',
    type: 'Funcional'
  },
  {
    id: 'RF08',
    title: 'Crear historia',
    description: 'Permite registrar una historia o crónica ingresando Título y Contenido narrativo con autoguardado.',
    category: 'Gestión de Historias',
    priority: 'Alta',
    status: 'Aprobado',
    type: 'Funcional'
  },
  {
    id: 'RF12',
    title: 'Crear mundo ficticio',
    description: 'Permite registrar un mundo o plano de campaña con Clima, Tecnología, Población y descripción general.',
    category: 'Worldbuilding',
    priority: 'Alta',
    status: 'Aprobado',
    type: 'Funcional'
  },
  {
    id: 'RF15',
    title: 'Asociar activos a mundos',
    description: 'Permite vincular personajes e historias a un mundo determinado para consolidar el lore.',
    category: 'Worldbuilding',
    priority: 'Media',
    status: 'En Revisión',
    type: 'Funcional'
  },
  {
    id: 'RF17',
    title: 'Definir visibilidad',
    description: 'Permite establecer el nivel de visibilidad (Público o Privado) para personajes, historias y mundos.',
    category: 'Privacidad',
    priority: 'Alta',
    status: 'Aprobado',
    type: 'Funcional'
  },
  {
    id: 'RNF01',
    title: 'Tiempo de respuesta óptimo',
    description: 'El tiempo de respuesta del servidor backend para entregar datos estructurados debe ser menor a 2 segundos en el 95% de las llamadas.',
    category: 'Rendimiento',
    priority: 'Media',
    status: 'Aprobado',
    type: 'No Funcional'
  },
  {
    id: 'RNF03',
    title: 'Cifrado de contraseñas',
    description: 'Las contraseñas de los usuarios deben almacenarse de forma segura utilizando esquemas de hash criptográfico como bcrypt o Argon2.',
    category: 'Seguridad',
    priority: 'Alta',
    status: 'Aprobado',
    type: 'No Funcional'
  },
  {
    id: 'RNF04',
    title: 'Autenticación moderna (JWT)',
    description: 'La sesión y el estado de autenticación se gestionará de manera stateless utilizando JSON Web Tokens válidos por 24 horas.',
    category: 'Seguridad',
    priority: 'Alta',
    status: 'Aprobado',
    type: 'No Funcional'
  },
  {
    id: 'RNF09',
    title: 'Disponibilidad de Servicio',
    description: 'El sistema garantizará una disponibilidad mínima del 99% mensual sobre la infraestructura en la nube.',
    category: 'Disponibilidad',
    priority: 'Alta',
    status: 'Aprobado',
    type: 'No Funcional'
  }
];

export const initialScrumTasks: ScrumTask[] = [
  {
    id: 'SCRUM-01',
    title: 'Como escritor, quiero crear la ficha de un personaje para definir su rol en la historia.',
    description: 'Permitir definir nombre, raza, clase, historia y atributos de Fuerza, Destreza, Inteligencia y Carisma.',
    status: 'Done',
    priority: 'Alta',
    assignee: 'Valentina Cordero'
  },
  {
    id: 'SCRUM-02',
    title: 'Diseñar la interfaz responsiva del editor de textos para soportar escritura concentrada.',
    description: 'Configurar un área de lectura/escritura libre de distracciones con modo pergamino y fuentes elegantes.',
    status: 'In Progress',
    priority: 'Alta',
    assignee: 'Silvana Reyes'
  },
  {
    id: 'SCRUM-03',
    title: 'Implementar el hashing de seguridad mediante Argon2 en el inicio de sesión.',
    description: 'Garantizar que todas las claves se almacenen de forma irreversible en la base de datos PostgreSQL.',
    status: 'Done',
    priority: 'Alta',
    assignee: 'Dario Vargas'
  },
  {
    id: 'SCRUM-04',
    title: 'Configurar base de datos PostgreSQL y migraciones iniciales para mundos de fantasía.',
    description: 'Garantizar la integridad referencial entre mundos, personajes e historias asociadas.',
    status: 'Done',
    priority: 'Media',
    assignee: 'José Moena'
  },
  {
    id: 'SCRUM-05',
    title: 'Desarrollar el visor del historial de versiones para permitir auditoría de historias.',
    description: 'Los usuarios deben poder ver los cambios realizados en el tiempo y restaurar versiones anteriores.',
    status: 'To Do',
    priority: 'Media',
    assignee: 'Dario Vargas'
  },
  {
    id: 'SCRUM-06',
    title: 'Crear filtros de restricción de edad para historias que contienen temas adultos.',
    description: 'Configurar metadatos en los modelos para catalogar historias con contenido sensible o no apto para menores.',
    status: 'Review',
    priority: 'Baja',
    assignee: 'Valentina Cordero'
  }
];

export const initialChangeRequests: ChangeRequest[] = [
  {
    id: 'RFC-01',
    title: 'Filtro de edad por contenido sensible',
    type: 'Funcional',
    justification: 'Clasificar relatos para mayor seguridad según directrices aplicables a menores (NSFW filter).',
    impact: 'Medio',
    status: 'Aprobado',
    createdAt: '2026-06-08'
  },
  {
    id: 'RFC-02',
    title: 'Exportación a PDF en un clic',
    type: 'Funcional',
    justification: 'Permitir a los escritores descargar sus manuscritos directamente en un PDF con formato de libro impreso.',
    impact: 'Alto',
    status: 'Pendiente',
    createdAt: '2026-06-09'
  },
  {
    id: 'RFC-03',
    title: 'Integración en tiempo real con Unreal Engine 5',
    type: 'No Funcional',
    justification: 'Sincronizar las fichas técnicas de personajes como activos en motores de videojuegos en tiempo real.',
    impact: 'Alto',
    status: 'Rechazado',
    createdAt: '2026-06-05'
  }
];

export const initialCharacters: Character[] = [
  {
    id: 'CHAR-01',
    name: 'Elowen Sombragris',
    race: 'Elfo de Sangre',
    class: 'Hechicero del Vacío',
    attributes: {
      fuerza: 10,
      destreza: 12,
      inteligencia: 15,
      carisma: 8
    },
    biography: 'Antiguo guardián de las torres de cristal, ahora exiliado por buscar secretos prohibidos en el Abismo Sombrío.',
    privacy: 'private',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop',
    status: 'Leyenda',
    createdAt: 'Hace 2 horas'
  },
  {
    id: 'CHAR-02',
    name: 'Kaelen de Hierro',
    race: 'Humano',
    class: 'Paladín Caído',
    attributes: {
      fuerza: 14,
      destreza: 10,
      inteligencia: 11,
      carisma: 9
    },
    biography: 'Portadora de la espada quebrada de los ancestros, busca redención en un mundo que ya no cree en los dioses antiguos.',
    privacy: 'public',
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=600&auto=format&fit=crop',
    status: 'Principal',
    createdAt: 'Hace 5 horas'
  }
];

export const initialLogs: SystemLog[] = [
  {
    id: 'LOG-01',
    time: 'Hace 2m',
    type: 'Inicio de Sesión',
    description: 'Sacerdote de la Prosa inició sesión exitosamente.',
    user: 'Sacerdote de la Prosa',
    ipOrDetail: '192.168.1.42'
  },
  {
    id: 'LOG-02',
    time: 'Hace 15m',
    type: 'Cambio Permisos',
    description: 'Se actualizó rol de Julian Black a Administrador.',
    user: 'Sistema Automático',
    ipOrDetail: 'Rol: Admin'
  },
  {
    id: 'LOG-03',
    time: 'Hace 1h',
    type: 'Fallo de Autenticación',
    description: 'Intento fallido en cuenta de mvane@chronicles.com.',
    user: 'Desconocido',
    ipOrDetail: 'IP Bloqueada temporalmente'
  },
  {
    id: 'LOG-04',
    time: 'Hace 4h',
    type: 'Backup Sistema',
    description: 'Copia de seguridad automática completada satisfactoriamente.',
    user: 'Sistema Automático',
    ipOrDetail: 'db_dump_20240512.sql'
  }
];

export const initialStories: Story[] = [
  {
    id: 'STORY-01',
    title: 'El Sacrificio de las Sombras',
    content: 'En las profundidades del Abismo Sombrío, Elowen Sombragris presenció como las torres de cristal colapsaban una a una. Con las manos sangrantes y su báculo agrietado, conjuró la Runas del Vacío para sellar la brecha astral. El precio fue su propio destierro, pero el plano mortal durmió una noche más sin pesadillas.',
    associatedCharacterId: 'CHAR-01',
    associatedWorldId: 'WORLD-01',
    status: 'Publicada',
    createdAt: '2026-06-08'
  },
  {
    id: 'STORY-02',
    title: 'La Promesa del Acero Quebrado',
    content: 'Bajo el sol ardiente de las dunas alcalinas, la paladín Kaelen clavó la empuñadura de su espada en la tierra dorada. El metal sagrado yacía roto en tres mitades, pero las palabras ancestrales grabadas en la cruz de bronce aún pulsaban con una tenue y cálida luz ámbar. Ella juró encontrar el Yunque Glacial para fundirla de nuevo.',
    associatedCharacterId: 'CHAR-02',
    associatedWorldId: 'WORLD-02',
    status: 'Publicada',
    createdAt: '2026-06-09'
  }
];

export const initialWorlds: World[] = [
  {
    id: 'WORLD-01',
    name: 'Astralheim (Plano Glacial)',
    climate: 'Glacial Celestial (-50°C)',
    technology: 'Rúnica Ancestral / Éter Espacial',
    population: '450,000 Almas Astrales',
    description: 'Un majestuoso plano de icebergs y cristales flotantes suspendidos en un vacío estelar color púrpura. Forjado en el inicio de la era por los Sacerdotes de la Prosa.',
    status: 'Activo',
    createdAt: '2026-06-01'
  },
  {
    id: 'WORLD-02',
    name: 'Tergon-Nura (Reino de Bronce)',
    climate: 'Desértico Calcinante (48°C)',
    technology: 'Vapor Alquímico / Ingeniería de Engranajes',
    population: '1,200,000 Habitantes',
    description: 'Tierras de dunas doradas gobernadas por gigantescas fortalezas colgantes de bronce y cobre. La energía elemental se extrae de pozos de arena magnética.',
    status: 'Activo',
    createdAt: '2026-06-05'
  }
];
