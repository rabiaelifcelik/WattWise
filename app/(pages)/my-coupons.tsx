import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Coupon {
  id: string;
  title: string;
  details: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const COUPONS: Coupon[] = [
  {
    id: '1',
    title: '500₺ discount - ŞOK market',
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '2',
    title: '200₺ discount - Starbucks',
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: '3',
    title: '500₺ discount - ŞOK market',
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
];

// ─── Barcode (simulated with lines) ──────────────────────────────────────────
function Barcode() {
  const bars = [
    3, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2,
    1, 3, 2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2,
    1, 3, 2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2,
    1, 3, 2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2,
    1, 3, 2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2,
    1, 3, 2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2,
    1, 3, 2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2,
    1, 3, 2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2,
    1, 3, 2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2,
  ];
  return (
    <View style={barcodeStyles.container}>
      {bars.map((w, i) => (
        <View
          key={i}
          style={[
            barcodeStyles.bar,
            {
              width: w,
              backgroundColor: i % 2 === 0 ? '#111' : '#fff',
            },
          ]}
        />
      ))}
    </View>
  );
}

const barcodeStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'stretch',
    width: '100%',
    paddingHorizontal: 8,
  },
  bar: {
    flex: 0,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

// ─── Details Modal ────────────────────────────────────────────────────────────
function DetailsModal({coupon, onClose,}: {coupon: Coupon | null;onClose: () => void;}) {
  if (!coupon) return null;
  return (
    <Modal transparent animationType="fade" visible={!!coupon} onRequestClose={onClose}>
      <View style={modalStyles.overlay}>
        <View style={modalStyles.box}>
          {/* Three dots / drag handle */}
          <View style={modalStyles.dotsRow}>
            <TouchableOpacity onPress={() => onClose()}>
              <IconSymbol size={28} name="xmark" color='#000' />
            </TouchableOpacity>
          </View>

          <Text style={modalStyles.title}>Terms of Offer</Text>
          <ScrollView style={modalStyles.scrollBody} showsVerticalScrollIndicator={false}>
            <Text style={modalStyles.body}>{coupon.details}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// ─── Use Coupon Modal ─────────────────────────────────────────────────────────
function UseCouponModal({coupon,onClose,}: {coupon: Coupon | null; onClose: () => void;}) {
  if (!coupon) return null;
  return (
    <Modal transparent animationType="fade" visible={!!coupon} onRequestClose={onClose}>
      <View style={modalStyles.overlay}>
        <View style={modalStyles.box}>
          {/* Three dots */}
          <View style={modalStyles.dotsRow}>
            <TouchableOpacity onPress={() => onClose()}>
              <IconSymbol size={28} name="xmark" color='#000' />
            </TouchableOpacity>
          </View>
          
          

          <Text style={modalStyles.title}>Use Offer</Text>
          <Text style={modalStyles.subtitle}>{coupon.title}</Text>

          <View style={modalStyles.barcodeWrapper}>
            <Barcode />
          </View>

          <Text style={modalStyles.scanText}>Scan the code to redeem.</Text>
        </View>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 340,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 14,
    alignSelf: 'flex-end',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#aaa',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.main.primarycolor,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  scrollBody: {
    maxHeight: 220,
    width: '100%',
  },
  body: {
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
  },
  barcodeWrapper: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  scanText: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
  },
});

// ─── Coupon Row ───────────────────────────────────────────────────────────────
function CouponRow({
  coupon,
  onViewDetails,
  onUse,
}: {
  coupon: Coupon;
  onViewDetails: (c: Coupon) => void;
  onUse: (c: Coupon) => void;
}) {
  return (
    <View style={rowStyles.card}>
      <View style={rowStyles.left}>
        <Text style={rowStyles.title}>{coupon.title}</Text>
        <TouchableOpacity onPress={() => onViewDetails(coupon)}>
          <Text style={rowStyles.viewDetails}>view details</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={rowStyles.useBtn} onPress={() => onUse(coupon)} activeOpacity={0.85}>
        <Text style={rowStyles.useBtnText}>Use</Text>
      </TouchableOpacity>
    </View>
  );
}

const rowStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  left: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    marginBottom: 3,
  },
  viewDetails: {
    fontSize: 11,
    color: '#aaa',
    textDecorationLine: 'underline',
  },
  useBtn: {
    backgroundColor: Colors.main.primarycolor,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  useBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function MyCouponsScreen() {
  const [detailsCoupon, setDetailsCoupon] = useState<Coupon | null>(null);
  const [useCoupon, setUseCoupon] = useState<Coupon | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.appTitle}>Wattwise</Text>
      </View>

      {/* Section title */}
      <Text style={styles.sectionTitle}>Available Coupons</Text>

      {/* Scrollable coupon list */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {COUPONS.map((coupon) => (
          <CouponRow
            key={coupon.id}
            coupon={coupon}
            onViewDetails={setDetailsCoupon}
            onUse={setUseCoupon}
          />
        ))}
      </ScrollView>

      {/* Details modal */}
      <DetailsModal coupon={detailsCoupon} onClose={() => setDetailsCoupon(null)} />

      {/* Use coupon modal */}
      <UseCouponModal coupon={useCoupon} onClose={() => setUseCoupon(null)} />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  backBtn: {
    marginRight: 8,
    padding: 4,
  },
  backArrow: {
    fontSize: 32,
    color: '#111',
    lineHeight: 32,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.main.primarycolor,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 14,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});