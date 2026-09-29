import React, { useState } from 'react';
import { IpItem } from '../types';
import { 
  GitFork, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  Cpu, 
  Scale, 
  Zap, 
  ShieldAlert, 
  Sparkles 
} from 'lucide-react';

interface CrossMatrixViewProps {
  ips: IpItem[];
  onSelectIp: (id: string) => void;
}

interface FunctionalPipeline {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  sequence: string[]; // IP IDs
  handoverDescription: string;
}

const PIPELINES: FunctionalPipeline[] = [
  {
    id: 'pipe-talento',
    name: 'Cadena 1: Deconstrucción Burocrática y Gobernanza de Talento',
    subtitle: 'Desde el colapso del filtro tradicional hasta la disolución de parásitos institucionales',
    color: 'blue',
    sequence: ['IP-001', 'IP-002', 'IP-004', 'IP-003', 'IP-020'],
    handoverDescription: 'IP-001 filtra en papel ➔ IP-002 detecta la ruptura en ejecución ➔ IP-004 perfora el discurso con la Pregunta Madre ➔ IP-003 valida los 5 vectores del nodo ➔ IP-020 escanea y elimina roles parásitos.'
  },
  {
    id: 'pipe-metajj',
    name: 'Cadena 2: Meta JJ a Scalability (Deconstrucción de Burnt a Robustez)',
    subtitle: 'Desde el diagnóstico del síntoma hasta el escalamiento sin depender de héroes',
    color: 'indigo',
    sequence: ['IP-031', 'IP-033', 'IP-034', 'IP-036', 'IP-037', 'IP-038', 'IP-032'],
    handoverDescription: 'IP-031 define la estrategia ➔ IP-033 aísla las 8 preguntas de burnt ➔ IP-034 calcula la ecuación económica ➔ IP-036 bombardea puntos de quiebre ➔ IP-037 itera 20 respuestas ➔ IP-038 ejecuta tracción mínima ➔ IP-032 escala la interacción sin héroes.'
  },
  {
    id: 'pipe-tripode',
    name: 'Cadena 3: Trípode de Poder, Criterio y Smart Contract',
    subtitle: 'Equilibrio de contrapesos y blindaje del ADN fundador en sistemas replicables',
    color: 'amber',
    sequence: ['IP-041', 'IP-042', 'IP-043', 'IP-078', 'IP-079'],
    handoverDescription: 'IP-041 balancea los 4 roles ➔ IP-042 devuelve preguntas de claridad ➔ IP-043 ejerce el veto de raíz fundamental ➔ IP-078 custodia el criterio fractal ➔ IP-079 sella las 10 cláusulas operativas.'
  },
  {
    id: 'pipe-audit',
    name: 'Cadena 4: Divergence Audit & Retiro Seguro del Estratega',
    subtitle: 'Detección de la separación estrategia-realidad y desactivación de dependencia invertida',
    color: 'emerald',
    sequence: ['IP-080', 'IP-083', 'IP-081', 'IP-082', 'IP-084'],
    handoverDescription: 'IP-080 inicia la auditoría de divergencia ➔ IP-083 evalúa con 4 lentes (Mercado, Capacidad, Sistema, Decisión) ➔ IP-081 nombra y devuelve la dependencia invertida ➔ IP-082 veta la perpetuidad del auditor ➔ IP-084 audita costos desplazados.'
  },
  {
    id: 'pipe-axis',
    name: 'Cadena 5: Axis Breakpoint Intelligence & Reutilización de IP',
    subtitle: 'Intervención pre-breakpoint y monetización de conocimiento en activos licenciables',
    color: 'rose',
    sequence: ['IP-072', 'IP-073', 'IP-074', 'IP-075'],
    handoverDescription: 'IP-072 orquesta la reconversión ➔ IP-073 escanea puntos de quiebre inminentes ➔ IP-074 audita la resiliencia operativa real ➔ IP-075 empaqueta la solución en IP transferible y licenciable.'
  },
  {
    id: 'pipe-cadena-valor',
    name: 'Cadena 6: Cadena Integral de Transformación de Fricción en Soberanía',
    subtitle: 'El ciclo macro que convierte una brecha de última milla en valor civilizatorio duradero',
    color: 'purple',
    sequence: ['IP-018', 'IP-056', 'IP-055', 'IP-060', 'IP-061', 'IP-087'],
    handoverDescription: 'IP-018 extrae el patrón del barro ➔ IP-056 ejecuta el bootstrap loop ➔ IP-055 triangula la viabilidad financiera ➔ IP-060 delega la ejecución ➔ IP-061 aísla legalmente el activo ➔ IP-087 unifica la cadena de licenciamiento.'
  }
];

