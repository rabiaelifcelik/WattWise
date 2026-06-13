import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Chart from '@/components/ui/Chart';
import { Colors } from '@/constants/theme';

type RangeKey = '3' | '6' | '12';

interface ChartCardProps {
  key:string;
  title:string;
  range: RangeKey;
  currentMonthIdx: number; 
  data:Record<number, number>;
  target:number;
  max:number
}

// ------ Constants
const ALL_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];


// Returns array of month indices to show for a given range, centered on current month
function getMonthRange(range: RangeKey): number[] {
  const now = new Date().getMonth(); // 0-based
  if (range === '3') {
    // past month, current, next month
    return [
      (now - 1 + 12) % 12,
      now,
      (now + 1) % 12,
    ];
  }
  if (range === '6') {
    // past 2, current, next 3 (6 total)
    return Array.from({ length: 6 }, (_, i) => (now - 2 + i + 12) % 12);
  }
  // 12 months: past 6, current, next 5
  return Array.from({ length: 12 }, (_, i) => (now - 6 + i + 12) % 12);
}


export default function ChartCard({ title, range, currentMonthIdx, data, target, max }: ChartCardProps) {
  const months = getMonthRange(range);

  const selVal = data[currentMonthIdx]
  const diff = ((selVal - target) / target) * 100;
  const tooltipLabel = diff > 0
        ? `${Math.round(diff)}% over the target`
        : `${Math.round(Math.abs(diff))}% below the target`;
  const tooltipColor = diff > 0 ? Colors.main.red : Colors.main.green;
  return (
    <View style={styles.chartCard}>
      <Text style={styles.chartCardTitle}>{title}</Text>
      <Text style={[styles.chartCardAmount, { color: '#1a7a6e' }]}>{`\$${data[currentMonthIdx]}`}</Text>
      <Text style={[styles.chartCardSub, { color: tooltipColor }]}>{tooltipLabel}</Text>
      <Chart
        monthIndices={months}
        data={data}
        target={target}
        maxValue={max}
        currentMonthIdx={currentMonthIdx}
        label={title}
        month={ALL_MONTHS[currentMonthIdx]}
        totalAmount={`\$${data[currentMonthIdx]}`}
        accentColor={Colors.main.red}
      />
    </View>
  );
}

const styles = StyleSheet.create({// Chart FlatList

  // Chart card
  chartCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  chartCardTitle: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
    marginBottom: 2,
  },
  chartCardAmount: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111',
    marginBottom: 2,
  },
  chartCardSub: {
    fontSize: 12,
    color: Colors.main.red,
    marginBottom: 12,
  },})