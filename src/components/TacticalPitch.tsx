import React, { useState } from 'react';
import { Lineup, Player, Team } from '../types/football';
import { Shirt, UserCheck, Shield } from 'lucide-react';

interface TacticalPitchProps {
  homeTeam: Team;
  awayTeam: Team;
  homeLineup: Lineup;
  awayLineup: Lineup;
}

export const TacticalPitch: React.FC<TacticalPitchProps> = ({
  homeTeam,
  awayTeam,
  homeLineup,
  awayLineup
}) => {
  const [activeSide, setActiveSide] = useState<'both' | 'home' | 'away'>('both');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <div className="space-y-4">
      {/* View switch buttons */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-lg border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveSide('both')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeSide === 'both' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Full Pitch
          </button>
          <button
            onClick={() => setActiveSide('home')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeSide === 'home' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            {homeTeam.shortName} ({homeLineup.formation})
          </button>
          <button
            onClick={() => setActiveSide('away')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeSide === 'away' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            {awayTeam.shortName} ({awayLineup.formation})
          </button>
        </div>

        {/* Coaches Info */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <div>
            <span className="text-slate-500">Coach ({homeTeam.shortName}): </span>
            <span className="text-slate-200 font-medium">{homeLineup.coach}</span>
          </div>
          <div>
            <span className="text-slate-500">Coach ({awayTeam.shortName}): </span>
            <span className="text-slate-200 font-medium">{awayLineup.coach}</span>
          </div>
        </div>
      </div>

      {/* SVG Football Field */}
      <div className="relative w-full aspect-[16/11] max-w-2xl mx-auto rounded-2xl overflow-hidden border-2 border-emerald-900/70 shadow-2xl bg-gradient-to-b from-[#143d26] via-[#103420] to-[#0d2a1a] select-none">
        {/* Grass Pattern stripes */}
        <div className="absolute inset-0 flex flex-col pointer-events-none opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 w-full ${i % 2 === 0 ? 'bg-emerald-400/20' : 'bg-transparent'}`}
            />
          ))}
        </div>

        {/* Pitch Field Markings (SVG) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none stroke-emerald-100/35"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          strokeWidth="0.8"
        >
          {/* Outer Boundary line */}
          <rect x="4" y="4" width="92" height="92" rx="1" />

          {/* Halfway line */}
          <line x1="4" y1="50" x2="96" y2="50" strokeWidth="0.8" />

          {/* Center Circle & Spot */}
          <circle cx="50" cy="50" r="10" />
          <circle cx="50" cy="50" r="0.8" fill="rgba(255,255,255,0.4)" />

          {/* Top Penalty Area (Away Goal) */}
          <rect x="25" y="4" width="50" height="16" />
          {/* Top Goal Area */}
          <rect x="36" y="4" width="28" height="6" />
          {/* Top Penalty Spot */}
          <circle cx="50" cy="13" r="0.8" fill="rgba(255,255,255,0.4)" />
          {/* Top Penalty Arc */}
          <path d="M 40 20 A 10 10 0 0 0 60 20" />

          {/* Bottom Penalty Area (Home Goal) */}
          <rect x="25" y="80" width="50" height="16" />
          {/* Bottom Goal Area */}
          <rect x="36" y="90" width="28" height="6" />
          {/* Bottom Penalty Spot */}
          <circle cx="50" cy="87" r="0.8" fill="rgba(255,255,255,0.4)" />
          {/* Bottom Penalty Arc */}
          <path d="M 40 80 A 10 10 0 0 1 60 80" />

          {/* Corner Arcs */}
          <path d="M 4 7 A 3 3 0 0 0 7 4" />
          <path d="M 93 4 A 3 3 0 0 0 96 7" />
          <path d="M 4 93 A 3 3 0 0 1 7 96" />
          <path d="M 96 93 A 3 3 0 0 0 93 96" />
        </svg>

        {/* Home Players (attacking upward, defending bottom) */}
        {(activeSide === 'both' || activeSide === 'home') &&
          homeLineup.starting.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlayer(p)}
              style={{ left: `${p.gridPos.x}%`, top: `${p.gridPos.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center focus:outline-none transition-transform hover:scale-125 z-10"
              title={`${p.name} (#${p.number}) - Rating: ${p.rating}`}
            >
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center font-bold text-xs transition-shadow"
                style={{
                  backgroundColor: homeTeam.primaryColor || '#ef0107',
                  color: '#ffffff'
                }}
              >
                {p.number}
              </div>
              <div className="mt-0.5 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-xs text-[10px] text-white font-medium whitespace-nowrap shadow-sm group-hover:bg-emerald-600 transition-colors flex items-center gap-1">
                <span>{p.name.split('. ').pop() || p.name}</span>
                <span className="text-amber-300 font-bold text-[9px]">{p.rating}</span>
              </div>
            </button>
          ))}

        {/* Away Players (attacking downward, defending top) */}
        {(activeSide === 'both' || activeSide === 'away') &&
          awayLineup.starting.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlayer(p)}
              style={{ left: `${p.gridPos.x}%`, top: `${p.gridPos.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center focus:outline-none transition-transform hover:scale-125 z-10"
              title={`${p.name} (#${p.number}) - Rating: ${p.rating}`}
            >
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-slate-900 shadow-lg flex items-center justify-center font-bold text-xs"
                style={{
                  backgroundColor: awayTeam.primaryColor || '#034694',
                  color: awayTeam.primaryColor === '#ffffff' ? '#111827' : '#ffffff'
                }}
              >
                {p.number}
              </div>
              <div className="mt-0.5 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-xs text-[10px] text-white font-medium whitespace-nowrap shadow-sm group-hover:bg-blue-600 transition-colors flex items-center gap-1">
                <span>{p.name.split('. ').pop() || p.name}</span>
                <span className="text-amber-300 font-bold text-[9px]">{p.rating}</span>
              </div>
            </button>
          ))}
      </div>

      {/* Bench Players List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Shirt className="w-3.5 h-3.5 text-emerald-400" />
              {homeTeam.name} Substitutes
            </span>
            <span className="text-[11px] text-slate-500">{homeLineup.formation}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {homeLineup.bench.map((benchPlayer, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700/80 transition-colors rounded-md text-[11px] text-slate-300 font-medium"
              >
                {benchPlayer}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Shirt className="w-3.5 h-3.5 text-blue-400" />
              {awayTeam.name} Substitutes
            </span>
            <span className="text-[11px] text-slate-500">{awayLineup.formation}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {awayLineup.bench.map((benchPlayer, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700/80 transition-colors rounded-md text-[11px] text-slate-300 font-medium"
              >
                {benchPlayer}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
