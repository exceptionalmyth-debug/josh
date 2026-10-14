import React from 'react';
import { Match } from '../types/football';
import { Star, ChevronRight } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  isFavorite: boolean;
  onToggleFavorite: (matchId: string) => void;
  onSelectMatch: (match: Match) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  isFavorite,
  onToggleFavorite,
  onSelectMatch
}) => {
  const isLive = match.status === 'LIVE';
  const isFT = match.status === 'FT';

  return (
    <div
      onClick={() => onSelectMatch(match)}
      className={`group relative rounded-2xl border transition-all duration-200 cursor-pointer p-3.5 sm:p-4 bg-slate-900/70 hover:bg-slate-800/80 hover:shadow-xl hover:border-slate-700/80 ${
        isLive
          ? 'border-emerald-500/30 shadow-emerald-950/20 shadow-md ring-1 ring-emerald-500/20'
          : 'border-slate-800/80'
      }`}
    >
      {/* Top Bar inside Card: Match Status & Favorite */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-2">
          {isLive ? (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{match.minute}&apos; LIVE</span>
            </div>
          ) : isFT ? (
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold text-[11px]">
              FT
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-slate-800/80 text-sky-400 font-mono font-semibold text-[11px]">
              {match.time}
            </span>
          )}

          <span className="text-[11px] text-slate-500 hidden sm:inline">
            {match.round}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(match.id);
          }}
          className={`p-1 rounded-md transition-colors ${
            isFavorite
              ? 'text-amber-400 fill-amber-400'
              : 'text-slate-600 hover:text-slate-300'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Main Teams & Score Section */}
      <div className="space-y-2.5">
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[10px] shadow-sm shrink-0"
              style={{
                backgroundColor: match.homeTeam.primaryColor || '#1e293b',
                color: match.homeTeam.primaryColor === '#ffffff' ? '#0f172a' : '#ffffff'
              }}
            >
              {match.homeTeam.code}
            </div>
            <span className="font-semibold text-sm text-slate-100 truncate group-hover:text-white transition-colors">
              {match.homeTeam.name}
            </span>
          </div>

          <span
            className={`font-mono text-base font-extrabold ${
              isLive ? 'text-white' : isFT ? 'text-slate-200' : 'text-slate-600'
            }`}
          >
            {match.status === 'SCHEDULED' ? '-' : match.homeScore}
          </span>
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[10px] shadow-sm shrink-0"
              style={{
                backgroundColor: match.awayTeam.primaryColor || '#1e293b',
                color: match.awayTeam.primaryColor === '#ffffff' ? '#0f172a' : '#ffffff'
              }}
            >
              {match.awayTeam.code}
            </div>
            <span className="font-semibold text-sm text-slate-100 truncate group-hover:text-white transition-colors">
              {match.awayTeam.name}
            </span>
          </div>

          <span
            className={`font-mono text-base font-extrabold ${
              isLive ? 'text-white' : isFT ? 'text-slate-200' : 'text-slate-600'
            }`}
          >
            {match.status === 'SCHEDULED' ? '-' : match.awayScore}
          </span>
        </div>
      </div>

      {/* Scorers Summary Snippet (if any) */}
      {match.scorers.length > 0 && (
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="truncate flex items-center gap-1">
            <span>⚽</span>
            <span className="truncate">
              {match.scorers.map((s) => `${s.player} ${s.minute}'`).join(', ')}
            </span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </div>
      )}
    </div>
  );
};
