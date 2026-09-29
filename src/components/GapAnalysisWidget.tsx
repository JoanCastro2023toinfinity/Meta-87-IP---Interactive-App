import React, { useState } from 'react';
import { IpItem } from '../types';
import { SOP_GAP_MISMATCHES, SopGapMismatch } from '../data/sopGapMismatches';
import {
  AlertOctagon,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  ShieldAlert,
  Flame,
  Bot,
  ExternalLink,
  Filter,
  ChevronRight,
  TrendingDown,
  Info
} from 'lucide-react';

interface GapAnalysisWidgetProps {
  ips: IpItem[];
  onSelectIpForModal: (id: string) => void;
  onNavigateToLlmRemediation?: (gap: SopGapMismatch) => void;
  className?: string;
  compact?: boolean;
}

export const GapAnalysisWidget: React.FC<GapAnalysisWidgetProps> = ({
  ips,
  onSelectIpForModal,
  onNavigateToLlmRemediation,
  className = '',
  compact = false
}) => {
  const [selectedSeverity, setSelectedSeverity] = useState<'all' | 'critical' | 'high'>('all');
  const [activeGapId, setActiveGapId] = useState<string>(SOP_GAP_MISMATCHES[0].id);

  const filteredGaps = SOP_GAP_MISMATCHES.filter((gap) => {
    if (selectedSeverity === 'all') return true;
    return gap.severity === selectedSeverity;
  });

  const activeGap = SOP_GAP_MISMATCHES.find((g) => g.id === activeGapId) || filteredGaps[0] || SOP_GAP_MISMATCHES[0];

  const handleRemediateClick = (gap: SopGapMismatch) => {
    if (onNavigateToLlmRemediation) {
      onNavigateToLlmRemediation(gap);
    }
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden ${className}`}>
      {/* Header bar */}
      <div className="bg-slate-900 text-white p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-bold border border-rose-500/30 mb-2">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            <span>Diagnóstico Forense de Fricción Sistémica</span>
          </div>
          <h2 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>Gap Analysis: Fracturas de SOP vs. IPs de Alto Impacto</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Mapeo de los desajustes más letales entre manuales tradicionales rígidos y la entropía real de la trinchera. Genera la remediación táctica paso a paso asistida por IA.
          </p>
        </div>

        {/* Severity Filter pills */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-xl border border-slate-700/60 shrink-0 text-xs">
          <span className="text-slate-400 text-[11px] px-2 font-medium flex items-center gap-1">
            <Filter className="w-3 h-3" /> Severidad:
          </span>
          <button
            onClick={() => setSelectedSeverity('all')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all text-xs ${
              selectedSeverity === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Todas ({SOP_GAP_MISMATCHES.length})
          </button>
          <button
            onClick={() => setSelectedSeverity('critical')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all text-xs flex items-center gap-1 ${
              selectedSeverity === 'critical'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Flame className="w-3 h-3 text-rose-300" />
            Críticas ({SOP_GAP_MISMATCHES.filter((g) => g.severity === 'critical').length})
          </button>
          <button
            onClick={() => setSelectedSeverity('high')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all text-xs ${
              selectedSeverity === 'high'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Altas ({SOP_GAP_MISMATCHES.filter((g) => g.severity === 'high').length})
          </button>
        </div>
      </div>

      {/* Main Container: Grid of mismatch cards + Detail & direct LLM link */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left List: Gaps selector (5 cols) */}
        <div className="lg:col-span-5 p-4 space-y-2 bg-slate-50/60 max-h-[540px] overflow-y-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block px-1 mb-2">
            Desajustes Críticos Identificados ({filteredGaps.length}):
          </span>

          {filteredGaps.map((gap) => {
            const isSelected = gap.id === activeGap.id;
            return (
              <div
                key={gap.id}
                onClick={() => setActiveGapId(gap.id)}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-white shadow-xs ring-1 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
                    {gap.industry}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      gap.severity === 'critical'
                        ? 'bg-rose-100 text-rose-700 border border-rose-200'
                        : 'bg-amber-100 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {gap.severity === 'critical' ? 'Crítico' : 'Alto'}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 leading-snug line-clamp-2">
                  {gap.title}
                </h4>

                <div className="mt-2 flex items-center justify-between text-[11px] pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-slate-500">
                    <span className="font-medium text-slate-700">IPs Antídoto:</span>
                    <div className="flex items-center gap-1">
                      {gap.keyHighImpactIps.slice(0, 3).map((code) => (
                        <span key={code} className="px-1.5 py-0.2 bg-slate-900 text-white font-mono text-[9px] rounded font-bold">
                          {code}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isSelected ? 'rotate-90 text-blue-600' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Panel: Forensic Breakdown & Remediation Action (7 cols) */}
        <div className="lg:col-span-7 p-6 space-y-5 bg-white flex flex-col justify-between">
          <div className="space-y-4">
            {/* Title & Industry Badges */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-mono font-bold text-[10px]">
                  {activeGap.industry}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[10px]">
                  {activeGap.sector}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeGap.severity === 'critical'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  Severidad {activeGap.severity.toUpperCase()}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                {activeGap.title}
              </h3>
            </div>

            {/* Comparison Grid: Flawed SOP vs Reality In Trench */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Flawed SOP */}
              <div className="bg-rose-50/70 border border-rose-200/90 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-rose-900 text-xs">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Fractura del SOP Tradicional:</span>
                </div>
                <p className="text-rose-950 text-[11px] leading-relaxed">
                  {activeGap.sopFragilityPattern}
                </p>
              </div>

              {/* Real Trench Symptom */}
              <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
                  <TrendingDown className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Síntoma Real en Trinchera:</span>
                </div>
                <p className="text-amber-950 text-[11px] leading-relaxed">
                  {activeGap.trenchSymptom}
                </p>
              </div>
            </div>

            {/* Cost of Inaction / Financial Leak */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-bold text-slate-800 text-[11px] block mb-0.5 flex items-center gap-1.5">
                <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                Costo Sistémico de la Inacción:
              </span>
              <p className="text-slate-600 text-[11px]">
                {activeGap.costOfInaction}
              </p>
            </div>

            {/* High-Impact IPs Antidotes */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                IPs de Alto Impacto para Inocular esta Brecha:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeGap.keyHighImpactIps.map((code) => {
                  const matchedIp = ips.find((i) => i.code === code || i.id === code);
                  return (
                    <div
                      key={code}
                      onClick={() => onSelectIpForModal(code)}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 bg-white transition-all cursor-pointer group shadow-2xs text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs font-bold text-slate-900 group-hover:text-blue-600">
                          {code}
                        </span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                      </div>
                      <div className="font-semibold text-slate-800 text-[11px] line-clamp-1 group-hover:text-blue-600">
                        {matchedIp ? matchedIp.name : 'Protocolo Forense'}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                        {matchedIp ? `${matchedIp.immediateApplicability}% aplicable` : 'Alta aplicabilidad'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Direct CTA to LLM Remediation Step-by-Step */}
          <div className="pt-4 border-t border-slate-100">
            <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 text-white rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-indigo-900/50">
              <div className="space-y-1 max-w-md">
                <div className="flex items-center gap-1.5 text-indigo-300 font-bold text-xs">
                  <Bot className="w-4 h-4 text-indigo-400" />
                  <span>Remediación Inmediata con Motor LLM</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Carga esta brecha directamente en la Capa LLM para generar el plan de remediación táctico paso a paso ($T+0$, $T+1h$, $T+24h$), adaptado a tu rol y nivel de saturación.
                </p>
              </div>

              <button
                onClick={() => handleRemediateClick(activeGap)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all shrink-0 cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>Generar Remediación Paso a Paso &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
