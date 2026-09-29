import React from 'react';
import { 
  Database, 
  GitFork, 
  Layers, 
  Map, 
  Compass, 
  Download, 
  CheckCircle2, 
  ShieldCheck,
  Bot,
  Sparkles,
  Flame
} from 'lucide-react';

export type ActiveTab = 'catalog' | 'cross' | 'categories' | 'industry_map' | 'simulator' | 'impact' | 'llm_support' | 'risk_heatmap';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  totalIps: number;
  selectedPortfolioCount?: number;
  onExportData: () => void;
  onOpenManifesto?: (tab?: 'nature' | 'compression' | 'autonomy' | 'calculator') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  totalIps,
  selectedPortfolioCount = 0,
  onExportData,
  onOpenManifesto,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Executive Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">
                  Atlas de IPs y Gobernanza
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/60">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {totalIps} IPs &ge;80% Aplicables
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal leading-none hidden sm:block mt-0.5">
                Arquitectura de Soberanía Operativa, Capital &amp; Resolución de Brechas de SOPs
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {onOpenManifesto && (
              <button
                onClick={() => onOpenManifesto('nature')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-200 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-600/40 hover:border-amber-400 rounded-lg transition-all shadow-xs"
                title="Abre el manifiesto: Subsidio cognitivo y por qué ahorra 3-5M de horas"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">¿Qué es realmente esta IP?</span>
                <span className="sm:hidden font-mono">Manifiesto IP</span>
              </button>
            )}

            <button
              onClick={onExportData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors shadow-xs"
              title="Exportar inventario forense completo en JSON"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden md:inline">Exportar Dossier</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-800/80 text-xs">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'catalog'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            1. Catálogo Forense ({totalIps} IPs)
          </button>

          <button
            onClick={() => setActiveTab('cross')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'cross'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            2. Cruce Funcional e Interconexión
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'categories'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            3. Categorización por Problema
          </button>

          <button
            onClick={() => setActiveTab('industry_map')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'industry_map'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            4. Mapa de Industrias &amp; Gap Analysis SOPs
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'simulator'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            5. Selector Ejecutivo de Crisis
          </button>

          <button
            onClick={() => setActiveTab('impact')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'impact'
                ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                : 'text-emerald-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            6. Gobernanza Impact Score &amp; ROI
            {selectedPortfolioCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-emerald-900/80 border border-emerald-500/50 text-[10px] text-emerald-200 font-mono font-bold">
                {selectedPortfolioCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('llm_support')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'llm_support'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-xs'
                : 'text-indigo-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-indigo-300" />
            7. Capa LLM: Soporte &amp; Post-Mortems
          </button>

          <button
            onClick={() => setActiveTab('risk_heatmap')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'risk_heatmap'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-amber-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            8. Mapa de Calor de Riesgos &amp; Roles
          </button>
        </div>
      </div>
    </header>
  );
};
