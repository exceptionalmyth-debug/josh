import React from 'react';
import { LEAGUES } from '../data/mockData';
import { Star, Radio, CheckCircle, Clock } from 'lucide-react';

export type StatusFilter = 'all' | 'live' | 'finished' | 'scheduled' | 'favorites';

interface MatchFilterTabsProps {
  statusFilter: StatusFilter;
  onStatusFilterChange: (filter: StatusFilter) => void;
  selectedLeague: string;
  onSelectLeague: (leagueId: string) => void;
  counts: {
    all: number;
    live: number;
    finished: number;
    scheduled: number;
    favorites: number;
  };
}

export const MatchFilterTabs: React.FC<MatchFilterTabsProps> = ({
  statusFilter,
  onStatusFilterChange,
  selectedLeague,
  onSelectLeague,
  counts
}) => {
  const filterTabs = [
    { id: 'all', label: 'All Matches', count: counts.all, icon: null },
    { id: 'live', label: 'Live Now', count: counts.live, icon: Radio, isLive: true },
    { id: 'finished', label: 'Finished', count: counts.finished, icon: CheckCircle },
    { id: 'scheduled', label: 'Upcoming', count: counts.scheduled, icon: Clock },
    { id: 'favorites', label: 'Favorites', count: counts.favorites, icon: Star }
  ];

  return (
    <div className="space-y-3 mb-5">
      {/* Primary Status Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {filterTabs.map((tab) => {
          const isActive = statusFilter === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onStatusFilterChange(tab.id as StatusFilter)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-100 text-slate-900 shadow-md font-bold'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800/80'
              }`}
            >
              {Icon && (
                <Icon
                  className={`w-3.5 h-3.5 ${
                    tab.isLive && counts.live > 0 ? 'text-red-500 animate-pulse' : ''
                  }`}
                />
              )}
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  isActive
                    ? 'bg-slate-300 text-slate-900'
                    : tab.isLive && counts.live > 0
                    ? 'bg-red-500/20 text-red-400 font-bold'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary League Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {LEAGUES.map((lg) => {
          const isSelected = selectedLeague === lg.id;

          return (
            <button
              key={lg.id}
              onClick={() => onSelectLeague(lg.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 shadow-xs'
                  : 'bg-slate-900/50 text-slate-400 hover:text-slate-300 border border-slate-800/60 hover:bg-slate-800/50'
              }`}
            >
              <span>{lg.flag}</span>
              <span>{lg.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
