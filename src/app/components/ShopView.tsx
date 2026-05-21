import { useState } from 'react';
import {
  ShoppingBag,
  Star,
  CheckCircle2,
  Smile,
  Sparkles,
  Palette,
  UserRound
} from 'lucide-react';
import {
  buyShopItem,
  equipShopItem,
  getMockUser,
  type ShopItemType
} from '../mock/mockDatabase';
import {
  SHOP_ITEMS,
  getAvatarVisual,
  getBuddyVisual,
  getFrameVisual,
  getThemeVisual,
  normalizeShopItemId,
  type ShopItem
} from '../mock/shopItems';

interface ShopViewProps {
  username: string;
  ageGroup: string;
  onThemeChange?: () => void;
}

export function ShopView({ username, onThemeChange }: ShopViewProps) {
  const [userData, setUserData] = useState(() => getMockUser(username, 'child'));
  const [selectedCategory, setSelectedCategory] = useState<ShopItemType | 'all'>('all');

  const stars = userData?.careCoins ?? 240;
  const ownedItems = userData?.ownedItems ?? [];

  const equippedAvatar = normalizeShopItemId(userData?.equippedAvatar) ?? 'avatar-sunny';
  const equippedBuddy = normalizeShopItemId(userData?.equippedBuddy) ?? 'blue-buddy';
  const equippedTheme = normalizeShopItemId(userData?.equippedTheme) ?? 'default';
  const equippedFrame = normalizeShopItemId(userData?.equippedFrame) ?? 'none';

  const currentAvatar = getAvatarVisual(equippedAvatar);
  const currentBuddy = getBuddyVisual(equippedBuddy);
  const currentTheme = getThemeVisual(equippedTheme);
  const currentFrame = getFrameVisual(equippedFrame);

  const filteredItems =
    selectedCategory === 'all'
      ? SHOP_ITEMS
      : SHOP_ITEMS.filter((item) => item.type === selectedCategory);

  const isOwned = (item: ShopItem) => {
    return item.price === 0 || ownedItems.includes(item.id);
  };

  const isEquipped = (item: ShopItem) => {
    if (item.type === 'avatar') return equippedAvatar === item.id;
    if (item.type === 'buddy') return equippedBuddy === item.id;
    if (item.type === 'theme') return equippedTheme === item.id;
    if (item.type === 'frame') return equippedFrame === item.id;
    return false;
  };

  const handleItemClick = (item: ShopItem) => {
    if (!isOwned(item)) {
      const updatedAfterBuy = buyShopItem(username, item.id, item.price);
      setUserData(updatedAfterBuy);

      if ((updatedAfterBuy.ownedItems ?? []).includes(item.id)) {
        const updatedAfterEquip = equipShopItem(username, {
          id: item.id,
          type: item.type
        });

        setUserData(updatedAfterEquip);

        if (item.type === 'theme') {
          onThemeChange?.();
        }
      }

      return;
    }

    const updatedAfterEquip = equipShopItem(username, {
      id: item.id,
      type: item.type
    });

    setUserData(updatedAfterEquip);

    if (item.type === 'theme') {
      onThemeChange?.();
    }
  };

  const getCategoryIcon = (type: ShopItemType | 'all') => {
    if (type === 'avatar') return <UserRound size={18} />;
    if (type === 'buddy') return <Smile size={18} />;
    if (type === 'theme') return <Palette size={18} />;
    if (type === 'frame') return <Sparkles size={18} />;
    return <ShoppingBag size={18} />;
  };

  const getItemPreviewBorder = (item: ShopItem) => {
    if (item.type === 'avatar') return '4px solid #E2E8F0';
    if (item.type === 'frame') return getFrameVisual(item.id).border;
    return 'none';
  };

  return (
    <div
      style={{
        padding: '40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: '24px',
          marginBottom: '32px'
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #0A2E6E 0%, #14B8A6 100%)',
            borderRadius: '28px',
            padding: '34px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: '-60px',
              top: '-60px',
              width: '220px',
              height: '220px',
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '50%'
            }}
          />

          <ShoppingBag size={38} />

          <h1
            style={{
              margin: '16px 0 10px',
              fontSize: '34px',
              fontWeight: '900',
              position: 'relative'
            }}
          >
            CareQuest Shop
          </h1>

          <p
            style={{
              margin: 0,
              maxWidth: '620px',
              lineHeight: 1.6,
              opacity: 0.92,
              fontSize: '16px',
              position: 'relative'
            }}
          >
            Spend Stars on avatars, frames, buddies and calm visual themes.
          </p>
        </div>

        <div
          style={{
            background: 'white',
            borderRadius: '28px',
            padding: '28px',
            boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06)',
            border: '1px solid #E2E8F0'
          }}
        >
          <p
            style={{
              margin: '0 0 8px 0',
              fontSize: '14px',
              color: '#64748B',
              fontWeight: '800'
            }}
          >
            Your balance
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px'
            }}
          >
            <div
              style={{
                width: '58px',
                height: '58px',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F59E0B'
              }}
            >
              <Star size={32} fill="#F59E0B" />
            </div>

            <div>
              <div
                style={{
                  fontSize: '34px',
                  fontWeight: '900',
                  color: '#F59E0B'
                }}
              >
                {stars}
              </div>

              <div
                style={{
                  fontSize: '13px',
                  color: '#64748B',
                  fontWeight: '700'
                }}
              >
                Stars
              </div>
            </div>
          </div>

          <div
            style={{
              background: currentTheme.background,
              borderRadius: '20px',
              padding: '18px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                width: '78px',
                height: '78px',
                borderRadius: '50%',
                border: currentFrame.border,
                background: currentAvatar.background,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '38px',
                flexShrink: 0,
                boxShadow: '0 8px 20px rgba(15, 23, 42, 0.12)',
                transition: 'all 0.3s ease'
              }}
            >
              {currentAvatar.emoji}
            </div>

            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#64748B',
                  fontWeight: '800'
                }}
              >
                Equipped look
              </p>

              <p style={equippedLineStyle}>
                Avatar: <strong>{currentAvatar.title}</strong>
              </p>

              <p style={equippedLineStyle}>
                Frame: <strong>{currentFrame.title}</strong>
              </p>

              <p style={equippedLineStyle}>
                Buddy: <strong>{currentBuddy.title}</strong>
              </p>

              <p style={equippedLineStyle}>
                Theme: <strong>{currentTheme.title}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '26px'
        }}
      >
        {(['all', 'avatar', 'frame', 'buddy', 'theme'] as Array<ShopItemType | 'all'>).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              border: 'none',
              borderRadius: '14px',
              padding: '12px 18px',
              background:
                selectedCategory === category
                  ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)'
                  : 'white',
              color: selectedCategory === category ? 'white' : '#64748B',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)',
              textTransform: 'capitalize'
            }}
          >
            {getCategoryIcon(category)}
            {category === 'all' ? 'All items' : category}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}
      >
        {filteredItems.map((item) => {
          const owned = isOwned(item);
          const equipped = isEquipped(item);
          const canAfford = stars >= item.price;

          return (
            <div
              key={item.id}
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06)',
                border: equipped ? '3px solid #14B8A6' : '1px solid #E2E8F0',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(15, 23, 42, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(15, 23, 42, 0.06)';
              }}
            >
              {equipped && (
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: '#DCFCE7',
                    color: '#15803D',
                    borderRadius: '999px',
                    padding: '6px 10px',
                    fontSize: '12px',
                    fontWeight: '900',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <CheckCircle2 size={14} />
                  Equipped
                </div>
              )}

              <div
                style={{
                  width: '86px',
                  height: '86px',
                  borderRadius: item.type === 'avatar' ? '50%' : '24px',
                  border: getItemPreviewBorder(item),
                  background: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '44px',
                  marginBottom: '18px',
                  boxSizing: 'border-box'
                }}
              >
                {item.icon}
              </div>

              <p
                style={{
                  margin: '0 0 8px',
                  fontSize: '13px',
                  color: '#64748B',
                  fontWeight: '900',
                  textTransform: 'capitalize',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {getCategoryIcon(item.type)}
                {item.type}
              </p>

              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '900',
                  color: '#1E293B',
                  margin: '0 0 8px'
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  color: '#64748B',
                  lineHeight: 1.5,
                  minHeight: '42px',
                  marginBottom: '18px'
                }}
              >
                {item.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: item.price === 0 ? '#10B981' : '#F59E0B',
                    fontWeight: '900'
                  }}
                >
                  <Star size={18} fill={item.price === 0 ? '#10B981' : '#F59E0B'} />
                  {item.price === 0 ? 'Free' : item.price}
                </div>

                <button
                  onClick={() => handleItemClick(item)}
                  disabled={!owned && !canAfford}
                  style={{
                    border: 'none',
                    borderRadius: '14px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: '900',
                    cursor: !owned && !canAfford ? 'not-allowed' : 'pointer',
                    background: equipped
                      ? '#DCFCE7'
                      : !owned && !canAfford
                        ? '#E2E8F0'
                        : 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
                    color: equipped
                      ? '#15803D'
                      : !owned && !canAfford
                        ? '#94A3B8'
                        : 'white'
                  }}
                >
                  {equipped
                    ? 'Equipped'
                    : owned
                      ? 'Equip'
                      : canAfford
                        ? 'Buy'
                        : 'Not enough'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const equippedLineStyle = {
  margin: '5px 0 0',
  fontSize: '14px',
  color: '#1E293B'
};
