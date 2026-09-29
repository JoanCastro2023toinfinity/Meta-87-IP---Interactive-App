import { IpItem } from '../types';

export interface SopGapMismatch {
  id: string;
  title: string;
  industry: string;
  sector: string;
  severity: 'critical' | 'high' | 'moderate';
  sopFragilityPattern: string; // The flawed traditional SOP pattern
  trenchSymptom: string; // What happens in reality (the trench symptom)
  costOfInaction: string;
  keyHighImpactIps: string[]; // Codes e.g. ['IP-041', 'IP-068', 'IP-046']
  remediationTrigger: string;
  defaultRole: 'operador_trinchera' | 'mando_medio_lead' | 'c_level_fundador';
  suggestedPresetId?: string; // Links to existing post-mortem preset if matching
  promptDraft: {
    incidentTitle: string;
    affectedArea: string;
    businessImpact: string;
    teamContext: string;
    summary: string;
    incidentLogs: string;
  };
}

export const SOP_GAP_MISMATCHES: SopGapMismatch[] = [
  {
    id: 'gap-01-blind-assembly-vs-rigid-sla',
    title: 'SOPs Rígidos de SLA vs. Ambigüedad de Entrada (Ausencia de Ensamble Ciego)',
    industry: 'BPO, Contact Centers & Mesa de Ayuda',
    sector: 'Operaciones de Soporte y Servicios',
    severity: 'critical',
    sopFragilityPattern: 'El manual impone tiempos máximos de respuesta (ej. "< 15 minutos") sin exigir calidad mínima ni estructura a los requerimientos entrantes.',
    trenchSymptom: 'Los operadores L1/L2 reciben tickets vagos ("no funciona el sistema"), sufren fatiga cognitiva intentando descifrar el problema y el ticket rebota 4 veces antes de escalarse a ingeniería.',
    costOfInaction: 'Rotación del 38% en operadores, CSAT desplomado de 92% a 68% y costos de retrabajo de $9,400 USD/semana.',
    keyHighImpactIps: ['IP-068', 'IP-046', 'IP-041'],
    remediationTrigger: 'Entrada masiva de tickets con datos incompletos colapsando la cola de atención',
    defaultRole: 'operador_trinchera',
    suggestedPresetId: 'pm-01-last-mile-burnout',
    promptDraft: {
      incidentTitle: 'Brecha Crítica: SLA Rígido sin Validación de Insumos Entrantes (Colapso L1/L2)',
      affectedArea: 'Mesa de Ayuda, Soporte L1/L2 y Operadores de Turno',
      businessImpact: 'Aumento de 420% en tickets reabiertos, penalizaciones de SLA y 4 renuncias de operadores en 15 días.',
      teamContext: '8 operadores atendiendo 650 tickets diarios sin filtro de entrada ni potestad de veto.',
      summary: 'El SOP corporativo exige contestar en < 15 min pero no valida que el cliente envíe logs o datos de error. Los operadores improvisan respuestas superficiales para evitar multas de SLA, generando quejas masivas.',
      incidentLogs: `[10:15] Ticket #4821 recibido: "No puedo entrar, arreglar ya".
[10:25] Operador responde con plantilla genérica para cerrar timer de SLA.
[10:45] Cliente califica 1 estrella furioso. Escalamiento a Squad Lead.
[11:30] Squad Lead: "Llevo 3 horas apagando fuegos de tickets mal tipificados".`
    }
  },
  {
    id: 'gap-02-founder-firefighting-bottleneck',
    title: 'Aprobación Monolítica Centralizada vs. Delegación Fractal con Veto',
    industry: 'Startups Tecnológicas & Scale-Ups',
    sector: 'Tecnología e Hipercrecimiento',
    severity: 'critical',
    sopFragilityPattern: 'Los procedimientos de gobierno exigen que toda excepción técnica, descuento comercial o contratación de emergencia pase por firma del CEO o CTO.',
    trenchSymptom: 'Cuello de botella terminal: releases congelados, clientes esperando propuestas durante 3 semanas y fundadores con jornadas de 16 horas actuando como apagafuegos humanos.',
    costOfInaction: 'Parálisis operativa total durante viajes del CEO, pérdida de deals clave de $150k+ y desmotivación severa de mandos medios.',
    keyHighImpactIps: ['IP-081', 'IP-082', 'IP-079', 'IP-041'],
    remediationTrigger: 'Reuniones de emergencia diarias donde el CEO decide excepciones operativas repetitivas',
    defaultRole: 'c_level_fundador',
    suggestedPresetId: 'pm-02-founder-paralysis-onboarding',
    promptDraft: {
      incidentTitle: 'Brecha Crítica: Secuestro de la Capacidad Directiva por Falta de Inversión de Dependencia',
      affectedArea: 'Dirección General, Operaciones y Squad Leads',
      businessImpact: 'Pipeline comercial demorado 22 días; agotamiento del fundador y parálisis de lanzamientos.',
      teamContext: 'El equipo creció a 35 personas pero el fundador sigue aprobando cada descuento y excepción de entrega.',
      summary: 'No existen reglas de veto ni contratos inteligentes de criterio (Smart Contracts of Criterion). Cualquier desviación de los manuales termina en el escritorio del CEO, volviéndolo el punto único de fallo.',
      incidentLogs: `[Lunes 09:00] 14 hilos de Slack bloqueados con la frase "¿Alguien consultó esto con el CEO?".
[Miércoles 15:00] CEO no responde por estar en ronda de inversión; 3 clientes pausan contratos.
[Viernes 18:00] Retrospectiva de equipo: "No pudimos avanzar porque faltó aprobación de gerencia".`
    }
  },
  {
    id: 'gap-03-margin-erosion-custom-dilution',
    title: 'Pricing Lineal por Horas / Cost-Plus vs. Triangulación de Margen 50%+ y Breakpoint',
    industry: 'Servicios Profesionales, Software B2B & Consultoría',
    sector: 'Servicios Corporativos & Enterprise',
    severity: 'high',
    sopFragilityPattern: 'SOP comercial clásico de pricing basado en "costo de hora hombre + 25%" y contratos con alcance abierto ("desarrollo a medida continuo").',
    trenchSymptom: 'A mayor facturación bruta, menor margen neto. Clientes corporativos demandan 40 cambios no presupuestados y los márgenes caen al 8% o entran en pérdida.',
    costOfInaction: 'Erosión del 34% del margen operativo, dilución de recursos en features no reproducibles y riesgo de quiebra técnica.',
    keyHighImpactIps: ['IP-067', 'IP-070', 'IP-044', 'IP-031'],
    remediationTrigger: 'Aumento en ingresos con desplome simultáneo del flujo de caja disponible',
    defaultRole: 'c_level_fundador',
    suggestedPresetId: 'pm-06-ghost-custom-features-dilution',
    promptDraft: {
      incidentTitle: 'Brecha Crítica: Dilución del Margen Bruto por Alcance Abierto y Pricing Lineal',
      affectedArea: 'Finanzas, Delivery de Proyectos y Comercial',
      businessImpact: 'Margen real cayó de 45% proyectado a 7.8%; retraso de 3 meses en proyectos troncales.',
      teamContext: 'Ventas cerró un cliente enterprise con soporte dedicado sin fijar cláusulas de contrapeso ni costo de breakpoint.',
      summary: 'El modelo tradicional de facturación por horas asumió linealidad y absorbió la entropía del cliente corporativo. El equipo técnico quedó secuestrado apagando requerimientos bespoke sin remuneración adicional.',
      incidentLogs: `[Mes 1] Contrato firmado: "Soporte e iteraciones continuas para cliente Platino".
[Mes 2] 38 peticiones de cambio fuera de roadmap ingresadas sin costo extra.
[Mes 3] CFO reporta: "El cliente Platino consume el 60% de las horas del squad pero genera el 18% del ingreso".`
    }
  },
  {
    id: 'gap-04-ghost-sop-abandonment',
    title: 'Manuales de 200 Páginas (SOPs Fantasma) vs. Artefactos Desacoplados Autoejecutables',
    industry: 'Retail, Logística & Manufactura',
    sector: 'Cadena de Suministro y Operaciones de Campo',
    severity: 'critical',
    sopFragilityPattern: 'Manuales extensos en PDF guardados en carpetas de red corporativa que nadie lee tras la capacitación inicial.',
    trenchSymptom: 'La operación real se gobierna mediante "hojas de cálculo clandestinas", mensajes informales de WhatsApp y rumores entre operarios veteranos.',
    costOfInaction: 'Pérdidas millonarias por lotes de producto defectuoso, accidentes laborales y total divergencia entre lo que la auditoría cree y lo que la bodega ejecuta.',
    keyHighImpactIps: ['IP-085', 'IP-046', 'IP-068', 'IP-079'],
    remediationTrigger: 'Auditoría interna descubre que el 85% de los despachos no siguen el formulario oficial',
    defaultRole: 'mando_medio_lead',
    suggestedPresetId: 'pm-04-strategy-divergence-abandoned-sop',
    promptDraft: {
      incidentTitle: 'Brecha Crítica: Abandono del SOP Oficial y Gobernanza en la Sombra (Shadow Operations)',
      affectedArea: 'Supervisores de Planta, Bodegueros y Despacho',
      businessImpact: 'Desviación de inventario de $110,000 USD y auditoría regulatoria reprobada.',
      teamContext: 'Manual de 180 páginas implementado por consultores externos hace 6 meses; ignorado por el 100% de la bodega.',
      summary: 'La gerencia cree que la operación cumple el protocolo oficial ISO/SOP, pero en la práctica los operarios crearon un atajo informal porque el formulario oficial tarda 40 minutos en llenarse por despacho.',
      incidentLogs: `[Semana 1] Auditoría revisa carpetas oficiales: "Todo en orden según el checklist".
[Semana 3] Supervisor de bodega admite: "Si llenamos esos 14 formularios, ningún camión sale antes de las 6 PM".
[Semana 4] Descubiertas 9 hojas de cálculo compartidas por Google Drive que coordinan el 92% de los envíos reales.`
    }
  },
  {
    id: 'gap-05-last-mile-panic-no-veto',
    title: 'Algoritmos Centralizados sin Veto Operativo vs. Matriz de Asimetría y Veto de Raíz',
    industry: 'Logística de Última Milla & Delivery Urbano',
    sector: 'Transporte y Movilidad Urbana',
    severity: 'critical',
    sopFragilityPattern: 'El sistema impone un ruteo ciego automatizado y penaliza a los transportistas/despachadores si desvían la ruta sin autorización formal del director regional.',
    trenchSymptom: 'Ante contingencias climáticas o bloqueos viales, los operarios no pueden vetar la asignación del software; se forman cuellos de botella gigantescos y amotinamiento de personal.',
    costOfInaction: 'Penalizaciones de $65,000 USD de marketplaces, mercancía dañada por lluvia y 850 llamadas furiosas de clientes.',
    keyHighImpactIps: ['IP-041', 'IP-046', 'IP-082', 'IP-066'],
    remediationTrigger: 'Condiciones imprevistas en terreno que el software no reconoce pero el operario ve en vivo',
    defaultRole: 'operador_trinchera',
    suggestedPresetId: 'pm-05-last-mile-dispatcher-panic',
    promptDraft: {
      incidentTitle: 'Brecha Crítica: Prohibición de Veto en Trinchera frente a Falla de Software',
      affectedArea: 'Despachadores Urbanos, Repartidores y Servicio al Cliente',
      businessImpact: '3,800 paquetes varados, pérdida de contratos de distribución y colapso de central telefónica.',
      teamContext: '6 despachadores bloqueados por el sistema de ruteo sin permiso de override manual durante una tormenta.',
      summary: 'El SOP prohibía a los operadores modificar rutas sin autorización de un director ausente. Se aplicó una disciplina ciega de proceso que destruyó el valor de negocio y generó amotinamiento.',
      incidentLogs: `[16:15] Sensores indican arterias inundadas; el algoritmo sigue forzando envíos por esas rutas.
[16:30] Despachador intenta anular: "Permiso Denegado - Requiere firma de Gerente de Zona".
[17:15] 45 motoristas varados; llamadas de clientes suben a 1,200 en espera.
[18:00] Gerente llega y pregunta "¿Por qué nadie frenó los envíos a tiempo?".`
    }
  },
  {
    id: 'gap-06-linear-hiring-churn-trap',
    title: 'Contratación Masiva por CV y Títulos vs. Arquitectura Fractal de Vectores Ocean Blues',
    industry: 'Centros de Servicios Compartidos (SSC) & BPO',
    sector: 'Gestión de Talento y Capacidad',
    severity: 'high',
    sopFragilityPattern: 'SOP de reclutamiento filtrando por títulos universitarios, años de experiencia y tests psicométricos estáticos de selección tradicional.',
    trenchSymptom: 'Candidatos con "CV perfecto" y gran desempeño retórico en entrevistas colapsan en los primeros 60 días ante la ambigüedad y la presión cotidiana de la operación.',
    costOfInaction: 'Rotación temprana del 45%, costo de sustitución de $4,500 USD por empleado y clima laboral deteriorado.',
    keyHighImpactIps: ['IP-001', 'IP-002', 'IP-003', 'IP-066'],
    remediationTrigger: 'Tasa de deserción en los primeros 90 días superior al 25% sostenida',
    defaultRole: 'mando_medio_lead',
    suggestedPresetId: 'pm-01-last-mile-burnout',
    promptDraft: {
      incidentTitle: 'Brecha Crítica: La Trampa de la Selección Burocrática de Talento',
      affectedArea: 'Recursos Humanos, Selección y Supervisores de Operaciones',
      businessImpact: 'Pérdida de $54,000 USD en inducción y entrenamiento de personal que renuncia en < 90 días.',
      teamContext: 'El equipo de reclutamiento cumplió el 100% de los requisitos del SOP de contratación tradicional.',
      summary: 'El SOP evalúa permanencia pasada y títulos pero no mide la resistencia a la fricción ni la capacidad de ensamblaje ciego de requerimientos. Los seleccionados no toleran el estrés de trinchera.',
      incidentLogs: `[Mes 1] 15 nuevos analistas contratados con puntaje de entrevista superior a 90/100.
[Mes 2] 6 analistas reportan crisis de ansiedad ante volumen real de tickets.
[Mes 3] 7 renuncias formales; supervisor de operaciones: "La gente que nos manda RRHH no aguanta la cancha".`
    }
  }
];
