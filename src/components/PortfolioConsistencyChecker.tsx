import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Zap, 
  X, 
  Plus, 
  Clock, 
  Users, 
  Activity, 
  Info,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from 'lucide-react';
import { IpItem } from '../types';
import { ALL_IPS } from '../data/ipsData';
import { 
  checkPortfolioConsistency, 
  PortfolioConsistencyReport, 
  PortfolioConflict, 
  PortfolioSynergy 
} from '../data/consistencyCheckerData';

interface PortfolioConsistencyCheckerProps {
  portfolioIpIds: string[];
  allIps?: IpItem[];
  onToggleIp: (id: string) => void;
  onSelectIpForModal: (id: string) => void;
  onNavigateToTab?: (tab: any) => void;
}

export const PortfolioConsistencyChecker: React.FC<PortfolioConsistencyCheckerProps> = ({
  portfolioIpIds,
  allIps = ALL_IPS,
  onToggleIp,
  onSelectIpForModal,
  onNavigateToTab,
}) => {
  const [showMatrix, setShowMatrix] = useState<boolean>(false);
  const [selectedSimulationIpId, setSelectedSimulationIpId] = useState<string>('');
  const [hoveredConflict, setHoveredConflict] = useState<PortfolioConflict | null>(null);

  // Compute live consistency report
  const report: PortfolioConsistencyReport = useMemo(() => {
    return checkPortfolioConsistency(portfolioIpIds, allIps);
  }, [portfolioIpIds, allIps]);

  // Simulation of adding an extra IP to preview consistency
  const simulatedReport = useMemo(() => {
    if (!selectedSimulationIpId) return null;
    const simulatedIds = [...portfolioIpIds, selectedSimulationIpId];
    return checkPortfolioConsistency(simulatedIds, allIps);
  }, [selectedSimulationIpId, portfolioIpIds, allIps]);

  const getStatusColor = (status: PortfolioConsistencyReport['status']) => {
    switch (status) {
      case 'OPTIMAL':
        return {
          bg: 'bg-emerald-950/40',
          border: 'border-emerald-500/40',
          text: 'text-emerald-400',
          badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
        };
      case 'MODERATE_TENSION':
        return {
          bg: 'bg-amber-950/40',
          border: 'border-amber-500/40',
          text: 'text-amber-400',
          badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400" />
        };
      case 'CRITICAL_CONFLICT':
        return {
          bg: 'bg-rose-950/40',
          border: 'border-rose-500/40',
          text: 'text-rose-400',
          badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
          icon: <ShieldAlert className="w-5 h-5 text-rose-400" />
        };
    }
  };

  const statusStyle = getStatusColor(report.status);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl relative">
      {/* HEADER & COHERENCE GAUGE */}
      <div className={`p-5 rounded-2xl border ${statusStyle.bg} ${statusStyle.border} flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all`}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center shrink-0 shadow-inner">
            {statusStyle.icon}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${statusStyle.badge}`}>
                {report.statusLabel}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {report.portfolioIps.length} IPs en Portafolio
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Chequeo de Consistencia &amp; Contención de Recursos
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              {report.statusDescription}
            </p>
          </div>
        </div>

        {/* Big Coherence Score Circular Badge */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800/80 pt-3 md:pt-0">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-slate-400">
              Índice de Coherencia
            </div>
            <div className={`text-3xl font-black font-mono ${statusStyle.text}`}>
              {report.coherenceScore}%
            </div>
            <div className="text-[10px] text-slate-400">
              {report.conflicts.length === 0 ? 'Sin interferencias' : `${report.conflicts.length} conflicto(s)`}
            </div>
          </div>

          <div className="h-12 w-px bg-slate-800 hidden sm:block" />

          {/* Quick Metrics */}
          <div className="flex flex-col gap-1 text-[11px] font-mono">
            <span className="text-rose-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              {report.conflicts.length} Conflictos
            </span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {report.synergies.length} Sinergias
            </span>
          </div>
        </div>
      </div>

      {/* RESOURCE BALANCE METERS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Ancho de Banda C-Level</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              report.resourceBalance.executiveBandwidth === 'BALANCED'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
            }`}>
              {report.resourceBalance.executiveBandwidth === 'BALANCED' ? 'Equilibrado' : 'Sobrecarga / Déficit'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            {report.resourceBalance.executiveBandwidth === 'BALANCED'
              ? 'El tiempo del fundador o directores no está canibalizado por intervenciones superpuestas.'
              : 'Varias IPs exigen inmersión simultánea del fundador mientras otras exigen su desconexión.'}
          </p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Buffer Operativo (20%)</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              report.resourceBalance.frontlineBuffer === 'PROTECTED'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
            }`}>
              {report.resourceBalance.frontlineBuffer === 'PROTECTED' ? 'Protegido' : 'En Riesgo de Saturación'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            {report.resourceBalance.frontlineBuffer === 'PROTECTED'
              ? 'La capacidad de amortiguar turbulencias imprevistas se mantiene intacta.'
              : 'Presión de volumen compite con el margen de respiro de trinchera.'}
          </p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Autonomía de Decisión</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              report.resourceBalance.decisionAutonomy === 'CLEAR'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
            }`}>
              {report.resourceBalance.decisionAutonomy === 'CLEAR' ? 'Fronteras Claras' : 'Tensión de Criterio'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            {report.resourceBalance.decisionAutonomy === 'CLEAR'
              ? 'Límites de autoridad bien deslindados entre la trinchera y la dirección.'
              : 'Riesgo de mando cruzado entre autonomía de nodo y comités de veto.'}
          </p>
        </div>
      </div>

      {/* CONFLICTS LIST (IF ANY) */}
      {report.conflicts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              Conflictos Operacionales Detectados ({report.conflicts.length})
            </h4>
            <span className="text-[11px] text-slate-400">
              Requiere acción correctiva o secuenciación temporal
            </span>
          </div>

          <div className="space-y-3">
            {report.conflicts.map((conflict) => {
              const isArbitratedInPortfolio = conflict.arbitratingIp && (
                portfolioIpIds.includes(conflict.arbitratingIp.id) || 
                portfolioIpIds.includes(conflict.arbitratingIp.code)
              );

              return (
                <div
                  key={conflict.id}
                  className="bg-slate-950 border border-rose-900/40 rounded-xl p-4 sm:p-5 space-y-4 hover:border-rose-700/60 transition-colors shadow-md"
                >
                  {/* Top Bar: IPs Clashing & Severity */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* IP A badge */}
                      <button
                        onClick={() => onSelectIpForModal(conflict.ipA.id)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 font-mono text-xs font-bold transition-colors"
                      >
                        {conflict.ipA.code} {conflict.ipA.name}
                      </button>

                      <span className="text-rose-400 font-black text-sm">⚔️ choca con</span>

                      {/* IP B badge */}
                      <button
                        onClick={() => onSelectIpForModal(conflict.ipB.id)}
                        className="px-2.5 py-1 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 font-mono text-xs font-bold transition-colors"
                      >
                        {conflict.ipB.code} {conflict.ipB.name}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        conflict.severity === 'CRITICAL'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : conflict.severity === 'HIGH'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      }`}>
                        SEVERIDAD: {conflict.severity}
                      </span>
                    </div>
                  </div>

                  {/* Conflict Title & Resource Dynamic */}
                  <div className="space-y-1.5">
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      {conflict.title}
                    </h5>

                    <div className="text-xs text-slate-300 font-mono bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 space-y-1">
                      <div className="text-slate-400">
                        <strong className="text-amber-400">Recurso en Disputa:</strong> {conflict.resourceName}
                      </div>
                      <div className="text-slate-300">
                        <strong className="text-indigo-300">Demanda de {conflict.ipA.code}:</strong> {conflict.requiredByA}
                      </div>
                      <div className="text-slate-300">
                        <strong className="text-purple-300">Restricción de {conflict.ipB.code}:</strong> {conflict.consumedByB}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      <strong>Diagnóstico Forense:</strong> {conflict.explanation}
                    </p>
                  </div>

                  {/* Remediation & Action Buttons */}
                  <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-3.5 space-y-3">
                    <div className="text-xs text-emerald-300 leading-relaxed">
                      <strong>Remediación Sistémica:</strong> {conflict.remediation}
                    </div>

                    {conflict.suggestedSequence && (
                      <div className="text-[11px] font-mono text-slate-300 bg-slate-900/80 px-2.5 py-1.5 rounded border border-emerald-800/40">
                        <strong className="text-emerald-400">Secuenciación Recomendada:</strong> {conflict.suggestedSequence}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-emerald-900/30">
                      <div className="flex items-center gap-2">
                        {conflict.arbitratingIp && (
                          <button
                            onClick={() => onToggleIp(conflict.arbitratingIp!.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-xs"
                            title={`Añade ${conflict.arbitratingIp.code} para arbitrar la frontera de decisión`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Añadir {conflict.arbitratingIp.code} (Árbitro) al Portafolio</span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onToggleIp(conflict.ipB.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                        >
                          Quitar {conflict.ipB.code}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SYNERGIES SECTION (IF NO CONFLICTS OR COMPLEMENTARY) */}
      {report.synergies.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Sinergias &amp; Circuitos de Retroalimentación Positiva ({report.synergies.length})
            </h4>
            <span className="text-[11px] text-slate-400">
              Intervenciones que se potencian mutuamente
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {report.synergies.map((synergy, idx) => (
              <div
                key={idx}
                className="bg-slate-950/60 border border-emerald-900/30 rounded-xl p-3.5 space-y-1.5 text-xs hover:border-emerald-700/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-800/50">
                      {synergy.ipA.code} ⇄ {synergy.ipB.code}
                    </span>
                    <span className="font-semibold text-white truncate max-w-[180px]">
                      {synergy.title}
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {synergy.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SIMULATOR: PREVIEW IMPACT OF ADDING AN IP */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Simulador de Compatibilidad Pre-Incorporación
            </h4>
            <p className="text-[11px] text-slate-400">
              Prueba cómo afectaría agregar una nueva IP al portafolio antes de adoptarla formalmente.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedSimulationIpId}
              onChange={(e) => setSelectedSimulationIpId(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500 font-mono w-full sm:w-64"
            >
              <option value="">Seleccionar IP para simular...</option>
              {allIps
                .filter((ip) => !portfolioIpIds.includes(ip.id) && !portfolioIpIds.includes(ip.code))
                .map((ip) => (
                  <option key={ip.id} value={ip.id}>
                    {ip.code} - {ip.name}
                  </option>
                ))}
            </select>

            {selectedSimulationIpId && (
              <button
                onClick={() => setSelectedSimulationIpId('')}
                className="p-1.5 text-slate-400 hover:text-white"
                title="Limpiar simulación"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Simulated result banner */}
        {simulatedReport && (
          <div className="p-3 rounded-lg bg-slate-900 border border-indigo-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs animate-in fade-in duration-150">
            <div className="flex items-center gap-3">
              <div className="font-mono text-base font-bold text-indigo-400">
                Coherencia Proyectada: {simulatedReport.coherenceScore}%
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                simulatedReport.status === 'OPTIMAL'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : simulatedReport.status === 'MODERATE_TENSION'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-rose-500/20 text-rose-300'
              }`}>
                {simulatedReport.statusLabel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">
                {simulatedReport.conflicts.length} conflictos • {simulatedReport.synergies.length} sinergias
              </span>
              <button
                onClick={() => {
                  onToggleIp(selectedSimulationIpId);
                  setSelectedSimulationIpId('');
                }}
                className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
              >
                + Confirmar e Incorporar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MATRIX TOGGLE & MINI-GRID */}
      <div className="pt-2 border-t border-slate-800">
        <button
          onClick={() => setShowMatrix(!showMatrix)}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors font-medium"
        >
          {showMatrix ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          <span>{showMatrix ? 'Ocultar' : 'Ver'} Matriz de Compatibilidad entre Pares ({report.portfolioIps.length} × {report.portfolioIps.length})</span>
        </button>

        {showMatrix && (
          <div className="mt-3 overflow-x-auto pt-2 animate-in fade-in duration-150">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-slate-400 font-semibold w-24">IP</th>
                  {report.portfolioIps.map((ip) => (
                    <th key={ip.id} className="p-2 text-center text-slate-300 font-mono text-[10px]">
                      {ip.code}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {report.portfolioIps.map((rowIp) => (
                  <tr key={rowIp.id} className="hover:bg-slate-800/30">
                    <td className="p-2 font-mono font-bold text-indigo-300 text-[11px]">
                      {rowIp.code}
                    </td>

                    {report.portfolioIps.map((colIp) => {
                      if (rowIp.id === colIp.id) {
                        return (
                          <td key={colIp.id} className="p-1.5 text-center">
                            <span className="inline-block w-6 h-6 rounded bg-slate-800 text-slate-500 leading-6 text-[10px] font-mono">
                              —
                            </span>
                          </td>
                        );
                      }

                      // Check if there is conflict
                      const conflict = report.conflicts.find(
                        (c) => (c.ipA.id === rowIp.id && c.ipB.id === colIp.id) || (c.ipA.id === colIp.id && c.ipB.id === rowIp.id)
                      );

                      if (conflict) {
                        return (
                          <td key={colIp.id} className="p-1.5 text-center">
                            <span 
                              className="inline-block w-6 h-6 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold leading-6 text-[10px] cursor-pointer shadow-xs"
                              title={`Conflicto: ${conflict.title}`}
                              onClick={() => setHoveredConflict(conflict)}
                            >
                              ✕
                            </span>
                          </td>
                        );
                      }

                      // Check if there is synergy
                      const synergy = report.synergies.find(
                        (s) => (s.ipA.id === rowIp.id && s.ipB.id === colIp.id) || (s.ipA.id === colIp.id && s.ipB.id === rowIp.id)
                      );

                      if (synergy) {
                        return (
                          <td key={colIp.id} className="p-1.5 text-center">
                            <span 
                              className="inline-block w-6 h-6 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold leading-6 text-[10px] cursor-pointer shadow-xs"
                              title={`Sinergia: ${synergy.title}`}
                            >
                              ✓
                            </span>
                          </td>
                        );
                      }

                      // Neutral compatible
                      return (
                        <td key={colIp.id} className="p-1.5 text-center">
                          <span 
                            className="inline-block w-6 h-6 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 leading-6 text-[10px] font-mono cursor-pointer"
                            title="Compatible / Sin interferencia de recursos"
                          >
                            ○
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
