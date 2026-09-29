import { IpItem, ProblemCategory } from '../types';
import { ALL_IPS } from './ipsData';

export type LastMileFailureModeId = 
  | 'friccion_handoff'
  | 'fatiga_sobrecarga'
  | 'quiebre_promesa'
  | 'fuga_margen'
  | 'dependencia_heroica'
  | 'asimetria_ceguera';

export interface LastMileFailureMode {
  id: LastMileFailureModeId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  systemicSymptom: string;
  lastMileConsequence: string;
  severity: 'CRÍTICO' | 'ALTO' | 'MODERADO';
  color: string;
  bgBadge: string;
  borderBadge: string;
  textColor: string;
  icon: string;
}

export const LAST_MILE_FAILURE_MODES: Record<LastMileFailureModeId, LastMileFailureMode> = {
  friccion_handoff: {
    id: 'friccion_handoff',
    name: 'Fricción de Handoff & Ruptura de Contexto',
    shortName: 'Fricción de Handoff',
    tagline: 'Pérdida de señal entre lo planificado y lo ejecutado',
    description: 'Pérdida crítica de intencionalidad técnica cuando una instrucción o proyecto pasa de la dirección/estrategia a las manos del operador de trinchera.',
    systemicSymptom: 'El operador asume supuestos clandestinos porque los manuales no explican el "cómo hacer" bajo presión.',
    lastMileConsequence: 'Entregables fuera de norma, reproceso en cadena y clientes desilusionados en la entrega final.',
    severity: 'CRÍTICO',
    color: 'from-orange-500 to-amber-600',
    bgBadge: 'bg-orange-500/10',
    borderBadge: 'border-orange-500/30',
    textColor: 'text-orange-400',
    icon: 'GitFork',
  },
  fatiga_sobrecarga: {
    id: 'fatiga_sobrecarga',
    name: 'Sobrecarga Cognitiva & Burnout de Trinchera',
    shortName: 'Fatiga del Operador',
    tagline: 'Saturación del ancho de banda que induce errores inducidos',
    description: 'Saturación extrema de la memoria de trabajo del operador debido a exceso de canales, decisiones no estandarizadas y reuniones reactivas.',
    systemicSymptom: 'El operador trabaja en modo pánico, toma atajos sin documentar y omite validaciones obligatorias.',
    lastMileConsequence: 'Accidentes operativos, fallas de calidad repetitivas y rotación constante del personal de trinchera.',
    severity: 'ALTO',
    color: 'from-rose-500 to-red-600',
    bgBadge: 'bg-rose-500/10',
    borderBadge: 'border-rose-500/30',
    textColor: 'text-rose-400',
    icon: 'Activity',
  },
  quiebre_promesa: {
    id: 'quiebre_promesa',
    name: 'Ruptura de Promesa al Cliente & Latencia Inesperada',
    shortName: 'Ruptura de Promesa',
    tagline: 'La distancia entre el discurso comercial y el contacto real',
    description: 'Desfase violento entre la expectativa generada por el área comercial y la capacidad física real del equipo de operaciones.',
    systemicSymptom: 'Plazos de entrega pospuestos a último minuto con excusas cosméticas ante el cliente.',
    lastMileConsequence: 'Pérdida de confianza inmediata, demandas de descuento, cancelaciones y daño reputacional crónico.',
    severity: 'CRÍTICO',
    color: 'from-purple-500 to-indigo-600',
    bgBadge: 'bg-purple-500/10',
    borderBadge: 'border-purple-500/30',
    textColor: 'text-purple-400',
    icon: 'AlertTriangle',
  },
  fuga_margen: {
    id: 'fuga_margen',
    name: 'Fuga Silenciosa de Margen & Rework Oculto',
    shortName: 'Fuga de Margen',
    tagline: 'Erosión invisible de rentabilidad en el momento del delivery',
    description: 'Desperdicio de capital en horas extra no facturables dedicadas a parchar fallas prevenibles en la entrega final.',
    systemicSymptom: 'Proyectos que facturan millones pero generan utilidad neta nula debido al coste de soporte reactivo.',
    lastMileConsequence: 'Quiebra técnica por escala: mientras más clientes entran, menos dinero queda en el balance.',
    severity: 'ALTO',
    color: 'from-emerald-500 to-teal-600',
    bgBadge: 'bg-emerald-500/10',
    borderBadge: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    icon: 'Coins',
  },
  dependencia_heroica: {
    id: 'dependencia_heroica',
    name: 'Colapso por Dependencia Heroica en Última Milla',
    shortName: 'Dependencia Heroica',
    tagline: 'Punto único de fallo personificado en un técnico clave',
    description: 'La entrega del servicio depende de la memoria muscular o la genialidad no transferida de una o dos personas irremplazables.',
    systemicSymptom: 'Pánico directivo si el operador senior enferma o pide vacaciones durante el cierre del mes.',
    lastMileConsequence: 'Parálisis total de la entrega, chantaje operativo tácito y fragilidad existencial de la compañía.',
    severity: 'CRÍTICO',
    color: 'from-blue-500 to-cyan-600',
    bgBadge: 'bg-blue-500/10',
    borderBadge: 'border-blue-500/30',
    textColor: 'text-blue-400',
    icon: 'ShieldAlert',
  },
  asimetria_ceguera: {
    id: 'asimetria_ceguera',
    name: 'Ceguera de Retroalimentación & Desconexión Directiva',
    shortName: 'Ceguera Directiva',
    tagline: 'Semáforos verdes en el informe mientras la trinchera arde',
    description: 'Falta de circuitos de retorno de verdad desde la trinchera hacia el C-Level, ocultando la descomposición del servicio.',
    systemicSymptom: 'Directores celebrando lanzamientos exitosos mientras en soporte los clientes están cancelando sus contratos.',
    lastMileConsequence: 'Decisiones estratégicas erráticas que agravan los problemas reales en vez de resolverlos.',
    severity: 'MODERADO',
    color: 'from-slate-400 to-slate-600',
    bgBadge: 'bg-slate-500/10',
    borderBadge: 'border-slate-500/30',
    textColor: 'text-slate-300',
    icon: 'EyeOff',
  },
};

