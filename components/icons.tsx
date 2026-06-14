import {
  View,
  StyleSheet,
} from 'react-native';
import { IconSymbol } from './ui/icon-symbol';

const TEAL = '#2a9d8f';
const TEAL_DARK = '#1a7a6e';
const RED = '#e03a2f';

// ─── Icons ────────────────────────────────────────────────────────────────────
export function CoffeeIcon() {
  return (
    <View style={iconStyles.wrapper}>
      {/* Cup body */}
      <View style={iconStyles.cupBody}>
        {/* Handle */}
        <View style={iconStyles.cupHandle} />
      </View>
      {/* Saucer */}
      <View style={iconStyles.saucer} />
    </View>
  );
}

export function CartIcon() {
  return (
    <View style={iconStyles.wrapper}>
      {/* Cart body */}
      <IconSymbol size={60} name="basket.fill" color={TEAL_DARK}/>
    </View>
  );
}

// ─── Download Icon ────────────────────────────────────────────────────────────
export function DownloadIcon() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: 22, height: 22 }}>
      {/* Arrow shaft */}
      <View style={{ width: 2, height: 10, backgroundColor: '#fff', borderRadius: 1 }} />
      {/* Arrow head */}
      <View style={{ width: 0, height: 0, borderLeftWidth: 5, borderRightWidth: 5, borderTopWidth: 6, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#fff', marginTop: -1 }} />
      {/* Base line */}
      <View style={{ width: 14, height: 2, backgroundColor: '#fff', borderRadius: 1, marginTop: 2 }} />
    </View>
  );
}

// ─── Logout Icon ──────────────────────────────────────────────────────────────
export function LogoutIcon() {
  return (
    <View style={{ width: 22, height: 22, alignItems: 'center', justifyContent: 'center' }}>
      {/* Arrow pointing right */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 12, height: 2, backgroundColor: '#fff', borderRadius: 1 }} />
        <View style={{ width: 0, height: 0, borderLeftWidth: 5, borderTopWidth: 4, borderBottomWidth: 4, borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: '#fff' }} />
      </View>
      {/* Arc (simulated with border) */}
      <View style={{ position: 'absolute', width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#fff', borderRightColor: 'transparent', transform: [{ rotate: '45deg' }] }} />
    </View>
  );
}

// ─── Trash Icon ───────────────────────────────────────────────────────────────
export function TrashIcon() {
  return (
    <View style={{ width: 18, height: 20, alignItems: 'center' }}>
      {/* Lid */}
      <View style={{ width: 18, height: 3, backgroundColor: RED, borderRadius: 1, marginBottom: 1 }}>
        <View style={{ position: 'absolute', top: -4, left: 5, width: 8, height: 4, backgroundColor: RED, borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
      </View>
      {/* Body */}
      <View style={{ width: 14, height: 13, backgroundColor: RED, borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }}>
        {/* Lines */}
        {[3, 7, 11].map((x) => (
          <View key={x} style={{ position: 'absolute', left: x, top: 2, bottom: 2, width: 1.5, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 1 }} />
        ))}
      </View>
    </View>
  );
}

// ─── Edit Icon ────────────────────────────────────────────────────────────────
export function EditIcon() {
  return (
    <View style={{ width: 16, height: 16, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: 10, height: 10, borderWidth: 1.5, borderColor: TEAL, transform: [{ rotate: '45deg' }], borderRadius: 1 }} />
      <View style={{ position: 'absolute', bottom: 0, right: 0, width: 5, height: 2, backgroundColor: TEAL, borderRadius: 1 }} />
    </View>
  );
}


const iconStyles = StyleSheet.create({
  wrapper: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Coffee
  cupBody: {
    width: 36,
    height: 28,
    backgroundColor: TEAL,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    position: 'relative',
  },
  cupHandle: {
    position: 'absolute',
    right: -10,
    top: 6,
    width: 10,
    height: 14,
    borderWidth: 3,
    borderColor: TEAL,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  saucer: {
    width: 44,
    height: 6,
    backgroundColor: TEAL,
    borderRadius: 3,
    marginTop: 3,
  },
  // Cart
  cartBody: {
    width: 34,
    height: 24,
    backgroundColor: TEAL,
    borderRadius: 3,
    position: 'relative',
  },
  cartFront: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: TEAL_DARK,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  cartHandle: {
    position: 'absolute',
    top: 2,
    right: -10,
    width: 12,
    height: 18,
    borderWidth: 3,
    borderColor: TEAL,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  wheelsRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 4,
  },
  wheel: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: TEAL,
  },
});