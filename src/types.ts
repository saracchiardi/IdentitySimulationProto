export interface ERSRequirement {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'Alta' | 'Media' | 'Baja';
  status: 'Aprobado' | 'En Revisión' | 'Pendiente';
  type: 'Funcional' | 'No Funcional';
}

export interface ScrumTask {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Review' | 'Done';
  priority: 'Alta' | 'Media' | 'Baja';
  assignee: string;
}

export interface ChangeRequest {
  id: string;
  title: string;
  type: 'Funcional' | 'No Funcional';
  justification: string;
  impact: 'Alto' | 'Medio' | 'Bajo';
  status: 'Pendiente' | 'Aprobado' | 'Rechazado';
  createdAt: string;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  attributes: {
    fuerza: number;
    destreza: number;
    inteligencia: number;
    carisma: number;
  };
  biography: string;
  privacy: 'public' | 'private';
  image: string;
  status: 'Leyenda' | 'Principal' | 'Borrador';
  createdAt: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  associatedCharacterId?: string;
  associatedWorldId?: string;
  status: 'Borrador' | 'Publicada' | 'Archivada';
  createdAt: string;
}

export interface World {
  id: string;
  name: string;
  climate: string;
  technology: string;
  population: string;
  description: string;
  status: 'Activo' | 'Borrador';
  createdAt: string;
}

export interface SystemLog {
  id: string;
  time: string;
  type: 'Inicio de Sesión' | 'Cambio Permisos' | 'Fallo de Autenticación' | 'Backup Sistema' | 'Cambio ERS' | 'Creado Personaje' | 'Creado Mundo' | 'Creada Historia';
  description: string;
  user: string;
  ipOrDetail: string;
}
