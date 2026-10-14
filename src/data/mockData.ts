import { League, Match, LeagueStandings } from '../types/football';

export const LEAGUES: League[] = [
  { id: 'all', name: 'All Competitions', country: 'Global', flag: '🌍', icon: 'Trophy' },
  { id: 'premier-league', name: 'Premier League', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', icon: 'Shield' },
  { id: 'champions-league', name: 'UEFA Champions League', country: 'Europe', flag: '🇪🇺', icon: 'Star' },
  { id: 'la-liga', name: 'La Liga EA SPORTS', country: 'Spain', flag: '🇪🇸', icon: 'Flame' },
  { id: 'serie-a', name: 'Serie A Enilive', country: 'Italy', flag: '🇮🇹', icon: 'Medal' },
  { id: 'bundesliga', name: 'Bundesliga', country: 'Germany', flag: '🇩🇪', icon: 'Award' }
];

// Helper to get formatted dates: yesterday, today, tomorrow
export const getFormattedDate = (offsetDays = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const TODAY = getFormattedDate(0);
export const YESTERDAY = getFormattedDate(-1);
export const TOMORROW = getFormattedDate(1);
export const DAY_AFTER = getFormattedDate(2);

export const INITIAL_MATCHES: Match[] = [
  // 1. Arsenal vs Chelsea (LIVE, Premier League)
  {
    id: 'm-pl-ars-che',
    leagueId: 'premier-league',
    leagueName: 'Premier League',
    leagueFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    round: 'Matchday 29',
    venue: 'Emirates Stadium, London',
    referee: 'Michael Oliver',
    date: TODAY,
    time: '17:30',
    status: 'LIVE',
    minute: 74,
    homeTeam: {
      id: 'arsenal',
      name: 'Arsenal',
      shortName: 'Arsenal',
      code: 'ARS',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&auto=format&fit=crop&q=80',
      primaryColor: '#ef0107',
      secondaryColor: '#063672'
    },
    awayTeam: {
      id: 'chelsea',
      name: 'Chelsea',
      shortName: 'Chelsea',
      code: 'CHE',
      logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=80&auto=format&fit=crop&q=80',
      primaryColor: '#034694',
      secondaryColor: '#dba111'
    },
    homeScore: 2,
    awayScore: 1,
    homeHalfScore: 1,
    awayHalfScore: 1,
    scorers: [
      { player: 'B. Saka', minute: 18, teamId: 'arsenal' },
      { player: 'C. Palmer', minute: 42, isPenalty: true, teamId: 'chelsea' },
      { player: 'M. Ødegaard', minute: 67, teamId: 'arsenal' }
    ],
    events: [
      { id: 'e1', minute: 18, type: 'goal', teamId: 'arsenal', player: 'B. Saka', secondaryPlayer: 'K. Havertz', description: 'Curling left-footed strike into the top corner!' },
      { id: 'e2', minute: 31, type: 'yellow_card', teamId: 'chelsea', player: 'M. Caicedo', description: 'Tactical foul breaking up a dangerous counter-attack.' },
      { id: 'e3', minute: 42, type: 'goal', teamId: 'chelsea', player: 'C. Palmer', description: 'Cool penalty conversion sending the goalkeeper the wrong way.' },
      { id: 'e4', minute: 58, type: 'yellow_card', teamId: 'arsenal', player: 'W. Saliba', description: 'High boot challenge in defensive third.' },
      { id: 'e5', minute: 64, type: 'substitution', teamId: 'chelsea', player: 'P. Neto', secondaryPlayer: 'N. Jackson', description: 'Tactical change on the right wing.' },
      { id: 'e6', minute: 67, type: 'goal', teamId: 'arsenal', player: 'M. Ødegaard', secondaryPlayer: 'D. Rice', description: 'Low drilled effort from outside the 18-yard box!' }
    ],
    stats: {
      possession: [58, 42],
      shotsTotal: [15, 8],
      shotsOnTarget: [7, 3],
      xg: [2.14, 1.05],
      corners: [6, 3],
      fouls: [10, 14],
      yellowCards: [1, 2],
      redCards: [0, 0],
      offsides: [2, 1],
      passesCompleted: [442, 318],
      passAccuracy: [88, 81]
    },
    lineups: {
      home: {
        formation: '4-3-3',
        coach: 'Mikel Arteta',
        starting: [
          { id: 'p1', number: 22, name: 'D. Raya', position: 'GK', gridPos: { x: 50, y: 92 }, rating: 7.2 },
          { id: 'p2', number: 4, name: 'B. White', position: 'DF', gridPos: { x: 84, y: 74 }, rating: 7.0 },
          { id: 'p3', number: 2, name: 'W. Saliba', position: 'DF', gridPos: { x: 62, y: 76 }, rating: 6.9 },
          { id: 'p4', number: 6, name: 'Gabriel M.', position: 'DF', gridPos: { x: 38, y: 76 }, rating: 7.4 },
          { id: 'p5', number: 12, name: 'J. Timber', position: 'DF', gridPos: { x: 16, y: 74 }, rating: 7.1 },
          { id: 'p6', number: 41, name: 'D. Rice', position: 'MF', gridPos: { x: 50, y: 55 }, rating: 7.9 },
          { id: 'p7', number: 8, name: 'M. Ødegaard', position: 'MF', gridPos: { x: 70, y: 44 }, rating: 8.6, isCaptain: true },
          { id: 'p8', number: 5, name: 'T. Partey', position: 'MF', gridPos: { x: 30, y: 50 }, rating: 7.3 },
          { id: 'p9', number: 7, name: 'B. Saka', position: 'FW', gridPos: { x: 82, y: 22 }, rating: 8.4 },
          { id: 'p10', number: 29, name: 'K. Havertz', position: 'FW', gridPos: { x: 50, y: 16 }, rating: 7.5 },
          { id: 'p11', number: 11, name: 'G. Martinelli', position: 'FW', gridPos: { x: 18, y: 22 }, rating: 7.2 }
        ],
        bench: ['A. Ramsdale', 'O. Zinchenko', 'J. Kiwior', 'Jorginho', 'L. Trossard', 'R. Sterling', 'G. Jesus']
      },
      away: {
        formation: '4-2-3-1',
        coach: 'Enzo Maresca',
        starting: [
          { id: 'ap1', number: 1, name: 'R. Sánchez', position: 'GK', gridPos: { x: 50, y: 8 }, rating: 6.8 },
          { id: 'ap2', number: 24, name: 'R. James', position: 'DF', gridPos: { x: 84, y: 26 }, rating: 7.0, isCaptain: true },
          { id: 'ap3', number: 29, name: 'W. Fofana', position: 'DF', gridPos: { x: 62, y: 24 }, rating: 6.5 },
          { id: 'ap4', number: 6, name: 'L. Colwill', position: 'DF', gridPos: { x: 38, y: 24 }, rating: 6.7 },
          { id: 'ap5', number: 3, name: 'M. Cucurella', position: 'DF', gridPos: { x: 16, y: 26 }, rating: 6.9 },
          { id: 'ap6', number: 25, name: 'M. Caicedo', position: 'MF', gridPos: { x: 62, y: 46 }, rating: 7.1 },
          { id: 'ap7', number: 8, name: 'E. Fernández', position: 'MF', gridPos: { x: 38, y: 46 }, rating: 6.9 },
          { id: 'ap8', number: 11, name: 'N. Madueke', position: 'FW', gridPos: { x: 82, y: 64 }, rating: 6.6 },
          { id: 'ap9', number: 20, name: 'C. Palmer', position: 'MF', gridPos: { x: 50, y: 60 }, rating: 8.1 },
          { id: 'ap10', number: 7, name: 'P. Neto', position: 'FW', gridPos: { x: 18, y: 64 }, rating: 7.0 },
          { id: 'ap11', number: 15, name: 'N. Jackson', position: 'FW', gridPos: { x: 50, y: 80 }, rating: 6.8 }
        ],
        bench: ['F. Jørgensen', 'T. Adarabioyo', 'M. Gusto', 'R. Lavia', 'K. Dewsbury-Hall', 'J. Félix', 'C. Nkunku']
      }
    },
    commentary: [
      { id: 'c1', minute: 73, type: 'chance', text: 'Huge chance! Saka dribbles past Cucurella and hits the side netting from a tight angle.', isKey: true },
      { id: 'c2', minute: 70, type: 'general', text: 'Arsenal dominating midfield territory right now, retaining possession comfortably.', isKey: false },
      { id: 'c3', minute: 67, type: 'goal', text: 'GOAL! Arsenal 2-1 Chelsea! Martin Ødegaard strikes cleanly with his left foot into the bottom right corner!', isKey: true },
      { id: 'c4', minute: 64, type: 'card', text: 'Substitution for Chelsea: Pedro Neto replaces Nicolas Jackson.', isKey: false },
      { id: 'c5', minute: 58, type: 'card', text: 'William Saliba goes into the referee book after a reckless challenge.', isKey: false },
      { id: 'c6', minute: 45, type: 'whistle', text: 'Half time whistle blows at the Emirates Stadium. Score is level at 1-1.', isKey: true }
    ],
    h2h: {
      homeWins: 4,
      draws: 1,
      awayWins: 1,
      lastMatches: [
        { date: '2024-04-23', homeScore: 5, awayScore: 0, winner: 'home' },
        { date: '2023-10-21', homeScore: 2, awayScore: 2, winner: 'draw' },
        { date: '2023-05-02', homeScore: 3, awayScore: 1, winner: 'home' }
      ]
    }
  },

  // 2. Real Madrid vs Bayern Munich (LIVE, Champions League Semifinal)
  {
    id: 'm-ucl-rma-bay',
    leagueId: 'champions-league',
    leagueName: 'UEFA Champions League',
    leagueFlag: '🇪🇺',
    round: 'Semi-finals • 2nd Leg',
    venue: 'Santiago Bernabéu, Madrid',
    referee: 'Szymon Marciniak',
    date: TODAY,
    time: '20:00',
    status: 'LIVE',
    minute: 61,
    homeTeam: {
      id: 'real-madrid',
      name: 'Real Madrid',
      shortName: 'Real Madrid',
      code: 'RMA',
      logo: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=80&auto=format&fit=crop&q=80',
      primaryColor: '#ffffff',
      secondaryColor: '#febe10'
    },
    awayTeam: {
      id: 'bayern-munich',
      name: 'Bayern München',
      shortName: 'Bayern',
      code: 'BAY',
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=80&auto=format&fit=crop&q=80',
      primaryColor: '#dc052d',
      secondaryColor: '#0066b2'
    },
    homeScore: 1,
    awayScore: 1,
    homeHalfScore: 0,
    awayHalfScore: 0,
    scorers: [
      { player: 'H. Kane', minute: 52, teamId: 'bayern-munich' },
      { player: 'Vinícius Jr.', minute: 59, teamId: 'real-madrid' }
    ],
    events: [
      { id: 'ue1', minute: 52, type: 'goal', teamId: 'bayern-munich', player: 'H. Kane', secondaryPlayer: 'J. Musiala', description: 'Thunderous finish past Courtois from 14 yards!' },
      { id: 'ue2', minute: 56, type: 'yellow_card', teamId: 'real-madrid', player: 'A. Tchouaméni', description: 'Slide tackle through the back of Musiala.' },
      { id: 'ue3', minute: 59, type: 'goal', teamId: 'real-madrid', player: 'Vinícius Jr.', secondaryPlayer: 'J. Bellingham', description: 'Blistering pace down the left wing, slotted into far post!' }
    ],
    stats: {
      possession: [52, 48],
      shotsTotal: [14, 12],
      shotsOnTarget: [6, 5],
      xg: [1.88, 1.45],
      corners: [5, 4],
      fouls: [8, 11],
      yellowCards: [1, 0],
      redCards: [0, 0],
      offsides: [3, 2],
      passesCompleted: [390, 362],
      passAccuracy: [89, 87]
    },
    lineups: {
      home: {
        formation: '4-3-1-2',
        coach: 'Carlo Ancelotti',
        starting: [
          { id: 'rp1', number: 1, name: 'T. Courtois', position: 'GK', gridPos: { x: 50, y: 92 }, rating: 7.5 },
          { id: 'rp2', number: 2, name: 'D. Carvajal', position: 'DF', gridPos: { x: 84, y: 74 }, rating: 7.2 },
          { id: 'rp3', number: 22, name: 'A. Rüdiger', position: 'DF', gridPos: { x: 62, y: 76 }, rating: 7.6 },
          { id: 'rp4', number: 3, name: 'Éder Militão', position: 'DF', gridPos: { x: 38, y: 76 }, rating: 7.1 },
          { id: 'rp5', number: 23, name: 'F. Mendy', position: 'DF', gridPos: { x: 16, y: 74 }, rating: 6.9 },
          { id: 'rp6', number: 15, name: 'F. Valverde', position: 'MF', gridPos: { x: 74, y: 52 }, rating: 7.8 },
          { id: 'rp7', number: 14, name: 'A. Tchouaméni', position: 'MF', gridPos: { x: 50, y: 56 }, rating: 6.8 },
          { id: 'rp8', number: 8, name: 'E. Camavinga', position: 'MF', gridPos: { x: 26, y: 52 }, rating: 7.4 },
          { id: 'rp9', number: 5, name: 'J. Bellingham', position: 'MF', gridPos: { x: 50, y: 38 }, rating: 8.5 },
          { id: 'rp10', number: 11, name: 'Rodrygo', position: 'FW', gridPos: { x: 66, y: 20 }, rating: 7.3 },
          { id: 'rp11', number: 7, name: 'Vinícius Jr.', position: 'FW', gridPos: { x: 34, y: 20 }, rating: 8.8, isCaptain: true }
        ],
        bench: ['A. Lunin', 'L. Modrić', 'K. Mbappé', 'B. Díaz', 'Arda Güler', 'D. Ceballos', 'Fran García']
      },
      away: {
        formation: '4-2-3-1',
        coach: 'Vincent Kompany',
        starting: [
          { id: 'bp1', number: 1, name: 'M. Neuer', position: 'GK', gridPos: { x: 50, y: 8 }, rating: 7.3, isCaptain: true },
          { id: 'bp2', number: 27, name: 'K. Laimer', position: 'DF', gridPos: { x: 84, y: 26 }, rating: 6.8 },
          { id: 'bp3', number: 2, name: 'D. Upamecano', position: 'DF', gridPos: { x: 62, y: 24 }, rating: 6.7 },
          { id: 'bp4', number: 3, name: 'Kim Min-jae', position: 'DF', gridPos: { x: 38, y: 24 }, rating: 7.0 },
          { id: 'bp5', number: 19, name: 'A. Davies', position: 'DF', gridPos: { x: 16, y: 26 }, rating: 7.4 },
          { id: 'bp6', number: 6, name: 'J. Kimmich', position: 'MF', gridPos: { x: 60, y: 46 }, rating: 7.7 },
          { id: 'bp7', number: 45, name: 'A. Pavlović', position: 'MF', gridPos: { x: 40, y: 46 }, rating: 7.2 },
          { id: 'bp8', number: 17, name: 'M. Olise', position: 'FW', gridPos: { x: 82, y: 64 }, rating: 7.5 },
          { id: 'bp9', number: 42, name: 'J. Musiala', position: 'MF', gridPos: { x: 50, y: 60 }, rating: 8.2 },
          { id: 'bp10', number: 7, name: 'S. Gnabry', position: 'FW', gridPos: { x: 18, y: 64 }, rating: 6.9 },
          { id: 'bp11', number: 9, name: 'H. Kane', position: 'FW', gridPos: { x: 50, y: 80 }, rating: 8.6 }
        ],
        bench: ['S. Ulreich', 'E. Dier', 'Raphaël Guerreiro', 'L. Sané', 'K. Coman', 'T. Müller', 'M. Tel']
      }
    },
    commentary: [
      { id: 'cu1', minute: 61, type: 'general', text: 'The Bernabéu is roaring after Vinicius Jr equalizes! What a tie this is turning out to be.', isKey: false },
      { id: 'cu2', minute: 59, type: 'goal', text: 'GOAL! Real Madrid 1-1 Bayern! Vinicius Junior bursts past Upamecano and buries the ball into the corner!', isKey: true },
      { id: 'cu3', minute: 52, type: 'goal', text: 'GOAL! Real Madrid 0-1 Bayern! Harry Kane clinically sweeps home Jamal Musiala square pass!', isKey: true }
    ],
    h2h: {
      homeWins: 3,
      draws: 2,
      awayWins: 1,
      lastMatches: [
        { date: '2024-05-08', homeScore: 2, awayScore: 1, winner: 'home' },
        { date: '2024-04-30', homeScore: 2, awayScore: 2, winner: 'draw' }
      ]
    }
  },

  // 3. Liverpool vs Manchester City (LIVE, 35', Premier League)
  {
    id: 'm-pl-liv-mci',
    leagueId: 'premier-league',
    leagueName: 'Premier League',
    leagueFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    round: 'Matchday 29',
    venue: 'Anfield, Liverpool',
    referee: 'Anthony Taylor',
    date: TODAY,
    time: '16:30',
    status: 'LIVE',
    minute: 38,
    homeTeam: {
      id: 'liverpool',
      name: 'Liverpool',
      shortName: 'Liverpool',
      code: 'LIV',
      logo: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=80&auto=format&fit=crop&q=80',
      primaryColor: '#c8102e',
      secondaryColor: '#00b2a9'
    },
    awayTeam: {
      id: 'man-city',
      name: 'Manchester City',
      shortName: 'Man City',
      code: 'MCI',
      logo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=80&auto=format&fit=crop&q=80',
      primaryColor: '#6cabdd',
      secondaryColor: '#1c2c5b'
    },
    homeScore: 1,
    awayScore: 0,
    homeHalfScore: 1,
    awayHalfScore: 0,
    scorers: [
      { player: 'M. Salah', minute: 14, teamId: 'liverpool' }
    ],
    events: [
      { id: 'le1', minute: 14, type: 'goal', teamId: 'liverpool', player: 'M. Salah', secondaryPlayer: 'T. Alexander-Arnold', description: 'Trademark curling strike into the far corner after cutting inside from the flank.' },
      { id: 'le2', minute: 28, type: 'yellow_card', teamId: 'man-city', player: 'Rodri', description: 'Tripping Szoboszlai on a break.' }
    ],
    stats: {
      possession: [46, 54],
      shotsTotal: [6, 7],
      shotsOnTarget: [3, 2],
      xg: [0.94, 0.72],
      corners: [3, 4],
      fouls: [4, 6],
      yellowCards: [0, 1],
      redCards: [0, 0],
      offsides: [1, 2],
      passesCompleted: [184, 230],
      passAccuracy: [85, 91]
    },
    lineups: {
      home: {
        formation: '4-3-3',
        coach: 'Arne Slot',
        starting: [
          { id: 'lp1', number: 1, name: 'Alisson', position: 'GK', gridPos: { x: 50, y: 92 }, rating: 7.3 },
          { id: 'lp2', number: 66, name: 'Alexander-Arnold', position: 'DF', gridPos: { x: 84, y: 74 }, rating: 8.0 },
          { id: 'lp3', number: 5, name: 'I. Konaté', position: 'DF', gridPos: { x: 62, y: 76 }, rating: 7.2 },
          { id: 'lp4', number: 4, name: 'V. van Dijk', position: 'DF', gridPos: { x: 38, y: 76 }, rating: 7.8, isCaptain: true },
          { id: 'lp5', number: 26, name: 'A. Robertson', position: 'DF', gridPos: { x: 16, y: 74 }, rating: 7.1 },
          { id: 'lp6', number: 38, name: 'R. Gravenberch', position: 'MF', gridPos: { x: 50, y: 55 }, rating: 7.5 },
          { id: 'lp7', number: 10, name: 'A. Mac Allister', position: 'MF', gridPos: { x: 70, y: 46 }, rating: 7.3 },
          { id: 'lp8', number: 8, name: 'D. Szoboszlai', position: 'MF', gridPos: { x: 30, y: 46 }, rating: 7.4 },
          { id: 'lp9', number: 11, name: 'M. Salah', position: 'FW', gridPos: { x: 82, y: 22 }, rating: 8.7 },
          { id: 'lp10', number: 9, name: 'D. Núñez', position: 'FW', gridPos: { x: 50, y: 16 }, rating: 6.9 },
          { id: 'lp11', number: 7, name: 'L. Díaz', position: 'FW', gridPos: { x: 18, y: 22 }, rating: 7.2 }
        ],
        bench: ['C. Kelleher', 'C. Jones', 'C. Gakpo', 'H. Elliott', 'J. Gomez', 'K. Tsimikas']
      },
      away: {
        formation: '4-1-4-1',
        coach: 'Pep Guardiola',
        starting: [
          { id: 'mp1', number: 31, name: 'Ederson', position: 'GK', gridPos: { x: 50, y: 8 }, rating: 6.7 },
          { id: 'mp2', number: 82, name: 'R. Lewis', position: 'DF', gridPos: { x: 84, y: 26 }, rating: 6.9 },
          { id: 'mp3', number: 25, name: 'M. Akanji', position: 'DF', gridPos: { x: 62, y: 24 }, rating: 6.8 },
          { id: 'mp4', number: 3, name: 'Rúben Dias', position: 'DF', gridPos: { x: 38, y: 24 }, rating: 7.1 },
          { id: 'mp5', number: 24, name: 'J. Gvardiol', position: 'DF', gridPos: { x: 16, y: 26 }, rating: 7.0 },
          { id: 'mp6', number: 16, name: 'Rodri', position: 'MF', gridPos: { x: 50, y: 38 }, rating: 7.2 },
          { id: 'mp7', number: 20, name: 'Bernardo Silva', position: 'MF', gridPos: { x: 82, y: 56 }, rating: 7.1 },
          { id: 'mp8', number: 17, name: 'K. De Bruyne', position: 'MF', gridPos: { x: 62, y: 56 }, rating: 7.5, isCaptain: true },
          { id: 'mp9', number: 47, name: 'P. Foden', position: 'MF', gridPos: { x: 38, y: 56 }, rating: 7.3 },
          { id: 'mp10', number: 11, name: 'J. Doku', position: 'MF', gridPos: { x: 18, y: 56 }, rating: 7.4 },
          { id: 'mp11', number: 9, name: 'E. Haaland', position: 'FW', gridPos: { x: 50, y: 78 }, rating: 7.0 }
        ],
        bench: ['S. Ortega', 'J. Stones', 'N. Aké', 'I. Gündoğan', 'J. Grealish', 'Savinho']
      }
    },
    commentary: [
      { id: 'cl1', minute: 36, type: 'chance', text: 'Haaland header brushes the crossbar from a dangerous De Bruyne free-kick!', isKey: true },
      { id: 'cl2', minute: 28, type: 'card', text: 'Rodri is shown a yellow card for pulling down Szoboszlai.', isKey: false },
      { id: 'cl3', minute: 14, type: 'goal', text: 'GOAL! Liverpool 1-0 Man City! Mo Salah scores an iconic Anfield strike into the top corner!', isKey: true }
    ],
    h2h: {
      homeWins: 2,
      draws: 3,
      awayWins: 1,
      lastMatches: [
        { date: '2024-03-10', homeScore: 1, awayScore: 1, winner: 'draw' },
        { date: '2023-11-25', homeScore: 1, awayScore: 1, winner: 'draw' }
      ]
    }
  },

  // 4. Barcelona vs Atletico Madrid (SCHEDULED, 20:00, La Liga)
  {
    id: 'm-ll-bar-atm',
    leagueId: 'la-liga',
    leagueName: 'La Liga EA SPORTS',
    leagueFlag: '🇪🇸',
    round: 'Matchday 28',
    venue: 'Estadi Olímpic Lluís Companys, Barcelona',
    referee: 'Jesús Gil Manzano',
    date: TODAY,
    time: '20:00',
    status: 'SCHEDULED',
    homeTeam: {
      id: 'barcelona',
      name: 'Barcelona',
      shortName: 'Barcelona',
      code: 'BAR',
      logo: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=80&auto=format&fit=crop&q=80',
      primaryColor: '#004d98',
      secondaryColor: '#a50044'
    },
    awayTeam: {
      id: 'atletico',
      name: 'Atlético de Madrid',
      shortName: 'Atlético',
      code: 'ATM',
      logo: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=80&auto=format&fit=crop&q=80',
      primaryColor: '#cb3524',
      secondaryColor: '#272e61'
    },
    homeScore: 0,
    awayScore: 0,
    scorers: [],
    events: [],
    stats: {
      possession: [50, 50],
      shotsTotal: [0, 0],
      shotsOnTarget: [0, 0],
      xg: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      passesCompleted: [0, 0],
      passAccuracy: [0, 0]
    },
    lineups: {
      home: {
        formation: '4-2-3-1',
        coach: 'Hansi Flick',
        starting: [
          { id: 'bp1', number: 1, name: 'M. ter Stegen', position: 'GK', gridPos: { x: 50, y: 92 }, rating: 7.2 },
          { id: 'bp2', number: 23, name: 'J. Koundé', position: 'DF', gridPos: { x: 84, y: 74 }, rating: 7.4 },
          { id: 'bp3', number: 2, name: 'P. Cubarsí', position: 'DF', gridPos: { x: 62, y: 76 }, rating: 7.3 },
          { id: 'bp4', number: 5, name: 'Iñigo Martínez', position: 'DF', gridPos: { x: 38, y: 76 }, rating: 7.1 },
          { id: 'bp5', number: 3, name: 'A. Balde', position: 'DF', gridPos: { x: 16, y: 74 }, rating: 7.2 },
          { id: 'bp6', number: 8, name: 'Pedri', position: 'MF', gridPos: { x: 62, y: 52 }, rating: 8.2 },
          { id: 'bp7', number: 17, name: 'Marc Casadó', position: 'MF', gridPos: { x: 38, y: 52 }, rating: 7.4 },
          { id: 'bp8', number: 19, name: 'Lamine Yamal', position: 'FW', gridPos: { x: 82, y: 28 }, rating: 8.6 },
          { id: 'bp9', number: 20, name: 'Dani Olmo', position: 'MF', gridPos: { x: 50, y: 34 }, rating: 8.0 },
          { id: 'bp10', number: 11, name: 'Raphinha', position: 'FW', gridPos: { x: 18, y: 28 }, rating: 8.4, isCaptain: true },
          { id: 'bp11', number: 9, name: 'R. Lewandowski', position: 'FW', gridPos: { x: 50, y: 16 }, rating: 8.3 }
        ],
        bench: ['Iñaki Peña', 'F. de Jong', 'Gavi', 'F. Torres', 'Ansu Fati', 'P. Torre']
      },
      away: {
        formation: '5-3-2',
        coach: 'Diego Simeone',
        starting: [
          { id: 'o1', number: 13, name: 'J. Oblak', position: 'GK', gridPos: { x: 50, y: 8 }, rating: 7.6, isCaptain: true },
          { id: 'o2', number: 14, name: 'M. Llorente', position: 'DF', gridPos: { x: 88, y: 24 }, rating: 7.2 },
          { id: 'o3', number: 24, name: 'R. Le Normand', position: 'DF', gridPos: { x: 68, y: 22 }, rating: 7.1 },
          { id: 'o4', number: 2, name: 'J. Giménez', position: 'DF', gridPos: { x: 50, y: 20 }, rating: 7.3 },
          { id: 'o5', number: 23, name: 'Reinildo', position: 'DF', gridPos: { x: 32, y: 22 }, rating: 7.0 },
          { id: 'o6', number: 12, name: 'S. Lino', position: 'DF', gridPos: { x: 12, y: 24 }, rating: 7.2 },
          { id: 'o7', number: 5, name: 'R. De Paul', position: 'MF', gridPos: { x: 70, y: 48 }, rating: 7.4 },
          { id: 'o8', number: 6, name: 'Koke', position: 'MF', gridPos: { x: 50, y: 46 }, rating: 7.3 },
          { id: 'o9', number: 4, name: 'C. Gallagher', position: 'MF', gridPos: { x: 30, y: 48 }, rating: 7.1 },
          { id: 'o10', number: 7, name: 'A. Griezmann', position: 'FW', gridPos: { x: 62, y: 74 }, rating: 8.5 },
          { id: 'o11', number: 19, name: 'J. Álvarez', position: 'FW', gridPos: { x: 38, y: 74 }, rating: 7.9 }
        ],
        bench: ['J. Musso', 'A. Sorloth', 'A. Correa', 'C. Lenglet', 'A. Witsel', 'P. Barrios']
      }
    },
    commentary: [
      { id: 'cb1', minute: 0, type: 'whistle', text: 'Match kicks off tonight at 20:00 CET. High stakes in the La Liga title race!', isKey: true }
    ],
    h2h: {
      homeWins: 4,
      draws: 1,
      awayWins: 1,
      lastMatches: [
        { date: '2024-03-17', homeScore: 0, awayScore: 3, winner: 'away' },
        { date: '2023-12-03', homeScore: 1, awayScore: 0, winner: 'home' }
      ]
    }
  },

  // 5. Inter Milan vs Juventus (SCHEDULED, 20:45, Serie A)
  {
    id: 'm-sa-int-juv',
    leagueId: 'serie-a',
    leagueName: 'Serie A Enilive',
    leagueFlag: '🇮🇹',
    round: 'Matchday 26',
    venue: 'San Siro, Milan',
    referee: 'Daniele Doveri',
    date: TODAY,
    time: '20:45',
    status: 'SCHEDULED',
    homeTeam: {
      id: 'inter',
      name: 'Inter',
      shortName: 'Inter',
      code: 'INT',
      logo: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=80&auto=format&fit=crop&q=80',
      primaryColor: '#0068a8',
      secondaryColor: '#000000'
    },
    awayTeam: {
      id: 'juventus',
      name: 'Juventus',
      shortName: 'Juventus',
      code: 'JUV',
      logo: 'https://images.unsplash.com/photo-1489944445391-11dd35574549?w=80&auto=format&fit=crop&q=80',
      primaryColor: '#ffffff',
      secondaryColor: '#000000'
    },
    homeScore: 0,
    awayScore: 0,
    scorers: [],
    events: [],
    stats: {
      possession: [50, 50],
      shotsTotal: [0, 0],
      shotsOnTarget: [0, 0],
      xg: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      passesCompleted: [0, 0],
      passAccuracy: [0, 0]
    },
    lineups: {
      home: {
        formation: '3-5-2',
        coach: 'Simone Inzaghi',
        starting: [
          { id: 'ip1', number: 1, name: 'Y. Sommer', position: 'GK', gridPos: { x: 50, y: 92 }, rating: 7.2 },
          { id: 'ip2', number: 28, name: 'B. Pavard', position: 'DF', gridPos: { x: 74, y: 76 }, rating: 7.3 },
          { id: 'ip3', number: 15, name: 'F. Acerbi', position: 'DF', gridPos: { x: 50, y: 78 }, rating: 7.2 },
          { id: 'ip4', number: 95, name: 'A. Bastoni', position: 'DF', gridPos: { x: 26, y: 76 }, rating: 7.6 },
          { id: 'ip5', number: 2, name: 'D. Dumfries', position: 'MF', gridPos: { x: 88, y: 48 }, rating: 7.4 },
          { id: 'ip6', number: 23, name: 'N. Barella', position: 'MF', gridPos: { x: 68, y: 52 }, rating: 7.9 },
          { id: 'ip7', number: 20, name: 'H. Çalhanoğlu', position: 'MF', gridPos: { x: 50, y: 58 }, rating: 8.0 },
          { id: 'ip8', number: 22, name: 'H. Mkhitaryan', position: 'MF', gridPos: { x: 32, y: 52 }, rating: 7.3 },
          { id: 'ip9', number: 32, name: 'F. Dimarco', position: 'MF', gridPos: { x: 12, y: 48 }, rating: 7.8 },
          { id: 'ip10', number: 9, name: 'M. Thuram', position: 'FW', gridPos: { x: 64, y: 20 }, rating: 7.7 },
          { id: 'ip11', number: 10, name: 'L. Martínez', position: 'FW', gridPos: { x: 36, y: 20 }, rating: 8.4, isCaptain: true }
        ],
        bench: ['J. Martínez', 'S. de Vrij', 'D. Frattesi', 'P. Zieliński', 'M. Taremi', 'Carlos Augusto']
      },
      away: {
        formation: '4-2-3-1',
        coach: 'Thiago Motta',
        starting: [
          { id: 'jp1', number: 29, name: 'M. Di Gregorio', position: 'GK', gridPos: { x: 50, y: 8 }, rating: 7.1 },
          { id: 'jp2', number: 15, name: 'P. Kalulu', position: 'DF', gridPos: { x: 84, y: 26 }, rating: 7.0 },
          { id: 'jp3', number: 4, name: 'F. Gatti', position: 'DF', gridPos: { x: 62, y: 24 }, rating: 7.1 },
          { id: 'jp4', number: 3, name: 'Bremer', position: 'DF', gridPos: { x: 38, y: 24 }, rating: 7.5 },
          { id: 'jp5', number: 27, name: 'A. Cambiaso', position: 'DF', gridPos: { x: 16, y: 26 }, rating: 7.4 },
          { id: 'jp6', number: 5, name: 'M. Locatelli', position: 'MF', gridPos: { x: 62, y: 46 }, rating: 7.3 },
          { id: 'jp7', number: 19, name: 'K. Thuram', position: 'MF', gridPos: { x: 38, y: 46 }, rating: 7.2 },
          { id: 'jp8', number: 7, name: 'F. Conceição', position: 'FW', gridPos: { x: 82, y: 64 }, rating: 7.4 },
          { id: 'jp9', number: 8, name: 'T. Koopmeiners', position: 'MF', gridPos: { x: 50, y: 60 }, rating: 7.8 },
          { id: 'jp10', number: 10, name: 'K. Yıldız', position: 'FW', gridPos: { x: 18, y: 64 }, rating: 7.7 },
          { id: 'jp11', number: 9, name: 'D. Vlahović', position: 'FW', gridPos: { x: 50, y: 80 }, rating: 7.9, isCaptain: true }
        ],
        bench: ['M. Perin', 'Danilo', 'W. McKennie', 'Douglas Luiz', 'N. González', 'T. Weah']
      }
    },
    commentary: [
      { id: 'ci1', minute: 0, type: 'whistle', text: 'Derby d’Italia! Live from the historic San Siro.', isKey: true }
    ],
    h2h: {
      homeWins: 2,
      draws: 2,
      awayWins: 2,
      lastMatches: [
        { date: '2024-02-04', homeScore: 1, awayScore: 0, winner: 'home' },
        { date: '2023-11-26', homeScore: 1, awayScore: 1, winner: 'draw' }
      ]
    }
  },

  // 6. Borussia Dortmund vs Bayer Leverkusen (FT, 2-3, Bundesliga)
  {
    id: 'm-bl-dor-lev',
    leagueId: 'bundesliga',
    leagueName: 'Bundesliga',
    leagueFlag: '🇩🇪',
    round: 'Matchday 26',
    venue: 'Signal Iduna Park, Dortmund',
    referee: 'Felix Zwayer',
    date: TODAY,
    time: '14:30',
    status: 'FT',
    homeTeam: {
      id: 'dortmund',
      name: 'Borussia Dortmund',
      shortName: 'Dortmund',
      code: 'BVB',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&auto=format&fit=crop&q=80',
      primaryColor: '#fde100',
      secondaryColor: '#000000'
    },
    awayTeam: {
      id: 'leverkusen',
      name: 'Bayer Leverkusen',
      shortName: 'Leverkusen',
      code: 'B04',
      logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=80&auto=format&fit=crop&q=80',
      primaryColor: '#e32221',
      secondaryColor: '#000000'
    },
    homeScore: 2,
    awayScore: 3,
    homeHalfScore: 1,
    awayHalfScore: 1,
    scorers: [
      { player: 'S. Guirassy', minute: 21, teamId: 'dortmund' },
      { player: 'F. Wirtz', minute: 40, teamId: 'leverkusen' },
      { player: 'V. Boniface', minute: 63, teamId: 'leverkusen' },
      { player: 'J. Brandt', minute: 78, teamId: 'dortmund' },
      { player: 'R. Andrich', minute: 90, teamId: 'leverkusen' }
    ],
    events: [
      { id: 'de1', minute: 21, type: 'goal', teamId: 'dortmund', player: 'S. Guirassy', secondaryPlayer: 'J. Brandt', description: 'Bullet header into the top corner!' },
      { id: 'de2', minute: 40, type: 'goal', teamId: 'leverkusen', player: 'F. Wirtz', secondaryPlayer: 'Á. Grimaldo', description: 'Spectacular curler from the edge of the box.' },
      { id: 'de3', minute: 63, type: 'goal', teamId: 'leverkusen', player: 'V. Boniface', secondaryPlayer: 'J. Frimpong', description: 'Low drive across the keeper.' },
      { id: 'de4', minute: 78, type: 'goal', teamId: 'dortmund', player: 'J. Brandt', description: 'Volleyed home from a loose clearance.' },
      { id: 'de5', minute: 90, type: 'goal', teamId: 'leverkusen', player: 'R. Andrich', description: 'Late dramatic winner from 25 yards!' }
    ],
    stats: {
      possession: [48, 52],
      shotsTotal: [14, 18],
      shotsOnTarget: [5, 9],
      xg: [1.62, 2.45],
      corners: [5, 7],
      fouls: [12, 13],
      yellowCards: [3, 2],
      redCards: [0, 0],
      offsides: [2, 1],
      passesCompleted: [410, 452],
      passAccuracy: [84, 87]
    },
    lineups: {
      home: {
        formation: '4-2-3-1',
        coach: 'Nuri Şahin',
        starting: [
          { id: 'dp1', number: 1, name: 'G. Kobel', position: 'GK', gridPos: { x: 50, y: 92 }, rating: 6.8 },
          { id: 'dp2', number: 26, name: 'J. Ryerson', position: 'DF', gridPos: { x: 84, y: 74 }, rating: 6.7 },
          { id: 'dp3', number: 3, name: 'W. Anton', position: 'DF', gridPos: { x: 62, y: 76 }, rating: 6.5 },
          { id: 'dp4', number: 4, name: 'N. Schlotterbeck', position: 'DF', gridPos: { x: 38, y: 76 }, rating: 7.0 },
          { id: 'dp5', number: 5, name: 'R. Bensebaini', position: 'DF', gridPos: { x: 16, y: 74 }, rating: 6.6 },
          { id: 'dp6', number: 23, name: 'E. Can', position: 'MF', gridPos: { x: 62, y: 52 }, rating: 6.9, isCaptain: true },
          { id: 'dp7', number: 13, name: 'P. Groß', position: 'MF', gridPos: { x: 38, y: 52 }, rating: 7.2 },
          { id: 'dp8', number: 27, name: 'K. Adeyemi', position: 'FW', gridPos: { x: 82, y: 28 }, rating: 7.1 },
          { id: 'dp9', number: 10, name: 'J. Brandt', position: 'MF', gridPos: { x: 50, y: 34 }, rating: 8.2 },
          { id: 'dp10', number: 43, name: 'J. Gittens', position: 'FW', gridPos: { x: 18, y: 28 }, rating: 7.0 },
          { id: 'dp11', number: 9, name: 'S. Guirassy', position: 'FW', gridPos: { x: 50, y: 16 }, rating: 7.8 }
        ],
        bench: ['A. Meyer', 'N. Süle', 'F. Nmecha', 'M. Sabitzer', 'M. Beier', 'D. Malen']
      },
      away: {
        formation: '3-4-2-1',
        coach: 'Xabi Alonso',
        starting: [
          { id: 'kp1', number: 1, name: 'L. Hrádecký', position: 'GK', gridPos: { x: 50, y: 8 }, rating: 6.9, isCaptain: true },
          { id: 'kp2', number: 12, name: 'E. Tapsoba', position: 'DF', gridPos: { x: 74, y: 24 }, rating: 7.1 },
          { id: 'kp3', number: 4, name: 'J. Tah', position: 'DF', gridPos: { x: 50, y: 20 }, rating: 7.4 },
          { id: 'kp4', number: 3, name: 'P. Hincapié', position: 'DF', gridPos: { x: 26, y: 24 }, rating: 7.2 },
          { id: 'kp5', number: 30, name: 'J. Frimpong', position: 'MF', gridPos: { x: 88, y: 46 }, rating: 7.8 },
          { id: 'kp6', number: 34, name: 'G. Xhaka', position: 'MF', gridPos: { x: 62, y: 50 }, rating: 7.9 },
          { id: 'kp7', number: 8, name: 'R. Andrich', position: 'MF', gridPos: { x: 38, y: 50 }, rating: 8.2 },
          { id: 'kp8', number: 20, name: 'Á. Grimaldo', position: 'MF', gridPos: { x: 12, y: 46 }, rating: 8.0 },
          { id: 'kp9', number: 10, name: 'F. Wirtz', position: 'MF', gridPos: { x: 65, y: 68 }, rating: 8.8 },
          { id: 'kp10', number: 7, name: 'J. Hofmann', position: 'MF', gridPos: { x: 35, y: 68 }, rating: 7.3 },
          { id: 'kp11', number: 22, name: 'V. Boniface', position: 'FW', gridPos: { x: 50, y: 82 }, rating: 8.1 }
        ],
        bench: ['M. Kovář', 'N. Mukiele', 'A. García', 'E. Palacios', 'M. Terrier', 'P. Schick']
      }
    },
    commentary: [
      { id: 'cd1', minute: 90, type: 'goal', text: 'GOAL! 90th minute winner! Robert Andrich scores a screamer from 25 yards!', isKey: true },
      { id: 'cd2', minute: 78, type: 'goal', text: 'GOAL! Julian Brandt equalizes for Dortmund with an athletic volley!', isKey: true },
      { id: 'cd3', minute: 94, type: 'whistle', text: 'Full time! Bayer Leverkusen take all three points in a five-goal thriller!', isKey: true }
    ],
    h2h: {
      homeWins: 2,
      draws: 2,
      awayWins: 2,
      lastMatches: [
        { date: '2024-04-21', homeScore: 1, awayScore: 1, winner: 'draw' },
        { date: '2023-12-03', homeScore: 1, awayScore: 1, winner: 'draw' }
      ]
    }
  },

  // 7. Yesterday: Manchester United 2 - 1 Tottenham (FT)
  {
    id: 'm-pl-mun-tot',
    leagueId: 'premier-league',
    leagueName: 'Premier League',
    leagueFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    round: 'Matchday 28',
    venue: 'Old Trafford, Manchester',
    referee: 'Chris Kavanagh',
    date: YESTERDAY,
    time: '20:00',
    status: 'FT',
    homeTeam: {
      id: 'man-united',
      name: 'Manchester United',
      shortName: 'Man Utd',
      code: 'MUN',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&auto=format&fit=crop&q=80',
      primaryColor: '#da291c',
      secondaryColor: '#fbe122'
    },
    awayTeam: {
      id: 'tottenham',
      name: 'Tottenham Hotspur',
      shortName: 'Spurs',
      code: 'TOT',
      logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=80&auto=format&fit=crop&q=80',
      primaryColor: '#132257',
      secondaryColor: '#ffffff'
    },
    homeScore: 2,
    awayScore: 1,
    homeHalfScore: 1,
    awayHalfScore: 0,
    scorers: [
      { player: 'B. Fernandes', minute: 34, teamId: 'man-united' },
      { player: 'Son Heung-min', minute: 58, teamId: 'tottenham' },
      { player: 'R. Højlund', minute: 82, teamId: 'man-united' }
    ],
    events: [
      { id: 'me1', minute: 34, type: 'goal', teamId: 'man-united', player: 'B. Fernandes', description: 'Direct free-kick into top left corner.' },
      { id: 'me2', minute: 58, type: 'goal', teamId: 'tottenham', player: 'Son Heung-min', description: 'Curled effort after quick counter.' },
      { id: 'me3', minute: 82, type: 'goal', teamId: 'man-united', player: 'R. Højlund', description: 'Poacher tap-in from 6 yards.' }
    ],
    stats: {
      possession: [51, 49],
      shotsTotal: [16, 13],
      shotsOnTarget: [6, 4],
      xg: [1.95, 1.34],
      corners: [7, 5],
      fouls: [11, 10],
      yellowCards: [2, 1],
      redCards: [0, 0],
      offsides: [1, 3],
      passesCompleted: [430, 415],
      passAccuracy: [86, 85]
    },
    lineups: {
      home: {
        formation: '3-4-2-1',
        coach: 'Rúben Amorim',
        starting: [
          { id: 'up1', number: 24, name: 'A. Onana', position: 'GK', gridPos: { x: 50, y: 92 }, rating: 7.4 },
          { id: 'up2', number: 4, name: 'M. de Ligt', position: 'DF', gridPos: { x: 74, y: 76 }, rating: 7.3 },
          { id: 'up3', number: 6, name: 'L. Martínez', position: 'DF', gridPos: { x: 50, y: 78 }, rating: 7.5 },
          { id: 'up4', number: 23, name: 'L. Yoro', position: 'DF', gridPos: { x: 26, y: 76 }, rating: 7.1 },
          { id: 'up5', number: 20, name: 'Diogo Dalot', position: 'MF', gridPos: { x: 88, y: 48 }, rating: 7.2 },
          { id: 'up6', number: 37, name: 'K. Mainoo', position: 'MF', gridPos: { x: 62, y: 52 }, rating: 7.6 },
          { id: 'up7', number: 25, name: 'M. Ugarte', position: 'MF', gridPos: { x: 38, y: 52 }, rating: 7.4 },
          { id: 'up8', number: 3, name: 'N. Mazraoui', position: 'MF', gridPos: { x: 12, y: 48 }, rating: 7.0 },
          { id: 'up9', number: 8, name: 'B. Fernandes', position: 'MF', gridPos: { x: 65, y: 28 }, rating: 8.5, isCaptain: true },
          { id: 'up10', number: 16, name: 'A. Diallo', position: 'MF', gridPos: { x: 35, y: 28 }, rating: 7.7 },
          { id: 'up11', number: 9, name: 'R. Højlund', position: 'FW', gridPos: { x: 50, y: 16 }, rating: 8.1 }
        ],
        bench: ['A. Bayındır', 'H. Maguire', 'Casemiro', 'C. Eriksen', 'M. Rashford', 'A. Garnacho', 'J. Zirkzee']
      },
      away: {
        formation: '4-3-3',
        coach: 'Ange Postecoglou',
        starting: [
          { id: 'tp1', number: 1, name: 'G. Vicario', position: 'GK', gridPos: { x: 50, y: 8 }, rating: 7.0 },
          { id: 'tp2', number: 23, name: 'P. Porro', position: 'DF', gridPos: { x: 84, y: 26 }, rating: 7.2 },
          { id: 'tp3', number: 17, name: 'C. Romero', position: 'DF', gridPos: { x: 62, y: 24 }, rating: 6.8 },
          { id: 'tp4', number: 37, name: 'M. van de Ven', position: 'DF', gridPos: { x: 38, y: 24 }, rating: 7.1 },
          { id: 'tp5', number: 13, name: 'D. Udogie', position: 'DF', gridPos: { x: 16, y: 26 }, rating: 7.0 },
          { id: 'tp6', number: 8, name: 'Y. Bissouma', position: 'MF', gridPos: { x: 50, y: 46 }, rating: 7.2 },
          { id: 'tp7', number: 29, name: 'P. M. Sarr', position: 'MF', gridPos: { x: 74, y: 52 }, rating: 7.0 },
          { id: 'tp8', number: 10, name: 'J. Maddison', position: 'MF', gridPos: { x: 26, y: 52 }, rating: 7.4 },
          { id: 'tp9', number: 22, name: 'B. Johnson', position: 'FW', gridPos: { x: 82, y: 74 }, rating: 6.9 },
          { id: 'tp10', number: 19, name: 'D. Solanke', position: 'FW', gridPos: { x: 50, y: 80 }, rating: 7.2 },
          { id: 'tp11', number: 7, name: 'Son Heung-min', position: 'FW', gridPos: { x: 18, y: 74 }, rating: 8.0, isCaptain: true }
        ],
        bench: ['F. Forster', 'R. Drăgușin', 'A. Gray', 'R. Bentancur', 'L. Bergvall', 'Dejan Kulusevski', 'Richarlison']
      }
    },
    commentary: [
      { id: 'cm1', minute: 90, type: 'whistle', text: 'Full Time! Manchester United claim a crucial 2-1 victory over Spurs.', isKey: true }
    ],
    h2h: {
      homeWins: 3,
      draws: 1,
      awayWins: 2,
      lastMatches: [
        { date: '2024-01-14', homeScore: 2, awayScore: 2, winner: 'draw' },
        { date: '2023-08-19', homeScore: 0, awayScore: 2, winner: 'away' }
      ]
    }
  },

  // 8. Tomorrow: PSG vs Atletico Madrid (SCHEDULED)
  {
    id: 'm-ucl-psg-atm',
    leagueId: 'champions-league',
    leagueName: 'UEFA Champions League',
    leagueFlag: '🇪🇺',
    round: 'Matchday 4',
    venue: 'Parc des Princes, Paris',
    referee: 'Szymon Marciniak',
    date: TOMORROW,
    time: '21:00',
    status: 'SCHEDULED',
    homeTeam: {
      id: 'psg',
      name: 'Paris Saint-Germain',
      shortName: 'PSG',
      code: 'PSG',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&auto=format&fit=crop&q=80',
      primaryColor: '#004170',
      secondaryColor: '#da291c'
    },
    awayTeam: {
      id: 'atletico',
      name: 'Atlético de Madrid',
      shortName: 'Atlético',
      code: 'ATM',
      logo: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=80&auto=format&fit=crop&q=80',
      primaryColor: '#cb3524',
      secondaryColor: '#272e61'
    },
    homeScore: 0,
    awayScore: 0,
    scorers: [],
    events: [],
    stats: {
      possession: [50, 50],
      shotsTotal: [0, 0],
      shotsOnTarget: [0, 0],
      xg: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      yellowCards: [0, 0],
      redCards: [0, 0],
      offsides: [0, 0],
      passesCompleted: [0, 0],
      passAccuracy: [0, 0]
    },
    lineups: {
      home: {
        formation: '4-3-3',
        coach: 'Luis Enrique',
        starting: [
          { id: 'pp1', number: 1, name: 'G. Donnarumma', position: 'GK', gridPos: { x: 50, y: 92 }, rating: 7.4 },
          { id: 'pp2', number: 2, name: 'A. Hakimi', position: 'DF', gridPos: { x: 84, y: 74 }, rating: 7.9 },
          { id: 'pp3', number: 5, name: 'Marquinhos', position: 'DF', gridPos: { x: 62, y: 76 }, rating: 7.5, isCaptain: true },
          { id: 'pp4', number: 51, name: 'W. Pacho', position: 'DF', gridPos: { x: 38, y: 76 }, rating: 7.2 },
          { id: 'pp5', number: 25, name: 'N. Mendes', position: 'DF', gridPos: { x: 16, y: 74 }, rating: 7.6 },
          { id: 'pp6', number: 33, name: 'W. Zaïre-Emery', position: 'MF', gridPos: { x: 70, y: 50 }, rating: 7.4 },
          { id: 'pp7', number: 17, name: 'Vitinha', position: 'MF', gridPos: { x: 50, y: 56 }, rating: 8.0 },
          { id: 'pp8', number: 87, name: 'João Neves', position: 'MF', gridPos: { x: 30, y: 50 }, rating: 7.7 },
          { id: 'pp9', number: 10, name: 'O. Dembélé', position: 'FW', gridPos: { x: 82, y: 22 }, rating: 8.3 },
          { id: 'pp10', number: 11, name: 'Marco Asensio', position: 'FW', gridPos: { x: 50, y: 16 }, rating: 7.3 },
          { id: 'pp11', number: 29, name: 'B. Barcola', position: 'FW', gridPos: { x: 18, y: 22 }, rating: 8.2 }
        ],
        bench: ['M. Safonov', 'B. Beraldo', 'L. Beraldo', 'F. Ruiz', 'Lee Kang-in', 'R. Kolo Muani']
      },
      away: {
        formation: '5-3-2',
        coach: 'Diego Simeone',
        starting: [
          { id: 'atp1', number: 13, name: 'J. Oblak', position: 'GK', gridPos: { x: 50, y: 8 }, rating: 7.5, isCaptain: true },
          { id: 'atp2', number: 14, name: 'M. Llorente', position: 'DF', gridPos: { x: 88, y: 24 }, rating: 7.2 },
          { id: 'atp3', number: 24, name: 'R. Le Normand', position: 'DF', gridPos: { x: 68, y: 22 }, rating: 7.1 },
          { id: 'atp4', number: 2, name: 'J. Giménez', position: 'DF', gridPos: { x: 50, y: 20 }, rating: 7.3 },
          { id: 'atp5', number: 23, name: 'Reinildo', position: 'DF', gridPos: { x: 32, y: 22 }, rating: 7.0 },
          { id: 'atp6', number: 12, name: 'S. Lino', position: 'DF', gridPos: { x: 12, y: 24 }, rating: 7.2 },
          { id: 'atp7', number: 5, name: 'R. De Paul', position: 'MF', gridPos: { x: 70, y: 48 }, rating: 7.4 },
          { id: 'atp8', number: 6, name: 'Koke', position: 'MF', gridPos: { x: 50, y: 46 }, rating: 7.3 },
          { id: 'atp9', number: 4, name: 'C. Gallagher', position: 'MF', gridPos: { x: 30, y: 48 }, rating: 7.1 },
          { id: 'atp10', number: 7, name: 'A. Griezmann', position: 'FW', gridPos: { x: 62, y: 74 }, rating: 8.4 },
          { id: 'atp11', number: 19, name: 'J. Álvarez', position: 'FW', gridPos: { x: 38, y: 74 }, rating: 7.9 }
        ],
        bench: ['J. Musso', 'A. Sorloth', 'A. Correa', 'A. Witsel', 'P. Barrios']
      }
    },
    commentary: [
      { id: 'cpsg', minute: 0, type: 'whistle', text: 'European heavyweight clash tomorrow at Parc des Princes!', isKey: true }
    ],
    h2h: {
      homeWins: 1,
      draws: 1,
      awayWins: 1,
      lastMatches: [
        { date: '2022-07-25', homeScore: 2, awayScore: 2, winner: 'draw' }
      ]
    }
  }
];

export const STANDINGS: Record<string, LeagueStandings> = {
  'premier-league': {
    leagueId: 'premier-league',
    leagueName: 'Premier League',
    season: '2024/25',
    table: [
      {
        position: 1,
        team: { id: 'liverpool', name: 'Liverpool', shortName: 'Liverpool', code: 'LIV', logo: '', primaryColor: '#c8102e' },
        played: 28, won: 20, draw: 5, lost: 3, goalsFor: 64, goalsAgainst: 26, goalDifference: 38, points: 65, form: ['W', 'W', 'W', 'D', 'W']
      },
      {
        position: 2,
        team: { id: 'arsenal', name: 'Arsenal', shortName: 'Arsenal', code: 'ARS', logo: '', primaryColor: '#ef0107' },
        played: 28, won: 18, draw: 7, lost: 3, goalsFor: 58, goalsAgainst: 22, goalDifference: 36, points: 61, form: ['W', 'D', 'W', 'W', 'W']
      },
      {
        position: 3,
        team: { id: 'man-city', name: 'Manchester City', shortName: 'Man City', code: 'MCI', logo: '', primaryColor: '#6cabdd' },
        played: 28, won: 18, draw: 5, lost: 5, goalsFor: 60, goalsAgainst: 29, goalDifference: 31, points: 59, form: ['W', 'W', 'L', 'W', 'D']
      },
      {
        position: 4,
        team: { id: 'chelsea', name: 'Chelsea', shortName: 'Chelsea', code: 'CHE', logo: '', primaryColor: '#034694' },
        played: 28, won: 15, draw: 6, lost: 7, goalsFor: 52, goalsAgainst: 34, goalDifference: 18, points: 51, form: ['D', 'W', 'W', 'L', 'W']
      },
      {
        position: 5,
        team: { id: 'nottingham-forest', name: 'Nottingham Forest', shortName: 'Nottm Forest', code: 'NFO', logo: '', primaryColor: '#dd0000' },
        played: 28, won: 14, draw: 6, lost: 8, goalsFor: 44, goalsAgainst: 32, goalDifference: 12, points: 48, form: ['W', 'L', 'W', 'W', 'D']
      },
      {
        position: 6,
        team: { id: 'newcastle', name: 'Newcastle United', shortName: 'Newcastle', code: 'NEW', logo: '', primaryColor: '#241f20' },
        played: 28, won: 13, draw: 6, lost: 9, goalsFor: 46, goalsAgainst: 36, goalDifference: 10, points: 45, form: ['L', 'W', 'W', 'D', 'W']
      },
      {
        position: 7,
        team: { id: 'man-united', name: 'Manchester United', shortName: 'Man Utd', code: 'MUN', logo: '', primaryColor: '#da291c' },
        played: 28, won: 12, draw: 5, lost: 11, goalsFor: 38, goalsAgainst: 36, goalDifference: 2, points: 41, form: ['W', 'L', 'W', 'L', 'W']
      },
      {
        position: 8,
        team: { id: 'tottenham', name: 'Tottenham Hotspur', shortName: 'Spurs', code: 'TOT', logo: '', primaryColor: '#132257' },
        played: 28, won: 11, draw: 4, lost: 13, goalsFor: 48, goalsAgainst: 42, goalDifference: 6, points: 37, form: ['L', 'W', 'L', 'W', 'L']
      },
      {
        position: 9,
        team: { id: 'aston-villa', name: 'Aston Villa', shortName: 'Aston Villa', code: 'AVL', logo: '', primaryColor: '#670e36' },
        played: 28, won: 11, draw: 4, lost: 13, goalsFor: 40, goalsAgainst: 45, goalDifference: -5, points: 37, form: ['D', 'L', 'W', 'L', 'L']
      },
      {
        position: 10,
        team: { id: 'brighton', name: 'Brighton & Hove Albion', shortName: 'Brighton', code: 'BHA', logo: '', primaryColor: '#0057b8' },
        played: 28, won: 9, draw: 9, lost: 10, goalsFor: 39, goalsAgainst: 44, goalDifference: -5, points: 36, form: ['L', 'D', 'W', 'D', 'L']
      }
    ]
  },
  'la-liga': {
    leagueId: 'la-liga',
    leagueName: 'La Liga EA SPORTS',
    season: '2024/25',
    table: [
      {
        position: 1,
        team: { id: 'barcelona', name: 'Barcelona', shortName: 'Barcelona', code: 'BAR', logo: '', primaryColor: '#004d98' },
        played: 27, won: 20, draw: 3, lost: 4, goalsFor: 68, goalsAgainst: 24, goalDifference: 44, points: 63, form: ['W', 'W', 'W', 'W', 'D']
      },
      {
        position: 2,
        team: { id: 'real-madrid', name: 'Real Madrid', shortName: 'Real Madrid', code: 'RMA', logo: '', primaryColor: '#ffffff' },
        played: 27, won: 18, draw: 6, lost: 3, goalsFor: 57, goalsAgainst: 23, goalDifference: 34, points: 60, form: ['W', 'D', 'W', 'W', 'W']
      },
      {
        position: 3,
        team: { id: 'atletico', name: 'Atlético de Madrid', shortName: 'Atlético', code: 'ATM', logo: '', primaryColor: '#cb3524' },
        played: 27, won: 17, draw: 6, lost: 4, goalsFor: 47, goalsAgainst: 19, goalDifference: 28, points: 57, form: ['W', 'W', 'W', 'D', 'W']
      },
      {
        position: 4,
        team: { id: 'villarreal', name: 'Villarreal', shortName: 'Villarreal', code: 'VIL', logo: '', primaryColor: '#ffe600' },
        played: 27, won: 13, draw: 7, lost: 7, goalsFor: 45, goalsAgainst: 38, goalDifference: 7, points: 46, form: ['D', 'W', 'L', 'W', 'D']
      },
      {
        position: 5,
        team: { id: 'athletic-club', name: 'Athletic Club', shortName: 'Athletic', code: 'ATH', logo: '', primaryColor: '#ee2524' },
        played: 27, won: 12, draw: 9, lost: 6, goalsFor: 40, goalsAgainst: 26, goalDifference: 14, points: 45, form: ['W', 'D', 'D', 'W', 'W']
      }
    ]
  },
  'champions-league': {
    leagueId: 'champions-league',
    leagueName: 'UEFA Champions League (League Phase)',
    season: '2024/25',
    table: [
      {
        position: 1,
        team: { id: 'liverpool', name: 'Liverpool', shortName: 'Liverpool', code: 'LIV', logo: '', primaryColor: '#c8102e' },
        played: 8, won: 7, draw: 1, lost: 0, goalsFor: 19, goalsAgainst: 4, goalDifference: 15, points: 22, form: ['W', 'W', 'W', 'W', 'W']
      },
      {
        position: 2,
        team: { id: 'barcelona', name: 'Barcelona', shortName: 'Barcelona', code: 'BAR', logo: '', primaryColor: '#004d98' },
        played: 8, won: 6, draw: 1, lost: 1, goalsFor: 23, goalsAgainst: 8, goalDifference: 15, points: 19, form: ['W', 'W', 'W', 'W', 'D']
      },
      {
        position: 3,
        team: { id: 'arsenal', name: 'Arsenal', shortName: 'Arsenal', code: 'ARS', logo: '', primaryColor: '#ef0107' },
        played: 8, won: 6, draw: 1, lost: 1, goalsFor: 16, goalsAgainst: 4, goalDifference: 12, points: 19, form: ['W', 'W', 'W', 'L', 'W']
      },
      {
        position: 4,
        team: { id: 'inter', name: 'Inter Milan', shortName: 'Inter', code: 'INT', logo: '', primaryColor: '#0068a8' },
        played: 8, won: 6, draw: 1, lost: 1, goalsFor: 13, goalsAgainst: 2, goalDifference: 11, points: 19, form: ['W', 'W', 'D', 'W', 'W']
      },
      {
        position: 5,
        team: { id: 'atletico', name: 'Atlético de Madrid', shortName: 'Atlético', code: 'ATM', logo: '', primaryColor: '#cb3524' },
        played: 8, won: 5, draw: 1, lost: 2, goalsFor: 17, goalsAgainst: 12, goalDifference: 5, points: 16, form: ['W', 'W', 'W', 'L', 'W']
      },
      {
        position: 6,
        team: { id: 'bayern-munich', name: 'Bayern München', shortName: 'Bayern', code: 'BAY', logo: '', primaryColor: '#dc052d' },
        played: 8, won: 5, draw: 0, lost: 3, goalsFor: 20, goalsAgainst: 10, goalDifference: 10, points: 15, form: ['W', 'L', 'W', 'W', 'L']
      },
      {
        position: 7,
        team: { id: 'real-madrid', name: 'Real Madrid', shortName: 'Real Madrid', code: 'RMA', logo: '', primaryColor: '#ffffff' },
        played: 8, won: 5, draw: 0, lost: 3, goalsFor: 18, goalsAgainst: 11, goalDifference: 7, points: 15, form: ['W', 'L', 'W', 'L', 'W']
      }
    ]
  }
};
