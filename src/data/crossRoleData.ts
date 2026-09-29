import { IpItem } from '../types';
import { ALL_IPS } from './ipsData';

export type CrossRoleKey = 'operador_linea' | 'director_clevel' | 'consultor_fractional' | 'cliente_final';

export interface CrossRoleDefinition {
  key: CrossRoleKey;
  title: string;
  roleName: string;
  archetype: string;
  tagline: string;
  badge: string;
  iconName: string;
  accentColor: string;
  textColor: string;
  borderColor: string;
  bgColor: string;
  coreTension: string;
  currentPainExperience: string[];
  nextLivedExperience: string[];
  systemicPromise: string;
  recommendedIpCodes: string[];
}

export const CROSS_ROLES: Record<CrossRoleKey, CrossRoleDefinition> = {
  operador_linea: {
    key: 'operador_linea',
    title: 'Operador de Última Línea',
    roleName: 'Especialista de Trinchera & Ejecución',
    archetype: 'El Escudo Operativo',
    tagline: 'Quien absorbe la fricción directa con clientes y sistemas en el punto de contacto',
    badge: 'Trinchera / Frontline',
    iconName: 'Wrench',
    accentColor: 'amber',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    bgColor: 'bg-amber-500/10',
    coreTension: '"Me exigen velocidad milimétrica pero me entregan procesos teóricos rotos; si algo falla, yo soy la cara visible."',
    currentPainExperience: [
      'Manuales SOPs de 200 páginas que no resuelven la contingencia cuando el sistema se cae a las 5:00 PM.',
      'Tener que recurrir a la improvisación y al heroísmo personal para salvar el día a costa de desgaste físico y mental.',
      'Recibir reproches y penalizaciones por problemas originados semanas antes en ventas o en el diseño del producto.',
      'Incertidumbre constante: nunca saber si hoy será un día tranquilo o un infierno de quejas de clientes.',
    ],
    nextLivedExperience: [
      'Guardarraíles claros: reglas de parada automática que le permiten decir "NO" a un input defectuoso con respaldo institucional.',
      'Buffers cognitivos protegidos: 20% de ancho de banda garantizado para absorber incidencias sin estrés desmedido.',
      'Descompresión de ambigüedad: cada tarea tiene un dueño único, criterios booleanos de éxito y cero zonas grises.',
      'Dignidad laboral: la arquitectura del sistema lo cuida en lugar de usarlo como amortiguador humano.',
    ],
    systemicPromise: 'Eliminación del heroísmo obligatorio. El sistema asume el peso de la variabilidad para que el operador trabaje con calma y maestría.',
    recommendedIpCodes: ['IP-081', 'IP-012', 'IP-054', 'IP-044', 'IP-007', 'IP-032'],
  },
  director_clevel: {
    key: 'director_clevel',
    title: 'Director / C-Level',
    roleName: 'Arquitecto Estratégico & Decisor de Gobernanza',
    archetype: 'El Garante de la Soberanía',
    tagline: 'Quien responde por la viabilidad económica, el capital y la antifragilidad del modelo',
    badge: 'Estrategia / C-Suite',
    iconName: 'Shield',
    accentColor: 'indigo',
    textColor: 'text-indigo-400',
    borderColor: 'border-indigo-500/40',
    bgColor: 'bg-indigo-500/10',
    coreTension: '"Si no estoy encima de cada detalle las cosas se caen; soy el cuello de botella que frena la escala de mi propia empresa."',
    currentPainExperience: [
      'Reuniones eternas de apagado de incendios que devoran el tiempo necesario para la estrategia y el crecimiento.',
      'Terror de delegar porque cuando delega, el cliente importante se queja o los márgenes de ganancia se desploman.',
      'Reportes cosméticos de mandos medios con "semáforos verdes" que ocultan el caos operativo real hasta que es tarde.',
      'Dependencia patológica de dos o tres "estrellas" internas cuyo reemplazo costaría meses y cientos de miles de dólares.',
    ],
    nextLivedExperience: [
      'Soberanía operativa despersonalizada: la empresa funciona con idéntico rigor esté el director de vacaciones o no.',
      'Auditoría de Divergencia asíncrona: visibilidad en tiempo real de la brecha entre plan y trinchera sin micromanagement.',
      'Blindaje de margen: la fuga silenciosa de horas no facturadas y parches se corta en la raíz del modelo.',
      'Paz ejecutiva: transición de apagar fuegos a gobernar flujos de capital e innovación sistémica.',
    ],
    systemicPromise: 'Escalabilidad sin héroes. Multiplicar la capacidad de entrega y el margen sin aumentar linealmente el estrés ni el personal directivo.',
    recommendedIpCodes: ['IP-032', 'IP-001', 'IP-023', 'IP-079', 'IP-087', 'IP-081'],
  },
  consultor_fractional: {
    key: 'consultor_fractional',
    title: 'Consultor / Fractional COO',
    roleName: 'Operating Partner & Catalizador Asíncrono',
    archetype: 'El Auditor Forense',
    tagline: 'Quien interviene organizaciones de cartera para sanear operaciones sin desgaste político',
    badge: 'Auditoría / Fractional',
    iconName: 'Compass',
    accentColor: 'blue',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/40',
    bgColor: 'bg-blue-500/10',
    coreTension: '"Los clientes me pagan por resultados rápidos, pero me entregan documentación ficticia y el equipo me ve como una amenaza."',
    currentPainExperience: [
      'Perder de 3 a 6 meses solo para descubrir dónde están las fugas reales porque los manuales no reflejan la realidad.',
      'Resistencia política y desgaste en debates de opiniones donde cada gerente defiende su territorio.',
      'Tener que construir frameworks desde cero en cada nueva empresa del portafolio, reinventando la rueda una y otra vez.',
      'Dificultad para demostrar el ROI financiero inmediato de una mejora operativa o de gobernanza.',
    ],
    nextLivedExperience: [
      'Pattern recognition instantáneo: diagnosticar la causa raíz de una crisis en la primera semana leyendo los 87 axiomas.',
      'Prescripciones objetivas e inapelables: la intervención se formula como matemática relacional, no como juicio personal.',
      'Playbooks estandarizados listos para transferir a directores o líderes de trinchera sin requerir su presencia continua.',
      'Cálculo exacto del impacto (GIS) y de las horas directas de tanteo ahorradas al Private Equity / Fondos de Inversión.',
    ],
    systemicPromise: 'Subsidio cognitivo de 3-5M de horas. Capacidad de intervenir con precisión quirúrgica desde el día uno con cero fricción de ego.',
    recommendedIpCodes: ['IP-087', 'IP-018', 'IP-035', 'IP-060', 'IP-041', 'IP-007'],
  },
  cliente_final: {
    key: 'cliente_final',
    title: 'Cliente Final / Usuario',
    roleName: 'El Habitante de la Experiencia Producida',
    archetype: 'El Juez de la Verdad',
    tagline: 'Quien vive en carne propia la calidad, la velocidad y la certeza de lo prometido',
    badge: 'Habitante / Usuario',
    iconName: 'HeartHandshake',
    accentColor: 'emerald',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    bgColor: 'bg-emerald-500/10',
    coreTension: '"Me prometieron el cielo en la venta, pero cada entrega es una lotería y cuando algo falla me hacen esperar días."',
    currentPainExperience: [
      'Ansiedad por incertidumbre: tener que estar persiguiendo al proveedor para saber cuándo llegará el pedido o servicio.',
      'Variabilidad arbitraria: la calidad es excelente si atiende el empleado A, pero pésima si atiende el empleado B.',
      'Respuestas defensivas de soporte que se escudan en la letra chica de los contratos o se echan la culpa entre departamentos.',
      'Pérdida de tiempo y dinero solucionando errores ajenos en la última milla que nunca debieron ocurrir.',
    ],
    nextLivedExperience: [
      'Certeza radical: la fecha prometida es la fecha entregada; la especificación pactada es exactamente lo recibido.',
      'Tranquilidad psicológica: saber que la empresa tiene sistemas sólidos y no depende de la buena voluntad de un individuo.',
      'Transparencia proactiva: si ocurre una anomalía imprevista, la empresa avisa antes con la solución ya en marcha.',
      'Sensación de habitar un servicio de primer nivel mundial donde su tiempo y su confianza son sagrados.',
    ],
    systemicPromise: 'Experiencia habitable y antifrágil. Eliminar las sorpresas desagradables y sustituirlas por una predictibilidad serena.',
    recommendedIpCodes: ['IP-018', 'IP-052', 'IP-071', 'IP-029', 'IP-044', 'IP-081'],
  },
};

