import { IpItem } from '../types';
import { ALL_IPS, getIpById } from './ipsData';

export type ConflictSeverity = 'CRITICAL' | 'HIGH' | 'MODERATE';

export type ConflictType = 
  | 'RESOURCE_CONTENTION'       // Ambas IPs demandan o consumen el mismo recurso escaso
  | 'OPERATIONAL_TENSION'       // Objetivos operacionales en tensión directa (ej. velocidad vs compuerta síncrona)
  | 'SEQUENCING_PREREQUISITE'   // Una IP asume condiciones que otra aún no ha construido
  | 'GOVERNANCE_PARADOX';       // Paradoja de autoridad o frontera de decisión

export interface ConflictRule {
  ipA_code: string;
  ipB_code: string;
  conflictType: ConflictType;
  severity: ConflictSeverity;
  title: string;
  resourceName: string;
  requiredByA: string;
  consumedByB: string;
  explanation: string;
  remediation: string;
  arbitratingIpCode?: string;
  suggestedSequence?: string;
}

export interface PortfolioConflict {
  id: string;
  ipA: IpItem;
  ipB: IpItem;
  conflictType: ConflictType;
  severity: ConflictSeverity;
  title: string;
  resourceName: string;
  requiredByA: string;
  consumedByB: string;
  explanation: string;
  remediation: string;
  arbitratingIp?: IpItem;
  suggestedSequence?: string;
}

export interface PortfolioSynergy {
  ipA: IpItem;
  ipB: IpItem;
  title: string;
  description: string;
}

export interface PortfolioConsistencyReport {
  portfolioIps: IpItem[];
  coherenceScore: number; // 0 - 100
  status: 'OPTIMAL' | 'MODERATE_TENSION' | 'CRITICAL_CONFLICT';
  statusLabel: string;
  statusDescription: string;
  conflicts: PortfolioConflict[];
  synergies: PortfolioSynergy[];
  resourceBalance: {
    executiveBandwidth: 'BALANCED' | 'DEFICIT' | 'SURPLUS';
    frontlineBuffer: 'PROTECTED' | 'AT_RISK' | 'EXHAUSTED';
    decisionAutonomy: 'CLEAR' | 'AMBIGUOUS' | 'CENTRALIZED';
  };
}

