import type { ShopItemType } from './mockDatabase';

export interface ShopItem {
  id: string;
  type: ShopItemType;
  title: string;
  description: string;
  icon: string;
  price: number;
  color: string;
  isFree?: boolean;
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'avatar-sunny',
    type: 'avatar',
    title: 'Sunny Avatar',
    description: 'A friendly default avatar for everyday learning.',
    icon: '😊',
    price: 0,
    color: '#FEF3C7',
    isFree: true
  },
  {
    id: 'avatar-artist',
    type: 'avatar',
    title: 'Artist Avatar',
    description: 'Perfect for drawing, design and creative activities.',
    icon: '🎨',
    price: 90,
    color: '#FCE7F3'
  },
  {
    id: 'avatar-robot',
    type: 'avatar',
    title: 'Robot Avatar',
    description: 'A tech-style avatar for coding and problem-solving quests.',
    icon: '🤖',
    price: 120,
    color: '#EDE9FE'
  },
  {
    id: 'avatar-space',
    type: 'avatar',
    title: 'Space Avatar',
    description: 'For explorers, builders and big ideas.',
    icon: '🚀',
    price: 130,
    color: '#DBEAFE'
  },
  {
    id: 'avatar-gamer',
    type: 'avatar',
    title: 'Neon Gamer',
    description: 'For champions of digital worlds and esports battles.',
    icon: '🎮',
    price: 150,
    color: '#E0F2FE'
  },
  {
    id: 'avatar-dj',
    type: 'avatar',
    title: 'Cyber DJ',
    description: 'Turn up the volume and share your rhythm.',
    icon: '🎧',
    price: 140,
    color: '#F5F3FF'
  },
  {
    id: 'avatar-cat',
    type: 'avatar',
    title: 'Pixel Cat',
    description: 'A retro companion full of curiosity and luck.',
    icon: '🐱',
    price: 110,
    color: '#ECFEFF'
  },
  {
    id: 'avatar-detective',
    type: 'avatar',
    title: 'Super Sleuth',
    description: 'Find hidden clues and solve creative puzzles.',
    icon: '🔍',
    price: 160,
    color: '#EFF6FF'
  },
  {
    id: 'avatar-wizard',
    type: 'avatar',
    title: 'Magic Sorcerer',
    description: 'For imagination, courage and fantastic stories.',
    icon: '🔮',
    price: 180,
    color: '#FAF5FF'
  },
  {
    id: 'avatar-phoenix',
    type: 'avatar',
    title: 'Rising Phoenix',
    description: 'A symbol of strength, energy and bright recovery.',
    icon: '🔥',
    price: 200,
    color: '#FFF7ED'
  },

  {
    id: 'blue-buddy',
    type: 'buddy',
    title: 'Blue Buddy',
    description: 'A calm helper friend for your dashboard.',
    icon: '💙',
    price: 0,
    color: '#DBEAFE',
    isFree: true
  },
  {
    id: 'star-buddy',
    type: 'buddy',
    title: 'Star Buddy',
    description: 'A cheerful buddy that celebrates your progress.',
    icon: '⭐',
    price: 80,
    color: '#FEF3C7'
  },
  {
    id: 'robot-buddy',
    type: 'buddy',
    title: 'Robot Buddy',
    description: 'A tiny tech friend for problem-solving.',
    icon: '🤖',
    price: 120,
    color: '#EDE9FE'
  },

  {
    id: 'none',
    type: 'frame',
    title: 'No Frame',
    description: 'Clean avatar without decoration.',
    icon: '⚪',
    price: 0,
    color: '#F8FAFC',
    isFree: true
  },
  {
    id: 'frame-rainbow',
    type: 'frame',
    title: 'Rainbow Frame',
    description: 'Bring a bright splash of colors to your profile.',
    icon: '🌈',
    price: 100,
    color: '#FCE7F3'
  },
  {
    id: 'frame-gold',
    type: 'frame',
    title: 'Gold Frame',
    description: 'A shiny, premium border for top achievers.',
    icon: '🏆',
    price: 250,
    color: '#FEF3C7'
  },
  {
    id: 'frame-heart',
    type: 'frame',
    title: 'Heart Frame',
    description: 'Filled with warm energy, kindness and love.',
    icon: '💖',
    price: 150,
    color: '#FCE7F3'
  },

  {
    id: 'default',
    type: 'theme',
    title: 'Default Theme',
    description: 'Original CareQuest colors.',
    icon: '✨',
    price: 0,
    color: '#F0FDFA',
    isFree: true
  },
  {
    id: 'ocean-theme',
    type: 'theme',
    title: 'Ocean Theme',
    description: 'Soft blue colors inspired by calm water.',
    icon: '🌊',
    price: 100,
    color: '#E0F2FE'
  },
  {
    id: 'sunset-theme',
    type: 'theme',
    title: 'Sunset Theme',
    description: 'Warm and cozy pastel colors.',
    icon: '🌅',
    price: 100,
    color: '#FFEDD5'
  },
  {
    id: 'nature-theme',
    type: 'theme',
    title: 'Nature Theme',
    description: 'Fresh green accents and a calm nature look.',
    icon: '🌿',
    price: 100,
    color: '#DCFCE7'
  }
];

