import React, { useState } from 'react';
import { STANDINGS, LEAGUES } from '../data/mockData';
import { Trophy, Info } from 'lucide-react';

export const StandingsTable: React.FC = () => {
  const [selectedLeagueId, setSelectedLeagueId] = useState('premier-league');

  const leagueOptions = [
    { id: 'premier-league', name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { id: 'champions-league', name: 'UEFA Champions League', flag: '🇪🇺' },
    { id: 'la-liga', name: 'La Liga EA SPORTS', flag: '🇪🇸' }
  ];

  const currentStandings = STANDINGS[selectedLeagueId] || STANDINGS['premier-league'];

  return (
    <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-4 sm:p-5">
      {/* Table Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>League Standings</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Season {currentStandings.season} • Official Rankings</p>
        </div>

        {/* League selector tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto no-scrollbar">
          {leagueOptions.map((lg) => (
            <button
              key={lg.id}
              onClick={() => setSelectedLeagueId(lg.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedLeagueId === lg.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="mr-1.5">{lg.flag}</span>
              {lg.name}
            </button>
          ))}
        </div>
      </div>

      {/* Standings Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
              <th className="py-2.5 px-2 text-center w-8">#</th>
              <th className="py-2.5 px-3">Club</th>
              <th className="py-2.5 px-2 text-center font-mono">P</th>
              <th className="py-2.5 px-2 text-center font-mono">W</th>
              <th className="py-2.5 px-2 text-center font-mono">D</th>
              <th className="py-2.5 px-2 text-center font-mono">L</th>
              <th className="py-2.5 px-2 text-center font-mono hidden sm:table-cell">GD</th>
              <th className="py-2.5 px-3 text-center font-mono font-bold text-slate-200">PTS</th>
              <th className="py-2.5 px-3 text-center hidden md:table-cell">Form</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {currentStandings.table.map((row) => {
              // Zone styling: Top 4 Champions League (blue/green), 5 Europa (orange), etc.
              const isUCL = row.position <= 4;
              const isUEL = row.position === 5;

              return (
                <tr
                  key={row.position}
                  className="hover:bg-slate-800/50 transition-colors group"
                >
                  <td className="py-3 px-2 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded font-bold text-[11px] ${
                        isUCL
                          ? 'bg-blue-900/60 text-blue-300 border border-blue-500/30'
                          : isUEL
                          ? 'bg-amber-900/60 text-amber-300 border border-amber-500/30'
                          : 'text-slate-400'
                      }`}
                    >
                      {row.position}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center font-bold text-[9px] shadow-xs shrink-0"
                        style={{
                          backgroundColor: row.team.primaryColor || '#334155',
                          color: row.team.primaryColor === '#ffffff' ? '#0f172a' : '#ffffff'
                        }}
                      >
                        {row.team.code}
                      </div>
                      <span className="font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors truncate">
                        {row.team.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center font-mono text-slate-300">{row.played}</td>
                  <td className="py-3 px-2 text-center font-mono text-slate-300">{row.won}</td>
                  <td className="py-3 px-2 text-center font-mono text-slate-400">{row.draw}</td>
                  <td className="py-3 px-2 text-center font-mono text-slate-400">{row.lost}</td>
                  <td className="py-3 px-2 text-center font-mono text-slate-300 hidden sm:table-cell">
                    {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-white text-sm bg-slate-900/40">
                    {row.points}
                  </td>
                  <td className="py-3 px-3 text-center hidden md:table-cell">
                    <div className="flex items-center justify-center gap-1">
                      {row.form.map((f, fIdx) => (
                        <span
                          key={fIdx}
                          className={`w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center ${
                            f === 'W'
                              ? 'bg-emerald-600 text-white'
                              : f === 'D'
                              ? 'bg-slate-600 text-slate-200'
                              : 'bg-red-600 text-white'
                          }`}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-blue-500/80" />
          <span>UEFA Champions League</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-amber-500/80" />
          <span>UEFA Europa League</span>
        </div>
      </div>
    </div>
  );
};
