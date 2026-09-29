import React, { useState } from 'react';
import { IpItem } from '../types';
import { 
  Compass, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sliders, 
  Layers, 
  ChevronRight,
  Flame,
  Users,
  DollarSign,
  Briefcase
} from 'lucide-react';

interface ExecutiveDecisionHelperProps {
  ips: IpItem[];
  onSelectIp: (id: string) => void;
}

interface ExecutiveCrisis {
  id: string;
  title: string;
  category: string;
  symptom: string;
  rootCause: string;
  recommendedSequence: string[]; // IP codes
  immediateAction: string;
  breakpointToWatch: string;
}

const CRISIS_SCENARIOS: ExecutiveCrisis[] = [
  {
    id: 'crisis-cuello-botella',
    title: 'Dependencia Absoluta de Fundadores o 2 "Héroes" que Apagan Fuegos',
    category: 'Escalabilidad sin Héroes & Gobernanza',
    symptom: 'El CEO o CTO no pueden tomar vacaciones de 3 días sin que la operación colapse; cada decisión pasa por su WhatsApp.',
    rootCause: 'Falta de desacoplamiento de criterio y ausencia de custodia fractal (el saber está en la cabeza del individuo, no en el protocolo).',
    recommendedSequence: ['IP-032', 'IP-041', 'IP-042', 'IP-043', 'IP-081', 'IP-082'],
    immediateAction: 'Implementar el protocolo de dependencia invertida (IP-081) y delegar bajo custodia de criterio (IP-043) con veto de raíz.',
    breakpointToWatch: 'Si el fundador interviene más de 2 veces por semana en tareas operativas, se declara quiebre de arquitectura.'
  },
  {
    id: 'crisis-rotacion-talento',
    title: 'Alta Rotación y Agotamiento de Personal Clave en 90 Días',
    category: 'Gobernanza de Cargas y Talento',
    symptom: 'Candidatos con CVs impecables o títulos de posgrado fracasan en la semana 3 o renuncian por fatiga y desorientación.',
    rootCause: 'Los filtros tradicionales seleccionan elocuencia discursiva en vez de calibrar los 5 vectores del nodo y deconstruir los tickets reales.',
    recommendedSequence: ['IP-001', 'IP-002', 'IP-004', 'IP-003', 'IP-020', 'IP-068'],
    immediateAction: 'Aplicar la Pregunta Madre (IP-004) en la entrevista técnica y auditar los parásitos institucionales (IP-020) que saturan al equipo.',
    breakpointToWatch: 'Tolerancia de adaptación máxima: 14 días. Si el colaborador evade la fricción del dato crudo, desvincular inmediatamente.'
  },
  {
    id: 'crisis-dilucion-margen',
    title: 'El Margen Bruto se Desploma Conforme Aumenta el Volumen de Ventas',
    category: 'Economía de Escala & Capital',
    symptom: 'Facturamos 3 veces más que el año pasado, pero la cuenta bancaria de utilidades netas está vacía o en negativo.',
    rootCause: 'Los costos ocultos de breakpoint y la adición lineal de personal devoran el margen; pricing fijado por competencia y no por valor defendible.',
    recommendedSequence: ['IP-034', 'IP-055', 'IP-067', 'IP-070', 'IP-073'],
    immediateAction: 'Triangular el pricing con margen del 50% mínimo garantizado (IP-067) y mapear los costos ocultos de breakpoint (IP-070).',
    breakpointToWatch: 'Margen de contribución inferior al 40% al duplicar volumen dispara alarma roja de rediseño de oferta.'
  },
  {
    id: 'crisis-desalineacion-directiva',
    title: 'La Estrategia en Presentaciones de PPT no Coincide con la Realidad de Trinchera',
    category: 'Divergencia Estrategia-Realidad',
    symptom: 'El directorio aprueba planes grandilocuentes que el equipo de campo no ejecuta o sabotea silenciosamente.',
    rootCause: 'Divergencia de auditoría no declarada; la consultoría cobró por un informe pero no se involucró en la última milla.',
    recommendedSequence: ['IP-080', 'IP-083', 'IP-084', 'IP-018', 'IP-059'],
    immediateAction: 'Desplegar el Divergence Audit de 4 lentes (IP-080 e IP-083) y auditar los costos desplazados (IP-084).',
    breakpointToWatch: 'Cualquier recomendación que tarde más de 7 días en generar un activo tangible de campo queda automáticamente vetada.'
  },
  {
    id: 'crisis-expansion-franquicias',
    title: 'Apertura de Nuevas Sucursales / Sedes Deteriora la Calidad del Servicio Matriz',
    category: 'Soberanía Operativa & Ensamble',
    symptom: 'La primera sede funcionaba de maravilla, pero las sedes 2 y 3 reciben quejas constantes y tienen tiempos de espera intolerables.',
    rootCause: 'La primera sede dependía de la presencia física del líder; las recetas u operaciones no estaban parametrizadas para ensamble ciego.',
    recommendedSequence: ['IP-046', 'IP-036', 'IP-038', 'IP-078', 'IP-079'],
    immediateAction: 'Separar la preparación previa en planta central y convertir la sucursal en mera estación de ensamble de 4 minutos (IP-046).',
    breakpointToWatch: 'Tiempo de despacho superior a 6 minutos en hora pico exige intervención inmediata de la línea de ensamble.'
  },
  {
    id: 'crisis-proteccion-patrimonial',
    title: 'Riesgo Legal, Tributario o Sucesorio sobre Activos de la Empresa y la Familia',
    category: 'Blindaje Patrimonial & Fideicomisos',
    symptom: 'Vulnerabilidad ante demandas laborales, embargos o conflictos entre socios/herederos que amenazan con liquidar la operación.',
    rootCause: 'Confusión patrimonial entre los bienes de los socios y los activos operativos; ausencia de vehículos autónomos fiduciarios.',
    recommendedSequence: ['IP-047', 'IP-048', 'IP-061', 'IP-078', 'IP-079'],
    immediateAction: 'Estructurar patrimonios autónomos fiduciarios (IP-047) bajo filosofía Zero Estate (IP-048) y formalizar el Smart Contract de Criterio (IP-079).',
    breakpointToWatch: 'Cualquier activo de capital que esté a nombre de personas naturales expuestas a litigios civiles o comerciales.'
  }
];

