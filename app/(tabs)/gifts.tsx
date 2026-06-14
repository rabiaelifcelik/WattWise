import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
  Modal,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import RewardCard from '@/components/ui/RewardCard';

// ─── Data ───────────-> Constant for mockup purposes
const USER_POINTS = 5000;

interface Reward {
  id: string;
  icon: 'coffee' | 'cart';
  points: number;
  description: string;
}

const REWARDS: Reward[] = [
  { id: '1',  icon: 'coffee', points: 200, description: '200 ₺ discount from Starbucks' },
  { id: '2',  icon: 'cart',   points: 500, description: '500 ₺ discount from ŞOK' },
  { id: '3',  icon: 'coffee', points: 200, description: '200 ₺ discount from Starbucks' },
  { id: '4',  icon: 'cart',   points: 500, description: '500 ₺ discount from ŞOK' },
  { id: '5',  icon: 'coffee', points: 200, description: '200 ₺ discount from Starbucks' },
  { id: '6',  icon: 'cart',   points: 500, description: '500 ₺ discount from ŞOK' },
  { id: '7',  icon: 'coffee', points: 200, description: '200 ₺ discount from Starbucks' },
  { id: '8',  icon: 'cart',   points: 500, description: '500 ₺ discount from ŞOK' },
  { id: '9',  icon: 'coffee', points: 200, description: '200 ₺ discount from Starbucks' },
  { id: '10', icon: 'cart',   points: 500, description: '500 ₺ discount from ŞOK' },
];

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function GiftsScreen() {
  const [userPoints, setUserPoints] = useState(5000);

  const handleRedeem = (points: number) => {
    setUserPoints(prev => prev - points);
  };


  // Pair rewards into rows of 2
  const rows: Reward[][] = [];
  for (let i = 0; i < REWARDS.length; i += 2) {
    rows.push(REWARDS.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      {/* Fixed header — does not scroll */}
      <Text style={styles.appTitle}>WattWise</Text>
      <View style={styles.pointsBadgeWrapper}>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>{userPoints.toLocaleString()} pts</Text>
        </View>
      </View>

      {/* Only the grid scrolls */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {rows.map((row, rowIdx) => (
            <View key={rowIdx} style={styles.row}>
              {row.map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  userPoints={userPoints}
                  onRedeem={handleRedeem}
                />
              ))}
              {row.length === 1 && <View style={{ flex: 1 }} />}
            </View>
          ))}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 14,
  },
  pointsBadgeWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pointsBadge: {
    backgroundColor: Colors.main.secondarycolor,
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  pointsText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  grid: {
    paddingHorizontal: 12,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },

});