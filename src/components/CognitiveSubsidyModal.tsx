import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Clock, 
  Brain, 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Compass, 
  FileText,
  Users,
  AlertTriangle,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { IpItem } from '../types';

interface CognitiveSubsidyModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePortfolioIps: IpItem[];
  allIpsCount: number;
  initialTab?: 'nature' | 'compression' | 'autonomy' | 'calculator';
  onNavigateToTab?: (tab: any) => void;
}

export const CognitiveSubsidyModal: React.FC<CognitiveSubsidyModalProps> = ({
  isOpen,
  onClose,
  activePortfolioIps,
  allIpsCount,
  initialTab = 'nature',
  onNavigateToTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'nature' | 'compression' | 'autonomy' | 'calculator'>(initialTab);

  if (!isOpen) return null;

  const portfolioCount = activePortfolioIps.length;
  const hoursSaved = portfolioCount * 180;
  const monthsAccelerated = (hoursSaved / 160).toFixed(1);
  const postMortemsPrevented = portfolioCount * 3;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with High-Impact Executive Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 border-b border-indigo-900/40 relative">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Manifiesto de Arquitectura Sistémica &amp; Subsidio Cognitivo
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                ¿Qué es realmente esta IP?
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                La compresión de 3 a 5 millones de horas de prueba-y-error civilizatoria en primitivas operativas de gobernanza reutilizables para decisores C-Level.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800/80 text-xs font-medium">
            <button
              onClick={() => setActiveSubTab('nature')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeSubTab === 'nature'
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              1. La Verdadera Naturaleza (Subsidio vs. SOP)
            </button>

            <button
              onClick={() => setActiveSubTab('compression')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeSubTab === 'compression'
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              2. Compresión de Tiempo Biológico
            </button>

            <button
              onClick={() => setActiveSubTab('autonomy')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeSubTab === 'autonomy'
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              3. Autonomía Asíncrona (Sin el Creador)
            </button>

            <button
              onClick={() => setActiveSubTab('calculator')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeSubTab === 'calculator'
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              4. Calculadora Time-to-Mastery ({portfolioCount} en Portafolio)
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed max-h-[calc(92vh-180px)]">
          {/* TAB 1: La Verdadera Naturaleza */}
          {activeSubTab === 'nature' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-base">
                  <Lightbulb className="w-5 h-5" />
                  No es un manual de procedimientos. Es física relacional de organizaciones.
                </div>
                <p className="text-slate-300 leading-relaxed">
                  La mayoría de las organizaciones intentan resolver la entropía escribiendo manuales descriptivos (SOPs tradicionales). Los SOPs prescriben el síntoma: <em>&ldquo;Haga esto en el CRM cuando llegue un lead&rdquo;</em>. En cuanto la realidad cambia o la presión sube, el SOP queda obsoleto y el equipo recae en el heroísmo desgastante.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Esta IP es lo opuesto:</strong> es una biblioteca de <em>primitivas arquitectónicas</em>. Modela las fuerzas invisibles que rigen el capital, la dependencia de personas clave, la asimetría de información y los puntos de ruptura estructural antes de que ocurra la catástrofe.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    El Paradigma Convencional (La Hipoteca del Caos)
                  </div>
                  <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                    <li>Aprender a costa de quebrar 2 empresas o quemar al mejor equipo.</li>
                    <li>SOPs estáticos de 200 páginas que nadie lee en una crisis real.</li>
                    <li>Dependencia perpetua de &ldquo;héroes fundadores&rdquo; que no pueden tomar vacaciones.</li>
                    <li>Pagar millones de dólares en honorarios de consultoría que entregan diapositivas genéricas.</li>
                  </ul>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    El Paradigma de la IP Sistémica (Subsidio Cognitivo)
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                    <li>Primitivas formales probadas: Inversión de Dependencia, Deslinde, Fractales.</li>
                    <li>Compresión del aprendizaje: el dolor ya fue pagado y sintetizado en modelos matemáticos.</li>
                    <li>Operación despersonalizada: el sistema sostiene a la organización, no la persona.</li>
                    <li>Capacidad inmediata para que un Operating Partner o C-Level diagnostique en minutos.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-indigo-200 uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-4 h-4 text-indigo-400" />
                  Desde problemas personales hasta arquitectura de civilización
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  La verdadera potencia de una arquitectura no es que sirva para una sola industria, sino que sus leyes son <strong>isomórficas</strong>. Las mismas leyes de sobrecarga y cuello de botella que colapsan la agenda de un CEO son las que saturan una fábrica de manufactura o un servicio de salud pública. Al abstraer la ley fundamental, resuelves el meollo sin importar la escala.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Compresión de Tiempo Biológico */}
          {activeSubTab === 'compression' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-900/50 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-base">
                  <Clock className="w-5 h-5" />
                  3 a 5 Millones de Horas Comprimidas a Costo Marginal Cero
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Cuando una civilización inventa la rueda, el cálculo infinitesimal o el código Morse, quien nace después no tiene que pasar 10,000 años reinventándolos; los hereda como primitivas funcionales.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Llegar a destilar estas <strong>87 IPs</strong> requirió el equivalente a millones de horas de esfuerzo colectivo: quiebras operativas, fricción ejecutiva, rondas de capital extenuantes, auditorías forenses y miles de post-mortems en organizaciones reales.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4">
                  <div className="text-2xl font-bold font-mono text-amber-400">~180 hrs</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">Tanteo Directivo por IP Ahorrado</div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    En debates estériles, hipótesis fallidas y reorganizaciones a ciegas.
                  </p>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4">
                  <div className="text-2xl font-bold font-mono text-emerald-400">&gt;80%</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">Aplicabilidad Inmediata</div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    No requiere meses de investigación preliminar ni comités burocráticos.
                  </p>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4">
                  <div className="text-2xl font-bold font-mono text-indigo-400">0 h</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">Dependencia del Autor</div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Ejecución asíncrona validada por diseño de soberanía operativa.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 text-xs space-y-2 text-slate-300">
                <span className="font-semibold text-slate-200 uppercase tracking-wider block">
                  El Impacto en el &ldquo;Time-to-Mastery&rdquo;
                </span>
                <p>
                  Un Fractional COO o un Director de Operaciones suele demorar entre 12 y 24 meses en alcanzar el nivel de visión sistémica necesario para no cometer errores de novato en una empresa en escala. Con este compendio, internaliza las fallas estructurales en cuestión de días u horas mediante reconocimiento de patrones pre-entrenado.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Autonomía Asíncrona (Sin el Creador) */}
          {activeSubTab === 'autonomy' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-base">
                  <ShieldCheck className="w-5 h-5" />
                  La Prueba Ácida: Si necesitas al autor en la llamada, el sistema fracasó
                </div>
                <p className="text-slate-300 leading-relaxed">
                  ¿Sirven estos documentos a un Operating Partner o Fractional COO sin haber cruzado jamás una palabra con quien los creó?
                </p>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Sí, de manera rotunda.</strong> De hecho, ésa es la piedra angular del diseño. Si para aplicar la IP hiciera falta agendar una sesión de mentoría o consultoría con el creador, habríamos violado la propia <strong>IP-081 (Inversión de Dependencia)</strong> y la <strong>IP-032 (Escalabilidad sin Héroes)</strong>.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Mecanismos que Garantizan la Ejecución Asíncrona:
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3 space-y-1">
                    <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-indigo-400" />
                      1. Pattern Recognition Pre-Entrenado
                    </span>
                    <p className="text-slate-400">
                      Un operador senior no busca anécdotas; busca vectores de tensión. Al leer los cruces e IPs, reconoce de inmediato la anatomía de los problemas que ha vivido en la trinchera.
                    </p>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3 space-y-1">
                    <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      2. Axiomas Autocontenidos
                    </span>
                    <p className="text-slate-400">
                      Cada IP incluye su definición forense, fórmulas de cálculo, inputs obligatorios, outputs verificables y matriz de cruce bidireccional. No hay secretos ocultos.
                    </p>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3 space-y-1">
                    <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-indigo-400" />
                      3. Eliminación del Cuello de Botella
                    </span>
                    <p className="text-slate-400">
                      La soberanía operativa exige que el conocimiento resida en el sustrato, no en el cerebro biológico de un individuo.
                    </p>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3 space-y-1">
                    <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                      4. Capa de Soporte LLM Integrada
                    </span>
                    <p className="text-slate-400">
                      El módulo de soporte asistido por LLM permite alimentar cualquier contingencia o SOP desfasado y recibir la remediación paso a paso en segundos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Calculadora Time-to-Mastery */}
          {activeSubTab === 'calculator' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-slate-800/40 border border-slate-700/70 rounded-xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
                  <div>
                    <span className="text-xs uppercase font-mono tracking-wider text-amber-400">
                      Métrica de Compresión Directiva
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      Tu Portafolio Activo: {portfolioCount} de {allIpsCount} IPs Seleccionadas
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Multiplicador:</span>
                    <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-200">
                      180h / IP
                    </span>
                  </div>
                </div>

                {/* Big Metric Display Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-900/80 border border-indigo-900/50 rounded-xl p-4 text-center">
                    <div className="text-3xl sm:text-4xl font-black font-mono text-indigo-400">
                      ~{hoursSaved.toLocaleString()}
                    </div>
                    <div className="text-xs font-semibold text-slate-300 mt-1">Horas de Tanteo Directivo Ahorradas</div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Evita reuniones en círculo, post-mortems innecesarios y pruebas ciegas.
                    </div>
                  </div>

                  <div className="bg-slate-900/80 border border-emerald-900/50 rounded-xl p-4 text-center">
                    <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400">
                      ~{monthsAccelerated}
                    </div>
                    <div className="text-xs font-semibold text-slate-300 mt-1">Meses de Compresión a Maestría</div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Aceleración calculada a dedicación ejecutiva full-time (160h/mes).
                    </div>
                  </div>

                  <div className="bg-slate-900/80 border border-amber-900/50 rounded-xl p-4 text-center">
                    <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400">
                      {postMortemsPrevented}
                    </div>
                    <div className="text-xs font-semibold text-slate-300 mt-1">Incendios Críticos Prevenidos</div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Puntos de ruptura estructural resueltos antes de manifestarse.
                    </div>
                  </div>
                </div>

                {/* List of active IPs in portfolio */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-medium text-slate-300">IPs actualmente en tu portafolio activo:</span>
                    <span>{portfolioCount} activas</span>
                  </div>

                  {portfolioCount === 0 ? (
                    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 text-center text-xs text-slate-400">
                      No tienes IPs en tu portafolio activo aún. Ve al Catálogo Forense o a Gobernanza Impact Score para seleccionar las IPs clave de tu empresa.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                      {activePortfolioIps.map((ip) => (
                        <div
                          key={ip.id}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs hover:border-slate-700 transition-colors"
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <span className="px-1.5 py-0.5 rounded bg-blue-900/50 text-blue-300 font-mono text-[10px] font-bold">
                              {ip.code}
                            </span>
                            <span className="text-slate-200 font-medium truncate">{ip.name}</span>
                          </div>
                          <span className="text-[11px] font-mono text-emerald-400 shrink-0">
                            +180h
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Actions */}
        <div className="bg-slate-900 border-t border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Soberanía Operativa: El sistema rige, la persona descansa.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onNavigateToTab && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToTab('impact');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
              >
                <span>Configurar Portafolio en Gobernanza</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-xs"
            >
              Cerrar Manifiesto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