export interface IpSystemicRiskProfile {
  ip: IpItem;
  primaryFailureMode: LastMileFailureModeId;
  secondaryFailureMode?: LastMileFailureModeId;
  riskReductionScore: number; // 60 - 99
  tier: 'CRITICAL_DAMPENER' | 'HIGH_DAMPENER' | 'MODERATE_DAMPENER';
  lastMileMechanism: string;
  operationalSafeguard: string;
  nextLivedExperienceForClient: string;
  frontlineRelief: string;
}

// Curated overrides for marquee IPs with high frontline dampening impact
const CURATED_RISK_PROFILES: Record<string, Partial<IpSystemicRiskProfile>> = {
  'IP-081': {
    primaryFailureMode: 'dependencia_heroica',
    secondaryFailureMode: 'friccion_handoff',
    riskReductionScore: 98,
    tier: 'CRITICAL_DAMPENER',
    lastMileMechanism: 'Inversión de Dependencia: Transfiere el control de ejecución a interfaces parametrizadas y contratos de datos independientes de personas.',
    operationalSafeguard: 'El operador de trinchera no requiere consultar al creador del código ni al fundador para liberar entregas.',
    nextLivedExperienceForClient: 'Entrega sin demoras; el servicio no sufre retrasos por vacaciones o rotación interna.',
    frontlineRelief: 'Elimina el pánico de tener que "adivinar" la intención del fundador o de un senior ausente.',
  },
  'IP-032': {
    primaryFailureMode: 'dependencia_heroica',
    secondaryFailureMode: 'fatiga_sobrecarga',
    riskReductionScore: 96,
    tier: 'CRITICAL_DAMPENER',
    lastMileMechanism: 'Escalabilidad sin Héroes: Diseña las operaciones para operar con talento promedio entrenado mediante guardarraíles deterministas.',
    operationalSafeguard: 'Ninguna persona individual puede ser extorsionada por la carga de trabajo del día pico.',
    nextLivedExperienceForClient: 'Consistencia absoluta de calidad: no importa qué técnico atienda, el resultado es idéntico.',
    frontlineRelief: 'Se acabaron las jornadas de 14 horas de "salvadores del día"; la carga se distribuye mecánicamente.',
  },
  'IP-001': {
    primaryFailureMode: 'asimetria_ceguera',
    secondaryFailureMode: 'friccion_handoff',
    riskReductionScore: 95,
    tier: 'CRITICAL_DAMPENER',
    lastMileMechanism: 'Auditoría de Divergencia (Estrategia vs. Última Milla): Diagnostica la brecha entre el plan de escritorio y la trinchera real.',
    operationalSafeguard: 'Revela los manuales y atajos clandestinos que el equipo usa para no ser castigado por metas absurdas.',
    nextLivedExperienceForClient: 'Fin a las promesas comerciales vacías; lo que se promete coincide exactamente con lo entregado.',
    frontlineRelief: 'El operador deja de ser el chivo expiatorio cuando una estrategia mal diseñada choca con la realidad.',
  },
  'IP-007': {
    primaryFailureMode: 'friccion_handoff',
    secondaryFailureMode: 'dependencia_heroica',
    riskReductionScore: 94,
    tier: 'CRITICAL_DAMPENER',
    lastMileMechanism: 'Deslinde de Responsabilidad Fractal: Define contratos de frontera claros con entradas y salidas inequívocas entre áreas.',
    operationalSafeguard: 'Regla de cero ambigüedad: cada entregable tiene un único dueño de estado y un criterio booleano de aceptación.',
    nextLivedExperienceForClient: 'Resolución de problemas en un solo punto de contacto, sin el clásico peloteo de "eso le toca a otro departamento".',
    frontlineRelief: 'No más reuniones estériles de culpas cruzadas; las fronteras de responsabilidad son matemáticas.',
  },
  'IP-018': {
    primaryFailureMode: 'quiebre_promesa',
    secondaryFailureMode: 'fuga_margen',
    riskReductionScore: 95,
    tier: 'CRITICAL_DAMPENER',
    lastMileMechanism: 'SLA Relacional y Contrato Fractal: Sustituye SLAs burocráticos por compromisos de circuito cerrado y amortiguadores de variabilidad.',
    operationalSafeguard: 'Si un input entra fuera de especificación, se activa un protocolo de contingencia pre-aprobado sin detener la línea.',
    nextLivedExperienceForClient: 'Certeza horaria y transparencia en tiempo real: sin silencios tensos ni respuestas evasivas.',
    frontlineRelief: 'El operador tiene autoridad reglamentada para rechazar inputs defectuosos de otras áreas.',
  },
  'IP-023': {
    primaryFailureMode: 'fuga_margen',
    secondaryFailureMode: 'quiebre_promesa',
    riskReductionScore: 92,
    tier: 'CRITICAL_DAMPENER',
    lastMileMechanism: 'Detección Temprana de Fuga de Margen: Mide el retrabajo y el coste invisible de parches en tiempo real por cada ticket.',
    operationalSafeguard: 'Triggers automáticos que congelan un lote o cuenta antes de que el coste de remediación supere el valor del contrato.',
    nextLivedExperienceForClient: 'Precios estables y compromisos que la empresa puede cumplir a largo plazo sin degradar el soporte.',
    frontlineRelief: 'Se erradica la presión de regalar horas no registradas para disimular defectos de diseño.',
  },
  'IP-054': {
    primaryFailureMode: 'fatiga_sobrecarga',
    secondaryFailureMode: 'friccion_handoff',
    riskReductionScore: 93,
    tier: 'CRITICAL_DAMPENER',
    lastMileMechanism: 'Buffers Cognitivos y Protección de Atención: Reserva obligatoria de 20% de capacidad operativa para absorber turbulencia.',
    operationalSafeguard: 'Prohíbe la utilización al 100% de la capacidad nominal, evitando el colapso por ley de colas de espera.',
    nextLivedExperienceForClient: 'Capacidad de respuesta inmediata ante urgencias reales, sin desestabilizar las entregas normales.',
    frontlineRelief: 'Respiro biológico: el operador tiene margen para pensar, verificar y descansar antes del siguiente ciclo.',
  },
  'IP-044': {
    primaryFailureMode: 'friccion_handoff',
    secondaryFailureMode: 'quiebre_promesa',
    riskReductionScore: 91,
    tier: 'CRITICAL_DAMPENER',
    lastMileMechanism: 'Protocolo de Handoff Cero Ambigüedad: Lista de verificación de 4 estados antes de que una tarea cambie de nodo.',
    operationalSafeguard: 'No se permite transferir un entregable en estado "medio listo"; o está cerrado o permanece en origen.',
    nextLivedExperienceForClient: 'Entregables que funcionan a la primera, sin piezas faltantes ni configuraciones incompletas.',
    frontlineRelief: 'Nunca más recibir un "muerto" lanzado por otra área sin documentación ni contexto.',
  },
  'IP-012': {
    primaryFailureMode: 'fatiga_sobrecarga',
    secondaryFailureMode: 'dependencia_heroica',
    riskReductionScore: 92,
    tier: 'CRITICAL_DAMPENER',
    lastMileMechanism: 'Guardarraíles de Trinchera: Reglas heurísticas simples de parada de emergencia accesibles para cualquier nivel jerárquico.',
    operationalSafeguard: 'Cualquier operador puede detener la línea si detecta un breakpoint crítico, sin represalias.',
    nextLivedExperienceForClient: 'Cero defectos graves llegando a producción o a sus manos; la contención ocurre adentro.',
    frontlineRelief: 'Paz mental de no tener que justificar una decisión prudente que salvó a la compañía.',
  },
  'IP-067': {
    primaryFailureMode: 'asimetria_ceguera',
    secondaryFailureMode: 'quiebre_promesa',
    riskReductionScore: 90,
    tier: 'CRITICAL_DAMPENER',
    lastMileMechanism: 'Sensor de Tensión de Primera Línea: Barómetro asíncrono diario que mide fricción real de herramientas y bloqueos.',
    operationalSafeguard: 'La dirección visualiza el calor térmico de los equipos antes de que se manifieste en quejas de clientes.',
    nextLivedExperienceForClient: 'Una organización que aprende y mejora constantemente en vez de repetir el mismo error cada mes.',
    frontlineRelief: 'Voz directa y anónima que se traduce en presupuestos para arreglar las herramientas que fallan.',
  },
  'IP-087': {
    primaryFailureMode: 'asimetria_ceguera',
    secondaryFailureMode: 'dependencia_heroica',
    riskReductionScore: 94,
    tier: 'CRITICAL_DAMPENER',
    lastMileMechanism: 'Breakpoint Scanner Sistémico: Auditoría forense de los 10 puntos de fallo catastrófico más probables.',
    operationalSafeguard: 'Simulación de fallas no programadas (caída de servidor, ausencia de líder, cancelación masiva).',
    nextLivedExperienceForClient: 'Resiliencia institucional ante crisis externas: la empresa sigue operando pase lo que pase.',
    frontlineRelief: 'Planes de contingencia preparados; nadie tiene que improvisar en medio de un incendio nocturno.',
  },
};

