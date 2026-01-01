import { PlaceHolderImages } from './placeholder-images';
import type { Station } from '@/types';

const imageUrls = PlaceHolderImages.filter((p) => p.id.startsWith('radio-'));

const getImageUrl = (id: string) => imageUrls.find((i) => i.id === id)?.imageUrl ?? 'https://picsum.photos/seed/default/100/100';

export const stations: Station[] = [
  { id: 's9', name: 'AIR Kolkata', streamUrl: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio055/hlspbaudio05564kbps.m3u8', logoUrl: getImageUrl('radio-9') },
  { id: 's10', name: 'Vividh Bharati', streamUrl: 'https://air.pc.cdn.bitgravity.com/air/live/pbaudio001/playlist.m3u8', logoUrl: getImageUrl('radio-10') },
  { id: 's11', name: 'AIR FM Gold (Kolkata)', streamUrl: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio057/hlspbaudio057_Auto.m3u8', logoUrl: getImageUrl('radio-11') },
];
