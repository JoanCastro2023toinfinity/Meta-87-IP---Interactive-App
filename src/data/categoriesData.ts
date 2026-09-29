import { CategoryInfo, ProblemCategory } from '../types';

export const PROBLEM_CATEGORIES: Record<ProblemCategory, CategoryInfo> = {
  talento_cargas: {
    id: 'talento_cargas',
    name: 'Gobernanza de Talento, Cargas y Descompresión Burocrática',
    shortDesc: 'Alineación de nodos y erradicación de funciones parásitas nacidas de deseos no explícitos',
    problemSolved: 'Contrataciones basadas en vanidad y currículum que colapsan ante la fricción real y generan sobrecostos ocultos.',
    traditionalFailure: 'Evalúa intenciones en entrevistas STAR y títulos académicos, ignorando la tolerancia real a la tensión y la subcultura del equipo.',
    systemicSolution: 'Pregunta madre e interrogación de 5 vectores (Percepción, Riesgo, Sesgo, Capacidad Real, Necesidad Real) para habilitar nodos autodefinidos o disolver roles parásitos.',
    iconName: 'Users'
  },
  divergencia_estrategia_realidad: {
    id: 'divergencia_estrategia_realidad',
    name: 'Auditoría de Divergencia (Estrategia vs. Última Milla)',
    shortDesc: 'Detección de la separación entre lo que la dirección cree que pasa y lo que la operación hace para sobrevivir',
    problemSolved: 'Puntos ciegos ejecutivos, dependencias invertidas en personas clave y fallas operativas ocultas por reportes cosméticos.',
    traditionalFailure: 'Consultorías que imponen manuales gigantescos de procesos que la última milla esquiva clandestinamente para poder trabajar.',
    systemicSolution: 'Lentes de Divergence Audit (Mercado, Capacidad, Sistema, Decisión) que nombran la dependencia, calculan el costo de rotura y devuelven el ownership.',
    iconName: 'GitFork'
  },
  escalabilidad_sin_heroes: {
    id: 'escalabilidad_sin_heroes',
    name: 'Escalamiento, Robustez e Interacciones Sin Héroes',
    shortDesc: 'Gobernanza de la capa de interacciones para que el crecimiento de volumen no destruya la organización',
    problemSolved: 'Colapso por saturación donde el negocio depende del agotamiento físico o mental de fundadores o empleados "héroes".',
    traditionalFailure: 'Agregar más capas de mandos medios y juntas de coordinación que aumentan la latencia y diluyen la responsabilidad.',
    systemicSolution: 'Desacoplamiento de dependencias personales, automatización de interfaces y pruebas de estrés de volumen sin supervisión directa.',
    iconName: 'Zap'
  },
  capital_economics: {
    id: 'capital_economics',
    name: 'Gobernanza de Capital, Flujo y Economics Triangulados',
    shortDesc: 'Gestión del capital como flujo de energía y valor real vs. métricas extractivas y acumulación pasiva',
    problemSolved: 'Asfixia financiera por cobro desconectado del valor, dependencia de deuda extractiva y pricing basado en horas-hombre.',
    traditionalFailure: 'Presupuestación rígida anual y cálculo de precio por hora que castiga la eficiencia e ignora el costo de ruptura evitado.',
    systemicSolution: 'Finanzas trianguladas (Mercado -> Capacidad -> Economics) y retainers calculados por complejidad x capital expuesto x costo de breakpoint.',
    iconName: 'Coins'
  },
  riesgo_breakpoints: {
    id: 'riesgo_breakpoints',
    name: 'Detección, Absorción de Riesgos y Breakpoints Sistémicos',
    shortDesc: 'Superación de auditorías cosméticas mediante la absorción termodinámica de impactos no simulados',
    problemSolved: 'Quiebras catastróficas provocadas por cisnes negros, fugas de clientes clave o rupturas operativas imprevistas.',
    traditionalFailure: 'Matrices de riesgo estáticas en papel que transfieren la culpa a auditorías sin capacidad de contención física en tiempo real.',
    systemicSolution: 'Breakpoint Scanner pre-crisis, triggers automáticos de intervención y dispersión de tensión a través de una red de nodos resilientes.',
    iconName: 'ShieldAlert'
  },
  producto_oferta_modelos: {
    id: 'producto_oferta_modelos',
    name: 'Arquitectura de Producto, Oferta y Modelos de Negocio',
    shortDesc: 'Tracción profunda de diferenciales en mercados insatisfechos y productización de capacidades modulares',
    problemSolved: 'Comoditización, competencia por precio en océanos rojos y ofertas gigantescas que nadie compra por alta fricción de entrada.',
    traditionalFailure: 'Copiar modelos de la competencia o lanzar productos teóricos sin probar el punto de quiebre en contacto con la acción real.',
    systemicSolution: 'Fórmula de burnt oculto, adaptación de modelos globales vía IA, bombardeo de testing con 7-20 respuestas y servicios modulares productizados.',
    iconName: 'Layers'
  },
  criterio_gobernanza_fractal: {
    id: 'criterio_gobernanza_fractal',
    name: 'Criterio, Soberanía y Smart Contracts de Gobernanza',
    shortDesc: 'Custodia del ADN y reglas de decisión para que sistemas autónomos escalen sin perder su raíz fundamental',
    problemSolved: 'Degeneración del propósito y del criterio cuando una empresa crece a través de franquicias, partners o nuevos líderes.',
    traditionalFailure: 'Manuales de compliance de 500 páginas que nadie lee o dependencia de que el fundador supervise cada documento y contrato.',
    systemicSolution: 'Smart Contract of Criterion (10 cláusulas operativas: Identidad, Alcance, Recursos, Criterio, Límites, Triggers, Breakpoints, Escalación, Custodia, Salida) y regla de veto.',
    iconName: 'Scale'
  },
  metodologia_trinchera: {
    id: 'metodologia_trinchera',
    name: 'Metodología de Trinchera e Ingeniería Inversa',
    shortDesc: 'Consolidación de conocimiento extraído directamente del barro, la escasez y la supervivencia extrema',
    problemSolved: 'Teorías de consultoría académica que colapsan ante la falta de presupuesto, la incertidumbre total y la presión de campo.',
    traditionalFailure: 'Diseñar hipótesis en entornos controlados y culpar al "mercado" o al "equipo" cuando chocan contra la realidad física.',
    systemicSolution: 'Cadena de ingeniería inversa: Fricción real -> Adaptación inmediata -> Abstracción del patrón -> Consolidación en IP transferible.',
    iconName: 'Compass'
  }
};
