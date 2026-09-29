import React, { useState, useMemo } from 'react';
import { IpItem, ProblemCategory } from '../types';
import { 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  Plus, 
  X, 
  SlidersHorizontal, 
  Sparkles, 
  Layers, 
  ArrowUpRight,
  Info,
  Briefcase
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { PortfolioConsistencyChecker } from './PortfolioConsistencyChecker';
import { checkPortfolioConsistency } from '../data/consistencyCheckerData';

interface GobernanzaImpactScoreProps {
  ips: IpItem[];
  selectedIpIds: string[];
  onToggleIp: (id: string) => void;
  onClearPortfolio: () => void;
  onSelectIpForModal: (id: string) => void;
}

interface StrategicPreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  ipCodes: string[];
}

const STRATEGIC_PRESETS: StrategicPreset[] = [
  {
    id: 'preset-ultima-milla',
    name: 'Rescate de Operadores de Última Milla',
    badge: 'Descompresión de Campo',
    description: 'Elimina el burnt por tickets repetitivos, centraliza la preparación y reduce la rotación en los primeros 90 días.',
    ipCodes: ['IP-001', 'IP-002', 'IP-003', 'IP-020', 'IP-046', 'IP-068']
  },
  {
    id: 'preset-desacople-fundadores',
    name: 'Desacoplamiento Total de Fundadores & Héroes',
    badge: 'Escalabilidad sin Cuellos de Botella',
    description: 'Transfiere el criterio fundador a protocolos fractales con veto de raíz, liberando a C-Levels de apagar fuegos diarios.',
    ipCodes: ['IP-032', 'IP-041', 'IP-042', 'IP-043', 'IP-081', 'IP-082']
  },
  {
    id: 'preset-margen-breakpoints',
    name: 'Blindaje de Margen Bruto & Anti-Breakpoint',
    badge: 'Protección de Capital',
    description: 'Evita que el margen se diluya con el volumen; triangula el pricing en 50%+ y mapea costos ocultos de escala.',
    ipCodes: ['IP-034', 'IP-055', 'IP-067', 'IP-070', 'IP-073']
  },
  {
    id: 'preset-divergence-audit',
    name: 'Auditoría de Divergencia & Retiro del Estratega',
    badge: 'Alineación Estrategia vs Realidad',
    description: 'Sanciona la desconexión entre presentaciones de consultoría y la ejecución real, entregando artefactos de trinchera.',
    ipCodes: ['IP-080', 'IP-083', 'IP-084', 'IP-018', 'IP-059']
  },
  {
    id: 'preset-blindaje-fiduciario',
    name: 'Blindaje Fiduciario & Gobernanza de Patrimonio',
    badge: 'Zero Estate & Smart Contract',
    description: 'Aísla legalmente los activos operativos en patrimonios fiduciarios y parametriza el criterio sucesorio sin litigios.',
    ipCodes: ['IP-047', 'IP-048', 'IP-061', 'IP-078', 'IP-079']
  }
];