// Curated Conflict Knowledge Graph between specific IPs
const CONFLICT_RULES: ConflictRule[] = [
  {
    ipA_code: 'IP-080',
    ipB_code: 'IP-032',
    conflictType: 'RESOURCE_CONTENTION',
    severity: 'HIGH',
    title: 'Competencia por Ancho de Banda Ejecutivo y Presencia del Fundador',
    resourceName: 'Tiempo de Presencia y Escaneo del Fundador',
    requiredByA: 'IP-080 (Divergence Audit) requiere inmersión forense profunda del C-Level para confrontar divergencias reales de trinchera.',
    consumedByB: 'IP-032 (Chief of Scalability) exige desconexión física inmediata del fundador para forzar la autonomía de flujos.',
    explanation: 'Si se intentan ejecutar simultáneamente sin secuenciación, el fundador sufre agotamiento extremo: el sistema le exige auditar la divergencia mientras la otra IP le exige retirarse de la supervisión.',
    remediation: 'Secuenciar temporalmente: Ejecutar primero IP-080 en fase T0 (auditar y diagnosticar puntos ciegos) y solo entonces activar IP-032 en fase T1 (desacoplar al fundador).',
    suggestedSequence: 'Fase 1: IP-080 (Diagnóstico T0) ➔ Fase 2: IP-032 (Escalamiento Autónomo T1)',
    arbitratingIpCode: 'IP-081',
  },
  {
    ipA_code: 'IP-054',
    ipB_code: 'IP-031',
    conflictType: 'RESOURCE_CONTENTION',
    severity: 'CRITICAL',
    title: 'Fricción de Capacidad: Buffer Protegido vs. Saturación de Tracción',
    resourceName: 'Buffer de Capacidad Operativa (Margen del 20%)',
    requiredByA: 'IP-054 (Buffers Cognitivos) exige reservar obligatoriamente el 20% de la capacidad operativa como amortiguador termodinámico ante turbulencias.',
    consumedByB: 'IP-031 (Framework Meta JJ) optimiza agresivamente la línea de recursos para maximizar la tracción de diferenciales y la velocidad de entrega.',
    explanation: 'La presión comercial por capturar mercado puede canibalizar el 20% de reserva de IP-054. Si el equipo satura la capacidad al 100%, la ley de colas de espera provocará colapso de latencia en la última milla.',
    remediation: 'Fijar el buffer del 20% de IP-054 como límite constitucional infranqueable antes de calibrar la oferta con IP-031.',
    suggestedSequence: 'Establecer buffer (IP-054) ➔ Modularizar producto con ese límite (IP-031)',
    arbitratingIpCode: 'IP-018',
  },
  {
    ipA_code: 'IP-044',
    ipB_code: 'IP-071',
    conflictType: 'OPERATIONAL_TENSION',
    severity: 'MODERATE',
    title: 'Tensión de Latencia: Compuerta Síncrona vs. Entrega Continua Autónoma',
    resourceName: 'Latencia y Velocidad de Handoff entre Nodos',
    requiredByA: 'IP-044 (Protocolo de Handoff Cero Ambigüedad) impone una verificación síncrona obligatoria de 4 estados antes de liberar cualquier entregable.',
    consumedByB: 'IP-071 (Arquitectura de Entrega Anticipada) busca flujo asíncrono continuo y reducción radical de tiempos de espera para el cliente.',
    explanation: 'Si las 4 verificaciones de IP-044 se ejecutan de manera manual o burocrática, generan un embotellamiento artificial que anula la ventaja de velocidad de IP-071.',
    remediation: 'Automatizar las compuertas de IP-044 mediante checklists booleanos digitales integrados directamente al flujo de entrega.',
    suggestedSequence: 'Digitalizar criterios booleanos de IP-044 para no frenar la latencia de IP-071.',
    arbitratingIpCode: 'IP-079',
  },
  {
    ipA_code: 'IP-003',
    ipB_code: 'IP-078',
    conflictType: 'GOVERNANCE_PARADOX',
    severity: 'HIGH',
    title: 'Paradoja de Criterio: Autonomía de Nodo vs. Custodia Central de Fractalis',
    resourceName: 'Soberanía de Decisión en Frontera de Nodo',
    requiredByA: 'IP-003 (Nodos Autodefinidos) otorga libertad al nodo para reconfigurar su alcance según la fricción real que observa en la trinchera.',
    consumedByB: 'IP-078 (Arquitectura Fractalis) mantiene la potestad de vetar o expulsar nodos que alteren la identidad o los principios compartidos.',
    explanation: 'Riesgo de mando cruzado o conflicto de legitimidad: el operador de trinchera siente que tiene autonomía para ajustar procesos, pero la auditoría de criterio de Fractalis puede interpretarlo como una desviación no autorizada.',
    remediation: 'Introducir IP-007 (Deslinde de Responsabilidad Fractal) o IP-079 para fijar explícitamente las 10 Cláusulas de frontera: qué decisiones son 100% locales del nodo y cuáles requieren veto de Fractalis.',
    suggestedSequence: 'Delimitar fronteras contractuales mediante IP-079 antes de habilitar nodos de IP-003.',
    arbitratingIpCode: 'IP-007',
  },
  {
    ipA_code: 'IP-081',
    ipB_code: 'IP-001',
    conflictType: 'SEQUENCING_PREREQUISITE',
    severity: 'MODERATE',
    title: 'Secuenciación de Despersonalización: Devolución sin Mapa de Brecha Previo',
    resourceName: 'Claridad de Responsabilidad sin Resistencia Política',
    requiredByA: 'IP-081 (Protocolo de Dependencia Invertida) devuelve el ownership del cuello de botella al dueño del sistema.',
    consumedByB: 'IP-001 (Auditoría de Divergencia) revela la evidencia empírica de por qué el sistema actual estaba ocultando ese costo.',
    explanation: 'Si intentas devolver la responsabilidad (IP-081) antes de que la junta directiva haya visto el espejo de la divergencia (IP-001), la persona clave reaccionará con pánico o negación sintiéndose abandonada.',
    remediation: 'Asegurar que la fase de "Hacer Visible el Costo" de IP-081 se alimente con los datos de campo generados por IP-001.',
    suggestedSequence: 'Ejecutar IP-001 para evidenciar el costo ➔ Aplicar IP-081 para devolver el ownership.',
    arbitratingIpCode: 'IP-080',
  },
  {
    ipA_code: 'IP-063',
    ipB_code: 'IP-041',
    conflictType: 'RESOURCE_CONTENTION',
    severity: 'HIGH',
    title: 'Fricción Contractual: Demarcación Rígida vs. SLA Relacional Dinámico',
    resourceName: 'Flexibilidad de Servicio en Casos de Borde',
    requiredByA: 'IP-063 (Demarcación de Responsabilidad) corta de raíz cualquier solicitud fuera de contrato para proteger el margen.',
    consumedByB: 'IP-041 (SLA Relacional) busca acomodar variaciones legítimas del cliente mediante amortiguadores negociados.',
    explanation: 'Si la demarcación es excesivamente rígida, el cliente percibe indolencia en momentos de crisis; si el SLA es demasiado flexible, se reactiva la fuga de margen.',
    remediation: 'Utilizar retainers triangulados donde los casos de borde tengan una tarifa de complejidad pre-acordada sin discusión.',
    arbitratingIpCode: 'IP-018',
  },
  {
    ipA_code: 'IP-012',
    ipB_code: 'IP-042',
    conflictType: 'OPERATIONAL_TENSION',
    severity: 'MODERATE',
    title: 'Tensión de Parada de Emergencia vs. Flujo Financiero Ininterrumpido',
    resourceName: 'Continuidad de Flujo Operativo',
    requiredByA: 'IP-012 (Guardarraíles de Trinchera) autoriza la parada inmediata de la línea si se detecta un breakpoint.',
    consumedByB: 'IP-042 (Arquitectura de Flujo de Tesorería) depende de la facturación continua y cadencia estricta de cobro.',
    explanation: 'Una parada no planificada detiene los hitos de facturación. Si la tesorería no tiene buffer pre-asignado, la empresa entra en estrés de caja inmediato.',
    remediation: 'Respaldar las paradas de IP-012 con un colchón de flujo de caja mínimo de 30 días garantizado por la dirección.',
    arbitratingIpCode: 'IP-062',
  },
  {
    ipA_code: 'IP-068',
    ipB_code: 'IP-081',
    conflictType: 'RESOURCE_CONTENTION',
    severity: 'MODERATE',
    title: 'Tensión de Supervisión: Auditoría Periódica vs. Desacoplamiento Radical',
    resourceName: 'Atención del Equipo de Auditoría',
    requiredByA: 'IP-068 requiere ciclos regulares de revisión de cargas y evaluación de fricción.',
    consumedByB: 'IP-081 busca que el sistema sea autogestionado por contratos sin intervención de inspectores.',
    explanation: 'Supervisión redundante puede transmitir desconfianza hacia la autonomía recién concedida.',
    remediation: 'Convertir la auditoría de IP-068 en un dashboard asíncrono con telemetría de fallos, en vez de reuniones de fiscalización.',
    arbitratingIpCode: 'IP-078',
  }
];

