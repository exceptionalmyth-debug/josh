import React, { useState } from 'react';
import { Match } from '../types/football';
import { MatchCard } from './MatchCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface LeagueSectionProps {
  leagueName: string;
  leagueFlag: string;
  matches: Match[];
  favorites: string[];
  onToggleFavorite: (matchId: string) => void;
  onSelectMatch: (match: Match) => void;
}

export const LeagueSection: React.FC<LeagueSectionProps> = ({
  leagueName,
  leagueFlag,
  matches,
  favorites,
  onToggleFavorite,
  onSelectMatch
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const liveCount = matches.filter((m) => m.status === 'LIVE').length;

  return (
    <div className="bg-slate-900/40 rounded-2xl border border-slate-800/80 overflow-hidden mb-5">
      {/* League Header */}
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="px-4 py-3 bg-slate-900/90 hover:bg-slate-800/70 cursor-pointer flex items-center justify-between transition-colors border-b border-slate-800/60"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{leagueFlag}</span>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>{leagueName}</span>
              {liveCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold text-[10px] animate-pulse">
                  {liveCount} LIVE
                </span>
              )}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium">
            {matches.length} {matches.length === 1 ? 'match' : 'matches'}
          </span>
          <button className="text-slate-400 hover:text-white p-1">
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Matches Grid */}
      {!isCollapsed && (
        <div className="p-3 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              isFavorite={favorites.includes(match.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectMatch={onSelectMatch}
            />
          ))}
        </div>
      )}
    </div>
  );
};