export const GobernanzaImpactScore: React.FC<GobernanzaImpactScoreProps> = ({
  ips,
  selectedIpIds,
  onToggleIp,
  onClearPortfolio,
  onSelectIpForModal
}) => {
  // Configurable organizational parameters for simulation
  const [teamSize, setTeamSize] = useState<number>(45); // Team nodes
  const [monthlyOpEx, setMonthlyOpEx] = useState<number>(75000); // USD / month
  const [copiedReport, setCopiedReport] = useState(false);
  const [addSearchTerm, setAddSearchTerm] = useState('');

  // Selected IPs items
  const selectedIps = useMemo(() => {
    return selectedIpIds
      .map((id) => ips.find((i) => i.id === id || i.code === id))
      .filter((i): i is IpItem => Boolean(i));
  }, [ips, selectedIpIds]);

  // Live Consistency and Conflict Report
  const consistencyReport = useMemo(() => {
    return checkPortfolioConsistency(selectedIpIds, ips);
  }, [selectedIpIds, ips]);

  // Synergy Combos detection
  const detectedSynergies = useMemo(() => {
    const codes = new Set(selectedIps.map((i) => i.code));
    const list: { name: string; bonus: number; description: string }[] = [];

    // Combo 1: Trípode de Poder (IP-041 + IP-042 + IP-043)
    if (codes.has('IP-041') && codes.has('IP-042') && codes.has('IP-043')) {
      list.push({
        name: 'Trípode de Poder y Criterio Activo',
        bonus: 8,
        description: 'Sinergia total en contrapesos, delegación sin pérdida de ADN y veto de raíz fundamental.'
      });
    }

    // Combo 2: Inversión de Dependencia y Veto (IP-081 + IP-082)
    if (codes.has('IP-081') && codes.has('IP-082')) {
      list.push({
        name: 'Desactivación de Dependencia Invertida',
        bonus: 6,
        description: 'Blindaje contra parásitos consultivos y autonomía forzosa del equipo operativo.'
      });
    }

    // Combo 3: Ensamble Ciego y Deconstrucción de Tickets (IP-046 + IP-068)
    if (codes.has('IP-046') && codes.has('IP-068')) {
      list.push({
        name: 'Cadena de Ensamble y Descompresión de Campo',
        bonus: 7,
        description: 'Sustitución de scripts rígidos por ensamble parametrizado; alivio directo al operador de última milla.'
      });
    }

    // Combo 4: Pricing Triangulado y Breakpoint Intelligence (IP-067 + IP-070)
    if (codes.has('IP-067') && codes.has('IP-070')) {
      list.push({
        name: 'Blindaje de Margen Bruto del 50%+',
        bonus: 8,
        description: 'Protección contra absorción lineal de costos y detección temprana del breakpoint de capital.'
      });
    }

    // Combo 5: Smart Contract of Criterion (IP-078 + IP-079)
    if (codes.has('IP-078') && codes.has('IP-079')) {
      list.push({
        name: 'Codificación Fractal de Gobernanza',
        bonus: 7,
        description: 'Transferencia de reglas de negocio inviolables; autonomía total de mandos medios.'
      });
    }

    return list;
  }, [selectedIps]);

  const totalSynergyBonus = detectedSynergies.reduce((sum, s) => sum + s.bonus, 0);

  // Mathematical Aggregation
  const calculations = useMemo(() => {
    const count = selectedIps.length;
    if (count === 0) {
      return {
        gisScore: 0,
        roiMultiplier: 1.0,
        throughputGain: 0,
        frictionReduction: 0,
        hoursSavedPerOperator: 0,
        annualCostAvoided: 0,
        categoryScores: [],
        radarData: [],
        projectionData: []
      };
    }

    // 1. GIS Score (0-100)
    // Base is weighted by average applicability, saturation curve for quantity, and synergy bonuses
    const avgApplicability = selectedIps.reduce((acc, i) => acc + i.immediateApplicability, 0) / count;
    const quantityFactor = 1 - Math.exp(-count / 3.8); // asymptotic curve reaching ~0.85 around 7 IPs
    const rawGis = (avgApplicability * 0.75 * quantityFactor) + totalSynergyBonus + 18;
    const gisScore = Math.min(98, Math.round(rawGis));

    // 2. Expected ROI Multiplier
    // Scales with GIS and presence of capital/economics IPs
    const hasEconomics = selectedIps.some((i) => i.category === 'capital_economics');
    const hasScalability = selectedIps.some((i) => i.category === 'escalabilidad_sin_heroes');
    const economicBoost = (hasEconomics ? 1.2 : 0) + (hasScalability ? 0.9 : 0);
    const roiMultiplier = parseFloat((2.0 + (gisScore / 100) * 3.5 + economicBoost).toFixed(1));

    // 3. Operational Throughput Gain (%)
    const throughputGain = Math.min(72, Math.round(15 + (gisScore * 0.52)));

    // 4. Friction Reduction in Last-Mile (%)
    const lastMileIps = selectedIps.filter((i) => 
      i.category === 'talento_cargas' || 
      i.category === 'metodologia_trinchera' ||
      i.code === 'IP-068' || i.code === 'IP-046'
    ).length;
    const frictionReduction = Math.min(82, Math.round(25 + (lastMileIps * 9.5) + (gisScore * 0.25)));

    // 5. Weekly Hours Saved per Operator
    const hoursSavedPerOperator = parseFloat((2.5 + (frictionReduction / 100) * 8.5).toFixed(1));

    // 6. Annual Capital & Breakpoint Cost Avoidance ($)
    // Calculated as a percentage of annual OpEx prevented from being burned in turnover, emergency hiring, and broken releases
    const annualOpEx = monthlyOpEx * 12;
    const avoidanceRate = 0.08 + (gisScore / 100) * 0.18; // 8% to 26% of OpEx saved
    const annualCostAvoided = Math.round(annualOpEx * avoidanceRate);

    // 7. Dimensional Radar Data
    const calcDimension = (categories: ProblemCategory[], specificCodes: string[] = []) => {
      const matchCount = selectedIps.filter((i) => categories.includes(i.category) || specificCodes.includes(i.code)).length;
      if (matchCount === 0) return 20;
      const baseVal = 40 + Math.min(55, matchCount * 18);
      return Math.min(100, Math.round(baseVal));
    };

    const radarData = [
      {
        subject: 'Autonomía Última Milla',
        score: calcDimension(['talento_cargas', 'metodologia_trinchera'], ['IP-068', 'IP-046']),
        fullMark: 100
      },
      {
        subject: 'Desacople de Héroes',
        score: calcDimension(['escalabilidad_sin_heroes', 'criterio_gobernanza_fractal'], ['IP-032', 'IP-081']),
        fullMark: 100
      },
      {
        subject: 'Margen y Pricing',
        score: calcDimension(['capital_economics', 'producto_oferta_modelos'], ['IP-067', 'IP-034']),
        fullMark: 100
      },
      {
        subject: 'Anti-Breakpoint',
        score: calcDimension(['riesgo_breakpoints'], ['IP-070', 'IP-073']),
        fullMark: 100
      },
      {
        subject: 'Custodia de Criterio',
        score: calcDimension(['criterio_gobernanza_fractal'], ['IP-041', 'IP-042', 'IP-043', 'IP-078']),
        fullMark: 100
      },
      {
        subject: 'Sincronía Estrategia',
        score: calcDimension(['divergencia_estrategia_realidad'], ['IP-080', 'IP-083']),
        fullMark: 100
      }
    ];

    // 8. 12-Month Projection Trajectory
    const projectionData = [
      { month: 'Mes 0', inercial: 0, gobernado: 0 },
      { month: 'Mes 2', inercial: Math.round(annualCostAvoided * 0.04), gobernado: Math.round(annualCostAvoided * 0.12) },
      { month: 'Mes 4', inercial: Math.round(annualCostAvoided * 0.11), gobernado: Math.round(annualCostAvoided * 0.28) },
      { month: 'Mes 6', inercial: Math.round(annualCostAvoided * 0.18), gobernado: Math.round(annualCostAvoided * 0.49) },
      { month: 'Mes 8', inercial: Math.round(annualCostAvoided * 0.28), gobernado: Math.round(annualCostAvoided * 0.71) },
      { month: 'Mes 10', inercial: Math.round(annualCostAvoided * 0.38), gobernado: Math.round(annualCostAvoided * 0.88) },
      { month: 'Mes 12', inercial: Math.round(annualCostAvoided * 0.48), gobernado: Math.round(annualCostAvoided * 1.05) }
    ];

    // 9. Category breakdown for Bar Chart
    const catMap: Record<string, { name: string; count: number }> = {};
    selectedIps.forEach((ip) => {
      if (!catMap[ip.category]) {
        catMap[ip.category] = { name: ip.categoryLabel.slice(0, 18), count: 0 };
      }
      catMap[ip.category].count += 1;
    });
    const categoryScores = Object.values(catMap);

    return {
      gisScore,
      roiMultiplier,
      throughputGain,
      frictionReduction,
      hoursSavedPerOperator,
      annualCostAvoided,
      radarData,
      projectionData,
      categoryScores
    };
  }, [selectedIps, totalSynergyBonus, monthlyOpEx]);

  // Load a preset bundle
  const handleApplyPreset = (preset: StrategicPreset) => {
    onClearPortfolio();
    preset.ipCodes.forEach((code) => {
      const match = ips.find((i) => i.code === code || i.id === code);
      if (match) onToggleIp(match.id);
    });
  };

  // Copy Executive Report
  const handleCopyReport = () => {
    const text = `# DICTAMEN EJECUTIVO: GOBERNANZA IMPACT SCORE (GIS)
Fecha de Evaluación: ${new Date().toISOString().split('T')[0]}
Nodos Operativos Evaluados: ${teamSize} colaboradores
Presupuesto Operativo Mensual: $${monthlyOpEx.toLocaleString()} USD

## RESULTADOS DE IMPACTO ARQUITECTÓNICO
- Gobernanza Impact Score (GIS): ${calculations.gisScore} / 100
- Multiplicador de ROI Operativo Esperado: ${calculations.roiMultiplier}x
- Ganancia Neta de Capacidad (Throughput): +${calculations.throughputGain}%
- Reducción de Fricción y Burnout en Última Milla: -${calculations.frictionReduction}%
- Horas Semanales Recuperadas por Operador: ${calculations.hoursSavedPerOperator} hrs/semana
- Capital Anual Protegido contra Breakpoints: $${calculations.annualCostAvoided.toLocaleString()} USD

## INTERVENCIONES ACTIVAS (${selectedIps.length} IPs)
${selectedIps.map((i) => `- [${i.code}] ${i.name} (${i.immediateApplicability}% aplicable) - ${i.purpose}`).join('\n')}

## SINERGIAS ARQUITECTÓNICAS ACTIVADAS
${detectedSynergies.length > 0 
  ? detectedSynergies.map((s) => `- ${s.name} (+${s.bonus} pts GIS): ${s.description}`).join('\n')
  : '- Ninguna sinergia combinada activa. Sugerencia: combinar trípodes o cadenas de ensamble.'}
`;
    navigator.clipboard.writeText(text);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2200);
  };

  // Available IPs to add
  const availableToAdd = useMemo(() => {
    const selectedSet = new Set(selectedIpIds);
    return ips
      .filter((i) => !selectedSet.has(i.id) && !selectedSet.has(i.code))
      .filter((i) => 
        addSearchTerm === '' ||
        i.code.toLowerCase().includes(addSearchTerm.toLowerCase()) ||
        i.name.toLowerCase().includes(addSearchTerm.toLowerCase()) ||
        i.purpose.toLowerCase().includes(addSearchTerm.toLowerCase())
      )
      .slice(0, 12);
  }, [ips, selectedIpIds, addSearchTerm]);

  return (
    <div className="space-y-6">
      {/* Top Briefing Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Gobernanza Impact Score (GIS) &amp; Agregador de ROI
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Herramienta cuantitativa para directores C-Level, Fractional COOs y asignadores de capital. Calcula de forma agregada el ROI esperado, las horas de fricción eliminadas en última milla y el capital protegido contra quiebres de escala según el portafolio de IPs seleccionado.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {consistencyReport.conflicts.length > 0 ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-mono font-bold animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>{consistencyReport.conflicts.length} Conflicto(s) de Recursos</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Coherencia 100%</span>
              </span>
            )}

            <button
              onClick={handleCopyReport}
              disabled={selectedIps.length === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-xs"
              title="Copiar dictamen ejecutivo para junta directiva"
            >
              {copiedReport ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Dictamen Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-300" />
                  <span>Copiar Dictamen Board</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preset strategic bundles */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Portafolios Estratégicos Pre-ensamblados (Haz clic para cargar):
            </span>
            <span className="text-[11px] text-slate-400">
              {selectedIps.length} de {ips.length} IPs activas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {STRATEGIC_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-300 transition-all text-left flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-tight block">
                    {preset.badge}
                  </span>
                  <span className="font-bold text-slate-900 text-xs mt-0.5 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {preset.name}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-snug font-normal">
                    {preset.description}
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono text-slate-600">
                  <span>{preset.ipCodes.length} IPs</span>
                  <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                    Cargar &rarr;
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Simulation Sliders */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/80 p-3.5 rounded-xl text-xs">
          <div>
            <div className="flex items-center justify-between font-medium text-slate-700 mb-1">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                Nodos / Tamaño del Equipo Operativo:
              </span>
              <span className="font-mono font-bold text-slate-900 text-sm">{teamSize} colaboradores</span>
            </div>
            <input
              type="range"
              min={5}
              max={300}
              step={5}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>5 (Seed / Boutique)</span>
              <span>100 (Scale-Up)</span>
              <span>300 (Empresa Madura)</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between font-medium text-slate-700 mb-1">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                Gasto Operativo Mensual (OpEx):
              </span>
              <span className="font-mono font-bold text-slate-900 text-sm">
                ${monthlyOpEx.toLocaleString()} USD/mes
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={350000}
              step={5000}
              value={monthlyOpEx}
              onChange={(e) => setMonthlyOpEx(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>$10k/m</span>
              <span>$150k/m</span>
              <span>$350k/m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Aggregated Impact Scorecard (Hero KPIs) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Metric 1: GIS Score */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Score GIS</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
              {calculations.gisScore}
              <span className="text-xs font-normal text-slate-400">/100</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 leading-tight">
            {calculations.gisScore >= 80 ? (
              <span className="text-emerald-700 font-semibold">Blindaje Soberano</span>
            ) : calculations.gisScore >= 50 ? (
              <span className="text-blue-700 font-semibold">Resiliencia Media</span>
            ) : (
              <span className="text-amber-700 font-semibold">Vulnerabilidad Alta</span>
            )}
          </div>
        </div>

        {/* Metric 2: Expected ROI */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">ROI Operativo</span>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-extrabold text-blue-600 tracking-tight font-mono">
              {calculations.roiMultiplier}x
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 leading-tight">
            Retorno sobre inversión de implementación
          </div>
        </div>

        {/* Metric 3: Throughput Gain */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Throughput</span>
              <Zap className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
              +{calculations.throughputGain}%
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 leading-tight">
            Capacidad adicional sin inflar nómina
          </div>
        </div>

        {/* Metric 4: Friction Reduction */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Alivio Trinchera</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-700 tracking-tight font-mono">
              -{calculations.frictionReduction}%
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 leading-tight">
            Reducción de tickets basura y burnt
          </div>
        </div>

        {/* Metric 5: Hours Saved */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tiempo / Nodo</span>
              <Clock className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-extrabold text-indigo-700 tracking-tight font-mono">
              {calculations.hoursSavedPerOperator}h
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 leading-tight">
            Horas semanales recuperadas por operador
          </div>
        </div>

        {/* Metric 6: Annual Capital Shield */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Capital Blindado</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
              ${(calculations.annualCostAvoided / 1000).toFixed(0)}k
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 leading-tight">
            USD/año prevenidos en quiebres de escala
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid: Radar of Dimensions & Trajectory Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart: 6 Architectural Dimensions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Hexágono de Resiliencia y Gobernanza</span>
                <span className="text-[11px] font-normal text-slate-500">(0 a 100 por dimensión)</span>
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Equilibrio sistémico entre descompresión de campo, autonomía de decisiones y blindaje de margen.
            </p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            {calculations.radarData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={calculations.radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#475569', fontSize: 10, fontWeight: 600 }} 
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                  <Radar
                    name="Nivel de Gobernanza"
                    dataKey="score"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    fillOpacity={0.45}
                  />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-xs text-slate-400">Selecciona al menos 1 IP para calcular el radar</div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-[10px]">
            {calculations.radarData.slice(0, 3).map((r, i) => (
              <div key={i} className="bg-slate-50 p-1.5 rounded-lg">
                <span className="text-slate-500 block">{r.subject}</span>
                <span className="font-bold text-slate-800 text-xs font-mono">{r.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trajectory Area Chart: Projected Capital Return & Risk Curve */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Proyección a 12 Meses: Valor Acumulado ($ USD)</span>
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                Ahorro e Incremento Neto
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Contraste de costo evitado acumulado en 12 meses frente a una trayectoria inercial con quiebres.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={calculations.projectionData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGobernado" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInercial" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis 
                  tick={{ fill: '#64748b', fontSize: 10 }} 
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} 
                />
                <Tooltip 
                  formatter={(val: number) => [`$${val.toLocaleString()} USD`, '']} 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="gobernado" 
                  name="Con IPs Implementadas" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorGobernado)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="inercial" 
                  name="Trayectoria Inercial" 
                  stroke="#94a3b8" 
                  fillOpacity={1} 
                  fill="url(#colorInercial)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Impacto Protegido Acumulado
            </span>
            <span className="font-mono font-bold text-slate-900">
              Total proyectado año 1: ${calculations.annualCostAvoided.toLocaleString()} USD
            </span>
          </div>
        </div>
      </div>

      {/* Synergies Active Section */}
      {detectedSynergies.length > 0 && (
        <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-sm">
                Sinergias Arquitectónicas Activadas ({detectedSynergies.length})
              </h3>
            </div>
            <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-amber-200/70 text-amber-900">
              +{totalSynergyBonus} Puntos de Bonus al Score GIS
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {detectedSynergies.map((syn, idx) => (
              <div key={idx} className="bg-white/90 border border-amber-200/60 rounded-xl p-3 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                  <span>{syn.name}</span>
                  <span className="text-amber-700 font-mono">+{syn.bonus} pts</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {syn.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Portfolio Functional Consistency & Resource Contention Checker Widget */}
      <PortfolioConsistencyChecker
        portfolioIpIds={selectedIpIds}
        allIps={ips}
        onToggleIp={onToggleIp}
        onSelectIpForModal={onSelectIpForModal}
      />

      {/* Active Portfolio Tray (Selected IPs) & Management */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Portafolio Activo de Intervención ({selectedIps.length} IPs Seleccionadas)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Haz clic en cualquier IP para inspeccionar su ficha forense o pulsa el botón &times; para removerla del cálculo.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearPortfolio}
              className="text-xs text-slate-500 hover:text-rose-600 font-medium transition-colors px-2 py-1 rounded hover:bg-rose-50"
            >
              Vaciar Portafolio
            </button>
          </div>
        </div>

        {/* Selected IPs Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {selectedIps.map((ip) => (
            <div
              key={ip.id}
              className="p-3 rounded-xl border border-blue-200 bg-blue-50/40 hover:border-blue-400 transition-all flex items-start justify-between gap-2 text-xs group"
            >
              <div 
                className="cursor-pointer flex-1"
                onClick={() => onSelectIpForModal(ip.id)}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white">
                    {ip.code}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">
                    {ip.immediateApplicability}%
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-1 line-clamp-1">
                  {ip.name}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {ip.purpose}
                </p>
              </div>
              <button
                onClick={() => onToggleIp(ip.id)}
                className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-white transition-colors shrink-0"
                title="Remover IP del portafolio"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {selectedIps.length === 0 && (
            <div className="col-span-full py-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-xl text-xs text-slate-500">
              <Info className="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <p className="font-medium text-slate-700">No hay IPs en el portafolio de intervención actualmente.</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Selecciona uno de los presets pre-ensamblados arriba o busca abajo para agregar IPs del catálogo.
              </p>
            </div>
          )}
        </div>

        {/* Quick Add Search Drawer */}
        <div className="pt-3 border-t border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Agregar Más IPs al Portafolio ({availableToAdd.length} sugerencias disponibles):
          </span>
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Buscar por código (ej. IP-070), nombre o concepto para sumar al cálculo..."
              value={addSearchTerm}
              onChange={(e) => setAddSearchTerm(e.target.value)}
              className="w-full pl-3 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {availableToAdd.map((ip) => (
              <button
                key={ip.id}
                onClick={() => onToggleIp(ip.id)}
                className="p-2.5 rounded-lg border border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/30 text-left transition-all text-xs flex items-center justify-between group"
              >
                <div className="truncate pr-2">
                  <span className="font-mono font-bold text-slate-900 group-hover:text-emerald-700 text-[11px]">
                    {ip.code}
                  </span>
                  <p className="text-slate-600 truncate text-[11px]">{ip.name}</p>
                </div>
                <div className="w-5 h-5 rounded-md bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center text-slate-600 shrink-0 transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