export const ExecutiveDecisionHelper: React.FC<ExecutiveDecisionHelperProps> = ({ ips, onSelectIp }) => {
  const [selectedCrisisId, setSelectedCrisisId] = useState<string>(CRISIS_SCENARIOS[0].id);

  const currentCrisis = CRISIS_SCENARIOS.find((c) => c.id === selectedCrisisId) || CRISIS_SCENARIOS[0];

  const resolvedIps = currentCrisis.recommendedSequence
    .map((code) => ips.find((i) => i.code === code || i.id === code))
    .filter((i): i is IpItem => Boolean(i));

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Compass className="w-5 h-5 text-emerald-600" />
          <span>Selector Ejecutivo de Fricción &amp; Protocolos de Intervención</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl">
          Triaje de baja carga cognitiva para decisores, inversionistas y directores C-Level. Selecciona la fricción actual de tu organización para obtener la secuencia exacta de IPs a desplegar.
        </p>

        {/* Crisis selection tabs */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {CRISIS_SCENARIOS.map((c) => {
            const isSelected = c.id === currentCrisis.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCrisisId(c.id)}
                className={`p-3.5 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                    {c.category}
                  </span>
                  <span className="font-bold text-slate-900 line-clamp-2 leading-snug">
                    {c.title}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-700 font-semibold">{c.recommendedSequence.length} IPs recetadas</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Crisis Prescription */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Diagnóstico Sistémico
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            {currentCrisis.title}
          </h2>
        </div>

        {/* Diagnosis & Cause Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-rose-50/50 border border-rose-200/80 p-4 rounded-xl">
            <span className="font-bold text-rose-900 block mb-1">Síntoma Visible en la Organización:</span>
            <p className="text-slate-700 leading-relaxed">{currentCrisis.symptom}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <span className="font-bold text-slate-900 block mb-1">Causa Raíz Arquitectónica:</span>
            <p className="text-slate-700 leading-relaxed">{currentCrisis.rootCause}</p>
          </div>
        </div>

        {/* Prescribed Immediate Action & Breakpoint */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-emerald-50/50 border border-emerald-200/80 p-4 rounded-xl">
            <span className="font-bold text-emerald-900 block mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Acción Inmediata a Ejecutar Hoy:
            </span>
            <p className="text-slate-800 font-medium leading-relaxed">{currentCrisis.immediateAction}</p>
          </div>
          <div className="bg-amber-50/50 border border-amber-200/80 p-4 rounded-xl">
            <span className="font-bold text-amber-900 block mb-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              Breakpoint / Umbral Crítico de Control:
            </span>
            <p className="text-slate-800 font-medium leading-relaxed">{currentCrisis.breakpointToWatch}</p>
          </div>
        </div>

        {/* Recommended Sequence of IPs */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Secuencia de IPs a Desplegar en Orden:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {resolvedIps.map((ip, idx) => (
              <div
                key={ip.id}
                onClick={() => onSelectIp(ip.id)}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-emerald-50/30 hover:border-emerald-400 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {ip.code}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                      {ip.immediateApplicability}%
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {ip.name}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                    {ip.purpose}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-emerald-700 font-medium">
                  <span>Abrir ficha completa</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
