import { PostMortemPreset } from '../types';

export const REAL_POST_MORTEM_PRESETS: PostMortemPreset[] = [
  {
    id: 'pm-01-last-mile-burnout',
    title: 'Colapso de Soporte L1/L2 tras Lanzamiento masivo (Burnout y Renuncia en Masa)',
    category: 'talento_cargas',
    industry: 'Logística / SaaS B2B',
    affectedArea: 'Operaciones de Trinchera & Customer Support',
    businessImpact: '$180,000 USD en churn de clientes en 14 días + 45% de rotación de operadores.',
    teamContext: '22 agentes de soporte atendiendo 1,400 tickets/día sin filtros de validación de entrada.',
    summary: 'Tras el despliegue de la versión 4.0, un error de sincronización inundó a los operadores con tickets ambiguos. El SOP existente dictaba responder en menos de 15 minutos sin facultades para vetar pedidos erróneos. Tres analistas senior renunciaron en la misma semana y el CTO debió intervenir a altas horas de la madrugada.',
    incidentLogs: `[14:02:11] Release v4.0.2 deployed to production cluster
[14:15:30] Alert: Inbound queue > 800 pending tasks. SLA breached.
[15:30:00] Operators reporting: Clients calling regarding missing data; no scripts available.
[17:00:15] Operator ticket load: 85 open cases/person. Cognitive overload alert.
[19:45:00] 3 Resignations submitted. Escalation reaching founder directly.`
  },
  {
    id: 'pm-02-founder-single-point-of-failure',
    title: 'Parálisis Operativa por Dependencia Exclusiva del Fundador / Lead Architect',
    category: 'escalabilidad_sin_heroes',
    industry: 'Fintech / Pasarela de Pagos',
    affectedArea: 'Ingeniería, Compliance & Riesgo de Crédito',
    businessImpact: 'Demora de 19 días en aprobación de cuentas enterprise ($420k en comisiones frenadas).',
    teamContext: 'Equipo de 35 personas donde todas las excepciones debían ser firmadas en Slack por el Fundador.',
    summary: 'El Fundador asistió a una gira de levantamiento de capital en Asia durante 10 días. El equipo de onboarding y compliance detuvo 64 integraciones de clientes porque el SOP tradicional decía "consultar caso atípico con Dirección". Se generó pánico interno, acusaciones cruzadas y un cuello de botella fatal.',
    incidentLogs: `[Día 1 09:00] CEO on flight / offline for 14 hours.
[Día 3 11:30] Compliance holds 28 accounts awaiting CEO custom risk exception.
[Día 5 16:00] Sales Director complaints: Pipeline blocked, SLAs violated.
[Día 8 18:00] CEO inbox: 342 unread urgent escalation threads in Slack.`
  },
  {
    id: 'pm-03-margin-breakpoint-dilution',
    title: 'Erosión Catastrófica de Margen Bruto por Crecimiento de Volumen (Breakpoint No Mapeado)',
    category: 'capital_economics',
    industry: 'Supply Chain / Manufactura Liviana',
    affectedArea: 'Finanzas, Adquisiciones & Operaciones Logísticas',
    businessImpact: 'Margen neto cayó de +26% a -8% a pesar de que la facturación creció un 140%.',
    teamContext: 'La empresa celebró duplicar contratos corporativos, sin notar que el costo de atenderlos crecía exponencialmente.',
    summary: 'A medida que se ganaron 15 nuevos clientes corporativos, los costos ocultos de SLAs personalizados, viajes de soporte de emergencia y reprocesos manuales devoraron el flujo de caja. El SOP de ventas no tenía triangulación de pricing ni cláusulas de penalización por entropía de requerimientos.',
    incidentLogs: `[Q1 Close] Revenue: +140% YoY. Team celebrates.
[Q2 Month 1] Working Capital Warning: Cash burn exceeded operational inflows.
[Q2 Month 2] Margin Audit: Large client accounts consuming 3.2x more engineering hours than budgeted.
[Q2 Month 3] Emergency board meeting: Capital freeze and risk of payroll default.`
  },
  {
    id: 'pm-04-strategy-reality-divergence',
    title: 'Consultoría Desconectada de la Trinchera: El "Manual de 200 Páginas" que Nadie Usó',
    category: 'divergencia_estrategia_realidad',
    industry: 'Retail & Distribución Omnicanal',
    affectedArea: 'Bodegas, Despachos & Mandos Medios',
    businessImpact: '$95,000 USD gastados en asesoría estratégica desechada en 60 días tras resistencia del piso operativo.',
    teamContext: 'Consultora de renombre entregó un marco teórico sofisticado pero inaplicable a la velocidad de la bodega.',
    summary: 'La dirección contrató consultoría para optimizar despachos. El documento entregado usaba jerga compleja e imponía 12 aprobaciones en software que los operarios de picking no tenían tiempo de llenar. Para cumplir tiempos, los operarios falseaban los datos en planillas paralelas de Excel.',
    incidentLogs: `[Semana 2] Operations audit reveals: System compliance is 14%.
[Semana 4] Warehouse supervisor: "Si lleno esos 12 formularios no sale ningún camión a tiempo".
[Semana 6] Shadow Excel spreadsheets found governing 90% of actual shipments.
[Semana 8] Official strategy abandoned; consultors blame 'resistance to change'.`
  },
  {
    id: 'pm-05-last-mile-dispatcher-panic',
    title: 'Parada Crítica de Envíos en Última Milla: El Algoritmo de Ruteo falló ante Lluvias',
    category: 'metodologia_trinchera',
    industry: 'Logística de Última Milla & Delivery Urbano',
    affectedArea: 'Dispatchers de Trinchera, Repartidores y SAC',
    businessImpact: '3,800 paquetes varados, penalización de $65,000 USD de marketplaces y 850 llamadas furiosas de clientes.',
    teamContext: '6 despachadores de turno manejando 450 motoristas bajo un SOP ciego que no permitía excepciones manuales.',
    summary: 'Una tormenta súbita anegó 3 arterias principales. El software de ruteo automático continuó asignando pedidos por esas vías. El SOP prohibía a los dispatchers reasignar zonas sin autorización del Gerente Regional (quien estaba inalcanzable). Los repartidores se amotinaron en el hub.',
    incidentLogs: `[16:10] Rain sensor alert: Arteria Norte inundada.
[16:25] 12 couriers report blocked access. Dispatcher tries to manually reroute; system displays "Permission Denied: Supervisor override required".
[17:00] Inbound queue reaches 1,200 pending customer calls.
[18:30] Hub director arrives: 4 hours of delay accumulated.`
  },
  {
    id: 'pm-06-ghost-custom-features-dilution',
    title: 'SaaS B2B: El "Cliente Enterprise" que Secuestró la Capacidad de Todo el Equipo',
    category: 'producto_oferta_modelos',
    industry: 'Software B2B Enterprise',
    affectedArea: 'Producto, DevOps & Soporte Especializado',
    businessImpact: 'Demora de 4 meses en el roadmap general; renuncia de 2 desarrolladores core y pérdida de 6 clientes medianos.',
    teamContext: 'Ventas cerró un contrato de $100k prometiendo "desarrollo a medida ilimitado" sin fijar contrapesos ni penalizaciones.',
    summary: 'Un cliente corporativo grande exigió 38 cambios de arquitectura fuera de alcance. Para no perder el cliente, el equipo desvió a todos los ingenieros a parchar código exclusivo. Los clientes estándar quedaron desatendidos y se generó una deuda técnica impagable.',
    incidentLogs: `[Mes 1] Enterprise customer signs contract with custom SLA appendix.
[Mes 2] 74 custom feature requests filed. Standard bug backlog grows by 320%.
[Mes 3] Churn in mid-tier customers surges from 1.8% to 6.4%.
[Mes 4] Lead Architect warning: "No tenemos un producto; somos una agencia de software precarizada".`
  }
];

