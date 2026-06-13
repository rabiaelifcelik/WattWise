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

import { Colors } from '@/constants/theme';
import ChartCard from '@/components/ui/ChartCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


// ─── Chart constants ──────────────────────────────────────────────────────────

const TARGET_ELECTRICITY = 143; // ~$143 target
const TARGET_WATER = 100;        // ~$60 target
const MAX_ELECTRICITY = 220;
const MAX_WATER = 120;

// ─── Data ─────────────────────────────────────────────────────────────────────
// Simulated electricity data indexed by month (0=Jan)
const ELECTRICITY_DATA: Record<number, number> = {
  0: 140, 1: 90, 2: 200, 3: 0, 4: 0, 5: 0,
  6: 0, 7: 0, 8: 130, 9: 160, 10: 75, 11: 190,
};

// Simulated water data indexed by month (0=Jan)
const WATER_DATA: Record<number, number> = {
  0: 55, 1: 40, 2: 80, 3: 0, 4: 0, 5: 0,
  6: 0, 7: 0, 8: 60, 9: 75, 10: 35, 11: 90,
};

const SUGGESTIONS = [
  'Close the tap while brushing teeth',
  'Switch to LED lighting throughout your home',
  'Unplug devices when not in use',
  'Use a smart thermostat to reduce heating costs',
  'Run dishwasher and laundry on off-peak hours',
  'Fix dripping taps — they waste more than you think',
];

type RangeKey = '3' | '6' | '12';

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function DashboardScreen() {
  const [range, setRange] = useState<RangeKey>('6');
  const [chartPage, setChartPage] = useState(0);
  const chartFlatRef = useRef<FlatList>(null);
  const currentMonthIdx = new Date().getMonth();

  const charts = [
    <ChartCard 
      key='elem' 
      title='Electricty' 
      range={range}
      currentMonthIdx={currentMonthIdx}
      data={ELECTRICITY_DATA}
      target={TARGET_ELECTRICITY}
      max={MAX_ELECTRICITY}
    />,

    <ChartCard 
      key='water' 
      title='Water' 
      range={range}
      currentMonthIdx={currentMonthIdx}
      data={WATER_DATA}
      target={TARGET_WATER}
      max={MAX_WATER}
    />,
  ];

  const handleChartScroll = (e: any) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setChartPage(page);
  };


  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* App title */}
        <Text style={styles.appTitle}>WattWise</Text>

        {/* Range selector */}
        <View style={styles.rangeRow}>
          {(['3', '6', '12'] as RangeKey[]).map((r) => (
            <TouchableOpacity
              key={r}
              style={[styles.rangeBtn, range === r && styles.rangeBtnActive]}
              onPress={() => setRange(r)}
            >
              <Text style={[styles.rangeBtnText, range === r && styles.rangeBtnTextActive]}>
                {r} Months
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Swipeable chart cards */}
        <FlatList
          ref={chartFlatRef}
          data={charts}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => (
            <View style={{ width: SCREEN_WIDTH, paddingHorizontal: 16 }}>{item}</View>
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleChartScroll}
          scrollEventThrottle={16}
          style={styles.chartFlatList}
        />

        {/* Pagination dots */}
        <View style={styles.dotsRow}>
          {charts.map((_, i) => (
            <View key={i} style={[styles.dot, chartPage === i && styles.dotActive]} />
          ))}
        </View>

        {/* Suggestions */}
        <View style={styles.suggestionsCard}>
          <Text style={styles.suggestionsTitle}>Suggestions</Text>
          <ScrollView
            style={styles.suggestionsList}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            {SUGGESTIONS.map((s, i) => (
              <View key={i} style={styles.suggestionItem}>
                <Text style={styles.suggestionText}>{s}</Text>
              </View>
            ))}
          </ScrollView>
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

  // App title
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 14,
  },

  // Range selector
  rangeRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 14,
    gap: 8,
  },
  rangeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  rangeBtnActive: {
    backgroundColor: Colors.main.primarycolor,
    borderColor: Colors.main.primarycolor,
  },
  rangeBtnText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  rangeBtnTextActive: {
    color: '#fff',
  },

  // FlatList
  chartFlatList: {
    flexGrow: 0,
  },

  // Pagination dots
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
    marginBottom: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  dotActive: {
    backgroundColor: '#333',
  },

  // Suggestions
  suggestionsCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 10,
    marginTop: 12,
    maxHeight: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
  },
  suggestionsList: {
    flexGrow: 0,
  },
  suggestionItem: {
    backgroundColor: Colors.main.primarycolor,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  suggestionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },

  // Nav screen placeholders
  navScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.background,
  },
  navScreenText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#555',
  },

  
});