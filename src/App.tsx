import React, { useState, useMemo } from 'react';
import { ALL_IPS, getIpById } from './data/ipsData';
import { IpItem } from './types';
import { INDUSTRY_SOP_MAP_DATA } from './data/industrySopMapData';
import { Navbar, ActiveTab } from './components/Navbar';
import { IpCatalogView } from './components/IpCatalogView';
import { CrossMatrixView } from './components/CrossMatrixView';
import { ProblemCategoryView } from './components/ProblemCategoryView';
import { IndustrySopMapView } from './components/IndustrySopMapView';
import { ExecutiveDecisionHelper } from './components/ExecutiveDecisionHelper';
import { GobernanzaImpactScore } from './components/GobernanzaImpactScore';
import { LlmGovernanceSupport } from './components/LlmGovernanceSupport';
import { IpDetailModal } from './components/IpDetailModal';
import { TimeToMasteryFooterWidget } from './components/TimeToMasteryFooterWidget';
import { CognitiveSubsidyModal } from './components/CognitiveSubsidyModal';
import { SystemicRiskAndRolesView } from './components/SystemicRiskAndRolesView';
import { SopGapMismatch } from './data/sopGapMismatches';
import { ShieldCheck, Database, Layers, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('catalog');
  const [selectedIpId, setSelectedIpId] = useState<string | null>(null);
  const [preloadedGap, setPreloadedGap] = useState<SopGapMismatch | null>(null);
  
  // Active intervention portfolio for Gobernanza Impact Score
  // Pre-seeded with a foundational high-impact bundle
  const [portfolioIpIds, setPortfolioIpIds] = useState<string[]>([
    'IP-032',
    'IP-041',
    'IP-042',
    'IP-043',
    'IP-068',
    'IP-081'
  ]);

  // Cognitive Subsidy Manifesto Modal State
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [manifestoTab, setManifestoTab] = useState<'nature' | 'compression' | 'autonomy' | 'calculator'>('nature');

  const handleOpenManifesto = (tab: 'nature' | 'compression' | 'autonomy' | 'calculator' = 'nature') => {
    setManifestoTab(tab);
    setIsManifestoOpen(true);
  };

  const handleCloseManifesto = () => {
    setIsManifestoOpen(false);
  };

  // Full IpItem objects in active portfolio
  const activePortfolioIps = useMemo(() => {
    return portfolioIpIds
      .map((id) => ALL_IPS.find((ip) => ip.id === id || ip.code === id))
      .filter((ip): ip is IpItem => ip !== undefined);
  }, [portfolioIpIds]);

  const selectedIp = selectedIpId ? getIpById(selectedIpId) || null : null;

  const handleSelectIp = (id: string) => {
    setSelectedIpId(id);
  };

  const handleCloseModal = () => {
    setSelectedIpId(null);
  };

  const handleNavigateToLlmRemediation = (gap: SopGapMismatch) => {
    setPreloadedGap(gap);
    setActiveTab('llm_support');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearPreloadedGap = () => {
    setPreloadedGap(null);
  };

  const handleTogglePortfolioIp = (idOrCode: string) => {
    setPortfolioIpIds((prev) => {
      // Find matching item in ALL_IPS to get canonical ID
      const item = ALL_IPS.find((i) => i.id === idOrCode || i.code === idOrCode);
      const targetId = item ? item.id : idOrCode;
      
      const exists = prev.includes(targetId) || (item && prev.includes(item.code));
      if (exists) {
        return prev.filter((x) => x !== targetId && (item ? x !== item.code : true));
      } else {
        return [...prev, targetId];
      }
    });
  };

  const handleClearPortfolio = () => {
    setPortfolioIpIds([]);
  };

  const handleExportData = () => {
    const exportPayload = {
      meta: {
        title: 'Atlas de IPs y Gobernanza Sistémica',
        extractedCount: ALL_IPS.length,
        exportDate: new Date().toISOString(),
        authorities: 'Forensic Systemic Architecture',
        note: 'Dossier integral de IPs con >=80% de aplicabilidad inmediata y cruce vs brechas de SOPs.'
      },
      ips: ALL_IPS,
      industrySopMap: INDUSTRY_SOP_MAP_DATA
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `atlas-ips-gobernanza-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalIps={ALL_IPS.length}
        selectedPortfolioCount={portfolioIpIds.length}
        onExportData={handleExportData}
        onOpenManifesto={handleOpenManifesto}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'catalog' && (
          <IpCatalogView 
            ips={ALL_IPS} 
            onSelectIp={handleSelectIp}
            portfolioIpIds={portfolioIpIds}
            onTogglePortfolioIp={handleTogglePortfolioIp}
          />
        )}

        {activeTab === 'cross' && (
          <CrossMatrixView ips={ALL_IPS} onSelectIp={handleSelectIp} />
        )}

        {activeTab === 'categories' && (
          <ProblemCategoryView ips={ALL_IPS} onSelectIp={handleSelectIp} />
        )}

        {activeTab === 'industry_map' && (
          <IndustrySopMapView 
            ips={ALL_IPS} 
            onSelectIp={handleSelectIp}
            onNavigateToLlmRemediation={handleNavigateToLlmRemediation}
          />
        )}

        {activeTab === 'simulator' && (
          <ExecutiveDecisionHelper ips={ALL_IPS} onSelectIp={handleSelectIp} />
        )}

        {activeTab === 'impact' && (
          <GobernanzaImpactScore
            ips={ALL_IPS}
            selectedIpIds={portfolioIpIds}
            onToggleIp={handleTogglePortfolioIp}
            onClearPortfolio={handleClearPortfolio}
            onSelectIpForModal={handleSelectIp}
          />
        )}

        {activeTab === 'llm_support' && (
          <LlmGovernanceSupport
            ips={ALL_IPS}
            onSelectIpForModal={handleSelectIp}
            onAddIpToPortfolio={handleTogglePortfolioIp}
            portfolioIpIds={portfolioIpIds}
            preloadedGap={preloadedGap}
            onClearPreloadedGap={handleClearPreloadedGap}
          />
        )}

        {activeTab === 'risk_heatmap' && (
          <SystemicRiskAndRolesView
            ips={ALL_IPS}
            onSelectIp={handleSelectIp}
            onAddIpToPortfolio={handleTogglePortfolioIp}
            portfolioIpIds={portfolioIpIds}
            onNavigateToLlmRemediation={() => setActiveTab('llm_support')}
          />
        )}
      </main>

      {/* Forensic Detail Drawer / Modal */}
      {selectedIp && (
        <IpDetailModal
          ip={selectedIp}
          onClose={handleCloseModal}
          onSelectIp={handleSelectIp}
          isPortfolioSelected={portfolioIpIds.includes(selectedIp.id) || portfolioIpIds.includes(selectedIp.code)}
          onTogglePortfolio={handleTogglePortfolioIp}
        />
      )}

      {/* Time-To-Mastery Footer Indicator & Live Cognitive Subsidy Link */}
      <TimeToMasteryFooterWidget
        portfolioIps={activePortfolioIps}
        totalIpsCount={ALL_IPS.length}
        onOpenManifesto={handleOpenManifesto}
        onNavigateToPortfolio={() => setActiveTab('impact')}
        onNavigateToRiskHeatmap={() => setActiveTab('risk_heatmap')}
      />

      {/* Cognitive Subsidy & IP Nature Manifesto Modal */}
      <CognitiveSubsidyModal
        isOpen={isManifestoOpen}
        onClose={handleCloseManifesto}
        activePortfolioIps={activePortfolioIps}
        allIpsCount={ALL_IPS.length}
        initialTab={manifestoTab}
        onNavigateToTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}
