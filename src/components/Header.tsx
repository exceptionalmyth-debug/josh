import React from 'react';
import { Search, Volume2, VolumeX, Radio, Trophy, Calendar, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeView: 'matches' | 'standings';
  onViewChange: (view: 'matches' | 'standings') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isSimulating: boolean;
  onToggleSimulating: () => void;
  liveMatchesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeView,
  onViewChange,
  soundEnabled,
  onToggleSound,
  isSimulating,
  onToggleSimulating,
  liveMatchesCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-950/50 text-white font-extrabold text-xl">
              ⚽
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                  Footy<span className="text-emerald-400">Pulse</span>
                </span>
                {liveMatchesCount > 0 && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-bold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>{liveMatchesCount} LIVE</span>
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Live Football Scores & Match Hub</p>
            </div>
          </div>

          {/* Navigation view tabs */}
          <div className="hidden md:flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => onViewChange('matches')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'matches'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Scores & Matches</span>
            </button>
            <button
              onClick={() => onViewChange('standings')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'standings'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Standings & Tables</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-xs relative hidden sm:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search teams, players..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Controls: Sound & Live Simulation */}
          <div className="flex items-center gap-2">
            {/* Live Simulation Toggle */}
            <button
              onClick={onToggleSimulating}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isSimulating
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Simulates real-time match clock progression and random goal events"
            >
              <Radio className={`w-3.5 h-3.5 ${isSimulating ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">Live Engine</span>
              <span className={`w-1.5 h-1.5 rounded-full ${isSimulating ? 'bg-emerald-400' : 'bg-slate-600'}`} />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              className={`p-2 rounded-xl border transition-colors ${
                soundEnabled
                  ? 'bg-slate-900 border-slate-800 text-emerald-400 hover:text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
              }`}
              title={soundEnabled ? 'Sound is ON (Goal chimes & whistle)' : 'Sound is MUTED'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-slate-800/60 gap-2">
          <div className="flex-1 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search team, league..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-2 py-1 text-xs text-slate-200 placeholder-slate-500"
            />
          </div>

          <div className="flex items-center gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-800">
            <button
              onClick={() => onViewChange('matches')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                activeView === 'matches' ? 'bg-emerald-600 text-white' : 'text-slate-400'
              }`}
            >
              Scores
            </button>
            <button
              onClick={() => onViewChange('standings')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                activeView === 'standings' ? 'bg-emerald-600 text-white' : 'text-slate-400'
              }`}
            >
              Tables
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
