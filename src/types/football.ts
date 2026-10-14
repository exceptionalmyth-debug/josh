export type MatchStatus = 'LIVE' | 'FT' | 'HT' | 'ET' | 'PEN' | 'SCHEDULED' | 'POSTPONED';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  code: string;
  logo: string;
  primaryColor: string;
  secondaryColor?: string;
}

export interface MatchScorer {
  player: string;
  minute: number;
  isPenalty?: boolean;
  isOwnGoal?: boolean;
  teamId: string;
}

export interface MatchEvent {
  id: string;
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'var' | 'penalty_miss';
  teamId: string;
  player: string;
  secondaryPlayer?: string; // assist or player subbed off
  description: string;
}

export interface MatchStats {
  possession: [number, number]; // [home, away] %
  shotsTotal: [number, number];
  shotsOnTarget: [number, number];
  xg: [number, number];
  corners: [number, number];
  fouls: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
  offsides: [number, number];
  passesCompleted: [number, number];
  passAccuracy: [number, number]; // %
}

export interface Player {
  id: string;
  number: number;
  name: string;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  gridPos: { x: number; y: number }; // 0-100 percentage coordinates on half-pitch
  rating: number;
  isCaptain?: boolean;
}

export interface Lineup {
  formation: string; // e.g. "4-3-3"
  starting: Player[];
  bench: string[];
  coach: string;
}

export interface CommentaryItem {
  id: string;
  minute: number;
  type: 'goal' | 'card' | 'chance' | 'whistle' | 'general';
  text: string;
  isKey: boolean;
}

export interface Match {
  id: string;
  leagueId: string;
  leagueName: string;
  leagueFlag: string;
  round: string;
  venue: string;
  referee: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: MatchStatus;
  minute?: number;
  extraTime?: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  homeHalfScore?: number;
  awayHalfScore?: number;
  scorers: MatchScorer[];
  events: MatchEvent[];
  stats: MatchStats;
  lineups: {
    home: Lineup;
    away: Lineup;
  };
  commentary: CommentaryItem[];
  h2h: {
    homeWins: number;
    draws: number;
    awayWins: number;
    lastMatches: {
      date: string;
      homeScore: number;
      awayScore: number;
      winner: 'home' | 'away' | 'draw';
    }[];
  };
}

export interface League {
  id: string;
  name: string;
  country: string;
  flag: string;
  icon: string;
}

export interface StandingTeam {
  position: number;
  team: Team;
  played: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export interface LeagueStandings {
  leagueId: string;
  leagueName: string;
  season: string;
  table: StandingTeam[];
}
