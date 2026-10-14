import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Match, MatchEvent, MatchScorer } from './types/football';
import { INITIAL_MATCHES, TODAY, getFormattedDate } from './data/mockData';
import { soundFx } from './utils/audio';
import { Header } from './components/Header';
import { DateRibbon } from './components/DateRibbon';
import { MatchFilterTabs, StatusFilter } from './components/MatchFilterTabs';
import { LeagueSection } from './components/LeagueSection';
import { MatchDetailModal } from './components/MatchDetailModal';
import { StandingsTable } from './components/StandingsTable';
import { GoalNotificationToast } from './components/GoalNotificationToast';
import { Sparkles, Radio, Trophy, Search, RefreshCw, Flame, Calendar, Award } from 'lucide-react';

export default function App() {
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [selectedDate, setSelectedDate] = useState<string>(TODAY);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeView, setActiveView] = useState<'matches' | 'standings'>('matches');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [notification, setNotification] = useState<{ match: Match; event: MatchEvent } | null>(null);

  // Favorites stored in state with localStorage persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('footypulse_favorites');
      return saved ? JSON.parse(saved) : ['m-pl-ars-che'];
    } catch {
      return ['m-pl-ars-che'];
    }
  });

  const toggleFavorite = useCallback((matchId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(matchId) ? prev.filter((id) => id !== matchId) : [...prev, matchId];
      try {
        localStorage.setItem('footypulse_favorites', JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundFx.setSoundEnabled(next);
      return next;
    });
  }, []);

  // Trigger celebration effects
  const fireCelebration = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#f59e0b', '#ffffff']
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  // Handle manual or simulated goal
  const handleScoreGoal = useCallback((matchId: string, scoringSide: 'home' | 'away') => {
    setMatches((prevMatches) => {
      return prevMatches.map((m) => {
        if (m.id !== matchId) return m;

        const isHome = scoringSide === 'home';
        const team = isHome ? m.homeTeam : m.awayTeam;
        const currentMinute = m.minute || 75;

        // Pick player
        const squad = isHome ? m.lineups.home.starting : m.lineups.away.starting;
        const attackers = squad.filter((p) => p.position === 'FW' || p.position === 'MF');
        const randomPlayer = attackers[Math.floor(Math.random() * attackers.length)] || squad[0];

        const newHomeScore = isHome ? m.homeScore + 1 : m.homeScore;
        const newAwayScore = isHome ? m.awayScore : m.awayScore + 1;

        const newScorer: MatchScorer = {
          player: randomPlayer.name,
          minute: currentMinute,
          teamId: team.id
        };

        const newEvent: MatchEvent = {
          id: `ev-${Date.now()}-${Math.random()}`,
          minute: currentMinute,
          type: 'goal',
          teamId: team.id,
          player: randomPlayer.name,
          description: `Goal scored! Superb finish into the back of the net by ${randomPlayer.name}!`
        };

        const updatedStats = {
          ...m.stats,
          shotsTotal: [
            isHome ? m.stats.shotsTotal[0] + 1 : m.stats.shotsTotal[0],
            !isHome ? m.stats.shotsTotal[1] + 1 : m.stats.shotsTotal[1]
          ] as [number, number],
          shotsOnTarget: [
            isHome ? m.stats.shotsOnTarget[0] + 1 : m.stats.shotsOnTarget[0],
            !isHome ? m.stats.shotsOnTarget[1] + 1 : m.stats.shotsOnTarget[1]
          ] as [number, number],
          xg: [
            isHome ? Number((m.stats.xg[0] + 0.42).toFixed(2)) : m.stats.xg[0],
            !isHome ? Number((m.stats.xg[1] + 0.42).toFixed(2)) : m.stats.xg[1]
          ] as [number, number]
        };

        const updatedMatch: Match = {
          ...m,
          homeScore: newHomeScore,
          awayScore: newAwayScore,
          scorers: [...m.scorers, newScorer],
          events: [newEvent, ...m.events],
          stats: updatedStats,
          commentary: [
            {
              id: `c-${Date.now()}`,
              minute: currentMinute,
              type: 'goal',
              text: `GOAL! ${m.homeTeam.shortName} ${newHomeScore}-${newAwayScore} ${m.awayTeam.shortName}! ${randomPlayer.name} scores!`,
              isKey: true
            },
            ...m.commentary
          ]
        };

        // Trigger audio & visual confetti
        soundFx.playGoalSound();
        fireCelebration();

        // Show notification toast
        setNotification({
          match: updatedMatch,
          event: newEvent
        });

        // Also update selectedMatch if open
        setSelectedMatch((current) => (current && current.id === matchId ? updatedMatch : current));

        return updatedMatch;
      });
    });
  }, [fireCelebration]);

  // Live match simulation ticker
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setMatches((prevMatches) => {
        let hasChanges = false;

        const nextMatches = prevMatches.map((m) => {
          if (m.status !== 'LIVE' || !m.minute) return m;

          hasChanges = true;
          const nextMinute = m.minute + 1;

          // Check if match should conclude at 90+4
          if (nextMinute >= 94) {
            soundFx.playWhistle();
            return {
              ...m,
              status: 'FT' as const,
              minute: 90
            };
          }

          // Random chance of live event (~8%)
          const eventRoll = Math.random();
          if (eventRoll < 0.08) {
            const isHome = Math.random() > 0.45;
            const scoringTeam = isHome ? m.homeTeam : m.awayTeam;
            const squad = isHome ? m.lineups.home.starting : m.lineups.away.starting;
            const randomPlayer = squad[Math.floor(Math.random() * squad.length)];

            // 60% goal, 40% card or chance
            if (eventRoll < 0.045) {
              // GOAL event
              const newHomeScore = isHome ? m.homeScore + 1 : m.homeScore;
              const newAwayScore = isHome ? m.awayScore : m.awayScore + 1;

              const newScorer: MatchScorer = {
                player: randomPlayer.name,
                minute: nextMinute,
                teamId: scoringTeam.id
              };

              const newEvent: MatchEvent = {
                id: `ev-${Date.now()}`,
                minute: nextMinute,
                type: 'goal',
                teamId: scoringTeam.id,
                player: randomPlayer.name,
                description: `Brilliant team combination finished off calmly by ${randomPlayer.name}!`
              };

              soundFx.playGoalSound();
              fireCelebration();

              const updatedMatch: Match = {
                ...m,
                minute: nextMinute,
                homeScore: newHomeScore,
                awayScore: newAwayScore,
                scorers: [...m.scorers, newScorer],
                events: [newEvent, ...m.events]
              };

              setNotification({ match: updatedMatch, event: newEvent });
              return updatedMatch;
            } else {
              // Commentary/Chance event
              const newCommentary = {
                id: `comm-${Date.now()}`,
                minute: nextMinute,
                type: 'chance' as const,
                text: `Tremendous effort by ${randomPlayer.name}! The shot rattles the outside of the woodwork!`,
                isKey: false
              };

              return {
                ...m,
                minute: nextMinute,
                commentary: [newCommentary, ...m.commentary]
              };
            }
          }

          return {
            ...m,
            minute: nextMinute
          };
        });

        return hasChanges ? nextMatches : prevMatches;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isSimulating, fireCelebration]);

  // Keep selectedMatch updated with latest data
  useEffect(() => {
    if (!selectedMatch) return;
    const fresh = matches.find((m) => m.id === selectedMatch.id);
    if (fresh) setSelectedMatch(fresh);
  }, [matches, selectedMatch?.id]);

  // Counts for filter pills
  const counts = useMemo(() => {
    const forDate = matches.filter((m) => m.date === selectedDate);
    return {
      all: forDate.length,
      live: matches.filter((m) => m.status === 'LIVE').length,
      finished: forDate.filter((m) => m.status === 'FT').length,
      scheduled: forDate.filter((m) => m.status === 'SCHEDULED').length,
      favorites: matches.filter((m) => favorites.includes(m.id)).length
    };
  }, [matches, selectedDate, favorites]);

  // Date counts for ribbon
  const matchesByDateCount = useMemo(() => {
    const map: Record<string, number> = {};
    matches.forEach((m) => {
      map[m.date] = (map[m.date] || 0) + 1;
    });
    return map;
  }, [matches]);

  // Filtered matches
  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      // If filtering by "live", ignore date filter to show all live matches
      if (statusFilter === 'live') {
        if (m.status !== 'LIVE') return false;
      } else if (statusFilter === 'favorites') {
        if (!favorites.includes(m.id)) return false;
      } else {
        // Date match
        if (m.date !== selectedDate) return false;

        if (statusFilter === 'finished' && m.status !== 'FT') return false;
        if (statusFilter === 'scheduled' && m.status !== 'SCHEDULED') return false;
      }

      // League filter
      if (selectedLeague !== 'all' && m.leagueId !== selectedLeague) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesHome = m.homeTeam.name.toLowerCase().includes(query) || m.homeTeam.code.toLowerCase().includes(query);
        const matchesAway = m.awayTeam.name.toLowerCase().includes(query) || m.awayTeam.code.toLowerCase().includes(query);
        const matchesLeague = m.leagueName.toLowerCase().includes(query);
        const matchesPlayer = m.scorers.some((s) => s.player.toLowerCase().includes(query));

        if (!matchesHome && !matchesAway && !matchesLeague && !matchesPlayer) return false;
      }

      return true;
    });
  }, [matches, selectedDate, statusFilter, selectedLeague, searchQuery, favorites]);

  // Group filtered matches by League
  const matchesByLeague = useMemo(() => {
    const groups: Record<string, { name: string; flag: string; matches: Match[] }> = {};
    filteredMatches.forEach((m) => {
      if (!groups[m.leagueId]) {
        groups[m.leagueId] = {
          name: m.leagueName,
          flag: m.leagueFlag,
          matches: []
        };
      }
      groups[m.leagueId].matches.push(m);
    });
    return groups;
  }, [filteredMatches]);

  const totalGoalsToday = useMemo(() => {
    return matches
      .filter((m) => m.date === TODAY)
      .reduce((acc, curr) => acc + curr.homeScore + curr.awayScore, 0);
  }, [matches]);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeView={activeView}
        onViewChange={setActiveView}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        isSimulating={isSimulating}
        onToggleSimulating={() => setIsSimulating(!isSimulating)}
        liveMatchesCount={counts.live}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5">
        {/* Quick Highlights / Live Ticker Strip */}
        <div className="mb-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-mono font-bold text-white">{counts.live}</div>
              <div className="text-[11px] text-slate-400">Live Matches Now</div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
              ⚽
            </div>
            <div>
              <div className="text-base sm:text-lg font-mono font-bold text-white">{totalGoalsToday}</div>
              <div className="text-[11px] text-slate-400">Goals Scored Today</div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-mono font-bold text-white">5 Leagues</div>
              <div className="text-[11px] text-slate-400">Coverage Global</div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold shrink-0">
              <Flame className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-mono font-bold text-white">Live Engine</div>
              <div className="text-[11px] text-slate-400">{isSimulating ? 'Active Ticking' : 'Paused'}</div>
            </div>
          </div>
        </div>

        {/* View Switch: Matches vs Standings */}
        {activeView === 'standings' ? (
          <StandingsTable />
        ) : (
          <div>
            {/* Date Ribbon */}
            <DateRibbon
              selectedDate={selectedDate}
              onSelectDate={(date) => {
                setSelectedDate(date);
                if (statusFilter === 'live') setStatusFilter('all');
              }}
              matchesByDateCount={matchesByDateCount}
            />

            {/* Filter Tabs (Status & League pills) */}
            <MatchFilterTabs
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              selectedLeague={selectedLeague}
              onSelectLeague={setSelectedLeague}
              counts={counts}
            />

            {/* Match Listings */}
            {Object.keys(matchesByLeague).length === 0 ? (
              <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-12 text-center my-6">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-xl">
                  ⚽
                </div>
                <h3 className="text-base font-bold text-slate-200">No matches found</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  {statusFilter === 'favorites'
                    ? "You haven't pinned any matches to your favorites yet. Tap the star icon on any match card to track it here."
                    : 'No fixtures match your current date, league, or search criteria.'}
                </p>
                <button
                  onClick={() => {
                    setSelectedDate(TODAY);
                    setStatusFilter('all');
                    setSelectedLeague('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(matchesByLeague).map(([leagueId, group]) => (
                  <LeagueSection
                    key={leagueId}
                    leagueName={group.name}
                    leagueFlag={group.flag}
                    matches={group.matches}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    onSelectMatch={setSelectedMatch}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">FootyPulse</span>
            <span>• Instant Live Football Scores & Real-Time Stats</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>⚽ Live Match Clock</span>
            <span>📊 Lineups & Tactical Pitch</span>
            <span>🔔 Goal Whistles & Chimes</span>
          </div>
        </div>
      </footer>

      {/* Goal Notification Toast */}
      <GoalNotificationToast
        notification={notification}
        onClose={() => setNotification(null)}
        onOpenMatch={(m) => setSelectedMatch(m)}
      />

      {/* Detailed Match Hub Modal */}
      <MatchDetailModal
        match={selectedMatch}
        onClose={() => setSelectedMatch(null)}
        isFavorite={selectedMatch ? favorites.includes(selectedMatch.id) : false}
        onToggleFavorite={toggleFavorite}
        onSimulateGoal={handleScoreGoal}
      />
    </div>
  );
}
