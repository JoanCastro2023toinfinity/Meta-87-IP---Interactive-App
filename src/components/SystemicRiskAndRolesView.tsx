import React, { useState } from 'react';
import { 
  Flame, 
  Users, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { IpItem } from '../types';
import { SystemicRiskHeatmapWidget } from './SystemicRiskHeatmapWidget';
import { CrossRoleSuggestionsWidget } from './CrossRoleSuggestionsWidget';

interface SystemicRiskAndRolesViewProps {
  ips: IpItem[];
  onSelectIp: (id: string) => void;
  onAddIpToPortfolio?: (id: string) => void;
  portfolioIpIds?: string[];
  onNavigateToLlmRemediation?: (ip: IpItem) => void;
}

export const SystemicRiskAndRolesView: React.FC<SystemicRiskAndRolesViewProps> = ({
  ips,
  onSelectIp,
  onAddIpToPortfolio,
  portfolioIpIds = [],
  onNavigateToLlmRemediation,
}) => {
  const [activeSubView, setActiveSubView] = useState<'heatmap' | 'roles' | 'both'>('heatmap');
  const [selectedIpForRoleAnchor, setSelectedIpForRoleAnchor] = useState<IpItem | null>(null);

  const handleSelectIpForCrossRole = (ip: IpItem) => {
    setSelectedIpForRoleAnchor(ip);
    setActiveSubView('roles');
  };

  return (
    <div className="space-y-6">
      {/* Top View Selector Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-900/60 border border-indigo-700/50 flex items-center justify-center">
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">
              Gobernanza de Última Milla &amp; Arquitectura Cross-Role
            </h2>
            <p className="text-[11px] text-slate-400">
              Mitigación de riesgos operacionales y transformación de la experiencia vivida por cada actor.
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800 rounded-lg w-full sm:w-auto">
          <button
            onClick={() => setActiveSubView('heatmap')}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeSubView === 'heatmap'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-slate-900" />
            <span>1. Mapa de Calor de Riesgos</span>
          </button>

          <button
            onClick={() => setActiveSubView('roles')}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeSubView === 'roles'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-indigo-300" />
            <span>2. Sugerencias Cross-Role</span>
          </button>

          <button
            onClick={() => setActiveSubView('both')}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeSubView === 'both'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Vista Combinada</span>
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE SUB-VIEW */}
      {(activeSubView === 'heatmap' || activeSubView === 'both') && (
        <SystemicRiskHeatmapWidget
          ips={ips}
          onSelectIp={onSelectIp}
          onSelectIpForCrossRole={handleSelectIpForCrossRole}
          onAddIpToPortfolio={onAddIpToPortfolio}
          portfolioIpIds={portfolioIpIds}
        />
      )}

      {(activeSubView === 'roles' || activeSubView === 'both') && (
        <CrossRoleSuggestionsWidget
          ips={ips}
          initialSelectedIp={selectedIpForRoleAnchor}
          onSelectIp={onSelectIp}
          onAddIpToPortfolio={onAddIpToPortfolio}
          portfolioIpIds={portfolioIpIds}
          onNavigateToLlmRemediation={onNavigateToLlmRemediation}
        />
      )}
    </div>
  );
};
