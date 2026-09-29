import { IpItem, ProblemCategory } from '../types';
import { IPS_PART_1 } from './ipsDataPart1';
import { IPS_PART_2 } from './ipsDataPart2';
import { IPS_PART_3 } from './ipsDataPart3';

export const ALL_IPS: IpItem[] = [...IPS_PART_1, ...IPS_PART_2, ...IPS_PART_3];

export const getIpById = (id: string): IpItem | undefined => {
  return ALL_IPS.find((ip) => ip.id === id || ip.code === id);
};

export const getIpsByCategory = (category: ProblemCategory): IpItem[] => {
  return ALL_IPS.filter((ip) => ip.category === category);
};

export const getIpsByApplicability = (minThreshold: number = 80): IpItem[] => {
  return ALL_IPS.filter((ip) => ip.immediateApplicability >= minThreshold);
};

export const getAvailableIndustries = (): string[] => {
  const industriesSet = new Set<string>();
  ALL_IPS.forEach((ip) => {
    if (ip.industry) {
      ip.industry.split(',').forEach((ind) => {
        const trimmed = ind.trim();
        if (trimmed) industriesSet.add(trimmed);
      });
    }
  });
  return Array.from(industriesSet).sort();
};

export const getIpStats = () => {
  const total = ALL_IPS.length;
  const applicable80Plus = ALL_IPS.filter((i) => i.immediateApplicability >= 80).length;
  const applicable90Plus = ALL_IPS.filter((i) => i.immediateApplicability >= 90).length;
  const applicable100 = ALL_IPS.filter((i) => i.immediateApplicability === 100).length;
  
  const categoryCounts = ALL_IPS.reduce<Record<string, number>>((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  return {
    total,
    applicable80Plus,
    applicable90Plus,
    applicable100,
    categoryCounts
  };
};