export const CrossMatrixView: React.FC<CrossMatrixViewProps> = ({ ips, onSelectIp }) => {
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>('pipe-talento');

  const activePipeline = PIPELINES.find((p) => p.id === selectedPipelineId) || PIPELINES[0];

  const pipelineIps = activePipeline.sequence
    .map((code) => ips.find((item) => item.code === code || item.id === code))
    .filter((item): item is IpItem => Boolean(item));

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <GitFork className="w-5 h-5 text-blue-600" />
              <span>Cruce Funcional e Interconexión de IPs</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Mapeo de interdependencias operativas: cómo el output de una IP se convierte en el input o detonador de la siguiente, formando circuitos cerrados de gobernanza.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 self-start md:self-auto">
            {PIPELINES.length} Circuitos Maestros Integrados
          </span>
        </div>

        {/* Pipeline Selector Pills */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {PIPELINES.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPipelineId(p.id)}
              className={`p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                selectedPipelineId === p.id
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div>
                <span className="font-bold text-slate-900 block">{p.name}</span>
                <span className="text-[11px] text-slate-500 line-clamp-2 mt-1 font-normal">
                  {p.subtitle}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-3 font-mono text-[10px] text-slate-600">
                <span>{p.sequence.length} IPs enlazadas</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Pipeline Flow Visualizer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Circuito Activo Seleccionado
          </span>
          <h2 className="text-lg font-bold text-slate-900 mt-0.5">
            {activePipeline.name}
          </h2>
          <p className="text-xs text-slate-600 mt-1 font-medium bg-slate-50 p-3 rounded-lg border border-slate-200/80">
            <span className="font-bold text-slate-800">Lógica del Handover de Datos:</span> {activePipeline.handoverDescription}
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Secuencia Operativa Paso a Paso:
          </h3>

          <div className="flex flex-col space-y-3">
            {pipelineIps.map((ip, idx) => (
              <div key={ip.id} className="relative">
                <div 
                  onClick={() => onSelectIp(ip.id)}
                  className="bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-400 p-4 rounded-xl transition-all cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-700">
                          {ip.code}
                        </span>
                        <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                          {ip.type}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700">
                          {ip.immediateApplicability}% aplicable
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5">
                        {ip.name}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 max-w-3xl">
                        {ip.purpose}
                      </p>
                    </div>
                  </div>

                  {/* Input / Output preview pills */}
                  <div className="flex flex-row md:flex-col items-end gap-1 shrink-0 text-[11px]">
                    <span className="text-slate-500 font-medium text-right">
                      <span className="font-bold text-blue-600">Input:</span> {ip.inputs[0]}
                    </span>
                    <span className="text-slate-500 font-medium text-right">
                      <span className="font-bold text-emerald-600">Output:</span> {ip.outputs[0]}
                    </span>
                  </div>
                </div>

                {/* Connector Arrow if not last */}
                {idx < pipelineIps.length - 1 && (
                  <div className="flex justify-center my-1">
                    <div className="h-5 w-0.5 bg-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cross-Link Table for all IPs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Directorio de Cruces entre IPs (&gt;120 Vínculos Funcionales)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Consulta cómo cada herramienta delega o alimenta a otras piezas de la meta-arquitectura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ips
            .filter((i) => i.crossLinks && i.crossLinks.length > 0)
            .slice(0, 18)
            .map((ip) => (
              <div 
                key={ip.id}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all text-xs"
              >
                <div className="flex items-center justify-between font-mono font-bold text-slate-900 mb-1">
                  <span className="hover:text-blue-600 cursor-pointer" onClick={() => onSelectIp(ip.id)}>
                    {ip.code}: {ip.name.slice(0, 24)}...
                  </span>
                  <span className="text-[10px] text-slate-500">{ip.crossLinks.length} cruces</span>
                </div>
                <div className="space-y-1.5 mt-2">
                  {ip.crossLinks.map((link, lIdx) => (
                    <div 
                      key={lIdx}
                      onClick={() => onSelectIp(link.targetId)}
                      className="p-1.5 rounded bg-white border border-slate-100 hover:border-blue-300 flex items-center justify-between text-[11px] cursor-pointer"
                    >
                      <span className="text-slate-700">
                        ➔ <span className="font-mono font-semibold text-blue-600">{link.targetId}</span>: {link.relation}
                      </span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