// Evaluates any portfolio of IPs for functional conflicts and synergies
export const checkPortfolioConsistency = (
  portfolioIpCodesOrIds: string[],
  allIps: IpItem[] = ALL_IPS
): PortfolioConsistencyReport => {
  const normalizedPortfolioCodes = portfolioIpCodesOrIds.map((item) => {
    const found = allIps.find((i) => i.id === item || i.code === item);
    return found ? (found.code || found.id) : item;
  });

  const portfolioIps = normalizedPortfolioCodes
    .map((code) => allIps.find((ip) => ip.code === code || ip.id === code))
    .filter((ip): ip is IpItem => ip !== undefined);

  const conflicts: PortfolioConflict[] = [];
  const synergies: PortfolioSynergy[] = [];

  // 1. Check Pair-Wise Conflict Rules
  CONFLICT_RULES.forEach((rule) => {
    const hasA = normalizedPortfolioCodes.includes(rule.ipA_code);
    const hasB = normalizedPortfolioCodes.includes(rule.ipB_code);

    if (hasA && hasB) {
      const ipA = allIps.find((i) => i.code === rule.ipA_code || i.id === rule.ipA_code);
      const ipB = allIps.find((i) => i.code === rule.ipB_code || i.id === rule.ipB_code);
      const arbitratingIp = rule.arbitratingIpCode 
        ? allIps.find((i) => i.code === rule.arbitratingIpCode || i.id === rule.arbitratingIpCode)
        : undefined;

      // If the arbitrating IP is ALREADY in the portfolio, reduce severity or resolve!
      const isArbitrated = rule.arbitratingIpCode && normalizedPortfolioCodes.includes(rule.arbitratingIpCode);

      if (ipA && ipB) {
        if (!isArbitrated) {
          conflicts.push({
            id: `conflict-${rule.ipA_code}-${rule.ipB_code}`,
            ipA,
            ipB,
            conflictType: rule.conflictType,
            severity: rule.severity,
            title: rule.title,
            resourceName: rule.resourceName,
            requiredByA: rule.requiredByA,
            consumedByB: rule.consumedByB,
            explanation: rule.explanation,
            remediation: rule.remediation,
            arbitratingIp,
            suggestedSequence: rule.suggestedSequence,
          });
        } else {
          // It's arbitrated! It becomes a mitigated synergy
          synergies.push({
            ipA,
            ipB,
            title: `Conflicto Arbitrado por ${rule.arbitratingIpCode}`,
            description: `La tensión entre ${ipA.code} y ${ipB.code} está exitosamente amortiguada por la presencia de ${rule.arbitratingIpCode}.`,
          });
        }
      }
    }
  });

  // 2. Detect Positive Synergies (Cross-links between active IPs)
  portfolioIps.forEach((ipA) => {
    ipA.crossLinks.forEach((link) => {
      const targetIp = portfolioIps.find((p) => p.id === link.targetId || p.code === link.targetId);
      if (targetIp && targetIp.id !== ipA.id) {
        // Avoid duplicate reverse entries
        const alreadyExists = synergies.some(
          (s) => (s.ipA.id === targetIp.id && s.ipB.id === ipA.id) || (s.ipA.id === ipA.id && s.ipB.id === targetIp.id)
        );
        if (!alreadyExists) {
          synergies.push({
            ipA,
            ipB: targetIp,
            title: `Sinergia Directa: ${link.relation.toUpperCase()}`,
            description: link.description || `${ipA.code} ${link.relation} a ${targetIp.code}`,
          });
        }
      }
    });
  });

  // 3. Compute Coherence Score (0 - 100)
  let score = 100;
  conflicts.forEach((c) => {
    if (c.severity === 'CRITICAL') score -= 25;
    else if (c.severity === 'HIGH') score -= 15;
    else if (c.severity === 'MODERATE') score -= 8;
  });

  // Synergies give a small resilience buffer back (up to +15)
  const synergyBonus = Math.min(15, synergies.length * 3);
  score = Math.max(20, Math.min(100, score + synergyBonus));

  // Determine overall status
  let status: PortfolioConsistencyReport['status'] = 'OPTIMAL';
  let statusLabel = 'Arquitectura Coherente & Equilibrada';
  let statusDescription = 'No se detectaron contradicciones operacionales ni competencia destructiva por recursos.';

  if (conflicts.some((c) => c.severity === 'CRITICAL') || score < 70) {
    status = 'CRITICAL_CONFLICT';
    statusLabel = 'Conflicto Crítico de Recursos Detectado';
    statusDescription = 'Una o más IPs requieren recursos o condiciones que otra IP seleccionada restringe o consume activamente.';
  } else if (conflicts.length > 0) {
    status = 'MODERATE_TENSION';
    statusLabel = 'Tensión Operativa de Secuenciación';
    statusDescription = 'Las IPs son compatibles pero requieren ejecutarse en fases secuenciales para evitar sobrecarga.';
  }

  // Resource balance indicators
  const hasExecutiveDrain = conflicts.some(
    (c) => c.resourceName.toLowerCase().includes('ejecutivo') || c.resourceName.toLowerCase().includes('fundador')
  );
  const hasBufferRisk = conflicts.some(
    (c) => c.resourceName.toLowerCase().includes('buffer') || c.resourceName.toLowerCase().includes('capacidad')
  );
  const hasAutonomyTension = conflicts.some(
    (c) => c.conflictType === 'GOVERNANCE_PARADOX' || c.resourceName.toLowerCase().includes('soberanía')
  );

  return {
    portfolioIps,
    coherenceScore: score,
    status,
    statusLabel,
    statusDescription,
    conflicts,
    synergies,
    resourceBalance: {
      executiveBandwidth: hasExecutiveDrain ? 'DEFICIT' : 'BALANCED',
      frontlineBuffer: hasBufferRisk ? 'AT_RISK' : 'PROTECTED',
      decisionAutonomy: hasAutonomyTension ? 'AMBIGUOUS' : 'CLEAR',
    },
  };
};
