import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Shield,
  Activity,
  Calendar,
  UserPlus,
  Plus,
  Search,
  Lock,
  Mail,
  Eye,
  EyeOff,
  User,
  PlusCircle,
  ArrowRight,
  CheckCircle,
  Sliders,
  X,
  ChevronRight,
  Info,
  AlertCircle,
  Trash2,
  Settings,
  LogOut,
  Globe,
  Award,
  Terminal,
  Check,
  RotateCcw,
  FileText,
  Sparkles,
  Clock,
  Briefcase,
  ChevronLeft,
  Filter,
  CheckCircle2,
  UserCheck,
  Zap,
  BookMarked,
  ShieldAlert,
  FolderOpen
} from 'lucide-react';

import { ERSRequirement, ScrumTask, ChangeRequest, Character, SystemLog, Story, World } from './types';
import {
  initialRequirements,
  initialScrumTasks,
  initialChangeRequests,
  initialCharacters,
  initialLogs,
  initialStories,
  initialWorlds
} from './initialData';

export default function App() {
  // Session / Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('is_auth_sim');
    return saved === 'true';
  });
  
  const [loginTab, setLoginTab] = useState<'login' | 'register'>('login');
  const [emailInput, setEmailInput] = useState('forjador@grimorigital.io');
  const [passwordInput, setPasswordInput] = useState('********');
  const [nameInput, setNameInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Core App State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeCharTab, setActiveCharTab] = useState<'list' | 'create'>('list');
  const [activeStoryTab, setActiveStoryTab] = useState<'list' | 'create'>('list');
  const [activeWorldTab, setActiveWorldTab] = useState<'list' | 'create'>('list');
  const [requirements, setRequirements] = useState<ERSRequirement[]>(() => {
    const saved = localStorage.getItem('ers_requirements');
    return saved ? JSON.parse(saved) : initialRequirements;
  });
  const [scrumTasks, setScrumTasks] = useState<ScrumTask[]>(() => {
    const saved = localStorage.getItem('scrum_tasks');
    return saved ? JSON.parse(saved) : initialScrumTasks;
  });
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>(() => {
    const saved = localStorage.getItem('change_requests');
    return saved ? JSON.parse(saved) : initialChangeRequests;
  });
  const [characters, setCharacters] = useState<Character[]>(() => {
    const saved = localStorage.getItem('created_characters');
    return saved ? JSON.parse(saved) : initialCharacters;
  });
  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem('created_stories');
    return saved ? JSON.parse(saved) : initialStories;
  });
  const [worlds, setWorlds] = useState<World[]>(() => {
    const saved = localStorage.getItem('created_worlds');
    return saved ? JSON.parse(saved) : initialWorlds;
  });
  const [logs, setLogs] = useState<SystemLog[]>(() => {
    const saved = localStorage.getItem('system_logs');
    return saved ? JSON.parse(saved) : initialLogs;
  });

  // State synchronization with localStorage
  useEffect(() => {
    localStorage.setItem('ers_requirements', JSON.stringify(requirements));
  }, [requirements]);

  useEffect(() => {
    localStorage.setItem('scrum_tasks', JSON.stringify(scrumTasks));
  }, [scrumTasks]);

  useEffect(() => {
    localStorage.setItem('change_requests', JSON.stringify(changeRequests));
  }, [changeRequests]);

  useEffect(() => {
    localStorage.setItem('created_characters', JSON.stringify(characters));
  }, [characters]);

  useEffect(() => {
    localStorage.setItem('created_stories', JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem('created_worlds', JSON.stringify(worlds));
  }, [worlds]);

  useEffect(() => {
    localStorage.setItem('system_logs', JSON.stringify(logs));
  }, [logs]);

  // Clock state for actual live UTC indicator
  const [timeStr, setTimeStr] = useState<string>('');
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(d.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter States (Requirements matrix tab)
  const [reqSearch, setReqSearch] = useState<string>('');
  const [reqCategoryFilter, setReqCategoryFilter] = useState<string>('All');
  const [reqPriorityFilter, setReqPriorityFilter] = useState<string>('All');
  const [reqTypeFilter, setReqTypeFilter] = useState<string>('All');

  // Interactive Toast State
  const [toast, setToast] = useState<{
    id: number;
    type: 'success' | 'info' | 'error' | 'gold';
    title: string;
    message: string;
  } | null>(null);

  const triggerToast = (title: string, message: string, type: 'success' | 'info' | 'error' | 'gold' = 'success') => {
    const id = Date.now();
    setToast({ id, type, title, message });
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Backlog Form state
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'Alta' | 'Media' | 'Baja'>('Media');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Cronista Invitado');

  // Change request Form state
  const [rfcTitle, setRfcTitle] = useState('');
  const [rfcType, setRfcType] = useState<'Funcional' | 'No Funcional'>('Funcional');
  const [rfcJustification, setRfcJustification] = useState('');
  const [rfcImpact, setRfcImpact] = useState<'Alto' | 'Medio' | 'Bajo'>('Medio');

  // Character SandBox State
  const [charName, setCharName] = useState('');
  const [charRace, setCharRace] = useState('Elfo Silvano');
  const [charClass, setCharClass] = useState('Mago Rúnico');
  const [charBiography, setCharBiography] = useState('');
  const [charPrivacy, setCharPrivacy] = useState<'public' | 'private'>('public');
  const [editingCharacterId, setEditingCharacterId] = useState<string | null>(null);

  // Stories SandBox State
  const [storyTitle, setStoryTitle] = useState('');
  const [storyContent, setStoryContent] = useState('');
  const [storyCharacterId, setStoryCharacterId] = useState('');
  const [storyWorldId, setStoryWorldId] = useState('');
  const [storyStatus, setStoryStatus] = useState<'Borrador' | 'Publicada' | 'Archivada'>('Publicada');
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);

  // Worlds SandBox State
  const [worldName, setWorldName] = useState('');
  const [worldClimate, setWorldClimate] = useState('');
  const [worldTechnology, setWorldTechnology] = useState('');
  const [worldPopulation, setWorldPopulation] = useState('');
  const [worldDescription, setWorldDescription] = useState('');
  const [worldStatus, setWorldStatus] = useState<'Activo' | 'Borrador'>('Activo');
  const [editingWorldId, setEditingWorldId] = useState<string | null>(null);
  
  // Attributes State (Point buy system, start with 10 force, 10 dext, 10 intell, 10 char. Max 40 points to spend).
  const [charAtts, setCharAtts] = useState({
    fuerza: 10,
    destreza: 10,
    inteligencia: 10,
    carisma: 10
  });

  const remainingAttributePoints = 46 - (charAtts.fuerza + charAtts.destreza + charAtts.inteligencia + charAtts.carisma);

  const modifyAttribute = (attribute: 'fuerza' | 'destreza' | 'inteligencia' | 'carisma', amount: number) => {
    const val = charAtts[attribute];
    if (amount > 0 && remainingAttributePoints <= 0) {
      triggerToast('Puntos Insuficientes', 'Has asignado todos los Puntos del Alma disponibles.', 'error');
      return;
    }
    if (val + amount < 8) {
      triggerToast('Atributo Bajo', 'La puntuación mínima para cualquier Atributo es 8.', 'error');
      return;
    }
    if (val + amount > 18) {
      triggerToast('Atributo Máximo', 'El límite para una deidad mortal es de 18 puntos.', 'error');
      return;
    }
    setCharAtts(prev => ({
      ...prev,
      [attribute]: val + amount
    }));
  };

  const clearCharacterCreationForm = () => {
    setCharName('');
    setCharRace('Elfo Silvano');
    setCharClass('Mago Rúnico');
    setCharBiography('');
    setCharPrivacy('public');
    setCharAtts({ fuerza: 10, destreza: 10, inteligencia: 10, carisma: 10 });
    setEditingCharacterId(null);
  };

  // Handler: Save forged character
  const handleForgeCharacter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!charName.trim()) {
      triggerToast('Formulario Incompleto', 'Debes nombrar a tu entidad para forjar su existencia.', 'error');
      return;
    }

    if (editingCharacterId) {
      setCharacters(prev =>
        prev.map(char => {
          if (char.id === editingCharacterId) {
            return {
              ...char,
              name: charName,
              race: charRace,
              class: charClass,
              attributes: { ...charAtts },
              biography: charBiography || char.biography,
              privacy: charPrivacy,
            };
          }
          return char;
        })
      );

      const edLog: SystemLog = {
        id: `LOG-${Date.now()}`,
        time: 'Hace 1s',
        type: 'Cambio ERS',
        description: `Ficha de personaje modificada: ${charName} (${charRace} - ${charClass}).`,
        user: 'Sacerdote de la Prosa',
        ipOrDetail: `ID: ${editingCharacterId}`
      };
      setLogs(prev => [edLog, ...prev]);

      triggerToast(
        'Alma Re-estructurada',
        `¡Has re-escrito a ${charName} exitosamente en el grimorio!`,
        'success'
      );
    } else {
      const newChar: Character = {
        id: `CHAR-${Date.now()}`,
        name: charName,
        race: charRace,
        class: charClass,
        attributes: { ...charAtts },
        biography: charBiography || 'Su pasado está cubierto por las brumas del misterio, esperando ser escrito...',
        privacy: charPrivacy,
        image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=600&auto=format&fit=crop',
        status: 'Principal',
        createdAt: 'Hace instantes'
      };

      setCharacters(prev => [newChar, ...prev]);

      const newLog: SystemLog = {
        id: `LOG-${Date.now()}`,
        time: 'Hace 1s',
        type: 'Creado Personaje',
        description: `Forjado el alma del personaje: ${newChar.name} (${newChar.race} - ${newChar.class}).`,
        user: 'Sacerdote de la Prosa',
        ipOrDetail: `Visibilidad: ${newChar.privacy}`
      };
      setLogs(prev => [newLog, ...prev]);

      triggerToast(
        'Fusión de Almas Completada',
        `¡Has forjado a ${charName} exitosamente en el grimorio digital!`,
        'gold'
      );
    }

    clearCharacterCreationForm();
    setActiveTab('forge');
  };

  // Handler: Save Story (Crónica)
  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyTitle.trim() || !storyContent.trim()) {
      triggerToast('Información Insuficiente', 'Por favor ingresa un título y contenido para tu crónica.', 'error');
      return;
    }

    if (editingStoryId) {
      setStories(prev =>
        prev.map(st => {
          if (st.id === editingStoryId) {
            return {
              ...st,
              title: storyTitle,
              content: storyContent,
              associatedCharacterId: storyCharacterId || undefined,
              associatedWorldId: storyWorldId || undefined,
              status: storyStatus
            };
          }
          return st;
        })
      );

      const editLog: SystemLog = {
        id: `LOG-${Date.now()}`,
        time: 'Hace 1s',
        type: 'Cambio ERS',
        description: `Crónica literaria actualizada: "${storyTitle}".`,
        user: 'Sacerdote de la Prosa',
        ipOrDetail: `ID: ${editingStoryId}`
      };
      setLogs(prev => [editLog, ...prev]);

      triggerToast('Historia Re-escrita', `¡La crónica "${storyTitle}" se actualizó debidamente!`, 'success');
    } else {
      const newStory: Story = {
        id: `STORY-${Date.now()}`,
        title: storyTitle,
        content: storyContent,
        associatedCharacterId: storyCharacterId || undefined,
        associatedWorldId: storyWorldId || undefined,
        status: storyStatus,
        createdAt: new Date().toISOString().substring(0, 10)
      };

      setStories(prev => [newStory, ...prev]);

      const log: SystemLog = {
        id: `LOG-${Date.now()}`,
        time: 'Hace 1s',
        type: 'Creada Historia',
        description: `Nueva crónica fundadora: "${storyTitle}" integrada en el multiverso.`,
        user: 'Sacerdote de la Prosa',
        ipOrDetail: `Estatus: ${storyStatus}`
      };
      setLogs(prev => [log, ...prev]);

      triggerToast('Crónica Sellada', `¡Se ha guardado "${storyTitle}" en el compendio!`, 'gold');
    }

    setStoryTitle('');
    setStoryContent('');
    setStoryCharacterId('');
    setStoryWorldId('');
    setStoryStatus('Publicada');
    setEditingStoryId(null);
    setActiveTab('stories');
  };

  const clearStoryForm = () => {
    setStoryTitle('');
    setStoryContent('');
    setStoryCharacterId('');
    setStoryWorldId('');
    setStoryStatus('Publicada');
    setEditingStoryId(null);
  };

  // Handler: Save World (Cosmogonía)
  const handleSaveWorld = (e: React.FormEvent) => {
    e.preventDefault();
    if (!worldName.trim()) {
      triggerToast('Nombre Requerido', 'Debes bautizar tu plano de existencia.', 'error');
      return;
    }

    if (editingWorldId) {
      setWorlds(prev =>
        prev.map(w => {
          if (w.id === editingWorldId) {
            return {
              ...w,
              name: worldName,
              climate: worldClimate || 'N/A',
              technology: worldTechnology || 'N/A',
              population: worldPopulation || 'N/A',
              description: worldDescription || 'Planicie estéril del limbo cósmico.',
              status: worldStatus
            };
          }
          return w;
        })
      );

      const editLog: SystemLog = {
        id: `LOG-${Date.now()}`,
        time: 'Hace 1s',
        type: 'Cambio ERS',
        description: `Datos geográficos actualizados para plano: ${worldName}.`,
        user: 'Sacerdote de la Prosa',
        ipOrDetail: `ID: ${editingWorldId}`
      };
      setLogs(prev => [editLog, ...prev]);

      triggerToast('Geografía Alterada', `¡Se reconfiguraron las constantes físicas de ${worldName}!`, 'success');
    } else {
      const newWorld: World = {
        id: `WORLD-${Date.now()}`,
        name: worldName,
        climate: worldClimate || 'Clima de Éter',
        technology: worldTechnology || 'Ninguna / Tribal',
        population: worldPopulation || 'Bajas Almas',
        description: worldDescription || 'Un plano por detallar cósmicamente...',
        status: worldStatus,
        createdAt: new Date().toISOString().substring(0, 10)
      };

      setWorlds(prev => [newWorld, ...prev]);

      const log: SystemLog = {
        id: `LOG-${Date.now()}`,
        time: 'Hace 1s',
        type: 'Creado Mundo',
        description: `Plano primigenio ${worldName} ha sido forjado e integrado.`,
        user: 'Sacerdote de la Prosa',
        ipOrDetail: `Estatus: ${worldStatus}`
      };
      setLogs(prev => [log, ...prev]);

      triggerToast('Plano Forjado', `¡Has establecido los pilares del mundo ${worldName}!`, 'gold');
    }

    setWorldName('');
    setWorldClimate('');
    setWorldTechnology('');
    setWorldPopulation('');
    setWorldDescription('');
    setWorldStatus('Activo');
    setEditingWorldId(null);
    setActiveTab('worlds');
  };

  const clearWorldForm = () => {
    setWorldName('');
    setWorldClimate('');
    setWorldTechnology('');
    setWorldPopulation('');
    setWorldDescription('');
    worldStatus === 'Activo';
    setEditingWorldId(null);
  };

  // State deleters
  const handleDeleteCharacter = (id: string, name: string) => {
    setCharacters(prev => prev.filter(c => c.id !== id));
    triggerToast('Entidad Exiliada', `Has enviado al vacío a ${name}.`, 'error');
    
    const log: SystemLog = {
      id: `LOG-${Date.now()}`,
      time: 'Hace 1s',
      type: 'Cambio ERS',
      description: `Personaje exiliado definitivamente del grimorio: ${name}.`,
      user: 'Sacerdote de la Prosa',
      ipOrDetail: `ID: ${id}`
    };
    setLogs(prev => [log, ...prev]);
  };

  const handleDeleteStory = (id: string, title: string) => {
    setStories(prev => prev.filter(s => s.id !== id));
    triggerToast('Crónica Quemada', `Se borró "${title}" del compendio.`, 'error');

    const log: SystemLog = {
      id: `LOG-${Date.now()}`,
      time: 'Hace 1s',
      type: 'Cambio ERS',
      description: `Crónica quemada y exiliada del lore: "${title}".`,
      user: 'Sacerdote de la Prosa',
      ipOrDetail: `ID: ${id}`
    };
    setLogs(prev => [log, ...prev]);
  };

  const handleDeleteWorld = (id: string, name: string) => {
    setWorlds(prev => prev.filter(w => w.id !== id));
    triggerToast('Plano Colapsado', `El plano de mundo "${name}" colapsó irrevocablemente.`, 'error');

    const log: SystemLog = {
      id: `LOG-${Date.now()}`,
      time: 'Hace 1s',
      type: 'Cambio ERS',
      description: `Plano geográfico colapsado del multiverso: "${name}".`,
      user: 'Sacerdote de la Prosa',
      ipOrDetail: `ID: ${id}`
    };
    setLogs(prev => [log, ...prev]);
  };

  // Handler: Login action
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginTab === 'register' && !nameInput.trim()) {
      triggerToast('Registro Requerido', 'Por favor ingresa un nombre para fundar tu portal.', 'error');
      return;
    }
    
    localStorage.setItem('is_auth_sim', 'true');
    setIsAuthenticated(true);
    
    // Log creation
    const newLog: SystemLog = {
      id: `LOG-${Date.now()}`,
      time: 'Hace 1s',
      type: 'Inicio de Sesión',
      description: `Ingreso autorizado de ${loginTab === 'register' ? nameInput : 'Sacerdote de la Prosa'}.`,
      user: loginTab === 'register' ? nameInput : 'Sacerdote de la Prosa',
      ipOrDetail: 'Auth simulada exitosa'
    };
    setLogs(prev => [newLog, ...prev]);

    triggerToast(
      'Abriendo Grimorio Digital',
      `Bienvenido de vuelta, ${loginTab === 'register' ? nameInput : 'Sacerdote de la Prosa'}.`,
      'gold'
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('is_auth_sim');
    setIsAuthenticated(false);
    triggerToast('Grimorio Cerrado', 'Has sellado tu sesión correctamente.', 'info');
  };

  // Handler: Move Kanban Stories
  const handleMoveKanbanTask = (taskId: string, targetStatus: 'To Do' | 'In Progress' | 'Review' | 'Done') => {
    setScrumTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          return { ...task, status: targetStatus };
        }
        return task;
      })
    );
    
    // Add dynamic feedback log
    const updatedTask = scrumTasks.find(t => t.id === taskId);
    if (updatedTask) {
      const newLog: SystemLog = {
        id: `LOG-${Date.now()}`,
        time: 'Hace 1s',
        type: 'Cambio ERS',
        description: `Tarea ${updatedTask.id} movida a [${targetStatus}].`,
        user: 'Sacerdote de la Prosa',
        ipOrDetail: 'Tablero Scrum Ágil'
      };
      setLogs(prev => [newLog, ...prev]);
    }

    triggerToast('Tablero de Runas Actualizado', `La tarea ${taskId} ahora está en [${targetStatus}].`, 'success');
  };

  // Handler: Add new task to Scrum backlog
  const handleCreateScrumTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      triggerToast('Campos Faltantes', 'Por favor, ingresa el título de la historia.', 'error');
      return;
    }

    const newTask: ScrumTask = {
      id: `SCRUM-0${scrumTasks.length + 1}`,
      title: newTaskTitle,
      description: newTaskDesc || 'Sin descripción detallada provista.',
      status: 'To Do',
      priority: newTaskPriority,
      assignee: newTaskAssignee
    };

    setScrumTasks(prev => [...prev, newTask]);
    
    const newLog: SystemLog = {
      id: `LOG-${Date.now()}`,
      time: 'Hace 1s',
      type: 'Cambio ERS',
      description: `Historia de Usuario creada: ${newTask.id} (${newTask.title.substring(0, 30)}...).`,
      user: 'Sacerdote de la Prosa',
      ipOrDetail: 'Backlog Creado'
    };
    setLogs(prev => [newLog, ...prev]);

    triggerToast('Nueva Runa Tallada', `Historia ${newTask.id} integrada al Tablero Scrum.`, 'success');
    
    // Reset fields
    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskPriority('Media');
    setShowTaskModal(false);
  };

  // Handler: Create PMI Change Request
  const handleCreateChangeRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfcTitle.trim() || !rfcJustification.trim()) {
      triggerToast('Información Insuficiente', 'Por favor describe el título y justificación del cambio.', 'error');
      return;
    }

    const newRfc: ChangeRequest = {
      id: `RFC-0${changeRequests.length + 1}`,
      title: rfcTitle,
      type: rfcType,
      justification: rfcJustification,
      impact: rfcImpact,
      status: 'Pendiente',
      createdAt: new Date().toISOString().substring(0, 10)
    };

    setChangeRequests(prev => [newRfc, ...prev]);

    const newLog: SystemLog = {
      id: `LOG-${Date.now()}`,
      time: 'Hace 1s',
      type: 'Cambio ERS',
      description: `Propuesta de Cambio Registrada: ${newRfc.id} (Impacto ${newRfc.impact}).`,
      user: 'Sacerdote de la Prosa',
      ipOrDetail: 'PMI Change Control'
    };
    setLogs(prev => [newLog, ...prev]);

    triggerToast(
      'Petición Archivada',
      `Tu RFC ${newRfc.id} ha sido ingresado al Comité de Control de Cambios (CCB).`,
      'info'
    );

    setRfcTitle('');
    setRfcJustification('');
  };

  // Handler: Approve or Reject Change Request (CCB roleplay role)
  const handleModerateChangeRequest = (id: string, decision: 'Aprobado' | 'Rechazado') => {
    setChangeRequests(prev =>
      prev.map(rfc => {
        if (rfc.id === id) {
          return { ...rfc, status: decision };
        }
        return rfc;
      })
    );

    const rfc = changeRequests.find(r => r.id === id);
    if (rfc) {
      // Create system log
      const newLog: SystemLog = {
        id: `LOG-${Date.now()}`,
        time: 'Hace 1s',
        type: 'Cambio ERS',
        description: `RFC ${rfc.id} fue [${decision}] por el Comité PMI de Control de Cambios.`,
        user: 'Comité CCB',
        ipOrDetail: `Decisión: ${decision}`
      };
      setLogs(prev => [newLog, ...prev]);

      // Dynamic feedback: If approved, let's inject a new placeholder Requirement!
      if (decision === 'Aprobado') {
        const newReqId = rfc.type === 'Funcional' ? `RF-${Date.now().toString().slice(-2)}` : `RNF-${Date.now().toString().slice(-2)}`;
        const newReq: ERSRequirement = {
          id: newReqId,
          title: rfc.title,
          description: `Definido tras RFC ${rfc.id} aprobado: ${rfc.justification}`,
          category: 'Evolutivo / Solicitado',
          priority: rfc.impact === 'Alto' ? 'Alta' : rfc.impact === 'Medio' ? 'Media' : 'Baja',
          status: 'Aprobado',
          type: rfc.type
        };
        setRequirements(prev => [...prev, newReq]);

        triggerToast(
          '¡Decisión del CCB Aplicada!',
          `RFC ${id} Aprobado. Se generó un nuevo requerimiento formal: [${newReqId}].`,
          'gold'
        );
      } else {
        triggerToast(
          'Manuscrito Detenido',
          `El cambio propuesto en ${id} ha sido archivado y rechazado de forma segura.`,
          'error'
        );
      }
    }
  };

  // Helper arrays
  const categoriesList = ['All', ...Array.from(new Set(requirements.map(r => r.category)))];

  // Requirements filtering logic
  const filteredRequirements = requirements.filter(req => {
    const matchesSearch =
      req.id.toLowerCase().includes(reqSearch.toLowerCase()) ||
      req.title.toLowerCase().includes(reqSearch.toLowerCase()) ||
      req.description.toLowerCase().includes(reqSearch.toLowerCase());

    const matchesCategory = reqCategoryFilter === 'All' || req.category === reqCategoryFilter;
    const matchesPriority = reqPriorityFilter === 'All' || req.priority === reqPriorityFilter;
    const matchesType = reqTypeFilter === 'All' || req.type === reqTypeFilter;

    return matchesSearch && matchesCategory && matchesPriority && matchesType;
  });

  // Simple statistics
  const totalActivosCount = worlds.length + stories.length + characters.length; // Dynamic tally: Worlds + Stories + Characters
  const approvedRequirementsCount = requirements.filter(r => r.status === 'Aprobado').length;
  const pendingRequestsCount = changeRequests.filter(r => r.status === 'Pendiente').length;
  const scrumProgress = Math.round(
    (scrumTasks.filter(t => t.status === 'Done').length / scrumTasks.length) * 100
  );

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-gold-antique selection:text-black">
      
      {/* Dynamic Toast System */}
      {toast && (
        <div 
          id="toast-notification"
          className={`fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-lg shadow-2xl border flex items-start gap-3 animate-fade-in transition-all duration-300 ${
            toast.type === 'success'
              ? 'bg-slate-900/95 border-emerald-500/40 text-emerald-300'
              : toast.type === 'error'
              ? 'bg-slate-900/95 border-rose-500/40 text-rose-300'
              : toast.type === 'gold'
              ? 'bg-slate-900/95 border-gold-antique/40 text-gold-bright'
              : 'bg-slate-900/95 border-blue-500/40 text-blue-300'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-400 flex-shrink-0" />}
          {toast.type === 'error' && <ShieldAlert className="w-5 h-5 mt-0.5 text-rose-400 flex-shrink-0" />}
          {toast.type === 'gold' && <Sparkles className="w-5 h-5 mt-0.5 text-gold-bright flex-shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 mt-0.5 text-blue-400 flex-shrink-0" />}
          
          <div className="flex-1">
            <h4 className="font-serif text-sm font-semibold tracking-wide uppercase">
              {toast.title}
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {toast.message}
            </p>
          </div>
          <button 
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-slate-100 focus:outline-none transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ACCESS PORTAL SCREEN (IF NOT AUTHENTICATED) */}
      {!isAuthenticated ? (
        <div 
          id="access-portal"
          className="min-h-screen relative flex items-center justify-center p-4 bg-[#05060b] overflow-hidden"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(11, 26, 62, 0.45) 0%, rgba(5, 6, 11, 1) 100%)`
          }}
        >
          {/* Ambient light flares */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="w-full max-w-md relative z-10 animate-fade-in">
            {/* Elegant Gothic Logo / Crest */}
            <div className="flex flex-col items-center text-center mb-8">
              <div 
                id="gothic-crest"
                className="w-20 h-20 rounded-full border border-gold-antique bg-slate-950 flex items-center justify-center shadow-lg shadow-gold-antique/10 mb-4 transition-transform hover:rotate-12 duration-500 cursor-pointer"
                title="Sexto Registro de Identidad"
              >
                <div className="w-16 h-16 rounded-full border border-gold-antique/30 flex items-center justify-center bg-slate-900">
                  <span className="font-serif text-2xl font-black text-gold-antique tracking-widest pl-1">IΩD</span>
                </div>
              </div>
              <h1 className="font-serif text-3xl font-extrabold tracking-wider text-gold-antique uppercase">
                Identity Simulation
              </h1>
              <span className="text-xs font-mono tracking-[0.2em] text-slate-400 uppercase mt-1">
                Grimorio de Especificaciones & Forja
              </span>
              <p className="text-sm text-slate-300 max-w-sm mt-3 font-sans font-light">
                Donde las historias cobran vida y el destino se forja en el grimorio digital.
              </p>
            </div>

            {/* Login / Register Card Container */}
            <div className="bg-slate-950/80 backdrop-blur-md rounded-xl border border-gold-antique/15 p-8 shadow-2xl relative">
              
              {/* Corner decorative anchors */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-gold-antique/30"></div>
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-gold-antique/30"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-gold-antique/30"></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gold-antique/30"></div>

              {/* Native Tab Headers */}
              <div className="flex border-b border-slate-800 mb-6">
                <button
                  type="button"
                  id="tab-opt-signin"
                  onClick={() => setLoginTab('login')}
                  className={`flex-1 pb-3 text-center text-xs font-mono tracking-widest uppercase transition-colors relative ${
                    loginTab === 'login' ? 'text-gold-bright' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Iniciar Sesión
                  {loginTab === 'login' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-antique"></div>
                  )}
                </button>
                <button
                  type="button"
                  id="tab-opt-signup"
                  onClick={() => setLoginTab('register')}
                  className={`flex-1 pb-3 text-center text-xs font-mono tracking-widest uppercase transition-colors relative ${
                    loginTab === 'register' ? 'text-gold-bright' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Crear Cuenta
                  {loginTab === 'register' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-antique"></div>
                  )}
                </button>
              </div>

              {/* Authentic Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                
                {loginTab === 'register' && (
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Nombre del Forjador *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="ej. Valentina de Astora"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="w-full bg-slate-900 border border-gold-antique/10 rounded px-3 py-2 pl-10 text-sm text-slate-200 focus:outline-none focus:border-gold-antique/50 focus:ring-1 focus:ring-gold-antique/30 transition-colors"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="cronista@grimoriomediático.com"
                      className="w-full bg-slate-900 border border-gold-antique/10 rounded px-3 py-2 pl-10 text-sm text-slate-200 focus:outline-none focus:border-gold-antique/50 focus:ring-1 focus:ring-gold-antique/30 transition-colors bg-opacity-70"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Clave de Entrada
                    </label>
                    {loginTab === 'login' && (
                      <a href="#reset" onClick={(e) => { e.preventDefault(); triggerToast('Recuperación Rúnica', 'Se ha enviado un conjuro de recuperación a su correo ficticio.', 'info'); }} className="text-xxs text-gold-antique hover:underline">
                        ¿Olvidó su clave?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Ingrese contraseña de paso"
                      className="w-full bg-slate-900 border border-gold-antique/10 rounded px-3 py-2 pl-10 pr-10 text-sm text-slate-200 focus:outline-none focus:border-gold-antique/50 focus:ring-1 focus:ring-gold-antique/30 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {loginTab === 'login' && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember-me"
                      className="rounded bg-slate-900 border-gold-antique/10 text-gold-antique focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      defaultChecked
                    />
                    <label htmlFor="remember-me" className="ml-2 text-xs text-slate-400 cursor-pointer select-none">
                      Reconocimiento de linaje automático (Recordarme)
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  id="btn-login-submit"
                  className="w-full bg-gold-antique hover:bg-gold-bright text-slate-950 font-serif font-black uppercase text-xs tracking-widest py-3 px-4 rounded transition-all duration-300 shadow-lg shadow-gold-antique/20 hover:shadow-gold-antique/30 flex items-center justify-center gap-2 mt-2 cursor-pointer border border-transparent active:scale-[0.98]"
                >
                  <span>{loginTab === 'login' ? 'Iniciar Sesión Mágica' : 'Fundar Cuenta'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Fast access bypass for assessors */}
              <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col space-y-2">
                <span className="text-xxs font-mono tracking-wider uppercase text-slate-500 text-center block">
                  Acceso Rápido al Grimorio
                </span>
                <button
                  onClick={() => {
                    localStorage.setItem('is_auth_sim', 'true');
                    setIsAuthenticated(true);
                    triggerToast('Acceso Automatizado', 'Ingresando al panel interactivo de Identity Simulation.', 'gold');
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-gold-bright border border-gold-antique/20 py-2 rounded text-xxs font-mono tracking-widest uppercase transition-colors"
                >
                  ⚡ Omitir y Acceder al Grimorio
                </button>
              </div>
            </div>

            {/* Footer with narrative theme note */}
            <div className="text-center mt-6">
              <span className="text-slate-500 text-xxs font-mono space-x-1 block uppercase">
                <span>Espacio Narrativo Ficticio</span>
                <span>•</span>
                <span>Unificación de Lore</span>
                <span>•</span>
                <span>Grimorio Creativo</span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        
        /* GRIMORIO DIGITAL / INTERACTIVE WORKSPACE SHELL */
        <div id="grimorio-workspace" className="min-h-screen flex flex-col md:flex-row bg-[#08090f]">
          
          {/* SIDEBAR: NAVIGATION */}
          <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gold-antique/10 bg-slate-950 flex flex-col justify-between flex-shrink-0 relative">
            
            {/* Header portion */}
            <div>
              {/* Crest brand in sidebar */}
              <div className="p-4 border-b border-gold-antique/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-gold-antique/40 bg-slate-900 flex items-center justify-center">
                  <span className="font-serif text-xs font-extrabold text-gold-antique">IΩD</span>
                </div>
                <div>
                  <h2 className="font-serif text-sm font-bold tracking-wide text-slate-100 uppercase leading-tight">
                    Identity Simulation
                  </h2>
                  <span className="text-[10px] font-mono tracking-widest text-gold-antique uppercase">
                    Grimorio Digital
                  </span>
                </div>
              </div>

              {/* "+ Action Button" listed high up as requested */}
              <div className="p-3">
                <button
                  onClick={() => {
                    clearCharacterCreationForm();
                    setActiveCharTab('create');
                    setActiveTab('forge');
                    triggerToast('Abriendo Forjador', 'Creando nueva alma en el simulador.', 'info');
                  }}
                  className="w-full bg-gold-antique/10 hover:bg-gold-antique hover:text-black border border-gold-antique/30 py-2.5 px-3 rounded text-xs font-serif font-black uppercase tracking-wider text-gold-bright flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nuevo Personaje</span>
                </button>
              </div>

              {/* System Navigation Items */}
              <nav className="px-2 py-3 space-y-4">
                
                {/* CATEGORY 1: UNIVERSE INTERACTIVE SIMULATION */}
                <div>
                  <span className="px-3 text-[9px] font-mono tracking-widest text-slate-500 uppercase block mb-1.5 font-bold">
                    Módulos Simulador (Activos)
                  </span>
                  
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className={`w-full text-left py-1.5 px-3 rounded text-xs font-mono tracking-wider uppercase transition-all flex items-center justify-between group cursor-pointer ${
                        activeTab === 'dashboard'
                          ? 'bg-gold-antique/10 text-gold-bright border-l-2 border-gold-antique font-semibold'
                          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Activity className={`w-3.5 h-3.5 ${activeTab === 'dashboard' ? 'text-gold-bright' : 'text-slate-500 group-hover:text-slate-300'}`} />
                        <span>Control de Mando</span>
                      </div>
                      <ChevronRight className="w-2.5 h-2.5 text-slate-600 opacity-60" />
                    </button>

                    <button
                      onClick={() => setActiveTab('forge')}
                      className={`w-full text-left py-1.5 px-3 rounded text-xs font-mono tracking-wider uppercase transition-all flex items-center justify-between group cursor-pointer ${
                        activeTab === 'forge'
                          ? 'bg-gold-antique/10 text-gold-bright border-l-2 border-gold-antique font-semibold'
                          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <UserCheck className={`w-3.5 h-3.5 ${activeTab === 'forge' ? 'text-gold-bright' : 'text-slate-500 group-hover:text-slate-300'}`} />
                        <span>Fichas de Personajes</span>
                      </div>
                      <span className="bg-slate-900 px-1.5 py-0.5 rounded text-[8px] text-gold-bright border border-slate-800">
                        {characters.length}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab('stories')}
                      className={`w-full text-left py-1.5 px-3 rounded text-xs font-mono tracking-wider uppercase transition-all flex items-center justify-between group cursor-pointer ${
                        activeTab === 'stories'
                          ? 'bg-gold-antique/10 text-gold-bright border-l-2 border-gold-antique font-semibold'
                          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <BookMarked className={`w-3.5 h-3.5 ${activeTab === 'stories' ? 'text-gold-bright' : 'text-slate-500 group-hover:text-slate-300'}`} />
                        <span>Crónicas de Historia</span>
                      </div>
                      <span className="bg-slate-900 px-1.5 py-0.5 rounded text-[8px] text-blue-400 border border-slate-800">
                        {stories.length}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab('worlds')}
                      className={`w-full text-left py-1.5 px-3 rounded text-xs font-mono tracking-wider uppercase transition-all flex items-center justify-between group cursor-pointer ${
                        activeTab === 'worlds'
                          ? 'bg-gold-antique/10 text-gold-bright border-l-2 border-gold-antique font-semibold'
                          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Globe className={`w-3.5 h-3.5 ${activeTab === 'worlds' ? 'text-gold-bright' : 'text-slate-500 group-hover:text-slate-300'}`} />
                        <span>Cosmogonía (Mundos)</span>
                      </div>
                      <span className="bg-slate-900 px-1.5 py-0.5 rounded text-[8px] text-emerald-400 border border-slate-800">
                        {worlds.length}
                      </span>
                    </button>
                  </div>
                </div>
              </nav>
            </div>

            {/* Profile Sidebar Footer */}
            <div className="p-4 border-t border-gold-antique/10 bg-slate-950">
              
              {/* Level indicator / RANK box */}
              <div className="mb-4 bg-slate-900/60 p-3 rounded-lg border border-gold-antique/10 text-left">
                <div className="flex items-center gap-2 mb-1.5Packed">
                  <div className="w-7 h-7 rounded bg-gold-antique/15 border border-gold-antique/30 flex items-center justify-center text-gold-bright">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-slate-200 font-bold leading-none">
                      Sacerdote de la Prosa
                    </h4>
                    <span className="text-[10px] text-slate-400">Nivel 14 • Cronista</span>
                  </div>
                </div>
                
                {/* Level progress bar */}
                <div className="w-full bg-slate-950 h-1.5 rounded-full mt-2 overflow-hidden border border-slate-800">
                  <div className="bg-gold-antique h-full rounded-full" style={{ width: '68%' }}></div>
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 mt-1 font-mono">
                  <span>6,800 XP</span>
                  <span>10,000 XP (Próximo Rango)</span>
                </div>
              </div>

              {/* Action utilities */}
              <div className="flex gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.clear();
                    triggerToast('Grimorio Reiniciado', 'Se restauraron los datos preestablecidos iniciales de la simulación.', 'info');
                    window.location.reload();
                  }}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-slate-300 py-1.5 px-2 rounded flex items-center justify-center gap-1.5 border border-slate-800"
                  title="Reiniciar Simulación a valores iniciales"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-rose-950/30 hover:bg-rose-950 text-rose-300 py-1.5 px-3 rounded flex items-center justify-center gap-1.5 border border-rose-900/30 transition-colors"
                  title="Cerrar sesión de forma segura"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </aside>

          {/* MAIN PAGE AREA */}
          <main className="flex-1 flex flex-col overflow-x-hidden min-h-0 bg-[#06070a]">
            
            {/* WORKSPACE HEADER */}
            <header className="p-4 bg-slate-950/80 border-b border-gold-antique/10 flex flex-col md:flex-row md:items-center justify-between gap-3 backdrop-blur pointer-events-auto">
              
              {/* Active navigation name with indicators */}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <h3 className="font-serif text-lg tracking-wide uppercase text-slate-100 font-bold">
                  {activeTab === 'dashboard' && 'Control de Mando'}
                  {activeTab === 'scrum' && 'Tablero de Tareas'}
                  {activeTab === 'forge' && 'Fichas de Personajes'}
                  {activeTab === 'stories' && 'Crónicas de Historia'}
                  {activeTab === 'worlds' && 'Cosmogonía (Mundos)'}
                </h3>
              </div>

              {/* Tech Indicator Bar */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                
                {/* Simulated Void sync success banner */}
                <span className="hidden sm:inline bg-blue-950/50 text-blue-300 border border-blue-900/40 px-2 py-0.5 rounded text-xxs">
                  🔗 Sincronización del Vacío Completada
                </span>

                {/* Clock component */}
                <div className="bg-slate-900 border border-gold-antique/10 px-2.5 py-1 rounded text-gold-antique text-xxs flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-gold-antique" />
                  <span>{timeStr || 'Cargando reloj...'}</span>
                </div>
              </div>

            </header>

            {/* TAB VIEW RENDERS */}
            <div className="flex-1 p-6 overflow-y-auto">
              
              {/* ==================== TAB 1: CONTROL DE MANDO / DASHBOARD ==================== */}
              {activeTab === 'dashboard' && (
                <div id="view-dashboard" className="space-y-6 animate-fade-in">
                  
                  {/* Glowing alert box mimicking mockup */}
                  <div className="bg-blue-950/20 rounded-lg p-4 border border-blue-900/30 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-900/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 text-blue-300">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-xs font-semibold uppercase text-blue-300 tracking-wider">
                        Sincronización del Vacío Completada
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Has recuperado 3 borradores perdidos de la Niebla de los Tiempos de manera automática. Tu grimorio digital está permanentemente respaldado sobre encriptación rúnica local.
                      </p>
                    </div>
                  </div>

                  {/* Bento Grid Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* Multiverso count card */}
                    <div className="bg-slate-950/60 p-4 rounded-lg border border-gold-antique/15 text-left relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gold-antique/5 rounded-bl-full pointer-events-none"></div>
                      <span className="text-[10px] font-mono tracking-widest text-slate-500 text-left block uppercase">
                        Mundos Creados
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-serif text-3xl font-bold text-gold-antique">12</span>
                        <span className="text-xxs text-emerald-400 font-mono tracking-wide">+2 esta semana</span>
                      </div>
                      <div className="w-full h-1 bg-slate-900 mt-3 rounded overflow-hidden">
                        <div className="bg-gold-antique h-full rounded" style={{ width: '45%' }}></div>
                      </div>
                    </div>

                    {/* Historias cronica card */}
                    <div className="bg-slate-950/60 p-4 rounded-lg border border-gold-antique/15 text-left relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full pointer-events-none"></div>
                      <span className="text-[10px] font-mono tracking-widest text-slate-500 text-left block uppercase">
                        Historias Escritas
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-serif text-3xl font-bold text-slate-100">48</span>
                        <span className="text-xxs text-blue-400 font-mono tracking-wide">6 Capítulos</span>
                      </div>
                      <div className="w-full h-1 bg-slate-900 mt-3 rounded overflow-hidden">
                        <div className="bg-blue-400 h-full rounded" style={{ width: '70%' }}></div>
                      </div>
                    </div>

                    {/* Ficha Personajes card (Dynamically computed!) */}
                    <div className="bg-slate-950/60 p-4 rounded-lg border border-gold-antique/15 text-left relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-[#e5c158]/5 rounded-bl-full pointer-events-none"></div>
                      <span className="text-[10px] font-mono tracking-widest text-slate-500 text-left block uppercase">
                        Personajes Forjados
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-serif text-3xl font-bold text-gold-antique">
                          {characters.length}
                        </span>
                        <span className="text-xxs text-[#9D7BFF] font-mono">En Memoria</span>
                      </div>
                      <div className="w-full h-1 bg-slate-900 mt-3 rounded overflow-hidden">
                        <div className="bg-[#9D7BFF] h-full rounded" style={{ width: '85%' }}></div>
                      </div>
                    </div>

                    {/* Total assets card (Dynamic computed!) */}
                    <div className="bg-slate-950/60 p-4 rounded-lg border border-gold-antique/15 text-left relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-[#9D7BFF]/5 rounded-bl-full pointer-events-none"></div>
                      <span className="text-[10px] font-mono tracking-widest text-slate-500 text-left block uppercase">
                        Total de Activos
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-serif text-3xl font-bold text-white">
                          {totalActivosCount}
                        </span>
                        <span className="text-xxs text-slate-400 font-mono uppercase">Global</span>
                      </div>
                      <div className="w-full h-1 bg-slate-900 mt-3 rounded overflow-hidden">
                        <div className="bg-emerald-400 h-full rounded" style={{ width: '60%' }}></div>
                      </div>
                    </div>

                  </div>

                  {/* Main Split panel */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* LEFT PANEL: RECENTS TABLE */}
                    <div className="lg:col-span-8 bg-slate-950/50 rounded-lg border border-gold-antique/10 p-5">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h4 className="font-serif text-sm font-semibold text-slate-100 uppercase tracking-wider">
                            Lista de Activos Recientes
                          </h4>
                          <span className="text-xxs font-mono text-slate-500">Últimas crónicas y fichas elaboradas en el sistema</span>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab('forge');
                            triggerToast('Abriendo el Forjador', 'Procediendo a la pantalla de forja de personajes.', 'info');
                          }}
                          className="bg-gold-antique/10 hover:bg-gold-antique/20 text-gold-bright border border-gold-antique/25 px-2.5 py-1 rounded text-xxs font-mono uppercase tracking-wider transition-colors"
                        >
                          + Forjar Ficha
                        </button>
                      </div>

                      {/* Responsive Table UI */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-xxs tracking-wider">
                              <th className="py-2.5 px-3">Nombre del Activo</th>
                              <th className="py-2.5 px-3">Clasificación / Tipo</th>
                              <th className="py-2.5 px-3">Plano de Mundo</th>
                              <th className="py-2.5 px-3">Último Cambio</th>
                              <th className="py-2.5 px-3 text-right">Estatus</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-900">
                            {/* Preloaded & Newly added personajes */}
                            {characters.map((char) => (
                              <tr key={char.id} className="hover:bg-slate-900/30 transition-colors">
                                <td className="py-3 px-3 font-semibold text-slate-200">
                                  {char.name}
                                </td>
                                <td className="py-3 px-3">
                                  <span className="bg-purple-950/50 text-purple-300 border border-purple-900/40 px-1.5 py-0.5 rounded text-xxs">
                                    {char.race} • {char.class}
                                  </span>
                                </td>
                                <td className="py-3 px-3 font-mono text-slate-400">
                                  Ethendor
                                </td>
                                <td className="py-3 px-3 text-slate-500 font-mono text-xxs">
                                  {char.createdAt}
                                </td>
                                <td className="py-3 px-3 text-right">
                                  <span className="bg-slate-900 text-slate-400 border border-slate-800 px-1.5 py-0.5 rounded text-xxs uppercase font-mono">
                                    {char.status}
                                  </span>
                                </td>
                              </tr>
                            ))}

                            {/* Additional realistic stories from mockup */}
                            <tr className="hover:bg-slate-900/30 transition-colors">
                              <td className="py-3 px-3 font-semibold text-slate-200">El Ocaso de los Reinos</td>
                              <td className="py-3 px-3">
                                <span className="bg-emerald-950/50 text-emerald-300 border border-emerald-900/40 px-1.5 py-0.5 rounded text-xxs">
                                  Historia / Manuscrito
                                </span>
                              </td>
                              <td className="py-3 px-3 font-mono text-slate-400">Ethendor</td>
                              <td className="py-3 px-3 text-slate-500 font-mono text-xxs">Hace 5 horas</td>
                              <td className="py-3 px-3 text-right">
                                <span className="bg-emerald-950/40 text-emerald-400 border border-emerald-900/40 px-1.5 py-0.5 rounded text-xxs uppercase font-mono">
                                  Cronograma
                                </span>
                              </td>
                            </tr>

                            <tr className="hover:bg-slate-900/30 transition-colors">
                              <td className="py-3 px-3 font-semibold text-slate-200">Tierras Flotantes</td>
                              <td className="py-3 px-3">
                                <span className="bg-indigo-950/50 text-indigo-300 border border-indigo-900/40 px-1.5 py-0.5 rounded text-xxs">
                                  Geografía de Mundo
                                </span>
                              </td>
                              <td className="py-3 px-3 font-mono text-slate-400">N/A</td>
                              <td className="py-3 px-3 text-slate-500 font-mono text-xxs">Ayer</td>
                              <td className="py-3 px-3 text-right">
                                <span className="bg-slate-900 text-slate-400 border border-slate-800 px-1.5 py-0.5 rounded text-xxs uppercase font-mono">
                                  Leyenda
                                </span>
                              </td>
                            </tr>

                            <tr className="hover:bg-slate-900/30 transition-colors">
                              <td className="py-3 px-3 font-semibold text-slate-200">Ruinas de Osgiliath</td>
                              <td className="py-3 px-3">
                                <span className="bg-slate-900 text-slate-400 border border-slate-800 px-1.5 py-0.5 rounded text-xxs">
                                  Ubicación Espacial
                                </span>
                              </td>
                              <td className="py-3 px-3 font-mono text-slate-400">Arda-Media</td>
                              <td className="py-3 px-3 text-slate-500 font-mono text-xxs">Hace 3 días</td>
                              <td className="py-3 px-3 text-right">
                                <span className="bg-slate-900 text-slate-400 border border-slate-800 px-1.5 py-0.5 rounded text-xxs uppercase font-mono">
                                  Borrador
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* RIGHT PANEL: INSPIRATION & ACTIVITY LOGS */}
                    <div className="lg:col-span-4 space-y-6">
                      
                      {/* Sub-panel 1: Inspiration Prompt Generator */}
                      <div className="bg-slate-950/50 rounded-lg border border-gold-antique/10 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-4 h-4 text-gold-bright" />
                          <h4 className="font-serif text-xs font-semibold text-slate-100 uppercase tracking-wider">
                            Inspiración del Vacío
                          </h4>
                        </div>
                        <p className="text-xs text-slate-300 italic mb-4 leading-relaxed">
                          &ldquo;Un hechicero ciego que lee runas talladas en las escamas de un dragón moribundo, descubriendo que la profecía habla de sí mismo.&rdquo;
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="bg-slate-900/80 hover:bg-slate-800 border border-slate-800 px-2 py-0.5 rounded text-xxs text-slate-400 cursor-pointer transition-colors">
                            #PNJ
                          </span>
                          <span className="bg-slate-900/80 hover:bg-slate-800 border border-slate-800 px-2 py-0.5 rounded text-xxs text-slate-400 cursor-pointer transition-colors">
                            #Relicario
                          </span>
                          <span className="bg-slate-900/80 hover:bg-slate-800 border border-slate-800 px-2 py-0.5 rounded text-xxs text-slate-400 cursor-pointer transition-colors">
                            #Misión
                          </span>
                          <span className="bg-slate-900/80 hover:bg-slate-800 border border-slate-800 px-2 py-0.5 rounded text-xxs text-slate-400 cursor-pointer transition-colors">
                            #Runa
                          </span>
                        </div>
                      </div>

                      {/* Sub-panel 2: Cronograma del Destino */}
                      <div className="bg-slate-950/50 rounded-lg border border-gold-antique/10 p-4 text-left">
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-4 h-4 text-gold-bright" />
                          <h4 className="font-serif text-xs font-semibold text-slate-100 uppercase tracking-wider">
                            Cronograma del Destino
                          </h4>
                        </div>
                        <div className="space-y-2.5">
                          <div className="flex items-start justify-between gap-2 text-xs">
                            <div>
                              <p className="text-slate-200 font-medium font-serif">Finalizar Capítulo IV</p>
                              <span className="text-xxs text-slate-500 font-mono">Maquetación & Lore</span>
                            </div>
                            <span className="text-right text-xxs text-gold-antique font-mono bg-gold-antique/5 border border-gold-antique/10 px-1.5 py-0.5 rounded">
                              Hoy • 23:59
                            </span>
                          </div>
                          
                          <div className="flex items-start justify-between gap-2 text-xs">
                            <div>
                              <p className="text-slate-200 font-medium font-serif">Revisión de Geografía</p>
                              <span className="text-xxs text-slate-500 font-mono">Zonas Flotantes de Ethendor</span>
                            </div>
                            <span className="text-right text-xxs text-slate-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded">
                              Mañana • 10:00
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Sub-panel 3: Live System logs */}
                      <div className="bg-slate-950/60 rounded-lg border border-gold-antique/10 p-4 text-left">
                        <div className="flex items-center justify-between mb-3 border-b border-slate-900 pb-2">
                          <div className="flex items-center gap-1.5Packed">
                            <Terminal className="w-4 h-4 text-gold-bright" />
                            <h4 className="font-serif text-xs font-semibold text-slate-100 uppercase tracking-wider">
                              Rastro de Actividades (Auditoría)
                            </h4>
                          </div>
                          <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest animate-pulse">
                            ● Activo
                          </span>
                        </div>
                        
                        <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                          {logs.map((log) => (
                            <div key={log.id} className="text-xxs border-b border-slate-900/60 pb-2 last:border-0">
                              <div className="flex items-center justify-between text-slate-500 font-mono">
                                <span className="bg-slate-900 text-gold-antique px-1 py-0.5 rounded border border-slate-800 text-[9px] scale-[0.95] origin-left">
                                  {log.type}
                                </span>
                                <span>{log.time}</span>
                              </div>
                              <p className="text-slate-300 mt-1 font-light leading-relaxed">
                                {log.description}
                              </p>
                              <p className="text-[10px] text-slate-500 mt-0.5 font-mono">
                                Forjador: <span className="text-slate-400">{log.user}</span> • details: {log.ipOrDetail}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* ==================== TAB 2: MATRIZ DE REQUISITOS (DISABLED) ==================== */}
              {false && (
                <div id="view-requirements" className="space-y-6 animate-fade-in">
                  
                  {/* Explanatory introduction to the IEEE 830 ERS concept */}
                  <div className="bg-slate-950/50 rounded-lg border border-gold-antique/15 p-6 relative overflow-hidden">
                    <div className="absolute top-2 right-2 text-[10px] font-mono text-gold-antique/40 uppercase tracking-widest border border-gold-antique/10 p-1 rounded">
                      Standard IEEE 835-1998
                    </div>
                    <h4 className="font-serif text-base text-gold-antique uppercase tracking-wider mb-2">
                      Especificación de Requisitos de Software [ERS]
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Este portal visualiza la especificación formal del sistema de simulación narrativa <strong>&ldquo;Identity Simulation&rdquo;</strong>. Facilita la trazabilidad entre el modelo de negocio narrativo y el flujo ágil de desarrollo. Todo cambio sustancial sobre los requerimientos debe validarse mediante el Comité de Control de Cambios en la pestaña homónima.
                    </p>

                    {/* Standard sections quick highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-800 text-xs">
                      <div className="bg-slate-900/40 p-3 rounded border border-slate-800">
                        <span className="font-mono text-gold-bright text-xxs uppercase tracking-wider block mb-1">1. Introducción y Alcance</span>
                        <p className="text-[11px] text-slate-400">Determina el objetivo del grimorio digital: permitir que escritores creen un multiverso sincronizado de personajes e historias conectadas.</p>
                      </div>
                      <div className="bg-slate-900/40 p-3 rounded border border-slate-800">
                        <span className="font-mono text-gold-bright text-xxs uppercase tracking-wider block mb-1">2. Descripción General</span>
                        <p className="text-[11px] text-slate-400">Persistencia híbrida local, motor de rol, herradura de atributos equilibrada, control exhaustivo de confidencialidad de la prosa.</p>
                      </div>
                      <div className="bg-slate-900/40 p-3 rounded border border-slate-800">
                        <span className="font-mono text-gold-bright text-xxs uppercase tracking-wider block mb-1">3. Requisitos Específicos</span>
                        <p className="text-[11px] text-slate-400">Clasificación IEEE para requerimientos funcionales (RF) de comportamiento de software y no funcionales (RNF) de tecnología.</p>
                      </div>
                    </div>
                  </div>

                  {/* Requirements Matrix Filter Bar */}
                  <div className="bg-slate-950/40 p-4 rounded-lg border border-gold-antique/10 text-left">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      {/* Search box */}
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-500" />
                        <input
                          type="text"
                          value={reqSearch}
                          onChange={(e) => setReqSearch(e.target.value)}
                          placeholder="Buscar por ID, título o descripción..."
                          className="w-full bg-slate-900 border border-gold-antique/10 rounded px-3 py-2 pl-10 text-sm text-slate-200 focus:outline-none focus:border-gold-antique/50 transition-colors"
                        />
                      </div>

                      {/* Dropdown Filters */}
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                        
                        {/* Filter by Category */}
                        <div className="flex items-center gap-1.5">
                          <Filter className="w-3.5 h-3.5 text-gold-bright" />
                          <span className="text-slate-400">Categoría:</span>
                          <select
                            value={reqCategoryFilter}
                            onChange={(e) => setReqCategoryFilter(e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-slate-300 focus:outline-none focus:border-gold-antique/30 cursor-pointer"
                          >
                            {categoriesList.map(cat => (
                              <option key={cat} value={cat}>{cat === 'All' ? 'Todas' : cat}</option>
                            ))}
                          </select>
                        </div>

                        {/* Filter by Priority */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400">Prioridad:</span>
                          <select
                            value={reqPriorityFilter}
                            onChange={(e) => setReqPriorityFilter(e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-slate-300 focus:outline-none focus:border-gold-antique/30 cursor-pointer"
                          >
                            <option value="All">Todas</option>
                            <option value="Alta">Alta</option>
                            <option value="Media">Media</option>
                            <option value="Baja">Baja</option>
                          </select>
                        </div>

                        {/* Filter by Type */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400">Tipo:</span>
                          <select
                            value={reqTypeFilter}
                            onChange={(e) => setReqTypeFilter(e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-slate-300 focus:outline-none focus:border-gold-antique/30 cursor-pointer"
                          >
                            <option value="All">Todos</option>
                            <option value="Funcional">Funcionales (RF)</option>
                            <option value="No Funcional">No Funcionales (RNF)</option>
                          </select>
                        </div>

                      </div>

                    </div>
                  </div>

                  {/* Requirements List Cards / Large Table */}
                  <div className="bg-slate-950/60 rounded-lg border border-gold-antique/10 p-5">
                    
                    <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono text-slate-400">
                        Mostrando <strong className="text-gold-antique">{filteredRequirements.length}</strong> de {requirements.length} requisitos declarados
                      </span>

                      {/* Quick reset button */}
                      {(reqSearch || reqCategoryFilter !== 'All' || reqPriorityFilter !== 'All' || reqTypeFilter !== 'All') && (
                        <button
                          onClick={() => {
                            setReqSearch('');
                            setReqCategoryFilter('All');
                            setReqPriorityFilter('All');
                            setReqTypeFilter('All');
                            triggerToast('Filtros Limpios', 'Todas las restricciones de la matriz han sido removidas.', 'info');
                          }}
                          className="text-xxs font-mono text-gold-antique hover:underline flex items-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Limpiar Filtros</span>
                        </button>
                      )}
                    </div>

                    {filteredRequirements.length === 0 ? (
                      <div className="text-center py-10">
                        <AlertCircle className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                        <h4 className="font-serif text-sm font-semibold uppercase text-slate-400">Sin Coincidencias</h4>
                        <p className="text-xs text-slate-500 mt-1">Ningún requisito cumple con los filtros rúnicos aplicados.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredRequirements.map((req) => (
                          <div 
                            key={req.id} 
                            className="bg-slate-900/40 p-4 rounded-lg border border-gold-antique/10 hover:border-gold-antique/35 transition-all flex flex-col justify-between relative group"
                          >
                            {/* Decorative gold bracket */}
                            <div className="absolute top-2 right-2 font-mono text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400">
                              {req.id}
                            </div>

                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded text-black ${
                                  req.type === 'Funcional' ? 'bg-[#9D7BFF]' : 'bg-slate-200'
                                }`}>
                                  {req.type === 'Funcional' ? 'RF' : 'RNF'}
                                </span>
                                <span className="text-xxs text-slate-500 font-mono">
                                  {req.category}
                                </span>
                              </div>

                              <h5 className="font-serif text-sm font-semibold text-gold-bright tracking-wide mb-2 mt-1.5">
                                {req.title}
                              </h5>

                              <p className="text-xs text-slate-300 leading-normal font-light">
                                {req.description}
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-950/80 flex items-center justify-between text-xxs font-mono text-slate-500">
                              <span className="flex items-center gap-1">
                                Prioridad: 
                                <strong className={`font-semibold ${
                                  req.priority === 'Alta' ? 'text-rose-400' : req.priority === 'Media' ? 'text-amber-400' : 'text-slate-400'
                                }`}>
                                  {req.priority}
                                </strong>
                              </span>

                              <span className="flex items-center gap-1.5Packed">
                                Estado: 
                                <strong className={`font-semibold uppercase ${
                                  req.status === 'Aprobado' ? 'text-emerald-400' : 'text-amber-400'
                                }`}>
                                  {req.status}
                                </strong>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>

                </div>
              )}

              {/* ==================== TAB 3: TABLERO SCRUM KANBAN (AGILE PLANNER) ==================== */}
              {false && (
                <div id="view-scrum" className="space-y-6 animate-fade-in text-left">
                  
                  {/* Kanban Header Section */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/40 p-4 rounded-lg border border-gold-antique/10">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-slate-100 uppercase tracking-wider">
                        Tablero de Runas Ágiles
                      </h4>
                      <p className="text-xs text-slate-400">
                        Organiza el desarrollo de las historias de usuario de <strong>&ldquo;Identity Simulation&rdquo;</strong> mediante metodología ágil (Scrum).
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Overall Scrum Progress Bar */}
                      <div className="text-right">
                        <span className="text-xxs font-mono block text-slate-400 uppercase">Progreso del Sprint</span>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-24 bg-slate-900 border border-slate-800 h-2 rounded overflow-hidden">
                            <div className="bg-emerald-400 h-full rounded" style={{ width: `${scrumProgress}%` }}></div>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-emerald-400">{scrumProgress}%</span>
                        </div>
                      </div>

                      {/* Modal Open button */}
                      <button
                        onClick={() => setShowTaskModal(true)}
                        className="bg-gold-antique hover:bg-gold-bright text-slate-950 py-2 px-3 rounded text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Tallar Runa Task</span>
                      </button>
                    </div>
                  </div>

                  {/* MODAL FOR NEW TASK CREATION */}
                  {showTaskModal && (
                    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-[#0b0c13] rounded-lg border border-gold-antique/20 max-w-md w-full p-6 relative shadow-2xl">
                        
                        <div className="absolute top-2.5 right-2.5">
                          <button 
                            onClick={() => setShowTaskModal(false)}
                            className="text-slate-500 hover:text-slate-200"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <Sliders className="w-4.5 h-4.5 text-gold-bright" />
                          <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-antique">
                            Tallar Historia en el Backlog
                          </h4>
                        </div>

                        <form onSubmit={handleCreateScrumTask} className="space-y-4">
                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                              Título de la Historia *
                            </label>
                            <input
                              type="text"
                              required
                              value={newTaskTitle}
                              onChange={(e) => setNewTaskTitle(e.target.value)}
                              placeholder="ej. Como creador, quiero filtrar criaturas por nivel de peligro..."
                              className="w-full bg-slate-900 border border-gold-antique/10 rounded px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-gold-antique/50"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                              Descripción Detallada
                            </label>
                            <textarea
                              rows={3}
                              value={newTaskDesc}
                              onChange={(e) => setNewTaskDesc(e.target.value)}
                              placeholder="Define los criterios de aceptación y requisitos técnicos correspondientes..."
                              className="w-full bg-slate-900 border border-gold-antique/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-gold-antique/50 resize-none"
                            ></textarea>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                                Prioridad de Runa
                              </label>
                              <select
                                value={newTaskPriority}
                                onChange={(e) => setNewTaskPriority(e.target.value as 'Alta' | 'Media' | 'Baja')}
                                className="w-full bg-slate-900 border border-gold-antique/10 rounded px-2 py-2 text-xs text-slate-300 focus:outline-none"
                              >
                                <option value="Alta">Alta</option>
                                <option value="Media">Media</option>
                                <option value="Baja">Baja</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                                Asignar Forjador
                              </label>
                              <select
                                value={newTaskAssignee}
                                onChange={(e) => setNewTaskAssignee(e.target.value)}
                                className="w-full bg-slate-900 border border-gold-antique/10 rounded px-2 py-2 text-xs text-slate-300 focus:outline-none"
                              >
                                <option value="Valentina Cordero">Valentina Cordero</option>
                                <option value="Silvana Reyes">Silvana Reyes</option>
                                <option value="Dario Vargas">Dario Vargas</option>
                                <option value="José Moena">José Moena</option>
                                <option value="Cronista Invitado">Cronista Invitado</option>
                              </select>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-gold-antique hover:bg-gold-bright text-slate-950 font-serif font-black uppercase text-xs tracking-wider py-2.5 px-4 rounded transition-colors shadow-md mt-2 cursor-pointer"
                          >
                            Sincronizar Historia de Scrum
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Real columns view */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
                    
                    {/* Columns List */}
                    {(['To Do', 'In Progress', 'Review', 'Done'] as const).map((colStatus) => {
                      const tasksInCol = scrumTasks.filter(t => t.status === colStatus);
                      
                      return (
                        <div 
                          key={colStatus} 
                          className="bg-slate-950/80 rounded-lg border border-gold-antique/10 p-3 min-h-[450px] flex flex-col"
                        >
                          {/* Column Header */}
                          <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-900">
                            <h5 className="font-serif text-xs font-semibold text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${
                                colStatus === 'To Do' ? 'bg-slate-400' :
                                colStatus === 'In Progress' ? 'bg-sky-400' :
                                colStatus === 'Review' ? 'bg-amber-400' : 'bg-emerald-400'
                              }`}></span>
                              {colStatus === 'To Do' && 'Pendientes (To Do)'}
                              {colStatus === 'In Progress' && 'En Marcha (In)'}
                              {colStatus === 'Review' && 'Revisión (Review)'}
                              {colStatus === 'Done' && 'Completado (Done)'}
                            </h5>
                            
                            <span className="bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold">
                              {tasksInCol.length}
                            </span>
                          </div>

                          {/* Cards rendering */}
                          <div className="space-y-3 flex-1 overflow-y-auto">
                            {tasksInCol.length === 0 ? (
                              <div className="border border-dashed border-slate-900 py-10 rounded text-center text-[10px] text-slate-600 font-mono italic">
                                Vacío del Vacío
                              </div>
                            ) : (
                              tasksInCol.map((task) => (
                                <div 
                                  key={task.id} 
                                  className="bg-slate-900/40 p-3 rounded border border-gold-antique/5 hover:border-gold-antique/25 transition-all text-xs flex flex-col justify-between space-y-2 relative"
                                >
                                  {/* Task corner tag */}
                                  <div className="flex items-center justify-between gap-1 mb-1">
                                    <span className="text-[9px] font-mono text-gold-antique bg-gold-antique/5 border border-gold-antique/10 px-1.5 py-0.2 rounded">
                                      {task.id}
                                    </span>

                                    <span className={`text-[8px] font-mono font-bold px-1 py-0.2 rounded ${
                                      task.priority === 'Alta' ? 'bg-rose-950 text-rose-300 border border-rose-900' :
                                      task.priority === 'Media' ? 'bg-amber-950 text-amber-300 border border-amber-900' :
                                      'bg-slate-900 text-slate-400 border border-slate-800'
                                    }`}>
                                      {task.priority}
                                    </span>
                                  </div>

                                  <p className="font-light text-slate-200 font-sans leading-relaxed">
                                    {task.title}
                                  </p>

                                  {/* Assignee display */}
                                  <div className="pt-2 border-t border-slate-950 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                                    <span className="flex items-center gap-1 text-slate-400">
                                      <User className="w-3 h-3 text-slate-500" />
                                      {task.assignee}
                                    </span>
                                  </div>

                                  {/* Fast Move Trigger buttons for high accessibility instead of native complex d&d in iframe */}
                                  <div className="mt-1 pt-2 border-t border-slate-950/60 flex items-center justify-between">
                                    <span className="text-[8px] text-slate-500 uppercase tracking-widest font-mono">Mover:</span>
                                    <div className="flex gap-1">
                                      {colStatus !== 'To Do' && (
                                        <button
                                          onClick={() => {
                                            const statuses: ('To Do' | 'In Progress' | 'Review' | 'Done')[] = ['To Do', 'In Progress', 'Review', 'Done'];
                                            const idx = statuses.indexOf(colStatus);
                                            handleMoveKanbanTask(task.id, statuses[idx - 1]);
                                          }}
                                          className="bg-slate-950 hover:bg-slate-800 border border-slate-800 px-1 py-0.5 rounded text-[10px] text-slate-400 hover:text-slate-100"
                                          title="Retroceder Columna"
                                        >
                                          ◀
                                        </button>
                                      )}
                                      
                                      {colStatus !== 'Done' && (
                                        <button
                                          onClick={() => {
                                            const statuses: ('To Do' | 'In Progress' | 'Review' | 'Done')[] = ['To Do', 'In Progress', 'Review', 'Done'];
                                            const idx = statuses.indexOf(colStatus);
                                            handleMoveKanbanTask(task.id, statuses[idx + 1]);
                                          }}
                                          className="bg-slate-950 hover:bg-slate-800 border border-slate-800 px-1 py-0.5 rounded text-[10px] text-slate-400 hover:text-slate-100"
                                          title="Avanzar Columna"
                                        >
                                          ▶
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      );
                    })}

                  </div>

                </div>
              )}

              {/* ==================== TAB 4: PMI CHANGE CONTROL SIMULATOR (DISABLED) ==================== */}
              {false && (
                <div id="view-pmi" className="space-y-6 animate-fade-in text-left">
                  
                  {/* PMI Compliance Header */}
                  <div className="bg-slate-950/50 rounded-lg p-6 border border-gold-antique/15 text-left">
                    <h4 className="font-serif text-base text-gold-antique uppercase tracking-wider mb-2">
                      Comité de Control de Cambios [PMI CCB]
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4 font-light">
                      En cumplimiento con los estándares del <strong>Project Management Institute (PMI)</strong>, toda propuesta evolutiva que impacte la línea base de los Requisitos (ERS) debe ingresarse formalmente mediante una <strong>Solicitud de Cambio (Request for Change - RFC)</strong>. El Comité evaluará la justificación técnica, nivel de impacto estructural y recursos temporales para emitir un veredicto de Aprobación o Rechazo.
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-400">
                      <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">PMBOK Guide v7 compliant</span>
                      <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">Línea Base Protegida</span>
                      <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">ISO 9001:2015 Asegurado</span>
                    </div>
                  </div>

                  {/* RFC Entry and Simulator Lists Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* LEFT PANEL: SUBMIT NEW RFC */}
                    <div className="lg:col-span-5 bg-slate-950/60 p-5 rounded-lg border border-gold-antique/10">
                      <div className="flex items-center gap-2 mb-4">
                        <PlusCircle className="w-4.5 h-4.5 text-gold-bright" />
                        <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-slate-100">
                          Ingresar Solicitud (RFC)
                        </h4>
                      </div>

                      <form onSubmit={handleCreateChangeRequest} className="space-y-4 text-xs font-sans">
                        <div>
                          <label className="block text-xxs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                            Título del Cambio Extendido *
                          </label>
                          <input
                            type="text"
                            required
                            value={rfcTitle}
                            onChange={(e) => setRfcTitle(e.target.value)}
                            placeholder="ej. Integrar exportación directa a Google Drive"
                            className="w-full bg-slate-900 border border-gold-antique/10 rounded px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-gold-antique/50"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xxs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                              Clasificación
                            </label>
                            <select
                              value={rfcType}
                              onChange={(e) => setRfcType(e.target.value as 'Funcional' | 'No Funcional')}
                              className="w-full bg-slate-900 border border-gold-antique/10 rounded px-2.5 py-1.5 text-slate-300 focus:outline-none"
                            >
                              <option value="Funcional">Funcional (RF)</option>
                              <option value="No Funcional">No Funcional (RNF)</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-xxs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                              Nivel de Impacto Estimado
                            </label>
                            <select
                              value={rfcImpact}
                              onChange={(e) => setRfcImpact(e.target.value as 'Alto' | 'Medio' | 'Bajo')}
                              className="w-full bg-slate-900 border border-gold-antique/10 rounded px-2.5 py-1.5 text-slate-300 focus:outline-none px-1"
                            >
                              <option value="Alto">Alto Impacto</option>
                              <option value="Medio">Medio Impacto</option>
                              <option value="Bajo">Bajo Impacto</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xxs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                            Justificación de Negocio / Técnica *
                          </label>
                          <textarea
                            rows={4}
                            required
                            value={rfcJustification}
                            onChange={(e) => setRfcJustification(e.target.value)}
                            placeholder="ej. Permitir que los escritores almacenen de forma segura e inmediata sus manuscritos literarios directamente en la nube ante cortes de energía..."
                            className="w-full bg-slate-900 border border-gold-antique/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-gold-antique/50 resize-none font-sans"
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-gold-antique hover:bg-gold-bright text-slate-950 font-serif font-black uppercase text-xs tracking-widest py-2.5 px-4 rounded transition-colors shadow-md shadow-gold-antique/5 cursor-pointer border border-transparent"
                        >
                          Emitir Petición al CCB
                        </button>
                      </form>
                    </div>

                    {/* RIGHT PANEL: CCB SIMULATOR APPROVAL PANEL */}
                    <div className="lg:col-span-7 bg-slate-950/60 p-5 rounded-lg border border-gold-antique/10">
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-900">
                        <div className="flex items-center gap-2">
                          <Sliders className="w-4.5 h-4.5 text-gold-bright" />
                          <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-slate-100">
                            Administración del CCB (Moderación)
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {changeRequests.length} Solicitudes Totales
                        </span>
                      </div>

                      <div className="space-y-4">
                        {changeRequests.map((rfc) => (
                          <div 
                            key={rfc.id}
                            className={`p-4 rounded-lg border relative transition-all ${
                              rfc.status === 'Aprobado' ? 'bg-emerald-950/15 border-emerald-500/20' :
                              rfc.status === 'Rechazado' ? 'bg-rose-950/15 border-rose-500/20' :
                              'bg-slate-900/40 border-gold-antique/10 hover:border-gold-antique/30'
                            }`}
                          >
                            <span className="absolute top-2 right-2 font-mono text-[9px] text-slate-500">
                              Id: {rfc.id} • {rfc.createdAt}
                            </span>

                            <div className="flex items-center gap-2 mb-2">
                              <span className={`text-[8px] font-mono uppercase tracking-widest px-1.5 rounded ${
                                rfc.type === 'Funcional' ? 'bg-[#9D7BFF] text-black' : 'bg-slate-200 text-black'
                              }`}>
                                {rfc.type}
                              </span>
                              <span className={`text-[9px] font-mono ${
                                rfc.impact === 'Alto' ? 'text-rose-400' : rfc.impact === 'Medio' ? 'text-amber-400' : 'text-slate-400'
                              }`}>
                                Impacto: {rfc.impact}
                              </span>
                            </div>

                            <h5 className="font-serif text-sm font-bold text-slate-200 tracking-wide">
                              {rfc.title}
                            </h5>

                            <p className="text-xs text-slate-400 mt-1 font-light italic">
                              &ldquo;{rfc.justification}&rdquo;
                            </p>

                            {/* CCB Dynamic Deciders */}
                            <div className="mt-4 pt-3 border-t border-slate-950/60 flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xxs font-mono text-slate-500">Estatus CCB:</span>
                                <span className={`text-xxs font-mono font-bold uppercase ${
                                  rfc.status === 'Aprobado' ? 'text-emerald-400' :
                                  rfc.status === 'Rechazado' ? 'text-rose-400' : 'text-amber-400'
                                }`}>
                                  {rfc.status}
                                </span>
                              </div>

                              {rfc.status === 'Pendiente' ? (
                                <div className="flex gap-2 text-xxs font-mono">
                                  <button
                                    onClick={() => handleModerateChangeRequest(rfc.id, 'Rechazado')}
                                    className="bg-rose-950/50 hover:bg-rose-950 text-rose-300 border border-rose-900 px-2.5 py-1 rounded transition-colors"
                                  >
                                    Rechazar Cambio
                                  </button>
                                  
                                  <button
                                    onClick={() => handleModerateChangeRequest(rfc.id, 'Aprobado')}
                                    className="bg-emerald-950/60 hover:bg-emerald-950 text-emerald-300 border border-emerald-900 px-2.5 py-1 rounded transition-colors"
                                  >
                                    Aprobar Cambio ✔
                                  </button>
                                </div>
                              ) : (
                                <div className="text-[10px] text-slate-500 font-mono italic">
                                  Línea base actualizada el {rfc.createdAt}
                                </div>
                              )}
                            </div>

                          </div>
                        ))}
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* ==================== TAB 5: FICHA DE PERSONAJES (FORJAR LEYENDA) ==================== */}
              {activeTab === 'forge' && (
                <div id="view-forge" className="space-y-6 animate-fade-in text-left">
                  
                  {/* Title Bar layout corresponding to the mockup */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gold-antique/10 gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-gold-antique uppercase tracking-widest block mb-0.5">
                        Simulador de Almas • Identity Simulation
                      </span>
                      <h4 className="font-serif text-xl font-extrabold text-slate-100 uppercase tracking-widest">
                        {editingCharacterId ? 'Alterar Ficha Técnica' : 'Forja de Personajes'}
                      </h4>
                    </div>

                    {/* Sub tabs switches inside tab */}
                    <div className="flex gap-1.5 bg-slate-900/60 p-1 rounded border border-slate-800">
                      <button
                        onClick={() => {
                          setEditingCharacterId(null);
                          setActiveCharTab('list');
                        }}
                        className={`px-3 py-1 text-xxs font-mono uppercase tracking-wider rounded transition-colors ${
                          activeCharTab === 'list' && !editingCharacterId
                            ? 'bg-gold-antique text-slate-950 font-semibold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Registro de Fichas
                      </button>
                      <button
                        onClick={() => {
                          if (!editingCharacterId) {
                            clearCharacterCreationForm();
                          }
                          setActiveCharTab('create');
                        }}
                        className={`px-3 py-1 text-xxs font-mono uppercase tracking-wider rounded transition-colors ${
                          activeCharTab === 'create' || editingCharacterId
                            ? 'bg-gold-antique text-slate-950 font-semibold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {editingCharacterId ? 'Editando Personaje ✍️' : '+ Forjar Leyenda'}
                      </button>
                    </div>
                  </div>
                    
                    {/* Navigation state indicator breadcrumbs */}
                    <span className="text-xxs font-mono text-slate-500 hidden sm:inline uppercase">
                      Mis Personajes &gt; Nuevo Personaje
                    </span>
                  
                  {activeCharTab === 'list' && !editingCharacterId ? (
                    /* LIST VIEW FOR CHARACTERS */
                    <div className="space-y-5">
                      <div className="bg-slate-955 p-4 rounded-lg border border-gold-antique/10 flex flex-col md:flex-row justify-between items-center gap-3">
                        <span className="text-xs text-slate-300 font-light font-sans text-left">
                          Registros divinos listos para entrelazar destinos y forjar leyendas eternas.
                        </span>
                        <div className="text-xxs font-mono text-slate-500 uppercase tracking-wider">
                          Constantes del Alma: <span className="text-gold-antique font-bold">8 - 18 pts</span> por Atributo
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in text-left">
                        {characters.map((char) => (
                          <div
                            key={char.id}
                            className="bg-slate-950/60 border border-gold-antique/15 rounded-lg overflow-hidden flex flex-col justify-between p-5 relative group"
                          >
                            <div className="absolute top-2 right-2 flex gap-1.5">
                              <span className={`text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded ${
                                char.privacy === 'public'
                                  ? 'bg-emerald-955/45 text-emerald-400 border border-emerald-900/30'
                                  : 'bg-rose-955/40 text-rose-300 border border-rose-900/30'
                              }`}>
                                {char.privacy === 'public' ? 'Público' : 'Privado'}
                              </span>
                              <span className="text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-purple-955/40 text-purple-300 border border-purple-900/40">
                                {char.status}
                              </span>
                            </div>

                            <div>
                              <div className="flex items-center gap-3 mb-3 pb-2 border-b border-slate-900/85 text-left">
                                <div className="w-10 h-10 rounded-full border border-gold-antique/25 bg-slate-900 flex items-center justify-center font-serif text-gold-antique text-base uppercase font-extrabold select-none">
                                  {char.name.charAt(0)}
                                </div>
                                <div>
                                  <h5 className="font-serif text-sm font-bold text-slate-100 uppercase tracking-wider">
                                    {char.name}
                                  </h5>
                                  <span className="text-xxs font-mono text-gold-antique uppercase block">
                                    {char.race} • {char.class}
                                  </span>
                                </div>
                              </div>

                              <p className="text-xs text-slate-300 leading-relaxed font-light italic mb-4 line-clamp-3 font-sans text-left">
                                &ldquo;{char.biography}&rdquo;
                              </p>

                              {/* Attributes visual display */}
                              <div className="bg-slate-900/40 p-2.5 rounded border border-slate-900/80 mb-4 text-left font-sans">
                                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Potencial del Alma (Atributos)</span>
                                <div className="grid grid-cols-4 gap-1.5 text-center">
                                  <div className="bg-slate-950 p-1.5 rounded border border-slate-900">
                                    <span className="text-[9px] font-mono text-slate-500 block uppercase">FUE</span>
                                    <span className="font-mono text-xs font-bold text-slate-200">{char.attributes.fuerza}</span>
                                  </div>
                                  <div className="bg-slate-950 p-1.5 rounded border border-slate-900">
                                    <span className="text-[9px] font-mono text-slate-500 block uppercase">DES</span>
                                    <span className="font-mono text-xs font-bold text-slate-200">{char.attributes.destreza}</span>
                                  </div>
                                  <div className="bg-slate-950 p-1.5 rounded border border-slate-900">
                                    <span className="text-[9px] font-mono text-slate-500 block uppercase">INT</span>
                                    <span className="font-mono text-xs font-bold text-[#9D7BFF]">{char.attributes.inteligencia}</span>
                                  </div>
                                  <div className="bg-slate-950 p-1.5 rounded border border-slate-900">
                                    <span className="text-[9px] font-mono text-slate-500 block uppercase">CAR</span>
                                    <span className="font-mono text-xs font-bold text-gold-bright">{char.attributes.carisma}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Options action bar */}
                            <div className="flex justify-end gap-2 pt-3 border-t border-slate-900/80 mt-auto">
                              <button
                                onClick={() => {
                                  setCharName(char.name);
                                  setCharRace(char.race);
                                  setCharClass(char.class);
                                  setCharBiography(char.biography);
                                  setCharPrivacy(char.privacy);
                                  setCharAtts({ ...char.attributes });
                                  setEditingCharacterId(char.id);
                                  setActiveCharTab('create');
                                  triggerToast('Re-escritura Rúnica', `Cargando el alma de ${char.name} en el forjador.`, 'info');
                                }}
                                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-gold-antique/30 text-xxs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                Alterar (Editar) ✍️
                              </button>
                              <button
                                onClick={() => handleDeleteCharacter(char.id, char.name)}
                                className="px-2.5 py-1 rounded bg-rose-955/20 hover:bg-rose-955/55 text-rose-300 border border-rose-900/30 hover:border-rose-900/60 text-xxs font-mono uppercase tracking-wider transition-all cursor-pointer"
                              >
                                exiliar (Borrar) ✕
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* CREATE/EDIT FORM VIEW */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-fade-in text-left">
                      
                      {/* LEFT PANEL: CREATOR GUIDE & PORTRAIT VISUALIZER */}
                      <div className="lg:col-span-4 bg-slate-1000/95 border border-gold-antique/15 rounded-lg overflow-hidden flex flex-col justify-between p-5 bg-slate-950 text-left">
                      
                      {/* Guide header */}
                      <div>
                        <div className="flex items-center gap-1.5 mb-2.5 bg-gold-antique/5 p-2 rounded border border-gold-antique/10">
                          <Info className="w-4 h-4 text-gold-bright" />
                          <h4 className="font-serif text-xs font-semibold text-gold-bright uppercase tracking-wider">
                            Guía del Creador Narrativo
                          </h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                          Los personajes son los cimientos de tu cosmos. Al forjar sus destrezas, estás alterando la probabilidad narrativa dentro del motor del grimorio digital. 
                        </p>

                        <div className="space-y-2.5 text-xs">
                          <div className="flex gap-2">
                            <span className="text-gold-antique font-mono">I.</span>
                            <p className="text-slate-400"><strong>Asigna Atributos del Alma</strong> con cuidado. Tienes un límite estricto de puntos y debidos mínimos de 8 por atributo para no quebrantar el equilibrio.</p>
                          </div>
                          
                          <div className="flex gap-2">
                            <span className="text-gold-antique font-mono">II.</span>
                            <p className="text-slate-400">Las <strong>Crónicas del Pasado</strong> definen el lore del multiverso, y servirán al algoritmo del grimorio para entrelazar destinos.</p>
                          </div>

                          <div className="flex gap-2">
                            <span className="text-gold-antique font-mono">III.</span>
                            <p className="text-slate-400">Si estableces visibilidad en <strong>Público</strong>, otros creadores ágiles podrán convocar a esta entidad a sus mundos ficticios.</p>
                          </div>
                        </div>
                      </div>

                      {/* Medieval Character Portrait Inspiration Visualizer card from mockup */}
                      <div className="mt-6 pt-5 border-t border-slate-900/80">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Inspiración de Arte</span>
                        <div className="relative rounded-lg overflow-hidden group border border-gold-antique/20 h-44 bg-slate-900">
                          <img
                            src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop"
                            alt="Tierras del Norte"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                          
                          <div className="absolute bottom-2.5 left-2.5">
                            <span className="text-xxs font-mono text-slate-400 block">Fotograma de Referencia</span>
                            <span className="font-serif text-xs font-bold text-gold-bright uppercase tracking-wider">
                              Inspiración: Tierras del Norte
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* RIGHT PANEL: SACRED CHARACTER FORM (Mockup inputs) */}
                    <div className="lg:col-span-8 bg-slate-950/60 rounded-lg border border-gold-antique/10 p-6 relative">
                      
                      {/* Decorative corner borders */}
                      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-gold-antique/30"></div>
                      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-gold-antique/30"></div>
                      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-gold-antique/30"></div>
                      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gold-antique/30"></div>

                      <form onSubmit={handleForgeCharacter} className="space-y-5">
                        
                        {/* Section 1: Biographic metadata */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          
                          <div className="md:col-span-1">
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                              Nombre de la Entidad *
                            </label>
                            <input
                              type="text"
                              required
                              value={charName}
                              onChange={(e) => setCharName(e.target.value)}
                              placeholder="e.g. Sylvanas Vientooscuro"
                              className="w-full bg-slate-900 border border-gold-antique/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-gold-antique/50 focus:ring-1 focus:ring-gold-antique/30 transition-all font-sans"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                              Casta / Raza
                            </label>
                            <select
                              value={charRace}
                              onChange={(e) => setCharRace(e.target.value)}
                              className="w-full bg-slate-900 border border-gold-antique/10 rounded px-2.5 py-2 text-xs text-slate-300 focus:outline-none"
                            >
                              <option value="Elfo Silvano">Elfo Silvano</option>
                              <option value="Elfo de Sangre">Elfo de Sangre</option>
                              <option value="Humano Imperial">Humano Imperial</option>
                              <option value="Enano de las Montañas">Enano de las Montañas</option>
                              <option value="Orco del Clan del Sol">Orco del Clan del Sol</option>
                              <option value="Muerto Viviente">Muerto Viviente</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                              Arquetipo / Clase
                            </label>
                            <select
                              value={charClass}
                              onChange={(e) => setCharClass(e.target.value)}
                              className="w-full bg-slate-900 border border-gold-antique/10 rounded px-2.5 py-2 text-xs text-slate-300 focus:outline-none"
                            >
                              <option value="Mago Rúnico">Mago Rúnico</option>
                              <option value="Hechicero del Vacío">Hechicero del Vacío</option>
                              <option value="Paladín Caído">Paladín Caído</option>
                              <option value="Guerrero de Sangre">Guerrero de Sangre</option>
                              <option value="Pícaro de la Sombra">Pícaro de la Sombra</option>
                            </select>
                          </div>

                        </div>

                        {/* Section 2: Attributes Buy counter */}
                        <div className="bg-slate-900/30 p-4 rounded-lg border border-gold-antique/5 text-left">
                          
                          <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-2">
                            <div>
                              <h5 className="font-serif text-xs font-bold text-slate-200 uppercase tracking-widest">
                                Atributos del Alma
                              </h5>
                              <span className="text-xxs font-mono text-slate-500">Asigna los puntos de potencial rúnico sobrantes</span>
                            </div>

                            <span className="bg-slate-950 border border-gold-antique/20 px-3 py-1 rounded text-xs font-mono font-bold text-gold-bright">
                              Puntos Sobrantes: {remainingAttributePoints}
                            </span>
                          </div>

                          {/* Attributes buy points layout */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            {/* Fuerza count controller */}
                            <div className="bg-slate-950/40 p-2.5 rounded border border-slate-950 flex items-center justify-between">
                              <div>
                                <span className="font-serif text-xs font-bold text-slate-200 block">Fuerza</span>
                                <span className="text-[9px] font-mono text-slate-500">Determina poder físico y daño bruto</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => modifyAttribute('fuerza', -1)}
                                  className="w-6 h-6 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 font-mono text-xs cursor-pointer select-none"
                                >
                                  -
                                </button>
                                <span className="font-mono text-xs font-semibold text-gold-antique text-center w-6">
                                  {charAtts.fuerza}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => modifyAttribute('fuerza', 1)}
                                  className="w-6 h-6 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 font-mono text-xs cursor-pointer select-none"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Destreza count controller */}
                            <div className="bg-slate-950/40 p-2.5 rounded border border-slate-950 flex items-center justify-between">
                              <div>
                                <span className="font-serif text-xs font-bold text-slate-200 block">Destreza</span>
                                <span className="text-[9px] font-mono text-slate-500">Determina reflejos y sigilo sutil</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => modifyAttribute('destreza', -1)}
                                  className="w-6 h-6 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 font-mono text-xs cursor-pointer select-none"
                                >
                                  -
                                </button>
                                <span className="font-mono text-xs font-semibold text-gold-antique text-center w-6">
                                  {charAtts.destreza}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => modifyAttribute('destreza', 1)}
                                  className="w-6 h-6 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 font-mono text-xs cursor-pointer select-none"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Inteligencia count controller */}
                            <div className="bg-slate-950/40 p-2.5 rounded border border-slate-950 flex items-center justify-between">
                              <div>
                                <span className="font-serif text-xs font-bold text-slate-200 block">Inteligencia</span>
                                <span className="text-[9px] font-mono text-slate-500">Determina reserva mágica y erudición</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => modifyAttribute('inteligencia', -1)}
                                  className="w-6 h-6 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 font-mono text-xs cursor-pointer select-none"
                                >
                                  -
                                </button>
                                <span className="font-mono text-xs font-semibold text-gold-antique text-center w-6">
                                  {charAtts.inteligencia}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => modifyAttribute('inteligencia', 1)}
                                  className="w-6 h-6 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 font-mono text-xs cursor-pointer select-none"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Carisma count controller */}
                            <div className="bg-slate-950/40 p-2.5 rounded border border-slate-950 flex items-center justify-between">
                              <div>
                                <span className="font-serif text-xs font-bold text-slate-200 block">Carisma</span>
                                <span className="text-[9px] font-mono text-slate-500">Determina persuasión y encanto</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => modifyAttribute('carisma', -1)}
                                  className="w-6 h-6 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 font-mono text-xs cursor-pointer select-none"
                                >
                                  -
                                </button>
                                <span className="font-mono text-xs font-semibold text-gold-antique text-center w-6">
                                  {charAtts.carisma}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => modifyAttribute('carisma', 1)}
                                  className="w-6 h-6 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 font-mono text-xs cursor-pointer select-none"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                          </div>
                          
                        </div>

                        {/* Section 3: Chronicles biography / past lore */}
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                            Crónicas del Pasado (Biografía Narrativa)
                          </label>
                          <textarea
                            rows={3}
                            value={charBiography}
                            onChange={(e) => setCharBiography(e.target.value)}
                            placeholder="Describe el trasfondo del personaje. Sus pérdidas, sus deudas de sangre, y por qué ha sido convocado a los relatos de Identity Simulation..."
                            className="w-full bg-slate-900 border border-gold-antique/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-gold-antique/50 resize-none font-sans leading-relaxed"
                          ></textarea>
                        </div>

                        {/* Section 4: Privacy metadata switches from mockup */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/20 p-3.5 rounded border border-slate-900/60 mt-2 text-left">
                          <div>
                            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
                              Visibilidad del Registro de Identidad
                            </span>
                            <span className="text-xxs text-slate-500 font-light block mt-0.5 font-sans leading-tight">
                              Los registros privados no se comparten en el multiverso público con otros Cronistas.
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setCharPrivacy('public')}
                              className={`px-3 py-1 border rounded text-xs font-mono transition-colors ${
                                charPrivacy === 'public'
                                  ? 'bg-gold-antique/10 text-gold-bright border-gold-antique/50'
                                  : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
                              }`}
                            >
                              Público (Compartido)
                            </button>
                            <button
                              type="button"
                              onClick={() => setCharPrivacy('private')}
                              className={`px-3 py-1 border rounded text-xs font-mono transition-colors ${
                                charPrivacy === 'private'
                                  ? 'bg-[#9D7BFF]/10 text-neon-violet border-neon-violet/50'
                                  : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
                              }`}
                            >
                              Privado (Manuscrito)
                            </button>
                          </div>
                        </div>

                        {/* Section 5: Action anchors sticky layout from mockup */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-900">
                          <button
                            type="button"
                            onClick={() => {
                              clearCharacterCreationForm();
                              triggerToast('Forja Purificada', 'Se vaciaron los campos de la deidad terrenal.', 'info');
                            }}
                            className="bg-transparent hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 py-2 px-4 rounded text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            Descartar
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (!charName.trim()) {
                                triggerToast('Sin Nombre', 'Para previsualizar primero debes bautizar su existencia.', 'error');
                                return;
                              }
                              triggerToast(
                                'Proyección del Éter',
                                `Previsualizando proyección de ${charName} (${charRace} - ${charClass}): Fuerza ${charAtts.fuerza}, Destreza ${charAtts.destreza}, Inteligencia ${charAtts.inteligencia}, Carisma ${charAtts.carisma}.`,
                                'info'
                              );
                            }}
                            className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 py-2 px-4 rounded text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            Previsualizar
                          </button>

                          <button
                            type="submit"
                            className="bg-gold-antique hover:bg-gold-bright text-slate-950 font-serif font-black uppercase text-xs tracking-widest py-2 px-5 rounded shadow-lg shadow-gold-antique/15 hover:shadow-gold-antique/25 transition-all cursor-pointer select-none active:scale-95 text-center flex items-center gap-1 border border-transparent"
                          >
                            Guardar Personaje ✨
                          </button>
                        </div>

                      </form>

                    </div>

                  </div>
                )} {/* End of Character Ternary */}

              </div>
            )}

            {/* ==================== TAB 6: CRÓNICAS DE HISTORIAS ==================== */}
            {activeTab === 'stories' && (
              <div id="view-stories" className="space-y-6 animate-fade-in text-left">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gold-antique/10 gap-3 text-left">
                  <div>
                    <span className="text-[10px] font-mono text-gold-antique uppercase tracking-widest block mb-0.5">
                      Manuscrito Narrativo • Identity Simulation
                    </span>
                    <h4 className="font-serif text-xl font-extrabold text-slate-100 uppercase tracking-widest">
                      {editingStoryId ? 'Re-escribir Crónica' : 'Escribir Historias'}
                    </h4>
                  </div>

                  <div className="flex gap-1.5 bg-slate-900/60 p-1 rounded border border-slate-800">
                    <button
                      onClick={() => {
                        setEditingStoryId(null);
                        setActiveStoryTab('list');
                      }}
                      className={`px-3 py-1 text-xxs font-mono uppercase tracking-wider rounded transition-colors ${
                        activeStoryTab === 'list' && !editingStoryId
                          ? 'bg-gold-antique text-slate-950 font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Compendio Histórico
                    </button>
                    <button
                      onClick={() => {
                        if (!editingStoryId) {
                          clearStoryForm();
                        }
                        setActiveStoryTab('create');
                      }}
                      className={`px-3 py-1 text-xxs font-mono uppercase tracking-wider rounded transition-colors ${
                        activeStoryTab === 'create' || editingStoryId
                          ? 'bg-gold-antique text-slate-950 font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {editingStoryId ? 'Editando Crónica ✍️' : '+ Crear Nueva Historia'}
                    </button>
                  </div>
                </div>

                {activeStoryTab === 'list' && !editingStoryId ? (
                  /* STORIES COMPENDIUM GRID */
                  <div className="space-y-5 animate-fade-in text-left">
                    <div className="bg-slate-955 p-4 rounded-lg border border-gold-antique/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-left">
                      <span className="text-xs text-slate-300 font-light font-sans">
                        Hitos de prosa e identidad de cada crónica registrada en el multiverso ficticio.
                      </span>
                      <div className="text-xxs font-mono text-slate-500 uppercase tracking-wider">
                        Crónicas totales: <span className="text-blue-400 font-bold">{stories.length} narrativas</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {stories.map((st) => {
                        const linkedChar = characters.find(c => c.id === st.associatedCharacterId);
                        const linkedWorld = worlds.find(w => w.id === st.associatedWorldId);

                        return (
                          <div
                            key={st.id}
                            className="bg-slate-950/50 border border-gold-antique/10 rounded-lg p-5 flex flex-col justify-between relative text-left"
                          >
                            <div className="absolute top-2.5 right-2.5 font-bold">
                              <span className="text-[8px] font-mono tracking-widest uppercase bg-slate-900 border border-slate-800 text-gold-bright px-1.5 py-0.5 rounded">
                                {st.status}
                              </span>
                            </div>

                            <div>
                              <h5 className="font-serif text-sm font-bold text-slate-100 uppercase tracking-wider mb-1.5 text-gold-antique text-left">
                                {st.title}
                              </h5>
                              
                              <span className="text-xxs font-mono text-slate-500 block mb-3 text-left">
                                Escrito el {st.createdAt}
                              </span>

                              <p className="text-xs text-slate-300 leading-relaxed font-serif font-light mb-4 line-clamp-4 bg-slate-900/20 p-2.5 rounded border border-slate-900/60 text-left">
                                &ldquo;{st.content}&rdquo;
                              </p>

                              {/* Association displays */}
                              <div className="flex flex-wrap gap-2 mb-4 text-left">
                                {linkedChar && (
                                  <span className="bg-[#9D7BFF]/10 text-[#9D7BFF] border border-[#9D7BFF]/20 px-1.5 py-0.5 rounded text-xxs font-mono">
                                    PNJ: {linkedChar.name}
                                  </span>
                                )}
                                {linkedWorld && (
                                  <span className="bg-emerald-955/40 text-emerald-350 border border-emerald-900/40 px-1.5 py-0.5 rounded text-xxs font-mono">
                                    Plano: {linkedWorld.name}
                                  </span>
                                )}
                                {!linkedChar && !linkedWorld && (
                                  <span className="text-xxs font-mono text-slate-550 block italic text-left">Fábula Cósmica Pura</span>
                                )}
                              </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-slate-900 mt-2">
                              <button
                                onClick={() => {
                                  setStoryTitle(st.title);
                                  setStoryContent(st.content);
                                  setStoryCharacterId(st.associatedCharacterId || '');
                                  setStoryWorldId(st.associatedWorldId || '');
                                  setStoryStatus(st.status);
                                  setEditingStoryId(st.id);
                                  setActiveStoryTab('create');
                                  triggerToast('Crónica Cargada', `Listo para re-escribir "${st.title}"`, 'info');
                                }}
                                className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xxs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                Re-escribir 🪐
                              </button>
                              <button
                                onClick={() => handleDeleteStory(st.id, st.title)}
                                className="px-2 py-1 rounded bg-rose-955/20 hover:bg-rose-950/50 text-rose-300 border border-rose-900/30 text-xxs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                Incinerar ✕
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* REDACT STORY VIEW */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-fade-in text-left">
                    {/* GUIDE */}
                    <div className="lg:col-span-4 bg-slate-955 border border-gold-antique/15 rounded-lg p-5 flex flex-col justify-between text-left">
                      <div>
                        <div className="flex items-center gap-1.5 mb-2.5 bg-gold-antique/5 p-2 rounded border border-gold-antique/10 text-left">
                          <Plus className="w-4 h-4 text-gold-bright" />
                          <h4 className="font-serif text-xs font-semibold text-gold-bright uppercase tracking-wider">
                            Inscripción de Historias
                          </h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-light mb-4 text-left font-sans">
                          Cada crónica entrelaza personajes (Fichas) y mundos (Cosmogonías). El motor de Identity Simulation indexará estos eventos para asegurar coherencia absoluta con los requerimientos de desarrollo ágil.
                        </p>

                        <div className="space-y-2 font-mono text-xxs text-slate-500 text-left">
                          <div>✓ RF08 - Gestión de Crónicas</div>
                          <div>✓ RF15 - Trazabilidad de Activos vinculados</div>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 border border-slate-800 rounded text-center">
                        <span className="font-serif text-xs italic text-gold-antique font-sans">
                          &ldquo;La prosa esculpe la materia y el alma por igual.&rdquo;
                        </span>
                      </div>
                    </div>

                    {/* REDACT FORM */}
                    <div className="lg:col-span-8 bg-slate-950/60 rounded-lg border border-gold-antique/10 p-6 text-left">
                      <form onSubmit={handleSaveStory} className="space-y-4 text-left">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                            Título de la Crónica *
                          </label>
                          <input
                            type="text"
                            required
                            value={storyTitle}
                            onChange={(e) => setStoryTitle(e.target.value)}
                            placeholder="e.g. La caída rúnica de Ethendor"
                            className="w-full bg-slate-900 border border-gold-antique/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-gold-antique/50 font-sans"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                              Vincular Personaje Principal
                            </label>
                            <select
                              value={storyCharacterId}
                              onChange={(e) => setStoryCharacterId(e.target.value)}
                              className="w-full bg-slate-900 border border-gold-antique/10 rounded px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
                            >
                              <option value="">-- Ninguno (Fábula pura) --</option>
                              {characters.map(c => (
                                <option key={c.id} value={c.id}>{c.name} ({c.class})</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                              Ubicar en Plano de Mundo
                            </label>
                            <select
                              value={storyWorldId}
                              onChange={(e) => setStoryWorldId(e.target.value)}
                              className="w-full bg-slate-900 border border-gold-antique/10 rounded px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
                            >
                              <option value="">-- Sin plano (Limbo ficticio) --</option>
                              {worlds.map(w => (
                                <option key={w.id} value={w.id}>{w.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="text-left">
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                            Cuerpo de la Crónica *
                          </label>
                          <textarea
                            rows={5}
                            required
                            value={storyContent}
                            onChange={(e) => setStoryContent(e.target.value)}
                            placeholder="Escribe tu manuscrito literario aquí..."
                            className="w-full bg-slate-900 border border-gold-antique/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-gold-antique/50 leading-relaxed resize-none font-serif text-left"
                          ></textarea>
                        </div>

                        <div className="text-left">
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                            Estatus de la Crónica
                          </label>
                          <select
                            value={storyStatus}
                            onChange={(e) => setStoryStatus(e.target.value as any)}
                            className="w-full bg-slate-900 border border-gold-antique/10 rounded px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
                          >
                            <option value="Publicada">Publicada (Grimorio Público)</option>
                            <option value="Borrador">Borrador (Mano Escrita)</option>
                            <option value="Archivada">Archivada (Limbo Privado)</option>
                          </select>
                        </div>

                        <div className="flex justify-end gap-3 pt-3 border-t border-slate-900">
                          <button
                            type="button"
                            onClick={() => {
                              clearStoryForm();
                              setActiveStoryTab('list');
                            }}
                            className="bg-transparent hover:bg-slate-900 text-slate-400 border border-slate-800 py-1.5 px-3 rounded text-xs font-mono uppercase cursor-pointer"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="bg-gold-antique hover:bg-gold-bright text-slate-950 font-serif font-bold uppercase text-xs px-5 py-2 rounded transition-all cursor-pointer"
                          >
                            {editingStoryId ? 'Actualizar Crónica ✍️' : 'Guardar Historia ✨'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ==================== TAB 7: COSMOGONÍA (MUNDOS) ==================== */}
            {activeTab === 'worlds' && (
              <div id="view-worlds" className="space-y-6 animate-fade-in text-left">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gold-antique/10 gap-3 text-left">
                  <div>
                    <span className="text-[10px] font-mono text-gold-antique uppercase tracking-widest block mb-0.5">
                      Cosmología Multiversal • Identity Simulation
                    </span>
                    <h4 className="font-serif text-xl font-extrabold text-slate-100 uppercase tracking-widest">
                      {editingWorldId ? 'Alterar Plano Existencial' : 'Cosmogonía (Mundos)'}
                    </h4>
                  </div>

                  <div className="flex gap-1.5 bg-slate-900/60 p-1 rounded border border-slate-800">
                    <button
                      onClick={() => {
                        setEditingWorldId(null);
                        setActiveWorldTab('list');
                      }}
                      className={`px-3 py-1 text-xxs font-mono uppercase tracking-wider rounded transition-colors ${
                        activeWorldTab === 'list' && !editingWorldId
                          ? 'bg-gold-antique text-slate-950 font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Atlas Geográfico
                    </button>
                    <button
                      onClick={() => {
                        if (!editingWorldId) {
                          clearWorldForm();
                        }
                        setActiveWorldTab('create');
                      }}
                      className={`px-3 py-1 text-xxs font-mono uppercase tracking-wider rounded transition-colors ${
                        activeWorldTab === 'create' || editingWorldId
                          ? 'bg-gold-antique text-slate-950 font-bold font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {editingWorldId ? 'Editando Plano 🪐' : '+ Forjar Plano Cósmico'}
                    </button>
                  </div>
                </div>

                {activeWorldTab === 'list' && !editingWorldId ? (
                  /* WORLDS ATLAS VIEW */
                  <div className="space-y-5 animate-fade-in text-left">
                    <div className="bg-slate-955 p-4 rounded-lg border border-gold-antique/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-left">
                      <span className="text-xs text-slate-300 font-light font-sans">
                        Planos cósmicos que sirven de marco geográfico para las narraciones estelares.
                      </span>
                      <div className="text-xxs font-mono text-slate-500 uppercase tracking-wider">
                        Universos inicializados: <span className="text-emerald-400 font-bold">{worlds.length} Activos</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                      {worlds.map((w) => {
                        // Find stories linked to this world
                        const localStories = stories.filter(s => s.associatedWorldId === w.id);

                        return (
                          <div
                            key={w.id}
                            className="bg-slate-950/50 border border-gold-antique/10 rounded-lg p-5 flex flex-col justify-between text-left"
                          >
                            <div>
                              <div className="flex items-center justify-between pb-2 border-b border-slate-900/80 mb-3 text-left">
                                <h5 className="font-serif text-sm font-black text-slate-100 uppercase tracking-wider text-emerald-400 text-left">
                                  {w.name}
                                </h5>
                                <span className="text-[8px] font-mono tracking-widest uppercase bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-400 font-bold">
                                  {w.status}
                                </span>
                              </div>

                              <p className="text-xs text-slate-300 font-light mb-4 leading-relaxed italic font-sans text-left">
                                {w.description}
                              </p>

                              {/* Physical attributes of world */}
                              <div className="grid grid-cols-3 gap-2 bg-slate-900/30 p-2 rounded border border-slate-900 mb-4 font-mono text-[10px] text-left">
                                <div>
                                  <span className="text-slate-500 block uppercase tracking-wider">Clima</span>
                                  <span className="text-slate-200">{w.climate}</span>
                                </div>
                                <div>
                                  <span className="text-slate-500 block uppercase tracking-wider">Tecnología</span>
                                  <span className="text-slate-200">{w.technology}</span>
                                </div>
                                <div>
                                  <span className="text-slate-500 block uppercase tracking-wider">Habitantes</span>
                                  <span className="text-slate-200">{w.population}</span>
                                </div>
                              </div>

                              {/* Linked Stories inside atlas */}
                              <div className="bg-slate-950/40 p-2 rounded border border-slate-900/60 text-left">
                                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                                  Crónicas vinculadas a este Plano ({localStories.length})
                                </span>
                                {localStories.length > 0 ? (
                                  <ul className="space-y-1 text-xxs font-serif list-disc list-inside text-slate-400 block text-left">
                                    {localStories.map(ls => (
                                      <li key={ls.id}>{ls.title}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <span className="text-xxs font-mono text-slate-550 block italic text-left">Ninguna crónica ha transcurrido aquí todavía.</span>
                                )}
                              </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-slate-900/80 mt-4">
                              <button
                                onClick={() => {
                                  setWorldName(w.name);
                                  setWorldClimate(w.climate);
                                  setWorldTechnology(w.technology);
                                  setWorldPopulation(w.population);
                                  setWorldDescription(w.description);
                                  setWorldStatus(w.status);
                                  setEditingWorldId(w.id);
                                  setActiveWorldTab('create');
                                  triggerToast('Re-esquematizando Plano', `Cargando detalles de ${w.name} en el compendio.`, 'info');
                                }}
                                className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xxs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                Modelar (Editar) 🪐
                              </button>
                              <button
                                onClick={() => handleDeleteWorld(w.id, w.name)}
                                className="px-2 py-1 rounded bg-rose-955/20 hover:bg-rose-950/50 text-rose-300 border border-rose-900/30 text-xxs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                Colapsar ✕
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* CREATE/EDIT WORLD FORM */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-fade-in text-left">
                    <div className="lg:col-span-4 bg-slate-955 border border-gold-antique/15 rounded-lg p-5 flex flex-col justify-between text-left">
                      <div>
                        <div className="flex items-center gap-1.5 mb-2.5 bg-gold-antique/5 p-2 rounded border border-gold-antique/10 text-left">
                          <Globe className="w-4 h-4 text-gold-bright" />
                          <h4 className="font-serif text-xs font-semibold text-gold-bright uppercase tracking-wider">
                            Anclajes Cósmicos
                          </h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-light mb-4 text-left font-sans">
                          Los mundos ficticios dictan las leyes de la física, el clima y los límites estructurales que experimentarán los personajes a lo largo de sus viajes mágicos.
                        </p>
                      </div>
                      <div className="bg-slate-900 p-2 rounded border border-slate-800 text-xxs font-mono text-slate-500 text-center">
                        SISTEMA MULTIVERSO • PROTOCOLO-NARRATIVO
                      </div>
                    </div>

                    <div className="lg:col-span-8 bg-slate-950/60 rounded-lg border border-gold-antique/10 p-6 text-left">
                      <form onSubmit={handleSaveWorld} className="space-y-4 text-left">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                            Nombre del Plano Cósmico *
                          </label>
                          <input
                            type="text"
                            required
                            value={worldName}
                            onChange={(e) => setWorldName(e.target.value)}
                            placeholder="e.g. Helheim"
                            className="w-full bg-slate-900 border border-gold-antique/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-gold-antique/50 font-sans"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                              Constantes de Clima
                            </label>
                            <input
                              type="text"
                              value={worldClimate}
                              onChange={(e) => setWorldClimate(e.target.value)}
                              placeholder="e.g. Frío Infernal"
                              className="w-full bg-slate-900 border border-gold-antique/10 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none font-sans"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                              Escala de Tecnología
                            </label>
                            <input
                              type="text"
                              value={worldTechnology}
                              onChange={(e) => setWorldTechnology(e.target.value)}
                              placeholder="e.g. Mágica / Medieval"
                              className="w-full bg-slate-900 border border-gold-antique/10 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none font-sans"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                              Censo Almas (Habitantes)
                            </label>
                            <input
                              type="text"
                              value={worldPopulation}
                              onChange={(e) => setWorldPopulation(e.target.value)}
                              placeholder="e.g. 500,000 Almas"
                              className="w-full bg-slate-900 border border-gold-antique/10 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none font-sans"
                            />
                          </div>
                        </div>

                        <div className="text-left">
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                            Descripción Geográfica del Plano
                          </label>
                          <textarea
                            rows={4}
                            value={worldDescription}
                            onChange={(e) => setWorldDescription(e.target.value)}
                            placeholder="Describe las planicies, océanos celestiales o cañones mágicos..."
                            className="w-full bg-slate-900 border border-gold-antique/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-gold-antique/50 leading-relaxed font-sans resize-none font-light"
                          ></textarea>
                        </div>

                        <div className="text-left">
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                            Visibilidad Cosmográfica
                          </label>
                          <select
                            value={worldStatus}
                            onChange={(e) => setWorldStatus(e.target.value as any)}
                            className="w-full bg-slate-900 border border-gold-antique/10 rounded px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
                          >
                            <option value="Activo">Activo (Compendio Visible)</option>
                            <option value="Borrador">Borrador (Limbo del Caos)</option>
                          </select>
                        </div>

                        <div className="flex justify-end gap-3 pt-3 border-t border-slate-900">
                          <button
                            type="button"
                            onClick={() => {
                              clearWorldForm();
                              setActiveWorldTab('list');
                            }}
                            className="bg-transparent hover:bg-slate-900 text-slate-400 border border-slate-800 py-1.5 px-3 rounded text-xs font-mono uppercase"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="bg-gold-antique hover:bg-gold-bright text-slate-950 font-serif font-bold uppercase text-xs px-5 py-2 rounded transition-all cursor-pointer"
                          >
                            {editingWorldId ? 'Alterar Plano Rúnico' : 'Forjar Plano Existencial ✨'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            </div>

            {/* Standard footer for professional look as suggested in guidelines */}
            <footer className="p-4 bg-slate-950 text-center border-t border-gold-antique/10 text-xxs font-mono text-slate-600 tracking-wider">
              <span>SISTEMA DE DISEÑO &QUOT;IDENTITY SIMULATION&QUOT; • FORJA CREATIVA • @2026 COGNITIVE WORKSPACE</span>
            </footer>

          </main>
          
        </div>
      )}
    </div>
  );
}
