import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  Shield, 
  Compass, 
  HeartHandshake, 
  Layers, 
  Clock, 
  Bot,
  ExternalLink,
  Flame,
  Search
} from 'lucide-react';
import { IpItem } from '../types';
import { ALL_IPS } from '../data/ipsData';
import { 
  CROSS_ROLES, 
  CrossRoleKey, 
  getCrossRoleAnchorForIp, 
  getRecommendedIpsForRole, 
  CrossRoleAnchorResult 
} from '../data/crossRoleData';

interface CrossRoleSuggestionsWidgetProps {
  ips: IpItem[];
  initialSelectedIp?: IpItem | null;
  onSelectIp: (id: string) => void;
  onAddIpToPortfolio?: (id: string) => void;
  portfolioIpIds?: string[];
  onNavigateToLlmRemediation?: (ip: IpItem) => void;
}

export const CrossRoleSuggestionsWidget: React.FC<CrossRoleSuggestionsWidgetProps> = ({
  ips,
  initialSelectedIp = null,
  onSelectIp,
  onAddIpToPortfolio,
  portfolioIpIds = [],
  onNavigateToLlmRemediation,
}) => {
  const [activeRoleKey, setActiveRoleKey] = useState<CrossRoleKey>('operador_linea');
  
  // Selected IP for the Cross-Role Anchor (defaults to initialSelectedIp or IP-081)
  const [anchorIpId, setAnchorIpId] = useState<string>(
    initialSelectedIp ? initialSelectedIp.id : 'IP-081'
  );

  const activeRole = CROSS_ROLES[activeRoleKey];
  const recommendedIps = getRecommendedIpsForRole(activeRoleKey);

  const currentAnchorIp = ALL_IPS.find((ip) => ip.id === anchorIpId || ip.code === anchorIpId) || ALL_IPS[0];
  const anchorResult: CrossRoleAnchorResult = getCrossRoleAnchorForIp(currentAnchorIp);

  const roleKeys: CrossRoleKey[] = ['operador_linea', 'director_clevel', 'consultor_fractional', 'cliente_final'];

  const getRoleIcon = (key: CrossRoleKey) => {
    switch (key) {
      case 'operador_linea': return <Wrench className="w-4 h-4 text-amber-400" />;
      case 'director_clevel': return <Shield className="w-4 h-4 text-indigo-400" />;
      case 'consultor_fractional': return <Compass className="w-4 h-4 text-blue-400" />;
      case 'cliente_final': return <HeartHandshake className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: The Cross-Role Philosophy */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-medium">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              Gobernanza Relacional • 4 Arquetipos Clave
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
              Sugerencias Basadas en Rol &amp; Ancla Cross-Role
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Una verdadera arquitectura no optimiza a la dirección a costa de quemar al operador, ni complace al cliente destruyendo el margen. Descubre cómo cada IP transforma la <strong>próxima experiencia a habitar</strong> para los 4 actores del ecosistema.
            </p>
          </div>

          {/* Role Summary Pillbox */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex flex-col gap-2 shrink-0 text-xs text-slate-300">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              El Principio del Habitante:
            </div>
            <div className="text-slate-200 font-medium">
              &ldquo;El cliente no compra procesos; habita la experiencia que el sistema produce.&rdquo;
            </div>
          </div>
        </div>

        {/* 4-Role Navigation Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {roleKeys.map((key) => {
            const r = CROSS_ROLES[key];
            const isSelected = activeRoleKey === key;

            return (
              <button
                key={key}
                onClick={() => setActiveRoleKey(key)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-indigo-500 ring-1 ring-indigo-500/50 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                    {getRoleIcon(key)}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${r.bgColor} ${r.textColor} border ${r.borderColor}`}>
                    {r.badge}
                  </span>
                </div>
                <div className="text-xs font-bold text-white mt-2 truncate">
                  {r.title}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {r.roleName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE ROLE SPOTLIGHT: Core Tension & Lived Experience */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-lg">
        {/* Role Identity & Tension */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${activeRole.bgColor} ${activeRole.textColor} border ${activeRole.borderColor}`}>
                {activeRole.archetype}
              </span>
              <h3 className="text-xl font-bold text-white">
                {activeRole.title}
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              {activeRole.tagline}
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs max-w-md">
            <div className="text-[10px] uppercase font-mono text-slate-400 mb-1">
              Tensión Diaria Inconfesable:
            </div>
            <blockquote className="text-slate-200 italic font-serif">
              {activeRole.coreTension}
            </blockquote>
          </div>
        </div>

        {/* DEFINIDOR: LA PRÓXIMA EXPERIENCIA A HABITAR (Contrast Grid) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Definidor: ¿Cuál es la próxima experiencia a habitar?
            </h4>
            <span className="text-[11px] text-slate-400 font-mono">
              Contraste de Realidad Operativa
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Distopía Actual (Fricción) */}
            <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                La Experiencia Actual (Distopía de Fricción)
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeRole.currentPainExperience.map((pain, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span className="leading-relaxed">{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Próxima Experiencia (Soberanía) */}
            <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                La Próxima Experiencia a Habitar (Soberanía Operativa)
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                {activeRole.nextLivedExperience.map((exp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span className="leading-relaxed">{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Systemic Promise Footer Banner */}
          <div className="bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-900/40 rounded-xl p-4 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
            <div className="text-xs text-slate-300">
              <strong className="text-white">Garantía del Sistema:</strong> {activeRole.systemicPromise}
            </div>
          </div>
        </div>

        {/* RECOMMENDED IPS FOR THIS ROLE */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Primitivas Sugeridas con Alivio Inmediato para {activeRole.title}
            </h4>
            <span className="text-xs text-slate-400 font-mono">
              {recommendedIps.length} IPs Clave
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recommendedIps.map((ip) => {
              const isInPortfolio = portfolioIpIds.includes(ip.id) || portfolioIpIds.includes(ip.code);

              return (
                <div
                  key={ip.id}
                  className="bg-slate-950/60 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 space-y-3 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 font-mono font-bold text-[11px]">
                        {ip.code}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">
                        {ip.immediateApplicability}% Inmediato
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-white leading-tight">
                      {ip.name}
                    </h5>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {ip.purpose}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setAnchorIpId(ip.id);
                        onSelectIp(ip.id);
                      }}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                    >
                      <span>Auditar</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setAnchorIpId(ip.id)}
                        className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition-colors ${
                          anchorIpId === ip.id
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                        title="Fijar como ancla en el comparador de los 4 roles"
                      >
                        {anchorIpId === ip.id ? '★ Ancla' : 'Fijar Ancla'}
                      </button>

                      {onAddIpToPortfolio && (
                        <button
                          onClick={() => onAddIpToPortfolio(ip.id)}
                          className={`px-2 py-1 rounded text-[10px] font-semibold transition-colors ${
                            isInPortfolio
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                          }`}
                        >
                          {isInPortfolio ? 'En Portafolio' : '+ Portafolio'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* THE CROSS-ROLE ANCHOR (ANCLA CROSS-ROLE SINCRÓNICA) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Ancla Cross-Role Sincrónica
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              ¿Cómo resuena una sola IP en los 4 roles simultáneamente?
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl">
              Selecciona cualquier IP del catálogo para verificar cómo equilibra la tensión entre la trinchera, la dirección, la consultoría y la experiencia final del cliente.
            </p>
          </div>

          {/* IP Selector Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-400 shrink-0">IP Ancla:</span>
            <select
              value={anchorIpId}
              onChange={(e) => setAnchorIpId(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 w-full sm:w-64 font-mono"
            >
              {ALL_IPS.map((ip) => (
                <option key={ip.id} value={ip.id}>
                  {ip.code} - {ip.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected IP Overview Card */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 font-mono text-xs font-bold">
                {currentAnchorIp.code}
              </span>
              <span className="text-white font-bold text-sm">
                {currentAnchorIp.name}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                • {currentAnchorIp.categoryLabel}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {currentAnchorIp.purpose}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onSelectIp(currentAnchorIp.id)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition-colors"
            >
              Ver Análisis Forense
            </button>
            {onNavigateToLlmRemediation && (
              <button
                onClick={() => onNavigateToLlmRemediation(currentAnchorIp)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Remediar con LLM</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 PERSPECTIVES SIDE BY SIDE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roleKeys.map((key) => {
            const r = CROSS_ROLES[key];
            const p = anchorResult.perspectives[key];

            return (
              <div
                key={key}
                className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(key)}
                      <span className="text-xs font-bold text-white">{r.title}</span>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${r.bgColor} ${r.textColor}`}>
                      {r.badge}
                    </span>
                  </div>

                  <div className="text-[11px] space-y-2">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Lo que transforma:</span>
                      <p className="text-slate-200 font-medium leading-relaxed">{p.transformationSummary}</p>
                    </div>

                    <div>
                      <span className="text-rose-400 block text-[10px] uppercase font-mono">Fricción que elimina:</span>
                      <p className="text-slate-300 leading-relaxed">{p.frictionEliminated}</p>
                    </div>

                    <div>
                      <span className="text-emerald-400 block text-[10px] uppercase font-mono">Próxima experiencia ganada:</span>
                      <p className="text-emerald-200 leading-relaxed">{p.nextExperienceGained}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 italic">
                  <strong>Acción Clave:</strong> {p.actionPrompt}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
