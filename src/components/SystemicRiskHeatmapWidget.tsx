import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  ShieldCheck, 
  AlertTriangle, 
  GitFork, 
  Activity, 
  Coins, 
  ShieldAlert, 
  EyeOff, 
  Search, 
  Filter, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  Sparkles,
  Zap,
  Users
} from 'lucide-react';
import { IpItem, ProblemCategory } from '../types';
import { 
  getAllIpRiskProfiles, 
  getRiskStats, 
  LAST_MILE_FAILURE_MODES, 
  LastMileFailureModeId,
  IpSystemicRiskProfile 
} from '../data/systemicRiskData';
import { PROBLEM_CATEGORIES } from '../data/categoriesData';

interface SystemicRiskHeatmapWidgetProps {
  ips: IpItem[];
  onSelectIp: (id: string) => void;
  onSelectIpForCrossRole?: (ip: IpItem) => void;
  onAddIpToPortfolio?: (id: string) => void;
  portfolioIpIds?: string[];
}

export const SystemicRiskHeatmapWidget: React.FC<SystemicRiskHeatmapWidgetProps> = ({
  ips,
  onSelectIp,
  onSelectIpForCrossRole,
  onAddIpToPortfolio,
  portfolioIpIds = [],
}) => {
  const [selectedFailureMode, setSelectedFailureMode] = useState<LastMileFailureModeId | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<ProblemCategory | 'ALL'>('ALL');
  const [minReductionThreshold, setMinReductionThreshold] = useState<number>(75);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'matrix' | 'ranking' | 'grid'>('matrix');
  const [hoveredProfile, setHoveredProfile] = useState<IpSystemicRiskProfile | null>(null);

  const allProfiles = useMemo(() => getAllIpRiskProfiles(), []);
  const stats = useMemo(() => getRiskStats(), []);

  // Filtered profiles
  const filteredProfiles = useMemo(() => {
    return allProfiles.filter((profile) => {
      if (selectedFailureMode !== 'ALL' && profile.primaryFailureMode !== selectedFailureMode) {
        return false;
      }
      if (selectedCategory !== 'ALL' && profile.ip.category !== selectedCategory) {
        return false;
      }
      if (profile.riskReductionScore < minReductionThreshold) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = profile.ip.name.toLowerCase().includes(query);
        const matchesCode = profile.ip.code.toLowerCase().includes(query);
        const matchesMechanism = profile.lastMileMechanism.toLowerCase().includes(query);
        const matchesRelief = profile.frontlineRelief.toLowerCase().includes(query);
        if (!matchesName && !matchesCode && !matchesMechanism && !matchesRelief) {
          return false;
        }
      }
      return true;
    });
  }, [allProfiles, selectedFailureMode, selectedCategory, minReductionThreshold, searchQuery]);

  // Top ranking circuit-breakers (sorted by score descending)
  const topCircuitBreakers = useMemo(() => {
    return [...allProfiles]
      .sort((a, b) => b.riskReductionScore - a.riskReductionScore)
      .slice(0, 10);
  }, [allProfiles]);

  const failureModeKeys = Object.keys(LAST_MILE_FAILURE_MODES) as LastMileFailureModeId[];
  const categoryKeys = Object.keys(PROBLEM_CATEGORIES) as ProblemCategory[];

  const getHeatmapColor = (score: number) => {
    if (score >= 95) return 'bg-emerald-500 text-white font-bold hover:bg-emerald-400';
    if (score >= 90) return 'bg-teal-600 text-white font-semibold hover:bg-teal-500';
    if (score >= 85) return 'bg-cyan-700 text-cyan-100 hover:bg-cyan-600';
    if (score >= 80) return 'bg-blue-800 text-blue-100 hover:bg-blue-700';
    return 'bg-slate-800 text-slate-300 hover:bg-slate-700';
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Matriz de Blindaje Forense • 87 IPs Analizadas
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
              Mapa de Calor de Riesgos Sistémicos
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Identifica con precisión matemática qué primitivas reducen la probabilidad de fallo operativo catastrófico en la <strong>última milla</strong> (el punto de contacto crítico con el cliente y la trinchera).
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            <div className="bg-slate-900/80 border border-emerald-900/50 rounded-xl p-3 text-center">
              <div className="text-2xl font-black font-mono text-emerald-400">
                {stats.criticalCount} IPs
              </div>
              <div className="text-[11px] font-semibold text-slate-300 mt-0.5">Circuit-Breakers Críticos</div>
              <div className="text-[10px] text-slate-500">&ge;90% Reducción de Falla</div>
            </div>

            <div className="bg-slate-900/80 border border-indigo-900/50 rounded-xl p-3 text-center">
              <div className="text-2xl font-black font-mono text-indigo-400">
                {stats.averageReduction}%
              </div>
              <div className="text-[11px] font-semibold text-slate-300 mt-0.5">Eficacia Promedio</div>
              <div className="text-[10px] text-slate-500">En las 87 Primitivas</div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-slate-900/80 border border-amber-900/50 rounded-xl p-3 text-center">
              <div className="text-2xl font-black font-mono text-amber-400">
                6 Modos
              </div>
              <div className="text-[11px] font-semibold text-slate-300 mt-0.5">Fallas de Última Milla</div>
              <div className="text-[10px] text-slate-500">Mapeadas y Neutralizadas</div>
            </div>
          </div>
        </div>

        {/* Failure Modes Interactive Ribbon */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {failureModeKeys.map((modeKey) => {
            const mode = LAST_MILE_FAILURE_MODES[modeKey];
            const isSelected = selectedFailureMode === modeKey;
            const count = stats.byFailureMode[modeKey] || 0;

            return (
              <button
                key={modeKey}
                onClick={() => setSelectedFailureMode(isSelected ? 'ALL' : modeKey)}
                className={`p-2.5 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-slate-800 border-indigo-500 ring-1 ring-indigo-500/50 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${mode.bgBadge} ${mode.textColor} border ${mode.borderBadge}`}>
                    {mode.severity}
                  </span>
                  <span className="text-slate-400 font-bold">{count} IPs</span>
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1.5 truncate">
                  {mode.shortName}
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                  {mode.tagline}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Bar: Filters & View Switcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search & Category Filter */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por IP, nombre o mecanismo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">Todas las Categorías (8)</option>
              {categoryKeys.map((catKey) => (
                <option key={catKey} value={catKey}>
                  {PROBLEM_CATEGORIES[catKey].name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Umbral mín:</span>
            <select
              value={minReductionThreshold}
              onChange={(e) => setMinReductionThreshold(Number(e.target.value))}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
            >
              <option value={70}>&ge;70%</option>
              <option value={80}>&ge;80% (Alta eficacia)</option>
              <option value={90}>&ge;90% (Críticos)</option>
              <option value={94}>&ge;94% (Top Tier)</option>
            </select>
          </div>

          {(selectedFailureMode !== 'ALL' || selectedCategory !== 'ALL' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedFailureMode('ALL');
                setSelectedCategory('ALL');
                setSearchQuery('');
                setMinReductionThreshold(75);
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* View Mode Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-800/80 border border-slate-700 rounded-lg shrink-0">
          <button
            onClick={() => setViewMode('matrix')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'matrix'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Matriz Térmica
          </button>
          <button
            onClick={() => setViewMode('ranking')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'ranking'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Top 10 Circuit-Breakers
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tarjetas ({filteredProfiles.length})
          </button>
        </div>
      </div>

      {/* VIEW 1: HEATMAP MATRIX (Category x Failure Mode) */}
      {viewMode === 'matrix' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                Matriz Térmica: Categoría vs. Modo de Falla de Última Milla
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Las celdas muestran la densidad y el grado de blindaje operativo provisto por las IPs en cada cuadrante.
              </p>
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className="text-slate-400">Intensidad:</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500 text-white font-bold">&ge;95%</span>
              <span className="px-2 py-0.5 rounded bg-teal-600 text-white font-semibold">90-94%</span>
              <span className="px-2 py-0.5 rounded bg-cyan-700 text-cyan-100">85-89%</span>
              <span className="px-2 py-0.5 rounded bg-blue-800 text-blue-100">&lt;85%</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="py-3 px-3 text-slate-400 font-semibold w-48">Categoría de Problema</th>
                  {failureModeKeys.map((fKey) => {
                    const fMode = LAST_MILE_FAILURE_MODES[fKey];
                    return (
                      <th key={fKey} className="py-3 px-2 text-center text-slate-300 font-semibold min-w-[120px]">
                        <div className="text-[11px] text-slate-200">{fMode.shortName}</div>
                        <div className="text-[9px] text-slate-400 font-normal font-mono">{fMode.severity}</div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {categoryKeys.map((catKey) => {
                  const catInfo = PROBLEM_CATEGORIES[catKey];
                  return (
                    <tr key={catKey} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-3 text-slate-200 font-medium align-middle">
                        <div className="font-semibold text-slate-200 text-xs truncate max-w-[200px]" title={catInfo.name}>
                          {catInfo.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[200px]">
                          {catInfo.shortDesc}
                        </div>
                      </td>

                      {failureModeKeys.map((fKey) => {
                        const matching = allProfiles.filter(
                          (p) => p.ip.category === catKey && p.primaryFailureMode === fKey
                        );

                        if (matching.length === 0) {
                          return (
                            <td key={fKey} className="py-2 px-2 text-center align-middle">
                              <div className="h-10 rounded-lg bg-slate-950/40 border border-slate-800/40 flex items-center justify-center text-slate-600 text-[10px] font-mono">
                                —
                              </div>
                            </td>
                          );
                        }

                        const maxScore = Math.max(...matching.map((m) => m.riskReductionScore));
                        const cellColor = getHeatmapColor(maxScore);

                        return (
                          <td key={fKey} className="py-2 px-2 text-center align-middle">
                            <div 
                              className={`h-10 rounded-lg p-1.5 flex flex-col items-center justify-center transition-all cursor-pointer shadow-xs ${cellColor}`}
                              onClick={() => {
                                if (matching[0]) {
                                  onSelectIp(matching[0].ip.id);
                                }
                              }}
                              onMouseEnter={() => setHoveredProfile(matching[0] || null)}
                              title={`Haz clic para ver las ${matching.length} IPs en esta celda`}
                            >
                              <span className="font-mono text-xs font-bold leading-none">
                                {maxScore}%
                              </span>
                              <span className="text-[10px] font-mono opacity-90 leading-tight">
                                {matching.length} IP{matching.length > 1 ? 's' : ''}
                              </span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Hover Preview Card if hovered */}
          {hoveredProfile && (
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs animate-in fade-in duration-150">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 font-mono font-bold text-[11px]">
                    {hoveredProfile.ip.code}
                  </span>
                  <span className="font-bold text-white text-sm">
                    {hoveredProfile.ip.name}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-semibold">
                    {hoveredProfile.riskReductionScore}% Reducción
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Mecanismo de Última Milla:</strong> {hoveredProfile.lastMileMechanism}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onSelectIp(hoveredProfile.ip.id)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-1"
                >
                  <span>Ver Detalle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                {onSelectIpForCrossRole && (
                  <button
                    onClick={() => onSelectIpForCrossRole(hoveredProfile.ip)}
                    className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-1"
                  >
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Ver en Roles</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: TOP 10 CIRCUIT-BREAKERS RANKING */}
      {viewMode === 'ranking' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                Top 10 Circuit-Breakers para la Última Milla Operativa
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Las 10 primitivas con el mayor índice de absorción de entropía en el contacto directo con clientes y trinchera.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topCircuitBreakers.map((profile, idx) => {
              const mode = LAST_MILE_FAILURE_MODES[profile.primaryFailureMode];
              const isInPortfolio = portfolioIpIds.includes(profile.ip.id) || portfolioIpIds.includes(profile.ip.code);

              return (
                <div
                  key={profile.ip.id}
                  className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 space-y-3.5 transition-all relative overflow-hidden group shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-black text-amber-400 text-sm">
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-indigo-400">
                            {profile.ip.code}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            {profile.riskReductionScore}% Reducción de Riesgo
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors mt-0.5">
                          {profile.ip.name}
                        </h4>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${mode.bgBadge} ${mode.textColor} border ${mode.borderBadge} shrink-0`}>
                      {mode.shortName}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Mecanismo:</strong> {profile.lastMileMechanism}
                  </p>

                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 space-y-2 text-[11px]">
                    <div className="text-slate-300">
                      <strong className="text-emerald-400">Alivio para el Operador:</strong> {profile.frontlineRelief}
                    </div>
                    <div className="text-slate-300">
                      <strong className="text-indigo-400">Próxima Experiencia del Cliente:</strong> {profile.nextLivedExperienceForClient}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => onSelectIp(profile.ip.id)}
                      className="text-xs text-slate-300 hover:text-white font-medium flex items-center gap-1 transition-colors"
                    >
                      <span>Auditoría Forense</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {onSelectIpForCrossRole && (
                        <button
                          onClick={() => onSelectIpForCrossRole(profile.ip)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium flex items-center gap-1 transition-colors"
                          title="Explora este IP con los 4 lentes de roles"
                        >
                          <Users className="w-3 h-3 text-amber-400" />
                          <span>Ver en Roles</span>
                        </button>
                      )}

                      {onAddIpToPortfolio && (
                        <button
                          onClick={() => onAddIpToPortfolio(profile.ip.id)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            isInPortfolio
                              ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                          }`}
                        >
                          {isInPortfolio ? 'En Portafolio' : '+ Agregar'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: CARD GRID (All Filtered IPs) */}
      {viewMode === 'grid' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Mostrando {filteredProfiles.length} de {allProfiles.length} IPs evaluadas</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProfiles.map((profile) => {
              const mode = LAST_MILE_FAILURE_MODES[profile.primaryFailureMode];
              const isInPortfolio = portfolioIpIds.includes(profile.ip.id) || portfolioIpIds.includes(profile.ip.code);

              return (
                <div
                  key={profile.ip.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-3 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-indigo-900/60 text-indigo-300 font-mono text-[10px] font-bold">
                          {profile.ip.code}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">
                          {profile.riskReductionScore}%
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${mode.bgBadge} ${mode.textColor} border ${mode.borderBadge}`}>
                        {mode.shortName}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white leading-snug">
                      {profile.ip.name}
                    </h4>

                    <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                      {profile.lastMileMechanism}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => onSelectIp(profile.ip.id)}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                    >
                      <span>Detalle</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {onSelectIpForCrossRole && (
                        <button
                          onClick={() => onSelectIpForCrossRole(profile.ip)}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-medium"
                        >
                          Roles
                        </button>
                      )}
                      {onAddIpToPortfolio && (
                        <button
                          onClick={() => onAddIpToPortfolio(profile.ip.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                            isInPortfolio
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                          }`}
                        >
                          {isInPortfolio ? 'Activa' : '+'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
