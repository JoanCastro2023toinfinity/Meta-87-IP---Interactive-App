import React from 'react';
import { IpItem } from '../types';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ShieldAlert, 
  Building2, 
  Cpu, 
  Scale,
  Clock
} from 'lucide-react';

interface IpDetailModalProps {
  ip: IpItem | null;
  onClose: () => void;
  onSelectIp: (id: string) => void;
  isPortfolioSelected?: boolean;
  onTogglePortfolio?: (id: string) => void;
}

export const IpDetailModal: React.FC<IpDetailModalProps> = ({ 
  ip, 
  onClose, 
  onSelectIp,
  isPortfolioSelected = false,
  onTogglePortfolio
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!ip) return null;

  const handleCopyMarkdown = () => {
    const md = `### ${ip.code}: ${ip.name}
**Tipo:** ${ip.type} | **Aplicabilidad Inmediata:** ${ip.immediateApplicability}%
**Categoría:** ${ip.categoryLabel}
**Para qué se usa:** ${ip.purpose}

#### Datos de Input:
${ip.inputs.map((inp) => `- ${inp}`).join('\n')}

#### Datos de Output:
${ip.outputs.map((out) => `- ${out}`).join('\n')}

#### Rangos de Uso y Umbrales:
${ip.usageRanges}

#### Condiciones Críticas y Breakpoints:
${ip.criticalConditions.map((c) => `- ${c}`).join('\n')}

#### Caso de Uso en Industria:
${ip.industryUseCase}

#### Brecha en SOPs Tradicionales:
${ip.industrySopBreach}

#### Actores Clave:
${ip.primaryActors}

#### Impacto en Recursos y Mercado:
${ip.resourceImpact}
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
          <div className="space-y-1 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-900 text-white">
                {ip.code}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                {ip.type}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {ip.immediateApplicability}% Aplicabilidad Inmediata
              </span>
              <span 
                className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1 font-mono"
                title="Subsidio Cognitivo: Estimación de horas directas de ensayo-error y reuniones evitadas al adoptar esta primitiva"
              >
                <Clock className="w-3 h-3 text-amber-600" />
                ~180h Tanteo Evitado
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-700">
                {ip.categoryLabel}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
              {ip.name}
            </h2>
            {ip.alternateNames && ip.alternateNames.length > 0 && (
              <p className="text-xs text-slate-500 font-normal">
                <span className="font-medium text-slate-600">Aliases / Nombres alternativos:</span> {ip.alternateNames.join(' • ')}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onTogglePortfolio && (
              <button
                onClick={() => onTogglePortfolio(ip.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shadow-xs ${
                  isPortfolioSelected
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300'
                    : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                }`}
                title={isPortfolioSelected ? 'Remover del cálculo de ROI' : 'Agregar al cálculo de Gobernanza Impact Score'}
              >
                {isPortfolioSelected ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>En Portafolio GIS</span>
                  </>
                ) : (
                  <>
                    <span>+ Sumar a GIS</span>
                  </>
                )}
              </button>
            )}
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors shadow-xs"
              title="Copiar ficha técnica en Markdown"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copiar Ficha</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 overflow-y-auto space-y-6 text-sm text-slate-700 divide-y divide-slate-100">
          {/* Purpose */}
          <div className="pt-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              ¿Para qué se usa? (Propósito & Transformación)
            </h3>
            <p className="text-base text-slate-800 leading-relaxed font-normal bg-blue-50/50 border border-blue-100/60 p-3.5 rounded-xl">
              {ip.purpose}
            </p>
            {ip.formulaOrRule && (
              <div className="mt-3 p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs flex items-start gap-2">
                <span className="text-amber-400 font-bold">REGLA:</span>
                <span>{ip.formulaOrRule}</span>
              </div>
            )}
          </div>

          {/* Inputs & Outputs Grid */}
          <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5 flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                Datos de Input
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {ip.inputs.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-emerald-50/40 border border-emerald-200/60 rounded-xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Datos de Output
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {ip.outputs.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Usage Ranges & Critical Conditions */}
          <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-600" />
                Rangos de Uso & Umbrales
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                {ip.usageRanges}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Condiciones Críticas & Breakpoints (Fallo)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 bg-amber-50/50 p-3 rounded-lg border border-amber-200/60">
                {ip.criticalConditions.map((cond, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">!</span>
                    <span>{cond}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Real World Industry Case vs SOP Breach */}
          <div className="pt-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                Caso de Ejemplo en Industria vs. Brecha en SOP Tradicional
              </h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                {ip.industry}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-indigo-50/40 border border-indigo-200/60 p-3.5 rounded-xl">
                <span className="font-bold text-indigo-900 block mb-1">Caso de Uso Real:</span>
                <p className="text-slate-700 leading-relaxed">{ip.industryUseCase}</p>
              </div>
              <div className="bg-rose-50/40 border border-rose-200/60 p-3.5 rounded-xl">
                <span className="font-bold text-rose-900 block mb-1">Brecha que tienen los SOPs tradicionales:</span>
                <p className="text-slate-700 leading-relaxed">{ip.industrySopBreach}</p>
              </div>
            </div>
          </div>

          {/* Decision-Maker Meta: Actors & Resource Impact */}
          <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-bold text-slate-600 block mb-1">Actores / Decisores Primarios:</span>
              <p className="text-slate-800 font-medium">{ip.primaryActors}</p>
            </div>
            <div>
              <span className="font-bold text-slate-600 block mb-1">Impacto en Capital, Recursos y Mercado:</span>
              <p className="text-slate-800 font-medium">{ip.resourceImpact}</p>
            </div>
          </div>

          {/* Cross Functional Connections */}
          {ip.crossLinks && ip.crossLinks.length > 0 && (
            <div className="pt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-slate-600" />
                Cruce Funcional e Interconexión con otras IPs:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ip.crossLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectIp(link.targetId)}
                    className="flex items-start justify-between p-2.5 rounded-lg border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/30 text-left transition-all text-xs group"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-slate-900 group-hover:text-blue-600">
                          {link.targetId}
                        </span>
                        <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {link.relation}
                        </span>
                      </div>
                      <p className="text-slate-500 mt-1 text-[11px] leading-snug">
                        {link.description}
                      </p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono text-[11px]">
            Atlas de Soberanía e IP Sistémica • Aplicable &gt;= 80%
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors shadow-xs"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};
