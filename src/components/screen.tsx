
"use client";

import { HomeView } from './views/home-view';
import { StationsView } from './views/stations-view';
import { PlayerView } from './views/player-view';
import { SearchView } from './views/search-view';
import { PresetsView } from './views/presets-view';
import { useKeypad } from '@/hooks/use-keypad';
import { AnimatePresence, motion } from 'framer-motion';

type ScreenProps = ReturnType<typeof useKeypad>;

export function Screen(props: ScreenProps) {
  const renderView = () => {
    switch (props.view) {
      case 'HOME':
        return <HomeView {...props} />;
      case 'STATIONS':
        return <StationsView {...props} />;
      case 'PLAYER':
        return <PlayerView {...props} />;
      case 'SEARCH':
        return <SearchView {...props} />;
      case 'PRESETS':
        return <PresetsView {...props} />;
      default:
        return <HomeView {...props} />;
    }
  };

  return (
    <div className="flex-1 w-full bg-background overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={props.view}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full"
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
