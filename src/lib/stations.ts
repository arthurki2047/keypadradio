import { PlaceHolderImages } from './placeholder-images';
import type { Station } from '@/types';

const imageUrls = PlaceHolderImages.filter((p) => p.id.startsWith('radio-'));

const getImageUrl = (id: string) => imageUrls.find((i) => i.id === id)?.imageUrl ?? 'https://picsum.photos/seed/default/100/100';

export const stations: Station[] = [
  { id: 's9', name: 'Vividh Bharati', streamUrl: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio055/hlspbaudio05564kbps.m3u8', logoUrl: getImageUrl('radio-9') },
  { id: 's10', name: 'Live News 24x7', streamUrl: 'https://air.pc.cdn.bitgravity.com/air/live/pbaudio001/playlist.m3u8', logoUrl: getImageUrl('radio-10') },
];
