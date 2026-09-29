import React, { useState } from 'react';
import { IpItem, ProblemCategory } from '../types';
import { PROBLEM_CATEGORIES } from '../data/categoriesData';
import { 
  Users, 
  GitFork, 
  Zap, 
  Coins, 
  ShieldAlert, 
  Layers, 
  Scale, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface ProblemCategoryViewProps {
  ips: IpItem[];
  onSelectIp: (id: string) => void;
}

const getCategoryIcon = (id: ProblemCategory) => {
  switch (id) {
    case 'talento_cargas':
      return Users;
    case 'divergencia_estrategia_realidad':
      return GitFork;
    case 'escalabilidad_sin_heroes':
      return Zap;
    case 'capital_economics':
      return Coins;
    case 'riesgo_breakpoints':
      return ShieldAlert;
    case 'producto_oferta_modelos':
      return Layers;
    case 'criterio_gobernanza_fractal':
      return Scale;
    case 'metodologia_trinchera':
      return Compass;
  }
};

export const ProblemCategoryView: React.FC<ProblemCategoryViewProps> = ({ ips, onSelectIp }) => {
  const [activeCategory, setActiveCategory] = useState<ProblemCategory>('talento_cargas');

  const categoryData = PROBLEM_CATEGORIES[activeCategory];
  const categoryIps = ips.filter((ip) => ip.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          <span>Categorización por Tipo de Problema que Resuelve</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl">
          Estructuración de las 87 IPs en 8 arquetipos de dolor empresarial. Permite a directores y decisores localizar la arquitectura exacta según la naturaleza de la fricción actual.
        </p>

        {/* Categories selector pills */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(PROBLEM_CATEGORIES).map(([key, cat]) => {
            const Icon = getCategoryIcon(cat.id);
            const count = ips.filter((i) => i.category === cat.id).length;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={key}
                onClick={() => setActiveCategory(cat.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {count} IPs
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Category Deep Dive */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Arquetipo de Dolor Operativo
          </span>
          <h2 className="text-lg font-bold text-slate-900 mt-0.5">
            {categoryData.name}
          </h2>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            {categoryData.shortDesc}
          </p>
        </div>

        {/* Diagnosis comparison block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="font-bold text-slate-700 block mb-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
              Problema que Resuelve:
            </span>
            <p className="text-slate-600 leading-relaxed">
              {categoryData.problemSolved}
            </p>
          </div>

          <div className="bg-rose-50/40 p-4 rounded-xl border border-rose-200/70">
            <span className="font-bold text-rose-800 block mb-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
              Dónde Falla el SOP Tradicional:
            </span>
            <p className="text-slate-600 leading-relaxed">
              {categoryData.traditionalFailure}
            </p>
          </div>

          <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-200/70">
            <span className="font-bold text-emerald-800 block mb-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Solución Sistémica de la Arquitectura:
            </span>
            <p className="text-slate-600 leading-relaxed">
              {categoryData.systemicSolution}
            </p>
          </div>
        </div>

        {/* List of IPs under this category */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              IPs Aisladas para este Problema ({categoryIps.length}):
            </h3>
            <span className="text-[11px] text-slate-400">
              Haz clic en cualquier IP para inspeccionar su ficha técnica
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categoryIps.map((ip) => (
              <div
                key={ip.id}
                onClick={() => onSelectIp(ip.id)}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-blue-50/40 hover:border-blue-400 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {ip.code}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      {ip.immediateApplicability}% aplicable
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {ip.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {ip.purpose}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate max-w-[200px]">{ip.industry}</span>
                  <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Ficha <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
