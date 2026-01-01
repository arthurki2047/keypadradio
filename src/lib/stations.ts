import { PlaceHolderImages } from './placeholder-images';
import type { Station } from '@/types';

const imageUrls = PlaceHolderImages.filter((p) => p.id.startsWith('radio-'));

const getImageUrl = (id: string) => imageUrls.find((i) => i.id === id)?.imageUrl ?? 'https://picsum.photos/seed/default/100/100';

export const stations: Station[] = [
  { id: 's1', name: 'Radio Foorti', streamUrl: 'http://103.108.140.38:8000/radiofoorti-88.0', logoUrl: getImageUrl('radio-1') },
  { id: 's2', name: 'ABC Radio', streamUrl: 'http://118.179.219.244:8000/stream', logoUrl: getImageUrl('radio-2') },
  { id: 's3', name: 'Dhaka FM', streamUrl: 'http://172.104.183.13:8000/stream', logoUrl: getImageUrl('radio-3') },
  { id: 's4', name: 'Radio Today', streamUrl: 'http://118.179.219.244:8000/stream', logoUrl: getImageUrl('radio-4') },
  { id: 's5', name: 'Jago FM', streamUrl: 'http://118.179.219.244:8000/stream', logoUrl: getImageUrl('radio-5') },
  { id: 's6', name: 'Colours FM', streamUrl: 'http://118.179.219.244:8000/stream', logoUrl: getImageUrl('radio-6') },
  { id: 's7', name: 'Capital FM', streamUrl: 'http://118.179.219.244:8000/stream', logoUrl: getImageUrl('radio-7') },
  { id: 's8', name: 'Bangla Radio', streamUrl: 'http://118.179.219.244:8000/stream', logoUrl: getImageUrl('radio-8') },
  { id: 's9', name: 'AIR Kolkata', streamUrl: 'http://air.pc.cdn.bitgravity.com/air/live/pbaudio169/playlist.m3u8', logoUrl: getImageUrl('radio-9') },
  { id: 's10', name: 'Vividh Bharati', streamUrl: 'http://202.143.99.95:8000/stream', logoUrl: getImageUrl('radio-10') },
  { id: 's11', name: 'AIR FM Gold (Kolkata)', streamUrl: 'http://103.120.125.13:8000/live', logoUrl: getImageUrl('radio-11') },
  { id: 's12', name: 'AIR Murshidabad', streamUrl: 'http://air.pc.cdn.bitgravity.com/air/live/pbaudio169/playlist.m3u8', logoUrl: getImageUrl('radio-12') },
  { id: 's13', name: 'Air Rainbow 107 Kolkata', streamUrl: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio058/hlspbaudio05864kbps.m3u8', logoUrl: getImageUrl('radio-13') },
  { id: 's14', name: 'Kolkata - Geetanjali', streamUrl: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio055/hlspbaudio05564kbps.m3u8', logoUrl: getImageUrl('radio-14') },
];
