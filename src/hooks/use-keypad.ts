"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { stations } from '@/lib/stations';
import type { Station, View } from '@/types';
import { useToast } from "@/hooks/use-toast";

const T9_MAP: { [key: string]: string } = {
  '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
  '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz',
};

const homeMenuItems = [
  { label: "Stations", view: "STATIONS" as const },
  { label: "Search", view: "SEARCH" as const },
  { label: "Presets", view: "PRESETS" as const },
];

export const useKeypad = () => {
    const [view, setView] = useState<View>('HOME');
    const [allStations] = useState<Station[]>(stations);
    const [filteredStations, setFilteredStations] = useState<Station[]>(stations);
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentStation, setCurrentStation] = useState<Station | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [presets, setPresets] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const audioRef = useRef<HTMLAudioElement>(null);
    const { toast } = useToast();

    const [lastKeyPressed, setLastKeyPressed] = useState<{ key: string; charIndex: number }>({ key: '', charIndex: 0 });
    const t9TimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        try {
            const storedPresets = localStorage.getItem('amarRadioPresets');
            if (storedPresets) {
                setPresets(JSON.parse(storedPresets));
            }
        } catch (error) {
            console.error("Could not load presets from localStorage", error);
        }
    }, []);

    const playStation = useCallback((station: Station) => {
        setCurrentStation(station);
        setView('PLAYER');
        if (audioRef.current) {
            audioRef.current.src = station.streamUrl;
            audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error("Playback failed", e));
        }
    }, []);

    const togglePlayPause = useCallback(() => {
        if (!currentStation) return;
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
        } else {
            audioRef.current?.play().then(() => setIsPlaying(true)).catch(e => console.error("Playback failed", e));
        }
    }, [isPlaying, currentStation]);
    
    const handleListNavigation = (direction: 'up' | 'down', list: any[]) => {
      if (list.length === 0) return;
      let newIndex = activeIndex;
      if (direction === 'up') {
        newIndex = (activeIndex - 1 + list.length) % list.length;
      } else {
        newIndex = (activeIndex + 1) % list.length;
      }
      setActiveIndex(newIndex);
    };

    const addToPresets = useCallback(() => {
        if (!currentStation) return;
        if (presets.includes(currentStation.id)) {
            toast({ title: "Already in Presets", description: `${currentStation.name} is already a favorite.` });
            return;
        }
        const newPresets = [...presets, currentStation.id];
        setPresets(newPresets);
        try {
            localStorage.setItem('amarRadioPresets', JSON.stringify(newPresets));
            toast({ title: "Preset Saved", description: `${currentStation.name} added to your favorites.` });
        } catch (error) {
            console.error("Could not save presets to localStorage", error);
            toast({ variant: "destructive", title: "Error", description: "Could not save preset." });
        }
    }, [currentStation, presets, toast]);
    
    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (term === '') {
            setFilteredStations(allStations);
        } else {
            setFilteredStations(allStations.filter(s => s.name.toLowerCase().includes(term.toLowerCase())));
        }
        setActiveIndex(0);
    }

    const handleKeyPress = useCallback((key: string) => {
        switch (view) {
            case 'HOME':
                if (key === 'ArrowUp') handleListNavigation('up', homeMenuItems);
                else if (key === 'ArrowDown') handleListNavigation('down', homeMenuItems);
                else if (key === 'Enter') {
                    const selectedItem = homeMenuItems[activeIndex];
                    if (selectedItem) {
                        if (selectedItem.view === 'SEARCH') {
                            setSearchTerm(''); 
                            setFilteredStations(allStations);
                        } else if (selectedItem.view === 'STATIONS') {
                            setFilteredStations(allStations);
                        } else if (selectedItem.view === 'PRESETS') {
                            const presetStations = allStations.filter(s => presets.includes(s.id));
                            setFilteredStations(presetStations);
                        }
                        setView(selectedItem.view);
                        setActiveIndex(0);
                    }
                }
                else if (key === '1') { setView('STATIONS'); setActiveIndex(0); setFilteredStations(allStations); }
                else if (key === '2') { setView('SEARCH'); setActiveIndex(0); setSearchTerm(''); setFilteredStations(allStations); }
                else if (key === '3') { 
                  const presetStations = allStations.filter(s => presets.includes(s.id));
                  setFilteredStations(presetStations);
                  setView('PRESETS'); 
                  setActiveIndex(0);
                }
                break;
            
            case 'STATIONS':
            case 'PRESETS':
                if (key === 'ArrowUp') handleListNavigation('up', filteredStations);
                else if (key === 'ArrowDown') handleListNavigation('down', filteredStations);
                else if (key === 'Enter') {
                    if (filteredStations[activeIndex]) {
                        playStation(filteredStations[activeIndex]);
                    }
                }
                else if (key === '*' || key === '#') { setView('HOME'); setActiveIndex(0); }
                break;
            case 'SEARCH':
                 if (key === 'ArrowUp') handleListNavigation('up', filteredStations);
                else if (key === 'ArrowDown') handleListNavigation('down', filteredStations);
                else if (key === 'Enter') {
                    if (filteredStations[activeIndex]) {
                        playStation(filteredStations[activeIndex]);
                    }
                }
                else if (key === '*') { setView('HOME'); setActiveIndex(0); }
                else {
                    if (key >= '2' && key <= '9') {
                        const chars = T9_MAP[key];
                        if (t9TimeoutRef.current) clearTimeout(t9TimeoutRef.current);
                        
                        let newSearchTerm = searchTerm;
                        if (lastKeyPressed.key === key) {
                            const newCharIndex = (lastKeyPressed.charIndex + 1) % chars.length;
                            newSearchTerm = searchTerm.slice(0, -1) + chars[newCharIndex];
                            setLastKeyPressed({ key, charIndex: newCharIndex });
                        } else {
                            newSearchTerm = searchTerm + chars[0];
                            setLastKeyPressed({ key, charIndex: 0 });
                        }
                        handleSearch(newSearchTerm);

                        t9TimeoutRef.current = setTimeout(() => setLastKeyPressed({ key: '', charIndex: 0 }), 1200);
                    } else if (key === '#') {
                        handleSearch(searchTerm.slice(0, -1));
                        setLastKeyPressed({ key: '', charIndex: 0 });
                        if (t9TimeoutRef.current) clearTimeout(t9TimeoutRef.current);
                    }
                }
                break;

            case 'PLAYER':
                if (key === '5') togglePlayPause();
                else if (key === '*' || key === '#') {
                    audioRef.current?.pause();
                    setIsPlaying(false);
                    const previousView = presets.includes(currentStation?.id || '') ? 'PRESETS' : 'STATIONS';
                    setView(previousView);
                }
                else if (key === '1') {
                  audioRef.current?.pause();
                  setIsPlaying(false);
                  setView('HOME');
                }
                else if(key === '7') addToPresets();
                break;
        }
    }, [view, activeIndex, filteredStations, playStation, togglePlayPause, addToPresets, allStations, presets, searchTerm, lastKeyPressed, currentStation]);

    useEffect(() => {
        const keydownHandler = (e: KeyboardEvent) => {
            e.preventDefault();
            // Map numpad keys to regular number keys
            if (e.code.startsWith('Numpad')) {
                if(e.code === 'NumpadEnter') {
                    handleKeyPress('Enter');
                    return;
                }
                if (e.code === 'NumpadMultiply') {
                    handleKeyPress('*');
                    return;
                }
                 if (e.code === 'NumpadDecimal') { 
                    handleKeyPress('#');
                    return;
                }
                const digit = e.code.replace('Numpad', '');
                handleKeyPress(digit);
            } else if (e.key === 'Backspace') {
                handleKeyPress('#');
            }
            else {
                handleKeyPress(e.key);
            }
        };
        window.addEventListener('keydown', keydownHandler);
        return () => window.removeEventListener('keydown', keydownHandler);
    }, [handleKeyPress]);

    return {
        view,
        filteredStations,
        activeIndex,
        currentStation,
        isPlaying,
        presets,
        searchTerm,
        audioRef,
        handleKeyPress,
        allStations,
        setActiveIndex,
        setFilteredStations,
        setView
    };
};
