import React from 'react';
import { 
  Clock, 
  Sparkles, 
  Brain, 
  ShieldCheck, 
  ArrowUpRight, 
  TrendingUp,
  Info,
  Flame
} from 'lucide-react';
import { IpItem } from '../types';

interface TimeToMasteryFooterWidgetProps {
  portfolioIps: IpItem[];
  totalIpsCount: number;
  onOpenManifesto: (tab?: 'nature' | 'compression' | 'autonomy' | 'calculator') => void;
  onNavigateToPortfolio?: () => void;
  onNavigateToRiskHeatmap?: () => void;
}

export const TimeToMasteryFooterWidget: React.FC<TimeToMasteryFooterWidgetProps> = ({
  portfolioIps,
  totalIpsCount,
  onOpenManifesto,
  onNavigateToPortfolio,
  onNavigateToRiskHeatmap,
}) => {
  const count = portfolioIps.length;
  const hoursSaved = count * 180;
  const monthsCompressed = (hoursSaved / 160).toFixed(1);

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-xs mt-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Upper tier: Live Time-To-Mastery C-Level Calculation Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-900/40 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          {/* Left: Indicator title and context */}
          <div className="flex items-center gap-3.5 w-full md:w-auto">
            <div className="w-10 h-10 rounded-xl bg-indigo-900/60 border border-indigo-700/50 flex items-center justify-center shrink-0 shadow-inner">
              <Clock className="w-5 h-5 text-indigo-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200 text-sm">
                  Compresión de Curva C-Level &amp; Time-to-Mastery
                </span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 text-[10px] font-mono font-bold">
                  {count} IPs en Portafolio Activo
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Estimación de ensayo-error evitado, reuniones estériles y post-mortems no programados por IP adoptada.
              </p>
            </div>
          </div>

          {/* Center/Right: Live Metric & Manifesto CTA */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
            {count > 0 ? (
              <div 
                onClick={() => onOpenManifesto('calculator')}
                className="cursor-pointer group flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-indigo-950/80 border border-indigo-700/60 hover:border-indigo-500 transition-all text-xs"
                title="Haz clic para ver el desglose matemático"
              >
                <div className="text-right">
                  <div className="font-mono font-bold text-amber-300 text-sm flex items-center gap-1">
                    ~{hoursSaved.toLocaleString()} hrs ahorradas
                    <ArrowUpRight className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div className="text-[10px] text-indigo-200">
                    &approx; {monthsCompressed} meses de aceleración a maestría
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] text-slate-400">
                0 IPs seleccionadas • Elige IPs para calcular aceleración directiva
              </div>
            )}

            {/* Direct button to Manifesto: ¿Qué es realmente esta IP? */}
            <button
              onClick={() => onOpenManifesto('nature')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-200 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/40 hover:border-amber-400 rounded-lg transition-all shadow-xs shrink-0"
              title="Abre el manifiesto de subsidio cognitivo y compresión civilizatoria"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>¿Qué es realmente esta IP?</span>
            </button>
          </div>
        </div>

        {/* Lower tier: Baseline Atlas Meta & Architectural Guarantee */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800/70 text-[11px]">
          <div className="flex flex-wrap items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium text-slate-200">
              Atlas de Soberanía Operativa e IP Sistémica
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span>{totalIpsCount} IPs catalogadas y cruzadas con &ge;80% de aplicabilidad inmediata</span>
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            {onNavigateToRiskHeatmap && (
              <button
                onClick={onNavigateToRiskHeatmap}
                className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors"
                title="Explora el Mapa de Calor de Riesgos Sistémicos y el Definidor de Roles"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Mapa de Calor &amp; Roles</span>
              </button>
            )}
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1 text-slate-400">
              <Brain className="w-3.5 h-3.5 text-indigo-400" />
              Subsidio Cognitivo para Operating Partners &amp; Fractional COOs
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
