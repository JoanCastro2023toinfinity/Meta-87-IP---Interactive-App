import React, { useState, useMemo } from 'react';
import { IpItem, ProblemCategory, IpType } from '../types';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Layers, 
  AlertTriangle, 
  ArrowRight, 
  Building2, 
  SlidersHorizontal,
  FileSpreadsheet
} from 'lucide-react';
import { PROBLEM_CATEGORIES } from '../data/categoriesData';

interface IpCatalogViewProps {
  ips: IpItem[];
  onSelectIp: (id: string) => void;
  portfolioIpIds?: string[];
  onTogglePortfolioIp?: (id: string) => void;
}

export const IpCatalogView: React.FC<IpCatalogViewProps> = ({ 
  ips, 
  onSelectIp,
  portfolioIpIds = [],
  onTogglePortfolioIp
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [minApplicability, setMinApplicability] = useState<number>(80);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredIps = useMemo(() => {
    return ips.filter((ip) => {
      const matchSearch =
        searchTerm === '' ||
        ip.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ip.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ip.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ip.alternateNames && ip.alternateNames.some((alt) => alt.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchCategory =
        selectedCategory === 'all' || ip.category === selectedCategory;

      const matchType =
        selectedType === 'all' || ip.type === selectedType;

      const matchApplicability =
        ip.immediateApplicability >= minApplicability;

      return matchSearch && matchCategory && matchType && matchApplicability;
    });
  }, [ips, searchTerm, selectedCategory, selectedType, minApplicability]);

  const uniqueTypes = useMemo(() => {
    const typesSet = new Set<IpType>();
    ips.forEach((i) => typesSet.add(i.type));
    return Array.from(typesSet);
  }, [ips]);

  return (
    <div className="space-y-6">
      {/* Executive Briefing Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Inventario Forense de Propiedad Intelectual</span>
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {filteredIps.length} de {ips.length} IPs
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl">
              Aislamiento individual de las IPs con &ge;80% de aplicabilidad inmediata en gestión de equipos, asignación de capital y mitigación de fricciones operativas.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Modo de vista:</span>
            <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Tarjetas
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Tabla
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por código, nombre o industria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            >
              <option value="all">Todas las Categorías de Problema ({ips.length})</option>
              {Object.entries(PROBLEM_CATEGORIES).map(([key, cat]) => (
                <option key={key} value={key}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            >
              <option value="all">Todos los Tipos de IP</option>
              {uniqueTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Applicability Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
            <span className="text-slate-500 whitespace-nowrap">Aplicabilidad:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinApplicability(80)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  minApplicability === 80
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                &ge;80%
              </button>
              <button
                onClick={() => setMinApplicability(90)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  minApplicability === 90
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                &ge;90%
              </button>
              <button
                onClick={() => setMinApplicability(100)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  minApplicability === 100
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                100%
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIps.map((ip) => (
            <div
              key={ip.id}
              onClick={() => onSelectIp(ip.id)}
              className="group bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all p-4 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                    {ip.code}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      {ip.type}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {ip.immediateApplicability}%
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {ip.name}
                </h3>
                <span className="text-[11px] text-slate-400 block mt-0.5 mb-2 font-medium">
                  {ip.categoryLabel}
                </span>

                {/* Purpose */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                  {ip.purpose}
                </p>

                {/* Inputs & Outputs Tags */}
                <div className="space-y-1.5 py-2 border-t border-slate-100 text-[11px]">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Inputs clave:</span>
                    <span className="font-mono font-medium text-slate-700">{ip.inputs.length} variables</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Outputs tangibles:</span>
                    <span className="font-mono font-medium text-slate-700">{ip.outputs.length} entregables</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Industry tag & CTA */}
              <div className="pt-3 border-t border-slate-100 mt-2 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 truncate max-w-[150px] flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{ip.industry}</span>
                </span>
                
                <div className="flex items-center gap-1.5 shrink-0">
                  {onTogglePortfolioIp && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTogglePortfolioIp(ip.id);
                      }}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded transition-colors ${
                        portfolioIpIds?.includes(ip.id) || portfolioIpIds?.includes(ip.code)
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700'
                      }`}
                      title={portfolioIpIds?.includes(ip.id) || portfolioIpIds?.includes(ip.code) ? 'Remover del portafolio GIS' : 'Sumar al portafolio GIS'}
                    >
                      {portfolioIpIds?.includes(ip.id) || portfolioIpIds?.includes(ip.code)
                        ? '✓ En GIS'
                        : '+ GIS'}
                    </button>
                  )}
                  <span className="text-blue-600 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 shrink-0">
                    Ficha
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3">Código</th>
                  <th className="px-4 py-3">Nombre de la IP</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Aplicabilidad</th>
                  <th className="px-4 py-3">Categoría de Problema</th>
                  <th className="px-4 py-3">Industria Principal</th>
                  <th className="px-4 py-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredIps.map((ip) => (
                  <tr 
                    key={ip.id}
                    onClick={() => onSelectIp(ip.id)}
                    className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">
                      {ip.code}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900 max-w-xs truncate">
                      {ip.name}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[11px]">
                        {ip.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-emerald-700">
                        {ip.immediateApplicability}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 max-w-[180px] truncate">
                      {ip.categoryLabel}
                    </td>
                    <td className="px-4 py-3 text-slate-500 max-w-[160px] truncate">
                      {ip.industry}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-blue-600 font-medium hover:underline">
                        Ver Ficha
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredIps.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-sm text-slate-500">No se encontraron IPs con los filtros seleccionados.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedType('all');
              setMinApplicability(80);
            }}
            className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
};
