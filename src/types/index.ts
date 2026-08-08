export interface Station {
  id: string;
  name: string;
  streamUrl: string;
  logoUrl: string;
}

export type View = 'HOME' | 'STATIONS' | 'PLAYER' | 'SEARCH' | 'FAVORITES' | 'GUIDE';
