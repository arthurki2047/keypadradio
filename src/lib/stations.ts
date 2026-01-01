import { PlaceHolderImages } from './placeholder-images';
import type { Station } from '@/types';

const imageUrls = PlaceHolderImages.filter((p) => p.id.startsWith('radio-'));

const getImageUrl = (id: string) => imageUrls.find((i) => i.id === id)?.imageUrl ?? 'https://picsum.photos/seed/default/100/100';

export const stations: Station[] = [
  { id: 's1', name: 'Radio Foorti', streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', logoUrl: getImageUrl('radio-1') },
  { id: 's2', name: 'ABC Radio', streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', logoUrl: getImageUrl('radio-2') },
  { id: 's3', name: 'Dhaka FM', streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', logoUrl: getImageUrl('radio-3') },
  { id: 's4', name: 'Radio Today', streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', logoUrl: getImageUrl('radio-4') },
  { id: 's5', name: 'Jago FM', streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', logoUrl: getImageUrl('radio-5') },
  { id: 's6', name: 'Colours FM', streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', logoUrl: getImageUrl('radio-6') },
  { id: 's7', name: 'Capital FM', streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', logoUrl: getImageUrl('radio-7') },
  { id: 's8', name: 'Bangla Radio', streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', logoUrl: getImageUrl('radio-8') },
  { id: 's9', name: 'AIR Kolkata', streamUrl: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio055/hlspbaudio05564kbps.m3u8', logoUrl: getImageUrl('radio-9') },
];
