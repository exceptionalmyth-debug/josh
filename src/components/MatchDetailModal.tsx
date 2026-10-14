import React, { useState } from 'react';
import { Match, MatchEvent } from '../types/football';
import { TacticalPitch } from './TacticalPitch';
import {
  X,
  Star,
  MapPin,
  Clock,
  Shield,
  Activity,
  Users,
  MessageSquare,
  History,
  TrendingUp,
  Zap,
  Volume2
} from 'lucide-react';

interface MatchDetailModalProps {
  match: Match | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (matchId: string) => void;
  onSimulateGoal: (matchId: string, team: 'home' | 'away') => void;
}

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({
  match,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSimulateGoal
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'lineups' | 'stats' | 'commentary' | 'h2h'>('timeline');

  if (!match) return null;

  const isLive = match.status === 'LIVE';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-3xl my-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{match.leagueFlag}</span>
            <div>
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">{match.leagueName}</span>
              <span className="text-slate-500 text-xs ml-2">• {match.round}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(match.id)}
              className={`p-1.5 rounded-lg border transition-all ${
                isFavorite
                  ? 'border-amber-400 bg-amber-400/10 text-amber-400'
                  : 'border-slate-800 bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
              title="Add to Favorites"
            >
              <Star className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scoreboard Banner */}
        <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900/90 p-5 border-b border-slate-800">
          <div className="flex items-center justify-between">
            {/* Home Team */}
            <div className="flex-1 flex flex-col items-center text-center">
              <div
                className="w-16 h-16 rounded-2xl p-1 shadow-lg flex items-center justify-center font-bold text-lg mb-2 border border-slate-700/60"
                style={{
                  backgroundColor: match.homeTeam.primaryColor || '#1e293b',
                  color: match.homeTeam.primaryColor === '#ffffff' ? '#0f172a' : '#ffffff'
                }}
              >
                {match.homeTeam.code}
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-100">{match.homeTeam.name}</h3>
              <span className="text-[11px] text-slate-400">Home</span>
            </div>

            {/* Score Centerpiece */}
            <div className="flex flex-col items-center px-4">
              {isLive ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-400 text-xs font-bold mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{match.minute}&apos; LIVE</span>
                </div>
              ) : match.status === 'FT' ? (
                <div className="px-3 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold mb-2">
                  Full Time
                </div>
              ) : (
                <div className="px-3 py-0.5 rounded-full bg-slate-800 text-sky-400 text-xs font-semibold mb-2">
                  {match.time}
                </div>
              )}

              <div className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
                <span>{match.homeScore}</span>
                <span className="text-slate-600 font-light">-</span>
                <span>{match.awayScore}</span>
              </div>

              {match.homeHalfScore !== undefined && match.awayHalfScore !== undefined && (
                <span className="text-[11px] text-slate-500 mt-1 font-mono">
                  (HT {match.homeHalfScore} - {match.awayHalfScore})
                </span>
              )}
            </div>

            {/* Away Team */}
            <div className="flex-1 flex flex-col items-center text-center">
              <div
                className="w-16 h-16 rounded-2xl p-1 shadow-lg flex items-center justify-center font-bold text-lg mb-2 border border-slate-700/60"
                style={{
                  backgroundColor: match.awayTeam.primaryColor || '#1e293b',
                  color: match.awayTeam.primaryColor === '#ffffff' ? '#0f172a' : '#ffffff'
                }}
              >
                {match.awayTeam.code}
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-100">{match.awayTeam.name}</h3>
              <span className="text-[11px] text-slate-400">Away</span>
            </div>
          </div>

          {/* Goal Scorers list under score */}
          {match.scorers.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-4 text-xs">
              <div className="text-right space-y-1">
                {match.scorers
                  .filter((s) => s.teamId === match.homeTeam.id)
                  .map((s, idx) => (
                    <div key={idx} className="text-slate-300 flex items-center justify-end gap-1.5">
                      <span>⚽ {s.player} {s.minute}&apos;</span>
                    </div>
                  ))}
              </div>
              <div className="text-left space-y-1">
                {match.scorers
                  .filter((s) => s.teamId === match.awayTeam.id)
                  .map((s, idx) => (
                    <div key={idx} className="text-slate-300 flex items-center justify-start gap-1.5">
                      <span>⚽ {s.player} {s.minute}&apos;</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Match Meta: Stadium, Referee */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 pt-2 border-t border-slate-800/50">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{match.venue}</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-slate-500" />
              <span>Ref: {match.referee}</span>
            </div>
          </div>

          {/* Interactive Live Goal Simulation Bar */}
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2 bg-slate-950/60 p-2.5 rounded-xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="font-semibold text-slate-200">Interactive Goal Test:</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSimulateGoal(match.id, 'home')}
                className="px-2.5 py-1 text-xs rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold transition-all hover:scale-105 active:scale-95"
              >
                + Goal {match.homeTeam.shortName}
              </button>
              <button
                onClick={() => onSimulateGoal(match.id, 'away')}
                className="px-2.5 py-1 text-xs rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 font-semibold transition-all hover:scale-105 active:scale-95"
              >
                + Goal {match.awayTeam.shortName}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-800 bg-slate-900/90 px-3 overflow-x-auto no-scrollbar">
          {[
            { id: 'timeline', label: 'Timeline & Events', icon: Clock },
            { id: 'lineups', label: 'Lineups & Pitch', icon: Users },
            { id: 'stats', label: 'Match Stats', icon: Activity },
            { id: 'commentary', label: 'Live Commentary', icon: MessageSquare },
            { id: 'h2h', label: 'Head to Head', icon: History }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                  isActive
                    ? 'border-emerald-500 text-emerald-400 bg-slate-800/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-3">
              {match.events.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-sm">
                  No match events recorded yet. Match kicks off at {match.time}.
                </div>
              ) : (
                <div className="relative border-l border-slate-800 ml-4 pl-4 space-y-4">
                  {match.events.map((evt) => {
                    const isHome = evt.teamId === match.homeTeam.id;
                    const team = isHome ? match.homeTeam : match.awayTeam;

                    return (
                      <div key={evt.id} className="relative group">
                        {/* Event icon bubble on vertical line */}
                        <div
                          className={`absolute -left-[27px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md border ${
                            evt.type === 'goal'
                              ? 'bg-emerald-500 text-white border-emerald-400'
                              : evt.type === 'red_card'
                              ? 'bg-red-600 text-white border-red-500'
                              : evt.type === 'yellow_card'
                              ? 'bg-amber-400 text-black border-amber-300'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {evt.type === 'goal'
                            ? '⚽'
                            : evt.type === 'red_card'
                            ? '🟥'
                            : evt.type === 'yellow_card'
                            ? '🟨'
                            : evt.type === 'substitution'
                            ? '🔄'
                            : '⚡'}
                        </div>

                        {/* Event card */}
                        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-xs font-bold text-emerald-400">
                              {evt.minute}&apos;
                            </span>
                            <span className="text-[11px] font-medium text-slate-400">
                              {team.name}
                            </span>
                          </div>
                          <div className="font-semibold text-sm text-slate-200">
                            {evt.player}
                            {evt.secondaryPlayer && (
                              <span className="text-xs font-normal text-slate-400 ml-1.5">
                                ({evt.type === 'substitution' ? `sub for ${evt.secondaryPlayer}` : `assist: ${evt.secondaryPlayer}`})
                              </span>
                            )}
                          </div>
                          {evt.description && (
                            <p className="text-xs text-slate-400 mt-1 italic">
                              {evt.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LINEUPS & PITCH */}
          {activeTab === 'lineups' && (
            <TacticalPitch
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              homeLineup={match.lineups.home}
              awayLineup={match.lineups.away}
            />
          )}

          {/* TAB 3: MATCH STATS */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              {/* Possession comparison */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-emerald-400">{match.stats.possession[0]}%</span>
                  <span className="text-slate-400 uppercase tracking-wider text-[11px]">Ball Possession</span>
                  <span className="text-blue-400">{match.stats.possession[1]}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${match.stats.possession[0]}%` }}
                  />
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${match.stats.possession[1]}%` }}
                  />
                </div>
              </div>

              {/* Grid of detailed statistics */}
              <div className="space-y-3">
                {[
                  { label: 'Expected Goals (xG)', home: match.stats.xg[0].toFixed(2), away: match.stats.xg[1].toFixed(2) },
                  { label: 'Total Shots', home: match.stats.shotsTotal[0], away: match.stats.shotsTotal[1] },
                  { label: 'Shots on Target', home: match.stats.shotsOnTarget[0], away: match.stats.shotsOnTarget[1] },
                  { label: 'Corners', home: match.stats.corners[0], away: match.stats.corners[1] },
                  { label: 'Fouls Committed', home: match.stats.fouls[0], away: match.stats.fouls[1] },
                  { label: 'Yellow Cards', home: match.stats.yellowCards[0], away: match.stats.yellowCards[1] },
                  { label: 'Offsides', home: match.stats.offsides[0], away: match.stats.offsides[1] },
                  { label: 'Passes Completed', home: match.stats.passesCompleted[0], away: match.stats.passesCompleted[1] },
                  { label: 'Pass Accuracy', home: `${match.stats.passAccuracy[0]}%`, away: `${match.stats.passAccuracy[1]}%` }
                ].map((stat, idx) => {
                  const homeVal = parseFloat(String(stat.home));
                  const awayVal = parseFloat(String(stat.away));
                  const isHomeAdvantage = homeVal > awayVal;
                  const isAwayAdvantage = awayVal > homeVal;

                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 bg-slate-900/40 hover:bg-slate-800/40 rounded-lg text-xs transition-colors"
                    >
                      <span className={`w-12 text-left font-mono font-bold ${isHomeAdvantage ? 'text-emerald-400' : 'text-slate-300'}`}>
                        {stat.home}
                      </span>
                      <span className="text-slate-400 font-medium text-center flex-1">{stat.label}</span>
                      <span className={`w-12 text-right font-mono font-bold ${isAwayAdvantage ? 'text-blue-400' : 'text-slate-300'}`}>
                        {stat.away}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: LIVE COMMENTARY */}
          {activeTab === 'commentary' && (
            <div className="space-y-3">
              {match.commentary.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-sm">
                  Live commentary will start with the opening whistle.
                </div>
              ) : (
                match.commentary.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border transition-all ${
                      item.isKey
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                        : 'bg-slate-900/40 border-slate-800/70 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        {item.minute}&apos;
                      </span>
                      {item.isKey && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase">
                          Key Moment
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 5: HEAD TO HEAD */}
          {activeTab === 'h2h' && (
            <div className="space-y-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">H2H Record</span>
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="p-2 rounded-lg bg-slate-800/60">
                    <div className="text-lg font-bold text-emerald-400">{match.h2h.homeWins}</div>
                    <div className="text-[11px] text-slate-400">{match.homeTeam.shortName} Wins</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/60">
                    <div className="text-lg font-bold text-slate-300">{match.h2h.draws}</div>
                    <div className="text-[11px] text-slate-400">Draws</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/60">
                    <div className="text-lg font-bold text-blue-400">{match.h2h.awayWins}</div>
                    <div className="text-[11px] text-slate-400">{match.awayTeam.shortName} Wins</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Previous Meetings</h4>
                <div className="space-y-2">
                  {match.h2h.lastMatches.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-900/40 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-400 font-mono text-[11px]">{m.date}</span>
                      <div className="flex items-center gap-3 font-semibold text-slate-200">
                        <span>{match.homeTeam.shortName}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 font-mono font-bold text-emerald-400">
                          {m.homeScore} - {m.awayScore}
                        </span>
                        <span>{match.awayTeam.shortName}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