export function normalizeShopItemId(id?: string) {
  if (!id) return id;

  const legacyMap: Record<string, string> = {
    'rainbow-frame': 'frame-rainbow',
    'gold-frame': 'frame-gold',
    'heart-frame': 'frame-heart'
  };

  return legacyMap[id] ?? id;
}

export function getShopItemById(id?: string) {
  const normalizedId = normalizeShopItemId(id);
  return SHOP_ITEMS.find((item) => item.id === normalizedId);
}

export function getShopItemsByType(type: ShopItemType) {
  return SHOP_ITEMS.filter((item) => item.type === type);
}

export function getAvatarVisual(id?: string) {
  const item = getShopItemById(id) ?? getShopItemById('avatar-sunny');

  return {
    id: item?.id ?? 'avatar-sunny',
    title: item?.title ?? 'Sunny Avatar',
    emoji: item?.icon ?? '😊',
    background: item?.color ?? '#FEF3C7'
  };
}

export function getBuddyVisual(id?: string) {
  const item = getShopItemById(id) ?? getShopItemById('blue-buddy');

  return {
    id: item?.id ?? 'blue-buddy',
    title: item?.title ?? 'Blue Buddy',
    emoji: item?.icon ?? '💙',
    background: item?.color ?? '#DBEAFE'
  };
}

export function getFrameVisual(id?: string) {
  const normalizedId = normalizeShopItemId(id) ?? 'none';
  const item = getShopItemById(normalizedId) ?? getShopItemById('none');

  const borders: Record<string, string> = {
    none: '5px solid #E2E8F0',
    'frame-rainbow': '5px solid #FF6B9D',
    'frame-gold': '5px solid #F59E0B',
    'frame-heart': '5px solid #EC4899'
  };

  return {
    id: item?.id ?? 'none',
    title: item?.title ?? 'No Frame',
    emoji: item?.icon ?? '⚪',
    background: item?.color ?? '#F8FAFC',
    border: borders[item?.id ?? 'none'] ?? borders.none
  };
}

export function getThemeVisual(id?: string) {
  const item = getShopItemById(id) ?? getShopItemById('default');

  const backgrounds: Record<string, string> = {
    default: 'linear-gradient(135deg, #EBF8FF 0%, #F0F9FF 100%)',
    'ocean-theme': 'linear-gradient(135deg, #E0F7FA 0%, #DBEAFE 45%, #F0FDFA 100%)',
    'sunset-theme': 'linear-gradient(135deg, #FFF7ED 0%, #FFE4E6 50%, #FEF3C7 100%)',
    'nature-theme': 'linear-gradient(135deg, #ECFDF5 0%, #DCFCE7 50%, #F0FDFA 100%)'
  };

  return {
    id: item?.id ?? 'default',
    title: item?.title ?? 'Default Theme',
    emoji: item?.icon ?? '✨',
    background: backgrounds[item?.id ?? 'default'] ?? backgrounds.default
  };
}
