import { IpItem } from '../types';

export const IPS_PART_3: IpItem[] = [
  {
    id: 'IP-061',
    code: 'IP-061',
    name: 'Capa 11 - Arquitectura Jurídico-Fiduciaria Multijurisdiccional',
    alternateNames: ['Separación de Operación, IP y Capital', 'Estructura Fiduciaria White-Label'],
    type: 'Architecture',
    immediateApplicability: 85,
    category: 'capital_economics',
    categoryLabel: 'Capital & Economics',
    purpose: 'Separar legal y físicamente la entidad operadora, la titularidad de la propiedad intelectual, el capital y la figura fiduciaria/trustee para aislar riesgos y blindar activos.',
    inputs: ['Activos de IP, software y marcas', 'Entidades operativas comerciales', 'Jurisdicciones regulatorias (ej. Panamá, Delaware, Colombia)'],
    outputs: ['Estructura corporativa con cortafuegos jurídicos', 'Licenciamiento blindado entre entidades'],
    usageRanges: 'Empresas con venta internacional, retención de IP de alto valor o riesgos de litigio operativo.',
    criticalConditions: ['Contratos de licencia inter-compañía debidamente formalizados a precios de transferencia legítimos'],
    industry: 'Holdings, Software, Franquicias y Servicios Transfronterizos',
    industryUseCase: 'Una empresa de software aloja su código e IP en una fiduciaria en Panamá y opera a través de filiales de servicio en México y Colombia, protegiendo el software si una filial quiebra.',
    industrySopBreach: 'Mezclar la operación diaria, la contratación de empleados y la propiedad de la marca en una sola sociedad local, arriesgando toda la empresa ante una demanda.',
    primaryActors: 'Abogados Corporativos, Trustees, Directores de Holding',
    resourceImpact: 'Inmunidad total de la propiedad intelectual frente a problemas operativos o laborales locales.',
    crossLinks: [
      { targetId: 'IP-048', relation: 'sinergia', description: 'Se combina con Zero Estate personal' },
      { targetId: 'IP-016', relation: 'depende_de', description: 'Aplica gobernanza política y macroeconómica' }
    ],
    formulaOrRule: 'IP Ownership ➔ Operating Entity ➔ Client ➔ Licensing ➔ Jurisdiction'
  },
  {
    id: 'IP-062',
    code: 'IP-062',
    name: 'Capa 12 - Principio de Supervivencia Pre-Crisis (Triggers vs. Reacción)',
    alternateNames: ['Gestión de Triggers Pre-Breakpoint', 'Detección Temprana de Falla Sistémica'],
    type: 'Principle',
    immediateApplicability: 95,
    category: 'riesgo_breakpoints',
    categoryLabel: 'Riesgo & Breakpoints',
    purpose: 'Diseñar la supervivencia de la empresa antes de que la crisis acontezca, monitorizando "triggers" matemáticos que activan protocolos preventivos automáticos.',
    inputs: ['Indicadores adelantados (leading indicators)', 'Latencia de respuesta de proveedores', 'Variaciones de margen bruto'],
    outputs: ['Activación de protocolos de contingencia sin esperar la confirmación de la quiebra'],
    usageRanges: 'Gestión de riesgos operativos, control de tesorería y retención de clientes críticos.',
    criticalConditions: ['El protocolo debe activarse de forma refleja cuando se toca el umbral; prohibido dudar o pedir comités de emergencia'],
    industry: 'Finanzas, Manufactura, Transporte y BPO',
    industryUseCase: 'Si el flujo de caja operativo desciende por debajo de 45 días de nómina, el trigger congela automáticamente contrataciones y gastos de viajes sin discusión.',
    industrySopBreach: 'La administración tradicional reacciona cuando ya no puede pagar los sueldos del viernes, cuando las opciones de maniobra son nulas.',
    primaryActors: 'Chief Risk Officers, CFOs, Contralores',
    resourceImpact: 'Prevención del 90% de situaciones de cesación de pagos o insolvencia sobrevenida.',
    crossLinks: [
      { targetId: 'IP-011', relation: 'alimenta', description: 'Alimenta los protocolos de absorción de choque' },
      { targetId: 'IP-073', relation: 'operacionaliza', description: 'Ejecutado por el Breakpoint Scanner de Axis' }
    ],
    formulaOrRule: 'La supervivencia se diseña antes de que llegue la crisis; los triggers importan más que el evento.'
  },
  {
    id: 'IP-063',
    code: 'IP-063',
    name: 'Capa 13 - Modelo de Demarcación de Responsabilidad (Límites de Servicio y Riesgo Residual)',
    alternateNames: ['Contrato de Demarcación Radical', 'Alcance y Riesgo en el Cliente'],
    type: 'Rule / Heuristic',
    immediateApplicability: 95,
    category: 'divergencia_estrategia_realidad',
    categoryLabel: 'Divergencia Estrategia-Realidad',
    purpose: 'Explicitar con claridad matemática qué resuelve el servicio, qué NO resuelve y qué riesgo permanece 100% bajo control y responsabilidad del cliente.',
    inputs: ['Requerimientos del cliente', 'Límites operativos del proveedor', 'Historial de expectativas falsas'],
    outputs: ['Anexo contractual de exclusiones explícitas', 'Inmunidad ante reclamos por áreas fuera de control'],
    usageRanges: 'Prestación de servicios profesionales, outsourcing, consultoría estratégica y desarrollo de software.',
    criticalConditions: ['Prohibido prometer "nos encargamos de todo"; debe prometerse "nos hacemos responsables de la capacidad contratada"'],
    industry: 'Outsourcing, Agencias de Marketing y Consultoría',
    industryUseCase: 'Una agencia de outsourcing define: "Proveemos agentes entrenados en 5 min/ticket; la calidad del software del cliente y su caída es 100% responsabilidad del cliente".',
    industrySopBreach: 'Las empresas comerciales prometen resolver "todo" para cerrar la venta, convirtiéndose en el chivo expiatorio de las fallas del cliente.',
    primaryActors: 'Directores de Cuenta, Abogados de Contratos, Account Executives',
    resourceImpact: 'Eliminación de disputas legales y descuentos forzados por reclamos fuera de alcance.',
    crossLinks: [
      { targetId: 'IP-014', relation: 'depende_de', description: 'Aplica gobernanza de claridad' },
      { targetId: 'IP-066', relation: 'aplica', description: 'Clave en el modelo de Splendor' }
    ]
  },
  {
    id: 'IP-064',
    code: 'IP-064',
    name: 'Capa 14 - Protocolo de Onboarding Sistémico No Destructivo',
    alternateNames: ['Integración sin Reemplazo Forzoso', 'Onboarding de Baja Fricción'],
    type: 'Protocol',
    immediateApplicability: 90,
    category: 'escalabilidad_sin_heroes',
    categoryLabel: 'Escalamiento Sin Héroes',
    purpose: 'Entrar al ecosistema del cliente sin destruir sus herramientas existentes (Zendesk, Slack, CRM, macros), acoplándose a su flujo antes de sugerir cambios.',
    inputs: ['Herramientas, procesos, canales y personas del cliente actual', 'SOPs existentes'],
    outputs: ['Integración operativa en 48 horas sin trauma cultural ni curva de aprendizaje tortuosa'],
    usageRanges: 'Nuevos clientes de servicios B2B, integración de subsidiarias o fusiones operativas.',
    criticalConditions: ['Primero se audita si lo que el cliente tiene todavía produce valor con bajo daño colateral antes de intentar reemplazarlo'],
    industry: 'BPO, IT Services, Integración de Sistemas y HR Tech',
    industryUseCase: 'Un equipo de soporte se incorpora al Slack y Zendesk del cliente usando sus mismas macros el primer mes antes de sugerir automatizaciones.',
    industrySopBreach: 'Los proveedores imponen sus propios softwares y metodologías al cliente en el día 1, paralizando la operación y generando rechazo del personal.',
    primaryActors: 'Implementation Managers, Onboarding Leads',
    resourceImpact: 'Reducción del tiempo de activación de clientes de 6 semanas a 3 días.',
    crossLinks: [
      { targetId: 'IP-065', relation: 'operacionaliza', description: 'Aplica el principio de reutilización de IP-065' }
    ]
  },
  {
    id: 'IP-065',
    code: 'IP-065',
    name: 'Capa 15 - Principio de Reutilización con Mínimo Daño Colateral',
    alternateNames: ['No Reinventar la Rueda', 'Preservación de Capacidad Existente'],
    type: 'Principle',
    immediateApplicability: 95,
    category: 'metodologia_trinchera',
    categoryLabel: 'Metodología de Trinchera',
    purpose: 'No construir algo nuevo desde cero si lo existente todavía genera valor aceptable. Reparar, adaptar e integrar antes de sustituir.',
    inputs: ['Sistemas heredados (legacy systems)', 'Procesos manuales existentes', 'Presupuesto de modernización'],
    outputs: ['Decisión informada de: ¿Conservar? ¿Modificar? o ¿Sustituir?'],
    usageRanges: 'Transformación digital, optimización de operaciones y consultoría de eficiencia.',
    criticalConditions: ['Preguntarse siempre: "¿Todavía produce suficiente valor con un nivel aceptable de daño colateral?"'],
    industry: 'Industria Tradicional, Banca, Logística y Retail',
    industryUseCase: 'En vez de reemplazar un sistema contable de hace 15 años por un ERP de $500k, se creó un puente automatizado de exportación a Google Sheets por $2k.',
    industrySopBreach: 'Las consultoras de IT descartan automáticamente los sistemas viejos para vender licencias millonarias que quiebran la empresa durante la migración.',
    primaryActors: 'Chief Technology Officers, Arquitectos Empresariales',
    resourceImpact: 'Ahorro de hasta el 85% de presupuestos de transformación tecnológica.',
    crossLinks: [
      { targetId: 'IP-064', relation: 'fundamenta', description: 'Fundamento filosófico del onboarding no destructivo' }
    ],
    formulaOrRule: 'Conservar lo que funciona ➔ Reparar lo que cruje ➔ Sustituir solo lo que rompe'
  },
  {
    id: 'IP-066',
    code: 'IP-066',
    name: 'Arquitectura Splendor Outsource (Talento en Capacidad Empresarial Gestionable)',
    alternateNames: ['Talent as a Service', 'Capacidad Operacional Productizada'],
    type: 'Architecture',
    immediateApplicability: 95,
    category: 'talento_cargas',
    categoryLabel: 'Talento & Cargas',
    purpose: 'Convertir talento operativo distribuido en capacidad empresarial flexible, predecible y medible, eliminando el outsourcing como una simple venta de horas.',
    inputs: ['Talento remoto calificado en Colombia', 'Demanda variable de soporte o asistencia del cliente en EE.UU./Europa'],
    outputs: ['Unidades de capacidad operativa con SLAs y KPIs garantizados', 'Márgenes brutos estables del 40-50%'],
    usageRanges: 'Customer Support, Remote Assistance, Outsource Hiring y operaciones digitales continuas.',
    criticalConditions: [
      'No vender "un empleado barato"; vender capacidad operacional gestionada',
      'Splendor conserva el sourcing, matching, operación y accountability; el cliente conserva su decisión empresarial'
    ],
    industry: 'BPO, Startups de E-commerce y Empresas en Crecimiento',
    industryUseCase: 'Una marca de ropa en Los Ángeles contrata 6 agentes dedicados con SLA de 5 minutos por ticket, ahorrando $140,000 USD al año respecto a contratar localmente.',
    industrySopBreach: 'Las agencias de empleo tradicionales colocan una persona y se desentienden de su productividad diaria, dejando el problema de gestión en el cliente.',
    primaryActors: 'Directores de BPO, Gerentes de Operaciones, Account Managers',
    resourceImpact: 'Reducción del costo de atención al cliente en un 60% manteniendo un CSAT superior al 92%.',
    crossLinks: [
      { targetId: 'IP-067', relation: 'utiliza', description: 'Aplica el modelo triangulado de pricing' },
      { targetId: 'IP-068', relation: 'componente_de', description: 'Usa la deconstrucción de tickets de IP-068' }
    ]
  },
  {
    id: 'IP-067',
    code: 'IP-067',
    name: 'Modelo Triangulado Splendor (Costo Talento ➔ Precio Cliente ➔ Margen ➔ Productividad ➔ LTV)',
    alternateNames: ['Ecuación Financiera de Outsourcing', 'Pricing por Unidad de Capacidad'],
    type: 'Model',
    immediateApplicability: 95,
    category: 'capital_economics',
    categoryLabel: 'Capital & Economics',
    purpose: 'Determinar el precio y rentabilidad respondiendo: "¿Cuánto valor produce una unidad de capacidad frente a cuánto cuesta adquirirla, operarla y reemplazarla?"',
    inputs: ['Costo del agente local (ej. $150 USD/sem)', 'Tarifa cliente (ej. $300 USD/sem)', 'Horas semanales (30h)', 'KPIs de throughput (80 tickets/día x 5 min)'],
    outputs: ['Margen bruto unitario del 50%', 'LTV proyectado del cliente a 24 meses', 'Presupuesto de reemplazo inmediato'],
    usageRanges: 'Fijación de precios de servicios de talento, soporte y consultoría recurrente.',
    criticalConditions: ['Tener presupuestado el costo del mecanismo de reemplazo para no depender de que el agente nunca enferme'],
    industry: 'Outsourcing, Agencias de Staffing y Servicios Profesionales',
    industryUseCase: 'Estructuración de pricing para un cliente corporativo que requiere 15 asistentes remotos bilingües con margen asegurado de $2,250 USD semanales.',
    industrySopBreach: 'Fijar precios calculando únicamente el sueldo del empleado más un 20% arbitrario, sin considerar rotación, supervisión ni software.',
    primaryActors: 'CFOs de BPO, Directores Comerciales',
    resourceImpact: 'Rentabilidad financiera predecible y retención de clientes superior al 85% anual.',
    crossLinks: [
      { targetId: 'IP-066', relation: 'componente_de', description: 'Motor económico de la arquitectura Splendor' },
      { targetId: 'IP-055', relation: 'especializa', description: 'Instancia específica de finanzas por triangulación' }
    ],
    formulaOrRule: 'Rentabilidad = (Precio Cliente - Costo Operativo) × Productividad / Tasa de Reemplazo'
  },
  {
    id: 'IP-068',
    code: 'IP-068',
    name: 'SLA Deconstruction Loop Splendor (Tickets ➔ Tiempo ➔ Skill ➔ Volumen ➔ SLA)',
    alternateNames: ['Deconstrucción de Capacidad Operativa', 'Loop de Dimensionamiento de Turnos'],
    type: 'Process',
    immediateApplicability: 95,
    category: 'talento_cargas',
    categoryLabel: 'Talento & Cargas',
    purpose: 'Calcular con exactitud cuántos agentes y qué habilidades se requieren desglosando el volumen de tickets en tiempo de atención, complejidad y acuerdos de nivel de servicio.',
    inputs: ['Volumen diario de tickets', 'Tiempo medio de resolución (AHT)', 'Complejidad técnica del soporte', 'SLA exigido (ej. respuesta < 15 min)'],
    outputs: ['Dimensionamiento exacto de plantilla sin sobrecontratación ni saturación', 'Cronograma de turnos con buffer'],
    usageRanges: 'Dimensionamiento de centros de atención, mesas de ayuda y equipos de respuesta rápida.',
    criticalConditions: ['Someter el cálculo a stress test: ¿Qué pasa si aumenta el volumen un 50% o si se cae un agente?'],
    industry: 'Servicio al Cliente, Helpdesk y Operaciones de Soporte',
    industryUseCase: 'Dimensionamiento para un e-commerce en Black Friday: se calculó que 4 agentes absorben 1,200 tickets diarios con un SLA de respuesta en 8 minutos.',
    industrySopBreach: 'Contratar personal "a ojo" basándose en el pánico del jefe de área, generando costos ociosos del 30% en horas valle.',
    primaryActors: 'Planificadores de Workforce (WFM), Supervisores de Turno',
    resourceImpact: 'Optimización del 25% en costo de nómina mediante asignación horaria milimétrica.',
    crossLinks: [
      { targetId: 'IP-066', relation: 'componente_de', description: 'Protocolo de cálculo operativo de Splendor' }
    ],
    formulaOrRule: 'Headcount = (Volumen × AHT) / (Horas Laborales Efectivas × Factor Eficiencia)'
  },
  {
    id: 'IP-069',
    code: 'IP-069',
    name: 'Arquitectura Renasci (Chief of Scalability Externo: Complejidad en Escalabilidad)',
    alternateNames: ['Arquitectura Externa de Escalabilidad', 'Gobernanza de Interacción entre Recursos'],
    type: 'Architecture',
    immediateApplicability: 90,
    category: 'divergencia_estrategia_realidad',
    categoryLabel: 'Divergencia Estrategia-Realidad',
    purpose: 'Intervenir como Chief of Scalability externo en compañías en crecimiento para transformar una organización funcional en una escalable sin romper lo que ya funciona.',
    inputs: ['Complejidad organizativa de empresas en crecimiento', 'Interacciones defectuosas entre capital, personas, IP y tecnología'],
    outputs: ['Desacoplamiento de dependencias', 'Arquitectura de decisiones reubicadas', 'Retiro de la consultoría en 8 meses'],
    usageRanges: 'Startups Serie A hacia Exit, VC, Family Offices, expansión internacional y white-label.',
    criticalConditions: [
      'El problema no es falta de recursos, es interacción defectuosa entre ellos',
      'No construir una transformación completa antes de demostrar que el mecanismo causal funciona en un MVP'
    ],
    industry: 'Startups Serie A a C, Scale-ups y Empresas de Alto Crecimiento',
    industryUseCase: 'Intervención en una startup Serie B de $15M de facturación que colapsaba operativamente por falta de procesos entre ventas e ingeniería.',
    industrySopBreach: 'Las consultoras tradicionales cobran millones por planes de cambio de 2 años que exigen despedir y reconstruir la empresa.',
    primaryActors: 'Chief Strategy Architects, Inversionistas de VC, CEOs',
    resourceImpact: 'Multiplicación de la capacidad de absorción de transacciones x5 sin duplicar la nómina.',
    crossLinks: [
      { targetId: 'IP-070', relation: 'cobra_mediante', description: 'Monetizado con retainers triangulados' },
      { targetId: 'IP-071', relation: 'secuencia', description: 'Sigue el cronograma de 8 meses' }
    ],
    formulaOrRule: 'Resource ➔ Interaction ➔ Decision ➔ Scalability'
  },
  {
    id: 'IP-070',
    code: 'IP-070',
    name: 'Triangulación de Retainers Renasci (Complejidad x Capital Expuesto x Costo de Ruptura)',
    alternateNames: ['Pricing de Alto Impacto Renasci', 'Retainers por Costo de Breakpoint Evitado'],
    type: 'Model',
    immediateApplicability: 90,
    category: 'capital_economics',
    categoryLabel: 'Capital & Economics',
    purpose: 'Fijar honorarios de intervención estratégica desacoplados de las horas de trabajo, basados en el capital expuesto, la complejidad sistémica y el costo del colapso evitado.',
    inputs: ['Complejidad del sistema', 'Capital en riesgo / expuesto', 'Costo económico si el breakpoint ocurre', 'Capacidad propia de intervención'],
    outputs: [
      'Retainers de alto valor validados por el mercado:',
      '• Serie A: USD $12K/mes',
      '• Serie B: USD $25K/mes',
      '• Serie C: USD $35K/mes',
      '• VC / Family Office: USD $38K+/mes'
    ],
    usageRanges: 'Consultoría estratégica de alto nivel, asesoría a fondos de inversión y reestructuración de empresas.',
    criticalConditions: ['Demostrar que el costo de ruptura evitado es al menos 10x el valor del retainer mensual'],
    industry: 'Venture Capital, Private Equity y Asesoría C-Suite',
    industryUseCase: 'Fijación de un retainer de $25k/mes para una startup Serie B que arriesgaba una ronda de $10M por fallas de escalamiento operacional.',
    industrySopBreach: 'Cobrar por horas-hombre, lo que genera incentivos perversos para demorar la solución y alargar el proyecto indefinidamente.',
    primaryActors: 'Consultores de Alto Nivel, Socios Directores, Boards de VC',
    resourceImpact: 'Captura del valor real generado con ingresos predecibles de 6 cifras anuales por cuenta.',
    crossLinks: [
      { targetId: 'IP-069', relation: 'componente_de', description: 'Modelo económico de Renasci' }
    ],
    formulaOrRule: 'Retainer = Complejidad × Capital Expuesto × Costo de Ruptura × Capacidad de Intervención'
  },
  {
    id: 'IP-071',
    code: 'IP-071',
    name: 'Cronograma de Intervención Renasci (Análisis 1/2m ➔ Triggers 1/2m ➔ MVP 1m ➔ Impl. 6m ➔ Exit 1m)',
    alternateNames: ['Secuencia de Intervención de 8 Meses', 'Ruta de Salida del Arquitecto'],
    type: 'Process',
    immediateApplicability: 90,
    category: 'divergencia_estrategia_realidad',
    categoryLabel: 'Divergencia Estrategia-Realidad',
    purpose: 'Estructurar el ciclo de consultoría con fecha de caducidad obligatoria para no perpetuarse en la empresa ni crear dependencias artificiales.',
    inputs: ['Diagnóstico inicial', 'Compromiso de salida a 8 meses'],
    outputs: [
      '½ mes — Analysis',
      '½ mes — Triggers',
      '1 mes — MVP funcional',
      '6 meses — Implementation progresiva',
      '1 mes — Exit y transferencia total de criterio'
    ],
    usageRanges: 'Intervenciones en empresas en crisis o scale-ups que necesitan autonomía rápida.',
    criticalConditions: ['El arquitecto diseña el sistema de ejecución, no ejecuta cada función diaria'],
    industry: 'Consultoría de Escalabilidad y Reestructuración',
    industryUseCase: 'Intervención de 8 meses en una fintech de pagos: al octavo mes la consultora se retira dejando al equipo local operando con sus propios triggers.',
    industrySopBreach: 'Las consultoras tradicionales se atrincheran en la empresa durante años para seguir cobrando fees mensuales sin transferir capacidad.',
    primaryActors: 'Chief of Scalability Externo, CEOs',
    resourceImpact: 'Transferencia del 100% de la autonomía operativa al cliente con fecha de término fija.',
    crossLinks: [
      { targetId: 'IP-069', relation: 'componente_de', description: 'Metodología temporal de Renasci' },
      { targetId: 'IP-082', relation: 'cumple_con', description: 'Garantiza el veto anti-dependencia del auditor' }
    ]
  },
  {
    id: 'IP-072',
    code: 'IP-072',
    name: 'Arquitectura Axis Ecosystem (Detección, Absorción y Reconversión de Breakpoints Sistémicos)',
    alternateNames: ['Sistema de Inteligencia de Breakpoints', 'Arquitectura de Reconversión de Resiliencia'],
    type: 'Architecture',
    immediateApplicability: 90,
    category: 'riesgo_breakpoints',
    categoryLabel: 'Riesgo & Breakpoints',
    purpose: 'Mover la intervención organizacional de la etapa de post-crisis a la etapa de pre-breakpoint, convirtiendo cada caso resuelto en IP reutilizable y licenciable.',
    inputs: ['Señales de mercado', 'Operational Due Diligence', 'Mapas de recursos e interacción'],
    outputs: ['Breakpoints absorbidos antes del colapso', 'IP empaquetada para licenciamiento', 'Reconversión de activos en crisis'],
    usageRanges: 'Fondos de inversión, adquisiciones corporativas, reestructuración y licenciamiento de metodologías.',
    criticalConditions: ['El output de la intervención no es solo el resultado del cliente; es cliente + conocimiento reutilizable'],
    industry: 'Private Equity, Inteligencia Corporativa y Turnaround',
    industryUseCase: 'Detección de un cuello de botella sistémico en la logística de frío de una distribuidora de vacunas antes del inicio de la temporada de gripe.',
    industrySopBreach: 'Las empresas operan a ciegas hasta que el sistema colapsa, gastando fortunas en apagar incendios que eran predecibles.',
    primaryActors: 'Shadow Teams, Auditores de Riesgo Sistémico, Inversores',
    resourceImpact: 'Protección de millones de dólares en valor patrimonial y creación de portafolios de IP licenciables.',
    crossLinks: [
      { targetId: 'IP-073', relation: 'utiliza', description: 'Utiliza el Breakpoint Scanner' },
      { targetId: 'IP-074', relation: 'ejecuta', description: 'Ejecuta el Operational Due Diligence' }
    ],
    formulaOrRule: 'IP ➔ Shadow Team ➔ Matrices ➔ Breakpoint Scanner ➔ Operational DD ➔ Licensing'
  },
  {
    id: 'IP-073',
    code: 'IP-073',
    name: 'Breakpoint Scanner Axis (Detección Pre-Breakpoint vs. Post-Crisis)',
    alternateNames: ['Scanner de Puntos de Falla Crítica', 'Radar de Colapso Sistémico'],
    type: 'Diagnostic / Scanner',
    immediateApplicability: 95,
    category: 'riesgo_breakpoints',
    categoryLabel: 'Riesgo & Breakpoints',
    purpose: 'Escanear de forma continua las variables operativas, de personal y de tesorería para alertar sobre la inminencia de un colapso antes de que ocurra físicamente.',
    inputs: ['Latencias en handoffs entre equipos', 'Acumulación de horas extra no declaradas', 'Divergencia entre ventas y cobranza'],
    outputs: ['Mapa de calor de breakpoints inminentes', 'Protocolo de intervención quirúrgica previa'],
    usageRanges: 'Auditorías trimestrales de salud operativa en empresas de alta complejidad transaccional.',
    criticalConditions: ['No descartar señales anómalas como "ruido temporal"; investigar por qué el sistema las produjo'],
    industry: 'Logística, Banca, BPO y Hospitales',
    industryUseCase: 'El scanner detecta que el tiempo de respuesta de la base de datos creció 12% semanal durante 4 semanas: se interviene antes de la caída masiva del Black Friday.',
    industrySopBreach: 'Los tableros tradicionales de KPIs solo muestran el pasado ("cuántas ventas tuvimos ayer"), ignorando la fatiga del motor que sostiene la operación.',
    primaryActors: 'Auditores Operacionales, Directores de Riesgo',
    resourceImpact: 'Cero caídas imprevistas de servicio y prevención de crisis reputacionales.',
    crossLinks: [
      { targetId: 'IP-072', relation: 'componente_de', description: 'Herramienta nuclear de Axis' }
    ]
  },
  {
    id: 'IP-074',
    code: 'IP-074',
    name: 'Operational Due Diligence Axis (Auditoría de Resiliencia Operativa Pre-Transacción)',
    alternateNames: ['Due Diligence de Fricción Operativa', 'Auditoría Pre-Adquisición de Capacidad Real'],
    type: 'Diagnostic / Scanner',
    immediateApplicability: 90,
    category: 'riesgo_breakpoints',
    categoryLabel: 'Riesgo & Breakpoints',
    purpose: 'Auditar la capacidad operativa real y la verdadera salud sistémica de una empresa antes de una compra, fusión o inversión, superando el análisis financiero en papel.',
    inputs: ['Procesos reales de la trinchera', 'Entrevistas anónimas con personal de última milla', 'Auditoría de software y dependencias ocultas'],
    outputs: ['Dictamen de fragilidad operativa', 'Ajuste de valoración de compra (descuento por riesgo técnico oculto)'],
    usageRanges: 'Fusiones y Adquisiciones (M&A), rondas de inversión de venture capital y compras de franquicias.',
    criticalConditions: ['Auditar dónde la empresa está sobreviviendo mediante heroísmo personal en vez de procesos robustos'],
    industry: 'Private Equity, M&A, Inversiones y Venture Capital',
    industryUseCase: 'Due diligence en una cadena de retail que aparentaba alta rentabilidad: se descubrió que todo el inventario dependía de una macro de Excel manipulada por una sola persona.',
    industrySopBreach: 'Los despachos de abogados y auditores financieros revisan balances contables que lucen perfectos pero esconden un sistema operativo al borde del abismo.',
    primaryActors: 'Inversionistas de M&A, Directores de Private Equity',
    resourceImpact: 'Negociación de descuentos de hasta el 30% en el precio de compra de compañías o desistimiento de inversiones tóxicas.',
    crossLinks: [
      { targetId: 'IP-072', relation: 'componente_de', description: 'Módulo de entrada de Axis' }
    ]
  },
  {
    id: 'IP-075',
    code: 'IP-075',
    name: 'Protocolo de Reutilización y Licenciamiento Axis (Captura de IP Reutilizable)',
    alternateNames: ['Fábrica de IP Post-Intervención', 'Monetización de Conocimiento Sistémico'],
    type: 'Process',
    immediateApplicability: 85,
    category: 'metodologia_trinchera',
    categoryLabel: 'Metodología de Trinchera',
    purpose: 'Codificar la solución desarrollada para un cliente específico, despojarla de datos confidenciales y convertirla en una IP o framework estandarizado para licenciamiento global.',
    inputs: ['Caso de intervención exitoso', 'Patrón de solución generado en el cliente'],
    outputs: ['Nuevo framework de IP transferible', 'Estructura de licenciamiento para terceros'],
    usageRanges: 'Empresas de consultoría, laboratorios de software y firmas de arquitectura estratégica.',
    criticalConditions: ['El cliente recibe su resultado; la firma conserva la propiedad intelectual de la metodología'],
    industry: 'Consultoría, Software y Servicios de Conocimiento',
    industryUseCase: 'Una metodología desarrollada para solucionar la retención de personal en un BPO de salud se empaqueta y licencia a 12 centros de atención en diferentes países.',
    industrySopBreach: 'Las consultoras resuelven un problema y desechan el conocimiento, empezando desde cero con el siguiente cliente como artesanos.',
    primaryActors: 'Directores de IP, Gestores de Licencias',
    resourceImpact: 'Generación de flujos de ingresos recurrentes de alto margen por derechos de uso de metodologías.',
    crossLinks: [
      { targetId: 'IP-072', relation: 'componente_de', description: 'Fase final del flujo de Axis' }
    ]
  },
  {
    id: 'IP-076',
    code: 'IP-076',
    name: 'Arquitectura Singularity (Laboratorio de Integración y Creación de Nuevas Categorías)',
    alternateNames: ['Laboratorio de Transformación Sistémica', 'Creador de Nuevas Categorías de Mercado'],
    type: 'Architecture',
    immediateApplicability: 80,
    category: 'producto_oferta_modelos',
    categoryLabel: 'Producto, Oferta & Modelos',
    purpose: 'Operar como capa de integración donde convergen conocimiento complejo, tecnología y mercado para construir nuevas soluciones o categorías desde brechas no resueltas.',
    inputs: ['Problemas emergentes desconocidos', 'Brechas de mercado sin solución existente', 'Tecnologías experimentales'],
    outputs: ['Nuevas categorías de productos o servicios', 'Prototipos de mercado validados bajo estrés'],
    usageRanges: 'Laboratorios de innovación profunda, incubación de modelos de negocio futuristas y alianzas de I+D.',
    criticalConditions: ['El producto no necesariamente existe al comienzo; el proceso riguroso genera la categoría'],
    industry: 'Deeptech, Nuevas Fronteras de Negocio e Inteligencia Artificial',
    industryUseCase: 'Creación de una nueva categoría de auditoría algorítmica de decisiones para fondos que invierten en activos no convencionales.',
    industrySopBreach: 'El I+D corporativo intenta crear productos dentro de categorías existentes, compitiendo en guerras de precios agotadoras.',
    primaryActors: 'Investigadores de Frontera, Arquitectos de Futuro',
    resourceImpact: 'Posicionamiento monopolístico en mercados de nueva creación con cero competencia inicial.',
    crossLinks: [
      { targetId: 'IP-077', relation: 'ejecuta', description: 'Ejecuta el protocolo de emergencia de Singularity' }
    ]
  },
  {
    id: 'IP-077',
    code: 'IP-077',
    name: 'Protocolo de Emergencia Singularity (Unknown Problem ➔ Market Gap ➔ Category)',
    alternateNames: ['Algoritmo de Creación de Categorías', 'Secuencia de Invención por Deconstrucción'],
    type: 'Process',
    immediateApplicability: 80,
    category: 'producto_oferta_modelos',
    categoryLabel: 'Producto, Oferta & Modelos',
    purpose: 'Guiar el proceso metódico para convertir una fricción inédita en una nueva categoría de negocio viable.',
    inputs: ['Unknown problem', 'Market gap'],
    outputs: [
      'Deconstruction ➔ Hypothesis ➔ Model ➔ Prototype ➔ Stress test ➔ Breakpoint ➔ Reconstruction ➔ New Category'
    ],
    usageRanges: 'Desarrollo de innovaciones radicales o respuestas a disrupciones de mercado.',
    criticalConditions: ['No saltarse el paso de stress test y breakpoint; una categoría débil muere al primer choque'],
    industry: 'Biotecnología, Inteligencia Artificial y Negocios Disruptivos',
    industryUseCase: 'Desarrollo de un modelo de seguros paramétricos instantáneos para trabajadores de plataformas de reparto durante tormentas tropicales.',
    industrySopBreach: 'Lanzar startups basadas en "lluvias de ideas" sin una secuencia causal que estrese el modelo.',
    primaryActors: 'Founders Disruptivos, Directores de I+D',
    resourceImpact: 'Validación de viabilidad de categoría en menos de 90 días con mínimo capital.',
    crossLinks: [
      { targetId: 'IP-076', relation: 'componente_de', description: 'Proceso operativo de Singularity' }
    ]
  },
  {
    id: 'IP-078',
    code: 'IP-078',
    name: 'Arquitectura Fractalis (Custodia del Criterio y Gobernanza Fractal)',
    alternateNames: ['Capa de Custodia de Criterio', 'Gobernanza de Replicación Sin Corrupción'],
    type: 'Architecture',
    immediateApplicability: 95,
    category: 'criterio_gobernanza_fractal',
    categoryLabel: 'Criterio & Gobernanza Fractal',
    purpose: 'Custodiar el criterio que permite que sistemas fractales diferentes sigan obedeciendo principios compatibles, evitando que el sistema conserve la forma pero pierda el alma.',
    inputs: ['Nuevas entidades, franquicias o equipos que adoptan la arquitectura', 'Reportes de auditoría de criterio'],
    outputs: ['Certificación de continuidad de criterio', 'Veto o expulsión de nodos corruptores', 'Preservación de estándares'],
    usageRanges: 'Redes de franquicias, empresas descentralizadas, comunidades de práctica y holdings.',
    criticalConditions: [
      'Controla aquello que define qué pertenece al sistema y qué no',
      'No controla cada micro-operación diaria; controla el criterio que las gobierna'
    ],
    industry: 'Franquicias Globales, Redes Profesionales y Colegios Profesionales',
    industryUseCase: 'Supervisión de 40 franquicias de servicios para garantizar que ninguna abarate la calidad del servicio al cliente para inflar su margen local.',
    industrySopBreach: 'Las redes de franquicias crecen en número pero se degradan en calidad porque los manuales no transmiten el criterio de fondo.',
    primaryActors: 'Custodios de Fractalis, Directores de Gobierno Corporativo',
    resourceImpact: 'Preservación del valor de marca y prevención de escándalos que destruyen el valor de la red.',
    crossLinks: [
      { targetId: 'IP-079', relation: 'operacionaliza', description: 'Se formaliza en el Smart Contract of Criterion' }
    ]
  },
  {
    id: 'IP-079',
    code: 'IP-079',
    name: 'Smart Contract Fractalis of Criterion (10 Cláusulas Operativas de Gobernanza)',
    alternateNames: ['Contrato Inteligente de Criterio Humano', 'Traducción de Principios a Condiciones Verificables'],
    type: 'System',
    immediateApplicability: 95,
    category: 'criterio_gobernanza_fractal',
    categoryLabel: 'Criterio & Gobernanza Fractal',
    purpose: 'Traducir principios filosóficos y estratégicos abstractos a condiciones verificables de participación, actuación y límites para cualquier nodo de la red.',
    inputs: ['Las 10 Cláusulas: A. Identity, B. Scope, C. Resources, D. Criterion, E. Boundaries, F. Triggers, G. Breakpoints, H. Escalation, I. Custody, J. Exit'],
    outputs: ['Acuerdo de gobernanza autoejecutable', 'Mecanismo de desvinculación pacífica sin destruir el sistema'],
    usageRanges: 'Pactos de socios, contratos de franquicia, alianzas estratégicas e incorporación de directores.',
    criticalConditions: [
      'Debe contemplar la cláusula J (Exit): cómo se separa una unidad sin destruir el resto del sistema',
      'Las condiciones de ruptura deben ser binarias y verificables sin comités subjetivos'
    ],
    industry: 'Gobierno Corporativo, Venture Capital, Sociedades y Franquicias',
    industryUseCase: 'Contrato de incorporación de un socio operativo en una nueva sede: se pacta que si no cumple el estándar de calidad en 3 meses, se recompra su participación al valor libro sin pleitos.',
    industrySopBreach: 'Los contratos societarios tradicionales son textos rígidos que no prevén cómo separar a un socio que no encaja sin paralizar la empresa.',
    primaryActors: 'Socios Fundadores, Abogados Estratégicos, Custodios de Criterio',
    resourceImpact: 'Cero litigios entre socios y aislamiento de riesgos en franquicias y subsidiarias.',
    crossLinks: [
      { targetId: 'IP-078', relation: 'componente_de', description: 'Núcleo contractual de Fractalis' },
      { targetId: 'IP-014', relation: 'aplica', description: 'Aplica gobernanza de claridad' }
    ]
  },
  {
    id: 'IP-080',
    code: 'IP-080',
    name: 'Playbook de Divergence Audit (Auditoría entre Estrategia y Última Milla)',
    alternateNames: ['Auditoría de Brecha Estrategia-Realidad', 'Divergence Audit Protocol'],
    type: 'Framework',
    immediateApplicability: 100,
    category: 'divergencia_estrategia_realidad',
    categoryLabel: 'Divergencia Estrategia-Realidad',
    purpose: 'Auditar la divergencia entre lo que la estrategia de la dirección presupone que ocurre y lo que realmente pasa en la última milla para que el negocio sobreviva.',
    inputs: ['Estrategia declarada por la junta', 'Arquitectura real en la cancha', 'Fricciones y atajos clandestinos del personal'],
    outputs: ['Reporte de divergencias críticas', 'Cálculo de costos desplazados', 'Intervención mínima de alta efectividad'],
    usageRanges: 'Boutiques y empresas medianas con alta entropía, startups post-financiamiento y empresas en reconversión.',
    criticalConditions: [
      'El producto no es "te traigo la respuesta"; es poner el espejo sobre la mesa y revelar la divergencia',
      'No vender 4 consultorías separadas; vender un solo producto: Divergence Audit'
    ],
    industry: 'Boutiques de Consultoría, Startups, Hospitales y Retail',
    industryUseCase: 'Auditoría en una clínica: la dirección creía que el tiempo de espera era de 15 minutos según el sistema; en la realidad era de 55 minutos porque las recepcionistas no registraban a los pacientes hasta tener todos los papeles.',
    industrySopBreach: 'Las consultorías tradicionales diseñan planes estratégicos que aumentan la divergencia porque nadie baja a observar la última milla.',
    primaryActors: 'Divergence Auditors, CEOs, Comités de Dirección',
    resourceImpact: 'Alineación inmediata de la estrategia con la realidad operativa sin gastar en software adicional.',
    crossLinks: [
      { targetId: 'IP-081', relation: 'alimenta', description: 'Identifica la dependencia invertida' },
      { targetId: 'IP-082', relation: 'condicion_critica', description: 'Sujeto a la regla de veto anti-dependencia' },
      { targetId: 'IP-083', relation: 'utiliza', description: 'Aplica los 4 lentes de divergencia' }
    ],
    formulaOrRule: 'Estrategia Declarada ➔ Arquitectura Real ➔ Fricciones ➔ Costos Desplazados ➔ Puntos Ciegos ➔ Intervención Mínima'
  },
  {
    id: 'IP-081',
    code: 'IP-081',
    name: 'Protocolo de Dependencia Invertida (Nombrar ➔ Hacer Visible el Costo ➔ Devolver Ownership)',
    alternateNames: ['Desactivación de Dependencia en Personas Clave', 'Protocolo de Devolución de Responsabilidad'],
    type: 'Protocol',
    immediateApplicability: 100,
    category: 'divergencia_estrategia_realidad',
    categoryLabel: 'Divergencia Estrategia-Realidad',
    purpose: 'Desactivar la trampa donde la organización depende de una persona clave (o del consultor) para resolver algo que estructuralmente debería resolver el sistema.',
    inputs: ['Capacidad que actualmente reposa en una sola persona indispensable ("héroe")'],
    outputs: [
      '1. Nombrar: "Esta capacidad depende de X persona"',
      '2. Hacer visible el costo: "Estos son los riesgos, costos y puntos de quiebre"',
      '3. Devolver ownership: "Ahora corresponde al dueño del sistema decidir cómo delegar, automatizar o rediseñar esa dependencia"'
    ],
    usageRanges: 'Empresas donde el fundador o gerentes clave están al borde del colapso físico o emocional.',
    criticalConditions: [
      'El éxito del audit no es que tú resuelvas el problema; es que la organización ya no pueda seguir fingiendo que el problema es tuyo',
      'Y ahí termina tu intervención; devolver la responsabilidad al sistema'
    ],
    industry: 'C-Suite, Operaciones Críticas, Startups y Empresas de Fundador',
    industryUseCase: 'Un consultor detecta que la facturación de una empresa depende de que la jefa de finanzas ingrese claves manualmente a medianoche: nombra la fragilidad, calcula el costo de un paro cardíaco y devuelve la tarea de automatizarlo a la junta.',
    industrySopBreach: 'Las organizaciones se acostumbran a que los héroes absorban la ineficiencia del sistema hasta que la persona se quiebra de salud.',
    primaryActors: 'Divergence Auditors, Fundadores con Burnout, Juntas Directivas',
    resourceImpact: 'Eliminación del riesgo de quiebra por pérdida de personal indispensable.',
    crossLinks: [
      { targetId: 'IP-080', relation: 'componente_de', description: 'Movimiento central del Divergence Audit' },
      { targetId: 'IP-082', relation: 'prerequisito', description: 'Permite el retiro del auditor' }
    ]
  },
  {
    id: 'IP-082',
    code: 'IP-082',
    name: 'Regla de Veto Anti-Dependencia del Auditor',
    alternateNames: ['Cláusula de Retiro Real del Auditor', 'Veto a la Perpetuidad de Consultoría'],
    type: 'Rule / Heuristic',
    immediateApplicability: 100,
    category: 'divergencia_estrategia_realidad',
    categoryLabel: 'Divergencia Estrategia-Realidad',
    purpose: 'Prohibir taxativamente cualquier recomendación de auditoría cuya implementación requiera que el auditor permanezca como pieza operacional indispensable.',
    inputs: ['Solución o recomendación propuesta al cliente'],
    outputs: ['Veto inmediato si la solución crea una nueva dependencia; reformulación obligatoria hacia la autonomía del cliente'],
    usageRanges: 'Universal en cualquier trabajo de asesoría estratégica, consultoría o liderazgo fraccional.',
    criticalConditions: [
      'Si la solución requiere que el auditor permanezca como ejecutor permanente, el audit ha fallado en su arquitectura de transferencia',
      'Ayudar no significa hacerse cargo'
    ],
    industry: 'Consultoría de Negocios, Asesoría Estratégica y Health Management de Fundadores',
    industryUseCase: 'Un consultor se niega a asumir el cargo interino de COO propuesto por el cliente y en su lugar entrega el framework para que el equipo local contrate y opere la función.',
    industrySopBreach: 'El modelo de negocio de las grandes consultoras está deliberadamente diseñado para crear dependencia perpetua y facturar honorarios eternos.',
    primaryActors: 'Auditores de Divergencia, Fundadores en Retiro',
    resourceImpact: 'Protección de la salud física y mental del estratega y garantía de autonomía real para la empresa.',
    crossLinks: [
      { targetId: 'IP-080', relation: 'gobierna', description: 'Regla de gobernanza superior del Divergence Audit' },
      { targetId: 'IP-071', relation: 'obedece', description: 'Garantiza la fase de exit de Renasci' }
    ],
    formulaOrRule: 'Ninguna recomendación del Audit es válida si su implementación crea una nueva dependencia crítica del auditor.'
  },
  {
    id: 'IP-083',
    code: 'IP-083',
    name: 'Matriz de 4 Lentes de Divergencia (JJ, Splendor, Renasci, Axis)',
    alternateNames: ['Los Cuatro Instrumentos de Auditoría', 'Matriz de Diagnóstico Cuatridimensional'],
    type: 'Matrix',
    immediateApplicability: 95,
    category: 'divergencia_estrategia_realidad',
    categoryLabel: 'Divergencia Estrategia-Realidad',
    purpose: 'Utilizar 4 arquitecturas complementarias como lentes de diagnóstico durante un Divergence Audit para interrogar las 4 dimensiones críticas del negocio.',
    inputs: [
      '• Lente JJ (Mercado): ¿Estamos resolviendo el problema correcto?',
      '• Lente Splendor (Capacidad): ¿Tenemos capacidad real para cumplir la promesa?',
      '• Lente Renasci (Sistema): ¿Puede la arquitectura sostener la decisión?',
      '• Lente Axis (Decisión): ¿Estamos viendo y decidiendo sobre la realidad correcta?'
    ],
    outputs: ['Diagnóstico 360° de la salud de la empresa', 'Identificación de en cuál de las 4 capas radica la ruptura principal'],
    usageRanges: 'Auditorías de empresas medianas y boutiques con clientes complejos y crecimiento desordenado.',
    criticalConditions: ['No vender las 4 arquitecturas como empresas separadas; utilizarlas como instrumentos analíticos internos'],
    industry: 'Boutiques de Servicios, Startups en Escalamiento y PyMEs',
    industryUseCase: 'Una empresa creía tener un problema de ventas (Mercado): el Lente Splendor demostró que el problema era que no tenían capacidad para entregar los pedidos pendientes.',
    industrySopBreach: 'Los especialistas ven todo a través de su propio martillo: el de marketing pide más anuncios, el de RRHH más cursos y el de IT más software.',
    primaryActors: 'Chief Strategy Architects, Directores de Diagnóstico',
    resourceImpact: 'Ahorro de meses de diagnóstico erróneo y focalización inmediata en el punto de apalancamiento real.',
    crossLinks: [
      { targetId: 'IP-080', relation: 'componente_de', description: 'Cuerpo instrumental del Divergence Audit' }
    ]
  },
  {
    id: 'IP-084',
    code: 'IP-084',
    name: 'Protocolo de Post-Mortem de Hipótesis y Externalidades',
    alternateNames: ['Auditoría de Costos Desplazados', 'Scanner de Ruido de Segundo Orden'],
    type: 'Protocol',
    immediateApplicability: 95,
    category: 'divergencia_estrategia_realidad',
    categoryLabel: 'Divergencia Estrategia-Realidad',
    purpose: 'Evaluar una intervención no solo por el KPI alcanzado, sino auditando: ¿Qué empeoró? ¿Qué costo desplazamos? ¿Qué señal tratamos como ruido? ¿Qué no estamos viendo todavía?',
    inputs: ['Resultados del KPI principal', 'Quejas de departamentos adyacentes', 'Nuevas tensiones detectadas post-intervención'],
    outputs: ['Identificación de costos ocultos creados por la solución', 'Ajuste del modelo sistémico'],
    usageRanges: 'Revisiones posteriores a la implementación de cualquier cambio estratégico o tecnológico.',
    criticalConditions: ['Una solución puede "funcionar" según el KPI y simultáneamente recrear la ruptura en otra parte del sistema'],
    industry: 'Universal en cualquier industria',
    industryUseCase: 'Un software aumentó la velocidad de atención al cliente (KPI en verde), pero triplicó los errores de facturación que colapsaron al equipo contable.',
    industrySopBreach: 'Celebrar el éxito de un KPI aislado mientras la empresa en su conjunto empeora su salud financiera o humana.',
    primaryActors: 'Auditores de Sistema, COOs, Directores de Calidad',
    resourceImpact: 'Eliminación del autoengaño y protección contra victorias pírricas corporativas.',
    crossLinks: [
      { targetId: 'IP-080', relation: 'fase_final', description: 'Cierra el ciclo de Divergence Audit' }
    ],
    formulaOrRule: 'Éxito Real = KPI Principal Mejorado - Costos Desplazados a Otros Componentes'
  },
  {
    id: 'IP-085',
    code: 'IP-085',
    name: 'Laboratorio Civilizacional Fractal (Observación de Rupturas a Través de Escalas)',
    alternateNames: ['Investigación Arquitectónica Fractal', 'Mapeo de Mecanismos de Ruptura Multi-Escala'],
    type: 'Architecture',
    immediateApplicability: 85,
    category: 'criterio_gobernanza_fractal',
    categoryLabel: 'Criterio & Gobernanza Fractal',
    purpose: 'Investigar cómo los mismos mecanismos de ruptura, homeostasis, coordinación y gobernanza reaparecen cuando cambia la escala: Persona ➔ Rol ➔ Equipo ➔ Organización ➔ Mercado ➔ Gobernanza.',
    inputs: ['Patrones de comportamiento observados en diferentes escalas humanas y empresariales'],
    outputs: ['Heurísticas universales de resiliencia', 'Modelos predictivos de falla organizacional'],
    usageRanges: 'Diseño de ecosistemas complejos, políticas institucionales y redes internacionales de proyectos.',
    criticalConditions: ['La propiedad fractal debe demostrarse empíricamente caso por caso; no asumirla por simple analogía poética'],
    industry: 'Ciencias de la Complejidad, Política Pública y Holdings Internacionales',
    industryUseCase: 'Observar cómo la falta de límites claros de un directivo en su vida personal reproduce exactamente la misma falta de límites en los contratos comerciales de su empresa.',
    industrySopBreach: 'Los sociólogos estudian la sociedad, los psicólogos al individuo y los economistas el mercado, sin conectar los patrones fractales que los unen.',
    primaryActors: 'Arquitectos Sistémicos, Pensadores de Complejidad',
    resourceImpact: 'Capacidad de predecir el comportamiento de organizaciones gigantes analizando el comportamiento de sus células básicas.',
    crossLinks: [
      { targetId: 'IP-006', relation: 'fundamenta', description: 'Marco conceptual del ecosistema de gobernanza' }
    ]
  },
  {
    id: 'IP-086',
    code: 'IP-086',
    name: 'Arquitectura de Técnicas de Guerrilla Operativa (Sustitutos Temporales Bajo Restricción)',
    alternateNames: ['Ingeniería de Escasez Extrema', 'Sustitutos Temporales de Capacidad'],
    type: 'Architecture',
    immediateApplicability: 95,
    category: 'metodologia_trinchera',
    categoryLabel: 'Metodología de Trinchera',
    purpose: 'Completar una arquitectura funcional cuando los recursos disponibles no permiten implementar el modelo ideal, diseñando sustitutos temporales con riesgo acotado y mecanismo de reemplazo.',
    inputs: [
      'Arquitectura ideal ➔ Restricción real ➔ Capacidad faltante ➔ Sustituto temporal ➔ Riesgo introducido ➔ Breakpoint ➔ Mecanismo de reemplazo'
    ],
    outputs: ['Operatividad inmediata con recursos mínimos', 'Plan de sustitución programado hacia el modelo definitivo'],
    usageRanges: 'Startups bootstrapped, rescate de operaciones en bancarrota y situaciones de guerra de precios.',
    criticalConditions: ['El sustituto temporal debe tener fecha de vencimiento explícita para que no se convierta en una deuda técnica permanente'],
    industry: 'Startups, Operaciones en Zonas Remotas y PyMEs',
    industryUseCase: 'Una startup médica que no puede pagar un sistema de almacenamiento cloud certificado usa discos duros encriptados locales con copia manual durante sus primeros 3 meses.',
    industrySopBreach: 'La consultoría convencional paraliza proyectos afirmando que "sin $100,000 USD de presupuesto es imposible empezar".',
    primaryActors: 'Fundadores de Trinchera, Líderes de Operaciones',
    resourceImpact: 'Supervivencia y validación de negocio con menos del 5% del capital tradicionalmente requerido.',
    crossLinks: [
      { targetId: 'IP-018', relation: 'componente_de', description: 'Técnica emanada de la ingeniería inversa' }
    ],
    formulaOrRule: 'Arquitectura Ideal ➔ Restricción ➔ Sustituto Temporal ➔ Riesgo Acotado ➔ Reemplazo'
  },
  {
    id: 'IP-087',
    code: 'IP-087',
    name: 'Cadena Integral de Valor de IP (Market ➔ Gap ➔ Last Mile ➔ Licensing)',
    alternateNames: ['El Hilo Conductor de Soberanía Intelectual', 'La Cadena de Transformación de Fricción en Activos'],
    type: 'Process',
    immediateApplicability: 95,
    category: 'metodologia_trinchera',
    categoryLabel: 'Metodología de Trinchera',
    purpose: 'Unificar todos los proyectos y gobernanzas en una sola secuencia continua que convierte una brecha de mercado en conocimiento, IP, frameworks, replicabilidad y licenciamiento.',
    inputs: [
      'Market ➔ Market Gap ➔ Last Mile ➔ Deconstruction ➔ Resource/System Map ➔ Interaction Model ➔ Decision Model ➔ Solution Model ➔ Bootstrap/MVP ➔ Stress Testing ➔ Breakpoint (Survive/Reconvert vs. Fail/Learn) ➔ Knowledge ➔ IP ➔ Framework ➔ Replication ➔ Licensing'
    ],
    outputs: ['Un ecosistema coherente de generación de riqueza y soberanía operativa'],
    usageRanges: 'Gobernanza de holdings, venture building y valorización de empresas de conocimiento.',
    criticalConditions: ['Cada etapa debe retroalimentar a la siguiente; no romper el flujo entre la última milla y la creación de IP'],
    industry: 'Holdings de Conocimiento, Venture Studios y Ecosistemas de Innovación',
    industryUseCase: 'Un problema en la atención de un restaurante (Last Mile) se deconstruye y somete a stress test, convirtiéndose en un software SaaS que luego se licencia a 500 restaurantes.',
    industrySopBreach: 'Las corporaciones fragmentan sus iniciativas en empresas desconectadas, perdiendo el 80% del valor de la IP generada en sus operaciones diarias.',
    primaryActors: 'Chief Strategy Architects, Fundadores, Venture Builders',
    resourceImpact: 'Generación de valor patrimonial exponencial mediante activos de propiedad intelectual licenciables.',
    crossLinks: [
      { targetId: 'IP-006', relation: 'sinergia', description: 'Estructura el ecosistema de soberanía' },
      { targetId: 'IP-031', relation: 'engloba', description: 'Engloba la metodología Meta JJ' },
      { targetId: 'IP-080', relation: 'engloba', description: 'Engloba el Divergence Audit' }
    ],
    formulaOrRule: 'Fricción ➔ Deconstrucción ➔ Stress Test ➔ Knowledge ➔ IP ➔ Replicación ➔ Licenciamiento'
  }
];