// Algorithmic mapper to ensure 100% of the 87 IPs have a full risk reduction profile
export const getAllIpRiskProfiles = (): IpSystemicRiskProfile[] => {
  return ALL_IPS.map((ip) => {
    const code = ip.code || ip.id;
    const curated = CURATED_RISK_PROFILES[code];

    if (curated && curated.primaryFailureMode && curated.riskReductionScore) {
      return {
        ip,
        primaryFailureMode: curated.primaryFailureMode,
        secondaryFailureMode: curated.secondaryFailureMode,
        riskReductionScore: curated.riskReductionScore,
        tier: curated.tier || (curated.riskReductionScore >= 90 ? 'CRITICAL_DAMPENER' : 'HIGH_DAMPENER'),
        lastMileMechanism: curated.lastMileMechanism || ip.purpose,
        operationalSafeguard: curated.operationalSafeguard || ip.criticalConditions[0] || 'Guardarraíl de parada automática.',
        nextLivedExperienceForClient: curated.nextLivedExperienceForClient || 'Predictibilidad y cumplimiento riguroso en tiempo real.',
        frontlineRelief: curated.frontlineRelief || 'Reducción de ambigüedad y eliminación de culpas en la ejecución.',
      };
    }

    // Algorithmic assignment based on category and textual heuristics
    let primaryFailureMode: LastMileFailureModeId = 'friccion_handoff';
    let secondaryFailureMode: LastMileFailureModeId | undefined;

    switch (ip.category) {
      case 'divergencia_estrategia_realidad':
        primaryFailureMode = 'asimetria_ceguera';
        secondaryFailureMode = 'friccion_handoff';
        break;
      case 'escalabilidad_sin_heroes':
        primaryFailureMode = 'dependencia_heroica';
        secondaryFailureMode = 'fatiga_sobrecarga';
        break;
      case 'talento_cargas':
        primaryFailureMode = 'fatiga_sobrecarga';
        secondaryFailureMode = 'dependencia_heroica';
        break;
      case 'capital_economics':
        primaryFailureMode = 'fuga_margen';
        secondaryFailureMode = 'quiebre_promesa';
        break;
      case 'riesgo_breakpoints':
        primaryFailureMode = 'quiebre_promesa';
        secondaryFailureMode = 'asimetria_ceguera';
        break;
      case 'producto_oferta_modelos':
        primaryFailureMode = 'quiebre_promesa';
        secondaryFailureMode = 'fuga_margen';
        break;
      case 'criterio_gobernanza_fractal':
        primaryFailureMode = 'friccion_handoff';
        secondaryFailureMode = 'dependencia_heroica';
        break;
      case 'metodologia_trinchera':
      default:
        primaryFailureMode = 'fatiga_sobrecarga';
        secondaryFailureMode = 'friccion_handoff';
        break;
    }

    // Calculate score based on immediate applicability + baseline
    const baseScore = Math.min(96, Math.max(72, Math.round(ip.immediateApplicability * 0.92 + (ip.crossLinks.length * 1.5))));
    const tier: IpSystemicRiskProfile['tier'] = 
      baseScore >= 90 ? 'CRITICAL_DAMPENER' : baseScore >= 80 ? 'HIGH_DAMPENER' : 'MODERATE_DAMPENER';

    return {
      ip,
      primaryFailureMode,
      secondaryFailureMode,
      riskReductionScore: baseScore,
      tier,
      lastMileMechanism: `${ip.name}: ${ip.purpose}`,
      operationalSafeguard: ip.criticalConditions[0] || 'Validación booleana de inputs antes de comprometer entregas.',
      nextLivedExperienceForClient: 'Entrega transparente, sin sorpresas en facturación ni retrasos no avisados.',
      frontlineRelief: 'Pautas claras que blindan al operador de la improvisación directiva.',
    };
  });
};

export const getRiskStats = () => {
  const profiles = getAllIpRiskProfiles();
  const total = profiles.length;
  const criticalCount = profiles.filter((p) => p.tier === 'CRITICAL_DAMPENER').length;
  const highCount = profiles.filter((p) => p.tier === 'HIGH_DAMPENER').length;
  const averageReduction = Math.round(profiles.reduce((sum, p) => sum + p.riskReductionScore, 0) / (total || 1));

  const byFailureMode = profiles.reduce<Record<LastMileFailureModeId, number>>((acc, curr) => {
    acc[curr.primaryFailureMode] = (acc[curr.primaryFailureMode] || 0) + 1;
    return acc;
  }, {
    friccion_handoff: 0,
    fatiga_sobrecarga: 0,
    quiebre_promesa: 0,
    fuga_margen: 0,
    dependencia_heroica: 0,
    asimetria_ceguera: 0,
  });

  return {
    total,
    criticalCount,
    highCount,
    averageReduction,
    byFailureMode,
  };
};
