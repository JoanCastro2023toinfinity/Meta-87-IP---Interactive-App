import React, { useState } from 'react';
import { IndustrySopMapItem, IpItem } from '../types';
import { INDUSTRY_SOP_MAP_DATA } from '../data/industrySopMapData';
import { 
  Map, 
  Building2, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Sparkles,
  Search
} from 'lucide-react';

import { GapAnalysisWidget } from './GapAnalysisWidget';
import { SopGapMismatch } from '../data/sopGapMismatches';

interface IndustrySopMapViewProps {
  ips: IpItem[];
  onSelectIp: (id: string) => void;
  onNavigateToLlmRemediation?: (gap: SopGapMismatch) => void;
}

export const IndustrySopMapView: React.FC<IndustrySopMapViewProps> = ({ 
  ips, 
  onSelectIp,
  onNavigateToLlmRemediation 
}) => {
  const [selectedIndustryIndex, setSelectedIndustryIndex] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIndustries = INDUSTRY_SOP_MAP_DATA.filter((item) =>
    item.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.typicalSopFailure.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItem: IndustrySopMapItem = filteredIndustries[selectedIndustryIndex] || INDUSTRY_SOP_MAP_DATA[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Map className="w-5 h-5 text-blue-600" />
              <span>Mapa Interactivo de Industrias vs. Brechas de SOPs</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl">
              Análisis comparativo de cómo los procedimientos estándar (SOPs) tradicionales colapsan en la práctica versus cómo las IPs del sistema restauran el margen, la resiliencia y el valor real.
            </p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filtrar industrias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Industry selector cards */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {filteredIndustries.map((item, idx) => {
            const isSelected = item.industry === currentItem.industry;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIndustryIndex(idx)}
                className={`p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-500'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    {item.sector}
                  </span>
                  <span className="font-bold text-slate-900 line-clamp-2 mt-0.5 leading-snug">
                    {item.industry}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-blue-600 font-semibold">
                  <span>{item.solvingIps.length} IPs resolutivas</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Industry Deep Dive Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Sector: {currentItem.sector}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              {currentItem.industry}
            </h2>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 self-start sm:self-auto">
            Caso Forense Activo
          </span>
        </div>

        {/* The Core Contrast Grid: SOP Failure vs Solving Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Traditional SOP Failure */}
          <div className="bg-rose-50/40 border border-rose-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <h3 className="font-bold text-sm">La Brecha del SOP Tradicional</h3>
            </div>
            <p className="text-slate-700 leading-relaxed text-xs">
              {currentItem.typicalSopFailure}
            </p>
            <div className="pt-2 border-t border-rose-200/60">
              <span className="font-bold text-rose-900 block mb-1">Costo Real de la Ruptura:</span>
              <p className="text-rose-950 font-medium">{currentItem.costOfBreach}</p>
            </div>
          </div>

          {/* Case Study & Systemic Resolution */}
          <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <h3 className="font-bold text-sm">Caso de Uso: {currentItem.caseStudyTitle}</h3>
            </div>
            <p className="text-slate-700 leading-relaxed text-xs">
              {currentItem.caseStudySummary}
            </p>
            <div className="pt-2 border-t border-emerald-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-white/80 border border-emerald-100">
                <span className="font-bold text-slate-500 block text-[10px] uppercase">Antes del Modelo:</span>
                <span className="text-rose-700 font-semibold text-xs">{currentItem.beforeMetric}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/80 border border-emerald-100">
                <span className="font-bold text-slate-500 block text-[10px] uppercase">Después de la IP:</span>
                <span className="text-emerald-700 font-bold text-xs">{currentItem.afterMetric}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Solving IPs Pills */}
        <div className="pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            IPs que Reparan y Blindan esta Industria (Haz clic para ver ficha):
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentItem.solvingIps.map((code) => {
              const matchedIp = ips.find((i) => i.code === code || i.id === code);
              if (!matchedIp) return null;

              return (
                <div
                  key={matchedIp.id}
                  onClick={() => onSelectIp(matchedIp.id)}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-slate-900 group-hover:text-blue-600">
                      {matchedIp.code}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 px-1.5 py-0.5 rounded bg-emerald-50">
                      {matchedIp.immediateApplicability}% aplicable
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 line-clamp-1">
                    {matchedIp.name}
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {matchedIp.purpose}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gap Analysis Dashboard Widget: Highlighting critical SOP vs High-Impact IP mismatches */}
      <GapAnalysisWidget
        ips={ips}
        onSelectIpForModal={onSelectIp}
        onNavigateToLlmRemediation={onNavigateToLlmRemediation}
      />
    </div>
  );
};
