import { IndustrySopMapItem } from '../types';

export const INDUSTRY_SOP_MAP_DATA: IndustrySopMapItem[] = [
  {
    industry: 'BPO, Contact Centers & Remote Staffing',
    sector: 'Servicios Operacionales Distribuidos',
    typicalSopFailure: 'Contratación masiva por CV y títulos académicos; supervisión por microgestión horaria; manuales rígidos de scripts que los agentes evaden para resolver llamadas reales.',
    costOfBreach: 'Rotación temprana del 35-50% en los primeros 90 días, costos de reemplazo de $4,500 USD por puesto y deterioro progresivo del CSAT.',
    solvingIps: ['IP-001', 'IP-002', 'IP-003', 'IP-066', 'IP-067', 'IP-068'],
    caseStudyTitle: 'Reconversión de Soporte B2B Bilingüe (Splendor Architecture)',
    caseStudySummary: 'Se sustituyó el modelo tradicional de contratación por la deconstrucción de tickets (IP-068) y el SLA de capacidad gestionada (IP-066). El pricing se trianguló con margen bruto del 50% garantizado (IP-067).',
    beforeMetric: 'Rotación del 42%, tiempo medio de respuesta 45 min, costo por ticket $8.50',
    afterMetric: 'Rotación reducida al 9%, SLA < 5 min asegurado, costo por ticket optimizado a $3.20'
  },
  {
    industry: 'Tech Startups & SaaS en Fase Scale-Up',
    sector: 'Tecnología e Hipercrecimiento',
    typicalSopFailure: 'Escalamiento mediante contratación desordenada de mandos medios; acumulación de deuda técnica; directores convertidos en "héroes" apagafuegos.',
    costOfBreach: 'Agotamiento y burnout de fundadores clave, quiebre de releases de producto y consumo descontrolado de la ronda de inversión (burn rate desbocado).',
    solvingIps: ['IP-032', 'IP-069', 'IP-070', 'IP-071', 'IP-080', 'IP-081', 'IP-082'],
    caseStudyTitle: 'Chief of Scalability Externo en Startup Serie B (Renasci)',
    caseStudySummary: 'Intervención de 8 meses con retainer triangulado por costo de breakpoint (IP-070). Se desacoplaron las dependencias de los fundadores mediante el protocolo de dependencia invertida (IP-081) y se aplicó la regla de veto anti-dependencia (IP-082).',
    beforeMetric: 'Volumen 3,000 transacciones/día saturaba al equipo directivo; 14 horas de trabajo diario del CTO',
    afterMetric: 'Capacidad expandida a 25,000 transacciones/día con 0 intervenciones manuales del CTO'
  },
  {
    industry: 'Gastronomía, Dark Kitchens & Franquicias',
    sector: 'Hospitalidad y Alimentos',
    typicalSopFailure: 'Dependencia absoluta de un chef fundador para cocinar y supervisar; recetas no parametrizadas; inconsistencia de sabor y tiempos de espera disparados en horas pico.',
    costOfBreach: 'Incapacidad de abrir una segunda o tercera sucursal sin que caiga la calidad del local matriz; quiebra por sobrecostos de mermas.',
    solvingIps: ['IP-031', 'IP-046', 'IP-036', 'IP-038', 'IP-043'],
    caseStudyTitle: 'Escalamiento de Franquicia de Hamburguesería Gourmet',
    caseStudySummary: 'Centralización de bases, salsas y molienda en planta de ensamblaje (IP-046). La cocina en tienda se redujo a ensamble en 4 minutos, eliminando el chef en sucursal bajo custodia del criterio (IP-043).',
    beforeMetric: '2 locales al límite de fatiga, tiempo de servicio de 24 min, 12% de mermas de carne',
    afterMetric: '18 locales franquiciados en 18 meses, tiempo de servicio de 6 min, mermas < 1.5%'
  },
  {
    industry: 'Comercio Transfronterizo de Lujo & Gemología',
    sector: 'Bienes de Alto Patrimonio y Lujo',
    typicalSopFailure: 'Venta de gemas al mayoreo a precios de comoditización; intermediación opaca que se queda con el 70% del valor; desconfianza del comprador asiático.',
    costOfBreach: 'Pérdida de millones de dólares en margen bruto al competir por volumen contra yacimientos masivos (ej. Afganistán).',
    solvingIps: ['IP-044', 'IP-031', 'IP-015', 'IP-014', 'IP-061'],
    caseStudyTitle: 'Venta Directa de Esmeraldas Colombianas B2C a Asia',
    caseStudySummary: 'Se diseñó un modelo de co-creación y personalización única que capitalizó el origen geográfico como "silencio premium" (IP-044), blindando transacciones mediante fiduciaria internacional (IP-061).',
    beforeMetric: 'Margen bruto de venta a intermediarios: 18-22%',
    afterMetric: 'Margen bruto directo al comprador final en Singapur y Tokio: 72%'
  },
  {
    industry: 'Real Estate & Inversión en Activos Estresados',
    sector: 'Bienes Raíces y Fondos Inmobiliarios',
    typicalSopFailure: 'Compra de inmuebles a título personal o sociedades simples; entrampamiento judicial de años en procesos de desalojo; pasivos tributarios ocultos.',
    costOfBreach: 'Capital inmovilizado durante 3 a 5 años sin rentabilidad, pérdida de valor por deterioro físico y demandas civiles cruzadas.',
    solvingIps: ['IP-047', 'IP-048', 'IP-010', 'IP-016', 'IP-061'],
    caseStudyTitle: 'Fideicomiso de Remates Judiciales en Colombia',
    caseStudySummary: 'Captura de activos comerciales con 45% de descuento en subastas judiciales, aislando cada propiedad en un patrimonio autónomo fiduciario (IP-047) con estructura zero estate (IP-048).',
    beforeMetric: 'Inversión atomizada con 18 meses de trámite legal y riesgo patrimonial personal',
    afterMetric: 'Ciclo cerrado de adquisición y reventa en 9 meses con ROI neto de 28.5% anual'
  },
  {
    industry: 'E-commerce & Amazon FBA Logistics',
    sector: 'Comercio Electrónico y 3PL',
    typicalSopFailure: 'Dependencia ciega de los algoritmos y almacenes de Amazon FBA; nula atención humana; inventario extraviado sin indemnización clara.',
    costOfBreach: 'Cuentas de vendedor suspendidas intempestivamente, retención de cientos de miles de dólares en fondos y pérdida total del canal de ventas.',
    solvingIps: ['IP-045', 'IP-031', 'IP-033', 'IP-034'],
    caseStudyTitle: 'Rediseño de Membresía Logística para Sellers de Amazon',
    caseStudySummary: 'Se identificó el burnt oculto de los vendedores (IP-033) y se ofreció un servicio de preparación previa 3PL con inspección en video y soporte humano 24/7 bajo modelo de membresía (IP-045).',
    beforeMetric: 'Tasa de rechazo y pérdida en Amazon: 4.8% del stock, 0 soporte humano',
    afterMetric: 'Incidencias reducidas a 0.1%, fidelización de clientes de membresía > 94%'
  },
  {
    industry: 'Family Offices & Gestión de Patrimonio Familiar',
    sector: 'Banca Privada y Sucesión de Capital',
    typicalSopFailure: 'Pacto sucesorio redactado por abogados sin transferencia de criterio; concentración de decisiones en el patriarca/matriarca; conflicto violento entre herederos.',
    costOfBreach: 'Destrucción del 70% del patrimonio familiar en la segunda generación y litigios judiciales que congelan empresas operativas.',
    solvingIps: ['IP-009', 'IP-017', 'IP-048', 'IP-078', 'IP-079', 'IP-041'],
    caseStudyTitle: 'Transferencia Fractal de Criterio en Grupo Familiar de 3ra Generación',
    caseStudySummary: 'Implementación del Smart Contract of Criterion con 10 cláusulas (IP-079) y formación del sucesor mediante el protocolo del Conciliere (IP-042), separando propiedad de administración (IP-048).',
    beforeMetric: 'Toma de decisiones centralizada 100% en el fundador de 74 años; discusiones familiares diarias',
    afterMetric: 'Directorio autónomo con sucesor liderando y fundador retirado sin pérdida de valor'
  },
  {
    industry: 'Firmas de Consultoría & Boutiques de Servicios Profesionales',
    sector: 'Servicios Profesionales de Alto Valor',
    typicalSopFailure: 'Venta de horas-hombre; prometer "nos encargamos de todo"; convertirse en el cuello de botella operativo del cliente; reportes teóricos en PDF.',
    costOfBreach: 'Agotamiento físico del socio director, incapacidad de escalar más allá de 3 clientes y riesgo de demandas por promesas fuera de control.',
    solvingIps: ['IP-080', 'IP-081', 'IP-082', 'IP-083', 'IP-059', 'IP-063'],
    caseStudyTitle: 'Despliegue del Divergence Audit en Boutique de Transformación',
    caseStudySummary: 'Se estructuró la oferta como un solo producto: Divergence Audit (IP-080). Se aplicaron los 4 lentes (IP-083), se entregaron activos tangibles (IP-059) y se vetó cualquier dependencia del auditor (IP-082).',
    beforeMetric: 'Fee por hora de $150 USD con 60 horas semanales de reuniones estériles',
    afterMetric: 'Retainers fijos de $25k/mes basados en valor con solo 6 horas semanales de intervención'
  }
];
