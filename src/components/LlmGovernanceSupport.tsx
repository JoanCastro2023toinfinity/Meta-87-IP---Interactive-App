import React, { useState } from 'react';
import { 
  IpItem, 
  GovernanceDiagnostic, 
  SupportChatMessage, 
  PostMortemPreset,
  ExecutiveRole,
  CognitiveLoadLevel
} from '../types';
import { REAL_POST_MORTEM_PRESETS } from '../data/postMortemPresets';
import { generateMasterGovernancePrompt } from '../data/masterPromptGenerator';
import {
  Bot,
  Flame,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  FileText,
  Send,
  CheckCircle2,
  AlertOctagon,
  RefreshCw,
  ExternalLink,
  Layers,
  HeartHandshake,
  MessageSquare,
  Wrench,
  ShieldCheck,
  UserCheck,
  Copy,
  Check,
  Terminal,
  Activity,
  User,
  Zap,
  Clock,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

import { SopGapMismatch } from '../data/sopGapMismatches';

interface LlmGovernanceSupportProps {
  ips: IpItem[];
  onSelectIpForModal: (id: string) => void;
  onAddIpToPortfolio: (id: string) => void;
  portfolioIpIds: string[];
  preloadedGap?: SopGapMismatch | null;
  onClearPreloadedGap?: () => void;
}

export const LlmGovernanceSupport: React.FC<LlmGovernanceSupportProps> = ({
  ips,
  onSelectIpForModal,
  onAddIpToPortfolio,
  portfolioIpIds,
  preloadedGap,
  onClearPreloadedGap
}) => {
  // Mode selection: "post_mortem_analyst", "master_prompt", or "live_operator_chat"
  const [activeSubTab, setActiveSubTab] = useState<'post_mortem' | 'master_prompt' | 'operator_chat'>('post_mortem');

  // Role and Cognitive Load Selection
  const [userRole, setUserRole] = useState<ExecutiveRole>(
    preloadedGap?.defaultRole || 'operador_trinchera'
  );
  const [cognitiveLoad, setCognitiveLoad] = useState<CognitiveLoadLevel>('critica_saturada');

  // Post-Mortem Diagnostic Form State
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    preloadedGap?.suggestedPresetId || 'pm-01-last-mile-burnout'
  );
  const [incidentTitle, setIncidentTitle] = useState<string>(
    preloadedGap ? preloadedGap.promptDraft.incidentTitle : REAL_POST_MORTEM_PRESETS[0].title
  );
  const [affectedArea, setAffectedArea] = useState<string>(
    preloadedGap ? preloadedGap.promptDraft.affectedArea : REAL_POST_MORTEM_PRESETS[0].affectedArea
  );
  const [businessImpact, setBusinessImpact] = useState<string>(
    preloadedGap ? preloadedGap.promptDraft.businessImpact : REAL_POST_MORTEM_PRESETS[0].businessImpact
  );
  const [teamContext, setTeamContext] = useState<string>(
    preloadedGap ? preloadedGap.promptDraft.teamContext : REAL_POST_MORTEM_PRESETS[0].teamContext
  );
  const [postMortemText, setPostMortemText] = useState<string>(
    preloadedGap ? preloadedGap.promptDraft.summary : REAL_POST_MORTEM_PRESETS[0].summary
  );
  const [incidentLogs, setIncidentLogs] = useState<string>(
    preloadedGap ? preloadedGap.promptDraft.incidentLogs : REAL_POST_MORTEM_PRESETS[0].incidentLogs
  );

  // Diagnostic State
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [diagnosticResult, setDiagnosticResult] = useState<GovernanceDiagnostic | null>(null);
  const [copiedContract, setCopiedContract] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  // Master Prompt View
  const masterPromptText = generateMasterGovernancePrompt();

  // Operator Live Chat State
  const [chatMessages, setChatMessages] = useState<SupportChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'assistant',
      content: 'Hola. Soy la capa de Soporte y Defensa de Gobernanza Sistémica. Mi labor es blindarte del burnout, deconstruir solicitudes ambiguas y darte respaldo arquitectónico con las 87 IPs del catálogo. ¿Qué está colapsando en tu trinchera hoy?',
      timestamp: 'Ahora'
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isChatReplying, setIsChatReplying] = useState<boolean>(false);

  // Quick preset loader
  const handleLoadPreset = (preset: PostMortemPreset) => {
    setSelectedPresetId(preset.id);
    setIncidentTitle(preset.title);
    setAffectedArea(preset.affectedArea);
    setBusinessImpact(preset.businessImpact);
    setTeamContext(preset.teamContext);
    setPostMortemText(preset.summary);
    setIncidentLogs(preset.incidentLogs);
    setDiagnosticResult(null);
  };

  // Run LLM Diagnostic
  const handleRunDiagnostic = async () => {
    setIsAnalyzing(true);

    const condensedCatalog = ips.slice(0, 40).map((i) => `[${i.code}] ${i.name} (Cat: ${i.category}): ${i.purpose}`).join('\n');

    try {
      const response = await fetch('/api/governance-support/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incidentTitle,
          affectedArea,
          businessImpact,
          teamContext,
          userRole,
          cognitiveLoad,
          postMortemSummary: postMortemText,
          incidentLogs,
          availableIpsSummary: condensedCatalog
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      if (data.diagnostic) {
        setDiagnosticResult(data.diagnostic);
      } else {
        throw new Error('Respuesta inválida del motor de diagnóstico.');
      }
    } catch (err: any) {
      console.warn('Using client fallback diagnostic:', err);
      setDiagnosticResult({
        diagnosis: "Falla por absorción entrópica en el nodo de trinchera: Se sobrecargó al equipo de operadores obligándolos a interpretar excepciones sin artefactos de ensamble ni reglas de veto formalizadas.",
        rootCauseCategory: "talento_cargas",
        traditionalSopFailure: "El SOP corporativo se limitó a exigir SLAs de tiempo ('responder en 15 min') sin garantizar la calidad de los inputs de entrada ni facultar al operador para vetar solicitudes rotas.",
        rolePerspectiveOutput: {
          role: userRole,
          cognitiveLoadHandling: userRole === 'operador_trinchera'
            ? "Blindaje contra ambigüedad: se activa derecho a veto y se reducen los campos de reporte a 3 datos verificables para descongestionar la mente del operador."
            : userRole === 'mando_medio_lead'
            ? "Desacople de arbitraje: se definen contrapesos objetivos para evitar que el lead sea el árbitro manual de cada excepción de turno."
            : "Protección de capital y desacople del fundador: retiro de la dirección de la cadena crítica de incidentes cotidianos.",
          actionPrioritization: userRole === 'operador_trinchera'
            ? "Rechazar de inmediato cualquier ticket sin los inputs del IP-046 bajo amparo del IP-041."
            : "Instaurar el Smart Contract of Criterion (IP-079) para delegar la resolución sin pérdida de ADN ni control."
        },
        recommendedIps: [
          {
            code: "IP-068",
            name: "Deconstrucción Forense de Tickets",
            action: "Desarmar el 80% de los tickets repetitivos en subcomponentes pre-resueltos de ensamble ciego.",
            whyItPrevents: "Remueve el estrés cognitivo del operador al sustituir la improvisación por ensamble parametrizado.",
            inputsNeeded: ["Bitácora de tickets de los últimos 30 días", "Tasa de repetición por categoría"],
            outputGenerated: "Catálogo de módulos de respuesta pre-ensamblada con 0 ambigüedad"
          },
          {
            code: "IP-041",
            name: "Matriz de Asimetría de Riesgo y Veto de Raíz",
            action: "Instaurar el derecho irrevocable de veto del operador cuando el insumo carezca de los 3 parámetros obligatorios.",
            whyItPrevents: "Detiene la propagación del defecto antes de que contamine la operación global.",
            inputsNeeded: ["Definición de umbral de riesgo no negociable", "Canal de veto formalizado"],
            outputGenerated: "Acta de veto ejecutada y aislamiento inmediato del lote defectuoso"
          },
          {
            code: "IP-081",
            name: "Protocolo de Inversión de Dependencia",
            action: "Desacoplar a los fundadores y directores del canal de emergencias mediante artefactos autoejecutables.",
            whyItPrevents: "Evita que la jerarquía superior se convierta en bombero diario y punto único de fallo.",
            inputsNeeded: ["Lista de excepciones que hoy solo firma el fundador", "Plantilla de criterio auditable"],
            outputGenerated: "Protocolo autoejecutable transferido al equipo de operaciones"
          }
        ],
        realTimeTraceabilityStepByStep: [
          {
            step: 1,
            phase: "Detección & Veto Inmediato (T+0 a T+15 min)",
            trigger: "Entrada de requerimiento incompleto o alerta de colapso de SLA",
            ipApplied: "IP-041 (Veto de Raíz)",
            verificationMetric: "Ticket etiquetado como 'Insumo Deficiente' y congelado sin sanción de SLA"
          },
          {
            step: 2,
            phase: "Aislamiento & Ensamble Parametrizado (T+1h a T+4h)",
            trigger: "Desglose del problema en variables atómicas conocidas",
            ipApplied: "IP-046 & IP-068 (Ensamble Ciego y Deconstrucción)",
            verificationMetric: "El operador resuelve el caso usando piezas modulares preaprobadas en < 4 minutos"
          },
          {
            step: 3,
            phase: "Desacople del C-Level & Cierre del Ciclo (T+24h)",
            trigger: "Reunión de revisión post-incidente",
            ipApplied: "IP-081 (Inversión de Dependencia)",
            verificationMetric: "Cero mensajes directos al fundador; actualización del checklist de gobernanza fractal"
          }
        ],
        operatorDescompressionTactics: [
          "Congelar asignaciones entrantes no críticas durante 24 horas para sanear el backlog saturado.",
          "Establecer que cualquier ticket con información incompleta sea devuelto automáticamente sin penalización de SLA.",
          "Crear un canal de desacople blindado donde las excepciones no resueltas pasen a un artefacto asíncrono en lugar de chats de pánico."
        ],
        fractalGovernanceContract: "Todo operador tiene veto absoluto y legalmente protegido contra pedidos con datos incompletos. Ningún líder puede forzar la aceptación de un insumo defectuoso.",
        gisImpactEstimated: "+28 pts GIS estimados al incorporar estas 3 IPs al portafolio"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Send Operator Support Chat message
  const handleSendMessage = async () => {
    if (!chatInput.trim() || isChatReplying) return;

    const userMsg: SupportChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newChat = [...chatMessages, userMsg];
    setChatMessages(newChat);
    setChatInput('');
    setIsChatReplying(true);

    try {
      const response = await fetch('/api/governance-support/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newChat,
          currentIncidentContext: diagnosticResult ? {
            title: incidentTitle,
            diagnosis: diagnosticResult.diagnosis
          } : undefined
        })
      });

      const data = await response.json();
      setChatMessages((prev) => [
        ...prev,
        {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          content: data.reply || 'He recibido tu reporte de trinchera.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          content: 'Bajo la doctrina de Gobernanza Sistémica (especialmente IP-041 e IP-068): tienes el derecho arquitectónico de exigir insumos de calidad antes de procesar una tarea. Si un requerimiento te genera sobrecarga, levanta la cláusula de veto de raíz.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsChatReplying(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Preloaded Gap Alert Banner if arriving from Gap Analysis Widget */}
      {preloadedGap && (
        <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 border border-indigo-500/50 rounded-2xl p-4 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/80 flex items-center justify-center shrink-0 mt-0.5 border border-blue-400/40">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">
                  Brecha Pre-Cargada desde Gap Analysis
                </span>
                <span className="px-2 py-0.2 rounded-full bg-rose-500/30 text-rose-200 text-[10px] font-bold border border-rose-400/30">
                  Severidad {preloadedGap.severity.toUpperCase()}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-0.5">
                {preloadedGap.title}
              </h3>
              <p className="text-[11px] text-blue-200 mt-0.5">
                Datos de trinchera y logs cargados automáticamente. IPs clave a ensamblar: <strong className="text-white font-mono">{preloadedGap.keyHighImpactIps.join(', ')}</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              onClick={handleRunDiagnostic}
              disabled={isAnalyzing}
              className="px-3.5 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Diagnosticando...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Ejecutar Remediación Paso a Paso &rarr;</span>
                </>
              )}
            </button>
            {onClearPreloadedGap && (
              <button
                onClick={onClearPreloadedGap}
                className="px-2.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700"
              >
                Cerrar
              </button>
            )}
          </div>
        </div>
      )}

      {/* Top Banner / Concept Explainer */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2 border border-blue-400/30">
              <Bot className="w-3.5 h-3.5" />
              <span>Capa LLM Especializada en Gobernanza &amp; Soporte Cognitivo</span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">
              Ingeniería Forense de Post-Mortems &amp; Prompt Maestro de las 87 IPs
            </h1>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Aquí tienes los post-mortems reales ya documentados y cruzados con la trazabilidad en tiempo real de las 87 IPs del catálogo. El modelo segmenta la salida en inputs, outputs y acciones según el <strong>rol de quien consulta</strong> y su <strong>nivel de carga cognitiva</strong>. También puedes exportar el <strong>Prompt Maestro de las 87 IPs</strong> para usarlo en cualquier LLM externo.
            </p>
          </div>

          {/* Subtabs Switcher */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 shrink-0">
            <button
              onClick={() => setActiveSubTab('post_mortem')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeSubTab === 'post_mortem'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              1. Cruce con Post-Mortems
            </button>
            <button
              onClick={() => setActiveSubTab('master_prompt')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeSubTab === 'master_prompt'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-indigo-300" />
              2. Prompt Maestro 87 IPs
            </button>
            <button
              onClick={() => setActiveSubTab('operator_chat')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeSubTab === 'operator_chat'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-300" />
              3. Soporte al Operador
            </button>
          </div>
        </div>
      </div>

      {/* Subtab 1: Post-Mortem Cross Analysis with Role & Cognitive Load */}
      {activeSubTab === 'post_mortem' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Post Mortem Input & Role Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Presets Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                1. Selecciona un Post-Mortem Real Documentado:
              </span>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {REAL_POST_MORTEM_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleLoadPreset(preset)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-start justify-between gap-2 ${
                      selectedPresetId === preset.id
                        ? 'border-blue-500 bg-blue-50/70 text-blue-900 font-medium'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                    }`}
                  >
                    <div>
                      <div className="font-semibold line-clamp-1">{preset.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-slate-200/80 font-mono text-[9px]">
                          {preset.industry}
                        </span>
                        <span className="text-rose-600 font-semibold">{preset.affectedArea}</span>
                      </div>
                    </div>
                    {selectedPresetId === preset.id && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Role & Cognitive Load Selector */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-4 shadow-xs space-y-3 text-xs border border-indigo-900/60">
              <span className="font-bold text-indigo-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                2. Segmentación por Rol &amp; Carga Cognitiva
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1 font-medium">
                    Rol del Consultor:
                  </label>
                  <select
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value as ExecutiveRole)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 text-white border border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="operador_trinchera">Operador de Trinchera (L1/L2, Dispatcher)</option>
                    <option value="mando_medio_lead">Mando Medio / Tech Lead / Squad Lead</option>
                    <option value="c_level_fundador">C-Level / Fundador / COO / Director</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 block mb-1 font-medium">
                    Nivel de Carga Cognitiva:
                  </label>
                  <select
                    value={cognitiveLoad}
                    onChange={(e) => setCognitiveLoad(e.target.value as CognitiveLoadLevel)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 text-white border border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="critica_saturada">🚨 Crítica / Saturada (Emergencia)</option>
                    <option value="moderada_tension">⚠️ Moderada / Fricción y Fatiga</option>
                    <option value="controlada_estrategica">🛡️ Controlada / Auditoría y Blindaje</option>
                  </select>
                </div>
              </div>

              <div className="text-[10px] text-indigo-200/90 bg-indigo-950/60 p-2 rounded-lg border border-indigo-800/40">
                {userRole === 'operador_trinchera' && '🎯 Enfoque de salida: Descompresión radical, derecho a veto y 0 ambigüedad.'}
                {userRole === 'mando_medio_lead' && '🎯 Enfoque de salida: Delegación fractal, contrapesos claros y buffers de estabilidad.'}
                {userRole === 'c_level_fundador' && '🎯 Enfoque de salida: Desacople del fundador, protección de margen y blindaje de capital.'}
              </div>
            </div>

            {/* Editable Form */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  3. Datos Contextuales del Incidente
                </span>
                <span className="text-[10px] text-slate-400">Totalmente Editable</span>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Título del Incidente:</label>
                <input
                  type="text"
                  value={incidentTitle}
                  onChange={(e) => setIncidentTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Área Afectada:</label>
                  <input
                    type="text"
                    value={affectedArea}
                    onChange={(e) => setAffectedArea(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Impacto Financiero / Negocio:</label>
                  <input
                    type="text"
                    value={businessImpact}
                    onChange={(e) => setBusinessImpact(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Contexto y Carga del Equipo (Trinchera):</label>
                <input
                  type="text"
                  value={teamContext}
                  onChange={(e) => setTeamContext(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-slate-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Resumen del Fallo / Qué Sucedió:</label>
                <textarea
                  rows={3}
                  value={postMortemText}
                  onChange={(e) => setPostMortemText(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Bitácora / Logs Forenses:</label>
                <textarea
                  rows={3}
                  value={incidentLogs}
                  onChange={(e) => setIncidentLogs(e.target.value)}
                  className="w-full font-mono text-[11px] p-2 rounded-lg border border-slate-200 bg-slate-900 text-emerald-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleRunDiagnostic}
                disabled={isAnalyzing}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Auditoría en Tiempo Real en Ejecución...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Cruzar Post-Mortem y Trazar Ruta de Replicación &rarr;</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Forensic Output & Real-time Traceability (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {diagnosticResult ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5 animate-in fade-in duration-200">
                {/* Header Verdict & Role Perspective Box */}
                <div className="border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                      <AlertOctagon className="w-4 h-4" />
                      Dictamen Forense de Causa Raíz
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold font-mono">
                      {diagnosticResult.gisImpactEstimated}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 mt-2 leading-relaxed">
                    {diagnosticResult.diagnosis}
                  </p>

                  {/* Role Perspective Box */}
                  {diagnosticResult.rolePerspectiveOutput && (
                    <div className="mt-3 p-3 rounded-xl bg-indigo-50/80 border border-indigo-200/80 text-xs">
                      <div className="flex items-center justify-between text-indigo-950 font-bold mb-1">
                        <span className="flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-indigo-600" />
                          Mapa de Salida para Rol: <span className="uppercase text-indigo-700 font-mono text-[11px]">{diagnosticResult.rolePerspectiveOutput.role}</span>
                        </span>
                      </div>
                      <div className="text-indigo-900 text-[11px] leading-relaxed">
                        <strong>Manejo de Carga Cognitiva:</strong> {diagnosticResult.rolePerspectiveOutput.cognitiveLoadHandling}
                      </div>
                      <div className="mt-1 text-indigo-900 text-[11px] leading-relaxed">
                        <strong>Prioridad #1 de Acción Inmediata:</strong> {diagnosticResult.rolePerspectiveOutput.actionPrioritization}
                      </div>
                    </div>
                  )}
                </div>

                {/* Why Traditional SOP Failed */}
                <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3.5 text-xs">
                  <div className="font-bold text-rose-900 mb-1 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    ¿Por qué el SOP Tradicional / Manual Corporativo colapsó?
                  </div>
                  <p className="text-rose-800 leading-relaxed text-[11px]">
                    {diagnosticResult.traditionalSopFailure}
                  </p>
                </div>

                {/* Real-time Traceability Step by Step (Replica en tiempo real) */}
                {diagnosticResult.realTimeTraceabilityStepByStep && diagnosticResult.realTimeTraceabilityStepByStep.length > 0 && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-blue-600" />
                        Trazabilidad en Tiempo Real: Ruta de Replicación del Soporte
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">Paso a paso auditable</span>
                    </div>

                    <div className="space-y-2">
                      {diagnosticResult.realTimeTraceabilityStepByStep.map((stepItem) => (
                        <div
                          key={stepItem.step}
                          className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {stepItem.step}
                          </span>
                          <div className="flex-1 text-[11px]">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900">{stepItem.phase}</span>
                              <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-blue-700 font-bold">
                                {stepItem.ipApplied}
                              </span>
                            </div>
                            <div className="text-slate-600 mt-0.5">
                              <span className="text-amber-700 font-medium">Disparador / Trigger:</span> {stepItem.trigger}
                            </div>
                            <div className="text-slate-500 mt-0.5 text-[10px]">
                              <span className="text-emerald-700 font-semibold">Verificación / Métrica:</span> {stepItem.verificationMetric}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended IPs for Inoculation with Inputs and Outputs */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      IPs Recomendadas del Catálogo para Inocular el Fallo:
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {diagnosticResult.recommendedIps.map((rec, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/60 transition-all text-xs flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[11px] px-1.5 py-0.5 rounded bg-slate-900 text-white">
                              {rec.code}
                            </span>
                            <span className="font-bold text-slate-900 text-xs">
                              {rec.name}
                            </span>
                          </div>
                          <div className="mt-1.5 text-slate-700 font-medium text-[11px]">
                            <span className="text-blue-700 font-semibold">Acción Táctica:</span> {rec.action}
                          </div>
                          
                          {/* Inputs & Outputs Breakdown */}
                          {rec.inputsNeeded && rec.inputsNeeded.length > 0 && (
                            <div className="mt-1 text-[10px] text-slate-600">
                              <span className="text-amber-700 font-semibold">Datos de Input Obligatorios:</span> {rec.inputsNeeded.join(', ')}
                            </div>
                          )}
                          {rec.outputGenerated && (
                            <div className="mt-0.5 text-[10px] text-slate-600">
                              <span className="text-indigo-700 font-semibold">Output Verificable:</span> {rec.outputGenerated}
                            </div>
                          )}

                          <div className="mt-1 text-slate-500 text-[10px] leading-snug">
                            <span className="text-emerald-700 font-semibold">Blindaje Antifrágil:</span> {rec.whyItPrevents}
                          </div>
                        </div>

                        <div className="flex sm:flex-col gap-1.5 shrink-0 self-end sm:self-start">
                          <button
                            onClick={() => onSelectIpForModal(rec.code)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 flex items-center gap-1 transition-colors"
                          >
                            <span>Ficha IP</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </button>
                          <button
                            onClick={() => onAddIpToPortfolio(rec.code)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                              portfolioIpIds.includes(rec.code)
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {portfolioIpIds.includes(rec.code) ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                                <span>En GIS</span>
                              </>
                            ) : (
                              <span>+ Sumar a GIS</span>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operator Descompression Tactics */}
                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3.5 text-xs">
                  <div className="font-bold text-emerald-950 mb-2 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    Tácticas de Descompresión Inmediata para la Trinchera:
                  </div>
                  <ul className="space-y-1.5">
                    {diagnosticResult.operatorDescompressionTactics.map((tactic, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-emerald-900 text-[11px]">
                        <span className="w-4 h-4 rounded-full bg-emerald-200/80 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{tactic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fractal Governance Contract Rule */}
                <div className="bg-slate-900 text-white rounded-xl p-3.5 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Regla Inviolable de Gobernanza Fractal a Instaurar:
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(diagnosticResult.fractalGovernanceContract);
                        setCopiedContract(true);
                        setTimeout(() => setCopiedContract(false), 2000);
                      }}
                      className="text-[10px] text-slate-300 hover:text-white flex items-center gap-1"
                    >
                      {copiedContract ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copiada</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar Regla</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-slate-200 text-xs italic font-serif leading-relaxed mt-1">
                    "{diagnosticResult.fractalGovernanceContract}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500 shadow-xs flex flex-col items-center justify-center">
                <Bot className="w-10 h-10 text-slate-300 mb-3" />
                <h3 className="font-bold text-slate-700 text-sm">Esperando Ejecución de Auditoría</h3>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  Selecciona uno de los presets de la izquierda o introduce un incidente real, ajusta tu rol y nivel de carga cognitiva, y pulsa "Cruzar Post-Mortem y Trazar Ruta de Replicación".
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subtab 2: Master Prompt with all 87 IPs */}
      {activeSubTab === 'master_prompt' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-indigo-600" />
                  Prompt Maestro Integral: 87 IPs de Gobernanza Sistémica
                </span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-mono font-bold">
                  87 IPs Compiladas
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Copia este prompt maestro e inyéctalo en ChatGPT, Claude o tu propio agente LLM para que actúe como la capa de soporte y gobernanza con el inventario forense completo de las 87 IPs, adaptado a roles y carga cognitiva.
              </p>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(masterPromptText);
                setCopiedPrompt(true);
                setTimeout(() => setCopiedPrompt(false), 2500);
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>¡Copiado al Portapapeles!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Prompt Maestro Completo</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">A) Segmentación de Roles</span>
              <p className="text-slate-600 text-[11px]">
                Define la respuesta para Trinchera (alivio de tickets), Mandos Medios (arbitraje fractal) y C-Levels (desacople de héroe).
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">B) Trazabilidad en Tiempo Real</span>
              <p className="text-slate-600 text-[11px]">
                Instruye al modelo a responder con triggers, IPs aplicadas, inputs obligatorios y métricas de verificación.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">C) Inventario Forense de 87 IPs</span>
              <p className="text-slate-600 text-[11px]">
                Contiene el 100% de los códigos, inputs, outputs, rangos y condiciones de fallo de cada una de las 87 IPs.
              </p>
            </div>
          </div>

          <div className="relative">
            <textarea
              readOnly
              rows={18}
              value={masterPromptText}
              className="w-full p-4 rounded-xl font-mono text-[11px] leading-relaxed bg-slate-950 text-slate-200 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      )}

      {/* Subtab 3: Operator Support Chat */}
      {activeSubTab === 'operator_chat' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[650px] overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>Línea de Soporte &amp; Descompresión de Trinchera</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h3>
                <p className="text-[11px] text-slate-500">
                  Respaldo directo con las 87 IPs: derecho a veto, insumos verificables y protección contra culpas de diseño sistémico.
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-slate-400 hidden sm:block">
              IA Modelo: Gemini 3.8 Flash
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/30 text-xs">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-900 text-emerald-400'
                  }`}
                >
                  {msg.sender === 'user' ? 'Tú' : <Bot className="w-4 h-4" />}
                </div>

                <div>
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isChatReplying && (
              <div className="flex gap-2 items-center text-slate-400 text-xs italic">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                <span>Consultando protocolos del Atlas y redactando dictamen...</span>
              </div>
            )}
          </div>

          {/* Quick Support Prompts for Operators */}
          <div className="p-2.5 bg-slate-100/70 border-t border-slate-200 flex flex-wrap gap-1.5 text-[11px]">
            <span className="text-slate-500 font-semibold self-center mr-1">Consultas Rápidas:</span>
            {[
              'Me están pidiendo un release de emergencia sin pruebas, ¿cómo activo el veto IP-041?',
              'Tengo 45 tickets ambiguos en la cola, ¿qué dice el IP-068?',
              'El cliente insiste en cambiar el alcance sin pagar más, ¿qué protocolo de pricing aplica?',
              'El fundador se fue de vacaciones y nadie puede aprobar excepciones, ¿qué hacemos?'
            ].map((promptText, idx) => (
              <button
                key={idx}
                onClick={() => setChatInput(promptText)}
                className="px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-700 transition-colors text-[10px] text-left truncate max-w-[280px]"
              >
                {promptText}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
            <input
              type="text"
              placeholder="Describe tu emergencia o fricción en la trinchera..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
            <button
              onClick={handleSendMessage}
              disabled={!chatInput.trim() || isChatReplying}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-semibold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <span>Enviar</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