export interface CrossRolePerspective {
  roleKey: CrossRoleKey;
  roleName: string;
  transformationSummary: string;
  frictionEliminated: string;
  nextExperienceGained: string;
  actionPrompt: string;
}

export interface CrossRoleAnchorResult {
  ip: IpItem;
  unifiedInsight: string;
  perspectives: Record<CrossRoleKey, CrossRolePerspective>;
  balanceScore: number; // 0 - 100
}

export const getCrossRoleAnchorForIp = (ip: IpItem): CrossRoleAnchorResult => {
  const code = ip.code || ip.id;

  return {
    ip,
    unifiedInsight: `Esta IP (${code} - ${ip.name}) actúa como un puente de confianza sistémica: alivia la carga del operador, otorga visibilidad al director, ofrece palanca al consultor y produce una experiencia predecible para el cliente.`,
    balanceScore: Math.min(100, Math.max(82, ip.immediateApplicability)),
    perspectives: {
      operador_linea: {
        roleKey: 'operador_linea',
        roleName: 'Operador de Última Línea',
        transformationSummary: `Regla operativa explícita: elimina la ambigüedad en ${ip.industryUseCase || ip.purpose}.`,
        frictionEliminated: 'No más adivinar intenciones directivas ni asumir culpas de fallas de diseño.',
        nextExperienceGained: 'Protocolo de validación directa con criterios de aceptación transparentes.',
        actionPrompt: `Aplicar la fórmula/regla clave de ${code} para fijar límites operativos de parada de emergencia.`,
      },
      director_clevel: {
        roleKey: 'director_clevel',
        roleName: 'Director / C-Level',
        transformationSummary: `Despersonalización de la gobernanza: ${ip.purpose}.`,
        frictionEliminated: 'Elimina el cuello de botella decisorio y el miedo a la rotación de personal.',
        nextExperienceGained: 'Métricas de divergencia claras sin necesidad de micromanagement diario.',
        actionPrompt: `Incorporar ${code} al scorecard del comité de dirección como indicador de soberanía.`,
      },
      consultor_fractional: {
        roleKey: 'consultor_fractional',
        roleName: 'Consultor / Fractional COO',
        transformationSummary: `Palanca de intervención asíncrona: ${ip.categoryLabel}.`,
        frictionEliminated: 'Evita meses de diagnóstico exploratorio al contar con una primitiva probada.',
        nextExperienceGained: 'Matriz forense reproducible en cualquier empresa del portafolio.',
        actionPrompt: `Utilizar los inputs obligatorios de ${code} como cuestionario de auditoría inicial.`,
      },
      cliente_final: {
        roleKey: 'cliente_final',
        roleName: 'Cliente Final / Usuario',
        transformationSummary: `La próxima experiencia a habitar: cumplimiento riguroso en tiempo real.`,
        frictionEliminated: 'Desaparición de retrasos injustificados y calidad fluctuante.',
        nextExperienceGained: 'Sensación de servicio maduro, predecible y respetuoso de sus acuerdos.',
        actionPrompt: `Percibir la consistencia del entregable con cero fricción de post-venta.`,
      },
    },
  };
};

export const getRecommendedIpsForRole = (roleKey: CrossRoleKey): IpItem[] => {
  const roleDef = CROSS_ROLES[roleKey];
  if (!roleDef) return [];
  
  return roleDef.recommendedIpCodes
    .map((code) => ALL_IPS.find((ip) => ip.code === code || ip.id === code))
    .filter((ip): ip is IpItem => ip !== undefined);
};
