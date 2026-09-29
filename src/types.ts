export type IpType = 
  | 'Framework'
  | 'Matrix'
  | 'Method'
  | 'Architecture'
  | 'System'
  | 'Protocol'
  | 'Principle'
  | 'Diagnostic / Scanner'
  | 'Rule / Heuristic'
  | 'Process'
  | 'Model';

export type ProblemCategory =
  | 'talento_cargas'
  | 'divergencia_estrategia_realidad'
  | 'escalabilidad_sin_heroes'
  | 'capital_economics'
  | 'riesgo_breakpoints'
  | 'producto_oferta_modelos'
  | 'criterio_gobernanza_fractal'
  | 'metodologia_trinchera';

export type CrossLinkRelation = 
  | 'alimenta'
  | 'depende_de'
  | 'valida'
  | 'extiende'
  | 'operacionaliza'
  | 'deconstruye'
  | 'especializa'
  | 'sinergia'
  | 'previene'
  | 'aplica'
  | 'fundamenta'
  | 'utiliza'
  | 'componente_de'
  | 'cobra_mediante'
  | 'secuencia'
  | 'cumple_con'
  | 'ejecuta'
  | 'condicion_critica'
  | 'prerequisito'
  | 'gobierna'
  | 'obedece'
  | 'fase_final'
  | 'engloba'
  | string;

export interface CrossLink {
  targetId: string;
  relation: CrossLinkRelation;
  description: string;
}

export interface IpItem {
  id: string; // e.g. "IP-001"
  code: string; // e.g. "IP-001"
  name: string;
  alternateNames?: string[];
  type: IpType;
  immediateApplicability: number; // 80 - 100
  category: ProblemCategory;
  categoryLabel: string;
  
  // Required core forensic extractions:
  purpose: string; // Para qué se usa
  inputs: string[]; // Datos de input
  outputs: string[]; // Datos de output
  usageRanges: string; // Rangos de uso (dónde/cuándo aplica, umbrales de capital/equipo)
  criticalConditions: string[]; // Condiciones críticas y breakpoints (condición de fallo)

  // Real world application vs SOP breaches:
  industry: string; // Industria primaria
  industryUseCase: string; // Caso de ejemplo de uso real
  industrySopBreach: string; // Brechas que tienen los SOPs tradicionales de esa industria
  
  // Decision-maker metadata:
  primaryActors: string; // Decisores, C-Levels, Directores de Operaciones, etc.
  resourceImpact: string; // Impacto en capital, tiempo, riesgo o personas
  crossLinks: CrossLink[]; // Cruce en su funcionamiento
  formulaOrRule?: string; // Regla o fórmula clave
}

export interface CategoryInfo {
  id: ProblemCategory;
  name: string;
  shortDesc: string;
  problemSolved: string;
  traditionalFailure: string;
  systemicSolution: string;
  iconName: string;
}

export interface IndustrySopMapItem {
  industry: string;
  sector: string;
  typicalSopFailure: string;
  costOfBreach: string;
  solvingIps: string[]; // array of IP ids
  caseStudyTitle: string;
  caseStudySummary: string;
  beforeMetric: string;
  afterMetric: string;
}

export interface PostMortemPreset {
  id: string;
  title: string;
  category: ProblemCategory;
  industry: string;
  affectedArea: string;
  businessImpact: string;
  teamContext: string;
  summary: string;
  incidentLogs: string;
}

export type ExecutiveRole = 'operador_trinchera' | 'mando_medio_lead' | 'c_level_fundador';
export type CognitiveLoadLevel = 'critica_saturada' | 'moderada_tension' | 'controlada_estrategica';

export interface GovernanceDiagnostic {
  diagnosis: string;
  rootCauseCategory: ProblemCategory;
  traditionalSopFailure: string;
  rolePerspectiveOutput: {
    role: ExecutiveRole;
    cognitiveLoadHandling: string;
    actionPrioritization: string;
  };
  recommendedIps: {
    code: string;
    name: string;
    action: string;
    whyItPrevents: string;
    inputsNeeded: string[];
    outputGenerated: string;
  }[];
  realTimeTraceabilityStepByStep: {
    step: number;
    phase: string;
    trigger: string;
    ipApplied: string;
    verificationMetric: string;
  }[];
  operatorDescompressionTactics: string[];
  fractalGovernanceContract: string;
  gisImpactEstimated: string;
}

export interface SupportChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

