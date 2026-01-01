import { PlaceHolderImages } from './placeholder-images';
import type { Station } from '@/types';

const imageUrls = PlaceHolderImages.filter((p) => p.id.startsWith('radio-'));

const getImageUrl = (id: string) => imageUrls.find((i) => i.id === id)?.imageUrl ?? 'https://picsum.photos/seed/default/100/100';

export const stations: Station[] = [
  { id: 's1', name: 'Radio Foorti', streamUrl: 'https://stream.zeno.fm/g0hr20h36p8uv', logoUrl: getImageUrl('radio-1') },
  { id: 's2', name: 'ABC Radio', streamUrl: 'https://stream.zeno.fm/xkvubg60v68uv', logoUrl: getImageUrl('radio-2') },
  { id: 's3', name: 'Dhaka FM', streamUrl: 'https://stream.zeno.fm/4vw6510yv68uv', logoUrl: getImageUrl('radio-3') },
  { id: 's4', name: 'Radio Today', streamUrl: 'https://stream.zeno.fm/y1g4qmyyv68uv', logoUrl: getImageUrl('radio-4') },
  { id: 's5', name: 'Jago FM', streamUrl: 'https://stream.zeno.fm/scb7p11yv68uv', logoUrl: getImageUrl('radio-5') },
  { id: 's6', name: 'Colours FM', streamUrl: 'https://stream.zeno.fm/q5p7u4g0v68uv', logoUrl: getImageUrl('radio-6') },
  { id: 's7', name: 'Capital FM', streamUrl: 'https://stream.zeno.fm/k2k1vmyyv68uv', logoUrl: getImageUrl('radio-7') },
  { id: 's8', name: 'Bangla Radio', streamUrl: 'https://stream.zeno.fm/1f4dnhg0v68uv', logoUrl: getImageUrl('radio-8') },
  { id: 's9', name: 'AIR Kolkata', streamUrl: 'http://air.pc.cdn.bitgravity.com/air/live/pbaudio169/playlist.m3u8', logoUrl: getImageUrl('radio-9') },
  { id: 's10', name: 'Vividh Bharati', streamUrl: 'http://202.143.99.95:8000/stream', logoUrl: getImageUrl('radio-10') },
  { id: 's11', name: 'AIR FM Gold (Kolkata)', streamUrl: 'http://103.120.125.13:8000/live', logoUrl: getImageUrl('radio-11') },
  { id: 's12', name: 'AIR Murshidabad', streamUrl: 'http://air.pc.cdn.bitgravity.com/air/live/pbaudio169/playlist.m3u8', logoUrl: getImageUrl('radio-12') },
  { id: 's13', name: 'Air Rainbow 107 Kolkata', streamUrl: 'http://103.120.125.13:8000/live', logoUrl: getImageUrl('radio-13') },
  { id: 's14', name: 'Kolkata - Geetanjali', streamUrl: 'http://103.120.125.13:8000/live', logoUrl: getImageUrl('radio-14') },
];
