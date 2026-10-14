import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Match, MatchEvent } from '../types/football';
import { Sparkles, Trophy, X } from 'lucide-react';

interface GoalNotificationToastProps {
  notification: {
    match: Match;
    event: MatchEvent;
  } | null;
  onClose: () => void;
  onOpenMatch: (match: Match) => void;
}

export const GoalNotificationToast: React.FC<GoalNotificationToastProps> = ({
  notification,
  onClose,
  onOpenMatch
}) => {
  if (!notification) return null;
  const { match, event } = notification;
  const scoringTeam = event.teamId === match.homeTeam.id ? match.homeTeam : match.awayTeam;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -40, scale: 0.9 }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md shadow-2xl rounded-2xl overflow-hidden border border-emerald-500/40 bg-slate-900/95 backdrop-blur-md"
      >
        <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 p-2.5 px-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>GOAL ALERT • {event.minute}&apos;</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-black/20 rounded-full transition-colors text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          onClick={() => {
            onOpenMatch(match);
            onClose();
          }}
          className="p-4 cursor-pointer hover:bg-slate-800/50 transition-colors"
        >
          <div className="text-[11px] font-semibold text-slate-400 mb-1 flex items-center justify-between">
            <span>{match.leagueName}</span>
            <span className="text-emerald-400 font-bold">{match.homeScore} - {match.awayScore}</span>
          </div>

          <div className="flex items-center justify-between gap-3 my-2">
            <div className="flex items-center gap-2 font-semibold text-sm text-slate-100">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: scoringTeam.primaryColor }} />
              <span>{event.player}</span>
            </div>
            <div className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 font-mono text-xs font-bold">
              ⚽ {event.minute}&apos;
            </div>
          </div>

          <p className="text-xs text-slate-300 line-clamp-1 italic">
            &ldquo;{event.description}&rdquo;
          </p>

          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>{match.homeTeam.shortName} vs {match.awayTeam.shortName}</span>
            <span className="text-emerald-400 font-medium hover:underline">View Match Hub →</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
