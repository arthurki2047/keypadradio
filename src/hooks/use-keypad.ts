
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

const INACTIVITY_TIMEOUT = 30000; // 30 seconds

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

    const [isScreenOn, setIsScreenOn] = useState(true);
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

    const resetInactivityTimer = useCallback(() => {
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }
        inactivityTimerRef.current = setTimeout(() => {
            setIsScreenOn(false);
        }, INACTIVITY_TIMEOUT);
    }, []);

    const wakeScreen = useCallback(() => {
        if (!isScreenOn) {
            setIsScreenOn(true);
            resetInactivityTimer();
            return true; // Screen was woken up
        }
        resetInactivityTimer();
        return false; // Screen was already on
    }, [isScreenOn, resetInactivityTimer]);


    useEffect(() => {
        resetInactivityTimer();
        return () => {
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
        };
    }, [resetInactivityTimer]);

    const updateMediaSession = useCallback((station: Station | null, playing: boolean) => {
        if ('mediaSession' in navigator) {
            if (!station) {
                navigator.mediaSession.metadata = null;
                navigator.mediaSession.playbackState = 'none';
                return;
            }

            navigator.mediaSession.metadata = new MediaMetadata({
                title: station.name,
                artist: 'Amar Radio',
                artwork: [
                    { src: station.logoUrl, sizes: '128x128', type: 'image/png' },
                ],
            });
            navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
            
            navigator.mediaSession.setActionHandler('previoustrack', playPrevious);
            navigator.mediaSession.setActionHandler('nexttrack', playNext);
        }
    }, []);

    useEffect(() => {
        try {
            const storedPresets = localStorage.getItem('amarRadioPresets');
            if (storedPresets) {
                setPresets(JSON.parse(storedPresets));
            }
        } catch (error) {
            console.error("Could not load presets from localStorage", error);
        }

        if ('mediaSession' in navigator) {
            navigator.mediaSession.setActionHandler('play', () => togglePlayPause());
            navigator.mediaSession.setActionHandler('pause', () => togglePlayPause());
        }

        return () => {
             if ('mediaSession' in navigator) {
                navigator.mediaSession.setActionHandler('play', null);
                navigator.mediaSession.setActionHandler('pause', null);
                navigator.mediaSession.setActionHandler('previoustrack', null);
                navigator.mediaSession.setActionHandler('nexttrack', null);
            }
        }
    }, []);

    const playStation = useCallback((station: Station) => {
        if (audioRef.current) {
            audioRef.current.src = station.streamUrl;
            audioRef.current.load();
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                    updateMediaSession(station, true);
                }).catch(e => {
                    console.error("Playback failed", e);
                    setIsPlaying(false);
                    updateMediaSession(station, false);
                });
            }
            setCurrentStation(station);
            setView('PLAYER');
        }
    }, [updateMediaSession]);

    const handleCanPlay = () => {
        if (audioRef.current && audioRef.current.paused && view === 'PLAYER' && currentStation) {
             const playPromise = audioRef.current.play();
             if (playPromise !== undefined) {
                 playPromise.then(() => {
                    setIsPlaying(true);
                    updateMediaSession(currentStation, true);
                 }).catch(e => {
                    console.error("Playback failed on canplay", e);
                    setIsPlaying(false);
                    updateMediaSession(currentStation, false);
                 });
             }
        }
    };
    
    const togglePlayPause = useCallback(() => {
        if (!currentStation) return;
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
            updateMediaSession(currentStation, false);
        } else {
             if (audioRef.current) {
                // If src is not set, set it first
                if (audioRef.current.src !== currentStation.streamUrl) {
                    audioRef.current.src = currentStation.streamUrl;
                    audioRef.current.load();
                }
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        setIsPlaying(true);
                        updateMediaSession(currentStation, true);
                    }).catch(e => {
                        console.error("Playback failed on toggle", e);
                        setIsPlaying(false);
                        updateMediaSession(currentStation, false);
                    });
                }
            }
        }
    }, [isPlaying, currentStation, updateMediaSession]);
    
    const playNext = useCallback(() => {
        if (!currentStation || filteredStations.length === 0) return;
        const currentIndex = filteredStations.findIndex(s => s.id === currentStation.id);
        const nextIndex = (currentIndex + 1) % filteredStations.length;
        playStation(filteredStations[nextIndex]);
    }, [currentStation, filteredStations, playStation]);

    const playPrevious = useCallback(() => {
        if (!currentStation || filteredStations.length === 0) return;
        const currentIndex = filteredStations.findIndex(s => s.id === currentStation.id);
        const prevIndex = (currentIndex - 1 + filteredStations.length) % filteredStations.length;
        playStation(filteredStations[prevIndex]);
    }, [currentStation, filteredStations, playStation]);
    
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
        if (wakeScreen()) {
            return;
        }

        switch (view) {
            case 'HOME':
                if (key === 'ArrowUp') handleListNavigation('up', homeMenuItems);
                else if (key === 'ArrowDown') handleListNavigation('down', homeMenuItems);
                else if (key === 'Enter' || (key >= '1' && key <= '3')) {
                    let targetIndex = activeIndex;
                    if (key >= '1' && key <= '3') {
                        targetIndex = parseInt(key) - 1;
                    }

                    const selectedItem = homeMenuItems[targetIndex];
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
                } else if (key === 'ArrowLeft' || key === '*') {
                    // Go back from home is not a feature
                }
                break;
            
            case 'STATIONS':
            case 'PRESETS':
            case 'SEARCH':
                if (key === 'ArrowUp') handleListNavigation('up', filteredStations);
                else if (key === 'ArrowDown') handleListNavigation('down', filteredStations);
                else if (key === 'Enter') {
                    if (filteredStations[activeIndex]) {
                        playStation(filteredStations[activeIndex]);
                    }
                }
                else if (key === 'ArrowLeft' || key === '*' || key === '#') { setView('HOME'); setActiveIndex(0); }
                else if (view === 'SEARCH') {
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
                if (key === '5' || key === 'Enter') togglePlayPause();
                else if (key === 'ArrowUp') playPrevious();
                else if (key === 'ArrowDown') playNext();
                else if (key === 'ArrowRight') playNext();
                else if (key === 'ArrowLeft' || key === '*') {
                    const previousList = currentStation && presets.includes(currentStation.id) ? 'PRESETS' : 'STATIONS';
                    setView(previousList);
                }
                else if (key === '1') {
                  setView('HOME');
                }
                else if(key === '7') addToPresets();
                break;
        }
    }, [view, activeIndex, filteredStations, playStation, togglePlayPause, addToPresets, allStations, presets, searchTerm, lastKeyPressed, currentStation, updateMediaSession, playNext, playPrevious, wakeScreen]);

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
        isScreenOn,
        handleKeyPress,
        handleCanPlay,
        allStations,
        setActiveIndex,
        setFilteredStations,
        setView,
        togglePlayPause,
        playNext,
        playPrevious,
    };
};
